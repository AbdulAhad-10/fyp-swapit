"use client";
import React from "react";
import { ChevronLeft, Clock, Users, Medal, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import SessionRequestDialog from "@/components/exploreSkills/SessionRequestDialog";

const ListingDetailsPage = () => {
  const [showRequestDialog, setShowRequestDialog] = React.useState(false);

  return (
    <div className="container">
      {/* Back Button */}
      <Link
        href="/explore-skills"
        className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Explore Skills
      </Link>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Title Section */}
          <div>
            <h1 className="text-3xl font-bold">Public Speaking Basics</h1>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">Beginner</Badge>
              <Badge variant="secondary">Communication</Badge>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="justify-start w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="syllabus">What You&apos;ll Learn</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <p className="text-muted-foreground">
                Learn the fundamentals of public speaking in a friendly
                environment. Master the art of delivering compelling
                presentations and speaking confidently in front of audiences.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-medium">Prerequisites</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• No prior experience needed</li>
                      <li>• Basic English communication skills</li>
                      <li>• Willingness to participate actively</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-medium">This Session Includes</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• One-on-one mentoring</li>
                      <li>• Practice exercises</li>
                      <li>• Resource materials</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="syllabus" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">
                    1. Introduction to Public Speaking
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Understanding the basics of effective communication and
                    overcoming stage fright.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">2. Structure Your Speech</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn how to organize your thoughts and create compelling
                    presentations.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">3. Delivery Techniques</h3>
                  <p className="text-sm text-muted-foreground">
                    Master voice modulation, body language, and audience
                    engagement.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                {/* Add review components here */}
                <p className="text-muted-foreground">No reviews yet.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Instructor Card */}
          <Card className="bg-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">
                    Public Speaking Coach
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>50+ students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Medal className="w-4 h-4 text-muted-foreground" />
                  <span>4.8 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>45 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessagesSquare className="w-4 h-4 text-muted-foreground" />
                  <span>English</span>
                </div>
              </div>

              <Button
                className="w-full primary-btn"
                onClick={() => setShowRequestDialog(true)}
              >
                Request Session
              </Button>

              <div className="text-sm">
                <p className="mb-1 font-medium">Available Times:</p>
                <p className="text-muted-foreground">Mon, Wed, Fri (Evening)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <SessionRequestDialog
        open={showRequestDialog}
        onOpenChange={setShowRequestDialog}
        instructorName="John Doe"
        skillTitle="Public Speaking Basics"
        availableDays={["Mon", "Wed", "Fri"]}
      />
    </div>
  );
};

export default ListingDetailsPage;
