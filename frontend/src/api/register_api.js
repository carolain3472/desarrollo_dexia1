import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
  });


export const createuser = (first_name, cedula, email, primer_apellido, segundo_apellido) => {
    return api.post("/login/registro",  { first_name, cedula, email, primer_apellido, segundo_apellido })
}

