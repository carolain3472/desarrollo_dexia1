

from django.shortcuts import render,redirect
from rest_framework import generics
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.generic.edit import FormView
from django.contrib.auth import login,logout,authenticate
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

from .serializer import UsuarioSerializer
from rest_framework import viewsets


from .models import CustomUser

#JWT y  O2 de validacion de token 
class UsuariosList(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = (IsAuthenticated,)
    authentication_class = (TokenAuthentication,)


class Login(FormView):
    template_name = "login_user.html"
    form_class = AuthenticationForm
    success_url = reverse_lazy('default:usuarioList1-list')

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self,request,*args,**kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.get_success_url())
        else:
            return super(Login,self).dispatch(request,*args,*kwargs)

    def form_valid(self,form):
        user = authenticate(username = form.cleaned_data['username'], password = form.cleaned_data['password'])
        token,_ = Token.objects.get_or_create(user = user)
        if token:
            login(self.request, form.get_user())
            return super(Login,self).form_valid(form)
        
class Logout(APIView):
    def post(self, request, format=None):
        cedula = request.data.get('cedula')

        try:
            # Buscar al usuario por nombre de usuario en la base de datos
            user = CustomUser.objects.get(cedula=cedula)
            
            # Eliminar el token de acceso del usuario
            Token.objects.filter(user=user).delete()
            
            return Response(status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    

class LoginView(APIView):
    def post(self, request):
        cedula = request.data.get('cedula')
        password = request.data.get('password')

        try:
            # Buscar al usuario por cédula en la base de datos
            usuario = CustomUser.objects.get(cedula=cedula)

            # Verificar la contraseña del usuario
            if usuario.check_password(password):
                # Autenticar al usuario y generar un token de autenticación
                user = authenticate(cedula=cedula, password=password)
                if user is not None:
                    login(request, user)
                    token, _ = Token.objects.get_or_create(user=user)
                    return Response({'valid': True, 'token': token.key, 'nombre': usuario.first_name})

        except CustomUser.DoesNotExist:
            raise AuthenticationFailed('Las credenciales proporcionadas son inválidas.')

        return Response({'valid': False})
