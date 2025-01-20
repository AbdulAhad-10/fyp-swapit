import RequestsDisplay from "@/components/requests/RequestsDisplay";

const RequestsPage = () => {
  return (
    <section className="min-h-screen">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Session Requests
            </h1>
            <p className="mt-2 text-gray-600">
              View and manage your incoming and outgoing session requests.
            </p>
          </div>
        </div>
        <RequestsDisplay />
      </div>
    </section>
  );
};

export default RequestsPage;
