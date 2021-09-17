import React from "react";
import { camelcase } from "lodash.camelcase";
import { Editor } from "@tiptap/react";

import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    Code,
    LooksOne,
    LooksTwo,
    FormatQuote,
    FormatListNumbered,
    FormatListBulleted,
  } from "@emotion-icons/material";
  

const MvEditorMenuBtn: React.FC<{
  editor: Editor,
  type:string,
  icon: any
}> = ({ editor, type, icon }) => {
    const command=camelcase(`toggle${type}`)
  return (
    <span
      className={editor.isActive(type) ? "bg-indigo-800 text-purple-50" : ""}
      onClick={editor.chain().focus()[command]().run()}
    >
      {icon}
    </span>
  );
};


const MvEditorMenu:React.FC<{editor:Editor}>= ({editor}) => {
  return <div className='flex py-2'>
      <MvEditorMenu editor={editor} icon={FormatBold}  type='bold'  />
      <MvEditorMenu editor={editor} icon={FormatItalic}  type='italic'  />
  </div>;
};

export default MvEditorMenu;
