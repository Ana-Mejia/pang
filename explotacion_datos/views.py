import json
import os
import random
from multiprocessing import context
from urllib import request
from contextlib import ContextDecorator
from datetime import datetime

from django.conf import settings
from django.shortcuts import redirect, render
from django.db.models import Q
from django.db.models.aggregates import Count, Sum
from django.contrib import messages
from django.core.serializers.json import DjangoJSONEncoder

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from explotacion_datos.models import *
from explotacion_datos.querys import *

def mortalidad(request, indicador):
    ID_SEXO_HOMBRE = 1                      # ID_CAT_SEXO: 1, DESCRIPCION: HOMBRE
    ID_SEXO_MUJER = 2                       # ID_CAT_SEXO: 2, DESCRIPCION: MUJER
    ID_SEXO_TOTAL = 3                       # ID_CAT_SEXO: 3, DESCRIPCION: TOTAL
    SEXO_DESCRIPCION_TOTAL = "Total"        # ID_CAT_SEXO: 3, DESCRIPCION: TOTAL
    contexto = dict()
    data_distribucion = dict()

    anio_cubo_nac = getCuboNacYears()
    anio_init = anio_cubo_nac.first()['anio']
    anio_final = anio_cubo_nac.last()['anio']


    # MAPA NACIONAL --------------------------------------------------------------------
    # Edades
    edad_cubo_nac = getCuboNacAges()
    edad_min = edad_cubo_nac.first()['edad']
    edad_max = edad_cubo_nac.last()['edad']

    sexo_default = getIdCatSexo(SEXO_DESCRIPCION_TOTAL)
    mapa = []
    max = 0
    mapa.append(['Entidad', 'Registros'])
    obj_cubo_nac = getCuboNac_Entidad_SumIndicador_porSexo(sexo_default,indicador)
    for cn in obj_cubo_nac:
        cve_ent = cn['cve_ent']
        obj_entidad = getCatEntidades_IsoEntidadAbreviatura(cve_ent)
        m_elem = []
        m = {}
        m['v'] = obj_entidad['iso3166']
        m['f'] = obj_entidad['entidad']
        m_elem.append(m)        
        m_elem.append(cn['total'])
        if cn['total'] > max:
            max = cn['total']
        mapa.append(m_elem)

    # MAPA MUNICIPAL --------------------------------------------------------------------
    # Años
    anio_cubo_mun = getCuboMunQuinq()
    # Edades
    edad_min_mun = 0
    edad_max_mun = 65


    # GRAFICAS DE DISTRIBUCION   -------------------------------------------------------
    # - Parametros: Años TimeLine
    anios_array = []
    for a in anio_cubo_nac:
        anios_array.append(str(a['anio']))
    
    distribucion_parametros = {
        "value_init": str(anio_init),
        "anyos_line": anios_array,
        "value_final": str(anio_final),
        "titulo_registros": "Registros de mortalidad por "+getTagIndicador(indicador)+", por entidad federativa y sexo en México, "+str(anio_init)+" a "+str(anio_final),
        "titulo_tasas": "Tasas de mortalidad por "+getTagIndicador(indicador)+", por entidad federativa y sexo en México, "+str(anio_init)+" a "+str(anio_final)
    }
    

    # REGISTROS: Consulta por año y orden respecto a Hombres
    # - Obtener orden del primer año
    count = 0
    orden_estados_registros = []
    orden_entidades_cve_ent = []
    obj_cubo_nac = getCuboNac_Entidad_Total_porAnioSexo(anio_init, 1, indicador)
    for e in obj_cubo_nac:
        obj_entidad = getCatEntidades_IsoEntidadAbreviatura(e['cve_ent'])
        # Guardar orden de entidades
        orden_entidades_cve_ent.append(e['cve_ent'])
        if count % 2 == 0:
            orden_estados_registros.append(obj_entidad['abreviatura'])
        else:
            orden_estados_registros.append("\\n"+obj_entidad['abreviatura'])
        count = count + 1


    # - Obtener data
    options = []
    totalH = 0
    totalM = 0
    for a in anios_array:
        totalH = 0
        totalM = 0
        
        s = {}
        s2 = {}
        s2['text'] = getTagIndicador(indicador) + " año " + str(a)
        s['title'] = s2
        s3 = []

        s4 = {}
        data = []
        for ent in orden_entidades_cve_ent:
            obj_cubo_nac = getCuboNac_Entidad_Total_porAnioSexoEntidad(a, ID_SEXO_HOMBRE, ent, indicador)
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = getCatEntidades_IsoEntidadAbreviatura(ent)
                l['name'] = obj_entidad['entidad']
                l['value'] = e['total']
                totalH = totalH + e['total']
                data.append(l)                
        s4['data'] = data
        s3.append(s4)
        
        s4 = {}
        data = []
        for ae in orden_entidades_cve_ent:
            obj_cubo_nac = getCuboNac_Entidad_Total_porAnioSexoEntidad(a, ID_SEXO_MUJER, ae, indicador) 
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = getCatEntidades_IsoEntidadAbreviatura(ae)
                l['name'] = obj_entidad['entidad']
                l['value'] = e['total']
                totalM = totalM + e['total']
                data.append(l)
        s4['data'] = data
        #print("dataM",data)
        s3.append(s4)
        
        s4 = {}
        data = []
        l = {}
        l['name'] = "Hombres"
        l['value'] = totalH
        data.append(l)
        l = {}
        l['name'] = "Mujeres"
        l['value'] = totalM
        data.append(l)
        
        s4['data'] = data
        s3.append(s4)

        s['series'] = s3
        options.append(s)
    print("options")
    print(options)

    # TASA: : Consulta por año y orden respecto a Hombres
    # - Obtener orden del primer año
    count = 0
    orden_estados_tasas = []
    orden_entidades_cve_ent = []

    data = []
    obj_cubo_nac = getCuboNac_Entidad_TotalPoblacion_porAnioSexo(anio_init, ID_SEXO_HOMBRE, indicador)
    for e in obj_cubo_nac:
        l = {}
        obj_entidad = getCatEntidades_IsoEntidadAbreviatura(e['cve_ent'])
        l['cve_ent'] = e['cve_ent']
        l['value'] = round((e['total']/e['pob'])*100000,1)
        l['abreviatura'] = obj_entidad['abreviatura']
        data.append(l)

    ordenados = sorted(data, key=lambda x : x['value'],reverse=True)

    count = 0
    for ord in ordenados:
        orden_entidades_cve_ent.append(ord['cve_ent'])
        # Guardar orden de entidades
        if count % 2 == 0:
            orden_estados_tasas.append(ord['abreviatura'])
        else:
            orden_estados_tasas.append("\\n"+ord['abreviatura'])
        count = count + 1
    
    optionsT = []
    
    totalH = 0
    totalM = 0
    for b in anios_array:
        totalH = 0
        totalM = 0
        
        s = {}
        s2 = {}
        s2['text'] = getTagIndicador(indicador) + " año " + str(b)
        s['title'] = s2

        s3 = []
        s4 = {}
        data = []
        for ent in orden_entidades_cve_ent:
            obj_cubo_nac = getCuboNac_Entidad_TotalPoblacion_porAnioSexoEntidad(b, ID_SEXO_HOMBRE, ent, indicador)
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = getCatEntidades_IsoEntidadAbreviatura(e['cve_ent'])
                l['name'] = obj_entidad['entidad']
                l['value'] = round((e['total']/e['pob'])*100000,1)
                totalH = totalH + e['total']
                data.append(l)
        s4['data'] = data
        s3.append(s4)
        
        s4 = {}
        data = []
        for ae in orden_entidades_cve_ent:
            obj_cubo_nac = getCuboNac_Entidad_TotalPoblacion_porAnioSexoEntidad(b, ID_SEXO_MUJER, ae, indicador)
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = getCatEntidades_IsoEntidadAbreviatura(e['cve_ent'])
                l['name'] = obj_entidad['entidad']
                l['value'] = round((e['total']/e['pob'])*100000,1)
                totalM = totalM + e['total']
                data.append(l)
        s4['data'] = data
        s3.append(s4)

        s4 = {}
        data = []
        l = {}
        l['name'] = "Hombres"
        l['value'] = totalH
        data.append(l)
        l = {}
        l['name'] = "Mujeres"
        l['value'] = totalM
        data.append(l)

        s4['data'] = data
        s3.append(s4)

        s['series'] = s3
        optionsT.append(s)
    

    # GRAFICA BARRAS - TASA POR EDADES NACIONAL --------------------------------------------------
    # - Todas las entidades, todos los años         { 1: Hombres, 2: Mujeres }
    #   - Hombres
    g_barras_tasa_edad_hombres = []
    i_min = 0
    flag_gb_cn = True
    while flag_gb_cn:
        i_max = i_min+9
        if i_max == 89:
            i_max = edad_max
        
        t_pob = 0
        t_total = 0
        obj_cubo_nac = getCuboNac_Anio_TotalPoblacion_porSexoEdades(ID_SEXO_HOMBRE, i_min, i_max, indicador)
        for ocn in obj_cubo_nac:
            t_pob = t_pob + ocn['pob']
            t_total = t_total + ocn['total']

        if t_pob == 0:
            tasa = 0
        else:
            tasa = round((t_total/t_pob)*100000,1)
        g_barras_tasa_edad_hombres.append(t_total) #tasa

        i_min = i_min + 10
        if i_min == 90:
            flag_gb_cn = False

    #   - Mujeres
    g_barras_tasa_edad_mujeres = []
    i_min = 0
    flag_gb_cn = True
    while flag_gb_cn:
        i_max = i_min+9
        if i_max == 89:
            i_max = edad_max
        
        t_pob = 0
        t_total = 0
        obj_cubo_nac = getCuboNac_Anio_TotalPoblacion_porSexoEdades(ID_SEXO_MUJER, i_min, i_max, indicador)
        for ocn in obj_cubo_nac:
            t_pob = t_pob + ocn['pob']
            t_total = t_total + ocn['total']

        if t_pob == 0:
            tasa = 0
        else:
            tasa = round((t_total/t_pob)*100000,1)
        g_barras_tasa_edad_mujeres.append(t_total) #tasa

        i_min = i_min + 10
        if i_min == 90:
            flag_gb_cn = False
    print("Mortalidad")


    # GRAFICA PIE - TASA POR TIPO NACIONAL --------------------------------------------------
    # - Todas las entidades, todos los años, hombres y mujeres         { 1: Hombres, 2: Mujeres }
    g_pie_tasa_tipo = []
    if (indicador == "suicidios"):
        t_suic1 = 0
        t_suic2 = 0
        t_suic3 = 0
        t_suic4 = 0
        t_suic5 = 0
        obj_cubo_nac = CuboIndNac.objects.filter(sexo=3).values('anio').annotate(m1=Sum('total_suic_medio1'),m2=Sum('total_suic_medio2'),m3=Sum('total_suic_medio3'),m4=Sum('total_suic_medio4'),m5=Sum('total_suic_medio5'))
        for ocn in obj_cubo_nac:
            t_suic1 = t_suic1 + ocn['m1']
            t_suic2 = t_suic2 + ocn['m2']
            t_suic3 = t_suic3 + ocn['m3']
            t_suic4 = t_suic4 + ocn['m4']
            t_suic5 = t_suic5 + ocn['m5']
        
        m1 = {}
        m1['value'] = t_suic1
        m1['name'] = "Envenenamiento"
        g_pie_tasa_tipo.append(m1)
        
        m2 = {}
        m2['value'] = t_suic2
        m2['name'] = "Ahorcamiento"
        g_pie_tasa_tipo.append(m2)
        
        m3 = {}
        m3['value'] = t_suic3
        m3['name'] = "Ahogamiento"
        g_pie_tasa_tipo.append(m3)

        m4 = {}
        m4['value'] = t_suic4
        m4['name'] = "Arma de fuego"
        g_pie_tasa_tipo.append(m4)
        
        m5 = {}
        m5['value'] = t_suic5
        m5['name'] = "Otro medio"
        g_pie_tasa_tipo.append(m5)

    if (indicador == "trastornos"):
        t1 = 0
        t2 = 0
        t3 = 0
        obj_cubo_nac = CuboIndNac.objects.filter(sexo=ID_SEXO_TOTAL).values('anio').annotate(alcohol=Sum('total_uso_sust'),drogas=Sum('total_uso_sust_noleg'),oh=Sum('total_uso_sus_oh'))
        for ocn in obj_cubo_nac:
            t1 = t1 + ocn['alcohol']
            t2 = t2 + ocn['drogas']
            t3 = t3 + ocn['oh']
        
        m1 = {}
        m1['value'] = t1
        m1['name'] = "Alcohol"
        g_pie_tasa_tipo.append(m1)
        
        m2 = {}
        m2['value'] = t2
        m2['name'] = "Drogas"
        g_pie_tasa_tipo.append(m2)
        
        m3 = {}
        m3['value'] = t3
        m3['name'] = "Oh"
        g_pie_tasa_tipo.append(m3)


    # DISTRIBUCIÓN GEOGRÁFICA DE DATOS (Tabla final)
    obj_cubo_nac = getCuboNac_AnioEntidad_Total_porSexo(ID_SEXO_TOTAL, indicador)


    contexto = {
        "indicador": indicador,
        "sexo": getCatSexo(),
        "entidades": list(getCatEntidades()),
        # MAPA NACIONAL
        "anio_cubo_nac": anio_cubo_nac,
        "anios_array": anios_array,
        "edad_cubo_nac": edad_cubo_nac,
        "edad_min": edad_min,
        "edad_max": edad_max,
        "mapa": mapa,
        "mapa_max": max,
        # MAPA MUNICIPAL
        "regiones": getCatRegion(),
        "anio_cubo_mun": anio_cubo_mun,
        "edad_min_mun": edad_min_mun,
        "edad_max_mun": edad_max_mun,
        # DISTRIBUCION POR ENTIDAD
        "distribucion_parametros": distribucion_parametros,
        "distribucion_orden_estados_registros": orden_estados_registros,
        "distribucion_data_registros": options,
        "distribucion_orden_estados_tasas": orden_estados_tasas,
        "distribucion_data_tasas": optionsT,
        # GRAFICA DE BARRAS
        "g_barras_tasa_edad_hombres": g_barras_tasa_edad_hombres,
        "g_barras_tasa_edad_mujeres": g_barras_tasa_edad_mujeres,
        # GRAFICA DE PASTEL
        "g_pie_tasa_tipo": g_pie_tasa_tipo,
        # DISTRIBUCIÓN GEOGRÁFICA DE DATOS
        "tb_distribucion": list(obj_cubo_nac),
    }
    #print(contexto)
    return render(request, 'explotacion_datos/td_suicidios.html', contexto)


