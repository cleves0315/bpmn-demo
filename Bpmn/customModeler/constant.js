/**
 * 创建事件类型-索引bpmn元素类型
 * 这里的 Trigger、Executor、Judge 是与后端协商好的定义
 * bpmn只识别 bpmn:StartEvent、bpmn:Task、bpmn:ExclusiveGateway
 */
// eslint-disable-next-line import/prefer-default-export
export const eventType = {
  // 开始事件
  Trigger: 'bpmn:StartEvent',
  // 活动事件
  Executor: 'bpmn:Task',
  // 判断条件
  Judge: 'bpmn:ExclusiveGateway'
};

// bpmn元素类型(目前已知...)
// const customElements = ['bpmn:Task', 'bpmn:StartEvent', 'bpmn:EndEvent', 'bpmn:ExclusiveGateway', 'label'];
