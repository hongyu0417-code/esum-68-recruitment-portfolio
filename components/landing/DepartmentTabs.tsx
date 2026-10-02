'use client';

import { KeyboardEvent, RefObject } from 'react';
import { LeadershipDepartmentData } from '@/lib/site-config';

type DepartmentTabsProps = {
  departments: readonly LeadershipDepartmentData[];
  activeId: string;
  onChange: (id: string) => void;
  tabRefs: RefObject<(HTMLButtonElement | null)[]>;
};

export function DepartmentTabs({
  departments,
  activeId,
  onChange,
  tabRefs,
}: DepartmentTabsProps) {
  function selectTab(id: string, index: number) {
    onChange(id);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    tabRefs.current[index]?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % departments.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + departments.length) % departments.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = departments.length - 1;
    else return;

    event.preventDefault();
    const nextDepartment = departments[nextIndex];
    selectTab(nextDepartment.id, nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="leadership-tabs" role="tablist" aria-label="ESUM department leadership">
      {departments.map((department, index) => {
        const isActive = activeId === department.id;

        return (
          <button
            key={department.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            aria-label={`${department.code} ${department.name}`}
            id={`leadership-tab-${department.id}`}
            aria-selected={isActive}
            aria-controls={`leadership-panel-${department.id}`}
            tabIndex={isActive ? 0 : -1}
            className={isActive ? 'is-active' : ''}
            onClick={() => selectTab(department.id, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span>{department.code}</span>
            <strong>{department.name}</strong>
          </button>
        );
      })}
    </div>
  );
}
