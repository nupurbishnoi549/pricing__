
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Heart } from 'lucide-react';

const FloatingElements = () => {
  useEffect(() => {
    // Create floating heart trail that follows mouse
    let mouseX = 0;
    let mouseY = 0;
    const hearts: HTMLElement[] = [];

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = '💖';
      heart.className = 'fixed pointer-events-none z-40 text-lg';
      heart.style.left = mouseX + 'px';
      heart.style.top = mouseY + 'px';
      document.body.appendChild(heart);
      hearts.push(heart);

      gsap.fromTo(heart, 
        { scale: 0, opacity: 1 },
        { 
          scale: 1.5, 
          opacity: 0, 
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            heart.remove();
            hearts.splice(hearts.indexOf(heart), 1);
          }
        }
      );

      // Limit number of hearts
      if (hearts.length > 20) {
        const oldHeart = hearts.shift();
        if (oldHeart) {
          oldHeart.remove();
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create heart occasionally
      if (Math.random() < 0.1) {
        createHeart();
      }
    };

    // Floating A monogram
    const createMonogram = () => {
      const monogram = document.createElement('div');
      monogram.innerHTML = 'Reena💖';
      monogram.className = 'fixed pointer-events-none z-30 text-6xl font-bold text-pink-400/20 select-none';
      monogram.style.left = Math.random() * window.innerWidth + 'px';
      monogram.style.top = window.innerHeight + 'px';
      document.body.appendChild(monogram);

      gsap.to(monogram, {
        y: -window.innerHeight - 100,
        rotation: 360,
        opacity: 0,
        duration: 8,
        ease: "power1.out",
        onComplete: () => monogram.remove()
      });
    };

    // Create monogram every few seconds
    const monogramInterval = setInterval(createMonogram, 5000);

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(monogramInterval);
      hearts.forEach(heart => heart.remove());
    };
  }, []);

  return (
    <>
      {/* Fixed floating elements */}
      <div className="fixed top-20 right-10 z-30 animate-bounce" style={{ animationDuration: '3s' }}>
        <Heart className="w-8 h-8 text-pink-400/30" />
      </div>
      
      <div className="fixed bottom-20 left-10 z-30 animate-pulse" style={{ animationDuration: '2s' }}>
        <div className="text-4xl text-purple-400/20 font-bold select-none">R</div>
      </div>

      <div className="fixed top-1/3 left-20 z-30 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        <div className="text-2xl text-yellow-400/20 select-none">✨</div>
      </div>

      <div className="fixed bottom-1/3 right-20 z-30 animate-pulse" style={{ animationDuration: '3s', animationDelay: '2s' }}>
        <div className="text-3xl text-pink-400/20 select-none">👑</div>
      </div>
    </>
  );
};

export default FloatingElements;
