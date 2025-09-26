"use client";

import { companies } from "../types/seed/companise";
import AreanChart from "./components/AreaChart";
import BarChart from "./components/BarChart";
import MapChart from "./components/MapChart";
import { TotalEmission } from "./components/TotalEmission";
import { usePathname } from "next/navigation";

export default function DashboardClient() {
  const pathname = usePathname();

  const data = companies.map((item) => {
    const sum = item.emissions.reduce(
      (acc, emission) => acc + emission.emissions,
      0
    );
    return {
      country: item.country,
      // 각 나라별 배출량 총 합계
      value: sum,
      // 각 나라별 월별 배출량
      valueArray: item.emissions.map((item) => item.emissions),
    };
  });

  return (
    <div className=" flex flex-col gap-5 p-5 w-full">
      <div className="w-full h-20 bg-white rounded-2xl flex justify-center items-center text-2xl font-bold text-blue">
        {pathname === "/" ? "Dashbord" : pathname}
      </div>
      <div className="flex  gap-5  w-full">
        <div className="w-[50%] h-[200px] rounded-2xl flex gap-5">
          {data.map(({ country, value, valueArray }, idx) => (
            <TotalEmission
              key={idx}
              country={country}
              value={value}
              valueArray={valueArray}
            />
          ))}
        </div>
        <div className="w-[50%] h-[200px] p-5  pr-10 bg-white rounded-3xl">
          <span className="text-xl">Total emissions by country</span>
          <BarChart />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-[70%] p-5 bg-white rounded-3xl">
          <span className="text-xl">Monthly emissions by country</span>
          <AreanChart />
        </div>
        <div className="w-[30%] p-5 bg-white rounded-3xl">
          <span className="text-xl">Global emissions</span>
          <MapChart />
        </div>
      </div>
    </div>
  );
}
