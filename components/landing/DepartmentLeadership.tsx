'use client';

import { useEffect, useRef, useState } from 'react';
import { leadershipDepartments } from '@/lib/site-config';
import { DepartmentTabs } from './DepartmentTabs';
import { LeadershipProfile } from './LeadershipProfile';

type DepartmentLeadershipProps = {
  initialDepartmentId?: string;
};

function findLeadershipDepartment(value?: string | null) {
  return leadershipDepartments.find(
    (department) =>
      department.id === value ||
      department.id.replace(/-leadership$/, '') === value ||
      department.code.toLowerCase() === value?.toLowerCase(),
  );
}

export function DepartmentLeadership({ initialDepartmentId }: DepartmentLeadershipProps) {
  const requestedDepartment = findLeadershipDepartment(initialDepartmentId);
  const [activeId, setActiveId] = useState(
    requestedDepartment?.id ?? leadershipDepartments[0].id,
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeDepartment =
    leadershipDepartments.find((department) => department.id === activeId) ??
    leadershipDepartments[0];

  useEffect(() => {
    const queryDepartment = findLeadershipDepartment(new URLSearchParams(window.location.search).get('department'));
    if (!queryDepartment) return;

    const frame = window.requestAnimationFrame(() => setActiveId(queryDepartment.id));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="department-leadership" id="departments-bods" aria-labelledby="department-leadership-title">
      <div className="department-leadership__heading">
        <h3 id="department-leadership-title">Department Board of Directors</h3>
      </div>

      <DepartmentTabs
        departments={leadershipDepartments}
        activeId={activeDepartment.id}
        onChange={setActiveId}
        tabRefs={tabRefs}
      />

      <div
        className="leadership-panel"
        role="tabpanel"
        tabIndex={0}
        id={`leadership-panel-${activeDepartment.id}`}
        aria-labelledby={`leadership-tab-${activeDepartment.id}`}
        key={activeDepartment.id}
      >
        <div className="leadership-panel__intro">
          <p>{activeDepartment.code}</p>
          <h4>{activeDepartment.name}</h4>
          <span>{activeDepartment.description}</span>
        </div>

        <div className="leadership-panel__profiles">
          {activeDepartment.bods.map((profile) => (
            <LeadershipProfile
              key={profile.name}
              profile={profile}
              departmentName={activeDepartment.name}
              variant="department"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
