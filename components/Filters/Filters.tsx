"use client";

import { useState } from "react";
import { useCampersStore } from "@/lib/store/useCampersStore";
import { CamperForm } from "@/types/filters";
import { Map } from "lucide-react";
import { icons } from "@/app/constants/icons";

export default function Filters() {
  const { filters, setFilters } = useCampersStore();
  const [location, setLocation] = useState(filters.location || "");
  const [focused, setFocused] = useState(false);
  const [form, setForm] = useState<CamperForm | "">(filters.form || "");
  const [equipment, setEquipment] = useState<
    ("AC" | "kitchen" | "TV" | "bathroom")[]
  >(filters.equipment || []);
  const [transmission, setTransmission] = useState<"" | "automatic">(
    filters.transmission === "automatic" ? "automatic" : ""
  );

  const handleApply = () => {
    setFilters({
      location: location || undefined,
      form: form || undefined,
      equipment: equipment.length ? equipment : undefined,
      transmission: transmission || undefined,
    });
  };

  const toggleEquipment = (key: "AC" | "kitchen" | "TV" | "bathroom") => {
    if (equipment.includes(key)) {
      setEquipment(equipment.filter((e) => e !== key));
    } else {
      setEquipment([...equipment, key]);
    }
  };

  const toggleTransmission = () => {
    setTransmission(transmission === "automatic" ? "" : "automatic");
  };

  return (
    <div className="w-[360px]">
      {/* Location */}
      <div className="relative w-[360px] mb-10">
        <label className="font-normal text-base leading-normal text-(--gray)">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="rounded-xl py-[18px] pl-10 w-full h-14 bg-(--inputs) font-normal text-base leading-normal text-(--main) focus:outline-none mt-2"
          placeholder="City"
        />
        <Map
          width={20}
          height={20}
          className={`absolute top-[50px] left-4 ${
            focused ? "text-black" : "text-gray-400"
          }`}
        />
      </div>

      {/* Filters */}
      <div>
        <p className="font-medium text-base leading-[150%] text-(--text) mb-8">
          Filters
        </p>

        {/* Vehicle equipment */}
        <p className="font-semibold text-[20px] leading-[120%]">
          Vehicle equipment
        </p>
        <div className="w-[360px] h-px bg-(--gray-light) my-6"></div>
        <div className="flex flex-wrap gap-3 mb-8">
          {(["AC", "kitchen", "TV", "bathroom"] as const).map((key) => (
            <label key={key} className="relative">
              <input
                type="checkbox"
                checked={equipment.includes(key)}
                onChange={() => toggleEquipment(key)}
                className="peer hidden"
              />
              <div
                className="border border-(--gray-light) rounded-xl w-28 h-24 flex flex-col items-center justify-center text-center
                  peer-checked:border-(--button) transition-colors cursor-pointer mix-blend-multiply capitalize"
              >
                {icons[key] && (
                  <svg className="w-6 h-6 mb-2 fill-(--main)">
                    <use href={`/icons.svg#${icons[key]}`} />
                  </svg>
                )}
                <span>{key}</span>
              </div>
            </label>
          ))}

          {/* Automatic transmission */}
          <label className="relative">
            <input
              type="checkbox"
              checked={transmission === "automatic"}
              onChange={toggleTransmission}
              className="peer hidden"
            />
            <div
              className="border border-(--gray-light) rounded-xl w-28 h-24 flex items-center justify-center text-center
                 peer-checked:border-(--button) cursor-pointer transition-colors capitalize"
            >
              Automatic
            </div>
          </label>
        </div>

        {/* Vehicle type */}
        <div>
          <label className="font-semibold text-[20px] leading-[120%]">
            Vehicle type
          </label>
          <div className="w-[360px] h-px bg-(--gray-light) my-6"></div>
          <div className="flex gap-3 mb-10">
            {[
              { label: "Van", value: "panelTruck" },
              { label: "Fully Integrated", value: "fullyIntegrated" },
              { label: "Alcove", value: "alcove" },
            ].map((option) => (
              <label key={option.value} className="relative">
                <input
                  type="radio"
                  name="vehicleType"
                  value={option.value}
                  checked={form === option.value}
                  onChange={(e) => setForm(e.target.value as CamperForm)}
                  className="peer hidden"
                />
                <div
                  className="border border-(--gray-light) rounded-xl w-28 h-24 flex items-center justify-center text-center
                    peer-checked:border-(--button) cursor-pointer transition-colors"
                >
                  {option.label}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Apply button */}
      <button
        onClick={handleApply}
        className="rounded-full w-[166px] h-14 bg-(--button) hover:bg-(--button-hover) font-medium text-base leading-[150%] tracking-[-0.01em] text-(--white) transition-colors duration-300"
      >
        Apply Filters
      </button>
    </div>
  );
}
