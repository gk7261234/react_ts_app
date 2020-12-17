import { routeType } from "./types";
import Example from "@/pages/Example/Example";

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
