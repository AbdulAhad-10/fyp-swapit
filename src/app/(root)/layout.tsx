import StreamVideoProvider from "@/providers/StreamClientProvider";
import { ReactNode } from "react";

const RookLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RookLayout;
