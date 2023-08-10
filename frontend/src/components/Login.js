import {React,useState} from 'react'

import { useNavigate } from 'react-router-dom';

export const Login = () => {
    
    const [credentials, setCredentials] = useState({email:"",password:""})
    const navigate = useNavigate();
    
    
    const onChange = (e) => {
        // used spread operator keeping the note and update the value of note state of that name 
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handelSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            //body contains object of {title:title,description:description,tag:tag} written like this
            body: JSON.stringify({ email:credentials.email, password:credentials.password }),
          });
          const json=await response.json()
          console.log(json)
          if(json.success){
            //save the auth token and redirect 
            localStorage.setItem('token',json.authtoken);
            navigate('/');

          }
          else{
            alert("Invalid credentials")
          }
    }

    return (
        <div>
            <form onSubmit={handelSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email" min={5} onChange={onChange}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" min={5} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
