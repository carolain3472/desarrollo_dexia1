import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login_template } from './pages/Administrador/Login_template';
import { Next } from './pages/Administrador/Next';
import { Registro } from './pages/Administrador/registro';
import "./Scss/login.css";
import "./Scss/tabla.css";
import { Inicio_app } from './pages/Administrador/inicio_app';
import { UsuariosList_all } from './pages/Administrador/usuariosList';
import { Configuracion_user } from './pages/Administrador/configuracion_user';
import { Consejero_next } from './pages/Consejero/consejeros_paginaInit';
import { Configuracion_consejero_page } from './pages/Consejero/configuracion_consejero';
import { EstudiantesList_consejeros } from './pages/Consejero/estudiantesList_consejeros';
import { Inicio_consejero } from './pages/Consejero/Inicio_consejero';
import { Carga } from './pages/Administrador/Carga';
import { Acceso_denegado } from './pages/denegado';
import { Sesiones } from './pages/Consejero/Sesiones';

function App() {
  const rol = sessionStorage.getItem("rol");

  const validarAcceso = (rolPermitido, elemento) => {
    if (rol !== rolPermitido) {
      return <Navigate to="/acceso_denegado" />;
    }
    return elemento;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ADMINISTRADOR */}
        <Route path='/next' element={validarAcceso("Administrador", <Next />)} />
        <Route path='/registro' element={validarAcceso("Administrador", <Registro />)} />
        <Route path='/inicio' element={validarAcceso("Administrador", <Inicio_app />)} />
        <Route path='/usuarios_Lista' element={validarAcceso("Administrador", <UsuariosList_all />)} />
        <Route path='/ajustes' element={validarAcceso("Administrador", <Configuracion_user />)} />
        <Route path='/carga_masiva' element={validarAcceso("Administrador", <Carga />)} />
     

        {/* CONSEJERO */}
        <Route path='/consejero_init' element={validarAcceso("Consejero", <Consejero_next />)} />
        <Route path='/ajustes_consejeros' element={validarAcceso("Consejero", <Configuracion_consejero_page />)} />
        <Route path='/estudiantes_consejeria' element={validarAcceso("Consejero", <EstudiantesList_consejeros />)} />
        <Route path='/inicioConsejero' element={validarAcceso("Consejero", <Inicio_consejero />)} />
        <Route path='/sesiones' element={validarAcceso("Consejero", <Sesiones />)} />

      {/* Ruta predeterminada para CONSEJERO */}
     <Route path='/inicioConsejero' element={<Inicio_consejero />} index />

      {/* Ruta predeterminada para ADMINISTRADOR */}
           <Route path='/next' element={<Next />} index />



        {/* Ruta predeterminada */}
        <Route path='/login' element={<Login_template />} />
        <Route path='/acceso_denegado' element={<Acceso_denegado />} />
      
      </Routes>
    </BrowserRouter>
  );
}


export default App;
