"use server";

import type { ActionResult } from "@shared/types";
import { isValidEmail } from "@entities/lead";

export async function submitLead(
  formData: FormData,
): Promise<ActionResult<void>> {
  const email = (formData.get("email") as string)?.trim();
  const userType = formData.get("userType") as string;
  const surveyResponse = formData.get("surveyResponse") as string | null;

  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Invalid email" };
  }

  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (serviceEmail && privateKey && sheetId) {
    try {
      const { google } = await import(/* webpackIgnore: true */ "googleapis");
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: serviceEmail,
          private_key: privateKey.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      const sheets = google.sheets({ version: "v4", auth });

      const rowData = [
        new Date().toISOString(),
        email.trim(),
        userType,
        surveyResponse || "-",
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1",
        valueInputOption: "RAW",
        requestBody: {
          values: [rowData],
        },
      });
    } catch (err) {
      // Graceful fallback — treat as success so UX isn't broken
    }
  } else {
  }

  return { ok: true };
}
