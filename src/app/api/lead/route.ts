import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, userType } = body as { email: string; userType: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (serviceEmail && privateKey && sheetId) {
      const { google } = await import("googleapis");
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: serviceEmail,
          private_key: privateKey.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      const sheets = google.sheets({ version: "v4", auth });
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:C",
        valueInputOption: "RAW",
        requestBody: {
          values: [[new Date().toISOString(), email.trim(), userType]],
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/lead]", err);
    return NextResponse.json({ ok: true }); // graceful no-op
  }
}
