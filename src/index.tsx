import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";

import App from './App';
import actions from "./shared/actions";
import SharedModule from "./shared/index.js";
// import reportWebVitals from './reportWebVitals';

if(!window.__POWERED_BY_QIANKUN__){
  render();
}

function render(props: any = {}) {
  if(props) {
    const { shared = SharedModule.getShared() } = props;
    SharedModule.overloadShared(shared);
    console.log("get token : ", SharedModule.getShared().getToken());
    actions.setActions(props);
  }
  ReactDOM.render(
    <App />,
    document.getElementById("root")
  );
}

export async function bootstrap(): Promise<void> {
  console.log("react app bootstraped");
}

export async function mount(props: []): Promise<void> {
  console.log("reactApp mount", props);
  render(props);
}

export async function unmount(): Promise<void> {
  console.log("react unmount");
  const RootNode = document.getElementById("root")
  if(RootNode){
    ReactDOM.unmountComponentAtNode(RootNode);
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
