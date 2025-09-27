"use client";

import { useState, useEffect } from "react";
import AreanChart from "./components/AreaChart";
import BarChart from "./components/BarChart";
import MapChart from "./components/MapChart";
import { TotalEmission } from "./components/TotalEmission";
import { fetchCompanies } from "../lib/api";
import { Company } from "../types/companies";
import loading from "../public/images/loading.png";
import Image from "next/image";

export default function DashboardClient() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetchCompanies().then((data) => setCompanies(data));
  }, []);

  if (!companies.length)
    return (
      <div className="w-full h-full flex justify-center items-center animate-spin">
        <Image src={loading} width={50} height={50} alt="loading" />
      </div>
    );

  const data = companies.map((item) => {
    const sum = item.emissions.reduce(
      (acc, emission) => acc + emission.emissions,
      0
    );
    return {
      country: item.country,
      value: sum, // 각 나라별 배출량 총 합계
      valueArray: item.emissions.map((item) => item.emissions), // 월별 배출량
    };
  });

  return (
    <div className=" flex flex-col gap-5 p-5 w-full">
      <div className="w-full h-20 bg-white rounded-2xl flex justify-center items-center text-2xl font-bold text-blue">
        Dashboard
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
          <BarChart data={data} />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-[70%] p-5 bg-white rounded-3xl">
          <span className="text-xl">Monthly emissions by country</span>
          <AreanChart companies={companies} />
        </div>
        <div className="w-[30%] p-5 bg-white rounded-3xl">
          <span className="text-xl">Global emissions</span>
          <MapChart companies={companies} />
        </div>
      </div>
    </div>
  );
}
