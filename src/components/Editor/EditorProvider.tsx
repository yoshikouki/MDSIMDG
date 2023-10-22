"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import React from "react";
import { InitialConfig } from "./Editor";

type Props = {
  initialConfig?: InitialConfig;
  children: JSX.Element | string | (JSX.Element | string)[];
};

const defaultInitialConfig: InitialConfig = {
  namespace: "MDSIMDG",
  onError: (error: Error) => console.error(error),
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
