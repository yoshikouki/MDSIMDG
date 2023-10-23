"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import React from "react";
import { InitialConfig } from "./Editor";
import Nodes from "./Nodes";

type Props = {
  initialConfig?: InitialConfig;
  children: JSX.Element | string | (JSX.Element | string)[];
};

const defaultInitialConfig: InitialConfig = {
  namespace: "MDSIMDG",
  onError: (error: Error) => console.error(error),
  nodes: Nodes,
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
