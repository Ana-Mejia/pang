from django import forms
from django.contrib.auth.forms import AuthenticationForm

#from captcha.fields import CaptchaField

from admin_sistema.models import CatEscolaridad, CatSexo, Usuario

#Clase creada para definir el form de solicitud de registro Administrador e Investigador
class UserForm(forms.ModelForm):

    #captcha = CaptchaField()

    # Método que inicializa los elementos del form como por ejemplo 
    # la primera opción de un combo en la vista
    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        #Inicializamos los combos con la opción por default de los mismos
        self.fields['perfil'].empty_label = "Seleccionar tipo de usuario"
        self.fields['escolaridad'].empty_label = "Seleccionar escolaridad"
        self.fields['institucion'].empty_label = "Seleccionar Institución"

        for field in self.Meta.required:
            self.fields[field].required = True

    #Este campo se define aqui para que se cargue en la vista pero no se guarde en la BD
    password_confirm = forms.CharField(max_length=24, widget=forms.PasswordInput(attrs={'placeholder': 'Confirmar Contraseña'}))
    # El campo se carga aqui para hacer una consulta para obtener los datos y mostrarlo en la vista
    sexo = forms.ModelChoiceField(queryset=CatSexo.objects.all(), widget=forms.RadioSelect, empty_label=None)

    # En esta clase se definen los metadatos del Form de Solicitud de registro
    # Por ejemplo la tabla en la que se guardan los datos y que campos son 
    # visibles en el form para validarlos y los Place Holders de los campos imput Text
    class Meta:
        # Se define el modelo que corresponde al formulario de registro de solicitud
        model = Usuario
        # Campos visibles en el formulario de registro de solicitud de administrador
        fields = [      
            'curp',            
            'nombre',
            'appaterno',
            'apmaterno',
            'edad',
            'perfil', 
            'sexo',
            'escolaridad',
            'institucion',
            'password',
            'email',
        ]        
        required = [
            'nombre',
            'appaterno',
            'apmaterno',
            'edad',
            'perfil', 
            'sexo',
            'escolaridad',
            'institucion',
            'password',
        ]
        # Estos widgets se utilizan para colocar eel placeholder de los campos en el formulario
        widgets = {
            'curp': forms.TextInput(attrs={'placeholder': 'CURP'}),
            'nombre': forms.TextInput(attrs={'placeholder': 'Nombre (s)'}),
            'appaterno': forms.TextInput(attrs={'placeholder': 'Apellido Paterno'}),
            'apmaterno': forms.TextInput(attrs={'placeholder': 'Apellido Materno'}),
            'edad': forms.NumberInput(attrs={'placeholder': 'Edad'}),
            'password': forms.PasswordInput(attrs={'placeholder': 'Contraseña'}),
            'email': forms.EmailInput(attrs={'placeholder': 'Correo Electrónico'}),

        }

class OtroForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(OtroForm, self).__init__(*args, **kwargs)
        #Inicializamos los combos con la opción por default de los mismos
        self.fields['perfil'].empty_label = "Seleccionar tipo de usuario"
        self.fields['escolaridad'].empty_label = "Seleccionar escolaridad"
        self.fields['institucion'].empty_label = "Seleccionar Institución"
    
    #Este campo se define aqui para que se cargue en la vista pero no se guarde en la BD
    password_confirm = forms.CharField(max_length=24, widget=forms.PasswordInput(attrs={'placeholder': 'Confirmar Contraseña'}))
    #Aqui seteamos los datos del catálogo CatSexo para pintar el combo en el formulario
    sexo = forms.ModelChoiceField(queryset=CatSexo.objects.all(), widget=forms.RadioSelect, empty_label=None)
    
    class Meta:
        # Se define el modelo que corresponde al formulario de registro de solicitud de Investigador
        model = Usuario
        # Campos visibles en el formulario de registro de solicitud de investigador
        fields = [
            'curp',            
            'nombre',
            'appaterno',
            'apmaterno',
            'edad',
            'perfil', 
            'sexo',
            'escolaridad',
            'institucion',
            'password',
            'email'
        ]
        # Estos widgets se utilizan para colocar eel placeholder de los campos en el formularios
        widgets = {
            'curp': forms.TextInput(attrs={'placeholder': 'CURP'}),
            'nombre': forms.TextInput(attrs={'placeholder': 'Nombre (s)'}),
            'appaterno': forms.TextInput(attrs={'placeholder': 'Apellido Paterno'}),
            'apmaterno': forms.TextInput(attrs={'placeholder': 'Apellido Materno'}),
            'edad': forms.NumberInput(attrs={'placeholder': 'Edad'}),
            'password': forms.PasswordInput(attrs={'placeholder': 'Contraseña'}),
            'email': forms.EmailInput(attrs={'placeholder': 'Correo Electrónico'}),
        }

class FormularioLogin(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(FormularioLogin, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs['class'] = 'form-control'
        self.fields['username'].widget.attrs['placeholder'] = 'Nombre de usuario'
        self.fields['password'].widget.attrs['class'] = 'form-control'
        self.fields['password'].widget.attrs['placeholder'] = 'Contraseña'

class RecuperarForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(RecuperarForm, self).__init__(*args, **kwargs)