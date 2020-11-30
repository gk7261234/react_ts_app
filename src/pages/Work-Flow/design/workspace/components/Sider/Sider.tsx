import React, { useMemo, forwardRef, useImperativeHandle } from "react";
import { Form, Tabs, Collapse, Input, InputNumber } from "antd";
const { Panel } = Collapse;
const { TabPane } = Tabs;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
let Sider = (_props: any, ref: any): any => {
  const formData = () => {
    return form.getFieldsValue();
  };
  useImperativeHandle(ref, () => {
    return { formData };
  });

  const [form] = Form.useForm();

  const renderForm = useMemo(() => {
    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} layout="horizontal" form={form}>
        <Form.Item label="工作流名称" name="flowName">
          <Input />
        </Form.Item>
        <Form.Item label="工作流描述" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="定时信息" name="info">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="最大实例数" name="maxInstance">
          <InputNumber />
        </Form.Item>
      </Form>
    );
  }, [form]);

  return (
    <div className="rightArea">
      <Tabs defaultActiveKey="1">
        <TabPane tab="" key="1" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={["1", "2", "3"]}>
            <Panel header="信息栏" key="1">
              {renderForm}
            </Panel>
            {/* <Panel header="样式" key="2">
              {renderStyleForm}
            </Panel> */}
          </Collapse>
        </TabPane>
      </Tabs>
    </div>
  );
};
Sider = forwardRef(Sider);
export default Sider;
