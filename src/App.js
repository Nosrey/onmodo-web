import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import './index.css'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      <>
      <Router>

      <Routes>
        <Route path='/home' element={<Home/>}>
        </Route>
        <Route path="/login" element={ <Login/> } />

        <Route path='/register' component={<Register/>}>
        </Route>
        {/* <Route path='/admin' element={<Admin/>}>
        </Route> */}
      </Routes>
      </Router>
      </>


    </div>
  )
}

export default App
