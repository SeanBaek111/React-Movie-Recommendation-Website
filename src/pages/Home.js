// pages/Home.js
import React from 'react';
import '../App.css';  
import HeroCarousel from '../components/HeroCarousel';
import FeaturedMovies from '../components/FeaturedMovies';

function Home() {
  return (
    <div>
      <HeroCarousel/>
      <FeaturedMovies /> 
    </div>
  );
}

export default Home;
