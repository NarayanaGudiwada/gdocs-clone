import { useCallback } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { jsPDF } from 'jspdf';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export type ExportFormat = 'pdf' | 'docx' | 'html';

export const useDocumentExport = () => {
  const exportDocument = useCallback(async (content: string, format: ExportFormat) => {
    try {
      const filename = `document-${new Date().toISOString().split('T')[0]}`;

      switch (format) {
        case 'pdf':
          const pdfContent = htmlToPdfmake(content);
          const docDefinition = { content: pdfContent };
          pdfMake.createPdf(docDefinition).download(`${filename}.pdf`);
          break;

        case 'docx':
          const doc = new Document({
            sections: [{
              properties: {},
              children: [
                new Paragraph({
                  children: [
                    new TextRun(content.replace(/<[^>]+>/g, ''))
                  ],
                }),
              ],
            }],
          });

          const buffer = await Packer.toBlob(doc);
          const docxUrl = URL.createObjectURL(buffer);
          const link = document.createElement('a');
          link.href = docxUrl;
          link.download = `${filename}.docx`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(docxUrl);
          break;

        case 'html':
          const styledContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                  line-height: 1.6;
                  max-width: 800px;
                  margin: 2rem auto;
                  padding: 0 1rem;
                }
                h1 { font-size: 2em; margin-bottom: 1rem; }
                h2 { font-size: 1.5em; margin-bottom: 0.8rem; }
                p { margin-bottom: 1rem; }
                blockquote {
                  border-left: 4px solid #e2e8f0;
                  margin-left: 0;
                  padding-left: 1rem;
                  color: #4a5568;
                }
              </style>
            </head>
            <body>
              ${content}
            </body>
            </html>
          `;
          const blob = new Blob([styledContent], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const htmlLink = document.createElement('a');
          htmlLink.href = url;
          htmlLink.download = `${filename}.html`;
          document.body.appendChild(htmlLink);
          htmlLink.click();
          document.body.removeChild(htmlLink);
          URL.revokeObjectURL(url);
          break;
      }

      // Show success message
      const message = document.createElement('div');
      message.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500';
      message.textContent = 'Document exported successfully';
      document.body.appendChild(message);
      
      setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => document.body.removeChild(message), 500);
      }, 2000);
    } catch (error) {
      console.error('Error exporting document:', error);
      
      // Show error message
      const message = document.createElement('div');
      message.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500';
      message.textContent = 'Error exporting document';
      document.body.appendChild(message);
      
      setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => document.body.removeChild(message), 500);
      }, 2000);
    }
  }, []);

  return { exportDocument };
};