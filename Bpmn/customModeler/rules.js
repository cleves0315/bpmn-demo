export default function rules(_this) {
  /*
       * 存在许多由唯一ID标识的建模操作
       * 我们可以钩住它们中的任何一个
       * 制定对应规则
       * 默认优先级为1000
       */
  // _this.addRule('elements.move', 2000, () => false); // 不允许元素移动

  _this.addRule('element.copy', 2000, () => false);// 禁用复制粘贴

  // 线上的路径点
  _this.addRule('shape.attach', 2000, () => false);

  // 线上的路径点
  _this.addRule('connection.updateWaypoints', 2000, () => false);

  // 线-重连
  _this.addRule('connection.reconnect', 2000, () => false);

  // _this.addRule('elements.move', 2000, () => false); //

  _this.addRule('connection.create', 2000, (context) => {
    return true
  });
}
