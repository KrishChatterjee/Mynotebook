import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import { Login } from './components/Login';
import { Signup } from './components/Signup';



function App() {
  return (
    <>
      {/* wrap the entire app by notestate to use the context throughout all children */}
      <NoteState>
        {/* wrapping the all component within browser router */}
        <BrowserRouter>
          {/* Navbar is commom in all routes hence independent of Routes  */}
          <Navbar />
          {/* Alert just after navbar with message as props */}
          <Alert message="hiii"/>
          {/* All the Route are wrapped within Routes  */}
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="about" element={<About />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="signup" element={<Signup/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
