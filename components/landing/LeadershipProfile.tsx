import { CSSProperties } from 'react';
import { LeadershipProfileData } from '@/lib/site-config';

type LeadershipProfileProps = {
  profile: LeadershipProfileData;
  departmentName?: string;
  variant?: 'featured' | 'supporting' | 'department';
};

export function LeadershipProfile({
  profile,
  departmentName,
  variant = 'supporting',
}: LeadershipProfileProps) {
  const details = [profile.year, profile.discipline].filter(Boolean);
  const photoStyle = {
    '--profile-position': profile.photoPosition,
    '--profile-position-mobile': profile.photoPositionMobile ?? profile.photoPosition,
  } as CSSProperties;

  return (
    <article className={`leadership-profile leadership-profile--${variant}`}>
      {profile.photo ? (
        <div className="leadership-profile__photo">
          <img
            src={profile.photo}
            alt={`${profile.name}, ${profile.role} of ESUM 68`}
            width="2160"
            height="2700"
            loading="lazy"
            decoding="async"
            style={photoStyle}
          />
        </div>
      ) : null}
      <div className="leadership-profile__body">
        <p className="leadership-profile__role">{profile.role}</p>
        <h4 title={profile.name}>{profile.name}</h4>
        {departmentName ? <p className="leadership-profile__department">{departmentName}</p> : null}
        {details.length > 0 ? (
          <p className="leadership-profile__details">{details.join(' · ')}</p>
        ) : null}
      </div>
    </article>
  );
}
