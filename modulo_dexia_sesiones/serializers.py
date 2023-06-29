from rest_framework import serializers
from .models import Sesion

class SesionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sesion
        fields = '__all__'