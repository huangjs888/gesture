<!--
 * @Author: Huangjs
 * @Date: 2021-05-10 15:55:29
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-08-04 16:36:25
 * @Description: ******
-->
## Gesture
简单的移动端手势，支持事件：
  | 'pan' // 平移
  | 'tap' // 轻点（快，双击时会触发）
  | 'swipe' // 快速滑动
  | 'singleTap' // 点击（有延迟，双击时不触发）
  | 'longTap' // 长按
  | 'doubleTap' // 双击
  | 'multiPan' // 平移
  | 'scale' // 缩放
  | 'rotate' // 旋转
  | 'pointerStart' // 开始
  | 'pointerMove' // 移动
  | 'pointerEnd' // 抬起
  | 'pointerCancel' // 触摸取消
  | 'gestureStart' // 双（多）指开始
  | 'gestureMove' // 双（多）指移动
  | 'gestureEnd'; // 双（多）指结束

### 使用方法
```javascript

import Gesture, { type GEvent } from '@huangjs888/gesture';

const gesture = new Gesture(document.body);
if (gesture.done()) {
  gesture.on('tap', (e: GEvent) => {
    console.log(e.getPoint());
  });
  gesture.on('singleTap', (e) => {
    console.log(e.getPoint(), e.delayTime);
  });
  gesture.on('doubleTap', (e) => {
    console.log(e.getPoint(), e.intervalTime);
  });
  gesture.on('longTap', (e) => {
    console.log(e.getPoint(), e.waitTime);
  });
  gesture.on('pan', (e) => {
    console.log(
      e.direction,
      e.deltaX,
      e.deltaX,
      e.moveDirection,
      e.moveX,
      e.moveY,
    );
  });
  gesture.on('multiPan', (e) => {
    console.log(
      e.direction,
      e.deltaX,
      e.deltaX,
      e.moveDirection,
      e.moveX,
      e.moveY,
    );
  });
  gesture.on('scale', (e) => {
    console.log(e.scale, e.moveScale);
  });
  gesture.on('rotate', (e) => {
    console.log(e.angle, e.moveAngle);
  });
  gesture.on('swipe', (e) => {
    const { duration, stretchX, stretchY } = e.swipeComputed(0.003);
    console.log(e.direction, e.velocity);
  });
}
// 卸载的时候销毁
// gesture.destory();

```

## EventTarget
自定义事件类：
### 使用方法
```javascript

import { EventTarget } from '@huangjs888/gesture';

type EventType = 'click' | 'move' | 'tap';
type EventObject = {
  currentTarget: HTMLElement;
  sourceEvent: Event;
  timestamp: number;
  value: any;
};
class EventClass extends EventTarget<EventType, EventObject> {
  constructor() {
    super();
    document.body.onclick = (e) => {
      this.emit({
        currentTarget: document.body,
        sourceEvent: e,
        timestamp: Date.now(),
        value: 'click',
      });
    };
  }
  destory() {
    // 解除所有事件
    super.off();
  }
}

```
