import { ElementTransformer } from "@lexical/markdown";
import {
  $createHorizontalRuleNode,
  $isHorizontalRuleNode,
  HorizontalRuleNode,
} from "@lexical/react/LexicalHorizontalRuleNode";
import { LexicalNode } from "lexical";

export const HR_REG_EXP = /^(---|\*\*\*|___)[\s\n]?/;

export const HR: ElementTransformer = {
  regExp: HR_REG_EXP,

  dependencies: [HorizontalRuleNode],

  type: "element",

  export: (node: LexicalNode) => {
    return $isHorizontalRuleNode(node) ? "***" : null;
  },

  replace: (parentNode) => {
    const line = $createHorizontalRuleNode();
    parentNode.insertBefore(line);
    line.selectNext();
  },
};
