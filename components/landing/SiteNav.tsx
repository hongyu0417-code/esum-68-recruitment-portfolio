'use client';

import { useState } from 'react';
import { GOOGLE_FORM_URL, navigationItems, siteAssets } from '@/lib/site-config';

function ArrowIcon() {
  return <span className="landing-icon" aria-hidden="true">↗</span>;
}

type SiteNavProps = {
  isSubpage?: boolean;
};

export function SiteNav({ isSubpage = false }: SiteNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const getNavigationHref = (href: string) =>
    isSubpage && href.startsWith('#') ? `/${href}` : href;

  return (
    <header className={`landing-nav ${isOpen ? 'is-open' : ''}`}>
      <div className="landing-nav__inner">
        <a className="landing-brand" href={isSubpage ? '/' : '#top'} aria-label="ESUM 68 Executive Recruitment home">
          <span className="landing-brand__mark"><img src={siteAssets.logo} alt="" width="42" height="42" /></span>
          <span className="landing-brand__text"><strong>ESUM 68</strong><small>Executive Recruitment</small></span>
        </a>

        <nav className="landing-nav__links" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={getNavigationHref(item.href)}
              aria-current={isSubpage && item.href === '/our-team' ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="landing-nav__apply" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
          Apply now <ArrowIcon />
        </a>

        <button className="landing-nav__toggle" type="button" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
          <span /><span />
        </button>
      </div>

      <div className="landing-nav__mobile-panel">
        <nav aria-label="Mobile navigation">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={getNavigationHref(item.href)}
              aria-current={isSubpage && item.href === '/our-team' ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="landing-nav__mobile-apply" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
          Start your application <ArrowIcon />
        </a>
      </div>
    </header>
  );
}