def td_accidentes(request):
    contexto = dict()
    anio_default = 0
    edad_default = 0
    sexo_default = 0
    # Regiones
    #regiones = []
    obj_reg = CatRegionalizacion.objects.all().values('regionalizacion').order_by('regionalizacion').distinct()
    #Sexo
    #sexo = []
    obj_sexo = CatSexo.objects.filter(~Q(idcatsexo=-1)).values('idcatsexo','descripcion').order_by('-descripcion')

    # CUBO NACIONAL
    anio_cubo_nac = CuboIndNac.objects.filter().values('anio').order_by('anio').distinct()
    edad_cubo_nac = CuboIndNac.objects.filter().values('edad').order_by('edad').distinct()

    # Defaults
    i = 0
    for an in anio_cubo_nac:
        if i == 0:
            anio_default = an['anio']
        i = i + 1
    i = 0
    for en in edad_cubo_nac:
        if i == 0:
            edad_default = en['edad']
        i = i + 1
    i = 0
    for s in obj_sexo:
        if i == 0:
            sexo_default = s['idcatsexo']
        i = i + 1

    # Mapa
    mapa = []
    mapa.append(['Entidad', 'Registros'])
    obj_cubo_nac = CuboIndNac.objects.filter(anio=anio_default, edad=edad_default, sexo=sexo_default).values('cve_ent','total_acctran')
    for cn in obj_cubo_nac:
        cve_ent = cn['cve_ent']
        obj_entidad = CatEntidades.objects.filter(cve_ent=cve_ent).values('iso3166','entidad').first()
        m_elem = []
        m = {}
        m['v'] = obj_entidad['iso3166']
        m['f'] = obj_entidad['entidad']
        m_elem.append(m)        
        m_elem.append(cn['total_acctran'])
        mapa.append(m_elem)
    contexto = {
        "sexo": obj_sexo,
        "regiones": obj_reg,
        "anio_cubo_nac": anio_cubo_nac,
        "edad_cubo_nac": edad_cubo_nac,
        "mapa": mapa
    }
    return render(request, 'explotacion_datos/td_accidentes.html', contexto)

