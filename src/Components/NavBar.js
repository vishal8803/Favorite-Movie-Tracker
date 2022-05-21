import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          
        <div className="container-fluid">
          <Link to="/" style={{textDecoration:'none'}}>
            <a className="navbar-brand" >Movie App</a>
          </Link>
          <Link to="/favourites" style={{textDecoration:'none', textDecorationLine:'none', color:'grey'}}>
            <a className="nav-link"  aria-current="page" href="#">Favourites</a>
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                
              </li>
              </ul>
              </div>
              
        </div>
      </nav>
    )
  }
}
