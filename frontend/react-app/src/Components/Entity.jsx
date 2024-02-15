import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Entity ()  {
  
  const [spoilers , setSpoilers] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:3000/spoilers')
    .then( (res)=> {setSpoilers(res.data)} )
    .catch( (err) => {console.log(err)} )
  },[spoilers])

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/spoilers/'+id)
    .then( (res)=> {console.log(res.data)} )
    .catch( (err) => {console.log(err)} )
  }
  
  return (
    <>

      <div className='top'>

        <Link to='/'><h4 id='home'>HOME</h4></Link>
      
        <header>
          <h1>SPOILERS</h1>
        </header>

        <Link to='/createSpoiler'><h4 style={{position:'fixed',top:'2vh',right:'1vw'}}>Spoil Someone</h4></Link>
    
      </div>
      
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

    </>
  )
}

export default Entity;