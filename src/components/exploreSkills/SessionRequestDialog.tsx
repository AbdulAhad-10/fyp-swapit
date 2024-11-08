import React from "react";
import { Calendar, Clock, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface SessionRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instructorName: string;
  skillTitle: string;
  availableDays: string[];
}

const SessionRequestDialog = ({
  open,
  onOpenChange,
  instructorName = "John Doe",
  skillTitle = "Public Speaking Basics",
}: SessionRequestDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Request Learning Session</DialogTitle>
          <DialogDescription>
            Schedule a session with your instructor. Select your preferred time
            from their availability.
          </DialogDescription>
        </DialogHeader>

        {/* Session Details */}
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Instructor:</span>
              <span className="font-medium text-foreground">
                {instructorName}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Course:{" "}
              <span className="font-medium text-foreground">{skillTitle}</span>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Pick a date</span>
            </Button>
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Time Slot</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose time slot" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="morning">Morning (9:00 AM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (2:00 PM)</SelectItem>
                <SelectItem value="evening">Evening (6:00 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Note to Instructor */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Note to Instructor (Optional)
            </label>
            <Textarea
              placeholder="Share what you'd like to focus on during the session..."
              className="resize-none"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <div className="text-sm text-muted-foreground">
            <Clock className="inline-block h-4 w-4 mr-1" />
            Duration: 45 minutes
          </div>
          <div className="flex gap-3">
            <Button
              className="secondary-btn"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button className="primary-btn" type="submit">
              Send Request
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionRequestDialog;
