import React from "react";
import { ChevronLeft } from "lucide-react";

import Link from "next/link";
import CreateListingForm from "@/components/create-listing/CreateListingForm";

const CreateListingPage: React.FC = () => {
  return (
    <section className="min-h-screen">
      <div className="container">
        <Link
          href="/my-listings"
          className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to My Listings
        </Link>

        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Listing
          </h1>

          <CreateListingForm />
        </div>
      </div>
    </section>
  );
};

export default CreateListingPage;
