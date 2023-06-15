import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
import { Acceso_denegado } from './pages/denegado';

function App() {
  const rol = sessionStorage.getItem("rol");

  return (
    <BrowserRouter>
      <Routes>
        {/* ADMINISTRADOR */}
        {rol === "Administrador" && (
          <>
            <Route path='/next' element={<Next />} />
            <Route path='/registro' element={<Registro />} />
            <Route path='/inicio' element={<Inicio_app />} />
            <Route path='/usuarios_Lista' element={<UsuariosList_all />} />
            <Route path='/ajustes' element={<Configuracion_user />} />
            <Route element={<Acceso_denegado />} />
          </>
        )}

        {/* CONSEJERO */}
        {rol === "Consejero" && (
          <>
            <Route path='/consejero_init' element={<Consejero_next />} />
            <Route path='/ajustes_consejeros' element={<Configuracion_consejero_page />} />
            <Route path='/estudiantes_consejeria' element={<EstudiantesList_consejeros />} />
            <Route path='/inicioConsejero' element={<Inicio_consejero />} />
            <Route  element={<Acceso_denegado />} />
          </>
        )}

  
        
        {/* Ruta predeterminada */}
        <Route path='/login' element={<Login_template />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
