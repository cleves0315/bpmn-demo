/* eslint-disable import/no-extraneous-dependencies */
import __ from 'lodash';
import {
  Input, EzrDatePicker, Button, Loading
} from 'ezrd';
import moment from 'moment';
import { assign } from 'min-dash';
import React, { PureComponent } from 'react';
import minimapModule from 'diagram-js-minimap';
import { getConnectTypeFromStorage } from "./customModeler/util";

import { defaultXmlStr } from './xmlStr';
import { InitInfo } from '../../services/bpmn';
import CustomModeler, { customAssignPaletteList, setContextPadProps } from './customModeler';
import { PaletteTitleTmlp, CustomPaletteTmlp } from './customModeler/mixin';

import 'diagram-js-minimap/assets/diagram-js-minimap.css';

import './index.less';

const { RangePicker } = EzrDatePicker;

export default class index extends PureComponent {
  bpmnModeler = null

  eventBus = null

  modeling = null

  elementRegistry = null

  // 图形注册表
  autoScroll = null // 滚动

  // 监听事件合集
  eventTypes = ['shape.added', 'element.click', 'shape.removed', 'connection.added', 'connection.changed', 'connection.removed', 'connect.end']

  static defaultProps = {
    /**
     * BPMN组件初始化完成回调
     * @param callback
     */
    initCallBack: () => {
    },
    /**
     * 初始化图元数据
     * @param GraphicMetaDtos 图元列表
     */
    initGraphicInfo: () => {
    },
    // param event, element
    onElementClick: () => {
    },
    onShapeAdded: () => {
    },
    onShapeRemoved: () => {
    },
    onConnectionChanged: () => {
    },
    onConnectionRemoved: () => {
    },
    onContextPadSettingClick: () => {
    },

    title: '', // 标题内容

    rangeTime: [], // 活动时间

    isShowDefaultMap: true, // 展示默认导航图
    // 输入标题文本 param: value
    onTitleChange: () => {
    },
    /**
     * 切换时间range
     * @param {*} date date: moment,
     * @param {*} dateString dateString: string
     */
    onRangePickerChange: () => {
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount = async () => {
    // 获取图元列表
    this.setState({ loading: true });
    const { RetData } = await InitInfo();
    this.setState({ loading: false });
    const { GraphicMetaDtos, GraphicSortDtos } = RetData;

    const newCustomPalette = this.formatCustomPalette(GraphicMetaDtos, GraphicSortDtos);

    // 异步初始化CustomPalette
    customAssignPaletteList(newCustomPalette);
    this.initBpmn();
  }

  /**
   * GraphicList 接口数据转换成 CustomPalette
   * @param GraphicList
   * @return CustomPalette
   */
  formatCustomPalette = (GraphicList, GraphicMap) => {
    const { initGraphicInfo } = this.props;
    const GraphicListObj = {}; // GraphicList的对象形式-以graphicType字段做索引
    const newCustomPalette = {};
    const sortMap = [];
    const GraphicMaps = []; // 图元类型排序

    // 根据后端的排序放入图元
    GraphicMap.forEach((map, i) => {
      const { GraphicTypeSort } = map;
      sortMap[GraphicTypeSort] = i;
    });
    sortMap.forEach((sort) => {
      if (sort !== undefined) GraphicMaps.push(GraphicMap[sort]);
    });

    // 按照GraphicType图元类型板块, 分块存放图元
    GraphicList.forEach((Graphic) => {
      const { GraphicType } = Graphic;

      if (GraphicListObj[GraphicType]) {
        GraphicListObj[GraphicType].push(Graphic);
      } else {
        GraphicListObj[GraphicType] = [Graphic];
      }
    });

    console.log('GraphicListObj: ', GraphicListObj);

    // 按照 GraphicMap 图元板块列表顺序存入 图元
    GraphicMaps.forEach((map) => {
      const { GraphicType: type, GraphicTypeDesc: desc } = map;

      // 获取Palette 标题模板
      const TitleTmlp = __.cloneDeep(PaletteTitleTmlp);

      TitleTmlp.group = type;
      TitleTmlp.className += ` ${type}`;
      TitleTmlp.attr.title = desc; // 标题渲染的文本
      assign(newCustomPalette, {
        [type]: TitleTmlp
      });

      if (GraphicListObj[type]) {
        GraphicListObj[type].forEach((Graphic) => {
          // 获取Palette 元素模板
          const PaletteTmlp = __.cloneDeep(CustomPaletteTmlp);

          PaletteTmlp.group = type;
          PaletteTmlp.className += ` ${Graphic.GraphicId}`;
          PaletteTmlp.attr.title = Graphic.GraphicName; // 图元渲染的文本
          PaletteTmlp.attr.icon = Graphic.Icon; // 图元icon
          PaletteTmlp.attr.thumbIcon = Graphic.ThumbIcon; // 图元icon
          // 设置图元携带的数据
          PaletteTmlp.attr.GraphicId = Graphic.GraphicId;
          PaletteTmlp.attr.GraphicName = Graphic.GraphicName;
          PaletteTmlp.attr.GraphicType = Graphic.GraphicType;
          PaletteTmlp.attr.EventGraphicDtos = JSON.stringify(Graphic.EventGraphicDtos);

          assign(newCustomPalette, {
            [Graphic.GraphicId]: PaletteTmlp
          });
        });
      }
    });

    console.log('newCustomPalette: ', newCustomPalette);
    initGraphicInfo(GraphicList);
    return newCustomPalette;
  }

  /**
   * 将字符串转换成图显示出来
   * @param xmlStr
   */
  bpmnImportXML = (xmlStr = defaultXmlStr) => {
    this?.bpmnModeler?.importXML(xmlStr, (err) => {
      if (err) {
        console.error('将字符串转换成图显示出来error: ', err);
      }
    });
  }

  /**
   * 初始化
   */
  initBpmn = () => {
    const { initCallBack } = this.props;
    const canvas = document.querySelector('#canvas');

    // 建模
    this.bpmnModeler = new CustomModeler({
      container: canvas,
      keyboard: {
        bindTo: document
      },
      additionalModules: [
        {
          ...minimapModule,
          zoomScroll: ['value', ''] // 禁止缩放画布
        }
      ]
    });

    // 获取内置对象
    this.elementRegistry = this.bpmnModeler.get("elementRegistry");
    this.autoScroll = this.bpmnModeler.get("autoScroll");
    this.eventBus = this.bpmnModeler.get('eventBus');
    this.modeling = this.bpmnModeler.get('modeling');


    // this.addEventBusListener();

    setContextPadProps({
      onClickSetting: this.onContextPadSettingClick
    });
    this.bpmnModeler.get('minimap').open();
    // 触发初始化完成回调
    initCallBack();
  }

  /**
   * 将画布节点保存为xml
   * @return Promise
   */
  handleGetBpmnXmlData = () => new Promise((resolve, reject) => {
    this.bpmnModeler.saveXML((error, xml) => {
      // eslint-disable-next-line no-unused-expressions
      error ? reject(error) : resolve(xml);
    });
  })

  /**
   * 获取已注册元素列表
   */
  getAllRegisteredElement = () => {
    console.log('this.elementRegistry.getAll();: ', this.elementRegistry.getAll());
    return this.elementRegistry.getAll();
  }

  /**
   * 监听事件
   */
  addEventBusListener = () => {
    // 监听 element

    this.eventTypes.forEach((eventType) => {
      switch (eventType) {
        case 'shape.added':
          this.eventBus.on(eventType, this.onShapeAdded);
          break;
        case 'shape.removed':
          this.eventBus.on(eventType, this.onShapeRemoved);
          break;
        case 'element.click':
          this.eventBus.on(eventType, this.onElementClick);
          break;
        case 'connection.added':
          this.eventBus.on(eventType, this.onConnectionAdded);
          break;
        case 'connection.changed':
          this.eventBus.on(eventType, this.onConnectionChanged);
          break;
        case 'connection.end':
          this.eventBus.on(eventType, this.onConnectionEnd);
          break;
        case 'connection.removed':
          this.eventBus.on(eventType, this.onConnectionRemoved);
          break;
        default:
          break;
      }
    });
  }

  onElementCopied = () => {
    console.log('onElementCopied');
  }

  onElementPasted = () => {
    console.log('onElementPasted');
  }

  /**
   * 点击ContextPad设置按钮
   * @param {*} event
   * @param {*} shape
   */
  onContextPadSettingClick = (event, shape) => {
    console.log('onContextPadSettingClick-123', event, shape);
    const { onContextPadSettingClick } = this.props;
    onContextPadSettingClick(event, shape);
  }

  /**
   * shape元素已被渲染
   * @param {*} event:InternalEvent
   * @param {*} element: Element
   */
  onShapeAdded = (event, element) => {
    console.log('onShapeAdded: ', event, element);
    const { onShapeAdded } = this.props;
    onShapeAdded(event, element);
  }

  /**
   * connection元素已被渲染
   * @param {*} event:InternalEvent
   * @param {*} element: Element
   */
  onConnectionAdded = (event, element) => {
    console.log('onConnectionAdded:=================>', element);
    const type = getConnectTypeFromStorage();
    const shape = event.element ? this.elementRegistry.get(event.element.id) : event.shape;

    // 设置线元素的label文字(bpmn会自动读取 businessObject.name 属性渲染出文字)
    switch (type) {
      case '1':
        // eslint-disable-next-line no-param-reassign
        shape.businessObject.name = '是';
        break;
      case '2':
        // eslint-disable-next-line no-param-reassign
        shape.businessObject.name = '否';
        break;
      default:
        // eslint-disable-next-line no-param-reassign
        shape.businessObject.name = '';
    }
  }

  /**
   * connection元素状态更新（被渲染时也会触发）
   */
  onConnectionChanged = (event, element) => {
    console.log('onConnectionChanged:=================>', element);
    const { onConnectionChanged } = this.props;
    onConnectionChanged(event, element);
  }

  onElementClick = (event, element) => {
    console.log('onElementClick: ', event, element);
    const { onElementClick } = this.props;
    onElementClick(event, element);
  }

  onShapeRemoved = (event, element) => {
    console.log('onShapeRemoved---: ', event, element);
    const { onShapeRemoved } = this.props;
    onShapeRemoved(event, element);
  }

  onConnectionEnd = (e) => {
    console.log('onConnectionEnd:zzzzzzzzzzzzzzzzzzz', e);
  }

  onConnectionRemoved = (event, element) => {
    console.log('onConnectionRemoved: ', event, element);
    const { onConnectionRemoved } = this.props;
    onConnectionRemoved(event, element);
  }


  // getElementList = () => {
  //   console.log('this.elementRegistry.getAll();: ', this.elementRegistry.getAll());
  //   console.log('this.elementRegistry.getAll();: ', __.cloneDeep(this.elementRegistry.getAll()));
  // }

  handleBackBtn = () => {
    try {
      const editorActions = this.bpmnModeler.get('editorActions');
      editorActions.trigger("undo");
    } catch (e) {
      console.log(e);
    }
  }

  onTitleInputChange = (e) => {
    const { value } = e.target;
    const { onTitleChange } = this.props;

    onTitleChange(value);
  }

  /**
   * 切换时间range
   * @param {*} date date: moment,
   * @param {*} dateString dateString: string
   */
  onRangePickerChange = (date, dateString) => {
    const { onRangePickerChange } = this.props;
    onRangePickerChange(date, dateString);
  }

  /**
   * 工具函数，返回两个数之间的数组
   */
  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  /**
   * 活动事件选择日期禁用部分
   */
  disabledDate = current => (current && current < moment().subtract(1, 'days'))

  /**
   * 活动事件选择时间禁用部分
   */
  disabledTime = (_, type) => {
    const start = _ ? _[0] : '';
    const currentDate = moment().format('YYYY-MM-DD');
    const selectDate = moment(start).format('YYYY-MM-DD');

    if (currentDate === selectDate) {
      // 限制时分秒不能早于当前时间
      const currentHour = moment().format('HH');
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, currentHour)
        };
      }
    }
    return null;
  }

  render() {
    const { title, rangeTime, isShowDefaultMap } = this.props;
    const { loading } = this.state;
    const BeginTime = rangeTime[0] && moment(rangeTime[0]);
    const EndTime = rangeTime[1] && moment(rangeTime[1]);

    return (
      <div className="bpmn-loading-container">
        <Loading show={loading}>
          <div className="bpmn">
            <div className="bpmn-container">
              <div className="palette-container" />
              <Button
                className="back-button"
                type="default"
                title="撤销:ctrl + z ; 恢复:ctrl + y ; "
                onClick={this.handleBackBtn}
              >
                <img
                  height={14}
                  width={14}
                  src="https://assets-img.ezrpro.com/pc/icon/icon/back_arrow.png"
                  alt=""
                />
                <span>撤销</span>
              </Button>
              <div className="canvas-container">
                <div className="canvas-container-header">
                  <div>
                    <span>名称</span>
                    <Input
                      className="name-input"
                      width={200}
                      placeholder="请输入活动名称"
                      value={title}
                      showCount
                      maxLength={25}
                      onChange={this.onTitleInputChange}
                    />
                  </div>
                  <div>
                    <span className="activity-time-label">活动时间</span>
                    <RangePicker
                      width={240}
                      className="activity-time-range-picker"
                      disabledDate={this.disabledDate}
                      disabledTime={this.disabledTime}
                      value={[BeginTime, EndTime]}
                      showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')]
                      }}
                      format="YYYY-MM-DD HH:mm:ss"
                      onChange={this.onRangePickerChange}
                    />
                  </div>
                  <div>
                    <span className="tip">营销任务有效的时间范围，该时间范围才会有人进入到营销画布中</span>
                  </div>
                </div>
                <div
                  id="canvas"
                  className="bpmn-canvas"
                >
                  {isShowDefaultMap && (
                    <div className="activity-default-flow">
                      <img
                        src="https://assets-img.ezrpro.com/pc/icon/basic/canvas-default.png"
                        alt=""
                        width="537px"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Loading>
      </div>
    );
  }
}
