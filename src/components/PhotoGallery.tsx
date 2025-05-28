
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaption, setShowCaption] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const photos = [
    {
      id: 1,
      caption: "The moment I realized perfection has a name - Anu",
      feeling: "My heart skipped a beat 💕"
    },
    {
      id: 2, 
      caption: "Her smile that lights up my entire world",
      feeling: "Pure happiness radiating from within ✨"
    },
    {
      id: 3,
      caption: "When she laughs, the whole universe smiles",
      feeling: "Joy overflowing in every direction 🌟"
    },
    {
      id: 4,
      caption: "Every picture tells a story of grace and beauty",
      feeling: "Endless admiration and respect 👑"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate gallery entrance
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
    setShowCaption(!showCaption);
  };

  return (
    <section id="gallery" ref={galleryRef} className="py-20 px-6 animate-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Gallery of Grace
          </h2>
          <p className="text-xl text-white/80">
            Every photo captures a piece of magic
          </p>
        </div>

        {/* Main gallery */}
        <div className="relative max-w-4xl mx-auto">
          {/* Photo container */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/20 backdrop-blur-lg group cursor-pointer"
               onClick={handlePhotoClick}>
            
            {/* Placeholder photo with beautiful gradient */}
            <div className="w-full h-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center text-white">
                <Star className="w-20 h-20 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">Beautiful Moment #{currentIndex + 1}</h3>
                <p className="text-white/80">Click to reveal what I felt</p>
              </div>
              
              {/* Floating hearts on hover */}
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

            {/* Caption overlay */}
            <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-all duration-500 ${
              showCaption ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}>
              <h4 className="text-xl font-bold text-white mb-2">
                {photos[currentIndex].caption}
              </h4>
              <p className="text-pink-300 font-medium">
                {photos[currentIndex].feeling}
              </p>
            </div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Photo indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Photo strip */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-white mb-8">More Beautiful Moments</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {photos.map((photo, index) => (
              <div 
                key={photo.id}
                onClick={() => setCurrentIndex(index)}
                className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-xl border border-white/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
              >
                <Heart className="w-8 h-8 text-white/60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
