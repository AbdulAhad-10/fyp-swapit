import React, { useState } from "react";
import { Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SessionRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  duration: string;
  creatorId: string;
}

const initialValues = {
  dateTime: new Date(),
  note: "",
};

const SessionRequestDialog = ({
  open,
  onOpenChange,
  duration,
  creatorId,
}: SessionRequestDialogProps) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = () => {
    console.log({
      selectedDateTime: values.dateTime.toLocaleString(),
      formattedDate: values.dateTime.toLocaleDateString(),
      formattedTime: values.dateTime.toLocaleTimeString(),
      optionalNote: values.note,
      creatorId: creatorId,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Request Learning Session
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Select your preferred time and add any specific topics you&apos;d
            like to cover.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Note to Instructor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Note to Instructor (Optional)
            </label>
            <Textarea
              value={values.note}
              onChange={(e) => setValues({ ...values, note: e.target.value })}
              placeholder="Share what you'd like to focus on during the session..."
              className="resize-none min-h-[80px] p-3 border border-gray-300"
              rows={3}
            />
          </div>

          {/* Date and Time Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Date and Time
            </label>
            <div className="relative">
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                wrapperClassName="w-full"
                calendarClassName="border border-gray-200 rounded-md shadow-lg"
                shouldCloseOnSelect={true}
                autoFocus={false}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between border-t pt-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="inline-block h-4 w-4 mr-1" />
            {` Duration: ${duration} minutes`}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="secondary-btn hover:secondary-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="primary-btn hover:primary-btn"
            >
              Send Request
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionRequestDialog;
