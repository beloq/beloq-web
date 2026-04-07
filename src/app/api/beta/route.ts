import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, platform } = body;

    if (!email || !platform) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Log for Vercel logs (accessible from dashboard)
    console.log(
      `[BETA TESTER] ${new Date().toISOString()} | ${email} | ${platform}`
    );

    // Send notification email
    await transporter.sendMail({
      from: `"Beloq Beta" <info@beloq.es>`,
      to: process.env.CONTACT_EMAIL || "jesusgracia@edify.es",
      subject: `[Beta] Nuevo tester: ${email} (${platform})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #3C3C3B; border-bottom: 3px solid #FFEC36; padding-bottom: 8px;">
            Nuevo tester registrado
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #3C3C3B; width: 120px;">Email</td>
              <td style="padding: 12px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #3C3C3B;">Plataforma</td>
              <td style="padding: 12px 0;">${platform}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #3C3C3B;">Fecha</td>
              <td style="padding: 12px 0;">${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; padding: 12px; background: #FFF9C4; border-radius: 8px; font-size: 13px;">
            <strong>Acción:</strong> Añadir <code>${email}</code> a
            ${platform.includes("Android") ? "Google Play Console (Internal Testing)" : ""}
            ${platform.includes("Android") && platform.includes("iOS") ? " y " : ""}
            ${platform.includes("iOS") ? "TestFlight" : ""}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error registrando beta tester:", error);
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
