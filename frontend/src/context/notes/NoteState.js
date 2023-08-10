import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  //set a state for all notes 
  const [notes, setNotes] = useState(notesInitial)


  //GET ALL NOTES:
  const getNotes = async () => {
    //Api call for fetch notes
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNDU5OTE0YzRkZTIzZDA2M2ZlZTZmIn0sImlhdCI6MTY4OTcwODI0N30.U0n97wmpVQcT8tJnm77i1hHOLxpp2jajobOS1pFic7Y"
      }
    });
    const json = await response.json();

    // console.log(json)
    setNotes(json)
  }



  //Add a Note:
  const addNote = async (title, description, tag) => {
    //Api call for add a note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNDU5OTE0YzRkZTIzZDA2M2ZlZTZmIn0sImlhdCI6MTY4OTcwODI0N30.U0n97wmpVQcT8tJnm77i1hHOLxpp2jajobOS1pFic7Y"
      },
      //body contains object of {title:title,description:description,tag:tag} written like this
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }



  //DELETE A NOTE: taking id of a note
  const deleteNote = async (id) => {
    //Api call for add a note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNDU5OTE0YzRkZTIzZDA2M2ZlZTZmIn0sImlhdCI6MTY4OTcwODI0N30.U0n97wmpVQcT8tJnm77i1hHOLxpp2jajobOS1pFic7Y"
      }
    });
    const json = await response.json();
    // console.log(json)

    //Delete note from client side
    //filter the notes state variable array with the similar id reciving
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })

    setNotes(newNotes)
  }



  //UPDATE/EDIT A NOTE:
  const updateNote = async (id, title, description, tag) => {
    //API call for update
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNDU5OTE0YzRkZTIzZDA2M2ZlZTZmIn0sImlhdCI6MTY4OTcwODI0N30.U0n97wmpVQcT8tJnm77i1hHOLxpp2jajobOS1pFic7Y"
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // console.log(json)

    //Logic to edit in client side
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      setNotes(newNotes)

    }
  }



  return (
    //provide the state or data or  function as the value to all the childrens using this context
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
//exporting NoteState function
export default NoteState;