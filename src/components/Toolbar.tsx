import React from 'react';
import { Editor } from '@tiptap/react';
import { cn } from '../lib/utils';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Quote,
} from 'lucide-react';

interface ToolbarProps {
  editor: Editor;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b sticky top-0 bg-white z-10">
      <div className="flex flex-wrap gap-2 p-4">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            { 'bg-gray-100': editor.isActive('heading', { level: 1 }) }
          )}
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            { 'bg-gray-100': editor.isActive('heading', { level: 2 }) }
          )}
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-2" />
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
        <div className="w-px h-6 bg-gray-200 mx-2" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            { 'bg-gray-100': editor.isActive('bulletList') }
          )}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            { 'bg-gray-100': editor.isActive('orderedList') }
          )}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            { 'bg-gray-100': editor.isActive('blockquote') }
          )}
        >
          <Quote className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-2" />
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            { 'bg-gray-100': editor.isActive({ textAlign: 'left' }) }
          )}
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            { 'bg-gray-100': editor.isActive({ textAlign: 'center' }) }
          )}
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={cn(
            "p-2 rounded hover:bg-gray-100",
            { 'bg-gray-100': editor.isActive({ textAlign: 'right' }) }
          )}
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;