
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Heart, Star, Sparkles } from 'lucide-react';

const FinalMessage = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [playingStory, setPlayingStory] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate final message
    gsap.fromTo(messageRef.current,
      { opacity: 0, scale: 0.5, y: 100 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: messageRef.current,
          start: "top 80%",
          onEnter: () => setShowFireworks(true)
        }
      }
    );

    // Create floating hearts
    const createFloatingHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = '💖';
      heart.className = 'fixed text-2xl pointer-events-none z-50';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.top = '100vh';
      document.body.appendChild(heart);

      gsap.to(heart, {
        y: -100,
        x: Math.random() * 200 - 100,
        opacity: 0,
        duration: 3,
        ease: "power2.out",
        onComplete: () => heart.remove()
      });
    };

    if (showFireworks) {
      const interval = setInterval(createFloatingHeart, 300);
      setTimeout(() => clearInterval(interval), 5000);
    }
  }, [showFireworks]);

  const handlePlayStory = () => {
    setPlayingStory(true);
    
    // Create more intense animations
    const button = document.querySelector('.story-button');
    if (button) {
      gsap.to(button, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });
    }

    // Create explosion of hearts
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.className = 'fixed text-3xl pointer-events-none z-50';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(heart);

        const angle = (i / 20) * Math.PI * 2;
        const distance = 200 + Math.random() * 100;

        gsap.to(heart, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0,
          duration: 2,
          ease: "power2.out",
          onComplete: () => heart.remove()
        });
      }, i * 100);
    }

    setTimeout(() => setPlayingStory(false), 3000);
  };

  return (
    <section id="final" ref={sectionRef} className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
        {/* Floating stars */}
        {showFireworks && [...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main message */}
        <div ref={messageRef} className="mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
              <Star className="w-6 h-6 text-yellow-400 animate-bounce" />
              <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Anu
            </span>
            <br />
            <span className="text-white">
              You're the Best Part
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              of My Life
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            <p className="mb-4">❤️ Tum ho toh sab kuch hai ❤️</p>
            <p className="italic">"In your smile, I found my happiness."</p>
          </div>

          {/* Glowing decorative line */}
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full mb-12 animate-pulse"></div>
        </div>

        {/* Story button */}
        <div className="mb-16">
          <button
            onClick={handlePlayStory}
            disabled={playingStory}
            className="story-button group relative bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50"
          >
            <span className="flex items-center gap-3">
              <Play className={`w-6 h-6 ${playingStory ? 'animate-spin' : ''}`} />
              {playingStory ? 'Playing Our Beautiful Story...' : 'Play Our Story'}
              <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
            </span>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-pulse"></div>
          </button>
        </div>

        {/* Final quote cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 group hover:bg-white/15 transition-all duration-300">
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-4 group-hover:animate-pulse" />
            <blockquote className="text-white/90 italic text-lg">
              "Every day with you in my thoughts is a gift that keeps giving."
            </blockquote>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 group hover:bg-white/15 transition-all duration-300">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4 group-hover:animate-bounce" />
            <blockquote className="text-white/90 italic text-lg">
              "You're not just special - you're absolutely extraordinary."
            </blockquote>
          </div>
        </div>

        {/* Final signature */}
        <div className="mt-16 text-center">
          <p className="text-white/70 text-lg mb-4">Made with infinite love and admiration</p>
          <div className="flex justify-center items-center gap-2">
            <Heart className="w-5 h-5 text-red-400 animate-pulse" />
            <span className="text-white/60">For the most wonderful person ever</span>
            <Heart className="w-5 h-5 text-red-400 animate-pulse" />
          </div>
        </div>

        {/* Floating elements */}
        {showFireworks && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                {['💖', '✨', '🌟', '💕', '👑'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FinalMessage;
