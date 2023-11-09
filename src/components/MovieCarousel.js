import React from 'react';
import Carousel from 'react-grid-carousel';
import MovieCard from './MovieCard';

function MovieCarousel({
  movies,
  onCardClick,
  onDetailsClick,
  selectedMovieTitles,
  cols,
  rows,
  mobileBreakpoint,
}) {
  return (
    <Carousel
      cols={cols}
      rows={rows}
      gap={1}
      mobileBreakpoint={mobileBreakpoint}
      loop={false}
      scrollSnap={true}
      className="custom-carousel"
    >
      {movies.map((movie) => (
        <Carousel.Item key={movie.id}>
          <MovieCard
            movie={movie}
            onClick={() => onCardClick(movie)}
            isSelected={selectedMovieTitles.has(movie.title)}
            handleMovieDetailsClick={onDetailsClick}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MovieCarousel;
