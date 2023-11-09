import React from 'react';  

function About() {
  return (
    <div className="about-container white-text">
      <h1>About</h1>
      <div className="about-content">
        <p>Welcome to our movie recommendation site! Our goal is to help you find your next favorite movie by providing personalized recommendations based on your viewing history and preferences.</p>
       
        <img src="https://image.tmdb.org/t/p/original/4L5sGM2bJUvKrtkpfTKUTjGQGnF.jpg" alt="Movie Poster"/>
      </div>
    </div>
  );
}

export default About;
