import EventTarget from './event';
declare class Gesture extends EventTarget<GType, GEvent> {
    element: HTMLElement;
    wheelDelay: number;
    longTapInterval: number;
    doubleTapInterval: number;
    doubleTapDistance: number;
    touchMoveDistance: number;
    swipeVelocity: number;
    swipeDuration: number;
    raiseDuration: number;
    _rotateAngle: number;
    _singleTapTimer: number | null;
    _longTapTimer: number | null;
    _wheelTimerEnd: {
        scale: number;
        timer: number;
        wheelEnd: () => void;
    } | null;
    _preventTap: boolean;
    _swipePoints: any[] | null;
    _preventSingleTap: boolean;
    _preventDoubleTap: boolean;
    _firstPointer: TPointer | null;
    _pointer0: TPointer | null;
    _pointer1: TPointer | null;
    _destory: (() => void) | null;
    constructor(element: HTMLElement | string, options?: GOptions);
    isTouch(): number | boolean;
    destory(): void;
}
export type Direction = 'Left' | 'Right' | 'Up' | 'Down' | 'None';
export type GType = 'pan' | 'tap' | 'swipe' | 'singleTap' | 'longTap' | 'doubleTap' | 'multiPan' | 'scale' | 'rotate' | 'pointerStart' | 'pointerMove' | 'pointerEnd' | 'pointerCancel' | 'gestureStart' | 'gestureMove' | 'gestureEnd';
/**
 * swipe思路:
 * 根据移动停止前swipeDuration时间内移动的距离和时间算出速度，
 * 速度大于swipeVelocity，并且移动停止后到手指（点）抬起时间间隔小于raiseDuration即为swipe
 * 移动停止就是最后一次触发move事件
 * 0. start 清空_swipePoints
 * 1. move 每swipeDuration时间内所移动的点分为一组，只保留上一次swipeDuration时间组和这一次swipeDuration时间组，存储在_swipePoints内
 * 2. end 松开手时, 在_swipePoints内找到起终点，根据起终点距离和时间差算出速度，然后算出其他值
 */
type TPointer = {
    start: number[];
    previous: number[];
    current: number[];
    identifier: number;
    changed: boolean;
};
export type GEvent = {
    currentTarget: HTMLElement;
    sourceEvent: TouchEvent | MouseEvent | WheelEvent;
    timestamp: number;
    pointers: TPointer[];
    leavePointers: TPointer[];
    getPoint: (whichOne?: 'start' | 'previous' | 'current') => number[];
    scale?: number;
    angle?: number;
    deltaX?: number;
    deltaY?: number;
    direction?: Direction;
    moveScale?: number;
    moveAngle?: number;
    moveX?: number;
    moveY?: number;
    moveDirection?: Direction;
    velocity?: number;
    waitTime?: number;
    delayTime?: number;
    intervalTime?: number;
    swipeComputed?: (factor: number, _velocity?: number) => {
        duration: number;
        stretchX: number;
        stretchY: number;
        deceleration: number;
    };
};
export type GOptions = {
    wheelDelay?: number;
    longTapInterval?: number;
    doubleTapInterval?: number;
    doubleTapDistance?: number;
    touchMoveDistance?: number;
    swipeVelocity?: number;
    swipeDuration?: number;
    raiseDuration?: number;
};
export default Gesture;
