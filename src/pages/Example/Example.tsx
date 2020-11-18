import React from "react";
import { MainService } from "../../core/business-modules/main-service";
import { Row, Input } from "antd";
const { Search } = Input;

// 测试 Ajax 请求
async function getExampleList() {
  try {
    const result = await MainService.Instance().ExampleService.getList();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

type Props = {}
const Example: React.FC<Props> = () => {
  return (
    <Row justify="center" align="middle" style={{height: 1000}}>
      <Search
        placeholder="input search text"
        allowClear={true}
        onSearch={getExampleList}
        style={{ width: 200, margin: '0 10px' }}
      />
    </Row>
  )
};

export default Example;