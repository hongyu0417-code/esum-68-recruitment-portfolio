import { env } from 'cloudflare:workers';
import { ensureApplicationsTable, getFilesBucket } from '@/lib/storage';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!request.headers.get('oai-authenticated-user-email')) return Response.json({ error: 'Staff sign-in required.' }, { status: 401 });
  if (!env.DB || !env.FILES) return Response.json({ error: 'File storage is unavailable.' }, { status: 503 });
  const { id } = await params;
  const type = new URL(request.url).searchParams.get('type') === 'video' ? 'video' : 'cv';
  await ensureApplicationsTable();
  const row = await env.DB.prepare('SELECT cv_key, cv_file_name, video_key, video_file_name FROM applications WHERE id = ?').bind(id).first<Record<string, string | null>>();
  if (!row) return Response.json({ error: 'Application not found.' }, { status: 404 });
  const key = type === 'video' ? row.video_key : row.cv_key;
  const filename = type === 'video' ? row.video_file_name : row.cv_file_name;
  if (!key) return Response.json({ error: 'File not found.' }, { status: 404 });
  const object = await getFilesBucket().get(key);
  if (!object) return Response.json({ error: 'File not found.' }, { status: 404 });
  const safeFilename = (filename || (type === 'video' ? 'proud-moment-video' : 'cv')).replaceAll('"', '');
  return new Response(object.body, { headers: { 'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream', 'Content-Length': String(object.size), 'Content-Disposition': `inline; filename="${safeFilename}"` } });
}
