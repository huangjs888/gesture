<!--
 * @Author: Huangjs
 * @Date: 2021-05-10 15:55:29
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-10-10 15:18:01
 * @Description: ******
-->

## Gesture

简单的移动端手势，支持事件：

'pan' // 平移

'tap' // 轻点（快，双击时会触发）

'swipe' // 快速滑动

'singleTap' // 点击（有延迟，双击时不触发）

'longTap' // 长按

'doubleTap' // 双击

'multiPan' // 平移

'scale' // 缩放

'rotate' // 旋转

'pointerStart' // 开始

'pointerMove' // 移动

'pointerEnd' // 抬起

'pointerCancel' // 触摸取消

'gestureStart' // 双（多）指开始

'gestureMove' // 双（多）指移动

'gestureEnd'; // 双（多）指结束

### 安装使用

```sh

npm install @huangjs888/gesture --save

```

### gesture 使用方法

```js

import Gesture, { type IGestureEvent } from '@huangjs888/gesture';

const event = function (e: IGestureEvent, t: string) {
  console.log(t, e);
};
const gesture = new Gesture(document.body);
gesture.resetOptions({
  wheelDelay: 350,
  longTapInterval: 750,
  doubleTapInterval: 250,
  doubleTapDistance: 30,
  touchMoveDistance: 3,
  swipeVelocity: 0.3,
  swipeDuration: 100,
  raiseDuration: 100,
});
gesture.on('gestureStart', (e) => event(e, 'gestureStart'));
gesture.on('gestureMove', (e) => event(e, 'gestureMove'));
gesture.on('gestureEnd', (e) => event(e, 'gestureEnd'));
gesture.on('pointerCancel', (e) => event(e, 'pointerCancel'));
gesture.on('pointerStart', (e) => event(e, 'pointerStart'));
gesture.on('pointerMove', (e) => event(e, 'pointerMove'));
gesture.on('pointerEnd', (e) => event(e, 'pointerEnd'));
gesture.on('doubleTap', (e) => event(e, 'doubleTap'));
gesture.on('singleTap', (e) => event(e, 'singleTap'));
gesture.on('longTap', (e) => event(e, 'longTap'));
gesture.on('rotate', (e) => event(e, 'rotate'));
gesture.on('scale', (e) => event(e, 'scale'));
gesture.on('swipe', (e) => event(e, 'swipe'));
gesture.on('pan', (e) => event(e, 'pan'));
gesture.on('multiPan', (e) => event(e, 'multiPan'));
gesture.on('tap', (e) => event(e, 'tap'));
// 销毁所有事件
// 解绑某一个：gesture.off('rotate');
gesture.destory();

```
### react-gesture 使用方法

```js

import React from 'react';
import Gesture, { type IGestureEvent } from '@huangjs888/gesture/react';

function App() {
  const event = (e: IGestureEvent, t: string) => {
    console.log(t, e);
  };

  return (
    <div className="app">
      <Gesture
        ref={(a) => {
          console.log(a?.getInstance());
        }}
        onGestureStart={(e) => event(e, 'gestureStart')}
        onGestureMove={(e) => event(e, 'gestureMove')}
        onGestureEnd={(e) => event(e, 'gestureEnd')}
        onPointerCancel={(e) => event(e, 'pointerCancel')}
        onPointerStart={(e) => event(e, 'pointerStart')}
        onPointerMove={(e) => event(e, 'pointerMove')}
        onPointerEnd={(e) => event(e, 'pointerEnd')}
        onDoubleTap={(e) => event(e, 'doubleTap')}
        onSingleTap={(e) => event(e, 'singleTap')}
        onLongTap={(e) => event(e, 'longTap')}
        onRotate={(e) => event(e, 'rotate')}
        onScale={(e) => event(e, 'scale')}
        onSwipe={(e) => event(e, 'swipe')}
        onPan={(e) => event(e, 'pan')}
        onMultiPan={(e) => event(e, 'multiPan')}
        onTap={(e) => event(e, 'tap')}
        options={{
          wheelDelay: 350,
          longTapInterval: 750,
          doubleTapInterval: 250,
          doubleTapDistance: 30,
          touchMoveDistance: 3,
          swipeVelocity: 0.3,
          swipeDuration: 100,
          raiseDuration: 100,
        }}>
        <div
          style={{
            width: 300,
            height: 300,
            background: 'red',
          }}
        />
      </Gesture>
    </div>
  );
}


```

### emitter 使用方法

```js

import EventEmitter from '@huangjs888/gesture/emitter';

type EventType = 'click' | 'move' | 'tap';
type EventObject = {
  currentTarget: HTMLElement;
  sourceEvent: Event;
  timestamp: number;
  value: any;
};
class EventClass extends EventEmitter<EventType, EventObject> {
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

在线测试预览地址：[https://huangjs888.github.io/gesture/](https://huangjs888.github.io/gesture/ "预览")
