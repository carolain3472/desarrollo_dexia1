/* import React from 'react'

export function Estudiantes_consejeros() {
  return (
    <div>Aqui ira la tabla con la info de los estudiantes</div>
  )
} */



import React, { useState, useEffect } from "react";
import { api } from "../../api/register_api";

export function Estudiantes_consejeros() {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    try {
      const response = await api.get("/estudiantes/listar_estudiantes");
      setEstudiantes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

   return (
    <div>
        <section
          className="intro"
          style={{ marginLeft: "-350px", marginTop: "0px" }}>

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
                        style={{ position: "relative", height: "400px" , weight: "700px"}}
                      >
                        <table className="table table-striped mb-0">
                          <thead style={{ backgroundColor: "#D02424" }}>
                            <tr>
                              <th scope="col">Nombre</th>
                              <th scope="col">Primer apellido</th>
                              <th scope="col">Segundo apellido</th>
                              <th scope="col">Correo</th>
                              <th scope="col">Fecha de nacimiento</th>
                              <th scope="col">Identificación</th>
                              <th scope="col">Celular</th>
                              <th scope="col">Código</th>
                            </tr>
                          </thead>
                          <tbody>
                            {estudiantes.map((estudiante) => (
                              <tr key={estudiante.id}>
                                <td>{estudiante.nombre}</td>
                                <td>{estudiante.primer_apellido}</td>
                                <td>
                                  {estudiante.segundo_apellido !== ""
                                    ? estudiante.segundo_apellido
                                    : "-"}
                                </td>
                                <td>{estudiante.correo_institucional}</td>
                                <td>{estudiante.fecha_nacimiento}</td>
                                <td>{estudiante.doc_identidad}</td>
                                <td>{estudiante.celular}</td>
                                <td>{estudiante.codigo_estudiantil}</td>
                              </tr>
                            ))}

                            {}
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
