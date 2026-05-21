import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { COHORT_0 } from "./bootcamp";

export interface CertificateData {
  studentName: string;
  projectName: string;
  projectSlug: string;
  software: string;
  cohortNumber: string;
  id: string;
}

export async function generateCertificatePdf(cert: CertificateData): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();

  // A4 portrait in points
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const black = rgb(0.07, 0.07, 0.07);
  const gray = rgb(0.48, 0.48, 0.48);
  const hairline = rgb(0.82, 0.82, 0.82);

  const pad = 52;

  // Top border line
  page.drawLine({
    start: { x: pad, y: height - pad },
    end: { x: width - pad, y: height - pad },
    thickness: 0.5, color: black,
  });

  // Bottom border line
  page.drawLine({
    start: { x: pad, y: pad },
    end: { x: width - pad, y: pad },
    thickness: 0.5, color: black,
  });

  // Studio label
  page.drawText("FORASTERO STUDIO", {
    x: pad, y: height - pad - 22,
    size: 7, font: regular, color: gray,
  });

  // CERTIFICADO
  page.drawText("CERTIFICADO", {
    x: pad, y: height - 210,
    size: 38, font: bold, color: black,
  });

  // Subtitle
  page.drawText("BOOTCAMP CAD→BIM", {
    x: pad, y: height - 240,
    size: 9, font: regular, color: gray,
  });

  // Hairline rule
  page.drawLine({
    start: { x: pad, y: height - 275 },
    end: { x: width - pad, y: height - 275 },
    thickness: 0.5, color: hairline,
  });

  // "Se certifica que"
  page.drawText("Se certifica que", {
    x: pad, y: height - 330,
    size: 10, font: regular, color: gray,
  });

  // Student name — clamp to 32 chars to avoid overflow
  const displayName = cert.studentName.length > 34
    ? cert.studentName.slice(0, 34) + "…"
    : cert.studentName;

  page.drawText(displayName, {
    x: pad, y: height - 380,
    size: 30, font: regular, color: black,
  });

  // Body text
  const lines = [
    `completó las 8 semanas del Bootcamp CAD→BIM de Forastero Studio,`,
    `trabajando sobre el proyecto ${cert.projectName} con ${cert.software},`,
    `con validación IFC aprobada en cada semana.`,
  ];

  lines.forEach((line, i) => {
    page.drawText(line, {
      x: pad, y: height - 445 - i * 20,
      size: 10.5, font: regular, color: black,
    });
  });

  // Cohort
  page.drawText(`${cert.cohortNumber} · ${COHORT_0.dateLabel}`, {
    x: pad, y: height - 530,
    size: 8, font: regular, color: gray,
  });

  // Hairline rule
  page.drawLine({
    start: { x: pad, y: height - 565 },
    end: { x: width - pad, y: height - 565 },
    thickness: 0.5, color: hairline,
  });

  // Verification block
  page.drawText("ID DE VERIFICACIÓN", {
    x: pad, y: height - 600,
    size: 7, font: regular, color: gray,
  });

  page.drawText(cert.id.toUpperCase(), {
    x: pad, y: height - 618,
    size: 7.5, font: regular, color: black,
  });

  page.drawText(`forastero-lms.vercel.app/verify/${cert.id}`, {
    x: pad, y: height - 636,
    size: 7, font: regular, color: gray,
  });

  const bytes = await pdfDoc.save();
  return Buffer.from(bytes);
}
