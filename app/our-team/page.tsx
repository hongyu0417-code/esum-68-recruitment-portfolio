import type { Metadata } from 'next';
import { SiteNav } from '@/components/landing/SiteNav';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { TeamSection } from '@/components/landing/TeamSection';

export const metadata: Metadata = {
  title: 'Our Team | ESUM 68 Executive Recruitment',
  description: 'Meet the ESUM 68 High Committee and the Board of Directors guiding each department.',
};

type OurTeamPageProps = {
  searchParams: Promise<{ department?: string }>;
};

export default async function OurTeamPage({ searchParams }: OurTeamPageProps) {
  const { department } = await searchParams;

  return (
    <main className="recruitment-site team-page">
      <SiteNav isSubpage />
      <TeamSection initialDepartmentId={department} />
      <SiteFooter />
    </main>
  );
}
