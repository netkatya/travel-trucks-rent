import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-6 bg-(--badges)">
      <div className="container">
        <div className="flex gap-1 justify-center">
          <p className="font-medium text-base leading-[150%] text-center">
            Devloped by
          </p>
          <Link
            className="font-medium text-base leading-[150%] text-center hover:text-(--button-hover) transition-colors duration-300"
            href="https://www.linkedin.com/in/kateryna-pryhoda/"
            target="blank"
          >
            Kateryna Pryhoda
          </Link>
        </div>
      </div>
    </footer>
  );
}
