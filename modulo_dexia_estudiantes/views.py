from django.shortcuts import render


from rest_framework import generics, permissions
from .filters import EstudianteFilter, RemisionFilter, Programa_acompañamientoFilter
from .serializers import EstudianteSerializer, ProgramaAcompanamientoSerializer, RemisionSerializer, SedeSerializer, FacultadSerializer
from .models import Estudiante, Programa_acompañamiento, Remision, Sede, Facultad, ProgramaAcademico



# Create your views here.
class CrearEstudiantesView(generics.CreateAPIView):
    serializer_class = EstudianteSerializer
    permission_classes = [permissions.AllowAny]


class CrearProgramaView(generics.CreateAPIView):
    serializer_class = ProgramaAcompanamientoSerializer
    permission_classes = [permissions.AllowAny]


class CrearRemisionView(generics.CreateAPIView):
    serializer_class = RemisionSerializer
    permission_classes = [permissions.AllowAny]

class CrearSedeView(generics.CreateAPIView):
    serializer_class = SedeSerializer
    permission_classes = [permissions.AllowAny]

class CrearFacultadView(generics.CreateAPIView):
    serializer_class = FacultadSerializer
    permission_classes = [permissions.AllowAny]

class ListarEstudiantes(generics.ListAPIView):
    serializer_class = EstudianteSerializer
    queryset = Estudiante.objects.all()
    filterset_class = EstudianteFilter
    #permission_classes = [permissions.IsAuthenticated]

class ListarRemision(generics.ListAPIView):
    serializer_class = RemisionSerializer
    queryset = Remision.objects.all()
    filterset_class = RemisionFilter
    permission_classes = [permissions.IsAuthenticated]

class ListarProgramaAcompanamiento(generics.ListAPIView):
    serializer_class = ProgramaAcompanamientoSerializer
    queryset = Programa_acompañamiento.objects.all()
    filterset_class = Programa_acompañamientoFilter
    permission_classes = [permissions.IsAuthenticated]

class ListarSede(generics.ListAPIView):
    serializer_class = SedeSerializer
    queryset = Sede.objects.all()
    #filterset_class = Programa_acompañamientoFilter

class ListarFacultad(generics.ListAPIView):
    serializer_class = FacultadSerializer
    queryset = Facultad.objects.all()
    #filterset_class = Programa_acompañamientoFilter

class ListarPrograma(generics.ListAPIView):
    serializer_class = ProgramaAcompanamientoSerializer
    queryset = Programa_acompañamiento.objects.all()
    filterset_class = Programa_acompañamientoFilter

