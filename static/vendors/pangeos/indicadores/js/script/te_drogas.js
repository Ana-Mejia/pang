/* CONTROLES */
// - Region
jQuery("#regionselector").on("change", function(){
    jQuery("#estadosselector").val(0);
    jQuery("#estadosselector").html('<option value="0">-- Seleccionar estado</option>');
    region_txt=jQuery(this).val();
    if(region_txt!="0"){
        txt = jQuery("#regionselector option:selected").text();
        jQuery.ajax({
            url: "http://10.249.21.180/explotacion/mapa_entidades/",
            method: "GET",
            data: {
                region: region_txt
            },
            success: function(t) {
                data = t.entidades;
                console.log("Data:",data)
                output = "";
                jQuery.each(data, function(i, j){
                output+="<option value='"+j.id+"'>"+j.entidad+"</option>";
                });
                jQuery("#estadosselector").append(output);
            }
        });
    }
});
// - Estados
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
        output+= "<span class='closetag closetagG' id='tag_"+_id+"'><sup>X</sup></span>";
        output+= "<span class='texttag' id='tagX_"+_id+"' style='color: "+array_texto[_id]+"'>"+_txt+"</span>";
        output+= "</span>";
        jQuery("#edosviewport").append(output);
    }
    if(_origin == 'municipios') {
        Eid = parseInt(_id.substring( _id.indexOf("-")+1, 10000 ));
        output = "<span class='btag mtag etag-"+pad(Eid,2)+"' style='background-color: #F8F8FF; border: 3px solid "+array_colores[Eid]+";'>";
        output+="<span class='closetagM closetagG' id='"+pad(_id,2)+"'></span>";
        output+="<span class='texttagM' style='color: #989898'>"+_txt+"</span>";
        output+= "</span>";
        jQuery("#mupiosviewport").append(output);
    }
}

    
function buildFunctions() {
    jQuery(".closetag").unbind('click').click(function(){
        id = parseInt(jQuery(this).attr('id').replace('tag_',''));
        _edoTXT = jQuery(this).next('.texttag').text();

        _formatTxt = (((_edoTXT).toLowerCase()).replace(/ /g, "")).replace('.', '');
        for (var i=0, l=from.length ; i<l ; i++) {
            _formatTxt = _formatTxt.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        pivEdo=_formatTxt;

        jQuery.each( layer, function(i,j){
            if(layer[i]!== null && layer[i].status=='OK') {
                pivA=(layer[i].url).substring((layer[i].url).lastIndexOf("/")+1,(layer[i].url).lastIndexOf("-"));
                if(pivEdo==pivA){
                    layer[i].setMap(null);
                    layer[i]=null;
                    arrayKML[i]=null;
                    return;
                }
            }
        });

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
                arrayFiles=y;
            }
        });
        jQuery('#dropmunicipios').multiselect('destroy');
        jQuery("#estadosselector").children('option[value="'+id+'"]').show();
        jQuery(this).parent(".btag").remove();
        jQuery(".etag-"+pad(id,2)).remove();
        filterControls();
    });
    jQuery(".texttag").unbind('click').click(function(){
        hasclass = jQuery(this).hasClass("texttagselected");
        jQuery(".texttag").removeClass("texttagselected");
        edoText=jQuery(this).text();
        if(!hasclass) {
            jQuery(this).addClass("texttagselected");
            id = parseInt(jQuery(this).attr('id').replace('tagX_',''));
            jQuery.ajax({
                url: "http://10.249.21.180/explotacion/estado_municipios/", //"estados.php",
                method: "post",
                data: {id: id},
                async: true,
                success: function(t) {
                    jQuery('#dropmunicipios').multiselect('destroy');
                    //obj = jQuery.parseJSON(t);
                    _out = "";
                    //jQuery.each(obj.data, function(i, j){
                    jQuery.each(t, function(i, j){
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
                            _formatTxt = (((txtM).toLowerCase()).replace(/ /g, "_")).replace('.', '');
                            edoText = ((edoText).toLowerCase()).replace(/ /g, "") ;

                            for (var i=0, l=from.length ; i<l ; i++) {
                                _formatTxt = _formatTxt.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                                edoText = edoText.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                            }
                            formatTxt=edoText+"-"+_formatTxt;
                            if(checked ) {
                                buildTag(idM, txtM, 'municipios');
                                jQuery('#dropmunicipios').multiselect('select', idM);
                                alimentaArray(idM, 'in');
                                alimentaKML(formatTxt, 'in');
                                in_out_idsMunicipios(e.context.value,__id,'in');
                            } else {
                                alimentaArray(idM, 'out');
                                alimentaKML(formatTxt, 'out');
                                jQuery("#"+idM).parent('.btag').remove();
                                in_out_idsMunicipios(e.context.value,__id,'out');
                            }
                            for(i=0; i<municipiosSEL.length; i++){
                                _mm = municipiosSEL[i].split('-');
                                cEdo_id = _mm[1];
                                mm = parseInt(_mm[0].replace('tag_',''));
                                if( parseInt(cEdo_id) == id ) {
                                    jQuery('#dropmunicipios').multiselect('select', mm);
                                } else {
                                }
                            }
                            console.log("arrayFiles: "+arrayFiles);
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
                            console.log("id mun: "+_id);
                            id_estado = pad(_id[1], 2);
                            edoText = ((edoText).toLowerCase()).replace(/ /g, "") ;
                            jQuery("#dropmunicipios option").each( function(){
                                _idM = jQuery(this).val();
                                label = jQuery(this).text();
                                id = "tag_"+_idM+"-"+id_estado;
                                _formatTxt = (((label).toLowerCase()).replace(/ /g, "_")).replace('.', '');
                                for (var i=0, l=from.length ; i<l ; i++) {
                                    _formatTxt = _formatTxt.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                                    edoText = edoText.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                                }
                                formatTxt=edoText+"-"+_formatTxt;
                                buildTag(id, label, 'municipios');
                                alimentaArray(id, 'in');
                                alimentaKML(formatTxt, 'in');
                            });
                        },
                        onDeselectAll:function () {
                            id_val = jQuery("input[name='seleccionar-todos']").val();
                            _id = id_val.split('-');
                            id_estado = pad(_id[1], 2);
                            edoText = ((edoText).toLowerCase()).replace(/ /g, "") ;
                            jQuery("#dropmunicipios option").each( function(){
                                _idM = jQuery(this).val();
                                label = jQuery(this).text();
                                id = "tag_"+_idM+"-"+id_estado;
                                _formatTxt = (((label).toLowerCase()).replace(/ /g, "_")).replace('.', '');
                                for (var i=0, l=from.length ; i<l ; i++) {
                                    _formatTxt = _formatTxt.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                                    edoText = edoText.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                                }
                                formatTxt=edoText+"-"+_formatTxt;
                                alimentaArray(id, 'out');
                                alimentaKML(formatTxt, 'out');
                            });
                            jQuery(".etag-"+id_estado).remove();
                        },
                    });
                }
            });
        }
    });
}