def td_suicidios(request):
    contexto = dict()
    anio_cubo_nac = getCuboNacYears()
    anio_init = anio_cubo_nac.first()['anio']
    anio_final = anio_cubo_nac.last()['anio']


    # MAPA NACIONAL --------------------------------------------------------------------
    # Edades
    edad_cubo_nac = CuboIndNac.objects.filter().values('edad').order_by('edad').distinct()
    edad_min = edad_cubo_nac.first()['edad']
    edad_max = edad_cubo_nac.last()['edad']

    sexo_default = 3 # SEXO.DESCRIPCION: "Total"
    mapa = []
    max = 0
    mapa.append(['Entidad', 'Registros'])
    obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo_default).values('cve_ent').annotate(suic=Sum('total_suic'))
    for cn in obj_cubo_nac:
        cve_ent = cn['cve_ent']
        obj_entidad = CatEntidades.objects.filter(cve_ent=cve_ent).values('iso3166','entidad','abreviatura').first()
        m_elem = []
        m = {}
        m['v'] = obj_entidad['iso3166']
        m['f'] = obj_entidad['entidad']
        m_elem.append(m)        
        m_elem.append(cn['suic'])
        if cn['suic'] > max:
            max = cn['suic']
        mapa.append(m_elem)


    # MAPA MUNICIPAL --------------------------------------------------------------------
    # Regiones
    obj_reg = CatRegionalizacion.objects.all().values('regionalizacion').order_by('regionalizacion').distinct()

    # Años
    anio_cubo_mun = CuboIndMunQuinq.objects.filter().values('anio').order_by('anio').distinct()
    # Edades
    edad_min_mun = 0
    edad_max_mun = 65


    # GRAFICAS DE DISTRIBUCION   -------------------------------------------------------
    # - Parametros: Años TimeLine
    anios_array = []
    for a in anio_cubo_nac: # anio_cubo_nac = CuboIndNac.objects.filter().values('anio').order_by('anio').distinct()
        anios_array.append(str(a['anio']))
    
    distribucion_parametros = {
        "value_init": str(anio_init),
        "anyos_line": anios_array,
        "value_final": str(anio_final),
        "titulo_registros": "Registros de mortalidad por suicidio, por entidad federativa y sexo en México, "+str(anio_init)+" a "+str(anio_final),
        "titulo_tasas": "Tasas de mortalidad por suicidio, por entidad federativa y sexo en México, "+str(anio_init)+" a "+str(anio_final)
    }
    

    # REGISTROS: Consulta por año y orden respecto a Hombres
    # - Obtener orden del primer año
    count = 0
    orden_estados_registros = []
    orden_entidades_cve_ent = []
    obj_cubo_nac = CuboIndNac.objects.filter(anio=anio_init, sexo=1).values('cve_ent').annotate(suic=Sum('total_suic')).order_by('-suic')
    for e in obj_cubo_nac:
        obj_entidad = CatEntidades.objects.filter(cve_ent=e['cve_ent']).values('entidad','abreviatura').first()
        # Guardar orden de entidades
        orden_entidades_cve_ent.append(e['cve_ent'])
        if count % 2 == 0:
            orden_estados_registros.append(obj_entidad['abreviatura'])
        else:
            orden_estados_registros.append("\\n"+obj_entidad['abreviatura'])
        count = count + 1

    # - Obtener data
    options = []
    totalH = 0
    totalM = 0
    for a in anios_array:
        totalH = 0
        totalM = 0
        
        s = {}
        s2 = {}
        s2['text'] = "Suicidio año " + str(a)
        s['title'] = s2
        s3 = []

        s4 = {}
        data = []
        for ent in orden_entidades_cve_ent:
            obj_cubo_nac = CuboIndNac.objects.filter(anio=a, sexo=1,cve_ent=ent).values('cve_ent').annotate(suic=Sum('total_suic'))
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = CatEntidades.objects.filter(cve_ent=ent).values('entidad').first()
                l['name'] = obj_entidad['entidad']
                l['value'] = e['suic']
                totalH = totalH + e['suic']
                data.append(l)                
        s4['data'] = data
        s3.append(s4)
        
        s4 = {}
        data = []
        for ae in orden_entidades_cve_ent:
            obj_cubo_nac = CuboIndNac.objects.filter(anio=a, sexo=2, cve_ent=ae).values('cve_ent').annotate(suic=Sum('total_suic'))
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = CatEntidades.objects.filter(cve_ent=ae).values('entidad').first()
                l['name'] = obj_entidad['entidad']
                l['value'] = e['suic']
                totalM = totalM + e['suic']
                data.append(l)
        s4['data'] = data
        #print("dataM",data)
        s3.append(s4)
        
        s4 = {}
        data = []
        l = {}
        l['name'] = "Hombres"
        l['value'] = totalH
        data.append(l)
        l = {}
        l['name'] = "Mujeres"
        l['value'] = totalM
        data.append(l)
        
        s4['data'] = data
        s3.append(s4)

        s['series'] = s3
        options.append(s)


    # TASA: : Consulta por año y orden respecto a Hombres
    # - Obtener orden del primer año
    count = 0
    orden_estados_tasas = []
    orden_entidades_cve_ent = []

    data = []
    obj_cubo_nac = CuboIndNac.objects.filter(anio=anio_init, sexo=1).values('cve_ent').annotate(suic=Sum('total_suic'),pob=Sum('poblacion')).order_by('-pob')
    for e in obj_cubo_nac:
        l = {}
        obj_entidad = CatEntidades.objects.filter(cve_ent=e['cve_ent']).values('entidad','abreviatura').first()
        l['cve_ent'] = e['cve_ent']
        l['value'] = round((e['suic']/e['pob'])*100000,1)
        l['abreviatura'] = obj_entidad['abreviatura']
        data.append(l)

    ordenados = sorted(data, key=lambda x : x['value'],reverse=True)

    count = 0
    for ord in ordenados:
        orden_entidades_cve_ent.append(ord['cve_ent'])
        # Guardar orden de entidades
        if count % 2 == 0:
            orden_estados_tasas.append(ord['abreviatura'])
        else:
            orden_estados_tasas.append("\\n"+ord['abreviatura'])
        count = count + 1
    
    optionsT = []
    
    totalH = 0
    totalM = 0
    for b in anios_array:
        totalH = 0
        totalM = 0
        
        s = {}
        s2 = {}
        s2['text'] = "Suicidio año " + str(b)
        s['title'] = s2

        s3 = []
        s4 = {}
        data = []
        for ent in orden_entidades_cve_ent:
            obj_cubo_nac = CuboIndNac.objects.filter(anio=b, sexo=1,cve_ent=ent).values('cve_ent').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = CatEntidades.objects.filter(cve_ent=e['cve_ent']).values('entidad','abreviatura').first()
                l['name'] = obj_entidad['entidad']
                l['value'] = round((e['suic']/e['pob'])*100000,1)
                totalH = totalH + e['suic']
                data.append(l)
        s4['data'] = data
        s3.append(s4)
        
        s4 = {}
        data = []
        for ae in orden_entidades_cve_ent:
            obj_cubo_nac = CuboIndNac.objects.filter(anio=b, sexo=2, cve_ent=ae).values('cve_ent').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = CatEntidades.objects.filter(cve_ent=e['cve_ent']).values('entidad').first()
                l['name'] = obj_entidad['entidad']
                l['value'] = round((e['suic']/e['pob'])*100000,1)
                totalM = totalM + e['suic']
                data.append(l)
        s4['data'] = data
        s3.append(s4)

        s4 = {}
        data = []
        l = {}
        l['name'] = "Hombres"
        l['value'] = totalH
        data.append(l)
        l = {}
        l['name'] = "Mujeres"
        l['value'] = totalM
        data.append(l)

        s4['data'] = data
        s3.append(s4)

        s['series'] = s3
        optionsT.append(s)
    

    # GRAFICA BARRAS - TASA POR EDADES NACIONAL --------------------------------------------------
    # - Todas las entidades, todos los años         { 1: Hombres, 2: Mujeres }
    #   - Hombres
    g_barras_tasa_edad_hombres = []
    i_min = 0
    flag_gb_cn = True
    while flag_gb_cn:
        i_max = i_min+9
        if i_max == 89:
            i_max = edad_max
        
        t_pob = 0
        t_suic = 0
        obj_cubo_nac = CuboIndNac.objects.filter(sexo=1, edad__gte=i_min, edad__lte=i_max).values('anio').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
        for ocn in obj_cubo_nac:
            t_pob = t_pob + ocn['pob']
            t_suic = t_suic + ocn['suic']

        if t_pob == 0:
            tasa = 0
        else:
            tasa = round((t_suic/t_pob)*100000,1)
        g_barras_tasa_edad_hombres.append(t_suic) #tasa

        i_min = i_min + 10
        if i_min == 90:
            flag_gb_cn = False

    #   - Mujeres
    g_barras_tasa_edad_mujeres = []
    i_min = 0
    flag_gb_cn = True
    while flag_gb_cn:
        i_max = i_min+9
        if i_max == 89:
            i_max = edad_max
        
        t_pob = 0
        t_suic = 0
        obj_cubo_nac = CuboIndNac.objects.filter(sexo=2, edad__gte=i_min, edad__lte=i_max).values('anio').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
        for ocn in obj_cubo_nac:
            t_pob = t_pob + ocn['pob']
            t_suic = t_suic + ocn['suic']

        if t_pob == 0:
            tasa = 0
        else:
            tasa = round((t_suic/t_pob)*100000,1)
        g_barras_tasa_edad_mujeres.append(t_suic) #tasa

        i_min = i_min + 10
        if i_min == 90:
            flag_gb_cn = False


    # GRAFICA PIE - TASA POR TIPO NACIONAL --------------------------------------------------
    # - Todas las entidades, todos los años, hombres y mujeres         { 1: Hombres, 2: Mujeres }
    g_pie_tasa_tipo = []
    t_suic1 = 0
    t_suic2 = 0
    t_suic3 = 0
    t_suic4 = 0
    t_suic5 = 0
    obj_cubo_nac = CuboIndNac.objects.filter(sexo=3).values('anio').annotate(m1=Sum('total_suic_medio1'),m2=Sum('total_suic_medio2'),m3=Sum('total_suic_medio3'),m4=Sum('total_suic_medio4'),m5=Sum('total_suic_medio5'))
    for ocn in obj_cubo_nac:
        t_suic1 = t_suic1 + ocn['m1']
        t_suic2 = t_suic2 + ocn['m2']
        t_suic3 = t_suic3 + ocn['m3']
        t_suic4 = t_suic4 + ocn['m4']
        t_suic5 = t_suic5 + ocn['m5']
    
    m1 = {}
    m1['value'] = t_suic1
    m1['name'] = "Envenenamiento"
    g_pie_tasa_tipo.append(m1)
    
    m2 = {}
    m2['value'] = t_suic2
    m2['name'] = "Ahorcamiento"
    g_pie_tasa_tipo.append(m2)
    
    m3 = {}
    m3['value'] = t_suic3
    m3['name'] = "Ahogamiento"
    g_pie_tasa_tipo.append(m3)

    m4 = {}
    m4['value'] = t_suic4
    m4['name'] = "Arma de fuego"
    g_pie_tasa_tipo.append(m4)
    
    m5 = {}
    m5['value'] = t_suic5
    m5['name'] = "Otro medio"
    g_pie_tasa_tipo.append(m5)

    # DISTRIBUCIÓN GEOGRÁFICA DE DATOS (Tabla final)
    obj_cubo_nac = CuboIndNac.objects.filter(sexo=3).values('anio','cve_ent').annotate(suic=Sum('total_suic')).order_by('anio')


    contexto = {
        "sexo": getCatSexo(),
        "entidades": list(getCatEntidades()),
        # MAPA NACIONAL
        "anio_cubo_nac": anio_cubo_nac,
        "anios_array": anios_array,
        "edad_cubo_nac": edad_cubo_nac,
        "edad_min": edad_min,
        "edad_max": edad_max,
        "mapa": mapa,
        "mapa_max": max,
        # MAPA MUNICIPAL
        "regiones": obj_reg,
        "anio_cubo_mun": anio_cubo_mun,
        "edad_min_mun": edad_min_mun,
        "edad_max_mun": edad_max_mun,
        # DISTRIBUCION POR ENTIDAD
        "distribucion_parametros": distribucion_parametros,
        "distribucion_orden_estados_registros": orden_estados_registros,
        "distribucion_data_registros": options,
        "distribucion_orden_estados_tasas": orden_estados_tasas,
        "distribucion_data_tasas": optionsT,
        # GRAFICA DE BARRAS
        "g_barras_tasa_edad_hombres": g_barras_tasa_edad_hombres,
        "g_barras_tasa_edad_mujeres": g_barras_tasa_edad_mujeres,
        # GRAFICA DE PASTEL
        "g_pie_tasa_tipo": g_pie_tasa_tipo,
        # DISTRIBUCIÓN GEOGRÁFICA DE DATOS
        "tb_distribucion": list(obj_cubo_nac),
    }
    #print(contexto)
    return render(request, 'explotacion_datos/td_suicidios.html', contexto)

