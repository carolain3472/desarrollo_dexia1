import { useForm } from "react-hook-form";
import { createuser } from "../api/register_api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
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
import { api } from "../api/register_api";
import "../scss/register.css";

export function Register_form() {
  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [first_name, setNombre] = useState("");
  const [primer_apellido, setApellido1] = useState("");
  const [segundo_apellido, setApellido2] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const cedula_acceso = sessionStorage.getItem("cedula");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
    axios;
    api
      .post("/login/registro", {
        first_name,
        cedula,
        email,
        primer_apellido,
        segundo_apellido,
        cedula_acceso,
      })
      .then((response) => {
        // Manejar la respuesta del backend
        if (response.data.valid) {
          console.log("Lo envió");
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
    <div
      style={{ marginLeft: "250px", marginTop: "10px", marginRight: "10px" }}
    >
      <div className="container">
        <div className="form">
          <div className="note">
            <h1>Ingresa un usuario</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-content text-center">
              <div className="row">
                <div className="row-md-6">
                  <div className="form-group my-3">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email *"
                      value={email}
                      onChange={handleemailChange}
                      required
                    />
                  </div>
                  <div className="form-group my-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Cédula *"
                      value={cedula}
                      onChange={handleCedulaChange}
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
                      value={first_name}
                      onChange={handlenameChange}
                      required
                    />
                  </div>
                  <div className="form-group my-3">
                    <input
                      className="form-control"
                      placeholder="Primer Apellido *"
                      type="text"
                      value={primer_apellido}
                      onChange={handleApellido1Change}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Segundo Apelido *"
                      type="text"
                      value={segundo_apellido}
                      onChange={handleApellido2Change}
                      required
                    />
                  </div>

                  <div className="form-group my-3">
                    <select
                      className={`selectTypeUser ${
                        selectedOption ? "selectedOption" : ""
                      }`}
                      value={selectedOption}
                      onChange={handleChange}
                    >
                      <option disabled value="" className="disabledOption">
                        Tipo de usuario *
                      </option>
                      <option>Admin</option>
                      <option>Consejero</option>
                      <option>Monitor</option>
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
