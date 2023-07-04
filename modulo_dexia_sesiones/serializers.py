from rest_framework import serializers
from .models import Sesion, SesionPrimeraVez, SesionSeguimiento

from modulo_dexia_estudiantes.serializers import EstudianteSerializer
from modulo_base_login.serializer import UsuarioSerializer

class SesionSerializer(serializers.ModelSerializer):
    profesional = serializers.SerializerMethodField()
    estudiante = serializers.SerializerMethodField()

    class Meta:
        model = Sesion
        fields = ['id', 'asistencia', 'fecha', 'descripcion', 'fecha_proxima_sesion', 'profesional', 'estudiante']

    def get_profesional(self, obj):
        return obj.profesional.first_name

    def get_estudiante(self, obj):
        return f"{obj.estudiante.nombre} {obj.estudiante.primer_apellido} {obj.estudiante.segundo_apellido}"


class SesionPrimeraVezSerializer(serializers.ModelSerializer):

    class Meta:
        Model = SesionPrimeraVez
        fields = '__all__'


class SesionSeguimientoSerializer(serializers.ModelSerializer):

    class Meta:
        Model = SesionSeguimiento
        fields = '__all__'