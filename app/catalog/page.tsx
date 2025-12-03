import CampersList from "@/components/CampersList/CampersList";
import Filters from "@/components/Filters/Filters";

export default function CatalogPage() {
  return (
    <main className="py-12">
      <div className="container flex gap-16">
        <div>
          <Filters />
        </div>
        <div className="">
          <CampersList />
        </div>
      </div>
    </main>
  );
}
