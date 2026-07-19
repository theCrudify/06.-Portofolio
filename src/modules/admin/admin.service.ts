import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/database/mongodb";
import { AdminModel, type Admin } from "./admin.model";

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<Pick<Admin, "_id" | "email"> | null> {
  await connectToDatabase();

  const existingAdminCount = await AdminModel.countDocuments();

  if (existingAdminCount === 0) {
    const initialEmail = process.env.ADMIN_INITIAL_EMAIL;
    const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;

    if (
      !initialEmail ||
      !initialPassword ||
      email.trim().toLowerCase() !== initialEmail.trim().toLowerCase() ||
      password !== initialPassword
    ) {
      return null;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await AdminModel.create({
      email: initialEmail.trim().toLowerCase(),
      passwordHash,
    });
    return { _id: admin._id, email: admin.email };
  }

  const admin = await AdminModel.findOne({ email: email.trim().toLowerCase() }).lean<Admin>();
  if (!admin) {
    return null;
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    return null;
  }

  return { _id: admin._id, email: admin.email };
}
