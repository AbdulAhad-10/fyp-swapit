import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MyListings from "@/components/my-listings/MyListings";

const MyListingsPage = () => {
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
        <MyListings />
      </div>
    </section>
  );
};

export default MyListingsPage;
