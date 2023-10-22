"use client";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin as LexicalRichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import React from "react";
import { RichTextPluginProps } from "./Editor";

export const RichTextPlugin = (props?: Partial<RichTextPluginProps>) => {
  const richTextPluginProps: RichTextPluginProps = {
    contentEditable: <ContentEditable />,
    placeholder: <div>心に残っていることは何です？</div>,
    ErrorBoundary: LexicalErrorBoundary,
    ...props,
  };

  return <LexicalRichTextPlugin {...richTextPluginProps} />;
};
