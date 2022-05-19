import React, { Component } from 'react'
import { movies } from './getMoviesJSON'

export default class Movies extends Component {
    constructor(){
        super();
        this.state=({
            hover:'',
            parr: [1]
        })
    }

  render() {
    let movie = movies.results;
    // alert(JSON.stringify(movie))
    return (
      <div>
          <h3 className='text-center'>Trending</h3>
          <div className='movie-list-body'>
              
            {
                movie.map((movieObj)=>(
                    <div key={movieObj.id} className="card movie-card rounded" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..."/>
                        <div className="card-body movie-card-body">
                            <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                            
                        </div>
                        <div>
                            {movieObj.id==this.state.hover && <a class="btn btn-primary btn-fav">Add to Favourites</a>}
                        
                        </div>
                    </div>
                ))
            }
            </div>
            <nav aria-label="Page navigation example" style={{display:'flex', justifyContent:'center'}}>
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    {
                        this.state.parr.map((value)=>(
                            <li key={value} className="page-item"><a className="page-link" href="#">{value}</a></li>
                        ))
                    }
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
      </div>
    )
  }
}
