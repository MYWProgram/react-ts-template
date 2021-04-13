import React, { Suspense } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LeftSidebar from 'Layouts/LeftSideBar/index';
import { routes } from 'Routes/index';
import styles from './index.module.scss';

const ComponentsDisplay: React.FunctionComponent = (): JSX.Element => {
  return (
    <div className={styles.App}>
      <Router>
        <LeftSidebar />
        <main className={styles.mainContentRight}>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              {routes.map(route => (
                <Route exact key={route.path} path={route.path} component={route.component} />
              ))}
              {/* 重定向路由。 */}
              <Redirect exact to='/BindElement/InputBind' from='/' />
            </Switch>
          </Suspense>
        </main>
      </Router>
    </div>
  );
};

export default ComponentsDisplay;
