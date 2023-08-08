import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { Noteitem } from './Noteitem';

//Notes component map and displays all Noteitems
export const Notes = () => {
    //use the noteContext
    const context = useContext(noteContext);
    //destructuring the notes state  
    const { notes, setNotes } = context
    return (
        <div className="row">
            {notes.map((note) => {
                //sent each note as props
                return <Noteitem note={note}/>
            })}
        </div>
    )
}
