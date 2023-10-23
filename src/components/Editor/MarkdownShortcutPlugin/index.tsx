"use client";

import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
  Transformer,
} from "@lexical/markdown";
import { MarkdownShortcutPlugin as LexicalMarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import * as React from "react";
import { HR } from "./transformers/hr";
import { TABLE } from "./transformers/table";

export const TRANSFORMERS: Array<Transformer> = [
  TABLE,
  HR,
  CHECK_LIST,
  ...ELEMENT_TRANSFORMERS,
  ...TEXT_FORMAT_TRANSFORMERS,
  ...TEXT_MATCH_TRANSFORMERS,
];

export default function MarkdownShortcutPlugin(): JSX.Element {
  return <LexicalMarkdownShortcutPlugin transformers={TRANSFORMERS} />;
}
