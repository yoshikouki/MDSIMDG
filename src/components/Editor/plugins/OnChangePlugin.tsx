"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import { OnChangePluginProps } from "../Editor";

export const OnChangePlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [editorState, setEditorState] = useState<string | null>(null);

  const onChange: OnChangePluginProps["onChange"] = (props) => {
    const editorStateJSON = props.editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  };

  // Wrap our listener in useEffect to handle the teardown and avoid stale references.
  useEffect(() => {
    // most listeners return a teardown function that can be called to clean them up.
    return editor.registerUpdateListener((props) => {
      // call onChange here to pass the latest state up to the parent.
      onChange(props);
    });
  }, [editor, onChange]);

  return null;
};
