from django.urls import path, include
from .views import UsuariosList
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt
from .views import LoginView
from .views import RegisterUserView
from .views import UsuariosList
from .views import cambiarEstado
from .views import UpdateContraseña
from .views import Validador_carga
from rest_framework.documentation import include_docs_urls

router= routers.DefaultRouter()
 #Aplicacion o clase desde donde, vista, nombre
router.register('listaUser', UsuariosList, 'usuarioList1' )



urlpatterns = [
    path('usuario/', include(router.urls)),
    path('docs/', include_docs_urls(title="modulo API")),
    path('login_view/', LoginView.as_view(), name='login_view'),
    path('registro', RegisterUserView.as_view(), name="Registro"),
    path('usuarios/', UsuariosList.as_view({'get': 'list'}), name='usuarios-list'),
    path('usuarioCambio/', cambiarEstado.as_view(), name='usuarioCambio'),
    path('listar/', UsuariosList.as_view({'get': 'list'}), name='listar'),
    path('update_contra/', UpdateContraseña.as_view(), name='update_contra'),
    path('carga_masiva/', Validador_carga.as_view(), name='validar-carga'),
]

