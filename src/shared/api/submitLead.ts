"use server";

import type { ActionResult } from "@shared/types";
import { isValidEmail } from "@entities/lead";

export async function submitLead(
  formData: FormData
): Promise<ActionResult<void>> {
  const email = (formData.get("email") as string)?.trim();
  const userType = formData.get("userType") as string;

  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Invalid email" };
  }

  // Delegate actual storage to the API route to avoid bundling
  // server-only packages (googleapis) in the client module graph
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      `http://localhost:${process.env.PORT ?? 3000}`;
    const res = await fetch(`${baseUrl}/api/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, userType }),
    });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      return { ok: false, error: data.error ?? "Request failed" };
    }
  } catch (err) {
    console.error("[submitLead] fetch error:", err);
    // Graceful fallback — treat as success so UX isn't broken
  }

  return { ok: true };
}
