from rest_framework import serializers
from .models import CustomUser


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = ['first_name', 'cedula', 'email', 'primer_apellido', 'segundo_apellido', 'password', 'role', 'is_active', 'is_superuser']
        



# create a serializer class
class Validador_carga(serializers.Serializer):
        tipo_de_carga = serializers.CharField(max_length=15)
        file = serializers.FileField()   