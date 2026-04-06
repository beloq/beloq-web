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
    const { nombre, email, tipo, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: `"Beloq Web" <info@beloq.es>`,
      to: process.env.CONTACT_EMAIL || "jesusgracia@edify.es",
      replyTo: email,
      subject: `[beloq.es] Contacto de ${nombre} (${tipo})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #3C3C3B; border-bottom: 3px solid #FFEC36; padding-bottom: 8px;">
            Nuevo contacto desde beloq.es
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #3C3C3B;">Nombre</td><td>${nombre}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #3C3C3B;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #3C3C3B;">Tipo</td><td>${tipo}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #F5F5F5; border-radius: 8px;">
            <strong style="color: #3C3C3B;">Mensaje:</strong>
            <p style="margin-top: 8px; white-space: pre-wrap;">${mensaje}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviando email:", error);
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
