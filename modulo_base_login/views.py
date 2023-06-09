from django_filters import rest_framework as filters

from django.shortcuts import render,redirect
from rest_framework import generics
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.generic.edit import FormView
from django.contrib.auth import login,logout,authenticate
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from django.db.models import Q

from .serializer import UsuarioSerializer
from rest_framework import viewsets
from django.contrib.auth.hashers import make_password
import pandas as pd
from .models import CustomUser
from modulo_dexia_estudiantes.models import Facultad, ProgramaAcademico, Sede, Estudiante, Estudiante_programa
from .filters import CustomUserFilter
from django.http import HttpResponse

from datetime import datetime

#JWT y  O2 de validacion de token 
class UsuariosList(viewsets.ModelViewSet):
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        cedula_acceso = request.data.get("cedula_acceso")

        try:
            user = CustomUser.objects.get(cedula=cedula_acceso)
            token_exists = Token.objects.filter(user=user).exists()

            if token_exists and user.role=="Administrador":
                queryset = CustomUser.objects.all()

                is_active = request.data.get("is_active")
                apellido = request.data.get("apellido")
                nombre = request.data.get("nombre")
                rol = request.data.get("rol")
                cedula = request.data.get("cedula")

                # Crear una lista de filtros a aplicar
                filters = Q()

                # Agregar los filtros según los parámetros proporcionados
                if is_active is not None:
                    filters &= Q(is_active=is_active)
                if apellido:
                    filters &= Q(primer_apellido__icontains=apellido)
                if nombre:
                    filters &= Q(first_name__icontains=nombre)
                    ##o filters &= Q(nombre__startswith=nombre)
                if rol == "Consejero":
                     filters &= Q(role="Consejero")
                if rol == "Administrador":
                     filters &= Q(role="Administrador")
                if rol == "Monitor":
                     filters &= Q(role="Monitor")
                if cedula:
                    filters &= Q(cedula__startswith=cedula)
                # Aplicar los filtros a la consulta de usuarios
                queryset = queryset.filter(filters)

                serializer = UsuarioSerializer(queryset, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist:
            pass

        return Response(status=status.HTTP_404_NOT_FOUND)
        


    

#class uploadFile(APIView):
class Validador_carga(APIView):
    def post(self, request):
        tipo = request.POST.get('tipo_de_carga')
        file = request.FILES.get('file')
        print(tipo)

        if tipo == 'Estudiantes':
            return carga_estudiantes(file)
        if tipo == 'Sede':
            return carga_sedes(file)
        elif tipo == 'Facultades':
            return carga_facultades(file)
        elif tipo == 'Programas':
            return carga_programa(file)
        else:
            return Response({'ERROR': 'No se seleccionó un tipo de carga válido.'})

def carga_estudiantes(file):
    print("entro al cargar estudiantes")
    print(file)

    datos = pd.read_csv(file, header=0)
    #print("estos son los datos: " + str(datos))

    for i in range(datos.shape[0]):
        profesional = CustomUser.objects.get(cedula = int(datos.iat[i, 0]))

        nombre = str(datos.iat[i, 1])
        primer_apellido = str(datos.iat[i, 2])
        segundo_apellido = str(datos.iat[i, 3])
        correo_institucional = str(datos.iat[i, 4])

        fecha_doc = str(datos.iat[i, 5])
        fecha_nacimiento = datetime.strptime(fecha_doc, "%Y-%m-%d").date()

        doc_identidad = str(datos.iat[i, 6])
        celular = str(datos.iat[i, 7])
        codigo_estudiantil = str(datos.iat[i, 8])

      
        sede = Sede.objects.get(identificador_univalle = int(datos.iat[i, 9]))
        facultad = Facultad.objects.get(id = int(datos.iat[i, 10]))
        programa = ProgramaAcademico.objects.get(identificador_univalle=int(datos.iat[i, 11]), sede=sede, facultad=facultad)
        


        if Estudiante.objects.filter(doc_identidad=doc_identidad).exists():
            
            estudiante = Estudiante.objects.get(doc_identidad=doc_identidad)
   
            if Estudiante_programa.objects.filter(estudiante=estudiante, programa=programa).exists():
                print(f'El estdiante con ID {doc_identidad} ya existe en el programa {datos.iat[i, 11]}, no se puede cargar nuevamente.')
            else:
                programa_estudiante = Estudiante_programa(estudiante=estudiante, programa=programa)
                programa_estudiante.save()

        else:
            estudiante = Estudiante(profesional=profesional, nombre=nombre, primer_apellido=primer_apellido, segundo_apellido=segundo_apellido,
                                    correo_institucional=correo_institucional, fecha_nacimiento=fecha_nacimiento, doc_identidad=doc_identidad, celular=celular,
                                    codigo_estudiantil=codigo_estudiantil)
            estudiante.save()

            programa_estudiante = Estudiante_programa(estudiante=estudiante, programa=programa)
            programa_estudiante.save()

    response = HttpResponse("Carga masiva completed successfully!")
    return response


def carga_facultades(file):
    print("entro al cargar facultades")
    print(file)

    datos = pd.read_csv(file, header=0)
    print("estos son los datos: " + str(datos))

    for i in range(datos.shape[0]):
        id_facultad = int(datos.iat[i, 0])
        nombre_facultad = str(datos.iat[i, 1])

        # Verificar si la Facultad ya existe en la base de datos
        if Facultad.objects.filter(id=id_facultad).exists():
            print(f'La Facultad con ID {id_facultad} ya existe, no se puede cargar nuevamente.')
        else:
            # Crear una nueva instancia de Facultad y guardarla en la base de datos
            facultad = Facultad(id=id_facultad, nombre=nombre_facultad)
            facultad.save()
            print(f'Facultad con ID {id_facultad} y nombre {nombre_facultad} guardada exitosamente.')

    response = HttpResponse("Carga masiva completed successfully!")
    return response

def carga_sedes(file):
    print("entro al cargar sedes")
    print(file)

    datos = pd.read_csv(file, header=0)
    print("estos son los datos: " + str(datos))

    for i in range(datos.shape[0]):
        identificador_univalle = int(datos.iat[i, 0])
        nombre_sede = str(datos.iat[i, 1])

        # Verificar si la Facultad ya existe en la base de datos
        if Sede.objects.filter(identificador_univalle=identificador_univalle).exists():
            print(f'La sede con ID {identificador_univalle} ya existe, no se puede cargar nuevamente.')
        else:
            # Crear una nueva instancia de Facultad y guardarla en la base de datos
            sede = Sede(identificador_univalle=identificador_univalle, nombre=nombre_sede)
            sede.save()
            print(f'Sede con ID {identificador_univalle} y nombre {nombre_sede} guardada exitosamente.')

    response = HttpResponse("Carga masiva completed successfully!")
    return response


def carga_programa(file):
    print("entro al cargar programas")
    print(file)

    datos = pd.read_csv(file, header=0)
    print("estos son los datos: " + str(datos))

    for i in range(datos.shape[0]):
        identificador_univalle = int(datos.iat[i, 0])
        facultad = Facultad.objects.get(id = int(datos.iat[i, 1]))
        nombre = str(datos.iat[i, 2])
        sede = Sede.objects.get(identificador_univalle = int(datos.iat[i, 3]))

        if ProgramaAcademico.objects.filter(sede=sede, identificador_univalle=identificador_univalle).exists():
            print(f'El programa con ID {identificador_univalle} ya existe en la sede {sede}, no se puede cargar nuevamente.')
        else:
            programa = ProgramaAcademico(identificador_univalle=identificador_univalle, facultad=facultad, nombre=nombre, sede=sede)
            programa.save()

    response = HttpResponse("Carga masiva completed successfully!")
    return response


class Login(FormView):
    template_name = "login_user.html"
    form_class = AuthenticationForm
    success_url = reverse_lazy('default:usuarioList1-list')

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self,request,*args,**kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.get_success_url())
        else:
            return super(Login,self).dispatch(request,*args,*kwargs)

    def form_valid(self,form):
        user = authenticate(username = form.cleaned_data['username'], password = form.cleaned_data['password'])
        token,_ = Token.objects.get_or_create(user = user)
        if token:
            login(self.request, form.get_user())
            print(user.is_active)
            return super(Login,self).form_valid(form)
        
