import django_filters
from .models import Estudiante, Programa_acompañamiento, Remision


class EstudianteFilter(django_filters.FilterSet):

    profesional = filters.CharFilter(field_name = "profesional", lookup_expr = "exact")
    nombre = filters.CharFilter(field_name = "nombre", lookup_expr = "contains")
    primer_apellido = filters.CharFilter(field_name = "primer_apellido", lookup_expr = "contains")
    segundo_apellido = filters.CharFilter(field_name = "segundo_apellido", lookup_expr = "contains")
    correo_institucional = filters.CharFilter(field_name = "correo_institucional", lookup_expr = "exact")
    doc_identidad = filters.CharFilter(field_name = "doc_identidad", lookup_expr = "exact")
    codigo_estudiantil = filters.CharFilter(field_name = "codigo_estudiantil", lookup_expr = "exact")
    

    class Meta:
        model = Estudiante
        fields = ["profesional", "nombre", "primer_apellido", "segundo_apellido", "correo_institucional", "doc_identidad", "codigo_estudiantil"]



class RemisionFilter(django_filters.FilterSet):
    programa = filters.CharFilter(field_name = "programa", lookup_expr = "exact")
    estudiante = filters.CharFilter(field_name = "estudiante", lookup_expr = "exact")

    class Meta:
        model = Remision
        fields = ["programa", "estudiante"]