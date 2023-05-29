from django.urls import path, include
from .views import UsuariosList
from . import views
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt

from rest_framework.documentation import include_docs_urls

router= routers.DefaultRouter()
 #Aplicacion o clase desde donde, vista, nombre
router.register('listaUser', UsuariosList, 'usuarioList1' )


urlpatterns = [
    path('usuario/', include(router.urls)),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.Logout.as_view(), name='logout'),
    path('docs/', include_docs_urls(title="modulo API"))

]

