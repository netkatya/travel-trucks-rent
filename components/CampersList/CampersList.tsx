"use client";
import React, { useEffect } from "react";

import Image from "next/image";
import { useCampersStore } from "@/lib/store/useCampersStore";
import Link from "next/link";
import { Map } from "lucide-react";
import { icons } from "@/app/constants/icons";

export const CampersList: React.FC = () => {
  const {
    campers,
    fetchCampers,
    loadMore,
    hasMore,
    loading,
    toggleFavorite,
    favorites,
  } = useCampersStore();

  useEffect(() => {
    fetchCampers();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {campers.map((camper) => (
        <div
          key={camper.id}
          className="border border-(--gray-light) rounded-[20px] p-6 w-[888px] h-[368px] flex gap-3"
        >
          <Image
            src={camper.gallery[0]?.thumb || "/placeholder.jpg"}
            alt={camper.name}
            width={292}
            height={320}
            className="rounded-[10px] w-[292px] h-80 object-cover"
          />
          <div className="">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-[24px] leading-[133%]">
                {camper.name}
              </h2>
              <div className="flex gap-4 items-center">
                <p className="font-semibold text-[24px] leading-[133%]">
                  ${camper.price.toFixed(2)}
                </p>
                <button
                  className="p-2 rounded"
                  onClick={() => toggleFavorite(camper.id)}
                >
                  <svg
                    className={`w-[25px] h-6 transition-colors duration-300 ${
                      favorites.includes(camper.id)
                        ? "text-(--button)"
                        : "text-(--main)"
                    }`}
                  >
                    <use href="/icons.svg#icon-heart" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <svg className="w-4 h-4 fill-(--rating) mr-1 ">
                <use href="/icons.svg#icon-star"></use>
              </svg>
              <p className="font-normal text-[16px] leading-[150%] underline decoration-skip-none">
                {camper.rating}
              </p>
              <p className="font-normal text-[16px] leading-[150%] underline decoration-skip-none mr-4">
                ({camper.reviews.length}{" "}
                {camper.reviews.length === 1 ? "review" : "reviews"})
              </p>
              <div className="flex gap-1 items-center">
                <Map size={16} stroke="#101828" className="w-4 h-4" />
                <p className="font-normal text-[16px] leading-[150%]">
                  {camper.location}
                </p>
              </div>
            </div>

            <p className="font-normal text-[16px] leading-[150%] text-(--text) max-h-6 max-w-[520px] truncate mb-6">
              {camper.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6 max-h-[104px] overflow-hidden">
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

              <div className="flex flex-wrap gap-2">
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

            <Link
              href={`/catalog/${camper.id}`}
              className="rounded-[200px] w-[166px] h-14 bg-(--button) text-(--white) font-medium text-[16px] leading-[150%] tracking-[-0.01em] flex items-center justify-center"
            >
              Show More
            </Link>
          </div>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {hasMore && !loading && (
        <button
          className="border border-(--gray-light) 
  rounded-[200px]  
  w-[145px] h-14
  flex items-center justify-center
  cursor-pointer font-medium text-base leading-normal tracking-[-0.01em]"
          onClick={loadMore}
        >
          Load More
        </button>
      )}
      {!hasMore && campers.length > 0 && <p>No more campers to load.</p>}
    </div>
  );
};
