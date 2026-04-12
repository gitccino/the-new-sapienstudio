"use server";

import { signInSchema, signUpSchema } from "@/lib/validations/auth";
import { z } from "zod";

export type FieldErrors = Partial<Record<string, string[]>>;

export async function validateSignIn(formData: FormData): Promise<FieldErrors | null> {
  const result = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  return result.success ? null : z.flattenError(result.error).fieldErrors;
}

export async function validateSignUp(formData: FormData): Promise<FieldErrors | null> {
  const result = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  return result.success ? null : z.flattenError(result.error).fieldErrors;
}
