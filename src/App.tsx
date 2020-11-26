import React, { Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./router/index";

const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/test" : "";

function App(): JSX.Element {
  return (
    <Router basename={BASE_NAME}>
      <div>
        <Suspense fallback={null}>
          {routes.map((route: any) => {
            return <Route path={route.path} component={route.component} key={route.key} />;
          })}
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
