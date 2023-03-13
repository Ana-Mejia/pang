from django.db.models import Q
from django.db.models.aggregates import Count, Sum

from explotacion_datos.models import *


# TEXT VIEWS
'''
@param indicador: string    (from front)
@return string              (field total_* in CuboIndNac, model: explotacion_datos.models.CuboIndNac)
'''
def getTagIndicador(indicador):
    field = {
        "suicidios": "Suicidios",
        "accidentes": "Accidentes de tránsito",
        "homicidios": "Homicidios",
        "trastornos": "Trastornos mentales y uso de sustancias",
    }
    return field[indicador]

'''
@param indicador: string    (from front)
@return string              Texto para el Título de registros en las Gráficas de distribución
'''
def getTextDistribucionRegistros(indicador, anio_init, anio_final):
    field = {
        "suicidios": "Registros de mortalidad por Suicidio, por entidad federativa y sexo en México, "+anio_init+" a "+anio_final,
        "accidentes": "Registros de mortalidad por Accidentes de tránsito, por entidad federativa y sexo en México, "+anio_init+" a "+anio_final,
        "homicidios": "Registros de mortalidad por Homicidios, por entidad federativa y sexo en México, "+anio_init+" a "+anio_final,
        "trastornos": "Registros de mortalidad por Trastornos mentales y uso de sustancias, por entidad federativa y sexo en México, "+anio_init+" a "+anio_final,
    }
    return field[indicador]

'''
@param indicador: string    (from front)
@return string              Texto para el Título de tasas en las Gráficas de distribución
'''
def getTextDistribucionTasas(indicador, anio_init, anio_final):
    field = {
        "suicidios": "Tasas de mortalidad por Suicidio, por entidad federativa y sexo en México, "+anio_init+" a "+anio_final,
        "accidentes": "Tasas de mortalidad por Accidentes de tránsito, por entidad federativa y sexo en México, "+anio_init+" a "+anio_final,
        "homicidios": "Tasas de mortalidad por Homicidios, por entidad federativa y sexo en México, "+anio_init+" a "+anio_final,
        "trastornos": "Tasas de mortalidad por Trastornos mentales y uso de sustancias, por entidad federativa y sexo en México, "+anio_init+" a "+anio_final,
    }
    return field[indicador]


# CATALOGOS
'''
@return QuerySet
'''
def getCatSexo():
    return CatSexo.objects.filter(~Q(idcatsexo=-1)).values('idcatsexo','descripcion').order_by('-descripcion')

'''
@var description: string
@return int
'''
def getIdCatSexo(description):
    try:
        obj = CatSexo.objects.filter(descripcion=description).values('idcatsexo').first()
        return obj['idcatsexo']
    except Exception as exc:
        return 0

'''
@return QuerySet
'''
def getCatEntidades():
    return CatEntidades.objects.filter().values('cve_ent','entidad','noment').order_by('cve_ent')

'''
@return QuerySet
'''
def getCatEntidades_IsoEntidadAbreviatura(cve_ent):
    return CatEntidades.objects.filter(cve_ent=cve_ent).values('iso3166','entidad','abreviatura').first()

'''
@return QuerySet
'''
def getCatRegion():
    return CatRegionalizacion.objects.all().values('regionalizacion').order_by('regionalizacion').distinct()




# CUBO NACIONAL
'''
@param indicador: string    (from front)
@return string              (campo total_* en CuboIndNac, model: explotacion_datos.models.CuboIndNac)
'''
def getCampoTotalIndicador(indicador):
    field = {
        "suicidios": "total_suic",
        "accidentes": "total_acctran",
        "homicidios": "total_homi",
        "trastornos": "total_tm_usosus",
    }
    return field[indicador]

'''
@return <QuerySet: ['anio' : int]>
@description:   Obtiene una lista con los años del Cubo de Indicadores Nacional en orden ascendente.
                En: Filtro del mapa
'''
def getCuboNacYears():
    return CuboIndNac.objects.filter().values('anio').order_by('anio').distinct()

'''
@return <QuerySet: ['edad': int]
@description:   Obtiene una lista con las edades del Cubo de Indicadores Nacional en orden ascendente.
                En: Filtro del mapa
'''
def getCuboNacAges():
    return CuboIndNac.objects.filter().values('edad').order_by('edad').distinct()

