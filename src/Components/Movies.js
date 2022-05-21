import React, { Component } from 'react'
import axios from 'axios';
import Banner from './Banner';

export default class Movies extends Component {
    constructor(){
        super();
        this.state=({
            hover:'',
            movies:[],
            parr:[1],
            currpage:1,
            favourites:[]
        })
    }

    async componentDidMount(){
        let olddata = JSON.parse(localStorage.getItem('movies') || "[]")
        let temparr = []
        olddata.map((obj)=>{
            temparr.push(obj.id)
        })
        
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ac4fc2e627e1ae81adf444ecbd9790e0&language=en-US&page=${this.state.currpage}`)
        
        let data = res.data;

        this.setState({
             movies: [...data.results],
             favourites: temparr
         })
    }

    changeMovies=async()=>{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ac4fc2e627e1ae81adf444ecbd9790e0&language=en-US&page=${this.state.currpage}`)
        
        let data = res.data;

        this.setState({
             movies: [...data.results]
         })
    }

    nextPage = ()=>{
        let len = this.state.parr.length;
        let currpage = this.state.currpage;
        let parr = this.state.parr;
        
        if(currpage==this.state.parr[len-1]){
            let temparr = [];
            if(len<5){
                for(let i = 0; i < len+1; i++){
                    temparr.push(i+1);
                }
            }else{
                for(let i = 1; i < len; i++){
                    temparr.push(parr[i]);
                }
                temparr.push(currpage+1);
            }
            this.setState({
                parr: [...temparr],
                currpage: this.state.currpage + 1
            },this.changeMovies)
        }else{
            this.setState({
                currpage: this.state.currpage + 1
            },this.changeMovies)
        }
    }

    prevpage = ()=>{
        let len = this.state.parr.length;
        let currpage = this.state.currpage;
        let parr = this.state.parr;

        if(currpage>1){
            if(parr[len-1]<=5 && parr[0]>=1){
                this.setState({
                    currpage:currpage-1
                },this.changeMovies)
            }else{
                if(currpage==parr[0]){
                    let temparr = [];
                    for(let i = 0; i < len; i++){
                        temparr.push(parr[i]-1);
                    }
                    this.setState({
                        parr:[...temparr],
                        currpage:currpage-1
                    },this.changeMovies)
                }else{
                    this.setState({
                        currpage:currpage-1
                    },this.changeMovies)
                }
            }
        }
    }

    handleClick=(pageno)=>{
        let currpage = this.state.currpage;
        if(pageno != currpage){
            this.setState({
                currpage:pageno
            },this.changeMovies)
        }
    }
    prev = "<<";
    next = ">>";
    
    handleAddFav=(movieObj)=>{
        let olddata = JSON.parse(localStorage.getItem('movies') || "[]")
        if(this.state.favourites.includes(movieObj.id)==false){
            this.setState({
                favourites:[...this.state.favourites,movieObj.id]
            })
            olddata.push(movieObj);
            localStorage.setItem("movies",JSON.stringify(olddata));
        }else{
            let tempArr = olddata.filter((m)=>{
                return m.id != movieObj.id;
            });

            localStorage.setItem("movies",JSON.stringify(tempArr));
            let favArr = this.state.favourites;
            let narr = favArr.filter((obj)=>{
                return obj != movieObj.id
            })
            this.setState({
                favourites: narr
            })
        }
        olddata = JSON.parse(localStorage.getItem('movies') || "[]")
        console.log(olddata)
    }

  render() {
    
    // alert(JSON.stringify(movie))
    return (
      <div>
          <Banner/>
          <h3 className='text-center'>Trending</h3>
          <div className='movie-list-body'>
              
            {
                this.state.movies.length==0?<div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>:
                this.state.movies.map((movieObj)=>(
                    <div key={movieObj.id} className="card movie-card rounded" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..."/>
                        <div className="card-body movie-card-body">
                            <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                            
                        </div>
                        <div>
                            {movieObj.id==this.state.hover && <a className="btn btn-primary btn-fav" onClick={()=>this.handleAddFav(movieObj)}> {this.state.favourites.includes(movieObj.id)==false?"Add to Favourites":"Remove From Favourites"} </a>}
                        
                        </div>
                    </div>
                ))
            }
            </div>
            <nav aria-label="Page navigation example" style={{display:'flex', justifyContent:'center'}}>
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" style={{cursor:'pointer'}} onClick={this.prevpage}>{this.prev}</a></li>
                    {
                        this.state.parr.map((value)=>(
                            value==this.state.currpage?<li key={value} className="page-item"><a style={{fontWeight:'bolder',cursor:'pointer',color:'white',backgroundColor:'#0d6efd'}} className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>:
                            <li key={value} className="page-item"><a style={{cursor:'pointer'}} className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                        ))
                    }
                    <li className="page-item"><a className="page-link" style={{cursor:'pointer'}} onClick={this.nextPage}>{this.next}</a></li>
                </ul>
            </nav>
      </div>
    )
  }
}
