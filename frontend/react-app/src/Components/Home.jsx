import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1>SPOILERS</h1>

      <div className='flex-column' style={{height:'40vh',width:'25vw',marginTop:'15vh',border:'2px solid white',borderRadius:'5px',padding:'25px'}}>
        <h3>New to the Site ?</h3>
        <Link to='/signup'><button>Sign Up</button></Link>
        <h3>Already have an account ?</h3>
        <Link to='/signin'><button>Sign In</button></Link>
      </div>
    </>
  )
}

export default Home;