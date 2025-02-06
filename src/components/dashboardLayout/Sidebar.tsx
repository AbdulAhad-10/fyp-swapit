"use client";

import { sidebarLinks } from "@/constants/sidebarLinks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
              <link.icon className="w-5 h-5" />
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