def td_trastornos(request):
    contexto = dict()
    data_distribucion = dict()
    sexo_default = 0

    # Regiones
    obj_reg = CatRegionalizacion.objects.all().values('regionalizacion').order_by('regionalizacion').distinct()
    #Sexo
    obj_sexo = CatSexo.objects.filter(~Q(idcatsexo=-1)).values('idcatsexo','descripcion').order_by('-descripcion')

    # CUBO NACIONAL
    anio_cubo_nac = CuboIndNac.objects.filter().values('anio').order_by('anio').distinct()
    edad_cubo_nac = CuboIndNac.objects.filter().values('edad').order_by('edad').distinct()
    edad_min = CuboIndNac.objects.filter().values('edad').order_by('edad').first()
    edad_min = edad_min['edad']
    edad_max = CuboIndNac.objects.filter().values('edad').order_by('-edad').first()
    edad_max = edad_max['edad']

    # Defaults
    i = 0
    for s in obj_sexo:
        if i == 0:
            sexo_default = s['idcatsexo']
        i = i + 1

    # MAPA
    mapa = []
    max = 0
    mapa.append(['Entidad', 'Registros'])
    # Query principal
    obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo_default).values('cve_ent').annotate(suic=Sum('total_suic'))
    #print(obj_cubo_nac.query)
    for cn in obj_cubo_nac:
        cve_ent = cn['cve_ent']
        obj_entidad = CatEntidades.objects.filter(cve_ent=cve_ent).values('iso3166','entidad','abreviatura').first()
        m_elem = []
        m = {}
        m['v'] = obj_entidad['iso3166']
        m['f'] = obj_entidad['entidad']
        m_elem.append(m)        
        m_elem.append(cn['suic'])
        if cn['suic'] > max:
            max = cn['suic']
            #print(max)
        mapa.append(m_elem)




    # GRAFICAS DE DISTRIBUCION

    # - Parametros: Años TimeLine
    anios = CuboIndNac.objects.filter().values('anio').order_by('anio').distinct()
    anios_array = []
    for a in anios:
        anios_array.append(str(a['anio']))
    #print(anios_array)
    primer_anyo = anios_array[0]
    
    anio_init = anios.first()
    anio_final = CuboIndNac.objects.filter().values('anio').order_by('-anio').distinct().first()
    
    distribucion_parametros = {
        "value_init": str(anio_init['anio']),
        "anyos_line": anios_array,
        "value_final": str(anio_final['anio']),
        "titulo_registros": "Registros de mortalidad por uso de substancias, por entidad federativa y sexo en México, "+str(anio_init['anio'])+" a "+str(anio_final['anio']),
        "titulo_tasas": "Tasas de mortalidad por uso de substancias, por entidad federativa y sexo en México, "+str(anio_init['anio'])+" a "+str(anio_final['anio'])
    }
    

    # REGISTROS: Consulta por año y orden respecto a Hombres
    # - Obtener orden del primer año
    count = 0
    orden_estados_registros = []
    orden_entidades_cve_ent = []
    obj_cubo_nac = CuboIndNac.objects.filter(anio=primer_anyo, sexo=1).values('cve_ent').annotate(suic=Sum('total_suic')).order_by('-suic')
    for e in obj_cubo_nac:
        obj_entidad = CatEntidades.objects.filter(cve_ent=e['cve_ent']).values('entidad','abreviatura').first()
        # Guardar orden de entidades
        orden_entidades_cve_ent.append(e['cve_ent'])
        if count % 2 == 0:
            orden_estados_registros.append(obj_entidad['abreviatura'])
        else:
            orden_estados_registros.append("\\n"+obj_entidad['abreviatura'])
        count = count + 1

    # - Obtener data
    options = []
    totalH = 0
    totalM = 0
    for a in anios_array:
        totalH = 0
        totalM = 0
        
        s = {}
        s2 = {}
        s2['text'] = "Muertes ṕor año " + str(a)
        s['title'] = s2
        s3 = []

        s4 = {}
        data = []
        for ent in orden_entidades_cve_ent:
            obj_cubo_nac = CuboIndNac.objects.filter(anio=a, sexo=1,cve_ent=ent).values('cve_ent').annotate(suic=Sum('total_suic'))
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = CatEntidades.objects.filter(cve_ent=ent).values('entidad').first()
                l['name'] = obj_entidad['entidad']
                l['value'] = e['suic']
                totalH = totalH + e['suic']
                data.append(l)                
        s4['data'] = data
        s3.append(s4)
        
        s4 = {}
        data = []
        for ae in orden_entidades_cve_ent:
            obj_cubo_nac = CuboIndNac.objects.filter(anio=a, sexo=2, cve_ent=ae).values('cve_ent').annotate(suic=Sum('total_suic'))
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = CatEntidades.objects.filter(cve_ent=ae).values('entidad').first()
                l['name'] = obj_entidad['entidad']
                l['value'] = e['suic']
                totalM = totalM + e['suic']
                data.append(l)
        s4['data'] = data
        #print("dataM",data)
        s3.append(s4)
        
        s4 = {}
        data = []
        l = {}
        l['name'] = "Hombres"
        l['value'] = totalH
        data.append(l)
        l = {}
        l['name'] = "Mujeres"
        l['value'] = totalM
        data.append(l)
        
        s4['data'] = data
        s3.append(s4)

        s['series'] = s3
        options.append(s)


    # TASA: : Consulta por año y orden respecto a Hombres
    # - Obtener orden del primer año
    count = 0
    orden_estados_tasas = []
    orden_entidades_cve_ent = []

    data = []
    obj_cubo_nac = CuboIndNac.objects.filter(anio=primer_anyo, sexo=1).values('cve_ent').annotate(suic=Sum('total_suic'),pob=Sum('poblacion')).order_by('-pob')
    for e in obj_cubo_nac:
        l = {}
        obj_entidad = CatEntidades.objects.filter(cve_ent=e['cve_ent']).values('entidad','abreviatura').first()
        l['cve_ent'] = e['cve_ent']
        l['value'] = round((e['suic']/e['pob'])*100000,1)
        l['abreviatura'] = obj_entidad['abreviatura']
        data.append(l)

    ordenados = sorted(data, key=lambda x : x['value'],reverse=True)

    count = 0
    for ord in ordenados:
        orden_entidades_cve_ent.append(ord['cve_ent'])
        # Guardar orden de entidades
        if count % 2 == 0:
            orden_estados_tasas.append(ord['abreviatura'])
        else:
            orden_estados_tasas.append("\\n"+ord['abreviatura'])
        count = count + 1
    
    optionsT = []
    
    totalH = 0
    totalM = 0
    for b in anios_array:
        totalH = 0
        totalM = 0
        
        s = {}
        s2 = {}
        s2['text'] = "Muertes uso de substancias año " + str(b)
        s['title'] = s2

        s3 = []
        s4 = {}
        data = []
        for ent in orden_entidades_cve_ent:
            obj_cubo_nac = CuboIndNac.objects.filter(anio=b, sexo=1,cve_ent=ent).values('cve_ent').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = CatEntidades.objects.filter(cve_ent=e['cve_ent']).values('entidad','abreviatura').first()
                l['name'] = obj_entidad['entidad']
                l['value'] = round((e['suic']/e['pob'])*100000,1)
                totalH = totalH + e['suic']
                data.append(l)
        s4['data'] = data
        s3.append(s4)
        
        s4 = {}
        data = []
        for ae in orden_entidades_cve_ent:
            obj_cubo_nac = CuboIndNac.objects.filter(anio=b, sexo=2, cve_ent=ae).values('cve_ent').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
            for e in obj_cubo_nac:
                l = {}
                obj_entidad = CatEntidades.objects.filter(cve_ent=e['cve_ent']).values('entidad').first()
                l['name'] = obj_entidad['entidad']
                l['value'] = round((e['suic']/e['pob'])*100000,1)
                totalM = totalM + e['suic']
                data.append(l)
        s4['data'] = data
        s3.append(s4)

        s4 = {}
        data = []
        l = {}
        l['name'] = "Hombres"
        l['value'] = totalH
        data.append(l)
        l = {}
        l['name'] = "Mujeres"
        l['value'] = totalM
        data.append(l)

        s4['data'] = data
        s3.append(s4)

        s['series'] = s3
        optionsT.append(s)
        
    contexto = {
        "sexo": obj_sexo,
        "regiones": obj_reg,
        "anio_cubo_nac": anio_cubo_nac,
        "anios_array": anios_array,
        "edad_cubo_nac": edad_cubo_nac,
        "mapa": mapa,
        "mapa_max": max,
        "edad_min": edad_min,
        "edad_max": edad_max,
        "distribucion_parametros": distribucion_parametros,
        "distribucion_orden_estados_registros": orden_estados_registros,
        "distribucion_orden_estados_tasas": orden_estados_tasas,
        "distribucion_data_registros": options,
        "distribucion_data_tasas": optionsT
    } 
    return render(request, 'explotacion_datos/td_trastornos.html', contexto)


