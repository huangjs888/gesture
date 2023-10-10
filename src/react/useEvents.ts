/*
 * @Author: Huangjs
 * @Date: 2023-08-22 16:15:47
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-10-10 11:33:15
 * @Description: ******
 */

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import type Core from '../core';
import { type IGestureEvent, type IGestureEventType } from '../core';
import { type IHandler, type IGestureHandler } from './index';

function useEvent(getCore: () => Core | null, type: IGestureEventType, onEvent?: IHandler): void {
  useIsomorphicLayoutEffect(() => {
    const core = getCore();
    if (core) {
      const handler = (e: IGestureEvent) => {
        if (typeof onEvent === 'function') {
          onEvent.apply(null, [e]);
        }
      };
      core.on(type, handler);
      return () => {
        core.off(type, handler);
      };
    }
    return () => {};
  }, [onEvent, type, getCore]);
}
export function useEvents(events: IGestureHandler, getCore: () => Core | null): void {
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
  useEvent(getCore, 'pan', onPan);
  useEvent(getCore, 'tap', onTap);
  useEvent(getCore, 'swipe', onSwipe);
  useEvent(getCore, 'singleTap', onSingleTap);
  useEvent(getCore, 'longTap', onLongTap);
  useEvent(getCore, 'doubleTap', onDoubleTap);
  useEvent(getCore, 'multiPan', onMultiPan);
  useEvent(getCore, 'scale', onScale);
  useEvent(getCore, 'rotate', onRotate);
  useEvent(getCore, 'pointerStart', onPointerStart);
  useEvent(getCore, 'pointerMove', onPointerMove);
  useEvent(getCore, 'pointerEnd', onPointerEnd);
  useEvent(getCore, 'pointerCancel', onPointerCancel);
  useEvent(getCore, 'gestureStart', onGestureStart);
  useEvent(getCore, 'gestureMove', onGestureMove);
  useEvent(getCore, 'gestureEnd', onGestureEnd);
}
