"use client";

import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { companies } from "@/app/types/seed/companise";

export default function BarChart() {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    // xy 차트 생성
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 1,
      })
    );

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // X축
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });
    xRenderer.labels.template.setAll({
      centerY: am5.p50,
      centerX: am5.p50,
      paddingRight: 15,
    });
    xRenderer.grid.template.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "country",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Y축
    const yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1,
    });
    yRenderer.grid.template.set("visible", false);
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
      })
    );

    // 막대 그래프 생성
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "country",
        tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });

    series.columns.template.adapters.add("fill", (fill, target) => {
      return chart.get("colors")?.getIndex(series.columns.indexOf(target));
    });

    // companies 바로 사용
    const seriesData = companies.map((company) => ({
      country: company.country,
      value: company.emissions.reduce((acc, e) => acc + e.emissions, 0),
    }));

    // 데이터 적용
    xAxis.data.setAll(seriesData);
    series.data.setAll(seriesData);

    // 차트 애니메이션
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, []);

  return <div ref={chartRef} className="h-full" />;
}
