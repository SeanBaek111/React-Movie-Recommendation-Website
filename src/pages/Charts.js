  import React, { useEffect, useState } from 'react';

  import './Charts.css'; 
  import LatestPopularMovies from '../components/LatestPopularMovies';
  import MaxRevenueMoviesChart from '../components/MaxRevenueMoviesChart';
  



  function Charts() { 
    return (
      <div className="container my-5">
      <section className='sec-a'>
        <h2 className="text-center mb-5">Latest Popular Movies</h2>
        <LatestPopularMovies /> 
      </section>
      
      <section className="sec-b">
        <h2 className="text-center mb-5">Top Lifetime Grosses</h2> 
        <MaxRevenueMoviesChart  />
      </section>
      
    
    </div> 
    );
  }

  export default Charts;
