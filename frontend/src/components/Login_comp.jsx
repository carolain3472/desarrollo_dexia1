import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
//import 'bootstrap/dist/css/bootstrap'
import formularioImage from '../images/formulario_image.jpg'; // Ruta relativa de la imagen
import dexiaLogo from '../images/dexia_logo.png'; // Ruta relativa de la imagen

export const Formulario = () => {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");

  const handleCedulaChange = (event) => {
    setCedula(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Enviar la solicitud POST al backend
    axios
      .post("http://localhost:8000/login/login_view/", { cedula, password })
      .then((response) => {
        // Manejar la respuesta del backend
        if (response.data.valid) {
          // Redirigir a otra página
          sessionStorage.setItem("nombre", response.data.nombre);
          sessionStorage.setItem('cedula',cedula);
          window.location.href = "http://localhost:5173/next";
        } else {
          // Mostrar un mensaje de error o realizar alguna otra acción en caso de respuesta negativa
          console.log("No lo pudo validar");
        }
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error(error);
      });
  };

  return (
    <section className="vh-100" style={{ overflow: 'hidden', height: '100%' }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
  
            <div className="px-5 ms-xl-4">
              <i className="fas fa-crow fa-2x me-3 " style={{ color: "#709085" }}></i>
              <img src={dexiaLogo} alt="Dexia Logo" style={{margin:0, display:"block", maxWidth:'30%', height:'auto'}}/>
            </div>
      
            <div className="d-flex align-items-center h-custom-2 px-5  pt-5 pt-xl-0 mt-xl-n5" style={{marginTop: '-3rem'}}>
  
              <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
  
                <h3 className="fw-normal mb-3" style={{ letterSpacing: "1px" }}>Bienvenidos al software de consejeria</h3>
  
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example18">Cédula</label>
                  <input id="form2Example18" className="form-control form-control-lg"
                    type="text"
                    value={cedula}
                    onChange={handleCedulaChange}
                    placeholder="xxxxxxxxx" />
                  
                </div>
  
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example28">Contraseña</label>
                  <input type="password" id="form2Example28" className="form-control form-control-lg" value={password}
                    onChange={handlePasswordChange} 
                    placeholder="*********"/>
                   
                </div>
  
                <div className="pt-1 mb-4">
                <button className="btn btn-danger btn-lg btn-block" type="submit">Iniciar sesión</button>

                </div>
  
                <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">¿Olvidaste tu contraseña?</a></p>
  
              </form>
  
            </div>
  
          </div>
<div className="rojo_rect">



    
      
              <img src={formularioImage} alt="Login image" className="w-100 vh-100" style={{ objectFit: "cover", borderRadius: '12px',  transform: 'scale(0.96)' }} />
            
          </div>
        </div>
        </div>
 
    </section>
  );
  
};


