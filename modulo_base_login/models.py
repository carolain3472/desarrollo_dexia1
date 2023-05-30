from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.db import models


class Role(models.Model):
    nombre_rol = models.CharField(max_length=30, blank=False, unique=True, null=False)
    descripcion_rol = models.CharField(max_length=200, blank=False, null=False)

class MyUserManager(BaseUserManager):
    def create_user(self, cedula, password=None, **extra_fields):
        if not cedula:
            raise ValueError('La cédula es requerida')

        user = self.model(cedula=cedula, **extra_fields)
        if password:
            user.set_password(password)
        else:
            # Establecer una contraseña aleatoria si no se proporcionó
            user.set_unusable_password()
        user.save()
        return user

    def create_superuser(self, cedula, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        first_name = extra_fields.get('first_name')
        primer_apellido = extra_fields.get('primer_apellido')
        segundo_apellido = extra_fields.get('segundo_apellido')

        if not first_name or not primer_apellido:
            raise ValueError('El nombre y apellido son requeridos para crear un superusuario')
        
     #   password = f"{first_name[0].upper()}{cedula}{primer_apellido[0].upper()}"
       # extra_fields['password'] = password 
        
        return self.create_user(cedula, password, **extra_fields)

class CustomUser(AbstractUser):
    def validate_min_length(value):
        if len(value) < 6:
            raise ValidationError('Este campo debe contener al menos 6 dígitos')

    cedula = models.TextField(unique=True, max_length=11, validators=[validate_min_length], error_messages={
        'unique': 'Ya hay un usuario registrado con esta cédula'
    })

    email = models.EmailField(null=False)

    primer_apellido = models.CharField(max_length=30, blank=True)
    segundo_apellido = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    rol = models.foreingKey(Role, on_delete=models.CASCADE)

    username = None

    objects = MyUserManager()

    USERNAME_FIELD = 'cedula'
    REQUIRED_FIELDS = [
        'first_name', 
        'primer_apellido', 
        'email', 
        'rol'
    ]

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if self.is_superuser and not self.pk:
            # Si es un superusuario y es una nueva instancia, generar la contraseña automáticamente
            password = f"{self.first_name[0].upper()}{self.cedula}{self.primer_apellido[0].upper()}"
            self.set_password(password)
        super().save(*args, **kwargs)
