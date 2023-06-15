import React from 'react'
import { Configuracion_consejero } from '../../components/Consejero/configuracion_consejero'
import { NavbarConsejeros } from '../../components/Consejero/Nav_bar_consejeros'

export function Configuracion_consejero_page() {
  return (
    <div>
    <NavbarConsejeros/>
    <Configuracion_consejero/>
    </div>

  )
}