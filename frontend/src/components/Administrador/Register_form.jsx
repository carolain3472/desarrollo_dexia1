import { useForm } from "react-hook-form";
import { createuser } from "../../api/register_api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAnchor,
  faHome,
  faTachometerAlt,
  faFileUpload,
  faPhotoVideo,
  faBuildingColumns,
  faUsers,
  faMoneyCheckAlt,
  faCogs,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import axios from "axios";
import { api } from "../../api/register_api";
import "../../scss/register.css";

export function Register_form() {
  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [first_name, setNombre] = useState("");
  const [primer_apellido, setApellido1] = useState("");
  const [segundo_apellido, setApellido2] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const {
      email,
      cedula,
      first_name,
      primer_apellido,
      segundo_apellido,
      selectedRol,
    } = data;
    const cedula_acceso = sessionStorage.getItem("cedula");

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Convertir las variables a mayúscula
    const capitalizedFirstName = capitalizeFirstLetter(first_name);
    const capitalizedPrimerApellido = capitalizeFirstLetter(primer_apellido);
    const capitalizedSegundoApellido = capitalizeFirstLetter(segundo_apellido);

    // Enviar la solicitud POST al backend
    api
      .post("/login/registro", {
        email,
        cedula,
        first_name: capitalizedFirstName,
        rol: selectedRol,
        primer_apellido: capitalizedPrimerApellido,
        segundo_apellido: capitalizedSegundoApellido,
        cedula_acceso,
      })
      .then((response) => {
        // Manejar la respuesta del backend
        // Manejar la respuesta del backend
        if (response.data.valid) {
          Swal.fire({
            icon: "success",
            title: "Operación exitosa",
            text: "Te has registrado correctamente",
            confirmButtonText: "Continuar",
            allowOutsideClick: false,
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir a la página actual
              window.location.reload();
            }
          });
        } else {
          // Mostrar un mensaje de error o realizar alguna otra acción en caso de respuesta negativa
          console.log("No lo pudo enviar");
          Swal.fire({
            icon: "success",
            title: "Operación exitosa",
            text: "Registro realizado con éxito",
            confirmButtonText: "Continuar",
            allowOutsideClick: false,
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir a la página actual
              window.location.reload();
            }
          });
        }
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Opps algo salió mal",
          text: "Verifica los campos ingresados",
          confirmButtonText: "Continuar",
          allowOutsideClick: false,
          showCancelButton: false,
        });
      });
  };

  return (
    <div
      style={{ marginLeft: "250px", marginTop: "10px", marginRight: "10px" }}
    >
      <div className="container">
        <div className="form">
          <div className="note">
            <h1>Ingresa un usuario</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-content text-center">
              <div className="row">
                <div className="row-md-6">
                  <div className="form-group my-3">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email *"
                      {...register("email")}
                      required
                    />
                  </div>
                  <div className="form-group my-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Cédula *"
                      {...register("cedula")}
                      required
                    />
                  </div>
                </div>
                <div className="row-md-6">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nombre *"
                      {...register("first_name")}
                      required
                    />
                  </div>
                  <div className="form-group my-3">
                    <input
                      className="form-control"
                      placeholder="Primer Apellido *"
                      type="text"
                      {...register("primer_apellido")}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Segundo Apelido *"
                      type="text"
                      {...register("segundo_apellido")}
                    />
                  </div>

                  <div className="form-group my-3">
                    <select
                      className="selectTypeUser"
                      {...register("selectedRol")}
                      required
                    >
                      <option disabled value="" className="disabledOption">
                        Tipo de usuario *
                      </option>
                      <option value="Administrador">Administrador</option>
                      <option value="Consejero">Consejero</option>
                      <option value="Monitor">Monitor</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="submit" className="btnSubmit">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
