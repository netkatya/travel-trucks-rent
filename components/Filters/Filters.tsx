"use client";

import React, { useState } from "react";
import { useCampersStore } from "@/lib/store/useCampersStore";
import { EquipmentKey } from "@/types/camper";
import { CamperForm } from "@/types/filters";
import { Map } from "lucide-react";
import { icons } from "@/app/constants/icons";

export const Filters: React.FC = () => {
  const { filters, setFilters } = useCampersStore();
  const [location, setLocation] = useState(filters.location || "");
  const [focused, setFocused] = useState(false);
  const [form, setForm] = useState<CamperForm | "">(filters.form || "");
  const [equipment, setEquipment] = useState<EquipmentKey[]>(
    filters.equipment || []
  );

  const handleApply = () => {
    setFilters({
      location: location || undefined,
      form: form || undefined,
      equipment: equipment.length ? equipment : undefined,
    });
  };

  const toggleEquipment = (key: EquipmentKey) => {
    if (equipment.includes(key)) {
      setEquipment(equipment.filter((e) => e !== key));
    } else {
      setEquipment([...equipment, key]);
    }
  };

  return (
    <div className="w-[360px]">
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

      <div>
        <p className="font-medium text-base leading-[150%] text-(--text) mb-8">
          Filters
        </p>
        <p className="font-semibold text-[20px] leading-[120%]">
          Vehicle equipment
        </p>
        <div className="w-[360px] h-px bg-(--gray-light) my-6"></div>
        <div className="flex flex-wrap gap-3 mb-8">
          {(
            ["AC", "automatic", "kitchen", "TV", "bathroom"] as EquipmentKey[]
          ).map((key) => (
            <label key={key} className="relative">
              <input
                type="checkbox"
                checked={equipment.includes(key)}
                onChange={() => toggleEquipment(key)}
                className="peer hidden"
              />
              <div
                className="border border-(--gray-light) rounded-xl w-28 h-24 flex flex-col items-center justify-center text-center
                     peer-checked:border-(--button) 
                     transition-colors cursor-pointer mix-blend-multiply capitalize"
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
        </div>
        <div>
          <label className="font-semibold text-[20px] leading-[120%]">
            Vehicle type
          </label>
          <div className="w-[360px] h-px bg-(--gray-light) my-6"></div>
          <div className="flex gap-3 mb-10">
            {[
              { label: "Van", value: "Van" },
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

      <button
        onClick={handleApply}
        className="rounded-full w-[166px] h-14 
               bg-(--button) hover:bg-(--button-hover) font-medium text-base leading-[150%] 
               tracking-[-0.01em] text-(--white) transition-colors duration-300"
      >
        Apply Filters
      </button>
    </div>
  );
};
