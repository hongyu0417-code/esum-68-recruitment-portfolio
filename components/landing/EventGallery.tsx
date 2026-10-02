'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/landing/Reveal';
import { INSTAGRAM_URL, majorEvents } from '@/lib/site-config';

export function EventGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-event-card]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;

        const nextIndex = Number((mostVisible.target as HTMLElement).dataset.eventCard);
        if (!Number.isNaN(nextIndex)) setActiveIndex(nextIndex);
      },
      { root: track, threshold: [0.5, 0.68, 0.82] },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex = Math.max(0, Math.min(index, majorEvents.length - 1));
    const card = track.querySelector<HTMLElement>(`[data-event-card="${nextIndex}"]`);
    card?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
    setActiveIndex(nextIndex);
  };

  return (
    <section className="landing-section events-section" id="major-events" aria-labelledby="events-title">
      <div className="landing-section__inner">
        <Reveal className="events-section__heading">
          <div>
            <p className="events-section__eyebrow">Major events</p>
            <h2 id="events-title">A glimpse of ESUM in motion.</h2>
          </div>
          <p>
            Swipe through some of the programmes, partnerships, and student-led experiences that bring the ESUM community together.
          </p>
        </Reveal>

        <Reveal className="events-carousel" delay={80}>
          <div className="events-carousel__toolbar">
            <p aria-live="polite">{majorEvents[activeIndex].title}</p>
            <div className="events-carousel__controls">
              <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Show previous event">
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === majorEvents.length - 1} aria-label="Show next event">
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <div className="events-carousel__track" ref={trackRef} tabIndex={0} aria-label="Major ESUM events gallery">
            {majorEvents.map((event, index) => (
              <article className="event-card" data-event-card={index} key={event.title}>
                <div className="event-card__photo">
                  {event.photo ? <img
                    src={event.photo}
                    alt={`${event.title} event highlight`}
                    width="2400"
                    height="1500"
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: event.photoPosition }}
                  /> : null}
                </div>
                <div className="event-card__caption">
                  <h3>{event.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="events-section__action" delay={130}>
          <p>Follow ESUM for more event highlights and updates.</p>
          <div>
            <a className="landing-button landing-button--primary" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Follow Instagram <span className="landing-icon" aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
