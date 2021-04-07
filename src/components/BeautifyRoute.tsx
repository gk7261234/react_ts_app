import { Route, Redirect } from "react-router-dom";
import routes from "@/router";
import React from "react";
interface Props {
  redirect?: string | undefined;
  path: string | undefined;
  component?: React.FunctionComponent<any>;
  key: string | number;
  title: string;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const beautifyRoute = (): Route[] => {
  let Routes: any[] = [];

  const RouteItem = (props: Props) => {
    const { redirect, path, component, key } = props;
    if (redirect) {
      return <Redirect exact key={key} from={path} to={redirect} />;
    }
    return <Route exact key={key} component={component} path={path} />;
  };

  const loopRoute = (route: any, i: number, prePath?: string) => {
    return route.children.forEach((routeChild: any, idx: number) => {
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

  routes.forEach((route: any, key: any) => {
    return "children" in route && Array.isArray(route.children) && route.children.length
      ? loopRoute(route, key, route.path)
      : Routes.push(RouteItem({ key, ...route }));
  });

  return Routes;
};

export default beautifyRoute;
