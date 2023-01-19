      var array_texto = Array("#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF");
      array_colores = Array("#FAEBD7","#00FFFF","#FFE4C4","#0000FF","#8A2BE2","#A52A2A","#DEB887","#5F9EA0","#7FFF00","#D2691E","#FF7F50","#6495ED","#008B8B","#B8860B","#006400","#FF8C00","#FF1493","#FFD700","#DAA520","#808080","#E6E6FA","#F08080","#D3D3D3","#90EE90","#D87093","#FFEFD5","#CD853F","#8B4513","#D2B48C","#008080","#FF6347","#F5F5F5");
      var estadoseleccionado = "";
      var municipios=[];
      var municipiosSEL=[];

      google.charts.load('upcoming', {
        'packages': ['geochart']
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['Entidad', 'Registros'],
          ['Baja California', 100],
          ['Sonora', '100'],
          ['Chihuahua', '100'],
          ['Coahuila', '100'],
          ['Nuevo León', '100'],
          ['Tamaulipas', '100'],
          ['Sinaloa', '100'],
          ['Nayarit', '100'],
          ['Durango', '100'],
          ['Zacatecas', '400'],
          ['Jalisco', '400'],
          ['Colima', '400'],
          ['Tlaxcala', '400'],
          ['Aguascalientes', '400'],
          ['Zacatecas', '400'],
          ['San Luis Potosí', '400'],
          ['Puebla', '400'],
          ['Guanajuato', '400'],
          ['Querétaro', '400'],
          ['Hidalgo', '400'],
          ['Morelos', '400'],
          ['Estado de México', 400],
          ['Distrito Federal', 400],
          ['Baja California Sur', '200'],
          ['Michoacán', '200'],
          ['Guerrero', '200'],
          ['Oaxaca', '200'],
          ['Veracruz', '200'],
          ['Tabasco', '200'],
          ['Campeche', '300'],
          ['Chiapas', '200'],
          ['Quintana Roo', '300'],
          ['Yucatán', '300']
        ]);

        var options = {
          region: 'MX', // Mexico
          resolution: 'provinces',
          colorAxis: {
            //      minValue=100,
            //     maxValue=400,
            values: [100, 200, 300, 400],
            colors: ['green', 'yellow', 'orange', 'red']
          },
          backgroundColor: '#81d4fa',
          datalessRegionColor: '#eeeeee',
          defaultColor: '#f5f5f5',
        };

        var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
        chart.draw(data, options);
      };

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