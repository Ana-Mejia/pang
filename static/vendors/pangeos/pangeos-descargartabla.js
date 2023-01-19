function downloadTable(){
  let dataTablaIndicador = $("#datatable").find("tr")
      .map(function () {     
              return jQuery(this).find("td, th").map(function () {
                  txt = jQuery(this).text();
                  return txt;
              })
              .get()
              .join(",")
      })
  .get()
  .join("\n");
  dataTablaIndicador+="\n\n\nInformación descargada de PANGEOS";
  let csv = new Blob(["\ufeff", dataTablaIndicador], {
    type: "text/csv;charset=ISO-8859-1"
  });
  console.log(csv);
  jQuery("#indicadortabla").attr({
      download: "tabla.csv",   // usar acrónimo, a validar en junta con el equipo. Agregar leyenda "información descargada de PANGEOS" al final del documento     
      href: URL.createObjectURL(csv)
  });
}