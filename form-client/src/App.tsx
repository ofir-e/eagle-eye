import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { FormContainer } from './components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <FormContainer></FormContainer>
  )
}

export default App
