from explotacion_datos.models import *
from django.db.models.aggregates import Count, Sum

def getIdCatSexo():
    obj_cubo_nac = CuboIndNac.objects.filter(anio=2010, sexo=2, cve_ent=1).values('cve_ent').annotate(total=Sum('total_suic'),pob=Sum('poblacion'))
    print(obj_cubo_nac)    

getIdCatSexo()