"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackData {
  rating: number;
  review: string;
}

export default function FeedbackPage() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Prevent going back
    history.pushState(null, "", location.href);
    const handlePopState = () => {
      history.pushState(null, "", location.href);
    };
    window.addEventListener("popstate", handlePopState);

    // Prevent leaving the page
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!rating || !review) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [rating, review]);

  const handleSubmit = async () => {
    try {
      setError("");

      if (rating === 0) {
        setError("Please provide a rating");
        return;
      }

      setIsSubmitting(true);

      const feedbackData: FeedbackData = {
        rating,
        review: review.trim(),
      };

      // Replace this with your actual API call
      // await submitFeedback(feedbackData);

      console.log("Feedback submitted:", feedbackData);

      // After successful submission
      router.push("/");
    } catch (err) {
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        const starNumber = index + 1;
        const isHovered = starNumber <= hoveredRating;
        const isSelected = starNumber <= rating;

        return (
          <Star
            key={index}
            className={cn(
              "w-8 h-8 cursor-pointer transition-colors",
              isHovered && "text-yellow-400 fill-yellow-400",
              !isHovered && isSelected && "text-yellow-400 fill-yellow-400",
              !isHovered && !isSelected && "text-gray-300"
            )}
            onMouseEnter={() => setHoveredRating(starNumber)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(starNumber)}
          />
        );
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white rounded-[8px]">
        <CardHeader>
          <CardTitle>Share Your Feedback</CardTitle>
          <CardDescription>
            Help us improve by sharing your experience with the session
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Rate your experience</label>
            <div
              className="flex gap-2"
              onMouseLeave={() => setHoveredRating(0)}
            >
              {renderStars()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {rating === 0
                ? "Select a rating"
                : `${rating} star${rating !== 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Share your thoughts about the session
            </label>
            <Textarea
              placeholder="What did you like? What could be improved?"
              className="min-h-[120px]"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Minimum 10 characters required
            </p>
          </div>

          <Button
            className="w-full primary-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
