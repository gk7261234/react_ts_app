/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import G6, { Graph } from "@antv/g6";
// import { initBehavors } from "../../behavior";
import "./Content.scss";
import { GraphData, TreeGraphData } from "@antv/g6/lib/types";
enum Actions {
  delete = 46,
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
let Content = (_props: any, ref: any): any => {
  let graph: Graph | null = null;
  let edge: any;
  let selectNode: any;
  let addingEdge = false;
  const [selNode, setSelectNode] = useState<string>("");

  const [contextmenu, setContextmenu] = useState<any>({
    position: "fixed",
    zIndex: "10",
    display: "none",
    left: "",
    top: "",
    bottom: "",
  });
  const [graphInstance, setGraphInstance] = useState<Graph>();
  const initData = _props.nodeData;
  const resetSelect = (_graph: Graph) => {
    addingEdge = false;
    setSelectNode("");
    selectNode = "";
    const allNodes = _graph.findAllByState("node", "click");
    allNodes.forEach((cn) => {
      _graph.setItemState(cn, "click", false);
    });
    const allEdges = _graph.findAllByState("edge", "click");
    allEdges.forEach((ce) => {
      _graph.setItemState(ce, "click", false);
    });
  };
  const bindEvents = (_graph: Graph) => {
    // tslint:disable-next-line:no-shadowed-variable
    function contextmenu(event: any) {
      event.preventDefault();
      event.stopPropagation();
      addingEdge = false;
      selectNode = event.item;
      setSelectNode(selectNode);
      if (event.clientY + 360 < document.body.clientHeight) {
        setContextmenu({
          position: "fixed",
          zIndex: "10",
          display: "block",
          left: event.clientX + "px",
          top: event.clientY + "px",
          bottom: "",
        });
      } else {
        setContextmenu({
          position: "fixed",
          zIndex: "10",
          display: "block",
          left: event.clientX + "px",
          top: event.clientY + "px",
          bottom: "",
        });
      }
    }
    _graph.on("canvas:click", (e: any) => {
      resetSelect(_graph);
    });
    _graph.on("node:mouseenter", (e: any) => {
      const nodeItem = e.item;
      _graph.setItemState(nodeItem, "hover", true);
    });
    _graph.on("node:mouseleave", (e: any) => {
      const nodeItem = e.item;
      _graph.setItemState(nodeItem, "hover", false);
    });
    _graph.on("node:click", (e: any) => {
      const clickNodes = _graph.findAllByState("node", "click");
      clickNodes.forEach((cn) => {
        _graph.setItemState(cn, "click", false);
      });
      const nodeItem = e.item;
      _graph.setItemState(nodeItem, "click", true);
      selectNode = nodeItem;
      setSelectNode(selectNode);
    });
    _graph.on("node:contextmenu", (event: any) => {
      contextmenu(event);
    });
    _graph.on("edge:click", (e: any) => {
      if (addingEdge) return;
      const clickEdges = _graph.findAllByState("edge", "click");
      clickEdges.forEach((ce) => {
        _graph.setItemState(ce, "click", false);
      });
      const edgeItem = e.item;
      if (!edgeItem.destroyed) {
        _graph.setItemState(edgeItem, "click", true);
      }
      setSelectNode(edgeItem);
      selectNode = edgeItem;
    });
    _graph.on("edge:contextmenu", (event: any) => {
      contextmenu(event);
    });
  };

  const renderGraph = (_initData: any) => {
    if (!graph) {
      const minimap = new G6.Minimap({
        size: [100, 100],
        className: "minimap",
        type: "delegate",
      });
      const grid = new G6.Grid();
      graph = new G6.Graph({
        container: "mountNode", // 指定挂载容器
        width: 1600, // 图的宽度
        height: 750, // 图的高度
        fitView: true,
        fitViewPadding: [20, 40, 50, 20],
        defaultNode: {
          type: "node",
          size: 50,
        },
        nodeStateStyles: {
          hover: {
            fill: "lightsteelblue",
          },
          click: {
            stroke: "#000",
            lineWidth: 3,
          },
        },
        edgeStateStyles: {
          click: {
            stroke: "steelblue",
          },
        },
        modes: {
          default: [
            {
              type: "drag-node",
              enableDelegate: true,
              shouldBegin: (e) => {
                // 不允许拖拽 id 为 'node1' 的节点
                if (e.item && e.item.getModel().id === "node1") {
                  return false;
                } else {
                  return true;
                }
              },
            },
            {
              type: "drag-canvas",
            },
            "click-add-edge",
            "keyboard",
            "drag-combo",
            "zoom-canvas",
          ],
        },
        plugins: [minimap, grid],
      });
      setGraphInstance(graph);
    }
    graph.data(_initData); // 加载数据
    graph.render();
    bindEvents(graph);
  };

  useEffect(() => {
    if (!graphInstance) {
      initBehavors();
      // addLine();
      renderGraph(initData);
      document.onclick = (_event) => {
        setContextmenu({
          display: "none",
          left: "",
          top: "",
          bottom: "",
        });
      };
    } else {
      graphInstance.changeData(_props.nodeData);
    }
  }, [_props]);

  // 自定义behavors
  const initBehavors = () => {
    G6.registerBehavior("keyboard", {
      getEvents() {
        return {
          keydown: "onKeyDown",
        };
      },
      onKeyDown(e: any): void {
        const code = e.keyCode || e.which;
        switch (code) {
          case Actions.delete:
            if (!!selectNode) {
              addingEdge = false;
              (graph as any).removeItem(selectNode);
            }
            break;
        }
      },
    });
    G6.registerBehavior("click-add-edge", {
      getEvents() {
        return {
          "node:click": "onClick",
          mousemove: "onMousemove",
          "edge:click": "onEdgeClick", // 点击空白处，取消边
        };
      },
      onClick(ev: any) {
        const node = ev.item;
        const point = {
          x: ev.x,
          y: ev.y,
        };
        const model = node.getModel();
        if (addingEdge && edge) {
          (graph as any).updateItem(edge, {
            target: model.id,
          });
          edge = null;
          addingEdge = false;
        } else {
          edge = (graph as any).addItem("edge", {
            source: model.id,
            target: point,
          });
          addingEdge = true;
        }
      },
      onMousemove(ev: any) {
        const point = {
          x: ev.x,
          y: ev.y,
        };
        if (addingEdge && edge) {
          (graph as any).updateItem(edge, {
            target: point,
          });
        }
      },
      onEdgeClick(ev: any) {
        const currentEdge = ev.item;
        // 拖拽过程中，点击会点击到新增的边上
        // tslint:disable-next-line:triple-equals
        if (graph && addingEdge && edge === currentEdge) {
          (graph as any).removeItem(edge);
          edge = null;
          addingEdge = false;
          resetSelect(graph);
        }
      },
    });
  };

  const deleteNode = () => {
    console.log("=======> delete: ", selNode);
    if (graphInstance && !!selNode) {
      graphInstance.removeItem(selNode);
    }
  };

  const graphData: any = () => {
    return (graphInstance as any).save();
  };

  // 暴露给父组件的值
  useImperativeHandle(ref, (): { graphData: TreeGraphData | GraphData } => {
    return { graphData };
  });

  return (
    <>
      <div id="mountNode" />
      <div style={contextmenu}>
        <div className="menus">
          <div className="menus-item">
            <div onClick={deleteNode}>删除</div>
          </div>
        </div>
      </div>
    </>
  );
};
Content = forwardRef(Content);
export default Content;
