"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EditProfileModal from "./EditProfileModal";
import LoaderSpinner from "../ui/loader";
import Link from "next/link";
import { apiGet, apiPost } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

// Enhanced interface for user data
interface UserData {
  _id: string;
  clerkId: string;
  username: string;
  email: string;
  profileImageUrl: string;
  profile: {
    bio: string;
    skills_can_teach: string[];
    skills_wants_to_learn: string[];
    points: number;
  };
  profileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  listingsCreated: string[];
}

// Simplified type for update operations
type ProfileUpdateData = {
  bio: string;
  skills_can_teach: string[];
  skills_wants_to_learn: string[];
};

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const { data } = await apiGet("/api/users");
        setUserData(data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (updatedFields: ProfileUpdateData) => {
    try {
      setIsSubmitting(true);

      if (!userData) return;

      // Create updated profile
      const updatedProfile = {
        ...userData.profile,
        bio: updatedFields.bio,
        skills_can_teach: updatedFields.skills_can_teach,
        skills_wants_to_learn: updatedFields.skills_wants_to_learn,
      };

      // Update local state
      setUserData({
        ...userData,
        profile: updatedProfile,
      });

      // Send to API
      const { data } = await apiPost("/api/users/profile/complete", {
        bio: updatedFields.bio,
        skills_can_teach: updatedFields.skills_can_teach,
        skills_wants_to_learn: updatedFields.skills_wants_to_learn,
      });

      if (data?.success) {
        toast({
          title: data.message,
        });
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSubmitting(false);
      setIsEditModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <LoaderSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Error Loading Profile</h2>
        <p>{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!userData || !userData.profile) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Profile Not Found</h2>
        <p>
          We couldn&apos;t find your profile information. You might need to
          complete onboarding.
        </p>
        <Button
          className="mt-4"
          onClick={() => (window.location.href = "/onboarding")}
        >
          Complete Profile
        </Button>
      </div>
    );
  }

  const { profile } = userData;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex gap-3">
          <Link href="/create-listing">
            <Button className="primary-btn">
              <Plus className="w-4 h-4" />
              Create New Listing
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 secondary-btn"
          >
            <Pencil size={16} />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* User Header with Profile Image and Username */}
      <Card className="shadow-sm border-gray-200 bg-white rounded-[8px] mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Image
              width={96}
              height={96}
              src={userData.profileImageUrl}
              alt={`${userData.username}'s profile`}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.username}
              </h2>
              <p className="text-gray-500">{userData.email}</p>
              <div className="mt-2">
                <Badge className="ml-2 bg-blue-100 text-blue-800 border border-blue-200">
                  {userData.listingsCreated?.length || 0} Listings
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {/* Bio Section */}
        <Card className="shadow-sm border-gray-200 bg-white rounded-[8px]">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills I Can Teach */}
          <Card className="shadow-sm border-gray-200 bg-white rounded-[8px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-gray-800">
                Skills I Can Teach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills_can_teach.map((skill) => (
                  <Badge
                    key={skill}
                    className="px-3 py-1 bg-sky-100 text-sky-800 border border-sky-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills I Want to Learn */}
          <Card className="shadow-sm border-gray-200 bg-white rounded-[8px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-gray-800">
                Skills I Want to Learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills_wants_to_learn.map((skill) => (
                  <Badge
                    key={skill}
                    className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          profile={{
            bio: profile.bio,
            skills_can_teach: profile.skills_can_teach,
            skills_wants_to_learn: profile.skills_wants_to_learn,
          }}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleProfileUpdate}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
