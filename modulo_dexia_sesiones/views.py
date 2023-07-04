from django.shortcuts import render
from rest_framework.permissions import AllowAny
from modulo_dexia_estudiantes.models import Facultad, ProgramaAcademico, Sede, Estudiante, Estudiante_programa
from rest_framework.views import APIView
from .serializers import SesionSerializer, SesionPrimeraVezSerializer, SesionSeguimientoSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Sesion, SesionPrimeraVez, SesionSeguimiento
from modulo_dexia_estudiantes.models import Programa_acompañamiento
from modulo_base_login.models import CustomUser
from datetime import datetime
from datetime import date
from django.http import Http404

class CrearSesion(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = SesionSerializer(data=request.data)
        cedula_profesional = request.data.get("cedula_profesional")
        cedula_estudiante = request.data.get("cedula_estudiante")
        fecha_str = request.data.get("fecha_Sesion")

        try:

            # Obtener el profesional y el estudiante por su cédula
            profesional = CustomUser.objects.get(cedula = str(cedula_profesional))
            estudiante = Estudiante.objects.get(doc_identidad= str(cedula_estudiante))
            print(profesional)
            print(estudiante)

            # Convertir la fecha de cadena a objeto datetime
            fecha = datetime.strptime(fecha_str, "%Y-%m-%dT%H:%M:%S.%fZ")

            
            # Obtener solo la parte de la fecha (sin la hora)
            fecha_proxima_sesion = fecha.date()
            print(fecha_proxima_sesion)

            # Crear una nueva instancia de Sesion con los datos recibidos
            sesion = Sesion(
                profesional=profesional,
                estudiante=estudiante,
                fecha_proxima_sesion=fecha_proxima_sesion,
            )

            # Guardar la sesión en la base de datos
            sesion.save()
            print('guardo')

            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)



