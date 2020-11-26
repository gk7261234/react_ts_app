import { routeType } from "./types";
import Example from "@/pages/Example/Example";
import WorkFlowDesign from "@/pages/Work-Flow/design/workspace/index";

const routes: routeType[] = [
  {
    title: "路由示例",
    exact: true,
    key: "example",
    path: "/example",
    component: Example,
  },
  {
    title: "工作流设计",
    exact: true,
    key: "work-flow-design",
    path: "/design",
    component: WorkFlowDesign,
  },
];

export default routes;
