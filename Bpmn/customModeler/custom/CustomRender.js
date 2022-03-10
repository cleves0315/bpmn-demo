/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
import inherits from 'inherits';
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import {
  append as svgAppend,
  create as svgCreate
} from 'tiny-svg';

export default function CustomRenderer(eventBus) {
  BaseRenderer.call(this, eventBus, 2000);

  this.drawCustomElements = (parentNode, element) => {
    // CustomPalette.js 事件创建的图元获取图元携带的信息
    const { $attrs } = element.businessObject;
    // 会把 name属性渲染成 label标签。 如果不需要label标签 不要设置为name属性
    const {
      name, icon, GraphicName, thumbIcon
    } = $attrs;

    console.log('%c ===============', 'color: red');
    console.log('this.drawCustomElements: ', $attrs);
    console.log('%c ================', 'color: red');

    // // 修改是和否的样式
    // if (element.type === 'label') {
    //   setTimeout(() => {
    //     const doms = [...document.getElementsByClassName('djs-label')];
    //     if (doms) {
    //       doms.forEach((v) => {
    //         let color = '';
    //         if (v.textContent && v.textContent === '是') {
    //           color = '#42A2F9';
    //         } else if (v.textContent && v.textContent === '否') {
    //           color = '#F8655A';
    //         }
    //         v.style.fill = color;
    //       });
    //     }
    //   });
    //   if (element.labelTarget.type !== 'bpmn:SequenceFlow') {
    //     return element;
    //   }
    // }

    if (element.type !== 'label') {
      // 获取到Palette设置的节点属性

      // 设置节点属性值
      // const container = document.createElement('div');
      const container = svgCreate('g');
      // 创建直径为 110px 的圆形背景
      // const circleElm = svgCreate('circle', {
      //   r: '55',
      //   cx: 55,
      //   cy: 55,
      //   fill: '#e8e4ff'
      // });
      const customIcon = svgCreate('image', {
        ...$attrs,
        href: thumbIcon
        // href: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp_official_account_icon3.png',
        // width: 30,
        // height: 30,
        // x: 55,
        // y: 18,
        // transform: 'translate(-15, 0)'
      });
      // const textElm = svgCreate(`<text x="31" y="50" fill="red">${GraphicName}</text>`);

      element.width = +$attrs.width;
      element.height = +$attrs.height;

      // svgAppend(container, circleElm);
      svgAppend(container, customIcon);
      // svgAppend(container, textElm);
      svgAppend(parentNode, container);
      return element;
    }

    return name;
  };
}

inherits(CustomRenderer, BaseRenderer);

CustomRenderer.$inject = ['eventBus', 'styles'];

/**
 *
 * @param {*} element
 */
CustomRenderer.prototype.canRender = function (element) {
  // ignore labels
  return !element.labelTarget;
};

CustomRenderer.prototype.drawShape = function (p, element) {
  return this.drawCustomElements(p, element);
};

/**
 *
 * @param {*} shape
 */
CustomRenderer.prototype.getShapePath = function () {
};
