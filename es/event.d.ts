type IHandler<E, T> = (event: E, type?: T) => boolean | void;
export default class EventTarget<T extends string, E> {
    events: {
        [key in T]?: {
            pool: Array<IHandler<E, T>>;
            single: number;
        };
    };
    constructor();
    one(type: T, handler: IHandler<E, T>, single?: boolean): void;
    on(type: T, handler: IHandler<E, T>, single?: boolean): void;
    off(type?: T, handler?: IHandler<E, T>, single?: boolean): void;
    emit(type: T, event: E): void;
}
export {};
