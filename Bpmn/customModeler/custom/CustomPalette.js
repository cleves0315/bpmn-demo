/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import { Notify } from "ezrd";
import { eventType } from '../constant';

export default function PaletteProvider(palette, create, elementFactory, globalConnect, bpmnFactory, elementRegistry) {
  this.create = create;
  this.elementFactory = elementFactory;
  this.globalConnect = globalConnect;
  this.bpmnFactory = bpmnFactory;
  this.elementRegistry = elementRegistry;

  palette.registerProvider(this);
}

PaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'globalConnect',
  'bpmnFactory',
  'elementRegistry'
];

/**
 * 异步初始化 CustomPalette
 * CustomPalette数据格式详见 ../mixin.js
 * @param {CustomPalette} newCustomPalette
 */
export function asyncInitPalette(newCustomPalette) {
  /**
   *
   * @param element?
   */
  PaletteProvider.prototype.getPaletteEntries = function () {
    const {
      create,
      elementFactory,
      bpmnFactory,
      elementRegistry
    } = this;

    /**
     * 根据图元类型绑定事件
     * @param group 图元类型
     * @param attr 图元需要携带的信息
     */
    function createEvent(group, attr) {
      const createType = eventType[group]; // 事件类型

      if (!createType) return;

      return function (event) {
        const businessObject = bpmnFactory.create(createType, attr);
        const shape = elementFactory.createShape({
          type: createType,
          businessObject
        });

        const allElemRegistry = elementRegistry.getAll();
        const findStartEventElementIndex = allElemRegistry.findIndex(v => v.type === "bpmn:StartEvent");

        if (findStartEventElementIndex > 0 && createType === 'bpmn:StartEvent') {
          Notify.error('只能有一个开始节点');
          return false;
        }

        create.start(event, shape);
      };
    }

    // 遍历列表给图元绑定事件
    const keys = Object.getOwnPropertyNames(newCustomPalette);
    const customPalette = keys.map((key) => {
      // 根据 text-custom 这个类判断是否是图元标题
      const obj = { ...newCustomPalette[key] };
      const { group, attr, className } = obj;
      const isCustomText = className.includes('text-custom');

      // 给图元添加事件
      if (!isCustomText) {
        attr.x = 0;
        attr.y = 0;
        attr.width = 110;
        attr.height = 110;
        obj.action = {
          dragstart: createEvent(group, attr),
          click: createEvent(group, attr)
        };
      }

      return obj;
    });

    return customPalette;
  };
}
