import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Entity ()  {
  
  const [spoilers , setSpoilers] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:3000/spoilers')
    .then( (res)=> {setSpoilers(res.data)} )
    .catch( (err) => {console.log(err)} )
  },[])
  
  return (
    <>
      
      {spoilers && spoilers.map( (spoiler) => {
        return (
          <>
          
            <div className='card flex-column'>

              <div className='flex row'><h3>Activity :</h3><h4>{spoiler.activity}</h4></div>
              <div className='flex row'><h3>Consequences :</h3><h4>{spoiler.consequences}</h4></div>
              <div className='flex row'><h3>Spoil-Rate :</h3><h4>{spoiler.spoilRate}</h4></div>

            </div>
          
          </>
        )
      })}

    </>
  )
}

export default Entity
