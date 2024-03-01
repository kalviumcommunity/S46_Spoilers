import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Entity ()  {
  
  const Navigate = useNavigate();
  const [spoilers , setSpoilers] = useState([]);
  const [users , setUsers] = useState([]);
  const [selected, setSelected] = useState("all");
  const [errMessage , setErrMessage] = useState('');

  useEffect(()=> {
    axios.get('https://spoilers.onrender.com/spoilers',{headers : {Authorization: `Bearer ${Cookies.get('Token')}`}})
    .then( (res)=> {setSpoilers(res.data)} )
    .catch( (err) => {
      if(err.response.status===401){
        setErrMessage('No Authentication Token Provided');
      }else if(err.response.status===403){
        setErrMessage('Authentication Token Expired');
      }else{
        setErrMessage('Error While Fetching Spoilers');
      }
    } )
  },[])

  useEffect(()=>{
    axios.get('https://spoilers.onrender.com/users').then((res)=>setUsers(res.data)).catch((er)=>console.log(er));
  },[users])

  const handleDelete = (id) => {
    axios.delete('https://spoilers.onrender.com/spoilers/'+id)
    .then( (res)=> {console.log(res.data)} )
    .catch( (err) => {console.log(err)} )
  }

  const handleSelection = (e) => {
    setSelected(e.target.value);
  }

  const handleLogout = () => {
    Cookies.remove('Username');
    Cookies.remove('Token');
    setTimeout(()=>{
      Navigate('/');
    },1500)
  }

  const filteredSpoilers = spoilers.filter((item)=>{
    if(selected==='all'){
      return item;
    }else{
      return item.author===selected;
    }
  })
  
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
      
      {errMessage ? 
      
        (<div style={{display:'flex',flexDirection:'column',height:'7vh',alignItems:'center'}}>
        <h4>{errMessage}</h4>
        <h5>Please Log out and try logging in again.</h5>
        </div>) : 
        
        ( <div className='flex'>

            <div className='flex-column' style={{height:'70vh',width:'20vw', justifyContent:'flex-start'}}>
              
              <h4>Filter By Users :</h4>
              
              <div className="user-grid">
                <select name='user' onChange={handleSelection}>
                  <option value='all'>ALL</option>
                  {users && users.map((user)=>{
                    return(<option value={user.name}>{user.name}</option>)
                  })}
                </select>
              </div>
            
            </div>

            <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center'}}>
            {filteredSpoilers && filteredSpoilers.map( (spoiler) => {
            return (
              <>
  
              <div className='card flex-column'>

              <div className='flex row'><h3>Activity :</h3><h4>{spoiler.activity}</h4></div>
              <div className='flex row'><h3>Consequences :</h3><h4>{spoiler.consequences}</h4></div>
              <div className='flex row'><h3>Spoil-Rate :</h3><h4>{spoiler.spoilRate}</h4></div>
              <div className='flex row'><h3>Uploaded By :</h3><h4>{spoiler.author}</h4></div>

              {spoiler.author===Cookies.get("Username") && 
                <div className='buttons flex'>
                <Link to={`/updateSpoiler/${spoiler._id}`}><button> Update</button></Link>
                <button onClick={() => handleDelete(spoiler._id)}> Delete</button>
                </div>
              }

              </div>
  
              </>
            )
            })}
            </div>

            <div style={{height:'30px',width:'20vw'}}></div>

          </div> )
      }

    </>
  )
}

export default Entity;
