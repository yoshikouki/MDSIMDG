"use client";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin as LexicalRichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React from "react";
import { RichTextPluginProps } from "../Editor";
import Placeholder from "../../Placeholder";

export const RichTextPlugin = (props?: Partial<RichTextPluginProps>) => {
  const richTextPluginProps: RichTextPluginProps = {
    contentEditable: (
      <div className="editor-scroller">
        <div
          className="editor"
          // ref={onRef}
        >
          <ContentEditable />
        </div>
      </div>
    ),
    placeholder: <Placeholder>心に残っていることはありますか？</Placeholder>,
    ErrorBoundary: LexicalErrorBoundary,
    ...props,
  };

  return <LexicalRichTextPlugin {...richTextPluginProps} />;
};
