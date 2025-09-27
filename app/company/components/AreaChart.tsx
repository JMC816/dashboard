"use client";

import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface Emission {
  yearMonth: string;
  source: string;
  emissions: number;
}

interface Company {
  id: string;
  name: string;
  country: string;
  emissions: Emission[];
}

interface AreaChartProps {
  company: Company; // 한 회사/국가 객체를 prop으로 받음
}

export default function AreaChart({ company }: AreaChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || !company.emissions.length) return;

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
      })
    );

    // 색 적용
    chart.set(
      "colors",
      am5.ColorSet.new(root, {
        step: 2,
        colors: [
          am5.color(0x1f77b4),
          am5.color(0x2ca02c),
          am5.color(0x17becf),
          am5.color(0x005f99),
        ],
      })
    );

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // x축
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "yearMonth",
        renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    xAxis.data.setAll(company.emissions);

    // y축
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: company.name,
        xAxis,
        yAxis,
        valueYField: "emissions",
        categoryXField: "yearMonth",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "[bold]{name}[/]\n{categoryX}: {valueY}",
        }),
      })
    );

    series.strokes.template.setAll({ strokeWidth: 3, strokeOpacity: 1 });
    series.fills.template.setAll({ fillOpacity: 0.8, visible: true });

    // 데이터 적용
    series.data.setAll(company.emissions);

    // 애니메이션
    series.appear(1000);

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, { orientation: "horizontal" })
    );

    chart.appear(1000, 100);

    return () => root.dispose();
  }, [company]);

  return <div ref={chartRef} className="h-[300px] w-full" />;
}
