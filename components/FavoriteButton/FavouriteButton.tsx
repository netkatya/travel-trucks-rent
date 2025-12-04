import React, { useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavoriteButton() {
  const [isActive, setIsActive] = useState(false);

  return (
    <Link
      href="/favorites"
      aria-label="Вибране"
      title="Вибране"
      onClick={() => setIsActive(!isActive)}
      className={`
        fixed flex items-center justify-center rounded-full top-[90px] right-5
        z-999 w-10 h-10
        bg-pink/25 border border-pink-border shadow-[0_4px_20px_rgba(255,137,179,0.5),0_0_20px_rgba(255,137,179,0.5)_inset]
        backdrop-blur-md
        cursor-pointer transition-colors duration-200 ease-in-out
        hover:-translate-y-0.5 hover:scale-110 hover:bg-pink/20 hover:shadow-[0_8px_28px_rgba(255,137,179,0.5),0_0_25px_rgba(255,137,179,0.5)_inset]
        ${
          isActive
            ? "bg-linear-to-b from-pink/40 to-pink/30 border-pink/70 shadow-[0_10px_30px_rgba(255,137,179,0.18)]"
            : ""
        }
        md:w-12 md:h-12
        xl:w-12 xl:h-12
      `}
    >
      <Heart
        className={`
          w-6 h-6 stroke-pink drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]
          floatPulse
          hover:scale-125
          active:beat
          md:w-6 md:h-6
          xl:w-7 xl:h-7
        `}
      />
    </Link>
  );
}
