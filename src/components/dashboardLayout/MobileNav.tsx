"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Source_Sans_3 } from "next/font/google";
import { sidebarLinks } from "@/constants/sidebarLinks";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Menu size={20} className="cursor-pointer sm:hidden" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <Link
              href={"/"}
              className={`${sourceSans.className} flex items-center gap-1 justify-center border-b pb-4`}
            >
              <p className="text-3xl font-extrabold  text-blue-1">swapit</p>
            </Link>

            <section className="flex flex-col h-full gap-3 pt-5">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.route;
                return (
                  <SheetClose asChild key={link.route}>
                    <Link
                      href={link.route}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded-[8px] w-full max-w-60",
                        {
                          "bg-sky-1": isActive,
                        }
                      )}
                    >
                      <link.icon className="w-5 h-5" />
                      <p className="font-semibold">{link.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
