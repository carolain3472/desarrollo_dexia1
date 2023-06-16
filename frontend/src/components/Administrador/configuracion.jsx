import React from 'react'
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { api } from "../../api/register_api";
import "../../Scss/update_style.css";
import { useEffect } from "react";

export function Configuracion() {

      /**
  * Obtiene el nombre de usuario almacenado en la sesión.
  * @returns {string|null} El nombre de usuario almacenado, o null si no existe.
  */


 useEffect(() => {
    const validarAcceso = () => {
      if (sessionStorage.getItem("rol") != "Administrador") {
        Navigate("/acceso_denegado");
      } 
    };
  
    validarAcceso();
  }, []);

  const getStoredNombre = () => {
    return sessionStorage.getItem("nombre");
  };

  const getStoredPrimerApellido = () => {
    return sessionStorage.getItem("apellido");
  };

  const getStoredSegundoAPellido = () => {
    return sessionStorage.getItem("apellido_dos");
  };

  const getStoredCorreo= () => {
    return sessionStorage.getItem("correo");
  };

  const getStoredCedula = () => {
    return sessionStorage.getItem("cedula");
  };

  const getStoredRol = () => {
    return sessionStorage.getItem("rol");
  };

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = () => {
    const contraInput = document.getElementById("contra");
    if (!contraInput.value) {
      alert('Debes llenar el campo "contra".');
    } else {
      const cedula = sessionStorage.getItem("cedula");

      axios;
      api
        .post("/login/update_contra/", {
          cedula: cedula,
          password: newPassword,
        })
        .then((response) => {
          console.log("Se ha actualizado la contraseña");
          //sessionStorage.removeItem("username");
          //navigate("/inicio");
        })
        .catch((error) => {
          console.error("Error al realizar el update", error);
        });
    }
  };

  return (
    <>
    <main className="formulario-settings"  style={{ marginLeft: "250px", marginTop: "90px" }}>
      <div className="container custom-container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10">
            <div className="card h-200 border-1 shadow-sm">
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white d-flex flex-column justify-content-center align-items-center"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <img
                    src={'/images/usuario.png'}
                    alt="Avatar"
                    className="img-fluid img-thumbnail rounded-circle my-5"
                    style={{ width: "180px" }}
                  />
                  <h5
                    style={{

                    marginTop: '-40px',
                                              }}
                  >{getStoredNombre()}</h5>

<h5
                    style={{

                    marginTop: '-5px',
                                              }}
                  >{getStoredRol()}</h5>

                </div>

                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6 
                    style={{ fontWeight: 'bold', fontSize: '14px' }}
                    >Informacion</h6>
                    <hr />
                    <div className="row pt-1">

                      <div className="col-6">
                        <h6
                        style={{ fontWeight: 'bold', fontSize: '14px' }}
                        >Correo:</h6>
                        <p className="text-muted">{getStoredCorreo()}</p>
                      </div>

                      <div className="col-6">

                      <h6
                    style={{ fontWeight: 'bold', fontSize: '14px' }}>Cédula:</h6>
                        
                        <p className="text-muted">{getStoredCedula()}</p>

                      
                      </div>

                      


                      <div className="col-6">
                        <h6
                        style={{ fontWeight: 'bold', fontSize: '14px' }}>Nombre:</h6>
                        <p className="text-muted">{getStoredNombre()}</p>
                      </div>
                    </div>

                    <div className="col-6">
                    <h6
                        style={{ fontWeight: 'bold', fontSize: '14px' }}
                        >Apellidos:</h6>
                        <p className="text-muted">{getStoredPrimerApellido() + getStoredSegundoAPellido()}</p>

                    </div>

                    <hr />
                    <div className="row">
                      <div className="col-6">
                        <h6
                         style={{ fontWeight: 'bold', fontSize: '14px' }}>Cambia tu contraseña</h6>
                        <div>
                          <button
                            className="btn form-control botonCambio"
                            type="button"
                            onClick={handleModalOpen}
                          >
                            Cambiar contraseña
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal
              show={showModal}
              onHide={handleModalClose}
              centered
              backdrop="static"
            >
              <Modal.Header>
                <Modal.Title>
                  ¿Realmente deseas cambiar tu contraseña?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <label htmlFor="" Ingresa tu nueva ccontraseña></label>
                  <input
                    type="password"
                    id="contra"
                    placeholder="Ingresa tu nueva ccontraseña"
                    className="form-control"
                    value={newPassword}
                    onChange={handlePasswordChange} 
                    required
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  variant="secondary"
                  onClick={() => {
                    handleModalClose();
                    handleSubmit();
                  }}
                >
                  Enviar
                </Button>

                <Button
                  type="submit"
                  variant="secondary"
                  onClick={handleModalClose}
                >
                  cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </main>
    </>
  )
}

