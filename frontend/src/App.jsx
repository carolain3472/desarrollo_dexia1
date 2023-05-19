import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Login_template } from './pages/Login_template'
import {Next} from './pages/Next'
import "./Scss/login.css";

function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/login' element ={<Login_template/>} />
      <Route path='/next' element ={<Next/>} />
    </Routes>

  </BrowserRouter>
  )
}

export default App