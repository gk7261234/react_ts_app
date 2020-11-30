import { BrowserRouter, Route, Redirect } from "react-router-dom";
import routes from "@/router";
import React from "react";
import { Suspense } from "react";
interface Props {
  redirect?: string | undefined;
  path: string | undefined;
  component?: React.FunctionComponent<any>;
  key: string | number;
  title: string;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App(): JSX.Element {
  const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/task" : "";

  let Routes: any[] = [];
  const RouteItem = (props: Props): JSX.Element => {
    const { redirect, path, component, key, title } = props;
    if (redirect) {
      return <Redirect exact={true} key={key} from={path} to={redirect} />;
    }
    return <Route exact={true} key={key} component={component} path={path} title={title} />;
  };
  // tslint:disable-next-line:variable-name
  const loopRoute = (route: any, i: number, prePath?: string) => {
    return route.children.forEach((routeChild: any, idx: number) => {
      // tslint:disable-next-line:variable-name
      const __path = prePath + routeChild.path;
      const { redirect, component, children, title } = routeChild;
      if (children && children.length) {
        if (component) {
          Routes = Routes.flat();
          Routes.push(
            RouteItem({
              key: `${i}-${idx}`,
              redirect,
              path: __path,
              title,
              component,
            })
          );
        }
        loopRoute(routeChild, idx, __path);
      } else {
        Routes.push(
          RouteItem({
            key: `${i}-${idx}`,
            redirect,
            path: __path,
            title,
            component,
          })
        );
      }
    });
  };

  routes.forEach((route, key) => {
    return "children" in route && Array.isArray(route.children) && route.children.length
      ? loopRoute(route, key, route.path)
      : Routes.push(RouteItem({ key, ...route }));
  });

  return (
    <BrowserRouter basename={BASE_NAME}>
      <Suspense fallback={<div>Loading...</div>}>{Routes}</Suspense>
    </BrowserRouter>
  );
}

export default App;
