import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial=[
        {
          "_id": "64b9c04cf8c7dc1a4170a0ea",
          "user": "64b459914c4de23d063fee6f",
          "title": "My title",
          "description": "prepear for exam",
          "tag": "personal",
          "date": "2023-07-20T23:16:28.365Z",
          "__v": 0
        },
        {
          "_id": "64bee13a7efaa53610e48ec1",
          "user": "64b459914c4de23d063fee6f",
          "title": "Daily task",
          "description": "prepeare for interviews",
          "tag": "Routine",
          "date": "2023-07-24T20:38:18.565Z",
          "__v": 0
        },
        {
            "_id": "64b9c04cf8c7dc1a4170a0ea",
            "user": "64b459914c4de23d063fee6f",
            "title": "My title",
            "description": "prepear for exam",
            "tag": "personal",
            "date": "2023-07-20T23:16:28.365Z",
            "__v": 0
          },
          {
            "_id": "64b9c04cf8c7dc1a4170a0ea",
            "user": "64b459914c4de23d063fee6f",
            "title": "My title",
            "description": "prepear for exam",
            "tag": "personal",
            "date": "2023-07-20T23:16:28.365Z",
            "__v": 0
          },
          {
            "_id": "64b9c04cf8c7dc1a4170a0ea",
            "user": "64b459914c4de23d063fee6f",
            "title": "My title",
            "description": "prepear for exam",
            "tag": "personal",
            "date": "2023-07-20T23:16:28.365Z",
            "__v": 0
          },
          {
            "_id": "64b9c04cf8c7dc1a4170a0ea",
            "user": "64b459914c4de23d063fee6f",
            "title": "My title",
            "description": "prepear for exam",
            "tag": "personal",
            "date": "2023-07-20T23:16:28.365Z",
            "__v": 0
          }, {
            "_id": "64b9c04cf8c7dc1a4170a0ea",
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



    return (
        //provide the state data or/and  function as the value to all the childrens using this context
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
//exporting NoteState function
export default NoteState;