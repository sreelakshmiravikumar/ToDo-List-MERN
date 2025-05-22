import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Component/Header'
import Home from './Component/Home'
import 'bootstrap/dist/css/bootstrap.min.css';


import Add from './Component/Add'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <Home/>
     <Add/>
    </>
  )
}

export default App
