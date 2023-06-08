from django.shortcuts import render


from rest_framework import generics, permissions
from .filters import EstudianteFilter, RemisionFilter
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

