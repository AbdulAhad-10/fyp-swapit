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

export const ListingCardsData = [
  {
    title: "Public Speaking Basics",
    instructorName: "John Doe",
    duration: "45 mins",
    skillLevel: "Beginner",
    description:
      "Learn the fundamentals of public speaking in a friendly environment.",
    tags: ["Communication"],
    availability: "Mon, Wed, Fri (Evening)",
  },
  {
    title: "Time Management Techniques",
    instructorName: "Jane Smith",
    duration: "1 hr",
    skillLevel: "Intermediate",
    description: "Master the art of time management to boost productivity.",
    tags: ["Productivity", "Self-Improvement"],
    availability: "Tue, Thu (Morning)",
  },
  {
    title: "Creative Problem Solving",
    instructorName: "Michael Lee",
    duration: "1 hr 30 mins",
    skillLevel: "Advanced",
    description: "Learn strategies for solving complex problems creatively.",
    tags: ["Creativity", "Problem Solving"],
    availability: "Sat, Sun (Afternoon)",
  },
  {
    title: "Introduction to Mindfulness",
    instructorName: "Emily Davis",
    duration: "30 mins",
    skillLevel: "Beginner",
    description:
      "A beginner-friendly course on mindfulness and relaxation techniques.",
    tags: ["Wellness", "Mindfulness"],
    availability: "Mon, Wed, Fri (Morning)",
  },
  {
    title: "Conflict Resolution Skills",
    instructorName: "Sarah Brown",
    duration: "45 mins",
    skillLevel: "Intermediate",
    description:
      "Develop effective techniques for resolving conflicts in the workplace.",
    tags: ["Communication", "Conflict Resolution"],
    availability: "Tue, Thu (Evening)",
  },
  {
    title: "Leadership Essentials",
    instructorName: "Tom Wilson",
    duration: "2 hrs",
    skillLevel: "Advanced",
    description:
      "An in-depth course on the core skills required for effective leadership.",
    tags: ["Leadership", "Management"],
    availability: "Fri, Sat (Morning)",
  },
  {
    title: "Building Emotional Intelligence",
    instructorName: "Linda Green",
    duration: "1 hr",
    skillLevel: "Intermediate",
    description:
      "Learn techniques to enhance emotional intelligence in personal and professional settings.",
    tags: ["Emotional Intelligence", "Self-Improvement"],
    availability: "Mon, Wed (Afternoon)",
  },
  {
    title: "Effective Team Collaboration",
    instructorName: "James White",
    duration: "50 mins",
    skillLevel: "Beginner",
    description:
      "Learn the essentials of working collaboratively within a team.",
    tags: ["Teamwork", "Collaboration"],
    availability: "Mon, Tue, Thu (Evening)",
  },
];
