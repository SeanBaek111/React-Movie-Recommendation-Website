import React, { useState, useEffect, useRef } from 'react';
import MovieDetailsModal from './MovieDetailsModal'; 
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { uniqBy } from 'lodash';

import './LatestPopularMovies.css';

function LatestPopularMovies( ) {

  const TMDB_API_KEY = '8186943532bbebdbe5d250147b71ddc3';
  const defaultGenres = ['Action', 'Drama'];
  const [movies, setMovies] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rawData, setRawData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);

  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (e) => {
  setSearchText(e.target.value);
};

const handleSearch = () => {
  const filterModel = { title: { type: 'contains', filter: searchText } };
  gridApi.setFilterModel(filterModel);
  const filteredRows = [];
  gridApi.forEachNodeAfterFilterAndSort((node) => {
    filteredRows.push(node.data);
  });
  const searchedMovies = filteredRows.map((movie) => ({
    ...movie
  }));
  setMovies(searchedMovies);
  setSearchText('');

   
  
};
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const cellClickedListener = (event) => {
   
    setSelectedMovieDetails(event.data);
    setShowModal(true);

  };

  const defaultOnErrorFn = useRef(window.onerror);
 
  
  useEffect(() => {
    const fetchMovies = async () => {
      const promises = [];
     
      const numPages = 102;
      for (let page = 1; page <= numPages; page++) {
        const promise = axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=release_date.desc&vote_count.gte=50&language=en-US&page=${page}`
        );
        promises.push(promise);
      }
    
      const responses = await Promise.all(promises);
      const movies = responses.flatMap((response) => response.data.results);
    
      const uniqueMovies = uniqBy(movies , 'id');
     // setMovies(uniqueMovies);
     setRawData(uniqueMovies);
    };

    fetchMovies(); 

  }, []);

  useEffect(() => {
    setMovies(rawData.map((movie) => ({
      ...movie 
    })));
  }, [rawData]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const gridOptions = {
    suppressAutoSize: true,
  };
  const columnDefs = [
    {
      headerName: 'Poster',
      field: 'poster_path',
      flex: 1,
      minWidth: 100,
      cellRenderer: (params) => (
        <img
          style={{ height: '100%' }}
          src={`https://image.tmdb.org/t/p/w92/${params.value}`}
          alt={`${params.data.title} poster`}
        />
      ),
    },
    { headerName: 'Title', field: 'title', flex: 2, sortable: true, filter: true },
    { headerName: 'Vote Average', field: 'vote_average', flex: 1, sortable: true, filter: true },
    { headerName: 'Release Date', field: 'release_date', flex: 1, sortable: true, filter: true },
  ];
  

  const rowData = rawData.map((movie) => ({ ...movie }));
  
  return (
    
    <div className="container my-5 d-flex flex-column align-items-center"> 
      <MovieDetailsModal
          show={showModal}
          handleClose={handleCloseModal}
          movie={selectedMovieDetails}
         />
       <div className="input-group my-3 search-container" >
       <input
          type="text"
          className="form-control search-input"
          placeholder="Search movies"
          value={searchText}
          onChange={handleSearchTextChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button className="btn btn-outline-secondary search-button" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="ag-theme-alpine custom-ag-theme">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={12}
          gridOptions={gridOptions}
          onCellClicked={cellClickedListener}
        ></AgGridReact>
      </div>
    </div>
  );
  
}
  export default LatestPopularMovies;
