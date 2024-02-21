import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const SignIn = () => {

    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [pass,setPass] = useState("");
    const [status,setStatus] = useState(false);
    const [err,setErr] = useState(null);

    const postIt = async(e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post('https://spoilers.onrender.com/users/signin',{
                name : name,
                password : pass
            });
            setName("");
            setPass("");
            Cookies.set("Username",name)
            setStatus(true);
            setErr(null);
            setTimeout(() => {
              navigate('/main');
            }, 1500);
        

          } catch (err){
            console.log(err);
            setStatus(false);
            setErr(err);
          }
    }
  
    return (
    <>

        <Link to='/'><h4 id='home'>Back</h4></Link>

        <form>

            <h2>Sign In</h2>

            <div>
                <label>UserName :</label>
                <input type='text' placeholder='' required onChange={(e)=>{setName(e.target.value)}}/>
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

export default SignIn;