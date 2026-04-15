"use server";

import { signInSchema, signUpSchema } from "@/lib/validations/auth";
import { z } from "zod";

export type FieldErrors = Record<string, string[] | undefined>;

export async function validateSignIn(
  formData: FormData,
): Promise<FieldErrors | null> {
  const result = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return result.success ? null : z.flattenError(result.error).fieldErrors;
}

export async function validateSignUp(
  formData: FormData,
): Promise<FieldErrors | null> {
  const result = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  return result.success ? null : z.flattenError(result.error).fieldErrors;
}
