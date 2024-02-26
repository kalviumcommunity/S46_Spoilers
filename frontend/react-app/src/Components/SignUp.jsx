import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const SignUp = () => {

    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [status,setStatus] = useState(false);
    const [err,setErr] = useState(null);

    const postIt = async(e) => {
        e.preventDefault();
        
        try {
        const firstResponse = await axios.get('https://spoilers.onrender.com/users');
        const users = firstResponse.data;
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            setStatus(false);
            setErr({ response: { data: "Account already exists, Go Log in." } });
            setTimeout(() => {
                navigate('/signin');
            }, 1000)
            return;
        }

        const existingUserName = users.find(user => user.name === name);
        if (existingUserName){
            setStatus(false);
            setErr({ response : { data : "Username Already Taken" } })
            return;
        }

        const response = await axios.post('https://spoilers.onrender.com/users', {
            name: name,
            email: email,
            password: pass
        });
        console.log("Posted Successfully", response.data);
        setName("");
        setEmail("");
        setPass("");
        Cookies.set("Username", name);
        Cookies.set("Token",response.data.token);
        setStatus(true);
        setErr(null);
        setTimeout(() => {
            navigate('/main');
        }, 1500);

    }   catch (err) {
        console.log(err);
        setStatus(false);
        setErr(err);
        }
    }
  
    return (
    <>

        <Link to='/'><h4 id='home'>Back</h4></Link>

        <form>

            <h2>Sign Up</h2>

            <div>
                <label>UserName :</label>
                <input type='text' placeholder='' required onChange={(e)=>{setName(e.target.value)}}/>
            </div>

            <div>
                <label>Email :</label>
                <input type='text' placeholder='' required onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <div>
                <label>Password :</label>
                <input type='text' placeholder='6 - 16 characters' required onChange={(e)=>{setPass(e.target.value)}}/>
            </div>

            <button onClick={postIt}>CONFIRM</button>

            {status && <div className="loading-bar"></div>}

            {err && <h3>{err.response.data}</h3>}

        </form>
    </>
  )
}

export default SignUp;