import React, { useState }                              from 'react';
import './index.scss';

const Card = (movie) => {

  console.log(movie)
  return(
    <div className="movie-container">
      <div className="img-box">
       <img className='image' src={`https://image.tmdb.org/t/p/original${movie.movie.poster_path}`} alt={movie.movie.poster_path} />
      </div>
      
      <div className="title">{movie.movie.title}</div>
      <div className="information-box">
        <div className="release-date">{movie.movie.release_date}</div>
        <div className="vote-average">{movie.movie.vote_average}</div>
      </div>
        <div className="overview">{movie.movie.overview}</div>
    </div>
  )
}

export default Card;