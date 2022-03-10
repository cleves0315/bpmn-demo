export const GraphicMap = {
  Trigger: [
    's_grap_app',
    'grap_wxmall_mini_program'
  ],
  Executor: [
    'grap_wxmall_mini_program2',
    'grap_wxmall_mini_program3',
    'grap_wxmall_mini_program4',
    'grap_wxmall_mini_program5',
    'grap_wxmall_mini_program6'
  ],
  Judge: [
    'grap_wxmall_mini_program7',
    'grap_wxmall_mini_program8',
    'grap_wxmall_mini_program9'
  ]
};
// export const GraphicMap = [
//   'Trigger',
//   'Executor',
//   'Judge'
// ];

export const GraphicList = [
  {
    GraphicId: "official-account-icon",
    GraphicName: "公众号",
    UseStatus: "Enable",
    UseStatusDesc: "启用",
    ChannelId: null,
    ChannelName: "",
    SetType: "Pre",
    SetTypeDesc: "预设置",
    Icon: "https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png",
    BgColor: "",
    GraphicType: "Trigger"
  },
  {
    GraphicId: "mini-programs-icon",
    GraphicName: "小程序",
    UseStatus: "Enable",
    UseStatusDesc: "启用",
    ChannelId: null,
    ChannelName: "",
    SetType: "Pre",
    SetTypeDesc: "预设置",
    Icon: "https://assets-img.ezrpro.com/pc/icon/crm/cdp-mini-programs-icon.png",
    BgColor: "",
    GraphicType: "Trigger"
  },
  {
    GraphicId: "send-message-icon",
    GraphicName: "发送消息",
    Icon: "https://assets-img.ezrpro.com/pc/icon/crm/send-message-icon.png",
    GraphicType: "Executor",
    UseStatus: "Enable",
    UseStatusDesc: "启用",
    ChannelId: null,
    ChannelName: "",
    SetType: "Pre",
    SetTypeDesc: "预设置",
    BgColor: ""
  },
  {
    GraphicId: "send-coupons-icon",
    GraphicName: "送优惠券",
    Icon: "https://assets-img.ezrpro.com/pc/icon/crm/send-coupons-icon.png",
    GraphicType: "Executor",
    UseStatus: "Enable",
    UseStatusDesc: "启用",
    ChannelId: null,
    ChannelName: "",
    SetType: "Pre",
    SetTypeDesc: "预设置",
    BgColor: ""
  },
  {
    GraphicId: "delay-device-icon",
    GraphicName: "延时器",
    Icon: "https://assets-img.ezrpro.com/pc/icon/crm/delay-device-icon.png",
    GraphicType: "Executor",
    UseStatus: "Enable",
    UseStatusDesc: "启用",
    ChannelId: null,
    ChannelName: "",
    SetType: "Pre",
    SetTypeDesc: "预设置",
    BgColor: ""
  },
  {
    GraphicId: "send-sms-icon",
    GraphicName: "发短信",
    Icon: "https://assets-img.ezrpro.com/pc/icon/crm/send-sms-icon.png",
    GraphicType: "Executor",
    UseStatus: "Enable",
    UseStatusDesc: "启用",
    ChannelId: null,
    ChannelName: "",
    SetType: "Pre",
    SetTypeDesc: "预设置",
    BgColor: ""
  },
  {
    GraphicId: "hit-label-icon",
    GraphicName: "打标签",
    Icon: "https://assets-img.ezrpro.com/pc/icon/crm/hit-label-icon.png",
    GraphicType: "Executor",
    UseStatus: "Enable",
    UseStatusDesc: "启用",
    ChannelId: null,
    ChannelName: "",
    SetType: "Pre",
    SetTypeDesc: "预设置",
    BgColor: ""
  },
  {
    GraphicId: "send-integral-icon",
    GraphicName: "发积分",
    Icon: "https://assets-img.ezrpro.com/pc/icon/crm/send-integral-icon.png",
    GraphicType: "Executor",
    UseStatus: "Enable",
    UseStatusDesc: "启用",
    ChannelId: null,
    ChannelName: "",
    SetType: "Pre",
    SetTypeDesc: "预设置",
    BgColor: ""
  },
  {
    GraphicId: "user-attribute-icon",
    GraphicName: "用户属性",
    Icon: "https://assets-img.ezrpro.com/pc/icon/crm/user-attribute-icon.png",
    GraphicType: "Judge",
    UseStatus: "Enable",
    UseStatusDesc: "启用",
    ChannelId: null,
    ChannelName: "",
    SetType: "Pre",
    SetTypeDesc: "预设置",
    BgColor: ""
  },
  {
    GraphicId: "order-properties-icon",
    GraphicName: "订单属性",
    Icon: "https://assets-img.ezrpro.com/pc/icon/crm/order-properties-icon.png",
    GraphicType: "Judge",
    UseStatus: "Enable",
    UseStatusDesc: "启用",
    ChannelId: null,
    ChannelName: "",
    SetType: "Pre",
    SetTypeDesc: "预设置",
    BgColor: ""
  },
  {
    GraphicId: "event-judgment-icon",
    GraphicName: "事件判断",
    Icon: "https://assets-img.ezrpro.com/pc/icon/crm/event-judgment-icon.png",
    GraphicType: "Judge",
    UseStatus: "Enable",
    UseStatusDesc: "启用",
    ChannelId: null,
    ChannelName: "",
    SetType: "Pre",
    SetTypeDesc: "预设置",
    BgColor: ""
  }
];

