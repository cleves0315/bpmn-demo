import "bpmn-js/dist/assets/diagram-js.css";

import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import KeyboardBindings from "diagram-js/lib/features/keyboard/KeyboardBindings";

import {
  isCmd,
  isKey,
  isShift
} from "diagram-js/lib/features/keyboard/KeyboardUtil";

export default class CustomKeyboardBinding extends KeyboardBindings {
  constructor(eventBus, injector, keyboard) {
    super(eventBus, keyboard);

    injector.invoke(KeyboardBindings, this);
  }

  registerBindings = (keyboard, editorActions) => {
    // (1) 注册另一个具有更高优先级的侦听器，这样它将首先被调用
    // eslint-disable-next-line consistent-return
    keyboard.addListener(10000, (context) => {
      const event = context.keyEvent;

      // (2) 只监听 CmdOrControl + Z
      if (isCmd(event) && !isShift(event) && isKey(["z", "Z"], event)) {
        // (3) 自定义行为
        editorActions.trigger("undo");

        // (4) 返回true表示此事件已被处理，因此不会调用其他处理程序
        // 如果我们不这样做，原始的处理程序仍然会被调用
        return true;
      }
      if (isCmd(event) && !isShift(event) && isKey(["y", "Y"], event)) {
        // (3) 自定义行为
        editorActions.trigger("redo");

        // (4) 返回true表示此事件已被处理，因此不会调用其他处理程序
        // 如果我们不这样做，原始的处理程序仍然会被调用
        return true;
      }
    });
  }
}

CustomKeyboardBinding.$inject = ["eventBus", "injector", "keyboard"];
