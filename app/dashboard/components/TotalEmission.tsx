import { TotoalEmission } from "../../types/totalEmission";
import upArrow from "../../public/images/upArrow.png";
import downArrow from "../../public/images/downArrow.png";
import Image from "next/image";

export const TotalEmission = ({
  country,
  value,
  valueArray,
}: TotoalEmission) => {
  // 최근 배출량
  const lastValue = valueArray[valueArray.length - 1];
  // 최근 바로 이전 배출량
  const prevLastValue = Number(valueArray[valueArray.length - 2]);
  // 백분율
  const percentage = ((lastValue - prevLastValue) / prevLastValue) * 100;
  return (
    <div className="w-[50%] h-full bg-white rounded-3xl p-10 flex items-center justify-center">
      <div className="flex flex-col">
        <span className="text-xl ">Total</span>
        <div className="flex items-end gap-10">
          <span className="mt-5 text-xl">
            {country} | <span className="font-semibold text-blue">{value}</span>
          </span>
          <div>
            {percentage > 0 ? (
              <div className="flex gap-2">
                {percentage.toFixed(2)}
                <Image height={25} width={24} src={upArrow} alt="up" />
              </div>
            ) : (
              <div className="flex gap-2">
                {percentage.toFixed(2)}
                <Image height={25} width={24} src={downArrow} alt="down" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
