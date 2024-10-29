import React from 'react';
import { Editor } from '@tiptap/react';
import { FileDown, FileText, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import HTMLtoDOCX from 'html-to-docx';

interface ExportMenuProps {
  editor: Editor;
}

const ExportMenu: React.FC<ExportMenuProps> = ({ editor }) => {
  const exportAsPDF = async () => {
    const element = document.querySelector('.ProseMirror');
    if (!element) return;
    
    const opt = {
      margin: 1,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const exportAsDocx = async () => {
    const content = editor.getHTML();
    
    try {
      const fileBuffer = await HTMLtoDOCX(content, null, {
        title: 'Document',
        margins: {
          top: 1440,
          right: 1440,
          bottom: 1440,
          left: 1440,
        },
      });
      
      const blob = new Blob([fileBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.docx';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting to DOCX:', error);
    }
  };

  const exportAsHTML = () => {
    const content = editor.getHTML();
    const blob = new Blob([content], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.html';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="relative group">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
        <FileDown className="w-4 h-4" />
        Export
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1">
          <button
            onClick={exportAsPDF}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export as PDF
          </button>
          <button
            onClick={exportAsDocx}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Export as DOCX
          </button>
          <button
            onClick={exportAsHTML}
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Export as HTML
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportMenu;