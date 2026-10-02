import { env } from 'cloudflare:workers';

export const applicationTableSql = `
CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  full_name TEXT NOT NULL,
  matric_number TEXT NOT NULL,
  ic_number TEXT,
  phone_number TEXT NOT NULL,
  personal_email TEXT NOT NULL,
  siswa_email TEXT NOT NULL,
  study_department TEXT NOT NULL,
  year_of_study TEXT NOT NULL,
  gender TEXT NOT NULL,
  first_choice TEXT NOT NULL,
  second_choice TEXT,
  commitments TEXT NOT NULL,
  answers_json TEXT NOT NULL,
  cv_key TEXT,
  cv_file_name TEXT,
  video_key TEXT,
  video_file_name TEXT,
  video_link TEXT,
  status TEXT NOT NULL DEFAULT 'new'
)`;

export async function ensureApplicationsTable() {
  if (!env.DB) return false;
  await env.DB.prepare(applicationTableSql).run();
  for (const statement of [
    'ALTER TABLE applications ADD COLUMN video_key TEXT',
    'ALTER TABLE applications ADD COLUMN video_file_name TEXT',
    'ALTER TABLE applications ADD COLUMN video_link TEXT',
    'ALTER TABLE applications ADD COLUMN gender TEXT',
  ]) {
    try { await env.DB.prepare(statement).run(); } catch { /* Column already exists on upgraded databases. */ }
  }
  await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at)').run();
  await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_applications_first_choice ON applications(first_choice)').run();
  return true;
}

export function getFilesBucket() {
  return env.FILES;
}

export function makeApplicationId() {
  const suffix = crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase();
  return `ESUM68-${suffix}`;
}
