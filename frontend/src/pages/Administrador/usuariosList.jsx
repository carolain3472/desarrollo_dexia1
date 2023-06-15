import React from 'react'
import { Usuarios } from '../../components/Administrador/usuarios'
import { NavbarAdmin } from '../../components/Administrador/Nav_bar'

export function UsuariosList_all() {
  return (
    <div>
    <NavbarAdmin/>
    <Usuarios/>
    </div>
  )
}
