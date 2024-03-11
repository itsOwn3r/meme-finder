import Button from "../Button/Button";
import MemeFinderLogo from "../SVGs/memeFinderLogo";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className=" border-b-2 border-b-dim-gray border-opacity-30">
      <nav className="px-0 sm:px-6 pt-1 pb-2 xl:pb-4 2xl:pb-6 border-gray border-opacity-20 mt-4 xl:mt-8 2xl:mt-10  flex items-center justify-between">
        <Link aria-label="Back to Home" href="/">
            <MemeFinderLogo className="md:hidden block" />
          <div className="hidden items-center md:flex xl:w-72 2xl:w-96 text-zinc-400 hover:text-zinc-200">
            <MemeFinderLogo />
            <h2 className="text-h4 ml-3">Meme Finder</h2>
          </div>
        </Link>

        <div className="flex items-center gap-x-8">
          <Button href="/new">Add a New Meme</Button>
        </div>
      </nav>
    </header>
  );
}
