/*
 * @Author: Huangjs
 * @Date: 2023-08-22 16:15:47
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-10-16 15:00:45
 * @Description: ******
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { useEvents } from './useEvents';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import Core, { type IGestureOptions, type IGestureEvent } from '../core';
import { started, moved, ended, canceled, downed, wheeled } from '../events';
import { isTouchable } from '../utils';

export type IGestureRef = {
  findDOMElement: () => Element | null | undefined;
  getInstance: () => Core | null | undefined;
};

export type IHandler = ((e: IGestureEvent) => void) | null;

export type IGestureHandler = {
  onPan?: IHandler;
  onTap?: IHandler;
  onSwipe?: IHandler;
  onSingleTap?: IHandler;
  onLongTap?: IHandler;
  onDoubleTap?: IHandler;
  onMultiPan?: IHandler;
  onScale?: IHandler;
  onRotate?: IHandler;
  onPointerStart?: IHandler;
  onPointerMove?: IHandler;
  onPointerEnd?: IHandler;
  onPointerCancel?: IHandler;
  onGestureStart?: IHandler;
  onGestureMove?: IHandler;
  onGestureEnd?: IHandler;
};

export type IGestureProps = {
  preventAllTap?: boolean;
  options?: IGestureOptions;
  children?: React.ReactNode;
} & IGestureHandler;

const Gesture = React.forwardRef<IGestureRef, IGestureProps>(
  ({ children, options, preventAllTap, ...events }, ref) => {
    const elementRef = React.useRef<Element | null>(null);
    const coreRef = React.useRef<Core | null>(null);

    useIsomorphicLayoutEffect(() => {
      coreRef.current = new Core();
    }, []);

    useIsomorphicLayoutEffect(() => {
      if (coreRef.current) {
        coreRef.current.resetOptions(options);
      }
    }, [options]);

    useIsomorphicLayoutEffect(() => {
      if (preventAllTap && coreRef.current) {
        coreRef.current.preventAllTap();
      }
    }, [preventAllTap]);

    useEvents(
      events,
      React.useCallback(() => coreRef.current, []),
    );

    React.useImperativeHandle(
      ref,
      (): IGestureRef => ({
        findDOMElement: () => elementRef.current,
        getInstance: () => coreRef.current,
      }),
      [],
    );

    // 这里ref函数使用useCallback，为了使每次渲染ref函数为同一个函数
    // 如果函数直接写在下面的ref里，如下所示，则箭头函数在每次渲染都相当于重新创建
    // 此时react里会比较发现ref函数变化，就会先执行变化前的函数，传入null，再执行变化后的函数，传入实际值
    // React.cloneElement(children, {
    //   ref: (a)=>{
    //     ...
    //   },
    // })
    const refFun = React.useCallback((_ref: React.ReactInstance) => {
      let element: any = _ref;
      // ref是Element的时候不需要查找，只有是React.Component的时候才可以查找
      if (!(_ref instanceof Element) && _ref instanceof React.Component) {
        element = ReactDOM.findDOMNode(_ref);
      }
      if (!(element instanceof Element)) {
        element = null;
      }
      elementRef.current = element;
    }, []);

    const bind = (emitter: (args: any) => void, args: any) => {
      const core = coreRef.current;
      if (core) {
        emitter.apply(core, args);
      }
    };
    const listener = React.useMemo(
      () =>
        isTouchable()
          ? {
              onTouchStart: (...args: any) => bind(started, args),
              onTouchMove: (...args: any) => bind(moved, args),
              onTouchEnd: (...args: any) => bind(ended, args),
              onTouchCancel: (...args: any) => bind(canceled, args),
            }
          : {
              onMouseDown: (...args: any) => bind(downed, args),
              onWheel: (...args: any) => bind(wheeled, args),
            },
      [],
    );

    if (!children) {
      console.warn('Warning: Gesture children must exist.');
      return null;
    }
    return React.Children.only(
      React.cloneElement(children as any, {
        ref: refFun,
        ...listener,
      }),
    );
  },
);

export * from '../core';

export { Gesture, isTouchable };
