import Link from "next/link";
import { FooterTitle } from "../SVGs/FooterTitle";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";

export default function Footer() {
  const links = [
    {
      id: 1,
      href: "/about",
      label: "About",
    },
    {
      id: 2,
      href: "https://forms.gle/PftXkai3sNZquWu68",
      label: "Add a resource",
    },
    {
      id: 3,
      href: "https://forms.gle/s84TNQcUX1P22bTE7",
      label: "Submit feedback",
    },
    {
      id: 4,
      href: "https://ko-fi.com/supporthuyng",
      label: "Support this project",
    },
    {
      id: 5,
      href: "https://github.com/huyngxyz/Pillarstack",
      label: "Contribute on Github",
    },
    {
      id: 6,
      href: "/legal",
      label: "Legal",
    },
  ];

  return (
    <footer className="mt-4 mb-16 sm:mb-0">
      <div className="pb-6 footer-name text-zinc-300 hover:text-zinc-100">
        MEME FINDER
      </div>
    </footer>
  );
}
