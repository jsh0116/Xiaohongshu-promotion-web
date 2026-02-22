"use server";

import type { ActionResult } from "@shared/types";
import { isValidEmail } from "@entities/lead";

export async function submitLead(
  formData: FormData,
): Promise<ActionResult<void>> {
  const email = (formData.get("email") as string)?.trim();

  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Invalid email" };
  }

  return { ok: true };
}
