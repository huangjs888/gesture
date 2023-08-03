"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _event = _interopRequireDefault(require("./event"));
var _util = require("./util");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function started(event) {
  var _this = this;
  var _getEventPoints = (0, _util.getEventPoints)(event, true),
    points = _getEventPoints.points,
    isFirst = _getEventPoints.isFirst;
  if (!points) {
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  var newEvent = {
    currentTarget: this.element,
    sourceEvent: event,
    timestamp: Date.now(),
    pointer: [],
    point: []
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
  }
  // 如果当前事件元素之外的屏幕上有手指（点），此时在事件元素上放一个手指（点），points会包含该手指（点）
  // 循环保存放在屏幕上的手指（点），这里只会保存最多两个，忽略超过三个的手指（点）（只对单指和双指情形处理）
  for (var i = 0, len = points.length; i < len; ++i) {
    var t = points[i];
    var p = [t.pageX, t.pageY];
    var pointer = {
      start: p,
      move: p,
      end: p,
      id: t.identifier
    };
    if (!this._pointer0) {
      this._pointer0 = pointer;
    } else if (!this._pointer1 && this._pointer0.id !== t.identifier) {
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
  if (this._pointer1 && this._pointer0) {
    this._firstPoint = null;
    newEvent.pointer = [this._pointer0, this._pointer1];
    var _p = (0, _util.getCenter)(this._pointer0.start, this._pointer1.start);
    newEvent.point = [_p, _p, _p];
    this.emit('gestureStart', newEvent);
  }
  // 单指start
  else if (this._pointer0) {
    newEvent.pointer = [this._pointer0];
    var _p2 = this._pointer0.start;
    newEvent.point = [_p2, _p2, _p2];
    this._preventTap = false;
    // 设置一个长按定时器
    this._longTapTimer = window.setTimeout(function () {
      // 当前点击一旦长按超过longTapInterval则触发longTap，则松开后不会再触发所有单指事件
      _this._preventTap = true;
      _this._preventSingleTap = true;
      _this._preventDoubleTap = true;
      _this._longTapTimer = null;
      _this._firstPoint = null;
      if (_this._pointer0) {
        newEvent.waitTime = _this.longTapInterval;
        _this.emit('longTap', newEvent);
      }
    }, this.longTapInterval);
    if (this._singleTapTimer && this._firstPoint && (0, _util.getDistance)(this._firstPoint, this._pointer0.start) < this.doubleTapDistance) {
      // 1，只要连续两次点击时间在doubleTapInterval之内，距离在doubleTapDistance内，无论第二次作何操作，都不会触发第一次的singleTap，但第一次的tap会触发
      // 2，如果满足第一条时，第二次的点击有多根手指（点），或者长按触发longTap，则不会再触发doubleTap，第二次的tap，singleTap也不会触发
      window.clearTimeout(this._singleTapTimer);
      this._singleTapTimer = null;
      this._preventSingleTap = true;
      this._preventDoubleTap = false;
      newEvent.point = [this._firstPoint, this._firstPoint, this._firstPoint];
    } else {
      this._firstPoint = this._pointer0.start;
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
  var _getEventPoints2 = (0, _util.getEventPoints)(event),
    points = _getEventPoints2.points;
  if (!points) {
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  var newEvent = {
    currentTarget: this.element,
    sourceEvent: event,
    timestamp: Date.now(),
    pointer: [],
    point: []
  };
  // 循环更新手指（点）
  for (var i = 0, len = points.length; i < len; ++i) {
    var t = points[i];
    var p = [t.pageX, t.pageY];
    if (this._pointer0 && this._pointer0.id === t.identifier) {
      this._pointer0.move = this._pointer0.end;
      this._pointer0.end = p;
    } else if (this._pointer1 && this._pointer1.id === t.identifier) {
      this._pointer1.move = this._pointer1.end;
      this._pointer1.end = p;
    }
  }
  // 手指（点）移动至少要有一个手指（点）移动超过touchMoveDistance才会触发移动事件
  if (this._pointer0 && (0, _util.getDistance)(this._pointer0.start, this._pointer0.end) > this.touchMoveDistance || this._pointer1 && (0, _util.getDistance)(this._pointer1.start, this._pointer1.end) > this.touchMoveDistance) {
    // 一旦移动，则阻止所有单指点击相关事件（除了swipe）
    this._preventTap = true;
    this._preventSingleTap = true;
    this._preventDoubleTap = true;
    this._firstPoint = null;
    if (this._longTapTimer) {
      window.clearTimeout(this._longTapTimer);
      this._longTapTimer = null;
    }
    // 双指移动情况
    if (this._pointer1 && this._pointer0) {
      newEvent.pointer = [this._pointer0, this._pointer1];
      // 双指平移
      var eCenter = (0, _util.getCenter)(this._pointer0.end, this._pointer1.end);
      var mCenter = (0, _util.getCenter)(this._pointer0.move, this._pointer1.move);
      var sCenter = (0, _util.getCenter)(this._pointer0.start, this._pointer1.start);
      newEvent.point = [sCenter, mCenter, eCenter];
      newEvent.direction = (0, _util.getDirection)(mCenter, eCenter);
      newEvent.moveDirection = (0, _util.getDirection)(sCenter, eCenter);
      newEvent.deltaX = eCenter[0] - mCenter[0];
      newEvent.moveX = eCenter[0] - sCenter[0];
      newEvent.deltaY = eCenter[1] - mCenter[1];
      newEvent.moveY = eCenter[1] - sCenter[1];
      // 只有双指滑动时才会触发下面事件
      var eDistance = (0, _util.getDistance)(this._pointer0.end, this._pointer1.end);
      var mDistance = (0, _util.getDistance)(this._pointer0.move, this._pointer1.move);
      var sDistance = (0, _util.getDistance)(this._pointer0.start, this._pointer1.start);
      if (sDistance > 0 && eDistance > 0 && mDistance > 0) {
        // 双指缩放
        newEvent.scale = eDistance / mDistance;
        newEvent.moveScale = eDistance / sDistance;
      }
      var eAngle = (0, _util.getAngle)(this._pointer0.end, this._pointer1.end);
      var mAngle = (0, _util.getAngle)(this._pointer0.move, this._pointer1.move);
      // const sAngle = getAngle(this._pointer0.start, this._pointer1.start);
      // 这里计算的三个angle均是向量（第一个参数为起点，第二个为终点）与x正半轴之间的夹角
      // 方向朝向y轴正半轴的为正值[0,180]，朝向y轴负半轴的为负值[-180,0]
      // 注意，这里坐标轴是页面坐标，x轴向右正方向，y轴向下正方向，原点在左上角
      var angle = eAngle - mAngle;
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
    else if (this._pointer0) {
      newEvent.pointer = [this._pointer0];
      var _this$_pointer = this._pointer0,
        start = _this$_pointer.start,
        move = _this$_pointer.move,
        end = _this$_pointer.end;
      newEvent.point = [start, move, end];
      newEvent.direction = (0, _util.getDirection)(move, end);
      newEvent.moveDirection = (0, _util.getDirection)(start, end);
      newEvent.deltaX = end[0] - move[0];
      newEvent.moveX = end[0] - start[0];
      newEvent.deltaY = end[1] - move[1];
      newEvent.moveY = end[1] - start[1];
      var _timestamp = Date.now();
      // 第一次移动this._swipePoints为null
      var _swipePoints = this._swipePoints || [[], []];
      var _duration = _timestamp - ((_swipePoints[1][0] ? _swipePoints[1][0].timestamp : 0) || 0);
      // 当前时间与本阶段初始时间之差大于计入swipe的时间(swipeDuration)，则本阶段过时，下阶段开启
      if (_duration > this.swipeDuration) {
        // 将本阶段作为上一阶段，开启下一阶段作为本阶段
        _swipePoints[0] = _swipePoints[1];
        _swipePoints[1] = [];
      }
      // 将当前移动点和时间存入本阶段
      _swipePoints[1].push({
        point: this._pointer0.end,
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
  var _this2 = this;
  var _getEventPoints3 = (0, _util.getEventPoints)(event),
    points = _getEventPoints3.points;
  if (!points) {
    return;
  }
  event.stopImmediatePropagation();
  var newEvent = {
    currentTarget: this.element,
    sourceEvent: event,
    timestamp: Date.now(),
    pointer: [],
    point: []
  };
  // 临时保存当前手指（点）
  var pointer0 = null;
  var pointer1 = null;
  // 循环删除已经拿开的手指（点）
  for (var i = 0, len = points.length; i < len; ++i) {
    var t = points[i];
    if (this._pointer0 && this._pointer0.id === t.identifier) {
      pointer0 = this._pointer0;
      this._pointer0 = null;
    } else if (this._pointer1 && this._pointer1.id === t.identifier) {
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
    newEvent.pointer = [this._pointer0];
    if (this._pointer1) {
      newEvent.pointer.push(this._pointer1);
    }
    newEvent.point = [(0, _util.getCenter)(this._pointer0.start, this._pointer1 ? this._pointer1.start : pointer1 ? pointer1.start : []), (0, _util.getCenter)(this._pointer0.move, this._pointer1 ? this._pointer1.move : pointer1 ? pointer1.move : []), (0, _util.getCenter)(this._pointer0.end, this._pointer1 ? this._pointer1.end : pointer1 ? pointer1.end : [])];
    this.emit('gestureEnd', newEvent);
  }
  // 全部拿开（双指同时抬起，最后一指抬起，仅仅一指抬起）
  else if (pointer0) {
    newEvent.point = [pointer1 ? (0, _util.getCenter)(pointer0.start, pointer1.start) : pointer0.start, pointer1 ? (0, _util.getCenter)(pointer0.move, pointer1.move) : pointer0.move, pointer1 ? (0, _util.getCenter)(pointer0.end, pointer1.end) : pointer0.end];
    if (!this._preventTap) {
      this.emit('tap', newEvent);
    }
    if (!this._preventSingleTap) {
      // 等待doubleTapInterval，如果时间内没有点击第二次，则触发
      this._singleTapTimer = window.setTimeout(function () {
        _this2._singleTapTimer = null;
        newEvent.delayTime = _this2.doubleTapInterval;
        _this2.emit('singleTap', newEvent);
      }, this.doubleTapInterval);
    }
    if (!this._preventDoubleTap) {
      // 双击点使用第一次的点
      if (this._firstPoint) {
        newEvent.point = [this._firstPoint, this._firstPoint, this._firstPoint];
      }
      newEvent.intervalTime = this.doubleTapInterval;
      this.emit('doubleTap', newEvent);
    }
    // this._swipePoints存在表示开始了swipe行为
    if (this._swipePoints) {
      var _this$_swipePoints = (0, _slicedToArray2.default)(this._swipePoints, 2),
        prev = _this$_swipePoints[0],
        next = _this$_swipePoints[1];
      // 最后一次移动的点即为swipe终点
      var endPos = next[next.length - 1];
      // 最后一次移动点的时间减去手指（点）抬起的时间，此间隔时间需小于等待时间raiseDuration，否则视为停止swipe
      if (Date.now() - endPos.timestamp <= this.raiseDuration) {
        // 找到计入swipe的时间(swipeDuration)内的swipe起点
        var startPos = next[0];
        for (var _i = prev.length - 1; _i >= 0; _i--) {
          if (endPos.timestamp - prev[_i].timestamp <= this.swipeDuration) {
            startPos = prev[_i];
          } else {
            break;
          }
        }
        // 根据swipe起点和终点的距离差与时间差算出swipe抬起时速率
        var velocity = (0, _util.getVelocity)(endPos.timestamp - startPos.timestamp, (0, _util.getDistance)(startPos.point, endPos.point));
        // swipe速率需要大于swipeVelocity，否则忽略不计，不视为swipe
        if (velocity > this.swipeVelocity) {
          // 滑动方向与x夹角
          var angle = (0, _util.getAngle)(startPos.point, endPos.point);
          // 惯性的方向
          newEvent.direction = (0, _util.getDirection)(startPos.point, endPos.point);
          newEvent.angle = angle;
          newEvent.velocity = velocity;
          // 给出按照velocity速度滑动，当速度减到0时的计算函数：
          // 当给出时间t，即在t时间内速度减到0，求出滑动的距离：
          // 当给出减速度a，即在减速度a的作用下，速度减到0，求出滑动的距离，和消耗的时间：
          // 减速度某个时间的位移：s = v0 * t - (a * t * t) / 2
          // 减速度某个时间的速度：v = v0 - a * t
          // s为滑动距离，v末速度为0，v0初速度为velocity
          newEvent.swipeComputed = function (factor) {
            var _velocity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : velocity;
            // 因子大于1可以认为传入的是时间毫秒数
            var duration = 0;
            var deceleration = 0;
            var distance = 0;
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
            var _getVector = (0, _util.getVector)(distance, angle),
              _getVector2 = (0, _slicedToArray2.default)(_getVector, 2),
              stretchX = _getVector2[0],
              stretchY = _getVector2[1];
            return {
              duration: duration,
              // swipe速率减到0花费的时间
              stretchX: stretchX,
              // x方向swipe惯性距离（抬起后，继续移动的距离）
              stretchY: stretchY,
              // y方向swipe惯性距离（抬起后，继续移动的距离）
              deceleration: deceleration // swipe速率减到0的减速度
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
    this._pointer0[0] = this._pointer0[1] = this._pointer0[2];
    // 同时可以触发一次start事件
    newEvent.point = [this._pointer0];
    this.emit('pointerStart', newEvent);
  } */
}

function canceled(event) {
  event.stopImmediatePropagation();
  this.emit('pointerCancel', {
    currentTarget: this.element,
    sourceEvent: event,
    timestamp: Date.now(),
    pointer: [],
    point: []
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
  this._firstPoint = null;
  this._pointer0 = null;
  this._pointer1 = null;
  this._preventTap = true;
  this._swipePoints = null;
  this._preventSingleTap = true;
  this._preventDoubleTap = true;
}
function downed(event) {
  var that = this;
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
      var newEvent = {
        currentTarget: that.element,
        sourceEvent: event,
        timestamp: Date.now(),
        pointer: [],
        point: []
      };
      var point = [e.pageX, e.pageY];
      if (that._pointer0) {
        that._pointer0.move = that._pointer0.end;
        that._pointer0.end = point;
        newEvent.pointer = [that._pointer0];
        var _that$_pointer = that._pointer0,
          start = _that$_pointer.start,
          move = _that$_pointer.move,
          end = _that$_pointer.end;
        newEvent.point = [start, move, end];
        newEvent.direction = (0, _util.getDirection)(move, end);
        newEvent.moveDirection = (0, _util.getDirection)(start, end);
        newEvent.deltaX = end[0] - move[0];
        newEvent.moveX = end[0] - start[0];
        newEvent.deltaY = end[1] - move[1];
        newEvent.moveY = end[1] - start[1];
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
      var newEvent = {
        currentTarget: that.element,
        sourceEvent: event,
        timestamp: Date.now(),
        pointer: [],
        point: []
      };
      var point = [e.pageX, e.pageY];
      if (that._pointer0) {
        var pointer0 = that._pointer0;
        that._pointer0 = null;
        pointer0.move = pointer0.end;
        pointer0.end = point;
        newEvent.pointer = [pointer0];
        var start = pointer0.start,
          move = pointer0.move,
          end = pointer0.end;
        newEvent.point = [start, move, end];
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
    var point = [event.pageX, event.pageY];
    that._pointer0 = {
      start: point,
      move: point,
      end: point,
      id: -1
    };
  }
}
function wheeled(event) {
  var _this3 = this;
  event.preventDefault();
  event.stopImmediatePropagation();
  var newEvent = {
    currentTarget: this.element,
    sourceEvent: event,
    timestamp: Date.now(),
    pointer: [],
    point: []
  };
  var point = [event.pageX, event.pageY];
  if (this._wheelTimerEnd) {
    if (this._pointer0) {
      this._pointer0.move = this._pointer0.end;
      this._pointer0.end = point;
    }
    window.clearTimeout(this._wheelTimerEnd.timer);
    // wheelRoll
  } else {
    this._pointer0 = {
      start: point,
      move: point,
      end: point,
      id: -1
    };
    // wheelstart
  }

  var wheelEnd = function wheelEnd() {
    _this3._pointer0 = null;
    _this3._wheelTimerEnd = null;
    newEvent.timestamp = Date.now();
    // 表示滚轮结束，不参与计算
    newEvent.scale = 0 / 0;
    _this3.emit('scale', newEvent);
    // wheelEnd
  };

  this._wheelTimerEnd = {
    wheelEnd: wheelEnd,
    timer: window.setTimeout(wheelEnd, this.wheelDelay),
    scale: this._wheelTimerEnd ? this._wheelTimerEnd.scale : 1
  };
  if (this._pointer0) {
    newEvent.pointer = [this._pointer0];
    var _this$_pointer2 = this._pointer0,
      start = _this$_pointer2.start,
      move = _this$_pointer2.move,
      end = _this$_pointer2.end;
    newEvent.point = [start, move, end];
    var scale = Math.pow(2, -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002));
    this._wheelTimerEnd.scale *= scale;
    newEvent.moveScale = this._wheelTimerEnd.scale;
    newEvent.scale = scale;
    this.emit('scale', newEvent);
  }
}
var Gesture = /*#__PURE__*/function (_EventTarget) {
  (0, _inherits2.default)(Gesture, _EventTarget);
  var _super = _createSuper(Gesture);
  function Gesture(element, options) {
    var _this4;
    (0, _classCallCheck2.default)(this, Gesture);
    _this4 = _super.call(this);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_rotateAngle", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_singleTapTimer", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_longTapTimer", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_wheelTimerEnd", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_preventTap", true);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_swipePoints", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_preventSingleTap", true);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_preventDoubleTap", true);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_firstPoint", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_pointer0", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_pointer1", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "_destory", null);
    var tempElement;
    if (typeof element === 'string') {
      tempElement = document.querySelector(element);
    } else {
      tempElement = element;
    }
    if (!tempElement || !(tempElement instanceof HTMLElement)) {
      throw new Error('Please pass in a valid element...');
    }
    _this4.element = tempElement;
    var _ref = options || {},
      wheelDelay = _ref.wheelDelay,
      longTapInterval = _ref.longTapInterval,
      doubleTapInterval = _ref.doubleTapInterval,
      doubleTapDistance = _ref.doubleTapDistance,
      touchMoveDistance = _ref.touchMoveDistance,
      swipeVelocity = _ref.swipeVelocity,
      swipeDuration = _ref.swipeDuration,
      raiseDuration = _ref.raiseDuration;
    _this4.wheelDelay = (0, _util.fixOption)(wheelDelay, 350, 1);
    _this4.longTapInterval = (0, _util.fixOption)(longTapInterval, 750, 1);
    _this4.doubleTapInterval = (0, _util.fixOption)(doubleTapInterval, 250, 1);
    _this4.doubleTapDistance = (0, _util.fixOption)(doubleTapDistance, 30, 1);
    _this4.touchMoveDistance = (0, _util.fixOption)(touchMoveDistance, 3, 0);
    _this4.swipeVelocity = (0, _util.fixOption)(swipeVelocity, 0.3, 0);
    _this4.swipeDuration = (0, _util.fixOption)(swipeDuration, 100, 1);
    _this4.raiseDuration = (0, _util.fixOption)(raiseDuration, 100, 1);
    // 注册触摸事件
    var tmscrolled = scrolled.bind((0, _assertThisInitialized2.default)(_this4));
    if ((0, _util.isTouchable)(_this4.element)) {
      var touchstarted = started.bind((0, _assertThisInitialized2.default)(_this4));
      var touchmoved = moved.bind((0, _assertThisInitialized2.default)(_this4));
      var touchended = ended.bind((0, _assertThisInitialized2.default)(_this4));
      var touchcanceled = canceled.bind((0, _assertThisInitialized2.default)(_this4));
      _this4.element.addEventListener('touchstart', touchstarted, false);
      _this4.element.addEventListener('touchmove', touchmoved, false);
      _this4.element.addEventListener('touchend', touchended, false);
      _this4.element.addEventListener('touchcancel', touchcanceled, false);
      window.addEventListener('scroll', tmscrolled);
      _this4._destory = function () {
        _this4.element.removeEventListener('touchstart', touchstarted);
        _this4.element.removeEventListener('touchmove', touchmoved);
        _this4.element.removeEventListener('touchend', touchended);
        _this4.element.removeEventListener('touchcancel', touchcanceled);
        window.removeEventListener('scroll', tmscrolled);
      };
    } else {
      // 注册触摸事件
      var mousedowned = downed.bind((0, _assertThisInitialized2.default)(_this4));
      _this4.element.addEventListener('mousedown', mousedowned, false);
      var mousewheeled = wheeled.bind((0, _assertThisInitialized2.default)(_this4));
      _this4.element.addEventListener('wheel', mousewheeled, false);
      window.addEventListener('scroll', tmscrolled);
      _this4._destory = function () {
        _this4.element.removeEventListener('mousedown', mousedowned);
        _this4.element.removeEventListener('wheel', mousewheeled);
        window.removeEventListener('scroll', tmscrolled);
      };
    }
    return _this4;
  }
  (0, _createClass2.default)(Gesture, [{
    key: "isTouch",
    value: function isTouch() {
      return (0, _util.isTouchable)(this.element);
    }
  }, {
    key: "destory",
    value: function destory() {
      // 解除所有事件
      (0, _get2.default)((0, _getPrototypeOf2.default)(Gesture.prototype), "off", this).call(this);
      scrolled.apply(this);
      // 解除手势事件
      if (this._destory) {
        this._destory();
        this._destory = null;
      }
    }
  }]);
  return Gesture;
}(_event.default);
var _default = Gesture;
exports.default = _default;