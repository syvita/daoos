import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import MvEditorMenu from "./MvEditorMenu";
import Link from '@tiptap/extension-link'

const MvRichTextEditor: React.FC<{
  onChange: (payload: any) => void;
  onBlur: () => void;
  value: any;
  className: string;
}> = ({ onChange, onBlur, value, className }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose  prose-lg sm:prose-sm lg:prose-lg w-full xl:prose-xl m-1 focus:outline-none",
      },
    },
    onBlur,
    onUpdate: ({ editor }) => {
      //console.log(editor.getHTML());
      onChange && onChange(editor.getHTML());
      
    },
  });
  return (
    <>
      <MvEditorMenu editor={editor} />
      <EditorContent className={className} editor={editor} />
    </>
  );
};

export default MvRichTextEditor;
