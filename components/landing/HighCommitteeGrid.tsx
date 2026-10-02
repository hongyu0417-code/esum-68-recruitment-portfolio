import { highCommittee } from '@/lib/site-config';
import { LeadershipProfile } from './LeadershipProfile';
import { Reveal } from './Reveal';

export function HighCommitteeGrid() {
  const featuredProfiles = highCommittee.slice(0, 2);
  const supportingProfiles = highCommittee.slice(2);

  return (
    <div className="high-committee" aria-labelledby="high-committee-title">
      <Reveal className="high-committee__heading">
        <h3 id="high-committee-title">High Committee</h3>
      </Reveal>

      <div className="high-committee__featured">
        {featuredProfiles.map((profile, index) => (
          <Reveal key={profile.name} delay={index * 70}>
            <LeadershipProfile profile={profile} variant="featured" />
          </Reveal>
        ))}
      </div>

      <div className="high-committee__supporting">
        {supportingProfiles.map((profile, index) => (
          <Reveal key={profile.name} delay={index * 55}>
            <LeadershipProfile profile={profile} variant="supporting" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
