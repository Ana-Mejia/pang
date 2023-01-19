    google.charts.load('upcoming', {
        'packages': ['geochart']
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
		  ['Entidad', 'Registros'],
		  [{ v: 'MX-AGU', f: 'Aguascalientes' }, 50],
		  [{ v: 'MX-BCN', f: 'Baja California' }, 75],
		  [{ v: 'MX-BCS', f: 'Baja California Sur' }, 12],
		  [{ v: 'MX-CAM', f: 'Campeche' }, 31],
		  [{ v: 'MX-DIF', f: 'Ciudad de México' }, 180],
          [{ v: 'MX-COA', f: 'Coahuila de Zaragoza' }, 179],
          [{ v: 'MX-COL', f: 'Colima' }, 289],
		  [{ v: 'MX-CHP', f: 'Chiapas' }, 85],
          [{ v: 'MX-CHH', f: 'Chihuahua' }, 16],
		  [{ v: 'MX-DUR', f: 'Durango' }, 66],
          [{ v: 'MX-GUA', f: 'Guanajuato' }, 323],
		  [{ v: 'MX-GRO', f: 'Guerrero' }, 168],
          [{ v: 'MX-HID', f: 'Hidalgo' }, 144],
		  [{ v: 'MX-JAL', f: 'Jalisco' }, 313],
          [{ v: 'MX-MEX', f: 'Estado de México' }, 502],
		  [{ v: 'MX-MIC', f: 'Michoacán de Ocampo' }, 266],
          [{ v: 'MX-MOR', f: 'Morelos' }, 48],
		  [{ v: 'MX-NAY', f: 'Nayarit' }, 31],
          [{ v: 'MX-NLE', f: 'Nuevo León' }, 38],
		  [{ v: 'MX-OAX', f: 'Oaxaca' }, 389],
          [{ v: 'MX-PUE', f: 'Puebla' }, 513],
		  [{ v: 'MX-QUE', f: 'Querétaro' }, 127],
          [{ v: 'MX-ROO', f: 'Quintana Roo' }, 22],
		  [{ v: 'MX-SLP', f: 'San Luis Potosí' }, 176],
          [{ v: 'MX-SIN', f: 'Sinaloa' }, 61],
		  [{ v: 'MX-SON', f: 'Sonora' }, 106],
          [{ v: 'MX-TAB', f: 'Tabasco' }, 70],
          [{ v: 'MX-TAM', f: 'Tamaulipas' }, 58],
		  [{ v: 'MX-TLA', f: 'Tlaxcala' }, 64],
          [{ v: 'MX-VER', f: 'Veracruz de Ignacio de la Llave' }, 457],
		  [{ v: 'MX-YUC', f: 'Yucatán' }, 67],
          [{ v: 'MX-ZAC', f: 'Zacatecas' }, 86]
        ]);

        var options = {
          region: 'MX', // Mexico
          resolution: 'provinces',
          colorAxis: {
            //      minValue=100,
            //     maxValue=400,
            values: [0, 513],
            colors: ['white', '#ba0f3a']
          },
          backgroundColor: '#81d4fa',
          datalessRegionColor: '#eeeeee',
          defaultColor: '#f5f5f5',
        };

        var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
        chart.draw(data, options);
      };
      function switchProps(p) {
          if(p=='1') {
              jQuery("#prop1").css({"display":"block"});
              jQuery("#prop2").css({"display":"none"});
              jQuery("#prop3").css({"display":"none"});
          }
          if(p=='2') {
              jQuery("#prop2").css({"display":"block"});
              jQuery("#prop1").css({"display":"none"});
              jQuery("#prop3").css({"display":"none"});
          }
          if(p=='3') {
              jQuery("#prop3").css({"display":"block"});
              jQuery("#prop2").css({"display":"none"});
              jQuery("#prop1").css({"display":"none"});
          }
      }

      jQuery("#ctrl_edad").slider({id: "sliderEdad", min: 0, max: 95, value: [0,95], labelledby: 'ctrl_edad-label-1' });
      jQuery("#ctrl_edad").on("slide", function(slideEvt){
          EdadRango = slideEvt.value;
          jQuery("#ctrl_edad_I").text( EdadRango[0] );
          jQuery("#ctrl_edad_F").text( EdadRango[1] );
      });

      var array_texto = Array("#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF");
      array_colores = Array("#FAEBD7","#00FFFF","#FFE4C4","#0000FF","#8A2BE2","#A52A2A","#DEB887","#5F9EA0","#7FFF00","#D2691E","#FF7F50","#6495ED","#008B8B","#B8860B","#006400","#FF8C00","#FF1493","#FFD700","#DAA520","#808080","#E6E6FA","#F08080","#D3D3D3","#90EE90","#D87093","#FFEFD5","#CD853F","#8B4513","#D2B48C","#008080","#FF6347","#F5F5F5");
      var estadoseleccionado = "";
      var municipios=[];
      var municipiosSEL=[];

      jQuery(document).ready(function(){
          jQuery.ajax({
              url: "estados.php",
              method: "post",
              data: {type: "estados", id: "0"},
              success: function(t) {
                  obj = jQuery.parseJSON(t);
                  success = obj.success;
                  if( success == 1 ) {
                      data = obj.data;
                      output = "";
                      jQuery.each(data, function(i, j){
                        output+="<option value='"+j.id+"'>"+j.entidad+"</option>";
                      });
                      jQuery("#estadosselector").append(output);
                  }
              }
          });
          jQuery("#echart_pie").children("div").css({"width":"100% !important", "height": "100% !important"});
          jQuery("#filtroBuscar").click(function(){
              jQuery("#filtroLimpiar").css({"display":"block"});
        jQuery("#filtroGrafica").css({"display":"block"});
          });

          jQuery("#filtroLimpiar").click(function(){
              jQuery("#filtroLimpiar").css({"display":"none"});
        jQuery("#filtroGrafica").css({"display":"none"});
          });
          jQuery("#filtroGrafica").click(function(){
              setTimeout(function(){ init_echarts() }, 500);
          });
        jQuery("#btn-showtable").click(function(){
            size = parseInt((jQuery("#table-viewport").css('height').replace('px','')));
            console.log(size);
            if(size <= 0) {
                jQuery("#table-viewport").animate({
                    'height': '500px'
                }, 500);
                jQuery("#btn-showtable").html("Ocultar detalle de datos");
                // jQuery("#table-viewport").css({'height':'500px'});

            } else {
                jQuery("#table-viewport").animate({
                    'height': '0px'
                }, 500);
                jQuery("#btn-showtable").html("Mostrar detalle de datos");
                // jQuery("#table-viewport").css({'height':'0px'});
            }
        });
          jQuery("#ctrl_edad_I").text( '0' );
          jQuery("#ctrl_edad_F").text( '95' );
      });
      
      jQuery("#handler, .grey_link").click(function(){
          txt_menu="";
          controles_right = parseFloat((jQuery("#controles").css('right')).replace("px",""));
          if( controles_right < 0 ) {
              jQuery("#controles").animate({
                  'right': '0px'
              }, 500);
              txt_menu = "Ocultar";
              effects('on');
          } else {
              jQuery("#controles").animate({
                  'right': '-325px'
              }, 500);
              txt_menu = "Mostrar";
              effects('off');
          }
          jQuery("#handler").html(txt_menu+" menú");
      });

      jQuery("#menuToggle").click(function() {
          menu_left = parseInt( (jQuery("#verticalmenu").css("left")).replace("px","") );
          if( menu_left < 0 ) {
              jQuery("#verticalmenu").animate({
                  'left': '0px'
              }, 500);
          } else {
              jQuery("#verticalmenu").animate({
                  'left': '-230px'
              }, 500);
          }
      });

      
      jQuery("#handler").click(function(){
          txt_menu="";
          controles_right = parseFloat((jQuery("#controles").css('right')).replace("px",""));
          if( controles_right < 0 ) {
              jQuery("#controles").animate({
                  'right': '0px'
              }, 500);
              txt_menu = "Ocultar";
          } else {
              jQuery("#controles").animate({
                  'right': '-325px'
              }, 500);
              txt_menu = "Mostrar";
          }
          jQuery(this).html(txt_menu+" menú");
      });

      jQuery("#estadosselector").on("change", function(){
          id = jQuery(this).val();
          txt = jQuery("#estadosselector option:selected").text();
          jQuery(this).children('option[value="'+id+'"]').hide();
          buildTag(id, txt, 'estado');
          buildFunctions();
          jQuery(this).val(0);
      });

      function buildTag(_id, _txt, _origin) {
          if (_origin == 'estado') {
              output = "<span class='btag' style='background-color: "+array_colores[_id]+";'>";
              output+="<span class='closetag closetagG' id='tag_"+_id+"'><sup>X</sup></span>";
              output+="<span class='texttag' id='tagX_"+_id+"' style='color: "+array_texto[_id]+"'>"+_txt+"</span>";
              output+= "</span>";
              jQuery("#edosviewport").append(output);
          }
          if(_origin == 'municipios') {
              Eid = parseInt(_id.substring( _id.indexOf("-")+1, 10000 ));
              output = "<span class='btag mtag etag-"+pad(Eid,2)+"' style='background-color: #F8F8FF; border: 3px solid "+array_colores[Eid]+";'>";
              // output+="<span class='closetagM closetagG' id='"+pad(_id,2)+"'><sup>X</sup></span>";
              output+="<span class='closetagM closetagG' id='"+pad(_id,2)+"'></span>";
              output+="<span class='texttagM' style='color: #989898'>"+_txt+"</span>";
              output+= "</span>";
              jQuery("#mupiosviewport").append(output);
          }
      }
      function buildFunctions() {
        jQuery(".closetag").unbind('click').click(function(){
            id = parseInt(jQuery(this).attr('id').replace('tag_',''));
            jQuery.each( jQuery(".mtag"), function(i,j){
                _id = jQuery(this).children(".closetagM").attr("id");
                _ID = _id.split("-");
                mid = _ID[0];
                eid = _ID[1];
                if( eid == pad(id,2) ) {
                    jQuery('#dropmunicipios').multiselect('deselect', parseInt(mid.replace('tag_','')) );
                    y =jQuery.grep(municipiosSEL, function(value) {
                        return value != _id;
                    });
                    municipiosSEL=y;
                }
            });
            jQuery('#dropmunicipios').multiselect('destroy');
            jQuery("#estadosselector").children('option[value="'+id+'"]').show();
            jQuery(this).parent(".btag").remove();
            jQuery(".etag-"+pad(id,2)).remove();
        });
        jQuery(".texttag").unbind('click').click(function(){
            hasclass = jQuery(this).hasClass("texttagselected");
            jQuery(".texttag").removeClass("texttagselected");
            if(!hasclass) {
                  jQuery(this).addClass("texttagselected");
                  id = parseInt(jQuery(this).attr('id').replace('tagX_',''));
                  jQuery.ajax({
                      url: "estados.php",
                      method: "post",
                      data: {id: id, type: "municipios"},
                      async: true,
                      success: function(t) {
                          jQuery('#dropmunicipios').multiselect('destroy');
                          obj = jQuery.parseJSON(t);
                          _out = "";
                          jQuery.each(obj.data, function(i, j){
                              obj_id=j.id;
                              obj_municipio=j.municipio;
                              _out+="<option value='"+obj_id+"'>"+obj_municipio+"</option>";
                          });
                          jQuery('#dropmunicipios').html('');
                          jQuery('#dropmunicipios').append(_out);
                          jQuery('#dropmunicipios').multiselect({
                              includeSelectAllOption:true,
                              selectAllText:'Todos',
                              enableFiltering:true,
                              enableCaseInsensitiveFiltering:true,
                              filterPlaceholder: 'Buscar',
                              includeFilterClearBtn: true,
                              buttonWidth: '310px',
                              maxHeight: 400,
                              selectAllValue: 'todos-'+id,
                              selectAllName:'seleccionar-todos',
                              buttonText:function(options, select){
                                  text = 'Sin selección';
                                  totalMunicipiosEstado=0;
                                  for(h=0; h<municipiosSEL.length; h++) {
                                      _mm = municipiosSEL[h];
                                      mm = _mm.split('-');
                                      id_edo = mm[1];
                                      if(id_edo == id) {
                                          totalMunicipiosEstado++;
                                      }
                                  }
                                  if(totalMunicipiosEstado>0) {
                                      text=totalMunicipiosEstado+' seleccionados';
                                  }
                                  if(options.length>0) {
                                      text=options.length+' seleccionados';
                                  }
                                  return text;
                              },
                              onChange:function(e, checked) {
                                  __id = parseInt((jQuery(".texttagselected").parent('.btag').children('span').eq(0).attr('id')).replace('tag_',''));
                                  idM = "tag_"+e.context.value+"-"+pad(__id,2);
                                  txtM =e.context.label;
                                  if(checked ) {
                                      buildTag(idM, txtM, 'municipios');
                                      jQuery('#dropmunicipios').multiselect('select', idM);
                                      alimentaArray(idM, 'in');
                                  } else {
                                      alimentaArray(idM, 'out');
                                      // jQuery('#dropmunicipios').multiselect('deselect', e.context.value);
                                      jQuery("#"+idM).parent('.btag').remove();
                                  }
                                  for(i=0; i<municipiosSEL.length; i++){
                                      _mm = municipiosSEL[i].split('-');
                                      cEdo_id = _mm[1];
                                      mm = parseInt(_mm[0].replace('tag_',''));
                                      if( parseInt(cEdo_id) == id ) {
                                          jQuery('#dropmunicipios').multiselect('select', mm);
                                      } else {
                                          // jQuery('#dropmunicipios').multiselect('deselect', mm);
                                      }
                                  }
                              },
                              onDropdownShow: function(event) {
                                  for(i=0; i<municipiosSEL.length; i++){
                                      _mm = municipiosSEL[i].split('-');
                                      cEdo_id = _mm[1];
                                      mm = parseInt(_mm[0].replace('tag_',''));
                                      if( parseInt(cEdo_id) == id ) {
                                          jQuery('#dropmunicipios').multiselect('select', mm);
                                      }
                                  }
                              },
                              onSelectAll: function() {
                                  id_val = jQuery("input[name='seleccionar-todos']").val();
                                  _id = id_val.split('-');
                                  id_estado = pad(_id[1], 2);
                                  jQuery("#dropmunicipios option").each( function(){
                                      _idM = jQuery(this).val();
                                      label = jQuery(this).text();
                                      id = "tag_"+_idM+"-"+id_estado;
                                      buildTag(id, label, 'municipios');
                                      alimentaArray(id, 'in');
                                  });
                              },
                              onDeselectAll:function () {
                                  id_val = jQuery("input[name='seleccionar-todos']").val();
                                  _id = id_val.split('-');
                                  id_estado = pad(_id[1], 2);
                                  jQuery("#dropmunicipios option").each( function(){
                                      _idM = jQuery(this).val();
                                      label = jQuery(this).text();
                                      id = "tag_"+_idM+"-"+id_estado;
                                      alimentaArray(id, 'out');
                                  });
                                  jQuery(".etag-"+id_estado).remove();
                              },

                          });
                      }
                  });
            }
        });
     }

     function effects(s) {
        if(s=='on') {
            jQuery("#controles").hover(
              function(){
                jQuery(this).css({'opacity':'1'});
              }, function(){
                jQuery(this).css({'opacity':'0.5'});
              }
            );
        }
        if(s=='off') {
            jQuery("#controles").off("mouseenter mouseleave");
        }
     }

      function alimentaArray(id, direccion){
          if( direccion == 'in') {
            if (municipiosSEL.indexOf(id) === -1) {
                municipiosSEL.push(id);
            }
          }
          if( direccion == 'out' ) {
              y =jQuery.grep(municipiosSEL, function(value) {
                  return value != id;
              });
              municipiosSEL=y;
          }
      }

      function pad (str, max) {
          str = str.toString();
          return str.length < max ? pad("0" + str, max) : str;
      }

      jQuery(".sublink").click(function(){
          submenu =  jQuery(".minisubmenu").css("display");
          if( submenu == 'none' ){
              jQuery(".minisubmenu").css({"display":"block"})
          } else {
              jQuery(".minisubmenu").css({"display":"none"});
          }
      });
          var myChart = echarts.init(document.getElementById('mainGrpah'));
          myChart.registerLocale = 
          option = {
            baseOption: {
              toolbox: {
                show: true,
                orient: 'vertical',
                left: '20',
                top: '50',
                feature: {
                  dataZoom: {
                    yAxisIndex: "none",
                    title: { zoom: 'Expandir', back: 'Reestablecer'}
                  },
                  dataView: {
                    readOnly: false,
                    lang: ['Datos Origen', 'Cerrar', 'Actualizar'],
                    title: 'Mostrar Datos Origen'
                  },
                  magicType: {
                    type: ["line", "bar", "stack", "tiled"],
                    title: { 
                      line: "Gráfico de Líneas", 
                      bar: "Gráfico de Barras", 
                      stack: "Agrupar", 
                      tiled: "Desagrupar" 
                    }
                  },
                  restore: {
                    title: 'Restaurar',
                  },
                  saveAsImage: {
                    title: 'Guardar como imagen'
                  }
                }
              },
              
              timeline: {
                axisType: "category",
                autoPlay: false,
                playInterval: 1000,
                data: [{
                  value: "2000",
                  tooltip: {
                    formatter: "{b} (Inicio de la muestra)"
                  },
                  symbol: "diamond",
                  symbolSize: 16,
                }, 
                "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017",  
                {
                  value: "2018",
                  tooltip: {
                    formatter: "{b} (Fin de la muestra)"
                  },
                  symbol: "square",
                  symbolSize: 16
                }]
              },
              title: {
                subtext: "Distribución por Entidad"
              },
              tooltip: {},
              legend: {
                left: "right",
                data: ["Hombres", "Mujeres", "Total"]
              },
              calculable: true,
              grid: {
                top: 80,
                bottom: 100
              },
              xAxis: [{
                type: "category",
                axisLabel: {
                  interval: 0
                },
                data: ["Ags", "\nBC", "BCS", "\nCamp", "Chis", "\nChih", "CDMX", "\nCoah", "Col", "\nDur", "Gto", "\nGro", "Hgo", "\nJal", "EdoMex", "\nMich", "Mor", "\nNay", "NL", "\nOax", "Pue", "\nQro.", "Q.Roo", "\nSLP", "Sin", "\nSon", "Tab", "\nTamps", "Tlax", "\nVer", "Yuc", "\nZac"],
                splitLine: {
                  show: false
                }
              }],
              yAxis: [{
                type: "value",
                name: "Registros totales",
                max: "dataMax"
                //max: 800
                //splitNumber: 10
              }],
              series: [{
                name: "Hombres",
                type: "bar"
              }, {
                name: "Mujeres",
                type: "bar"
              }, {
                name: "Total",
                type: "bar"
              }, {
                name: "Total Nacional",
                type: "pie",
                //center: ["75%", "35%"],
                center: ["89%", "16%"],
                radius: "20%"
              }]
            },
            options: [{
              title: {
                text: "TMent año 2000"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 41 },
                   { name: "Baja California", value: 63 },
                   { name: "Baja California Sur", value: 11 },
                   { name: "Campeche", value: 30 },
                   { name: "Coahuila", value: 78 },
                   { name: "Colima", value: 14 },
                   { name: "Chiapas", value: 159 },
                   { name: "Chihuahua", value: 157 },
                   { name: "Ciudad de México", value: 219 },
                   { name: "Durango", value: 57 },
                   { name: "Guanajuato", value: 288 },
                   { name: "Guerrero", value: 157 },
                   { name: "Hidalgo", value: 94 },
                   { name: "Jalisco", value: 268 },
                   { name: "México", value: 460 },
                   { name: "Michoacán", value: 236 },
                   { name: "Morelos", value: 45 },
                   { name: "Nayarit", value: 26 },
                   { name: "Nuevo León", value: 30 },
                   { name: "Oaxaca", value: 345 },
                   { name: "Puebla", value: 475 },
                   { name: "Querétaro", value: 117 },
                   { name: "Quintana Roo", value: 21 },
                   { name: "San Luis Potosí", value: 158 },
                   { name: "Sinaloa", value: 45 },
                   { name: "Sonora", value: 91 },
                   { name: "Tabasco", value: 62 },
                   { name: "Tamaulipas", value: 48 },
                   { name: "Tlaxcala", value: 54 },
                   { name: "Veracruz", value: 416 },
                   { name: "Yucatán", value: 58 },
                   { name: "Zacatecas", value: 76 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 9 },
                   { name: "Baja California", value: 12 },
                   { name: "Baja California Sur", value: 1 },
                   { name: "Campeche", value: 1 },
                   { name: "Coahuila", value: 7 },
                   { name: "Colima", value: 2 },
                   { name: "Chiapas", value: 21 },
                   { name: "Chihuahua", value: 21 },
                   { name: "Ciudad de México", value: 70 },
                   { name: "Durango", value: 9 },
                   { name: "Guanajuato", value: 35 },
                   { name: "Guerrero", value: 12 },
                   { name: "Hidalgo", value: 19 },
                   { name: "Jalisco", value: 45 },
                   { name: "México", value: 42 },
                   { name: "Michoacán", value: 30 },
                   { name: "Morelos", value: 3 },
                   { name: "Nayarit", value: 5 },
                   { name: "Nuevo León", value: 8 },
                   { name: "Oaxaca", value: 44 },
                   { name: "Puebla", value: 38 },
                   { name: "Querétaro", value: 10 },
                   { name: "Quintana Roo", value: 1 },
                   { name: "San Luis Potosí", value: 18 },
                   { name: "Sinaloa", value: 16 },
                   { name: "Sonora", value: 15 },
                   { name: "Tabasco", value: 8 },
                   { name: "Tamaulipas", value: 10 },
                   { name: "Tlaxcala", value: 10 },
                   { name: "Veracruz", value: 41 },
                   { name: "Yucatán", value: 9 },
                   { name: "Zacatecas", value: 10 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 50 },
                   { name: "Baja California", value: 75 },
                   { name: "Baja California Sur", value: 12 },
                   { name: "Campeche", value: 31 },
                   { name: "Coahuila", value: 85 },
                   { name: "Colima", value: 16 },
                   { name: "Chiapas", value: 180 },
                   { name: "Chihuahua", value: 179 },
                   { name: "Ciudad de México", value: 289 },
                   { name: "Durango", value: 66 },
                   { name: "Guanajuato", value: 323 },
                   { name: "Guerrero", value: 169 },
                   { name: "Hidalgo", value: 114 },
                   { name: "Jalisco", value: 313 },
                   { name: "México", value: 502 },
                   { name: "Michoacán", value: 266 },
                   { name: "Morelos", value: 48 },
                   { name: "Nayarit", value: 31 },
                   { name: "Nuevo León", value: 38 },
                   { name: "Oaxaca", value: 389 },
                   { name: "Puebla", value: 513 },
                   { name: "Querétaro", value: 127 },
                   { name: "Quintana Roo", value: 22 },
                   { name: "San Luis Potosí", value: 176 },
                   { name: "Sinaloa", value: 61 },
                   { name: "Sonora", value: 106 },
                   { name: "Tabasco", value: 70 },
                   { name: "Tamaulipas", value: 58 },
                   { name: "Tlaxcala", value: 64 },
                   { name: "Veracruz", value: 457 },
                   { name: "Yucatán", value: 67 },
                   { name: "Zacatecas", value: 86 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 4399
                }, {
                  name: "Mujeres",
                  value: 582
                }, {
                  name: "Total",
                  value: 4983
                }]
              }]
            }, {
              title: {
                text: "TMent año 2001"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 47 },
                   { name: "Baja California", value: 57 },
                   { name: "Baja California Sur", value: 11 },
                   { name: "Campeche", value: 27 },
                   { name: "Coahuila", value: 54 },
                   { name: "Colima", value: 19 },
                   { name: "Chiapas", value: 186 },
                   { name: "Chihuahua", value: 153 },
                   { name: "Ciudad de México", value: 213 },
                   { name: "Durango", value: 34 },
                   { name: "Guanajuato", value: 258 },
                   { name: "Guerrero", value: 133 },
                   { name: "Hidalgo", value: 139 },
                   { name: "Jalisco", value: 237 },
                   { name: "México", value: 468 },
                   { name: "Michoacán", value: 221 },
                   { name: "Morelos", value: 57 },
                   { name: "Nayarit", value: 26 },
                   { name: "Nuevo León", value: 28 },
                   { name: "Oaxaca", value: 397 },
                   { name: "Puebla", value: 477 },
                   { name: "Querétaro", value: 105 },
                   { name: "Quintana Roo", value: 24 },
                   { name: "San Luis Potosí", value: 140 },
                   { name: "Sinaloa", value: 61 },
                   { name: "Sonora", value: 82 },
                   { name: "Tabasco", value: 54 },
                   { name: "Tamaulipas", value: 36 },
                   { name: "Tlaxcala", value: 45 },
                   { name: "Veracruz", value: 453 },
                   { name: "Yucatán", value: 51 },
                   { name: "Zacatecas", value: 80 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 10 },
                   { name: "Baja California", value: 8 },
                   { name: "Baja California Sur", value: 4 },
                   { name: "Campeche", value: 4 },
                   { name: "Coahuila", value: 2 },
                   { name: "Colima", value: 2 },
                   { name: "Chiapas", value: 25 },
                   { name: "Chihuahua", value: 14 },
                   { name: "Ciudad de México", value: 67 },
                   { name: "Durango", value: 7 },
                   { name: "Guanajuato", value: 34 },
                   { name: "Guerrero", value: 11 },
                   { name: "Hidalgo", value: 19 },
                   { name: "Jalisco", value: 43 },
                   { name: "México", value: 61 },
                   { name: "Michoacán", value: 17 },
                   { name: "Morelos", value: 1 },
                   { name: "Nayarit", value: 8 },
                   { name: "Nuevo León", value: 11 },
                   { name: "Oaxaca", value: 39 },
                   { name: "Puebla", value: 46 },
                   { name: "Querétaro", value: 14 },
                   { name: "Quintana Roo", value: 1 },
                   { name: "San Luis Potosí", value: 16 },
                   { name: "Sinaloa", value: 16 },
                   { name: "Sonora", value: 11 },
                   { name: "Tabasco", value: 4 },
                   { name: "Tamaulipas", value: 9 },
                   { name: "Tlaxcala", value: 8 },
                   { name: "Veracruz", value: 41 },
                   { name: "Yucatán", value: 8 },
                   { name: "Zacatecas", value: 9 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 57 },
                   { name: "Baja California", value: 65 },
                   { name: "Baja California Sur", value: 15 },
                   { name: "Campeche", value: 31 },
                   { name: "Coahuila", value: 56 },
                   { name: "Colima", value: 21 },
                   { name: "Chiapas", value: 211 },
                   { name: "Chihuahua", value: 167 },
                   { name: "Ciudad de México", value: 280 },
                   { name: "Durango", value: 41 },
                   { name: "Guanajuato", value: 292 },
                   { name: "Guerrero", value: 144 },
                   { name: "Hidalgo", value: 158 },
                   { name: "Jalisco", value: 281 },
                   { name: "México", value: 529 },
                   { name: "Michoacán", value: 238 },
                   { name: "Morelos", value: 58 },
                   { name: "Nayarit", value: 35 },
                   { name: "Nuevo León", value: 39 },
                   { name: "Oaxaca", value: 436 },
                   { name: "Puebla", value: 524 },
                   { name: "Querétaro", value: 120 },
                   { name: "Quintana Roo", value: 26 },
                   { name: "San Luis Potosí", value: 156 },
                   { name: "Sinaloa", value: 77 },
                   { name: "Sonora", value: 93 },
                   { name: "Tabasco", value: 58 },
                   { name: "Tamaulipas", value: 45 },
                   { name: "Tlaxcala", value: 53 },
                   { name: "Veracruz", value: 494 },
                   { name: "Yucatán", value: 59 },
                   { name: "Zacatecas", value: 91 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 4373
                }, {
                  name: "Mujeres",
                  value: 570
                }, {
                  name: "Total",
                  value: 4950
                }]
              }]
            }, {
              title: {
                text: "TMent año 2002"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 38 },
                   { name: "Baja California", value: 62 },
                   { name: "Baja California Sur", value: 11 },
                   { name: "Campeche", value: 30 },
                   { name: "Coahuila", value: 71 },
                   { name: "Colima", value: 28 },
                   { name: "Chiapas", value: 206 },
                   { name: "Chihuahua", value: 146 },
                   { name: "Ciudad de México", value: 192 },
                   { name: "Durango", value: 38 },
                   { name: "Guanajuato", value: 264 },
                   { name: "Guerrero", value: 132 },
                   { name: "Hidalgo", value: 55 },
                   { name: "Jalisco", value: 248 },
                   { name: "México", value: 457 },
                   { name: "Michoacán", value: 239 },
                   { name: "Morelos", value: 62 },
                   { name: "Nayarit", value: 36 },
                   { name: "Nuevo León", value: 20 },
                   { name: "Oaxaca", value: 355 },
                   { name: "Puebla", value: 528 },
                   { name: "Querétaro", value: 71 },
                   { name: "Quintana Roo", value: 30 },
                   { name: "San Luis Potosí", value: 111 },
                   { name: "Sinaloa", value: 49 },
                   { name: "Sonora", value: 62 },
                   { name: "Tabasco", value: 47 },
                   { name: "Tamaulipas", value: 43 },
                   { name: "Tlaxcala", value: 37 },
                   { name: "Veracruz", value: 465 },
                   { name: "Yucatán", value: 39 },
                   { name: "Zacatecas", value: 80 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 8 },
                   { name: "Baja California", value: 11 },
                   { name: "Baja California Sur", value: 2 },
                   { name: "Campeche", value: 4 },
                   { name: "Coahuila", value: 2 },
                   { name: "Colima", value: 3 },
                   { name: "Chiapas", value: 21 },
                   { name: "Chihuahua", value: 22 },
                   { name: "Ciudad de México", value: 68 },
                   { name: "Durango", value: 7 },
                   { name: "Guanajuato", value: 27 },
                   { name: "Guerrero", value: 16 },
                   { name: "Hidalgo", value: 13 },
                   { name: "Jalisco", value: 53 },
                   { name: "México", value: 57 },
                   { name: "Michoacán", value: 18 },
                   { name: "Morelos", value: 5 },
                   { name: "Nayarit", value: 4 },
                   { name: "Nuevo León", value: 8 },
                   { name: "Oaxaca", value: 45 },
                   { name: "Puebla", value: 36 },
                   { name: "Querétaro", value: 19 },
                   { name: "Quintana Roo", value: 3 },
                   { name: "San Luis Potosí", value: 20 },
                   { name: "Sinaloa", value: 10 },
                   { name: "Sonora", value: 19 },
                   { name: "Tabasco", value: 5 },
                   { name: "Tamaulipas", value: 3 },
                   { name: "Tlaxcala", value: 8 },
                   { name: "Veracruz", value: 36 },
                   { name: "Yucatán", value: 10 },
                   { name: "Zacatecas", value: 6 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 46 },
                   { name: "Baja California", value: 73 },
                   { name: "Baja California Sur", value: 13 },
                   { name: "Campeche", value: 34 },
                   { name: "Coahuila", value: 73 },
                   { name: "Colima", value: 31 },
                   { name: "Chiapas", value: 227 },
                   { name: "Chihuahua", value: 168 },
                   { name: "Ciudad de México", value: 260 },
                   { name: "Durango", value: 46 },
                   { name: "Guanajuato", value: 291 },
                   { name: "Guerrero", value: 148 },
                   { name: "Hidalgo", value: 68 },
                   { name: "Jalisco", value: 301 },
                   { name: "México", value: 514 },
                   { name: "Michoacán", value: 257 },
                   { name: "Morelos", value: 67 },
                   { name: "Nayarit", value: 40 },
                   { name: "Nuevo León", value: 28 },
                   { name: "Oaxaca", value: 400 },
                   { name: "Puebla", value: 564 },
                   { name: "Querétaro", value: 90 },
                   { name: "Quintana Roo", value: 33 },
                   { name: "San Luis Potosí", value: 131 },
                   { name: "Sinaloa", value: 59 },
                   { name: "Sonora", value: 81 },
                   { name: "Tabasco", value: 52 },
                   { name: "Tamaulipas", value: 46 },
                   { name: "Tlaxcala", value: 45 },
                   { name: "Veracruz", value: 501 },
                   { name: "Yucatán", value: 49 },
                   { name: "Zacatecas", value: 86 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 4252
                }, {
                  name: "Mujeres",
                  value: 569
                }, {
                  name: "Total",
                  value: 4822
                }]
              }]
            }, {
              title: {
                text: "TMent año 2003"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 52 },
                   { name: "Baja California", value: 47 },
                   { name: "Baja California Sur", value: 9 },
                   { name: "Campeche", value: 22 },
                   { name: "Coahuila", value: 49 },
                   { name: "Colima", value: 21 },
                   { name: "Chiapas", value: 190 },
                   { name: "Chihuahua", value: 121 },
                   { name: "Ciudad de México", value: 196 },
                   { name: "Durango", value: 36 },
                   { name: "Guanajuato", value: 183 },
                   { name: "Guerrero", value: 143 },
                   { name: "Hidalgo", value: 180 },
                   { name: "Jalisco", value: 262 },
                   { name: "México", value: 422 },
                   { name: "Michoacán", value: 253 },
                   { name: "Morelos", value: 58 },
                   { name: "Nayarit", value: 31 },
                   { name: "Nuevo León", value: 30 },
                   { name: "Oaxaca", value: 337 },
                   { name: "Puebla", value: 485 },
                   { name: "Querétaro", value: 80 },
                   { name: "Quintana Roo", value: 13 },
                   { name: "San Luis Potosí", value: 134 },
                   { name: "Sinaloa", value: 43 },
                   { name: "Sonora", value: 77 },
                   { name: "Tabasco", value: 55 },
                   { name: "Tamaulipas", value: 40 },
                   { name: "Tlaxcala", value: 39 },
                   { name: "Veracruz", value: 441 },
                   { name: "Yucatán", value: 64 },
                   { name: "Zacatecas", value: 58 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 6 },
                   { name: "Baja California", value: 7 },
                   { name: "Baja California Sur", value: 0 },
                   { name: "Campeche", value: 5 },
                   { name: "Coahuila", value: 11 },
                   { name: "Colima", value: 3 },
                   { name: "Chiapas", value: 7 },
                   { name: "Chihuahua", value: 16 },
                   { name: "Ciudad de México", value: 77 },
                   { name: "Durango", value: 9 },
                   { name: "Guanajuato", value: 39 },
                   { name: "Guerrero", value: 11 },
                   { name: "Hidalgo", value: 39 },
                   { name: "Jalisco", value: 41 },
                   { name: "México", value: 71 },
                   { name: "Michoacán", value: 26 },
                   { name: "Morelos", value: 7 },
                   { name: "Nayarit", value: 5 },
                   { name: "Nuevo León", value: 16 },
                   { name: "Oaxaca", value: 40 },
                   { name: "Puebla", value: 44 },
                   { name: "Querétaro", value: 22 },
                   { name: "Quintana Roo", value: 2 },
                   { name: "San Luis Potosí", value: 19 },
                   { name: "Sinaloa", value: 16 },
                   { name: "Sonora", value: 7 },
                   { name: "Tabasco", value: 2 },
                   { name: "Tamaulipas", value: 6 },
                   { name: "Tlaxcala", value: 7 },
                   { name: "Veracruz", value: 30 },
                   { name: "Yucatán", value: 9 },
                   { name: "Zacatecas", value: 7 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 58 },
                   { name: "Baja California", value: 54 },
                   { name: "Baja California Sur", value: 9 },
                   { name: "Campeche", value: 27 },
                   { name: "Coahuila", value: 60 },
                   { name: "Colima", value: 24 },
                   { name: "Chiapas", value: 197 },
                   { name: "Chihuahua", value: 137 },
                   { name: "Ciudad de México", value: 273 },
                   { name: "Durango", value: 45 },
                   { name: "Guanajuato", value: 222 },
                   { name: "Guerrero", value: 154 },
                   { name: "Hidalgo", value: 219 },
                   { name: "Jalisco", value: 303 },
                   { name: "México", value: 494 },
                   { name: "Michoacán", value: 280 },
                   { name: "Morelos", value: 65 },
                   { name: "Nayarit", value: 36 },
                   { name: "Nuevo León", value: 46 },
                   { name: "Oaxaca", value: 377 },
                   { name: "Puebla", value: 529 },
                   { name: "Querétaro", value: 102 },
                   { name: "Quintana Roo", value: 15 },
                   { name: "San Luis Potosí", value: 153 },
                   { name: "Sinaloa", value: 59 },
                   { name: "Sonora", value: 84 },
                   { name: "Tabasco", value: 58 },
                   { name: "Tamaulipas", value: 46 },
                   { name: "Tlaxcala", value: 46 },
                   { name: "Veracruz", value: 471 },
                   { name: "Yucatán", value: 73 },
                   { name: "Zacatecas", value: 66 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 4171
                }, {
                  name: "Mujeres",
                  value: 607
                }, {
                  name: "Total",
                  value: 4782
                }]
              }]
            }, {
              title: {
                text: "TMent año 2004"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 51 },
                   { name: "Baja California", value: 37 },
                   { name: "Baja California Sur", value: 6 },
                   { name: "Campeche", value: 27 },
                   { name: "Coahuila", value: 48 },
                   { name: "Colima", value: 21 },
                   { name: "Chiapas", value: 162 },
                   { name: "Chihuahua", value: 132 },
                   { name: "Ciudad de México", value: 191 },
                   { name: "Durango", value: 35 },
                   { name: "Guanajuato", value: 185 },
                   { name: "Guerrero", value: 144 },
                   { name: "Hidalgo", value: 41 },
                   { name: "Jalisco", value: 216 },
                   { name: "México", value: 376 },
                   { name: "Michoacán", value: 246 },
                   { name: "Morelos", value: 79 },
                   { name: "Nayarit", value: 25 },
                   { name: "Nuevo León", value: 25 },
                   { name: "Oaxaca", value: 320 },
                   { name: "Puebla", value: 403 },
                   { name: "Querétaro", value: 96 },
                   { name: "Quintana Roo", value: 14 },
                   { name: "San Luis Potosí", value: 107 },
                   { name: "Sinaloa", value: 49 },
                   { name: "Sonora", value: 60 },
                   { name: "Tabasco", value: 50 },
                   { name: "Tamaulipas", value: 61 },
                   { name: "Tlaxcala", value: 43 },
                   { name: "Veracruz", value: 461 },
                   { name: "Yucatán", value: 45 },
                   { name: "Zacatecas", value: 65 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 7 },
                   { name: "Baja California", value: 8 },
                   { name: "Baja California Sur", value: 3 },
                   { name: "Campeche", value: 2 },
                   { name: "Coahuila", value: 4 },
                   { name: "Colima", value: 2 },
                   { name: "Chiapas", value: 11 },
                   { name: "Chihuahua", value: 17 },
                   { name: "Ciudad de México", value: 78 },
                   { name: "Durango", value: 2 },
                   { name: "Guanajuato", value: 29 },
                   { name: "Guerrero", value: 18 },
                   { name: "Hidalgo", value: 5 },
                   { name: "Jalisco", value: 44 },
                   { name: "México", value: 65 },
                   { name: "Michoacán", value: 24 },
                   { name: "Morelos", value: 9 },
                   { name: "Nayarit", value: 5 },
                   { name: "Nuevo León", value: 23 },
                   { name: "Oaxaca", value: 38 },
                   { name: "Puebla", value: 37 },
                   { name: "Querétaro", value: 9 },
                   { name: "Quintana Roo", value: 4 },
                   { name: "San Luis Potosí", value: 18 },
                   { name: "Sinaloa", value: 17 },
                   { name: "Sonora", value: 8 },
                   { name: "Tabasco", value: 5 },
                   { name: "Tamaulipas", value: 9 },
                   { name: "Tlaxcala", value: 1 },
                   { name: "Veracruz", value: 40 },
                   { name: "Yucatán", value: 8 },
                   { name: "Zacatecas", value: 4 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 58 },
                   { name: "Baja California", value: 45 },
                   { name: "Baja California Sur", value: 9 },
                   { name: "Campeche", value: 29 },
                   { name: "Coahuila", value: 52 },
                   { name: "Colima", value: 23 },
                   { name: "Chiapas", value: 174 },
                   { name: "Chihuahua", value: 149 },
                   { name: "Ciudad de México", value: 269 },
                   { name: "Durango", value: 37 },
                   { name: "Guanajuato", value: 214 },
                   { name: "Guerrero", value: 162 },
                   { name: "Hidalgo", value: 46 },
                   { name: "Jalisco", value: 260 },
                   { name: "México", value: 441 },
                   { name: "Michoacán", value: 270 },
                   { name: "Morelos", value: 88 },
                   { name: "Nayarit", value: 30 },
                   { name: "Nuevo León", value: 48 },
                   { name: "Oaxaca", value: 358 },
                   { name: "Puebla", value: 440 },
                   { name: "Querétaro", value: 105 },
                   { name: "Quintana Roo", value: 18 },
                   { name: "San Luis Potosí", value: 125 },
                   { name: "Sinaloa", value: 66 },
                   { name: "Sonora", value: 68 },
                   { name: "Tabasco", value: 55 },
                   { name: "Tamaulipas", value: 70 },
                   { name: "Tlaxcala", value: 44 },
                   { name: "Veracruz", value: 501 },
                   { name: "Yucatán", value: 53 },
                   { name: "Zacatecas", value: 69 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3821
                }, {
                  name: "Mujeres",
                  value: 554
                }, {
                  name: "Total",
                  value: 4376
                }]
              }]
            }, {
              title: {
                text: "TMent año 2005"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 39 },
                   { name: "Baja California", value: 41 },
                   { name: "Baja California Sur", value: 9 },
                   { name: "Campeche", value: 25 },
                   { name: "Coahuila", value: 47 },
                   { name: "Colima", value: 26 },
                   { name: "Chiapas", value: 206 },
                   { name: "Chihuahua", value: 131 },
                   { name: "Ciudad de México", value: 166 },
                   { name: "Durango", value: 32 },
                   { name: "Guanajuato", value: 182 },
                   { name: "Guerrero", value: 112 },
                   { name: "Hidalgo", value: 79 },
                   { name: "Jalisco", value: 256 },
                   { name: "México", value: 399 },
                   { name: "Michoacán", value: 186 },
                   { name: "Morelos", value: 74 },
                   { name: "Nayarit", value: 27 },
                   { name: "Nuevo León", value: 57 },
                   { name: "Oaxaca", value: 301 },
                   { name: "Puebla", value: 379 },
                   { name: "Querétaro", value: 56 },
                   { name: "Quintana Roo", value: 25 },
                   { name: "San Luis Potosí", value: 99 },
                   { name: "Sinaloa", value: 51 },
                   { name: "Sonora", value: 85 },
                   { name: "Tabasco", value: 47 },
                   { name: "Tamaulipas", value: 37 },
                   { name: "Tlaxcala", value: 47 },
                   { name: "Veracruz", value: 478 },
                   { name: "Yucatán", value: 55 },
                   { name: "Zacatecas", value: 73 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 12 },
                   { name: "Baja California", value: 9 },
                   { name: "Baja California Sur", value: 2 },
                   { name: "Campeche", value: 0 },
                   { name: "Coahuila", value: 14 },
                   { name: "Colima", value: 11 },
                   { name: "Chiapas", value: 18 },
                   { name: "Chihuahua", value: 21 },
                   { name: "Ciudad de México", value: 82 },
                   { name: "Durango", value: 4 },
                   { name: "Guanajuato", value: 35 },
                   { name: "Guerrero", value: 12 },
                   { name: "Hidalgo", value: 7 },
                   { name: "Jalisco", value: 63 },
                   { name: "México", value: 73 },
                   { name: "Michoacán", value: 27 },
                   { name: "Morelos", value: 5 },
                   { name: "Nayarit", value: 9 },
                   { name: "Nuevo León", value: 36 },
                   { name: "Oaxaca", value: 33 },
                   { name: "Puebla", value: 44 },
                   { name: "Querétaro", value: 23 },
                   { name: "Quintana Roo", value: 0 },
                   { name: "San Luis Potosí", value: 23 },
                   { name: "Sinaloa", value: 18 },
                   { name: "Sonora", value: 14 },
                   { name: "Tabasco", value: 4 },
                   { name: "Tamaulipas", value: 10 },
                   { name: "Tlaxcala", value: 2 },
                   { name: "Veracruz", value: 39 },
                   { name: "Yucatán", value: 15 },
                   { name: "Zacatecas", value: 6 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 51 },
                   { name: "Baja California", value: 50 },
                   { name: "Baja California Sur", value: 11 },
                   { name: "Campeche", value: 25 },
                   { name: "Coahuila", value: 61 },
                   { name: "Colima", value: 37 },
                   { name: "Chiapas", value: 225 },
                   { name: "Chihuahua", value: 152 },
                   { name: "Ciudad de México", value: 248 },
                   { name: "Durango", value: 36 },
                   { name: "Guanajuato", value: 217 },
                   { name: "Guerrero", value: 124 },
                   { name: "Hidalgo", value: 86 },
                   { name: "Jalisco", value: 319 },
                   { name: "México", value: 472 },
                   { name: "Michoacán", value: 213 },
                   { name: "Morelos", value: 79 },
                   { name: "Nayarit", value: 36 },
                   { name: "Nuevo León", value: 93 },
                   { name: "Oaxaca", value: 334 },
                   { name: "Puebla", value: 423 },
                   { name: "Querétaro", value: 79 },
                   { name: "Quintana Roo", value: 25 },
                   { name: "San Luis Potosí", value: 122 },
                   { name: "Sinaloa", value: 69 },
                   { name: "Sonora", value: 99 },
                   { name: "Tabasco", value: 51 },
                   { name: "Tamaulipas", value: 47 },
                   { name: "Tlaxcala", value: 49 },
                   { name: "Veracruz", value: 517 },
                   { name: "Yucatán", value: 70 },
                   { name: "Zacatecas", value: 79 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3827
                }, {
                  name: "Mujeres",
                  value: 671
                }, {
                  name: "Total",
                  value: 4499
                }]
              }]
            }, {
              title: {
                text: "TMent año 2006"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 36 },
                   { name: "Baja California", value: 32 },
                   { name: "Baja California Sur", value: 13 },
                   { name: "Campeche", value: 24 },
                   { name: "Coahuila", value: 54 },
                   { name: "Colima", value: 16 },
                   { name: "Chiapas", value: 200 },
                   { name: "Chihuahua", value: 110 },
                   { name: "Ciudad de México", value: 183 },
                   { name: "Durango", value: 36 },
                   { name: "Guanajuato", value: 207 },
                   { name: "Guerrero", value: 103 },
                   { name: "Hidalgo", value: 96 },
                   { name: "Jalisco", value: 214 },
                   { name: "México", value: 409 },
                   { name: "Michoacán", value: 195 },
                   { name: "Morelos", value: 65 },
                   { name: "Nayarit", value: 20 },
                   { name: "Nuevo León", value: 50 },
                   { name: "Oaxaca", value: 260 },
                   { name: "Puebla", value: 369 },
                   { name: "Querétaro", value: 64 },
                   { name: "Quintana Roo", value: 19 },
                   { name: "San Luis Potosí", value: 109 },
                   { name: "Sinaloa", value: 51 },
                   { name: "Sonora", value: 71 },
                   { name: "Tabasco", value: 28 },
                   { name: "Tamaulipas", value: 38 },
                   { name: "Tlaxcala", value: 35 },
                   { name: "Veracruz", value: 420 },
                   { name: "Yucatán", value: 50 },
                   { name: "Zacatecas", value: 83 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 10 },
                   { name: "Baja California", value: 14 },
                   { name: "Baja California Sur", value: 7 },
                   { name: "Campeche", value: 5 },
                   { name: "Coahuila", value: 8 },
                   { name: "Colima", value: 3 },
                   { name: "Chiapas", value: 19 },
                   { name: "Chihuahua", value: 15 },
                   { name: "Ciudad de México", value: 87 },
                   { name: "Durango", value: 10 },
                   { name: "Guanajuato", value: 27 },
                   { name: "Guerrero", value: 13 },
                   { name: "Hidalgo", value: 13 },
                   { name: "Jalisco", value: 66 },
                   { name: "México", value: 72 },
                   { name: "Michoacán", value: 24 },
                   { name: "Morelos", value: 10 },
                   { name: "Nayarit", value: 0 },
                   { name: "Nuevo León", value: 35 },
                   { name: "Oaxaca", value: 39 },
                   { name: "Puebla", value: 21 },
                   { name: "Querétaro", value: 26 },
                   { name: "Quintana Roo", value: 3 },
                   { name: "San Luis Potosí", value: 20 },
                   { name: "Sinaloa", value: 28 },
                   { name: "Sonora", value: 16 },
                   { name: "Tabasco", value: 3 },
                   { name: "Tamaulipas", value: 10 },
                   { name: "Tlaxcala", value: 3 },
                   { name: "Veracruz", value: 24 },
                   { name: "Yucatán", value: 16 },
                   { name: "Zacatecas", value: 10 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 46 },
                   { name: "Baja California", value: 46 },
                   { name: "Baja California Sur", value: 20 },
                   { name: "Campeche", value: 29 },
                   { name: "Coahuila", value: 62 },
                   { name: "Colima", value: 19 },
                   { name: "Chiapas", value: 219 },
                   { name: "Chihuahua", value: 125 },
                   { name: "Ciudad de México", value: 270 },
                   { name: "Durango", value: 46 },
                   { name: "Guanajuato", value: 234 },
                   { name: "Guerrero", value: 116 },
                   { name: "Hidalgo", value: 109 },
                   { name: "Jalisco", value: 280 },
                   { name: "México", value: 481 },
                   { name: "Michoacán", value: 219 },
                   { name: "Morelos", value: 75 },
                   { name: "Nayarit", value: 20 },
                   { name: "Nuevo León", value: 85 },
                   { name: "Oaxaca", value: 299 },
                   { name: "Puebla", value: 390 },
                   { name: "Querétaro", value: 90 },
                   { name: "Quintana Roo", value: 22 },
                   { name: "San Luis Potosí", value: 129 },
                   { name: "Sinaloa", value: 79 },
                   { name: "Sonora", value: 87 },
                   { name: "Tabasco", value: 31 },
                   { name: "Tamaulipas", value: 48 },
                   { name: "Tlaxcala", value: 38 },
                   { name: "Veracruz", value: 444 },
                   { name: "Yucatán", value: 66 },
                   { name: "Zacatecas", value: 94 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3660
                }, {
                  name: "Mujeres",
                  value: 657
                }, {
                  name: "Total",
                  value: 4318
                }]
              }]
            }, {
              title: {
                text: "TMent año 2007"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 50 },
                   { name: "Baja California", value: 39 },
                   { name: "Baja California Sur", value: 10 },
                   { name: "Campeche", value: 17 },
                   { name: "Coahuila", value: 37 },
                   { name: "Colima", value: 13 },
                   { name: "Chiapas", value: 207 },
                   { name: "Chihuahua", value: 85 },
                   { name: "Ciudad de México", value: 181 },
                   { name: "Durango", value: 36 },
                   { name: "Guanajuato", value: 156 },
                   { name: "Guerrero", value: 84 },
                   { name: "Hidalgo", value: 85 },
                   { name: "Jalisco", value: 201 },
                   { name: "México", value: 305 },
                   { name: "Michoacán", value: 182 },
                   { name: "Morelos", value: 64 },
                   { name: "Nayarit", value: 24 },
                   { name: "Nuevo León", value: 51 },
                   { name: "Oaxaca", value: 254 },
                   { name: "Puebla", value: 314 },
                   { name: "Querétaro", value: 71 },
                   { name: "Quintana Roo", value: 25 },
                   { name: "San Luis Potosí", value: 93 },
                   { name: "Sinaloa", value: 44 },
                   { name: "Sonora", value: 78 },
                   { name: "Tabasco", value: 16 },
                   { name: "Tamaulipas", value: 23 },
                   { name: "Tlaxcala", value: 38 },
                   { name: "Veracruz", value: 337 },
                   { name: "Yucatán", value: 46 },
                   { name: "Zacatecas", value: 37 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 9 },
                   { name: "Baja California", value: 27 },
                   { name: "Baja California Sur", value: 8 },
                   { name: "Campeche", value: 5 },
                   { name: "Coahuila", value: 15 },
                   { name: "Colima", value: 8 },
                   { name: "Chiapas", value: 22 },
                   { name: "Chihuahua", value: 26 },
                   { name: "Ciudad de México", value: 90 },
                   { name: "Durango", value: 8 },
                   { name: "Guanajuato", value: 40 },
                   { name: "Guerrero", value: 21 },
                   { name: "Hidalgo", value: 19 },
                   { name: "Jalisco", value: 86 },
                   { name: "México", value: 90 },
                   { name: "Michoacán", value: 30 },
                   { name: "Morelos", value: 19 },
                   { name: "Nayarit", value: 6 },
                   { name: "Nuevo León", value: 43 },
                   { name: "Oaxaca", value: 46 },
                   { name: "Puebla", value: 41 },
                   { name: "Querétaro", value: 19 },
                   { name: "Quintana Roo", value: 3 },
                   { name: "San Luis Potosí", value: 18 },
                   { name: "Sinaloa", value: 24 },
                   { name: "Sonora", value: 15 },
                   { name: "Tabasco", value: 6 },
                   { name: "Tamaulipas", value: 5 },
                   { name: "Tlaxcala", value: 9 },
                   { name: "Veracruz", value: 60 },
                   { name: "Yucatán", value: 22 },
                   { name: "Zacatecas", value: 9 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 59 },
                   { name: "Baja California", value: 66 },
                   { name: "Baja California Sur", value: 18 },
                   { name: "Campeche", value: 22 },
                   { name: "Coahuila", value: 52 },
                   { name: "Colima", value: 21 },
                   { name: "Chiapas", value: 229 },
                   { name: "Chihuahua", value: 111 },
                   { name: "Ciudad de México", value: 271 },
                   { name: "Durango", value: 44 },
                   { name: "Guanajuato", value: 196 },
                   { name: "Guerrero", value: 105 },
                   { name: "Hidalgo", value: 104 },
                   { name: "Jalisco", value: 287 },
                   { name: "México", value: 395 },
                   { name: "Michoacán", value: 212 },
                   { name: "Morelos", value: 83 },
                   { name: "Nayarit", value: 30 },
                   { name: "Nuevo León", value: 94 },
                   { name: "Oaxaca", value: 301 },
                   { name: "Puebla", value: 355 },
                   { name: "Querétaro", value: 90 },
                   { name: "Quintana Roo", value: 28 },
                   { name: "San Luis Potosí", value: 111 },
                   { name: "Sinaloa", value: 68 },
                   { name: "Sonora", value: 93 },
                   { name: "Tabasco", value: 22 },
                   { name: "Tamaulipas", value: 28 },
                   { name: "Tlaxcala", value: 47 },
                   { name: "Veracruz", value: 397 },
                   { name: "Yucatán", value: 68 },
                   { name: "Zacatecas", value: 46 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3203
                }, {
                  name: "Mujeres",
                  value: 849
                }, {
                  name: "Total",
                  value: 4053
                }]
              }]
            }, {
              title: {
                text: "TMent año 2008"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 40 },
                   { name: "Baja California", value: 51 },
                   { name: "Baja California Sur", value: 11 },
                   { name: "Campeche", value: 11 },
                   { name: "Coahuila", value: 44 },
                   { name: "Colima", value: 15 },
                   { name: "Chiapas", value: 197 },
                   { name: "Chihuahua", value: 132 },
                   { name: "Ciudad de México", value: 167 },
                   { name: "Durango", value: 26 },
                   { name: "Guanajuato", value: 150 },
                   { name: "Guerrero", value: 91 },
                   { name: "Hidalgo", value: 82 },
                   { name: "Jalisco", value: 198 },
                   { name: "México", value: 297 },
                   { name: "Michoacán", value: 162 },
                   { name: "Morelos", value: 41 },
                   { name: "Nayarit", value: 31 },
                   { name: "Nuevo León", value: 34 },
                   { name: "Oaxaca", value: 303 },
                   { name: "Puebla", value: 278 },
                   { name: "Querétaro", value: 74 },
                   { name: "Quintana Roo", value: 21 },
                   { name: "San Luis Potosí", value: 96 },
                   { name: "Sinaloa", value: 39 },
                   { name: "Sonora", value: 57 },
                   { name: "Tabasco", value: 28 },
                   { name: "Tamaulipas", value: 22 },
                   { name: "Tlaxcala", value: 41 },
                   { name: "Veracruz", value: 319 },
                   { name: "Yucatán", value: 44 },
                   { name: "Zacatecas", value: 26 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 10 },
                   { name: "Baja California", value: 20 },
                   { name: "Baja California Sur", value: 4 },
                   { name: "Campeche", value: 8 },
                   { name: "Coahuila", value: 15 },
                   { name: "Colima", value: 2 },
                   { name: "Chiapas", value: 25 },
                   { name: "Chihuahua", value: 21 },
                   { name: "Ciudad de México", value: 90 },
                   { name: "Durango", value: 14 },
                   { name: "Guanajuato", value: 34 },
                   { name: "Guerrero", value: 7 },
                   { name: "Hidalgo", value: 20 },
                   { name: "Jalisco", value: 94 },
                   { name: "México", value: 101 },
                   { name: "Michoacán", value: 34 },
                   { name: "Morelos", value: 18 },
                   { name: "Nayarit", value: 13 },
                   { name: "Nuevo León", value: 41 },
                   { name: "Oaxaca", value: 44 },
                   { name: "Puebla", value: 44 },
                   { name: "Querétaro", value: 22 },
                   { name: "Quintana Roo", value: 7 },
                   { name: "San Luis Potosí", value: 23 },
                   { name: "Sinaloa", value: 37 },
                   { name: "Sonora", value: 25 },
                   { name: "Tabasco", value: 12 },
                   { name: "Tamaulipas", value: 15 },
                   { name: "Tlaxcala", value: 12 },
                   { name: "Veracruz", value: 59 },
                   { name: "Yucatán", value: 17 },
                   { name: "Zacatecas", value: 14 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 50 },
                   { name: "Baja California", value: 71 },
                   { name: "Baja California Sur", value: 15 },
                   { name: "Campeche", value: 19 },
                   { name: "Coahuila", value: 59 },
                   { name: "Colima", value: 17 },
                   { name: "Chiapas", value: 222 },
                   { name: "Chihuahua", value: 153 },
                   { name: "Ciudad de México", value: 257 },
                   { name: "Durango", value: 40 },
                   { name: "Guanajuato", value: 184 },
                   { name: "Guerrero", value: 98 },
                   { name: "Hidalgo", value: 102 },
                   { name: "Jalisco", value: 293 },
                   { name: "México", value: 398 },
                   { name: "Michoacán", value: 196 },
                   { name: "Morelos", value: 59 },
                   { name: "Nayarit", value: 44 },
                   { name: "Nuevo León", value: 75 },
                   { name: "Oaxaca", value: 347 },
                   { name: "Puebla", value: 322 },
                   { name: "Querétaro", value: 96 },
                   { name: "Quintana Roo", value: 28 },
                   { name: "San Luis Potosí", value: 119 },
                   { name: "Sinaloa", value: 76 },
                   { name: "Sonora", value: 82 },
                   { name: "Tabasco", value: 40 },
                   { name: "Tamaulipas", value: 37 },
                   { name: "Tlaxcala", value: 53 },
                   { name: "Veracruz", value: 378 },
                   { name: "Yucatán", value: 61 },
                   { name: "Zacatecas", value: 40 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3128
                }, {
                  name: "Mujeres",
                  value: 902
                }, {
                  name: "Total",
                  value: 4031
                }]
              }]
            }, {
              title: {
                text: "TMent año 2009"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 39 },
                   { name: "Baja California", value: 43 },
                   { name: "Baja California Sur", value: 7 },
                   { name: "Campeche", value: 18 },
                   { name: "Coahuila", value: 32 },
                   { name: "Colima", value: 20 },
                   { name: "Chiapas", value: 207 },
                   { name: "Chihuahua", value: 119 },
                   { name: "Ciudad de México", value: 152 },
                   { name: "Durango", value: 27 },
                   { name: "Guanajuato", value: 196 },
                   { name: "Guerrero", value: 106 },
                   { name: "Hidalgo", value: 73 },
                   { name: "Jalisco", value: 187 },
                   { name: "México", value: 348 },
                   { name: "Michoacán", value: 200 },
                   { name: "Morelos", value: 46 },
                   { name: "Nayarit", value: 21 },
                   { name: "Nuevo León", value: 50 },
                   { name: "Oaxaca", value: 246 },
                   { name: "Puebla", value: 245 },
                   { name: "Querétaro", value: 71 },
                   { name: "Quintana Roo", value: 21 },
                   { name: "San Luis Potosí", value: 108 },
                   { name: "Sinaloa", value: 40 },
                   { name: "Sonora", value: 73 },
                   { name: "Tabasco", value: 43 },
                   { name: "Tamaulipas", value: 31 },
                   { name: "Tlaxcala", value: 38 },
                   { name: "Veracruz", value: 317 },
                   { name: "Yucatán", value: 51 },
                   { name: "Zacatecas", value: 53 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 12 },
                   { name: "Baja California", value: 17 },
                   { name: "Baja California Sur", value: 1 },
                   { name: "Campeche", value: 7 },
                   { name: "Coahuila", value: 14 },
                   { name: "Colima", value: 4 },
                   { name: "Chiapas", value: 35 },
                   { name: "Chihuahua", value: 16 },
                   { name: "Ciudad de México", value: 97 },
                   { name: "Durango", value: 13 },
                   { name: "Guanajuato", value: 43 },
                   { name: "Guerrero", value: 20 },
                   { name: "Hidalgo", value: 23 },
                   { name: "Jalisco", value: 97 },
                   { name: "México", value: 101 },
                   { name: "Michoacán", value: 44 },
                   { name: "Morelos", value: 19 },
                   { name: "Nayarit", value: 5 },
                   { name: "Nuevo León", value: 48 },
                   { name: "Oaxaca", value: 41 },
                   { name: "Puebla", value: 61 },
                   { name: "Querétaro", value: 19 },
                   { name: "Quintana Roo", value: 4 },
                   { name: "San Luis Potosí", value: 29 },
                   { name: "Sinaloa", value: 20 },
                   { name: "Sonora", value: 27 },
                   { name: "Tabasco", value: 7 },
                   { name: "Tamaulipas", value: 18 },
                   { name: "Tlaxcala", value: 11 },
                   { name: "Veracruz", value: 84 },
                   { name: "Yucatán", value: 15 },
                   { name: "Zacatecas", value: 12 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 51 },
                   { name: "Baja California", value: 60 },
                   { name: "Baja California Sur", value: 8 },
                   { name: "Campeche", value: 25 },
                   { name: "Coahuila", value: 46 },
                   { name: "Colima", value: 24 },
                   { name: "Chiapas", value: 242 },
                   { name: "Chihuahua", value: 135 },
                   { name: "Ciudad de México", value: 249 },
                   { name: "Durango", value: 40 },
                   { name: "Guanajuato", value: 239 },
                   { name: "Guerrero", value: 126 },
                   { name: "Hidalgo", value: 96 },
                   { name: "Jalisco", value: 284 },
                   { name: "México", value: 449 },
                   { name: "Michoacán", value: 244 },
                   { name: "Morelos", value: 65 },
                   { name: "Nayarit", value: 26 },
                   { name: "Nuevo León", value: 98 },
                   { name: "Oaxaca", value: 287 },
                   { name: "Puebla", value: 306 },
                   { name: "Querétaro", value: 90 },
                   { name: "Quintana Roo", value: 25 },
                   { name: "San Luis Potosí", value: 137 },
                   { name: "Sinaloa", value: 60 },
                   { name: "Sonora", value: 100 },
                   { name: "Tabasco", value: 50 },
                   { name: "Tamaulipas", value: 49 },
                   { name: "Tlaxcala", value: 49 },
                   { name: "Veracruz", value: 401 },
                   { name: "Yucatán", value: 66 },
                   { name: "Zacatecas", value: 65 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3228
                }, {
                  name: "Mujeres",
                  value: 964
                }, {
                  name: "Total",
                  value: 4192
                }]
              }]
            }, {
              title: {
                text: "TMent año 2010"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 42 },
                   { name: "Baja California", value: 35 },
                   { name: "Baja California Sur", value: 11 },
                   { name: "Campeche", value: 24 },
                   { name: "Coahuila", value: 46 },
                   { name: "Colima", value: 18 },
                   { name: "Chiapas", value: 224 },
                   { name: "Chihuahua", value: 93 },
                   { name: "Ciudad de México", value: 156 },
                   { name: "Durango", value: 24 },
                   { name: "Guanajuato", value: 180 },
                   { name: "Guerrero", value: 90 },
                   { name: "Hidalgo", value: 111 },
                   { name: "Jalisco", value: 213 },
                   { name: "México", value: 332 },
                   { name: "Michoacán", value: 187 },
                   { name: "Morelos", value: 64 },
                   { name: "Nayarit", value: 15 },
                   { name: "Nuevo León", value: 44 },
                   { name: "Oaxaca", value: 282 },
                   { name: "Puebla", value: 264 },
                   { name: "Querétaro", value: 98 },
                   { name: "Quintana Roo", value: 15 },
                   { name: "San Luis Potosí", value: 99 },
                   { name: "Sinaloa", value: 39 },
                   { name: "Sonora", value: 54 },
                   { name: "Tabasco", value: 48 },
                   { name: "Tamaulipas", value: 36 },
                   { name: "Tlaxcala", value: 27 },
                   { name: "Veracruz", value: 344 },
                   { name: "Yucatán", value: 50 },
                   { name: "Zacatecas", value: 40 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 15 },
                   { name: "Baja California", value: 27 },
                   { name: "Baja California Sur", value: 9 },
                   { name: "Campeche", value: 6 },
                   { name: "Coahuila", value: 28 },
                   { name: "Colima", value: 2 },
                   { name: "Chiapas", value: 36 },
                   { name: "Chihuahua", value: 35 },
                   { name: "Ciudad de México", value: 109 },
                   { name: "Durango", value: 18 },
                   { name: "Guanajuato", value: 52 },
                   { name: "Guerrero", value: 23 },
                   { name: "Hidalgo", value: 18 },
                   { name: "Jalisco", value: 126 },
                   { name: "México", value: 94 },
                   { name: "Michoacán", value: 38 },
                   { name: "Morelos", value: 23 },
                   { name: "Nayarit", value: 8 },
                   { name: "Nuevo León", value: 50 },
                   { name: "Oaxaca", value: 57 },
                   { name: "Puebla", value: 61 },
                   { name: "Querétaro", value: 15 },
                   { name: "Quintana Roo", value: 8 },
                   { name: "San Luis Potosí", value: 25 },
                   { name: "Sinaloa", value: 24 },
                   { name: "Sonora", value: 29 },
                   { name: "Tabasco", value: 16 },
                   { name: "Tamaulipas", value: 22 },
                   { name: "Tlaxcala", value: 9 },
                   { name: "Veracruz", value: 71 },
                   { name: "Yucatán", value: 27 },
                   { name: "Zacatecas", value: 10 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 57 },
                   { name: "Baja California", value: 62 },
                   { name: "Baja California Sur", value: 20 },
                   { name: "Campeche", value: 30 },
                   { name: "Coahuila", value: 74 },
                   { name: "Colima", value: 20 },
                   { name: "Chiapas", value: 260 },
                   { name: "Chihuahua", value: 129 },
                   { name: "Ciudad de México", value: 265 },
                   { name: "Durango", value: 42 },
                   { name: "Guanajuato", value: 232 },
                   { name: "Guerrero", value: 113 },
                   { name: "Hidalgo", value: 129 },
                   { name: "Jalisco", value: 339 },
                   { name: "México", value: 426 },
                   { name: "Michoacán", value: 225 },
                   { name: "Morelos", value: 87 },
                   { name: "Nayarit", value: 23 },
                   { name: "Nuevo León", value: 94 },
                   { name: "Oaxaca", value: 339 },
                   { name: "Puebla", value: 325 },
                   { name: "Querétaro", value: 113 },
                   { name: "Quintana Roo", value: 23 },
                   { name: "San Luis Potosí", value: 124 },
                   { name: "Sinaloa", value: 63 },
                   { name: "Sonora", value: 83 },
                   { name: "Tabasco", value: 64 },
                   { name: "Tamaulipas", value: 58 },
                   { name: "Tlaxcala", value: 36 },
                   { name: "Veracruz", value: 416 },
                   { name: "Yucatán", value: 77 },
                   { name: "Zacatecas", value: 50 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3305
                }, {
                  name: "Mujeres",
                  value: 1091
                }, {
                  name: "Total",
                  value: 4398
                }]
              }]
            }, {
              title: {
                text: "TMent año 2011"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 37 },
                   { name: "Baja California", value: 51 },
                   { name: "Baja California Sur", value: 7 },
                   { name: "Campeche", value: 21 },
                   { name: "Coahuila", value: 35 },
                   { name: "Colima", value: 18 },
                   { name: "Chiapas", value: 141 },
                   { name: "Chihuahua", value: 93 },
                   { name: "Ciudad de México", value: 195 },
                   { name: "Durango", value: 30 },
                   { name: "Guanajuato", value: 162 },
                   { name: "Guerrero", value: 80 },
                   { name: "Hidalgo", value: 76 },
                   { name: "Jalisco", value: 250 },
                   { name: "México", value: 326 },
                   { name: "Michoacán", value: 167 },
                   { name: "Morelos", value: 56 },
                   { name: "Nayarit", value: 10 },
                   { name: "Nuevo León", value: 56 },
                   { name: "Oaxaca", value: 265 },
                   { name: "Puebla", value: 224 },
                   { name: "Querétaro", value: 67 },
                   { name: "Quintana Roo", value: 23 },
                   { name: "San Luis Potosí", value: 103 },
                   { name: "Sinaloa", value: 45 },
                   { name: "Sonora", value: 66 },
                   { name: "Tabasco", value: 51 },
                   { name: "Tamaulipas", value: 33 },
                   { name: "Tlaxcala", value: 38 },
                   { name: "Veracruz", value: 353 },
                   { name: "Yucatán", value: 55 },
                   { name: "Zacatecas", value: 48 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 7 },
                   { name: "Baja California", value: 24 },
                   { name: "Baja California Sur", value: 9 },
                   { name: "Campeche", value: 7 },
                   { name: "Coahuila", value: 17 },
                   { name: "Colima", value: 8 },
                   { name: "Chiapas", value: 27 },
                   { name: "Chihuahua", value: 32 },
                   { name: "Ciudad de México", value: 78 },
                   { name: "Durango", value: 8 },
                   { name: "Guanajuato", value: 42 },
                   { name: "Guerrero", value: 17 },
                   { name: "Hidalgo", value: 17 },
                   { name: "Jalisco", value: 107 },
                   { name: "México", value: 87 },
                   { name: "Michoacán", value: 38 },
                   { name: "Morelos", value: 21 },
                   { name: "Nayarit", value: 7 },
                   { name: "Nuevo León", value: 59 },
                   { name: "Oaxaca", value: 45 },
                   { name: "Puebla", value: 57 },
                   { name: "Querétaro", value: 18 },
                   { name: "Quintana Roo", value: 6 },
                   { name: "San Luis Potosí", value: 38 },
                   { name: "Sinaloa", value: 26 },
                   { name: "Sonora", value: 28 },
                   { name: "Tabasco", value: 12 },
                   { name: "Tamaulipas", value: 21 },
                   { name: "Tlaxcala", value: 8 },
                   { name: "Veracruz", value: 85 },
                   { name: "Yucatán", value: 24 },
                   { name: "Zacatecas", value: 13 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 45 },
                   { name: "Baja California", value: 75 },
                   { name: "Baja California Sur", value: 16 },
                   { name: "Campeche", value: 28 },
                   { name: "Coahuila", value: 52 },
                   { name: "Colima", value: 26 },
                   { name: "Chiapas", value: 168 },
                   { name: "Chihuahua", value: 125 },
                   { name: "Ciudad de México", value: 273 },
                   { name: "Durango", value: 38 },
                   { name: "Guanajuato", value: 204 },
                   { name: "Guerrero", value: 97 },
                   { name: "Hidalgo", value: 93 },
                   { name: "Jalisco", value: 357 },
                   { name: "México", value: 413 },
                   { name: "Michoacán", value: 205 },
                   { name: "Morelos", value: 77 },
                   { name: "Nayarit", value: 17 },
                   { name: "Nuevo León", value: 115 },
                   { name: "Oaxaca", value: 310 },
                   { name: "Puebla", value: 281 },
                   { name: "Querétaro", value: 85 },
                   { name: "Quintana Roo", value: 29 },
                   { name: "San Luis Potosí", value: 142 },
                   { name: "Sinaloa", value: 71 },
                   { name: "Sonora", value: 94 },
                   { name: "Tabasco", value: 63 },
                   { name: "Tamaulipas", value: 54 },
                   { name: "Tlaxcala", value: 46 },
                   { name: "Veracruz", value: 438 },
                   { name: "Yucatán", value: 79 },
                   { name: "Zacatecas", value: 61 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3182
                }, {
                  name: "Mujeres",
                  value: 993
                }, {
                  name: "Total",
                  value: 4177
                }]
              }]
            }, {
              title: {
                text: "TMent año 2012"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 41 },
                   { name: "Baja California", value: 37 },
                   { name: "Baja California Sur", value: 11 },
                   { name: "Campeche", value: 12 },
                   { name: "Coahuila", value: 29 },
                   { name: "Colima", value: 19 },
                   { name: "Chiapas", value: 137 },
                   { name: "Chihuahua", value: 114 },
                   { name: "Ciudad de México", value: 196 },
                   { name: "Durango", value: 27 },
                   { name: "Guanajuato", value: 195 },
                   { name: "Guerrero", value: 65 },
                   { name: "Hidalgo", value: 72 },
                   { name: "Jalisco", value: 215 },
                   { name: "México", value: 332 },
                   { name: "Michoacán", value: 172 },
                   { name: "Morelos", value: 56 },
                   { name: "Nayarit", value: 17 },
                   { name: "Nuevo León", value: 48 },
                   { name: "Oaxaca", value: 220 },
                   { name: "Puebla", value: 190 },
                   { name: "Querétaro", value: 61 },
                   { name: "Quintana Roo", value: 20 },
                   { name: "San Luis Potosí", value: 108 },
                   { name: "Sinaloa", value: 34 },
                   { name: "Sonora", value: 61 },
                   { name: "Tabasco", value: 56 },
                   { name: "Tamaulipas", value: 29 },
                   { name: "Tlaxcala", value: 28 },
                   { name: "Veracruz", value: 319 },
                   { name: "Yucatán", value: 58 },
                   { name: "Zacatecas", value: 39 }
                ]
              }, {
                data: [
                    { name: "Aguascalientes", value: 11 },
                   { name: "Baja California", value: 22 },
                   { name: "Baja California Sur", value: 6 },
                   { name: "Campeche", value: 4 },
                   { name: "Coahuila", value: 15 },
                   { name: "Colima", value: 3 },
                   { name: "Chiapas", value: 18 },
                   { name: "Chihuahua", value: 38 },
                   { name: "Ciudad de México", value: 78 },
                   { name: "Durango", value: 18 },
                   { name: "Guanajuato", value: 56 },
                   { name: "Guerrero", value: 16 },
                   { name: "Hidalgo", value: 19 },
                   { name: "Jalisco", value: 93 },
                   { name: "México", value: 95 },
                   { name: "Michoacán", value: 31 },
                   { name: "Morelos", value: 33 },
                   { name: "Nayarit", value: 7 },
                   { name: "Nuevo León", value: 87 },
                   { name: "Oaxaca", value: 55 },
                   { name: "Puebla", value: 47 },
                   { name: "Querétaro", value: 18 },
                   { name: "Quintana Roo", value: 21 },
                   { name: "San Luis Potosí", value: 31 },
                   { name: "Sinaloa", value: 29 },
                   { name: "Sonora", value: 25 },
                   { name: "Tabasco", value: 9 },
                   { name: "Tamaulipas", value: 19 },
                   { name: "Tlaxcala", value: 9 },
                   { name: "Veracruz", value: 91 },
                   { name: "Yucatán", value: 29 },
                   { name: "Zacatecas", value: 10 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 52 },
                   { name: "Baja California", value: 59 },
                   { name: "Baja California Sur", value: 17 },
                   { name: "Campeche", value: 16 },
                   { name: "Coahuila", value: 44 },
                   { name: "Colima", value: 22 },
                   { name: "Chiapas", value: 155 },
                   { name: "Chihuahua", value: 152 },
                   { name: "Ciudad de México", value: 274 },
                   { name: "Durango", value: 45 },
                   { name: "Guanajuato", value: 251 },
                   { name: "Guerrero", value: 81 },
                   { name: "Hidalgo", value: 91 },
                   { name: "Jalisco", value: 308 },
                   { name: "México", value: 427 },
                   { name: "Michoacán", value: 203 },
                   { name: "Morelos", value: 89 },
                   { name: "Nayarit", value: 24 },
                   { name: "Nuevo León", value: 135 },
                   { name: "Oaxaca", value: 275 },
                   { name: "Puebla", value: 237 },
                   { name: "Querétaro", value: 79 },
                   { name: "Quintana Roo", value: 41 },
                   { name: "San Luis Potosí", value: 139 },
                   { name: "Sinaloa", value: 63 },
                   { name: "Sonora", value: 86 },
                   { name: "Tabasco", value: 65 },
                   { name: "Tamaulipas", value: 48 },
                   { name: "Tlaxcala", value: 37 },
                   { name: "Veracruz", value: 410 },
                   { name: "Yucatán", value: 87 },
                   { name: "Zacatecas", value: 49 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3018
                }, {
                  name: "Mujeres",
                  value: 1043
                }, {
                  name: "Total",
                  value: 4061
                }]
              }]
            }, {
              title: {
                text: "TMent año 2013"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 51 },
                   { name: "Baja California", value: 45 },
                   { name: "Baja California Sur", value: 3 },
                   { name: "Campeche", value: 16 },
                   { name: "Coahuila", value: 52 },
                   { name: "Colima", value: 29 },
                   { name: "Chiapas", value: 167 },
                   { name: "Chihuahua", value: 104 },
                   { name: "Ciudad de México", value: 228 },
                   { name: "Durango", value: 23 },
                   { name: "Guanajuato", value: 178 },
                   { name: "Guerrero", value: 79 },
                   { name: "Hidalgo", value: 65 },
                   { name: "Jalisco", value: 228 },
                   { name: "México", value: 358 },
                   { name: "Michoacán", value: 168 },
                   { name: "Morelos", value: 79 },
                   { name: "Nayarit", value: 18 },
                   { name: "Nuevo León", value: 51 },
                   { name: "Oaxaca", value: 240 },
                   { name: "Puebla", value: 237 },
                   { name: "Querétaro", value: 64 },
                   { name: "Quintana Roo", value: 26 },
                   { name: "San Luis Potosí", value: 105 },
                   { name: "Sinaloa", value: 30 },
                   { name: "Sonora", value: 54 },
                   { name: "Tabasco", value: 38 },
                   { name: "Tamaulipas", value: 36 },
                   { name: "Tlaxcala", value: 38 },
                   { name: "Veracruz", value: 336 },
                   { name: "Yucatán", value: 60 },
                   { name: "Zacatecas", value: 41 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 10 },
                   { name: "Baja California", value: 38 },
                   { name: "Baja California Sur", value: 8 },
                   { name: "Campeche", value: 10 },
                   { name: "Coahuila", value: 18 },
                   { name: "Colima", value: 3 },
                   { name: "Chiapas", value: 32 },
                   { name: "Chihuahua", value: 29 },
                   { name: "Ciudad de México", value: 95 },
                   { name: "Durango", value: 16 },
                   { name: "Guanajuato", value: 56 },
                   { name: "Guerrero", value: 35 },
                   { name: "Hidalgo", value: 15 },
                   { name: "Jalisco", value: 89 },
                   { name: "México", value: 88 },
                   { name: "Michoacán", value: 44 },
                   { name: "Morelos", value: 37 },
                   { name: "Nayarit", value: 10 },
                   { name: "Nuevo León", value: 74 },
                   { name: "Oaxaca", value: 63 },
                   { name: "Puebla", value: 55 },
                   { name: "Querétaro", value: 23 },
                   { name: "Quintana Roo", value: 6 },
                   { name: "San Luis Potosí", value: 39 },
                   { name: "Sinaloa", value: 32 },
                   { name: "Sonora", value: 26 },
                   { name: "Tabasco", value: 20 },
                   { name: "Tamaulipas", value: 27 },
                   { name: "Tlaxcala", value: 8 },
                   { name: "Veracruz", value: 92 },
                   { name: "Yucatán", value: 25 },
                   { name: "Zacatecas", value: 15 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 61 },
                   { name: "Baja California", value: 83 },
                   { name: "Baja California Sur", value: 11 },
                   { name: "Campeche", value: 26 },
                   { name: "Coahuila", value: 70 },
                   { name: "Colima", value: 32 },
                   { name: "Chiapas", value: 199 },
                   { name: "Chihuahua", value: 133 },
                   { name: "Ciudad de México", value: 323 },
                   { name: "Durango", value: 39 },
                   { name: "Guanajuato", value: 234 },
                   { name: "Guerrero", value: 114 },
                   { name: "Hidalgo", value: 80 },
                   { name: "Jalisco", value: 317 },
                   { name: "México", value: 446 },
                   { name: "Michoacán", value: 212 },
                   { name: "Morelos", value: 116 },
                   { name: "Nayarit", value: 28 },
                   { name: "Nuevo León", value: 125 },
                   { name: "Oaxaca", value: 303 },
                   { name: "Puebla", value: 292 },
                   { name: "Querétaro", value: 87 },
                   { name: "Quintana Roo", value: 32 },
                   { name: "San Luis Potosí", value: 144 },
                   { name: "Sinaloa", value: 62 },
                   { name: "Sonora", value: 80 },
                   { name: "Tabasco", value: 58 },
                   { name: "Tamaulipas", value: 63 },
                   { name: "Tlaxcala", value: 46 },
                   { name: "Veracruz", value: 428 },
                   { name: "Yucatán", value: 85 },
                   { name: "Zacatecas", value: 56 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3247
                }, {
                  name: "Mujeres",
                  value: 1138
                }, {
                  name: "Total",
                  value: 4385
                }]
              }]
            }, {
              title: {
                text: "TMent año 2014"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 51 },
                   { name: "Baja California", value: 51 },
                   { name: "Baja California Sur", value: 8 },
                   { name: "Campeche", value: 25 },
                   { name: "Coahuila", value: 53 },
                   { name: "Colima", value: 29 },
                   { name: "Chiapas", value: 185 },
                   { name: "Chihuahua", value: 85 },
                   { name: "Ciudad de México", value: 387 },
                   { name: "Durango", value: 25 },
                   { name: "Guanajuato", value: 175 },
                   { name: "Guerrero", value: 104 },
                   { name: "Hidalgo", value: 95 },
                   { name: "Jalisco", value: 260 },
                   { name: "México", value: 622 },
                   { name: "Michoacán", value: 174 },
                   { name: "Morelos", value: 65 },
                   { name: "Nayarit", value: 26 },
                   { name: "Nuevo León", value: 56 },
                   { name: "Oaxaca", value: 299 },
                   { name: "Puebla", value: 323 },
                   { name: "Querétaro", value: 82 },
                   { name: "Quintana Roo", value: 26 },
                   { name: "San Luis Potosí", value: 115 },
                   { name: "Sinaloa", value: 45 },
                   { name: "Sonora", value: 72 },
                   { name: "Tabasco", value: 42 },
                   { name: "Tamaulipas", value: 38 },
                   { name: "Tlaxcala", value: 49 },
                   { name: "Veracruz", value: 422 },
                   { name: "Yucatán", value: 76 },
                   { name: "Zacatecas", value: 64 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 19 },
                   { name: "Baja California", value: 39 },
                   { name: "Baja California Sur", value: 5 },
                   { name: "Campeche", value: 10 },
                   { name: "Coahuila", value: 19 },
                   { name: "Colima", value: 5 },
                   { name: "Chiapas", value: 41 },
                   { name: "Chihuahua", value: 46 },
                   { name: "Ciudad de México", value: 115 },
                   { name: "Durango", value: 7 },
                   { name: "Guanajuato", value: 40 },
                   { name: "Guerrero", value: 32 },
                   { name: "Hidalgo", value: 25 },
                   { name: "Jalisco", value: 88 },
                   { name: "México", value: 169 },
                   { name: "Michoacán", value: 39 },
                   { name: "Morelos", value: 28 },
                   { name: "Nayarit", value: 8 },
                   { name: "Nuevo León", value: 70 },
                   { name: "Oaxaca", value: 52 },
                   { name: "Puebla", value: 62 },
                   { name: "Querétaro", value: 23 },
                   { name: "Quintana Roo", value: 19 },
                   { name: "San Luis Potosí", value: 34 },
                   { name: "Sinaloa", value: 33 },
                   { name: "Sonora", value: 36 },
                   { name: "Tabasco", value: 18 },
                   { name: "Tamaulipas", value: 23 },
                   { name: "Tlaxcala", value: 8 },
                   { name: "Veracruz", value: 81 },
                   { name: "Yucatán", value: 29 },
                   { name: "Zacatecas", value: 20 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 70 },
                   { name: "Baja California", value: 90 },
                   { name: "Baja California Sur", value: 13 },
                   { name: "Campeche", value: 35 },
                   { name: "Coahuila", value: 72 },
                   { name: "Colima", value: 34 },
                   { name: "Chiapas", value: 226 },
                   { name: "Chihuahua", value: 131 },
                   { name: "Ciudad de México", value: 502 },
                   { name: "Durango", value: 32 },
                   { name: "Guanajuato", value: 215 },
                   { name: "Guerrero", value: 136 },
                   { name: "Hidalgo", value: 120 },
                   { name: "Jalisco", value: 348 },
                   { name: "México", value: 791 },
                   { name: "Michoacán", value: 213 },
                   { name: "Morelos", value: 93 },
                   { name: "Nayarit", value: 34 },
                   { name: "Nuevo León", value: 126 },
                   { name: "Oaxaca", value: 351 },
                   { name: "Puebla", value: 385 },
                   { name: "Querétaro", value: 105 },
                   { name: "Quintana Roo", value: 45 },
                   { name: "San Luis Potosí", value: 150 },
                   { name: "Sinaloa", value: 78 },
                   { name: "Sonora", value: 108 },
                   { name: "Tabasco", value: 60 },
                   { name: "Tamaulipas", value: 61 },
                   { name: "Tlaxcala", value: 57 },
                   { name: "Veracruz", value: 503 },
                   { name: "Yucatán", value: 105 },
                   { name: "Zacatecas", value: 84 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 4129
                }, {
                  name: "Mujeres",
                  value: 1243
                }, {
                  name: "Total",
                  value: 5373
                }]
              }]
            }, {
              title: {
                text: "TMent año 2015"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 55 },
                   { name: "Baja California", value: 57 },
                   { name: "Baja California Sur", value: 6 },
                   { name: "Campeche", value: 32 },
                   { name: "Coahuila", value: 38 },
                   { name: "Colima", value: 39 },
                   { name: "Chiapas", value: 208 },
                   { name: "Chihuahua", value: 126 },
                   { name: "Ciudad de México", value: 348 },
                   { name: "Durango", value: 21 },
                   { name: "Guanajuato", value: 190 },
                   { name: "Guerrero", value: 118 },
                   { name: "Hidalgo", value: 99 },
                   { name: "Jalisco", value: 246 },
                   { name: "México", value: 524 },
                   { name: "Michoacán", value: 204 },
                   { name: "Morelos", value: 46 },
                   { name: "Nayarit", value: 24 },
                   { name: "Nuevo León", value: 45 },
                   { name: "Oaxaca", value: 277 },
                   { name: "Puebla", value: 305 },
                   { name: "Querétaro", value: 84 },
                   { name: "Quintana Roo", value: 35 },
                   { name: "San Luis Potosí", value: 95 },
                   { name: "Sinaloa", value: 36 },
                   { name: "Sonora", value: 63 },
                   { name: "Tabasco", value: 47 },
                   { name: "Tamaulipas", value: 34 },
                   { name: "Tlaxcala", value: 44 },
                   { name: "Veracruz", value: 379 },
                   { name: "Yucatán", value: 79 },
                   { name: "Zacatecas", value: 65 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 22 },
                   { name: "Baja California", value: 46 },
                   { name: "Baja California Sur", value: 7 },
                   { name: "Campeche", value: 7 },
                   { name: "Coahuila", value: 22 },
                   { name: "Colima", value: 13 },
                   { name: "Chiapas", value: 44 },
                   { name: "Chihuahua", value: 42 },
                   { name: "Ciudad de México", value: 108 },
                   { name: "Durango", value: 9 },
                   { name: "Guanajuato", value: 48 },
                   { name: "Guerrero", value: 35 },
                   { name: "Hidalgo", value: 45 },
                   { name: "Jalisco", value: 112 },
                   { name: "México", value: 122 },
                   { name: "Michoacán", value: 55 },
                   { name: "Morelos", value: 42 },
                   { name: "Nayarit", value: 10 },
                   { name: "Nuevo León", value: 69 },
                   { name: "Oaxaca", value: 74 },
                   { name: "Puebla", value: 75 },
                   { name: "Querétaro", value: 23 },
                   { name: "Quintana Roo", value: 14 },
                   { name: "San Luis Potosí", value: 27 },
                   { name: "Sinaloa", value: 35 },
                   { name: "Sonora", value: 40 },
                   { name: "Tabasco", value: 23 },
                   { name: "Tamaulipas", value: 18 },
                   { name: "Tlaxcala", value: 11 },
                   { name: "Veracruz", value: 115 },
                   { name: "Yucatán", value: 26 },
                   { name: "Zacatecas", value: 13 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 77 },
                   { name: "Baja California", value: 103 },
                   { name: "Baja California Sur", value: 13 },
                   { name: "Campeche", value: 39 },
                   { name: "Coahuila", value: 60 },
                   { name: "Colima", value: 52 },
                   { name: "Chiapas", value: 252 },
                   { name: "Chihuahua", value: 168 },
                   { name: "Ciudad de México", value: 456 },
                   { name: "Durango", value: 30 },
                   { name: "Guanajuato", value: 238 },
                   { name: "Guerrero", value: 153 },
                   { name: "Hidalgo", value: 144 },
                   { name: "Jalisco", value: 358 },
                   { name: "México", value: 646 },
                   { name: "Michoacán", value: 259 },
                   { name: "Morelos", value: 88 },
                   { name: "Nayarit", value: 34 },
                   { name: "Nuevo León", value: 114 },
                   { name: "Oaxaca", value: 351 },
                   { name: "Puebla", value: 380 },
                   { name: "Querétaro", value: 107 },
                   { name: "Quintana Roo", value: 49 },
                   { name: "San Luis Potosí", value: 122 },
                   { name: "Sinaloa", value: 71 },
                   { name: "Sonora", value: 103 },
                   { name: "Tabasco", value: 70 },
                   { name: "Tamaulipas", value: 52 },
                   { name: "Tlaxcala", value: 55 },
                   { name: "Veracruz", value: 494 },
                   { name: "Yucatán", value: 105 },
                   { name: "Zacatecas", value: 78 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3969
                }, {
                  name: "Mujeres",
                  value: 1352
                }, {
                  name: "Total",
                  value: 5321
                }]
              }]
            }, {
              title: {
                text: "TMent año 2016"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 53 },
                   { name: "Baja California", value: 82 },
                   { name: "Baja California Sur", value: 9 },
                   { name: "Campeche", value: 27 },
                   { name: "Coahuila", value: 51 },
                   { name: "Colima", value: 22 },
                   { name: "Chiapas", value: 172 },
                   { name: "Chihuahua", value: 137 },
                   { name: "Ciudad de México", value: 235 },
                   { name: "Durango", value: 22 },
                   { name: "Guanajuato", value: 170 },
                   { name: "Guerrero", value: 79 },
                   { name: "Hidalgo", value: 71 },
                   { name: "Jalisco", value: 262 },
                   { name: "México", value: 294 },
                   { name: "Michoacán", value: 171 },
                   { name: "Morelos", value: 57 },
                   { name: "Nayarit", value: 20 },
                   { name: "Nuevo León", value: 65 },
                   { name: "Oaxaca", value: 234 },
                   { name: "Puebla", value: 186 },
                   { name: "Querétaro", value: 63 },
                   { name: "Quintana Roo", value: 28 },
                   { name: "San Luis Potosí", value: 117 },
                   { name: "Sinaloa", value: 31 },
                   { name: "Sonora", value: 49 },
                   { name: "Tabasco", value: 44 },
                   { name: "Tamaulipas", value: 45 },
                   { name: "Tlaxcala", value: 31 },
                   { name: "Veracruz", value: 311 },
                   { name: "Yucatán", value: 61 },
                   { name: "Zacatecas", value: 65 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 20 },
                   { name: "Baja California", value: 41 },
                   { name: "Baja California Sur", value: 10 },
                   { name: "Campeche", value: 11 },
                   { name: "Coahuila", value: 21 },
                   { name: "Colima", value: 4 },
                   { name: "Chiapas", value: 31 },
                   { name: "Chihuahua", value: 43 },
                   { name: "Ciudad de México", value: 90 },
                   { name: "Durango", value: 16 },
                   { name: "Guanajuato", value: 43 },
                   { name: "Guerrero", value: 16 },
                   { name: "Hidalgo", value: 19 },
                   { name: "Jalisco", value: 99 },
                   { name: "México", value: 98 },
                   { name: "Michoacán", value: 48 },
                   { name: "Morelos", value: 25 },
                   { name: "Nayarit", value: 8 },
                   { name: "Nuevo León", value: 86 },
                   { name: "Oaxaca", value: 69 },
                   { name: "Puebla", value: 47 },
                   { name: "Querétaro", value: 23 },
                   { name: "Quintana Roo", value: 30 },
                   { name: "San Luis Potosí", value: 29 },
                   { name: "Sinaloa", value: 24 },
                   { name: "Sonora", value: 36 },
                   { name: "Tabasco", value: 9 },
                   { name: "Tamaulipas", value: 38 },
                   { name: "Tlaxcala", value: 8 },
                   { name: "Veracruz", value: 67 },
                   { name: "Yucatán", value: 30 },
                   { name: "Zacatecas", value: 13 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 73 },
                   { name: "Baja California", value: 123 },
                   { name: "Baja California Sur", value: 19 },
                   { name: "Campeche", value: 38 },
                   { name: "Coahuila", value: 72 },
                   { name: "Colima", value: 26 },
                   { name: "Chiapas", value: 203 },
                   { name: "Chihuahua", value: 180 },
                   { name: "Ciudad de México", value: 325 },
                   { name: "Durango", value: 38 },
                   { name: "Guanajuato", value: 213 },
                   { name: "Guerrero", value: 95 },
                   { name: "Hidalgo", value: 90 },
                   { name: "Jalisco", value: 361 },
                   { name: "México", value: 392 },
                   { name: "Michoacán", value: 219 },
                   { name: "Morelos", value: 82 },
                   { name: "Nayarit", value: 28 },
                   { name: "Nuevo León", value: 151 },
                   { name: "Oaxaca", value: 304 },
                   { name: "Puebla", value: 233 },
                   { name: "Querétaro", value: 86 },
                   { name: "Quintana Roo", value: 58 },
                   { name: "San Luis Potosí", value: 146 },
                   { name: "Sinaloa", value: 55 },
                   { name: "Sonora", value: 85 },
                   { name: "Tabasco", value: 53 },
                   { name: "Tamaulipas", value: 83 },
                   { name: "Tlaxcala", value: 39 },
                   { name: "Veracruz", value: 378 },
                   { name: "Yucatán", value: 91 },
                   { name: "Zacatecas", value: 78 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3264
                }, {
                  name: "Mujeres",
                  value: 1152
                }, {
                  name: "Total",
                  value: 4417
                }]
              }]
            }, {
              title: {
                text: "TMent año 2017"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 50 },
                   { name: "Baja California", value: 72 },
                   { name: "Baja California Sur", value: 16 },
                   { name: "Campeche", value: 18 },
                   { name: "Coahuila", value: 40 },
                   { name: "Colima", value: 17 },
                   { name: "Chiapas", value: 132 },
                   { name: "Chihuahua", value: 161 },
                   { name: "Ciudad de México", value: 222 },
                   { name: "Durango", value: 18 },
                   { name: "Guanajuato", value: 188 },
                   { name: "Guerrero", value: 82 },
                   { name: "Hidalgo", value: 61 },
                   { name: "Jalisco", value: 246 },
                   { name: "México", value: 305 },
                   { name: "Michoacán", value: 139 },
                   { name: "Morelos", value: 45 },
                   { name: "Nayarit", value: 15 },
                   { name: "Nuevo León", value: 77 },
                   { name: "Oaxaca", value: 232 },
                   { name: "Puebla", value: 221 },
                   { name: "Querétaro", value: 53 },
                   { name: "Quintana Roo", value: 31 },
                   { name: "San Luis Potosí", value: 95 },
                   { name: "Sinaloa", value: 44 },
                   { name: "Sonora", value: 78 },
                   { name: "Tabasco", value: 44 },
                   { name: "Tamaulipas", value: 45 },
                   { name: "Tlaxcala", value: 38 },
                   { name: "Veracruz", value: 273 },
                   { name: "Yucatán", value: 55 },
                   { name: "Zacatecas", value: 63 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 19 },
                   { name: "Baja California", value: 39 },
                   { name: "Baja California Sur", value: 12 },
                   { name: "Campeche", value: 7 },
                   { name: "Coahuila", value: 13 },
                   { name: "Colima", value: 5 },
                   { name: "Chiapas", value: 29 },
                   { name: "Chihuahua", value: 39 },
                   { name: "Ciudad de México", value: 75 },
                   { name: "Durango", value: 3 },
                   { name: "Guanajuato", value: 40 },
                   { name: "Guerrero", value: 17 },
                   { name: "Hidalgo", value: 20 },
                   { name: "Jalisco", value: 108 },
                   { name: "México", value: 94 },
                   { name: "Michoacán", value: 38 },
                   { name: "Morelos", value: 17 },
                   { name: "Nayarit", value: 6 },
                   { name: "Nuevo León", value: 92 },
                   { name: "Oaxaca", value: 44 },
                   { name: "Puebla", value: 33 },
                   { name: "Querétaro", value: 16 },
                   { name: "Quintana Roo", value: 23 },
                   { name: "San Luis Potosí", value: 19 },
                   { name: "Sinaloa", value: 34 },
                   { name: "Sonora", value: 34 },
                   { name: "Tabasco", value: 9 },
                   { name: "Tamaulipas", value: 22 },
                   { name: "Tlaxcala", value: 9 },
                   { name: "Veracruz", value: 49 },
                   { name: "Yucatán", value: 25 },
                   { name: "Zacatecas", value: 17 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 69 },
                   { name: "Baja California", value: 111 },
                   { name: "Baja California Sur", value: 28 },
                   { name: "Campeche", value: 25 },
                   { name: "Coahuila", value: 53 },
                   { name: "Colima", value: 22 },
                   { name: "Chiapas", value: 161 },
                   { name: "Chihuahua", value: 200 },
                   { name: "Ciudad de México", value: 297 },
                   { name: "Durango", value: 21 },
                   { name: "Guanajuato", value: 228 },
                   { name: "Guerrero", value: 99 },
                   { name: "Hidalgo", value: 81 },
                   { name: "Jalisco", value: 354 },
                   { name: "México", value: 399 },
                   { name: "Michoacán", value: 177 },
                   { name: "Morelos", value: 62 },
                   { name: "Nayarit", value: 21 },
                   { name: "Nuevo León", value: 169 },
                   { name: "Oaxaca", value: 276 },
                   { name: "Puebla", value: 254 },
                   { name: "Querétaro", value: 69 },
                   { name: "Quintana Roo", value: 54 },
                   { name: "San Luis Potosí", value: 114 },
                   { name: "Sinaloa", value: 78 },
                   { name: "Sonora", value: 112 },
                   { name: "Tabasco", value: 53 },
                   { name: "Tamaulipas", value: 67 },
                   { name: "Tlaxcala", value: 47 },
                   { name: "Veracruz", value: 322 },
                   { name: "Yucatán", value: 80 },
                   { name: "Zacatecas", value: 80 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3176
                }, {
                  name: "Mujeres",
                  value: 1007
                }, {
                  name: "Total",
                  value: 4183
                }]
              }]
            }, {
              title: {
                text: "TMent año 2018"
              },
              series: [{
                data: [
                   { name: "Aguascalientes", value: 54 },
                   { name: "Baja California", value: 112 },
                   { name: "Baja California Sur", value: 11 },
                   { name: "Campeche", value: 24 },
                   { name: "Coahuila", value: 36 },
                   { name: "Colima", value: 15 },
                   { name: "Chiapas", value: 128 },
                   { name: "Chihuahua", value: 179 },
                   { name: "Ciudad de México", value: 218 },
                   { name: "Durango", value: 21 },
                   { name: "Guanajuato", value: 197 },
                   { name: "Guerrero", value: 83 },
                   { name: "Hidalgo", value: 72 },
                   { name: "Jalisco", value: 268 },
                   { name: "México", value: 353 },
                   { name: "Michoacán", value: 167 },
                   { name: "Morelos", value: 61 },
                   { name: "Nayarit", value: 29 },
                   { name: "Nuevo León", value: 72 },
                   { name: "Oaxaca", value: 246 },
                   { name: "Puebla", value: 215 },
                   { name: "Querétaro", value: 50 },
                   { name: "Quintana Roo", value: 27 },
                   { name: "San Luis Potosí", value: 95 },
                   { name: "Sinaloa", value: 50 },
                   { name: "Sonora", value: 74 },
                   { name: "Tabasco", value: 30 },
                   { name: "Tamaulipas", value: 33 },
                   { name: "Tlaxcala", value: 34 },
                   { name: "Veracruz", value: 245 },
                   { name: "Yucatán", value: 61 },
                   { name: "Zacatecas", value: 72 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 17 },
                   { name: "Baja California", value: 45 },
                   { name: "Baja California Sur", value: 13 },
                   { name: "Campeche", value: 8 },
                   { name: "Coahuila", value: 15 },
                   { name: "Colima", value: 5 },
                   { name: "Chiapas", value: 36 },
                   { name: "Chihuahua", value: 51 },
                   { name: "Ciudad de México", value: 83 },
                   { name: "Durango", value: 17 },
                   { name: "Guanajuato", value: 45 },
                   { name: "Guerrero", value: 25 },
                   { name: "Hidalgo", value: 26 },
                   { name: "Jalisco", value: 122 },
                   { name: "México", value: 108 },
                   { name: "Michoacán", value: 70 },
                   { name: "Morelos", value: 16 },
                   { name: "Nayarit", value: 11 },
                   { name: "Nuevo León", value: 88 },
                   { name: "Oaxaca", value: 52 },
                   { name: "Puebla", value: 34 },
                   { name: "Querétaro", value: 26 },
                   { name: "Quintana Roo", value: 39 },
                   { name: "San Luis Potosí", value: 29 },
                   { name: "Sinaloa", value: 35 },
                   { name: "Sonora", value: 26 },
                   { name: "Tabasco", value: 18 },
                   { name: "Tamaulipas", value: 20 },
                   { name: "Tlaxcala", value: 11 },
                   { name: "Veracruz", value: 78 },
                   { name: "Yucatán", value: 28 },
                   { name: "Zacatecas", value: 24 }
                ]
              }, {
                data: [
                   { name: "Aguascalientes", value: 71 },
                   { name: "Baja California", value: 157 },
                   { name: "Baja California Sur", value: 24 },
                   { name: "Campeche", value: 32 },
                   { name: "Coahuila", value: 51 },
                   { name: "Colima", value: 20 },
                   { name: "Chiapas", value: 164 },
                   { name: "Chihuahua", value: 230 },
                   { name: "Ciudad de México", value: 301 },
                   { name: "Durango", value: 38 },
                   { name: "Guanajuato", value: 242 },
                   { name: "Guerrero", value: 108 },
                   { name: "Hidalgo", value: 98 },
                   { name: "Jalisco", value: 390 },
                   { name: "México", value: 461 },
                   { name: "Michoacán", value: 237 },
                   { name: "Morelos", value: 77 },
                   { name: "Nayarit", value: 40 },
                   { name: "Nuevo León", value: 160 },
                   { name: "Oaxaca", value: 298 },
                   { name: "Puebla", value: 249 },
                   { name: "Querétaro", value: 76 },
                   { name: "Quintana Roo", value: 66 },
                   { name: "San Luis Potosí", value: 124 },
                   { name: "Sinaloa", value: 85 },
                   { name: "Sonora", value: 100 },
                   { name: "Tabasco", value: 48 },
                   { name: "Tamaulipas", value: 53 },
                   { name: "Tlaxcala", value: 45 },
                   { name: "Veracruz", value: 323 },
                   { name: "Yucatán", value: 89 },
                   { name: "Zacatecas", value: 96 }
                ]
              }, {
                data: [{
                  name: "Hombres",
                  value: 3332
                }, {
                  name: "Mujeres",
                  value: 1221
                }, {
                  name: "Total",
                  value: 4553
                }]
              }]
            }]
          }

          option && myChart.setOption(option);