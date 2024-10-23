"use client";

import { cn } from "@/lib/utils";
import {
  BookOpen,
  CalendarClockIcon,
  FileVideo2Icon,
  LayoutDashboard,
  LucideCalendarCheck,
  Search,
  User,
} from "lucide-react";
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

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="flex sticky h-screen w-fit top-0 left-0 justify-between flex-col p-6 pt-24 max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col flex-1 gap-3">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-2 items-center px-4 py-2 rounded-[8px] justify-start",
                {
                  "bg-sky-1": isActive,
                }
              )}
            >
              {link.icon}
              <p className="text-base font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
