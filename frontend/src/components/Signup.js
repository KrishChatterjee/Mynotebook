import { React, useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';
import noteContext from '../context/notes/noteContext';




export const Signup = () => {

    const AlertContext = useContext(alertContext);
    const { showAlert } = AlertContext

    const context = useContext(noteContext);
    const { getUser } = context

    const [user, setUser] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();


    const onChange = (e) => {
        // used spread operator keeping the note and update the value of note state of that name 
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handelSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = user
        if (password !== cpassword) {
            showAlert("Your password and confirmation password do not match  ", "danger")    
        }
        else {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/createuser`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
                //body contains object of {title:title,description:description,tag:tag} written like this
                body: JSON.stringify({ name, email, password }),
            });
            const json = await response.json()
            if (json.success) {
                //save the auth token and redirect 
                localStorage.setItem('token', json.authToken);
                showAlert("your account has been created ", "success")
                getUser();
                navigate('/');
            }
            else {
                showAlert("Invalid details", "danger")
           
            }
        }
    }
    return (
        <div>
            <div>
                <form onSubmit={handelSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" placeholder="Enter name" min={3} onChange={onChange} required={true} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email" min={5} onChange={onChange} required={true}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" min={5} onChange={onChange}  required={true}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpassword">Comfirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Password" min={5} onChange={onChange} required={true} />
                    </div>
                    <button type="submit" className="btn btn-primary">SignUp</button>
                </form>
            </div>
        </div>
    )
}
