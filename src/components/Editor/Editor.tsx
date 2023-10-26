"use client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin as LexicalRichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { UpdateListener } from "lexical/LexicalEditor";
import React, { ComponentProps, useState } from "react";
import Placeholder from "../Placeholder";
import "./Editor.css";
import { EditorProvider } from "./EditorProvider";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin";
import { OnChangePlugin } from "./plugins/OnChangePlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";

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
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <EditorProvider initialConfig={initialConfig}>
      <div className="editor-shell">
        <div className="editor-container">
          <LexicalRichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" ref={onRef}>
                  <ContentEditable />
                </div>
              </div>
            }
            placeholder={
              <Placeholder>心に残っていることはありますか？</Placeholder>
            }
            ErrorBoundary={LexicalErrorBoundary}
            {...richTextPluginProps}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TabIndentationPlugin />
          <OnChangePlugin />

          <MarkdownShortcutPlugin />
          <AutoLinkPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <TablePlugin hasCellMerge={true} hasCellBackgroundColor={false} />
          {floatingAnchorElem && (
            <>
              <FloatingTextFormatToolbarPlugin
                anchorElem={floatingAnchorElem}
              />
            </>
          )}
        </div>
      </div>
    </EditorProvider>
  );
};

export default Editor;
