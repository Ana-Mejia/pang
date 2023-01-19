
		function pdf_canvas(){
			var HTML_Width = $("#info_indicador").width();
            var HTML_Height = $("#info_indicador").height();
            var top_left_margin = 15;
            var PDF_Width = HTML_Width + (top_left_margin * 2);
            var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
            var canvas_image_width = HTML_Width;
            var canvas_image_height = HTML_Height;

            var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

            html2canvas($("#info_indicador")[0]).then(function (canvas) {
                var imgData = canvas.toDataURL("image/jpeg", 1.0);
                var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
                pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
                for (var i = 1; i <= totalPDFPages; i++) { 
                    pdf.addPage(PDF_Width, PDF_Height);
					pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
                }
                pdf.save("ficha_indicador_"+indicador+".pdf");
				$(".html-content").hide();
            });
		}
		
		
		function pdf_ficha(){
			
			var formula = new Image();
			formula.src = '/static/images/ecuaciones/'+imgIndicador;
			
			var citacion = 'Cordero Oropeza, Martha; Medina Mora, María Elena, Rafful Loera, Claudia; Mendoza Pablo, Alberto; Mendoza Negrete, Melissa; Barrera Delgado, Rogelio; Olvera Aguirre, Carlos; Mejía Pichardo, Ana Laura; Fink Delgado, Antonio. Estimaciones con datos de INEGI. Defunciones registradas 2000 a 2020; SG de CONAPO. Proyecciones Municipales 2000-2015, y Proyecciones de la Población de los Municipios de México y de las Entidades Federativas, 2016-2050.'
			
			var doc = new jsPDF('p', 'mm', 'letter');
			//doc.setFont("Manrope");

			var pdfInMM=185;  // width in mm
			
			//Marca de agua
			var img = new Image()
			img.src = "/static/images/logo2_wm.png";
			doc.addImage(img, 'png', 50, 40, 120, 120);
			

			doc.setFontSize(12);
			doc.setFontType("bold");
			doc.text(57, 13, "Ficha Técnica de Indicador - " + $('#indicadorTitle').text());
			
			doc.setFontSize(10);

			doc.setFontType("bold");
			doc.text(12, 20, "Importancia:");
			doc.setFontType("normal");
			doc.text(15, 21, doc.splitTextToSize($('#importanceTxt').text(), (pdfInMM)));
			
			doc.setFontType("bold");
			doc.text(12, 69, "Definición:");
			doc.setFontType("normal");
			doc.text(15, 70, doc.splitTextToSize($('#descriptionTxt').text(), (pdfInMM)));
			
			doc.setFontType("bold");
			doc.text(12, 89, "Desagregación:");
			doc.setFontType("normal");
			doc.text(15, 90, doc.splitTextToSize($('#desagregationTxt').text(), (pdfInMM)));
			
			doc.setFontType("bold");
			doc.text(12, 105, "Método de cálculo:");
			doc.setFontType("normal");
			doc.addImage(formula, 'png', 22, 106, 75, 12);
			doc.setFontSize(9);
			doc.text(15, 115, $('#calcmethodDescWrapper').text());
			/*doc.fromHTML("<i>TSUIC&#7511;</i>= Tasa de mortalidad por suicidio, en el año t<br>", 17, 100, {
				'width': 170
			});*/
			doc.setFontSize(10);
			
			doc.setFontType("bold");
			doc.text(12, 136, "Unidad de medida:");
			doc.setFontType("normal");
			//doc.text(17, 157, doc.splitTextToSize($('#unitTxt').text(), (pdfInMM)));
			doc.text(15, 137, $('#unitTxt').text());
			
			doc.setFontType("bold");
			doc.text(12, 148, "Frecuencia prevista de difusión de datos:");
			doc.setFontType("normal");
			//doc.text(17, 177, doc.splitTextToSize($('#difFrequencyTxt').text(), (pdfInMM)));
			doc.text(15, 149, $('#difFrequencyTxt').text());
			
			doc.setFontType("bold");
			doc.text(12, 160, "Fecha de actualización:");
			doc.setFontType("normal");
			doc.text(15, 161, $('#updateDateTxt').text());
			
			doc.setFontType("bold");
			doc.text(12, 172, "Limitaciones:");
			doc.setFontType("normal");
			doc.text(15, 173, doc.splitTextToSize($('#limitationsTxt').text(), (pdfInMM)));
						
			doc.setFontType("bold");
			doc.text(12, 196, "Referencias:");
			doc.setFontSize(9);
			doc.setFontType("normal");
			doc.text(15, 197, doc.splitTextToSize($('#referencesTxt').text(), (pdfInMM)));
			
			doc.setFontSize(10);
			doc.setFontType("bold");
			doc.text(12, 236, "Fuentes de información:");
			doc.setFontSize(9);
			doc.setFontType("normal");
			doc.text(15, 237, doc.splitTextToSize($('#infoFontsTxt').text(), (pdfInMM)));
			
			
			
			doc.setFontType("bold");
			doc.text(15, 285, "Fuente:");
			doc.setFontType("normal");
			doc.text(15, 286, doc.splitTextToSize(citacion, (pdfInMM)));
			
			doc.save("ficha_indicador_"+indicador+".pdf");
			console.log(doc.getFontList() );
		}