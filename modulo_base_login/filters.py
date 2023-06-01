import django_filters
from .models import CustomUser

class CustomUserFilter(django_filters.FilterSet):
    first_name = django_filters.CharFilter(lookup_expr='icontains')  # Búsqueda insensible a mayúsculas y minúsculas
    cedula = django_filters.CharFilter(lookup_expr='icontains')  # Búsqueda insensible a mayúsculas y minúsculas
    email = django_filters.CharFilter(lookup_expr='icontains')  # Búsqueda insensible a mayúsculas y minúsculas
    primer_apellido = django_filters.CharFilter(lookup_expr='icontains')  # Búsqueda insensible a mayúsculas y minúsculas
    segundo_apellido = django_filters.CharFilter(lookup_expr='icontains')  # Búsqueda insensible a mayúsculas y minúsculas
    role = django_filters.CharFilter(lookup_expr='iexact')

    class Meta:
        model = CustomUser
        fields = ['first_name', 'cedula', 'email', 'primer_apellido', 'segundo_apellido', 'role']
