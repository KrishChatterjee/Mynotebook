import {React,useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';



//Navbar component  is the navigation bar 
function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getUser();
    }
    // eslint-disable-next-line
}, [])

  //use location hook used to get the current location details
  let location = useLocation();

  const handelLogout = () => {
    localStorage.removeItem('token')
    navigate('/login');
  }

  const context = useContext(noteContext);
    const { user,getUser } = context

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
        {!localStorage.getItem('token') ? <form className="form-inline my-2 my-lg-0">
          <Link className="btn btn-success my-2 my-sm-0 mx-1" to="/login" type="submit">Login</Link>
          <Link className="btn btn-success my-2 my-sm-0 mx-1" to="/signup" type="submit">Sign Up</Link>
          </form> : <form className="form-inline my-2 my-lg-0">
             <Link className="navbar-brand" to="/">{`${user.name}`}</Link>
             <button onClick={handelLogout} className='btn btn-success my-2 my-sm-0 mx-1'>Logout</button> </form>}
      </div>
    </nav>
  )
}

export default Navbar