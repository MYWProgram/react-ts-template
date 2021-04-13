import React from 'react';
import { useInputBind, Result } from 'Utils/CustomHooks';
import { Input } from 'antd';

const InputBind: React.FC = (): JSX.Element => {
  const inputProps: Result = useInputBind('Binding input with custom-hook useInputBind');
  return (
    <div>
      <h1>Binding input.</h1>
      <p>Value: {inputProps.value}</p>
      <Input type='text' {...inputProps} />
    </div>
  );
};

export default InputBind;
