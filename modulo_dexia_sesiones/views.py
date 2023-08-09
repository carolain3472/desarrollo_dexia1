from django.shortcuts import render
from rest_framework.permissions import AllowAny
from modulo_dexia_estudiantes.models import Facultad, ProgramaAcademico, Sede, Estudiante, Estudiante_programa, Programa_acompañamiento
from rest_framework.views import APIView
from .serializers import SesionSerializer, SesionPrimeraVezSerializer, AgendarCitaSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Sesion, Agendar_cita, SesionPrimeraVez
from modulo_base_login.models import CustomUser
from datetime import datetime, date, time
from django.http import Http404


class AgendarCitaView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = SesionSerializer(data=request.data)
        cedula_profesional = request.data.get("cedula_profesional")
        cedula_estudiante = request.data.get("cedula_estudiante")
        fecha_str = request.data.get("fecha_Sesion")
        print(fecha_str)
        print(cedula_profesional)
        print(cedula_estudiante)

        try:
            print('Datos BD')
            # Obtener el profesional y el estudiante por su cédula
            profesional = CustomUser.objects.get(cedula = str(cedula_profesional))
            print(profesional)
            estudiante = Estudiante.objects.get(doc_identidad= str(cedula_estudiante))
            print(estudiante)

            # Convertir la fecha de cadena a objeto datetime
            fecha = datetime.strptime(fecha_str, "%Y-%m-%dT%H:%M")
            print(fecha)
 
            

            # Crear una nueva instancia de Sesion con los datos recibidos
            sesion = Agendar_cita(
                profesional=profesional,
                estudiante=estudiante,
                fecha=fecha,
            )

            # Guardar la sesión en la base de datos
            sesion.save()
            print('guardo')

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Error al agendar la sesion', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class SesionPrimeraVez(APIView):  
    def post(self, request):
        cita = Agendar_cita.objects.get(id=request.POST.get("id"))
        profesional = cita.profesional
        estudiante = cita.estudiante
        asistencia = True
        descripcion = request.POST.get("Observaciones")
        proxima_cita = request.POST.get("prox_cita")
        fecha_sesion = request.POST.get("fecha_Sesion")

        if proxima_cita:
            fecha_str = request.POST.get("fecha_Sesion")
            fecha_sesion = datetime.strptime(fecha_str, "%Y-%m-%dT%H:%M")

        remision = Programa_acompañamiento.objects.get(nombre_programa=request.POST.get("nombre_programa"))
        riesgo_individual = request.POST.get("riesgo_individual")
        riesgo_familiar = request.POST.get("riesgo_familiar")
        riesgo_academico = request.POST.get("riesgo_academico")
        riesgo_economico = request.POST.get("riesgo_economico")
        riesgo_universitario = request.POST.get("riesgo_universitario")
        riesgo_psicologico = request.POST.get("riesgo_psicologico")


        estimacion_media = request.POST.get("estimacion")
        motivo_consulta = request.POST.get("motivo_consulta") #cuando sea el estudiante quien solicite la consulta
        palabras_clave= request.POST.get("palabras_clave")
        discapacidad = request.POST.get("discapacidad")
        eps = request.POST.get("eps")
        motivacion_programa = request.POST.get("motivacion_programa")
        contacto_adicional = request.POST.get("contacto_adicional")
        materias_canceladas = request.POST.get("materias_canceladas")
        motivo_materias_canceladas = request.POST.get("motivo_materias_canceladas")
        materias_mas_complejas = request.POST.get("materias_mas_complejas")

        try:
            if proxima_cita:
                #Crear la primera sesion del estudiante
                sesion_primera_vez = SesionPrimeraVez(
                                        profesional=profesional,
                                        estudiante=estudiante,
                                        asistencia=asistencia,
                                        descripcion=descripcion,
                                        proxima_reunion= proxima_cita, 
                                        fecha_proxima_sesion=fecha_sesion,
                                        remision=remision,
                                        riesgo_individual=riesgo_individual,
                                        riesgo_familiar=riesgo_familiar,
                                        riesgo_academico=riesgo_academico,
                                        riesgo_economico=riesgo_economico,
                                        riesgo_universitario=riesgo_universitario,
                                        riesgo_psicologico=riesgo_psicologico,
                                        
                                        estimacion_media=estimacion_media,
                                        motivo_consulta=motivo_consulta, 
                                        palabras_clave=palabras_clave,
                                        discapacidad=discapacidad,
                                        eps=eps,
                                        motivacion_programa=motivacion_programa, 
                                        contacto_adicional=contacto_adicional,
                                        materias_canceladas=materias_canceladas,
                                        motivo_materias_canceladas=motivo_materias_canceladas, 
                                        materias_mas_complejas=materias_mas_complejas
                                    )
                #Crear la proxima sesion
                nueva_cita = Agendar_cita(
                                        profesional=profesional,
                                        estudiante=estudiante,
                                        fecha=fecha_sesion
                                    )
                
                

                sesion_primera_vez.save()
                nueva_cita.save()

                estudiante.eps = eps
                estudiante.contacto_adicional = contacto_adicional
                estudiante.discapacidad= discapacidad


            else: #No se programa nueva sesion

                sesion_primera_vez = SesionPrimeraVez(
                                        profesional=profesional,
                                        estudiante=estudiante,
                                        asistencia=asistencia,
                                        descripcion=descripcion,
                                        proxima_reunion= proxima_cita, 
                                        fecha_proxima_sesion=fecha_sesion,
                                        remision=remision,
                                        riesgo_individual=riesgo_individual,
                                        riesgo_familiar=riesgo_familiar,
                                        riesgo_academico=riesgo_academico,
                                        riesgo_economico=riesgo_economico,
                                        riesgo_universitario=riesgo_universitario,
                                        riesgo_psicologico=riesgo_psicologico,
                                        
                                        estimacion_media=estimacion_media,
                                        motivo_consulta=motivo_consulta, 
                                        palabras_clave=palabras_clave,
                                        discapacidad=discapacidad,
                                        eps=eps,
                                        motivacion_programa=motivacion_programa, 
                                        contacto_adicional=contacto_adicional,
                                        materias_canceladas=materias_canceladas,
                                        motivo_materias_canceladas=motivo_materias_canceladas, 
                                        materias_mas_complejas=materias_mas_complejas
                                    )

                sesion_primera_vez.save()

                estudiante.eps = eps
                estudiante.contacto_adicional = contacto_adicional
                estudiante.discapacidad= discapacidad
        
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'message': 'Error al guardar la sesion', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class SesionSeguimiento(APIView):
    def post(self, request):
        cita = Agendar_cita.objects.get(id=request.POST.get("id"))
        profesional = cita.profesional
        estudiante = cita.estudiante
        asistencia = True
        descripcion = request.POST.get("Observaciones")
        proxima_cita = request.POST.get("prox_cita")
        fecha_sesion = request.POST.get("fecha_Sesion")

        if proxima_cita:
            fecha_str = request.POST.get("fecha_Sesion")
            fecha_sesion = datetime.strptime(fecha_str, "%Y-%m-%dT%H:%M")

        remision = Programa_acompañamiento.objects.get(nombre_programa=request.POST.get("nombre_programa"))
        riesgo_individual = request.POST.get("riesgo_individual")
        riesgo_familiar = request.POST.get("riesgo_familiar")
        riesgo_academico = request.POST.get("riesgo_academico")
        riesgo_economico = request.POST.get("riesgo_economico")
        riesgo_universitario = request.POST.get("riesgo_universitario")
        riesgo_psicologico = request.POST.get("riesgo_psicologico")

        try:
            if fecha_str != "": #Se programa proxima sesion
            #Se crea la sesion de seguimiento
                sesion_seguimiento = Sesion(
                                    profesional=profesional,
                                    estudiante=estudiante,
                                    asistencia=asistencia,
                                    descripcion=descripcion,
                                    proxima_reunion= proxima_cita, 
                                    fecha_proxima_sesion=fecha_sesion,
                                    remision=remision,
                                    riesgo_individual=riesgo_individual,
                                    riesgo_familiar=riesgo_familiar,
                                    riesgo_academico=riesgo_academico,
                                    riesgo_economico=riesgo_economico,
                                    riesgo_universitario=riesgo_universitario,
                                    riesgo_psicologico=riesgo_psicologico,
                                    )                        


                #Crear la proxima sesion
                nueva_cita = Agendar_cita(
                                    profesional=profesional,
                                    estudiante=estudiante,
                                    fecha=fecha_sesion,
                                    )
                        
                sesion_seguimiento.save()
                nueva_cita.save()

            else: #No se programa nueva cita
                sesion_seguimiento = Sesion(
                                    profesional=profesional,
                                    estudiante=estudiante,
                                    asistencia=asistencia,
                                    descripcion=descripcion,
                                    proxima_reunion= proxima_cita, 
                                    fecha_proxima_sesion=fecha_sesion,
                                    remision=remision,
                                    riesgo_individual=riesgo_individual,
                                    riesgo_familiar=riesgo_familiar,
                                    riesgo_academico=riesgo_academico,
                                    riesgo_economico=riesgo_economico,
                                    riesgo_universitario=riesgo_universitario,
                                    riesgo_psicologico=riesgo_psicologico,
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
                fecha_especifica = date.fromisoformat(fecha)
                start_of_day = datetime.combine(fecha_especifica, time.min)
                end_of_day = datetime.combine(fecha_especifica, time.max)

                sesiones = Agendar_cita.objects.filter(fecha__range=(start_of_day, end_of_day))
                
                
            except ValueError:
                raise Http404("Fecha inválida")

        else:
            start_of_day = datetime.combine(date.today(), time.min)
            end_of_day = datetime.combine(date.today(), time.max)

            sesiones_hoy = Agendar_cita.objects.filter(fecha__range=(start_of_day, end_of_day))
            if sesiones_hoy.exists():
                sesiones = sesiones_hoy
            else:
                sesiones = Agendar_cita.objects.all()

        serializer = AgendarCitaSerializer(sesiones, many=True)
        return Response(serializer.data) 
