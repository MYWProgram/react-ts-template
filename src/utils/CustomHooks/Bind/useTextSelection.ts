import { useState, useEffect, useRef } from 'react';
import { getTargetElement, BasicTarget } from 'Utils/Tools/getTargetElement';
import { message } from 'antd';

interface IRect {
  top: number;
  left: number;
  bottom: number;
  right: number;
  height: number;
  width: number;
}
export interface IState extends IRect {
  text: string;
}

const initRect: IRect = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 0,
  width: 0
};
const initState: IState = {
  text: '',
  ...initRect
};

const getRectFromSelection = (selection: Selection | null): IRect => {
  if (!selection) {
    return initRect;
  }
  if (selection.rangeCount < 1) {
    return initRect;
  }
  const range = selection.getRangeAt(0);
  const { height, width, top, left, right, bottom } = range.getBoundingClientRect();
  return {
    height,
    width,
    top,
    left,
    right,
    bottom
  };
};

/**
 * ? 动态绑定用户选择信息。
 * @param { HTMLElement | Reeact.ref } target DOM 节点或者 Refs.
 * @return { Object }
 */
const useTextSelection = (target?: BasicTarget): IState => {
  const [state, setState] = useState<IState>(initState);
  const stateRef = useRef<IState>(state);
  stateRef.current = state;
  useEffect(() => {
    // * 获取 target 需要放在 useEffect 里，否则存在组件未加载好的情况会导致元素获取不到。
    const el = getTargetElement(target, document);
    if (!el) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }
    const mouseupHandler = () => {
      let selObj: Selection | null = null;
      let text = '';
      let rect = initRect;
      if (!window.getSelection) {
        message.warn('您使用的浏览器暂不支持 getSelection');
        return;
      }
      selObj = window.getSelection();
      text = selObj ? selObj.toString() : '';
      if (text) {
        rect = getRectFromSelection(selObj);
        setState({ ...state, text, ...rect });
      }
    };
    // * 任意点击都需要清空之前的 range.
    const mousedownHandler = () => {
      if (!window.getSelection) {
        message.warn('您使用的浏览器暂不支持 getSelection');
        return;
      }
      if (stateRef.current.text) {
        setState({ ...initState });
      }
      const selObj = window.getSelection();
      if (!selObj) return;
      selObj.removeAllRanges();
    };
    el.addEventListener('mouseup', mouseupHandler);
    document.addEventListener('mousedown', mousedownHandler);
    return () => {
      el.removeEventListener('mouseup', mouseupHandler);
      document.removeEventListener('mousedown', mousedownHandler);
    };
  }, [target, state]);
  return state;
};

export default useTextSelection;
