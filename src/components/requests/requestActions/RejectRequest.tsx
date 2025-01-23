import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateRequestStatus } from "@/store/requestsSlice";
import { apiPatch } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const RejectRequest = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleReject = async () => {
    try {
      setIsLoading(true);
      const response = await apiPatch(`/api/requests/status/${id}`, {
        status: "rejected",
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        dispatch(
          updateRequestStatus({
            requestId: id,
            status: "rejected",
          })
        );

        toast({
          title: "Request Rejected",
          description: "The request has been successfully rejected.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast({
        title: "Error",
        description: "Failed to reject request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleReject}
      disabled={isLoading}
      className="secondary-btn"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Rejecting...
        </>
      ) : (
        "Reject"
      )}
    </Button>
  );
};

export default RejectRequest;
