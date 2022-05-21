import React, { Component } from 'react'

export default class Banner extends Component {
  render() {
    let movie = {"adult":false,"backdrop_path":"/7WJjFviFBffEJvkAms4uWwbcVUk.jpg","genre_ids":[12,14,35,28],"id":451048,"original_language":"en","original_title":"Jungle Cruise","overview":"Dr. Lily Houghton enlists the aid of wisecracking skipper Frank Wolff to take her down the Amazon in his dilapidated boat. Together, they search for an ancient tree that holds the power to heal – a discovery that will change the future of medicine.","popularity":2422.668,"poster_path":"/9dKCd55IuTT5QRs989m9Qlb7d2B.jpg","release_date":"2021-07-28","title":"Jungle Cruise","video":false,"vote_average":7.9,"vote_count":2517};
    
    return (
        <>
        <div className="card mb-3 rounded-0 border-dark">
        <img  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt={movie.original_title} />
        <div className="card-body banner-body">
          <h5 className="card-title banner-title">{movie.original_title}</h5>
          <p className="card-text banner-text">{movie.overview}</p>
        </div>
      </div>
      </>
    )
  }
}
