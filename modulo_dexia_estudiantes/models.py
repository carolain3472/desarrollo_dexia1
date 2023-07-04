from django.db import models
from modulo_base_login.models import CustomUser 

# Create your models here.

class Estudiante(models.Model):

    profesional = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False)

    nombre = models.CharField(max_length=30, blank=False, null=False)
    primer_apellido = models.CharField(max_length=30, blank=False, null=False)
    segundo_apellido = models.CharField(max_length=30, blank=True)
    correo_institucional = models.EmailField(max_length=254, unique=True, null=False, blank=False)
    fecha_nacimiento = models.DateField(null=False, blank=False)
    doc_identidad = models.TextField(unique=True, max_length=11, null=False, blank=False)
    celular = models.TextField(unique=False, max_length=11)
    codigo_estudiantil = models.TextField(unique=True, max_length=11, null=False, blank=False)

    def __str__(self):
        return f"{self.nombre} {self.primer_apellido} {self.segundo_apellido}"


class Programa_acompañamiento(models.Model):
    #Aquí irán los programas y servicios posibles para realizar remisión a un estudiante
    PROGRAMAS = (('Psicología', 'Psicología'), ('Red CAAL', 'Red CAAL'))
    nombre_programa = models.CharField(choices=PROGRAMAS, null=False, blank=False, max_length = 20, unique=True)
    descripcion = models.TextField(verbose_name='Descripción del programa', null=False, blank=False, max_length=300)   

    def __str__(self):
        return self.nombre_programa


class Remision(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, null=False)
    programa = models.ForeignKey(Programa_acompañamiento, on_delete=models.CASCADE, null=False)

class Sede(models.Model):
    identificador_univalle = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100)

    def _str_(self):
        return self.nombre

class Facultad(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=100)

    
class ProgramaAcademico(models.Model):
    identificador_univalle = models.IntegerField()
    facultad = models.ForeignKey(Facultad, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    sede = models.ForeignKey(Sede, on_delete=models.CASCADE)


    def _str_(self):
        return self.nombre


class Estudiante_programa(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, null=False)
    programa = models.ForeignKey(ProgramaAcademico, on_delete=models.CASCADE, null=False)

