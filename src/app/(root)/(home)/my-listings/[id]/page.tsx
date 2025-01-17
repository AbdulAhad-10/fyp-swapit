import MyListingDetails from "@/components/my-listings/MyListingDetails";
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
        <MyListingDetails />
      </div>
    </main>
  );
};

export default MyListingDetailsPage;
