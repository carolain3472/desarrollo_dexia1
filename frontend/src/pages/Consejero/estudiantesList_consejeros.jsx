import React from 'react'
import { Estudiantes_consejeros} from '../../components/Consejero/Estudiantes_consejeros'
import {NavbarConsejeros} from '../../components/Consejero/Nav_bar_consejeros'

export function EstudiantesList_consejeros() {
  return (
    <div style={{marginTop: '100px', marginLeft:'600px'}}>
       <NavbarConsejeros/>
       <Estudiantes_consejeros/>


    </div>

  )
}

