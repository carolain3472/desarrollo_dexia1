from rest_framework import serializers
from django.contrib.auth import login,logout,authenticate
from django.core.exceptions import ValidationError

from .models import CustomUser


class UserLoginSerializer(serializers.Serializer):
    cedula= serializers.CharField()
    password= serializers.CharField()

    def check_user(self,clean_data):
        
        user = authenticate(username = clean_data['cedula'], password = clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user
        

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model= CustomUser
        fields= '__all__'