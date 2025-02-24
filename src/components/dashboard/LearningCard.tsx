import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface LearningCardProps {
  learnImage: StaticImageData;
}

export const LearningCard: React.FC<LearningCardProps> = ({ learnImage }) => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-white rounded-[8px]">
      <CardHeader>
        <CardTitle>Keep Learning!</CardTitle>
        <CardDescription>
          Your journey to skill mastery starts here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={learnImage}
          alt="Learning Illustration"
          width={300}
          height={200}
          className="mx-auto"
        />
      </CardContent>
    </Card>
  );
};
