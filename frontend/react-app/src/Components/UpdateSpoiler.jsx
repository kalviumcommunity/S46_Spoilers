import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const UpdateSpoiler = () => {

    const {id} = useParams();
    const [activ,setActiv] = useState("");
    const [conseq,setConseq] = useState("");
    const [rate,setRate] = useState("");
    const [status,setStatus] = useState(false);
    const [err,setErr] = useState(null);
    const navigate = useNavigate();

    useEffect(()=> {
        axios.get('https://spoilers.onrender.com/spoilers/'+id)
        .then( (res)=> console.log(res.data))
        .catch( (err) => {console.log(err)} )
      },[])

    const updateIt = async(e) => {
        e.preventDefault();
        
        try{
            const response = await axios.put('https://spoilers.onrender.com/spoilers/'+id,{
                activity : activ,
                consequences : conseq,
                spoilRate : rate,
                author: Cookies.get("Username")
            },{
                headers: {
                    Authorization: `Bearer ${Cookies.get('Token')}`
                }
            });
            console.log("Updated Succesfully",response.data)
            setActiv("");
            setConseq("");
            setRate("");
            setErr(null);
            setStatus(true);
            setTimeout(() => {
                navigate('/main');
            }, 1500);
        
        } catch (err){
            console.log(err)
            setErr(err);
            setStatus(false);
        }
    }
  
    return (
    <>

        <Link to='/main'><h4 id='home'>Home</h4></Link>

        <form onSubmit={updateIt}>

            <h2>Update</h2>

            <div>
                <label>Activity :</label>
                <input type='text' placeholder='' required onChange={(e)=>{setActiv(e.target.value)}} value={activ}/>
            </div>

            <div>
                <label>Consequences :</label>
                <input type='text' placeholder='' required onChange={(e)=>{setConseq(e.target.value)}} value={conseq}/>
            </div>

            <div>
                <label>Spoil-Rate :</label>
                <input type='number' placeholder='On a scale of 10' required onChange={(e)=>{setRate(e.target.value)}} value={rate}/>
            </div>

            <button type='submit'>Confirm</button>

            {status && <div className="loading-bar"></div>}

            {err && <h3>{err.response.data}</h3>}

        </form>
    </>
  )
}

export default UpdateSpoiler;