import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';

const UpdateSpoiler = () => {

    const {id} = useParams();
    const [activ,setActiv] = useState("");
    const [conseq,setConseq] = useState("");
    const [rate,setRate] = useState("");
    const [status,setStatus] = useState(false);
    const [err,setErr] = useState(null);

    useEffect(()=> {
        axios.get('http://localhost:3000/spoilers/'+id)
        .then( (res)=> console.log(res.data))
        .catch( (err) => {console.log(err)} )
      },[])

    const updateIt = async(e) => {
        e.preventDefault();
        
        try{
            const response = await axios.put('http://localhost:3000/spoilers/'+id,{
                activity : activ,
                consequences : conseq,
                spoilRate : rate
            });
            console.log("Updated Succesfully",response.data)
            setActiv("");
            setConseq("");
            setRate("");
            setErr(null);
            setStatus(true);
        } catch (err){
            console.log(err)
            setErr(err);
            setStatus(false);
        }
    }
  
    return (
    <>

        <Link to='/'><h4 id='home'>Home</h4></Link>

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

            {status && <h3>Updated Succesfully !</h3>}

            {err && <h3>{err.response.data}</h3>}

        </form>
    </>
  )
}

export default UpdateSpoiler;
