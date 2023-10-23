"use client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin as LexicalRichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { UpdateListener } from "lexical/LexicalEditor";
import React, { ComponentProps } from "react";
import "./Editor.css";
import { EditorProvider } from "./EditorProvider";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
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
          <AutoLinkPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <TablePlugin hasCellMerge={true} hasCellBackgroundColor={false} />
        </div>
      </div>
    </EditorProvider>
  );
};

export default Editor;
