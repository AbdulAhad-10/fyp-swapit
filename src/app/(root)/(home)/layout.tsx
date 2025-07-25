import Navbar from "@/components/dashboardLayout/Navbar";
import Sidebar from "@/components/dashboardLayout/Sidebar";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex flex-col flex-1 min-h-screen px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 bg-[#F6F8FE]">
          <div className="full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