class Logout(APIView):
    def post(self, request, format=None):
        cedula = request.data.get('cedula')

        try:
            # Buscar al usuario por nombre de usuario en la base de datos
            user = CustomUser.objects.get(cedula=cedula)
            
            # Eliminar el token de acceso del usuario
            Token.objects.filter(user=user).delete()
            
            return Response(status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    

class LoginView(APIView):
    def post(self, request):
        cedula = request.data.get('cedula')
        password = request.data.get('password')

        try:
            # Buscar al usuario por cédula en la base de datos
            usuario = CustomUser.objects.get(cedula=cedula)
            print(usuario)
            print(password)

            # Verificar la contraseña del usuario
            if usuario.check_password(password):
                # Autenticar al usuario y generar un token de autenticación
                user = authenticate(cedula=cedula, password=password)
                if user is not None:
                    login(request, user)
                    token, _ = Token.objects.get_or_create(user=user)
                    print(user.is_superuser)
                    return Response({'valid': True, 'token': token.key, 'nombre': usuario.first_name, 'correo': usuario.email, 'apellido': usuario.primer_apellido,
                                     'apellido_dos': usuario.segundo_apellido, 'rol': usuario.role, 'id':usuario.id
                                     
                                     })

        except CustomUser.DoesNotExist:
            raise AuthenticationFailed('Las credenciales proporcionadas son inválidas.')
        
        print("No existe el usuario o contra incorrecta")

        return Response({'valid': False})
    


class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        nombre= request.data.get('first_name')
        email= request.data.get('email')
        primer_apellido=request.data.get('primer_apellido')
        segundo_apellido= request.data.get('segundo_apellido')
        cedula= request.data.get("cedula")
        cedula_acceso= request.data.get("cedula_acceso")
        rol= request.data.get("rol")

        try:


            user = CustomUser.objects.get(cedula=cedula_acceso)

            token_exists = Token.objects.filter(user=user).exists()

            if token_exists:

                print(nombre)
                print(email)
                print(primer_apellido)
                print(segundo_apellido)
                print(rol)
                print("Entró")

            # Crear el superusuario
                superuser = CustomUser.objects.create_superuser(
                cedula=cedula,
                password=None,
                first_name=nombre,
                primer_apellido=primer_apellido,
                segundo_apellido=segundo_apellido,
                email=email,
                role= rol,
    )
                superuser.is_staff=True
                superuser.is_superuser=True
            
            
            return Response(status=status.HTTP_200_OK)
        except:
             return Response(status=status.HTTP_404_NOT_FOUND)
        
       
class cambiarEstado(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        cedula_acceso= request.data.get("cedula_acceso")
        cedula_cambio= request.data.get("cedula_cambio")

        try:


            user = CustomUser.objects.get(cedula=cedula_acceso)

            token_exists = Token.objects.filter(user=user).exists()

            if token_exists:
                print(cedula_cambio)
                userCambio = CustomUser.objects.get(cedula=cedula_cambio)
                estado= userCambio.is_active

                if estado:
                    userCambio.is_active=False
                    userCambio.save()
                else:
                    userCambio.is_active=True
                    userCambio.save()
            
            
            return Response(status=status.HTTP_200_OK)
        except:
             return Response(status=status.HTTP_404_NOT_FOUND)
        
class UpdateContraseña(APIView):

    def post(self, request):
        cedula= request.data.get('cedula')
        password= request.data.get('password')
        
        try:
            # Buscar al usuario por nombre de usuario en la base de datos
            user = CustomUser.objects.get(cedula=cedula)

            token_exists = Token.objects.filter(user=user).exists()

            if password=='' or password==' ':
                return Response(status=status.HTTP_400_BAD_REQUEST)


            if token_exists:
                user.set_password(password)
                user.save()
                print(password)
                return Response(status=status.HTTP_200_OK)
            else:
                # El token no está asociado al usuario
                return Response(status=status.HTTP_404_NOT_FOUND)


        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)