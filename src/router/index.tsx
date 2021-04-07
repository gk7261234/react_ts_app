import React from "react";
import { routeType } from "./types";
// import Example from "@/pages/Example/Example";
const Example = React.lazy(() => import("@/pages/Example/Example.tsx"));

const routes: routeType[] = [
  {
    title: "路由示例",
    exact: true,
    key: "example",
    path: "/example",
    component: Example,
  },
];

export default routes;
