// "use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import RequestCard from "./RequestCard";
// import { apiGet } from "@/utils/api";
// import { useEffect, useState } from "react";
// import LoaderSpinner from "../ui/loader";

// interface Request {
//   _id: string;
//   instructorId: {
//     _id: string;
//     username: string;
//     profileImageUrl: string;
//   };
//   learnerId: {
//     _id: string;
//     username: string;
//     profileImageUrl: string;
//   };
//   listingId: {
//     _id: string;
//     title: string;
//     duration: string;
//   };
//   proposedDateTime: string;
//   note?: string;
//   status: "pending" | "accepted" | "rejected";
//   createdAt: string;
// }

// export default function RequestsDisplay() {
//   const [receivedRequests, setReceivedRequests] = useState<Request[]>([]);
//   const [sentRequests, setSentRequests] = useState<Request[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const getRequests = async () => {
//     try {
//       setIsLoading(true);
//       const response = await apiGet("/api/requests");

//       if (response.data?.requests) {
//         // Transform the received requests data
//         const transformedReceived = response.data.requests.received.map(
//           (req: Request) => ({
//             _id: req._id,
//             instructorId: {
//               _id: req.instructorId._id || req.instructorId,
//               username: req.instructorId.username || "Unknown",
//               profileImageUrl:
//                 req.instructorId.profileImageUrl || "/api/placeholder/40/40",
//             },
//             learnerId: {
//               _id: req.learnerId._id || req.learnerId,
//               username: req.learnerId.username || "Unknown",
//               profileImageUrl:
//                 req.learnerId.profileImageUrl || "/api/placeholder/40/40",
//             },
//             listingId: {
//               _id: req.listingId._id || req.listingId,
//               title: req.listingId.title || "Unknown Listing",
//               duration: req.listingId.duration || "Not specified",
//             },
//             proposedDateTime: new Date(req.proposedDateTime),
//             note: req.note,
//             status: req.status,
//             createdAt: new Date(req.createdAt),
//           })
//         );

//         // Transform the sent requests data
//         const transformedSent = response.data.requests.sent.map(
//           (req: Request) => ({
//             _id: req._id,
//             instructorId: {
//               _id: req.instructorId._id || req.instructorId,
//               username: req.instructorId.username || "Unknown",
//               profileImageUrl:
//                 req.instructorId.profileImageUrl || "/api/placeholder/40/40",
//             },
//             learnerId: {
//               _id: req.learnerId._id || req.learnerId,
//               username: req.learnerId.username || "Unknown",
//               profileImageUrl:
//                 req.learnerId.profileImageUrl || "/api/placeholder/40/40",
//             },
//             listingId: {
//               _id: req.listingId._id || req.listingId,
//               title: req.listingId.title || "Unknown Listing",
//               duration: req.listingId.duration || "Not specified",
//             },
//             proposedDateTime: new Date(req.proposedDateTime),
//             note: req.note,
//             status: req.status,
//             createdAt: new Date(req.createdAt),
//           })
//         );

//         setReceivedRequests(transformedReceived);
//         setSentRequests(transformedSent);
//       }
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getRequests();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         <LoaderSpinner />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       <Tabs defaultValue="received" className="w-full">
//         <TabsList className="w-fit border-b">
//           <TabsTrigger
//             value="received"
//             className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-blue-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-1"
//           >
//             Received ({receivedRequests.length})
//           </TabsTrigger>
//           <TabsTrigger
//             value="sent"
//             className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-blue-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-1"
//           >
//             Sent ({sentRequests.length})
//           </TabsTrigger>
//         </TabsList>
//         <TabsContent value="received">
//           {receivedRequests.length === 0 ? (
//             <p className="text-gray-500 mt-4">No requests received yet</p>
//           ) : (
//             <div className="space-y-4 mt-4">
//               {receivedRequests.map((request) => (
//                 <RequestCard key={request._id} request={request} />
//               ))}
//             </div>
//           )}
//         </TabsContent>
//         <TabsContent value="sent">
//           {sentRequests.length === 0 ? (
//             <p className="text-gray-500 mt-4">
//               You haven&apos;t sent any requests yet
//             </p>
//           ) : (
//             <div className="space-y-4 mt-4">
//               {sentRequests.map((request) => (
//                 <RequestCard
//                   key={request._id}
//                   request={request}
//                   isSentRequest={true}
//                 />
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// components/RequestsDisplay.tsx
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiGet } from "@/utils/api";
import { setRequests } from "@/store/requestsSlice";
import RequestCard from "./RequestCard";
import LoaderSpinner from "../ui/loader";
import { RootState } from "@/store/store";

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
  proposedDateTime: string;
  note?: string;
  status: "pending" | "accepted" | "rejected" | "expired";
  createdAt: string;
}

const transformRequest = (req: Request) => ({
  _id: req._id,
  instructorId: {
    _id: req.instructorId._id,
    username: req.instructorId.username || "Unknown",
    profileImageUrl:
      req.instructorId.profileImageUrl || "/api/placeholder/40/40",
  },
  learnerId: {
    _id: req.learnerId._id,
    username: req.learnerId.username || "Unknown",
    profileImageUrl: req.learnerId.profileImageUrl || "/api/placeholder/40/40",
  },
  listingId: {
    _id: req.listingId._id,
    title: req.listingId.title || "Unknown Listing",
    duration: req.listingId.duration || "Not specified",
  },
  proposedDateTime: new Date(req.proposedDateTime).toISOString(),
  note: req.note,
  status: req.status,
  createdAt: new Date(req.createdAt).toISOString(),
});

export default function RequestsDisplay() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { received: receivedRequests, sent: sentRequests } = useSelector(
    (state: RootState) => state.requests
  );

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const response = await apiGet("/api/requests");

      if (response.data?.requests) {
        const transformedData = {
          received: response.data.requests.received.map(transformRequest),
          sent: response.data.requests.sent.map(transformRequest),
        };

        dispatch(setRequests(transformedData));
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="received" className="w-full">
        <TabsList className="w-fit border-b">
          <TabsTrigger
            value="received"
            className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-blue-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-1"
          >
            Received ({receivedRequests.length})
          </TabsTrigger>
          <TabsTrigger
            value="sent"
            className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-blue-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-1"
          >
            Sent ({sentRequests.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="received">
          {receivedRequests.length === 0 ? (
            <p className="text-gray-500 mt-4">No requests received yet</p>
          ) : (
            <div className="space-y-4 mt-4">
              {receivedRequests.map((request) => (
                <RequestCard key={request._id} request={request} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="sent">
          {sentRequests.length === 0 ? (
            <p className="text-gray-500 mt-4">
              You haven&apos;t sent any requests yet
            </p>
          ) : (
            <div className="space-y-4 mt-4">
              {sentRequests.map((request) => (
                <RequestCard
                  key={request._id}
                  request={request}
                  isSentRequest={true}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
