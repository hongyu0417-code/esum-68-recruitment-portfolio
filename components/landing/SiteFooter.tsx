import { INSTAGRAM_URL, siteAssets } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer__inner">
        <div className="landing-footer__identity">
          <span className="landing-footer__mark">
            <img src={siteAssets.logo} alt="ESUM logo" width="64" height="64" loading="lazy" decoding="async" />
          </span>
          <div>
            <strong>ESUM 68</strong>
            <p>Engineering Society of Universiti Malaya</p>
          </div>
        </div>

        <div className="landing-footer__statement">
          <p>Built by ESUM for the next generation of engineering student leaders.</p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram · @esum_official <span className="landing-icon" aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="landing-footer__bottom">
          <span>© 2026 Engineering Society of Universiti Malaya</span>
          <span>ESUM AWESUM</span>
        </div>
      </div>
    </footer>
  );
}