'''
@param sexo: int CatSexo.idcatsexo
@return <QuerySet: ['cve_ent' : float, 'total' : int]>
'''
def getCuboNac_Entidad_SumIndicador_porSexo(sexo, indicador):
    #return CuboIndNac.objects.filter(sexo=sexo).values('cve_ent').annotate(total=Sum('total_suic'))
    return CuboIndNac.objects.filter(sexo=sexo).values('cve_ent').annotate(total=Sum(getCampoTotalIndicador(indicador)))

'''
@param anio: int 
@param sexo: int CatSexo.idcatsexo
@param indicador: string
@return <QuerySet: [cve_ent : float, total : int]>
@description: Obtiene la suma de los totales para el indicador recibido, dado el anio y sexo del Cubo de Indicadores Nacional
'''
def getCuboNac_Entidad_Total_porAnioSexo(anio, sexo, indicador):
    return CuboIndNac.objects.filter(anio=anio, sexo=sexo).values('cve_ent').annotate(total=Sum(getCampoTotalIndicador(indicador))).order_by('-total')

'''
@param anio: int 
@param sexo: int CatSexo.idcatsexo
@param ent: int CatEntidades.cve_ent
@param indicador: string
@return <QuerySet: [cve_ent : float, total : int]>
@description: Obtiene la suma de los totales para el indicador recibido dado el anio, sexo y entidad del Cubo de Indicadores Nacional
'''
def getCuboNac_Entidad_Total_porAnioSexoEntidad(anio, sexo, ent, indicador):
    return CuboIndNac.objects.filter(anio=anio, sexo=sexo,cve_ent=ent).values('cve_ent').annotate(total=Sum(getCampoTotalIndicador(indicador)))

'''
@param anio: int 
@param sexo: int CatSexo.idcatsexo
@param indicador: string
@return <QuerySet: ['cve_ent' : float, 'total' : int, 'pob' : int]>
@description: Obtiene la suma de los totales para el indicador recibido y su población por entidad del Cubo de Indicadores Nacional
'''
def getCuboNac_Entidad_TotalPoblacion_porAnioSexo(anio, sexo, indicador):
    return CuboIndNac.objects.filter(anio=anio, sexo=sexo).values('cve_ent').annotate(total=Sum(getCampoTotalIndicador(indicador)),pob=Sum('poblacion')).order_by('-pob')

'''
@param anio: int 
@param sexo: int CatSexo.idcatsexo
@param ent: int CatEntidades.cve_ent
@param indicador: string
@return <QuerySet: ['cve_ent' : float, 'total' : int, 'pob' : int]>
@description: Obtiene la suma de los totales para el indicador recibido y su población por entidad y sexo del Cubo de Indicadores Nacional
'''
def getCuboNac_Entidad_TotalPoblacion_porAnioSexoEntidad(anio, sexo, ent, indicador):
    return CuboIndNac.objects.filter(anio=anio, sexo=sexo, cve_ent=ent).values('cve_ent').annotate(total=Sum(getCampoTotalIndicador(indicador)),pob=Sum('poblacion'))

'''
@param sexo: int CatSexo.idcatsexo
@param index_min: int Edad mínima del rango a buscar
@param index_max: int Edad máxima del rango a buscar
@param indicador: string
@return <QuerySet: ['anio' : int, 'total' : int, 'pob' : int]>
@description: Obtiene la suma de los totales para el indicador recibido y su población por sexo y por grupo de edad del Cubo de Indicadores Nacional
'''
def getCuboNac_Anio_TotalPoblacion_porSexoEdades(sexo, index_min, index_max, indicador):
    return CuboIndNac.objects.filter(sexo=sexo, edad__gte=index_min, edad__lte=index_max).values('anio').annotate(total=Sum(getCampoTotalIndicador(indicador)),pob=Sum('poblacion'))

'''
@param sexo: int CatSexo.idcatsexo
@param indicador: string
@return <QuerySet: ['anio' : int, 'cve_ent' : int, 'total' : int]>
@description: Obtiene la suma de los totales para el indicador recibido, por sexo del Cubo de Indicadores Nacional
'''
def getCuboNac_AnioEntidad_Total_porSexo(sexo, indicador):
    return CuboIndNac.objects.filter(sexo=sexo).values('anio','cve_ent').annotate(total=Sum(getCampoTotalIndicador(indicador))).order_by('anio')



# CUBO MUNICIPAL QUINQUENIOS
'''
@return <QuerySet: [anio : int]>
'''
def getCuboMunQuinq():
    return CuboIndMunQuinq.objects.filter().values('anio').order_by('anio').distinct()

