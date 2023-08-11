//Notes component map and displays all Noteitems
import React, { useContext, useState, useRef, useEffect} from 'react'
import noteContext from '../context/notes/noteContext';
import { Noteitem } from './Noteitem';
import { Modal } from './Modal';
import { useNavigate } from 'react-router-dom';




export const Notes = () => {
    //use the noteContext
    const context = useContext(noteContext);
    //destructuring the notes state and the context values
    const { notes,getNotes } = context

    const navigate = useNavigate();
    
    const refOpen = useRef(null);
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
          }
          else{
            navigate('/login')
          }
        // eslint-disable-next-line
    }, [])



    const [enote, setEnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })



    //set the edit enote to current note 
    const editNote = (currentNote) => {       
        setEnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        setEnote((state) => {
            return state;
          });
        refOpen.current.click()

    }


    return (
        <>
            <Modal enote={enote} setEnote={setEnote} refOpen={refOpen} />
            <h2>Your Notes</h2>
            <div className="container row my-3 ">
                <div className="container">
                    {notes.length === 0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {
                    //sent each note as props and for uniqueness key is sent
                    return <Noteitem key={note._id} note={note} editNote={editNote} />
                })}
            </div>
        </>
    )
}
