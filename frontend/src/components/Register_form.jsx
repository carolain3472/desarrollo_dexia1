import { useForm } from "react-hook-form";
import { createuser } from "../api/register_api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAnchor, faHome, faTachometerAlt, faFileUpload, faPhotoVideo, faBuildingColumns, faUsers, faMoneyCheckAlt, faCogs, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios'
import { api } from "../api/register_api";

export function Register_form() {
    
 
    

    const [email, setEmail] = useState('');
    const [cedula, setCedula] = useState('');
    const [first_name, setNombre] = useState('');
    const [primer_apellido, setApellido1] = useState('');
    const [segundo_apellido, setApellido2] = useState('');

    const cedula_acceso= sessionStorage.getItem("cedula")


    const handlenameChange = (event) => {
        setNombre(event.target.value);
      };
    
    const handleemailChange = (event) => {
        setEmail(event.target.value);
      };

    const handleCedulaChange = (event) => {
        setCedula(event.target.value);
      };
    
    const handleApellido1Change = (event) => {
        setApellido1(event.target.value);
      };

    const handleApellido2Change = (event) => {
        setApellido2(event.target.value);
      };

  const navigate = useNavigate();

   //navigate("/login");


  const handleSubmit = (event) => {
    event.preventDefault();

    // Enviar la solicitud POST al backend
    axios
      api.post("/login/registro",  { first_name, cedula, email, primer_apellido, segundo_apellido, cedula_acceso })
      .then((response) => {
        // Manejar la respuesta del backend
        if (response.data.valid) {
            console.log("Lo envió")
        } else {
          // Mostrar un mensaje de error o realizar alguna otra acción en caso de respuesta negativa
          console.log("No lo pudo enviar");
        }
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error(error);
      });
  };


 

  return (


    
    <div className='dashboard-app' style={{ marginTop: 0, paddingTop: 0 }} >

        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>
              <div className='card-header'>
                <h1>Ingresa un usuario</h1>
              </div>
              <div className='card-body'>
              <form onSubmit={handleSubmit}>
    <label>
      Email:
      <input
        type="email"
        value={email}
        onChange={handleemailChange}
        required
      />
    </label>

    <label>
      Cédula:
      <input
        type="text"
        value={cedula}
        onChange={handleCedulaChange}
        required
      />
    </label>

    <label>
      Nombre:
      <input
        type="text"
        value={first_name}
        onChange={handlenameChange}
        required
      />
    </label>

    <label>
      Primer Apellido:
      <input
        type="text"
        value={primer_apellido}
        onChange={handleApellido1Change}
        required
      />
    </label>

    <label>
      Segundo Apellido:
      <input
        type="text"
        value={segundo_apellido}
        onChange={handleApellido2Change}
        required
      />
    </label>

    <button type="submit">Enviar</button>
  </form>
              </div>

              </div>
              </div>
              </div>
              </div>
              
              
    
  );
}
