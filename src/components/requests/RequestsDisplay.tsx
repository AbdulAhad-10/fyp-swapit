import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestCard from "./RequestCard";

interface Request {
  _id: string;
  instructorId: {
    _id: string;
    username: string;
    profileImageUrl: string;
  };
  learnerId: {
    _id: string;
    username: string;
    profileImageUrl: string;
  };
  listingId: {
    _id: string;
    title: string;
    duration: string;
  };
  proposedDateTime: Date;
  note?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

export default function RequestsDisplay() {
  const receivedRequests: Request[] = [
    {
      _id: "req1",
      instructorId: {
        _id: "inst1",
        username: "Instructor A",
        profileImageUrl: "/images/instructor-a.jpg",
      },
      learnerId: {
        _id: "learner1",
        username: "Learner X",
        profileImageUrl: "/images/learner-x.jpg",
      },
      listingId: {
        _id: "listing1",
        title: "Python Basics",
        duration: "1 hour",
      },
      proposedDateTime: new Date(),
      note: "Looking forward to this session!",
      status: "pending",
      createdAt: new Date(),
    },
  ];

  const sentRequests: Request[] = [
    {
      _id: "req2",
      instructorId: {
        _id: "inst2",
        username: "Instructor B",
        profileImageUrl: "/images/instructor-b.jpg",
      },
      learnerId: {
        _id: "learner2",
        username: "Learner Y",
        profileImageUrl: "/images/learner-y.jpg",
      },
      listingId: {
        _id: "listing2",
        title: "Advanced React",
        duration: "2 hours",
      },
      proposedDateTime: new Date(),
      note: "Excited for this learning session.",
      status: "accepted",
      createdAt: new Date(),
    },
  ];

  return (
    <Tabs defaultValue="received">
      <TabsList className="bg-white">
        <TabsTrigger value="received">
          Received ({receivedRequests.length})
        </TabsTrigger>
        <TabsTrigger value="sent">Sent ({sentRequests.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="received">
        {receivedRequests.length === 0 ? (
          <p className="text-gray-500">No requests received yet</p>
        ) : (
          receivedRequests.map((request) => (
            <RequestCard key={request._id} request={request} />
          ))
        )}
      </TabsContent>

      <TabsContent value="sent">
        {sentRequests.length === 0 ? (
          <p className="text-gray-500">
            You haven&apos;t sent any requests yet
          </p>
        ) : (
          sentRequests.map((request) => (
            <RequestCard key={request._id} request={request} />
          ))
        )}
      </TabsContent>
    </Tabs>
  );
}
