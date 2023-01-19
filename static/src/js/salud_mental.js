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
	var alto_base = 15;
	var alto_mini = 33;
	var alto_min = 40;
	var alto_med = 45;
	var alto_medi = 48;
	var alto_gra = 51;
	var alto_media = 54;
	var alto_max = 71;
	var alto_maxi = 75;
	var alto_uni = 135;
	var alto_gig = 166;
	var ancho_chi = 85;
	var ancho_min = 99;
	var ancho_med = 110;
	var ancho_medi = 115;
	var ancho_gde = 130;
	var ancho_gra = 160;
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
		name: "Fuentes de Información en Salud Mental y Adicciones",
		data: {
			"desc": "",
			"$width": ancho_max,
			"$height": alto_med
		},
		children: [
			{
				id: "node1.1",
				name: "Trastornos por uso de sustancias",
				data: {
					"desc": "",
					"$width": ancho_med,
					"$height": alto_med
				},
				children: [
					{
						id: "node1.1.1",
						name: "Morbilidad",
						data: {
							"desc": "Sistema de Información en Salud",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.1.1.1",
								name: "Atención primaria",
								data: {
									"desc": "Atención médica de primer contacto que actúa como puerta de entrada al sistema de salud",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
								        id: "node1.1.1.1.1",
								        name: "Servicios de atención por uso de sustancias",
								        data: {
									        "desc": "",
									        "$width": ancho_gde,
									        "$height": alto_medi
								        },
								        children: [
											{
												id: "node1.1.1.1.1.1",
												name: "Hospital psiquiátrico",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_med
												},
												children: [
													{
														id: "node1.1.1.1.1.1.1",
														name: "Atención por adicciones",
														data: {
															"desc": "",
															"$width": ancho_min,
															"$height": alto_med
														},
														children: [
															{
																id: "node1.1.1.1.1.1.1.1",
																name: "Alcohol",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_mini
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.1.1.2",
																name: "Tabaco",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_mini
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.1.1.3",
																name: "Fármacos",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_mini
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.1.1.4",
																name: "Otras",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_mini
																},
																children: []
															}
														]
													}
												]
											},
											{
												id: "node1.1.1.1.1.2",
												name: "CNV/CAPA",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_med
												},
												children: [
													{
														id: "node1.1.1.1.1.2.1",
														name: "Demanda de atención por consumo de sustancias",
														data: {
															"desc": "",
															"$width": ancho_min,
															"$height": alto_maxi
														},
														children: [
															{
																id: "node1.1.1.1.1.2.1.1",
																name: "Alcohol",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.1.2",
																name: "Tabaco",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.1.3",
																name: "Cannabis",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.1.4",
																name: "Cocaína",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.1.5",
																name: "Metanfetamina",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.1.6",
																name: "Inhalables y solventes",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.1.7",
																name: "Otras drogas",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															}
														]
													},
													{
														id: "node1.1.1.1.1.2.2",
														name: "Tratamiento breve concluido",
														data: {
															"desc": "",
															"$width": ancho_min,
															"$height": alto_med
														},
														children: [
															{
																id: "node1.1.1.1.1.2.2.1",
																name: "Alcohol",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.2.2",
																name: "Tabaco",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.2.3",
																name: "Cannabis",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.2.4",
																name: "Cocaína",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.2.5",
																name: "Metanfetamina",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.2.6",
																name: "Inhalables y solventes",
																data: {
																	"desc": "",
																	"$width": ancho_min,
																	"$height": alto_min
																},
																children: []
															},
															{
																id: "node1.1.1.1.1.2.2.7",
																name: "Otras drogas",
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
							        }
								]
							},
							{
								id: "node1.1.1.2",
								name: "Atención hospitalaria",
								data: {
									"desc": "Atención médica quirúrgica o de rehabilitación otorgada a enfermos que requieren internamiento",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.1.2.1",
								        name: "Egresos",
								        data: {
									        "desc": "Subsistema de Egresos Hospitalarios",
									        "$width": ancho_min,
									        "$height": alto_min
								        },
										children: [
											{
												id: "node1.1.1.2.3.1",
												name: "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
												data: {
													"desc": "Trastornos mentales debidos al consumo de sustancias psicoactivas, códigos CIE incluye F10-F19",
													"$width": ancho_gra,
													"$height": alto_maxi
												},
												children: []
											}
										]
									},
									{
										id: "node1.1.1.2.2",
										name: "Urgencias",
										data: {
											"desc": "Subsistema de Urgencias Médicas",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.1.1.2.3.1",
												name: "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
												data: {
													"desc": "Trastornos mentales debidos al consumo de sustancias psicoactivas, códigos CIE incluye F10-F19",
													"$width": ancho_gra,
													"$height": alto_maxi
												},
												children: []
											}
										]
									},
									{
										id: "node1.1.1.2.3",
										name: "Lesiones",
										data: {
											"desc": "Subsistema de Lesiones y Causas de Violencia",
											"$width": ancho_min,
											"$height": alto_min
										},
								        children: [
											{
												id: "node1.1.1.2.3.1",
												name: "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
												data: {
													"desc": "Trastornos mentales debidos al consumo de sustancias psicoactivas, códigos CIE incluye F10-F19",
													"$width": ancho_gra,
													"$height": alto_maxi
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
						id: "node1.1.2",
						name: "Mortalidad",
						data: {
							"desc": "Sistema Epidemiológico de Defunciones",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.1.2.1",
								name: "<b>F10</b> Alcohol",
								data: {
									"desc": "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.1.2.2",
								name: "<b>F11</b> Opiáceos",
								data: {
									"desc": "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.1.2.3",
								name: "<b>F12</b> Cannabinoides",
								data: {
									"desc": "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.1.2.4",
								name: "<b>F13</b> Sedantes o hipnóticos",
								data: {
									"desc": "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.1.2.5",
								name: "<b>F14</b> Cocaína",
								data: {
									"desc": "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.1.2.6",
								name: "<b>F15</b> Otros estimulantes, incluida la cafeína",
								data: {
									"desc": "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
									"$width": ancho_med,
									"$height": alto_media
								},
								children: []
							},
							{
								id: "node1.1.2.7",
								name: "<b>F16</b> Alucinógenos",
								data: {
									"desc": "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.1.2.8",
								name: "<b>F17</b> Tabaco",
								data: {
									"desc": "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.1.2.9",
								name: "<b>F18</b> Disolventes volátiles",
								data: {
									"desc": "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.1.2.10",
								name: "<b>F19</b> Múltiples drogas y otras sustancias psicoactivas",
								data: {
									"desc": "Intoxicación<br>Consumo perjudicial<br>Dependencia<br>Síndrome de abstinencia",
									"$width": ancho_med,
									"$height": alto_maxi
								},
								children: []
							}
						]
					}
				]
			},
			{
				id: "node1.2",
				name: "Trastornos mentales",
				data: {
					"desc": "",
					"$width": ancho_med,
					"$height": alto_med
				},
				children: [
					{
						id: "node1.2.1",
						name: "Morbilidad",
						data: {
							"desc": "Sistema de Información en Salud",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.2.1.1",
								name: "Atención primaria",
								data: {
									"desc": "Atención médica de primer contacto que actúa como puerta de entrada al sistema de salud",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [	
									{
										id: "node1.2.1.1.1",
										name: "Hospitalización",
										data: {
											"desc": "Primera vez<br>Subsecuente",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.2.1.1.1.1",
												name: "Psicología",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_mini
												},
												children: [
													{
														id: "node1.2.1.1.1.1.1",
														name: "Individual",
														data: {
															"desc": "",
															"$width": ancho_min,
															"$height": alto_mini
														},
														children: []
													},
													{
														id: "node1.2.1.1.1.1.2",
														name: "Grupal",
														data: {
															"desc": "",
															"$width": ancho_min,
															"$height": alto_mini
														},
														children: []
													},
													{
														id: "node1.2.1.1.1.1.3",
														name: "Familiar",
														data: {
															"desc": "",
															"$width": ancho_min,
															"$height": alto_mini
														},
														children: []
													},		
												]
											},
											{
												id: "node1.2.1.1.1.2",
												name: "Psiquiatría",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_mini
												},
												children: []
											},
											{
												id: "node1.2.1.1.1.3",
												name: "Psicogeriatría",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_mini
												},
												children: []
											},
											{
												id: "node1.2.1.1.1.4",
												name: "Paidopsiquiatría",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_mini
												},
												children: []
											},
											{
												id: "node1.2.1.1.1.5",
												name: "Medicina general",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_mini
												},
												children: []
											},
											{
												id: "node1.2.1.1.1.6",
												name: "Rehabilitación",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_mini
												},
												children: [
													{
														id: "node1.2.1.1.1.6.1",
														name: "Física",
														data: {
															"desc": "",
															"$width": ancho_min,
															"$height": alto_mini
														},
														children: []
													},
													{
														id: "node1.2.1.1.1.6.2",
														name: "Vida cotidiana",
														data: {
															"desc": "",
															"$width": ancho_min,
															"$height": alto_mini
														},
														children: []
													},
													{
														id: "node1.2.1.1.1.6.3",
														name: "Ocupacional",
														data: {
															"desc": "",
															"$width": ancho_min,
															"$height": alto_mini
														},
														children: []
													},
													{
														id: "node1.2.1.1.1.6.4",
														name: "Comunicación",
														data: {
															"desc": "",
															"$width": ancho_min,
															"$height": alto_mini
														},
														children: []
													},	
												]
											},
											{
												id: "node1.2.1.1.1.7",
												name: "Otros",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_mini
												},
												children: []
											}
										]
									},	
									{
										id: "node1.2.1.1.2",
										name: "Primer nivel",
										data: {
											"desc": "Primera vez<br>Subsecuente",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.2.1.1.2.1",
												name: "Detecciones",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.1.1.2.2",
												name: "Consulta especializada",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.1.1.2.3",
												name: "Violencia",
												data: {
													"desc": "",
													"$width": ancho_min,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.1.1.2.4",
												name: "Conducta alimentaria",
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
								id: "node1.2.1.2",
								name: "Atención hospitalaria",
								data: {
									"desc": "Atención médica quirúrgica o de rehabilitación otorgada a enfermos que requieren internamiento",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.2.1.2.1",
										name: "<b>F0</b>: Orgánicos",
										data: {
											"desc": "Primera vez<br>Más de una vez",
											"$width": ancho_gra,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.1.2.2",
										name: "<b>F2</b>: Esquizofrenia, esquizotípico y trastorno con ideas delirantes",
										data: {
											"desc": "Primera vez<br>Más de una vez",
											"$width": ancho_gra,
											"$height": alto_media
										},
										children: []
									},
									{
										id: "node1.2.1.2.3",
										name: "<b>F3</b>: Afectivos y del humor",
										data: {
											"desc": "Primera vez<br>Más de una vez",
											"$width": ancho_gra,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.1.2.4",
										name: "<b>F4</b>: Neuróticos, somatomorfos y secundarios a situaciones estresantes",
										data: {
											"desc": "Primera vez<br>Más de una vez",
											"$width": ancho_gra,
											"$height": alto_media
										},
										children: []
									},
									{
										id: "node1.2.1.2.5",
										name: "<b>F5</b>: Asociados a disfunciones fisiológicas y a factores somáticos",
										data: {
											"desc": "Primera vez<br>Más de una vez",
											"$width": ancho_gra,
											"$height": alto_media
										},
										children: []
									},
									{
										id: "node1.2.1.2.6",
										name: "<b>F6</b>: Personalidad del adulto y de su comportamiento",
										data: {
											"desc": "Primera vez<br>Más de una vez",
											"$width": ancho_gra,
											"$height": alto_gra
										},
										children: []
									},
									{
										id: "node1.2.1.2.7",
										name: "<b>F7</b>: Retraso mental",
										data: {
											"desc": "Primera vez<br>Más de una vez",
											"$width": ancho_gra,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.1.2.8",
										name: "<b>F8</b>: Del desarrollo psicológico",
										data: {
											"desc": "Primera vez<br>Más de una vez",
											"$width": ancho_gra,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.1.2.9",
										name: "<b>F9</b>: De comienzo en la infancia y adolescencia",
										data: {
											"desc": "Primera vez<br>Más de una vez",
											"$width": ancho_gra,
											"$height": alto_med
										},
										children: []
									}
								]
							}	
						]
					},
					{
						id: "node1.2.2",
						name: "Mortalidad",
						data: {
							"desc": "Sistema Epidemiológico de Defunciones",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.2.2.1",
								name: "<b>F0</b>: Orgánicos",
								data: {
									"desc": "",
									"$width": ancho_gra,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.2.2.2",
								name: "<b>F2</b>: Esquizofrenia, esquizotípico y trastorno con ideas delirantes",
								data: {
									"desc": "",
									"$width": ancho_gra,
									"$height": alto_media
								},
								children: []
							},
							{
								id: "node1.2.2.3",
								name: "<b>F3</b>: Afectivos y del humor",
								data: {
									"desc": "",
									"$width": ancho_gra,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.2.2.4",
								name: "<b>F4</b>: Neuróticos, somatomorfos y secundarios a situaciones estresantes",
								data: {
									"desc": "",
									"$width": ancho_gra,
									"$height": alto_media
								},
								children: []
							},
							{
								id: "node1.2.2.5",
								name: "<b>F5</b>: Asociados a disfunciones fisiológicas y a factores somáticos",
								data: {
									"desc": "",
									"$width": ancho_gra,
									"$height": alto_media
								},
								children: []
							},
							{
								id: "node1.2.2.6",
								name: "<b>F6</b>: Personalidad del adulto y de su comportamiento",
								data: {
									"desc": "",
									"$width": ancho_gra,
									"$height": alto_gra
								},
								children: []
							},
							{
								id: "node1.2.2.7",
								name: "<b>F7</b>: Retraso mental",
								data: {
									"desc": "",
									"$width": ancho_gra,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.2.2.8",
								name: "<b>F8</b>: Del desarrollo psicológico",
								data: {
									"desc": "",
									"$width": ancho_gra,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.2.2.9",
								name: "<b>F9</b>: De comienzo en la infancia y adolescencia",
								data: {
									"desc": "",
									"$width": ancho_gra,
									"$height": alto_med
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
						'#7C5C96',
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
