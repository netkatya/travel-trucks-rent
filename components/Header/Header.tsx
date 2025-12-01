import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-(--inputs) border-b border-(--badges) h-[72px] pt-6 pb-6">
      <div className="container">
        <div className=" flex gap-[450px] items-center">
          <Link href="/">
            <svg width={136} height={16}>
              <use href="/icons.svg#icon-Logo"></use>
            </svg>
          </Link>
          <ul className="flex gap-8">
            <li>
              <Link
                href="/"
                className="font-medium text-base leading-[150%] text-center hover:text-(--button-hover)"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className="font-medium text-base leading-[150%] text-center hover:text-(--button-hover)"
              >
                Catalog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
