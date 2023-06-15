import React from "react";
import { api } from "../../api/register_api";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const cedula_acceso = sessionStorage.getItem("cedula");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRol, setSelectedRol] = useState("");
  const [cedulaFiltro, setCedulaFiltro] = useState("");
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [apellidoFiltro, setApellidoFiltro] = useState("");

  const toggleEstadoUsuario = (cedula) => {
    console.log(cedula);
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.cedula === cedula
          ? { ...usuario, is_active: !usuario.is_active }
          : usuario
      )
    );

    api
      .post("/login/usuarioCambio/", {
        cedula_acceso: cedula_acceso,
        cedula_cambio: cedula,
      })
      .then((response) => {
        setUsuarios(response.data);
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* Si la seleccion es Activo, que almacene en la vatiable isActive un true, si no un false  */

  const handleChangeRol = (event) => {
    const selectedValue = event.target.value;
    let rol = selectedValue;

    if (rol == "Todos") {
      fetchUsuarios(null);
    }

    console.log(selectedValue);
    setSelectedRol(rol);
    fetchUsuarios(
      selectedOption === "Activo" ? true : null,
      rol,
      cedulaFiltro,
      nombreFiltro,
      apellidoFiltro
    );
    console.log(rol);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    let isActive = null;

    if (selectedValue === "Activo") {
      isActive = true;
    } else if (selectedValue === "Inactivo") {
      isActive = false;
    }

    setSelectedOption(selectedValue);
    fetchUsuarios(
      isActive,
      selectedRol,
      cedulaFiltro,
      nombreFiltro,
      apellidoFiltro
    );
  };
  const handleCedulaFilter = (event) => {
    const value = event.target.value;
    setCedulaFiltro(value);
    fetchUsuarios(
      selectedOption === "Activo" ? true : null,
      selectedRol,
      value,
      nombreFiltro,
      apellidoFiltro
    );
  };

  const handleNombreFilter = (event) => {
    const nombre = event.target.value;
    setNombreFiltro(nombre);
    fetchUsuarios(
      selectedOption === "Activo" ? true : null,
      selectedRol,
      cedulaFiltro,
      nombre,
      apellidoFiltro
    );
  };

  const handleApellidoFilter = (event) => {
    const apellido = event.target.value;
    setApellidoFiltro(apellido);
    fetchUsuarios(
      selectedOption === "Activo" ? true : null,
      selectedRol,
      cedulaFiltro,
      nombreFiltro,
      apellido
    );
  };

  const fetchUsuarios = (isActive, rol, cedula, nombre, apellido) => {
    const requestData = {
      cedula_acceso: cedula_acceso,
      is_active: isActive,
      rol: rol,
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
    };

    api
      .post("/login/usuarios/", requestData)
      .then((response) => {
        setUsuarios(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUsuarios(null, null, "");
  }, []);

  return (
    <div>
      <select
        className={`selectTypeUser ${selectedOption ? "selectedOption" : ""}`}
        style={{
          marginLeft: "290px",
          marginTop: "10px",
          width: "300px",
          display: "block",
        }}
        value={selectedRol}
        onChange={handleChangeRol}
      >
        <option disabled value="" className="disabledOption">
          Rol:
        </option>
        <option>Administrador</option>
        <option>Consejero</option>
        <option>Monitor</option>
        <option>Todos</option>
      </select>

      <select
        className={`selectTypeUser ${selectedOption ? "selectedOption" : ""}`}
        style={{ marginLeft: "290px", marginTop: "10px", width: "300px" }}
        value={selectedOption}
        onChange={handleChange}
      >
        <option disabled value="" className="disabledOption">
          Tipo de usuario *
        </option>
        <option>Activo</option>
        <option>Inactivo</option>
      </select>

      <input
        type="text"
        placeholder="Filtrar por cédula"
        value={cedulaFiltro}
        onChange={handleCedulaFilter}
        style={{
          marginLeft: "290px",
          marginTop: "10px",
          width: "300px",
          display: "block",
        }}
      />

      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={nombreFiltro}
        onChange={handleNombreFilter}
        style={{
          marginLeft: "290px",
          marginTop: "10px",
          width: "300px",
          display: "block",
        }}
      />

      <input
        type="text"
        placeholder="Filtrar por apellido"
        value={apellidoFiltro}
        onChange={handleApellidoFilter}
        style={{
          marginLeft: "290px",
          marginTop: "10px",
          width: "300px",
          display: "block",
        }}
      />

      <section
        className="intro"
        style={{ marginLeft: "250px", marginTop: "10px" }}
      >
        <div className="bg-image h-100" style={{ backgroundColor: "white" }}>
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body p-0">
                      <div
                        className="table-responsive table-scroll"
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative", height: "700px" }}
                      >
                        <table className="table table-striped mb-0">
                          <thead style={{ backgroundColor: "#D02424" }}>
                            <tr>
                              <th scope="col">Nombre</th>
                              <th scope="col">Primer apellido</th>
                              <th scope="col">Segundo apellido</th>
                              <th scope="col">Rol</th>
                              <th scope="col">Cédula</th>
                              <th scope="col">Correo</th>
                              <th scope="col">Estado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {usuarios.map((usuario) => (
                              <tr key={usuario.id}>
                                <td>{usuario.first_name}</td>
                                <td>{usuario.primer_apellido}</td>
                                <td>
                                  {usuario.segundo_apellido !== ""
                                    ? usuario.segundo_apellido
                                    : "-"}
                                </td>
                                <td>{usuario.role}</td>
                                <td>{usuario.cedula}</td>
                                <td>{usuario.email}</td>
                                <td>
                                  <button
                                    className={`btn btn-sm ${
                                      usuario.is_active
                                        ? "btn-success"
                                        : "btn-danger"
                                    }`}
                                    onClick={() =>
                                      toggleEstadoUsuario(usuario.cedula)
                                    }
                                  >
                                    {usuario.is_active ? "Activo" : "Inactivo"}
                                  </button>
                                </td>
                              </tr>
                            ))}

                            {/* Rest of the table rows */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
