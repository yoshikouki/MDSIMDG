"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  LexicalEditor,
} from "lexical";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { getSelectedNode } from "../utils/getSelectedNode";

const setPlaceholderPosition = (
  targetElem: HTMLElement | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement
): void => {
  if (!targetElem) {
    floatingElem.style.opacity = "0";
    floatingElem.style.transform = "translate(-10000px, -10000px)";
    return;
  }

  const targetRect = targetElem.getBoundingClientRect();
  const targetStyle = window.getComputedStyle(targetElem);
  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();

  const top =
    targetRect.top +
    (parseInt(targetStyle.lineHeight, 10) - floatingElemRect.height) / 2 -
    anchorElementRect.top;

  floatingElem.style.opacity = "1";
  floatingElem.style.transform = `translate(0, ${top}px)`;
};

const useParagraphPlaceholder = (
  editor: LexicalEditor,
  anchorElem: HTMLElement,
  isEditable: boolean
): JSX.Element => {
  const placeholderRef = useRef<HTMLDivElement>(null);

  const hidePlaceholder = () => {
    if (!placeholderRef.current) {
      return;
    }
    placeholderRef.current.style.opacity = "0";
  };

  useEffect(() => {
    const updatePlaceholder = () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection) || !placeholderRef.current) {
        return;
      }
      const node = getSelectedNode(selection);
      const rootElement = editor.getRootElement();
      const isNotFirstNode = rootElement && rootElement.childElementCount > 1;
      const isEmptyParagraph =
        $isParagraphNode(node) && node.getTextContentSize() == 0;
      if (isNotFirstNode && isEmptyParagraph) {
        const element = editor.getElementByKey(node.getKey());
        setPlaceholderPosition(element, placeholderRef.current, anchorElem);
      } else {
        hidePlaceholder();
      }
    };

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(updatePlaceholder);
    });
  }, [editor]);

  return createPortal(
    <div
      className="Placeholder__root"
      ref={placeholderRef}
      style={{ opacity: 0 }}
    >
      スペースを押してメニューを開く
    </div>,
    anchorElem
  );
};

export const ParagraphPlaceholderPlugin = ({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  return useParagraphPlaceholder(editor, anchorElem, editor._editable);
};
