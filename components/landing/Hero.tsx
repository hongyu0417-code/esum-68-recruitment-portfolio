import { GOOGLE_FORM_URL, siteAssets } from '@/lib/site-config';

function ArrowIcon() {
  return <span className="landing-icon" aria-hidden="true">↗</span>;
}

function DownIcon() {
  return <span className="landing-icon" aria-hidden="true">↓</span>;
}

export function Hero() {
  return (
    <section className="landing-hero" id="top" aria-labelledby="hero-title">
      <div className="landing-hero__photo" aria-hidden="true">
        {siteAssets.heroImage ? <img src={siteAssets.heroImage} alt="" width="2400" height="1600" fetchPriority="high" decoding="async" /> : null}
      </div>
      <div className="landing-hero__wash" aria-hidden="true" />

      <div className="landing-hero__content">
        <div className="landing-hero__intro">
          <div className="landing-hero__badge">
            <span className="landing-hero__logo">
              <img src={siteAssets.logo} alt="Engineering Society of Universiti Malaya logo" width="88" height="88" />
            </span>
            <span><small>Engineering Society of</small>Universiti Malaya</span>
          </div>

          <p className="landing-hero__eyebrow"><span /> 68th Session · Executive Recruitment</p>
          <h1 id="hero-title">Build what<br /><span>comes next.</span></h1>
          <p className="landing-hero__tagline">ESUM AWESUM</p>
          <p className="landing-hero__copy">
            Step into a student-led team where ideas become experiences, industry connections become opportunities,
            and every contribution moves engineering students forward.
          </p>

          <div className="landing-hero__actions">
            <a className="landing-button landing-button--primary" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">Apply now <ArrowIcon /></a>
            <a className="landing-button landing-button--glass" href="#about-esum">Discover ESUM <DownIcon /></a>
          </div>
        </div>

      </div>
    </section>
  );
}
