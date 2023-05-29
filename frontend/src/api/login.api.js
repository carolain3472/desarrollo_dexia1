import axios from 'axios';



export const login = async (cedula, password) => {
    try {

      const [values, setValues] = useState({
        email: '',
        password: '',
      })
    
    
      const peticion_login = async () => {
        const response = await axios({
          url: 'http://localhost:8000/login/',
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          data: JSON.stringify( { 
            cedula: values.cedula, 
            password: values.password 
          })
        });
        console.log(response)    
        console.log(response.data)
      }
    
      const loginSubmit = async (e) => {      
        e.preventDefault();    
        peticion_login(); 
      }

      //const response = await axios.post('http://localhost:8000/login_user/', headers: { 'Content-type': 'application/json' }, { cedula, password });
      const { token, user } = response.data;
  
      // Almacena el token y el usuario en el almacenamiento local
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));


      console.log('Inicio de sesión exitoso');
      console.log('Token:', token);
      console.log('Usuario:', user);
  
      // Retorna el token y el usuario en caso de que quieras utilizarlos en el componente React
      return { token, user };

  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error(error.response.data); // Datos de error proporcionados por el servidor
      console.error(error.response.status); // Código de estado HTTP de la respuesta
      console.error(error.response.headers); // Encabezados de la respuesta
    } else if (error.request) {
      // La solicitud fue realizada, pero no se recibió ninguna respuesta del servidor
      console.error(error.request);
    } else {
      // Ocurrió un error al configurar la solicitud
      console.error('Error', error.message);
    }
    console.error(error.config); // Configuración de la solicitud que causó el error
  }
};

