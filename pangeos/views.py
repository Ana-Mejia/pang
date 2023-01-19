from django.shortcuts import render

"""
El método recibe la petición del usuario y carga la vista de Página de inicio
Parameters
----------
request : HTTPRequest
    Se recibe la petición del usuario cuando entra a la ruta 'inicio' 
Return
----------
vista : HTML
    El método regresa la vista de la Página principal
"""
def index(request):
    return render(request,'admin_sistema/index.html')