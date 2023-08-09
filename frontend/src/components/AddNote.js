
import { React, useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';


export const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    //function:on any change in the input tag the current note state is changed,
    const onChange = (e) => {
        // used spread operator keeping the note and update the value of note state of that name 
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    //function:once the note is confiremed and submitted then sent the note to addNote function
    const handleSubmitNote = (e) => {
        //to prevent from reloade the page 
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
    }

    return (

        <div className='container my-3'>
            <h2>Add a Note</h2>
            <form className='my3'>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="textarea" className="form-control" id="description" name="description" placeholder="Enter your description" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="textarea" className="form-control" id="tag" name="tag" placeholder="Enter your description" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmitNote}>Add Note</button>
            </form>
        </div>
    )
}
