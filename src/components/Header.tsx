import React from 'react';
import { FileText } from 'lucide-react';
import { useDocumentExport } from '../hooks/useDocumentExport';
import ExportMenu from './ExportMenu';

interface HeaderProps {
  content: string;
}

const Header: React.FC<HeaderProps> = ({ content }) => {
  const { exportDocument } = useDocumentExport();

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">Docs Clone</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ExportMenu onExport={(format) => exportDocument(content, format)} />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Share
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;