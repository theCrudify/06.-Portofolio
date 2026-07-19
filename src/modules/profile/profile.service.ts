import { connectToDatabase } from "@/lib/database/mongodb";
import type { ProfileInput } from "@/lib/validation/profile";
import { ProfileModel, type Profile } from "./profile.model";

export async function getProfile(): Promise<Profile | null> {
  await connectToDatabase();
  return ProfileModel.findOne({ isPublished: true }).lean<Profile>();
}

export async function getProfileForAdmin(): Promise<Profile | null> {
  await connectToDatabase();
  return ProfileModel.findOne().lean<Profile>();
}

export async function upsertProfile(input: ProfileInput): Promise<void> {
  await connectToDatabase();
  const statistics = input.statistics.map((statistic, index) => ({
    ...statistic,
    order: index + 1,
  }));
  await ProfileModel.findOneAndUpdate(
    {},
    { ...input, statistics },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}
