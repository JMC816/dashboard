import Link from "next/link";
import { Title } from "../types/navItem";
import Image from "next/image";

export const NavItems = ({ text, link, img }: Title) => {
  return (
    <Link href={link}>
      <div className=" hover:bg-lightGray hover:cursor-pointer hover:rounded-xl px-5 lg:justify-normal justify-center py-2 flex items-center gap-2">
        <Image height={30} width={30} src={img} alt="dashboard" />
        <span className="hidden lg:inline">{text}</span>
      </div>
    </Link>
  );
};
