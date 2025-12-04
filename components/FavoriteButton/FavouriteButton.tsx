"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavoriteButton() {
  const [isActive, setIsActive] = useState(false);

  return (
    <Link
      href="/favorites"
      aria-label="Favorites"
      title="Favorites"
      onClick={() => setIsActive(!isActive)}
      className={`
        flex items-center justify-center rounded-full
        w-10 h-10
        bg-[rgba(255,137,179,0.25)] border border-(--button)
        shadow-[0_4px_20px_rgba(255,137,179,0.5),0_0_20px_rgba(255,137,179,0.5)_inset]
        backdrop-blur-md
        transition-all duration-200 ease-in-out
        hover:scale-110 hover:bg-[rgba(255,137,179,0.2)] 
        hover:shadow-[0_8px_28px_rgba(255,137,179,0.5),0_0_25px_rgba(255,137,179,0.5)_inset]
        md:w-12 md:h-12
        xl:w-12 xl:h-12
        ${
          isActive
            ? "bg-linear-to-b from-[rgba(255,137,179,0.42)] to-[rgba(255,137,179,0.32)] border-[rgba(255,137,179,0.7)] shadow-[0_10px_30px_rgba(255,137,179,0.18)]"
            : ""
        }
      `}
    >
      <Heart
        className={`
          w-6 h-6 stroke-(--button) drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]
          floatPulse
          hover:scale-110
          active:beat
          md:w-6 md:h-6
          xl:w-7 xl:h-7
        `}
      />
    </Link>
  );
}
