import { useState } from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css'
import Entity from './Components/Entity'
import CreateSpoiler from './Components/CreateSpoiler';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<Entity/>}></Route>
            <Route path='/createSpoiler' element={<CreateSpoiler/>}></Route>

          </Routes>
        </BrowserRouter>
        
    </>
  )
}

export default App
