import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateRequestStatus } from "@/store/requestsSlice";
import { apiPatch } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

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

interface AcceptRequestProps {
  request: Request;
}

const AcceptRequest = ({ request }: AcceptRequestProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const { user } = useUser();

  const handleAccept = async () => {
    if (!client || !user) return;
    try {
      setIsLoading(true);
      // 1. Create GetStream call first
      const callId = crypto.randomUUID();
      const call = client.call("default", callId);

      await call.getOrCreate({
        data: {
          starts_at: request.proposedDateTime,
          custom: {
            title: request.listingId.title,
            requestId: request._id,
          },
        },
      });

      // 2. Create session and update request status in one API call
      const response = await apiPatch(`/api/requests/status/${request._id}`, {
        status: "accepted",
        callId,
        title: request.listingId?.title,
        duration: request.listingId?.duration,
        listingId: request.listingId,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        dispatch(
          updateRequestStatus({
            requestId: request._id,
            status: "accepted",
          })
        );

        toast({
          title: "Request Accepted",
          description: "Request has been accepted successfully.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      toast({
        title: "Error",
        description: "Failed to accept request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="primary-btn" onClick={handleAccept}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Accepting...
        </>
      ) : (
        "Accept"
      )}
    </Button>
  );
};

export default AcceptRequest;
