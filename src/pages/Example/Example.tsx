import React, { useState, useEffect, useReducer } from "react";
import { MainService } from "@core/business-modules/main-service";
import { Row, Input } from "antd";
const { Search } = Input;

const dataFetchReducer = (state: any, actions: any) => {
  switch (actions.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
      break;
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: actions.payload,
      };
      break;
    case "FETCH_FAILUER":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
      break;
    default:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
      break;
  }
};

const useDataApi = (value: string) => {
  const [search, setSearch] = useState(value);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });
  useEffect(() => {
    async function getExampleList() {
      dispatch({ type: "FETCH_INIT" });
      try {
        // 测试 Ajax 请求
        const result = await MainService.Instance().ExampleService.getList();
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILUER" });
      }
    }
    getExampleList();
  }, [search]);
  return [state, setSearch];
};

type Props = any;
const Example: React.FC<Props> = () => {
  const [{ isError, isLoading, data }, doFetch] = useDataApi("redux");
  return (
    <div>
      <Row justify="center" align="middle" style={{ height: 800 }}>
        <Search
          placeholder="input search text"
          allowClear={true}
          onSearch={(value) => {
            doFetch(value);
          }}
          style={{ width: 200, margin: "0 10px" }}
        />
      </Row>
      <Row justify="center" align="middle">
        {isError && <div>something went wrong ...</div>}
        {isLoading ? (
          <div>Loding ...</div>
        ) : (
          <ul>
            {data.map((item: any) => (
              <li key={item.key}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
      </Row>
    </div>
  );
};

export default Example;
