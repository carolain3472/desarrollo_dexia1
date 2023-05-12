  
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class MyUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('El Email es requerido')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=123, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True,  error_messages={
            'unique': 'A user with that email already exists'
        })

    phone_number = models.CharField(max_length=10, blank=True)
    identification_number_institutional= models.BigIntegerField()
    birth_date = models.DateField(null=True)
    is_active = models.BooleanField(default=True)
    
    username = None


    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        'first_name', 
        'last_name', 
        'identification_number_institutional', 
        'phone_number',
        'birth_date'
    ]

    def __str__(self):
        return self.email
