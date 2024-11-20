"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BookOpen,
  CalendarClockIcon,
  FileVideo2Icon,
  LayoutDashboard,
  LucideCalendarCheck,
  MessageSquare,
  Search,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Source_Sans_3 } from "next/font/google";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const sidebarLinks = [
  {
    label: "Dashboard",
    route: "/",
    icon: <LayoutDashboard className="mr-2" size={20} />,
  },
  {
    label: "Explore Skills",
    route: "/explore-skills",
    icon: <Search className="mr-2" size={20} />,
  },
  {
    label: "My Schedule",
    route: "/my-schedule",
    icon: <CalendarClockIcon className="mr-2" size={20} />,
  },
  {
    label: "My Listings",
    route: "/my-listings",
    icon: <BookOpen className="mr-2" size={20} />,
  },
  {
    label: "Requests",
    route: "/requests",
    icon: <MessageSquare className="mr-2" size={20} />,
  },
  {
    label: "Previous",
    route: "/previous",
    icon: <LucideCalendarCheck className="mr-2" size={20} />,
  },
  {
    label: "Recordings",
    route: "/recordings",
    icon: <FileVideo2Icon className="mr-2" size={20} />,
  },
  {
    label: "Profile",
    route: "/profile",
    icon: <User className="mr-2" size={20} />,
  },
];

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
                        "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                        {
                          "bg-sky-1": isActive,
                        }
                      )}
                    >
                      {link.icon}
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
