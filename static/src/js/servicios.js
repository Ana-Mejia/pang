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
	var alto_media = 54;
	var alto_max = 66;
	var ancho_min = 99;
	var ancho_med = 110;
	var ancho_medi = 115;
	var ancho_gde = 130;
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
		name: "Servicios salud mental",
		data: {
			"desc": "Lista de servicios de salud mental",
			"$width": ancho_gde,
			"$height": alto_mini
		},
		children: [
			{
				id: "node1.1",
				name: "Atención por adicciones",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.1.1",
						name: "Mujeres",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.1.1.1",
								name: "Alcohol",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.1.1.1.1",
										name: "<b>DXN01</b> OH mujer", 
										data: {
											"desc": "Desintoxicación por alcoholismo mujer",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.1.2",
										name: "<b>HPA01</b> Mujer 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo mujer de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.1.3",
										name: "<b>HPA02</b> Mujer 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo mujer de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.1.4",
										name: "<b>HPA03</b> Mujer 15-19 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo mujer de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.1.5",
										name: "<b>HPA04</b> Mujer 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo mujer de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.1.6",
										name: "<b>HPA05</b> Mujer 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo mujer de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.1.7",
										name: "<b>HPA06</b> Mujer 50-59 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo mujer de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.1.8",
										name: "<b>HPA07</b> Mujer 60 y más años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo mujer de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.1.9",
										name: "<b>SMA02</b> OH mujeres",
										data: {
											"desc": "Atención por adicción a alcohol mujeres",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]	
							},
							{
								id: "node1.1.1.2",
								name: "Tabaco",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.1.1.2.1",
										name: "<b>HPA08</b> Mujer 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo mujer de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.2.2",
										name: "<b>HPA09</b> Mujer 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo mujer de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.2.3",
										name: "<b>HPA10</b> Mujer 15-19 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo mujer de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.2.4",
										name: "<b>HPA11 </b> Mujer 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo mujer de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.2.5",
										name: "<b>HPA12</b> Mujer 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo mujer de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.2.6",
										name: "<b>HPA13</b> Mujer 50-59 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo mujer de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.2.7",
										name: "<b>HPA14</b> Mujer 60 y más años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo mujer de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.2.8",
										name: "<b>SMA03</b> Tabaco mujeres",
										data: {
											"desc": "Atención por adicción a tabaco mujeres",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]	
							},
							{
								id: "node1.1.1.3",
								name: "Fármacos",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.1.1.3.1",
										name: "<b>DXN02</b> Fármacos médicos mujer", 
										data: {
											"desc": "Desintoxicación por fármacos médicos mujer",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.3.2",
										name: "<b>DXN03</b> Otros mujer", 
										data: {
											"desc": "Desintoxicación por otros fármacos mujer",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.3.3",
										name: "<b>HPA15</b> Mujer 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia mujer de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.3.4",
										name: "<b>HPA16</b> Mujer 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia mujer de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.3.5",
										name: "<b>HPA17</b> Mujer 15-19 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia mujer de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.3.6",
										name: "<b>HPA18</b> Mujer 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia mujer de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.3.7",
										name: "<b>HPA19</b> Mujer 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia mujer de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.3.8",
										name: "<b>HPA20</b> Mujer 50-59 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia mujer de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.3.9",
										name: "<b>HPA21</b> Mujer 60 y más años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia mujer de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.3.10",
										name: "<b>SMA01</b> Fármacos mujeres",
										data: {
											"desc": "Atención por adicción a fármacos mujeres",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]	
							},
							{
								id: "node1.1.1.4",
								name: "Otras drogas",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.1.1.4.1",
										name: "<b>HPA22</b> Mujer 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga mujer de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.2",
										name: "<b>HPA23</b> Mujer 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga mujer de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.3",
										name: "<b>HPA24</b> Mujer 15-19 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga mujer de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.4",
										name: "<b>HPA25</b> Mujer 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga mujer de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.5",
										name: "<b>HPA26</b> Mujer 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga mujer de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.6",
										name: "<b>HPA27</b> Mujer 50-59 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga mujer de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.7",
										name: "<b>HPA28</b> Mujer 60 y más años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga mujer de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.8",
										name: "<b>HPA57</b> Mujer 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis mujer de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.9",
										name: "<b>HPA58</b> Mujer 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis mujer de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.10",
										name: "<b>HPA59</b> Mujer 15-19 años",
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis mujer de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.11",
										name: "<b>HPA60</b> Mujer 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis mujer de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.12",
										name: "<b>HPA61</b> Mujer 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis mujer de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.13",
										name: "<b>HPA62</b> Mujer 50-59 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis mujer de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.14",
										name: "<b>HPA63</b> Mujer 60 y más años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis mujer de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.15",
										name: "<b>HPA64</b> Mujer 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas mujer de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.16",
										name: "<b>HPA65</b> Mujer 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas mujer de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.17",
										name: "<b>HPA66</b> Mujer 15-19 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas mujer de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.18",
										name: "<b>HPA67</b> Mujer 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas mujer de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.19",
										name: "<b>HPA68</b> Mujer 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas mujer de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.20",
										name: "<b>HPA69 </b> Mujer 50-59 años",
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas mujer de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.21",
										name: "<b>HPA70</b> Mujer 60 y más años",
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas mujer de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.22",
										name: "<b>SMA09</b> Cannabis mujeres",
										data: {
											"desc": "Atención por adicción a cannabis mujeres",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.1.4.23",
										name: "<b>SMA10</b> Psicoactivos mujeres",
										data: {
											"desc": "Atención por adicción a otras sustancias psicoactivas mujeres",
											"$width": ancho_med,
											"$height": alto_medi
										},
										children: []
									}
								]	
							}
						]
					},
					{
						id: "node1.1.2",
						name: "Hombres",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.1.2.1",
								name: "Alcohol",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.1.2.1.1",
										name: "<b>DXN04</b> OH hombre", 
										data: {
											"desc": "Desintoxicación por alcoholismo hombre",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.1.2",
										name: "<b>HPA29</b> Hombre 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo hombre de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.1.3",
										name: "<b>HPA30</b> Hombre 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo hombre de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.1.4",
										name: "<b>HPA31</b> Hombre 15-19 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo hombre de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.1.5",
										name: "<b>HPA32</b> Hombre 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo hombre de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.1.6",
										name: "<b>HPA33</b> Hombre 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo hombre de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.1.7",
										name: "<b>HPA34</b> Hombre 50-59 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo hombre de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.1.8",
										name: "<b>HPA35</b> Hombre 60 y más años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por alcoholismo hombre de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.1.9",
										name: "<b>SMA06</b> OH hombres",
										data: {
											"desc": "Atención por adicción a alcohol hombres",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]	
							},
							{
								id: "node1.1.2.2",
								name: "Tabaco",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.1.2.2.1",
										name: "<b>HPA36</b> Hombre 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo hombre de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.2.2",
										name: "<b>HPA37</b> Hombre 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo hombre de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.2.3",
										name: "<b>HPA38</b> Hombre 15-19 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo hombre de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.2.4",
										name: "<b>HPA39</b> Hombre 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo hombre de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.2.5",
										name: "<b>HPA40</b> Hombre 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo hombre de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.2.6",
										name: "<b>HPA41</b> Hombre 50-59 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo hombre de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.2.7",
										name: "<b>HPA42</b> Hombre 60 y más años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por tabaquismo hombre de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.2.8",
										name: "<b>SMA07</b> Tabaco hombres",
										data: {
											"desc": "Atención por adicción a tabaco hombres",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]	
							},
							{
								id: "node1.1.2.3",
								name: "Fármacos",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.1.2.3.1",
										name: "<b>DXN05</b> Fármacos médicos hombre", 
										data: {
											"desc": "Desintoxicación por fármacos médicos hombre",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.3.2",
										name: "<b>DXN06</b> Otros hombre", 
										data: {
											"desc": "Desintoxicación por otros fármacos hombre",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.3.3",
										name: "<b>HPA43</b> Hombre 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia hombre de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.3.4",
										name: "<b>HPA44</b> Hombre 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia hombre de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.3.5",
										name: "<b>HPA45</b> Hombre 15-19 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia hombre de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.3.6",
										name: "<b>HPA46</b> Hombre 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia hombre de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.3.7",
										name: "<b>HPA47</b> Hombre 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia hombre de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.3.8",
										name: "<b>HPA48</b> Hombre 50-59 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia hombre de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.3.9",
										name: "<b>HPA49</b> Hombre 60 y más años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por farmacodependencia hombre de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.3.10",
										name: "<b>SMA05</b> Fármacos hombres",
										data: {
											"desc": "Atención por adicción a fármacos hombres",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]	
							},
							{
								id: "node1.1.2.4",
								name: "Otras drogas",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.1.2.4.1",
										name: "<b>HPA50</b> Hombre 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga hombre de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.2",
										name: "<b>HPA51</b> Hombre 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga hombre de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.3",
										name: "<b>HPA52</b> Hombre 15-19 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga hombre de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.4",
										name: "<b>HPA53</b> Hombre 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga hombre de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.5",
										name: "<b>HPA54</b> Hombre 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga hombre de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.6",
										name: "<b>HPA55</b> Hombre 50-59 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga hombre de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.7",
										name: "<b>HPA56</b> Hombre 60 y más años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otra droga hombre de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.8",
										name: "<b>HPA71</b> Hombre 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis hombre de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.9",
										name: "<b>HPA72</b> Hombre 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis hombre de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.10",
										name: "<b>HPA73</b> Hombre 15-19 años",
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis hombre de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.11",
										name: "<b>HPA74</b> Hombre 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis hombre de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.12",
										name: "<b>HPA75</b> Hombre 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis hombre de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.13",
										name: "<b>HPA76</b> Hombre 50-59 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis hombre de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.14",
										name: "<b>HPA77</b> Hombre 60 y más años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por cannabis hombre de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.15",
										name: "<b>HPA78</b> Hombre 5-9 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas hombre de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.16",
										name: "<b>HPA79</b> Hombre 10-14 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas hombre de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.17",
										name: "<b>HPA80</b> Hombre 15-19 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas hombre de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.18",
										name: "<b>HPA81</b> Hombre 20-29 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas hombre de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.19",
										name: "<b>HPA82</b> Hombre 30-49 años", 
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas hombre de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.20",
										name: "<b>HPA83</b> Hombre 50-59 años",
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas Hombre de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.21",
										name: "<b>HPA84</b> Hombre 60 y más años",
										data: {
											"desc": "Atención en hospital psiquiátrico por otras sustancias psicoactivas hombre de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.22",
										name: "<b>SMA11</b> Cannabis hombres",
										data: {
											"desc": "Atención por adicción a cannabis hombres",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.1.2.4.23",
										name: "<b>SMA12</b> Psicoactivos hombres",
										data: {
											"desc": "Atención por adicción a otras sustancias psicoactivas hombres",
											"$width": ancho_med,
											"$height": alto_medi
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
				name: "Auxiliares de diagnóstico",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.2.1",
						name: "<b>ESP09</b> Psicodiagnóstico mujer UNEME",
						data: {
							"desc": "Estudio psicodiagnóstico mujer en UNEME EC",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.2.2",
						name: "<b>ESP10</b> Psicodiagnóstico hombre UNEME",
						data: {
							"desc": "Estudio psicodiagnóstico hombre en UNEME EC",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.2.3",
						name: "<b>HPP02</b> Psicodiagnóstico mujer HP",
						data: {
							"desc": "Mujer estudio psicodiagnóstico en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.2.4",
						name: "<b>HPP09</b> Psicodiagnóstico hombre HP",
						data: {
							"desc": "Hombre estudio psicodiagnóstico en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					}
				]
			},
			{
				id: "node1.3",
				name: "Conducta alimentaria",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.3.1",
						name: "<b>DET68</b> Mujeres 10-19",
						data: {
							"desc": "Detección de conductas alimentarias de riesgo 10 a 19 años mujer positivo",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.3.2",
						name: "<b>DET77</b> Hombres 10-19",
						data: {
							"desc": "Detección de conductas alimentarias de riesgo 10 a 19 años hombre positivo",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.3.3",
						name: "<b>TAL01</b> Bulimia mujeres 10-19",
						data: {
							"desc": "Detección de bulimia mujeres 10 a 19 años",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.3.4",
						name: "<b>TAL02</b> Bulimia hombres 10-19",
						data: {
							"desc": "Detección de bulimia hombres 10 a 19 años",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.3.5",
						name: "<b>TAL03</b> Anorexia mujeres 10-19",
						data: {
							"desc": "Detección de anorexia mujeres 10 a 19 años",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.3.6",
						name: "<b>TAL04</b> Anorexia hombres 10-19",
						data: {
							"desc": "Detección de anorexia hombres 10 a 19 años",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.3.7",
						name: "<b>TAL05</b> TCA mujeres 10-19",
						data: {
							"desc": "Mujer 10 a 19 años positivo a trastornos de conducta alimentaria",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.3.8",
						name: "<b>TAL06</b> TCA hombres 10-19",
						data: {
							"desc": "Hombre 10 a 19 años positivo a trastornos de conducta alimentaria",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					}
				]
			},
			{
				id: "node1.4",
				name: "Conductas adictivas",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.4.1",
						name: "Mujeres",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.4.1.1",
								name: "< 19 años",
								data: {
									"desc": "Menores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.4.1.1.1",
										name: "<b>ACA01</b> Mujer 5-9 años",
										data: {
											"desc": "Mujer de 5 a 9 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.1.2",
										name: "<b>ACA02</b> Mujer 10-14 años",
										data: {
											"desc": "Mujer de 10 a 14 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.1.3",
										name: "<b>ACA03</b> Mujer 15-19 años",
										data: {
											"desc": "Mujer de 15 a 19 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.1.4",
										name: "<b>ATC22</b> Mujer 5-9 años",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en mujer de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.1.5",
										name: "<b>ATC23</b> Mujer 10-14 años",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en mujer de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.1.6",
										name: "<b>ATC24</b> Mujer 15-19 años ",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en mujer de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]
							},
							{
								id: "node1.4.1.2",
								name: "> 19 años",
								data: {
									"desc": "Mayores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.4.1.2.1",
										name: "<b>ACA04</b> Mujer 20-29 años",
										data: {
											"desc": "Mujer de 20 a 29 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.2.2",
										name: "<b>ACA05</b> Mujer 30-49 años",
										data: {
											"desc": "Mujer de 30 a 49 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.2.3",
										name: "<b>ACA06</b> Mujer 50-59 años",
										data: {
											"desc": "Mujer de 50 a 59 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.2.4",
										name: "<b>ACA07</b> Mujer 60 y más años",
										data: {
											"desc": "Mujer de 60 y más años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.2.5",
										name: "<b>ATC25</b> Mujer 20-29 años ",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en mujer de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.2.6",
										name: "<b>ATC26</b> Mujer 30-49 años",
										data: {
											"desc": " Tratamiento breve concluido por conductas adictivas en mujer de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.2.7",
										name: "<b>ATC27</b> Mujer 50-59 años",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en mujer de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.1.2.8",
										name: "<b>ATC28</b> Mujer 60 y más años",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en mujer de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]
							}
					    ]
					},
					{
						id: "node1.4.2",
						name: "Hombres",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.4.2.1",
								name: "< 19 años",
								data: {
									"desc": "Menores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.4.2.1.1",
										name: "<b>ACA08</b> Hombre 5-9 años",
										data: {
											"desc": "Hombre de 5 a 9 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.1.2",
										name: "<b>ACA09</b> Hombre 10-14 años",
										data: {
											"desc": "Hombre de 10 a 14 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.1.3",
										name: "<b>ACA10</b> Hombre 15-19 años",
										data: {
											"desc": "Hombre de 15 a 19 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.1.4",
										name: "<b>ATC50</b> Hombre 5-9 años",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en hombre de 5 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.1.5",
										name: "<b>ATC51</b> Hombre 10-14 años",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en hombre de 10 a 14 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.1.6",
										name: "<b>ATC52</b> Hombre 15-19 años ",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en hombre de 15 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]
							},
							{
								id: "node1.4.2.2",
								name: "> 19 años",
								data: {
									"desc": "Mayores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.4.2.2.1",
										name: "<b>ACA11</b> Hombre 20-29 años",
										data: {
											"desc": "Hombre de 20 a 29 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.2.2",
										name: "<b>ACA12</b> Hombre 30-49 años",
										data: {
											"desc": "Hombre de 30 a 49 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.2.3",
										name: "<b>ACA13</b> Hombre 50-59 años",
										data: {
											"desc": "Hombre de 50 a 59 años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.2.4",
										name: "<b>ACA14</b> Hombre 60 y más años",
										data: {
											"desc": "Hombre de 60 y más años con conductas adictivas",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.2.5",
										name: "<b>ATC53</b> Hombre 20-29 años ",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en hombre de 20 a 29 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.2.6",
										name: "<b>ATC54</b> Hombre 30-49 años",
										data: {
											"desc": " Tratamiento breve concluido por conductas adictivas en hombre de 30 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.2.7",
										name: "<b>ATC55</b> Hombre 50-59 años",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en hombre de 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.4.2.2.8",
										name: "<b>ATC56</b> Hombre 60 y más años",
										data: {
											"desc": "Tratamiento breve concluido por conductas adictivas en hombre de 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
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
				id: "node1.5",
				name: "Consulta externa",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.5.1",
						name: "Primera vez",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.5.1.1",
								name: "Psicología",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.5.1.1.1",
										name: "<b>CPP07</b> Salud mental",
										data: {
											"desc": "Consulta primera vez de salud mental",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.1.1.2",
										name: "<b>HPC05</b> Mujer psicogeriatría",
										data: {
											"desc": "Primera vez mujer psicogeriatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.1.1.3",
										name: "<b>HPC06</b> Mujer psicología",
										data: {
											"desc": "Primera vez mujer psicología en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.1.1.4",
										name: "<b>HPC19</b> Hombre psicogeriatría",
										data: {
											"desc": "Primera vez hombre psicogeriatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.1.1.5",
										name: "<b>HPC20</b> Hombre psicología",
										data: {
											"desc": "Primera vez hombre psicología en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.1.1.6",
										name: "<b>VIC03</b> Mujeres con VIH psicología",
										data: {
											"desc": "Atención psicológica por VIH primera vez mujeres",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.1.1.7",
										name: "<b>VIC23</b> Hombres con VIH psicología",
										data: {
											"desc": "Atención psicológica por VIH primera vez hombres psicología",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.1.1.8",
										name: "<b>VIO01</b> Apoyo psicoemocional",
										data: {
											"desc": "Apoyo psicoemocional por violencia primera vez",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]
							},
							{
								id: "node1.5.1.2",
								name: "Psiquiatría",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
								{
										id: "node1.5.1.2.1",
										name: "<b>CES08</b> Psiquiatría",
										data: {
											"desc": "Psiquiatría consulta de primera vez",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.1.2.2",
										name: "<b>HPC03</b> Mujer paidopsiquiatría",
										data: {
											"desc": "Primera vez mujer paidopsiquiatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.1.2.3",
										name: "<b>HPC04</b> Mujer psiquiatría",
										data: {
											"desc": "Primera vez mujer psiquiatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.1.2.4",
										name: "<b>HPC17</b> Hombre paidopsiquiatría",
										data: {
											"desc": "Primera vez hombre paidopsiquiatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.1.2.5",
										name: "<b>HPC18</b> Hombre psiquiatría",
										data: {
											"desc": "Primera vez hombre psiquiatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
								]
							}
						]
					},
					{
						id: "node1.5.2",
						name: "Subsecuente",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.5.2.1",
								name: "Psicología",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.5.2.1.1",
										name: "<b>CPP14</b> Salud mental",
										data: {
											"desc": "Consulta subsecuente de salud mental",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.2.1.2",
										name: "<b>HPC12</b> Mujer psicogeriatría",
										data: {
											"desc": "Subsecuente mujer psicogeriatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.2.1.3",
										name: "<b>HPC13</b> Mujer psicología",
										data: {
											"desc": "Subsecuente mujer psicología en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.2.1.4",
										name: "<b>HPC26</b> Hombre psicogeriatría",
										data: {
											"desc": "Subsecuente hombre psicogeriatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.2.1.5",
										name: "<b>HPC27</b> Hombre psicología",
										data: {
											"desc": "Subsecuente hombre psicología en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.2.1.6",
										name: "<b>VIC13</b> Mujeres con VIH psicología",
										data: {
											"desc": "Atención psicológica por VIH subsecuente mujeres psicología",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.2.1.7",
										name: "<b>VIC32</b> Hombres con VIH psicología",
										data: {
											"desc": "Atención psicológica por VIH subsecuente hombres psicología",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.2.1.8",
										name: "<b>VIO02</b> Apoyo psicoemocional",
										data: {
											"desc": "Apoyo psicoemocional por violencia subsecuente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]
							},
							{
								id: "node1.5.2.2",
								name: "Psiquiatría",
								data: {
									"desc": "",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.5.2.2.1",
										name: "<b>CES17</b> Psiquiatría",
										data: {
											"desc": "Psiquiatría consulta subsecuente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.2.2.2",
										name: "<b>HPC10</b> Mujer paidopsiquiatría",
										data: {
											"desc": "Subsecuente mujer paidopsiquiatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.2.2.3",
										name: "<b>HPC11</b> Mujer psiquiatría",
										data: {
											"desc": "Subsecuente mujer psiquiatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.2.2.4",
										name: "<b>HPC24</b> Hombre paidopsiquiatría",
										data: {
											"desc": "Subsecuente hombre paidopsiquiatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.5.2.2.5",
										name: "<b>HPC25</b> Hombre psiquiatría",
										data: {
											"desc": "Subsecuente hombre psiquiatría en hospital psiquiátrico",
											"$width": ancho_med,
											"$height": alto_med
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
				id: "node1.6",
				name: "Consultas",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.6.1",
						name: "<b>CDN01</b> Psicología",
						data: {
							"desc": "Consulta de psicología",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.6.2",
						name: "<b>CSP29</b> Salud mental",
						data: {
							"desc": "Consulta de salud mental",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.6.3",
						name: "<b>ENM03</b> Psicología UNEME",
						data: {
							"desc": "Consulta de psicología en UNEME EC",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.6.4",
						name: "<b>TEM05</b> Teleconsulta psiquiatría",
						data: {
							"desc": "Psiquiatría / teleconsulta psiquiatría",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
				]
			},	
            {
				id: "node1.7",
				name: "Detecciones",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.7.1",
						name: "<b>DED01</b> Mujer depresión positivo",
						data: {
							"desc": "Mujer positivo en detección de depresión",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.7.2",
						name: "<b>DED03</b> Hombre depresión positivo",
						data: {
							"desc": "Hombre positivo en detección de depresión",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.7.3",
						name: "<b>DET06</b> Depresión mujeres",
						data: {
							"desc": "Detección de depresión mujer positivo",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.7.4",
						name: "<b>DET07</b> Alteración de memoria mujer",
						data: {
							"desc": "Detección de alteración de memoria mujer positivo",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.7.5",
						name: "<b>DET11</b> Adicciones OH mujer",
						data: {
							"desc": "Detección de adicciones alcoholismo mujer positivo",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.7.6",
						name: "<b>DET12</b> Adicciones tabaquismo mujer",
						data: {
							"desc": "Detección de adicciones tabaquismo mujer positivo",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.7.7",
						name: "<b>DET13</b> Adicciones fármacos mujer",
						data: {
							"desc": "Detección de adicciones fármacos mujer positivo",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.7.8",
						name: "<b>DET30</b> Depresión hombres",
						data: {
							"desc": "Detección de depresión hombre positivo",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.7.9",
						name: "<b>DET31</b> Alteración de memoria hombre",
						data: {
							"desc": "Detección de alteración de memoria hombre positivo",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.7.10",
						name: "<b>DET35</b> Adicciones OH hombre",
						data: {
							"desc": "Detección de adicciones alcoholismo hombre positivo",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.7.11",
						name: "<b>DET36</b> Adicciones tabaquismo hombre",
						data: {
							"desc": "Detección de adicciones tabaquismo hombre positivo",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.7.12",
						name: "<b>DET37</b> Adicciones fármacos hombre",
						data: {
							"desc": "Detección de adicciones fármacos hombre positivo",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{
						id: "node1.7.13",
						name: "<b>DRS02</b> Trastornos emocionales",
						data: {
							"desc": "Detección de factores de riesgo con trastornos emocionales",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					}
				]
			},	
			{
				id: "node1.8",
				name: "Droga de impacto",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.8.1",
						name: "Mujeres",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.8.1.1",
								name: "< 19 años",
								data: {
									"desc": "Menores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.8.1.1.1",
										name: "Alcohol",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.1.1.1",
												name: "<b>ADI01</b> Mujer 5-9 años",
												data: {
													"desc": "Alcohol en mujer de 5 a 9 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.1.2",
												name: "<b>ADI02</b> Mujer 10-14 años",
												data: {
													"desc": "Alcohol en mujer de 10 a 14 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.1.3",
												name: "<b>ADI03</b> Mujer 15-19 años",
												data: {
													"desc": "Alcohol en mujer de 15 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.1.4",
												name: "<b>ADI43</b> Mujer 5-11 años",
												data: {
													"desc": "Alcohol en mujer de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.1.5",
												name: "<b>ADI44</b> Mujer 12-17 años",
												data: {
													"desc": "Alcohol en mujer de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.1.6",
												name: "<b>ADI45</b> Mujer 18-19 años",
												data: {
													"desc": "Alcohol en mujer de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.1.2",
										name: "Tabaco",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.1.2.1",
												name: "<b>ADI08</b> Mujer 5-9 años",
												data: {
													"desc": "Tabaco en mujer de 5 a 9 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.2.2",
												name: "<b>ADI09</b> Mujer 10-14 años",
												data: {
													"desc": "Tabaco en mujer de 10 a 14 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.2.3",
												name: "<b>ADI10</b> Mujer 15-19 años",
												data: {
													"desc": "Tabaco en mujer de 15 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.2.4",
												name: "<b>ADI46</b> Mujer 5-11 años",
												data: {
													"desc": "Tabaco en mujer de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.2.5",
												name: "<b>ADI47</b> Mujer 12-17 años",
												data: {
													"desc": "Tabaco en mujer de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.2.6",
												name: "<b>ADI48</b> Mujer 18-19 años",
												data: {
													"desc": "Tabaco en mujer de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.1.3",
										name: "Cannabis",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.1.3.1",
												name: "<b>ADI49</b> Mujer 5-11 años",
												data: {
													"desc": "Cannabis en mujer de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.3.2",
												name: "<b>ADI50</b> Mujer 12-17 años",
												data: {
													"desc": "Cannabis en mujer de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.3.3",
												name: "<b>ADI51</b> Mujer 18-19 años",
												data: {
													"desc": "Cannabis en mujer de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.1.4",
										name: "Cocaína",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.1.4.1",
												name: "<b>ADI70</b> Mujer 5-11 años",
												data: {
													"desc": "Cocaína en mujer de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.4.2",
												name: "<b>ADI71</b> Mujer 12-17 años",
												data: {
													"desc": "Cocaína en mujer de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.4.3",
												name: "<b>ADI72</b> Mujer 18-19 años",
												data: {
													"desc": "Cocaína en mujer de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.1.5",
										name: "Metanfetamina",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.1.5.1",
												name: "<b>ADI56</b> Mujer 5-11 años",
												data: {
													"desc": "Metanfetamina en mujer de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.5.2",
												name: "<b>ADI57</b> Mujer 12-17 años",
												data: {
													"desc": "Metanfetamina en mujer de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.5.3",
												name: "<b>ADI58</b> Mujer 18-19 años",
												data: {
													"desc": "Metanfetamina en mujer de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.1.6",
										name: "Inhalables y solventes",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.1.6.1",
												name: "<b>ADI63</b> Mujer 5-11 años",
												data: {
													"desc": "Inhalables y solventes en mujer de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.6.2",
												name: "<b>ADI64</b> Mujer 12-17 años",
												data: {
													"desc": "Inhalables y solventes en mujer de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.6.3",
												name: "<b>ADI65</b> Mujer 18-19 años",
												data: {
													"desc": "Inhalables y solventes en mujer de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.1.7",
										name: "Otras drogas",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.1.7.1",
												name: "<b>ADI15</b> Mujer 5-9 años",
												data: {
													"desc": "Otra droga en mujer de 5 a 9 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.7.2",
												name: "<b>ADI16</b> Mujer 10-14 años",
												data: {
													"desc": "Otra droga en mujer de 10 a 14 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.7.3",
												name: "<b>ADI17</b> Mujer 15-19 años",
												data: {
													"desc": "Otra droga en mujer de 15 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.7.4",
												name: "<b>ADI77</b> Mujer 5-11 años",
												data: {
													"desc": "Otra droga en mujer de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.7.5",
												name: "<b>ADI78</b> Mujer 12-17 años",
												data: {
													"desc": "Otra droga en mujer de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.1.7.6",
												name: "<b>ADI79</b> Mujer 18-19 años",
												data: {
													"desc": "Otra droga en mujer de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									}
								]
							},
							{
								id: "node1.8.1.2",
								name: "> 19 años",
								data: {
									"desc": "Mayores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.8.1.2.1",
										name: "Alcohol",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.2.1.1",
												name: "<b>ADI04</b> Mujer 20-29 años",
												data: {
													"desc": "Alcohol en mujer de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.1.2",
												name: "<b>ADI05</b> Mujer 30-49 años",
												data: {
													"desc": "Alcohol en mujer de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.1.3",
												name: "<b>ADI06</b> Mujer 50-59 años",
												data: {
													"desc": "Alcohol en mujer de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.1.4",
												name: "<b>ADI07</b> Mujer 60 y más años",
												data: {
													"desc": "Alcohol en mujer de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.2.2",
										name: "Tabaco",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.2.2.1",
												name: "<b>ADI11</b> Mujer 20-29 años",
												data: {
													"desc": "Tabaco en mujer de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.2.2",
												name: "<b>ADI12</b> Mujer 30-49 años",
												data: {
													"desc": "Tabaco en mujer de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.2.3",
												name: "<b>ADI13</b> Mujer 50-59 años",
												data: {
													"desc": "Tabaco en mujer de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.2.4",
												name: "<b>ADI14</b> Mujer 60 y más años",
												data: {
													"desc": "Tabaco en mujer de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.2.3",
										name: "Cannabis",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.2.3.1",
												name: "<b>ADI52</b> Mujer 20-29 años",
												data: {
													"desc": "Cannabis en mujer de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.3.2",
												name: "<b>ADI53</b> Mujer 30-49 años",
												data: {
													"desc": "Cannabis en mujer de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.3.3",
												name: "<b>ADI54</b> Mujer 50-59 años",
												data: {
													"desc": "Cannabis en mujer de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.3.4",
												name: "<b>ADI55</b> Mujer 60 y más años",
												data: {
													"desc": "Cannabis en mujer de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.2.4",
										name: "Cocaína",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.2.4.1",
												name: "<b>ADI73</b> Mujer 20-29 años",
												data: {
													"desc": "Cocaína en mujer de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.4.2",
												name: "<b>ADI74</b> Mujer 30-49 años",
												data: {
													"desc": "Cocaína en mujer de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.4.3",
												name: "<b>ADI75</b> Mujer 50-59 años",
												data: {
													"desc": "Cocaína en mujer de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.4.4",
												name: "<b>ADI76</b> Mujer 60 y más años",
												data: {
													"desc": "Cocaína en mujer de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.2.5",
										name: "Metanfetamina",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.2.5.1",
												name: "<b>ADI59</b> Mujer 20-29 años",
												data: {
													"desc": "Metanfetamina en mujer de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.5.2",
												name: "<b>ADI60</b> Mujer 30-49 años",
												data: {
													"desc": "Metanfetamina en mujer de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.5.3",
												name: "<b>ADI61</b> Mujer 50-59 años",
												data: {
													"desc": "Metanfetamina en mujer de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.5.4",
												name: "<b>ADI62</b> Mujer 60 y más años",
												data: {
													"desc": "Metanfetamina en mujer de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.2.6",
										name: "Inhalables y solventes",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.2.6.1",
												name: "<b>ADI66</b> Mujer 20-29 años",
												data: {
													"desc": "Inhalables y solventes en mujer de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.6.2",
												name: "<b>ADI67</b> Mujer 30-49 años",
												data: {
													"desc": "Inhalables y solventes en mujer de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.6.3",
												name: "<b>ADI68</b> Mujer 50-59 años",
												data: {
													"desc": "Inhalables y solventes en mujer de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.6.4",
												name: "<b>ADI69</b> Mujer 60 y más años",
												data: {
													"desc": "Inhalables y solventes en mujer de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.1.2.7",
										name: "Otras drogas",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.1.2.7.1",
												name: "<b>ADI18</b> Mujer 20-29 años",
												data: {
													"desc": "Otra droga en mujer de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.7.2",
												name: "<b>ADI19</b> Mujer 30-49 años",
												data: {
													"desc": "Otra droga en mujer de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.7.3",
												name: "<b>ADI20</b> Mujer 50-59 años",
												data: {
													"desc": "Otra droga en mujer de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.1.2.7.4",
												name: "<b>ADI21</b> Mujer 60 y más años",
												data: {
													"desc": "Otra droga en mujer de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
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
						id: "node1.8.2",
						name: "Hombres",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.8.2.1",
								name: "< 19 años",
								data: {
									"desc": "Menores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.8.2.1.1",
										name: "Alcohol",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.1.1.1",
												name: "<b>ADI22</b> Hombre 5-9 años",
												data: {
													"desc": "Alcoholismo en hombre de 5 a 9 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.1.2",
												name: "<b>ADI23</b> Hombre 10-14 años",
												data: {
													"desc": "Alcoholismo en hombre de 10 a 14 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.1.3",
												name: "<b>ADI24</b> Hombre 15-19 años",
												data: {
													"desc": "Alcoholismo en hombre de 15 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.1.4",
												name: "<b>ADI80</b> Hombre 5-11 años",
												data: {
													"desc": "Alcohol en hombre de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.1.5",
												name: "<b>ADI81</b> Hombre 12-17 años",
												data: {
													"desc": "Alcohol en hombre de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.1.6",
												name: "<b>ADI82</b> Hombre 18-19 años",
												data: {
													"desc": "Alcohol en hombre de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.1.2",
										name: "Tabaco",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.1.2.1",
												name: "<b>ADI29</b> Hombre 5-9 años",
												data: {
													"desc": "Tabaco en hombre de 5 a 9 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.2.2",
												name: "<b>ADI30</b> Hombre 10-14 años",
												data: {
													"desc": "Tabaco en hombre de 10 a 14 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.2.3",
												name: "<b>ADI31</b> Hombre 15-19 años",
												data: {
													"desc": "Tabaco en hombre de 15 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.2.4",
												name: "<b>ADI83</b> Hombre 5-11 años",
												data: {
													"desc": "Tabaco en hombre de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.2.5",
												name: "<b>ADI84</b> Hombre 12-17 años",
												data: {
													"desc": "Tabaco en hombre de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.2.6",
												name: "<b>ADI85</b> Hombre 18-19 años",
												data: {
													"desc": "Tabaco en hombre de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.1.3",
										name: "Cannabis",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.1.3.1",
												name: "<b>ADI86</b> Hombre 5-11 años",
												data: {
													"desc": "Cannabis en hombre de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.3.2",
												name: "<b>ADI87</b> Hombre 12-17 años",
												data: {
													"desc": "Cannabis en hombre de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.3.3",
												name: "<b>ADI88</b> Hombre 18-19 años",
												data: {
													"desc": "Cannabis en hombre de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.1.4",
										name: "Cocaína",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.1.4.1",
												name: "<b>AID08</b> Hombre 5-11 años",
												data: {
													"desc": "Cocaína en hombre de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.4.2",
												name: "<b>AID09</b> Hombre 12-17 años",
												data: {
													"desc": "Cocaína en hombre de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.4.3",
												name: "<b>AID10</b> Hombre 18-19 años",
												data: {
													"desc": "Cocaína en hombre de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.1.5",
										name: "Metanfetamina",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.1.5.1",
												name: "<b>ADI93</b> Hombre 5-11 años",
												data: {
													"desc": "Metanfetamina en hombre de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.5.2",
												name: "<b>ADI94</b> Hombre 12-17 años",
												data: {
													"desc": "Metanfetamina en hombre de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.5.3",
												name: "<b>ADI95</b> Hombre 18-19 años",
												data: {
													"desc": "Metanfetamina en hombre de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.1.6",
										name: "Inhalables y solventes",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.1.6.1",
												name: "<b>AID01</b> Hombre 5-11 años",
												data: {
													"desc": "Inhalables y solventes en hombre de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.6.2",
												name: "<b>AID02</b> Hombre 12-17 años",
												data: {
													"desc": "Inhalables y solventes en hombre de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.6.3",
												name: "<b>AID03</b> Hombre 18-19 años",
												data: {
													"desc": "Inhalables y solventes en hombre de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.1.7",
										name: "Otras drogas",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.1.7.1",
												name: "<b>ADI36</b> Hombre 5-9 años",
												data: {
													"desc": "Otra droga en hombre de 5 a 9 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.7.2",
												name: "<b>ADI37</b> Hombre 10-14 años",
												data: {
													"desc": "Otra droga en hombre de 10 a 14 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.7.3",
												name: "<b>ADI38</b> Hombre 15-19 años",
												data: {
													"desc": "Otra droga en hombre de 15 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.7.4",
												name: "<b>AID15</b> Hombre 5-11 años",
												data: {
													"desc": "Otra droga en hombre de 5 a 11 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.7.5",
												name: "<b>AID16</b> Hombre 12-17 años",
												data: {
													"desc": "Otra droga en hombre de 12 a 17 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.1.7.6",
												name: "<b>AID17</b> Hombre 18-19 años",
												data: {
													"desc": "Otra droga en hombre de 18 a 19 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									}
								]
							},
							{
								id: "node1.8.2.2",
								name: "> 19 años",
								data: {
									"desc": "Mayores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.8.2.2.1",
										name: "Alcohol",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.2.1.1",
												name: "<b>ADI25</b> Hombre 20-29 años",
												data: {
													"desc": "Alcoholismo en hombre de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.1.2",
												name: "<b>ADI26</b> Hombre 30-49 años",
												data: {
													"desc": "Alcoholismo en hombre de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.1.3",
												name: "<b>ADI27</b> Hombre 50-59 años",
												data: {
													"desc": "Alcoholismo en hombre de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.1.4",
												name: "<b>ADI28</b> Hombre 60 y más años",
												data: {
													"desc": "Alcoholismo eb hombre de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.2.2",
										name: "Tabaco",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.2.2.1",
												name: "<b>ADI32</b> Hombre 20-29 años",
												data: {
													"desc": "Tabaco en hombre de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.2.2",
												name: "<b>ADI33</b> Hombre 30-49 años",
												data: {
													"desc": "Tabaco en hombre de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.2.3",
												name: "<b>ADI34</b> Hombre 50-59 años",
												data: {
													"desc": "Tabaco en hombre de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.2.4",
												name: "<b>ADI35</b> Hombre 60 y más años",
												data: {
													"desc": "Tabaco en hombre de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.2.3",
										name: "Cannabis",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.2.3.1",
												name: "<b>ADI89</b> Hombre 20-29 años",
												data: {
													"desc": "Cannabis en hombre de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.3.2",
												name: "<b>ADI90</b> Hombre 30-49 años",
												data: {
													"desc": "Cannabis en hombre de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.3.3",
												name: "<b>ADI91<b> Hombre 50-59 años",
												data: {
													"desc": "Cannabis en hombre de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.3.4",
												name: "<b>ADI92</b> Hombre 60 y más años",
												data: {
													"desc": "Cannabis en hombre de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.2.4",
										name: "Cocaína",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.2.4.1",
												name: "<b>AID11</b> Hombre 20-29 años",
												data: {
													"desc": "Cocaína en hombre de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.4.2",
												name: "<b>AID12</b> Hombre 30-49 años",
												data: {
													"desc": "Cocaína en hombre de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.4.3",
												name: "<b>AID13</b> Hombre 50-59 años",
												data: {
													"desc": "Cocaína en hombre de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.4.4",
												name: "<b>AID14</b> Hombre 60 y más años",
												data: {
													"desc": "Cocaína en hombre de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.2.5",
										name: "Metanfetamina",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.2.5.1",
												name: "<b>ADI96</b> Hombre 20-29 años",
												data: {
													"desc": "Metanfetamina en hombre de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.5.2",
												name: "<b>ADI97</b> Hombre 30-49 años",
												data: {
													"desc": "Metanfetamina en hombre de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.5.3",
												name: "<b>ADI98</b> Hombre 50-59 años",
												data: {
													"desc": "Metanfetamina en hombre de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.5.4",
												name: "<b>ADI99</b> Hombre 60 y más años",
												data: {
													"desc": "Metanfetamina en hombre de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.2.6",
										name: "Inhalables y solventes",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.2.6.1",
												name: "<b>AID04</b> Hombre 20-29 años",
												data: {
													"desc": "Inhalables y solventes en hombre de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.6.2",
												name: "<b>AID05</b> Hombre 30-49 años",
												data: {
													"desc": "Inhalables y solventes en hombre de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.6.3",
												name: "<b>AID06</b> Hombre 50-59 años",
												data: {
													"desc": "Inhalables y solventes en hombre de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.6.4",
												name: "<b>AID07</b> Hombre 60 y más años",
												data: {
													"desc": "Inhalables y solventes en hombre de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											}
										]
									},
									{
										id: "node1.8.2.2.7",
										name: "Otras drogas",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_min
										},
										children: [
											{
												id: "node1.8.2.2.7.1",
												name: "<b>ADI39</b> Hombre 20-29 años",
												data: {
													"desc": "Otra droga en hombre de 20 a 29 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.7.2",
												name: "<b>ADI40</b> Hombre 30-49 años",
												data: {
													"desc": "Otra droga en hombre de 30 a 49 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.7.3",
												name: "<b>ADI41</b> Hombre 50-59 años",
												data: {
													"desc": "Otra droga en hombre de 50 a 59 años",
													"$width": ancho_medi,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.8.2.2.7.4",
												name: "<b>ADI42</b> Hombre 60 y más años",
												data: {
													"desc": "Otra droga en hombre de 60 y más años",
													"$width": ancho_medi,
													"$height": alto_med
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
				id: "node1.9",
				name: "Estimulación temprana",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.9.1",
						name: "<b>DPS01</b> < 5 años ",
						data: {
							"desc": "Signos de alarma del desarrollo psicomotor en menores de 5 años",
							"$width": ancho_med,
							"$height": alto_min
						},
						children: []
					},
					{
						id: "node1.9.2",
						name: "<b>EST01</b> < 2 años",
						data: {
							"desc": "Estimulación temprana de 0 a 2 años",
							"$width": ancho_med,
							"$height": alto_min
						},
						children: []
					},
					{
						id: "node1.9.3",
						name: "<b>EST02</b> 2-4 años",
						data: {
							"desc": "Estimulación temprana de 2 a 4 años",
							"$width": ancho_med,
							"$height": alto_min
						},
						children: []
					},
					{
						id: "node1.9.4",
						name: "<b>EST03</b> EDI normal",
						data: {
							"desc": "Con resultado EDI normal (verde)",
							"$width": ancho_med,
							"$height": alto_min
						},
						children: []
					},
					{
						id: "node1.9.5",
						name: "<b>EST04</b> EDI rezago",
						data: {
							"desc": "Con resultado EDI rezago (amarillo)",
							"$width": ancho_med,
							"$height": alto_min
						},
						children: []
					},
					{
						id: "node1.9.6",
						name: "<b>EST05</b> PROSPERA EDI normal",
						data: {
							"desc": "PROSPERA con resultado EDI normal (verde)",
							"$width": ancho_med,
							"$height": alto_min
						},
						children: []
					},
					{
						id: "node1.9.7",
						name: "<b>EST06</b> PROSPERA EDI rezago",
						data: {
							"desc": "PROSPERA con resultado EDI rezago (amarillo)",
							"$width": ancho_med,
							"$height": alto_min
						},
						children: []
					},
					{
						id: "node1.9.8",
						name: "<b>RET01</b> < 1 año",
						data: {
							"desc": "Estimulación temprana 0 a 1 año",
							"$width": ancho_med,
							"$height": alto_min
						},
						children: []
					},
					{
						id: "node1.9.9",
						name: "<b>RET02</b> 1 año",
						data: {
							"desc": "Estimulación temprana 1 año",
							"$width": ancho_med,
							"$height": alto_min
						},
						children: []
					},
					{
						id: "node1.9.10",
						name: "<b>RET03</b> 2-4 años",
						data: {
							"desc": "Estimulación temprana 2 a 4 años",
							"$width": ancho_med,
							"$height": alto_min
						},
						children: []
					}
				]
			},	
			{
				id: "node1.10",
				name: "Hospitalización",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.10.1",
						name: "Servicios",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.10.1.1",
								name: "<b>HPH01</b> Paidopsiquiatría ingresos",
								data: {
									"desc": "Hospital psiquiátrico continuo paidopsiquiatría ingresos",
									"$width": ancho_med,
									"$height": alto_media
								},
								children: []
							},
							{
								id: "node1.10.1.2",
								name: "<b>HPH02</b> Psiquiatría ingresos ",
								data: {
									"desc": "Hospital psiquiátrico continuo psiquiatría ingresos",
									"$width": ancho_med,
									"$height": alto_medi
								},
								children: []
							},
							{
								id: "node1.10.1.3",
								name: "<b>HPH03</b> Psicogeriatría ingresos",
								data: {
									"desc": "Hospital psiquiátrico continuo psicogeriatría ingresos",
									"$width": ancho_med,
									"$height": alto_media
								},
								children: []
							},
							{
								id: "node1.10.1.4",
								name: "<b>HPH04</b> Desintoxicación ingresos ",
								data: {
									"desc": "Hospital psiquiátrico continuo unidad desintoxicación ingresos",
									"$width": ancho_med,
									"$height": alto_media
								},
								children: []
							},
							{
								id: "node1.10.1.5",
								name: "<b>HPH05</b> Villa ingresos ",
								data: {
									"desc": "Hospital psiquiátrico continuo villa ingresos",
									"$width": ancho_med,
									"$height": alto_medi
								},
								children: []
							},
							{
								id: "node1.10.1.6",
								name: "<b>HPH06</b> Otros ingresos",
								data: {
									"desc": "Hospital psiquiátrico continuo otros ingresos",
									"$width": ancho_med,
									"$height": alto_medi
								},
								children: []
							},
							{
								id: "node1.10.1.7",
								name: "<b>HPH10</b> Cuidados especiales ingresos",
								data: {
									"desc": "Hospital psiquiátrico unidad de cuidados especiales ingresos",
									"$width": ancho_med,
									"$height": alto_medi
								},
								children: []
							}
						]
					},
					{
						id: "node1.10.2",
						name: "Usuarios",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.10.2.1",
								name: "<b>HPU01</b> H continuo paidopsiq mujer",
								data: {
									"desc": "En tratamiento hospital continuo paidopsiquiatría mujer",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.2",
								name: "<b>HPU02</b> H continuo psiq mujer",
								data: {
									"desc": "En tratamiento hospital continuo psiquiatría mujer",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.3",
								name: "<b>HPU03</b> H continuo psicogeriatria mujer",
								data: {
									"desc": "En tratamiento hospital continuo psicogeriatría mujer",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.4",
								name: "<b>HPU04</b> H continuo desintox mujer",
								data: {
									"desc": "En tratamiento hospital continuo unidad desintoxicación mujer",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.5",
								name: "<b>HPU05</b> H continuo villas mujer",
								data: {
									"desc": "En tratamiento hospital continuo villas mujer",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.6",
								name: "<b>HPU06</b> H continuo otros mujer",
								data: {
									"desc": "En tratamiento hospital continuo otros mujer",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.7",
								name: "<b>HPU07</b> Parcial día mujer",
								data: {
									"desc": "En tratamiento hospital parcial día mujer",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.8",
								name: "<b>HPU08</b> Parcial noche mujer",
								data: {
									"desc": "En tratamiento hospital parcial noche mujer",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.9",
								name: "<b>HPU09</b> Fin de semana mujer",
								data: {
									"desc": "En tratamiento hospital parcial fin de semana mujer",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.10",
								name: "<b>HPU10</b> Cuidados especiales mujer",
								data: {
									"desc": "En tratamiento unidad de cuidados especiales mujer",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.11",
								name: "<b>HPU11</b> H continuo paidopsiq hombre",
								data: {
									"desc": "En tratamiento hospital continuo paidopsiquiatría hombre",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.12",
								name: "<b>HPU12</b> H continuo psiq hombre",
								data: {
									"desc": "En tratamiento hospital continuo psiquiatría hombre",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.13",
								name: "<b>HPU13</b> H continuo psicogeriatria hombre",
								data: {
									"desc": "En tratamiento hospital continuo psicogeriatría hombre",
									"$width": ancho_med,
									"$height": alto_media
								},
								children: []
							},
							{
								id: "node1.10.2.14",
								name: "<b>HPU14</b> H continuo desintox hombre",
								data: {
									"desc": "En tratamiento hospital continuo unidad desintoxicación hombre",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.15",
								name: "<b>HPU15</b> H continuo villas hombre",
								data: {
									"desc": "En tratamiento hospital continuo villas hombre",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.16",
								name: "<b>HPU16</b> H continuo otros hombre",
								data: {
									"desc": "En tratamiento hospital continuo otros hombre",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.17",
								name: "<b>HPU17</b> Parcial día hombre",
								data: {
									"desc": "En tratamiento hospital parcial día hombre",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.18",
								name: "<b>HPU18</b> Parcial noche hombre",
								data: {
									"desc": "En tratamiento hospital parcial noche hombre",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.19",
								name: "<b>HPU19</b> Fin de semana hombre",
								data: {
									"desc": "En tratamiento hospital parcial fin de semana hombre",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							},
							{
								id: "node1.10.2.20",
								name: "<b>HPU20</b> Cuidados especiales hombre",
								data: {
									"desc": "En tratamiento unidad de cuidados especiales hombre",
									"$width": ancho_med,
									"$height": alto_med
								},
								children: []
							}
						]
					}
				]
			},	
			{
				id: "node1.11",
				name: "Rehabilitación",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.11.1",
						name: "<b>HPP07</b> Mujer rehabilitada HP",
						data: {
							"desc": "Mujer rehabilitada en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.2",
						name: "<b>HPP14</b> Hombre rehabilitado HP",
						data: {
							"desc": "Hombre rehabilitado en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.3",
						name: "<b>HPR01</b> Mujer primera vez",
						data: {
							"desc": "Mujer primera vez en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.4",
						name: "<b>HPR02</b> Mujer terapia física",
						data: {
							"desc": "Mujer terapia fisica en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.5",
						name: "<b>HPR06</b> Mujer terapia vida cotidiana",
						data: {
							"desc": "Mujer terapia vida cotidiana en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.11.6",
						name: "<b>HPR07</b> Mujer terapia ocupacional",
						data: {
							"desc": "Mujer terapia ocupacional en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.7",
						name: "<b>HPR08</b> Mujer paciente rehabilitado",
						data: {
							"desc": "Mujer paciente rehabilitado en hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.11.8",
						name: "<b>HPR09</b> Hombre primera vez",
						data: {
							"desc": "Hombre primera vez en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.9",
						name: "<b>HPR10</b> Hombre terapia física",
						data: {
							"desc": "Hombre terapia física en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.10",
						name: "<b>HPR14</b> Hombre terapia vida cotidiana",
						data: {
							"desc": "Hombre terapia vida cotidiana en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.11.11",
						name: "<b>HPR15</b> Hombre terapia ocupacional",
						data: {
							"desc": "Hombre terapia ocupacional en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.12",
						name: "<b>HPR16</b> Hombre paciente rehabilitado",
						data: {
							"desc": "Hombre paciente rehabilitado en hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.11.13",
						name: "<b>HPR17</b> Mujer terapias alternativas",
						data: {
							"desc": "Mujer terapias alternativas en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.11.14",
						name: "<b>HPR18</b> Mujer comunicación efectiva",
						data: {
							"desc": "Mujer comunicación efectiva en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.11.15",
						name: "<b>HPR19</b> Mujer concluye programa",
						data: {
							"desc": "Mujer paciente concluye programa de rehabilitación en hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.16",
						name: "<b>HPR20</b> Hombre terapias alternativas",
						data: {
							"desc": "Hombres terapias alternativas en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.11.17",
						name: "<b>HPR21</b> Hombre comunicación efectiva",
						data: {
							"desc": "Hombres comunicación efectiva en rehabilitación de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_media
						},
						children: []
					},
					{
						id: "node1.11.18",
						name: "<b>HPR22</b> Hombre concluye programa",
						data: {
							"desc": "Hombres paciente concluye programa de rehabilitación en hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.19",
						name: "<b>RET05</b> Rehabilitados",
						data: {
							"desc": "Pacientes rehabilitados",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.20",
						name: "<b>RET06</b> Lenguaje",
						data: {
							"desc": "Sesiones de lenguaje",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.21",
						name: "<b>SMA04</b> Mujeres rehabilitadas",
						data: {
							"desc": "Pacientes rehabilitados mujeres",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{
						id: "node1.11.22",
						name: "<b>SMA08</b> Hombres rehabilitados",
						data: {
							"desc": "Pacientes rehabilitados hombres",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					}
				]
			},	
			{
				id: "node1.12",
				name: "Sesiones de grupo",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{	id: "node1.12.1",
						name: "<b>DSA01</b> Acompañamiento emocional",
						data: {
							"desc": "Sesiones de grupo por acompañamiento emocional en UNEME DEDICAM",
							"$width": ancho_med,
							"$height": alto_media
						},
					    children: []
					},
					{	id: "node1.12.2",
						name: "<b>ESP11</b> Psicoterapia mujeres UNEME",
						data: {
							"desc": "Psicoterapia grupal mujer en UNEME EC",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{	id: "node1.12.3",
						name: "<b>ESP12</b> Psicoterapia hombres UNEME",
						data: {
							"desc": "Psicoterapia grupal hombre en UNEME EC",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{	id: "node1.12.4",
						name: "<b>HPP05</b> Psicoterapia mujeres HP",
						data: {
							"desc": "Psicoterapias grupales mujeres en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{	id: "node1.12.5",
						name: "<b>HPP12</b> Psicoterapia hombres HP",
						data: {
							"desc": "Psicoterapias grupales hombres en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					},
					{	id: "node1.12.6",
						name: "<b>VAT04</b> Personas con VIH-SIDA",
						data: {
							"desc": "Psicoterapias grupales personas viviendo con VIH/SIDA",
							"$width": ancho_med,
							"$height": alto_medi
						},
						children: []
					}
				]
			},	
			{
				id: "node1.13",
				name: "Sesiones de psicología",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{	id: "node1.13.1",
						name: "<b>ESP03</b> Psicoterapia mujer",
						data: {
							"desc": "Psicoterapia individual mujer en UNEME EC",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{	id: "node1.13.2",
						name: "<b>ESP07</b> Psicoterapia hombre",
						data: {
							"desc": "Psicoterapia individual hombre en UNEME EC",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{	id: "node1.13.3",
						name: "<b>HPP01</b> Entrevista mujer HP",
						data: {
							"desc": "Mujer entrevista en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{	id: "node1.13.4",
						name: "<b>HPP03</b> Psicoterapia mujer HP",
						data: {
							"desc": "Mujer psicoterapia individual en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{	id: "node1.13.5",
						name: "<b>HPP04</b> Psicoterapia familiar mujeres",
						data: {
							"desc": "Psicoterapias familiares mujeres en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{	id: "node1.13.6",
						name: "<b>HPP06</b> Psicoterapia de pareja mujeres",
						data: {
							"desc": "Psicoterapias de pareja mujeres en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{	id: "node1.13.7",
						name: "<b>HPP08</b> Entrevista hombre HP",
						data: {
							"desc": "Hombre entrevista en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{	id: "node1.13.8",
						name: "<b>HPP10</b> Psicoterapia hombre HP",
						data: {
							"desc": "Hombre psicoterapia individual en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{	id: "node1.13.9",
						name: "<b>HPP11</b> Psicoterapia familiar hombres",
						data: {
							"desc": "Psicoterapias familiares hombres en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{	id: "node1.13.10",
						name: "<b>HPP13</b> Psicoterapia de pareja hombres ",
						data: {
							"desc": "Psicoterapias de pareja hombres en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{	id: "node1.13.11",
						name: "<b>HPP15</b> Paciente alta mujeres",
						data: {
							"desc": "Paciente alta mujeres en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					},
					{	id: "node1.13.12",
						name: "<b>HPP16</b> Paciente alta hombres",
						data: {
							"desc": "Paciente alta hombres en psicología de hospital psiquiátrico",
							"$width": ancho_med,
							"$height": alto_med
						},
						children: []
					}
				]
			},	
			{
				id: "node1.14",
				name: "Tratamiento breve concluido",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.14.1",
						name: "Mujeres",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.14.1.1",
								name: "< 19 años",
								data: {
									"desc": "Menores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.14.1.1.1",
										name: "Alcohol",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.1.1.1.1",
												name: "<b>ATC01</b> Mujer 5-9 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol mujer de 5 a 9 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.1.2",
												name: "<b>ATC02</b> Mujer 10-14 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol mujer de 10 a 14 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.1.3",
												name: "<b>ATC03</b> Mujer 15-19 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol mujer de 15 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											}
										]	
									},
									{
										id: "node1.14.1.1.2",
										name: "Tabaco",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.1.1.2.1",
												name: "<b>ATC08</b> Mujer 5-9 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco mujer de 5 a 9 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.2.2",
												name: "<b>ATC09</b> Mujer 10-14 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco mujer de 10 a 14 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.2.3",
												name: "<b>ATC10</b> Mujer 15-19 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco mujer de 15 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											}
										]	
									},
									{
										id: "node1.14.1.1.3",
										name: "Otras drogas",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.1.1.3.1",
												name: "<b>ATC15</b> Mujer 5-9 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga mujer de 5 a 9 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.2",
												name: "<b>ATC16</b> Mujer 10-14 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga mujer de 10 a 14 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.3",
												name: "<b>ATC17</b> Mujer 15-19 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga mujer de 15 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.4",
												name: "<b>ATC57</b> Cannabis mujer 12-17",
												data: {
													"desc": "Tratamiento breve concluido por cannabis mujer de 12 a 17 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.5",
												name: "<b>ATC58</b> Cannabis mujer 18-19",
												data: {
													"desc": "Tratamiento breve concluido por cannabis mujer de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.6",
												name: "<b>ATC63</b> Meta mujer 5-11",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina mujer de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.7",
												name: "<b>ATC64</b> Meta mujer 12-17",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina mujer de 12 a 17 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.8",
												name: "<b>ATC65</b> Meta mujer 18-19",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina mujer de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.9",
												name: "<b>ATC70</b> Inhalables mujer 5-11",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes mujer de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.10",
												name: "<b>ATC71</b> Inhalables mujer 12-17",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes mujer de 12 a 17 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.11",
												name: "<b>ATC72</b> Inhalables mujer 18-19",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes mujer de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.12",
												name: "<b>ATC77</b> Cocaína mujer 5-11",
												data: {
													"desc": "Tratamiento breve concluido por cocaína mujer de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.13",
												name: "<b>ATC78</b> Cocaína mujer 12-17",
												data: {
													"desc": "Tratamiento breve concluido por cocaína mujer de 12 a 17 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.14",
												name: "<b>ATC79</b> Cocaína mujer 18-19",
												data: {
													"desc": "Tratamiento breve concluido por cocaína mujer de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.15",
												name: "<b>ATC84</b> Mujer 5-11 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga mujer de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.16",
												name: "<b>ATC85</b> Mujer 12-17 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga mujer de 12 a 17 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.1.3.17",
												name: "<b>ATC86</b> Mujer 18-19 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga mujer de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											}	
										]	
									}	
								]
							},
							{
								id: "node1.14.1.2",
								name: "> 19 años",
								data: {
									"desc": "Mayores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.14.1.2.1",
										name: "Alcohol",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.1.2.1.1",
												name: "<b>ATC04</b> Mujer 20-29 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol mujer de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.1.2",
												name: "<b>ATC05</b> Mujer 30-49 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol mujer de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.1.3",
												name: "<b>ATC06</b> Mujer 50-59 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol mujer de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.1.4",
												name: "<b>ATC07</b> Mujer 60 y más años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol mujer de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											}
										]	
									},
									{
										id: "node1.14.1.2.2",
										name: "Tabaco",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.1.2.2.1",
												name: "<b>ATC11</b> Mujer 20-29 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco mujer de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.2.2",
												name: "<b>ATC12</b> Mujer 30-49 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco mujer de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.2.3",
												name: "<b>ATC13</b> Mujer 50-59 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco mujer de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.2.4",
												name: "<b>ATC14</b> Mujer 60 y más años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco mujer de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											}
										]	
									},
									{
										id: "node1.14.1.2.3",
										name: "Otras drogas",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.1.2.3.1",
												name: "<b>ATC18</b> Mujer 20-29 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga mujer de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.2",
												name: "<b>ATC19</b> Mujer 30-49 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga mujer de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.3",
												name: "<b>ATC20</b> Mujer 50-59 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga mujer de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.4",
												name: "<b>ATC21</b> Mujer 60 y más años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga mujer de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.5",
												name: "<b>ATC59</b> Cannabis mujer 20-29",
												data: {
													"desc": "Tratamiento breve concluido por cannabis mujer de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.6",
												name: "<b>ATC60</b> Cannabis mujer 30-49",
												data: {
													"desc": "Tratamiento breve concluido por cannabis mujer de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.7",
												name: "<b>ATC61</b> Cannabis mujer 50-59",
												data: {
													"desc": "Tratamiento breve concluido por cannabis mujer de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.8",
												name: "<b>ATC62</b> Cannabis mujer 60 y más",
												data: {
													"desc": "Tratamiento breve concluido por cannabis mujer de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.9",
												name: "<b>ATC66</b> Meta mujer 20-29",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina mujer de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.10",
												name: "<b>ATC67</b> Meta mujer 30-49",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina mujer de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.11",
												name: "<b>ATC68</b> Meta mujer 50-59",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina mujer de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.12",
												name: "<b>ATC69</b> Meta mujer 60 y más",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina mujer de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.13",
												name: "<b>ATC73</b> Inhalables mujer 20-29",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes mujer de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.14",
												name: "<b>ATC74</b> Inhalables mujer 30-49",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes mujer de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.15",
												name: "<b>ATC75</b> Inhalables mujer 50-59",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes mujer de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.16",
												name: "<b>ATC76</b> Inhalables mujer 60 y más",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes mujer de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.17",
												name: "<b>ATC80</b> Cocaína mujer 20-29",
												data: {
													"desc": "Tratamiento breve concluido por cocaína mujer de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.18",
												name: "<b>ATC81</b> Cocaína mujer 30-49",
												data: {
													"desc": "Tratamiento breve concluido por cocaína mujer de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.19",
												name: "<b>ATC82</b> Cocaína mujer 50-59",
												data: {
													"desc": "Tratamiento breve concluido por cocaína mujer de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.1.2.3.20",
												name: "<b>ATC83</b> Cocaína mujer 60 y más",
												data: {
													"desc": "Tratamiento breve concluido por cocaína mujer de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
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
						id: "node1.14.2",
						name: "Hombres",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.14.2.1",
								name: "< 19 años",
								data: {
									"desc": "Menores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.14.2.1.1",
										name: "Alcohol",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.2.1.1.1",
												name: "<b>ATC29</b> Hombre 5-9 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol hombre de 5 a 9 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.1.2",
												name: "<b>ATC30</b> Hombre 10-14 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol hombre de 10 a 14 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.1.3",
												name: "<b>ATC31</b> Hombre 15-19 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol hombre de 15 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.1.4",
												name: "<b>ATC87</b> Hombre 5-11 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol hombre de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.1.5",
												name: "<b>ATC88</b> Hombre 12-17 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol hombre de 12 a 17 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.1.6",
												name: "<b>ATC89</b> Hombre 18-19 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol hombre de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											}
										]	
									},
									{
										id: "node1.14.2.1.2",
										name: "Tabaco",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.2.1.2.1",
												name: "<b>ATC36</b> Hombre 5-9 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco hombre de 5 a 9 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.2.2",
												name: "<b>ATC37</b> Hombre 10-14 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco hombre de 10 a 14 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.2.3",
												name: "<b>ATC38</b> Hombre 15-19 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco hombre de 15 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.2.4",
												name: "<b>ATC90</b> Hombre 5-11 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco hombre de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.2.5",
												name: "<b>ATC91</b> Hombre 12-17 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco hombre de 12 a 17 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.2.6",
												name: "<b>ATC92</b> Hombre 18-19 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco hombre de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											}
										]	
									},
									{
										id: "node1.14.2.1.3",
										name: "Otras drogas",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.2.1.3.1",
												name: "<b>ATB01</b> Meta hombre 5-11",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina hombre de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.2",
												name: "<b>ATB02</b> Meta hombre 12-17",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina hombre de 12 a 17 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.3",
												name: "<b>ATB03</b> Meta hombre 18-19",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina hombre de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.4",
												name: "<b>ATB08</b> Inhalables hombre 5-11",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes hombre de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.5",
												name: "<b>ATB09</b> Inhalables hombre 5-11",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes hombre de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.6",
												name: "<b>ATB10</b> Inhalables hombre 18-19",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes hombre de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.7",
												name: "<b>ATB15</b> Cocaína hombre 5-11",
												data: {
													"desc": "Tratamiento breve concluido por cocaína hombre de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.8",
												name: "<b>ATB16</b> Cocaína hombre 12-17",
												data: {
													"desc": "Tratamiento breve concluido por cocaína hombre de 12 a 17 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.9",
												name: "<b>ATB17</b> Cocaína hombre 18-19",
												data: {
													"desc": "Tratamiento breve concluido por cocaína hombre de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.10",
												name: "<b>ATB22</b> Hombre 5-11 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga hombre de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.11",
												name: "<b>ATB23</b> Hombre 12-17 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga hombre de 12 a 17 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.12",
												name: "<b>ATB24</b> Hombre 18-19 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga hombre de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.13",
												name: "<b>ATC43</b> Hombre 5-9 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga hombre de 5 a 9 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.14",
												name: "<b>ATC44</b> Hombre 10-14 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga hombre de 10 a 14 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.15",
												name: "<b>ATC45</b> Hombre 15-19 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga hombre de 15 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.16",
												name: "<b>ATC93</b> Cannabis hombre 5-11",
												data: {
													"desc": "Tratamiento breve concluido por cannabis hombre de 5 a 11 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.17",
												name: "<b>ATC94</b> Cannabis hombre 12-17",
												data: {
													"desc": "Tratamiento breve concluido por cannabis hombre de 12 a 17 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.1.3.18",
												name: "<b>ATC95</b> Cannabis hombre 18-19",
												data: {
													"desc": "Tratamiento breve concluido por cannabis hombre de 18 a 19 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
										]	
									}	
								]
							},
							{
								id: "node1.14.2.2",
								name: "> 19 años",
								data: {
									"desc": "Mayores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.14.2.2.1",
										name: "Alcohol",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.2.2.1.1",
												name: "<b>ATC32</b> Hombre 20-29 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol hombre de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.1.2",
												name: "<b>ATC33</b> Hombre 30-49 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol hombre de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.1.3",
												name: "<b>ATC34</b> Hombre 50-59 años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol hombre de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.1.4",
												name: "<b>ATC35</b> Hombre 60 y más años",
												data: {
													"desc": "Tratamiento breve concluido por alcohol hombre de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											}
										]	
									},
									{
										id: "node1.14.2.2.2",
										name: "Tabaco",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.2.2.2.1",
												name: "<b>ATC39</b> Hombre 20-29 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco hombre de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.2.2",
												name: "<b>ATC40</b> Hombre 30-49 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco hombre de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.2.3",
												name: "<b>ATC41</b> Hombre 50-59 años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco hombre de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.2.4",
												name: "<b>ATC42</b> Hombre 60 y más años",
												data: {
													"desc": "Tratamiento breve concluido por tabaco hombre de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											}
										]	
									},
									{
										id: "node1.14.2.2.3",
										name: "Otras drogas",
										data: {
											"desc": "",
											"$width": ancho_min,
											"$height": alto_mini
										},
										children: [
											{
												id: "node1.14.2.2.3.1",
												name: "<b>ATB04</b> Meta hombre 20-29",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina hombre de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.2",
												name: "<b>ATB05</b> Meta hombre 30-49",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina hombre de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.3",
												name: "<b>ATB06</b> Meta hombre 50-59",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina hombre de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.4",
												name: "<b>ATB07</b> Meta hombre 60 y más",
												data: {
													"desc": "Tratamiento breve concluido por metanfetamina hombre de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.5",
												name: "<b>ATB11</b> Inhalables hombre 20-29",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes hombre de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.6",
												name: "<b>ATB12</b> Inhalables hombre 30-49",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes hombre de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.7",
												name: "<b>ATB13</b> Inhalables hombre 50-59",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes hombre de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.8",
												name: "<b>ATB14</b> Inhalables hombre 60 y más",
												data: {
													"desc": "Tratamiento breve concluido por inhalables y solventes hombre de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.9",
												name: "<b>ATB18</b> Cocaína hombre 20-29",
												data: {
													"desc": "Tratamiento breve concluido por cocaína hombre de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.10",
												name: "<b>ATB19</b> Cocaína hombre 30-49",
												data: {
													"desc": "Tratamiento breve concluido por cocaína hombre de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.11",
												name: "<b>ATB20</b> Cocaína hombre 50-59",
												data: {
													"desc": "Tratamiento breve concluido por cocaína hombre de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.12",
												name: "<b>ATB21</b> Cocaína hombre 60 y más",
												data: {
													"desc": "Tratamiento breve concluido por cocaína hombre de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.13",
												name: "<b>ATC46</b> Hombre 20-29 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga hombre de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.14",
												name: "<b>ATC47</b> Hombre 30-49 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga hombre de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.15",
												name: "<b>ATC48</b> Hombre 50-59 años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga hombre de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.16",
												name: "<b>ATC49</b> Hombre 60 y más años",
												data: {
													"desc": "Tratamiento breve concluido por otra droga hombre de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.17",
												name: "<b>ATC96</b> Cannabis hombre 20-29",
												data: {
													"desc": "Tratamiento breve concluido por cannabis hombre de 20 a 29 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.18",
												name: "<b>ATC97</b> Cannabis hombre 30-49",
												data: {
													"desc": "Tratamiento breve concluido por cannabis hombre de 30 a 49 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.19",
												name: "<b>ATC98</b> Cannabis hombre 50-59",
												data: {
													"desc": "Tratamiento breve concluido por cannabis hombre de 50 a 59 años",
													"$width": ancho_med,
													"$height": alto_med
												},
												children: []
											},
											{
												id: "node1.14.2.2.3.20",
												name: "<b>ATC99</b> Cannabis hombre 60 y más",
												data: {
													"desc": "Tratamiento breve concluido por cannabis hombre de 60 y más años",
													"$width": ancho_med,
													"$height": alto_med
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
				id: "node1.15",
				name: "Violencia",
				data: {
					"desc": "",
					"$width": ancho_min,
					"$height": alto_min
				},
				children: [
					{
						id: "node1.15.1",
						name: "Mujeres",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.15.1.1",
								name: "< 19 años",
								data: {
									"desc": "Menores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.15.1.1.1",
										name: "<b>DET65</b> Mujeres 10-14 años",
										data: {
											"desc": "Detección de violencia de 10 a 14 años mujeres positivo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.2",
										name: "<b>DET66</b> Mujeres 15-19 años",
										data: {
											"desc": "Detección de violencia de 15 a 19 años mujeres positivo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.3",
										name: "<b>VFM01</b> Mujer 0-9 NS padre",
										data: {
											"desc": "Violencia familiar no sexual mujeres 0 a 9 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.4",
										name: "<b>VFM02</b> Mujer 10-19 NS padre",
										data: {
											"desc": "Violencia familiar no sexual mujeres 10 a 19 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.5",
										name: "<b>VFM04</b> Mujer E 10-19 NS padre",
										data: {
											"desc": "Violencia familiar no sexual mujeres embarazadas 10 a 19 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.6",
										name: "<b>VFM09</b> Mujer 0-9 S padre",
										data: {
											"desc": "Violencia familiar sexual mujeres 0 a 9 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.7",
										name: "<b>VFM10</b> Mujer 10-19 S padre",
										data: {
											"desc": "Violencia familiar sexual mujeres 10 a 19 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.8",
										name: "<b>VFM12</b> Mujer E 10-19 S padre",
										data: {
											"desc": "Violencia familiar sexual mujeres embarazadas 10 a 19 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.9",
										name: "<b>VFM17</b> Mujer 0-9 NS madre",
										data: {
											"desc": "Violencia familiar no sexual mujeres 0 a 9 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.10",
										name: "<b>VFM18</b> Mujer 10-19 NS madre",
										data: {
											"desc": "Violencia familiar no sexual mujeres 10 a 19 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.11",
										name: "<b>VFM20</b> Mujer E 10-19 NS madre",
										data: {
											"desc": "Violencia familiar no sexual mujeres embarazadas 10 a 19 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.12",
										name: "<b>VFM25</b> Mujer 0-9 S madre",
										data: {
											"desc": "Violencia familiar sexual mujeres 0 a 9 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.13",
										name: "<b>VFM26</b> Mujer 10-19 S madre",
										data: {
											"desc": "Violencia familiar sexual mujeres 10 a 19 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.14",
										name: "<b>VFM28</b> Mujer E 10-19 S madre",
										data: {
											"desc": "Violencia familiar sexual mujeres embarazadas 10 a 19 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.15",
										name: "<b>VFM33</b> Mujer 10-19 NS pareja",
										data: {
											"desc": "Violencia familiar no sexual mujeres 10 a 19 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.16",
										name: "<b>VFM37</b> Mujer E 10-19 NS pareja",
										data: {
											"desc": "Violencia familiar no sexual mujeres embarazadas 10 a 19 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.17",
										name: "<b>VFM43</b> Mujer 10-19 S pareja",
										data: {
											"desc": "Violencia familiar sexual mujeres 10 a 19 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.18",
										name: "<b>VFM47</b> Mujer E 10-19 S pareja",
										data: {
											"desc": "Violencia familiar sexual mujeres embarazadas 10 a 19 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.19",
										name: "<b>VFM67</b> Mujer 0-9 NS otro",
										data: {
											"desc": "Violencia familiar no sexual mujeres 0 a 9 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.20",
										name: "<b>VFM68</b> Mujer 10-19 NS otro",
										data: {
											"desc": "Violencia familiar no sexual mujeres 10 a 19 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.21",
										name: "<b>VFM72</b> Mujer E 10-19 NS otro",
										data: {
											"desc": "Violencia familiar no sexual mujeres embarazadas 10 a 19 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.22",
										name: "<b>VFM79</b> Mujer 0-9 S otro",
										data: {
											"desc": "Violencia familiar sexual mujeres 0 a 9 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.23",
										name: "<b>VFM80</b> Mujer 10-19 S otro",
										data: {
											"desc": "Violencia familiar sexual mujeres 10 a 19 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.24",
										name: "<b>VFM84</b> Mujer E 10-19 S otro",
										data: {
											"desc": "Violencia familiar sexual mujeres embarazadas 10 a 19 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.25",
										name: "<b>VFV01</b> Mujer 0-9 NS",
										data: {
											"desc": "Violencia no familiar no sexual mujeres 0 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.26",
										name: "<b>VFV02</b> Mujer 10-19 NS",
										data: {
											"desc": "Violencia no familiar no sexual mujeres 10 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.27",
										name: "<b>VFV06</b> Mujer E 10-19 NS",
										data: {
											"desc": "Violencia no familiar no sexual mujeres embarazadas 10 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.28",
										name: "<b>VFV13</b> Mujer 0-9 S",
										data: {
											"desc": "Violencia no familiar sexual mujeres 0 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.29",
										name: "<b>VFV14</b> Mujer 10-19 S",
										data: {
											"desc": "Violencia no familiar sexual mujeres 10 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.1.30",
										name: "<b>VFV18</b> Mujer E 10-19 S",
										data: {
											"desc": "Violencia no familiar sexual mujeres embarazadas 10 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]
							},
							{
								id: "node1.15.1.2",
								name: "> 19 años",
								data: {
									"desc": "Mayores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.15.1.2.1",
										name: "<b>DET49</b> Mujeres 15 y más años",
										data: {
											"desc": "Detección de violencia familiar 15 y más años mujer positivo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.2",
										name: "<b>DET67</b> Mujeres 20 y más años",
										data: {
											"desc": "Detección de violencia de 20 y más años mujeres positivo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.3",
										name: "<b>VFM03</b> Mujer 20-49 NS padre",
										data: {
											"desc": "Violencia familiar no sexual mujeres 20 a 49 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.4",
										name: "<b>VFM05</b> Mujer E 20-49 NS padre",
										data: {
											"desc": "Violencia familiar no sexual mujeres embarazadas 20 a 49. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.5",
										name: "<b>VFM11</b> Mujer 20-49 S padre",
										data: {
											"desc": "Violencia familiar sexual mujeres 20 a 49 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.6",
										name: "<b>VFM13</b> Mujer E 20-49 S padre",
										data: {
											"desc": "Violencia familiar sexual mujeres embarazadas 20 a 49. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.7",
										name: "<b>VFM19</b> Mujer 20-49 NS madre",
										data: {
											"desc": "Violencia familiar no sexual mujeres 20 a 49 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.8",
										name: "<b>VFM21</b> Mujer E 20-49 NS madre",
										data: {
											"desc": "Violencia familiar no sexual mujeres embarazadas 20 a 49 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.9",
										name: "<b>VFM27</b> Mujer 20-49 S madre",
										data: {
											"desc": "Violencia familiar sexual mujeres 20 a 49 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.10",
										name: "<b>VFM29</b> Mujer E 20-49 S madre",
										data: {
											"desc": "Violencia familiar sexual mujeres embarazadas 20 a 49 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.11",
										name: "<b>VFM34</b> Mujer 20-49 NS pareja",
										data: {
											"desc": "Violencia familiar no sexual mujeres 20 a 49 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.12",
										name: "<b>VFM35</b> Mujer 50-59 NS pareja",
										data: {
											"desc": "Violencia familiar no sexual mujeres 50 a 59 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.13",
										name: "<b>VFM36</b> Mujer 60 y más NS pareja",
										data: {
											"desc": "Violencia familiar no sexual mujeres 60 y mas años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.14",
										name: "<b>VFM38</b> Mujer E 20-49 NS pareja",
										data: {
											"desc": "Violencia familiar no sexual mujeres embarazadas 20 a 49 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.15",
										name: "<b>VFM44</b> Mujer 20-49 S pareja",
										data: {
											"desc": "Violencia familiar sexual mujeres 20 a 49 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.16",
										name: "<b>VFM45</b> Mujer 50-59 S pareja",
										data: {
											"desc": "Violencia familiar sexual mujeres 50 a 59 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.17",
										name: "<b>VFM46</b> Mujer 60 y más S pareja",
										data: {
											"desc": "Violencia familiar sexual mujeres 60 y mas años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.18",
										name: "<b>VFM48</b> Mujer E 20-49 S pareja",
										data: {
											"desc": "Violencia familiar sexual mujeres embarazadas 20 a 49 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.19",
										name: "<b>VFM53</b> Mujer 20-49 NS hijo",
										data: {
											"desc": "Violencia familiar no sexual mujeres 20 a 49 años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.20",
										name: "<b>VFM54</b> Mujer 50-59 NS hijo",
										data: {
											"desc": "Violencia familiar no sexual mujeres 50 a 59 años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.21",
										name: "<b>VFM55</b> Mujer 60 y más NS hijo",
										data: {
											"desc": "Violencia familiar no sexual mujeres 60 y mas años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.22",
										name: "<b>VFM56</b> Mujer E 20-49 NS hijo",
										data: {
											"desc": "Violencia familiar no sexual mujeres embarazadas 20 a 49 años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.23",
										name: "<b>VFM60</b> Mujer 20-49 S hijo",
										data: {
											"desc": "Violencia familiar sexual mujeres 20 a 49 años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.24",
										name: "<b>VFM61</b> Mujer 50-59 S hijo",
										data: {
											"desc": "Violencia familiar sexual mujeres 50 a 59 años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.25",
										name: "<b>VFM62</b> Mujer 60 y más S hijo",
										data: {
											"desc": "Violencia familiar sexual mujeres 60 y mas años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.26",
										name: "<b>VFM63</b> Mujer E 20-49 S hijo",
										data: {
											"desc": "Violencia familiar sexual mujeres embarazadas 20 a 49 años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.27",
										name: "<b>VFM69</b> Mujer 20-49 NS otro",
										data: {
											"desc": "Violencia familiar no sexual mujeres 20 a 49 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.28",
										name: "<b>VFM70</b> Mujer 50-59 NS otro",
										data: {
											"desc": "Violencia familiar no sexual mujeres 50 a 59 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.29",
										name: "<b>VFM71</b> Mujer 60 y más NS otro",
										data: {
											"desc": "Violencia familiar no sexual mujeres 60 y mas años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.30",
										name: "<b>VFM73</b> Mujer E 20-49 NS otro",
										data: {
											"desc": "Violencia familiar no sexual mujeres embarazadas 20 a 49 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.31",
										name: "<b>VFM81</b> Mujer 20-49 S otro",
										data: {
											"desc": "Violencia familiar sexual mujeres 20 a 49 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.32",
										name: "<b>VFM82</b> Mujer 50-59 S otro",
										data: {
											"desc": "Violencia familiar sexual mujeres 50 a 59 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.33",
										name: "<b>VFM83</b> Mujer 60 y más S otro",
										data: {
											"desc": "Violencia familiar sexual mujeres 60 y mas años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.34",
										name: "<b>VFM85</b> Mujer E 20-49 S otro",
										data: {
											"desc": "Violencia familiar sexual mujeres embarazadas 20 a 49 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.35",
										name: "<b>VFV03</b> Mujer 20-49 NS",
										data: {
											"desc": "Violencia no familiar no sexual mujeres 20 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.36",
										name: "<b>VFV04</b> Mujer 50-59 NS",
										data: {
											"desc": "Violencia no familiar no sexual mujeres 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.37",
										name: "<b>VFV05</b> Mujer 60 y más NS",
										data: {
											"desc": "Violencia no familiar no sexual mujeres 60 y mas años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.38",
										name: "<b>VFV07</b> Mujer E 20-49 NS",
										data: {
											"desc": "Violencia no familiar no sexual mujeres embarazadas 20 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.39",
										name: "<b>VFV15</b> Mujer 20-49 S",
										data: {
											"desc": "Violencia no familiar sexual mujeres 20 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.40",
										name: "<b>VFV16</b> Mujer 50-59 S",
										data: {
											"desc": "Violencia no familiar sexual mujeres 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.41",
										name: "<b>VFV17</b> Mujer 160 y más S",
										data: {
											"desc": "Violencia no familiar sexual mujeres 60 y mas años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.1.2.42",
										name: "<b>VFV19</b> Mujer E 20-49 S",
										data: {
											"desc": "Violencia no familiar sexual mujeres embarazadas 20 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]
							}
						]
					},
					{
						id: "node1.15.2",
						name: "Hombres",
						data: {
							"desc": "",
							"$width": ancho_min,
							"$height": alto_mini
						},
						children: [
							{
								id: "node1.15.2.1",
								name: "< 19 años",
								data: {
									"desc": "Menores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.15.2.1.1",
										name: "<b>DET76</b> Hombres 10-19 años",
										data: {
											"desc": "Detección de violencia de 10 a 19 años hombre positivo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.2",
										name: "<b>VFM06</b> Hombre 0-9 NS padre",
										data: {
											"desc": "Violencia familiar no sexual hombre 0 a 9 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.3",
										name: "<b>VFM07</b> Hombre 10-19 NS padre",
										data: {
											"desc": "Violencia familiar no sexual hombre 10 a 19 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.4",
										name: "<b>VFM14</b> Hombre 0-9 S padre",
										data: {
											"desc": "Violencia familiar sexual hombre 0 a 9 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.5",
										name: "<b>VFM15</b> Hombre 10-19 S padre",
										data: {
											"desc": "Violencia familiar sexual hombre 10 a 19 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.6",
										name: "<b>VFM22</b> Hombre 0-9 NS madre",
										data: {
											"desc": "Violencia familiar no sexual hombre 0 a 9 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.7",
										name: "<b>VFM23</b> Hombre 10-19 NS madre",
										data: {
											"desc": "Violencia familiar no sexual hombre 10 a 19 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.8",
										name: "<b>VFM30</b> Hombre 0-9 S madre",
										data: {
											"desc": "Violencia familiar sexual hombre 0 a 9 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.9",
										name: "<b>VFM31</b> Hombre 10-19 S madre",
										data: {
											"desc": "Violencia familiar sexual hombre 10 a 19 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.10",
										name: "<b>VFM39</b> Hombre 10-19 NS pareja",
										data: {
											"desc": "Violencia familiar no sexual hombres 10 a 19 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.11",
										name: "<b>VFM49</b> Hombre 10-19 S pareja",
										data: {
											"desc": "Violencia familiar sexual hombres 10 a 19 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.12",
										name: "<b>VFM74</b> Hombre 0-9 NS otro",
										data: {
											"desc": "Violencia familiar no sexual hombres 0 a 9 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.13",
										name: "<b>VFM75</b> Hombre 10-19 NS otro",
										data: {
											"desc": "Violencia familiar no sexual hombres 10 a 19 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.14",
										name: "<b>VFM86</b> Hombre 0-9 S otro",
										data: {
											"desc": "Violencia familiar sexual hombres 0 a 9 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.15",
										name: "<b>VFM87</b> Hombre 10-19 S otro",
										data: {
											"desc": "Violencia familiar sexual hombres 10 a 19 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.16",
										name: "<b>VFV08</b> Hombre 0-9 NS",
										data: {
											"desc": "Violencia no familiar no sexual hombres 0 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.17",
										name: "<b>VFV09</b> Hombre 10-19 NS",
										data: {
											"desc": "Violencia no familiar no sexual hombres 10 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.18",
										name: "<b>VFV20</b> Hombre 0-9 S",
										data: {
											"desc": "Violencia no familiar sexual hombres 0 a 9 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.1.19",
										name: "<b>VFV21</b> Hombre 10-19 S",
										data: {
											"desc": "Violencia no familiar sexual hombres 10 a 19 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]
							},
							{
								id: "node1.15.2.2",
								name: "> 19 años",
								data: {
									"desc": "Mayores de 19 años",
									"$width": ancho_min,
									"$height": alto_mini
								},
								children: [
									{
										id: "node1.15.2.2.1",
										name: "<b>VFM08</b> Hombre 20-49 NS padre",
										data: {
											"desc": "Violencia familiar no sexual hombre 20 a 49 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.2",
										name: "<b>VFM16</b> Hombre 20-49 S padre",
										data: {
											"desc": "Violencia familiar sexual hombre 20 a 49 años. Padre/padrastro",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.3",
										name: "<b>VFM24</b> Hombre 20-49 NS madre",
										data: {
											"desc": "Violencia familiar no sexual hombre 20 a 49 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.4",
										name: "<b>VFM32</b> Hombre 20-49 S madre",
										data: {
											"desc": "Violencia familiar sexual hombre 20 a 49 años. Madre/madrastra",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.5",
										name: "<b>VFM40</b> Hombre 20-49 NS pareja",
										data: {
											"desc": "Violencia familiar no sexual hombres 20 a 49 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.6",
										name: "<b>VFM41</b> Hombre 50-59 NS pareja",
										data: {
											"desc": "Violencia familiar no sexual hombres 50 a 59 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.7",
										name: "<b>VFM42</b> Hombre 60 y más NS pareja",
										data: {
											"desc": "Violencia familiar no sexual hombres 60 y mas años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.8",
										name: "<b>VFM50</b> Hombre 20-49 S pareja",
										data: {
											"desc": "Violencia familiar sexual hombres 20 a 49 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.9",
										name: "<b>VFM51</b> Hombre 50-59 S pareja",
										data: {
											"desc": "Violencia familiar sexual hombres 50 a 59 años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.10",
										name: "<b>VFM52</b> Hombre 60 y más S pareja",
										data: {
											"desc": "Violencia familiar sexual hombres 60 y mas años. Conyuge/novio/pareja",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.11",
										name: "<b>VFM57</b> Hombre 20-49 NS hijo",
										data: {
											"desc": "Violencia familiar no sexual hombres 20 a 49 años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.12",
										name: "<b>VFM58</b> Hombre 50-59 NS hijo",
										data: {
											"desc": "Violencia familiar no sexual hombres 50 a 59 años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.13",
										name: "<b>VFM59</b> Hombre 60 y más NS hijo",
										data: {
											"desc": "Violencia familiar no sexual hombres 60 y más años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.14",
										name: "<b>VFM64</b> Hombre 20-49 S hijo",
										data: {
											"desc": "Violencia familiar sexual hombres 20 a 49 años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.15",
										name: "<b>VFM65</b> Hombre 50-59 S hijo",
										data: {
											"desc": "Violencia familiar sexual hombres 50 a 59 años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.16",
										name: "<b>VFM66</b> Hombre 60 y más S hijo",
										data: {
											"desc": "Violencia familiar sexual hombres 60 y mas años. Hijo",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.17",
										name: "<b>VFM76</b> Hombre 20-49 NS otro",
										data: {
											"desc": "Violencia familiar no sexual hombres 20 a 49 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.18",
										name: "<b>VFM77</b> Hombre 50-59 NS otro",
										data: {
											"desc": "Violencia familiar no sexual hombres 50 a 59 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.19",
										name: "<b>VFM78</b> Hombre 60 y más NS otro",
										data: {
											"desc": "Violencia familiar no sexual hombres 60 y mas años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.20",
										name: "<b>VFM88</b> Hombre 20-49 S otro",
										data: {
											"desc": "Violencia familiar sexual hombres 20 a 49 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.21",
										name: "<b>VFM89</b> Hombre 50-59 S otro",
										data: {
											"desc": "Violencia familiar sexual hombres 50 a 59 años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.22",
										name: "<b>VFM90</b> Hombre 60 y más S otro",
										data: {
											"desc": "Violencia familiar sexual hombres 60 y más años. Otro pariente",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.23",
										name: "<b>VFV10</b> Hombre 20-49 NS",
										data: {
											"desc": "Violencia no familiar no sexual hombres 20 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.24",
										name: "<b>VFV11</b> Hombre 50-59 NS",
										data: {
											"desc": "Violencia no familiar no sexual hombres 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.25",
										name: "<b>VFV12</b> Hombre 60 y más NS",
										data: {
											"desc": "Violencia no familiar no sexual hombres 60 y mas años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.26",
										name: "<b>VFV22</b> Hombre 20-49 S",
										data: {
											"desc": "Violencia no familiar sexual hombres 20 a 49 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.27",
										name: "<b>VFV23</b> Hombre 50-59 S",
										data: {
											"desc": "Violencia no familiar sexual hombres 50 a 59 años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									},
									{
										id: "node1.15.2.2.28",
										name: "<b>VFV24</b> Hombre 60 y más S",
										data: {
											"desc": "Violencia no familiar sexual hombres 60 y más años",
											"$width": ancho_med,
											"$height": alto_med
										},
										children: []
									}
								]
							}
						]
					},
					{
						id: "node1.15.3",
						name: "<b>DRS01</b> Intrafamiliar",
						data: {
							"desc": "Detección de factores de violencia intrafamiliar",
							"$width": ancho_min,
							"$height": alto_min
						},
						children: []
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
