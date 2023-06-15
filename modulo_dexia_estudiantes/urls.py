from .views import *
from django.urls import path, include

urlpatterns = [
    path('crear/', CrearEstudiantesView.as_view(), name='crear_estudiantes'),
    path('listar_estudiantes/', ListarEstudiantes.as_view(), name='listar_estudiantes'),
    path('listar_programa/', ListarProgramaAcompanamiento.as_view(), name='listar_programa'),
    path('listar_remision/', ListarRemision.as_view(), name='listar_remision'),
]