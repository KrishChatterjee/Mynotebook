//Notes component map and displays all Noteitems
import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { Noteitem } from './Noteitem';

export const Notes = () => {
    //use the noteContext
    const context = useContext(noteContext);
    //destructuring the notes state  
    const { notes } = context
    return (
        <>
            <h2>Your Notes</h2>
            <div className="row">
                {notes.map((note) => {
                    //sent each note as props and for uniqueness key is used
                    return <Noteitem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}
