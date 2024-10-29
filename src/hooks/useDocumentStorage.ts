import { useCallback } from 'react';

export const useDocumentStorage = () => {
  const saveDocument = useCallback((content: string) => {
    try {
      // Create a Blob with the HTML content
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `document-${new Date().toISOString().split('T')[0]}.html`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Show success message
      const message = document.createElement('div');
      message.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500';
      message.textContent = 'Document downloaded successfully';
      document.body.appendChild(message);
      
      setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => document.body.removeChild(message), 500);
      }, 2000);
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  }, []);

  const loadDocument = useCallback(() => {
    return '<h1>Welcome to the Docs Clone</h1><p>Start typing to create your document...</p>';
  }, []);

  return { saveDocument, loadDocument };
};