import { React, useState,useContext } from 'react'
import alertContext from '../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';


export const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    
    const navigate = useNavigate();

    //showAlert from context from alert context 
    const AlertContext = useContext(alertContext);
    const { showAlert } = AlertContext

    const context = useContext(noteContext);
    const { getUser } = context


    const onChange = (e) => {
        // used spread operator keeping the note and update the value of note state of that name 
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    //login handel request:
    const handelSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            //body contains object of {title:title,description:description,tag:tag} written like this
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            showAlert("logged in successfully", "success")
            getUser();
            navigate('/');

        }
        else {
            showAlert("Invalid credentials", "danger")
        }
    }

    return (
        <div>
            <h2>Login to Continue to your personal Notebook</h2>
            <form onSubmit={handelSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email" min={5} onChange={onChange} required={true} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" min={5} onChange={onChange} required={true} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
