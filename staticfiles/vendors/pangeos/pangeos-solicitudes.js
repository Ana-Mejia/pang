      var initial = false;
      var hiddenColumns=0;
      var escolaridades = Array("Licenciatura", "Maestría", "Doctorado", "Post doctorado");
      var instituciones = Array("UNAM", "UAM", "IPN");
      var areas = Array("Médica", "Biológica", "Psicológica");
      var selectRegistro = "";

      var table = jQuery('#pangeos-solicitudesTabla').DataTable({
          "language": {
              "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
          },
          searching: true,
          bFilter: true, 
          bInfo: false,
          lengthChange: true,
          pageLength: 20,
          fixedHeader: true,
          "drawCallback": function() {
              initSolicitudes();
          },
          "initComplete": function() {
              if( jQuery("tr.child").length > 0 ) {
                  initSolicitudes();
              }
          }
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
      jQuery(".sublink").click(function(){
          submenu =  jQuery(".minisubmenu").css("display");
          if( submenu == 'none' ){
              jQuery(".minisubmenu").css({"display":"block"})
          } else {
              jQuery(".minisubmenu").css({"display":"none"});
          }
      });

      jQuery(window).resize(function(){
          showhideFilter();
          hiddenColumns=0;
          jQuery.each( jQuery("td"), function(a, b){
              if( jQuery(b).css("display") == "none" ) {
                  hiddenColumns++;
              }  
          });
          if( hiddenColumns == 0 ) {
              jQuery('#pangeos-solicitudesTabla tbody').on( 'mouseenter', 'td', function () {
                  var colIdx = table.cell(this).index().column;
                  var rowIdx = table.cell(this).index().row;
                  jQuery( table.column( colIdx ).nodes()).addClass( 'highlight' );
                  jQuery( table.rows( rowIdx ).nodes()).addClass( 'highlight' );
              });
              jQuery('#pangeos-solicitudesTabla tbody').on( 'mouseleave', 'td', function () {
                  jQuery( table.cells().nodes() ).removeClass( 'highlight' );
                  jQuery( "tr" ).removeClass( 'highlight' );
              });
          }
      })

      jQuery(document).ready(function(){
            jQuery('#pangeos-solicitudesTabla thead tr').clone(true).addClass('filters').appendTo( '#pangeos-solicitudesTabla thead' );

            showhideFilter();
            
            institucionesBody = "";
            jQuery.each(instituciones, function(i, j){
                institucionesBody+="<option value='"+j+"'>"+j+"</option>";
            });
            escolaridadesBody = "";
            jQuery.each(escolaridades, function(i, j){
                escolaridadesBody+="<option value='"+j+"'>"+j+"</option>";
            });
            areasBody = "";
            jQuery.each(areas, function(i, j){
                areasBody+="<option value='"+j+"'>"+j+"</option>";
            });

            table.columns().eq(0).each(function(colIdx) {
                var cell = jQuery('.filters th').eq(jQuery(table.column(colIdx).header()).index());
                var title = jQuery(cell).text();
                switch( colIdx ) {
                    case 0:
                    case 4:
                    case 5:
                        jQuery(cell).html( '<input class="form-control" type="text" placeholder="Buscar por '+title+'" />' );
                    break;
                    case 1:
                        jQuery(cell).html( '<select class="form-control"><option value="">Buscar por '+title+'</option>'+construirListados(escolaridades)+'</select>' );
                    break;
                    case 2:
                        jQuery(cell).html( '<select class="form-control"><option value="">Buscar por '+title+'</option>'+construirListados(instituciones)+'</select>' );
                    break;
                    case 3:
                        jQuery(cell).html( '<select class="form-control"><option value="">Buscar por '+title+'</option>'+construirListados(areas)+'</select>' );
                    break;
                    case 6:
                        jQuery(cell).html( '<input class="form-control" type="date" />' );
                    break;
                    case 7:
                        jQuery(cell).html( '<div>&nbsp;</div>' );
                    break;
                }
         
                jQuery('input', jQuery('.filters th').eq(jQuery(table.column(colIdx).header()).index()) ).off('keyup change').on('keyup change', function (e) {
                    e.stopPropagation();
                    jQuery(this).attr('title', jQuery(this).val());
                    t = jQuery(this).attr("type");
                    searched = this.value;
                    if( t == 'date' ) {
                        date = this.value.split("-");
                        if( date.length<3 ) {
                            searched = "";
                            jQuery("#pangeos-solicitudesTabla").children("thead").children("tr.filters").children("th").eq(6).children("input[type='date']").val('');
                        } else {
                          searched = date[2]+"/"+date[1]+"/"+date[0];
                        }
                    }
                        var regexr = '({search})'; //jQuery(this).parents('th').find('select').val();

                        table
                            .column(colIdx)
                            .search((searched != "") ? regexr.replace('{search}', '((('+searched+')))') : "", searched != "", searched == "")
                            .draw();
                });
     
                jQuery('select', jQuery('.filters th').eq(jQuery(table.column(colIdx).header()).index()) ).off('change').on('change', function (e) {
                    e.stopPropagation();
                    jQuery(this).attr('title', jQuery(this).val());
                        var regexr = '({search})'; //jQuery(this).parents('th').find('select').val();
                        table
                            .column(colIdx)
                            .search((this.value != "") ? regexr.replace('{search}', '((('+this.value+')))') : "", this.value != "", this.value == "")
                            .draw();
                });
            });

      });

      function showhideFilter() {
          W = jQuery( window ).width();
          if( W < 1130 || hiddenColumns > 0 ) {
               jQuery('#pangeos-solicitudesTabla').children("thead").find('tr.filters').css({"display":"none"});
               jQuery("#pangeos-solicitudesTabla_filter").css({"display":"block"});
          } else {
               jQuery('#pangeos-solicitudesTabla').children("thead").find('tr.filters').css({"display":"table-row"});
               jQuery("#pangeos-solicitudesTabla_filter").css({"display":"none"});
              // ocultar cuadro genérico
          }
      }

      function construirListados(_array) {
          arrayBody = "";
          jQuery.each(_array, function(i, j){
              arrayBody+="<option value='"+j+"'>"+j+"</option>";
          });
          return arrayBody;
      }

      function initSolicitudes() {
          jQuery("#pangeos-solicitudesTabla_filter").css({"display":"none"});
          jQuery("#pangeos-solicitudesTabla tbody").on("click", "td.sorting_1", function(){
              // initSolicitudes();
          });
          
          jQuery.each( jQuery("td"), function(a, b){
              if( jQuery(b).css("display") == "none" ) {
                  hiddenColumns++;
              }  
          });
          if( hiddenColumns == 0 ) {
              jQuery('#pangeos-solicitudesTabla tbody').on( 'mouseenter', 'td', function () {
                  var colIdx = table.cell(this).index().column;
                  var rowIdx = table.cell(this).index().row;
                  jQuery( table.column( colIdx ).nodes()).addClass( 'highlight' );
                  jQuery( table.rows( rowIdx ).nodes()).addClass( 'highlight' );
              });
              jQuery('#pangeos-solicitudesTabla tbody').on( 'mouseleave', 'td', function () {
                  jQuery( table.cells().nodes() ).removeClass( 'highlight' );
                  jQuery( "tr" ).removeClass( 'highlight' );
              });
          }
          jQuery(".aprobarregistro").attr("title", "Haga click para aprobar el registro.");
          jQuery(".rechazarregistro").attr("title", "Haga click para rechazar el registro.");
          jQuery(".aprobarregistro").on("click", function(){
              recordActions("aprobar", jQuery(this));
          });
          jQuery(".rechazarregistro").on("click", function(){
              recordActions("rechazar", jQuery(this));
          });
      }

      function recordActions(_action, _obj) {
            id = _obj.parent("div").attr("data-id");
            nombre = _obj.parent("div").attr("data-nombre");
            accion = _action;
            output = new Array();
            output["id"] = id;
            output["nombre"] = nombre;
            output["accion"] = "<span class='txt_accionnotificacion txt_"+_action+"'>"+_action+"</span>";
            funcionesregistro(output);
            selectRegistro = id;
            jQuery("#btn-aceptar").unbind("cick").click(function(){
                table.row('#'+selectRegistro).remove().draw();
            });
      }
      

      function funcionesregistro(_data) {
          msg = "¿Está seguro que desea "+_data["accion"]+" al usuario "+_data["nombre"]+"?";
          jQuery("#txt_accion").html(msg);
          jQuery('.confirmacion').modal({
              show: true
          });
      }

      function limpiarFiltros() {
          table.search('').columns().search('').draw();
          jQuery(".filters > th").each(function(i, j){
              jQuery(this).children(".form-control").val('');
          });
      }