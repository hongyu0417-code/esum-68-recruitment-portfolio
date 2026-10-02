'use client';

import { useState } from 'react';
import { departments } from '@/lib/site-config';
import { Reveal } from './Reveal';

export function DepartmentsSection() {
  const [activeDepartmentId, setActiveDepartmentId] = useState<string>(departments[0].id);
  const activeDepartment = departments.find((department) => department.id === activeDepartmentId) ?? departments[0];

  return (
    <section className="departments-section landing-section" id="departments" aria-labelledby="departments-title">
      <div className="landing-section__inner">
        <Reveal className="departments-section__heading">
          <h2 id="departments-title">Choose where you want to make an impact.</h2>
          <p>Every department contributes differently. Explore the work, the projects, and the skills you can build before choosing your preference.</p>
        </Reveal>

        <Reveal className="department-explorer" delay={90}>
          <div className="department-tabs" role="tablist" aria-label="ESUM departments">
            {departments.map((department) => {
              const isActive = department.id === activeDepartment.id;
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`department-panel-${department.id}`}
                  id={`department-tab-${department.id}`}
                  className={isActive ? 'is-active' : ''}
                  key={department.id}
                  onClick={() => setActiveDepartmentId(department.id)}
                >
                  <span>{department.code}</span>
                  <strong>{department.name}</strong>
                </button>
              );
            })}
          </div>

          <div
            className="department-panel"
            role="tabpanel"
            id={`department-panel-${activeDepartment.id}`}
            aria-labelledby={`department-tab-${activeDepartment.id}`}
            key={activeDepartment.id}
          >
            <div className="department-panel__intro">
              <span>{activeDepartment.code}</span>
              <h3>{activeDepartment.name}</h3>
              <p>{activeDepartment.description}</p>
              <a
                className="department-panel__team-link"
                href={`/our-team?department=${activeDepartment.id}#departments-bods`}
              >
                Meet the {activeDepartment.code} Directors
                <span className="landing-icon" aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="department-panel__content">
              <div className="department-panel__scope">
                <h4>What you will do</h4>
                <ul>
                  {activeDepartment.jobScope.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div className="department-panel__details">
                <div>
                  <h4>Example projects</h4>
                  <ul>{activeDepartment.examples.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h4>Skills you can build</h4>
                  <ul>{activeDepartment.skills.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
