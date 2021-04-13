import { lazy } from 'react';

export const routes = [
  {
    path: '/BindElement/InputBind',
    component: lazy(() => import(/* webpackChunkName: "useInputBind" */ 'Pages/BindElement/InputBind'))
  },
  {
    path: '/BindElement/CheckboxBind',
    component: lazy(() => import(/* webpackChunkName: "useCheckboxBind" */ 'Pages/BindElement/CheckboxBind'))
  },
  {
    path: '/BindElement/TextSelectionBind',
    component: lazy(() => import(/* webpackChunkName: "useTextSelection" */ 'Pages/BindElement/TextSelectionBind'))
  }
];
