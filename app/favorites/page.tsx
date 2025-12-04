"use client";

import { useEffect } from "react";
import { useCampersStore } from "@/lib/store/useCampersStore";
import Link from "next/link";
import Image from "next/image";

export default function FavoritesPage() {
  const { campers, favorites, toggleFavorite, fetchCampers, loading } =
    useCampersStore();

  useEffect(() => {
    if (campers.length === 0) {
      fetchCampers();
    }
  }, [campers.length, fetchCampers]);

  const favoriteCampers = campers.filter((camper) =>
    favorites.includes(camper.id)
  );

  if (loading) {
    return <p className="text-center mt-10">Loading campers...</p>;
  }

  return (
    <main className="py-10 min-h-screen bg-(--white)">
      <div className="container">
        <h1 className="font-semibold text-3xl mb-10 text-(--main)">
          Favorites
        </h1>

        {favoriteCampers.length === 0 ? (
          <p className="text-(--gray) text-base">
            You haven’t added any campers to favorites yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteCampers.map((camper, index) => (
              <div
                key={`${camper.id}-${index}`}
                className="bg-(--inputs) rounded-[10px] shadow-md overflow-hidden relative"
              >
                <Link href={`/catalog/${camper.id}`} className="block">
                  <Image
                    src={camper.gallery[0]?.thumb || "/img/placeholder.png"}
                    alt={camper.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="p-4 flex flex-col gap-2">
                  <h2 className="font-medium text-lg text-(--main) max-h-7 overflow-hidden">
                    {camper.name}
                  </h2>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-(--gray)">{camper.location}</p>
                    <button
                      className="p-2 rounded"
                      onClick={() => toggleFavorite(camper.id)}
                      aria-label="Toggle favorite"
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
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
