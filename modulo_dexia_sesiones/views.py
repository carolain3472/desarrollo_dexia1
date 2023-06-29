from django.shortcuts import render
from rest_framework.permissions import AllowAny
from modulo_dexia_estudiantes.models import Facultad, ProgramaAcademico, Sede, Estudiante, Estudiante_programa
from rest_framework.views import APIView
from .serializers import SesionSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Sesion
# Create your views here.
    
class CrearSesion(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = SesionSerializer(data=request.data)
        cedula_profesional= request.data.get("cedula_profesional")
        cedula_estudiante= request.data.get("cedula_estudiante")
        fecha= request.data.get("fecha_Sesion")

        try:
            print(cedula_profesional)
            print(cedula_estudiante)
            print(fecha)

                    # Crear una nueva instancia de Sesion con los datos recibidos
            sesion = Sesion(
              profesional=cedula_profesional,
              estudiante=cedula_estudiante,
              fecha=fecha,
             )

            # Guardar la sesión en la base de datos
            sesion.save()
            print('guardo')
            
            return Response(status=status.HTTP_200_OK)
        except:
             return Response(status=status.HTTP_404_NOT_FOUND)