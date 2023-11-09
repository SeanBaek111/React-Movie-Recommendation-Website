// MovieDetailsModal.js
 
import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
function MovieDetailsModal({ show, handleClose, movie }) {

  const [showModal, setShowModal] = useState(false);
  
  const handleSeeMore = (movie) => {
    if (movie.homepage) {
      window.open(movie.homepage, "_blank");
    } else {
      window.open(`https://www.themoviedb.org/search?query=${movie.title}`, "_blank");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{movie && movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {movie && (
          <>
            <div className="modal-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width="180px"
                height="270px"
              />
            </div>
            <p>Release date: {movie.release_date}</p>
            <p>Vote average: {movie.vote_average}</p>
            <p className="overview">Overview: {movie.overview}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleSeeMore(movie)}>
          See More
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieDetailsModal;
