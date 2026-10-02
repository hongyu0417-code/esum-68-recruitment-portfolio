import { env } from 'cloudflare:workers';
import Link from 'next/link';
import { requireChatGPTUser } from '../chatgpt-auth';
import { ensureApplicationsTable } from '@/lib/storage';

export const dynamic = 'force-dynamic';

const questionBank: Record<string, string[]> = {
  'Events & Projects': [
    'Unlimited-budget event idea',
    'Strengths and skills for the department',
    'Past event / project experience',
  ],
  'Industrial Relations': [
    'Approaching companies',
    'Handling partner resistance',
    'Improving low event registration',
  ],
  'Partnership Development': [
    'Understanding of partnership development',
    'Previous sponsorship experience',
    'Adapting to a changed collaboration',
  ],
  'Content & Marketing': [
    'Design and marketing experience',
    'Campaign idea for ESUM registrations',
    'Content design proficiency',
  ],
};

type ApplicationRow = {
  id: string;
  created_at: number;
  full_name: string;
  matric_number: string;
  ic_number: string | null;
  phone_number: string;
  personal_email: string;
  siswa_email: string;
  study_department: string;
  year_of_study: string;
  gender: string | null;
  first_choice: string;
  second_choice: string | null;
  commitments: string;
  answers_json: string;
  status: string;
  cv_file_name: string | null;
  video_file_name: string | null;
  video_link: string | null;
};

async function readApplications(): Promise<ApplicationRow[]> {
  if (!env.DB) return [];
  try {
    await ensureApplicationsTable();
    const result = await env.DB.prepare('SELECT id, created_at, full_name, matric_number, ic_number, phone_number, personal_email, siswa_email, study_department, year_of_study, gender, first_choice, second_choice, commitments, answers_json, status, cv_file_name, video_file_name, video_link FROM applications ORDER BY created_at DESC').all();
    return result.results as unknown as ApplicationRow[];
  } catch { return []; }
}

