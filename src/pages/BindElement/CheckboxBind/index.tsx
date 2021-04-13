import React from 'react';
import { useCheckboxBind } from 'Utils/CustomHooks';
import { Button, Checkbox, Col, Row } from 'antd';
import styles from './index.module.scss';

const list: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

const CheckboxBind: React.FC = (): JSX.Element => {
  const { selected, allSelected, isSelected, toggle, reverse, toggleAll, partiallySelected } = useCheckboxBind(list, [
    1
  ]);
  return (
    <div>
      <h1>Binding selected.</h1>
      <div>Selected: {selected.join(',')}</div>
      <div className={styles.checkFuncWrapper}>
        <Checkbox checked={allSelected} onClick={toggleAll} indeterminate={partiallySelected}>
          check all
        </Checkbox>
        <Button type='primary' onClick={reverse}>
          reverse
        </Button>
      </div>
      <Row className={styles.checkItemsWrapper}>
        {list.map((item: number) => (
          <Col span={12} key={item}>
            <Checkbox checked={isSelected(item)} onClick={() => toggle(item)}>
              {item}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CheckboxBind;
