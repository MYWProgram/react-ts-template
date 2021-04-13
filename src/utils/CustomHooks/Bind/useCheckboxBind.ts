import { useState, useMemo } from 'react';
import subtraction from 'Utils/Tools/subtraction';

/**
 * ? 将 checkbox 的被选中项进行动态绑定等。
 * @param { Array } items 备选项数组。
 * @param { Array } defaultSelected 默认选中项。
 * @return { Object }
 */
const useCheckboxBind = <T>(items: T[], defaultSelected: T[] = []) => {
  const [selected, setSelected] = useState<T[]>(defaultSelected);
  const { selectedSet, isSelected, select, unSelect, toggle } = useMemo(() => {
    // * 使用 set 数据结构保存被选中的项，保证选中项不重复性。
    const selectedSet = new Set<T>(selected);
    const isSelected = (item: T) => selectedSet.has(item);
    const select = (item: T) => {
      selectedSet.add(item);
      // * 由于使用 Set 来保存被选中项，因此 Set.prototype.add/delete 之后需要用"..."操作符转换为数组。
      return setSelected([...selectedSet]);
    };
    const unSelect = (item: T) => {
      selectedSet.delete(item);
      return setSelected([...selectedSet]);
    };
    // ? 勾选/取消勾选的逻辑函数。
    const toggle = (item: T) => {
      if (isSelected(item)) {
        unSelect(item);
      } else {
        select(item);
      }
    };
    return { selectedSet, isSelected, select, unSelect, toggle };
  }, [selected]);
  const { reverse, selectAll, unSelectAll, noneSelected, allSelected, partiallySelected, toggleAll } = useMemo(() => {
    const reverse = () => {
      setSelected(subtraction([...selectedSet], items));
    };
    // ? 全选 / 取消全选，只需要遍历每一项进行全添加 / 全删除操作即可。
    const selectAll = () => {
      items.forEach(o => {
        selectedSet.add(o);
      });
      setSelected([...selectedSet]);
    };
    const unSelectAll = () => {
      items.forEach(o => {
        selectedSet.delete(o);
      });
      setSelected([...selectedSet]);
    };
    const noneSelected = items.every(o => !selectedSet.has(o));
    const allSelected = items.every(o => selectedSet.has(o)) && !noneSelected;
    // * 部分选择标志变量，由上面的全不选/全选来进行控制。
    const partiallySelected = !noneSelected && !allSelected;
    const toggleAll = () => (allSelected ? unSelectAll() : selectAll());
    return { reverse, selectAll, unSelectAll, noneSelected, allSelected, partiallySelected, toggleAll };
  }, [selectedSet, items]);
  return {
    /**
     * * selected	已经选择的元素	array
     * * isSelected	是否被选择	boolean
     * * select	选择元素	() => void
     * * unSelect	取消选择元素	() => void
     * * reverse 反选元素 () => void
     * * toggle	勾选/取消勾选元素	() => void
     * * selectAll	选择全部元素	() => void
     * * unSelectAll	取消选择全部元素	() => void
     * * toggleAll	反选全部元素	() => void
     * * allSelected	是否全选	boolean
     * * noneSelected	是否一个都没有选择	boolean
     * * partiallySelected	是否半选	boolean
     * * setSelected	设置选择的元素	() => void
     */
    selected,
    isSelected,
    select,
    unSelect,
    toggle,
    reverse,
    selectAll,
    unSelectAll,
    toggleAll,
    allSelected,
    noneSelected,
    partiallySelected,
    setSelected
  } as const;
};

export default useCheckboxBind;
