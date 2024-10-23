import {
  LayoutDashboard,
  CalendarClockIcon,
  LucideCalendarCheck,
  FileVideo2Icon,
  User,
} from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dashboard",
    route: "/",
    icon: <LayoutDashboard className="mr-2" size={20} />,
  },
  {
    label: "Upcoming",
    route: "/upcoming",
    icon: <CalendarClockIcon className="mr-2" size={20} />,
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
