from rest_framework import serializers
from .models import Sesion, SesionPrimeraVez, SesionSeguimiento

class SesionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sesion
        fields = '__all__'


class SesionPrimeraVezSerializer(serializers.ModelSerializer):

    class Meta:
        Model = SesionPrimeraVez
        fields = '__all__'


class SesionSeguimientoSerializer(serializers.ModelSerializer):

    class Meta:
        Model = SesionSeguimiento
        fields = '__all__'