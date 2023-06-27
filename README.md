# desarrollo_dexia1

Para ejecutar el back (con gitbash):

python3 -m venv venv

source venv/Scripts/activate

pip install -r requirements.txt


# Crear variables de entorno

Crear un archivo con el nombre .env en la raiz del proyectoy y poner en él la siguiente configuración

```
DB_NAME=dexia
DB_USER=postgres
DB_PASSWORD=<tu contraseña en postgres>
DB_HOST=127.0.0.1
DB_PORT=5432
```

# Crear migraciones

python manage.py makemigrations modulo_base_login

python manage.py makemigrations modulo_dexia_estudiantes 

python manage.py makemigrations modulo_dexia_sesiones 

python manage.py migrate

# Correr el proyecto

python manage.py runserver

--------------------------------------------------------------

# Frontend

Para ejecutar el front (con gitbash):

cd frontend

npm install

npm run dev

