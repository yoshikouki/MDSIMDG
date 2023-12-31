import { $createCodeNode } from "@lexical/code";
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { INSERT_EMBED_COMMAND } from "@lexical/react/LexicalAutoEmbedPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { INSERT_TABLE_COMMAND } from "@lexical/table";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  TextNode,
} from "lexical";
import {
  Code2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListTodo,
  Pilcrow,
  Quote,
  SplitSquareVertical,
  Table2,
} from "lucide-react";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import * as ReactDOM from "react-dom";
import useModal from "../../../../hooks/useModal";
import joinClasses from "../../utils/joinClasses";
import { EmbedConfigs } from "../AutoEmbedPlugin";
// import { InsertImageDialog } from "../ImagesPlugin";

const iconSize = 20;
const strokeWidth = 2;

class BlockTypePickerOption extends MenuOption {
  // What shows up in the editor
  title: string;
  // Icon for display
  icon?: JSX.Element;
  // For extra searching.
  keywords: Array<string>;
  // TBD
  keyboardShortcut?: string;
  // What happens when you select this option?
  onSelect: (queryString?: string) => void;

  constructor(
    title: string,
    options: {
      icon?: JSX.Element;
      keywords?: Array<string>;
      keyboardShortcut?: string;
      onSelect: (queryString: string) => void;
    }
  ) {
    super(title);
    this.title = title;
    this.keywords = options.keywords || [];
    this.icon = options.icon;
    this.keyboardShortcut = options.keyboardShortcut;
    this.onSelect = options.onSelect.bind(this);
  }
}

function getDynamicOptions(editor: LexicalEditor, queryString: string) {
  const options: Array<BlockTypePickerOption> = [];

  if (queryString == null) {
    return options;
  }

  const tableMatch = queryString.match(/^([1-9]\d?)(?:x([1-9]\d?)?)?$/);

  if (tableMatch !== null) {
    const rows = tableMatch[1];
    const colOptions = tableMatch[2]
      ? [tableMatch[2]]
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(String);

    options.push(
      ...colOptions.map(
        (columns) =>
          new BlockTypePickerOption(`${rows}x${columns} Table`, {
            icon: (
              <span className="icon">
                <Table2 size={iconSize} strokeWidth={strokeWidth} />
              </span>
            ),
            keywords: ["table"],
            onSelect: () =>
              editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns, rows }),
          })
      )
    );
  }

  return options;
}

type ShowModal = ReturnType<typeof useModal>[1];

