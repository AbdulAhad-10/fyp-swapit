"use client";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Constants
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

const MIN_SKILLS = 3;
const MAX_SKILLS = 5;

// Use consistent type with ProfilePage
type ProfileData = {
  bio: string;
  skills_can_teach: string[];
  skills_wants_to_learn: string[];
};

interface EditProfileModalProps {
  profile: ProfileData;
  onClose: () => void;
  onSave: (updatedProfile: ProfileData) => void;
  isSubmitting?: boolean;
}

export default function EditProfileModal({
  profile,
  onClose,
  onSave,
  isSubmitting = false,
}: EditProfileModalProps) {
  const [bio, setBio] = useState(profile.bio);
  const [skillsCanTeach, setSkillsCanTeach] = useState<string[]>(
    profile.skills_can_teach
  );
  const [skillsWantToLearn, setSkillsWantToLearn] = useState<string[]>(
    profile.skills_wants_to_learn
  );
  const [activeTab, setActiveTab] = useState("teach");
  const [bioCharCount, setBioCharCount] = useState(profile.bio.length);
  const [error, setError] = useState("");

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

  const handleSubmit = () => {
    setError("");

    if (bio.trim().length < 10) {
      setError("Bio must be at least 10 characters long");
      return;
    }

    if (skillsCanTeach.length < MIN_SKILLS) {
      setError(`Please select at least ${MIN_SKILLS} skills you can teach`);
      return;
    }

    if (skillsWantToLearn.length < MIN_SKILLS) {
      setError(`Please select at least ${MIN_SKILLS} skills you want to learn`);
      return;
    }

    onSave({
      bio,
      skills_can_teach: skillsCanTeach,
      skills_wants_to_learn: skillsWantToLearn,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-2">
              Bio
            </label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setBio(e.target.value);
                }
              }}
              placeholder="Tell us about yourself..."
              className="h-32 rounded-[8px]"
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

          <div>
            <h2 className="text-lg font-semibold mb-3">Edit Skill Domains</h2>

            <Tabs
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
                  Domains I Want to Learn ({skillsWantToLearn.length}/
                  {MAX_SKILLS})
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="teach"
                className="mt-0 border rounded-[8px] p-4"
              >
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
                      badgeClass +=
                        "border border-gray-200 hover:bg-sky-1 hover:text-white";
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
                    <Check size={16} className="inline mr-1" />
                    You&apos;ve selected {skillsCanTeach.length} domains to
                    teach
                  </p>
                )}
              </TabsContent>

              <TabsContent
                value="learn"
                className="mt-0 border rounded-[8px] p-4"
              >
                <div className="flex flex-wrap gap-2">
                  {SKILL_DOMAINS.map((skill) => {
                    const isSelected = skillsWantToLearn.includes(skill);
                    const isDisabled = skillsCanTeach.includes(skill);

                    let badgeClass = "px-3 py-1 cursor-pointer ";
                    if (isSelected) {
                      badgeClass +=
                        "bg-emerald-100 text-emerald-800 border border-emerald-200";
                    } else if (isDisabled) {
                      badgeClass +=
                        "bg-gray-200 text-gray-400 cursor-not-allowed";
                    } else {
                      badgeClass +=
                        "border border-gray-200 hover:bg-emerald-100 hover:text-emerald-800";
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
                            className="ml-2 text-emerald-800 hover:text-emerald-950"
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
                    <Check size={16} className="inline mr-1" />
                    You&apos;ve selected {skillsWantToLearn.length} domains to
                    learn
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <DialogFooter className="mt-6 flex gap-3">
          <Button variant="outline" onClick={onClose} className="secondary-btn">
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={
              bio.trim().length < 10 ||
              skillsCanTeach.length < MIN_SKILLS ||
              skillsWantToLearn.length < MIN_SKILLS ||
              isSubmitting
            }
            className="primary-btn"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
