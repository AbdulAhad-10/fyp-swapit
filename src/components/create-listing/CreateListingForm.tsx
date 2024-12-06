"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Type definitions
type Category =
  | "programming"
  | "design"
  | "business"
  | "marketing"
  | "communication"
  | "languages"
  | "music"
  | "other";
type Language =
  | "english"
  | "spanish"
  | "french"
  | "german"
  | "chinese"
  | "japanese";
type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
type TimeSlot = `${string}:00`;
type Timezone = "UTC-8" | "UTC-5" | "UTC+0" | "UTC+1" | "UTC+8";

interface FormData {
  title: string;
  description: string;
  category: Category | "";
  duration: "30" | "45" | "60" | "90" | "";
  language: Language | "";
  availableDays: Day[];
  timeFrom: TimeSlot | "";
  timeTo: TimeSlot | "";
  timezone: Timezone | "";
  prerequisites: string;
}

const CreateListingForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    title: "",
    description: "",
    category: "",
    duration: "",
    language: "",
    availableDays: [],
    timeFrom: "",
    timeTo: "",
    timezone: "",
    prerequisites: "",
  });

  const isFormValid = (): boolean => {
    return !!(
      formData.title.trim() &&
      formData.title.length <= 100 &&
      formData.description.trim() &&
      formData.description.length <= 500 &&
      formData.category &&
      formData.duration &&
      formData.language &&
      formData.availableDays.length > 0 &&
      formData.timeFrom &&
      formData.timeTo &&
      formData.timeFrom < formData.timeTo &&
      formData.timezone
    );
  };

  const handleDayToggle = (day: Day): void => {
    setFormData((prev) => {
      const newAvailableDays = prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day];

      return {
        ...prev,
        availableDays: newAvailableDays,
      };
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Validate form
    if (!isFormValid()) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a listing.",
        variant: "destructive",
      });
      return;
    }

    // Set submitting state
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/listings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response
        throw new Error(data.error || "Failed to create listing");
      }

      // Success toast
      toast({
        title: "Listing Created",
        description: "Your listing has been successfully created.",
      });

      // Redirect to my listings or dashboard
      router.push("/my-listings");
    } catch (error) {
      // Error handling
      console.error("Listing creation error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      // Reset submitting state
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { id, value, maxLength } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: maxLength ? value.slice(0, maxLength) : value,
    }));
  };

  const handleSelectChange = (value: string, field: keyof FormData): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const days: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeSlots: TimeSlot[] = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00` as TimeSlot
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Basic Information */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title" className="flex justify-between">
              <span>
                Title <span className="text-red-500">*</span>
              </span>
              <span className="text-sm text-gray-500">
                {formData.title.length}/100
              </span>
            </Label>
            <Input
              id="title"
              placeholder="e.g., Advanced JavaScript Programming"
              className="mt-1.5"
              value={formData.title}
              onChange={handleInputChange}
              maxLength={100}
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="flex justify-between">
              <span>
                Description <span className="text-red-500">*</span>
              </span>
              <span className="text-sm text-gray-500">
                {formData.description.length}/500
              </span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what students will learn in your session..."
              className="mt-1.5 h-32"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={500}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange(value, "category")}
                required
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="languages">Languages</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Details */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>
              Duration <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={formData.duration}
              onValueChange={(value) => handleSelectChange(value, "duration")}
              className="grid grid-cols-4 gap-4 mt-1.5"
              required
            >
              {[30, 45, 60, 90].map((mins) => (
                <Label
                  key={mins}
                  className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all
                ${
                  formData.duration === `${mins}`
                    ? "border-blue-1 bg-sky-1 text-blue-1"
                    : "hover:bg-gray-50"
                }`}
                >
                  <RadioGroupItem value={`${mins}`} className="sr-only" />
                  <span>{mins} mins</span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label>
              Language <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.language}
              onValueChange={(value) => handleSelectChange(value, "language")}
              required
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>
              Available Days <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-7 gap-2 mt-1.5">
              {days.map((day) => (
                <Button
                  key={day}
                  type="button"
                  className={`${
                    formData.availableDays.includes(day)
                      ? "border-blue-1 bg-sky-1 text-blue-1"
                      : "hover:bg-gray-50"
                  } w-full border`}
                  onClick={() => handleDayToggle(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>
                Time From <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.timeFrom}
                onValueChange={(value) => {
                  handleSelectChange(value, "timeFrom");
                  // Ensure time from is before time to
                  if (formData.timeTo && value >= formData.timeTo) {
                    handleSelectChange("", "timeTo");
                  }
                }}
                required
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Start time" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                Time To <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.timeTo}
                onValueChange={(value) => {
                  // Ensure time to is after time from
                  if (!formData.timeFrom || value > formData.timeFrom) {
                    handleSelectChange(value, "timeTo");
                  }
                }}
                required
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="End time" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {timeSlots
                    .filter(
                      (time) => !formData.timeFrom || time > formData.timeFrom
                    )
                    .map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="timezone">
              Timezone <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.timezone}
              onValueChange={(value) => handleSelectChange(value, "timezone")}
              required
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                <SelectItem value="UTC+0">UTC</SelectItem>
                <SelectItem value="UTC+1">
                  Central European Time (UTC+1)
                </SelectItem>
                <SelectItem value="UTC+8">Singapore Time (UTC+8)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Prerequisites & Materials */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Prerequisites</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="prerequisites" className="flex justify-between">
              <span>Prerequisites</span>
              <span className="text-sm text-gray-500">
                {formData.prerequisites.length}/300
              </span>
            </Label>
            <Textarea
              id="prerequisites"
              placeholder="List any prerequisites or requirements for students..."
              className="mt-1.5"
              value={formData.prerequisites}
              onChange={handleInputChange}
              maxLength={300}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button
          className="secondary-btn"
          variant="outline"
          type="button"
          asChild
        >
          <Link href="/my-listings">Cancel</Link>
        </Button>
        <Button
          type="submit"
          className="primary-btn"
          disabled={!isFormValid() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Creating...
            </>
          ) : (
            "Create Listing"
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateListingForm;
