"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiGet, apiPatch } from "@/utils/api";
import { setRequests, updateRequestStatus } from "@/store/requestsSlice";
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
          received: await processRequestsForExpiration(
            response.data.requests.received
          ),
          sent: await processRequestsForExpiration(response.data.requests.sent),
        };

        dispatch(setRequests(transformedData));
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processRequestsForExpiration = async (requests: Request[]) => {
    const now = new Date();
    const processedRequests = [];

    for (const req of requests) {
      const proposedDateTime = new Date(req.proposedDateTime);

      if (req.status === "pending" && proposedDateTime < now) {
        try {
          const updateResponse = await apiPatch(
            `/api/requests/status/${req._id}`,
            {
              status: "expired",
            }
          );

          if (updateResponse.data) {
            dispatch(
              updateRequestStatus({
                requestId: req._id,
                status: "expired",
              })
            );
            processedRequests.push(
              transformRequest({
                ...req,
                status: "expired",
              })
            );
          } else {
            processedRequests.push(transformRequest(req));
          }
        } catch (error) {
          console.error("Error updating request status:", error);
          processedRequests.push(transformRequest(req));
        }
      } else {
        processedRequests.push(transformRequest(req));
      }
    }

    return processedRequests;
  };

  useEffect(() => {
    fetchRequests();
  }, [dispatch]);

  const renderRequestSection = (
    requests: Request[],
    emptyMessage: string,
    isSentRequest: boolean,
    status: string
  ) => {
    const filteredRequests = requests.filter((r) => r.status === status);
    return filteredRequests.length === 0 ? (
      <p className="text-gray-500 mt-4">{emptyMessage}</p>
    ) : (
      <div className="space-y-4 mt-4">
        {filteredRequests.map((request) => (
          <RequestCard
            key={request._id}
            request={request}
            isSentRequest={isSentRequest}
          />
        ))}
      </div>
    );
  };

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
            Received (
            {receivedRequests.filter((r) => r.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger
            value="sent"
            className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-blue-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-1"
          >
            Sent ({sentRequests.filter((r) => r.status === "pending").length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="received">
          <div>
            <h4 className="text-lg font-semibold mb-4">Active Requests</h4>
            {renderRequestSection(
              receivedRequests,
              "No active requests received",
              false,
              "pending"
            )}

            <h4 className="text-lg font-semibold mb-4 mt-6">
              Expired Requests (Older than 7 days)
            </h4>
            {renderRequestSection(
              receivedRequests,
              "No expired requests",
              false,
              "expired"
            )}
          </div>
        </TabsContent>
        <TabsContent value="sent">
          <div>
            <h4 className="text-lg font-semibold mb-4">Active Requests</h4>
            {renderRequestSection(
              sentRequests,
              "No active requests sent",
              true,
              "pending"
            )}

            <h4 className="text-lg font-semibold mb-4 mt-6">
              Expired Requests (Older than 7 days)
            </h4>
            {renderRequestSection(
              sentRequests,
              "No expired requests",
              true,
              "expired"
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
