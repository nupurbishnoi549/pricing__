import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Smile, Heart, Crown, Star, Users } from 'lucide-react';

const AboutReena = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.quality-card');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: index % 2 === 0 ? -120 : 120, scale: 0.85 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.25,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  const qualities = [
    { icon: Smile, text: "The Brightest Smile", color: "from-yellow-400 to-pink-400" },
    { icon: Star, text: "Beautiful Inside Out", color: "from-pink-400 to-red-400" },
    { icon: Crown, text: "Queen of All Hearts", color: "from-purple-400 to-indigo-400" },
    { icon: Users, text: "Our Forever Neighbor", color: "from-green-400 to-teal-400" },
    { icon: Sparkles, text: "Everyone’s Favorite", color: "from-orange-400 to-yellow-400" },
  ];

  return (
    <section id="about-reena" ref={sectionRef} className="py-20 px-6 animate-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-6">
            About Reena
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Every group has someone who quietly holds it together — in ours, that's Reena.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile card */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 p-8">
              {/* Reena's Photo */}
              <div className="w-full h-80 rounded-2xl mb-4 overflow-hidden border border-white/10 shadow-lg">
                <img
                  src="public/reena-1.png"
                  alt="Reena"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="text-white/60 text-center mb-4">Reena’s Signature Smile</p>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Reena 👑</h3>
                <p className="text-white/70">
                  The one who makes every moment a little brighter, just by being there.
                </p>
              </div>

              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Qualities grid */}
          <div className="space-y-6">
            {qualities.map((quality, index) => {
              const Icon = quality.icon;
              return (
                <div key={index} className="quality-card group">
                  <div className="flex items-center p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${quality.color} mr-4 group-hover:animate-pulse`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-1">{quality.text}</h4>
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 text-pink-400 mr-2" />
                        <span className="text-pink-400 font-medium">Verified by Love</span>
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
              "Without Reena, our best memories wouldn't have felt the same."
            </blockquote>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutReena;
