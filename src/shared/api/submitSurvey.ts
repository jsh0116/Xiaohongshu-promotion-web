"use server";

import type { ActionResult } from "@shared/types";
import { logger } from "@shared/lib/logger";

export async function submitSurvey(
  email: string,
  userType: string,
  surveyResponse: string,
): Promise<ActionResult<void>> {
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
        email,
        userType,
        surveyResponse,
      ];

      logger.log("[submitSurvey] Saving:", { email, userType, surveyResponse });

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1",
        valueInputOption: "RAW",
        requestBody: { values: [rowData] },
      });
    } catch (err) {
      logger.error("[submitSurvey] Sheets error:", err);
    }
  }

  return { ok: true };
}
