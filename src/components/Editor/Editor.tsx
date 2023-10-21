"use client";

import React, { ComponentProps, FC } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "./AutoFocusPlugin";

const onError = (error: Error) => console.error(error);

type DefaultInitialConfig = ComponentProps<
  typeof LexicalComposer
>["initialConfig"];
const defaultInitialConfig: DefaultInitialConfig = {
  namespace: "MDSIMDG",
  onError,
};

type RichTextPluginProps = ComponentProps<typeof RichTextPlugin>;

export type EditorProps = {
  initialConfig?: DefaultInitialConfig;
  richTextPluginProps?: RichTextPluginProps;
};

const Editor: React.FC = (editorProps: EditorProps) => {
  const initialConfig = {
    ...defaultInitialConfig,
    ...editorProps.initialConfig,
  };

  const richTextPluginProps: RichTextPluginProps = {
    contentEditable: <ContentEditable />,
    placeholder: <div>心に残っていることは何です？</div>,
    ErrorBoundary: LexicalErrorBoundary,
    ...editorProps.richTextPluginProps,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin {...richTextPluginProps} />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
};

export default Editor;
