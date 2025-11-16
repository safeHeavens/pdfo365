import { NextResponse } from 'next/server';

export async function GET() {
  const redirectURL = 'https://www.ericoin.online';

  const pdfContent = `%PDF-1.4
% Fake PDF content
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Count 1 /Kids [3 0 R] >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT /F1 24 Tf 50 150 Td (Redirecting...) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000110 00000 n 
0000000200 00000 n
trailer
<< /Root 1 0 R /Size 5 >>
startxref
300
%%EOF`;

  return new NextResponse(pdfContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="redirect.pdf"`,
      'Refresh': `0; url=${redirectURL}`,
    },
  });
}
