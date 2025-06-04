import React from 'react'
import Home from './Components/Pages/Home'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NotFound from './Components/Pages/NotFound'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/*' exact element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App