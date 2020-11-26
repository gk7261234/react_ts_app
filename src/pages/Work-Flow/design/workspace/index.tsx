import React, { createContext, Fragment, useMemo, useRef, useState } from "react";
import { Button, Modal, Table } from "antd";
import { SaveOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.scss";
import SiderItem from "./components/Sider/Sider";
import ContentItem from "./components/Content/Content";
import ButtonGroup from "antd/lib/button/button-group";
export const IndexContext = createContext({ nodeData: [] });
interface INodeData {
  nodes: any[];
}
const WorkSpance: React.FC = () => {
  const [nodeData, setNodeData] = useState<INodeData>({ nodes: [] });
  const graphData = useRef();
  const formData = useRef();
  const [visible, setVisible] = useState(false);
  // 开始节点
  const startNode = {
    id: "start",
    label: "起始点",
    anchorPoints: [[1, 0.5]],
    linkPoints: {
      right: true,
      fill: "#fff",
      size: 5,
    },
  };

  // 节点锚点位置
  const anchorPoints = [
    [0, 0.5],
    [1, 0.5],
  ];
  // 锚点样式
  const linkPoints = {
    left: true,
    right: true,
    fill: "#fff",
    size: 5,
  };
  const type = "rect";

  const columns = [
    {
      title: "任务ID",
      dataIndex: "id",
    },
    {
      title: "任务名称",
      dataIndex: "label",
    },
    {
      title: "其他",
      dataIndex: "other",
    },
  ];

  const data: any[] | undefined = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      id: `ID_${i}`,
      label: `task ${i}`,
      other: `任务描述`,
    });
  }

  const handleOk = () => {
    setVisible(!visible);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<[]>([]);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    const selectRow = rowSelection.selectedRowKeys;
    const nodes = selectRow.map((item: any) => {
      const nodeItem = { ...data[item], anchorPoints, linkPoints, type };
      delete nodeItem.key;
      delete nodeItem.other;
      return nodeItem;
    });
    nodes.splice(0, 0, startNode);
    setNodeData({ nodes });
    setTimeout(() => {
      setLoading(false);
      setSelectedRowKeys([]);
      setVisible(false);
    }, 1000);
  };

  // tslint:disable-next-line:no-shadowed-variable
  const onSelectChange = (selectedRowKeys: []) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection: any = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 获取节点数据
  const showData = () => {
    const baseData = (formData.current as any).formData();
    const datas = (graphData.current as any).graphData();
    console.log("form data: ", baseData, "graph data: ", datas);
  };

  const renderContent = useMemo(() => {
    return <ContentItem ref={graphData} nodeData={nodeData} />;
  }, [nodeData]);

  return (
    <Fragment>
      <div className="header">
        <ButtonGroup className="btn-group">
          <Button onClick={handleOk}>
            <PlusOutlined />
            导入任务
          </Button>
          <Button>
            <DeleteOutlined />
            删除
          </Button>
          <Button onClick={showData}>
            <SaveOutlined />
            保存
          </Button>
        </ButtonGroup>
        <Modal title="导入任务" visible={visible} onOk={handleOk} onCancel={handleCancel}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                导入
              </Button>
              <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}</span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>
        </Modal>
      </div>
      <div className="page">
        <div className="sider">
          <SiderItem ref={formData} />
        </div>
        <div className="content">{renderContent}</div>
      </div>
    </Fragment>
  );
};

export default WorkSpance;
