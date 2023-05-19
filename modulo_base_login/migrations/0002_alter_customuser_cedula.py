# Generated by Django 4.2.1 on 2023-05-17 21:38

from django.db import migrations, models
import modulo_base_login.models


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_base_login', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='cedula',
            field=models.TextField(error_messages={'unique': 'Ya hay un usuario registrado con esta cédula'}, max_length=11, unique=True, validators=[modulo_base_login.models.CustomUser.validate_min_length]),
        ),
    ]