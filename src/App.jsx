import { useState } from 'react'
import Navbar from './components/Navbar'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './pages/Body'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route index element={<h1>Hello World</h1>} />
            <Route path='about' element={<h1>About Page</h1>} />
            <Route path='contact' element={<h1>Contact Page</h1>} />
            <Route path='*' element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
