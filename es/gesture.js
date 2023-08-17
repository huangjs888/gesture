/*
 * @Author: Huangjs
 * @Date: 2023-02-13 15:22:58
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-08-04 15:13:10
 * @Description: ******
 */

import EventTarget from './event';
import { fixOption, isTouchable, getEventPoints, getDirection, getDistance, getAngle, getCenter, getVelocity, getVector } from './util';
function started(event) {
  const {
    points,
    isFirst
  } = getEventPoints(event, true);
  if (!points) {
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  const newEvent = {
    currentTarget: this.element,
    sourceEvent: event,
    timestamp: Date.now(),
    pointers: [],
    leavePointers: [],
    getPoint: () => [0, 0]
  };
  // 表示第一次放入手指（点）
  if (isFirst) {
    // 第一次点击，如果存在wheel没执行，需要执行掉
    if (this._wheelTimerEnd) {
      window.clearTimeout(this._wheelTimerEnd.timer);
      this._wheelTimerEnd.wheelEnd();
      this._wheelTimerEnd = null;
    }
    this._pointer0 = null;
    this._pointer1 = null;
  } else {
    if (this._pointer0) {
      this._pointer0.changed = false;
    }
    if (this._pointer1) {
      this._pointer1.changed = false;
    }
  }
  // 如果当前事件元素之外的屏幕上有手指（点），此时在事件元素上放一个手指（点），points会包含该手指（点）
  // 循环保存放在屏幕上的手指（点），这里只会保存最多两个，忽略超过三个的手指（点）（只对单指和双指情形处理）
  for (let i = 0, len = points.length; i < len; ++i) {
    const t = points[i];
    const p = [t.pageX, t.pageY];
    const pointer = {
      start: p,
      previous: p,
      current: p,
      identifier: t.identifier,
      changed: true
    };
    if (!this._pointer0) {
      this._pointer0 = pointer;
    } else if (!this._pointer1 && this._pointer0.identifier !== t.identifier) {
      this._pointer1 = pointer;
    }
  }
  // 每次进入时先阻止所有单指事件
  this._preventTap = true;
  this._preventSingleTap = true;
  this._preventDoubleTap = true;
  this._swipePoints = null;
  this._rotateAngle = 0;
  if (this._longTapTimer) {
    window.clearTimeout(this._longTapTimer);
    this._longTapTimer = null;
  }
  // 双指start
  const pointer0 = this._pointer0;
  const pointer1 = this._pointer1;
  if (pointer1 && pointer0) {
    this._firstPointer = null;
    newEvent.pointers = [pointer0, pointer1];
    newEvent.getPoint = () => getCenter(pointer0.current, pointer1.current);
    this.emit('gestureStart', newEvent);
  }
  // 单指start
  else if (pointer0) {
    newEvent.pointers = [pointer0];
    newEvent.getPoint = () => pointer0.current;
    this._preventTap = false;
    // 设置一个长按定时器
    this._longTapTimer = window.setTimeout(() => {
      // 当前点击一旦长按超过longTapInterval则触发longTap，则松开后不会再触发所有单指事件
      this._preventTap = true;
      this._preventSingleTap = true;
      this._preventDoubleTap = true;
      this._longTapTimer = null;
      this._firstPointer = null;
      newEvent.waitTime = this.longTapInterval;
      this.emit('longTap', newEvent);
    }, this.longTapInterval);
    const firstPointer = this._firstPointer;
    const singleTapTimer = this._singleTapTimer;
    if (singleTapTimer && firstPointer && getDistance(firstPointer.current, pointer0.current) < this.doubleTapDistance) {
      // 1，只要连续两次点击时间在doubleTapInterval之内，距离在doubleTapDistance内，无论第二次作何操作，都不会触发第一次的singleTap，但第一次的tap会触发
      // 2，如果满足第一条时，第二次的点击有多根手指（点），或者长按触发longTap，则不会再触发doubleTap，第二次的tap，singleTap也不会触发
      window.clearTimeout(singleTapTimer);
      this._singleTapTimer = null;
      this._preventSingleTap = true;
      this._preventDoubleTap = false;
      newEvent.getPoint = () => firstPointer.current;
    } else {
      this._firstPointer = pointer0;
      // 表示是第一次点击或该次点击距离上一次点击时间超过doubleTapInterval，距离超过doubleTapDistance
      this._preventSingleTap = false;
      this._preventDoubleTap = true;
    }
  }
  // 无指没有start
  else {
    return;
  }
  this.emit('pointerStart', newEvent);
}
function moved(event) {
  const {
    points
  } = getEventPoints(event);
  if (!points) {
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  const newEvent = {
    currentTarget: this.element,
    sourceEvent: event,
    timestamp: Date.now(),
    pointers: [],
    leavePointers: [],
    getPoint: () => [0, 0]
  };
  if (this._pointer0) {
    this._pointer0.changed = false;
  }
  if (this._pointer1) {
    this._pointer1.changed = false;
  }
  // 循环更新手指（点）
  for (let i = 0, len = points.length; i < len; ++i) {
    const t = points[i];
    const p = [t.pageX, t.pageY];
    if (this._pointer0 && this._pointer0.identifier === t.identifier) {
      this._pointer0.changed = true;
      this._pointer0.previous = this._pointer0.current;
      this._pointer0.current = p;
    } else if (this._pointer1 && this._pointer1.identifier === t.identifier) {
      this._pointer1.changed = true;
      this._pointer1.previous = this._pointer1.current;
      this._pointer1.current = p;
    }
  }
  // 手指（点）移动至少要有一个手指（点）移动超过touchMoveDistance才会触发移动事件

  const pointer0 = this._pointer0;
  const pointer1 = this._pointer1;
  if (pointer0 && getDistance(pointer0.start, pointer0.current) > this.touchMoveDistance || pointer1 && getDistance(pointer1.start, pointer1.current) > this.touchMoveDistance) {
    // 一旦移动，则阻止所有单指点击相关事件（除了swipe）
    this._preventTap = true;
    this._preventSingleTap = true;
    this._preventDoubleTap = true;
    this._firstPointer = null;
    if (this._longTapTimer) {
      window.clearTimeout(this._longTapTimer);
      this._longTapTimer = null;
    }
    // 双指移动情况
    if (pointer1 && pointer0) {
      newEvent.pointers = [pointer0, pointer1];
      const {
        start: start0,
        previous: previous0,
        current: current0
      } = pointer0;
      const {
        start: start1,
        previous: previous1,
        current: current1
      } = pointer1;
      // 双指平移
      const eCenter = getCenter(current0, current1);
      const mCenter = getCenter(previous0, previous1);
      const sCenter = getCenter(start0, start1);
      newEvent.getPoint = whichOne => whichOne === 'start' ? sCenter : whichOne === 'previous' ? mCenter : eCenter;
      newEvent.direction = getDirection(mCenter, eCenter);
      newEvent.moveDirection = getDirection(sCenter, eCenter);
      newEvent.deltaX = eCenter[0] - mCenter[0];
      newEvent.moveX = eCenter[0] - sCenter[0];
      newEvent.deltaY = eCenter[1] - mCenter[1];
      newEvent.moveY = eCenter[1] - sCenter[1];
      // 只有双指滑动时才会触发下面事件
      const eDistance = getDistance(current0, current1);
      const mDistance = getDistance(previous0, previous1);
      const sDistance = getDistance(start0, start1);
      if (sDistance > 0 && eDistance > 0 && mDistance > 0) {
        // 双指缩放
        newEvent.scale = eDistance / mDistance;
        newEvent.moveScale = eDistance / sDistance;
      }
      const eAngle = getAngle(current0, current1);
      const mAngle = getAngle(previous0, previous1);
      // const sAngle = getAngle(start0, start1);
      // 这里计算的三个angle均是向量（第一个参数为起点，第二个为终点）与x正半轴之间的夹角
      // 方向朝向y轴正半轴的为正值[0,180]，朝向y轴负半轴的为负值[-180,0]
      // 注意，这里坐标轴是页面坐标，x轴向右正方向，y轴向下正方向，原点在左上角
      let angle = eAngle - mAngle;
      if (angle < -180) {
        // 此种情况属于顺时针转动时mAngle突然由正变为负值（比如由178度顺时针旋转4度都-178度）
        // 这种情况，因为eAngle和mAngle是两次相邻的移动事件，间隔角度很小（4度）而不会是很大的（-356度）
        angle += 360;
      } else if (angle > 180) {
        // 和上面相反逆时针转动（比如由-178逆时针旋转4度到178）
        angle -= 360;
      }
      // 双指旋转本次和上一次的角度，正值顺时针，负值逆时针
      newEvent.angle = angle;
      // 双指旋转起点到终点的总旋转角度，正值顺时针，负值逆时针
      // 这里不能直接使用eAngle-sAngle，否则顺逆时针分不清，需要通过angle累加
      this._rotateAngle += angle;
      newEvent.moveAngle = this._rotateAngle;
      this.emit('rotate', newEvent);
      if (sDistance > 0 && eDistance > 0 && mDistance > 0) {
        this.emit('scale', newEvent);
      }
      this.emit('multiPan', newEvent);
      this.emit('gestureMove', newEvent);
    }
    // 单指移动
    else if (pointer0) {
      newEvent.pointers = [pointer0];
      const {
        start,
        previous,
        current
      } = pointer0;
      newEvent.getPoint = whichOne => whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
      newEvent.direction = getDirection(previous, current);
      newEvent.moveDirection = getDirection(start, current);
      newEvent.deltaX = current[0] - previous[0];
      newEvent.moveX = current[0] - start[0];
      newEvent.deltaY = current[1] - previous[1];
      newEvent.moveY = current[1] - start[1];
      const _timestamp = Date.now();
      // 第一次移动this._swipePoints为null
      const _swipePoints = this._swipePoints || [[], []];
      const _duration = _timestamp - ((_swipePoints[1][0] ? _swipePoints[1][0].timestamp : 0) || 0);
      // 当前时间与本阶段初始时间之差大于计入swipe的时间(swipeDuration)，则本阶段过时，下阶段开启
      if (_duration > this.swipeDuration) {
        // 将本阶段作为上一阶段，开启下一阶段作为本阶段
        _swipePoints[0] = _swipePoints[1];
        _swipePoints[1] = [];
      }
      // 将当前移动点和时间存入本阶段
      _swipePoints[1].push({
        point: current,
        timestamp: _timestamp
      });
      this._swipePoints = _swipePoints;
      // 触发单指平移事件
      this.emit('pan', newEvent);
    }
    // 无指无移动
    else {
      return;
    }
    this.emit('pointerMove', newEvent);
  }
}
function ended(event) {
  const {
    points
  } = getEventPoints(event);
  if (!points) {
    return;
  }
  event.stopImmediatePropagation();
  const newEvent = {
    currentTarget: this.element,
    sourceEvent: event,
    timestamp: Date.now(),
    pointers: [],
    leavePointers: [],
    getPoint: () => [0, 0]
  };
  // 临时保存当前手指（点）
  let pointer0 = null;
  let pointer1 = null;
  if (this._pointer0) {
    this._pointer0.changed = false;
  }
  if (this._pointer1) {
    this._pointer1.changed = false;
  }
  // 循环删除已经拿开的手指（点）
  for (let i = 0, len = points.length; i < len; ++i) {
    const t = points[i];
    if (this._pointer0 && this._pointer0.identifier === t.identifier) {
      this._pointer0.changed = true;
      pointer0 = this._pointer0;
      this._pointer0 = null;
    } else if (this._pointer1 && this._pointer1.identifier === t.identifier) {
      this._pointer1.changed = true;
      pointer1 = this._pointer1;
      this._pointer1 = null;
    }
  }
  // 双指变单指
  if (this._pointer1 && !this._pointer0) {
    this._pointer0 = this._pointer1;
    this._pointer1 = null;
    pointer1 = pointer0;
    pointer0 = null;
  }
  // 松开时清除longTapTimer（一旦松开就不存在长按，当然有可能已经发生过了）
  if (this._longTapTimer) {
    window.clearTimeout(this._longTapTimer);
    this._longTapTimer = null;
  }
  // 仍然存在至少一根手指（点）
  if (this._pointer0) {
    newEvent.pointers = [this._pointer0];
    if (this._pointer1) {
      // 剩余两指
      newEvent.pointers.push(this._pointer1);
    } else if (pointer1) {
      // 剩余一指
      newEvent.leavePointers = [pointer1];
    }
    const start = getCenter(this._pointer0.start, this._pointer1 ? this._pointer1.start : pointer1 ? pointer1.start : []);
    const previous = getCenter(this._pointer0.previous, this._pointer1 ? this._pointer1.previous : pointer1 ? pointer1.previous : []);
    const current = getCenter(this._pointer0.current, this._pointer1 ? this._pointer1.current : pointer1 ? pointer1.current : []);
    newEvent.getPoint = whichOne => whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
    this.emit('gestureEnd', newEvent);
  }
  // 全部拿开
  else if (pointer0) {
    // 多指的最后一指抬起，仅仅一指抬起
    newEvent.leavePointers = [pointer0];
    if (pointer1) {
      // 双指同时抬起
      newEvent.leavePointers.push(pointer1);
    }
    const start = pointer1 ? getCenter(pointer0.start, pointer1.start) : pointer0.start;
    const previous = pointer1 ? getCenter(pointer0.previous, pointer1.previous) : pointer0.previous;
    const current = pointer1 ? getCenter(pointer0.current, pointer1.current) : pointer0.current;
    newEvent.getPoint = whichOne => whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
    if (!this._preventTap) {
      this.emit('tap', newEvent);
    }
    if (!this._preventSingleTap) {
      // 等待doubleTapInterval，如果时间内没有点击第二次，则触发
      this._singleTapTimer = window.setTimeout(() => {
        this._singleTapTimer = null;
        newEvent.delayTime = this.doubleTapInterval;
        this.emit('singleTap', newEvent);
      }, this.doubleTapInterval);
    }
    if (!this._preventDoubleTap) {
      // 双击点使用第一次的点
      const firstPointer = this._firstPointer;
      if (firstPointer) {
        newEvent.getPoint = () => firstPointer.current;
      }
      newEvent.intervalTime = this.doubleTapInterval;
      this.emit('doubleTap', newEvent);
    }
    // this._swipePoints存在表示开始了swipe行为
    if (this._swipePoints) {
      const [prev, next] = this._swipePoints;
      // 最后一次移动的点即为swipe终点
      const endPos = next[next.length - 1];
      // 最后一次移动点的时间减去手指（点）抬起的时间，此间隔时间需小于等待时间raiseDuration，否则视为停止swipe
      if (Date.now() - endPos.timestamp <= this.raiseDuration) {
        // 找到计入swipe的时间(swipeDuration)内的swipe起点
        let startPos = next[0];
        for (let i = prev.length - 1; i >= 0; i--) {
          if (endPos.timestamp - prev[i].timestamp <= this.swipeDuration) {
            startPos = prev[i];
          } else {
            break;
          }
        }
        // 根据swipe起点和终点的距离差与时间差算出swipe抬起时速率
        const velocity = getVelocity(endPos.timestamp - startPos.timestamp, getDistance(startPos.point, endPos.point));
        // swipe速率需要大于swipeVelocity，否则忽略不计，不视为swipe
        if (velocity > this.swipeVelocity) {
          // 滑动方向与x夹角
          const angle = getAngle(startPos.point, endPos.point);
          // 惯性的方向
          newEvent.direction = getDirection(startPos.point, endPos.point);
          newEvent.angle = angle;
          newEvent.velocity = velocity;
          // 给出按照velocity速度滑动，当速度减到0时的计算函数：
          // 当给出时间t，即在t时间内速度减到0，求出滑动的距离：
          // 当给出减速度a，即在减速度a的作用下，速度减到0，求出滑动的距离，和消耗的时间：
          // 减速度某个时间的位移：s = v0 * t - (a * t * t) / 2
          // 减速度某个时间的速度：v = v0 - a * t
          // s为滑动距离，v末速度为0，v0初速度为velocity
          newEvent.swipeComputed = (factor, _velocity = velocity) => {
            // 因子大于1可以认为传入的是时间毫秒数
            let duration = 0;
            let deceleration = 0;
            let distance = 0;
            if (factor > 1) {
              duration = factor;
              deceleration = _velocity / duration;
              distance = _velocity * duration / 2;
            }
            // 因子小于1可以认为传入的是减速度（减速如果大于1一般太大了，不符合使用场景）
            else if (factor > 0) {
              deceleration = factor;
              duration = _velocity / deceleration;
              distance = _velocity * _velocity / (2 * deceleration);
            }
            const [stretchX, stretchY] = getVector(distance, angle);
            return {
              duration,
              // swipe速率减到0花费的时间
              stretchX,
              // x方向swipe惯性距离（抬起后，继续移动的距离）
              stretchY,
              // y方向swipe惯性距离（抬起后，继续移动的距离）
              deceleration // swipe速率减到0的减速度
            };
          };

          this.emit('swipe', newEvent);
        }
      }
    }
  }
  this.emit('pointerEnd', newEvent);
  /* // 只剩下一根在上面了，以下事件交给用户自行放在pointerEnd事件里自行判断
  if (this._pointer0 && !this._pointer1) {
    // 双指抬起，只剩下一指，此时就认为该点是移动的起点（否则会把双指移动的起点作为起点，移动时会出现跳跃）
    this._pointer0.start = this._pointer0.previous = this._pointer0.current;
    // 同时可以触发一次start事件
    newEvent.pointers = [this._pointer0];
    newEvent.pointer = this._pointer0;
    this.emit('pointerStart', newEvent);
  } */
}

function canceled(event) {
  event.stopImmediatePropagation();
  this.emit('pointerCancel', {
    currentTarget: this.element,
    sourceEvent: event,
    timestamp: Date.now(),
    pointers: [],
    leavePointers: [],
    getPoint: () => [0, 0]
  });
  ended.apply(this, [event]);
}
function scrolled() {
  if (this._singleTapTimer) {
    window.clearTimeout(this._singleTapTimer);
    this._singleTapTimer = null;
  }
  if (this._longTapTimer) {
    window.clearTimeout(this._longTapTimer);
    this._longTapTimer = null;
  }
  if (this._wheelTimerEnd) {
    window.clearTimeout(this._wheelTimerEnd.timer);
    this._wheelTimerEnd = null;
  }
  this._firstPointer = null;
  this._pointer0 = null;
  this._pointer1 = null;
  this._preventTap = true;
  this._swipePoints = null;
  this._preventSingleTap = true;
  this._preventDoubleTap = true;
}
function downed(event) {
  const that = this;
  window.addEventListener('mousemove', mousemoved);
  window.addEventListener('mouseup', mouseupped);
  window.addEventListener('blur', blured);
  window.addEventListener('dragstart', dragstarted, {
    capture: true,
    passive: false
  });
  if ('onselectstart' in window.document.documentElement) {
    window.addEventListener('selectstart', dragstarted, {
      capture: true,
      passive: false
    });
  }
  function unbind() {
    window.removeEventListener('mousemove', mousemoved);
    window.removeEventListener('mouseup', mouseupped);
    window.removeEventListener('blur', blured);
    window.removeEventListener('dragstart', dragstarted);
    if ('onselectstart' in window.document.documentElement) {
      window.removeEventListener('selectstart', dragstarted);
    }
  }
  function blured(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    unbind();
  }
  function dragstarted(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  function mousemoved(e) {
    if (event.button === 0) {
      moved.apply(that, [e]);
    } else {
      e.preventDefault();
      e.stopImmediatePropagation();
      const newEvent = {
        currentTarget: that.element,
        sourceEvent: event,
        timestamp: Date.now(),
        pointers: [],
        leavePointers: [],
        getPoint: () => [0, 0]
      };
      const point = [e.pageX, e.pageY];
      if (that._pointer0) {
        that._pointer0.previous = that._pointer0.current;
        that._pointer0.current = point;
        newEvent.pointers = [that._pointer0];
        const {
          start,
          previous,
          current
        } = that._pointer0;
        newEvent.getPoint = whichOne => whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
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
  function mouseupped(e) {
    unbind();
    if (event.button === 0) {
      ended.apply(that, [e]);
    } else {
      e.stopImmediatePropagation();
      const newEvent = {
        currentTarget: that.element,
        sourceEvent: event,
        timestamp: Date.now(),
        pointers: [],
        leavePointers: [],
        getPoint: () => [0, 0]
      };
      const point = [e.pageX, e.pageY];
      if (that._pointer0) {
        const pointer0 = that._pointer0;
        that._pointer0 = null;
        pointer0.previous = pointer0.current;
        pointer0.current = point;
        newEvent.leavePointers = [pointer0];
        const {
          start,
          previous,
          current
        } = pointer0;
        newEvent.getPoint = whichOne => whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
      }
      newEvent.angle = 0 / 0;
      that.emit('rotate', newEvent);
    }
  }
  if (event.button === 0) {
    started.apply(that, [event]);
  } else {
    event.preventDefault();
    event.stopImmediatePropagation();
    // 如果存在wheel没执行，需要执行掉
    if (that._wheelTimerEnd) {
      window.clearTimeout(that._wheelTimerEnd.timer);
      that._wheelTimerEnd.wheelEnd();
      that._wheelTimerEnd = null;
    }
    const point = [event.pageX, event.pageY];
    that._pointer0 = {
      start: point,
      previous: point,
      current: point,
      identifier: -1,
      changed: true
    };
  }
}
function wheeled(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  const newEvent = {
    currentTarget: this.element,
    sourceEvent: event,
    timestamp: Date.now(),
    pointers: [],
    leavePointers: [],
    getPoint: () => [0, 0]
  };
  const point = [event.pageX, event.pageY];
  if (this._wheelTimerEnd) {
    if (this._pointer0) {
      this._pointer0.previous = this._pointer0.current;
      this._pointer0.current = point;
    }
    window.clearTimeout(this._wheelTimerEnd.timer);
    // wheelRoll
  } else {
    this._pointer0 = {
      start: point,
      previous: point,
      current: point,
      identifier: -1,
      changed: true
    };
    // wheelstart
  }

  const wheelEnd = () => {
    this._pointer0 = null;
    this._wheelTimerEnd = null;
    newEvent.timestamp = Date.now();
    // 表示滚轮结束，不参与计算
    newEvent.scale = 0 / 0;
    this.emit('scale', newEvent);
    // wheelEnd
  };

  this._wheelTimerEnd = {
    wheelEnd,
    timer: window.setTimeout(wheelEnd, this.wheelDelay),
    scale: this._wheelTimerEnd ? this._wheelTimerEnd.scale : 1
  };
  if (this._pointer0) {
    newEvent.pointers = [this._pointer0];
    const {
      start,
      previous,
      current
    } = this._pointer0;
    newEvent.getPoint = whichOne => whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
    const scale = Math.pow(2, -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002));
    this._wheelTimerEnd.scale *= scale;
    newEvent.moveScale = this._wheelTimerEnd.scale;
    newEvent.scale = scale;
    this.emit('scale', newEvent);
  }
}
class Gesture extends EventTarget {
  constructor(element, options) {
    super();
    this._rotateAngle = 0;
    this._singleTapTimer = null;
    this._longTapTimer = null;
    this._wheelTimerEnd = null;
    this._preventTap = true;
    this._swipePoints = null;
    this._preventSingleTap = true;
    this._preventDoubleTap = true;
    this._firstPointer = null;
    this._pointer0 = null;
    this._pointer1 = null;
    this._destory = null;
    let tempElement;
    if (typeof element === 'string') {
      tempElement = document.querySelector(element);
    } else {
      tempElement = element;
    }
    if (!tempElement || !(tempElement instanceof HTMLElement)) {
      throw new Error('Please pass in a valid element...');
    }
    this.element = tempElement;
    const {
      wheelDelay,
      longTapInterval,
      doubleTapInterval,
      doubleTapDistance,
      touchMoveDistance,
      swipeVelocity,
      swipeDuration,
      raiseDuration
    } = options || {};
    this.wheelDelay = fixOption(wheelDelay, 350, 1);
    this.longTapInterval = fixOption(longTapInterval, 750, 1);
    this.doubleTapInterval = fixOption(doubleTapInterval, 250, 1);
    this.doubleTapDistance = fixOption(doubleTapDistance, 30, 1);
    this.touchMoveDistance = fixOption(touchMoveDistance, 3, 0);
    this.swipeVelocity = fixOption(swipeVelocity, 0.3, 0);
    this.swipeDuration = fixOption(swipeDuration, 100, 1);
    this.raiseDuration = fixOption(raiseDuration, 100, 1);
    // 注册触摸事件
    const tmscrolled = scrolled.bind(this);
    if (isTouchable(this.element)) {
      const touchstarted = started.bind(this);
      const touchmoved = moved.bind(this);
      const touchended = ended.bind(this);
      const touchcanceled = canceled.bind(this);
      this.element.addEventListener('touchstart', touchstarted, false);
      this.element.addEventListener('touchmove', touchmoved, false);
      this.element.addEventListener('touchend', touchended, false);
      this.element.addEventListener('touchcancel', touchcanceled, false);
      window.addEventListener('scroll', tmscrolled);
      this._destory = () => {
        this.element.removeEventListener('touchstart', touchstarted);
        this.element.removeEventListener('touchmove', touchmoved);
        this.element.removeEventListener('touchend', touchended);
        this.element.removeEventListener('touchcancel', touchcanceled);
        window.removeEventListener('scroll', tmscrolled);
      };
    } else {
      // 注册触摸事件
      const mousedowned = downed.bind(this);
      this.element.addEventListener('mousedown', mousedowned, false);
      const mousewheeled = wheeled.bind(this);
      this.element.addEventListener('wheel', mousewheeled, false);
      window.addEventListener('scroll', tmscrolled);
      this._destory = () => {
        this.element.removeEventListener('mousedown', mousedowned);
        this.element.removeEventListener('wheel', mousewheeled);
        window.removeEventListener('scroll', tmscrolled);
      };
    }
  }
  isTouch() {
    return isTouchable(this.element);
  }
  destory() {
    // 解除所有事件
    super.off();
    scrolled.apply(this);
    // 解除手势事件
    if (this._destory) {
      this._destory();
      this._destory = null;
    }
  }
}

// 双（多）指结束
/**
 * swipe思路:
 * 根据移动停止前swipeDuration时间内移动的距离和时间算出速度，
 * 速度大于swipeVelocity，并且移动停止后到手指（点）抬起时间间隔小于raiseDuration即为swipe
 * 移动停止就是最后一次触发move事件
 * 0. start 清空_swipePoints
 * 1. move 每swipeDuration时间内所移动的点分为一组，只保留上一次swipeDuration时间组和这一次swipeDuration时间组，存储在_swipePoints内
 * 2. end 松开手时, 在_swipePoints内找到起终点，根据起终点距离和时间差算出速度，然后算出其他值
 */
export default Gesture;