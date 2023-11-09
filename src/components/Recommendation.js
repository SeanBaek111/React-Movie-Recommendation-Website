import MovieDetailsModal from './MovieDetailsModal'; 
import MovieCard from './MovieCard';
import MovieCarousel from './MovieCarousel';
import AlertMessage from './AlertMessage';
import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { uniqBy } from 'lodash';
import './Recommendation.css';
import Carousel from 'react-grid-carousel';
import { Alert, Modal, Spinner, Button } from 'react-bootstrap';
import lottie from 'lottie-web';
function Recommendation() {  
  const TMDB_API_KEY = '8186943532bbebdbe5d250147b71ddc3';
  const GPT_API_KEY = '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';  

  const recommendedMoviesRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);

  const [movies, setMovies] = useState([]);
  const [selectedMovieTitles, setSelectedMovieTitles] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const animationContainer = useRef(null);

  useEffect(() => {
    let animationInstance;
  
    if (animationContainer.current) {
      animationInstance = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: 'https://assets10.lottiefiles.com/packages/lf20_cbrbre30.json', 
      });
  
      if (isLoading) {
        animationInstance.play();
      } else {
        animationInstance.stop();
      }
    }
  
    return () => {
      if (animationInstance) {
        animationInstance.destroy();
      }
    };
  }, [isLoading]);

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showAlert]);

  const handleSeeMore = (movie) => {
    if (movie.homepage) {
      window.open(movie.homepage, "_blank");
    } else {
      window.open(`https://www.themoviedb.org/search?query=${movie.title}`, "_blank");
    }
  };
  
  const showSelectedMovies = () => {
    alert(`Selected Movies: ${Array.from(selectedMovieTitles).join(', ')}`);
  };

  useEffect(() => {
    if (recommendedMovies.length > 0 && recommendedMoviesRef.current) {
      recommendedMoviesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [recommendedMovies]);

  const handleMovieDetailsClick = (movie) => {
    setSelectedMovieDetails(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
 
  const showRecommendedMovies = async () => {
    if (selectedMovieTitles.size === 0) {
      setShowAlert(true);
      return;
    }
    setIsLoading(true);
    const recommendedMovieTitles = await getRecommendedMovies(
      Array.from(selectedMovieTitles)
    );

    const reducedArray = JSON.stringify(recommendedMovieTitles)
 
    async function fetchMovieDetails(recommendedMovieTitles) {
      const movieDetails = [];
      let movieArray = null;
      if (typeof recommendedMovieTitles === 'string') {
        movieArray = Object.values(recommendedMovieTitles.movies);
      }
      else{
        movieArray = recommendedMovieTitles.movies;
      }
     
      for (const movieId in movieArray) {
        const movie = movieArray[movieId];
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
              movie.title
            )}&year=${movie.release_year}`
          );
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          const data = await response.json();
    
          if (data.results.length > 0) {
            movieDetails.push(data.results[0]);
          } else {
            movieDetails.push({
              title: `${movie.title} (${movie.release_year})`,
              id: `not-found-${movie.title}-${movie.release_year}`,
              poster_path: null,
            });
          }
        } catch (error) {
          setIsLoading(false);
         
          console.error("Error fetching movie details:", error);
          movieDetails.push({
            title: `${movie.title} (${movie.release_year})`,
            id: `not-found-${movie.title}-${movie.release_year}`,
            poster_path: null,
          });
        }
      }
    
      return movieDetails;
    }
    
    
    console.log("Recommended movie titles:", recommendedMovieTitles);

    
    const movieDetails = await fetchMovieDetails(recommendedMovieTitles);

    setRecommendedMovies(movieDetails);
    setIsLoading(false);
  };

  
useEffect(() => {
  let timer;
  if (showErrorAlert) {
    timer = setTimeout(() => {
      setShowErrorAlert(false);
    }, 3000);
  }

  return () => {
    clearTimeout(timer);
  };
}, [showErrorAlert]);
  
useEffect(() => {
  const fetchMovies = async () => {
    try {
      const allPromises = Array.from({ length: 5 }, (_, i) =>
        axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=8186943532bbebdbe5d250147b71ddc3&sort_by=release_date.desc&vote_count.gte=50&language=en-US&page=${i + 1}`
        )
      );

      const responses = await Promise.all(allPromises);
      const movies = responses.flatMap((response) => response.data.results);

      const uniqueMovies = uniqBy(movies, 'id');
      setMovies(uniqueMovies);
      setIsLoadingInit(false);
    } catch (error) {
      console.error('Failed to fetch movies', error);
    }
  };

  fetchMovies();
}, []);

  const toggleSelectedMovie = (movie) => {
    const updatedSelectedMovieTitles = new Set(selectedMovieTitles);

    if (selectedMovieTitles.has(movie.title)) {
      updatedSelectedMovieTitles.delete(movie.title);
    } else {
      updatedSelectedMovieTitles.add(movie.title);
    }

    setSelectedMovieTitles(updatedSelectedMovieTitles);
  };
  
  const getRecommendedMovies = async (selectedMovieTitles) => {
    try {
       

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
       //   model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: `Based on these movies: ${selectedMovieTitles.join(
                ', '
              )}, please recommend 10 movies always as a JSON object with their titles and release years. Don't add "Sorry, as an AI language model,..." just json please`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GPT_API_KEY}`,
          },
        }
      );

      console.log(response.data.choices[0].message.content);
      const recommendedMovies = JSON.parse(response.data.choices[0].message.content);
      return recommendedMovies;
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Error fetching recommendations. Please try again later.');
      setShowErrorAlert(true);
      console.error('Error fetching recommendations:', error);
      return [];
    }
  };
  
  return (
    <div> 
      {isLoading && (
        <>
          <div className="overlay"></div>
          <div className="animation-container" ref={animationContainer}></div>
        </>
      )}
       {showAlert && (
        <AlertMessage
          variant="warning"
          heading="Warning"
          message="Please select at least one movie before requesting recommendations."
          onClose={() => setShowAlert(false)}
        />
      )}
      {showErrorAlert && (
        <AlertMessage
          variant="danger"
          heading="Error"
          message={errorMessage}
          onClose={() => setShowErrorAlert(false)}
        />
      )}
      <section className="movie-list-select">
        <div className="carousel-container">
          <h3>Select Movies</h3>
          {isLoadingInit ? <strong className='white-text'>Loading...</strong> : null} 
          <MovieDetailsModal
          show={showModal}
          handleClose={handleCloseModal}
          movie={selectedMovieDetails}
          handleSeeMore={handleSeeMore}
         />
         <MovieCarousel
          movies={movies}
          onCardClick={toggleSelectedMovie}
          onDetailsClick={handleMovieDetailsClick}
          selectedMovieTitles={selectedMovieTitles}
          cols={5}
          rows={2}
          mobileBreakpoint={[
            { mobileBreakpoint: 1000, cols: 3 },
            { mobileBreakpoint: 750, cols: 2, rows: 1, gap: 5 },
            { mobileBreakpoint: 499, autoplay: 2000, loop: true },
          ]}
        />
          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="submit-button"
            onClick={showRecommendedMovies}
          >
            Show Recommended Movies
          </Button>
        </div>
      </section>
 
      <section className="movie-list-recommendation">
        <div className="carousel-container" ref={recommendedMoviesRef}>
          <h3>Recommended Movies</h3>
          <MovieCarousel
            movies={recommendedMovies}
            onCardClick={(movie) => handleMovieDetailsClick(movie)}
            onDetailsClick={handleMovieDetailsClick}
            selectedMovieTitles={new Set()}
            cols={5}
            rows={2}
            mobileBreakpoint={[
              { mobileBreakpoint: 1000, cols: 3 },
              { mobileBreakpoint: 750, cols: 2, rows: 1, gap: 5 },
              { mobileBreakpoint: 499, autoplay: 2000, loop: true },
            ]}
          />
        </div> 
        </section>
      </div>
    
  );
}

export default Recommendation;