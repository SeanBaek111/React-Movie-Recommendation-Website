import React, { useState, useEffect } from 'react';

function MovieDetail(props) {
  const [movie, setMovie] = useState(null);
  const movieId = props.match.params.id; 

  const TMDB_API_KEY = '8186943532bbebdbe5d250147b71ddc3';
  useEffect(() => {
   
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => setMovie(data));
  }, [movieId]);  

  if (!movie) {
    return <div>Loading...</div>; 
  }
 
  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title} poster`} />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Vote Average: {movie.vote_average}</p>
    </div>
  );
}

export default MovieDetail;
