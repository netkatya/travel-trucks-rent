"use client";

import Link from "next/link";
import FavoriteButton from "../FavoriteButton/FavouriteButton";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Burger button */}
      <button
        className="lg:hidden flex flex-col gap-1"
        onClick={() => setOpen(true)}
      >
        <span className="w-6 h-0.5 bg-(--main)"></span>
        <span className="w-6 h-0.5 bg-(--main)"></span>
        <span className="w-6 h-0.5 bg-(--main)"></span>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-999"
          onClick={() => setOpen(false)}
        >
          {/* Menu */}
          <div
            className="absolute top-0 right-0 w-[260px] h-full bg-(--inputs) shadow-xl p-6 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="self-end text-2xl leading-none"
            >
              ×
            </button>

            <nav className="flex flex-col gap-4 text-lg">
              <Link
                href="/"
                className={
                  pathname === "/" ? "text-(--button-hover)" : "text-(--main)"
                }
                onClick={() => setOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/catalog"
                className={
                  pathname === "/catalog"
                    ? "text-(--button-hover)"
                    : "text-(--main)"
                }
                onClick={() => setOpen(false)}
              >
                Catalog
              </Link>

              <FavoriteButton />
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
