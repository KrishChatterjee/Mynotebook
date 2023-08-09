import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial=[
        {
          "_id": "64b9c04cf8c7dc1a4170a0ea1",
          "user": "64b459914c4de23d063fee6f",
          "title": "My title",
          "description": "prepear for exam",
          "tag": "personal",
          "date": "2023-07-20T23:16:28.365Z",
          "__v": 0
        },
        {
          "_id": "64bee13a7efaa53610e48ec12",
          "user": "64b459914c4de23d063fee6f",
          "title": "Daily task",
          "description": "prepeare for interviews",
          "tag": "Routine",
          "date": "2023-07-24T20:38:18.565Z",
          "__v": 0
        },
        {
            "_id": "64b9c04cf8c7dc1a4170a0ea3",
            "user": "64b459914c4de23d063fee6f",
            "title": "My title",
            "description": "prepear for exam",
            "tag": "personal",
            "date": "2023-07-20T23:16:28.365Z",
            "__v": 0
          },
          {
            "_id": "64b9c04kf8c8dc1a4170a0ea4",
            "user": "64b459914c4de23d063fee6f",
            "title": "My title",
            "description": "prepear for exam",
            "tag": "personal",
            "date": "2023-07-20T23:16:28.365Z",
            "__v": 0
          },
          {
            "_id": "64b9c08cf8c9dc1a4170a0ea5",
            "user": "64b459914c4de23d063fee6f",
            "title": "My title",
            "description": "prepear for exam",
            "tag": "personal",
            "date": "2023-07-20T23:16:28.365Z",
            "__v": 0
          },
          {
            "_id": "64b9c24cf88c4dc1a4170a0ea6",
            "user": "64b459914c4de23d063fee6f",
            "title": "My title",
            "description": "prepear for exam",
            "tag": "personal",
            "date": "2023-07-20T23:16:28.365Z",
            "__v": 0
          }, {
            "_id": "64b9c04cf8c7dc1a3170a0ef7",
            "user": "64b459914c4de23d063fee6f",
            "title": "My title",
            "description": "prepear for exam",
            "tag": "personal",
            "date": "2023-07-20T23:16:28.365Z",
            "__v": 0
          }
      ]

      //set notes as a state 
      const [notes, setNotes] = useState(notesInitial)

      //Add a Note:
      const addNote=(title,description,tag)=>{
        //TODO API CALL 
        console.log("Adding a new note ")
        const note= {
          "_id": "64b9c04cf8c7dc1a3170a0ef7",
          "user": "64b459914c4de23d063fee6f",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-07-20T23:16:28.365Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }
      //Delete a Note: taking id of a note
      const deleteNote=(id)=>{
        console.log("Note with id: "+id +"is deleted")
        //filter the notes state variable array with the similar id reciving
        const newNotes=notes.filter((note)=>{
          return note._id!==id
        })
        setNotes(newNotes)
      }

      //Update/edit a Note:
      const updateNote=()=>{}



    return (
        //provide the state or data or  function as the value to all the childrens using this context
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
//exporting NoteState function
export default NoteState;