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
  Search,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  {
    label: "Dashboard",
    route: "/",
    icon: <LayoutDashboard className="mr-2" size={20} />,
  },
  {
    label: "Explore Skills",
    route: "/exlore-skills",
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
            <section className="flex flex-col h-full gap-6 pt-16">
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