def td_alcohol(request):
    return render(request, 'explotacion_datos/td_alcohol.html')

def td_drogas(request):
    return render(request, 'explotacion_datos/td_drogas.html')

def td_homicidios(request):
    return render(request, 'explotacion_datos/td_homicidios.html')

def td_lesiones(request):
    return render(request, 'explotacion_datos/td_lesiones.html')

def td_accidentes(request):
    return render(request, 'explotacion_datos/td_accidentes.html')

def tr_psiquiatras(request):
    return render(request, 'explotacion_datos/tr_psiquiatras.html')

def tr_psicologos(request):
    return render(request, 'explotacion_datos/tr_psicologos.html')

def tr_equipos(request):
    return render(request, 'explotacion_datos/tr_equipos.html')

def tr_unidades(request):
    return render(request, 'explotacion_datos/tr_unidades.html')

def tr_camas(request):
    return render(request, 'explotacion_datos/tr_camas.html')

def te_trastornos(request):
    return render(request, 'explotacion_datos/te_trastornos.html')

def te_alcohol(request):
    return render(request, 'explotacion_datos/te_alcohol.html')

def te_drogas(request):
    return render(request, 'explotacion_datos/te_drogas.html')

def te_homicidios(request):
    return render(request, 'explotacion_datos/te_homicidios.html')

def te_lesiones(request):
    return render(request, 'explotacion_datos/te_lesiones.html')

def te_accidentes(request):
    return render(request, 'explotacion_datos/te_accidentes.html')

class MapaEntidadesViewSet(APIView):
    def get(self, request):
        region = request.GET.get('region')
        entidades = []
        #obj_entidades = CatEntidades.objects.all().values('cve_ent','noment')
        obj_entidades = CatRegionalizacion.objects.filter(regionalizacion=region).values('cve_ent','noment').order_by('noment').distinct()
        for e in obj_entidades:
            id = e['cve_ent']
            nombre = e['noment']
            elem = {}
            elem["id"] = id
            elem["entidad"] = nombre
            entidades.append(elem)

        contexto = {
            "entidades": entidades
        }
        return Response(contexto,status=status.HTTP_200_OK)

