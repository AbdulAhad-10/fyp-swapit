"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { apiGet } from "@/utils/api";
import { LoaderSpinnerScreen } from "@/components/ui/loader";

interface ProfileContextType {
  isProfileCompleted: boolean | null;
  loading: boolean;
  refetchProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

const PUBLIC_PATHS = ["/sign-in", "/sign-up", "/onboarding", "/"];

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileCompleted, setIsProfileCompleted] = useState<boolean | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const fetchProfile = async () => {
    if (!isUserLoaded || !user) {
      setLoading(false);
      return;
    }

    try {
      const response = await apiGet("/api/users");
      const completed = response.data?.profileCompleted ?? false;
      setIsProfileCompleted(completed);
      return completed;
    } catch (error) {
      console.error("Error checking profile:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refetchProfile = async () => {
    setLoading(true);
    await fetchProfile();
  };

  // Initial profile check and redirect
  useEffect(() => {
    async function initialCheck() {
      if (!isUserLoaded || !user || initialCheckDone) return;

      const completed = await fetchProfile();

      // Only handle redirects on initial check
      if (pathname === "/") {
        if (!completed) {
          router.replace("/onboarding");
        }
      } else if (pathname === "/onboarding" && completed) {
        router.replace("/");
      }

      setInitialCheckDone(true);
    }

    initialCheck();
  }, [isUserLoaded, user, pathname, initialCheckDone]);

  // Subsequent route protection
  useEffect(() => {
    if (!initialCheckDone || !isUserLoaded || !user) return;

    const currentPath = pathname || "";

    // Don't redirect on public paths or during initial load
    if (!PUBLIC_PATHS.some((path) => currentPath.startsWith(path))) {
      if (!isProfileCompleted) {
        router.replace("/onboarding");
      }
    }
  }, [isProfileCompleted, pathname, isUserLoaded, user, initialCheckDone]);

  // Show nothing during initial auth load
  if (!isUserLoaded) {
    return null;
  }

  // Show loading state during initial profile check if authenticated
  if (user && loading && !initialCheckDone) {
    return <LoaderSpinnerScreen />;
  }

  return (
    <ProfileContext.Provider
      value={{ isProfileCompleted, loading, refetchProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
