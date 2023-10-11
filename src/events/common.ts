/*
 * @Author: Huangjs
 * @Date: 2023-08-23 11:27:38
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-10-11 11:40:38
 * @Description: ******
 */

export function preventDefault(this: any) {
  if (this.nativeEvent) {
    //react事件
    // https://github.com/facebook/react/issues/6436
    // Chrome 73之后，所有绑定在根节点（window,document,body）的scroll,wheel,mobile touch事件都会默认passive为true
    // 这就会导致事件内调用e.preventDefault()无效，还会报错：Unable to preventDefault inside passive event listener invocation.
    // react是合成事件，所有事件最终会冒泡到document上进行执行，而document默认是passive为true，并且react注册事件上没有可以设置passive的地方
    // 所以这里不管调用e.preventDefault()还是e.nativeEvent.preventDefault()都没有任何卵用，还报错。
    return;
  } else {
    if (!this.preventDefault) {
      this.returnValue = false;
    } else {
      this.preventDefault();
    }
  }
}

export function stopPropagation(this: any) {
  if (!this.stopPropagation) {
    this.cancelBubble = true;
  } else {
    this.stopPropagation();
  }
}

export function stopImmediatePropagation(this: any) {
  if (this.nativeEvent) {
    //react事件
    // react是合成事件，没有在同一元素注册多个事件的可能，所以不存在stopImmediatePropagation
    // 调用e.nativeEvent.stopImmediatePropagation()是为了阻止在document上注册的多个事件
    if (this.nativeEvent.stopImmediatePropagation) {
      this.nativeEvent.stopImmediatePropagation();
    }
  } else {
    if (!this.stopImmediatePropagation) {
      stopPropagation.apply(this, []);
    } else {
      this.stopImmediatePropagation();
    }
  }
}
