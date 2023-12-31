/*
 * @Author: Huangjs
 * @Date: 2023-08-23 11:27:38
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-10-23 14:37:27
 * @Description: ******
 */

import started from './started';
import moved from './moved';
import ended from './ended';
import { preventDefault, stopPropagation, stopImmediatePropagation } from './common';
import { getDistance, getDirection } from '../utils';
import type Core from '../core';
import { type IGestureEvent } from '../core';

export default function downed(this: Core, event: any) {
  const that = this;
  if (that._noMouseTimer) {
    return;
  }
  if (typeof window !== 'undefined') {
    // Chrome 73之后，所有绑定在根节点（window,document,body）的scroll,wheel,mobile touch事件都会默认passive为true
    // 这就会导致事件内调用e.preventDefault()无效，还会报错：Unable to preventDefault inside passive event listener invocation.
    // 这里设置为false，capture为false表示冒泡阶段触发，e.stopPropagation()可用
    window.addEventListener('mousemove', mousemoved, {
      capture: false,
      passive: false,
    });
    window.addEventListener('mouseup', mouseupped, {
      capture: false,
      passive: false,
    });
    window.addEventListener('blur', blured, {
      capture: true,
      passive: false,
    });
    // capture为true使其为捕获阶段就执行
    window.addEventListener('dragstart', dragstarted, {
      capture: true,
      passive: false,
    });
    if ('onselectstart' in window.document.documentElement) {
      // capture为true使其为捕获阶段就执行
      window.addEventListener('selectstart', dragstarted, {
        capture: true,
        passive: false,
      });
    }
  }
  function unbind() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', mousemoved);
      window.removeEventListener('mouseup', mouseupped);
      window.removeEventListener('blur', blured);
      window.removeEventListener('dragstart', dragstarted);
      if ('onselectstart' in window.document.documentElement) {
        window.removeEventListener('selectstart', dragstarted);
      }
    }
  }
  function dragstarted(e: Event) {
    e.preventDefault();
  }
  function blured(e: Event) {
    dragstarted(e);
    unbind();
  }
  function mousemoved(e: MouseEvent) {
    if (event.button === 0) {
      moved.apply(that, [e]);
    } else {
      const newEvent: IGestureEvent = {
        sourceEvent: e,
        timestamp: Date.now(),
        pointers: [],
        leavePointers: [],
        getPoint: () => [0, 0],
        isTouching: () => false,
        preventDefault: preventDefault.bind(e),
        stopPropagation: stopPropagation.bind(e),
        stopImmediatePropagation: stopImmediatePropagation.bind(e),
      };
      const point = [e.pageX, e.pageY];
      if (that._pointer0 && getDistance(that._pointer0.start, point) > that.touchMoveDistance) {
        that._pointer0.previous = that._pointer0.current;
        that._pointer0.current = point;
        newEvent.pointers = [that._pointer0];
        const { start, previous, current } = that._pointer0;
        newEvent.getPoint = (whichOne) =>
          whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
        newEvent.direction = getDirection(previous, current);
        newEvent.moveDirection = getDirection(start, current);
        newEvent.deltaX = current[0] - previous[0];
        newEvent.moveX = current[0] - start[0];
        newEvent.deltaY = current[1] - previous[1];
        newEvent.moveY = current[1] - start[1];
        // 根据移动距离计算：1度 = 4px; 正值顺时针，负值逆时针
        newEvent.angle = newEvent.deltaX / 4;
        newEvent.moveAngle = newEvent.moveX / 4;
        that.emit('rotate', newEvent);
      }
    }
  }
  function mouseupped(e: MouseEvent) {
    unbind();
    if (event.button === 0) {
      ended.apply(that, [e]);
    } else {
      const newEvent: IGestureEvent = {
        sourceEvent: e,
        timestamp: Date.now(),
        pointers: [],
        leavePointers: [],
        getPoint: () => [0, 0],
        isTouching: () => false,
        preventDefault: preventDefault.bind(e),
        stopPropagation: stopPropagation.bind(e),
        stopImmediatePropagation: stopImmediatePropagation.bind(e),
      };
      const point = [e.pageX, e.pageY];
      if (that._pointer0) {
        const pointer0 = that._pointer0;
        that._pointer0 = null;
        pointer0.previous = pointer0.current;
        pointer0.current = point;
        newEvent.leavePointers = [pointer0];
        const { start, previous, current } = pointer0;
        newEvent.getPoint = (whichOne) =>
          whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
      }
      newEvent.angle = 0 / 0;
      that.emit('rotate', newEvent);
    }
  }
  if (event.button === 0) {
    started.apply(that, [event]);
  } else {
    // 如果存在wheel没执行，需要执行掉
    if (that._wheelTimerEnd) {
      clearTimeout(that._wheelTimerEnd.timer);
      that._wheelTimerEnd.wheelEnd();
      that._wheelTimerEnd = null;
    }
    const point = [event.pageX, event.pageY];
    that._pointer0 = {
      start: point,
      previous: point,
      current: point,
      identifier: -1,
      changed: true,
    };
  }
}
