import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb() {
  if (!env.DB) {
    throw new Error(
      'Cloudflare D1 binding `DB` is unavailable. Set `ESUM_D1_BINDING=DB` for local development or bind `DB` in your deployment before using the database.',
    );
  }

  return drizzle(env.DB, { schema });
}
