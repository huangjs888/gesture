/*
 * @Author: Huangjs
 * @Date: 2023-08-23 09:36:07
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-10-16 14:58:09
 * @Description: ******
 */

import { type IElement, getElement } from '@huangjs888/lightdom';
import Core, { type IGestureOptions } from '../core';
import { started, moved, ended, canceled, downed, wheeled } from '../events';
import { isTouchable } from '../utils';

class Gesture extends Core {
  element: Element | null = null;
  _unbind: (() => void) | null = null;
  constructor(element: IElement, options?: IGestureOptions) {
    super(options);
    const _element = getElement(element);
    if (!_element) {
      throw new Error('Please pass in a valid element...');
    }
    this.element = _element;
    // 注册触摸事件
    if (isTouchable()) {
      const touchstarted = started.bind(this);
      const touchmoved = moved.bind(this);
      const touchended = ended.bind(this);
      const touchcanceled = canceled.bind(this);
      // Chrome 73之后，所有绑定在根节点（window,document,body）的scroll,wheel,mobile touch事件都会默认passive为true
      // 这就会导致事件内调用e.preventDefault()无效，还会报错：Unable to preventDefault inside passive event listener invocation.
      // 但是非根节点，默认还是false，但是为了防止后续浏览器变更，这里全部主动设置为false，capture为false表示冒泡阶段触发，e.stopPropagation()可用
      _element.addEventListener('touchstart', touchstarted, { capture: false, passive: false });
      _element.addEventListener('touchmove', touchmoved, { capture: false, passive: false });
      _element.addEventListener('touchend', touchended, { capture: false, passive: false });
      _element.addEventListener('touchcancel', touchcanceled, { capture: false, passive: false });
      this._unbind = () => {
        _element.removeEventListener('touchstart', touchstarted);
        _element.removeEventListener('touchmove', touchmoved);
        _element.removeEventListener('touchend', touchended);
        _element.removeEventListener('touchcancel', touchcanceled);
      };
    } else {
      // 注册触摸事件
      const mousedowned = downed.bind(this);
      const mousewheeled = wheeled.bind(this);
      _element.addEventListener('mousedown', mousedowned, { capture: false, passive: false });
      _element.addEventListener('wheel', mousewheeled, { capture: false, passive: false });
      this._unbind = () => {
        _element.removeEventListener('mousedown', mousedowned);
        _element.removeEventListener('wheel', mousewheeled);
      };
    }
  }
  destory() {
    // 解除所有事件
    super.off();
    // 解除手势事件
    if (this._unbind) {
      this._unbind();
      this._unbind = null;
      this.element = null;
    }
  }
}

export * from '../core';

export { Gesture, isTouchable };
