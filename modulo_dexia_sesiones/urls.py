from .views import *
from django.urls import path, include
from .views import *



urlpatterns = [
    path('crear_sesion/', CrearSesion.as_view(), name='crear_sesion'),
    path('listar_sesiones/', ListarSesiones.as_view(), name='crear_sesion'),
    path('crear-sesion-primera-vez/', SesionPrimeraVez.as_view(), name='sesion_primera_vez'),
    path('crear-sesion-seguimiento/', SesionSeguimiento.as_view(), name='sesion_seguimiento'),
    
]
