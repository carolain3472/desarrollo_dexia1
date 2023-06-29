from .views import *
from django.urls import path, include
from .views import CrearSesion



urlpatterns = [
    path('crear_sesion/', CrearSesion.as_view(), name='crear_sesion'),
]
