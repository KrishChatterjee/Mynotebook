import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
    {/* wrap the entire app by notestate to use the context throughout all children */}
      <NoteState>
        {/* wrapping the all component within browser router */}
        <BrowserRouter>
        {/* Navbar is commom in all routes hence independent of Routes  */}
          <Navbar />
          {/* All the Route are wrapped within Routes  */}
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="about" element={<About />}></Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;