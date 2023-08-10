import { React, useContext } from 'react'
import noteContext from '../context/notes/noteContext';




//Noteitems component is a card componet that display each note 
export const Noteitem = (props) => {
    const context = useContext(noteContext);
    //using the delete node function from context
    const { deleteNote } = context;
    //take the note and edit note fnction as props
    const { note,editNote } = props
    return (
        <>

            <div className='col-md-3'>
                <div className="card text-white bg-secondary my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description} </p>
                        <div className="d-flex" style={{
                            alignItems: "center"
                        }}>
                            <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
                            {/* sending the note that need to be updated to the editNote function takes as props */}
                            <i className="fa-solid fa-pen mx-2"  onClick={()=>{editNote(note)}}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
