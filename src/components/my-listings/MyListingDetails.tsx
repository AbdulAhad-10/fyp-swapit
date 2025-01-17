"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { apiGet } from "@/utils/api";
import { useParams } from "next/navigation";
import LoaderSpinner from "@/components/ui/loader";

interface Creator {
  _id: string;
  username: string;
  profileImageUrl: string;
}

interface Listing {
  _id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  prerequisites: string;
  duration: string;
  timeFrom: string;
  timeTo: string;
  timezone: string;
  availableDays: string[];
  creator: Creator;
  createdAt: string;
  updatedAt: string;
}

const MyListingDetails = () => {
  const params = useParams();
  const listingId = params.id;
  const [listing, setListing] = useState<Listing | null>(null);

  const getListingDetails = async () => {
    try {
      const response = await apiGet(`/api/listings/${listingId}`);
      if (response.data.success) {
        setListing(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, [listingId]);

  if (!listing) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <>
      {/* <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1"> */}
      {/* Main Content */}
      <div className="col-span-2 space-y-4">
        {/* Title Section */}
        <div className="p-8 bg-white border shadow-sm rounded-[8px]">
          <h1 className="text-4xl font-bold text-gray-900">{listing.title}</h1>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary" className="px-3 py-1 bg-sky-1">
              {listing.category}
            </Badge>
            <Badge variant="secondary" className="px-3 py-1 bg-sky-1">
              {listing.language}
            </Badge>
          </div>
          <p className="mt-4 leading-relaxed text-gray-600">
            {listing.description}
          </p>
        </div>

        {/* Tabs Section */}
        <Card className="border shadow-sm rounded-[8px]">
          <CardContent className="p-0">
            <Tabs defaultValue="overview" className="w-full rounded-[8px]">
              <TabsList className="justify-start w-full h-auto p-0 border-b bg-gray-50/50 rounded-[8px]">
                <TabsTrigger
                  value="overview"
                  className="px-8 py-4 data-[state=active]:bg-white rounded-tl-[8px]"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="syllabus"
                  className="px-8 py-4 data-[state=active]:bg-white"
                >
                  What You&apos;ll Learn
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="px-8 py-4 data-[state=active]:bg-white"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <div className="p-8">
                <TabsContent value="overview" className="mt-0 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="border-2 border-gray-100">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                          Prerequisites
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-gray-600">
                          {listing.prerequisites}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-gray-100">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                          Session Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Duration: {listing.duration} minutes
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Time: {listing.timeFrom} - {listing.timeTo}
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Timezone: {listing.timezone}
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="syllabus" className="mt-0">
                  <div className="py-12 text-center">
                    <p className="text-lg text-gray-500">
                      Syllabus details coming soon.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-0">
                  <div className="py-12 text-center">
                    <p className="text-lg text-gray-500">No reviews yet.</p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      {/* </div> */}
    </>
  );
};

export default MyListingDetails;
