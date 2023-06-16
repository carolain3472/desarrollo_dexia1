import {  NavbarConsejeros} from "../../components/Consejero/Nav_bar_consejeros";
import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";
import { Inicio_app_consejeria } from "../../components/Consejero/Inicio_consejeria";


export function Inicio_consejero() {
  const storedNombre = sessionStorage.getItem("nombre");
  return (
    <div>
      <NavbarConsejeros />
      <div style={{ marginLeft: "250px", marginTop:"10px", marginRight: "10px"}}>
        <div>
          <div className="container">
            <div className="card">
              <div className="card-header">
                <h1>Bienvenid@, consejero {storedNombre}</h1>
              </div>
              <div className="card-body">
                <Inicio_app_consejeria/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
