from django.shortcuts import render
from rest_framework.permissions import AllowAny
from modulo_dexia_estudiantes.models import Facultad, ProgramaAcademico, Sede, Estudiante, Estudiante_programa
from rest_framework.views import APIView
from .serializers import SesionSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Sesion
from modulo_base_login.models import CustomUser
from datetime import datetime
from datetime import date
from django.http import Http404

class CrearSesion(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = SesionSerializer(data=request.data)
        cedula_profesional = request.data.get("cedula_profesional")
        cedula_estudiante = request.data.get("cedula_estudiante")
        fecha_str = request.data.get("fecha_Sesion")

        try:

            # Obtener el profesional y el estudiante por su cédula
            profesional = CustomUser.objects.get(cedula = str(cedula_profesional))
            estudiante = Estudiante.objects.get(doc_identidad= str(cedula_estudiante))
            print(profesional)
            print(estudiante)

            # Convertir la fecha de cadena a objeto datetime
            fecha = datetime.strptime(fecha_str, "%Y-%m-%dT%H:%M:%S.%fZ")

            
            # Obtener solo la parte de la fecha (sin la hora)
            fecha_proxima_sesion = fecha.date()
            print(fecha_proxima_sesion)

            # Crear una nueva instancia de Sesion con los datos recibidos
            sesion = Sesion(
                profesional=profesional,
                estudiante=estudiante,
                fecha_proxima_sesion=fecha_proxima_sesion,
            )

            # Guardar la sesión en la base de datos
            sesion.save()
            print('guardo')

            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class ListarSesiones(APIView):
    def get(self, request):
        fecha = request.GET.get('fecha')  # Obtener el parámetro 'fecha' de la solicitud GET
        

        if fecha:
            try:
                fecha = date.fromisoformat(fecha)
                print(fecha)
                sesiones = Sesion.objects.filter(fecha_proxima_sesion=fecha)
                
            except ValueError:
                raise Http404("Fecha inválida")
        else:
            sesiones_hoy = Sesion.objects.filter(fecha_proxima_sesion=date.today())
            if sesiones_hoy.exists():
                sesiones = sesiones_hoy
            else:
                sesiones = Sesion.objects.all()

        serializer = SesionSerializer(sesiones, many=True)
        return Response(serializer.data) 