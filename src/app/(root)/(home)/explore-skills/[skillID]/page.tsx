// "use client";
// import React from "react";
// import { ChevronLeft, Clock, Users, Medal, MessagesSquare } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Link from "next/link";
// import SessionRequestDialog from "@/components/exploreSkills/SessionRequestDialog";

// const ListingDetailsPage = () => {
//   const [showRequestDialog, setShowRequestDialog] = React.useState(false);

//   return (
//     <div className="container">
//       {/* Back Button */}
//       <Link
//         href="/explore-skills"
//         className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground"
//       >
//         <ChevronLeft className="w-4 h-4 mr-1" />
//         Back to Explore Skills
//       </Link>

//       <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
//         {/* Main Content */}
//         <div className="col-span-2 space-y-6">
//           {/* Title Section */}
//           <div>
//             <h1 className="text-3xl font-bold">Public Speaking Basics</h1>
//             <div className="flex gap-2 mt-2">
//               <Badge variant="secondary">Beginner</Badge>
//               <Badge variant="secondary">Communication</Badge>
//             </div>
//           </div>

//           {/* Tabs Section */}
//           <Tabs defaultValue="overview" className="w-full">
//             <TabsList className="justify-start w-full">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="syllabus">What You&apos;ll Learn</TabsTrigger>
//               <TabsTrigger value="reviews">Reviews</TabsTrigger>
//             </TabsList>

//             <TabsContent value="overview" className="mt-4 space-y-4">
//               <p className="text-muted-foreground">
//                 Learn the fundamentals of public speaking in a friendly
//                 environment. Master the art of delivering compelling
//                 presentations and speaking confidently in front of audiences.
//               </p>

//               <div className="grid grid-cols-2 gap-4">
//                 <Card>
//                   <CardContent className="p-4">
//                     <h3 className="mb-2 font-medium">Prerequisites</h3>
//                     <ul className="space-y-1 text-sm text-muted-foreground">
//                       <li>• No prior experience needed</li>
//                       <li>• Basic English communication skills</li>
//                       <li>• Willingness to participate actively</li>
//                     </ul>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardContent className="p-4">
//                     <h3 className="mb-2 font-medium">This Session Includes</h3>
//                     <ul className="space-y-1 text-sm text-muted-foreground">
//                       <li>• One-on-one mentoring</li>
//                       <li>• Practice exercises</li>
//                       <li>• Resource materials</li>
//                     </ul>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             <TabsContent value="syllabus" className="mt-4">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <h3 className="font-medium">
//                     1. Introduction to Public Speaking
//                   </h3>
//                   <p className="text-sm text-muted-foreground">
//                     Understanding the basics of effective communication and
//                     overcoming stage fright.
//                   </p>
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="font-medium">2. Structure Your Speech</h3>
//                   <p className="text-sm text-muted-foreground">
//                     Learn how to organize your thoughts and create compelling
//                     presentations.
//                   </p>
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="font-medium">3. Delivery Techniques</h3>
//                   <p className="text-sm text-muted-foreground">
//                     Master voice modulation, body language, and audience
//                     engagement.
//                   </p>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="reviews" className="mt-4">
//               <div className="space-y-4">
//                 {/* Add review components here */}
//                 <p className="text-muted-foreground">No reviews yet.</p>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Instructor Card */}
//           <Card className="bg-white">
//             <CardContent className="p-6 space-y-4">
//               <div className="flex items-start gap-4">
//                 <Avatar className="w-12 h-12">
//                   <AvatarImage src="/placeholder-avatar.jpg" />
//                   <AvatarFallback>JD</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <h3 className="font-semibold">John Doe</h3>
//                   <p className="text-sm text-muted-foreground">
//                     Public Speaking Coach
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div className="flex items-center gap-2">
//                   <Users className="w-4 h-4 text-muted-foreground" />
//                   <span>50+ students</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Medal className="w-4 h-4 text-muted-foreground" />
//                   <span>4.8 rating</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="w-4 h-4 text-muted-foreground" />
//                   <span>45 mins</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MessagesSquare className="w-4 h-4 text-muted-foreground" />
//                   <span>English</span>
//                 </div>
//               </div>

