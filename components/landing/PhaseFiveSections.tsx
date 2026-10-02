import { Reveal } from '@/components/landing/Reveal';
import { contacts, GOOGLE_FORM_URL } from '@/lib/site-config';

export function PhaseFiveSections() {
  return (
    <>
      <section className="landing-section landing-contact-section" id="contact" aria-labelledby="contact-title">
        <div className="landing-section__inner">
          <Reveal className="landing-contact-section__heading">
            <h2 id="contact-title">Questions before you apply?</h2>
            <p>Speak directly with the Events &amp; Projects Directors about recruitment and application requirements.</p>
          </Reveal>

          <div className="landing-contact-grid">
            {contacts.map((contact, index) => (
              <Reveal className="landing-contact-card" delay={index * 85} key={contact.name}>
                {contact.photo ? (
                  <div className="landing-contact-card__photo">
                    <img
                      className={contact.photoClass}
                      src={contact.photo}
                      alt={`Portrait of ${contact.name}`}
                      width="2160"
                      height="2700"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : null}
                <div className="landing-contact-card__body">
                  <p className="landing-contact-card__role">{contact.role}</p>
                  <h3>{contact.name}</h3>
                  <p>{contact.year}<br />{contact.discipline}</p>
                  {contact.whatsapp ? (
                    <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                      WhatsApp {contact.phone} <span className="landing-icon" aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section final-cta-section" aria-labelledby="final-cta-title">
        <div className="landing-section__inner">
          <Reveal className="final-cta-panel">
            <h2 id="final-cta-title">If you have been waiting for a reason to step forward, this is it.</h2>
            <div className="final-cta-panel__action">
              <a className="landing-button landing-button--primary" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
                Start your application <span className="landing-icon" aria-hidden="true">↗</span>
              </a>
              <p>Review the form requirements and prepare your supporting documents before submitting.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
