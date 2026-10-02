import { DepartmentLeadership } from './DepartmentLeadership';
import { HighCommitteeGrid } from './HighCommitteeGrid';
import { Reveal } from './Reveal';

type TeamSectionProps = {
  initialDepartmentId?: string;
};

export function TeamSection({ initialDepartmentId }: TeamSectionProps) {
  return (
    <section className="team-section landing-section" id="our-team" aria-labelledby="our-team-title">
      <div className="landing-section__inner">
        <Reveal className="team-section__heading">
          <h2 id="our-team-title">Meet the people behind ESUM 68.</h2>
          <p>Get to know the student leaders guiding the society, supporting each department, and turning ideas into meaningful experiences.</p>
        </Reveal>

        <HighCommitteeGrid />

        <Reveal delay={80}>
          <DepartmentLeadership initialDepartmentId={initialDepartmentId} />
        </Reveal>
      </div>
    </section>
  );
}
