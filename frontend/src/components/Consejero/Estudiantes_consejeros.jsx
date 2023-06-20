import React, { useState, useEffect } from "react";
import { api } from "../../api/register_api";

export function Estudiantes_consejeros() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [identificacionFiltro, setIdentificacionFiltro] = useState("");
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [primerApellidoFiltro, setPrimerApellidoFiltro] = useState("");
  const [correoFiltro, setCorreoFiltro] = useState("");
  const [codigoFiltro, setCodigoFiltro] = useState("");



  const handleIdentificacionFilter = (event) => {
    const identificacion = event.target.value;
    setIdentificacionFiltro(identificacion);
    fetchEstudiantes(
      identificacion,
      nombreFiltro,
      primerApellidoFiltro,
      correoFiltro,
      codigoFiltro
    );
  };

  const handleNombreFilter = (event) => {
    const nombre = event.target.value;
    setNombreFiltro(nombre);
    fetchEstudiantes(
      identificacionFiltro,
      nombre,
      primerApellidoFiltro,
      correoFiltro,
      codigoFiltro
    );
  };

  const handlePrimerApellidoFilter = (event) => {
    const primerApellido = event.target.value;
    setPrimerApellidoFiltro(primerApellido);
    fetchEstudiantes(
      identificacionFiltro,
      nombreFiltro,
      primerApellido,
      correoFiltro,
      codigoFiltro
    );
  };

  const handCorreoFilter = (event) => {
    const correo = event.target.value;
    setCorreoFiltro(correo);
    fetchEstudiantes(
      identificacionFiltro,
      nombreFiltro,
      primerApellidoFiltro,
      correo,
      codigoFiltro
    );
  };

const handCodigoFilter = (event) => {
    const codigo = event.target.value;
    setCodigoFiltro(codigo);
    fetchEstudiantes(
      identificacionFiltro,
      nombreFiltro,
      primerApellidoFiltro,
      correoFiltro,
      codigo
    );
  };


  useEffect(() => {
    fetchEstudiantes();
  }, []);


  const fetchEstudiantes = (doc_identidad, nombre, primer_apellido, correo_institucional, codigo_estudiantil) => {
    const params = new URLSearchParams({
      doc_identidad,
      nombre,
      primer_apellido,
      correo_institucional,
      codigo_estudiantil,
    });
  
    const url = `/estudiantes/listar_estudiantes/?${params.toString()}`;
  
    api
      .get(url)
      .then((response) => {
        setEstudiantes(response.data);
        console.log(response.data);
        console.log(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };


   return (
    <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "-300px", marginRight: "50px" }}>
            <input
              type="text"
              placeholder="Filtrar por cédula"
              value={identificacionFiltro}
              onChange={handleIdentificacionFilter}
              style={{ 
                width: "200px",
                marginBottom:"15px"}}
            />

            <input
              type="text"
              placeholder="Filtrar por nombre"
              value={nombreFiltro}
              onChange={handleNombreFilter}
              style={{ 
                width: "200px",
                marginBottom:"15px" }}
            />

            <input
              type="text"
              placeholder="Filtrar por apellido"
              value={primerApellidoFiltro}
              onChange={handlePrimerApellidoFilter}
              style={{ 
                width: "200px",
                marginBottom:"15px" }}
            />

            <input
              type="text"
              placeholder="Filtrar por correo"
              value={correoFiltro}
              onChange={handCorreoFilter}
              style={{ 
                width: "250px",
                marginBottom:"15px" }}
            />

            <input
              type="text"
              placeholder="Filtrar por código"
              value={codigoFiltro}
              onChange={handCodigoFilter}
              style={{ 
                width: "200px",
                marginBottom:"15px" }}
            />
    </div>

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
