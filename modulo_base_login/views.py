from django_filters import rest_framework as filters

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
from rest_framework.permissions import AllowAny

from .serializer import UsuarioSerializer
from rest_framework import viewsets
from django.contrib.auth.hashers import make_password

from .models import CustomUser
from .filters import CustomUserFilter

#JWT y  O2 de validacion de token 
class UsuariosList(viewsets.ModelViewSet):
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        cedula_acceso= request.data.get("cedula_acceso")

        try:

            user = CustomUser.objects.get(cedula=cedula_acceso)
            token_exists = Token.objects.filter(user=user).exists()

            if token_exists:
                queryset = CustomUser.objects.all()
                serializer_class = UsuarioSerializer(queryset, many=True)
            return Response(serializer_class.data, status=status.HTTP_200_OK)

            
        except:
             return Response(status=status.HTTP_404_NOT_FOUND)
        



class RoleList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UsuarioSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CustomUserFilter


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
    



class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        nombre= request.data.get('first_name')
        email= request.data.get('email')
        primer_apellido=request.data.get('primer_apellido')
        segundo_apellido= request.data.get('segundo_apellido')
        cedula= request.data.get("cedula")
        cedula_acceso= request.data.get("cedula_acceso")

        try:


            user = CustomUser.objects.get(cedula=cedula_acceso)

            token_exists = Token.objects.filter(user=user).exists()

            if token_exists:

                print(nombre)
                print(email)
                print(primer_apellido)
                print(segundo_apellido)
                print("Entró")

            # Crear el superusuario
                superuser = CustomUser.objects.create_superuser(
                cedula=cedula,
                password=None,
                first_name=nombre,
                primer_apellido=primer_apellido,
                segundo_apellido=segundo_apellido,
                email=email
    )
                superuser.is_staff=True
                superuser.is_superuser=True
            
            
            return Response(status=status.HTTP_200_OK)
        except:
             return Response(status=status.HTTP_404_NOT_FOUND)
        
       