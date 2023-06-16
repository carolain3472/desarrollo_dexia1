import React from "react";
import "../Scss/denegado.css";
import { Link } from "react-router-dom";

export function Acceso_denegado() {
  return (
    <>
      <nav className="nav-bar-denegado">
        <a><img src="/images/univalle-logo-white.png" alt=""/>Universidad del Valle</a>
      </nav>

      <div className="notFound-container">
        <img src="/images/noEncontrado.jpg" alt="" />
        <div className="notFound-text">
          <h1>Acceso denegado</h1>
          <h6>Verifica tus credenciales</h6>
        </div>

        <Link to="/login" className="boton-inicio">
          Iniciar sesión
        </Link>
      </div>
    </>
  );
}
