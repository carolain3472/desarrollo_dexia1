from rest_framework import serializers
from .models import Estudiante, Programa_acompañamiento, Remision


class EstudianteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Estudiante
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        estudiante = self.Meta.model(**validated_data)
        estudiante.save()
        return estudiante

    def update(self, instance, validated_data):
        instance.profesional = validated_data.get('profesional', instance.profesional)
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.primer_apellido = validated_data.get('primer_apellido', instance.primer_apellido)
        instance.segundo_apellido = validated_data.get('segundo_apellido', instance.segundo_apellido)
        instance.correo_institucional = validated_data.get('correo_institucional', instance.correo_institucional)
        instance.fecha_nacimiento = validated_data.get('fecha_nacimiento', instance.fecha_nacimiento)
        instance.doc_identidad = validated_data.get('doc_identidad', instance.doc_identidad)
        instance.celular = validated_data.get('celular', instance.celular)
        instance.codigo_estudiantil = validated_data.get('codigo_estudiantil', instance.codigo_estudiantil)
        instance.save()
        return instance



class ProgramaAcompanamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programa_acompañamiento
        fields = '__all__'

    def create(self, validated_data):
        programa = Programa_acompañamiento.objects.create(**validated_data)
        programa.save()
        return programa
    
    def update(self, instance, validated_data):
        instance.nombre_programa = validated_data.get('nombre_programa', instance.nombre_programa)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.save()
        return instance


class RemisionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Remision
        fields = ['estudiante', 'pograma']

    def create(self, validated_data):
        remision = Remision.objects.create(**validated_data)
        remision.save()
        return remision

    def update(self, instance, validated_data):
        instance.estudiante = validated_data.get('estudiante', instance.estudiante)
        instance.programa = validated_data.get('programa', instance.programa)
        instance.save()
        return instance