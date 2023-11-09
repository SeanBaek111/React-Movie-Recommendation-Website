import React, { useEffect, useState } from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import axios from 'axios';

function FeaturedMovies() {
  const TMDB_API_KEY = '8186943532bbebdbe5d250147b71ddc3';
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&vote_count.gte=500&language=en-US&page=1`
      );
      const movies = response.data.results.slice(0, 3);
      setMovies(movies);
    };
    fetchMovies();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Featured Movies</h2>
      <CardGroup>
        {movies.map((movie) => (
          <Card key={movie.id}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>Genre: {movie.genre}</Card.Text>
              <Card.Text>Rating: {movie.vote_average}/10</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}

export default FeaturedMovies;
