"use client";

import Loader from "@/app/loading";
import Features from "@/components/Features/Features";
import BookingForm from "@/components/Form/Form";
import Reviews from "@/components/Reviews/Reviews";
import { fetchCamper } from "@/lib/api/clientApi";
import { Camper } from "@/types/camper";
import { Map } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CamperPage() {
  const params = useParams();
  const { id } = params;
  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"features" | "reviews">(
    "features"
  );

  useEffect(() => {
    const rawId = params.id;
    const id = Array.isArray(rawId) ? rawId[0] : rawId;
    if (!id) return;

    const loadCamper = async () => {
      try {
        const data = await fetchCamper(id);
        setCamper(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCamper();
  }, [id]);

  if (loading) return <Loader />;

  if (!camper) return <p>Camper not found</p>;

  return (
    <main className="mt-12 mb-20">
      <div className="container">
        <div className="mb-15">
          <h2 className="font-semibold text-[24px] leading-[1.33] mb-2">
            {camper.name}
          </h2>
          <div className="flex items-center mb-4">
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
          <p className="font-semibold text-[24px] leading-[133%] mb-7">
            €{camper.price.toFixed(2)}
          </p>
          <div className="flex gap-12 mb-7">
            {camper.gallery.map((img, index) => (
              <Image
                width={292}
                height={312}
                key={index}
                src={img.thumb || "/placeholder.jpg"}
                alt={`${camper.name} ${index}`}
                className="w-fit h-[312px] object-cover overflow-hidden rounded-[10px]"
              />
            ))}
          </div>
          <p>{camper.description}</p>
        </div>
        <div className="flex gap-10 border-b border-(--gray-light) max-w-[1312px] mb-11">
          <button
            className={`font-semibold text-[20px] leading-[1.2] pb-8 ${
              activeTab === "features"
                ? "border-b-[5px] border-(--button)"
                : "border-b-[5px] border-transparent"
            }`}
            onClick={() => setActiveTab("features")}
          >
            Features
          </button>
          <button
            className={`font-semibold text-[20px] leading-[1.2] pb-8 ${
              activeTab === "reviews"
                ? "border-b-[5px] border-(--button)"
                : "border-b-[5px] border-transparent"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>
        <div className="flex gap-10">
          <div>
            <div>
              {activeTab === "features" && <Features camper={camper} />}
              {activeTab === "reviews" && <Reviews camper={camper} />}
            </div>
          </div>

          <BookingForm />
        </div>
      </div>
    </main>
  );
}
