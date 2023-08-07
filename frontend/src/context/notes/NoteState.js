import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
    const s1={
        "name":"krish",
        "class":"6c"
    }
    const [state, setState] = useState(s1)
    const update =()=>{
        setTimeout(()=>{
            setState({"name":"Muhamadd", "class":"10B"})
        },2000)
    }

    return(
        //provide the state data or function as the value to all the children using the context
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}
//exporting NoteState function
export default NoteState;