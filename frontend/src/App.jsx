import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Login_template } from './pages/Login_template'
import {Next} from './pages/Next'
import { Registro } from './pages/registro';
import "./Scss/login.css";
import "./Scss/tabla.css"
import {Inicio_app} from './pages/inicio_app'
import { UsuariosList_all } from './pages/usuariosList';
import {Configuracion_user} from './pages/configuracion_user';


function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/login' element ={<Login_template/>} />
      <Route path='/next' element ={<Next/>} />
      <Route path='/registro' element ={<Registro/>} />
      <Route path='/inicio' element ={<Inicio_app/>} />
      <Route path='/usuarios_Lista' element ={<UsuariosList_all/>} />
      <Route path='/ajustes' element ={<Configuracion_user/>} />
     
      
    </Routes>

  </BrowserRouter>
  )
}

export default App