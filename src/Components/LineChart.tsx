import React, { useEffect, useRef } from 'react';

import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';

/* Chart code */
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element

const LineChartExample: React.FC = () => {
    const root = useRef<am5.Root | null>(null);
    
    useEffect(() => {
    if (!root.current) {
    root.current = am5.Root.new('chartdiv');
    
    const myTheme = am5.Theme.new(root.current);

    myTheme.rule('AxisLabel', ['minor']).setAll({
      dy: 1,
    });

    myTheme.rule('Grid', ['x']).setAll({
      strokeOpacity: 0.05,
    });

    myTheme.rule('Grid', ['x', 'minor']).setAll({
      strokeOpacity: 0.05,
    });

    // Set themes
    root.current.setThemes([am5themes_Animated.new(root.current), myTheme]);

    // Create chart
    const chart = root.current.container.children.push(
      am5xy.XYChart.new(root.current, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        maxTooltipDistance: 0,
        pinchZoomX: true,
      })
    );

    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round(Math.random() * 10 - 4.2 + value);
      am5.time.add(date, 'day', 1);
      return {
        date: date.getTime(),
        value: value,
      };
    }

    function generateDatas(count: number) {
      let data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      console.log('Series have been generated');
      return data;
    }

    // Create axes
    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root.current, {
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: 'day',
        count: 1,
      },
      renderer: am5xy.AxisRendererX.new(root.current, {
        minorGridEnabled: true,
      }),
      tooltip: am5.Tooltip.new(root.current, {}),
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root.current, {
      renderer: am5xy.AxisRendererY.new(root.current, {}),
    }));

    // Add series
    for (let i = 0; i < 10; i++) {
      const series = chart.series.push(am5xy.LineSeries.new(root.current, {
        name: 'Series ' + i,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        legendValueText: '{valueY}',
        tooltip: am5.Tooltip.new(root.current, {
          pointerOrientation: 'horizontal',
          labelText: '{valueY}',
        }),
      }));

      date = new Date();
      date.setHours(0, 0, 0, 0);
      value = 0;

      const data = generateDatas(100);
      series.data.setAll(data);
      console.log("random generated data", data)

      // Make stuff animate on load
      series.appear();
    }

    // Add cursor
    const cursor = chart.set('cursor', am5xy.XYCursor.new(root.current, {
      behavior: 'none',
    }));
    cursor.lineY.set('visible', false);

    // Add scrollbar
    chart.set('scrollbarX', am5.Scrollbar.new(root.current, {
      orientation: 'horizontal',
    }));

    chart.set('scrollbarY', am5.Scrollbar.new(root.current, {
      orientation: 'vertical',
    }));

    // Add legend
    const legend = chart.rightAxesContainer.children.push(am5.Legend.new(root.current, {
      width: 200,
      paddingLeft: 15,
      height: am5.percent(100),
    }));

    // When legend item container is hovered, dim all the series except the hovered one
    legend.itemContainers.template.events.on('pointerover', function (e: any) {
      const itemContainer = e.target;

      // As series list is data of a legend, dataContext is series
      if (itemContainer && itemContainer.dataItem) {
        const series = itemContainer.dataItem.dataContext;

        chart.series.each(function (chartSeries: any) {
          if (chartSeries != series) {
            chartSeries.strokes.template.setAll({
              strokeOpacity: 0.15,
              stroke: am5.color(0x000000),
            });
          } else {
            chartSeries.strokes.template.setAll({
              strokeWidth: 3,
            });
          }
        });
      }
    });

    // When legend item container is unhovered, make all series as they are
    legend.itemContainers.template.events.on('pointerout', function (e: any) {
      const itemContainer = e.target;
      if (itemContainer && itemContainer.dataItem) {
        const series = itemContainer.dataItem.dataContext;

        chart.series.each(function (chartSeries: any) {
          chartSeries.strokes.template.setAll({
            strokeOpacity: 1,
            strokeWidth: 1,
            stroke: chartSeries.get('fill'),
          });
        });
      }
    });

    legend.itemContainers.template.set('width', am5.p100);
    legend.valueLabels.template.setAll({
      width: am5.p100,
      textAlign: 'right',
    });

    // It's important to set legend data after all the events are set on the template, otherwise, events won't be copied
    legend.data.setAll(chart.series.values);

    // Make stuff animate on load
    chart.appear(1000, 100);
    }
    return () => {
        console.log('Chart component unmounted');
  
        if (root.current) {
          root.current.dispose();
          root.current = null;
          console.log('AmCharts root disposed');
        };
    };
  }, []);

  return <div id="chartdiv" />;
};

export default LineChartExample;