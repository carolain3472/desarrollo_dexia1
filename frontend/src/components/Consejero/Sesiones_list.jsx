import React, { useState, useEffect } from 'react';
import { api } from '../../api/register_api';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function Sesiones_list() {
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
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Formatear la fecha como YYYY-MM-DD
      if (initialLoad) {
        const response = await api.get('sesiones/listar_sesiones/');
        setSesiones(response.data);
      } else {
        const response = await api.get(`sesiones/listar_sesiones/?fecha=${formattedDate}`);
        console.log(selectedDate)
        setSesiones(response.data);
      }
    } catch (error) {
      console.error('Error al obtener las sesiones:', error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: '500px',
          marginTop: '50px',
        }}
      >
        
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="YYY-MM-dd"
          className="form-control"
          style={{
            display:'block',
            width: '200px',
            marginBottom: '15px',
          }}

        />
      </div>

      <section className="intro" style={{ marginLeft: '300px', marginTop: '70px' }}>
        <div className="bg-image h-100" style={{ backgroundColor: 'white' }}>
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
                          position: 'relative',
                          height: '400px',
                          weight: '700px',
                        }}
                      >
                        <table className="table table-striped mb-0">
                          <thead style={{ backgroundColor: '#D02424' }}>
                            <tr>
                              <th scope="col">Estudiante</th>
                              <th scope="col">Asistencia</th>
                              <th scope="col">Fecha creación</th>
                              <th scope="col">Descripción</th>
                              <th scope="col">Fecha de sesión</th>
                              <th scope="col">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sesiones.map((sesion) => (
                              <tr key={sesion.id}>
                                <td>{sesion.estudiante}</td>
                                <td>{sesion.asistencia ? 'Presente' : 'Ausente'}</td>
                                <td>{sesion.fecha}</td>
                                <td>{sesion.descripcion}</td>
                                <td>{sesion.fecha_proxima_sesion}</td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    style={{ width: '85px', fontSize: '20px' }}
                                    onClick={() => {
                                      handleModalOpen();
                                    }}
                                  >
                                    Aplicar
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
      <Modal show={showModal} onHide={handleModalClose} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Crear sesión</Modal.Title>
          <Button variant="danger" onClick={handleModalClose}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>Holiiii</Modal.Body>
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

