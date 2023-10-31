import { ChevronDown } from "lucide-react";
import * as React from "react";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type DropDownContextType = {
  registerItem: (ref: React.RefObject<HTMLButtonElement>) => void;
};

const DropDownContext = React.createContext<DropDownContextType | null>(null);

const dropDownPadding = 8;

export function DropDownItem({
  children,
  className,
  onClick,
  title,
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
  title?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const dropDownContext = React.useContext(DropDownContext);
  if (dropDownContext === null) {
    throw new Error("DropDownItem must be used within a DropDown");
  }
  const { registerItem } = dropDownContext;

  useEffect(() => {
    if (ref && ref.current) {
      registerItem(ref);
    }
  }, [ref, registerItem]);

  return (
    <button
      className={className}
      onClick={onClick}
      ref={ref}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
}

function DropDownItems({
  children,
  dropDownRef,
  onClose,
}: {
  children: React.ReactNode;
  dropDownRef: React.Ref<HTMLDivElement>;
  onClose: () => void;
}) {
  const [items, setItems] = useState<React.RefObject<HTMLButtonElement>[]>();
  const [highlightedItem, setHighlightedItem] =
    useState<React.RefObject<HTMLButtonElement>>();

  const registerItem = useCallback(
    (itemRef: React.RefObject<HTMLButtonElement>) => {
      setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]));
    },
    [setItems]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!items) return;

    const key = event.key;

    if (["Escape", "ArrowUp", "ArrowDown", "Tab"].includes(key)) {
      event.preventDefault();
    }

    if (key === "Escape" || key === "Tab") {
      onClose();
    } else if (key === "ArrowUp") {
      setHighlightedItem((prev) => {
        if (!prev) return items[0];
        const index = items.indexOf(prev) - 1;
        return items[index === -1 ? items.length - 1 : index];
      });
    } else if (key === "ArrowDown") {
      setHighlightedItem((prev) => {
        if (!prev) return items[0];
        return items[items.indexOf(prev) + 1];
      });
    }
  };

  const contextValue = useMemo(
    () => ({
      registerItem,
    }),
    [registerItem]
  );

  useEffect(() => {
    if (items && !highlightedItem) {
      setHighlightedItem(items[0]);
    }

    if (highlightedItem && highlightedItem.current) {
      highlightedItem.current.focus();
    }
  }, [items, highlightedItem]);

  return (
    <DropDownContext.Provider value={contextValue}>
      <div className="dropdown" ref={dropDownRef} onKeyDown={handleKeyDown}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
}

export default function DropDown({
  disabled = false,
  buttonLabel,
  buttonAriaLabel,
  buttonClassName,
  buttonIconClassName,
  children,
}: // isClosedOnSelection = true,
{
  disabled?: boolean;
  buttonAriaLabel?: string;
  buttonClassName: string;
  buttonIconClassName?: string;
  buttonLabel?: string;
  children: ReactNode;
  // isClosedOnSelection?: boolean;
}): JSX.Element {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const [showDropDown, setShowDropDown] = useState(false);

  const onClickOpenBtn = () => {
    setShowDropDown((prev) => !prev);
  };

  const onCloseDropDown = () => {
    setShowDropDown(false);
    openButtonRef.current?.focus();
  };

  const onScrollDropDown = () => {
    const openBtn = openButtonRef.current;
    const dropDown = dropDownRef.current;
    if (!(showDropDown && openBtn && dropDown)) return;

    const openBtnRect = openBtn.getBoundingClientRect();
    const top = openBtnRect.top + openBtn.offsetHeight + dropDownPadding;
    const left = Math.min(
      openBtnRect.left,
      window.innerWidth - dropDown.offsetWidth - 20
    );
    dropDown.style.top = `${top}px`;
    dropDown.style.left = `${left}px`;
  };

  const onClickDropdown = ({ target }: MouseEvent) => {
    if (dropDownRef.current?.contains(target as Node)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    onScrollDropDown();
    document.addEventListener("scroll", onScrollDropDown);
    if (showDropDown) {
      document.addEventListener("click", onClickDropdown);
    }
    return () => {
      document.removeEventListener("scroll", onScrollDropDown);
      if (showDropDown) {
        document.removeEventListener("click", onClickDropdown);
      }
    };
  }, [showDropDown]);

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        aria-label={buttonAriaLabel || buttonLabel}
        className={buttonClassName}
        onClick={onClickOpenBtn}
        ref={openButtonRef}
      >
        {buttonIconClassName && <span className={buttonIconClassName} />}
        {buttonLabel && (
          <span className="text dropdown-button-text">{buttonLabel}</span>
        )}
        <span className="icon">
          <ChevronDown size={16} />
        </span>
      </button>

      {showDropDown &&
        createPortal(
          <DropDownItems dropDownRef={dropDownRef} onClose={onCloseDropDown}>
            {children}
          </DropDownItems>,
          document.body
        )}
    </>
  );
}
