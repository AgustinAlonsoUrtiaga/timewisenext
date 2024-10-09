import React from 'react';
import './styles/HomePage.css';
import Image from 'next/image';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="welcome-gif-container">
          <Image
          src="/assets/gif.webp"
          alt="Welcome Monkey"
          width={500}
          height={500}
          className="welcome-gif"
          priority
        />
        <h1 className="welcome-message">Hola, bienvenido a TimeWise!</h1>
      </div>
    </div>
  );
};

export default HomePage;