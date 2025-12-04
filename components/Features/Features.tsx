import { icons } from "@/app/constants/icons";
import { Camper } from "@/types/camper";

type FeaturesProps = {
  camper: Camper;
};

export default function Features({ camper }: FeaturesProps) {
  if (!camper) return null;

  const camperDetails: Record<string, string> = {
    Form: camper.form,
    Length: camper.length,
    Width: camper.width,
    Height: camper.height,
    Tank: camper.tank,
    Consumption: camper.consumption,
  };

  return (
    <div className="w-full lg:w-[631px] lg:h-[588px] p-6 lg:px-[52px] lg:py-11 bg-(--inputs) rounded-[10px]">
      <div className="flex flex-wrap gap-2 mb-[90px] lg:max-h-[104px] overflow-hidden">
        <div className="rounded-[100px] px-[18px] py-3 max-w-[143px] h-12 bg-(--badges) mix-blend-multiply flex gap-2 items-center capitalize">
          <svg className="h-5 w-5">
            <use href="/icons.svg#icon-diagram"></use>
          </svg>
          {camper.transmission}
        </div>
        <div className="rounded-[100px] px-[18px] py-3 max-w-[143px] h-12 bg-(--badges) mix-blend-multiply flex gap-2 items-center capitalize">
          <svg className="h-5 w-5">
            <use href="/icons.svg#icon-fuel-pump"></use>
          </svg>
          {camper.engine}
        </div>

        <div className="flex flex-wrap gap-2 ">
          {Object.entries(camper)
            .filter(
              ([key, value]) =>
                Object.keys(icons).includes(key) && value === true
            )
            .map(([key]) => {
              const iconKey = key as keyof typeof icons;
              return (
                <div
                  key={key}
                  className="rounded-[100px] px-[18px] py-3 max-w-[143px] h-12 bg-(--badges) mix-blend-multiply flex gap-2 items-center"
                >
                  <svg className="w-4 h-4 stroke-(--main) fill-(--badges)">
                    <use href={`/icons.svg#${icons[iconKey]}`} />
                  </svg>
                  <span className="capitalize">{key}</span>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-[20px] leading-[1.2]">
          Vehicle details
        </h3>
        <div className="lg:w-[527px] h-px bg-(--gray-light) mt-8 mb-8"></div>
        <div className="space-y-4">
          {Object.entries(camperDetails).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="capitalize font-medium text-[16px] leading-normal text-cente">
                {key}
              </span>
              <span className="capitalize font-medium text-[16px] leading-normal text-cente">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
