import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const CreateSpoiler = () => {

    const [activ,setActiv] = useState("");
    const [conseq,setConseq] = useState("");
    const [rate,setRate] = useState("");
    const [status,setStatus] = useState(false);
    const [err,setErr] = useState(null);
    const navigate = useNavigate();

    const postIt = async(e) => {
        e.preventDefault();
        
        try{
            const response = await axios.post('https://spoilers.onrender.com/spoilers',{
                activity : activ,
                consequences : conseq,
                spoilRate : rate,
                author: Cookies.get("Username")
            },{
                headers: {
                    Authorization: `Bearer ${Cookies.get('Token')}`
                }
            });
            console.log("Posted Succesfully",response.data)
            setActiv("");
            setConseq("");
            setRate("");
            setStatus(true);
            setErr(null);
            setTimeout(() => {
                navigate('/main');
            }, 1500);
        } catch (err){
            console.log(err);
            setErr(err);
            setStatus(false);
        }
    }
  
    return (
    <>

        <Link to='/main'><h4 id='home'>Home</h4></Link>

        <form>

            <h2>Add Spoiler</h2>

            <div>
                <label>Activity :</label>
                <input type='text' placeholder='' required onChange={(e)=>{setActiv(e.target.value)}}/>
            </div>

            <div>
                <label>Consequences :</label>
                <input type='text' placeholder='' required onChange={(e)=>{setConseq(e.target.value)}}/>
            </div>

            <div>
                <label>Spoil-Rate :</label>
                <input type='number' placeholder='On a scale of 10' required onChange={(e)=>{setRate(e.target.value)}}/>
            </div>

            <button onClick={postIt}>Add it !</button>

            {status && <div className="loading-bar"></div>}

            {err && <h3>{err.response.data}</h3>}

        </form>
    </>
  )
}

export default CreateSpoiler;