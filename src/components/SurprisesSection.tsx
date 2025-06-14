
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift, Heart, Star, Crown, Sparkles } from 'lucide-react';

const SurprisesSection = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [currentCompliment, setCurrentCompliment] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const surprises = [
    {
      id: 1,
      icon: Heart,
      title: "Why You're Irreplaceable",
      frontText: "Click to discover",
      backText: "Because in a world of copies, you are an original masterpiece. Your kindness touches hearts, your smile brightens days, and your presence makes everything better.",
      color: "from-pink-400 to-red-400"
    },
    {
      id: 2,
      icon: Star,
      title: "Your Special Powers",
      frontText: "Unlock the magic",
      backText: "You have the power to make people smile without even trying. You turn ordinary moments into memories and make everyone around you feel special.",
      color: "from-yellow-400 to-orange-400"
    },
    {
      id: 3,
      icon: Crown,
      title: "What Makes You Shine",
      frontText: "Royal secrets inside",
      backText: "Grace, wisdom, beauty, and strength – you carry them all so effortlessly. You touch hearts with kindness and inspire others simply by being yourself.",
      color: "from-purple-400 to-indigo-400"
    }
  ];

  const compliments = [
    "You are absolutely amazing! ✨",
    "Your smile is my favorite sight 😊",
    "You make everything better 💕",
    "You're incredibly special 🌟",
    "Your heart is pure gold 💛",
    "You're one in a million 👑",
    "You light up every room 🌟",
    "You're simply wonderful 💖"
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.surprise-card');
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100, rotationY: -90 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
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

  const handleCardFlip = (cardId: number) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  const getRandomCompliment = () => {
    const newIndex = Math.floor(Math.random() * compliments.length);
    setCurrentCompliment(newIndex);
    
    // Trigger confetti animation
    const button = document.querySelector('.compliment-button');
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => {
        button.classList.remove('animate-pulse');
      }, 1000);
    }
  };

  return (
    <section id="surprises" ref={sectionRef} className="py-20 px-6 animate-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Surprises for You
          </h2>
          <p className="text-xl text-white/80">
            Special messages crafted with love
          </p>
        </div>

        {/* Flip cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {surprises.map((surprise) => {
            const IconComponent = surprise.icon;
            const isFlipped = flippedCard === surprise.id;
            
            return (
              <div
                key={surprise.id}
                className="surprise-card h-80 cursor-pointer perspective-1000"
                onClick={() => handleCardFlip(surprise.id)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}>
                  {/* Front of card */}
                  <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${surprise.color} mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{surprise.title}</h3>
                    <p className="text-white/70 mb-4">{surprise.frontText}</p>
                    <Gift className="w-12 h-12 text-white/50 animate-bounce" />
                  </div>

                  {/* Back of card */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-white/15 to-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-6 flex flex-col justify-center text-center">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${surprise.color} mb-4 mx-auto`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white/90 leading-relaxed">
                      {surprise.backText}
                    </p>
                    <div className="mt-4 flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Heart key={i} className="w-4 h-4 text-pink-400 mx-1 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Random compliment generator */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Sweet Words Generator</h3>
            
            <div className="min-h-[3rem] flex items-center justify-center mb-6">
              <p className="text-xl text-pink-300 font-medium animate-fade-in">
                {compliments[currentCompliment]}
              </p>
            </div>

            <button
              onClick={getRandomCompliment}
              className="compliment-button bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              Unlock Another Compliment
              <Sparkles className="w-5 h-5" />
            </button>

            {/* Decorative elements */}
            <div className="mt-6 flex justify-center space-x-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurprisesSection;
