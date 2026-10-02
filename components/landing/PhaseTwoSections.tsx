import { aboutHighlights, benefits, siteAssets } from '@/lib/site-config';
import { Reveal } from './Reveal';

function BenefitCard({ benefit, index }: { benefit: (typeof benefits)[number]; index: number }) {
  return (
    <Reveal className={`benefit-card benefit-card--${benefit.id}`} delay={index * 85}>
      <div className="benefit-card__media">
        {benefit.image ? <img src={benefit.image} alt={benefit.imageAlt} width="1200" height="800" loading="lazy" decoding="async" /> : null}
      </div>
      <div className="benefit-card__copy">
        <h3>{benefit.title}</h3>
        <p>{benefit.description}</p>
      </div>
    </Reveal>
  );
}

export function PhaseTwoSections() {
  return (
    <>
      <section className="about-section landing-section" id="about-esum" aria-labelledby="about-title">
        <div className="landing-section__inner">
          <Reveal className="about-section__heading">
            <p className="about-section__label">About ESUM</p>
            <h2 id="about-title">Engineering students, building beyond the classroom.</h2>
            <p>ESUM creates opportunities for students to learn through action, connect with industry, and shape the engineering community around them.</p>
          </Reveal>

          <div className="about-section__story">
            <Reveal className="about-section__visual" delay={80}>
              <div className="about-section__image">
                {siteAssets.heroImage ? <img src={siteAssets.heroImage} alt="ESUM members celebrating the completion of their student leadership tenure" width="2400" height="1600" loading="lazy" decoding="async" /> : null}
              </div>
            </Reveal>

            <Reveal className="about-section__copy" delay={150}>
              <p className="about-section__lead">
                The Engineering Society of Universiti Malaya is the largest and most established student society within the Faculty of Engineering, serving as the faculty’s umbrella society.
              </p>
              <p>
                In consortium with the Institution of Engineers Malaysia Universiti Malaya Student Section (IEM-UM SS), ESUM connects academic learning with professional practice through industry engagement, technical exposure, career programmes, competitions, events, projects, and student-led initiatives.
              </p>
              <div className="about-section__recruitment-note">
                <strong>Why the 68th matters</strong>
                <p>This recruitment welcomes the next team to carry that legacy forward, bringing new ideas, energy, and leadership to the engineering student community.</p>
              </div>
            </Reveal>
          </div>

          <div className="about-highlights" aria-label="ESUM highlights">
            {aboutHighlights.map((highlight, index) => (
              <Reveal className="about-highlight" key={highlight.value} delay={index * 75}>
                <strong>{highlight.value}</strong>
                <span>{highlight.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section landing-section" id="why-esum" aria-labelledby="why-title">
        <div className="landing-section__inner">
          <Reveal className="why-section__heading">
            <h2 id="why-title">Why ESUM</h2>
            <p>ESUM brings engineering, leadership, industry, and people together, giving you room to learn, grow, and make things happen.</p>
          </Reveal>

          <div className="benefit-grid">
            {benefits.map((benefit, index) => <BenefitCard benefit={benefit} index={index} key={benefit.id} />)}
          </div>

        </div>
      </section>
    </>
  );
}
