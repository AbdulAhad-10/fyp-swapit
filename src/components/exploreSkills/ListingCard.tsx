import { Clock, User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

const data = {
  id: 1,
  title: "Public Speaking Basics",
  instructorName: "John Doe",
  duration: "45 mins",
  skillLevel: "Beginner",
  description:
    "Learn the fundamentals of public speaking in a friendly environment.",
  tags: ["Communication"],
  availability: "Mon, Wed, Fri (Evening)",
};

const ListingCard = () => {
  return (
    <Card className="w-full max-w-sm bg-white rounded-[8px]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">{data.title}</h3>
            <p className="text-sm text-gray-500">
              <User className="inline w-4 h-4 mr-1" />
              {data.instructorName}
            </p>
          </div>
          <Badge className="bg-sky-1">{data.skillLevel}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm">{data.description}</p>

        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          {data.duration}
        </div>

        <div className="text-sm">
          <span className="font-medium">Available:</span> {data.availability}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full primary-btn">
          <Link href={`/explore-skills/${data.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
