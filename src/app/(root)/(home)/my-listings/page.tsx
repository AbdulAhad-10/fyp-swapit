"use client";
import React from "react";
import { Plus, Edit, ExternalLink, Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
import Link from "next/link";

const MyListingsPage = () => {
  // Sample data - replace with real data
  const listings = [
    {
      id: 1,
      title: "Public Speaking Basics",
      description: "Learn the fundamentals of public speaking in a friendly environment.",
      category: "Communication",
      level: "Beginner",
      duration: "45 mins",
      students: 50,
      availability: "Mon, Wed, Fri (Evening)",
      status: "active"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Deep dive into modern JavaScript features and best practices.",
      category: "Programming",
      level: "Advanced",
      duration: "60 mins",
      students: 35,
      availability: "Tue, Thu (Morning)",
      status: "draft"
    }
  ];

  return (
    <section className="min-h-screen">
      <div className="container">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
            <p className="mt-2 text-gray-600">
              Manage and track your skill-sharing sessions
            </p>
          </div>
          <Link href="/create-listing">
            <Button className="primary-btn">
              <Plus className="w-4 h-4 mr-2" />
              Create New Listing
            </Button>
          </Link>
        </div>

        {/* Search and Filter Section */}
        {/* <div className="p-4 mb-6 bg-white border shadow-sm rounded-[8px]">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                className="pl-10" 
                placeholder="Search your listings..." 
              />
            </div>
            <Button className="secondary-btn">
              Filter
            </Button>
          </div>
        </div> */}

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="border shadow-sm hover:shadow-md transition-shadow bg-white rounded-[8px]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {listing.title}
                    </h2>
                    <div className="flex gap-2 mb-4">
                      <Badge className="px-2 py-0.5 bg-sky-1">
                        {listing.level}
                      </Badge>
                      <Badge className="px-2 py-0.5 bg-sky-1">
                        {listing.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge 
                    variant={listing.status === 'active' ? 'default' : 'secondary'}
                    className="capitalize bg-sky-1"
                  >
                    {listing.status}
                  </Badge>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {listing.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{listing.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{listing.students} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{listing.availability}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  asChild
                >
                  <Link href={`/edit-listing/${listing.id}`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  asChild
                >
                  <Link href={`/explore-skills/${listing.id}`}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* Empty State */}
          {listings.length === 0 && (
            <div className="col-span-full">
              <Card className="border-2 border-dashed">
                <CardContent className="p-12 text-center">
                  <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
                  <p className="text-gray-600 mb-6">
                    Create your first listing to start sharing your skills with others
                  </p>
                  <Link href="/create-listing">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Create New Listing
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyListingsPage;