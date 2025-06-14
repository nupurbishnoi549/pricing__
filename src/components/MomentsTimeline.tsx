import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Heart, Star, Book } from 'lucide-react';

const MomentsTimeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const moments = [
    {
      date: "shyd 19 ya 20 november",
      title: "When She Said 'Hi'",
      description: "Three letters that changed everything for me",
      icon: Book,
      color: "from-blue-400 to-purple-400"
    },
    {
      date: "20th March",
      title: "The Day She Laughed",
      description: "Her laughter became my favorite sound in the universe",
      icon: Heart,
      color: "from-pink-400 to-red-400"
    },
    {
      date: "25th April",
      title: "Her Birthday Glow",
      description: "That day, her smile outshined everything — the day this world got its brightest light",
      icon: Star,
      color: "from-yellow-400 to-orange-400"
    },
    {
      date: "Today",
      title: "Every Single Day",
      description: "She continues to be the best part of my life",
      icon: Calendar,
      color: "from-green-400 to-teal-400"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
          }
        }
      );
    });

    gsap.fromTo('.timeline-line',
      { height: 0 },
      {
        height: '100%',
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
        }
      }
    );
  }, []);

  return (
    <section id="moments" ref={timelineRef} className="py-20 px-6 animate-section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Sweet Moments
          </h2>
          <p className="text-xl text-white/80">
            A timeline of memories that make my heart smile
          </p>
        </div>

        <div className="relative">
          {/* Timeline line (always visible) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 to-pink-400 h-full timeline-line z-0"></div>

          {/* Timeline items */}
          <div className="space-y-16">
            {moments.map((moment, index) => {
              const IconComponent = moment.icon;
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className={`timeline-item flex flex-col sm:flex-row items-center sm:items-stretch ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>

                  {/* Content card */}
                  <div className={`w-full sm:w-5/12 ${isLeft ? 'sm:pr-8' : 'sm:pl-8'} mb-6 sm:mb-0`}>
                    <div className="group bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-2xl text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start mb-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${moment.color} mr-3`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-white/60 bg-white/10 px-3 py-1 rounded-full">
                          {moment.date}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                        {moment.title}
                      </h3>

                      <p className="text-white/70 leading-relaxed">
                        {moment.description}
                      </p>

                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center sm:justify-start">
                        <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="w-full sm:w-2/12 flex justify-center relative z-10 mb-6 sm:mb-0">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${moment.color} border-4 border-black relative`}>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-ping"></div>
                    </div>
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden sm:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3">
            <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
            <span className="text-white/80">More beautiful moments to come...</span>
            <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MomentsTimeline;
