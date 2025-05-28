
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Crown, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const crownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial animations
    tl.fromTo(nameRef.current, 
      { opacity: 0, scale: 0.5, rotationY: -180 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 2, ease: "back.out(1.7)" }
    )
    .fromTo(crownRef.current,
      { opacity: 0, y: -100, rotation: -45 },
      { opacity: 1, y: 0, rotation: 0, duration: 1.5, ease: "bounce.out" }, "-=1"
    );

    // Continuous 3D rotation
    gsap.to(nameRef.current, {
      rotationY: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    gsap.to(crownRef.current, {
      rotation: 360,
      duration: 15,
      repeat: -1,
      ease: "none"
    });

    // Typewriter effect
    const text = "Every Queen deserves a Kingdom – You are mine.";
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          typewriterElement.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);
    }
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-blue-900/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Crown icon */}
        <div ref={crownRef} className="mb-8 flex justify-center">
          <Crown className="w-16 h-16 text-yellow-400 drop-shadow-2xl" />
        </div>

        {/* Main title with 3D effect */}
        <div ref={nameRef} className="mb-8 transform-gpu">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
            ANU
          </h1>
          <div className="mt-4">
            <span className="text-2xl md:text-3xl text-white/90 font-light tracking-wide">
              The Definition of Perfect
            </span>
          </div>
        </div>

        {/* Typewriter text */}
        <div className="mb-12">
          <p className="typewriter text-xl md:text-2xl text-white/80 font-light min-h-[3rem] border-r-2 border-pink-400 animate-pulse"></p>
        </div>

        {/* Glassmorphism button */}
        <button 
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-medium transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:shadow-2xl"
        >
          <span className="relative z-10 flex items-center gap-2">
            Discover Her Magic
            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
