"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FavoriteButton from "../FavoriteButton/FavouriteButton";
import MobileMenu from "../MobileMenu/MobileMenu";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-(--inputs) border-b border-(--badges) h-[72px] flex items-center fixed top-0 left-0 z-99 w-full">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <svg width={136} height={16}>
              <use href="/icons.svg#icon-Logo"></use>
            </svg>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden lg:flex gap-8">
            <li>
              <Link
                href="/"
                className={`font-medium text-base transition ${
                  pathname === "/"
                    ? "text-(--button-hover)"
                    : "text-(--main) hover:text-(--button-hover)"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className={`font-medium text-base transition ${
                  pathname === "/catalog"
                    ? "text-(--button-hover)"
                    : "text-(--main) hover:text-(--button-hover)"
                }`}
              >
                Catalog
              </Link>
            </li>
          </ul>

          {/* Desktop favorites */}
          <div className="hidden lg:block">
            <FavoriteButton />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
