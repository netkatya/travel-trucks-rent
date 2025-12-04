"use client";
import { ChevronUp } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ScrollToTopBtn() {
  const MIN_SCROLLS = 2;
  const SHOW_AFTER = 200;

  const btnRef = useRef<HTMLButtonElement>(null);
  const docHeightRef = useRef(0);
  const tickingRef = useRef(false);
  const scrollCountRef = useRef(0);
  const lastScrollY = useRef(0);

  function calcDocHeight() {
    docHeightRef.current = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  }

  function update() {
    const btn = btnRef.current;
    if (!btn) return;

    const scrollY = window.scrollY;
    const viewport = window.innerHeight;
    const scrollable = docHeightRef.current - viewport;
    const ratio = scrollable > 0 ? scrollY / scrollable : 0;
    const percent = Math.min(100, Math.max(0, ratio * 100));

    btn.style.background = `conic-gradient(var(--color-deco-dark) ${percent}%, var(--color-deco-light) 0%)`;

    if (scrollCountRef.current >= MIN_SCROLLS && scrollY > SHOW_AFTER) {
      btn.classList.add("opacity-100", "translate-y-0");
      btn.setAttribute("aria-hidden", "false");
    } else {
      btn.classList.remove("opacity-100", "translate-y-0");
      btn.setAttribute("aria-hidden", "true");
    }

    tickingRef.current = false;
  }

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > lastScrollY.current) scrollCountRef.current++;

    lastScrollY.current = scrollY;

    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(update);
    }
  }

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    calcDocHeight();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    const handleResize = () => {
      calcDocHeight();
      update();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      aria-hidden="true"
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`
    hidden lg:flex
    fixed right-5 bottom-15
    justify-center items-center
    w-[50px] h-[50px]
    rounded-full border-0 cursor-pointer
    opacity-0 translate-y-5
    transition-all duration-300 ease-in-out
    z-9999
    hover:scale-150 active:scale-150
  `}
    >
      <ChevronUp color="#fff" />
    </button>
  );
}
