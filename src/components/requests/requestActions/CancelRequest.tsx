import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { removeRequest } from "@/store/requestsSlice";
import { apiDelete } from "@/utils/api";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CancelRequest = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleCancel = async () => {
    try {
      setIsLoading(true);
      const response = await apiDelete(`/api/requests/cancel/${id}`);

      if (response.error) {
        throw new Error(response.error);
      }

      dispatch(removeRequest({ requestId: id }));

      // Call the callback function if provided
    } catch (error) {
      console.error("Error cancelling request:", error);
      // You might want to show an error toast/notification here
      toast({
        title: "Error",
        description: "Failed to cancel request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={handleCancel}
      className="secondary-btn hover:secondary-btn"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          Cancelling...
        </>
      ) : (
        <>
          <X className="h-4 w-4 mr-1" />
          Cancel Request
        </>
      )}
    </Button>
  );
};

export default CancelRequest;
