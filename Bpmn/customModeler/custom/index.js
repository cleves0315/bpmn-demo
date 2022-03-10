import CustomPalette, { asyncInitPalette } from './CustomPalette';
import CustomRender from './CustomRender';
import CustomRules from "./CustomRules";
import CustomKeyboardBinding from './CustomKeyboardBinding';
import CustomContextPadProvider, { setContextPadProps } from './CustomContextPadProvider';

export default {
  __init__: ['paletteProvider', 'customRenderer', 'contextPadProvider', 'customKeyboardBinding', 'customRules'],
  customRules: ['type', CustomRules],
  paletteProvider: ['type', CustomPalette],
  customRenderer: ['type', CustomRender],
  contextPadProvider: ['type', CustomContextPadProvider],
  customKeyboardBinding: ["type", CustomKeyboardBinding]
};

export {
  asyncInitPalette,
  setContextPadProps
};
