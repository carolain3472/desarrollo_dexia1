import { NavbarAdmin } from '../components/Nav_bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAnchor, faHome, faTachometerAlt, faFileUpload, faPhotoVideo, faBuildingColumns, faUsers, faMoneyCheckAlt, faCogs, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import React from 'react'

export function Inicio_app() {
    const storedNombre= sessionStorage.getItem("nombre")
  return (
    <div>

<NavbarAdmin/>


          <div className='dashboard-app' style={{ marginTop: 0, paddingTop: 0 }} >

          <div className='dashboard-content'>
            <div className='container'>
              <div className='card'>
                <div className='card-header' >
                  <h1>Bienvenid@ {storedNombre}</h1>
                </div>
                <div className='card-body'>
                  <p>Estás dentro del sistema como: Administrador</p>
                </div>
              </div>
            </div>
          </div>
  </div> 

    </div>
  )
}