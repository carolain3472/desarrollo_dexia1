import React, { useState } from 'react';

import { login } from '../api/login.api';



export const LoginComp = () => {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Realizar el inicio de sesión
    
    console.log(cedula)
    console.log(password)

    const response = await login(cedula, password);

    // Verificar si el inicio de sesión fue exitoso
    if (response.token && response.user) {
      // Almacena el token y el usuario en el almacenamiento local (opcional)
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log("Hola, si funcionó login")

      // Redireccionar a la siguiente página después del inicio de sesión
    } else {
      // Manejar el caso de inicio de sesión fallido
      // ...
    }
  };

  return (
    <div id='form-box'> 

      <form onSubmit={handleSubmit}>
      <input id='cedula'
        type="text"
        placeholder="Cédula"
        value={cedula}
        onChange={(event) => setCedula(event.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>


    </div>
  );
};
