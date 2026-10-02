import { DepartmentsSection } from '@/components/landing/DepartmentsSection';
import { EventGallery } from '@/components/landing/EventGallery';
import { Hero } from '@/components/landing/Hero';
import { PhaseTwoSections } from '@/components/landing/PhaseTwoSections';
import { PhaseFourSections } from '@/components/landing/PhaseFourSections';
import { PhaseFiveSections } from '@/components/landing/PhaseFiveSections';
import { SiteNav } from '@/components/landing/SiteNav';
import { SiteFooter } from '@/components/landing/SiteFooter';

export default function Home() {
  return (
    <main className="recruitment-site">
      <SiteNav />
      <Hero />
      <PhaseTwoSections />
      <DepartmentsSection />
      <EventGallery />
      <PhaseFourSections />
      <PhaseFiveSections />
      <SiteFooter />
    </main>
  );
}
