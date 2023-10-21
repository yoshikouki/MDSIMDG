"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { OnChangePluginProps } from "./Editor";

export const OnChangePlugin = ({ onChange }: OnChangePluginProps) => {
  const [editor] = useLexicalComposerContext();

  // Wrap our listener in useEffect to handle the teardown and avoid stale references.
  useEffect(() => {
    // most listeners return a teardown function that can be called to clean them up.
    return editor.registerUpdateListener((props) => {
      // call onChange here to pass the latest state up to the parent.
      onChange(props);
    });
  }, [editor, onChange]);

  return null;
}
