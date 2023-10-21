"use client";

import React, { ComponentProps, FC, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "./AutoFocusPlugin";
import { OnChangePlugin } from "./OnChangePlugin";
import { UpdateListener } from "lexical/LexicalEditor";

const onError = (error: Error) => console.error(error);

type DefaultInitialConfig = ComponentProps<
  typeof LexicalComposer
>["initialConfig"];
const defaultInitialConfig: DefaultInitialConfig = {
  namespace: "MDSIMDG",
  onError,
};

export type RichTextPluginProps = ComponentProps<typeof RichTextPlugin>;
export type OnChangePluginProps = {
  onChange: UpdateListener;
};

export type EditorProps = {
  initialConfig?: DefaultInitialConfig;
  richTextPluginProps?: RichTextPluginProps;
  onChange?: OnChangePluginProps;
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

    const [editorState, setEditorState] = useState<string | null>(null);
    const onChange: OnChangePluginProps["onChange"] = (props) => {
      const editorStateJSON = props.editorState.toJSON();
      setEditorState(JSON.stringify(editorStateJSON));
    };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin {...richTextPluginProps} />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
};

export default Editor;
