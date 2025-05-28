
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import AboutAnu from '@/components/AboutAnu';
import MomentsTimeline from '@/components/MomentsTimeline';
import PhotoGallery from '@/components/PhotoGallery';
import SurprisesSection from '@/components/SurprisesSection';
import FinalMessage from '@/components/FinalMessage';
import FloatingElements from '@/components/FloatingElements';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll-triggered animations
    const sections = document.querySelectorAll('.animate-section');
    
    sections.forEach((section) => {
      gsap.fromTo(section, 
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black text-white overflow-x-hidden">
      <Navigation />
      <FloatingElements />
      
      <main>
        <HeroSection />
        <AboutAnu />
        <MomentsTimeline />
        <PhotoGallery />
        <SurprisesSection />
        <FinalMessage />
      </main>
    </div>
  );
};

export default Index;
