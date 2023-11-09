import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

function Footer() {
    const isRecommendationPage = window.location.pathname === '/recommendation'; // <-- Check if the current page is the recommendation page

  return (
    <footer className={`footer${isRecommendationPage ? ' ' : ''} mt-auto py-3 bg-dark text-white`}> 
      <Container>
        <Row>
          <Col md={4}>
            <h5>Movie Recommender</h5>
            <p>
              Discover the best movies based on your preferences and interests.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/recommendation" className="text-white">Recommendations</a></li>
              <li><a href="/charts" className="text-white">Charts</a></li>
              <li><a href="/about" className="text-white">About</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>
              Email: n11232676@qut.edu.au
            </p>
            <p>
              Phone: +61 (123) 456-7890
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
