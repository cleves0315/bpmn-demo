/**
 * 异步添加CustomPalette样式
 * 渲染图元标题、图元icon 都在这里！！！
 * @param {CustomPalette} CustomPalette
 */
function setCustomPaletteStyle(CustomPalette) {
  let styles = '';
  const styleElm = document.createElement('style');
  const keys = Object.getOwnPropertyNames(CustomPalette);
  const stylesDomain = '.bpmn .bpmn-container .bpmn-canvas .djs-container .djs-palette';

  // 通过每个Custom的携带属性attr, 设置icon图片与文本
  keys.forEach((key) => {
    const custom = CustomPalette[key];
    const { attr } = custom;

    if (attr) {
      if (attr.icon) {
        // custom
        styles += `${stylesDomain} .${key} { background-image: url(${attr.icon}); }`;
        styles += `${stylesDomain} .${key}::after { content: '${attr.title}'; }`;
      } else {
        // 标题文本
        styles += `${stylesDomain} .${key}::after { content: '${attr.title}'; }`;
      }
    }
  });

  styleElm.innerHTML = styles;
  document.head.appendChild(styleElm);
}


export {
  // eslint-disable-next-line import/prefer-default-export
  setCustomPaletteStyle
};