class MapaMunicipiosViewSet(APIView):
    def get(self, request):
        region = request.GET.get('region')
        entidad = request.GET.get('entidad')
        entidades = []
        #obj_entidades = CatEntidades.objects.all().values('cve_ent','noment')
        obj_entidades = CatRegionalizacion.objects.filter(regionalizacion=region).values('cve_ent','noment').order_by('noment').distinct()
        for e in obj_entidades:
            id = e['cve_ent']
            nombre = e['noment']
            elem = {}
            elem["id"] = id
            elem["entidad"] = nombre
            entidades.append(elem)

        contexto = {
            "entidades": entidades
        }
        return Response(contexto,status=status.HTTP_200_OK)


class UpdateMapaNacionalViewSet(APIView):
    def post(self, request):
        anyo = request.data['anyo']
        sexo = request.data['sexo']
        edadi = request.data['edadi']
        edadf = request.data['edadf']
        data = update_mapa_nacional(anyo,sexo,edadi,edadf)
        return Response(data,status=status.HTTP_200_OK)


def update_mapa_nacional(anyo,sexo,edadi, edadf):
    contexto = dict()
    mapa = []
    max = 0
    # Query principal
    mapa.append(['Entidad', 'Registros'])
    if anyo == 0:
        obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo, edad__gte=edadi, edad__lte=edadf).values('cve_ent').annotate(suic=Sum('total_suic'))
    else:
        obj_cubo_nac = CuboIndNac.objects.filter(anio=anyo, sexo=sexo, edad__gte=edadi, edad__lte=edadf).values('cve_ent').annotate(suic=Sum('total_suic'))
    for cn in obj_cubo_nac:
        cve_ent = cn['cve_ent']
        obj_entidad = CatEntidades.objects.filter(cve_ent=cve_ent).values('iso3166','entidad').first()
        m_elem = []
        m = {}
        m['v'] = obj_entidad['iso3166']
        m['f'] = obj_entidad['entidad']
        m_elem.append(m)        
        m_elem.append(cn['suic'])
        if cn['suic'] > max:
            max = cn['suic']
        mapa.append(m_elem)
    contexto = {
        "mapa": mapa,
        "mapa_max": max
    }
    return contexto


class EstadoMunicipioViewSet(APIView):
    def post(self, request):
        try:
            id = request.data['id']
        except Exception as exc:
            return Response({"message": "Bad request"},status=status.HTTP_400_BAD_REQUEST)
        elem = []
        obj_municipios = CatMunicipios.objects.filter(cve_ent=id).values('cvemun','nommun')
        for m in obj_municipios:
            e = {}
            e['id'] = m['cvemun']
            e['municipio'] = m['nommun']
            elem.append(e)
        return Response(elem,status=status.HTTP_200_OK)


class TasaNacionalViewSet(APIView):
    def get(self, request):
        try:
            anyo = request.GET.get['anyo']
        except Exception as exc:
            return Response({"message": "Bad request"},status=status.HTTP_400_BAD_REQUEST)

        if anyo == 0:
            obj_cubo_nacT = CuboIndNac.objects.filter(sexo=3).values('cve_ent','tasa_total_suic')
            obj_cubo_nacH = CuboIndNac.objects.filter(sexo=1).values('cve_ent','tasa_total_suic')
            obj_cubo_nacM = CuboIndNac.objects.filter(sexo=2).values('cve_ent','tasa_total_suic')
        else:
            obj_cubo_nacT = CuboIndNac.objects.filter(anio=anyo, sexo=3).values('cve_ent','tasa_total_suic')
            obj_cubo_nacH = CuboIndNac.objects.filter(anio=anyo, sexo=1).values('cve_ent','tasa_total_suic')
            obj_cubo_nacM = CuboIndNac.objects.filter(anio=anyo, sexo=2).values('cve_ent','tasa_total_suic')

        # TOTAL
        mapa = []
        for cn in obj_cubo_nacT:
            cve_ent = cn['cve_ent']
            obj_entidad = CatEntidades.objects.filter(cve_ent=cve_ent).values('iso3166','entidad').first()
            m_elem = []
            m = {}
            m['v'] = obj_entidad['iso3166']
            m['f'] = obj_entidad['entidad']
            m_elem.append(m)        
            m_elem.append(cn['suic'])
            mapa.append(m_elem)
        total = {
            "sexo": obj_sexo,
            "regiones": obj_reg,
            "anio_cubo_nac": anio_cubo_nac,
            "edad_cubo_nac": edad_cubo_nac,
            "mapa": mapa,
            "edad_min": edad_min,
            "edad_max": edad_max
        }

        # HOMBRES
        mapa = []
        for cn in obj_cubo_nacH:
            cve_ent = cn['cve_ent']
            obj_entidad = CatEntidades.objects.filter(cve_ent=cve_ent).values('iso3166','entidad').first()
            m_elem = []
            m = {}
            m['v'] = obj_entidad['iso3166']
            m['f'] = obj_entidad['entidad']
            m_elem.append(m)        
            m_elem.append(cn['suic'])
            mapa.append(m_elem)
        hombres = {
            "sexo": obj_sexo,
            "regiones": obj_reg,
            "anio_cubo_nac": anio_cubo_nac,
            "edad_cubo_nac": edad_cubo_nac,
            "mapa": mapa,
            "edad_min": edad_min,
            "edad_max": edad_max
        }

        # MUJERES
        mapa = []
        for cn in obj_cubo_nacM:
            cve_ent = cn['cve_ent']
            obj_entidad = CatEntidades.objects.filter(cve_ent=cve_ent).values('iso3166','entidad').first()
            m_elem = []
            m = {}
            m['v'] = obj_entidad['iso3166']
            m['f'] = obj_entidad['entidad']
            m_elem.append(m)        
            m_elem.append(cn['suic'])
            mapa.append(m_elem)
        mujeres = {
            "sexo": obj_sexo,
            "regiones": obj_reg,
            "anio_cubo_nac": anio_cubo_nac,
            "edad_cubo_nac": edad_cubo_nac,
            "mapa": mapa,
            "edad_min": edad_min,
            "edad_max": edad_max
        }

        contexto = dict()
        contexto = {
            "total": total,
            "hombres": hombres,
            "mujeres": mujeres
        }
        return Response(contexto,status=status.HTTP_200_OK)

