from django.db import models
import datetime
from django.utils import timezone
from modulo_base_login.models import CustomUser 
from modulo_dexia_estudiantes.models import Estudiante, Programa_acompañamiento 

# Create your models here.


class Agendar_cita(models.Model):
    profesional = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='profesional_agendar')
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='estudiante_agendar')
    fecha = models.DateTimeField(null = False, default = timezone.now)


class Sesion(models.Model):

    alertas = (('Alto', 'Alto'), ('Medio', 'Medio'),
               ('Bajo', 'Bajo'), ('Ninguno', 'Ninguno'))

    profesional = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='profesional')
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='estudiante')
    asistencia = models.BooleanField(null=False, default=False)
    fecha = models.DateTimeField(auto_now_add=True)
    descripcion = models.TextField(blank=True, null=True, max_length=500) #esta pregunta debe resumir la situación descrita por el estudiante
    proxima_reunion = models.BooleanField(null=False, default=False) #Habrá una proxima reunion
    fecha_proxima_sesion = models.DateTimeField(null=True)

    remision = models.ForeignKey(Programa_acompañamiento, on_delete=models.CASCADE, null=True)

    riesgo_individual = models.CharField(choices=alertas, null=True, blank=True, max_length=10)
    riesgo_familiar = models.CharField(choices=alertas, null=True, blank=True, max_length=10)
    riesgo_academico = models.CharField(choices=alertas, null=True, blank=True, max_length=10)
    riesgo_economico = models.CharField(choices=alertas, null=True, blank=True, max_length=10)
    riesgo_universitario = models.CharField(choices=alertas, null=True, blank=True, max_length=10)
    riesgo_psicologico = models.CharField(choices=alertas, null=True, blank=True, max_length=10)
    

    def __str__(self):
        return f"Sesión {self.id} - {self.fecha}"
    

class SesionPrimeraVez(Sesion):

    estimacion_estudiante = (('Por debajo de la media', 'Por debajo de la media'), ('Por encima de la media', 'Por encima de la media'),
                             ('En la media', 'En la media'), ('No sabe/No responde', 'No sabe/No responde'))
    
    estimacion_media = models.CharField(choices=estimacion_estudiante, null=True, max_length = 50, default=None)
    motivo_consulta = models.TextField(max_length=200, null=True) #Opcional para cuando el estudiante solicita el acompañamiento
    palabras_clave = models.TextField(null=True, max_length=500, default=None) #Palabras clave que describan el caso
    discapacidad = models.CharField(null=True, max_length = 20)
    eps = models.TextField(max_length=30, null=True)
    motivacion_programa = models.TextField(max_length=100, null=True) #¿Cuál o cuáles son las razones por las cuales te encuentras en este momento en el programa académico que elegiste?
    contacto_adicional = models.TextField(max_length=11, null=True)
    materias_canceladas = models.BooleanField(default=False, null=True)
    motivo_materias_canceladas = models.TextField(max_length=200, null=True)
    materias_mas_complejas = models.TextField(max_length=200, null=True)
    condicion_de_estudiante = models.CharField(max_length=20, null=False)

    
    def __str__(self):
        return f"Sesión de primera vez {self.id} - {self.fecha}"