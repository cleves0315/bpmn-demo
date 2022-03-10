/* eslint-disable no-unused-expressions */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
import { assign, isArray } from 'min-dash';
import { isAny, setConnectTypeToStorage } from '../util';

export default function ContextPadProvider(contextPad, config, injector, translate, bpmnFactory, elementFactory, create, modeling, connect, globalConnect) {
  this.create = create;
  this.elementFactory = elementFactory;
  this.translate = translate;
  this.bpmnFactory = bpmnFactory;
  this.modeling = modeling;
  this.connect = connect;
  this.globalConnect = globalConnect;
  config = config || {};

  if (config.autoPlace !== false) {
    this._autoPlace = injector.get('autoPlace', false);
  }
  contextPad.registerProvider(this);
}

ContextPadProvider.$inject = [
  'contextPad',
  'config',
  'injector',
  'translate',
  'bpmnFactory',
  'elementFactory',
  'create',
  'modeling',
  'connect',
  'globalConnect'
];

ContextPadProvider.prototype.getContextPadEntries = function (element) {
  const {
    autoPlace,
    create,
    elementFactory,
    modeling,
    translate,
    connect,
    globalConnect
  } = this;

  const ContextPad = {};
  const { businessObject } = element;

  function connectStart(event) {
    setConnectTypeToStorage(0);
    connect.start(event, element); // 创建线条
    return true;
  }

  /**
   * 条件节点连线-否
   * @param event
   */
  function connectNoStart(event, shape) {
    console.log('条件节点连线-否');
    setConnectTypeToStorage('2');
    connect.start(event, shape); // 创建线条
  }

  /**
   * 条件节点连线-是
   * @param event
   */
  function connectYesStart(event, shape) {
    setConnectTypeToStorage('1');
    console.log('条件节点连线-是', shape);
    connect.start(event, shape); // 创建线条
  }

  // 点击删除按钮
  const removeElements = (event, shape) => {
    console.log('deleteNode', event, shape);
    modeling.removeElements([element]);
  };

  // 点击设置按钮
  const handleSetting = (event, shape) => {
    const { props } = ContextPadProvider;
    const { onClickSetting } = props;

    onClickSetting && onClickSetting(event, shape);
  };


  // 删除图标
  if (element.type !== 'label') {
    assign(ContextPad, {
      'global-delete-tool': {
        group: 'edit',
        className: 'icon-pad icon-delete-pad',
        title: translate('删除'),
        action: {
          click: removeElements
        }
      }
    });
  }

  // 编辑图标
  if (isAny(businessObject, [
    'bpmn:StartEvent',
    'bpmn:Task'
  ])) {
    assign(ContextPad, {
      'global-setting-tool': {
        group: 'edit',
        className: 'icon-pad icon-setting-pad',
        title: translate('设置'),
        action: {
          click: handleSetting
        }
      },
      'global-connect-tool': {
        group: 'edit',
        className: 'icon-pad icon-connection-pad',
        title: translate('链接线'),
        action: {
          click: connectStart,
          dragstart: connectStart
        }
      }
    });
  }

  // 网关节点
  if (isAny(businessObject, [
    'bpmn:ExclusiveGateway'
  ])) {
    assign(ContextPad, {
      'global-setting-tool': {
        group: 'edit',
        className: 'icon-pad icon-setting-pad',
        title: translate('设置'),
        action: {
          click: handleSetting
        }
      },
      'icon-custom-connect-yes': {
        group: 'edit',
        className: 'icon-pad icon-custom-connect-yes',
        title: translate('连接线 - 是'),
        action: {
          click: connectYesStart,
          dragstart: connectYesStart
        }
      },
      'icon-custom-connect-no': {
        group: 'edit',
        className: 'icon-pad icon-custom-connect-no',
        title: translate('连接线 - 否'),
        action: {
          click: connectNoStart,
          dragstart: connectNoStart
        }
      }
    });
  }

  return ContextPad;
};

ContextPadProvider.props = {
  onClickSetting: () => {
  }
};

/**
 * 抛出-设置按钮click事件
 * @param preProps 状态提升接收的函数
 */
export function setContextPadProps(preProps) {
  const { props } = ContextPadProvider;
  const preKeys = Object.getOwnPropertyNames(preProps);

  preKeys.forEach((key) => {
    if (props[key]) {
      props[key] = preProps[key];
    }
  });
}
