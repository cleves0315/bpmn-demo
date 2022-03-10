/* eslint-disable consistent-return */
/* eslint-disable no-new-wrappers */
/* eslint-disable import/no-extraneous-dependencies */
import { some } from 'min-dash';

// 获取字符串长度  字符串实际长度，中文2，英文1
const getStrLength = (str) => {
  let realLength = 0;
  const len = str.length;
  let
    charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    } else {
      realLength += 2;
    }
  }
  return realLength;
};

const cutstr = (str, len) => {
  let strLength = 0;
  let strLen = 0;
  let strcut = new String();
  strLen = str.length;
  for (let i = 0; i < strLen; i++) {
    const a = str.charAt(i);
    strLength++;
    if (escape(a).length > 4) {
      // 中文字符的长度经编码之后大于4
      strLength++;
    }
    strcut = strcut.concat(a);
    if (strLength >= len) {
      strcut = strcut.concat("...");
      return strcut;
    }
  }
  // 如果给定字符串小于指定长度，则返回源字符串；
  if (strLength < len) {
    return str;
  }
};

/**
 * Return the business object for a given element.
 *
 * @param  {djs.model.Base|ModdleElement} element
 *
 * @return {ModdleElement}
 */
function getBusinessObject(element) {
  return (element && element.businessObject) || element;
}

function setConnectTypeToStorage(type) {
  sessionStorage.setItem('Connection_Type', type);
}
function getConnectTypeFromStorage() {
  const item = sessionStorage.getItem('Connection_Type');
  return item;
}

/**
 * Is an element of the given BPMN type?
 *
 * @param  {djs.model.Base|ModdleElement} element
 * @param  {String} type
 *
 * @return {Boolean}
 */
function is(element, type) {
  const bo = getBusinessObject(element);

  return bo && (typeof bo.$instanceOf === 'function') && bo.$instanceOf(type);
}

/**
 * Return true if element has any of the given types.
 *
 * @param {djs.model.Base} element
 * @param {Array<String>} types
 *
 * @return {Boolean}
 */
function isAny(element, types) {
  return some(types, t => is(element, t));
}

export {
  getStrLength,
  getBusinessObject,
  is,
  cutstr,
  isAny,
  setConnectTypeToStorage,
  getConnectTypeFromStorage
};
