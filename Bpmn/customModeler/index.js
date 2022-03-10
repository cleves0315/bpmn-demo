/* eslint-disable no-underscore-dangle */
import Modeler from 'bpmn-js/lib/Modeler';
import inherits from 'inherits';
import CustomModule, { asyncInitPalette, setContextPadProps } from './custom';
import { setCustomPaletteStyle } from './styles';

export default function CustomModeler(options) {
  Modeler.call(this, options);
  this._customElements = [];
}
inherits(CustomModeler, Modeler);
CustomModeler.prototype._modules = [].concat(
  CustomModeler.prototype._modules, [
    CustomModule
  ]
);

/**
 * 异步初始化CustomPalette区域，数据初始化好后调用该方法
 * CustomPalette数据格式详见 ./mixin.js
 * @param {CustomPalette} newCustomPalette
 */
function customAssignPaletteList(newCustomPalette) {
  asyncInitPalette(newCustomPalette);
  setCustomPaletteStyle(newCustomPalette);
}

export {
  customAssignPaletteList,
  setContextPadProps
};
