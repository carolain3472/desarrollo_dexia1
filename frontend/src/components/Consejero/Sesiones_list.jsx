import React, { useState, useEffect } from "react";
import { api } from "../../api/register_api";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Scss/modal.css";

export function Sesiones_list() {
  const dimensiones = ["Alto", "Medio", "Bajo", "Ninguno"];
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const [sesiones, setSesiones] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    fetchSesiones();
  }, [selectedDate, initialLoad]);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const fetchSesiones = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0]; // Formatear la fecha como YYYY-MM-DD
      if (initialLoad) {
        const response = await api.get("sesiones/listar_sesiones/");
        setSesiones(response.data);
      } else {
        const response = await api.get(
          `sesiones/listar_sesiones/?fecha=${formattedDate}`
        );
        console.log(selectedDate);
        setSesiones(response.data);
      }
    } catch (error) {
      console.error("Error al obtener las sesiones:", error);
    }
  };

  const [selectedOptionsRiesgo, setSelectedOptionsRiesgo] = useState({});

  const handleOptionChange = (fila, dimension) => {
    setSelectedOptionsRiesgo((prevOptions) => ({
      ...prevOptions,
      [fila]: dimension,
    }));
  };

  const renderRows = () => {
    const preguntas = [
      "Riesgo individual",
      "Riesgo familiar",
      "Riesgo académico",
      "Riesgo económico",
      "Riesgo universitario",
      "Riesgo psicológico",
    ];

    return preguntas.map((pregunta, index) => (
      <tr style={{ border: "1px solid black" }} key={index}>
        <td style={{ border: "1px solid black" }}>{pregunta}</td>
        {dimensiones.map((dimension, dimIndex) => (
          <td key={dimIndex}>
            <input
              type="radio"
              name={`radio_${index}`}
              value={dimension}
              checked={selectedOptionsRiesgo[index] === dimension}
              onChange={() => handleOptionChange(index, dimension)}
              required
              style={{ marginLeft: "36%" }}
            />
          </td>
        ))}
      </tr>
    ));
  };

  /*---------------------------------------------------------------------------------------*/
  const [texto, setTexto] = useState("");
  const maxLength = 200;

  const handleChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= maxLength) {
      setTexto(inputText);
    }
  };

  const [texto1, setTexto1] = useState("");

  const handleChange1 = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= maxLength) {
      setTexto1(inputText);
    }
  };
  

  const [texto2, setText2] = useState("");

  const handleChange2 = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= maxLength) {
      setText2(inputText);
    }
  };


  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "500px",
          marginTop: "50px",
        }}
      >
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="YYY-MM-dd"
          className="form-control"
          style={{
            display: "block",
            width: "200px",
            marginBottom: "15px",
          }}
        />
      </div>

      <section
        className="intro"
        style={{ marginLeft: "300px", marginTop: "70px" }}
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
                              <th scope="col">Estudiante</th>
                              <th scope="col">Fecha</th>
                              <th scope="col">Hora</th>
                              <th scope="col">Tipo de sesión</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sesiones.map((sesion) => (
                              <tr key={sesion.id}>
                                <td>{sesion.estudiante}</td>
                                <td>
                                  {new Date(sesion.fecha).toLocaleDateString(
                                    "es-ES",
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </td>
                                <td>
                                  {new Date(sesion.fecha).toLocaleTimeString(
                                    "es-ES",
                                    { hour: "2-digit", minute: "2-digit" }
                                  )}
                                </td>

                                <td>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    style={{ width: "50%", fontSize: "20px" }}
                                    onClick={() => {
                                      handleModalOpen();
                                    }}
                                  >
                                    Primera vez
                                  </button>

                                  <button
                                    className="btn btn-sm btn-danger"
                                    style={{
                                      width: "30%",
                                      fontSize: "20px",
                                      marginLeft: "5%",
                                    }}
                                    onClick={() => {
                                      handleModalOpen();
                                    }}
                                  >
                                    Seguimiento
                                  </button>
                                </td>
                              </tr>
                            ))}
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
        className="custom-modal"
      >
        <Modal.Header
          style={{ background: "#E55E5E", color: "white", textAlign: "center" }}
        >
          <Modal.Title style={{ textAlign: "center", marginLeft: "27%" }}>
            Formulario de primer sesión
          </Modal.Title>
          <Button
            style={{ background: "#D95959" }}
            variant="danger"
            onClick={handleModalClose}
          >
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            background: "#F4EEEE",
          }}
        >
          <form>
            <div
              style={{
                background: "white",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <ol>
                <li
                  style={{
                    fontSize: "1.2rem",
                    color: "black",
                    marginBottom: "2%",
                  }}
                >
                  <label htmlFor="estimacion_media">
                    ¿El estudiante asistió a su cita?:
                  </label>
                </li>
                <div
                  className="custom-radio"
                  style={{
                    marginLeft: "35%",
                    marginTop: "2%",
                    marginBottom: "3%",
                  }}
                >
                  <input type="radio" name="asistencia" id="si" />
                  <label htmlFor="si" style={{ fontSize: "16px" }}>
                    Sí
                  </label>
                </div>
                <div className="custom-radio" style={{ marginLeft: "10%" }}>
                  <input type="radio" name="asistencia" id="no" />
                  <label htmlFor="no" style={{ fontSize: "1rem" }}>
                    No
                  </label>
                </div>
                <li style={{ fontSize: "1.2rem", color: "black" }}>
                  <label htmlFor="estimacion_media">
                    Riesgo que posee el estudiante según la dimension:
                  </label>
                </li>
                <table
                  style={{
                    marginLeft: "15%",
                    marginTop: "3%",
                    marginBottom: "3%",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          backgroundColor: "#EB5656",
                          color: "white",
                          padding: "10px",
                          border: "1px solid black",
                        }}
                      >
                        Pregunta
                      </th>
                      <th
                        style={{
                          backgroundColor: "#EB5656",
                          color: "white",
                          padding: "10px",
                          border: "1px solid black",
                        }}
                      >
                        Alta
                      </th>
                      <th
                        style={{
                          backgroundColor: "#EB5656",
                          color: "white",
                          padding: "10px",
                          border: "1px solid black",
                        }}
                      >
                        Medio
                      </th>
                      <th
                        style={{
                          backgroundColor: "#EB5656",
                          color: "white",
                          padding: "10px",
                          border: "1px solid black",
                        }}
                      >
                        Bajo
                      </th>
                      <th
                        style={{
                          backgroundColor: "#EB5656",
                          color: "white",
                          padding: "10px",
                          border: "1px solid black",
                        }}
                      >
                        Ninguno
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      accentColor: "#850000",
                      borderLeft: "1px solid black",
                      border: "1px solid black",
                    }}
                  >
                    {renderRows()}
                  </tbody>
                </table>
                <li
                  style={{
                    fontSize: "1.2rem",
                    color: "black",
                    marginBottom: "2%",
                  }}
                >
                  <label style={{ display: "inline" }}>
                    En su rendimiento académico, usted percibe con relación a su
                    grupo, que se encuentra:
                  </label>
                </li>
                <div>
                  <input
                    className="radio"
                    type="radio"
                    id="si"
                    name="respuesta"
                  />
                  <label className="letra">Por debajo de la media</label>
                </div>
                <div>
                  <input
                    className="radio"
                    type="radio"
                    id="no"
                    name="respuesta"
                  />
                  <label className="letra">Por encima de la media</label>
                </div>
                <div>
                  <input
                    className="radio"
                    type="radio"
                    id="no"
                    name="respuesta"
                  />
                  <label className="letra">En la media</label>
                </div>
                <div>
                  <input
                    className="radio"
                    type="radio"
                    id="no"
                    name="respuesta"
                  />
                  <label className="letra">No sabe / No responde</label>
                </div>
                <li
                  style={{
                    fontSize: "1.2rem",
                    color: "black",
                    marginTop: "2%",
                  }}
                >
                  <label style={{ display: "inline" }}>
                    {" "}
                    ¿Cuáles son las expectativas del acompañamiento? (opcional,
                    sólo cuando el estudiante haya solicitado el acompañamiento)
                  </label>
                </li>
                <textarea
                  value={texto}
                  onChange={handleChange}
                  maxlength="200"
                  name="textoArea"
                  cols="70"
                  rows="5"
                  style={{ marginTop: "3%", resize: "none" }}
                ></textarea>
                <div style={{ marginLeft: "85%" }}>
                  {texto.length} / {maxLength}
                </div>

                <li style={{marginBottom:'2%',    fontSize: "1.2rem",
                   color: "black",}}>
                  <label style={{ display: "inline", 
                   fontSize: "1.2rem",
                   color: "black",
                 }}>
                
                    {" "}
                    Palabras clave que describan este caso en específico:
                  </label>
                </li>

                <textarea
                  value={texto1}
                  onChange={handleChange1}
                  maxlength="200"
                  name="textoArea"
                  cols="70"
                  rows="5"
                  style={{ marginTop: "3%", resize: "none" }}
                ></textarea>
                <div style={{ marginLeft: "85%" }}>
                  {texto1.length} / {maxLength}
                </div>





                <li style={{
                    fontSize: "1.2rem",
                    color: "black",
                    marginBottom: "2%",
              
                  }}>
                  <label >
                    ¿Ha sido diagnosticado(a) con algún tipo de discapacidad?
                  </label>
                </li>

                <div>
                  <input className="radio" type="radio" id="si" name="respuesta1" />
                  <label className="letra">No ha sido diagnosticad@</label>
                </div>
                <div>
                  <input className="radio" type="radio" id="no" name="respuesta1" />
                  <label className="letra">Discapacidad fisica</label>
                </div>
                <div>
                  <input className="radio" type="radio" id="no" name="respuesta1" />
                  <label className="letra">Discapacidad visual</label>
                </div>
                <div>
                  <input className="radio" type="radio" id="no" name="respuesta1" />
                  <label className="letra">Discapacidad auditiva</label>
                </div>
                <div>
                  <input className="radio" type="radio" id="no" name="respuesta1" />
                  <label className="letra">Discapacidad de aprendizaje</label>
                </div>
                <div>
                  <input className="radio" type="radio" id="no" name="respuesta1" />
                  <label className="letra">Discapacidad psicosocial</label>
                </div>


                <li style={{
                    fontSize: "1.2rem",
                    color: "black",
                    marginBottom: "2%",
              
                  }} >

                  <label style={{ display: "inline" }}> EPS: </label>
                </li>
                <textarea
                  maxlength="200"
                  name="textoArea"
                  cols="70"
                  rows="2"
                  style={{ marginTop: "1%", resize: "none" }}
                ></textarea>



                <li style={{
                    fontSize: "1.2rem",
                    color: "black",
                    marginBottom: "2%",
              
                  }}>
                  <label style={{ display: "inline" }}>
                    {" "}
                    ¿Cuál o cuáles son las razones por las cuales te encuentras
                    en este momento en el programa académico que elegiste?{" "}
                  </label>
                </li>

                <textarea
                  value={texto2}
                  onChange={handleChange2}
                  maxlength="200"
                  name="textoArea"
                  cols="70"
                  rows="5"
                  style={{ marginTop: "3%", resize: "none" }}
                ></textarea>
                <div style={{ marginLeft: "85%" }}>
                  {texto2.length} / {maxLength}
                </div>



                <li style={{
                    fontSize: "1.2rem",
                    color: "black",
                    marginBottom: "2%",
                  }}>

                  <label style={{ display: "inline" }}>
                    {" "}
                    Contacto adicional:{" "}
                  </label>
                </li>
                <textarea
                  maxlength="200"
                  name="textoArea"
                  cols="70"
                  rows="2"
                  style={{ marginTop: "1%", resize: "none" }}
                ></textarea>


                <li style={{
                    fontSize: "1.2rem",
                    color: "black",
                    marginBottom: "2%",
                  }}>
                  <label htmlFor="estimacion_media">
                    ¿Ha tenido que cancelar materias a lo largo del semestre?:
                  </label>
                </li>
                
                <div
                  className="custom-radio"
                  style={{
                    marginLeft: "35%",
                    marginTop: "2%",
                    marginBottom: "3%",
                  }}
                >
                  <input type="radio" name="materias" id="si1" />
                  <label htmlFor="si1" style={{ fontSize: "16px" }}>
                    Sí
                  </label>
                </div>
                <div className="custom-radio" style={{ marginLeft: "10%" }}>
                  <input type="radio" name="materias" id="no1" />
                  <label htmlFor="no1" style={{ fontSize: "1rem" }}>
                    No
                  </label>
                </div>
              



                <li>
                  <label style={{ display: "inline" }}>
                    {" "}
                    ¿Por qué motivo?{" "}
                  </label>
                </li>
                <input
                  type="checkbox"
                  name="respuesta5"
                  style={{ accentColor: "red" }}
                />{" "}
                Personal
                <input
                  type="checkbox"
                  name="respuesta5"
                  style={{ accentColor: "red" }}
                />{" "}
                Económico
                <input
                  type="checkbox"
                  name="respuesta5"
                  style={{ accentColor: "red" }}
                />{" "}
                Familiar
                <input
                  type="checkbox"
                  name="respuesta5"
                  style={{ accentColor: "red" }}
                />{" "}
                Académico
                <input
                  type="checkbox"
                  name="respuesta5"
                  style={{ accentColor: "red" }}
                />{" "}
                Salud fisica
                <input
                  type="checkbox"
                  name="respuesta5"
                  style={{ accentColor: "red" }}
                />{" "}
                Salud mental
                <li>
                  <label style={{ display: "inline" }}>
                    {" "}
                    ¿Cuál o cuáles considera las materias más complejas que ha
                    visto?{" "}
                  </label>
                </li>
                <input
                  type="text"
                  style={{ width: "70%", marginLeft: "10%", height: "150px" }}
                />
                <li>
                  <label style={{ display: "inline" }}>
                    {" "}
                    Descripción general de la situación por la cual participa en
                    este encuentro (esta pregunta debe resumir la situación
                    descrita por el estudiante)
                  </label>
                </li>
                <input
                  type="text"
                  style={{ width: "70%", marginLeft: "10%", height: "150px" }}
                />
                <li>
                  <label htmlFor="estimacion_media">
                    ¿Habrá próxima reunión?:
                  </label>
                </li>
                <input
                  type="radio"
                  name="respuestaReunion"
                  style={{ accentColor: "red" }}
                />{" "}
                Sí
                <input
                  type="radio"
                  name="respuestaReunion"
                  style={{ accentColor: "red" }}
                />{" "}
                No
                <li>
                  <label htmlFor="estimacion_media">
                    ¿Habrá próxima reunión?:
                  </label>
                </li>
                <input type="date" />{" "}
                <li>
                  <label htmlFor="estimacion_media">
                    Orientación remitida:
                  </label>
                </li>
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                ASES
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Psicología
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Trabajo social
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Secretaria académica
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Desarrollo humano y promoción socieconómica
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Asuntos estudiantiles
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Deporte, recreación y cultura
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Centro de estudios de género
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Campus diverso
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                GRACA
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Asuntos étnicos
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Programas de discapacidad e inclusión
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Comité de derechos humanos
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Red CAAL
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Equipo de consejería
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Servicio psicológico
                <input
                  type="checkbox"
                  name="respuesta4"
                  style={{ accentColor: "red" }}
                />{" "}
                Externo
              </ol>
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

          <Button
            type="submit"
            variant="danger"
            onClick={() => {
              handleModalClose();
            }}
          >
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
