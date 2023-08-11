import { React, useContext, useRef } from 'react'
import noteContext from '../context/notes/noteContext';




export const Modal = (props) => {
    //recive the state and change state function as props
    const { enote, setEnote, refOpen } = props

    const refClose = useRef(null);



    ///bringing update note from context
    const context = useContext(noteContext);
    const { updateNote } = context

    



    const onChange = (e) => {
        // used spread operator keeping the note and update the value of note state of that name 
        setEnote({ ...enote, [e.target.name]: e.target.value })
    }



   





    //function:once the note is confiremed and submitted then sent the note to addNote function
    const handleSubmitNote = (e) => {
        //to prevent from reloade the page 
        e.preventDefault();
        updateNote(enote.id, enote.etitle, enote.edescription, enote.etag)
        setEnote({ etitle: "", edescription: "", etag: "" })
        refClose.current.click()
    }


    
    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={refOpen} data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my3'>
                                <div className="form-group">
                                    <label htmlFor="etitle">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Enter title" defaultValue={enote.etitle} onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edescription">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Enter your description" defaultValue={enote.edescription} onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="etag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" defaultValue={enote.etag} onChange={onChange} placeholder="Enter your description" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" disabled={enote.etitle.length < 5 || enote.edescription.length < 5} className="btn btn-primary" onClick={handleSubmitNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
