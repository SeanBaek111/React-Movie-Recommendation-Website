import React from 'react';

function MovieCard({ movie, onClick, isSelected, handleMovieDetailsClick }) {
  return (
    <div
      className="carousel-item-container"
      onClick={onClick}
      style={{
        border: isSelected ? '2px solid #00f800' : 'none',
        backgroundColor: isSelected ? '#70f8ff' : 'transparent',
      }}
    >
      <img
        className="not-selected"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        width="180"
        height="270"
      />
      <div className="movie-title" onClick={() => handleMovieDetailsClick(movie)}>
        {movie.title.length > 30 ? `${movie.title.slice(0, 30)}...` : movie.title}
      </div>
    </div>
  );
}

export default MovieCard;
