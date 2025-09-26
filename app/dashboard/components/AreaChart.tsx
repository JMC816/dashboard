"use client";

import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { companies } from "@/app/types/seed/companise";

interface Row {
  month: string;
  [country: string]: string | number;
}

export default function AreaChart() {
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
      })
    );

    // 색상 세트
    chart.set(
      "colors",
      am5.ColorSet.new(root, {
        step: 2,
        colors: [
          am5.color(0x1f77b4),
          am5.color(0x2ca02c),
          am5.color(0x17becf),
          am5.color(0x005f99),
          am5.color(0x3399ff),
          am5.color(0x66ccff),
          am5.color(0x99ccff),
        ],
      })
    );

    // Cursor
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);

    // 데이터 생성
    const allMonths = Array.from(
      new Set(companies.flatMap((c) => c.emissions.map((e) => e.yearMonth)))
    ).sort();

    const data = allMonths.map((month) => {
      const row: Row = { month };
      companies.forEach((c) => {
        const emission = c.emissions.find((e) => e.yearMonth === month);
        row[c.country] = emission ? emission.emissions : 0;
      });
      return row;
    });

    // x축
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 70,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    xAxis.data.setAll(data);

    // y축
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    function createSeries(name: string, field: string) {
      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueYField: field,
          categoryXField: "month",
          stacked: true,
          stroke: am5.color(0xffffff),
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}",
          }),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: 3,
        strokeOpacity: 1,
      });

      series.fills.template.setAll({
        fillOpacity: 0.8,
        visible: true,
      });

      series.data.setAll(data);
      series.appear(1000);
    }

    // 국가별 시리즈 생성
    companies.forEach((c) => createSeries(c.country, c.country));

    // 스크롤바
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    // 애니메이션
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} className="h-[400px] w-full" />;
}
