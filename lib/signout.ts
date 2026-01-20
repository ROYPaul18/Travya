"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  revalidatePath(`/`);
  return { success: true };
}
