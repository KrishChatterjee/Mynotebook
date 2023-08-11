import {React,useContext} from 'react'
import alertContext from '../context/alert/alertContext';




export const Alert=()=> {

  const context = useContext(alertContext);
    const { alert } = context


  const capitalize=(word)=>{
    if(word==="danger"){
      word="error"
    }

    return word.charAt(0).toUpperCase()+word.slice(1);
  }
  return (
     <div style={{height:"50px"}}>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(alert.type)} ! </strong>{alert.msg}
        </div>}
      </div>
  )
}
