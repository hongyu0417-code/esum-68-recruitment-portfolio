import { env } from 'cloudflare:workers';
import { ensureApplicationsTable, getFilesBucket, makeApplicationId } from '@/lib/storage';

const liveBackendUrl = process.env.ESUM_API_UPSTREAM_URL;
const maxCvBytes = 10 * 1024 * 1024;

function withCors(request: Request, response: Response) {
  const origin = request.headers.get('Origin');
  if (origin && (origin === 'https://esum-68-executive-recruitment.vercel.app' || origin.endsWith('.vercel.app'))) {
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    headers.set('Vary', 'Origin');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
  return response;
}

function jsonResponse(request: Request, body: unknown, init?: ResponseInit) {
  return withCors(request, Response.json(body, init));
}

type IncomingApplication = {
  fullName?: string;
  matricNumber?: string;
  icNumber?: string;
  phoneNumber?: string;
  personalEmail?: string;
  siswaEmail?: string;
  studyDepartment?: string;
  yearOfStudy?: string;
  gender?: string;
  commitments?: string;
  firstChoice?: string;
  secondChoice?: string;
  proudVideoLink?: string;
  answers?: Record<string, string>;
  consent?: boolean;
};

const requiredFields: Array<keyof IncomingApplication> = ['fullName', 'matricNumber', 'phoneNumber', 'personalEmail', 'siswaEmail', 'studyDepartment', 'yearOfStudy', 'gender', 'commitments', 'firstChoice', 'answers'];

export async function POST(request: Request) {
  const form = await request.formData();
  if (!env.DB && process.env.VERCEL) {
    if (!liveBackendUrl) return jsonResponse(request, { error: 'Application backend is not configured in this portfolio snapshot.' }, { status: 503 });
    const upstream = await fetch(`${liveBackendUrl}/api/applications`, { method: 'POST', body: form });
    return new Response(upstream.body, { status: upstream.status, headers: { 'Content-Type': upstream.headers.get('Content-Type') || 'application/json' } });
  }
  const rawApplication = form.get('application');
  if (typeof rawApplication !== 'string') return jsonResponse(request, { error: 'Application details are missing.' }, { status: 400 });

  let application: IncomingApplication;
  try { application = JSON.parse(rawApplication) as IncomingApplication; } catch { return jsonResponse(request, { error: 'Application details could not be read.' }, { status: 400 }); }
  if (requiredFields.some((field) => !application[field] || (typeof application[field] === 'string' && !application[field]?.trim()))) return jsonResponse(request, { error: 'Please complete all required application fields.' }, { status: 400 });
  if (!['Male', 'Female'].includes(application.gender || '')) return jsonResponse(request, { error: 'Please select Male or Female.' }, { status: 400 });
  if (!application.consent) return jsonResponse(request, { error: 'Please read and accept the Data Privacy and Non-Disclosure Agreement.' }, { status: 400 });

  const cv = form.get('cvFile');
  if (!(cv instanceof File) || cv.size === 0) return jsonResponse(request, { error: 'Please upload your CV / resume before submitting.' }, { status: 400 });
  if (cv.size > maxCvBytes || (!cv.type.includes('pdf') && !cv.name.toLowerCase().endsWith('.pdf'))) return jsonResponse(request, { error: 'Your CV must be a PDF smaller than 10MB.' }, { status: 400 });
  const proudVideoLink = application.proudVideoLink?.trim() || '';
  let videoLink: string | null = null;
  if (proudVideoLink) {
    let videoUrl: URL;
    try { videoUrl = new URL(proudVideoLink); } catch { return jsonResponse(request, { error: 'Please provide a valid Google Drive link for your proud moment video.' }, { status: 400 }); }
    if (!['drive.google.com', 'docs.google.com'].includes(videoUrl.hostname)) return jsonResponse(request, { error: 'Please use a Google Drive sharing link for your proud moment video.' }, { status: 400 });
    videoLink = videoUrl.toString();
  }

  const id = makeApplicationId();
  if (!env.DB) return jsonResponse(request, { id, mode: 'preview' }, { status: 201 });

  await ensureApplicationsTable();
  let cvKey: string | null = null;
  let cvFileName: string | null = null;
  if (env.FILES) {
    cvKey = `applications/${id}/cv.pdf`;
    cvFileName = cv.name;
    await getFilesBucket().put(cvKey, await cv.arrayBuffer(), { httpMetadata: { contentType: 'application/pdf' } });
  }
  await env.DB.prepare(`INSERT INTO applications (id, created_at, full_name, matric_number, ic_number, phone_number, personal_email, siswa_email, study_department, year_of_study, gender, first_choice, second_choice, commitments, answers_json, cv_key, cv_file_name, video_link, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, Date.now(), application.fullName, application.matricNumber, application.icNumber || null, application.phoneNumber, application.personalEmail, application.siswaEmail, application.studyDepartment, application.yearOfStudy, application.gender, application.firstChoice, application.secondChoice || 'N/A', application.commitments, JSON.stringify(application.answers), cvKey, cvFileName, videoLink, 'new')
    .run();

  return jsonResponse(request, { id }, { status: 201 });
}

export function OPTIONS(request: Request) {
  return withCors(request, new Response(null, { status: 204 }));
}

export async function GET(request: Request) {
  const userEmail = request.headers.get('oai-authenticated-user-email');
  if (!userEmail) return Response.json({ error: 'Staff sign-in required.' }, { status: 401 });
  if (!env.DB && process.env.VERCEL) {
    if (!liveBackendUrl) return jsonResponse(request, { error: 'Application backend is not configured in this portfolio snapshot.' }, { status: 503 });
    const upstream = await fetch(`${liveBackendUrl}/api/applications${new URL(request.url).search}`, { headers: { 'oai-authenticated-user-email': userEmail } });
    return new Response(upstream.body, { status: upstream.status, headers: { 'Content-Type': upstream.headers.get('Content-Type') || 'application/json' } });
  }
  if (!env.DB) return Response.json({ rows: [] });
  await ensureApplicationsTable();
  const rows = await env.DB.prepare('SELECT * FROM applications ORDER BY created_at DESC').all();
  if (new URL(request.url).searchParams.get('format') !== 'csv') return Response.json({ rows: rows.results });

  const columns = ['id', 'created_at', 'full_name', 'matric_number', 'ic_number', 'phone_number', 'personal_email', 'siswa_email', 'study_department', 'year_of_study', 'gender', 'first_choice', 'second_choice', 'commitments', 'first_answer_1', 'first_answer_2', 'first_answer_3', 'second_answer_1', 'second_answer_2', 'second_answer_3', 'cv_file_name', 'video_link', 'video_file_name', 'status'];
  const escapeCsv = (value: unknown) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const csvRows = rows.results.map((row) => {
    const record = row as Record<string, unknown>;
    let answers: Record<string, string> = {};
    try { answers = JSON.parse(String(record.answers_json || '{}')) as Record<string, string>; } catch { answers = {}; }
    const firstChoice = String(record.first_choice || '');
    const secondChoice = String(record.second_choice || '');
    const firstAnswers = [0, 1, 2].map((index) => answers[`${firstChoice}-${index}`] || '');
    const secondAnswers = secondChoice && secondChoice !== 'N/A' ? [0, 1, 2].map((index) => answers[`${secondChoice}-${index}`] || '') : ['', '', ''];
    return columns.map((column) => {
      if (column === 'first_answer_1') return escapeCsv(firstAnswers[0]);
      if (column === 'first_answer_2') return escapeCsv(firstAnswers[1]);
      if (column === 'first_answer_3') return escapeCsv(firstAnswers[2]);
      if (column === 'second_answer_1') return escapeCsv(secondAnswers[0]);
      if (column === 'second_answer_2') return escapeCsv(secondAnswers[1]);
      if (column === 'second_answer_3') return escapeCsv(secondAnswers[2]);
      return escapeCsv(record[column]);
    }).join(',');
  });
  const csv = [columns.join(','), ...csvRows].join('\n');
  return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="esum-68-applications.csv"' } });
}
