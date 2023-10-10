/*
 * @Author: Huangjs
 * @Date: 2023-08-30 11:09:21
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-10-10 14:11:20
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
    const contextmenu = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener('contextmenu', contextmenu);
    return () => {
      window.removeEventListener('contextmenu', contextmenu);
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
          Drag me
        </div>
      </Gesture>
    </div>
  );
}

export default App;
