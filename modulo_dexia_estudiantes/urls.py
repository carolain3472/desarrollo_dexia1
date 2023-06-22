from .views import *
from django.urls import path, include

urlpatterns = [
    path('crear/', CrearEstudiantesView.as_view(), name='crear_estudiantes'),
    path('crear_sede/', CrearSedeView.as_view(), name='crear_sede'),
    path('crear_facultad/', CrearFacultadView.as_view(), name='crear_facultad'),
    path('listar_estudiantes/', ListarEstudiantes.as_view(), name='listar_estudiantes'),
    path('listar_programa/', ListarProgramaAcompanamiento.as_view(), name='listar_programa'),
    path('listar_remision/', ListarRemision.as_view(), name='listar_remision'),
    path('listar_sede/', ListarSede.as_view(), name='listar_sede'),
]
