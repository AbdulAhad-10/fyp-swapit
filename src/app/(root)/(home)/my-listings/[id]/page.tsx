import ListingDetails from "@/components/exploreSkills/listingDetails/ListingDetails";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const MyListingDetailsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="container">
        {/* Back Button */}
        <Link
          href="/my-listings"
          className="inline-flex items-center mb-8 transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to My Listings
        </Link>
        <ListingDetails />
      </div>
    </main>
  );
};

export default MyListingDetailsPage;
