import {
  BookOpen,
  BrainCircuit,
  CalendarClockIcon,
  // FileVideo2Icon,
  LayoutDashboard,
  LucideCalendarCheck,
  MessageSquare,
  Search,
  User,
} from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dashboard",
    route: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Explore Skills",
    route: "/explore-skills",
    icon: Search,
  },
  {
    label: "My Schedule",
    route: "/my-schedule",
    icon: CalendarClockIcon,
  },
  {
    label: "My Listings",
    route: "/my-listings",
    icon: BookOpen,
  },
  {
    label: "Requests",
    route: "/requests",
    icon: LucideCalendarCheck,
  },
  {
    label: "Previous",
    route: "/previous",
    icon: MessageSquare,
  },
  // {
  //   label: "Recordings",
  //   route: "/recordings",
  //   icon: FileVideo2Icon,
  // },
  {
    label: "AI Mentor",
    route: "/ai-mentor",
    icon: BrainCircuit,
  },
  {
    label: "Profile",
    route: "/profile",
    icon: User,
  },
];
