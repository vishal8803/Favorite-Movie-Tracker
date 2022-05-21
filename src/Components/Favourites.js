import React, { Component } from 'react'


export default class Favourites extends Component {
    constructor(){
        super();
        this.state = {
            genre:[],
            currentGenre:'All Genre',
            movies:[]
        }
    }

    deleteMovie=(movieObj)=>{
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    
        let olddata = JSON.parse(localStorage.getItem('movies') || "[]")
        let tempArr = olddata.filter((m)=>{
            return m.id != movieObj.id;
        });
        let count = 0;
        let genreArr = this.state.movies
        for(let i = 0; i < genreArr.length; i++){
            if(genreids[genreArr[i].genre_ids[0]]==genreids[movieObj.genre_ids[0]]){
                count++;
            }
        }
        if(count==1){
            let temp  = this.state.genre.filter((value)=>{
                return value != genreids[movieObj.genre_ids[0]];
            })
            this.setState({
                genre: temp
            })
        }

        this.setState({
            movies:tempArr
        })
        localStorage.setItem("movies",JSON.stringify(tempArr));
    }
    pushAllDatainGenre = ()=>{
        let movie = this.state.movies
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    
        let tempArr = [];
        for(let i = 0; i < movie.length; i++){
            if(tempArr.includes(genreids[movie[i].genre_ids[0]])==false){
                tempArr.push(genreids[movie[i].genre_ids[0]]);
            }
        }
        tempArr.unshift("All Genre")
        this.setState({
            genre: tempArr
        })
    }
    componentDidMount(){
        let olddata = JSON.parse(localStorage.getItem('movies') || "[]")
        let tArr = olddata.filter((m)=>{
            return 1;
        });
        this.setState({
            movies:tArr
        },this.pushAllDatainGenre)
        
    }
    handleChangeGenre=(genre)=>{
        this.setState({
            currentGenre:genre
        })
    }
    sortPopularityDec=()=>{
        let tempArr = this.state.movies;
        tempArr.sort(function(obja, objb){
            return objb.popularity - obja.popularity;
        })
        this.setState({
            movies:[...tempArr]
        })
    }
    sortPopularityInc=()=>{
        let tempArr = this.state.movies;
        tempArr.sort(function(obja, objb){
            return obja.popularity - objb.popularity;
        })
        this.setState({
            movies:[...tempArr]
        })
    }
    sortRatingInc=()=>{
        let tempArr = this.state.movies;
        tempArr.sort(function(obja, objb){
            return obja.vote_average - objb.vote_average;
        })
        this.setState({
            movies:[...tempArr]
        })
    }
    sortRatingDec=()=>{
        let tempArr = this.state.movies;
        tempArr.sort(function(obja, objb){
            return objb.vote_average - obja.vote_average;
        })
        this.setState({
            movies:[...tempArr]
        })
    }
  render() {
    let movie = this.state.movies
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    
    
    return (
      <>
        <div className='row'>
            <div className='col-12 col-md-3 genre-list'>
                <ul className="list-group ">
                    {
                        this.state.genre.map((item)=>(
                            item===this.state.currentGenre?<li className="list-group-item" style={{backgroundColor:'#3f51b5', color:'white', fontWeight:'bolder'}}>{item}</li>:
                            <li className="list-group-item" style={{cursor:'pointer'}} onClick={()=>this.handleChangeGenre(item)}>{item}</li>
                        ))
                    }
                </ul>
            </div>
            <div className='col-12 col-md-9 genre-desc'>
                <div className='row'>
                    <div className='col-6'>
                        <input className='input-group col-6' placeholder='Search'></input>
                    </div>
                    
                    <div className='col-6'>
                        <input className='input-group col-6' placeholder='Result Size'></input>
                    </div>
                    
                    <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDec} style={{cursor:'pointer'}} />Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityInc} style={{cursor:'pointer'}} /></th>
                                <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDec} style={{cursor:'pointer'}} />Ratings<i class="fa-solid fa-sort-down" onClick={this.sortRatingInc} style={{cursor:'pointer'}} /></th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    movie.map((movieObj)=>(
                                        this.state.currentGenre=="All Genre" || genreids[movieObj.genre_ids[0]]==this.state.currentGenre?
                                        <tr>
                                            <th scope="row">
                                                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'8rem'}} ></img>
                                                &nbsp; &nbsp;{movieObj.title}</th>
                                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                                            <td>{movieObj.popularity}</td>
                                            <td>{movieObj.vote_average}</td>
                                            <td><button type="button" className="btn btn-danger" onClick={()=>this.deleteMovie(movieObj)}>Delete</button></td>
                                        </tr>:<></>
                                    ))
                                }
                            </tbody>
                        </table>
                </div>
                
            </div>    
        </div>
    
      </>
    )
  }
}
