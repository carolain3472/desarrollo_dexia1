import React, { useState, useEffect } from "react";
import { api } from "../../api/register_api";
import { Button, Modal } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css"; // Estilo predeterminado de react-time-picker
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import Swal from "sweetalert2";

export function Estudiantes_consejeros() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [identificacionFiltro, setIdentificacionFiltro] = useState("");
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [codigoFiltro, setCodigoFiltro] = useState("");
  const [selectedIdentificacion, setSelectedIdentificacion] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  const id = sessionStorage.getItem("id");

  const handleIdentificacionFilter = (event) => {
    const identificacion = event.target.value;
    setIdentificacionFiltro(identificacion);
    fetchEstudiantes(identificacion, nombreFiltro, codigoFiltro);
  };

  const handleNombreFilter = (event) => {
    const nombre = event.target.value;
    setNombreFiltro(nombre);
    fetchEstudiantes(identificacionFiltro, nombre, codigoFiltro);
  };

  const [selectedTime, setSelectedTime] = useState("12:00"); // Hora inicial

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };


  const handCodigoFilter = (event) => {
    const codigo = event.target.value;
    setCodigoFiltro(codigo);
    fetchEstudiantes(identificacionFiltro, nombreFiltro, codigo);
  };

  useEffect(() => {
    fetchEstudiantes("", "", "");
  }, []);

  const fetchEstudiantes = (doc_identidad, nombre, codigo_estudiantil) => {
    const params = new URLSearchParams({
      doc_identidad,
      nombre,
      codigo_estudiantil,
    });

    const url = `/estudiantes/listar_estudiantes/?profesional=${id}&${params.toString()}`;

    api
      .get(url)
      .then((response) => {
        setEstudiantes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (event) => {

    event.preventDefault();
    console.log(selectedDate)
        // Obtener las partes de la fecha (año, mes, día)
        
    if (selectedDate==null){

      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Escoge una fecha para agendar cita",
        showConfirmButton: false,
        allowOutsideClick: false,
        showCancelButton: false,
        timer: 2000,
      });
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");

    // Combinar las partes de la fecha y hora seleccionada manualmente
    const fechaHora = `${year}-${month}-${day}T${selectedTime}`;

    const requestData = {
      cedula_profesional: sessionStorage.getItem('cedula'),
      cedula_estudiante: selectedIdentificacion,
      fecha_Sesion: fechaHora,
    };

    
    api
      .post("/sesiones/crear_sesion/", requestData)
      .then((response) => {
        console.log("Fecha seleccionada:", selectedDate);
        console.log("Identificación del estudiante:", selectedIdentificacion);
       /*  handleModalClose(); */
        Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: "Se ha creado la cita con éxito",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Verifica los datos",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 2000,
        });
      });
  };



  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentDate(date);
  };



  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "-150px",
          marginRight: "350px",
          marginTop: "-50px",
        }}
      >
        <input
          type="text"
          placeholder="Filtrar por cédula"
          value={identificacionFiltro}
          onChange={handleIdentificacionFilter}
          style={{
            width: "200px",
            marginBottom: "15px",
          }}
        />

        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={nombreFiltro}
          onChange={handleNombreFilter}
          style={{
            width: "200px",
            marginBottom: "15px",
          }}
        />

        <input
          type="text"
          placeholder="Filtrar por código"
          value={codigoFiltro}
          onChange={handCodigoFilter}
          style={{
            width: "200px",
            marginBottom: "15px",
          }}
        />
      </div>

      <section
        className="intro"
        style={{ marginLeft: "-350px", marginTop: "0px" }}
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
                        style={{
                          position: "relative",
                          height: "400px",
                          weight: "700px",
                        }}
                      >
                        <table className="table table-striped mb-0">
                          <thead style={{ backgroundColor: "#D02424" }}>
                            <tr>
                              <th scope="col">Nombre</th>
                              <th scope="col">Apellidos</th>
                              <th scope="col">Correo</th>
                              <th scope="col">Fecha de nacimiento</th>
                              <th scope="col">Identificación</th>
                              <th scope="col">Celular</th>
                              <th scope="col">Código</th>
                              <th scope="col">Crear sesión</th>
                            </tr>
                          </thead>
                          <tbody>
                            {estudiantes.map((estudiante) => (
                              <tr key={estudiante.id}>
                                <td>{estudiante.nombre}</td>
                                <td>
                                  {estudiante.primer_apellido +
                                    " " +
                                    estudiante.segundo_apellido}
                                </td>
                                <td>{estudiante.correo_institucional}</td>
                                <td>{estudiante.fecha_nacimiento}</td>
                                <td>{estudiante.doc_identidad}</td>
                                <td>{estudiante.celular}</td>
                                <td>{estudiante.codigo_estudiantil}</td>
                                <td colSpan="4" className="text-center">
                                  <button
                                    className="btn btn-sm btn-danger"
                                    style={{ width: "85px", fontSize: "20px" }}
                                    onClick={() => {
                                      handleModalOpen();
                                      setSelectedIdentificacion(
                                        estudiante.doc_identidad
                                      );
                                    }}
                                  >
                                    +
                                  </button>
                                </td>
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

      {/* Modal crear sesion */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Crear sesión</Modal.Title>
          <Button variant="danger" onClick={handleModalClose}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
  <form onSubmit={handleFormSubmit}>
    <div className="form-group">
      <label>Estudiante:</label>
      <input
        type="text"
        className="form-control"
        value={selectedIdentificacion}
        readOnly
      />
    </div>
    <div className="form-group">
      <label>Fecha:</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="form-control"
        placeholderText="Seleccionar fecha"
      />
    </div>

    <div>
      <h3>Selecciona la hora:</h3>
      <TimePicker
        onChange={handleTimeChange}
        value={selectedTime}
        disableClock={true} // Deshabilita el reloj interactivo para tener solo los campos numéricos
        hourPlaceholder="HH"
        minutePlaceholder="mm"
        clearIcon={null} // Oculta el icono de borrar (x)
      />
    </div>

    <div className="form-group">
      <button type="submit" className="btn btn-primary">Enviar</button>
    </div>
  </form>
</Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="danger"
            onClick={() => {
              handleModalClose();
            }}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
