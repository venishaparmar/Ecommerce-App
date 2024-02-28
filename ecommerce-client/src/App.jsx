import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CategoryPage from './components/CategoryPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CategoryPage/>
    </>
  )
}

export default App
