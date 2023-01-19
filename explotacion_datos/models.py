from django.db import models

# Create your models here.
class CatAccidentesTransito(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    idcataccidentetransito = models.BigAutoField(primary_key=True, db_column='ID_CAT_ACCIDENTE_TRANSITO')
    descripcion = models.CharField(max_length=255, db_column='DESCRIPCIÓN')
    
    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'CAT_ACCIDENTE_TRANSITO'
        verbose_name_plural = 'Accidentes_transito'
    
    #Método para que en el combo que se cargue en la vista aparezca este nombre en el catálogo
    def __str__(self):
        return self.descripcion

class CatEntidades(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    cve_ent = models.BigAutoField(primary_key=True, db_column='cve_ent')
    noment = models.CharField(max_length=255, db_column='Nom_ent')
    entidad = models.CharField(max_length=255, db_column='Entidad')
    abreviatura = models.CharField(max_length=10, db_column='Abreviatura')
    iso3166 =  models.CharField(max_length=10, db_column='ISO-3166')
    
    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'CAT_ENTIDADES'
        verbose_name_plural = 'Entidades'
    
    #Método para que en el combo que se cargue en la vista aparezca este nombre en el catálogo
    def __str__(self):
        return self.noment


class CatMunicipios(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    cveentmun = models.SmallIntegerField(db_column='cve_ent_mun')
    cve_ent = models.ForeignKey(CatEntidades, db_column='cve_ent', on_delete=models.CASCADE)
    noment = models.CharField(max_length=255, db_column='nom_ent')
    nomabr = models.CharField(max_length=255, db_column='nom_abr')
    cvemun = models.SmallIntegerField(db_column='cve_mun')
    nommun = models.CharField(max_length=10, db_column='nom_mun')
    
    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'CAT_MUNICIPIOS'
        verbose_name_plural = 'Municipios'
    
    #Método para que en el combo que se cargue en la vista aparezca este nombre en el catálogo
    def __str__(self):
        return self.nommun

class CatSexo(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    idcatsexo = models.BigAutoField(primary_key=True, db_column='ID_CAT_SEXO')
    descripcion = models.CharField(max_length=255, db_column='DESCRIPCIÓN')

    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'CAT_SEXO'
        verbose_name_plural = 'Sexo'
    
    #Método para que en el combo que se cargue en la vista aparezca este nombre en el catálogo
    def __str__(self):
        return self.descripcion

class CatRegionalizacion(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    cve_ent = models.BigAutoField(primary_key=True, db_column='cve_ent')
    noment = models.CharField(max_length=255, db_column='Nom_ent')
    regionalizacion = models.CharField(max_length=255, db_column='regionalización')

    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'CAT_REGIONALIZACION'
        verbose_name_plural = 'Regiones'
    
    #Método para que en el combo que se cargue en la vista aparezca este nombre en el catálogo
    def __str__(self):
        return self.regionalizacion

class CuboIndNac(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    anio = models.SmallIntegerField(db_column='anio')
    cve_ent = models.SmallIntegerField(db_column='cve_ent')
    edad = models.SmallIntegerField(db_column='edad')
    sexo = models.SmallIntegerField(db_column='sexo')
    total_acctran = models.SmallIntegerField(db_column='total_acctran')
    total_homi = models.SmallIntegerField(db_column='total_homi')
    total_suic = models.SmallIntegerField(db_column='total_suic')
    total_suic_medio1 = models.SmallIntegerField(db_column='total_suic_medio1')
    total_suic_medio2 = models.SmallIntegerField(db_column='total_suic_medio2')
    total_suic_medio3 = models.SmallIntegerField(db_column='total_suic_medio3')
    total_suic_medio4 = models.SmallIntegerField(db_column='total_suic_medio4')
    total_suic_medio5 = models.SmallIntegerField(db_column='total_suic_medio5')
    total_tm_usosus = models.SmallIntegerField(db_column='total_tm_usosus')
    total_uso_sust = models.SmallIntegerField(db_column='total_uso_sust')
    total_uso_sust_oh = models.SmallIntegerField(db_column='total_uso_sust_oh')
    total_uso_sust_noleg = models.SmallIntegerField(db_column='total_uso_sust_noleg')
    poblacion = models.SmallIntegerField(db_column='poblacion')
    tasa_total_acctran = models.SmallIntegerField(db_column='tasa_total_acctran')
    tasa_total_homi = models.SmallIntegerField(db_column='tasa_total_homi')
    tasa_total_suic = models.SmallIntegerField(db_column='tasa_total_suic')
    tasa_total_suic_medio = models.SmallIntegerField(db_column='tasa_total_suic_medio')
    tasa_total_tm_usosus = models.SmallIntegerField(db_column='tasa_total_tm_usosus')
    tasa_total_uso_sust = models.SmallIntegerField(db_column='tasa_total_uso_sust')
    tasa_total_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_uso_sust_oh')
    tasa_total_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_uso_sust_noleg')

    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'CUBO_IND_NAC'
        verbose_name_plural = 'cubos_indicadores_nacional'
    
    
    
class CuboIndMunQuinq(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    anio = models.SmallIntegerField(db_column='anio')
    cve_ent = models.SmallIntegerField(db_column='cve_ent')
    cve_mun = models.SmallIntegerField(db_column='cve_mun')
    sexo = models.CharField(max_length=4, db_column='sexo')
    total_acctran = models.SmallIntegerField(db_column='total_acctran')
    total_homi = models.SmallIntegerField(db_column='total_homi')
    total_suic = models.SmallIntegerField(db_column='total_suic')
    total_tm_usosus = models.SmallIntegerField(db_column='total_tm_usosus')
    total_uso_sust = models.SmallIntegerField(db_column='total_uso_sust')
    total_uso_sust_oh = models.SmallIntegerField(db_column='total_uso_sust_oh')
    total_uso_sust_noleg = models.SmallIntegerField(db_column='total_uso_sust_noleg')
    total_pob_00_04_gral = models.SmallIntegerField(db_column='total_pob_00_04_gral')
    total_pob_00_04_acctran = models.SmallIntegerField(db_column='total_pob_00_04_acctran')
    total_pob_00_04_homi = models.SmallIntegerField(db_column='total_pob_00_04_homi')
    total_pob_00_04_suic = models.SmallIntegerField(db_column='total_pob_00_04_suic')
    total_pob_00_04_suic_medio1 = models.SmallIntegerField(db_column='total_pob_00_04_suic_medio1')
    total_pob_00_04_suic_medio2 = models.SmallIntegerField(db_column='total_pob_00_04_suic_medio2')
    total_pob_00_04_suic_medio3 = models.SmallIntegerField(db_column='total_pob_00_04_suic_medio3')
    total_pob_00_04_suic_medio4 = models.SmallIntegerField(db_column='total_pob_00_04_suic_medio4')
    total_pob_00_04_suic_medio5 = models.SmallIntegerField(db_column='total_pob_00_04_suic_medio5')
    total_pob_00_04_tm_usosus = models.SmallIntegerField(db_column='total_pob_00_04_tm_usosus')
    total_pob_00_04_usos_sust = models.SmallIntegerField(db_column='total_pob_00_04_usos_sust')
    total_pob_00_04_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_00_04_usos_sust_oh')
    total_pob_00_04_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_00_04_usos_sust_noleg')

    total_pob_05_09_gral = models.SmallIntegerField(db_column='total_pob_05_09_gral')
    total_pob_05_09_acctran = models.SmallIntegerField(db_column='total_pob_05_09_acctran')
    total_pob_05_09_homi = models.SmallIntegerField(db_column='total_pob_05_09_homi')
    total_pob_05_09_suic = models.SmallIntegerField(db_column='total_pob_05_09_suic')
    total_pob_05_09_suic_medio1 = models.SmallIntegerField(db_column='total_pob_05_09_suic_medio1')
    total_pob_05_09_suic_medio2 = models.SmallIntegerField(db_column='total_pob_05_09_suic_medio2')
    total_pob_05_09_suic_medio3 = models.SmallIntegerField(db_column='total_pob_05_09_suic_medio3')
    total_pob_05_09_suic_medio4 = models.SmallIntegerField(db_column='total_pob_05_09_suic_medio4')
    total_pob_05_09_suic_medio5 = models.SmallIntegerField(db_column='total_pob_05_09_suic_medio5')
    total_pob_05_09_tm_usosus = models.SmallIntegerField(db_column='total_pob_05_09_tm_usosus')
    total_pob_05_09_usos_sust = models.SmallIntegerField(db_column='total_pob_05_09_usos_sust')
    total_pob_05_09_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_05_09_usos_sust_oh')
    total_pob_05_09_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_05_09_usos_sust_noleg')

    total_pob_10_14_gral = models.SmallIntegerField(db_column='total_pob_10_14_gral')
    total_pob_10_14_acctran = models.SmallIntegerField(db_column='total_pob_10_14_acctran')
    total_pob_10_14_homi = models.SmallIntegerField(db_column='total_pob_10_14_homi')
    total_pob_10_14_suic = models.SmallIntegerField(db_column='total_pob_10_14_suic')
    total_pob_10_14_suic_medio1 = models.SmallIntegerField(db_column='total_pob_10_14_suic_medio1')
    total_pob_10_14_suic_medio2 = models.SmallIntegerField(db_column='total_pob_10_14_suic_medio2')
    total_pob_10_14_suic_medio3 = models.SmallIntegerField(db_column='total_pob_10_14_suic_medio3')
    total_pob_10_14_suic_medio4 = models.SmallIntegerField(db_column='total_pob_10_14_suic_medio4')
    total_pob_10_14_suic_medio5 = models.SmallIntegerField(db_column='total_pob_10_14_suic_medio5')
    total_pob_10_14_tm_usosus = models.SmallIntegerField(db_column='total_pob_10_14_tm_usosus')
    total_pob_10_14_usos_sust = models.SmallIntegerField(db_column='total_pob_10_14_usos_sust')
    total_pob_10_14_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_10_14_usos_sust_oh')
    total_pob_10_14_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_10_14_usos_sust_noleg')

    total_pob_15_19_gral = models.SmallIntegerField(db_column='total_pob_15_19_gral')
    total_pob_15_19_acctran = models.SmallIntegerField(db_column='total_pob_15_19_acctran')
    total_pob_15_19_homi = models.SmallIntegerField(db_column='total_pob_15_19_homi')
    total_pob_15_19_suic = models.SmallIntegerField(db_column='total_pob_15_19_suic')
    total_pob_15_19_suic_medio1 = models.SmallIntegerField(db_column='total_pob_15_19_suic_medio1')
    total_pob_15_19_suic_medio2 = models.SmallIntegerField(db_column='total_pob_15_19_suic_medio2')
    total_pob_15_19_suic_medio3 = models.SmallIntegerField(db_column='total_pob_15_19_suic_medio3')
    total_pob_15_19_suic_medio4 = models.SmallIntegerField(db_column='total_pob_15_19_suic_medio4')
    total_pob_15_19_suic_medio5 = models.SmallIntegerField(db_column='total_pob_15_19_suic_medio5')
    total_pob_15_19_tm_usosus = models.SmallIntegerField(db_column='total_pob_15_19_tm_usosus')
    total_pob_15_19_usos_sust = models.SmallIntegerField(db_column='total_pob_15_19_usos_sust')
    total_pob_15_19_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_15_19_usos_sust_oh')
    total_pob_15_19_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_15_19_usos_sust_noleg')

    total_pob_20_24_gral = models.SmallIntegerField(db_column='total_pob_20_24_gral')
    total_pob_20_24_acctran = models.SmallIntegerField(db_column='total_pob_20_24_acctran')
    total_pob_20_24_homi = models.SmallIntegerField(db_column='total_pob_20_24_homi')
    total_pob_20_24_suic = models.SmallIntegerField(db_column='total_pob_20_24_suic')
    total_pob_20_24_suic_medio1 = models.SmallIntegerField(db_column='total_pob_20_24_suic_medio1')
    total_pob_20_24_suic_medio2 = models.SmallIntegerField(db_column='total_pob_20_24_suic_medio2')
    total_pob_20_24_suic_medio3 = models.SmallIntegerField(db_column='total_pob_20_24_suic_medio3')
    total_pob_20_24_suic_medio4 = models.SmallIntegerField(db_column='total_pob_20_24_suic_medio4')
    total_pob_20_24_suic_medio5 = models.SmallIntegerField(db_column='total_pob_20_24_suic_medio5')
    total_pob_20_24_tm_usosus = models.SmallIntegerField(db_column='total_pob_20_24_tm_usosus')
    total_pob_20_24_usos_sust = models.SmallIntegerField(db_column='total_pob_20_24_usos_sust')
    total_pob_20_24_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_20_24_usos_sust_oh')
    total_pob_20_24_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_20_24_usos_sust_noleg')

    total_pob_25_29_gral = models.SmallIntegerField(db_column='total_pob_25_29_gral')
    total_pob_25_29_acctran = models.SmallIntegerField(db_column='total_pob_25_29_acctran')
    total_pob_25_29_homi = models.SmallIntegerField(db_column='total_pob_25_29_homi')
    total_pob_25_29_suic = models.SmallIntegerField(db_column='total_pob_25_29_suic')
    total_pob_25_29_suic_medio1 = models.SmallIntegerField(db_column='total_pob_25_29_suic_medio1')
    total_pob_25_29_suic_medio2 = models.SmallIntegerField(db_column='total_pob_25_29_suic_medio2')
    total_pob_25_29_suic_medio3 = models.SmallIntegerField(db_column='total_pob_25_29_suic_medio3')
    total_pob_25_29_suic_medio4 = models.SmallIntegerField(db_column='total_pob_25_29_suic_medio4')
    total_pob_25_29_suic_medio5 = models.SmallIntegerField(db_column='total_pob_25_29_suic_medio5')
    total_pob_25_29_tm_usosus = models.SmallIntegerField(db_column='total_pob_25_29_tm_usosus')
    total_pob_25_29_usos_sust = models.SmallIntegerField(db_column='total_pob_25_29_usos_sust')
    total_pob_25_29_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_25_29_usos_sust_oh')
    total_pob_25_29_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_25_29_usos_sust_noleg')

    total_pob_30_34_gral = models.SmallIntegerField(db_column='total_pob_30_34_gral')
    total_pob_30_34_acctran = models.SmallIntegerField(db_column='total_pob_30_34_acctran')
    total_pob_30_34_homi = models.SmallIntegerField(db_column='total_pob_30_34_homi')
    total_pob_30_34_suic = models.SmallIntegerField(db_column='total_pob_30_34_suic')
    total_pob_30_34_suic_medio1 = models.SmallIntegerField(db_column='total_pob_30_34_suic_medio1')
    total_pob_30_34_suic_medio2 = models.SmallIntegerField(db_column='total_pob_30_34_suic_medio2')
    total_pob_30_34_suic_medio3 = models.SmallIntegerField(db_column='total_pob_30_34_suic_medio3')
    total_pob_30_34_suic_medio4 = models.SmallIntegerField(db_column='total_pob_30_34_suic_medio4')
    total_pob_30_34_suic_medio5 = models.SmallIntegerField(db_column='total_pob_30_34_suic_medio5')
    total_pob_30_34_tm_usosus = models.SmallIntegerField(db_column='total_pob_30_34_tm_usosus')
    total_pob_30_34_usos_sust = models.SmallIntegerField(db_column='total_pob_30_34_usos_sust')
    total_pob_30_34_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_30_34_usos_sust_oh')
    total_pob_30_34_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_30_34_usos_sust_noleg')

    total_pob_35_39_gral = models.SmallIntegerField(db_column='total_pob_35_39_gral')
    total_pob_35_39_acctran = models.SmallIntegerField(db_column='total_pob_35_39_acctran')
    total_pob_35_39_homi = models.SmallIntegerField(db_column='total_pob_35_39_homi')
    total_pob_35_39_suic = models.SmallIntegerField(db_column='total_pob_35_39_suic')
    total_pob_35_39_suic_medio1 = models.SmallIntegerField(db_column='total_pob_35_39_suic_medio1')
    total_pob_35_39_suic_medio2 = models.SmallIntegerField(db_column='total_pob_35_39_suic_medio2')
    total_pob_35_39_suic_medio3 = models.SmallIntegerField(db_column='total_pob_35_39_suic_medio3')
    total_pob_35_39_suic_medio4 = models.SmallIntegerField(db_column='total_pob_35_39_suic_medio4')
    total_pob_35_39_suic_medio5 = models.SmallIntegerField(db_column='total_pob_35_39_suic_medio5')
    total_pob_35_39_tm_usosus = models.SmallIntegerField(db_column='total_pob_35_39_tm_usosus')
    total_pob_35_39_usos_sust = models.SmallIntegerField(db_column='total_pob_35_39_usos_sust')
    total_pob_35_39_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_35_39_usos_sust_oh')
    total_pob_35_39_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_35_39_usos_sust_noleg')

    total_pob_40_44_gral = models.SmallIntegerField(db_column='total_pob_40_44_gral')
    total_pob_40_44_acctran = models.SmallIntegerField(db_column='total_pob_40_44_acctran')
    total_pob_40_44_homi = models.SmallIntegerField(db_column='total_pob_40_44_homi')
    total_pob_40_44_suic = models.SmallIntegerField(db_column='total_pob_40_44_suic')
    total_pob_40_44_suic_medio1 = models.SmallIntegerField(db_column='total_pob_40_44_suic_medio1')
    total_pob_40_44_suic_medio2 = models.SmallIntegerField(db_column='total_pob_40_44_suic_medio2')
    total_pob_40_44_suic_medio3 = models.SmallIntegerField(db_column='total_pob_40_44_suic_medio3')
    total_pob_40_44_suic_medio4 = models.SmallIntegerField(db_column='total_pob_40_44_suic_medio4')
    total_pob_40_44_suic_medio5 = models.SmallIntegerField(db_column='total_pob_40_44_suic_medio5')
    total_pob_40_44_tm_usosus = models.SmallIntegerField(db_column='total_pob_40_44_tm_usosus')
    total_pob_40_44_usos_sust = models.SmallIntegerField(db_column='total_pob_40_44_usos_sust')
    total_pob_40_44_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_40_44_usos_sust_oh')
    total_pob_40_44_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_40_44_usos_sust_noleg')

    total_pob_45_49_gral = models.SmallIntegerField(db_column='total_pob_45_49_gral')
    total_pob_45_49_acctran = models.SmallIntegerField(db_column='total_pob_45_49_acctran')
    total_pob_45_49_homi = models.SmallIntegerField(db_column='total_pob_45_49_homi')
    total_pob_45_49_suic = models.SmallIntegerField(db_column='total_pob_45_49_suic')
    total_pob_45_49_suic_medio1 = models.SmallIntegerField(db_column='total_pob_45_49_suic_medio1')
    total_pob_45_49_suic_medio2 = models.SmallIntegerField(db_column='total_pob_45_49_suic_medio2')
    total_pob_45_49_suic_medio3 = models.SmallIntegerField(db_column='total_pob_45_49_suic_medio3')
    total_pob_45_49_suic_medio4 = models.SmallIntegerField(db_column='total_pob_45_49_suic_medio4')
    total_pob_45_49_suic_medio5 = models.SmallIntegerField(db_column='total_pob_45_49_suic_medio5')
    total_pob_45_49_tm_usosus = models.SmallIntegerField(db_column='total_pob_45_49_tm_usosus')
    total_pob_45_49_usos_sust = models.SmallIntegerField(db_column='total_pob_45_49_usos_sust')
    total_pob_45_49_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_45_49_usos_sust_oh')
    total_pob_45_49_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_45_49_usos_sust_noleg')

    total_pob_50_54_gral = models.SmallIntegerField(db_column='total_pob_50_54_gral')
    total_pob_50_54_acctran = models.SmallIntegerField(db_column='total_pob_50_54_acctran')
    total_pob_50_54_homi = models.SmallIntegerField(db_column='total_pob_50_54_homi')
    total_pob_50_54_suic = models.SmallIntegerField(db_column='total_pob_50_54_suic')
    total_pob_50_54_suic_medio1 = models.SmallIntegerField(db_column='total_pob_50_54_suic_medio1')
    total_pob_50_54_suic_medio2 = models.SmallIntegerField(db_column='total_pob_50_54_suic_medio2')
    total_pob_50_54_suic_medio3 = models.SmallIntegerField(db_column='total_pob_50_54_suic_medio3')
    total_pob_50_54_suic_medio4 = models.SmallIntegerField(db_column='total_pob_50_54_suic_medio4')
    total_pob_50_54_suic_medio5 = models.SmallIntegerField(db_column='total_pob_50_54_suic_medio5')
    total_pob_50_54_tm_usosus = models.SmallIntegerField(db_column='total_pob_50_54_tm_usosus')
    total_pob_50_54_usos_sust = models.SmallIntegerField(db_column='total_pob_50_54_usos_sust')
    total_pob_50_54_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_50_54_usos_sust_oh')
    total_pob_50_54_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_50_54_usos_sust_noleg')

    total_pob_55_59_gral = models.SmallIntegerField(db_column='total_pob_55_59_gral')
    total_pob_55_59_acctran = models.SmallIntegerField(db_column='total_pob_55_59_acctran')
    total_pob_55_59_homi = models.SmallIntegerField(db_column='total_pob_55_59_homi')
    total_pob_55_59_suic = models.SmallIntegerField(db_column='total_pob_55_59_suic')
    total_pob_55_59_suic_medio1 = models.SmallIntegerField(db_column='total_pob_55_59_suic_medio1')
    total_pob_55_59_suic_medio2 = models.SmallIntegerField(db_column='total_pob_55_59_suic_medio2')
    total_pob_55_59_suic_medio3 = models.SmallIntegerField(db_column='total_pob_55_59_suic_medio3')
    total_pob_55_59_suic_medio4 = models.SmallIntegerField(db_column='total_pob_55_59_suic_medio4')
    total_pob_55_59_suic_medio5 = models.SmallIntegerField(db_column='total_pob_55_59_suic_medio5')
    total_pob_55_59_tm_usosus = models.SmallIntegerField(db_column='total_pob_55_59_tm_usosus')
    total_pob_55_59_usos_sust = models.SmallIntegerField(db_column='total_pob_55_59_usos_sust')
    total_pob_55_59_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_55_59_usos_sust_oh')
    total_pob_55_59_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_55_59_usos_sust_noleg')

    total_pob_60_64_gral = models.SmallIntegerField(db_column='total_pob_60_64_gral')
    total_pob_60_64_acctran = models.SmallIntegerField(db_column='total_pob_60_64_acctran')
    total_pob_60_64_homi = models.SmallIntegerField(db_column='total_pob_60_64_homi')
    total_pob_60_64_suic = models.SmallIntegerField(db_column='total_pob_60_64_suic')
    total_pob_60_64_suic_medio1 = models.SmallIntegerField(db_column='total_pob_60_64_suic_medio1')
    total_pob_60_64_suic_medio2 = models.SmallIntegerField(db_column='total_pob_60_64_suic_medio2')
    total_pob_60_64_suic_medio3 = models.SmallIntegerField(db_column='total_pob_60_64_suic_medio3')
    total_pob_60_64_suic_medio4 = models.SmallIntegerField(db_column='total_pob_60_64_suic_medio4')
    total_pob_60_64_suic_medio5 = models.SmallIntegerField(db_column='total_pob_60_64_suic_medio5')
    total_pob_60_64_tm_usosus = models.SmallIntegerField(db_column='total_pob_60_64_tm_usosus')
    total_pob_60_64_usos_sust = models.SmallIntegerField(db_column='total_pob_60_64_usos_sust')
    total_pob_60_64_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_60_64_usos_sust_oh')
    total_pob_60_64_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_60_64_usos_sust_noleg')

    total_pob_65_mm_gral = models.SmallIntegerField(db_column='total_pob_65_mm_gral')
    total_pob_65_mm_acctran = models.SmallIntegerField(db_column='total_pob_65_mm_acctran')
    total_pob_65_mm_homi = models.SmallIntegerField(db_column='total_pob_65_mm_homi')
    total_pob_65_mm_suic = models.SmallIntegerField(db_column='total_pob_65_mm_suic')
    total_pob_65_mm_suic_medio1 = models.SmallIntegerField(db_column='total_pob_65_mm_suic_medio1')
    total_pob_65_mm_suic_medio2 = models.SmallIntegerField(db_column='total_pob_65_mm_suic_medio2')
    total_pob_65_mm_suic_medio3 = models.SmallIntegerField(db_column='total_pob_65_mm_suic_medio3')
    total_pob_65_mm_suic_medio4 = models.SmallIntegerField(db_column='total_pob_65_mm_suic_medio4')
    total_pob_65_mm_suic_medio5 = models.SmallIntegerField(db_column='total_pob_65_mm_suic_medio5')
    total_pob_65_mm_tm_usosus = models.SmallIntegerField(db_column='total_pob_65_mm_tm_usosus')
    total_pob_65_mm_usos_sust = models.SmallIntegerField(db_column='total_pob_65_mm_usos_sust')
    total_pob_65_mm_usos_sust_oh = models.SmallIntegerField(db_column='total_pob_65_mm_usos_sust_oh')
    total_pob_65_mm_usos_sust_noleg = models.SmallIntegerField(db_column='total_pob_65_mm_usos_sust_noleg')

    proy_poblacion_00_04 = models.SmallIntegerField(db_column='proy_poblacion_00_04')
    proy_poblacion_05_09 = models.SmallIntegerField(db_column='proy_poblacion_05_09')
    proy_poblacion_10_14 = models.SmallIntegerField(db_column='proy_poblacion_10_14')
    proy_poblacion_15_19 = models.SmallIntegerField(db_column='proy_poblacion_15_19')
    proy_poblacion_20_24 = models.SmallIntegerField(db_column='proy_poblacion_20_24')
    proy_poblacion_25_29 = models.SmallIntegerField(db_column='proy_poblacion_25_29')
    proy_poblacion_30_34 = models.SmallIntegerField(db_column='proy_poblacion_30_34')
    proy_poblacion_35_39 = models.SmallIntegerField(db_column='proy_poblacion_35_39')
    proy_poblacion_40_44 = models.SmallIntegerField(db_column='proy_poblacion_40_44')
    proy_poblacion_45_49 = models.SmallIntegerField(db_column='proy_poblacion_45_49')
    proy_poblacion_50_54 = models.SmallIntegerField(db_column='proy_poblacion_50_54')
    proy_poblacion_55_59 = models.SmallIntegerField(db_column='proy_poblacion_55_59')
    proy_poblacion_60_64 = models.SmallIntegerField(db_column='proy_poblacion_60_64')
    proy_poblacion_65_mm = models.SmallIntegerField(db_column='proy_poblacion_65_mm')

    tasa_total_pob_gral_acctran = models.SmallIntegerField(db_column='tasa_total_pob_gral_acctran')
    tasa_total_pob_gral_homi = models.SmallIntegerField(db_column='tasa_total_pob_gral_homi')
    tasa_total_pob_gral_suic = models.SmallIntegerField(db_column='tasa_total_pob_gral_suic')
    tasa_total_pob_gral_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_gral_tm_usosus')
    tasa_total_pob_gral_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_gral_uso_sust')
    tasa_total_pob_gral_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_gral_uso_sust_noleg')
    tasa_total_pob_gral_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_gral_uso_sust_oh')

    tasa_total_pob_00_04_acctran = models.SmallIntegerField(db_column='tasa_total_pob_00_04_acctran')
    tasa_total_pob_00_04_gral = models.SmallIntegerField(db_column='tasa_total_pob_00_04_gral')
    tasa_total_pob_00_04_homi = models.SmallIntegerField(db_column='tasa_total_pob_00_04_homi')
    tasa_total_pob_00_04_suic = models.SmallIntegerField(db_column='tasa_total_pob_00_04_suic')
    tasa_total_pob_00_04_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_00_04_tm_usosus')
    tasa_total_pob_00_04_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_00_04_uso_sust')
    tasa_total_pob_00_04_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_00_04_uso_sust_noleg')
    tasa_total_pob_00_04_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_00_04_uso_sust_oh')

    tasa_total_pob_05_09_acctran = models.SmallIntegerField(db_column='tasa_total_pob_05_09_acctran')
    tasa_total_pob_05_09_gral = models.SmallIntegerField(db_column='tasa_total_pob_05_09_gral')
    tasa_total_pob_05_09_homi = models.SmallIntegerField(db_column='tasa_total_pob_05_09_homi')
    tasa_total_pob_05_09_suic = models.SmallIntegerField(db_column='tasa_total_pob_05_09_suic')
    tasa_total_pob_05_09_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_05_09_tm_usosus')
    tasa_total_pob_05_09_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_05_09_uso_sust')
    tasa_total_pob_05_09_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_05_09_uso_sust_noleg')
    tasa_total_pob_05_09_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_05_09_uso_sust_oh')

    tasa_total_pob_10_14_acctran = models.SmallIntegerField(db_column='tasa_total_pob_10_14_acctran')
    tasa_total_pob_10_14_gral = models.SmallIntegerField(db_column='tasa_total_pob_10_14_gral')
    tasa_total_pob_10_14_homi = models.SmallIntegerField(db_column='tasa_total_pob_10_14_homi')
    tasa_total_pob_10_14_suic = models.SmallIntegerField(db_column='tasa_total_pob_10_14_suic')
    tasa_total_pob_10_14_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_10_14_tm_usosus')
    tasa_total_pob_10_14_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_10_14_uso_sust')
    tasa_total_pob_10_14_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_10_14_uso_sust_noleg')
    tasa_total_pob_10_14_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_10_14_uso_sust_oh')

    tasa_total_pob_15_19_acctran = models.SmallIntegerField(db_column='tasa_total_pob_15_19_acctran')
    tasa_total_pob_15_19_gral = models.SmallIntegerField(db_column='tasa_total_pob_15_19_gral')
    tasa_total_pob_15_19_homi = models.SmallIntegerField(db_column='tasa_total_pob_15_19_homi')
    tasa_total_pob_15_19_suic = models.SmallIntegerField(db_column='tasa_total_pob_15_19_suic')
    tasa_total_pob_15_19_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_15_19_tm_usosus')
    tasa_total_pob_15_19_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_15_19_uso_sust')
    tasa_total_pob_15_19_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_15_19_uso_sust_noleg')
    tasa_total_pob_15_19_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_15_19_uso_sust_oh')

    tasa_total_pob_20_24_acctran = models.SmallIntegerField(db_column='tasa_total_pob_20_24_acctran')
    tasa_total_pob_20_24_gral = models.SmallIntegerField(db_column='tasa_total_pob_20_24_gral')
    tasa_total_pob_20_24_homi = models.SmallIntegerField(db_column='tasa_total_pob_20_24_homi')
    tasa_total_pob_20_24_suic = models.SmallIntegerField(db_column='tasa_total_pob_20_24_suic')
    tasa_total_pob_20_24_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_20_24_tm_usosus')
    tasa_total_pob_20_24_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_20_24_uso_sust')
    tasa_total_pob_20_24_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_20_24_uso_sust_noleg')
    tasa_total_pob_20_24_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_20_24_uso_sust_oh')

    tasa_total_pob_25_29_acctran = models.SmallIntegerField(db_column='tasa_total_pob_25_29_acctran')
    tasa_total_pob_25_29_gral = models.SmallIntegerField(db_column='tasa_total_pob_25_29_gral')
    tasa_total_pob_25_29_homi = models.SmallIntegerField(db_column='tasa_total_pob_25_29_homi')
    tasa_total_pob_25_29_suic = models.SmallIntegerField(db_column='tasa_total_pob_25_29_suic')
    tasa_total_pob_25_29_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_25_29_tm_usosus')
    tasa_total_pob_25_29_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_25_29_uso_sust')
    tasa_total_pob_25_29_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_25_29_uso_sust_noleg')
    tasa_total_pob_25_29_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_25_29_uso_sust_oh')

    tasa_total_pob_30_34_acctran = models.SmallIntegerField(db_column='tasa_total_pob_30_34_acctran')
    tasa_total_pob_30_34_gral = models.SmallIntegerField(db_column='tasa_total_pob_30_34_gral')
    tasa_total_pob_30_34_homi = models.SmallIntegerField(db_column='tasa_total_pob_30_34_homi')
    tasa_total_pob_30_34_suic = models.SmallIntegerField(db_column='tasa_total_pob_30_34_suic')
    tasa_total_pob_30_34_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_30_34_tm_usosus')
    tasa_total_pob_30_34_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_30_34_uso_sust')
    tasa_total_pob_30_34_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_30_34_uso_sust_noleg')
    tasa_total_pob_30_34_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_30_34_uso_sust_oh')

    tasa_total_pob_35_39_acctran = models.SmallIntegerField(db_column='tasa_total_pob_35_39_acctran')
    tasa_total_pob_35_39_gral = models.SmallIntegerField(db_column='tasa_total_pob_35_39_gral')
    tasa_total_pob_35_39_homi = models.SmallIntegerField(db_column='tasa_total_pob_35_39_homi')
    tasa_total_pob_35_39_suic = models.SmallIntegerField(db_column='tasa_total_pob_35_39_suic')
    tasa_total_pob_35_39_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_35_39_tm_usosus')
    tasa_total_pob_35_39_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_35_39_uso_sust')
    tasa_total_pob_35_39_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_35_39_uso_sust_noleg')
    tasa_total_pob_35_39_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_35_39_uso_sust_oh')

    tasa_total_pob_40_44_acctran = models.SmallIntegerField(db_column='tasa_total_pob_40_44_acctran')
    tasa_total_pob_40_44_gral = models.SmallIntegerField(db_column='tasa_total_pob_40_44_gral')
    tasa_total_pob_40_44_homi = models.SmallIntegerField(db_column='tasa_total_pob_40_44_homi')
    tasa_total_pob_40_44_suic = models.SmallIntegerField(db_column='tasa_total_pob_40_44_suic')
    tasa_total_pob_40_44_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_40_44_tm_usosus')
    tasa_total_pob_40_44_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_40_44_uso_sust')
    tasa_total_pob_40_44_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_40_44_uso_sust_noleg')
    tasa_total_pob_40_44_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_40_44_uso_sust_oh')

    tasa_total_pob_45_49_acctran = models.SmallIntegerField(db_column='tasa_total_pob_45_49_acctran')
    tasa_total_pob_45_49_gral = models.SmallIntegerField(db_column='tasa_total_pob_45_49_gral')
    tasa_total_pob_45_49_homi = models.SmallIntegerField(db_column='tasa_total_pob_45_49_homi')
    tasa_total_pob_45_49_suic = models.SmallIntegerField(db_column='tasa_total_pob_45_49_suic')
    tasa_total_pob_45_49_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_45_49_tm_usosus')
    tasa_total_pob_45_49_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_45_49_uso_sust')
    tasa_total_pob_45_49_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_45_49_uso_sust_noleg')
    tasa_total_pob_45_49_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_45_49_uso_sust_oh')

    tasa_total_pob_50_54_acctran = models.SmallIntegerField(db_column='tasa_total_pob_50_54_acctran')
    tasa_total_pob_50_54_gral = models.SmallIntegerField(db_column='tasa_total_pob_50_54_gral')
    tasa_total_pob_50_54_homi = models.SmallIntegerField(db_column='tasa_total_pob_50_54_homi')
    tasa_total_pob_50_54_suic = models.SmallIntegerField(db_column='tasa_total_pob_50_54_suic')
    tasa_total_pob_50_54_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_50_54_tm_usosus')
    tasa_total_pob_50_54_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_50_54_uso_sust')
    tasa_total_pob_50_54_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_50_54_uso_sust_noleg')
    tasa_total_pob_50_54_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_50_54_uso_sust_oh')

    tasa_total_pob_55_59_acctran = models.SmallIntegerField(db_column='tasa_total_pob_55_59_acctran')
    tasa_total_pob_55_59_gral = models.SmallIntegerField(db_column='tasa_total_pob_55_59_gral')
    tasa_total_pob_55_59_homi = models.SmallIntegerField(db_column='tasa_total_pob_55_59_homi')
    tasa_total_pob_55_59_suic = models.SmallIntegerField(db_column='tasa_total_pob_55_59_suic')
    tasa_total_pob_55_59_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_55_59_tm_usosus')
    tasa_total_pob_55_59_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_55_59_uso_sust')
    tasa_total_pob_55_59_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_55_59_uso_sust_noleg')
    tasa_total_pob_55_59_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_55_59_uso_sust_oh')

    tasa_total_pob_60_64_acctran = models.SmallIntegerField(db_column='tasa_total_pob_60_64_acctran')
    tasa_total_pob_60_64_gral = models.SmallIntegerField(db_column='tasa_total_pob_60_64_gral')
    tasa_total_pob_60_64_homi = models.SmallIntegerField(db_column='tasa_total_pob_60_64_homi')
    tasa_total_pob_60_64_suic = models.SmallIntegerField(db_column='tasa_total_pob_60_64_suic')
    tasa_total_pob_60_64_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_60_64_tm_usosus')
    tasa_total_pob_60_64_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_60_64_uso_sust')
    tasa_total_pob_60_64_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_60_64_uso_sust_noleg')
    tasa_total_pob_60_64_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_60_64_uso_sust_oh')

    tasa_total_pob_65_mm_acctran = models.SmallIntegerField(db_column='tasa_total_pob_65_mm_acctran')
    tasa_total_pob_65_mm_gral = models.SmallIntegerField(db_column='tasa_total_pob_65_mm_gral')
    tasa_total_pob_65_mm_homi = models.SmallIntegerField(db_column='tasa_total_pob_65_mm_homi')
    tasa_total_pob_65_mm_suic = models.SmallIntegerField(db_column='tasa_total_pob_65_mm_suic')
    tasa_total_pob_65_mm_tm_usosus = models.SmallIntegerField(db_column='tasa_total_pob_65_mm_tm_usosus')
    tasa_total_pob_65_mm_uso_sust = models.SmallIntegerField(db_column='tasa_total_pob_65_mm_uso_sust')
    tasa_total_pob_65_mm_uso_sust_noleg = models.SmallIntegerField(db_column='tasa_total_pob_65_mm_uso_sust_noleg')
    tasa_total_pob_65_mm_uso_sust_oh = models.SmallIntegerField(db_column='tasa_total_pob_65_mm_uso_sust_oh')


    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'CUBO_IND_MUN_QUINQ'
        verbose_name_plural = 'cubo_indicadores_municipal_quinqueneo'
    

class CatEdad(models.Model):
    #Llave primaria de la tabla que esta mapeada en Mongo DB
    idcatedad = models.BigAutoField(primary_key=True, db_column='ID_CAT_EDAD')
    descripcion = models.CharField(max_length=64, db_column='DESCRIPCIÓN')

    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'CAT_EDAD'
        verbose_name_plural = 'grupos_edad'
    
    #Método para que en el combo que se cargue en la vista aparezca este nombre en el catálogo
    def __str__(self):
        return self.descripcion


class CatMunicipioKML(models.Model):
    cve_ent = models.SmallIntegerField(db_column='cve_ent')
    nom_ent = models.CharField(max_length=128, db_column='nom_ent')
    nom_abr = models.CharField(max_length=16, db_column='nom_abr')
    cve_mun = models.SmallIntegerField(db_column='cve_mun')
    nom_mun = models.CharField(max_length=128, db_column='nom_mun')
    cve_ent_mun = models.SmallIntegerField(db_column='cve_ent_mun')
    kml = models.CharField(max_length=1692, db_column='kml')

    #En esta clase se definen la tabla a la que apunta el model y el nombre plural en el admin
    class Meta:
        db_table = 'CAT_MUNICIPIO_KML'