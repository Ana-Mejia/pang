from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter

from explotacion_datos.views import *

app_name = 'explotacion_datos'
urlpatterns = [
    path('td_accidentes/',td_accidentes, name='td_accidentes'),
    path('td_suicidios/', td_suicidios, name="td_suicidios"),
    path('td_trastornos/', td_trastornos, name="td_trastornos"),
    path('td_alcohol/', td_alcohol, name='td_alcohol'),
    path('td_drogas/', td_drogas, name='td_drogas'),
    path('td_homicidios/', td_homicidios, name='td_homicidios'),
    path('td_lesiones/', td_lesiones, name='td_lesiones'),
    path('tr_psiquiatras/', tr_psiquiatras, name='tr_psiquiatras'),
    path('tr_psicologos/', tr_psicologos, name='tr_psicologos'),
    path('tr_equipos/', tr_equipos, name='tr_equipos'),
    path('tr_unidades/', tr_unidades, name='tr_unidades'),
    path('tr_camas/', tr_camas, name='tr_camas'),
    path('te_trastornos/', te_trastornos, name='te_trastornos'),
    path('te_alcohol/', te_alcohol, name='te_alcohol'),
    path('te_drogas/', te_drogas, name='te_drogas'),
    path('te_homicidios/', te_homicidios, name='te_homicidios'),
    path('te_lesiones/', te_lesiones, name='te_lesiones'),
    path('te_accidentes/', te_accidentes, name='te_accidentes'),
    path('mapa_entidades/',MapaEntidadesViewSet.as_view(),name="mapa_entidades"),
    path('mapa_municipios/',MapaMunicipiosViewSet.as_view(),name="mapa_municipios"),
    path('update_mapa_nacional/',UpdateMapaNacionalViewSet.as_view(),name="update_mapa_nacional"),
    path('estado_municipios/',EstadoMunicipioViewSet.as_view(),name="estado_municipios"),
    path('tasa_nacional/',TasaNacionalViewSet.as_view(),name="tasa_nacional"),
    path('resultados_municipio/',ResultadosMunicipiosViewSet.as_view(),name="resultados_municipio"),
    path('update_gb_nacional/',UpdateGraficaBarrasNacionalViewSet.as_view(),name="update_gb_nacional"),
    path('update_gp_nacional/',UpdateGraficaPieNacionalViewSet.as_view(),name="update_gp_nacional"),
    path('update_tb_distribucion/',UpdateTableDistribucionViewSet.as_view(),name="update_tb_distribucion"),
]

#urlpatterns += static(settings.PATH_FILESKML, document_root=settings.PATH_FILESKML) # DEVELOP