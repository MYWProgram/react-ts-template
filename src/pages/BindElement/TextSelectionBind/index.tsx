import React, { useState, useEffect } from 'react';
import { useTextSelection, IState } from 'Utils/CustomHooks';

const TextSelectionBind: React.FC = (): JSX.Element => {
  const { text, top, left, bottom, right, height, width }: IState = useTextSelection();
  const [popVisible, setPopVisible] = useState<boolean>(false);
  useEffect(() => {
    if (text.trim() === '') {
      setPopVisible(false);
      return;
    }
    setPopVisible(true);
  }, [text, popVisible]);
  return (
    <div>
      <h1>Binding user selection.</h1>
      <p>You can select text over all page.</p>
      <p>
        text: {text} <br />
        width: {width} <br />
        height: {height} <br />
        top: {top} <br />
        right: {right} <br />
        bottom: {bottom} <br />
        left: {left} <br />
      </p>
    </div>
  );
};

export default TextSelectionBind;
