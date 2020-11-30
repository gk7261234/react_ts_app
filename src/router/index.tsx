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
    title: "工作流管理",
    path: "/workFlow",
    children: [
      {
        title: "工作流设计",
        exact: true,
        path: "/design",
        component: WorkFlowDesign,
      },
      {
        title: "工作流实例",
        exact: true,
        path: "/instance",
        component: WorkFlowDesign,
      },
      {
        title: "工作流编辑器",
        exact: true,
        path: "/workspance",
        component: WorkFlowDesign,
      },
    ],
  },
];

export default routes;
