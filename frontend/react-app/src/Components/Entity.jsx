import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Entity ()  {
  
  const Navigate = useNavigate();
  const [spoilers , setSpoilers] = useState([])

  useEffect(()=> {
    axios.get('https://spoilers.onrender.com/spoilers')
    .then( (res)=> {setSpoilers(res.data)} )
    .catch( (err) => {console.log(err)} )
  },[spoilers])

  const handleDelete = (id) => {
    axios.delete('https://spoilers.onrender.com/spoilers/'+id)
    .then( (res)=> {console.log(res.data)} )
    .catch( (err) => {console.log(err)} )
  }

  const handleLogout = () => {
    Cookies.remove('Username');
    setTimeout(()=>{
      Navigate('/');
    },1500)
  }
  
  return (
    <>

      <div className='top'>

        <Link to='/main'><h4>HOME</h4></Link>
      
        <h1 style={{width:'16vw',marginLeft:'14vw'}}>SPOILERS</h1>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'16vw'}}>
          <Link to='/createSpoiler'><h4>Spoil Someone</h4></Link>
          <button onClick={handleLogout}><h4>LogOut</h4></button>
        </div>
    
      </div>
      
      <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center'}}>
        {spoilers && spoilers.map( (spoiler) => {
          return (
            <>
          
              <div className='card flex-column'>

                <div className='flex row'><h3>Activity :</h3><h4>{spoiler.activity}</h4></div>
                <div className='flex row'><h3>Consequences :</h3><h4>{spoiler.consequences}</h4></div>
                <div className='flex row'><h3>Spoil-Rate :</h3><h4>{spoiler.spoilRate}</h4></div>

                <div className='buttons flex'>
                  <Link to={`/updateSpoiler/${spoiler._id}`}><button> Update</button></Link>
                  <button onClick={() => handleDelete(spoiler._id)}> Delete</button>
                </div>

              </div>
          
            </>
          )
        })}
      </div>

    </>
  )
}

export default Entity;