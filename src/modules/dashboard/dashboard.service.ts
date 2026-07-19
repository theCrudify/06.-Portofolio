import { connectToDatabase } from "@/lib/database/mongodb";
import { ProjectModel } from "@/modules/projects/project.model";
import { SkillModel } from "@/modules/skills/skill.model";
import { ExperienceModel } from "@/modules/experiences/experience.model";
import { EducationModel } from "@/modules/education/education.model";
import { AchievementModel } from "@/modules/achievements/achievement.model";
import { ContactMessageModel } from "@/modules/contact/contact-message.model";

export type DashboardStats = {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalSkills: number;
  totalExperiences: number;
  totalEducation: number;
  totalAchievements: number;
  unreadMessages: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  await connectToDatabase();

  const [
    totalProjects,
    publishedProjects,
    draftProjects,
    totalSkills,
    totalExperiences,
    totalEducation,
    totalAchievements,
    unreadMessages,
  ] = await Promise.all([
    ProjectModel.countDocuments({ deletedAt: null }),
    ProjectModel.countDocuments({ status: "published", deletedAt: null }),
    ProjectModel.countDocuments({ status: "draft", deletedAt: null }),
    SkillModel.countDocuments(),
    ExperienceModel.countDocuments(),
    EducationModel.countDocuments(),
    AchievementModel.countDocuments(),
    ContactMessageModel.countDocuments({ status: "new" }),
  ]);

  return {
    totalProjects,
    publishedProjects,
    draftProjects,
    totalSkills,
    totalExperiences,
    totalEducation,
    totalAchievements,
    unreadMessages,
  };
}