# Controles por municipio
class ResultadosMunicipiosViewSet(APIView):
    def post(self, request):
        try:
            sexo = str(request.data['sexo'])
            min = request.data['min']
            max = request.data['max']
            anyo = int(request.data['anyo'])
            municipios = request.data['municipios']
        except Exception as exc:
            return Response({"message": "Bad request"},status=status.HTTP_400_BAD_REQUEST)
        
        body='<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://earth.google.com/kml/2.2"><Folder>'
        border = "0000ff"
        escala = ['6856a4', '7362aa', '8171b2', '9083bc', 'a296c7' ,'b3aad1', 'c4bddc', 'd4cfe5', 'e2dfee', 'ecebf4']

        for m in municipios:
            #print("m",m)
            m = m[4:]
            #print("m",m)
            sep = m.find('-')
            mun = int(m[0:sep],10)
            ent = int(m[sep+1:len(m)],10)
            #print("ent: ",ent,"  -  mun: ",mun)
            obj_cubo_ind = CuboIndMunQuinq.objects.filter(anio=anyo, cve_ent=ent, cve_mun=mun, sexo=sexo)
            poblacion_total = 0
            trastorno_mental = 0
            
            for ci in obj_cubo_ind:
                poblacion_total = 0
                trastorno_mental = 0
                quinq = min
                while quinq <= max:                   
                    if quinq == 0:
                        trastorno_mental = trastorno_mental + ci.total_pob_00_04_suic
                        poblacion_total = poblacion_total + ci.total_pob_00_04_suic
                    elif quinq == 5:
                        trastorno_mental = trastorno_mental + ci.total_pob_05_09_suic
                        poblacion_total = poblacion_total + ci.total_pob_05_09_suic
                    elif quinq == 10:
                        trastorno_mental = trastorno_mental + ci.total_pob_10_14_suic
                        poblacion_total = poblacion_total + ci.total_pob_10_14_suic
                    elif quinq == 15:
                        trastorno_mental = trastorno_mental + ci.total_pob_15_19_suic
                        poblacion_total = poblacion_total + ci.total_pob_15_19_suic
                    elif quinq == 20:
                        trastorno_mental = trastorno_mental + ci.total_pob_20_24_suic
                        poblacion_total = poblacion_total + ci.total_pob_20_24_suic
                    elif quinq == 25:
                        trastorno_mental = trastorno_mental + ci.total_pob_25_29_suic
                        poblacion_total = poblacion_total + ci.total_pob_25_29_suic
                    elif quinq == 30:
                        trastorno_mental = trastorno_mental + ci.total_pob_30_34_suic
                        poblacion_total = poblacion_total + ci.total_pob_30_34_suic
                    elif quinq == 35:
                        trastorno_mental = trastorno_mental + ci.total_pob_35_39_suic
                        poblacion_total = poblacion_total + ci.total_pob_35_39_suic
                    elif quinq == 40:
                        trastorno_mental = trastorno_mental + ci.total_pob_40_44_suic
                        poblacion_total = poblacion_total + ci.total_pob_40_44_suic
                    elif quinq == 45:
                        trastorno_mental = trastorno_mental + ci.total_pob_45_49_suic
                        poblacion_total = poblacion_total + ci.total_pob_45_49_suic
                    elif quinq == 50:
                        trastorno_mental = trastorno_mental + ci.total_pob_50_54_suic
                        poblacion_total = poblacion_total + ci.total_pob_50_54_suic
                    elif quinq == 55:
                        trastorno_mental = trastorno_mental + ci.total_pob_55_59_suic
                        poblacion_total = poblacion_total + ci.total_pob_55_59_suic
                    elif quinq == 60:
                        trastorno_mental = trastorno_mental + ci.total_pob_60_64_suic
                        poblacion_total = poblacion_total + ci.total_pob_60_64_suic
                    elif quinq == 65:
                        trastorno_mental = trastorno_mental + ci.total_pob_65_mm_suic
                        poblacion_total = poblacion_total + ci.total_pob_65_mm_suic
                    else:
                        trastorno_mental = trastorno_mental + 0
                        poblacion_total = poblacion_total + 0
                    quinq = quinq + 5
                    
            # kml
            cve_ent_mun = str(ent)
            if mun < 10:
                cve_ent_mun = cve_ent_mun + "00" + str(mun)
            elif mun < 100:
                cve_ent_mun = cve_ent_mun + "0" + str(mun)
            else:
                cve_ent_mun = cve_ent_mun + str(mun)
            obj_kml = CatMunicipioKML.objects.get(cve_ent_mun=cve_ent_mun)
            mrow_kml = obj_kml.kml

            str_poblacion_total = '{:,.2f}'.format(poblacion_total)
            str_trastorno_mental = '{:,.2f}'.format(trastorno_mental)
            if poblacion_total > 0:
                tasa = round((trastorno_mental/poblacion_total)*100000,1)
            else:
                tasa = 0
            str_tasa = '{:,.2f}'.format(tasa)
            #print("str_poblacion_total: ",str_poblacion_total)

            description = '<description><![CDATA[ <p>Datos de <strong>' + obj_kml.nom_mun + '</strong> ' + obj_kml.nom_ent + '</p><ul><li>Población total: <i>' + str_poblacion_total + '</i></li><li>Registros totales: <i>' + str_trastorno_mental + '</i></li><li>Tasa: <i>' + str_tasa + '</i></li></ul> ]]></description>'
            kml = mrow_kml.replace("<Placemark>", "<Placemark>" + description)
            kml_Id = kml[kml.find('<styleUrl>')+11:]
            kmlId = kml_Id[:kml_Id.find('</styleUrl>')].replace("#", "")

            body = body + '<Document>'
            body = body + '	<Style id="' + kmlId + '">'
            body = body + '		<LineStyle>'
            body = body + '			<color>'
            body = body + "ff" + buildColor(border)
            body = body + '			</color>'
            body = body + '			<width>1</width>'
            body = body + '		</LineStyle>'
            body = body + '		<PolyStyle>'
            body = body + '			<color>bb' + buildColor(escala[random.randrange(0,9)]) + '</color>'
            body = body + '		</PolyStyle>'
            body = body + '	</Style>'
            body = body + '	<Folder>'
            body = body + kml
            body = body + '	</Folder>'
            body = body + '</Document>'
        
        body = body + '</Folder></kml>'

        # Generar archivo
        now = datetime.now()
        name_file = now.strftime('%Y%m%d') + str(random.randrange(0,1000))
        name_file = "T" + name_file.lower() + ".kml"
        #print("settings.PATH_FILESKML",settings.PATH_FILESKML)
        #path_file = settings.PATH_FILESKML + "/" + name_file #PRODUCT
        path_file = "C:/Django Proyects/PANGEOS_DOWN_ENE2023/pangeos.com/static/kmls" + "/" + name_file #DEVELOP
        #print("path_file:",path_file)
        file = open(path_file, "w", encoding="utf-8")
        file.write(body)
        file.close()
        array_archivos = []
        #name_file = "T86ad7dd78e61acc775ede0a48c5c3b771f3c6e7b.kml"
        array_archivos.append(name_file)
        return Response(array_archivos,status=status.HTTP_200_OK)


def buildColor(_color):
    return _color[4:6] + _color[2:4] + _color[0:2]




### GRAFICA DE BARRAS TASA POR EDAD
class UpdateGraficaBarrasNacionalViewSet(APIView):
    def post(self, request):
        try:
            anio = request.data['anio']
            ent = request.data['ent']
            data = update_gb_nacional(anio,ent)
            return Response(data,status=status.HTTP_200_OK)
        except Exception as exc:
            return Response({"message": "Bad request"},status=status.HTTP_400_BAD_REQUEST)

def update_gb_nacional(anio,ent):
    contexto = dict()
    edad_max = CuboIndNac.objects.filter().values('edad').order_by('-edad').first()
    edad_max = edad_max['edad']
    g_barras_tasa_edad_hombres = []
    g_barras_tasa_edad_mujeres = []
    #   - Hombres
    i_min = 0
    flag_gb_cn = True
    while flag_gb_cn:
        i_max = i_min+9
        if i_max == 89:
            i_max = edad_max
        
        t_pob = 0
        t_suic = 0

        if anio == 0 and ent == 0:
            obj_cubo_nac = CuboIndNac.objects.filter(sexo=1, edad__gte=i_min, edad__lte=i_max).values('anio').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
        elif anio > 0 and ent == 0:
            obj_cubo_nac = CuboIndNac.objects.filter(sexo=1, anio=anio, edad__gte=i_min, edad__lte=i_max).values('anio').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
        elif anio == 0 and ent > 0:
            obj_cubo_nac = CuboIndNac.objects.filter(sexo=1, cve_ent=ent, edad__gte=i_min, edad__lte=i_max).values('anio').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
        else: # anio != 0 and ent != 0
            obj_cubo_nac = CuboIndNac.objects.filter(sexo=1, anio=anio, cve_ent=ent, edad__gte=i_min, edad__lte=i_max).values('anio').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))

        for ocn in obj_cubo_nac:
            t_pob = t_pob + ocn['pob']
            t_suic = t_suic + ocn['suic']

        if t_pob == 0:
            tasa = 0
        else:
            tasa = round((t_suic/t_pob)*100000,1)
        g_barras_tasa_edad_hombres.append(t_suic) #tasa

        i_min = i_min + 10
        if i_min == 90:
            flag_gb_cn = False
        
    #   - Mujeres
    i_min = 0
    flag_gb_cn = True
    while flag_gb_cn:
        i_max = i_min+9
        if i_max == 89:
            i_max = edad_max
        
        t_pob = 0
        t_suic = 0
            
        if anio == 0 and ent == 0:
            obj_cubo_nac = CuboIndNac.objects.filter(sexo=2, edad__gte=i_min, edad__lte=i_max).values('anio').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
        elif anio > 0 and ent == 0:
            obj_cubo_nac = CuboIndNac.objects.filter(sexo=2, anio=anio, edad__gte=i_min, edad__lte=i_max).values('anio').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
        elif anio == 0 and ent > 0:
            obj_cubo_nac = CuboIndNac.objects.filter(sexo=2, cve_ent=ent, edad__gte=i_min, edad__lte=i_max).values('anio').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))
        else: # anio != 0 and ent != 0
            obj_cubo_nac = CuboIndNac.objects.filter(sexo=2, anio=anio, cve_ent=ent, edad__gte=i_min, edad__lte=i_max).values('anio').annotate(suic=Sum('total_suic'),pob=Sum('poblacion'))

        for ocn in obj_cubo_nac:
            t_pob = t_pob + ocn['pob']
            t_suic = t_suic + ocn['suic']

        if t_pob == 0:
            tasa = 0
        else:
            tasa = round((t_suic/t_pob)*100000,1)
        g_barras_tasa_edad_mujeres.append(t_suic) #tasa

        i_min = i_min + 10
        if i_min == 90:
            flag_gb_cn = False
    
    contexto = {
        "gbarras_edadh": g_barras_tasa_edad_hombres,
        "gbarras_edadm": g_barras_tasa_edad_mujeres
    }
    return contexto