//               <Button
//                 className="w-full primary-btn"
//                 onClick={() => setShowRequestDialog(true)}
//               >
//                 Request Session
//               </Button>

//               <div className="text-sm">
//                 <p className="mb-1 font-medium">Available Times:</p>
//                 <p className="text-muted-foreground">Mon, Wed, Fri (Evening)</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       <SessionRequestDialog
//         open={showRequestDialog}
//         onOpenChange={setShowRequestDialog}
//         instructorName="John Doe"
//         skillTitle="Public Speaking Basics"
//         availableDays={["Mon", "Wed", "Fri"]}
//       />
//     </div>
//   );
// };

// export default ListingDetailsPage;

"use client";
import React from "react";
import {
  ChevronLeft,
  Clock,
  Users,
  Medal,
  MessagesSquare,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import SessionRequestDialog from "@/components/exploreSkills/SessionRequestDialog";

const ListingDetailsPage = () => {
  const [showRequestDialog, setShowRequestDialog] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container">
        {/* Back Button */}
        <Link
          href="/explore-skills"
          className="inline-flex items-center mb-8 transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Explore Skills
        </Link>

        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          {/* Main Content */}
          <div className="col-span-2 space-y-4">
            {/* Title Section */}
            <div className="p-8 bg-white border shadow-sm rounded-[8px]">
              <h1 className="text-4xl font-bold text-gray-900">
                Public Speaking Basics
              </h1>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary" className="px-3 py-1 bg-sky-1">
                  Beginner
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-sky-1">
                  Communication
                </Badge>
              </div>
              <p className="mt-4 leading-relaxed text-gray-600">
                Learn the fundamentals of public speaking in a friendly
                environment. Master the art of delivering compelling
                presentations and speaking confidently in front of audiences.
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
                            <ul className="space-y-3 text-gray-600">
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                No prior experience needed
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                Basic English communication skills
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                Willingness to participate actively
                              </li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="border-2 border-gray-100">
                          <CardHeader>
                            <CardTitle className="text-lg font-semibold">
                              This Session Includes
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3 text-gray-600">
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                One-on-one mentoring
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                Practice exercises
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                Resource materials
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="syllabus" className="mt-0">
                      <div className="space-y-8">
                        <div className="relative pl-8 border-l-2 border-blue-100">
                          <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0" />
                          <h3 className="text-xl font-semibold text-gray-900">
                            1. Introduction to Public Speaking
                          </h3>
                          <p className="mt-2 text-gray-600">
                            Understanding the basics of effective communication
                            and overcoming stage fright.
                          </p>
                        </div>
                        <div className="relative pl-8 border-l-2 border-blue-100">
                          <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0" />
                          <h3 className="text-xl font-semibold text-gray-900">
                            2. Structure Your Speech
                          </h3>
                          <p className="mt-2 text-gray-600">
                            Learn how to organize your thoughts and create
                            compelling presentations.
                          </p>
                        </div>
                        <div className="relative pl-8 border-l-2 border-blue-100">
                          <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0" />
                          <h3 className="text-xl font-semibold text-gray-900">
                            3. Delivery Techniques
                          </h3>
                          <p className="mt-2 text-gray-600">
                            Master voice modulation, body language, and audience
                            engagement.
                          </p>
                        </div>
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

          {/* Sidebar */}
          <div>
            <Card className="sticky bg-white border shadow-sm top-8 rounded-[8px]">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 border-2 border-gray-100">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      John Doe
                    </h3>
                    <p className="text-gray-600">Public Speaking Coach</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">50+ students</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Medal className="w-4 h-4" />
                      <span className="font-medium">4.8 rating</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">45 mins</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessagesSquare className="w-4 h-4" />
                      <span className="font-medium">English</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="flex-shrink-0 w-4 h-4" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Available Times:
                      </p>
                      <p>Mon, Wed, Fri (Evening)</p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full primary-btn"
                  onClick={() => setShowRequestDialog(true)}
                >
                  Request Session
                </Button>
              </CardContent>
            </Card>
          </div>
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
