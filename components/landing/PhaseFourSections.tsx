import { Reveal } from '@/components/landing/Reveal';
import { reportHighlights, reportPhotos, siteAssets, TENURE_REPORT_URL } from '@/lib/site-config';
import { RecruitmentTimeline } from './RecruitmentTimeline';

export function PhaseFourSections() {
  return (
    <>
      <section className="landing-section report-section" id="tenure-report" aria-labelledby="report-title">
        <div className="landing-section__inner">
          <Reveal className="report-section__heading">
            <h2 id="report-title">A tenure measured in real impact.</h2>
            <p>
              The 67th tenure report documents the people, programmes, partnerships, and outcomes that moved ESUM forward.
            </p>
          </Reveal>

          <div className="report-feature">
            {siteAssets.reportCover ? (
              <Reveal className="report-cover">
                <img
                  src={siteAssets.reportCover}
                  alt="ESUM tenure report cover"
                  width="1060"
                  height="1500"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>
            ) : null}

            <div className="report-feature__content">
              <div className="report-metrics" aria-label="Highlights from the 67th tenure report">
                {reportHighlights.map((highlight, index) => (
                  <Reveal className="report-metric" delay={index * 55} key={highlight.label}>
                    <strong>{highlight.value}</strong>
                    <span>{highlight.label}</span>
                  </Reveal>
                ))}
              </div>

              <div className="report-gallery" aria-label="Photographs from the 67th tenure report">
                {reportPhotos.map((photo, index) => (
                  <Reveal className="report-gallery__item" delay={120 + index * 70} key={photo.src}>
                    <img src={photo.src} alt={photo.alt} width="1200" height="800" loading="lazy" decoding="async" />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <Reveal className="report-section__action">
            <p>Read the complete report for programme details, event outcomes, partnerships, and the full tenure record.</p>
            <a className="landing-button landing-button--primary" href={TENURE_REPORT_URL} target="_blank" rel="noreferrer">
              Read the full report <span className="landing-icon" aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="landing-section journey-section" id="recruitment-journey" aria-labelledby="journey-title">
        <div className="landing-section__inner">
          <Reveal className="journey-section__heading">
            <h2 id="journey-title">From application to offer.</h2>
            <p>Keep these five recruitment milestones in your calendar.</p>
          </Reveal>

          <RecruitmentTimeline />
        </div>
      </section>
    </>
  );
}