class SesionPrimeraVez(APIView):  
    def post(self, request):
        sesion = Sesion.objects.get(id=request.POST.get("id"))
        profesional = sesion.profesional
        estudiante = sesion.estudiante
        asistencia = True
        descripcion = request.POST.get("Observaciones")

        fecha_str = request.POST.get("fecha_Sesion")
        fecha = datetime.strptime(fecha_str, "%Y-%m-%dT%H:%M:%S.%fZ")
        fecha_proxima_sesion = fecha.date()

        estimacion_media = request.POST.get("estimacion")
        motivo_consulta = request.POST.get("motivo_consulta") #cuando sea el estudiante quien solicite la consulta
        riesgo_individual = request.POST.get("riesgo_individual")
        riesgo_familiar = request.POST.get("riesgo_familiar")
        riesgo_academico = request.POST.get("riesgo_academico")
        riesgo_economico = request.POST.get("riesgo_economico")
        riesgo_universitario = request.POST.get("riesgo_universitario")
        riesgo_psicologico = request.POST.get("riesgo_psicologico")
        descripcion_participacion = request.POST.get("descripcion_participacion") #Descripción general de la situación por la cual participa en este encuentro (esta pregunta debe resumir la situación descrita por el estudiante)
        remision = Programa_acompañamiento.objects.get(nombre_programa=request.POST.get("nombre_programa"))
        eps = request.POST.get("eps")
        contacto_adicional = request.POST.get("contacto_adicional")


        try:
            if fecha_str != "": #Se programa proxima sesion

                #Crear la primera sesion del estudiante
                sesion_primera_vez = SesionPrimeraVez(
                                        profesional=profesional,
                                        estudiante=estudiante,
                                        asistencia=asistencia,
                                        descripcion=descripcion,
                                        fecha_proxima_sesion=fecha_proxima_sesion,
                                        estimacion_media=estimacion_media,
                                        motivo_consulta=motivo_consulta,
                                        riesgo_individual=riesgo_individual,
                                        riesgo_familiar=riesgo_familiar,
                                        riesgo_academico=riesgo_academico,
                                        riesgo_economico=riesgo_economico,
                                        riesgo_universitario=riesgo_universitario,
                                        riesgo_psicologico=riesgo_psicologico,
                                        descripcion_participacion=descripcion_participacion,
                                        remision=remision,
                                        eps=eps,
                                        contacto_adicional=contacto_adicional
                                    )
                #Crear la proxima sesion
                nueva_cita = Sesion(
                                        profesional=profesional,
                                        estudiante=estudiante,
                                        fecha_proxima_sesion=fecha_proxima_sesion
                                    )

                sesion_primera_vez.save()
                nueva_cita.save()

            else: #No se programa nueva sesion

                sesion_primera_vez = SesionPrimeraVez(
                                                    profesional=profesional,
                                                    estudiante=estudiante,
                                                    asistencia=asistencia,
                                                    descripcion=descripcion,
                                                    fecha_proxima_sesion=fecha_proxima_sesion,
                                                    estimacion_media=estimacion_media,
                                                    motivo_consulta=motivo_consulta,
                                                    riesgo_individual=riesgo_individual,
                                                    riesgo_familiar=riesgo_familiar,
                                                    riesgo_academico=riesgo_academico,
                                                    riesgo_economico=riesgo_economico,
                                                    riesgo_universitario=riesgo_universitario,
                                                    riesgo_psicologico=riesgo_psicologico,
                                                    descripcion_participacion=descripcion_participacion,
                                                    remision=remision,
                                                    eps=eps,
                                                    contacto_adicional=contacto_adicional
                                                )
                sesion_primera_vez.save()
        
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'message': 'Error al guardar la sesion', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class SesionSeguimiento(APIView):
        def post(self, request):
                sesion = Sesion.objects.get(id=request.POST.get("id"))
                profesional = sesion.profesional
                estudiante = sesion.estudiante
                asistencia = True
                descripcion = request.POST.get("Observaciones")

                fecha_str = request.POST.get("fecha_Sesion")
                fecha = datetime.strptime(fecha_str, "%Y-%m-%dT%H:%M:%S.%fZ")
                fecha_proxima_sesion = fecha.date()

                estimacion_media = request.POST.get("estimacion")
                riesgo_individual = request.POST.get("riesgo_individual")
                riesgo_familiar = request.POST.get("riesgo_familiar")
                riesgo_academico = request.POST.get("riesgo_academico")
                riesgo_economico = request.POST.get("riesgo_economico")
                riesgo_universitario = request.POST.get("riesgo_universitario")
                riesgo_psicologico = request.POST.get("riesgo_psicologico")
                descripcion_participacion = request.POST.get("descripcion_participacion") #Descripción general de la situación por la cual participa en este encuentro (esta pregunta debe resumir la situación descrita por el estudiante)
                remision = Programa_acompañamiento.objects.get(nombre_programa=request.POST.get("nombre_programa"))

                try:
                    if fecha_str != "": #Se programa proxima sesion
                        #Se crea la sesion de seguimiento
                        sesion_seguimiento = SesionSeguimiento(
                                                    profesional=profesional,
                                                    estudiante=estudiante,
                                                    asistencia=asistencia,
                                                    descripcion=descripcion,
                                                    fecha_proxima_sesion=fecha_proxima_sesion,  
                                                    estimacion_media=estimacion_media,
                                                    riesgo_individual=riesgo_individual,
                                                    riesgo_familiar=riesgo_familiar,
                                                    riesgo_academico=riesgo_academico,
                                                    riesgo_economico=riesgo_economico,
                                                    riesgo_universitario=riesgo_universitario,
                                                    riesgo_psicologico=riesgo_psicologico,
                                                    remision=remision,
                                                    descripcion_participacion=descripcion_participacion,   
                                            )


                        #Crear la proxima sesion
                        nueva_cita = Sesion(
                                                profesional=profesional,
                                                estudiante=estudiante,
                                                fecha_proxima_sesion=fecha_proxima_sesion,
                                            )
                        
                        sesion_seguimiento.save()
                        nueva_cita.save()

                    else: #No se programa nueva cita
                        sesion_seguimiento = SesionSeguimiento(
                                                    profesional=profesional,
                                                    estudiante=estudiante,
                                                    asistencia=asistencia,
                                                    descripcion=descripcion,
                                                    fecha_proxima_sesion=fecha_proxima_sesion,  
                                                    estimacion_media=estimacion_media,
                                                    riesgo_individual=riesgo_individual,
                                                    riesgo_familiar=riesgo_familiar,
                                                    riesgo_academico=riesgo_academico,
                                                    riesgo_economico=riesgo_economico,
                                                    riesgo_universitario=riesgo_universitario,
                                                    riesgo_psicologico=riesgo_psicologico,
                                                    remision=remision,
                                                    descripcion_participacion=descripcion_participacion,   
                                            )
                        sesion_seguimiento.save()

                    return Response(status=status.HTTP_200_OK)
                
                except Exception as e:
                    return Response({'message': 'Error al guardar la sesion', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class ListarSesiones(APIView):
    def get(self, request):
        fecha = request.GET.get('fecha')  # Obtener el parámetro 'fecha' de la solicitud GET
        
        if fecha:
            try:
                fecha = date.fromisoformat(fecha)
                print(fecha)
                sesiones = Sesion.objects.filter(fecha_proxima_sesion=fecha)
                
            except ValueError:
                raise Http404("Fecha inválida")
        else:
            sesiones_hoy = Sesion.objects.filter(fecha_proxima_sesion=date.today())
            if sesiones_hoy.exists():
                sesiones = sesiones_hoy
            else:
                sesiones = Sesion.objects.all()

        serializer = SesionSerializer(sesiones, many=True)
        return Response(serializer.data) 
