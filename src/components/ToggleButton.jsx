import React, { useState } from "react";
import anime from "animejs";
import "./ToggleTheme.css";

const ToggleTheme = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    // Background Color Transition
    anime({
      targets: ".background",
      backgroundColor: isDark ? "#f3e5ab" : "#121212",
      duration: 500,
      easing: "easeInOutQuad",
    });

    // Sunrays Animation
    if (isDark) {
      anime({
        targets: ".ray",
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: "+=360deg",
        duration: 800,
        easing: "easeInOutSine",
        delay: anime.stagger(100),
      });
    }

    // Particle Explosion for Toggle
    const particles = document.querySelectorAll(".particle");
    anime({
      targets: particles,
      translateX: () => anime.random(-100, 100),
      translateY: () => anime.random(-100, 100),
      scale: [1, 0],
      duration: 800,
      easing: "easeOutExpo",
      delay: anime.stagger(50),
    });
    setIsDark((prev) => !prev);
  };

  return (
    <div className='toggle-container' onClick={toggleTheme}>
      <svg
        className='toggle-icon'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100 100'
        width='100'
        height='100'
      >
        {/* SUN */}
        <circle cx='50' cy='50' r='30' fill='#f39c12' />

        {/* MOON */}
        {isDark && (
          <>
            <circle cx='50' cy='50' r='30' fill='#616161' />
            <circle cx='70' cy='50' r='30' fill='#121212' />
          </>
        )}
        <g className='rays'>
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              className='ray'
              x1='50'
              y1='15'
              x2='50'
              y2='5'
              stroke='#ad6902'
              strokeWidth='2'
              transform={`rotate(${i * 45}, 50, 50)`}
            />
          ))}
        </g>
      </svg>

      {/* Particles */}
      <div className='particles'>
        {[...Array(15)].map((_, i) => (
          <div key={i} className='particle'></div>
        ))}
      </div>

      <div className='background'></div>
      <p className={isDark ? "toggle-text-dark" : "toggle-text-light"}>
        {isDark ? "Dark Mode" : "Light Mode"}
      </p>
    </div>
  );
};

export default ToggleTheme;
