import React from 'react';
import { Drawer } from "ezrd";

import '../../../styles/bpmnDrawer/index.less';

const BpmnDrawer = (props) => {
  const {
    visible, onClose, onConfirm, children, title
  } = props;
  return (
    <div className="cdp-bpmn-drawer-wrapper">
      <Drawer
        title={(
          <div className="cdp-bpmn-drawer-title-container">
            <div className="cdp-bpmn-drawer-title">{title}</div>
            {/* <div className="cdp-bpmn-drawer-sub-title">{subTitle}</div> */}
          </div>
        )}
        visible={visible}
        className="cdp-bpmn-drawer"
        closeText="我是取消按钮"
        saveText="我是确定按钮"
        style={{ marginTop: '74px', width: 'auto', minWidth: '350px' }}
        handleSave={onConfirm}
        handleClose={onClose}
      >
        {children}
      </Drawer>
    </div>
  );
};
export default BpmnDrawer;