### GRAFICA PIE TASA TIPO
class UpdateGraficaPieNacionalViewSet(APIView):
    def post(self, request):
        try:
            anio = request.data['anio']
            sexo = request.data['sexo']
            ent = request.data['ent']
            data = update_gp_nacional(anio,sexo,ent)
            return Response(data,status=status.HTTP_200_OK)
        except Exception as exc:
            return Response({"message": "Bad request"},status=status.HTTP_400_BAD_REQUEST)

def update_gp_nacional(anio,sexo,ent):
    contexto = dict()
    g_pie_tasa_tipo = []
    t_suic1 = 0
    t_suic2 = 0
    t_suic3 = 0
    t_suic4 = 0
    t_suic5 = 0
    if anio==0 and ent==0:
        obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo).values('anio').annotate(m1=Sum('total_suic_medio1'),m2=Sum('total_suic_medio2'),m3=Sum('total_suic_medio3'),m4=Sum('total_suic_medio4'),m5=Sum('total_suic_medio5'))
    elif anio>0 and ent==0:
        obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo, anio=anio).values('anio').annotate(m1=Sum('total_suic_medio1'),m2=Sum('total_suic_medio2'),m3=Sum('total_suic_medio3'),m4=Sum('total_suic_medio4'),m5=Sum('total_suic_medio5'))
    elif anio==0 and ent>0:
        obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo, cve_ent=ent).values('anio').annotate(m1=Sum('total_suic_medio1'),m2=Sum('total_suic_medio2'),m3=Sum('total_suic_medio3'),m4=Sum('total_suic_medio4'),m5=Sum('total_suic_medio5'))
    else: # anio>0 and ent>0:
        obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo, anio=anio, cve_ent=ent).values('anio').annotate(m1=Sum('total_suic_medio1'),m2=Sum('total_suic_medio2'),m3=Sum('total_suic_medio3'),m4=Sum('total_suic_medio4'),m5=Sum('total_suic_medio5'))
    for ocn in obj_cubo_nac:
        t_suic1 = t_suic1 + ocn['m1']
        t_suic2 = t_suic2 + ocn['m2']
        t_suic3 = t_suic3 + ocn['m3']
        t_suic4 = t_suic4 + ocn['m4']
        t_suic5 = t_suic5 + ocn['m5']
    
    m1 = {}
    m1['value'] = t_suic1
    m1['name'] = "Envenenamiento"
    g_pie_tasa_tipo.append(m1)
    
    m2 = {}
    m2['value'] = t_suic2
    m2['name'] = "Ahorcamiento"
    g_pie_tasa_tipo.append(m2)
    
    m3 = {}
    m3['value'] = t_suic3
    m3['name'] = "Ahogamiento"
    g_pie_tasa_tipo.append(m3)
    
    m4 = {}
    m4['value'] = t_suic4
    m4['name'] = "Arma de fuego"
    g_pie_tasa_tipo.append(m4)
    
    m5 = {}
    m5['value'] = t_suic5
    m5['name'] = "Otro medio"
    g_pie_tasa_tipo.append(m5)

    contexto = {
        "gpie_tipo": g_pie_tasa_tipo
    }
    return contexto

## TABLA DE DATOS - DISTRIBUCIÓN GEOGRÁFICA
class UpdateTableDistribucionViewSet(APIView):
    def post(self, request):
        try:
            sexo = request.data['sexo']
            medio = request.data['medio']
            edadi = request.data['edadi']
            edadf = request.data['edadf']

            if sexo == 0:
                if medio == 0:
                    obj_cubo_nac = CuboIndNac.objects.filter(Q(sexo=1) | Q(sexo=2), edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent','sexo').annotate(suic=Sum('total_suic')).order_by('anio','-sexo')
                elif medio == 1:
                    obj_cubo_nac = CuboIndNac.objects.filter(Q(sexo=1) | Q(sexo=2), edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent','sexo').annotate(suic=Sum('total_suic_medio1')).order_by('anio','-sexo')
                elif medio == 2:
                    obj_cubo_nac = CuboIndNac.objects.filter(Q(sexo=1) | Q(sexo=2), edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent','sexo').annotate(suic=Sum('total_suic_medio2')).order_by('anio','-sexo')
                elif medio == 3:
                    obj_cubo_nac = CuboIndNac.objects.filter(Q(sexo=1) | Q(sexo=2), edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent','sexo').annotate(suic=Sum('total_suic_medio3')).order_by('anio','-sexo')
                elif medio == 4:
                    obj_cubo_nac = CuboIndNac.objects.filter(Q(sexo=1) | Q(sexo=2), edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent','sexo').annotate(suic=Sum('total_suic_medio4')).order_by('anio','-sexo')
                elif medio == 5:
                    obj_cubo_nac = CuboIndNac.objects.filter(Q(sexo=1) | Q(sexo=2), edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent','sexo').annotate(suic=Sum('total_suic_medio5')).order_by('anio','-sexo')
                elif medio == 6:
                    obj_cubo_nac = CuboIndNac.objects.filter(Q(sexo=1) | Q(sexo=2), edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent','sexo').annotate(m1=Sum('total_suic_medio1'),m2=Sum('total_suic_medio2'),m3=Sum('total_suic_medio3'),m4=Sum('total_suic_medio4'),m5=Sum('total_suic_medio5'),).order_by('anio','cve_ent','-sexo')
                else:
                    obj_cubo_nac = CuboIndNac.objects.filter(sexo=6)
            else:
                if medio == 0:
                    obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo, edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent').annotate(suic=Sum('total_suic')).order_by('anio')
                elif medio == 1:
                    obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo, edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent').annotate(suic=Sum('total_suic_medio1')).order_by('anio')
                elif medio == 2:
                    obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo, edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent').annotate(suic=Sum('total_suic_medio2')).order_by('anio')
                elif medio == 3:
                    obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo, edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent').annotate(suic=Sum('total_suic_medio3')).order_by('anio')
                elif medio == 4:
                    obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo, edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent').annotate(suic=Sum('total_suic_medio4')).order_by('anio')
                elif medio == 5:
                    obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo, edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent').annotate(suic=Sum('total_suic_medio5')).order_by('anio')
                elif medio == 6:
                    obj_cubo_nac = CuboIndNac.objects.filter(sexo=sexo, edad__gte=edadi, edad__lte=edadf).values('anio','cve_ent').annotate(m1=Sum('total_suic_medio1'),m2=Sum('total_suic_medio2'),m3=Sum('total_suic_medio3'),m4=Sum('total_suic_medio4'),m5=Sum('total_suic_medio5'),).order_by('anio')
                else:
                    obj_cubo_nac = CuboIndNac.objects.filter(sexo=6)


            return Response(obj_cubo_nac,status=status.HTTP_200_OK)
        except Exception as exc:
            return Response({"message": "Bad request"},status=status.HTTP_400_BAD_REQUEST)