import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Entity from './Components/Entity'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <div className='top'>
      
        <header>
          <h1>SPOILERS</h1>
        </header>
      
      </div>

      <div className='bottom'>
        
        <Entity/>
      
      </div>

    </>
  )
}

export default App
