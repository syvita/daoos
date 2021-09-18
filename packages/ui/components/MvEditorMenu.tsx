import React, { Children } from "react";
import camelCase from "lodash.camelcase";
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
  InsertLink,
  LinkOff,
} from "@emotion-icons/material";
import { classNames } from "../lib/utils";

const MvEditorMenuBtn: React.FC<{
  editor: Editor;
  type: string;
  noToggle?: string;
  className?: any;
  attributes?: Record<string, unknown>;
  action?: (payload: any) => void;
}> = ({ editor, type, children, noToggle, attributes, action, className }) => {
  const command = camelCase(noToggle) || camelCase(`toggle-${type}`);

  return (
    <div
      className={classNames(
        editor.isActive(type, attributes) ? "text-gray-600" : "text-gray-300",
        className
      )}
      onClick={
        action
          ? action
          : () => editor.chain().focus()[command](attributes).run()
      }
    >
      {children}
    </div>
  );
};

const MvEditorMenu: React.FC<{ editor: Editor }> = ({ editor }) => {
  const setLink = (editor) => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return editor ? (
    <div className="flex flex-wrap space-y-4 space-x-4 pb-4 my-4 border-b">
      <MvEditorMenuBtn className="mt-4" editor={editor} type="bold">
        <FormatBold className="h-5 w-5" />
      </MvEditorMenuBtn>
      <MvEditorMenuBtn editor={editor} type="italic">
        <FormatItalic className="h-5 w-5" />
      </MvEditorMenuBtn>
      <MvEditorMenuBtn editor={editor} type="underline">
        <FormatUnderlined className="h-5 w-5" />
      </MvEditorMenuBtn>
      <MvEditorMenuBtn editor={editor} type="code">
        <Code className="h-5 w-5" />
      </MvEditorMenuBtn>
      <MvEditorMenuBtn editor={editor} attributes={{ level: 1 }} type="heading">
        <LooksOne className="h-5 w-5" />
      </MvEditorMenuBtn>
      <MvEditorMenuBtn editor={editor} attributes={{ level: 2 }} type="heading">
        <LooksTwo className="h-5 w-5" />
      </MvEditorMenuBtn>
      <MvEditorMenuBtn editor={editor} type="blockquote">
        <FormatQuote className="h-5 w-5" />
      </MvEditorMenuBtn>
      <MvEditorMenuBtn editor={editor} type="orderedList">
        <FormatListNumbered className="h-5 w-5" />
      </MvEditorMenuBtn>
      <MvEditorMenuBtn editor={editor} type="bulletList">
        <FormatListBulleted className="h-5 w-5" />
      </MvEditorMenuBtn>
      <MvEditorMenuBtn
        action={() => setLink(editor)}
        editor={editor}
        type="link"
      >
        <InsertLink className="h-5 w-5" />
      </MvEditorMenuBtn>
      <MvEditorMenuBtn editor={editor} noToggle="unset-link" type="link">
        <LinkOff className="h-5 w-5" />
      </MvEditorMenuBtn>
    </div>
  ) : (
    <></>
  );
};

export default MvEditorMenu;
