import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface ExploreSkillsCardProps {
  exploreImage: StaticImageData;
}

export const ExploreSkillsCard: React.FC<ExploreSkillsCardProps> = ({
  exploreImage,
}) => {
  return (
    <Card className="bg-white rounded-[8px]">
      <CardHeader>
        <CardTitle>Explore Skills</CardTitle>
        <CardDescription>Discover new skills to learn or teach</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={exploreImage}
          alt="explore skills"
          width={300}
          height={200}
        />
        <Button className="w-full primary-btn" asChild>
          <a href="/explore-skills">Explore Skills</a>
        </Button>
      </CardContent>
    </Card>
  );
};
