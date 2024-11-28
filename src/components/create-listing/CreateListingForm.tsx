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
import React from "react";
import Link from "next/link";

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
  const [selectedDays, setSelectedDays] = React.useState<Day[]>([]);
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

  const handleDayToggle = (day: Day): void => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Advanced JavaScript Programming"
              className="mt-1.5"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what students will learn in your session..."
              className="mt-1.5 h-32"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange(value, "category")}
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
            <Label>Duration</Label>
            <RadioGroup
              value={formData.duration}
              onValueChange={(value) => handleSelectChange(value, "duration")}
              className="grid grid-cols-4 gap-4 mt-1.5"
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
            <Label>Language</Label>
            <Select
              value={formData.language}
              onValueChange={(value) => handleSelectChange(value, "language")}
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
            <Label>Available Days</Label>
            <div className="grid grid-cols-7 gap-2 mt-1.5">
              {days.map((day) => (
                <Button
                  key={day}
                  type="button"
                  className={`${
                    selectedDays.includes(day)
                      ? "border-blue-1 bg-sky-1 text-blue-1"
                      : "hover:bg-gray-50"
                  } w-full`}
                  onClick={() => handleDayToggle(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Time From</Label>
              <Select
                value={formData.timeFrom}
                onValueChange={(value) => handleSelectChange(value, "timeFrom")}
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
              <Label>Time To</Label>
              <Select
                value={formData.timeTo}
                onValueChange={(value) => handleSelectChange(value, "timeTo")}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="End time" />
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
          </div>

          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={formData.timezone}
              onValueChange={(value) => handleSelectChange(value, "timezone")}
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
            <Textarea
              id="prerequisites"
              placeholder="List any prerequisites or requirements for students..."
              className="mt-1.5"
              value={formData.prerequisites}
              onChange={handleInputChange}
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
        <Button type="submit" className="primary-btn">
          Create Listing
        </Button>
      </div>
    </form>
  );
};

export default CreateListingForm;
