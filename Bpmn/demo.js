/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import BPMN from '../../components/Bpmn';

import '../../styles/customMarketing/index.less';


const prefix = 'cdp-custom-marketing';

class CustomMarketing extends React.Component {
  // BPMN组件实例对象
  Bpmn = null

  state = {
  }

  componentDidMount = async () => {
    // bpmnInitCallBack-画布组件初始化完成（在回调里执行生命周期渲染的逻辑）
  }

  /**
   * BPMN组件初始化完成回调
   */
  bpmnInitCallBack = async () => {

  }

  /**
   * 图元列表初始化完成
   */
  bpmnInitGraphicInfo = (graphicMetaDtos) => {
    console.log('bpmnInitGraphicInfo: ', graphicMetaDtos);
  }

  // 更改画布名称
  handleTitleChange = (value) => {
  }

  // 更改活动时间
  handleRangePickerChange = (date, dateString) => {
  }

  /**
   * 处理ContextPad中节点元素设置按钮点击
   * @param event
   * @param shape
   */
  handleContextPadSettingClick = (event, shape) => {
    console.log('handleContextPadSettingClick: ', shape);
  }

  /**
   * 图元元素已被渲染
   * @param {*} event
   * @param {*} element
   */
  handleShapeAdded = async (event, element) => {
    console.log('图元元素已被渲染: ', event, element);
  }


  /**
   * 图元元素已被移除完成
   * @param {*} event
   * @param {*} element
   */
  handleShapeRemoved = (event, element) => {
    console.log('图元元素已被移除完成: ', event, element);
  };

  /**
   * 线元素状态更新(被渲染时也会触发)
   * @param {*} event
   * @param {*} element
   */
  handleConnectionAdded = (event, element) => {
    console.log('线元素状态更新: ', event, element);
  };

  /**
   * 线元素已被移除完成
   * @param {*} event
   * @param {*} element
   */
  handleConnectionRemoved = (event, element) => {
    console.log('线元素已被移除完成: ', event, element);
  };

  /**
   * 图元元素被点击
   * @param {*} event
   * @param {*} element
   */
  handleElementClick = (event, element) => {
    console.log('图元元素被点击: ', event, element);
  };


  render() {
    return (
      <div className={`${prefix}`}>
        <div>
          <BPMN
            title="标题内容"
            // 展示默认导航图
            isShowDefaultMap
            rangeTime={[]}
            ref={(r) => { this.Bpmn = r; }}
            // 触发初始化完成回调
            initCallBack={this.bpmnInitCallBack}
            initGraphicInfo={this.bpmnInitGraphicInfo}
            onElementClick={this.handleElementClick}
            onShapeAdded={this.handleShapeAdded}
            onConnectionChanged={this.handleConnectionAdded}
            onShapeRemoved={this.handleShapeRemoved}
            onConnectionRemoved={this.handleConnectionRemoved}
            onRangePickerChange={this.handleRangePickerChange}
            onTitleChange={this.handleTitleChange}
            onContextPadSettingClick={this.handleContextPadSettingClick}
          />
        </div>
      </div>
    );
  }
}

export default CustomMarketing;
