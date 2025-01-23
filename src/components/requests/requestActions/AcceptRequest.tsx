import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateRequestStatus } from "@/store/requestsSlice";
import { apiPatch } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AcceptRequest = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleAccept = async () => {
    try {
      setIsLoading(true);
      const response = await apiPatch(`/api/requests/status/${id}`, {
        status: "accepted",
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        dispatch(
          updateRequestStatus({
            requestId: id,
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
