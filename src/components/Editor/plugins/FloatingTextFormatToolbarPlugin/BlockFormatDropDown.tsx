import { LexicalEditor } from "lexical";
import * as React from "react";
import DropDown, { DropDownItem } from "../../../DropDown";
import joinClasses from "../../utils/joinClasses";
import { getBaseOptions } from "../BlockTypePickerPlugin";
import {
  BlockTypeToBlockName,
  blockTypeToBlockIcon,
  blockTypeToBlockName,
} from "./index";

export function BlockFormatDropDown({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: BlockTypeToBlockName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  const items = getBaseOptions(editor);

  return (
    <DropDown
      disabled={disabled}
      buttonClassName="popup-item spaced toolbar-item block-controls"
      buttonIcon={
        <span className="icon">{blockTypeToBlockIcon[blockType]}</span>
      }
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style"
    >
      {items.map((item) => (
        <DropDownItem
          key={item.key}
          className={joinClasses(
            "item ",
            blockType === item.key && "active dropdown-item-active"
          )}
          onClick={item.onSelect}
        >
          {item.icon}
          <span className="text">{item.key}</span>
        </DropDownItem>
      ))}
    </DropDown>
  );
}
