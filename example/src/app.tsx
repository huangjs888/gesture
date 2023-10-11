/*
 * @Author: Huangjs
 * @Date: 2023-08-30 11:09:21
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-10-11 14:54:53
 * @Description: ******
 */

import React from 'react';
import Gesture, { type IGestureEvent } from '@huangjs888/gesture/react';
import './app.css';

function App() {
  const [transform, setTransform] = React.useState<{ a: number; k: number; x: number; y: number }>({
    a: 0,
    k: 1,
    x: 0,
    y: 0,
  });
  const [transition, setTransition] = React.useState<string>('');
  const event = (e: IGestureEvent, t: string) => {
    console.log(t, e);
    if (t === 'longTap') {
      alert('longTap');
    } else if (t === 'doubleTap') {
      setTransform((prev) => {
        return {
          ...prev,
          k: prev.k !== 2 ? 2 : 1,
        };
      });
      setTransition('transform 500ms');
    } else if (t === 'singleTap') {
      setTransform({ a: 0, k: 1, x: 0, y: 0 });
      setTransition('transform 500ms');
    } else if (t === 'pan') {
      setTransform((prev) => {
        return {
          ...prev,
          x: prev.x + (e.deltaX || 0),
          y: prev.y + (e.deltaY || 0),
        };
      });
      setTransition('');
    } else if (t === 'rotate') {
      setTransform((prev) => {
        return {
          ...prev,
          a: prev.a + (e.angle || 0),
        };
      });
      setTransition('');
    } else if (t === 'scale') {
      setTransform((prev) => {
        return {
          ...prev,
          k: prev.k * (e.scale || 1),
        };
      });
      setTransition('');
    } else if (t === 'swipe') {
      const { velocity = 0, swipeComputed } = e;
      if (velocity > 0 && swipeComputed) {
        // 按照0.003的减速度减速运行得到减速到0时的时间和x，y方向的分量距离
        const { duration, stretchX, stretchY } = swipeComputed(0.003);
        setTransform((prev) => {
          return {
            ...prev,
            x: prev.x + stretchX,
            y: prev.y + stretchY,
          };
        });
        setTransition(`transform ${duration}ms`);
      }
    }
  };

  React.useEffect(() => {
    // Chrome 73之后，所有绑定在根节点（window,document,body）的scroll,wheel,mobile touch事件都会默认passive为true
    // 这就会导致事件内调用e.preventDefault()无效，还会报错：Unable to preventDefault inside passive event listener invocation.
    // 这里设置为false，并注册事件达到关闭浏览器的右键菜单，选择，滚动，缩放等默认行为
    const preventDefault = (e: Event) => e.preventDefault();
    // 阻止web端右键菜单行为
    window.addEventListener('contextmenu', preventDefault, { capture: false, passive: false });
    // 阻止移动端长按菜单，滚动，缩放，选择等行为
    window.addEventListener('touchstart', preventDefault, { capture: false, passive: false });
    // 阻止web端滚动行为
    window.addEventListener('wheel', preventDefault, { capture: false, passive: false });
    // 阻止web端选择行为
    window.addEventListener('dragstart', preventDefault, {
      capture: false,
      passive: false,
    });
    // 阻止web端选择行为
    if ('onselectstart' in window.document.documentElement) {
      // capture为true使其为捕获阶段就执行
      window.addEventListener('selectstart', preventDefault, {
        capture: false,
        passive: false,
      });
    }
    return () => {
      window.removeEventListener('contextmenu', preventDefault);
      window.removeEventListener('touchstart', preventDefault);
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('dragstart', preventDefault);
      if ('onselectstart' in window.document.documentElement) {
        window.removeEventListener('selectstart', preventDefault);
      }
    };
  }, []);

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
          className="rect"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k}) rotate(${transform.a}deg)`,
            transition: transition,
          }}
          onTransitionEnd={() => setTransition('')}>
          <img
            width={100}
            height={100}
            src="https://github.githubassets.com/images/modules/site/home/globe.jpg"
          />
          <span>大家好，我是测试项目，欢迎我把！</span>
        </div>
      </Gesture>
    </div>
  );
}

export default App;
