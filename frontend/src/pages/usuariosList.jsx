import React from 'react'
import { Usuarios } from '../components/usuarios'
import { NavbarAdmin } from '../components/Nav_bar'

export function UsuariosList_all() {
  return (
    <div>
    <NavbarAdmin/>
    <Usuarios/>
    </div>
  )
}
