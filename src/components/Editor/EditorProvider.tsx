"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import React from "react";
import { InitialConfig } from "./Editor";
import nodes from "./nodes";
import { theme } from "./theme";

type Props = {
  initialConfig?: InitialConfig;
  children: JSX.Element | string | (JSX.Element | string)[];
};

const defaultInitialConfig: InitialConfig = {
  namespace: "MDSIMDG",
  onError: (error: Error) => {
    console.error(error);
    throw error;
  },
  nodes,
  theme,
};

export const EditorProvider = (props: Props) => {
  const initialConfig = {
    ...defaultInitialConfig,
    ...props.initialConfig,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {props.children}
    </LexicalComposer>
  );
};
