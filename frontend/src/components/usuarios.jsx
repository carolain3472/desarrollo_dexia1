import React from "react";
import { api } from "../api/register_api";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const cedula_acceso = sessionStorage.getItem("cedula");
  const [selectedOption, setSelectedOption] = useState("");



  /* Si la seleccion es Activo, que almacene en la vatiable isActive un true, si no un false  */

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue)
    let isActive = null;

    if (selectedValue === "Activo") {
      isActive = true;
    } else if (selectedValue === "Inactivo") {
      isActive = false;
    }

    setSelectedOption(selectedValue);
    fetchUsuarios(isActive);
  };

  const fetchUsuarios = (isActive) => {
    const requestData = {
      cedula_acceso: cedula_acceso,
      is_active: isActive,
      // Agrega los otros parámetros según sea necesario (apellido, nombre, rol)
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
    fetchUsuarios(null); // Realizar la llamada inicial sin filtro de isActive
  }, []);


  return (
    <div>
      <select
        className={`selectTypeUser ${selectedOption ? "selectedOption" : ""}`}
        style={{ marginLeft: "290px", marginTop: "10px" , width:'300px'}}
        value={selectedOption}
        onChange={handleChange}
      >
        <option disabled value="" className="disabledOption">
          Tipo de usuario *
        </option>
        <option>Activo</option>
        <option>Inactivo</option>
      </select>

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
                                  {usuario.is_active ? "Activo" : "Inactivo"}
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
