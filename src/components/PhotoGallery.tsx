import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import reena1 from '../assets/images/reennaaa.jpeg'
import reena2 from '../assets/images/reena-13.png'
import reena3 from '../assets/images/reena-lhnga.jpeg'
import reena4 from '../assets/images/reena-4.png'
import reena5 from '../assets/images/reena-5.png'
import reena6 from '../assets/images/reena-6.png'
import reena7 from '../assets/images/chotu-bcha.jpeg'

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaption, setShowCaption] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const photos = [
    {
      id: 1,
      caption: "On her birthday, she smiled like the universe celebrated too ✨",
      feeling: "25 April – the day the stars seemed shy 🌸",
      image: reena1,
    },
    {
      id: 2,
      caption: "Every picture of her is a poem written in light 💖",
      feeling: "She doesn’t just smile, she creates sunrises 🌅",
      image: reena2,
    },
    {
      id: 3,
      caption: "With Reena, every ordinary moment becomes magical 🌟",
      feeling: "A hug in her vibe, a spark in her eyes 💫",
      image: reena3,
    },
    {
      id: 4,
      caption: "She’s not just a friend, she’s the celebration itself 🎉",
      feeling: "The joy of friendship in one soul 💕",
      image: reena4,
    },
    {
      id: 5,
      caption: "That smile? It could start revolutions or heal worlds 💥",
      feeling: "Caught between laughter and awe 😍",
      image: reena5 ,
    },
    {
      id: 6,
      caption: "Even mischief looks adorable when it’s her doing it 😜",
      feeling: "The cute chaos we all love 💫",
      image: reena6 ,
    },
    {
      id: 7,
      caption: "Pure elegance wrapped in charm ✨",
      feeling: "A memory painted in soft hues 💗",
      image: reena7 ,
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(galleryRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setShowCaption(false);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setShowCaption(false);
  };

  const handlePhotoClick = () => {
    setShowCaption(true);
  };

  return (
    <section
      id="gallery"
      ref={galleryRef}
      className="py-20 px-4 sm:px-6 animate-section bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/public/starry-texture.png')] bg-cover opacity-10 pointer-events-none mix-blend-soft-light"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent mb-4">
            Gallery of Grace
          </h2>
          <p className="text-base sm:text-lg text-white/80">Every photo captures a piece of magic</p>
        </div>

        {/* Main Gallery */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/20 backdrop-blur-lg group cursor-pointer"
            onClick={handlePhotoClick}
          >
            {showCaption ? (
              <img
                src={photos[currentIndex].image}
                alt={`Photo ${currentIndex + 1}`}
                className="w-full h-full  object-contain transition-opacity duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center text-white p-4">
                  <Star className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-3" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">Beautiful Moment #{currentIndex + 1}</h3>
                  <p className="text-white/80 text-sm sm:text-base">Click to reveal what I felt</p>
                </div>

                {/* Floating hearts */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(8)].map((_, i) => (
                    <Heart
                      key={i}
                      className="absolute w-6 h-6 text-pink-300 animate-bounce"
                      style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Caption */}
            {showCaption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 backdrop-blur-md shadow-xl transition-all duration-500">
                <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
                  {photos[currentIndex].caption}
                </h4>
                <p className="text-pink-300 text-sm sm:text-base">{photos[currentIndex].feeling}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <button
            onClick={prevPhoto}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-2 sm:p-3 text-white hover:bg-white/20 transition duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-2 sm:p-3 text-white hover:bg-white/20 transition duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2 sm:space-x-3">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowCaption(false);
                }}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Photo strip */}
        <div className="mt-14">
          <h3 className="text-lg sm:text-2xl font-bold text-center text-white mb-6">More Beautiful Moments</h3>
          <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 sm:pb-4 justify-start sm:justify-center scrollbar-hide">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowCaption(false);
                }}
                className="flex-shrink-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-xl border border-white/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
              >
                <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-white/60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
