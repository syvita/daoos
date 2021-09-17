import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MvEditorMenu from "./MvEditorMenu";

const MvRichTextEditor: React.FC<{
  onChange: (payload: any) => void;
  onBlur: () => void;
  value: any;
}> = ({onChange,onBlur,value,...rest}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content:value,
    onBlur,
    onUpdate(){
        const json=this.getJson()
        onChange && onChange(json)
    }
  });
  return <div {...rest}>
      <MvEditorMenu editor={editor} />
      <EditorContent editor={editor} />
  </div>;
};

export default MvRichTextEditor;
