    var dom = document.getElementById('share_dataset');
    var myChartR = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    
    var option;

    setTimeout(function () {
  option = {
    // baseOption: {
        toolbox: {
                show: true,
                orient: 'vertical',
                left: '15',
                top: '50',
                feature: {
                  dataZoom: {
                    yAxisIndex: "none",
                    title: { zoom: 'Expandir', back: 'Atrás'}
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
                  }
                }
              },
    // },
    legend: {},
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    color: ['#b0aacc', '#8277af', '#54278e', '#673f9a', '#9999CC', '#7d5ba9', '#c3b4d8', '#663399', '#9966CC', '#dcd2e8'],
    dataset: {
      source: [

// 92, 93, 93, 93, 92, 92, 93, 86, 69, 64, 65, 66, 70, 72, 73, 76, 76

        // ['product', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
        ['product', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
        ['Hospitales Generales con Servicio de Psiquiatría', 18.3, 17.9, 16.3, 15.8, 15.4, 15.2, 13.9, 12.6, 8.7, 6.9, 6.7, 6.5, 5.7, 5.5, 5.1, 4.4, 4.3],
        ['Hospitales Psiquiátricos', 12.2, 11.2, 10.8, 10.2, 9.8, 8.8, 7.3, 6.4, 4.3, 3.5, 3.1, 2.9, 2.5, 2.3, 2.1, 2.0, 2.0],
        ['Unidades Ambulatorias con Servicios de Salud Mental ', 62.0, 63.5, 66.1, 66.8, 67.1, 68.3, 72.1, 67.4, 56.3, 53.8, 55.3, 56.3, 61.5, 63.8, 65.9, 69.3, 69.3]
        //['Faltante', 7.5, 7.4, 6.8, 7.2, 7.7, 7.7, 6.7, 13.6, 30.7, 35.8, 34.9, 34.3, 30.3, 28.4, 26.9, 24.3, 24.4]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      /*{
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },*/
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        encode: {
          itemName: 'product',
          value: '2012',
          tooltip: '2012'
        }
      }
    ]
  };
  myChartR.on('updateAxisPointer', function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      myChartR.setOption({
        series: {
          id: 'pie',
          label: {
            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      });
    }
  });
  myChartR.setOption(option);
});

    if (option && typeof option === 'object') {
      myChartR.setOption(option);
    }

    window.addEventListener('resize', myChartR.resize);
