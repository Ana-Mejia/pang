from django.db import models

from django.db import models
from django.contrib.auth.models import AbstractUser
 
 #Definición de un Model que se relaciona con la vista y la tabla de la base de datos
class CatEscolaridad(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    cveescolaridad = models.BigAutoField(primary_key=True, db_column='CVE_ESCOLARIDAD')
    descripcion = models.CharField(max_length=255, db_column='DESCRIPCION')
    
    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'Cat_Escolaridad'
        verbose_name_plural = 'Escolaridades'
    
    #Método para que en el combo que se cargue en la vista aparezca este nombre en el catálogo
    def __str__(self):
        return self.descripcion

class CatEntidadFederativa(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    cveentidadFederativa = models.BigAutoField(primary_key=True, db_column='CVE_ENTIDAD_FEDERATIVA')
    descripcion = models.CharField(max_length=255, db_column='DESCRIPCION')
    abreviacion = models.CharField(max_length=5, db_column='ABREVIACION')
    
    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'Cat_Entidad_Federativa'
        verbose_name_plural = 'Entidades'
    
    def __str__(self):
        return self.descripcion

class CatSexo(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    cvesexo = models.BigAutoField(primary_key=True, db_column='CVE_SEXO')
    codigo = models.CharField(max_length=1, db_column='CODIGO')
    descripcion = models.CharField(max_length=255, db_column='DESCRIPCION')

    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'Cat_Sexo'
        verbose_name_plural = 'Sexos'

    def __str__(self):
        return self.descripcion

class CatInstitucion(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    cveinstitucion = models.BigAutoField(primary_key=True, db_column='CVE_INSTITUCION')
    descripcion = models.CharField(max_length=255, db_column='DESCRIPCION')

    def __str__(self):
        return self.descripcion

    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'Cat_Institucion'
        verbose_name_plural = 'Instituciones'
    
class CatPerfil(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    cveperfil = models.BigAutoField(primary_key=True, db_column='CVE_PERFIL')
    perfil = models.CharField(max_length=30, db_column='PERFIL')
    
    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'Cat_Perfil'
        verbose_name_plural = 'Perfiles'

    def __str__(self):
        return self.perfil

class CatEstatus(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    estatus = models.BigAutoField(primary_key=True, db_column='CVE_ESTATUS')
    descripcion = models.CharField(max_length=30, db_column='DESCRIPCION')
    
    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'Cat_Estatus'
        verbose_name_plural = 'Estatus'

    def __str__(self):
        return self.descripcion

class Usuario(AbstractUser):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    cveusuario = models.BigAutoField(primary_key=True, db_column='CVE_USUARIO')    
    username = models.CharField(max_length=50, db_column='USERNAME', unique=True, null=False)
    # Se define el campo CURP como unico para evitar duplicados
    curp = models.CharField(max_length=18, db_column='CURP', unique=True)
    nombre = models.CharField(max_length=50, db_column='NOMBRE')
    appaterno = models.CharField(max_length=50, db_column='APELLIDO_PATERNO')
    apmaterno = models.CharField(max_length=51, db_column='APELLIDO_MATERNO')
    edad = models.CharField(max_length=2, db_column='FECHA_NACIMIENTO')
    # Llave foranea a CatPerfil
    perfil = models.ForeignKey(CatPerfil, db_column='CVE_PERFIL', on_delete=models.CASCADE, null=True)
    # Llave foranea a CatSexo
    sexo = models.ForeignKey(CatSexo, db_column='CVE_SEXO', on_delete=models.CASCADE)
    # Llave foranea a CatEscolaridad
    escolaridad = models.ForeignKey(CatEscolaridad, db_column='CVE_ESCOLARIDAD', on_delete=models.CASCADE)
    # Llave foranea a CatInstitucion
    institucion =models.ForeignKey(CatInstitucion, db_column='CVE_INSTITUCION', on_delete=models.CASCADE)
    # Campo correo electrónico unico para evitar duplicados
    email = models.EmailField(max_length=80, db_column='EMAIL', blank=True, default='')
    # Llave foranea a CatEstatus
    estatus = models.ForeignKey(CatEstatus, db_column='CVE_STATUS', on_delete=models.CASCADE, null=True)
    # Campo seteado cuando se realiza una instancia del model
    fechaalta = models.DateTimeField(max_length=19, db_column='FECHA_ALTA', auto_now_add=True, null=True)
    # Este campo admite nulos para que se actualice en otro momento
    alta = models.SmallIntegerField(db_column='ALTA', null=True)
    # Este campo admite nulos para que se actualice en otro momento
    fechabaja = models.DateTimeField(max_length=19, db_column='FECHA_BAJA', null=True)
    # Este campo admite nulos para que se actualice en otro momento
    baja = models.SmallIntegerField(db_column='BAJA', null=True)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['nombre','appaterno','apmaterno']

    def __str__(self):
        return f'{self.username}'

    def has_perm(self, perm, obj = None):
        return True

    def has_module_perms(self, app_label):
        return True

    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'Usuario'

class HistoricoUsuario(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    cveusuario = models.BigAutoField(primary_key=True, db_column='CVE_USUARIO')
    password = models.CharField(max_length=8, db_column='CONTRASEÑA', default='')
    # Se define el campo CURP como unico para evitar duplicados
    curp = models.CharField(max_length=18, db_column='CURP', unique=True)
    nombre = models.CharField(max_length=50, db_column='NOMBRE')
    appaterno = models.CharField(max_length=50, db_column='APELLIDO_PATERNO')
    apmaterno = models.CharField(max_length=50, db_column='APELLIDO_MATERNO')
    edad = models.CharField(max_length=2, db_column='FECHA_NACIMIENTO')
    # Llave foranea a CatSexo
    sexo = models.ForeignKey(CatSexo, db_column='CVE_SEXO', on_delete=models.CASCADE)
    email = models.EmailField(max_length=18, db_column='EMAIL', blank=True)
    # Llave foranea a CatEscolaridad
    escolaridad = models.ForeignKey(CatEscolaridad, db_column='CVE_ESCOLARIDAD', on_delete=models.CASCADE)
    # Llave foranea a CatPerfil
    perfil = models.ForeignKey(CatPerfil, db_column='CVE_PERFIL', on_delete=models.CASCADE)
    # Llave foranea a CatInstitucion
    institucion =models.ForeignKey(CatInstitucion, db_column='CVE_INSTITUCION', on_delete=models.CASCADE)
    # Llave foranea a CatEstatus
    estatus = models.ForeignKey(CatEstatus, db_column='CVE_ESTATUS', on_delete=models.CASCADE, null=True)
    # Este campo admite nulos para que se actualice en otro momento
    alta = models.SmallIntegerField(db_column='ALTA', null=True)
    # Este campo admite nulos para que se actualice en otro momento
    fechaalta = models.DateTimeField(max_length=19, db_column='FECHA_ALTA', auto_now_add=True, null=True)

    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'Historico_Usuario'
