import React from 'react'

import { Link, useLocation } from 'react-router-dom'


//Navbar component  is the navigation bar 
function Navbar() {
  //use location hook used to get the current location details
  let location = useLocation();

  // React.useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);

  return (
    <nav className="navbar navbar navbar-expand-lg navbar-light" style={{ "backgroundColor": "#e3f2fd" }}>
      <Link className="navbar-brand" to="/">MyNotebook</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${location.pathname === '/' ? "active" : ""}`}>
            <Link className="nav-link " to="/">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className={`nav-item ${location.pathname === '/about' ? "active" : ""}`} >
            <Link className="nav-link " to="about">About <span className="sr-only">(current)</span></Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar