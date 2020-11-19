import React, { Suspense } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import routes from "./router/index";

const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/test" : "";

function App(): JSX.Element {
  return (
    <div>
      <BrowserRouter basename={BASE_NAME}>
      <Suspense fallback={null}>
        {routes.map((route: any) => {
            return <Route path={route.path} component={route.component} key={route.key} />;
          })}
      </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
