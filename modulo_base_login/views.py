

from typing import Any
from django.shortcuts import render,redirect
from rest_framework import generics
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.generic.edit import FormView
from django.contrib.auth import login,logout,authenticate
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework import permissions, status

from .serializer import UsuarioSerializer, UserLoginSerializer
from rest_framework import viewsets

from .models import CustomUser

#JWT y  O2 de validacion de token 
class UsuariosList(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self,request):
        serializer= UsuarioSerializer(request.user)
        return Response({'user': serializer.data}, status= status.HTTP_200_OK)


class UserLogin(FormView):
   permission_classes= (permissions.AllowAny ,)
   authentication_classes= (SessionAuthentication ,)

   def post(self, request):
       data= request.data
       serializer = UserLoginSerializer(data=data)
       if serializer.is_valid(raise_exception=True):
           user=serializer.check_user(data)
           login(request, user)
           return Response(serializer.data, status=status.HTTP_200_OK)

        
class Logout(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)