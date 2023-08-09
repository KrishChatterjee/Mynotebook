import { React, useContext} from 'react'
import noteContext from '../context/notes/noteContext';



//Noteitems component is a card componet that display each note 
export const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note } = props
    return (
        <div className='col-md-3'>
            <div className="card text-white bg-secondary my-3">
                <div className="card-body">
                    <div className="d-flex" style={{
                        alignItems: "center",
                        justifyContent: "space-evenly"
                    }}>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fa-solid fa-pen mx-2"></i>
                    </div>
                    <p className="card-text">{note.description} </p>
                </div>
            </div>
        </div>
    )
}
