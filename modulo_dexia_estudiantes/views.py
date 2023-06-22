from django.shortcuts import render


from rest_framework import generics, permissions
from .filters import EstudianteFilter, RemisionFilter, Programa_acompañamientoFilter
from .serializers import EstudianteSerializer, ProgramaAcompanamientoSerializer, RemisionSerializer
from .models import Estudiante, Programa_acompañamiento, Remision



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