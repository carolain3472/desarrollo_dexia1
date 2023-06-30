from .views import *
from django.urls import path, include
from .views import CrearSesion, ListarSesiones



urlpatterns = [
    path('crear_sesion/', CrearSesion.as_view(), name='crear_sesion'),
    path('listar_sesiones/', ListarSesiones.as_view(), name='crear_sesion'),
]
