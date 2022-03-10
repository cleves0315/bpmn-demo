/* eslint-disable import/no-extraneous-dependencies */

/**
 * Palette区域 标题模板
 */
export const PaletteTitleTmlp = {
  group: '',
  className: 'text-custom', // title统一样式类名
  attr: { title: '' }
};

/**
 * Palette区域 图元模板
 */
export const CustomPaletteTmlp = {
  group: '',
  className: 'icon-custom', // icon统一样式类名
  attr: { // 图元携带的数据-(除了以下2个属性 可再额外拓展, 触发事件时可以获取到)
    title: '', // 必须 - 图元拖拽到画布展示的名称
    icon: '' // 必须 - 图元拖拽到画布渲染的logo
  },
  action: {} // 绑定事件时使用的属性
};

/**
 * CustomPalette 数据模板
 */
// const CustomPalette = {
// 开始事件
//   'start-text': {
// 图元标题
//     group: 'startEvent', // 同名的group会被包裹在同个层级
//     className: 'text-custom start-text', // 注意：text-custom 这个类名会影响CustomPalette.js是否要为该元素绑定事件
//     attr: {
//       title: '开始事件', // 必须 - 图元拖拽到画布展示的名称
//     },
//   },
// 公众号
//   'official-account': { // 图元
//     group: 'startEvent',
//     className: 'icon-custom official-account-icon', // icon-custom 图元元素统一样式
//     attr: {
//       title: '公众号123', // 必须 - 图元拖拽到画布展示的名称
//       icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png' // 必须 - 图元拖拽到画布渲染的logo
//     },
//     action: { // 绑定事件时使用的属性
//       dragstart: createStartEvent(MINIPROGRAMS),
//       click: createStartEvent(MINIPROGRAMS)
//    }
//   },
// 小程序
//   'create.mini-programs': {
//     group: 'startEvent',
//     className: 'icon-custom mini-programs-icon',
//     attr: {
//       title: '公众号123', // 必须 - 图元拖拽到画布展示的名称
//       icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png' // 必须 - 图元拖拽到画布渲染的logo
//     },
//     action: {}
//   },
// ====== ↓ 另一个group ======
// 活动事件
//   'create.activity-text': {
//     group: 'activityEvent',
//     className: 'text-custom activity-text',
//     attr: {
//       title: '活动事件'
//     },
//   },
// 发送消息
//   'create.send-message': {
//     group: 'activityEvent',
//     className: 'icon-custom send-message-icon',
//     attr: {
//       title: '公众号123', // 必须 - 图元拖拽到画布展示的名称
//       icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png' // 必须 - 图元拖拽到画布渲染的logo
//     },
//     action: {
//       dragstart: createTask(SENDMESSAGE),
//       click: createTask(SENDMESSAGE)
//     }
//   },
// 送优惠券
//   'create.send-coupons': {
//     group: 'activityEvent',
//     attr: {
//       title: '公众号123', // 必须 - 图元拖拽到画布展示的名称
//       icon: 'https://assets-img.ezrpro.com/pc/icon/crm/cdp-official-account-icon2.png' // 必须 - 图元拖拽到画布渲染的logo
//     },
//     className: 'icon-custom send-coupons-icon',
//     action: {
//        dragstart: createTask(SENDCOUPONS),
//        click: createTask(SENDCOUPONS)
//     }
//   }
// }
