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
	console.log("org_ser_js");
    //init data
    var alto_base = 13;
	var alto_min = 30;
	var alto_med = 42;
	var alto_max = 66;
	var alto_uni = 135;
	var alto_gig = 166;
	var ancho_chi = 85;
	var ancho_min = 97;
	var ancho_med = 110;
	var ancho_gde = 123;
    var ancho_gra = 155
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
		name: "Organización de los servicios de salud",
		data: {
			"desc": "",
			"$width": ancho_max,
			"$height": alto_med
		},
		children: [
			{
				id: "node1.1",
				name: "Atención hospitalaria",
				data: {
					"desc": "Atención médica quirúrgica o de rehabilitación otorgada a enfermos que requieren internamiento",
					"$width": ancho_min,
					"$height": alto_med
				},
				children: [
					{
						id: "node1.1.1",
						name: "DIF",
						data: {
							"desc": "Sistema Nacional para el Desarrollo Integral de la Familia",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.1.1.1",
								name: "Segundo nivel",
								data: {
									"desc": "Atención hospitalaria general",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.1.1.1",
										name: "Hospital General",
										data: {
											"desc": "Servicios de diagnóstico y tratamiento de especialidades básicas",
											"$width": ancho_med,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.1.1.1.1.1",
												name: "HG",
												data: {
													"desc": "Hospital General",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									}
								]
							},
							{
								id: "node1.1.1.2",
								name: "Tercer nivel",
								data: {
									"desc": "Atención hospitalaria de alta especialidad",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.1.2.1",
										name: "Hospital Especializado",
										data: {
											"desc": "Servicios de atención de una o varias especialidades y sus correspondientes subespecialidades",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.1.2.1.1",
												name: "HESP",
												data: {
													"desc": "Hospital de Especialidades",
													"$width": ancho_chi,
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
						id: "node1.1.2",
						name: "IMSS",
						data: {
							"desc": "Instituto Mexicano del Seguro Social",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.1.2.1",
								name: "Segundo nivel",
								data: {
									"desc": "Atención hospitalaria general",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.2.1.1",
										name: "Hospital General",
										data: {
											"desc": "Servicios de cuatro especialidades básicas: cirugía, gineco-obstetricia, medicina interna, pediatría y otras especialidades médico quirúrgicas",
											"$width": ancho_med,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.1.2.1.1.1",
												name: "HG",
												data: {
													"desc": "Hospital General",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.1.1.2",
												name: "HGR",
												data: {
													"desc": "Hospital General Regional",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.1.1.3",
												name: "HGR/UMAA",
												data: {
													"desc": "Hospital General Regional con Unidad Médica Ambulatoria",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.1.1.4",
												name: "HGS",
												data: {
													"desc": "Hospital General de Subzona",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.1.1.5",
												name: "HGSMF",
												data: {
													"desc": "Hospital General de Subzona con Medicina Familiar",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.1.1.6",
												name: "HGZ",
												data: {
													"desc": "Hospital General de Zona",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.1.1.7",
												name: "HGZMF",
												data: {
													"desc": "Hospital General de Zona con Medicina Familiar",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									},
									{
										id: "node1.1.2.1.2",
										name: "Hospital Especializado",
										data: {
											"desc": "Atención médica de alta especialidad a los pacientes con padecimientos de alta complejidad",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.2.1.2.1",
												name: "HGO",
												data: {
													"desc": "Hospital de Gineco-Obstetricia",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.1.2.2",
												name: "HGOMF",
												data: {
													"desc": "Hospital de Gineco-Obstetricia con Medicina Familiar",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.1.2.3",
												name: "HGP",
												data: {
													"desc": "Hospital de Gineco-Pediatría",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.1.2.4",
												name: "HGPMF",
												data: {
													"desc": "Hospital de Gineco-Pediatría con Medicina Familiar",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.1.2.5",
												name: "HTRA",
												data: {
													"desc": "Hospital de Traumatología",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									},
									{
										id: "node1.1.2.1.3",
										name: "Salud Mental y Adicciones",
										data: {
											"desc": "Unidades de salud dirigidas a la atención de salud mental",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.2.1.3.1",
												name: "HPSIQ",
												data: {
													"desc": "Hospital Psiquiátrico",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									}
								]
							},
							{
								id: "node1.1.2.2",
								name: "Tercer nivel",
								data: {
									"desc": "Atención hospitalaria de alta especialidad",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.2.2.1",
										name: "Hospital Especializado",
										data: {
											"desc": "Atención médica de alta especialidad a los pacientes con padecimientos de alta complejidad y fomenta la educación y la investigación en salud",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.2.2.1.1",
												name: "HCARD",
												data: {
													"desc": "Hospital de Cardiología",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.2.1.2",
												name: "HESP",
												data: {
													"desc": "Hospital de Especialidades",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.2.1.3",
												name: "HGP",
												data: {
													"desc": "Hospital de Gineco-Pediatría",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.2.1.4",
												name: "HINF",
												data: {
													"desc": "Hospital Infectología",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.2.1.5",
												name: "HONCO",
												data: {
													"desc": "Hospital de Oncología",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.2.1.6",
												name: "HORTO",
												data: {
													"desc": "Hospital de Ortopedia",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.2.1.7",
												name: "HPED",
												data: {
													"desc": "Hospital Pediatría",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.2.1.8",
												name: "HTO",
												data: {
													"desc": "Hospital de Traumatología y Ortopedia",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.2.2.1.9",
												name: "HTRA",
												data: {
													"desc": "Hospital de Traumatología",
													"$width": ancho_chi,
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
						id: "node1.1.3",
						name: "IMSS-Bienestar",
						data: {
							"desc": "Instituto Mexicano del Seguro Social régimen Bienestar",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.1.3.1",
								name: "Segundo nivel",
								data: {
									"desc": "Atención hospitalaria general",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.3.1.1",
										name: "Hospital General",
										data: {
											"desc": "Servicios de diagnóstico y tratamiento de especialidades básicas",
											"$width": ancho_med,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.1.3.1.1.1",
												name: "HR",
												data: {
													"desc": "Hospital Rural",
													"$width": ancho_chi,
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
						id: "node1.1.4",
						name: "ISSSTE",
						data: {
							"desc": "Instituto de Seguridad y Servicios Sociales para los Trabajadores del Estado",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.1.4.1",
								name: "Segundo nivel",
								data: {
									"desc": "Atención hospitalaria general",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.4.1.1",
										name: "Hospital General",
										data: {
											"desc": "Servicios de las cuatro especialidades básicas, auxiliares de diagnóstico y tratamiento",
											"$width": ancho_med,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.1.4.1.1.1",
												name: "HG",
												data: {
													"desc": "Hospital General",	
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.4.1.1.2",
												name: "CH",
												data: {
													"desc": "Clínica Hospital",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									},
									{
										id: "node1.1.4.1.2",
										name: "Hospital Especializado",
										data: {
											"desc": "Servicios de las cuatro especialidades, con más infraestructura y mayor capacidad resolutiva",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.4.1.2.1",
												name: "HR/HAE",
												data: {
													"desc": "Hospital Regional/Hospital de Alta Especialidad",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									}	
								]
							},
							{
								id: "node1.1.4.2",
								name: "Tercer nivel",
								data: {
									"desc": "Atención hospitalaria de alta especialidad",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.4.2.1",
										name: "Hospital Especializado",
										data: {
											"desc": "Servicios de atención al paciente en estado crítico con equipamento avanzado, incluye apoyo especializado para la vigilancia epidemiológica de padecimientos con dificultad de tratamiento y control",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.4.2.1.1",
												name: "CMN",
												data: {
													"desc": "Centro Médico Nacional",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.4.2.1.2",
												name: "HR/HAE",
												data: {
													"desc": "Hospital Regional/Hospital de Alta Especialidad",
													"$width": ancho_chi,
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
						id: "node1.1.5",
						name: "SSA",
						data: {
							"desc": "Secretaría de Salud, incluye Centros de Integración Juvenil y Servicios Médicos Estatales",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.1.5.1",
								name: "Segundo nivel",
								data: {
									"desc": "Atención hospitalaria general",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.5.1.1",
										name: "Hospital General",
										data: {
											"desc": "Servicios de diagnóstico y tratamiento de especialidades básicas",
											"$width": ancho_med,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.1.5.1.1.1",
												name: "HG",
												data: {
													"desc": "Hospital General",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.5.1.1.2",
												name: "M",
												data: {
													"desc": "Hospital General",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.5.1.1.3",
												name: "N",
												data: {
													"desc": "Hospital Integral (Comunitario)",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									},
									{
										id: "node1.1.5.1.2",
										name: "Hospital Especializado",
										data: {
											"desc": "Servicios de atención de una o varias especialidades y sus correspondientes subespecialidades",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.5.1.2.1",
												name: "HESP",
												data: {
													"desc": "Hospital de Especialidades",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.5.1.2.2",
												name: "O",
												data: {
													"desc": "Hospital Especializado",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									},
									{
										id: "node1.1.5.1.3",
										name: "Unidades Médicas Familiares",
										data: {
											"desc": "Establecimiento con servicios de medicina familiar integral, laboratorio y curaciones",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.5.1.3.1",
												name: "UMF",
												data: {
													"desc": "Unidad de Medicina Familiar",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									},
									{
										id: "node1.1.5.1.4",
										name: "Salud Mental y Adicciones",
										data: {
											"desc": "Unidades de salud dirigidas a la atención de salud mental",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.5.1.4.1",
												name: "O",
												data: {
													"desc": "Hospital Especializado",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.5.1.4.2",
												name: "T",
												data: {
													"desc": "Clínica de Especialidades",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.5.1.4.3",
												name: "Y",
												data: {
													"desc": "Hospital Psiquiátrico",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									},
									{
										id: "node1.1.5.1.5",
										name: "Hospital Reclusorio",
										data: {
											"desc": "Establecimiento dentro de reclusorio",
											"$width": ancho_med,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.1.5.1.5.1",
												name: "M",
												data: {
													"desc": "Hospital General",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
										]
									}
								]
							},
							{
								id: "node1.1.5.2",
								name: "Tercer nivel",
								data: {
									"desc": "Atención hospitalaria de alta especialidad",
									"$width": ancho_min,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.1.5.2.1",
										name: "Hospital Especializado",
										data: {
											"desc": "Servicios de atención de una o varias especialidades y sus correspondientes subespecialidades",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.5.2.1.1",
												name: "HESP",
												data: {
													"desc": "Hospital de Especialidades",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.1.5.2.1.2",
												name: "O",
												data: {
													"desc": "Hospital Especializado",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									},
									{
										id: "node1.1.5.2.2",
										name: "Salud Mental y Adicciones",
										data: {
											"desc": "Unidades de salud dirigidas a la atención de salud mental",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: [
											{
												id: "node1.1.5.2.2.1",
												name: "Y",
												data: {
													"desc": "Hospital Psiquiátrico",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									},
								]
							}
						]
					}
				]
			},
			{
				id: "node1.2",
				name: "Atención primaria",
				data: {
					"desc": "Atención médica de primer contacto que actúa como puerta de entrada al sistema de salud",
					"$width": ancho_min,
					"$height": alto_med
				},
				children: [
					{
						id: "node1.2.1",
						name: "DIF",
						data: {
							"desc": "Sistema Nacional para el Desarrollo Integral de la Familia",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.2.1.1",
								name: "Centro de salud",
								data: {
									"desc": "Ofrece atención clínica básica y servicios básicos de salud a la comunidad, promoción de la salud y  diagnóstico temprano de enfermedades",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.2.1.2",
								name: "UNEME/T",
								data: {
									"desc": "Unidades de atención ambulatoria que acercan servicios de especialidad y alta especialidad en ambientes no hospitalarios",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.2.1.2.1",
										name: "T",
										data: {
											"desc": "Clínica de especialidades",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.2.1.2.1,1",
												name: "T15",
												data: {
													"desc": "Clínica de especialidades de rehabilitación física y ortopedia",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}	
										]
									}
								]
							},
							{
								id: "node1.2.1.3",
								name: "Salud mental y Adicciones",
								data: {
									"desc": "Unidades de salud dirigidas a la atención de salud mental",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "node1.2.1.3.1",
										name: "T",
										data: {
											"desc": "Clínica de especialidades",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.2.1.3.1.1",
												name: "T01",
												data: {
													"desc": "Clínica de especialidades de salud mental",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.1.3.1.2",
												name: "T02",
												data: {
													"desc": "Clínica de especialidades de atención a las adicciones, desintoxicaciones y toxicología",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									}
								]
							},
							{
								id: "node1.2.1.4",
								name: "Comunitaria",
								data: {
									"desc": "Establecimiento que ofrece servicios de especialidades básicas",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.2.1.4.1",
										name: "UMM",
										data: {
											"desc": "Unidad Médica Móvil",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									}
								]
							}
						]
					},
					{
						id: "node1.2.2",
						name: "IMSS",
						data: {
							"desc": "Instituto Mexicano del Seguro Social",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.2.2.1",
								name: "Centro de salud",
								data: {
									"desc": "Establecimiento de atención médica que ofrece atención clínica básica y servicios básicos de salud a la comunidad",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: []
							},
							{
								id: "node1.2.2.2",
								name: "Unidades Médicas Familiares",
								data: {
									"desc": "Establecimiento con servicios de medicina familiar integral, laboratorio y curaciones",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "node1.2.2.2.1",
										name: "UMAA",
										data: {
											"desc": "Unidad Médica de Atención Ambulatoria",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.2.2.2",
										name: "UMF",
										data: {
											"desc": "Unidad de Medicina Familiar",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.2.2.3",
										name: "UMFH",
										data: {
											"desc": "Unidad de Medicina Familiar con Hospitalización",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.2.2.4",
										name: "UMFR",
										data: {
											"desc": "Unidad de Medicina Física y Rehabilitación",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.2.2.5",
										name: "UMR",
										data: {
											"desc": "Unidad Médica Rural",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.2.2.3",
								name: "UNEME/T",
								data: {
									"desc": "Unidades de atención ambulatoria que acercan servicios de especialidad y alta especialidad en ambientes no hospitalarios",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.2.2.3.1",
										name: "CEXT",
										data: {
											"desc": "Consulta Externa de especialidades",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.2.3.2",
										name: "UDDX",
										data: {
											"desc": "Unidad de Control Metabólico Ambulatorio",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									}
								]
							}
						]
					},
					{
						id: "node1.2.3",
						name: "IMSS-Bienestar",
						data: {
							"desc": "Instituto Mexicano del Seguro Social régimen Bienestar",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.2.3.1",
								name: "Unidades Médicas Familiares",
								data: {
									"desc": "Establecimiento con servicios de medicina familiar integral, laboratorio y curaciones",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "node1.2.3.1.1",
										name: "UMR",
										data: {
											"desc": "Unidad Médica Rural",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.3.1.2",
										name: "UMU",
										data: {
											"desc": "Unidad Médica Urbana",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.2.3.2",
								name: "UNEME/T",
								data: {
									"desc": "Unidades de atención ambulatoria que acercan servicios de especialidad y alta especialidad en ambientes no hospitalarios",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.2.3.2.1",
										name: "CARO",
										data: {
											"desc": "Centro de Atención Rural Obstétrica",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.2.3.3",
								name: "Comunitaria",
								data: {
									"desc": "Establecimiento que ofrece servicios de especialidades básicas",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.2.3.3.1",
										name: "BS",
										data: {
											"desc": "Brigadas de Salud",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.3.3.2",
										name: "UMM",
										data: {
											"desc": "Unidad Médica Móvil",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									}
								]
							}
						]
					},
					{
						id: "node1.2.4",
						name: "ISSSTE",
						data: {
							"desc": "Instituto de Seguridad y Servicios Sociales para los Trabajadores del Estado",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.2.4.1",
								name: "Unidades Médicas Familiares",
								data: {
									"desc": "Servicios de medicina familiar, preventiva, planificación familiar y odontológica",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "node1.2.4.1.1",
										name: "CAF",
										data: {
											"desc": "Consultorio de Atención Familiar",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.4.1.2",
										name: "CMF",
										data: {
											"desc": "Clínica de Medicina Familiar",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.4.1.3",
										name: "UMF",
										data: {
											"desc": "Unidad de Medicina Familiar",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.4.1.4",
										name: "UMFA",
										data: {
											"desc": "Unidad de Medicina Familiar de un Consultorio",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.4.1.5",
										name: "UMFC",
										data: {
											"desc": "Unidad de Medicina Familiar de dos Consultorios y un Consultorio Dental",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.4.1.6",
										name: "UMFD",
										data: {
											"desc": "Unidad de Medicina Familiar de tres Consultorios, un Consultorio Dental y un Consultorio de Medicina Preventivo",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.4.1.7",
										name: "UMFE",
										data: {
											"desc": "Unidad de Medicina Familiar de cuatro Consultorios, un Consultorio Dental y un Consultorio de Medicina Preventiva",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.2.4.2",
								name: "UNEME/T",
								data: {
									"desc": "Unidades de atención ambulatoria que acercan servicios de especialidad y alta especialidad en ambientes no hospitalarios",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.2.4.2.1",
										name: "CE",
										data: {
											"desc": "Clínica de Especialidades",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.4.2.2",
										name: "CMFE",
										data: {
											"desc": "Clínica de Medicina Familiar con Especialidades",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.4.2.3",
										name: "T",
										data: {
											"desc": "Clínica de Especialidades",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.2.4.2.3.1",
												name: "T15",
												data: {
													"desc": "Clínica de especialidades de rehabilitación física y ortopedia",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									}
								]
							},
							{
								id: "node1.2.4.3",
								name: "Salud Mental y Adicciones",
								data: {
									"desc": "Unidades de salud dirigidas a la atención de salud mental",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "node1.2.4.3.1",
										name: "CE",
										data: {
											"desc": "Clínica de Especialidades",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.2.4.3.1.1",
												name: "UNE01",
												data: {
													"desc": "UNEMES de salud mental",
													"$width": ancho_chi,
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
						id: "node1.2.5",
						name: "SSA",
						data: {
							"desc": "Secretaría de Salud, incluye Centros de Integración Juvenil y Servicios Médicos Estatales",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: [
							{
								id: "node1.2.5.1",
								name: "Centro de Salud",
								data: {
									"desc": "Establecimiento de atención médica que ofrece atención clínica básica y servicios básicos de salud a la comunidad",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.2.5.1.1",
										name: "A",
										data: {
											"desc": "Rural de 01 núcleo básico",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.2",
										name: "B",
										data: {
											"desc": "Rural de 02 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.3",
										name: "C",
										data: {
											"desc": "Rural de 03 núcleos básicos y más",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.4",
										name: "D",
										data: {
											"desc": "Urbano de 01 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.5",
										name: "E",
										data: {
											"desc": "Urbano de 02 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.6",
										name: "F",
										data: {
											"desc": "Urbano de 03 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.7",
										name: "G",
										data: {
											"desc": "Urbano de 04 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.8",
										name: "H",
										data: {
											"desc": "Urbano de 05 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.9",
										name: "I",
										data: {
											"desc": "Urbano de 06 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.10",
										name: "J",
										data: {
											"desc": "Urbano de 07 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.11",
										name: "K",
										data: {
											"desc": "Urbano de 08 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.12",
										name: "L",
										data: {
											"desc": "Urbano de 09 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.13",
										name: "Q",
										data: {
											"desc": "Urbano de 10 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.14",
										name: "R",
										data: {
											"desc": "Urbano de 11 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.1.15",
										name: "S",
										data: {
											"desc": "Urbano de 12 núcleos básicos",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "1.2.5.1.16",
										name: "U",
										data: {
											"desc": "Consultorio Delegacional",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.2.5.2",
								name: "Centro Salud ampliado",
								data: {
									"desc": "Unidad médica de atención primaria a la salud con alta capacidad resolutiva, brinda servicios de especialidades",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "1.2.5.2.1",
										name: "CAP",
										data: {
											"desc": "Centros avanzados de Atención Primaria a la salud (CAAPS)",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "1.2.5.2.2",
										name: "CES",
										data: {
											"desc": "Centros de salud con servicios ampliados",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "1.2.5.2.3",
										name: "Z",
										data: {
											"desc": "Centro de salud con hospitalización",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.2.5.3",
								name: "UNEME/T",
								data: {
									"desc": "Unidades de atención ambulatoria que acercan servicios de especialidad y alta especialidad en ambientes no hospitalarios",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.2.5.3.1",
										name: "T",
										data: {
											"desc": "Clínica de Especialidades",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.2.5.3.1.1",
												name: "T03",
												data: {
													"desc": "Clínica de especialidades de prevención y atención a violencias",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.2",
												name: "T04",
												data: {
													"desc": "Clínica de especialidades de atención VIH/SIDA",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.3",
												name: "T05",
												data: {
													"desc": "Clínica de especialidades de reducción de riesgos sexuales",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.4",
												name: "T06",
												data: {
													"desc": "Clínica de especialidades de la mujer",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.5",
												name: "T07",
												data: {
													"desc": "Clínica de especialidades de cancerología o displasias",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.6",
												name: "T08",
												data: {
													"desc": "Clínica de especialidades de dolor y cuidados paliativos",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.7",
												name: "T09",
												data: {
													"desc": "Clínica de especialidades del niño y del adolescente",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.8",
												name: "T10",
												data: {
													"desc": "Clínica de especialidades de dermatología",
													"$width": ancho_chi,
													"$height": alto_min
													},
												children: [
													{
														id: "node1.2.5.3.1.8.1",
														name: "Con hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													},
													{
														id: "node1.2.5.3.1.8.2",
														name: "Sin hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													}
												]
											},
											{
												id: "node1.2.5.3.1.9",
												name: "T11",
												data: {
													"desc": "Clínica de especialidades de geriatría",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.10",
												name: "T12",
												data: {
													"desc": "Clínica de especialidades de odontología",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.11",
												name: "T13",
												data: {
													"desc": "Clínica de especialidades de oftalmología",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.12",
												name: "T14",
												data: {
													"desc": "Clínica de especialidades de optoaudiometría",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.13",
												name: "T15",
												data: {
													"desc": "Clínica de especialidades de rehabilitación física y ortopedia",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.14",
												name: "T16",
												data: {
													"desc": "Clínica de especialidades de diabetes",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.15",
												name: "T17",
												data: {
													"desc": "Clínica de especialidades de higiene escolar",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.16",
												name: "T18",
												data: {
													"desc": "Clínica de varias especialidades",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.1.17",
												name: "T99",
												data: {
													"desc": "Clínica de otras especialidades",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									},
									{
										id: "node1.2.5.3.2",
										name: "UNE",
										data: {
											"desc": "Unidad de Especialidades Médicas (UNEMES)",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.2.5.3.2.1",
												name: "UNE02",
												data: {
													"desc": "UNEMES de adicciones, CAPA, nueva vida",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.2.2",
												name: "UNE03",
												data: {
													"desc": "UNEMES CAPASIT (VIH/SIDA)",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.2.3",
												name: "UNE04",
												data: {
													"desc": "UNEMES padecimientos cardiovasculares, SORID",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.2.4",
												name: "UNE05",
												data: {
													"desc": "UNEMES de diagnóstico",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.2.5",
												name: "UNE06",
												data: {
													"desc": "UNEMES de hemodiálisis",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: [
													{
														id: "node1.2.5.3.2.5.1",
														name: "Con hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													},
													{
														id: "node1.2.5.3.2.5.2",
														name: "Sin hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													}
												]
											},
											{
												id: "node1.2.5.3.2.6",
												name: "UNE07",
												data: {
													"desc": "UNEMES de oncología",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: [
													{
														id: "node1.2.5.3.2.6.1",
														name: "Con hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													},
													{
														id: "node1.2.5.3.2.6.2",
														name: "Sin hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													}
												]
											},
											{
												id: "node1.2.5.3.2.7",
												name: "UNE09",
												data: {
													"desc": "UNEMES de cirugía ambulatoria",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: [
													{
														id: "node1.2.5.3.2.7.1",
														name: "Con hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													},
													{
														id: "node1.2.5.3.2.7.2",
														name: "Sin hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													}
												]
											},
											{
												id: "node1.2.5.3.2.8",
												name: "UNE11",
												data: {
													"desc": "UNEMES DEDICAM (Cáncer de mama)",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: [
													{
														id: "node1.2.5.3.2.8.1",
														name: "Con hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													},
													{
														id: "node1.2.5.3.2.8.2",
														name: "Sin hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													}
												]
											},
											{
												id: "node1.2.5.3.2.9",
												name: "UNE12",
												data: {
													"desc": "UNEMES SYGUE (Salud y género, unidad especializada)",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.2.10",
												name: "UNE14",
												data: {
													"desc": "UNEMES Casa de la mujer",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.3.2.11",
												name: "UNE99",
												data: {
													"desc": "UNEMES otras",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									}
								]
							},
							{
								id: "node1.2.5.4",
								name: "Salud Mental y Adicciones",
								data: {
									"desc": "Unidades de salud dirigidas a la atención de salud mental",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "node1.2.5.4.1",
										name: "T",
										data: {
											"desc": "Clínica de especialidades",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.2.5.4.1.1",
												name: "T01",
												data: {
													"desc": "Clínica de especialidades de salud mental",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "node1.2.5.4.1.2",
												name: "T02",
												data: {
													"desc": "Clínica de especialidades de atención a las adicciones, desintoxicaciones y toxicología",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: [
													{
														id: "node1.2.5.4.1.2.1",
														name: "Con hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													},
													{
														id: "node1.2.5.4.1.2.2",
														name: "Sin hospitalización",
														data: {
															"desc": "",
															"$width": ancho_chi,
															"$height": alto_min
															},
														children: []
													}
												]
											}
										]
									},
									{
										id: "node1.2.5.4.2",
										name: "UNE",
										data: {
											"desc": "Unidad de Especialidades Médicas (UNEMES)",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.2.5.4.2.1",
												name: "UNE01",
												data: {
													"desc": "UNEMES de salud mental",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											},
											{
												id: "1.2.5.4.2.2",
												name: "UNE02",
												data: {
													"desc": "UNEMES de adicciones, CAPA, nueva vida",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									}
								]
							},
							{
								id: "node1.2.5.5",
								name: "Comunitaria",
								data: {
									"desc": "Establecimiento que ofrece servicios de especialidades básicas",
									"$width": ancho_med,
									"$height": alto_min
								},
								children: [
									{
										id: "node1.2.5.5.1",
										name: "P",
										data: {
											"desc": "Unidad móvil",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.5.2",
										name: "W",
										data: {
											"desc": "Casa de salud",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									},
									{
										id: "node1.2.5.5.3",
										name: "X",
										data: {
											"desc": "Brigada móvil",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: []
									}
								]
							},
							{
								id: "node1.2.5.6",
								name: "Consulta externa reclusorio y MP",
								data: {
									"desc": "Unidades médicas que brindan atención a población privada de su libertad",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: [
									{
										id: "node1.2.5.6.1",
										name: "T",
										data: {
											"desc": "Clínica de Especialidades",
											"$width": ancho_chi,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.2.5.6.1.1",
												name: "T01",
												data: {
													"desc": "Clínica de especialidades de salud mental",
													"$width": ancho_chi,
													"$height": alto_min
												},
												children: []
											}
										]
									},
									{
										id: "node1.2.5.6.2",
										name: "V",
										data: {
											"desc": "Unidad Ministerio Público",
											"$width": ancho_chi,
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
