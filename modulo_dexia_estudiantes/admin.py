from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Estudiante)
admin.site.register(Programa_acompañamiento)
admin.site.register(Remision)
admin.site.register(ProgramaAcademico)
admin.site.register(Estudiante_programa)

