"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// General skill domains/categories
const SKILL_DOMAINS = [
  "Technology & Programming",
  "Business & Entrepreneurship",
  "Creative Arts",
  "Languages & Communication",
  "Health & Wellness",
  "Science & Research",
  "Digital Media & Marketing",
  "Education & Teaching",
  "Personal Development",
  "Music & Performance",
  "Design & Visual Arts",
  "Writing & Literature",
  "Engineering & Architecture",
  "Finance & Economics",
  "Social Sciences",
  "Sports & Athletics",
  "Environmental Studies",
  "Food & Culinary Arts",
  "Mathematics & Analytics",
  "Leadership & Management",
];

// Constants for skill limits
const MIN_SKILLS = 3;
const MAX_SKILLS = 5;

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [skillsCanTeach, setSkillsCanTeach] = useState<string[]>([]);
  const [skillsWantToLearn, setSkillsWantToLearn] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bioCharCount, setBioCharCount] = useState(0);
  const [activeTab, setActiveTab] = useState("teach");

  useEffect(() => {
    setBioCharCount(bio.length);
  }, [bio]);

  const toggleSkillToTeach = (skill: string) => {
    if (skillsWantToLearn.includes(skill)) {
      setSkillsWantToLearn(skillsWantToLearn.filter((s) => s !== skill));
    }

    if (skillsCanTeach.includes(skill)) {
      setSkillsCanTeach(skillsCanTeach.filter((s) => s !== skill));
    } else {
      if (skillsCanTeach.length < MAX_SKILLS) {
        setSkillsCanTeach([...skillsCanTeach, skill]);
      }
    }
  };

  const toggleSkillToLearn = (skill: string) => {
    if (skillsCanTeach.includes(skill)) {
      setSkillsCanTeach(skillsCanTeach.filter((s) => s !== skill));
    }

    if (skillsWantToLearn.includes(skill)) {
      setSkillsWantToLearn(skillsWantToLearn.filter((s) => s !== skill));
    } else {
      if (skillsWantToLearn.length < MAX_SKILLS) {
        setSkillsWantToLearn([...skillsWantToLearn, skill]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (bio.trim().length < 10) {
      setError("Bio must be at least 10 characters long");
      setIsSubmitting(false);
      return;
    }

    if (skillsCanTeach.length < MIN_SKILLS) {
      setError(`Please select at least ${MIN_SKILLS} skills you can teach`);
      setIsSubmitting(false);
      return;
    }

    if (skillsWantToLearn.length < MIN_SKILLS) {
      setError(`Please select at least ${MIN_SKILLS} skills you want to learn`);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/users/profile/complete/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          bio,
          skills_can_teach: skillsCanTeach,
          skills_wants_to_learn: skillsWantToLearn,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log("response", data);
        throw new Error(data.error || "Failed to complete profile");
      }

      router.push("/");
      router.refresh();
    } catch (error: any) {
      setError(error.message || "Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
      <p className="text-gray-600 mb-8">
        Please provide some information about your skill domains and interests
        to help others connect with you.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label htmlFor="bio" className="block text-sm font-medium mb-2">
            Bio (Tell us about yourself)
          </label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setBio(e.target.value);
              }
            }}
            placeholder="I'm passionate about..."
            className="h-32"
            maxLength={500}
          />
          <p className="text-sm text-gray-500 mt-1 flex justify-between">
            <span>
              Min 10 characters. Share your interests, background, or what
              motivates you.
            </span>
            <span className={bioCharCount > 480 ? "text-red-500" : ""}>
              {bioCharCount}/500
            </span>
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Select Your Skill Domains
          </h2>
          <p className="text-gray-600 mb-3">
            Choose at least {MIN_SKILLS} and up to {MAX_SKILLS} skill domains
            you can teach and want to learn. You can specify your exact skills
            later.
          </p>

          <Tabs
            defaultValue="teach"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-4 bg-gray-100 rounded-[8px]">
              <TabsTrigger
                value="teach"
                className="data-[state=active]:text-blue-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-1"
              >
                Domains I Can Teach ({skillsCanTeach.length}/{MAX_SKILLS})
              </TabsTrigger>
              <TabsTrigger
                value="learn"
                className="data-[state=active]:text-blue-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-1"
              >
                Domains I Want to Learn ({skillsWantToLearn.length}/{MAX_SKILLS}
                )
              </TabsTrigger>
            </TabsList>

            <TabsContent value="teach" className="mt-0">
              <Card className="p-4">
                <div className="flex flex-wrap gap-2">
                  {SKILL_DOMAINS.map((skill) => {
                    const isSelected = skillsCanTeach.includes(skill);
                    const isDisabled = skillsWantToLearn.includes(skill);

                    let badgeClass = "px-3 py-1 cursor-pointer ";
                    if (isSelected) {
                      badgeClass += "bg-sky-1";
                    } else if (isDisabled) {
                      badgeClass +=
                        "bg-gray-200 text-gray-400 cursor-not-allowed";
                    } else {
                      badgeClass += "border border-gray-200 hover:bg-sky-1";
                    }

                    return (
                      <Badge
                        key={skill}
                        className={badgeClass}
                        onClick={() => !isDisabled && toggleSkillToTeach(skill)}
                      >
                        {skill}
                        {isSelected && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSkillToTeach(skill);
                            }}
                            className="ml-2 text-primary-foreground hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        )}
                        {isDisabled && (
                          <span className="ml-1 text-xs">(learning)</span>
                        )}
                      </Badge>
                    );
                  })}
                </div>
                {skillsCanTeach.length >= MIN_SKILLS && (
                  <p className="text-green-600 mt-3 text-sm">
                    ✓ You've selected {skillsCanTeach.length} domains to teach
                  </p>
                )}
                <Button
                  type="button"
                  className="mt-4"
                  onClick={() => setActiveTab("learn")}
                  disabled={skillsCanTeach.length < MIN_SKILLS}
                >
                  Next: Select Domains to Learn
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="learn" className="mt-0">
              <Card className="p-4">
                <div className="flex flex-wrap gap-2">
                  {SKILL_DOMAINS.map((skill) => {
                    const isSelected = skillsWantToLearn.includes(skill);
                    const isDisabled = skillsCanTeach.includes(skill);

                    let badgeClass = "px-3 py-1 cursor-pointer ";
                    if (isSelected) {
                      badgeClass += "bg-sky-1";
                    } else if (isDisabled) {
                      badgeClass +=
                        "bg-gray-200 text-gray-400 cursor-not-allowed";
                    } else {
                      badgeClass += "border border-gray-200 hover:bg-sky-1";
                    }

                    return (
                      <Badge
                        key={skill}
                        className={badgeClass}
                        onClick={() => !isDisabled && toggleSkillToLearn(skill)}
                      >
                        {skill}
                        {isSelected && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSkillToLearn(skill);
                            }}
                            className="ml-2 text-primary-foreground hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        )}
                        {isDisabled && (
                          <span className="ml-1 text-xs">(teaching)</span>
                        )}
                      </Badge>
                    );
                  })}
                </div>
                {skillsWantToLearn.length >= MIN_SKILLS && (
                  <p className="text-green-600 mt-3 text-sm">
                    ✓ You've selected {skillsWantToLearn.length} domains to
                    learn
                  </p>
                )}
                <Button
                  type="button"
                  className="mt-4"
                  onClick={() => setActiveTab("teach")}
                >
                  Back to Domains to Teach
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Button
          type="submit"
          className="w-full primary-btn"
          disabled={
            isSubmitting ||
            bio.trim().length < 10 ||
            skillsCanTeach.length < MIN_SKILLS ||
            skillsWantToLearn.length < MIN_SKILLS
          }
        >
          {isSubmitting ? "Completing Profile..." : "Complete Profile"}
        </Button>
      </form>
    </div>
  );
}
