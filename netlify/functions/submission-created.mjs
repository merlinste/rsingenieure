// E-Mail-Benachrichtigung für Formular-Einsendungen (Termin & Kontakt).
//
// Netlify ruft diese Function automatisch nach jeder verifizierten
// Einsendung auf (Event-Trigger über den Dateinamen „submission-created").
// Als Spam markierte Einsendungen lösen sie nicht aus.
//
// Umgebungsvariablen (Netlify → Project configuration → Environment variables):
//   RESEND_API_KEY     Pflicht. API-Key von resend.com
//   FORM_NOTIFY_TO     Empfänger, mehrere durch Komma getrennt
//                      (Standard: info@rsingenieure.com)
//   FORM_NOTIFY_FROM   Absender, Domain muss in Resend verifiziert sein
//                      (Standard: R+S Website <website@rsingenieure.com>)

const DEFAULT_TO = "info@rsingenieure.com";
const DEFAULT_FROM = "R+S Website <website@rsingenieure.com>";

const FORM_LABELS = {
  termin: "Terminanfrage",
  kontakt: "Kontaktanfrage",
};

export const handler = async (event) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY fehlt — keine Benachrichtigung versendet.");
    return { statusCode: 500, body: "RESEND_API_KEY missing" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch (err) {
    console.error("Ungültiger Event-Body:", err);
    return { statusCode: 400, body: "Invalid payload" };
  }

  const formName = payload.form_name || "formular";
  const data = payload.data || {};
  const fields = (payload.ordered_human_fields || []).filter(
    (f) => f.name !== "bot-field"
  );

  const label = FORM_LABELS[formName] || `Einsendung „${formName}"`;
  const name = [data.vorname, data.nachname].filter(Boolean).join(" ") || "Unbekannt";
  const detail = formName === "termin" ? data.termin : data.anliegen;
  const subject = `Neue ${label}: ${name}${detail ? ` — ${detail}` : ""}`;

  const dashboardUrl = payload.form_id
    ? `https://app.netlify.com/projects/${payload.site_name || "rsingenieure"}/forms/${payload.form_id}`
    : null;

  const rows = fields
    .map(
      (f) =>
        `<tr><th align="left" valign="top" style="padding:6px 16px 6px 0;color:#666;font-weight:500;white-space:nowrap">${escapeHtml(f.title)}</th>` +
        `<td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(f.value) || "—"}</td></tr>`
    )
    .join("");

  const html =
    `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#222">` +
    `<p>Über <a href="${escapeHtml(payload.site_url || "https://rsingenieure.com")}">rsingenieure.com</a> ist eine neue ${escapeHtml(label)} eingegangen.</p>` +
    `<table cellspacing="0" cellpadding="0" style="border-collapse:collapse">${rows}</table>` +
    `<p style="margin-top:24px;color:#666;font-size:13px">Antworten auf diese E-Mail gehen direkt an ${escapeHtml(name)}.` +
    (dashboardUrl ? ` Alle Einsendungen: <a href="${dashboardUrl}">Netlify-Dashboard</a>.` : "") +
    `</p></div>`;

  const text =
    `Über rsingenieure.com ist eine neue ${label} eingegangen.\n\n` +
    fields.map((f) => `${f.title}: ${f.value || "—"}`).join("\n") +
    (dashboardUrl ? `\n\nAlle Einsendungen: ${dashboardUrl}` : "");

  const to = (process.env.FORM_NOTIFY_TO || DEFAULT_TO)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const email = {
    from: process.env.FORM_NOTIFY_FROM || DEFAULT_FROM,
    to,
    subject,
    html,
    text,
  };
  if (isEmail(data.email)) email.reply_to = data.email;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Verhindert doppelte Mails, falls Netlify das Event erneut zustellt.
      ...(payload.id ? { "Idempotency-Key": `netlify-submission-${payload.id}` } : {}),
    },
    body: JSON.stringify(email),
  });

  if (!res.ok) {
    console.error(`Resend-Fehler ${res.status}:`, await res.text());
    return { statusCode: 502, body: "Notification failed" };
  }

  return { statusCode: 200, body: "ok" };
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isEmail(value) {
  return typeof value === "string" && /^[^\s@<>,]+@[^\s@<>,]+\.[^\s@<>,]+$/.test(value);
}
