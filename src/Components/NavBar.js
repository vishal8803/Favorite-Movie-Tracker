import React, { Component } from 'react'

export default class NavBar extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Movie App</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" color='red' aria-current="page" href="#">Favourites</a>
              </li>
              </ul>
              </div>
              
        </div>
      </nav>
    )
  }
}
