import Carousel from 'react-bootstrap/Carousel';
import '../App.css';

function HeroCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100 hero-img"
          src="../assets/images/hero1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to Movie Recommender</h3>
          <p>Discover your next favorite movie with us!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 hero-img"
          src="../assets/images/hero2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Explore a world of movies</h3>
          <p>Find hidden gems and popular hits from various genres.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 hero-img"
          src="../assets/images/hero3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Personalized recommendations</h3>
          <p>Get tailored movie suggestions based on your preferences.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroCarousel;
