"use client";

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { companies } from "@/app/types/seed/companise";
import { useEffect } from "react";

export default function MapChart() {
  useEffect(() => {
    const root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    // 지도 차트 생성
    const chart = root.container.children.push(am5map.MapChart.new(root, {}));

    chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    // 국가별 월별 배출량 합계 계산
    const data = companies.map((c) => ({
      id: c.country,
      name: c.name,
      value: c.emissions.reduce((acc, e) => acc + e.emissions, 0),
    }));

    const bubbleSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        valueField: "value",
        calculateAggregates: true,
        polygonIdField: "id",
      })
    );

    const circleTemplate = am5.Template.new({});

    // 버블 생성
    bubbleSeries.bullets.push((root) => {
      const container = am5.Container.new(root, {});
      const circle = container.children.push(
        am5.Circle.new(root, {
          radius: 20,
          fillOpacity: 0.7,
          fill: am5.color(0xff0000),
          cursorOverStyle: "pointer",
          tooltipText: "{name}: [bold]{value}[/]",
        })
      );

      const countryLabel = container.children.push(
        am5.Label.new(root, {
          text: "{name}",
          paddingLeft: 5,
          populateText: true,
          fontWeight: "bold",
          fontSize: 13,
          centerY: am5.p50,
        })
      );

      circle.on("radius", (radius) => {
        countryLabel.set("x", radius);
      });

      return am5.Bullet.new(root, {
        sprite: container,
        dynamic: true,
      });
    });

    bubbleSeries.bullets.push((root) => {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          text: "{value.formatNumber('#.')}",
          fill: am5.color(0xffffff),
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p50,
          textAlign: "center",
        }),
        dynamic: true,
      });
    });

    // 버블 크기 비율
    bubbleSeries.set("heatRules", [
      {
        target: circleTemplate,
        dataField: "value",
        min: 5,
        max: 25,
        minValue: 0,
        maxValue: Math.max(...data.map((d) => d.value)),
        key: "radius",
      },
    ]);

    // 데이터 적용
    bubbleSeries.data.setAll(data);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" className="w-full h-[400px]" />;
}
