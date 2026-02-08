import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

// More variety including teddies, roses, butterflies, stars
const emojis = ['❤️', '💕', '💗', '🧸', '💖', '🌹', '✨', '💝', '🦋', '⭐', '🌸', '💫', '🎀', '🍫', '💌'];

const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create more particles for fuller effect
    const items: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 8, // Slower, more gentle
      size: 12 + Math.random() * 16, // Slightly smaller for subtlety
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute opacity-40" // Lighter opacity for subtlety
          style={{
            left: `${p.left}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            animation: `rise ${p.duration}s linear ${p.delay}s infinite`,
            filter: 'blur(0.5px)', // Subtle blur for dreaminess
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingParticles;
