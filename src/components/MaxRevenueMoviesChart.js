import React, { useEffect, useState, useRef } from 'react' 
import { Bar, Line } from "react-chartjs-2";
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
//import BarChart from '../components/BarChart';
import { uniqBy } from 'lodash';
function MaxRevenueMoviesChart() {
  const chartRef = useRef();
  
  const TMDB_API_KEY = '8186943532bbebdbe5d250147b71ddc3';
    
 
 
  const [movies, setMovies] = useState([]);

    useEffect(() => {
      // Fetch popular movie data and update the state
      const fetchTopRevenueMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=revenue.desc&include_adult=true&include_video=false&page=1`
          );
  
          const topMovies = response.data.results.slice(0, 20);
          const moviePromises = topMovies.map((movie) =>
            axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US`
            )
          );
          const movieResponses = await Promise.all(moviePromises);
          const movieData = movieResponses.map((response) => response.data);
  
          setMovies(movieData);
        } catch (error) {
          console.error(error);
        }
      };
      fetchTopRevenueMovies();
    }, []);
  
    
if( movies.length === 0) return null;   

  

  const sortedData = movies
    .filter((movie) => movie.revenue !== 0)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 20)
    .reverse();

    const chartData = {
        labels: sortedData.map((movie) => movie.title),
        datasets: [
          {
            label: 'Revenue (USD)',
            data: sortedData.map((movie) => movie.revenue  ),
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        scales: {
          y: {
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                return value / 1000000 + ' M';
              },
            },
          },
        },
      };
    
      return <Bar ref={chartRef} data={chartData} options={options} />;
}

export default MaxRevenueMoviesChart;
