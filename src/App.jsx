// src/App.js
import React, { useState } from 'react'
import Auth from './Auth.jsx'
import { Route, Routes } from 'react-router-dom'
import Success from './success.jsx'
import Failed from './failed.jsx'

const App = () => {
  const [user, setUser] = useState(null)
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
        <Route path='/' element={<Auth user={user} setUser={setUser} />}  />
        <Route path='/success' element ={<Success user={user} setUser={setUser} />} />
        <Route path='/failed' element ={<Failed/>} />
                </Routes>
      </header>
    </div>
  )
}

export default App

