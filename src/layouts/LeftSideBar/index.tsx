import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { rootSubmenuKeys, hookSubmenuList } from 'Routes/RouteConfig';
import { Arbitrary } from 'Src/types/replaceAny';
import styles from './index.module.scss';

const { SubMenu } = Menu;

const LeftSidebar: React.FunctionComponent = (): JSX.Element => {
  const [expandKeys, setExpandKeys] = useState<Array<string>>([
    window.sessionStorage.getItem('activeTab') || 'BindElement'
  ]);
  // * 默认选中的二级菜单，有则从 sessionStorage 中取得，没有则为重定向路由对应菜单。
  const [defaultSelectedKeys] = useState<Array<string>>([
    window.sessionStorage.getItem('activeTabItem') || 'InputBind'
  ]);
  // ? 控制一级展开路由的方法。
  const handleOpenChange = (keys: Arbitrary) => {
    // * 保存展开的一级菜单到 sessionStorage.
    window.sessionStorage.setItem('activeTab', keys.length > 1 ? keys[1] : keys[0]);
    // * 当前点击的一级菜单。
    const latestOpenKey = keys.find((key: string) => !expandKeys.includes(key));
    if (!rootSubmenuKeys.includes(latestOpenKey)) {
      setExpandKeys(keys);
    } else {
      setExpandKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  // ? 保存点击的二级菜单到 sessionStorage 的方法。
  const handleSelectItem = (item: Arbitrary) => {
    window.sessionStorage.setItem('activeTabItem', item.key);
  };
  return (
    <Menu
      className={styles.sidebarLeft}
      mode='inline'
      theme='dark'
      openKeys={expandKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      onOpenChange={handleOpenChange}
      onSelect={handleSelectItem}
    >
      <h1 className={styles.sidebarLeftTitle}>Example</h1>
      {hookSubmenuList.map(item => (
        <SubMenu key={item.name} title={item.name}>
          {item.children.map(childItem => (
            <Menu.Item key={childItem.name}>
              <Link to={childItem.path}>{childItem.name}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

export default LeftSidebar;
