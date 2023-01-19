jQuery(".lnk-ayuda2").click(function(){
    id = jQuery(this).attr("id");
    guia = introJs();
    switch(id){
        case 'btn-guia':
            _steps = [
                {element: ".panel-step1", intro: "Los estados de la república se encuentran agrupados por región."},
                {element: ".panel-step2", intro: "Aquí tienes un listado de estados. Al hacer click sobre alguno de ellos se mostrará su nombre en el recuadro de abajo. Puedes elegir mas de uno."},
                {element: ".panel-step3", intro: "Aquí se mostarán los estados que has elegido. Cada uno de ellos tiene una tache pequeña a la derecha del nombre y al hacer click sobre de ella se eliminará el estado de la búsqueda. Tienes que elegir el estado haciendo click, para poder encontrar sus municipios."},
                {element: ".panel-step4", intro: "Y aquí puedes elegir los municipios del estado elegido en la sección de arriba."},
                {element: ".panel-step5", intro: "En este apartado puedes elegir de entre las opciones disponibles para filtrar por sexo."},
                {element: ".panel-step6", intro: "Y en este apartado puedes seleccionar las edades mediante un rango de las mismmas."},
                {element: ".panel-step7", intro: "Y también puedes filtrar por año de registro."},
            ]
        break;
        case 'btn-guiaDescription':
            _steps = [
                {element: ".description-step1", intro: "<strong>La importancia </strong>da una breve información con datos reales que refuerzan el motivo de esta sección."},
                {element: ".description-step2", intro: "<strong>La definición</strong>, como su nombre lo indica, busca explicar de qué se trata y qué información se encuentra en el indicador en cuestión."},
                {element: ".description-step3", intro: "<strong>Desagregación </strong>es un desglose de la información dentro del indicador"},
                {element: ".description-step4", intro: "<strong>Método de cálculo </strong>es la fórmula usada con los datos, así como la definición de los parámetros usados dentro de la misma."},
                {element: ".description-step5", intro: "<strong>Fuentes de información estadística </strong>son los organismos desde los cuales se obtuvieron los datos estadísticos para el cálculo del indicador"},
                {element: ".description-step6", intro: "<strong>Frecuencia prevista de difusión de datos</strong>indica el período de tiempo en el que serán publicados los datos y un posible retraso para este efecto si es que lo hay."},
                {element: ".description-step7", intro: "<strong>Frecuencia prevista de recopilación de datos </strong>muestra el período de tiempo en el cual se recopilan los datos."},
                {element: ".description-step8", intro: "<strong>Limitaciones </strong> circunstancias que pudieran obstruir la veracidad de algunos datos."},
            ];
        break;
        case 'btn-guiaMapa':
          _steps = [
              {element: ".guiamapa-step1", intro: "Aquí puedes elegir el parámetro del año en el cual los eventos fueron registrados."},
              {element: ".guiamapa-step2", intro: "Este parámetro te permitirá filtrar los datos por sexo (masculino/femenino), o conservarlos agrupados."},
              {element: ".guiamapa-step3", intro: "Con este control puedes filtrar el rango de edad que deseas consultar."},
              {element: ".guiamapa-step4", intro: "En este mapa es donde puedes observar los cambios de manera gráfica con base en los parámetros elegidos. Cabe mencionar que este mapa se oculta cuando realizas búsquedas desde el panel lateral."},
          ];
        break;
        case 'btn-guiaMapaGrafica':
          _steps = [
              {element: ".guiamapagrafica-step1", intro: "La gráfica es una representación de los datos del indicador, puedes elegir que la gráfica represente los datos ya sea por tasa o por registros."},
              {element: ".guiamapagrafica-step2", intro: "Al elegir en el control anterior Registros/Tasa podrás observar el cambio en el comportamiento de esta gráfica. Adicionalmente puedes iniciar la animación de la misma y ver el cambio de los datos al hacer click en el icono de play (triángulo) que se encuentra abajo de esta misma gráfica a la izquierda de la barra donde puedes ver los años de los registros. También puedes hacer click en cada año para ver la representación de los datos en el año elegido."},
          ];
        break;
        case 'btn-guiaTabla':
            _steps = [
                {element: ".guiatabla-step1", intro: "Al hacer click en este botón podrás ver desplegado el detalle de los datos en formato tabular."}
            ];
        break;
        default:
          return false;
        break;
    }
    guia.setOption('tooltipPosition', 'auto');
    guia.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top'])
    guia.setOption('showProgress', false)
    guia.setOption('showBullets', false)
    guia.setOption('hidePrev', true)
    guia.setOption('hideNext', false)
    guia.setOption('exitOnEsc', true)
    guia.setOption('nextToDone', true)
    guia.setOption('exitOnOverlayClick', true)
    guia.setOption('keyboardNavigation', true)
    guia.setOption('scrollToElement', true)
    guia.setOptions({'nextLabel': 'Siguiente', 'prevLabel': 'Anterior', 'doneLabel': 'Terminar'})
    guia.setOptions({ steps:_steps })
    guia.oncomplete(function(){
        jQuery("body").css({"overflow-y":"auto", "overflow-x":"hidden"});
    })
    guia.start();
});
