/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const VERTICAL_GAP = 16;
const HORIZONTAL_OFFSET = 16;

export function setFloatingElemPosition(
  targetRect: DOMRect | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement,
  isLink = false,
  verticalGap: number = VERTICAL_GAP,
  horizontalOffset: number = HORIZONTAL_OFFSET
): void {
  const scrollerElem = anchorElem.parentElement;

  if (targetRect === null || !scrollerElem) {
    floatingElem.style.opacity = "0";
    floatingElem.style.transform = "translate(-10000px, -10000px)";
    return;
  }

  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();
  const editorScrollerRect = scrollerElem.getBoundingClientRect();

  let top = targetRect.bottom + verticalGap;
  let left = targetRect.left;

  if (editorScrollerRect.bottom < top + floatingElemRect.height) {
    top = targetRect.top - floatingElemRect.height - verticalGap;
  }

  if (editorScrollerRect.right < left + floatingElemRect.width) {
    left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset;
  }

  top -= anchorElementRect.top;
  left -= anchorElementRect.left;

  floatingElem.style.opacity = "0.97";
  floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}
