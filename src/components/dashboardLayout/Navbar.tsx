// import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { Source_Sans_3 } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed z-50 w-full px-6 py-4 flex-between lg:px-10 bg-white border-b">
      <Link
        href={"/"}
        className={`${sourceSans.className} flex items-center gap-1`}
      >
        <p className="text-3xl font-extrabold  text-blue-1">swapit</p>
      </Link>

      <div className="gap-5 flex-between">
        {/* <SignedIn>
          <UserButton />
        </SignedIn> */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-slate-500">CN</AvatarFallback>
        </Avatar>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
