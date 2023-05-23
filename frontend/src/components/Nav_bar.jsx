import "bootstrap/dist/css/bootstrap.css";
import "../Scss/navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAnchor, faHome, faTachometerAlt, faFileUpload, faPhotoVideo, faBuildingColumns, faUsers, faMoneyCheckAlt, faCogs, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import React, { useEffect, useState } from 'react';
import { mobileScreen } from '../api/navbar'; // Importa mobileScreen desde el archivo navbar.js
import axios from 'axios';
import { Button, Modal } from "react-bootstrap";

export function NavbarAdmin() {
  const storedCel = sessionStorage.getItem('nombre');
  const [isMobileScreen, setIsMobileScreen] = useState(mobileScreen.matches);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileScreen(mobileScreen.matches);
    };

    mobileScreen.addEventListener('change', checkScreenSize);

    return () => {
      mobileScreen.removeEventListener('change', checkScreenSize);
    };
  }, []);

  const toggleNavDropdown = (event) => {
    const dropdown = event.currentTarget.closest('.dashboard-nav-dropdown');
    dropdown.classList.toggle('show');

    const siblingDropdowns = dropdown.parentNode.querySelectorAll('.dashboard-nav-dropdown.show');
    siblingDropdowns.forEach((siblingDropdown) => {
      if (siblingDropdown !== dropdown) {
        siblingDropdown.classList.remove('show');
      }
    });
  };

  const toggleMenu = () => {
    if (isMobileScreen) {
      const dashboardNav = document.querySelector('.dashboard-nav');
      dashboardNav.classList.toggle('mobile-show');
    } else {
      const dashboard = document.querySelector('.dashboard');
      dashboard.classList.toggle('dashboard-compact');
    }
  };

  const handleLogout = () => {
    const cedulaUser = sessionStorage.getItem("cedula");
    console.log(cedulaUser)

    axios
      .post("http://localhost:8000/logout/", { cedula: cedulaUser })
      .then((response) => {
        console.log("Logout exitoso");
        sessionStorage.removeItem("cedula");
        window.location.href = "http://localhost:5173/login/";
      })
      .catch((error) => {
        console.error("Error al realizar el logout", error);
      });
  };

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className='dashboard'>
      <div className='dashboard-nav'>
        <header>
          <a href='#!' className='menu-toggle'>
            <FontAwesomeIcon icon={faBars} />
          </a>
          <a href='#!' className='brand-logo'>
            <FontAwesomeIcon icon={faBuildingColumns} style={{ color: "#ffffff" }} /> <span>DEXIA</span>
          </a>
        </header>
        <nav className='dashboard-nav-list'>
          <a href='#!' className='dashboard-nav-item'>
            <FontAwesomeIcon icon={faHome} /> Home
          </a>
          <a href='#!' className='dashboard-nav-item active'>
            <FontAwesomeIcon icon={faTachometerAlt} /> Informes
          </a>
          <a href='#!' className='dashboard-nav-item'>
            <FontAwesomeIcon icon={faFileUpload} /> Carga masiva
          </a>
          <div className='dashboard-nav-dropdown'>
            <a href='#!' className='dashboard-nav-item'>
              <FontAwesomeIcon icon={faUser} /> Registrar usuario
            </a>
          </div>
          <div className='dashboard-nav-dropdown'>
            <a href='#!' className='dashboard-nav-item dashboard-nav-dropdown-toggle'>
              <FontAwesomeIcon icon={faUsers} /> Usuarios
            </a>
            <div className='dashboard-nav-dropdown-menu'>
              <a href='#!' className='dashboard-nav-dropdown-item'>Todos</a>
              <a href='#!' className='dashboard-nav-dropdown-item'>Activos</a>
              <a href='#!' className='dashboard-nav-dropdown-item'>Inactivos</a>
              <a href='#!' className='dashboard-nav-dropdown-item'>Estudiantes</a>
              <a href='#!' className='dashboard-nav-dropdown-item'>Consejeros</a>
            </div>
          </div>
          <a href='#!' className='dashboard-nav-item'>
            <FontAwesomeIcon icon={faCogs} /> Perfil
          </a>
          <div className='nav-item-divider'></div>
          <a  onClick={handleModalOpen} className='dashboard-nav-item'>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </a>
        </nav>
      </div>
      <div className='dashboard-app'>
        <header className='dashboard-toolbar'>
          <a href='#!' className='menu-toggle'>
            <FontAwesomeIcon icon={faBars} />
          </a>
        </header>
        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>
              <div className='card-header'>
                <h1>Bienvenid@ {storedCel}</h1>
              </div>
              <div className='card-body'>
                <p>Estás dentro del sistema como: Administrador</p>
              </div>

          

              <Modal show={showModal} onHide={handleModalClose} centered backdrop="static">
  <Modal.Header>
    <Modal.Title>Salir de la sesión</Modal.Title>
    <Button variant="danger" onClick={handleModalClose}>
      <span aria-hidden="true">&times;</span>
    </Button>
  </Modal.Header>
  <Modal.Body>¿Deseas finalizar la sesión?</Modal.Body>
  <Modal.Footer>
    <Button type="submit" variant="danger" onClick={() => { handleModalClose(); handleLogout(); }}>
      Salir
    </Button>
  </Modal.Footer>
</Modal>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
