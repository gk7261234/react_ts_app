export type routeType = {
  title: string;
  exact?: boolean;
  key?: string;
  path: string;
  component?: any;
  redirect?: string;
  children?: routeType[];
};

//   export type routesType = routeType[];