function countValues(rows: ApplicationRow[], getValue: (row: ApplicationRow) => string) {
  return rows.reduce<Record<string, number>>((counts, row) => {
    const value = getValue(row);
    if (value) counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function readAnswers(raw: string | null | undefined) {
  try { return JSON.parse(raw || '{}') as Record<string, string>; } catch { return {}; }
}

function displayGender(value: string | null) {
  if (value === 'Boy') return 'Male';
  if (value === 'Girl') return 'Female';
  return value || 'Not recorded';
}

function selectedDepartments(row: ApplicationRow) {
  return Array.from(new Set([row.first_choice, row.second_choice].filter((value): value is string => Boolean(value && value !== 'N/A'))));
}

export default async function AdminPage() {
  if (process.env.VERCEL) return <main className="admin-shell"><section className="admin-content"><div className="admin-empty"><span>✳</span><strong>Admin screening stays on the primary ESUM workspace.</strong><p>Production admin URLs and applicant records are intentionally excluded from this public portfolio copy.</p></div></section></main>;
  const user = await requireChatGPTUser('/admin');
  const rows = await readApplications();
  const departmentCounts = countValues(rows, (row) => row.first_choice);
  const secondChoiceCounts = countValues(rows, (row) => row.second_choice || 'N/A');
  const yearCounts = countValues(rows, (row) => row.year_of_study);
  const genderCounts = countValues(rows, (row) => displayGender(row.gender));
  const disciplineCounts = countValues(rows, (row) => row.study_department);

  return <main className="admin-shell">
    <header className="admin-topbar"><Link className="brand" href="/"><img className="brand-logo" src="/esum-logo.png" alt="ESUM logo" /><span>ESUM 68 <em>Recruitment desk</em></span></Link><div className="admin-user">{user.displayName} <a href="/signout-with-chatgpt?return_to=/">Sign out</a></div></header>
    <section className="admin-content">
      <div className="admin-heading"><div><p className="eyebrow">Staff workspace / ESUM 68</p><h1>Applications<br /><span>at a glance.</span></h1></div><a className="button button-dark" href="/api/applications?format=csv">Download CSV <span>↓</span></a></div>
      <div className="admin-stats"><div><span>Total applications</span><strong>{rows.length.toString().padStart(2, '0')}</strong></div><div><span>New this round</span><strong>{rows.filter((row) => row.status === 'new').length.toString().padStart(2, '0')}</strong></div><div><span>Video links</span><strong>{rows.filter((row) => row.video_link || row.video_file_name).length.toString().padStart(2, '0')}</strong></div><div><span>Departments selected</span><strong>{Object.keys(departmentCounts).length.toString().padStart(2, '0')}</strong></div></div>

      {rows.length === 0 ? <div className="admin-empty"><span>✳</span><strong>Your shortlist starts here.</strong><p>Once candidates submit through the public application, their details will appear in this summary and individual-response view.</p></div> : <>
        <section className="admin-summary-section"><div className="admin-section-heading"><div><p className="eyebrow">Summary</p><h2>See the shape<br /><span>of the room.</span></h2></div><p>Organised counts for fast screening across applicant profile and department preferences.</p></div><div className="admin-summary-grid"><div className="summary-panel"><div className="admin-table-head"><strong>Applicant profile</strong><span>{rows.length} responses</span></div><div className="summary-group"><h3>Year of study</h3><div className="bar-row-list">{['Year 1', 'Year 2', 'Year 3', 'Year 4'].map((label) => { const count = yearCounts[label] || 0; return <div className="bar-row" key={label}><div><span>{label}</span><strong>{count}</strong></div><i><b style={{ width: `${count ? Math.max((count / rows.length) * 100, 4) : 0}%` }} /></i></div>; })}</div></div><div className="summary-group"><h3>Gender</h3>{['Male', 'Female', 'Not recorded'].map((label) => { const count = genderCounts[label] || 0; return <div className="bar-row" key={label}><div><span>{label}</span><strong>{count}</strong></div><i><b style={{ width: `${count ? Math.max((count / rows.length) * 100, 4) : 0}%` }} /></i></div>; })}</div><div className="summary-group"><h3>Study discipline</h3>{['Biomedical Engineering', 'Chemical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Mechanical Engineering'].map((label) => { const count = disciplineCounts[label] || 0; return <div className="bar-row" key={label}><div><span>{label}</span><strong>{count}</strong></div><i><b style={{ width: `${count ? Math.max((count / rows.length) * 100, 4) : 0}%` }} /></i></div>; })}</div></div><div className="summary-panel"><div className="admin-table-head"><strong>Department preferences</strong><span>First + second choice</span></div><div className="summary-group"><h3>First preference</h3>{['Events & Projects', 'Industrial Relations', 'Partnership Development', 'Content & Marketing'].map((label) => { const count = departmentCounts[label] || 0; return <div className="bar-row" key={label}><div><span>{label}</span><strong>{count}</strong></div><i><b style={{ width: `${count ? Math.max((count / rows.length) * 100, 4) : 0}%` }} /></i></div>; })}</div><div className="summary-group"><h3>Second preference</h3>{['Events & Projects', 'Industrial Relations', 'Partnership Development', 'Content & Marketing', 'N/A'].map((label) => { const count = secondChoiceCounts[label] || 0; return <div className="bar-row" key={label}><div><span>{label}</span><strong>{count}</strong></div><i><b style={{ width: `${count ? Math.max((count / rows.length) * 100, 4) : 0}%` }} /></i></div>; })}</div></div></div></section>

        <section className="admin-individual-section"><div className="admin-section-heading"><div><p className="eyebrow">Individual responses</p><h2>Meet the<br /><span>applicants.</span></h2></div><p>Open a response to review profile details, both department question sets, CV, and optional achievement video.</p></div><div className="admin-responses">{rows.map((row) => { const answers = readAnswers(row.answers_json); return <details className="admin-response-card" key={row.id}><summary><span><strong>{row.full_name}</strong><small>{row.matric_number} · {row.first_choice}</small></span><span className={`status-pill ${row.status}`}>{row.status}</span></summary><div className="response-detail"><div className="response-profile"><div><span>Study</span><strong>{row.study_department} · {row.year_of_study}</strong></div><div><span>Gender</span><strong>{displayGender(row.gender)}</strong></div><div><span>Email</span><strong>{row.personal_email}</strong></div><div><span>Phone</span><strong>{row.phone_number}</strong></div><div><span>Second preference</span><strong>{row.second_choice || 'N/A'}</strong></div></div><div className="response-files"><span>Files & links</span><div>{row.cv_file_name ? <a href={`/api/applications/${row.id}/file?type=cv`}>{row.cv_file_name} ↗</a> : <small>No CV uploaded</small>}{row.video_link ? <a href={row.video_link} target="_blank" rel="noreferrer">Open achievement video ↗</a> : row.video_file_name ? <a href={`/api/applications/${row.id}/file?type=video`}>{row.video_file_name} ↗</a> : <small>No achievement video link</small>}</div></div><div className="response-commitments"><span>Commitments</span><p>{row.commitments}</p></div><div className="response-answers"><span>Department answers</span>{selectedDepartments(row).map((department) => <div className="department-response-group" key={department}><strong>{department}</strong>{(questionBank[department] || []).map((label, index) => <div className="response-answer" key={label}><small>0{index + 1} · {label}</small><p>{answers[`${department}-${index}`] || 'No response.'}</p></div>)}</div>)}</div></div></details>; })}</div></section>
      </>}
    </section>
  </main>;
}