function in_out_idsMunicipios(mun,ent,mood){
    // Buscar par ent y mun
    var ind = 0;
    if( mood == 'in'){
        var par_me = {
            mun: mun,
            ent: ent
        }
        idsMunicipios.push(par_me);
    }else{        
        idsMunicipios.forEach(function(elem){
            if( elem.ent == ent && elem.mun == mun ){
                idsMunicipios.splice(ind,1);
            }
            ind = ind + 1;
        });
    }
    idsMunicipios.forEach(function(elem){
        console.log("ent-mun: "+elem.ent+"-"+elem.mun);
    });
}

function alimentaArray(id, direccion){
    if( direccion == 'in') {
        if (municipiosSEL.indexOf(id) === -1) {
            municipiosSEL.push(id);
            arrayFiles.push(id);
        }
    }
    if( direccion == 'out' ) {
        y =jQuery.grep(municipiosSEL, function(value) {
            return value != id;
        });
        z =jQuery.grep(arrayFiles, function(value) {
            return value != id;
        });
        municipiosSEL=y;
        arrayFiles=z;
    }
    filterControls();
}

function alimentaKML(data, direccion) {
    if( direccion == 'in' ) {
        if(arrayKML.indexOf(data)===-1){
            arrayKML.push(data);
        }
    }
    if( direccion == 'out' ) {
        y=jQuery.grep(arrayKML, function(value){
            return value != data;
        });
        arrayKML=y;
        for (var i = 0; i < layer.length; i++) {
            if( layer[i]!== null ){
                ll = ((layer[i].url).substring( (layer[i].url).lastIndexOf("/")+1 ,1000));
                kk = ll.substring(0, ll.indexOf("T"));
                if( layer[i].status == 'OK' &&  data == kk ) {
                    layer[i].setMap(null);
                    layer[i]=null;
                    return;
                }
            }
        }
    }
}

