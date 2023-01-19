from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path, include
from admin_sistema.views import *

app_name = 'admin_sistema'
urlpatterns = [
    # Mapeo para desplegar el formulario de inicio de sesión
    path('login/',LoginView.as_view(
        template_name="admin_sistema/login.html"
    ), name='login'),

    # Mapeo para validar los datos de inicio de sesión
    path('login2/',loginView, name='login2'),

    # Mapeo para iniciar sesión desde el control de sesiones
    path('login3/',loginSession, name='login3'),

    # Mapeo para cerrar la sesión del usuario
    path('logout/',LogoutView.as_view(), name='logout'),

    # Mapeo para el evento de cargar la imagen captcha al template de registro
    path('get_image/', get_image, name='get_image'),
    

    # REGISTRO
    # Mapeo para renderizar el template de registro
    path('form_registro/', form_registro, name="form_registro"),

    # Mapeo del evento cuando se guarda una solicitud de administrador
    path('addAdmin/',addAdmin, name='addAdmin'),

    # Mapeo del evento cuando se guarda una solicitud de Investigador
    path('addInvestigador/',addInvestigador, name='addInvestigador'),

    # Mapeo del evento para mostrar el template de Solicitudes de Usuario
    path('solicitudes/', solicitudes, name='solicitudes'),

    # Mapeo para el evento de descargar archivo (excel) de solicitudes
    path('downSolicitudes/', downSolicitudes, name='downSolicitudes'),

    # Mapeo para el evento de cargar la vista de autorizar solicitudes
    path('update_status_solicitud/<int:cve>/<str:accion>/', update_status_solicitud, name='update_status_solicitud'),



    # ADMINI. USUARIOS
    # Mapeo para renderizar el template con el formulario para recuperar contraseña
    path('recuperar/', recuperar, name="recuperar"),

    # Ruta para ejecutar el proceso de validación y envío de correo electrónico para recuperar contraseña
    path('enviar_recuperar/', enviar_recuperar, name='enviar_recuperar'),

    # Mapeo para renderizar landing con el formulario para actualizar contraseña
    path('rc/', rc, name="rc"),
    
    # Ruta para ejecutar el proceso de validación y actualización de contraseña
    path('save_recuperar/', save_recuperar, name="save_recuperar"),

    

    path('captcha/', captcha, name="captcha"),
    
    
    
    # Esquemas 
    path('servicios/', servicios, name='servicios'),
    path('servicios_fs/', servicios_fs, name='servicios_fs'),
    path('salud_mental/', salud_mental, name='salud_mental'),
    path('salud_mental_fs/', salud_mental_fs, name='salud_mental_fs'),
    path('organizacion_servicios/', organizacion_servicios, name='organizacion_servicios'),
    path('organizacion_servicios_fs/', organizacion_servicios_fs, name='organizacion_servicios_fs'),
    path('indicadores/', indicadores, name='indicadores'),
    path('indicadores_fs/', indicadores_fs, name='indicadores_fs'),


    # Quienes somos 
    path('equipo/', equipo, name='equipo'),
    path('instituciones_participantes/', instituciones_participantes, name='instituciones_participantes'),
    path('antecedentes/', antecedentes, name='antecedentes'),
    path('ubicacion/', ubicacion, name='ubicacion'),
    
    # Acerca de 
    path('informacion_sistema/', informacion_sistema, name='informacion_sistema'),
    path('agradecimientos_especiales/', agradecimientos_especiales, name='agradecimientos_especiales'),
    path('aviso_privacidad/', aviso_privacidad, name='aviso_privacidad'),
]

