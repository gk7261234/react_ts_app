import { BrowserRouter } from "react-router-dom";
import React, { Suspense, useMemo } from "react";
import { Spin } from "antd";
import beautifyRoute from "@/components/BeautifyRoute";
import "./App.css";

function App(): JSX.Element {
  const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/task" : "";
  const Routes: any[] = beautifyRoute();

  const renderLoading = useMemo(() => {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }, []);

  return (
    <BrowserRouter basename={BASE_NAME}>
      <Suspense fallback={renderLoading}>{Routes}</Suspense>
    </BrowserRouter>
  );
}

export default App;
