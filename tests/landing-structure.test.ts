import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const projectFile = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('keeps the full team section off the main landing route', () => {
  const homePage = projectFile('app/page.tsx');

  assert.doesNotMatch(homePage, /TeamSection/);
});

test('uses a self-contained ESUM favicon and compact unified report metrics', () => {
  const layout = projectFile('app/layout.tsx');
  const styles = projectFile('app/landing.css');

  assert.match(layout, /icon:\s*'\/favicon-esum\.png'/);
  assert.match(styles, /\.report-metric\s*\{[\s\S]*?min-height:\s*112px[\s\S]*?background:\s*linear-gradient/);
});

test('uses the latest executive recruitment form for every apply action', () => {
  const siteConfig = projectFile('lib/site-config.ts');

  assert.match(siteConfig, /https:\/\/forms\.gle\/6JP8NPAjTNjUJSp48/);
});

test('keeps the main landing sections on one charcoal surface', () => {
  const styles = projectFile('app/landing.css');

  assert.match(styles, /\.landing-section\s*\{[\s\S]*?background:\s*var\(--esum-ink\);/);
  assert.doesNotMatch(styles, /\.why-section,\n\.report-section,\n\.landing-contact-section\s*\{/);
  assert.doesNotMatch(styles, /\.departments-section,\n\.events-section,\n\.journey-section\s*\{/);
});

test('presents applicant contacts as full portrait cards rather than split image strips', () => {
  const styles = projectFile('app/landing.css');

  assert.match(styles, /\.landing-contact-card\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(styles, /\.landing-contact-card__photo\s*\{[\s\S]*?aspect-ratio:\s*4\s*\/\s*5/);
});

test('keeps all applicant contact cards in one swipeable row on phones', () => {
  const styles = projectFile('app/landing.css');
  const phoneStyles = styles.slice(styles.indexOf('@media (max-width: 520px)'));

  assert.match(phoneStyles, /\.landing-contact-grid\s*\{[\s\S]*?display:\s*flex;[\s\S]*?overflow-x:\s*auto;[\s\S]*?scroll-snap-type:\s*x mandatory;/);
  assert.match(phoneStyles, /\.landing-contact-grid > \.landing-reveal,\s*\.landing-contact-grid > \.landing-reveal:last-child\s*\{[\s\S]*?flex:\s*0 0 min\(78vw,300px\);[\s\S]*?scroll-snap-align:\s*start;/);
});
