# desarrollo_dexia1
Para ejecutar el back (con gitbash):

source venv/Scripts/activate

pip install -r requirements.txt

python manage.py makemigrations modulo_base_login

python manage.py makemigrations modulo_dexia_estudiantes 

python manage.py migrate

python manage.py runserver

--------------------------------------------------------------

Para ejecutar el front (con gitbash):

cd frontend

npm install

npm run dev