function filterControls() {
    return true;
    Ei = jQuery("#ctrl_edad_I").text();
    Ef = jQuery("#ctrl_edad_F").text();
    Tm = municipiosSEL.length;
    if( Tm > 0 ) {
        jQuery('#ctrl_edad').slider('refresh', { useCurrentValue: false });
        jQuery("#ctrl_edad_I").html("0");
        jQuery("#ctrl_edad_F").html(">65");
        jQuery("#ctrl_edad").slider("disable");
        return;
    } else {
        jQuery("#ctrl_edad").slider("enable");
        return;
    }
    if( Ei > 0 || Ef < 109 ) {
        jQuery("#mupiosviewport").html("");
        municipiosSEL=[];
        arrayFiles=[];
        jQuery('#dropmunicipios').multiselect('destroy');
        jQuery("#ctrl_edad").slider("enable");
        return;
    }
}

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

      jQuery("#ctrl_edad").slider({id: "sliderEdad", min: 0, max: 70, value: [0,70], labelledby: 'ctrl_edad-label-1' });
      jQuery("#ctrl_edad").on("slide", function(slideEvt){
          EdadRango = slideEvt.value;
          if(EdadRango[1] >65 ) {
              EdadF = ">65"
          } else {
              EdadF = EdadRango[1];
          }
          if(EdadRango[0] >65 ) {
              EdadI = ">65"
          } else {
              EdadI = EdadRango[0];
          }
          jQuery("#ctrl_edad_I").text( EdadI );
          jQuery("#ctrl_edad_F").text( EdadF );
          jQuery('#sliderEdad .tooltip .tooltip-inner').text( EdadI+" : "+EdadF); 
          filterControls();
      });

      jQuery("#ctrl_edad2").slider({id: "sliderEdad", min: 0, max: 109, value: [0,109], labelledby: 'ctrl_edad-label-2' });
      jQuery("#ctrl_edad2").on("slide", function(slideEvt){
          EdadRango = slideEvt.value;
          jQuery("#ctrl_edad_I2").text( EdadRango[0] );
          jQuery("#ctrl_edad_F2").text( EdadRango[1] );
          filterControls();
          localStorage.setItem('nac_edad',$("#ctrl_edad2").val());
          console.log("Value edad: "+$("#ctrl_edad2").val());
          update_nacional();
      });
      jQuery("#ctrl_edad3").slider({id: "sliderEdad", min: 0, max: 109, value: [0,109], labelledby: 'ctrl_edad-label-3' });
      jQuery("#ctrl_edad3").on("slide", function(slideEvt){
          EdadRango = slideEvt.value;
          jQuery("#ctrl_edad_I3").text( EdadRango[0] );
          jQuery("#ctrl_edad_F3").text( EdadRango[1] );
          filterControls();
      });

      var array_texto = Array("#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF");
      var array_colores = Array("#FAEBD7","#00FFFF","#FFE4C4","#0000FF","#8A2BE2","#A52A2A","#DEB887","#5F9EA0","#7FFF00","#D2691E","#FF7F50","#6495ED","#008B8B","#B8860B","#006400","#FF8C00","#FF1493","#FFD700","#DAA520","#808080","#E6E6FA","#F08080","#D3D3D3","#90EE90","#D87093","#FFEFD5","#CD853F","#8B4513","#D2B48C","#008080","#FF6347","#F5F5F5");
      var estadoseleccionado = "";
      var municipios=[];
      var municipiosSEL=[];
      var arrayKML=[];
      var arrayFiles=[];

      var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/,:;";
      var to   = "aaaaaeeeeeiiiiooooouuuunc-----";

      jQuery(document).ready(function(){
          /*jQuery.ajax({
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
          });*/
          jQuery("#echart_pie").children("div").css({"width":"100% !important", "height": "100% !important"});

          jQuery("#filtroLimpiar").click(function(){
              jQuery("#filtroLimpiar").css({"display":"none"});
        jQuery("#filtroGrafica").css({"display":"none"});
          });
          jQuery("#filtroGrafica").click(function(){
              setTimeout(function(){ init_echarts() }, 500);
          });
        jQuery("#btn-showtable").click(function(){
            size = parseInt((jQuery("#table-viewport").css('height').replace('px','')));
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
          jQuery("#ctrl_edad_F").text( '>65' );
      });

      
      jQuery("#handler, #btn-closePanel").click(function(){
          txt_menu="";
          controles_right = parseFloat((jQuery("#controles").css('right')).replace("px",""));
          if( controles_right < 0 ) {
              jQuery("#controles").animate({
                  'right': '0px'
              }, 500);
              txt_menu = "Ocultar";
              jQuery("#controles").on("mouseover", function(){
                  // jQuery(this).css({'opacity':'1'});
              });
              jQuery("#controles").on("mouseout", function(){
                  // jQuery(this).css({'opacity':'0.3'});
              });
          } else {
              jQuery("#controles").animate({
                  'right': '-325px'
              }, 500);
              txt_menu = "Mostrar";
              jQuery("#controles").on("mouseover", function(){
                  // jQuery(this).css({'opacity':'1'});
              });
              jQuery("#controles").on("mouseout", function(){
                  // jQuery(this).css({'opacity':'1'});
              });
          }
          jQuery("#handler").html(txt_menu+" menú");
      });

      jQuery("#handler").on("focus", function(){
          controles_right = parseInt($("#controles").css("right").replace("px",""));
          if(controles_right >= 0 ) {
            jQuery("#controles").stop().animate({
              "right": "-325px"
            });
            txt_menu = "Mostrar";
          } else {
            jQuery("#controles").stop().animate({
              "right": "0px"
            });
            txt_menu = "Ocultar";
          }
        jQuery(this).html(txt_menu+" menú");
        return false;
      });

    
      

  

    function effects(s) {
        if(s=='on') {
            jQuery("#controles").hover(
              function(){
                // jQuery(this).css({'opacity':'1'});
              }, function(){
                // jQuery(this).css({'opacity':'0.5'});
              }
            );
        }
        if(s=='off') {
            jQuery("#controles").off("mouseenter mouseleave");
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

    /*bloque cambiado a template*/
    
    

    function update_nacional(){
      jQuery.ajax({
        url: "http://10.249.21.180/explotacion/update_nacional/",
        method: "GET",
        data: {
          anyo: localStorage.getItem('nac_anyo'),
          sexo: localStorage.getItem('nac_sexo'),
          edad: localStorage.getItem('nac_edad')
        },
        success: function(response) {
          r = JSON.parse(response);
          console.log("Data update:",r.mapa_data)
          google.charts.load('upcoming', {
            'packages': ['geochart']
          });
          google.charts.setOnLoadCallback(drawRegionsMap(r.mapa_data,r.min,r.max));
        }
      });
    }
    
    function drawRegionsMap(map,min,max) {
      var data = google.visualization.arrayToDataTable(map);
      var options = {
        region: 'MX', // Mexico
        resolution: 'provinces',
        colorAxis: {
          values: [min, max],
          colors: ['white', '#54278e']  //Colores mapa entidades #54278e
        },
        backgroundColor: '#81d4fa',
        datalessRegionColor: '#eeeeee',
        defaultColor: '#f5f5f5',
      };

      var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
      chart.draw(data, options);
    };