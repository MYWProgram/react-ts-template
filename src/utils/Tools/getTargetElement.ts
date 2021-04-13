import { MutableRefObject } from 'react';

export type BasicTarget<T = HTMLElement | Element | Document | Window> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>;
export type TargetElement = HTMLElement | Element | Document | Window;

/**
 * ? 接收 dom 或者 ref 返回可操作的 DOM 对象。
 * @param { HTMLElement | React.ref } target 目标 dom 或 ref.
 * @param { HTMLElement } defaultElement 默认的 dom.
 */
export const getTargetElement = (
  target?: BasicTarget,
  defaultElement?: TargetElement
): TargetElement | undefined | null => {
  if (!target) return defaultElement;
  return typeof target === 'function' ? target() : 'current' in target ? target.current : target;
};
