export type RecruitmentTimelineState = 'upcoming' | 'open' | 'closed';

const RECRUITMENT_START = new Date('2026-09-30T10:00:00+08:00');
const RECRUITMENT_END = new Date('2026-10-18T23:59:59+08:00');

export function getRecruitmentTimelineState(now = new Date()): RecruitmentTimelineState {
  if (now < RECRUITMENT_START) return 'upcoming';
  if (now <= RECRUITMENT_END) return 'open';
  return 'closed';
}
