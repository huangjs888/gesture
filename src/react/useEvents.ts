/*
 * @Author: Huangjs
 * @Date: 2023-08-22 16:15:47
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-10-27 10:29:25
 * @Description: ******
 */

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import type Core from '../core';
import { type IGestureEvent, type IGestureEventType } from '../core';
import { type IHandler, type IGestureHandler } from './index';

function useEvent(core: Core, type: IGestureEventType, onEvent?: IHandler): void {
  useIsomorphicLayoutEffect(() => {
    const handler = (e: IGestureEvent) => {
      if (typeof onEvent === 'function') {
        onEvent.apply(null, [e]);
      }
    };
    core.on(type, handler);
    return () => {
      core.off(type, handler);
    };
  }, [core, type, onEvent]);
}
export function useEvents(events: IGestureHandler, core: Core): void {
  const {
    onPan,
    onTap,
    onSwipe,
    onSingleTap,
    onLongTap,
    onDoubleTap,
    onMultiPan,
    onScale,
    onRotate,
    onPointerStart,
    onPointerMove,
    onPointerEnd,
    onPointerCancel,
    onGestureStart,
    onGestureMove,
    onGestureEnd,
  } = events;
  useEvent(core, 'pan', onPan);
  useEvent(core, 'tap', onTap);
  useEvent(core, 'swipe', onSwipe);
  useEvent(core, 'singleTap', onSingleTap);
  useEvent(core, 'longTap', onLongTap);
  useEvent(core, 'doubleTap', onDoubleTap);
  useEvent(core, 'multiPan', onMultiPan);
  useEvent(core, 'scale', onScale);
  useEvent(core, 'rotate', onRotate);
  useEvent(core, 'pointerStart', onPointerStart);
  useEvent(core, 'pointerMove', onPointerMove);
  useEvent(core, 'pointerEnd', onPointerEnd);
  useEvent(core, 'pointerCancel', onPointerCancel);
  useEvent(core, 'gestureStart', onGestureStart);
  useEvent(core, 'gestureMove', onGestureMove);
  useEvent(core, 'gestureEnd', onGestureEnd);
}
