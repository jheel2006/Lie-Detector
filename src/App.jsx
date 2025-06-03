import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Game from './components/Game'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="p-8 bg-yellow-100 text-center text-2xl font-bold">
        TAILWIND TEST
      </div>

      <Game />

    </>
  )
}

export default App
