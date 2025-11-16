import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Load redirect URL from config
  const configPath = path.join(process.cwd(), 'config.json');
  const { redirectURL } = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // Create PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  page.drawText('Your PDF is here!', {
    x: 50,
    y: 350,
    size: 24,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  // Add JavaScript for redirect
  const jsScript = `
    app.launchURL("${redirectURL}", true);
  `;
  pdfDoc.addJavaScript('redirect', jsScript);

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="redirect.pdf"',
    },
  });
}
