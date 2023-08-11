import { useState,useContext } from "react";
import NoteContext from "./noteContext";
import alertContext from '../alert/alertContext';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  //set a state for all notes 
  const [notes, setNotes] = useState(notesInitial)

  const [user, setUser] = useState({name:"",email:"",})

  const AlertContext = useContext(alertContext);
  const { showAlert } = AlertContext


  //GET THE USER:
  const getUser=async()=>{
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setUser({name:json.name,email:json.email})


  } 

  //GET ALL NOTES:
  const getNotes = async () => {
    //Api call for fetch notes
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();

    setNotes(json)
  }



  //Add a Note:
  const addNote = async (title, description, tag) => {
    //Api call for add a note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      //body contains object of {title:title,description:description,tag:tag} written like this
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note))
    showAlert("Note has been Added","success")
  }



  //DELETE A NOTE: taking id of a note
  const deleteNote = async (id) => {
    //Api call for add a note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    showAlert(json.msg,"success")



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
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    showAlert(json.msg,"success")


    //Logic to edit in client side
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      setNotes(newNotes);
      getNotes()
      


    }
  }



  return (
    //provide the state or data or  function as the value to all the childrens using this context
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, getNotes,getUser,user }}>
      {props.children}
    </NoteContext.Provider>
  )
}
//exporting NoteState function
export default NoteState;