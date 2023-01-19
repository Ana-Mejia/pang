var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data
    var alto_base = 13;
	var alto_min = 30;
	var alto_med = 42;
	var alto_max = 66;
	var alto_uni = 135;
	var alto_gig = 166;
	var ancho_lil = 48;
	var ancho_chi = 85;
	var ancho_min = 97;
	var ancho_med = 110;
	var ancho_gde = 123;
    var ancho_gra = 165;
	var ancho_max = 180;
	var ancho_uni = 385;
	/*
		Cada nodo tiene la siguiente estructura:
		{															IMPORTANTE: uso de comas, comillas, dos puntos y llaves {}
			id: "node1",									I		Identificador de nodo, debe ser único, se sugiere usar una nomenclatura
			name: "<b>Texto en negrita</b> Nombre a mostrar",		Título a mostrar, se puede meter contenido HTML 
			data: {													Metadatos del nodo, sirven para ampliar las propiedades del nodo
				"desc": "Hola",										Texto que se mostrará en modo tooltip (poniendo el mouse sobre el nodo)
				"$width": ancho_med,								Dimensión de ancho del nodo (tamaño en pixeles)								
				"$height": alto_med									Dimensión de alto del nodo (tamaño en pixeles)
			},														
			children: []											Hijos de este nodo, [] indica que no tiene hijos, caso contrario, deberán listarse con un arreglo similar a éste, separados por comas
		}
	*/
	
	var json = {
		id: "node1",
		name: "Indicadores de salud mental",
		data: {
			"desc": "Características observables y medibles que determinan el estado de salud mental de la población",
			"$width": ancho_gra,
			"$height": alto_med
		},
		children: [
			{
				id: "node1.1",
				name: "Tasas",
				data: {
					"desc": "Comparación a través de una división que muestra la magnitud del cambio de un problema de salud mental o consumo de sustancias en un periodo de tiempo determinado, en relación con el total de la población",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.1.1", 
						name: "Mortalidad",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.1.1.1", 
								name: "Trastornos mentales y uso de sustancias",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min*2
								},
								children: [
									{
										id: "node1.1.1.1.1",
										name: "<b>F00–F09</b>",
										data: {
											"desc": "Trastornos mentales orgánicos, incluidos los trastornos sintomáticos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.1.2",
										name: "<b>F10–F19</b>",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de sustancias psicoactivas",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.1.3",
										name: "<b>F20–F29</b>",
										data: {
											"desc": "Esquizofrenia, trastornos esquizotípicos y trastornos delirantes",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.1.4",
										name: "<b>F30–F39</b>",
										data: {
											"desc": "Trastornos del humor [afectivos]",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.1.5",
										name: "<b>F40–F48</b>",
										data: {
											"desc": "Trastornos neuróticos, trastornos relacionados con el estrés y trastornos somatomorfos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.1.6",
										name: "<b>F50–F59</b>",
										data: {
											"desc": "Síndromes del comportamiento asociados con alteraciones fisiológicas y factores físicos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.1.7",
										name: "<b>F60–F69</b>",
										data: {
											"desc": "Trastornos de la personalidad y del comportamiento en adultos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.1.8",
										name: "<b>F70–F79</b>",
										data: {
											"desc": "Retraso mental",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.1.9",
										name: "<b>F80–F89</b>",
										data: {
											"desc": "Trastornos del desarrollo psicológico",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.1.10",
										name: "<b>F90–F98</b>",
										data: {
											"desc": "Trastornos emocionales y del comportamiento que aparecen habitualmente en la niñez y en la adolescencia",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.1.11",
										name: "F99",
										data: {
											"desc": "Trastorno mental no especificado",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.1.1.2", 
								name: "Alcohol",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.1.2.1",
										name: "F10",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de alcohol",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.1.1.3", 
								name: "Drogas",
								data: {
									"desc": "Sustancias ilegales",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.1.3.1",
										name: "F11",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de opiáceos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.3.2",
										name: "F12",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de cannabinoides",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.3.3",
										name: "F13",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de sedantes o hipnóticos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.3.4",
										name: "F14",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de cocaína",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.3.5",
										name: "F15",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de otros estimulantes, incluida la cafeína",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.3.6",
										name: "F16",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de alucinógenos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.3.7",
										name: "F18",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de disolventes volátiles",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.3.8",
										name: "F19",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de múltiples drogas y al uso de otras sustancias psicoactivas",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.1.1.4", 
								name: "Homicidio",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.1.4.1",
										name: "<b>X85-X90,X96-X98,Y01-Y08</b>",
										data: {
											"desc": "Otros medios",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.4.2",
										name: "X91,X92",
										data: {
											"desc": "Ahorcamiento, estrangulamiento, sofocación, ahogamiento y sumersión",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.4.3",
										name: "X99,Y00",
										data: {
											"desc": "Objeto cortante o punzante",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.4.4",
										name: "<b>X93-X95</b>",
										data: {
											"desc": "Disparo de arma",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.1.1.5", 
								name: "Lesiones autoinfligidas",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "node1.1.1.5.1",
										name: "<b>X60-X67</b>, X69",
										data: {
											"desc": "Envenenamiento",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.5.2",
										name: "X68",
										data: {
											"desc": "Plaguicidas",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.5.3",
										name: "X70",
										data: {
											"desc": "Ahorcamiento",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.5.4",
										name: "X71",
										data: {
											"desc": "Ahogamiento",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.5.5",
										name: "<b>X72-X74</b>",
										data: {
											"desc": "Arma de fuego",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.5.6",
										name: "<b>X75-X84</b>,Y870",
										data: {
											"desc": "Otras",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.1.1.6", 
								name: "Accidentes de tránsito",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "node1.1.1.6.1",
										name: "Peatón",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.6.2",
										name: "Motociclista",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.6.3",
										name: "Ciclista",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.1.6.4",
										name: "Ocupante de vehículo",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							}
						]
					},
					{
						id: "node1.1.2", 
						name: "Recursos",
						data: {
							"desc": "Disponibilidad",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.1.2.1", 
								name: "Humanos",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.2.1.1", 
										name: "Psiquiatras",
										data: {
											"desc": "",
											"$width": ancho_med,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.2.1.2", 
										name: "Psicólogos",
										data: {
											"desc": "",
											"$width": ancho_med,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.2.1.3", 
										name: "Equipos de salud mental",
										data: {
											"desc": "Profesionales con formación específica en el abordaje y manejo de los problemas de salud mental, puede estar conformado por: psiquiátras, psicólogos, trabajadores sociales y enfermeras",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]
							},
							{
								id: "node1.1.2.2", 
								name: "Infraestructura",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.2.2.1", 
										name: "Unidades de Salud Mental y Adicciones",
										data: {
											"desc": "",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.2.2.1.1", 
												name: "Primer nivel",
												data: {
													"desc": "",
													"$width": ancho_med,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.2.1.2", 
												name: "Segundo y tercer nivel",
												data: {
													"desc": "",
													"$width": ancho_med,
													"$height": alto_min
												},
												children: []
											}
										]
									},
									{
										id: "node1.1.2.2.2", 
										name: "Camas psiquiátricas",
										data: {
											"desc": "",
											"$width": ancho_med,
											"$height": alto_min
										},
										children: []
									}
								]
							}
						]
					},
					{
						id: "node1.1.3", 
						name: "Egresos",
						data: {
							"desc": "Morbilidad",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.1.3.1", 
								name: "Trastornos mentales y uso de sustancias",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min*2
								},
								children: [
									{
										id: "node1.1.3.1.1",
										name: "<b>F00–F09</b>",
										data: {
											"desc": "Trastornos mentales orgánicos, incluidos los trastornos sintomáticos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.1.2",
										name: "<b>F10–F19</b>",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de sustancias psicoactivas",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.1.3",
										name: "<b>F20–F29</b>",
										data: {
											"desc": "Esquizofrenia, trastornos esquizotípicos y trastornos delirantes",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.1.4",
										name: "<b>F30–F39</b>",
										data: {
											"desc": "Trastornos del humor [afectivos]",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.1.5",
										name: "<b>F40–F48</b>",
										data: {
											"desc": "Trastornos neuróticos, trastornos relacionados con el estrés y trastornos somatomorfos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.1.6",
										name: "<b>F50–F59</b>",
										data: {
											"desc": "Síndromes del comportamiento asociados con alteraciones fisiológicas y factores físicos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.1.7",
										name: "<b>F60–F69</b>",
										data: {
											"desc": "Trastornos de la personalidad y del comportamiento en adultos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.1.8",
										name: "<b>F70–F79</b>",
										data: {
											"desc": "Retraso mental",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.1.9",
										name: "<b>F80–F89</b>",
										data: {
											"desc": "Trastornos del desarrollo psicológico",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.1.10",
										name: "<b>F90–F98</b>",
										data: {
											"desc": "Trastornos emocionales y del comportamiento que aparecen habitualmente en la niñez y en la adolescencia",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.1.11",
										name: "F99",
										data: {
											"desc": "Trastorno mental no especificado",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.1.3.2", 
								name: "Alcohol",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.3.2.1",
										name: "F10",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de alcohol",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.1.3.3", 
								name: "Drogas",
								data: {
									"desc": "Sustancias ilegales",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.3.3.1",
										name: "F11",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de opiáceos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.3.2",
										name: "F12",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de cannabinoides",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.3.3",
										name: "F13",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de sedantes o hipnóticos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.3.4",
										name: "F14",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de cocaína",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.3.5",
										name: "F15",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de otros estimulantes, incluida la cafeína",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.3.6",
										name: "F16",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de alucinógenos",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.3.7",
										name: "F18",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de disolventes volátiles",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.3.8",
										name: "F19",
										data: {
											"desc": "Trastornos mentales y del comportamiento debidos al uso de múltiples drogas y al uso de otras sustancias psicoactivas",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.1.3.4", 
								name: "Homicidio",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.3.4.1",
										name: "<b>X85-X90,X96-X98,Y01-Y08</b>",
										data: {
											"desc": "Otros medios",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.4.2",
										name: "X91,X92",
										data: {
											"desc": "Ahorcamiento, estrangulamiento, sofocación, ahogamiento y sumersión",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.4.3",
										name: "X99,Y00",
										data: {
											"desc": "Objeto cortante o punzante",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.4.4",
										name: "<b>X93-X95</b>",
										data: {
											"desc": "Disparo de arma",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.1.3.5", 
								name: "Lesiones autoinfligidas",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "node1.1.3.5.1",
										name: "<b>X60-X67</b>, X69",
										data: {
											"desc": "Envenenamiento",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.5.2",
										name: "X68",
										data: {
											"desc": "Plaguicidas",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.5.3",
										name: "X70",
										data: {
											"desc": "Ahorcamiento",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.5.4",
										name: "X71",
										data: {
											"desc": "Ahogamiento",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.5.5",
										name: "<b>X72-X74</b>",
										data: {
											"desc": "Arma de fuego",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.5.6",
										name: "<b>X75-X84</b>,Y870",
										data: {
											"desc": "Otras",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.1.3.6", 
								name: "Accidentes de tránsito",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "node1.1.3.6.1",
										name: "Peatón",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.6.2",
										name: "Motociclista",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.6.3",
										name: "Ciclista",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.1.3.6.4",
										name: "Ocupante de vehículo",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: []
									}
								]
							}
						]
					}
				]
			},
			{
				id: "node1.2",
				name: "Proporciones",
				data: {
				"desc": "Comparación a través de una división que expresa la frecuencia con la cual la población recibe atención para algún problema de salud mental o consumo de sustancias en relación con la población atendida para estos padecimientos en un periodo determinado",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.2.1", 
						name: "Uso de servicios",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.2.1.1", 
								name: "Trastornos mentales y uso de sustancias",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min*2
								},
								children: []
							},
							{
								id: "node1.2.1.2", 
								name: "Alcohol",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.2.1.3", 
								name: "Drogas",
								data: {
									"desc": "Sustancias ilegales",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.2.1.4", 
								name: "Violencia",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.2.1.5", 
								name: "Estimulación temprana",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.2.1.6", 
								name: "Sesiones de psicología",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.2.1.7", 
								name: "Rehabilitación",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							}
						]
					},
					{
						id: "node1.2.2", 
						name: "Método suicidio",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.2.2.1", 
								name: "Método empleado para lesiones autoinfligidas",
								data: {
									"desc": "",
									"$width": ancho_med,
									"$height": alto_min*2
								},
								children: []
							}
						]
					}
				]
			}
		]
	};
    //end
	
    //init Spacetree
    //Create a new ST instance
	var st = new $jit.ST({
		//id of viz container element
        injectInto: 'infovis',
        //set duration for the animation
        duration: 800,
        //set animation transition type
        transition: $jit.Trans.Quart.easeInOut,
        //set distance between node and its children
        levelDistance: 65,
        //enable panning
        Navigation: {
          enable:true,
          panning:true
        },
        //set node and edge styles
        //set overridable=true for styling individual
        //nodes or edges
        Node: {
            //height: node.data["alto"],
            //width: node.data["ancho"],
			//autoWidth: true,
			//autoHeight: true,
			type: 'rectangle',		//‘circle’, ‘rectangle’, ‘square’, ‘ellipse’, ‘triangle’, ‘star’
            color: '#9770BD',
            overridable: true
        },
        
        Edge: {
            type: 'bezier',
            overridable: true
        },
        
		Tips: {  
			enable: true,  
			type: 'auto',  
			offsetX: 10,  
			offsetY: 10,  
			onShow: function(tip, node) {  
			  tip.innerHTML = node.data["desc"];  
			}  
		},
		
        onBeforeCompute: function(node){
            Log.write("loading " + node.name);
        },
        
        onAfterCompute: function(){
            Log.write("done");
        },
        
        //This method is called on DOM label creation.
        //Use this method to add event handlers and styles to
        //your node.
        onCreateLabel: function(label, node){
            label.id = node.id;            
            label.innerHTML = node.name;
            label.onclick = function(){
            	if(normal.checked) {
            	  st.onClick(node.id);
            	} else {
                st.setRoot(node.id, 'animate');
            	}
            };
            //set label styles
            var style = label.style;
            style.width = node.data.$width-5 + 'px';
            style.height = alto_min-1 + 'px';            
            style.cursor = 'pointer';
            style.color = '#161518';
            style.fontSize = '0.8em';
            style.textAlign= 'center';
            style.paddingTop = '3px';
        },
        
        //This method is called right before plotting
        //a node. It's useful for changing an individual node
        //style properties before plotting it.
        //The data properties prefixed with a dollar
        //sign will override the global node style properties.
        onBeforePlotNode: function(node){
            //add some color to the nodes in the path between the
            //root node and the selected node.
            if (node.selected) {
                node.data.$color = "#9E66D6";
            }
            else {
                delete node.data.$color;
				//node.data.$color = "#aaa";
                //if the node belongs to the last plotted level
                if(!node.anySubnode("exist")) {
                    //count children number
                    var count = 0;
                    node.eachSubnode(function(n) { count++; });
                    //assign a node color based on how many children it has
					//Sugerencia de consulta de colores https://htmlcolorcodes.com/es/
                    node.data.$color = [
						'#AC93D9', 
						'#AE94CF',
						'#C09FE0',
						'#9D75CF',
						'#9D75CF',
						'#C5A6EB',
						'#C5A6EB',
						'#C5A6EB',
						'#A287C4',
						'#A287C4',
						'#A088BF',
						'#906CB5',
						'#906CB5',
						'#9C74C4',
						'#9C74C4',
						'#9C74C4',
						'#9D75CF',
						'#9D75CF',
						'#9D75CF',
						'#9D75CF',
						'#9D75CF',
						'#9D75CF',
						'#A088BF',
						'#A088BF',
						'#A088BF',
						'#9781B4',
						'#9781B4',
						'#9781B4',
						'#9781B4',
						'#9781B4',
						'#9781B4',
						'#9781B4',
						'#9781B4',
						'#9781B4',
						'#9781B4',
					][count];
                }
            }
        },
	});
	
	//load json data
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    //st.geom.translate(new $jit.Complex(-200, 0), "current");
    //emulate a click on the root node.
    st.onClick(st.root);
    //end
    //Add event handlers to switch spacetree orientation.
    var top = $jit.id('r-top'), 
        left = $jit.id('r-left'), 
        //bottom = $jit.id('r-bottom'), 
        //right = $jit.id('r-right'),
        normal = $jit.id('s-normal');
        
	
	
	
    function changeHandler() {
        if(this.checked) {
            top.disabled = left.disabled = true;
			//top.disabled = bottom.disabled = right.disabled = left.disabled = true;
            st.switchPosition(this.value, "animate", {
                onComplete: function(){
                    //top.disabled = bottom.disabled = right.disabled = left.disabled = false;
					top.disabled = left.disabled = false;
                }
            });
        }
    };
    
    //top.onchange = left.onchange = bottom.onchange = right.onchange = changeHandler;
	top.onchange = left.onchange = changeHandler;
    //end

}
