'use client';

import { useEffect, useState } from 'react';
import { recruitmentJourney } from '@/lib/site-config';
import { getRecruitmentTimelineState, type RecruitmentTimelineState } from '@/lib/recruitment-timeline';
import { Reveal } from './Reveal';

function getStepState(timelineState: RecruitmentTimelineState, index: number) {
  if (timelineState === 'open' && index === 0) return 'live';
  if (timelineState === 'closed' && index < 2) return 'complete';
  return 'upcoming';
}

export function RecruitmentTimeline() {
  const [timelineState, setTimelineState] = useState<RecruitmentTimelineState>('upcoming');

  useEffect(() => {
    const updateState = () => setTimelineState(getRecruitmentTimelineState());
    updateState();

    const interval = window.setInterval(updateState, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <ol className="journey-timeline" data-state={timelineState}>
      {recruitmentJourney.map((stage, index) => (
        <li className={`journey-step journey-step--${getStepState(timelineState, index)}`} key={stage.title}>
          <Reveal delay={index * 80}>
            <article className="journey-step__card">
              <time>{stage.date}</time>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </article>
            <span className="journey-step__marker" aria-hidden="true" />
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
