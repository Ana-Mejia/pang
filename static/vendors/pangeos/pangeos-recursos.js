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

        // ['product', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
        ['product', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
        ['Hospitales Generales con Servicio de Psiquiatría', 76, 77, 75, 80, 81, 83, 85, 85, 84, 83, 85, 86, 88, 89, 90, 85, 84],
        ['Hospitales Psiquiátricos', 21,20,23,18,17,14,13,12,10,10,9,8,7,7,6,9,9],
        ['Unidades Ambulatorias', 2, 3, 2, 2, 3, 3, 2, 4, 6, 8, 6, 5, 5, 4, 4, 6, 6]
        // ['Total', 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
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
