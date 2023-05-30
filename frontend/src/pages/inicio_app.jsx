import { NavbarAdmin } from "../components/Nav_bar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";

export function Inicio_app() {
  const storedNombre = sessionStorage.getItem("nombre");
  return (
    <div>
      <NavbarAdmin />
      <div style={{ marginLeft: "250px", marginTop:"10px", marginRight: "10px"}}>
        <div>
          <div className="container">
            <div className="card">
              <div className="card-header">
                <h1>Bienvenid@ {storedNombre}</h1>
              </div>
              <div className="card-body">
                <p>Estás dentro del sistema como: Administrador</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