export const oldCustomPalette = {
  // 开始事件
  'start-text': {
    group: 'Trigger',
    className: 'text-custom start-text'
  },
  // 公众号
  'official-account': {
    group: 'Trigger',
    className: 'icon-custom official-account-icon',
    attr: {
      title: '公众号123',
      icon: 'https://assets-img.ezrpro.com/pc/img/crm/start-event-official-account.png'
    },
    action: {
      // dragstart: createStartEvent(OFFICIALACCOUNT),
      // click: createStartEvent(OFFICIALACCOUNT)
    }
  },
  // 小程序
  'create.mini-programs': {
    group: 'Trigger',
    className: 'icon-custom mini-programs-icon',
    attr: {
      title: '小程序',
      icon: 'https://assets-img.ezrpro.com/pc/img/crm/start-event-mini-programs.png'
    },
    action: {
      // dragstart: createStartEvent(MINIPROGRAMS),
      // click: createStartEvent(MINIPROGRAMS)
    }
  },

  // 活动事件
  'create.activity-text': {
    group: 'Executor',
    className: 'text-custom activity-text'
  },
  // 发送消息
  'create.send-message': {
    group: 'Executor',
    className: 'icon-custom send-message-icon',
    attr: {
      title: '发送消息',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/send-message-icon.png'
    },
    action: {
      // dragstart: createTask(SENDMESSAGE),
      // click: createTask(SENDMESSAGE)
    }
  },
  // 送优惠券
  'create.send-coupons': {
    group: 'Executor',
    className: 'icon-custom send-coupons-icon',
    attr: {
      title: '送优惠券',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/send-coupons-icon.png'
    },
    action: {
      // dragstart: createTask(SENDCOUPONS),
      // click: createTask(SENDCOUPONS)
    }
  },
  // 送券包
  'create.send-coupon-bag': {
    group: 'Executor',
    className: 'icon-custom send-coupon-bag-icon',
    attr: {
      title: '送券包',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/send-coupon-bag-icon.png'
    },
    action: {
      // dragstart: createTask(SENDCOUPONBAG),
      // click: createTask(SENDCOUPONBAG)
    }
  },
  // 延时器
  'create.delay-device': {
    group: 'Executor',
    className: 'icon-custom delay-device-icon',
    attr: {
      title: '延时器',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png'
    },
    action: {
      // dragstart: createTask(),
      // click: createTask()
    }
  },
  // 发短信
  'create.send-sms': {
    group: 'Executor',
    className: 'icon-custom send-sms-icon',
    attr: {
      title: '发短信',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png'
    },
    action: {
      // dragstart: createTask(),
      // click: createTask()
    }
  },
  // AI外呼
  'create.ai-outbound-call': {
    group: 'Executor',
    className: 'icon-custom ai-outbound-call-icon',
    attr: {
      title: 'AI外呼',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png'
    },
    action: {
      // dragstart: createTask(),
      // click: createTask()
    }
  },
  // 打标签
  'create.hit-label': {
    group: 'Executor',
    className: 'icon-custom hit-label-icon',
    attr: {
      title: '打标签',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png'
    },
    action: {
      // dragstart: createTask(),
      // click: createTask()
    }
  },
  // 发积分
  'create.send-integral': {
    group: 'Executor',
    className: 'icon-custom send-integral-icon',
    attr: {
      title: '发积分',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png'
    },
    action: {
      // dragstart: createTask(),
      // click: createTask()
    }
  },
  // 页面发券
  'create.page-coupon-issuance': {
    group: 'Executor',
    className: 'icon-custom page-coupon-issuance-icon',
    attr: {
      title: '页面发券',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png'
    },
    action: {
      // dragstart: createTask(),
      // click: createTask()
    }
  },

  // 判断条件
  'create.judge-text': {
    group: 'Judge',
    className: 'text-custom judge-text'
  },
  // 用户属性
  'create.user-attribute': {
    group: 'Judge',
    className: 'icon-custom user-attribute-icon',
    attr: {
      title: '用户属性',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png'
    },
    action: {
      // dragstart: createJudgment(),
      // click: createJudgment()
    }
  },
  // 订单属性
  'create.order-properties': {
    group: 'Judge',
    className: 'icon-custom order-properties-icon',
    attr: {
      title: '订单属性',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png'
    },
    action: {
      // dragstart: createJudgment(),
      // click: createJudgment()
    }
  },
  // 事件判断
  'create.event-judgment': {
    group: 'Judge',
    className: 'icon-custom event-judgment-icon',
    attr: {
      title: '事件判断',
      icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png'
    },
    action: {
      // dragstart: createJudgment(),
      // click: createJudgment()
    }
  }
};
