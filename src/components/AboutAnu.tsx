
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Star, Heart, Crown } from 'lucide-react';

const AboutAnu = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.quality-card');
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  const qualities = [
    { icon: Star, text: "Smart", color: "from-yellow-400 to-orange-400" },
    { icon: Heart, text: "Beautiful", color: "from-pink-400 to-red-400" },
    { icon: Crown, text: "Queen Vibes", color: "from-purple-400 to-indigo-400" },
    { icon: CheckCircle, text: "Too Special to Explain", color: "from-blue-400 to-cyan-400" }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 animate-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
            About Anu
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Some people are just born to be extraordinary. Anu is one of them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile card */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 p-8">
              {/* Placeholder for Anu's photo */}
              <div className="w-full h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-2xl mb-6 flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <p className="text-white/60">Anu's Beautiful Smile</p>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Queen Anu</h3>
                <p className="text-white/70">The most wonderful person I know</p>
              </div>

              {/* Glassmorphism overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Qualities grid */}
          <div className="space-y-6">
            {qualities.map((quality, index) => {
              const IconComponent = quality.icon;
              return (
                <div key={index} className="quality-card group">
                  <div className="flex items-center p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${quality.color} mr-4 group-hover:animate-pulse`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-1">{quality.text}</h4>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-green-400 font-medium">Verified ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quote section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
            <blockquote className="text-2xl md:text-3xl font-light text-white/90 italic mb-4">
              "In a world full of ordinary, you are my extraordinary."
            </blockquote>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAnu;
