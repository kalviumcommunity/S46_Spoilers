import { useState } from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css'
import Entity from './Components/Entity'
import CreateSpoiler from './Components/CreateSpoiler';
import UpdateSpoiler from './Components/UpdateSpoiler';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<Home/>}></Route>
            <Route path='/main' element={<Entity/>}></Route>
            <Route path='/createSpoiler' element={<CreateSpoiler/>}></Route>
            <Route path='/updateSpoiler/:id' element={<UpdateSpoiler/>}></Route>
            <Route path='/signin' element={<SignIn/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>

          </Routes>
        </BrowserRouter>
        
    </>
  )
}

export default App
