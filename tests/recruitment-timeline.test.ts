import assert from 'node:assert/strict';
import test from 'node:test';
import { getRecruitmentTimelineState } from '../lib/recruitment-timeline.ts';

test('marks recruitment as open from the start time through the closing time', () => {
  assert.equal(
    getRecruitmentTimelineState(new Date('2026-09-30T02:00:00.000Z')),
    'open',
  );
  assert.equal(
    getRecruitmentTimelineState(new Date('2026-10-18T15:59:59.000Z')),
    'open',
  );
});

test('marks recruitment as upcoming before applications open and closed after they close', () => {
  assert.equal(
    getRecruitmentTimelineState(new Date('2026-09-30T01:59:59.000Z')),
    'upcoming',
  );
  assert.equal(
    getRecruitmentTimelineState(new Date('2026-10-18T16:00:00.000Z')),
    'closed',
  );
});
