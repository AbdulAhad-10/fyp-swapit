import { Badge, Clock, User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

interface CardProps {
  title: string;
  instructorName: string;
  duration: string;
  skillLevel: string;
  description: string;
  tags: string[];
  availability: string;
}

const ListingCard = (data: CardProps) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{data.title}</h3>
            <p className="text-sm text-gray-500">
              <User className="w-4 h-4 inline mr-1" />
              {data.instructorName}
            </p>
          </div>
          <Badge>{data.skillLevel}</Badge>
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
        <Button className="w-full">Request Session</Button>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