export function getBaseOptions(
  editor: LexicalEditor
  // showModal: ShowModal
) {
  return [
    new BlockTypePickerOption("Paragraph", {
      icon: (
        <span className="icon">
          <Pilcrow size={iconSize} strokeWidth={strokeWidth} />
        </span>
      ),
      keywords: ["normal", "paragraph", "p", "text"],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createParagraphNode());
          }
        }),
    }),

    new BlockTypePickerOption(`Heading 1`, {
      icon: (
        <span className="icon">
          <Heading1 size={iconSize} strokeWidth={strokeWidth} />
        </span>
      ),
      keywords: ["heading", "header", `h1`],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(`h1`));
          }
        }),
    }),

    new BlockTypePickerOption(`Heading 2`, {
      icon: (
        <span className="icon">
          <Heading2 size={iconSize} strokeWidth={strokeWidth} />
        </span>
      ),
      keywords: ["heading", "header", `h2`],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(`h2`));
          }
        }),
    }),

    new BlockTypePickerOption(`Heading 3`, {
      icon: (
        <span className="icon">
          <Heading3 size={iconSize} strokeWidth={strokeWidth} />
        </span>
      ),
      keywords: ["heading", "header", `h3`],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(`h3`));
          }
        }),
    }),

    new BlockTypePickerOption("Numbered List", {
      icon: (
        <span className="icon">
          <ListOrdered size={iconSize} strokeWidth={strokeWidth} />
        </span>
      ),
      keywords: ["numbered list", "ordered list", "ol"],
      onSelect: () =>
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined),
    }),

    new BlockTypePickerOption("Bulleted List", {
      icon: (
        <span className="icon">
          <List size={iconSize} strokeWidth={strokeWidth} />
        </span>
      ),
      keywords: ["bulleted list", "unordered list", "ul"],
      onSelect: () =>
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
    }),

    new BlockTypePickerOption("Check List", {
      icon: (
        <span className="icon">
          <ListTodo size={iconSize} strokeWidth={strokeWidth} />
        </span>
      ),
      keywords: ["check list", "todo list"],
      onSelect: () =>
        editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined),
    }),

    new BlockTypePickerOption("Quote", {
      icon: (
        <span className="icon">
          <Quote size={iconSize} strokeWidth={strokeWidth} />
        </span>
      ),
      keywords: ["block quote"],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createQuoteNode());
          }
        }),
    }),

    new BlockTypePickerOption("Code", {
      icon: (
        <span className="icon">
          <Code2 size={iconSize} strokeWidth={strokeWidth} />
        </span>
      ),
      keywords: ["javascript", "python", "js", "codeblock"],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            if (selection.isCollapsed()) {
              $setBlocksType(selection, () => $createCodeNode());
            } else {
              const textContent = selection.getTextContent();
              const codeNode = $createCodeNode();
              selection.insertNodes([codeNode]);
              selection.insertRawText(textContent);
            }
          }
        }),
    }),

    new BlockTypePickerOption("Divider", {
      icon: (
        <span className="icon">
          <SplitSquareVertical size={iconSize} strokeWidth={strokeWidth} />
        </span>
      ),
      keywords: ["horizontal rule", "divider", "hr"],
      onSelect: () =>
        editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined),
    }),

    ...EmbedConfigs.map(
      (embedConfig) =>
        new BlockTypePickerOption(`Embed ${embedConfig.contentName}`, {
          icon: embedConfig.icon,
          keywords: [...embedConfig.keywords, "embed"],
          onSelect: () =>
            editor.dispatchCommand(INSERT_EMBED_COMMAND, embedConfig.type),
        })
    ),

    // new BlockTypePickerOption("Table", {
    //   icon: (
    //     <span className="icon">
    //       <Table2 size={iconSize} strokeWidth={strokeWidth} />
    //     </span>
    //   ),
    //   keywords: ["table", "grid", "spreadsheet", "rows", "columns"],
    //   onSelect: () =>
    //     showModal("Insert Table", (onClose) => (
    //       <InsertTableDialog activeEditor={editor} onClose={onClose} />
    //     )),
    // }),

    // new BlockTypePickerOption("Image", {
    //   icon: (
    //     <span className="icon">
    //       <Image size={iconSize} strokeWidth={strokeWidth} />
    //     </span>
    //   ),
    //   keywords: ["image", "photo", "picture", "file"],
    //   onSelect: () =>
    //     showModal("Insert Image", (onClose) => (
    //       <InsertImageDialog activeEditor={editor} onClose={onClose} />
    //     )),
    // }),

    // new BlockTypePickerOption(`Align left`, {
    //   icon: (
    //     <span className="icon">
    //       <AlignLeft size={iconSize} strokeWidth={strokeWidth} />
    //     </span>
    //   ),
    //   keywords: ["align", "justify", "left"],
    //   onSelect: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left"),
    // }),

    // new BlockTypePickerOption(`Align center`, {
    //   icon: (
    //     <span className="icon">
    //       <AlignCenter size={iconSize} strokeWidth={strokeWidth} />
    //     </span>
    //   ),
    //   keywords: ["align", "justify", "center"],
    //   onSelect: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center"),
    // }),

    // new BlockTypePickerOption(`Align right`, {
    //   icon: (
    //     <span className="icon">
    //       <AlignRight size={iconSize} strokeWidth={strokeWidth} />
    //     </span>
    //   ),
    //   keywords: ["align", "justify", "right"],
    //   onSelect: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right"),
    // }),

    // new BlockTypePickerOption(`Align justify`, {
    //   icon: (
    //     <span className="icon">
    //       <AlignJustify size={iconSize} strokeWidth={strokeWidth} />
    //     </span>
    //   ),
    //   keywords: ["align", "justify", "justify"],
    //   onSelect: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify"),
    // }),
  ];
}

export default function BlockTypePickerMenuPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [modal, showModal] = useModal();
  const [queryString, setQueryString] = useState<string | null>(null);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("\\s", {
    minLength: 0,
  });

  const options = useMemo(() => {
    const baseOptions = getBaseOptions(editor);

    if (!queryString) {
      return baseOptions;
    }

    const regex = new RegExp(queryString, "i");

    return [
      ...getDynamicOptions(editor, queryString),
      ...baseOptions.filter(
        (option) =>
          regex.test(option.title) ||
          option.keywords.some((keyword) => regex.test(keyword))
      ),
    ];
  }, [editor, queryString, showModal]);

  const onSelectOption = useCallback(
    (
      selectedOption: BlockTypePickerOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string
    ) => {
      editor.update(() => {
        nodeToRemove?.remove();
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor]
  );

  return (
    <>
      {modal}
      <LexicalTypeaheadMenuPlugin<BlockTypePickerOption>
        onQueryChange={setQueryString}
        onSelectOption={onSelectOption}
        triggerFn={checkForTriggerMatch}
        options={options}
        menuRenderFn={(
          anchorElementRef,
          { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
        ) =>
          anchorElementRef.current && options.length
            ? ReactDOM.createPortal(
                <div className="typeahead-popover component-picker-menu">
                  <ul>
                    {options.map((option, i: number) => {
                      const isSelected = selectedIndex === i;
                      return (
                        <li
                          key={option.key}
                          tabIndex={-1}
                          className={joinClasses(
                            "item",
                            isSelected ? "selected" : ""
                          )}
                          ref={option.setRefElement}
                          role="option"
                          aria-selected={isSelected}
                          id={"typeahead-item-" + i}
                          onClick={() => {
                            setHighlightedIndex(i);
                            selectOptionAndCleanUp(option);
                          }}
                          onMouseEnter={() => {
                            setHighlightedIndex(i);
                          }}
                        >
                          {option.icon}
                          <span className="text">{option.title}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>,
                anchorElementRef.current
              )
            : null
        }
      />
    </>
  );
}
