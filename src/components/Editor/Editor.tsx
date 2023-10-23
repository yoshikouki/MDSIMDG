"use client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin as LexicalRichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { UpdateListener } from "lexical/LexicalEditor";
import React, { ComponentProps } from "react";
import "./Editor.css";
import { EditorProvider } from "./EditorProvider";
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin";
import { OnChangePlugin } from "./plugins/OnChangePlugin";
import { RichTextPlugin } from "./plugins/RichTextPlugin";

export type InitialConfig = ComponentProps<
  typeof LexicalComposer
>["initialConfig"];
export type RichTextPluginProps = ComponentProps<typeof LexicalRichTextPlugin>;
export type OnChangePluginProps = {
  onChange: UpdateListener;
};

export type EditorProps = {
  initialConfig?: InitialConfig;
  richTextPluginProps?: RichTextPluginProps;
  onChange?: OnChangePluginProps;
};

const Editor: React.FC = ({
  initialConfig,
  richTextPluginProps,
}: EditorProps) => {
  return (
    <EditorProvider initialConfig={initialConfig}>
      <div className="editor-shell">
        <div className="editor-container">
          <RichTextPlugin {...richTextPluginProps} />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <OnChangePlugin />

          <MarkdownShortcutPlugin />
        </div>
      </div>
    </EditorProvider>
  );
};

export default Editor;
