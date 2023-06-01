from rest_framework import serializers
from .models import CustomUser


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = ['first_name', 'cedula', 'email', 'primer_apellido', 'segundo_apellido', 'password', 'role']
        
