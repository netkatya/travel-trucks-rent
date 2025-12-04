import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="bg-[url('/img/hero.jpg')] bg-cover
      bg-center
      bg-no-repeat
      min-h-screen
      relative"
    >
      <div className="absolute inset-0 bg-black/20">
        <div className="container">
          <div className="py-[260px] z-10">
            <h1 className="font-semibold text-3xl lg:text-5xl leading-[67%] text-(--inputs) mb-6 lg:mb-4">
              Campers of your dreams
            </h1>
            <p className="  font-semibold text-xl lg:text-xl leading-[133%] text-(--inputs) mb-10">
              You can find everything you want in our catalog
            </p>
            <Link
              href="/catalog"
              className="rounded-[200px] px-[60px] py-4 w-[173px] h-14 bg-(--button) font-medium text-base leading-[150%] tracking-[-0.01em] text-(--white) hover:bg-(--button-hover) transition-colors duration-250"
            >
              View Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
