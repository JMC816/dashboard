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

interface BarChartProps {
  company: Company;
}

export default function BarChart({ company }: BarChartProps) {
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
        paddingLeft: 0,
        paddingRight: 1,
      })
    );

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // x축
    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({ centerY: am5.p50, centerX: am5.p50 });
    xRenderer.grid.template.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "yearMonth",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // y축
    const yRenderer = am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 });
    yRenderer.grid.template.set("visible", false);
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, { renderer: yRenderer })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: `${company.name} emissions`,
        xAxis,
        yAxis,
        valueYField: "emissions",
        categoryXField: "yearMonth",
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

    // 데이터 적용
    xAxis.data.setAll(company.emissions);
    series.data.setAll(company.emissions);

    // 애니메이션
    series.appear(1000);
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [company]);

  return <div ref={chartRef} className="h-[300px] w-full" />;
}
