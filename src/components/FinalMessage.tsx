import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Heart, Star, Sparkles } from 'lucide-react';

const FinalMessage = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [playingStory, setPlayingStory] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      messageRef.current,
      { opacity: 0, scale: 0.5, y: 100 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: messageRef.current,
          start: 'top 80%',
          onEnter: () => setShowFireworks(true),
        },
      }
    );

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
        ease: 'power2.out',
        onComplete: () => heart.remove(),
      });
    };

    if (showFireworks) {
      const interval = setInterval(createFloatingHeart, 300);
      setTimeout(() => clearInterval(interval), 5000);
    }
  }, [showFireworks]);

  const handlePlayStory = () => {
    setPlayingStory(true);
    setShowVideo(true);

    if (audioRef.current) {
      audioRef.current.play();
    }

    const button = document.querySelector('.story-button');
    if (button) {
      gsap.to(button, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });
    }

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
          ease: 'power2.out',
          onComplete: () => heart.remove(),
        });
      }, i * 100);
    }

    setTimeout(() => setPlayingStory(false), 3000);
  };

  return (
    <section
      id="final"
      ref={sectionRef}
      className="min-h-screen py-16 px-4 sm:px-6 md:px-10 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
        {showFireworks &&
          [...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-2 sm:px-6">
        <div ref={messageRef} className="mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 animate-pulse" />
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-bounce" />
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight px-2 sm:px-0">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Reena
            </span>
            <br />
            <span className="text-white">You Light Up My World</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              With Your Smile & Soul
            </span>
          </h1>

          <div className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 font-light px-2 sm:px-0">
            <p className="mb-5">😄 Teri smile dekh ke to mirror bhi sharma jaaye... aur filter bole, “Main kya karu fir?” 😍✨</p>
            <p className="italic">
              "Tu bas hasti reh... duniya ka stress bhi tujhe dekh ke resign de dega!" 🌍😜
            </p>
          </div>

          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full mb-12 animate-pulse"></div>
        </div>

        <div className="mb-16 px-2 sm:px-0">
          {!showVideo && (
            <button
              onClick={handlePlayStory}
              disabled={playingStory}
              className="story-button group relative w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-3">
                <Play className={`w-5 h-5 sm:w-6 sm:h-6 ${playingStory ? 'animate-spin' : ''}`} />
                {playingStory ? 'Playing Our Beautiful Story...' : 'Play Our Story'}
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-pulse"></div>
            </button>
          )}

          {showVideo && (
            <div className="mt-10">
              <video
                controls
                autoPlay
                className="mx-auto w-full max-w-[90vw] sm:max-w-2xl md:max-w-3xl rounded-xl shadow-lg"
              >
                <source src="public/reena.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <button
                onClick={() => {
                  setShowVideo(false);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }}
                className="w-full mt-7 sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                ⬅️ Go Back
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto px-2 sm:px-0">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 sm:p-6 group hover:bg-white/15 transition-all duration-300">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-pink-400 mx-auto mb-4 group-hover:animate-pulse" />
            <blockquote className="text-white/90 italic text-base sm:text-lg">
              "With you, time just flies away — jaise Netflix ka episode, ek ke baad ek chalta! 🍿😄"
            </blockquote>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 sm:p-6 group hover:bg-white/15 transition-all duration-300">
            <Star className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-4 group-hover:animate-bounce" />
            <blockquote className="text-white/90 italic text-base sm:text-lg">
              "Reena, tu sirf pyari nahi – Bahut pyari hai🫣."
            </blockquote>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/70 text-base sm:text-lg mb-4">Crafted with all my love and memories</p>
          <div className="flex flex-wrap justify-center items-center gap-2 px-2">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 animate-pulse" />
            <span className="text-white/60 text-sm sm:text-base">Tere jaisa koi nahi, Priye Padosn ❤️</span>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 animate-pulse" />
          </div>
        </div>

        {showFireworks && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute text-xl sm:text-2xl animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                {['💖', '✨', '🌟', '💕', '🥰'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}
      </div>

      <audio ref={audioRef}>
        <source src="/music/love-theme.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </section>
  );
};

export default FinalMessage;
