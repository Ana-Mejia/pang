from admin_sistema.models import Usuario
from django.contrib.auth.hashers import check_password
from django.contrib.auth.backends import ModelBackend

class UserAuthentificacionBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            user = Usuario.objects.get(username=username)
            # Verificar la contraseña. Como lo hace el modelo de usuario de django, siguiendo los metodos que trae este
            if user.check_password(password):
                return user
        except Usuario.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return Usuario.objects.get(pk=user_id)
        except Usuario.DoesNotExist:
            return None