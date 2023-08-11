import React ,{ useContext, useEffect,} from 'react';
import { Notes } from './Notes';
import { AddNote } from './AddNote';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  //use the noteContext
  const context = useContext(noteContext);
  //destructuring the notes state and the context values
  const {  getNotes } = context

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
}, [])
  
  return (
    <>
    {/* AddNote component used to add a Note */}
     <AddNote/>
      <Notes/>
    </>
  )
}

export default Home