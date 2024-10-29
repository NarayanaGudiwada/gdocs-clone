import React from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { cn } from './lib/utils';
import Toolbar from './components/Toolbar';
import ExportMenu from './components/ExportMenu';
import { 
  Bold, 
  Italic, 
  FileText
} from 'lucide-react';

function App() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start typing...',
      }),
    ],
    content: '<h1>Welcome to the Docs Clone</h1><p>Start typing to create your document...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none max-w-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">Docs Clone</h1>
            </div>
            <div className="flex items-center space-x-4">
              <ExportMenu editor={editor} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Editor */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg min-h-[calc(100vh-12rem)]">
          {/* Toolbar */}
          <Toolbar editor={editor} />

          {/* Bubble Menu */}
          {editor && (
            <BubbleMenu className="bg-white shadow-lg border rounded-lg p-2 flex space-x-2" editor={editor}>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn(
                  "p-2 rounded hover:bg-gray-100",
                  { 'bg-gray-100': editor.isActive('bold') }
                )}
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn(
                  "p-2 rounded hover:bg-gray-100",
                  { 'bg-gray-100': editor.isActive('italic') }
                )}
              >
                <Italic className="w-4 h-4" />
              </button>
            </BubbleMenu>
          )}

          {/* Editor Content */}
          <EditorContent editor={editor} />
        </div>
      </main>
    </div>
  );
}

export default App;