import django_excel as excel
import os
import subprocess

from datetime import datetime, timedelta, timezone
from io import BytesIO
from PIL import Image

from django import utils
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import login, authenticate
from django.contrib.sessions.models import Session
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail.message import (
    DEFAULT_ATTACHMENT_MIME_TYPE, BadHeaderError, EmailMessage,
    EmailMultiAlternatives, SafeMIMEMultipart, SafeMIMEText,
    forbid_multi_line_headers, make_msgid,
)
from django.http.response import HttpResponse, BadHeaderError, JsonResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.urls import reverse_lazy
from django.views.generic.edit import FormView

from rest_framework.authtoken.models import Token

from email.mime.image import MIMEImage

from admin_sistema.captcha import getCaptcha
from admin_sistema.models import Usuario, CatEstatus, HistoricoUsuario, CatEscolaridad, CatInstitucion, CatPerfil
from admin_sistema.workspace import main
from admin_sistema.forms import *


def loginView(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    print(user)
    if user is not None:
        try:
            all_sessions = Session.objects.filter(expire_date__gte=datetime.now(tz=timezone.utc))
            for session in all_sessions:
                uid = session.get_decoded().get('_auth_user_id')
                print("Uid: ",uid)
                if uid != None:
                    user_session = Usuario.objects.get(pk=uid)
                    print("User session: ",user_session)
                    if user_session == user:
                        print("Ya existe una sesión para el usuario")
                        return render(request, 'admin_sistema/control_sesiones.html',{'username':username, 'password':password})
        except Session.DoesNotExist:
            pass
        login(request, user)
        # Redirect to a success page.
        return render(request, 'admin_sistema/index.html',{'name':user.nombre, 'perfil':str(user.perfil)})
    else:
        # Return an 'invalid login' error message.
        messages.add_message(request=request, level=messages.ERROR, message="Usuario no actualizado")
        return render(request, 'admin_sistema/login.html')

def loginSession(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    print("loginSession user: ",user)
    if user is not None:
        try:
            all_sessions = Session.objects.filter(expire_date__gte=datetime.now(tz=timezone.utc))
            for session in all_sessions:
                uid = session.get_decoded().get('_auth_user_id')
                if uid != None:
                    user_session = Usuario.objects.get(pk=uid)
                    if user_session == user:
                        session.delete()
                        print("Sesión eliminada")                    
        except Session.DoesNotExist:
            pass
        login(request, user)
        # Redirect to a success page.
        return render(request, 'admin_sistema/index.html',{'name':user.nombre})
    else:
        # Return an 'invalid login' error message.
        return HttpResponse("<html><body><h1>No autorizado</h1></body></html>")

#Esquemas
def servicios(request):
    return render(request, 'admin_sistema/servicios.html')

def servicios_fs(request):
    return render(request, 'admin_sistema/servicios_fs.html')

def salud_mental(request):
    return render(request, 'admin_sistema/salud_mental.html')

def salud_mental_fs(request):
    return render(request, 'admin_sistema/salud_mental_fs.html')

def organizacion_servicios(request):
    return render(request, 'admin_sistema/organizacion_servicios.html')

def organizacion_servicios_fs(request):
    return render(request, 'admin_sistema/organizacion_servicios_fs.html')

def indicadores(request):
    return render(request, 'admin_sistema/indicadores.html')

def indicadores_fs(request):
    return render(request, 'admin_sistema/indicadores_fs.html')


#Quienes somos
def equipo(request):
    return render(request, 'admin_sistema/equipo.html')

def instituciones_participantes(request):
    return render(request, 'admin_sistema/instituciones_participantes.html')

def antecedentes(request):
    return render(request, 'admin_sistema/antecedentes.html')

def ubicacion(request):
    return render(request, 'admin_sistema/ubicacion.html')


#Acerca de
def informacion_sistema(request):
    return render(request, 'admin_sistema/informacion_sistema.html')

def agradecimientos_especiales(request):
    return render(request, 'admin_sistema/agradecimientos_especiales.html')

def aviso_privacidad(request):
    return render(request, 'admin_sistema/aviso_privacidad.html')

"""
def mision(request):
    return render(request, 'admin_sistema/mision_vision.html')
    
def integridad(request):
    return render(request, 'admin_sistema/integridad_etica.html')

def director(request):
    return render(request, 'admin_sistema/mensajes_director.html')

def gobierno(request):
    return render(request, 'admin_sistema/gobierno_direccion.html')

def fundador(request):
    return render(request, 'admin_sistema/fundador_instituto.html')

def financiamiento(request):
    return render(request, 'admin_sistema/financiamiento.html')


def quienes(request):
    return render(request, 'admin_sistema/quienes_somos.html')

El método recibe la petición de las vistas 'form_registro' y 'recuperar'.
Actualiza la imagen captcha.
Parameters
----------
request : HTTPRequest
    Se recibe la petición al renderizar un formulario con captcha
Return
----------
vista : HTML
    El método regresa la cadena de caracteres del captcha
"""

def get_image(request):
    data_captcha = getCaptcha()
    return HttpResponse(data_captcha['chars'])



"""
El método recibe la petición del usuario y carga la vista de Registro de Solicitud
Parameters
----------
request : HTTPRequest
    Se recibe la petición del usuario cuando selecciona la opción Registro del menú
Return
----------
vista : HTML
    El método regresa la vista del registro de solicitud del método __listUser y el formulario UserForm creado
"""
def form_registro(request):
    return __listUser(request, UserForm())


"""
El método recibe la petición del usuario y el form para renderizar la vista registro de solicitud
Parameters
----------
request : HTTPRequest
    Se recibe la petición del usuario cuando entra al index de la aplicación
form : ModelForm
    Se recibe una inbstancia del form de registro de solicitud

Return
----------
vista :HTML
    El método regresa el rendereo de la vista del registro de solicitud
"""
def __listUser(request, form):
    data_captcha = getCaptcha()
    print("data_captcha['chars']",data_captcha['chars'])
    return render(request, 'admin_sistema/form_registro.html', {'form': form,'chars':data_captcha['chars'],'image':data_captcha['data']}) 

"""
El método realiza el registro de solicitud de un usuario Administrador
Parameters
----------
request : HTTPRequest
    Se recibe la petición del usuario para guardar la solicitud de registro admin 
Return
----------
respuesta : JsonResponse
    El método regresa una respuesta del estatus de la operación
"""
def addAdmin(request):
    print("Vista de Alta admin")

    if request.method == 'POST':
        form = UserForm(request.POST)
        msg = ""
        status = 0
        print(request.POST)
        if form.is_valid() and form.cleaned_data['password'] == form.cleaned_data['password_confirm']:
            curp = form.cleaned_data['curp']
            try:  
                usr = Usuario.objects.get(curp__exact=curp)
                status = 2
                msg = "El usuario ya esta registrado ¿Desea cambiar la contraseña?"
                print("El usuario ya existe en la base no se debe registrar: "+usr.curp)
            except Usuario.DoesNotExist:
                print("Usuario DoesNotExist")
                adm = form.save(commit=False)
                try:
                    stats = CatEstatus.objects.get(estatus__exact=1)
                    adm.estatus = stats
                    adm.alta = 1
                    adm.username = request.POST['curp']
                    adm.save()
                    if save_Bitacora(form):
                        print("Se guardo la bitácora")
                        user = Usuario.objects.get(username=request.POST['curp'])
                        user.set_password(request.POST['password'])
                        user.save()
                        print("Contraseña codificada")
                        status = 1
                        msg = "La solicitud fue registrada correctamente."
                    else:
                        print("No se pudo guardar la solicitud. La bitácora no se pudo guardar")
                        status = -3
                        msg = "No se pudo guardar la solicitud."
                except ObjectDoesNotExist:
                    print("No se pudro registrar la solicitud. No se encontro el catálogo de estatus.")
                    status = -4
                    msg = "No se pudo guardar la solicitud."
        elif form.data['password'] != form.data['password_confirm']:
            msg = "Solicitud no registrada las contraseñas no coinciden."
            status = -1
        else:
            msg = "Usuario no registrado form invalido"
            status = -2
            print(form.errors.values())
    return JsonResponse(
        {
            'status': status,
            'msg': msg
        }
    )

"""
El método realiza el registro de solicitud de un usuario Investigador
Parameters
----------
request : HTTPRequest
    Se recibe la petición del usuario para guardar la solicitud de registro Investigador 
Return
----------
respuesta : JsonResponse
    El método regresa una respuesta del estatus de la operación
"""
def addInvestigador(request):
    print("Entre al metodo de investigador")
    if request.method == 'POST':
        form = OtroForm(request.POST)
        msg = ""
        status = 0
        #Inyectar una imagen para el correo
        #print(request.POST)
        if form.is_valid() and form.cleaned_data['password'] == form.cleaned_data['password_confirm']:
            print("Pase validación form")
            recipient = form.cleaned_data['email']
            print("Email obtenido del form: "+recipient)
            try:  
                #Se realiza la búsqueda del correo para ver si ya existe
                usuario = Usuario.objects.get(email__exact=recipient)
                status = 2
                msg = "El usuario ya esta registrado ¿Desea cambiar la contraseña?"
                print("El usuario ya existe en la base no se debe registrar: "+recipient)
            except Usuario.DoesNotExist:
                # En caso de que no exista se guarda la tabla Usuairo y obtenermos la instanci
                print("Usuario DoesNotExist")
                inv = form.save(commit=False)
                # Enviamos el correo
                if send_email(form):
                    # Obtenemos el estatus de la solicitud registrada
                    stats = CatEstatus.objects.get(estatus__exact=1)
                    inv.estatus = stats
                    inv.alta = 1
                    inv.username = request.POST['email']
                    inv.save()
                    print("Se guardo usuario Inviestigador.")
                    user = Usuario.objects.get(username=request.POST['email'])
                    user.set_password(request.POST['password'])
                    user.save()
                    #Guardamos la bitácora de Historico Usuario
                    if save_Bitacora(form):
                        print("Se guardo la bitácora")
                        status = 1
                        msg = "La solicitud fue registrada correctamente."
                    else:
                        print("No se pudo guardar la solicitud. La bitácora no se pudo guardar")
                        status = -3
                        msg = "No se pudo guardar la solicitud."
                else:
                    status = -4
                    msg = "Headers Invalidos para el envió de correo."
        elif form.data['password'] != form.data['password_confirm']:
            status = -1
            msg = "La solicitud no pudo registrarse. Las contraseñas no coinciden"
            print("Usuario no registrado las contraseñas no coinciden")
        else:
            status = -2
            msg = "La solicitud no pudo registrarse. El form es invalido"
            print("Usuario no registrado form invalido")
            print(form.errors.values())
    #Regresamos el estauts del guardado del Investigador
    return JsonResponse(
        {
            'status': status,
            'msg': msg
        }
    )

"""
El método realiza el guardado de la bitácora Historico Usuario copia de Usuario
Parameters
----------
request : HTTPRequest
    Se recibe el formulario con los datos después de guardar la solicitud de registro 
Return
----------
estatus : estatusBit
    El método regresa el estatus del guardado de la bitácora.
"""
def save_Bitacora(form):
    curp = form.cleaned_data['curp']
    estatusBit = 0
    try:
        usr = Usuario.objects.get(curp__exact=curp)
        estatus = CatEstatus.objects.get(estatus__exact=1)
        hUsuario = HistoricoUsuario()
        hUsuario.cveusuario = usr.cveusuario
        hUsuario.password = form.cleaned_data['password']
        hUsuario.curp = form.cleaned_data['curp']
        hUsuario.nombre = form.cleaned_data['nombre']
        hUsuario.apPaterno = form.cleaned_data['appaterno']
        hUsuario.apMaterno = form.cleaned_data['apmaterno']
        hUsuario.edad = form.cleaned_data['edad']
        hUsuario.sexo = form.cleaned_data['sexo']
        hUsuario.email = form.cleaned_data['email']
        hUsuario.escolaridad = form.cleaned_data['escolaridad']
        hUsuario.perfil = form.cleaned_data['perfil']
        hUsuario.institucion = form.cleaned_data['institucion']
        hUsuario.estatus = estatus
        hUsuario.alta = 1
        hUsuario.save()
        estatusBit = 1
    except ObjectDoesNotExist:
        estatusBit = 0
    print("Estatus guardado bitácora: ")
    print(estatusBit)
    return estatusBit

"""
El método realiza el envió de correo electrónico con información de la solicitud guardada
Parameters
----------
form : ModelForm
    Se pasa los datos del form después de guardar la solicitud de Investigador
Return
----------
estatus : seEnvio
    El método regresa el estatus del envió del correo electrónico
"""
def send_email(form):
    print("Init send email")
    seEnvio=0
    # Se obtiene el email del Form
    email = form.cleaned_data['email']
    subject = "PANGEOS MX"
    text_message = "Solicitud de Alta"
    
    sender='anarim7@gmail.com'
    # Se obtiene la ruta absoluta del template 
    path_template = "C:/Django Proyects/PANGEOS_DOWN_ENE2023/pangeos.com/templates/admin_sistema/mailing/send_mail.html"   #'/var/www/pangeos.com/templates/admin_sistema/mailing/send_mail.html'
    try:
        html_content = render_to_string(path_template)
        #Componente para el envió de correo con formato html
        msg = EmailMultiAlternatives(subject, text_message, sender, [email])
        # se adjunta el contenido html en el correo
        msg.attach_alternative(html_content, "text/html")
        #Envio de correo
        seEnvio = msg.send()
    except BadHeaderError:
        seEnvio = 0
    print("Estatus Envio correo: ")
    print(seEnvio)
    return seEnvio



"""  #  RECUPERAR CONTRASEÑA  #  """

"""
El método renderiza el template con el form para iniciar el proceso de recuperación de contraseña
----------
Parameters: NA
----------
Respuesta : render 'admin_sistema/recuperarcontrasena.html'
"""
def recuperar(request):
    data_captcha = getCaptcha()
    print("data_captcha['chars']",data_captcha['chars'])
    return render(request, 'admin_sistema/recuperarcontrasena.html', {'chars':data_captcha['chars']}) 



"""
El método realiza la validación de autenticación del usuario y envía el correo electrónico para
restablecer la contraseña.
----------
Parameters: 
email : email
    Correo electrónico del usuario que realizó la solicitud
Return
----------
Respuesta : 
status: Estatus del envío de correo. 202 - exitoso
msg: Mensaje
"""
def enviar_recuperar(request):
    if request.method == 'POST':
        # Inicializar variables
        msg = ""
        status = 0
        # Recibir datos
        email = request.POST['email']
        try:
            # Búscar username con el correo ingresado
            usuario = Usuario.objects.get(username__exact=email)
            print("Restablecer contraseña de: ",usuario)
            # Validar estatus del registro de usuario
            estatus = usuario.estatus
            print("Estatus actual del registro de usuario: ",estatus)

            cat_estatus_aprobado = CatEstatus.objects.get(estatus=2)
            if estatus==cat_estatus_aprobado:
                # Generar token
                try:
                    token_actual = Token.objects.filter(user_id=usuario)
                    for t in token_actual:
                        t.delete()
                except Token.DoesNotExist:
                    pass
                token = Token.objects.create(user=usuario)
                # Usuario Aprobado, puede restablecer su contraseña
                # Enviar correo electrónico con la información para restablecer la contraseña
                context = {"tk":token.key}
                rutaTemplate = "C:/Django Proyects/PANGEOS_DOWN_ENE2023/pangeos.com/templates/admin_sistema/mailing/recuperar.html"   #'/var/www/pangeos.com/templates/admin_sistema/mailing/recuperar.html'
                subject = "PANGEOS MX"
                text_message = "Recuperar contraseña"
                status = send_email_gral(context, rutaTemplate, email, subject, text_message)
                msg = "Se le ha enviado un correo electrónico con las indicaciones para recuperar su contraseña. Siga los pasos señalados e intente nuevamente iniciar sesión."

                # Actualizar estatus del registro para controlar la temporalidad de la vigencia de la solicitud.
                cat_estatus_recuperar = CatEstatus.objects.get(estatus=6)
                usuario.estatus = cat_estatus_recuperar
                usuario.save()
            else:
                # El usuario no puede restablecer su contraseña
                msg = "El usuario identificado no ha sido aprobado para ingresar al sistema. Póngase en contacto con el administrador."
                
        except ObjectDoesNotExist:
            # En caso de que no exista se regresa mensaje
            msg = "El usuario con el correo electrónico ingresado no existe."
        # Regresa el estauts y el mensaje al template
        return JsonResponse(
            {
                'status': status,
                'msg': msg
            }
        )



"""
El método realiza el envío de correo electrónico.
----------
Parameters: 
context :       Contexto con las variables a renderizar
rutaTemplate:   Ruta absoluta del template del mailing
email:          Correo electrónico del destinatario del correo.
subject:        Asunto del correo electrónico
text_message:   Texto del mensaje
Return
----------
Respuesta : 
status: Estatus del envío de correo. 202 - exitoso
"""
def send_email_gral(context, rutaTemplate, email, subject, text_message):
    print("Init send email gral")
    seEnvio=0    
    sender='anarim7@gmail.com'
    
    try:
        # Especificación del documento html
        html_content = render_to_string(rutaTemplate, context)        
        # Componente para el envió de correo con formato html
        msg = EmailMultiAlternatives(subject, text_message, sender, [email])
        # Adjuntar el contenido html en el correo
        msg.attach_alternative(html_content, "text/html")
        #Envio de correo
        seEnvio = msg.send()
    except BadHeaderError:
        seEnvio = 0
    print("Estatus Envio correo: ",seEnvio)
    return seEnvio



"""
El método realiza la validación para mostrar el formulario del envío de la nueva contraseña.
----------
Parameters: 
email: Correo electrónico del usuario identificado.
Return
----------
Respuesta : 
render: 'admin_sistema/rc.html'
"""
def rc(request):
    if request.method == 'GET':
        if request.GET['t']:
            token = request.GET['t']
            try:
                # Búscar username con el token enviado
                obj_token = Token.objects.get(key=token)
                usuario = Usuario.objects.get(cveusuario=obj_token.user_id)
                # Validar estatus del registro
                #  - Obtener objeto del estatus "Recuperar"
                cat_estatus_recuperar = CatEstatus.objects.get(estatus=6)
                #  - Comparar con el estatus actual del usuario
                if cat_estatus_recuperar == usuario.estatus:
                    # Validar tiempo de la solicitud (72 hrs.)
                    #  - Tiempo transcurrido desde la solicitud
                    t_transcurrido = utils.timezone.now() - obj_token.created
                    print("Tiempo transcurrido: ",t_transcurrido)
                    print("Time delta",timedelta(seconds=settings.TIME_PASSWORD_RECOVERY_REQUEST))
                    if t_transcurrido > timedelta(seconds=settings.TIME_PASSWORD_RECOVERY_REQUEST):
                        # Para una solicitud vencida, actualizar estatus a "Aprobado"
                        cat_estatus_aprobado = CatEstatus.objects.get(estatus=2)
                        usuario.estatus = cat_estatus_aprobado
                        usuario.save()
                        # Eliminar token
                        try:
                            token_actual = Token.objects.filter(user_id=usuario)
                            for t in token_actual:
                                t.delete()
                        except Token.DoesNotExist:
                            pass
                    else:
                        #form = CambioContrasenaForm()
                        return render(request, 'admin_sistema/rc.html', {'t':token})
                return render(request, 'admin_sistema/mailing/enlace_vencido.html')
            except ObjectDoesNotExist:
                return render(request, 'admin_sistema/mailing/error_401.html')
        return render(request, 'admin_sistema/mailing/error_401.html')



"""
El método realiza la validación para actualizar la contraseña del usuario identificado.
----------
Parameters: 
email:      Correo electrónico del usuario identificado.
password:   Nueva contraseña para el usuario identificado.
----------
Respuesta : 
render: 'admin_sistema/mailing/nc.html'
"""
def save_recuperar(request):
    if request.method == 'POST':
        print("Guardar nueva contraseña")
        token = request.POST['token']
        pwd = request.POST['password']

        try:
            obj_token = Token.objects.get(key=token)
            user_id = obj_token.user_id
            obj_token.delete()
            print("User_id: ",user_id)
            user = Usuario.objects.get(cveusuario=user_id)
            user.set_password(request.POST['password'])
            cat_estatus_aprobado = CatEstatus.objects.get(estatus=2)
            user.estatus = cat_estatus_aprobado
            user.save()
            print("Contraseña codificada")
            return render(request, 'admin_sistema/mailing/nc.html')
        except Usuario.DoesNotExist:
            return render(request, 'admin_sistema/mailing/error_401.html')




def captcha(request):
    return main()









"""
El método realiza la autorización de una solicitud cambiando el estatus en la base
Parameters
----------
request : HTTPRequest
    La petición del usuario cuando autoriza la solicitud
id : cveusuario
    El id de la solicitud a autorizar
Return
----------
respuesta : JsonResponse
    El método regresa un estatus de la actualización en BD
"""
def autorizarSolicitud(request, cve):
    print("Entre a autorizar solicitud")
    try:
        #Se realiza una consulta para obtener la solicutud por el campo cveusuario
        solicitud = Usuario.objects.get(cveusuario__exact=cve)
        # Consulta para obtener el estatus de solicitud autorizada
        estatus = CatEstatus.objects.get(estatus__exact=2)
        #Seteamos el estatus al model Usuario
        solicitud.estatus = estatus
        #Guardamos la solicitud
        algo = solicitud.save()
        print(algo)
        #Método para actualizar la bitácora del usuario
        updateBitacora(cve, estatus)
        msg = "Se aprobo la solicitud"
        status = 1
    except ObjectDoesNotExist:
        msg = "No se pudo aprorbar la solicitud"
        status = -1
        print("No se pudo aprobar la solicitud ya que no se encontro.")
        #Regresamos un json como respuesta del estatus de guardado
    return JsonResponse(
        {
            'status': status,
            'msg': msg
        }
    )

"""
El método realiza el rechazo de una solicitud cambiando el estatus en la BD
Parameters
----------
request : HTTPRequest
    Se recibe la petición del usuario cuando rechaza la solicitud
id : cveusuario
    Se recibe el id de la solicitud a rechazar
Return
----------
respuesta : JsonResponse
    El método regresa un estatus de la actualización en BD
"""
def rechazarSolicitud(request, cve):
    print("Entre a rechazar solicitud")
    try:
        print(cve)
        #Se realiza una consulta para obtener la solicutud por el campo cveusuario
        solicitudSinRechazar = Usuario.objects.get(cveusuario__exact=cve)
        # Consulta para obtener el estatus de solicitud autorizada
        estatus = CatEstatus.objects.get(estatus__exact=3)
        #Seteamos el estatus al model Usuario
        solicitudSinRechazar.estatus = estatus
        # Actualizamos la solicitud
        algo = solicitudSinRechazar.save()
        print(algo)
        updateBitacora(cve, estatus)
        msg = "Se rechazo la solicitud"
        status = 1
    except ObjectDoesNotExist:
        
        msg = "No se pudo rechazar la solicitud"
        status = -1
        print("No se pudo rechazar la solicitud.")

    return JsonResponse(
        {
            'status': status,
            'msg': msg
        }
    )

"""
El método realiza la actualización en la bitácora Historico Usuario cuadno se rechaza o autoriza una solicitud
Parameters
----------
id : cveusuario
    El id de la solicitud a actualizar
estatus : CatEstatus
    El estatus de la solicitud
"""
def updateBitacora(cve, estatus):
    try:
        hUsuario = HistoricoUsuario.objects.get(cveusuario__exact=cve)
        hUsuario.estatus = estatus
        hUsuario.save()
    except ObjectDoesNotExist:
        print("No se pudo actualizar estatus a la bitácora")

"""
El método recibe la petición para entrar a la vista para auytorizar o rechazar solicitudes
Parameters
----------
request : HTTPRequest
    Se recibe la petición del usuario cuando entra a la vista de autorizar o rechazar solicitudes
Return
----------
vista : HTML
    Regresa la vista rendereada por el metodo __listSolicitudes
"""
def solicitudes(request):
    return __listSolicitudes(request)

"""
El método realiza el rendereo de la vista de Autorizar y rechazar solicitudes
Parameters
----------
request : HTTPRequest
    Se recibe la petición del usuario cuando entra a la vista  Autorizar y rechazar solicitudes
Return
----------
vista : HTML
    El método renderea la vista para autorización y rechazo de solicitudes
"""
def __listSolicitudes(request):
    escolaridad = CatEscolaridad.objects.all().values('descripcion')
    instituciones = CatInstitucion.objects.all().values('descripcion')
    perfiles = CatPerfil.objects.all().values('perfil')
    solicitudes = Usuario.objects.filter(estatus__estatus=1)
    return render(request, 'admin_sistema/solicitudes.html', {'solicitudes': solicitudes, 'escolaridad':escolaridad, 'instituciones':instituciones, 'perfiles':perfiles}) 


"""
El método recibe la petición para obtener el archivo con los registros de Solicitudes de Usuario
Parameters
----------
request : HTTPRequest
    Se recibe la petición del usuario cuando selecciona la opción Exportar en Solicitudes de Usuario
"""
def downSolicitudes(request):
    export = []
    # Se agregan los encabezados de las columnas
    export.append([
        'Nombre',
        'Escolaridad',
        'Institucion',
        'Usuario',
        'Rol',
        'Fecha de solicitud'
    ])

    # Se obtienen los datos de la tabla o model y se agregan al array
    solicitudes = Usuario.objects.filter(estatus__estatus=1)
    for solicitud in solicitudes:
        # ejemplo para dar formato a fechas, estados (si/no, ok/fail) o
        # acceder a campos con relaciones y no solo al id
        nombre = solicitud.nombre
        if solicitud.appaterno != None:
            nombre = nombre + solicitud.appaterno
        if solicitud.apmaterno != None:
            nombre = nombre + solicitud.apmaterno
        export.append([
                nombre,
                solicitud.escolaridad,
                solicitud.institucion,
                solicitud.username,
                solicitud.perfil,
                "{0:%Y-%m-%d %H:%M}".format(solicitud.fechaalta),
                ])

    # se transforma el array a una hoja de calculo en memoria
    sheet = excel.pe.Sheet(export)

    # se devuelve como "Response" el archivo para que se pueda "guardar"
    # en el navegador, es decir como hacer un "Download"
    return excel.make_response(sheet, "csv", file_name="file.csv")


''' def login_form(request):
    return render(request, 'login.html')

def login(request):
    if request.method == 'POST':
        usuario = request.POST['usuario']
        password = request.POST['contrasenya']
        return HttpResponse('Datos recibidos')
    else:
        return HttpResponse('Error en el método de envío. Enviar por POST.') '''

class Login(FormView):
    print("View login")
    template_name = 'login.html'
    form_class = FormularioLogin
    success_url = reverse_lazy('index')

    ''' @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return HttpResponseRedirect(self.get_success_url())
        else:
            return super(Login,self).dispatch(self.request, *args, **kwargs) '''
    
    def form_valid(self, form):
        print("Form valid")
        login(self.request,form.get_user())
        return super(Login,self).form_valid(form)

def Registro(request):
    user = Usuario.objects.get(username='almejiap@outlook.com')
    user.set_password("almejiap7")
    user.save()
    return HttpResponse("<html><body><h1>Hi</h1></body></html>")

""" def loginView(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    print(user)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        return render(request, 'index.html')
    else:
        # Return an 'invalid login' error message.
        return HttpResponse("<html><body><h1>No autorizado</h1></body></html>")
 """
"""
def SomosView(request):
    return render(request, 'user/acercade.html')
"""

def update_status_solicitud(request, cve, accion):
    print(request)
    if request.method == 'GET':
        print("Update status solicitud.")
        """ cve = request.data["cve"]
        action = request.data["action"] """
        print("Cve: ",cve, " Action: ",accion)

        if accion == "aprobar":
            # Obtener objeto CatEstatus para solicitud autorizada
            estatus = CatEstatus.objects.get(estatus__exact=2)
            msg = "Se aprobo la solicitud"
        else:
            # Obtener objeto CatEstatus para solicitud denegada
            estatus = CatEstatus.objects.get(estatus__exact=3)
            msg = "Se nego la solicitud"

        # Obtener objeto Usuario para el id/cveusuario recibido
        solicitud = Usuario.objects.get(cveusuario__exact=cve)

        # Actualizar y guardar estatus al model Usuario
        solicitud.estatus = estatus
        solicitud.save()

        # Validar perfil para determinar el envio de correo
        if solicitud.perfil == "Investigador":
            email = solicitud.email
            subject = "PANGEOS MX"
            mensaje = "Alta de usuario"
            template = "C:/Django Proyects/PANGEOS_DOWN_ENE2023/pangeos.com/templates/admin_sistema/mailing/aprobado.html" #"/var/www/pangeos.com/templates/admin_sistema/mailing/aprobado.html"
            send_email_gral("",template,email,subject,mensaje)

        #Método para actualizar la bitácora del usuario
        updateBitacora(cve, estatus)        
        status = 1
        return JsonResponse(
            {
                'status': status,
                'msg': msg
            }
        )

