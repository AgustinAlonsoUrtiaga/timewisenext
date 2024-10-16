import React from 'react';
import Image from 'next/image';
import './styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="welcome-gif-container">
        <Image
          src="/assets/gif.webp" // Asegúrate de que el archivo gif.webp esté en la carpeta "public/assets"
          alt="Welcome Monkey"
          width={500}
          height={500}
          className="welcome-gif"
          priority
        />
        <h1 className="welcome-message">My Node.js server is under maintenance, so the information on the page will be dummy data. Please accept my apologies</h1>
      </div>
    </div>
  );
};

export default HomePage;