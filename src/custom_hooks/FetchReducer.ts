import { useReducer } from "react";
import { message } from "antd";

interface State {
  isLoading: boolean;
  isError: boolean;
  data: any;
}

interface Actions {
  type: string;
  payload?: any;
  message?: string;
}

interface InitState {
  [key: string]: any;
}

const dataFetchReducer = (state: State, actions: Actions): State => {
  switch (actions.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      if (actions?.message) {
        message.success(actions.message);
      }
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: actions.payload,
      };
    case "FETCH_FAILUER":
      if (actions.message) {
        message.error(actions.message);
      }
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SERVER_ERROR":
      if (actions.message) {
        message.error(actions.message);
      }
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
  }
};
const useFetchReducer = (initState?: InitState): any => {
  const originData = {
    isLoading: false,
    isError: false,
    data: [],
  };
  const init = Object.assign({}, originData, initState || {});
  const [state, dispatch] = useReducer(dataFetchReducer, init);
  return [state, dispatch];
};
export default useFetchReducer;
