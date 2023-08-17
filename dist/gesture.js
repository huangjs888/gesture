(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Gesture = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var fails$9 = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$8 = fails$9;

	var functionBindNative = !fails$8(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$4 = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var call$5 = FunctionPrototype$2.call;
	var uncurryThisWithBind = NATIVE_BIND$4 && FunctionPrototype$2.bind.bind(call$5, call$5);

	var functionUncurryThis = NATIVE_BIND$4 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$5.apply(fn, arguments);
	  };
	};

	var uncurryThis$e = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$e({}.isPrototypeOf);

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$9 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || commonjsGlobal || Function('return this')();

	var NATIVE_BIND$3 = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var apply$1 = FunctionPrototype$1.apply;
	var call$4 = FunctionPrototype$1.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$3 ? call$4.bind(apply$1) : function () {
	  return call$4.apply(apply$1, arguments);
	});

	var uncurryThis$d = functionUncurryThis;

	var toString$1 = uncurryThis$d({}.toString);
	var stringSlice = uncurryThis$d(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice(toString$1(it), 8, -1);
	};

	var classofRaw$1 = classofRaw$2;
	var uncurryThis$c = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw$1(fn) === 'Function') return uncurryThis$c(fn);
	};

	var documentAll$2 = typeof document == 'object' && document.all;

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

	var documentAll_1 = {
	  all: documentAll$2,
	  IS_HTMLDDA: IS_HTMLDDA
	};

	var $documentAll$1 = documentAll_1;

	var documentAll$1 = $documentAll$1.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$b = $documentAll$1.IS_HTMLDDA ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll$1;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var objectGetOwnPropertyDescriptor = {};

	var fails$7 = fails$9;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$7(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var NATIVE_BIND$2 = functionBindNative;

	var call$3 = Function.prototype.call;

	var functionCall = NATIVE_BIND$2 ? call$3.bind(call$3) : function () {
	  return call$3.apply(call$3, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$2(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$3 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var uncurryThis$b = functionUncurryThis;
	var fails$6 = fails$9;
	var classof$3 = classofRaw$2;

	var $Object$3 = Object;
	var split = uncurryThis$b(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$6(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$3('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$3(it) == 'String' ? split(it, '') : $Object$3(it);
	} : $Object$3;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$2 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$1 = isNullOrUndefined$2;

	var $TypeError$9 = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$2 = function (it) {
	  if (isNullOrUndefined$1(it)) throw $TypeError$9("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$1 = indexedObject;
	var requireObjectCoercible$1 = requireObjectCoercible$2;

	var toIndexedObject$4 = function (it) {
	  return IndexedObject$1(requireObjectCoercible$1(it));
	};

	var isCallable$a = isCallable$b;
	var $documentAll = documentAll_1;

	var documentAll = $documentAll.all;

	var isObject$6 = $documentAll.IS_HTMLDDA ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$a(it) || it === documentAll;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$a(it);
	};

	var path$5 = {};

	var path$4 = path$5;
	var global$8 = global$9;
	var isCallable$9 = isCallable$b;

	var aFunction = function (variable) {
	  return isCallable$9(variable) ? variable : undefined;
	};

	var getBuiltIn$3 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path$4[namespace]) || aFunction(global$8[namespace])
	    : path$4[namespace] && path$4[namespace][method] || global$8[namespace] && global$8[namespace][method];
	};

	var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

	var global$7 = global$9;
	var userAgent = engineUserAgent;

	var process = global$7.process;
	var Deno = global$7.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION$1 = engineV8Version;
	var fails$5 = fails$9;
	var global$6 = global$9;

	var $String$3 = global$6.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$5(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$3(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var getBuiltIn$2 = getBuiltIn$3;
	var isCallable$8 = isCallable$b;
	var isPrototypeOf$3 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$2 = Object;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$2('Symbol');
	  return isCallable$8($Symbol) && isPrototypeOf$3($Symbol.prototype, $Object$2(it));
	};

	var $String$2 = String;

	var tryToString$2 = function (argument) {
	  try {
	    return $String$2(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$7 = isCallable$b;
	var tryToString$1 = tryToString$2;

	var $TypeError$8 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$4 = function (argument) {
	  if (isCallable$7(argument)) return argument;
	  throw $TypeError$8(tryToString$1(argument) + ' is not a function');
	};

	var aCallable$3 = aCallable$4;
	var isNullOrUndefined = isNullOrUndefined$2;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$1 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable$3(func);
	};

	var call$2 = functionCall;
	var isCallable$6 = isCallable$b;
	var isObject$5 = isObject$6;

	var $TypeError$7 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$6(fn = input.toString) && !isObject$5(val = call$2(fn, input))) return val;
	  if (isCallable$6(fn = input.valueOf) && !isObject$5(val = call$2(fn, input))) return val;
	  if (pref !== 'string' && isCallable$6(fn = input.toString) && !isObject$5(val = call$2(fn, input))) return val;
	  throw $TypeError$7("Can't convert object to primitive value");
	};

	var shared$2 = {exports: {}};

	var global$5 = global$9;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;

	var defineGlobalProperty$1 = function (key, value) {
	  try {
	    defineProperty(global$5, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$5[key] = value;
	  } return value;
	};

	var global$4 = global$9;
	var defineGlobalProperty = defineGlobalProperty$1;

	var SHARED = '__core-js_shared__';
	var store$2 = global$4[SHARED] || defineGlobalProperty(SHARED, {});

	var sharedStore = store$2;

	var store$1 = sharedStore;

	(shared$2.exports = function (key, value) {
	  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.32.0',
	  mode: 'pure' ,
	  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.32.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var sharedExports = shared$2.exports;

	var requireObjectCoercible = requireObjectCoercible$2;

	var $Object$1 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$3 = function (argument) {
	  return $Object$1(requireObjectCoercible(argument));
	};

	var uncurryThis$a = functionUncurryThis;
	var toObject$2 = toObject$3;

	var hasOwnProperty = uncurryThis$a({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$2(it), key);
	};

	var uncurryThis$9 = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString = uncurryThis$9(1.0.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
	};

	var global$3 = global$9;
	var shared$1 = sharedExports;
	var hasOwn$4 = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var Symbol$1 = global$3.Symbol;
	var WellKnownSymbolsStore = shared$1('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$5 = function (name) {
	  if (!hasOwn$4(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$4(Symbol$1, name)
	      ? Symbol$1[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var call$1 = functionCall;
	var isObject$4 = isObject$6;
	var isSymbol$1 = isSymbol$2;
	var getMethod = getMethod$1;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$4 = wellKnownSymbol$5;

	var $TypeError$6 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$4('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$4(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$1(exoticToPrim, input, pref);
	    if (!isObject$4(result) || isSymbol$1(result)) return result;
	    throw $TypeError$6("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol = isSymbol$2;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$3 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var global$2 = global$9;
	var isObject$3 = isObject$6;

	var document$1 = global$2.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject$3(document$1) && isObject$3(document$1.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$7 = descriptors;
	var fails$4 = fails$9;
	var createElement = documentCreateElement$1;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$7 && !fails$4(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$6 = descriptors;
	var call = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$2 = createPropertyDescriptor$3;
	var toIndexedObject$3 = toIndexedObject$4;
	var toPropertyKey$2 = toPropertyKey$3;
	var hasOwn$3 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$3(O);
	  P = toPropertyKey$2(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$3(O, P)) return createPropertyDescriptor$2(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var fails$3 = fails$9;
	var isCallable$5 = isCallable$b;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$5(detection) ? fails$3(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var uncurryThis$8 = functionUncurryThisClause;
	var aCallable$2 = aCallable$4;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$9 = uncurryThis$8(uncurryThis$8.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$2(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$9(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$5 = descriptors;
	var fails$2 = fails$9;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$5 && fails$2(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var isObject$2 = isObject$6;

	var $String$1 = String;
	var $TypeError$5 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$4 = function (argument) {
	  if (isObject$2(argument)) return argument;
	  throw $TypeError$5($String$1(argument) + ' is not an object');
	};

	var DESCRIPTORS$4 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$3 = anObject$4;
	var toPropertyKey$1 = toPropertyKey$3;

	var $TypeError$4 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$3(O);
	  P = toPropertyKey$1(P);
	  anObject$3(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$3(O);
	  P = toPropertyKey$1(P);
	  anObject$3(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$4('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$3 = descriptors;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;

	var createNonEnumerableProperty$1 = DESCRIPTORS$3 ? function (object, key, value) {
	  return definePropertyModule$2.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var global$1 = global$9;
	var apply = functionApply;
	var uncurryThis$7 = functionUncurryThisClause;
	var isCallable$4 = isCallable$b;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var isForced = isForced_1;
	var path$3 = path$5;
	var bind$8 = functionBindContext;
	var createNonEnumerableProperty = createNonEnumerableProperty$1;
	var hasOwn$2 = hasOwnProperty_1;

	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof Wrapper) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return apply(NativeConstructor, this, arguments);
	  };
	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global$1 : STATIC ? global$1[TARGET] : (global$1[TARGET] || {}).prototype;

	  var target = GLOBAL ? path$3 : path$3[TARGET] || createNonEnumerableProperty(path$3, TARGET, {})[TARGET];
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && hasOwn$2(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

	    // bind methods to global for calling from export context
	    if (options.bind && USE_NATIVE) resultProperty = bind$8(sourceProperty, global$1);
	    // wrap global constructors for prevent changes in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && isCallable$4(sourceProperty)) resultProperty = uncurryThis$7(sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(resultProperty, 'sham', true);
	    }

	    createNonEnumerableProperty(target, key, resultProperty);

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!hasOwn$2(path$3, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty(path$3, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      createNonEnumerableProperty(path$3[VIRTUAL_PROTOTYPE], key, sourceProperty);
	      // export real prototype methods
	      if (options.real && targetPrototype && (FORCED || !targetPrototype[key])) {
	        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$3 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

	var max$1 = Math.max;
	var min$2 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$2 = function (index, length) {
	  var integer = toIntegerOrInfinity$2(index);
	  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

	var min$1 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min$1(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$3 = function (obj) {
	  return toLength(obj.length);
	};

	var classof$2 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$2 = Array.isArray || function isArray(argument) {
	  return classof$2(argument) == 'Array';
	};

	var DESCRIPTORS$2 = descriptors;
	var isArray$1 = isArray$2;

	var $TypeError$3 = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$2 && !function () {
	  // makes no sense without proper strict mode support
	  if (this !== undefined) return true;
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).length = 1;
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	}();

	var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
	  if (isArray$1(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
	    throw $TypeError$3('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};

	var $TypeError$2 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$1 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError$2('Maximum allowed index exceeded');
	  return it;
	};

	var wellKnownSymbol$3 = wellKnownSymbol$5;

	var TO_STRING_TAG$1 = wellKnownSymbol$3('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var isCallable$3 = isCallable$b;
	var classofRaw = classofRaw$2;
	var wellKnownSymbol$2 = wellKnownSymbol$5;

	var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$1 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$3(O.callee) ? 'Arguments' : result;
	};

	var uncurryThis$6 = functionUncurryThis;
	var isCallable$2 = isCallable$b;
	var store = sharedStore;

	var functionToString = uncurryThis$6(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$2(store.inspectSource)) {
	  store.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$1 = store.inspectSource;

	var uncurryThis$5 = functionUncurryThis;
	var fails$1 = fails$9;
	var isCallable$1 = isCallable$b;
	var classof = classof$1;
	var getBuiltIn$1 = getBuiltIn$3;
	var inspectSource = inspectSource$1;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct$1 = getBuiltIn$1('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec = uncurryThis$5(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$1(argument)) return false;
	  try {
	    construct$1(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$1(argument)) return false;
	  switch (classof(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$1 = !construct$1 || fails$1(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray = isArray$2;
	var isConstructor = isConstructor$1;
	var isObject$1 = isObject$6;
	var wellKnownSymbol$1 = wellKnownSymbol$5;

	var SPECIES$1 = wellKnownSymbol$1('species');
	var $Array = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
	    else if (isObject$1(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var toPropertyKey = toPropertyKey$3;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$3;

	var createProperty$1 = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var tryToString = tryToString$2;

	var $TypeError$1 = TypeError;

	var deletePropertyOrThrow$1 = function (O, P) {
	  if (!delete O[P]) throw $TypeError$1('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
	};

	var fails = fails$9;
	var wellKnownSymbol = wellKnownSymbol$5;
	var V8_VERSION = engineV8Version;

	var SPECIES = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$4 = _export;
	var toObject$1 = toObject$3;
	var toAbsoluteIndex$1 = toAbsoluteIndex$2;
	var toIntegerOrInfinity = toIntegerOrInfinity$3;
	var lengthOfArrayLike$2 = lengthOfArrayLike$3;
	var setArrayLength = arraySetLength;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;
	var createProperty = createProperty$1;
	var deletePropertyOrThrow = deletePropertyOrThrow$1;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('splice');

	var max = Math.max;
	var min = Math.min;

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$$4({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject$1(this);
	    var len = lengthOfArrayLike$2(O);
	    var actualStart = toAbsoluteIndex$1(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
	    }
	    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
	    A = arraySpeciesCreate$1(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow(O, to);
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow(O, to);
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    setArrayLength(O, len - actualDeleteCount + insertCount);
	    return A;
	  }
	});

	var path$2 = path$5;

	var entryVirtual$3 = function (CONSTRUCTOR) {
	  return path$2[CONSTRUCTOR + 'Prototype'];
	};

	var entryVirtual$2 = entryVirtual$3;

	var splice$6 = entryVirtual$2('Array').splice;

	var isPrototypeOf$2 = objectIsPrototypeOf;
	var method$2 = splice$6;

	var ArrayPrototype$1 = Array.prototype;

	var splice$5 = function (it) {
	  var own = it.splice;
	  return it === ArrayPrototype$1 || (isPrototypeOf$2(ArrayPrototype$1, it) && own === ArrayPrototype$1.splice) ? method$2 : own;
	};

	var parent$e = splice$5;

	var splice$4 = parent$e;

	var parent$d = splice$4;

	var splice$3 = parent$d;

	var parent$c = splice$3;

	var splice$2 = parent$c;

	var splice$1 = splice$2;

	var splice = splice$1;

	var _spliceInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(splice);

	/*
	 * @Author: Huangjs
	 * @Date: 2023-02-13 15:22:58
	 * @LastEditors: Huangjs
	 * @LastEditTime: 2023-08-17 11:33:48
	 * @Description: ******
	 */
	var EventTarget = /*#__PURE__*/function () {
	  function EventTarget() {
	    this.events = {};
	    this.events = {};
	  }
	  var _proto = EventTarget.prototype;
	  _proto.one = function one(type, handler, single) {
	    var _this = this;
	    var onceHandler = typeof handler === 'function' ? function () {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	      // 该事件只执行一次，执行完就解除事件
	      handler.apply(null, args);
	      _this.off(type, onceHandler, single);
	    } : handler;
	    this.on(type, onceHandler, single);
	  };
	  _proto.on = function on(type, handler, single) {
	    var events = this.events[type] || {
	      pool: [],
	      single: -1
	    };
	    if (typeof handler === 'function') {
	      if (single) {
	        // 该事件只能注册一次，每次注册都会替换上次注册的，类似于dom属性事件赋值注册比如element.onclick = ()=>{}
	        if (events.single === -1) {
	          // 记录该单独事件在所有事件的位置
	          events.single = events.pool.push(handler) - 1;
	        } else {
	          events.pool[events.single] = handler;
	        }
	      } else {
	        // 该事件可以注册多次，执行时，会遍历全部事件全部执行，类似于dom的addEventListener
	        // 注册进去之前会检查是否有相同的处理程序，如果有，则不再添加（独立程序不参与）
	        var unregistered = true;
	        for (var i = 0, len = events.pool.length; i < len; i++) {
	          if (events.pool[i] === handler && i !== events.single) {
	            unregistered = false;
	            break;
	          }
	        }
	        if (unregistered) {
	          events.pool.push(handler);
	        }
	      }
	    } else if (single && events.single !== -1) {
	      var _context;
	      // 需要把独立事件删除，相当于解绑独立事件
	      _spliceInstanceProperty(_context = events.pool).call(_context, events.single, 1);
	      events.single = -1;
	    }
	    this.events[type] = events;
	  };
	  _proto.off = function off(type, handler, single) {
	    if (typeof type === 'undefined') {
	      // 没有type则删除全部事件
	      this.events = {};
	    } else if (typeof handler === 'undefined') {
	      // 删除type下的所有事件
	      delete this.events[type];
	    } else if (single) {
	      var events = this.events[type];
	      if (events && events.single !== -1) {
	        var _context2;
	        // 删除独立程序事件
	        _spliceInstanceProperty(_context2 = events.pool).call(_context2, events.single, 1);
	        events.single = -1;
	      }
	    } else {
	      var _events = this.events[type];
	      if (_events) {
	        // 检查并删除事件池内事件
	        for (var i = _events.pool.length - 1; i >= 0; i--) {
	          if (_events.pool[i] === handler && i !== _events.single) {
	            var _context3;
	            _spliceInstanceProperty(_context3 = _events.pool).call(_context3, i, 1);
	            // 因为相同事件只会有一个，所以删除后不需要再检查了
	            break;
	          }
	        }
	      }
	    }
	  };
	  _proto.emit = function emit(type, event) {
	    var events = this.events[type];
	    if (events) {
	      // 循环执行事件池里的事件
	      for (var i = 0, len = events.pool.length; i < len; i++) {
	        var handler = events.pool[i];
	        if (typeof handler === 'function') {
	          var immediatePropagation = handler.apply(null, [event, type]);
	          // 返回值为false，则阻止后于该事件注册的同类型事件触发
	          if (immediatePropagation === false) {
	            break;
	          }
	        }
	      }
	    }
	  };
	  return EventTarget;
	}();

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	  return self;
	}

	var objectDefineProperties = {};

	var toIndexedObject$2 = toIndexedObject$4;
	var toAbsoluteIndex = toAbsoluteIndex$2;
	var lengthOfArrayLike$1 = lengthOfArrayLike$3;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$2($this);
	    var length = lengthOfArrayLike$1(O);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$1(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$1(false)
	};

	var hiddenKeys$2 = {};

	var uncurryThis$4 = functionUncurryThis;
	var hasOwn$1 = hasOwnProperty_1;
	var toIndexedObject$1 = toIndexedObject$4;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$1 = hiddenKeys$2;

	var push$1 = uncurryThis$4([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$1(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$1(hiddenKeys$1, key) && hasOwn$1(O, key) && push$1(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
	    ~indexOf(result, key) || push$1(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$2 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$2;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$1 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$1 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule = objectDefineProperty;
	var anObject$2 = anObject$4;
	var toIndexedObject = toIndexedObject$4;
	var objectKeys = objectKeys$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$1 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$2(O);
	  var props = toIndexedObject(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn = getBuiltIn$3;

	var html$1 = getBuiltIn('document', 'documentElement');

	var shared = sharedExports;
	var uid = uid$2;

	var keys = shared('keys');

	var sharedKey$1 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	/* global ActiveXObject -- old IE, WSH */
	var anObject$1 = anObject$4;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$2;
	var hiddenKeys = hiddenKeys$2;
	var html = html$1;
	var documentCreateElement = documentCreateElement$1;
	var sharedKey = sharedKey$1;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject$1(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	// TODO: Remove from `core-js@4`
	var $$3 = _export;
	var DESCRIPTORS = descriptors;
	var create$5 = objectCreate;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	$$3({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
	  create: create$5
	});

	var path$1 = path$5;

	var Object$1 = path$1.Object;

	var create$4 = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var parent$b = create$4;

	var create$3 = parent$b;

	var parent$a = create$3;

	var create$2 = parent$a;

	var parent$9 = create$2;

	var create$1 = parent$9;

	var create = create$1;

	var _Object$create = /*@__PURE__*/getDefaultExportFromCjs(create);

	var uncurryThis$3 = functionUncurryThis;
	var aCallable$1 = aCallable$4;

	var functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis$3(aCallable$1(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};

	var isCallable = isCallable$b;

	var $String = String;
	var $TypeError = TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable(argument)) return argument;
	  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */
	var uncurryThisAccessor = functionUncurryThisAccessor;
	var anObject = anObject$4;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $$2 = _export;
	var setPrototypeOf$5 = objectSetPrototypeOf;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	$$2({ target: 'Object', stat: true }, {
	  setPrototypeOf: setPrototypeOf$5
	});

	var path = path$5;

	var setPrototypeOf$4 = path.Object.setPrototypeOf;

	var parent$8 = setPrototypeOf$4;

	var setPrototypeOf$3 = parent$8;

	var parent$7 = setPrototypeOf$3;

	var setPrototypeOf$2 = parent$7;

	var parent$6 = setPrototypeOf$2;

	var setPrototypeOf$1 = parent$6;

	var setPrototypeOf = setPrototypeOf$1;

	var _Object$setPrototypeOf = /*@__PURE__*/getDefaultExportFromCjs(setPrototypeOf);

	var uncurryThis$2 = functionUncurryThis;

	var arraySlice$1 = uncurryThis$2([].slice);

	var uncurryThis$1 = functionUncurryThis;
	var aCallable = aCallable$4;
	var isObject = isObject$6;
	var hasOwn = hasOwnProperty_1;
	var arraySlice = arraySlice$1;
	var NATIVE_BIND = functionBindNative;

	var $Function = Function;
	var concat = uncurryThis$1([].concat);
	var join = uncurryThis$1([].join);
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!hasOwn(factories, argsLength)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	// eslint-disable-next-line es/no-function-prototype-bind -- detection
	var functionBind = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
	  var F = aCallable(this);
	  var Prototype = F.prototype;
	  var partArgs = arraySlice(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = concat(partArgs, arraySlice(arguments));
	    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
	  };
	  if (isObject(Prototype)) boundFunction.prototype = Prototype;
	  return boundFunction;
	};

	// TODO: Remove from `core-js@4`
	var $$1 = _export;
	var bind$7 = functionBind;

	// `Function.prototype.bind` method
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	// eslint-disable-next-line es/no-function-prototype-bind -- detection
	$$1({ target: 'Function', proto: true, forced: Function.bind !== bind$7 }, {
	  bind: bind$7
	});

	var entryVirtual$1 = entryVirtual$3;

	var bind$6 = entryVirtual$1('Function').bind;

	var isPrototypeOf$1 = objectIsPrototypeOf;
	var method$1 = bind$6;

	var FunctionPrototype = Function.prototype;

	var bind$5 = function (it) {
	  var own = it.bind;
	  return it === FunctionPrototype || (isPrototypeOf$1(FunctionPrototype, it) && own === FunctionPrototype.bind) ? method$1 : own;
	};

	var parent$5 = bind$5;

	var bind$4 = parent$5;

	var parent$4 = bind$4;

	var bind$3 = parent$4;

	var parent$3 = bind$3;

	var bind$2 = parent$3;

	var bind$1 = bind$2;

	var _bindInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(bind$1);

	function _setPrototypeOf(o, p) {
	  var _context;
	  _setPrototypeOf = _Object$setPrototypeOf ? _bindInstanceProperty(_context = _Object$setPrototypeOf).call(_context) : function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };
	  return _setPrototypeOf(o, p);
	}

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = _Object$create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  _setPrototypeOf(subClass, superClass);
	}

	var bind = functionBindContext;
	var uncurryThis = functionUncurryThis;
	var IndexedObject = indexedObject;
	var toObject = toObject$3;
	var lengthOfArrayLike = lengthOfArrayLike$3;
	var arraySpeciesCreate = arraySpeciesCreate$2;

	var push = uncurryThis([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = IndexedObject(O);
	    var boundFunction = bind(callbackfn, that);
	    var length = lengthOfArrayLike(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod(7)
	};

	var $ = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual = entryVirtual$3;

	var filter$6 = entryVirtual('Array').filter;

	var isPrototypeOf = objectIsPrototypeOf;
	var method = filter$6;

	var ArrayPrototype = Array.prototype;

	var filter$5 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.filter) ? method : own;
	};

	var parent$2 = filter$5;

	var filter$4 = parent$2;

	var parent$1 = filter$4;

	var filter$3 = parent$1;

	var parent = filter$3;

	var filter$2 = parent;

	var filter$1 = filter$2;

	var filter = filter$1;

	var _filterInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(filter);

	/*
	 * @Author: Huangjs
	 * @Date: 2023-02-13 15:22:58
	 * @LastEditors: Huangjs
	 * @LastEditTime: 2023-08-16 17:23:53
	 * @Description: ******
	 */

	var isCurrentTarget = function isCurrentTarget(target, currentTarget) {
	  var _target = target;
	  while (_target && _target !== currentTarget) {
	    _target = _target.parentNode;
	  }
	  return !!_target;
	};
	function fixOption(value, defaultValue, minVal) {
	  return typeof value !== 'number' || value < minVal ? defaultValue : value;
	}
	function isTouchable(ele) {
	  if (!ele) {
	    return false;
	  }
	  return navigator.maxTouchPoints || 'ontouchstart' in ele;
	}
	function getEventPoints(event, started) {
	  if (started === void 0) {
	    started = false;
	  }
	  if (event instanceof TouchEvent) {
	    if (started) {
	      var touches = _filterInstanceProperty(Array.prototype).call(event.touches, function (t) {
	        return isCurrentTarget(t.target, event.currentTarget);
	      });
	      return {
	        points: touches,
	        isFirst: event.changedTouches.length === touches.length
	      };
	    }
	    return {
	      points: event.changedTouches
	    };
	  }
	  return {
	    points: [{
	      pageX: event.pageX,
	      pageY: event.pageY,
	      identifier: -1
	    }],
	    isFirst: started
	  };
	}
	function getDistance(_ref, _ref2) {
	  var x0 = _ref[0],
	    y0 = _ref[1];
	  var x1 = _ref2[0],
	    y1 = _ref2[1];
	  if (typeof x0 === 'number' && typeof x1 === 'number' && typeof y0 === 'number' && typeof y1 === 'number') {
	    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
	  }
	  return 0;
	}
	function getAngle(_ref3, _ref4) {
	  var x0 = _ref3[0],
	    y0 = _ref3[1];
	  var x1 = _ref4[0],
	    y1 = _ref4[1];
	  if (typeof x0 === 'number' && typeof x1 === 'number' && typeof y0 === 'number' && typeof y1 === 'number') {
	    return Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
	  }
	  return 0;
	}
	function getCenter(_ref5, _ref6) {
	  var x0 = _ref5[0],
	    y0 = _ref5[1];
	  var x1 = _ref6[0],
	    y1 = _ref6[1];
	  var ok0 = typeof x0 === 'number' && typeof y0 === 'number';
	  var ok1 = typeof x1 === 'number' && typeof y1 === 'number';
	  return !ok0 && !ok1 ? [0, 0] : ok0 && !ok1 ? [x0, y0] : !ok0 && ok1 ? [x1, y1] : [(x0 + x1) / 2, (y0 + y1) / 2];
	}
	function getDirection(_ref7, _ref8) {
	  var x0 = _ref7[0],
	    y0 = _ref7[1];
	  var x1 = _ref8[0],
	    y1 = _ref8[1];
	  if (typeof x0 === 'number' && typeof x1 === 'number' && typeof y0 === 'number' && typeof y1 === 'number') {
	    var x = x0 - x1;
	    var y = y0 - y1;
	    if (x !== y) {
	      return Math.abs(x) >= Math.abs(y) ? x0 - x1 > 0 ? 'Left' : 'Right' : y0 - y1 > 0 ? 'Up' : 'Down';
	    }
	  }
	  return 'None';
	}
	function getVelocity(deltaTime, distance) {
	  if (typeof distance !== 'number' || distance === 0 || typeof deltaTime !== 'number' || deltaTime === 0) {
	    return 0;
	  }
	  return distance / deltaTime;
	}

	//根据数值，与水平夹角，计算x和y的分量值
	function getVector(value, angle) {
	  if (typeof value !== 'number' || typeof angle !== 'number') {
	    return [0, 0];
	  }
	  var rad = angle * Math.PI / 180;
	  return [value * Math.cos(rad), value * Math.sin(rad)];
	}

	function started(event) {
	  var _this = this;
	  var _getEventPoints = getEventPoints(event, true),
	    points = _getEventPoints.points,
	    isFirst = _getEventPoints.isFirst;
	  if (!points) {
	    return;
	  }
	  event.preventDefault();
	  event.stopImmediatePropagation();
	  var newEvent = {
	    currentTarget: this.element,
	    sourceEvent: event,
	    timestamp: Date.now(),
	    pointers: [],
	    leavePointers: [],
	    getPoint: function getPoint() {
	      return [0, 0];
	    }
	  };
	  // 表示第一次放入手指（点）
	  if (isFirst) {
	    // 第一次点击，如果存在wheel没执行，需要执行掉
	    if (this._wheelTimerEnd) {
	      window.clearTimeout(this._wheelTimerEnd.timer);
	      this._wheelTimerEnd.wheelEnd();
	      this._wheelTimerEnd = null;
	    }
	    this._pointer0 = null;
	    this._pointer1 = null;
	  } else {
	    if (this._pointer0) {
	      this._pointer0.changed = false;
	    }
	    if (this._pointer1) {
	      this._pointer1.changed = false;
	    }
	  }
	  // 如果当前事件元素之外的屏幕上有手指（点），此时在事件元素上放一个手指（点），points会包含该手指（点）
	  // 循环保存放在屏幕上的手指（点），这里只会保存最多两个，忽略超过三个的手指（点）（只对单指和双指情形处理）
	  for (var i = 0, len = points.length; i < len; ++i) {
	    var t = points[i];
	    var p = [t.pageX, t.pageY];
	    var pointer = {
	      start: p,
	      previous: p,
	      current: p,
	      identifier: t.identifier,
	      changed: true
	    };
	    if (!this._pointer0) {
	      this._pointer0 = pointer;
	    } else if (!this._pointer1 && this._pointer0.identifier !== t.identifier) {
	      this._pointer1 = pointer;
	    }
	  }
	  // 每次进入时先阻止所有单指事件
	  this._preventTap = true;
	  this._preventSingleTap = true;
	  this._preventDoubleTap = true;
	  this._swipePoints = null;
	  this._rotateAngle = 0;
	  if (this._longTapTimer) {
	    window.clearTimeout(this._longTapTimer);
	    this._longTapTimer = null;
	  }
	  // 双指start
	  var pointer0 = this._pointer0;
	  var pointer1 = this._pointer1;
	  if (pointer1 && pointer0) {
	    this._firstPointer = null;
	    newEvent.pointers = [pointer0, pointer1];
	    newEvent.getPoint = function () {
	      return getCenter(pointer0.current, pointer1.current);
	    };
	    this.emit('gestureStart', newEvent);
	  }
	  // 单指start
	  else if (pointer0) {
	    newEvent.pointers = [pointer0];
	    newEvent.getPoint = function () {
	      return pointer0.current;
	    };
	    this._preventTap = false;
	    // 设置一个长按定时器
	    this._longTapTimer = window.setTimeout(function () {
	      // 当前点击一旦长按超过longTapInterval则触发longTap，则松开后不会再触发所有单指事件
	      _this._preventTap = true;
	      _this._preventSingleTap = true;
	      _this._preventDoubleTap = true;
	      _this._longTapTimer = null;
	      _this._firstPointer = null;
	      newEvent.waitTime = _this.longTapInterval;
	      _this.emit('longTap', newEvent);
	    }, this.longTapInterval);
	    var firstPointer = this._firstPointer;
	    var singleTapTimer = this._singleTapTimer;
	    if (singleTapTimer && firstPointer && getDistance(firstPointer.current, pointer0.current) < this.doubleTapDistance) {
	      // 1，只要连续两次点击时间在doubleTapInterval之内，距离在doubleTapDistance内，无论第二次作何操作，都不会触发第一次的singleTap，但第一次的tap会触发
	      // 2，如果满足第一条时，第二次的点击有多根手指（点），或者长按触发longTap，则不会再触发doubleTap，第二次的tap，singleTap也不会触发
	      window.clearTimeout(singleTapTimer);
	      this._singleTapTimer = null;
	      this._preventSingleTap = true;
	      this._preventDoubleTap = false;
	      newEvent.getPoint = function () {
	        return firstPointer.current;
	      };
	    } else {
	      this._firstPointer = pointer0;
	      // 表示是第一次点击或该次点击距离上一次点击时间超过doubleTapInterval，距离超过doubleTapDistance
	      this._preventSingleTap = false;
	      this._preventDoubleTap = true;
	    }
	  }
	  // 无指没有start
	  else {
	    return;
	  }
	  this.emit('pointerStart', newEvent);
	}
	function moved(event) {
	  var _getEventPoints2 = getEventPoints(event),
	    points = _getEventPoints2.points;
	  if (!points) {
	    return;
	  }
	  event.preventDefault();
	  event.stopImmediatePropagation();
	  var newEvent = {
	    currentTarget: this.element,
	    sourceEvent: event,
	    timestamp: Date.now(),
	    pointers: [],
	    leavePointers: [],
	    getPoint: function getPoint() {
	      return [0, 0];
	    }
	  };
	  if (this._pointer0) {
	    this._pointer0.changed = false;
	  }
	  if (this._pointer1) {
	    this._pointer1.changed = false;
	  }
	  // 循环更新手指（点）
	  for (var i = 0, len = points.length; i < len; ++i) {
	    var t = points[i];
	    var p = [t.pageX, t.pageY];
	    if (this._pointer0 && this._pointer0.identifier === t.identifier) {
	      this._pointer0.changed = true;
	      this._pointer0.previous = this._pointer0.current;
	      this._pointer0.current = p;
	    } else if (this._pointer1 && this._pointer1.identifier === t.identifier) {
	      this._pointer1.changed = true;
	      this._pointer1.previous = this._pointer1.current;
	      this._pointer1.current = p;
	    }
	  }
	  // 手指（点）移动至少要有一个手指（点）移动超过touchMoveDistance才会触发移动事件

	  var pointer0 = this._pointer0;
	  var pointer1 = this._pointer1;
	  if (pointer0 && getDistance(pointer0.start, pointer0.current) > this.touchMoveDistance || pointer1 && getDistance(pointer1.start, pointer1.current) > this.touchMoveDistance) {
	    // 一旦移动，则阻止所有单指点击相关事件（除了swipe）
	    this._preventTap = true;
	    this._preventSingleTap = true;
	    this._preventDoubleTap = true;
	    this._firstPointer = null;
	    if (this._longTapTimer) {
	      window.clearTimeout(this._longTapTimer);
	      this._longTapTimer = null;
	    }
	    // 双指移动情况
	    if (pointer1 && pointer0) {
	      newEvent.pointers = [pointer0, pointer1];
	      var start0 = pointer0.start,
	        previous0 = pointer0.previous,
	        current0 = pointer0.current;
	      var start1 = pointer1.start,
	        previous1 = pointer1.previous,
	        current1 = pointer1.current;
	      // 双指平移
	      var eCenter = getCenter(current0, current1);
	      var mCenter = getCenter(previous0, previous1);
	      var sCenter = getCenter(start0, start1);
	      newEvent.getPoint = function (whichOne) {
	        return whichOne === 'start' ? sCenter : whichOne === 'previous' ? mCenter : eCenter;
	      };
	      newEvent.direction = getDirection(mCenter, eCenter);
	      newEvent.moveDirection = getDirection(sCenter, eCenter);
	      newEvent.deltaX = eCenter[0] - mCenter[0];
	      newEvent.moveX = eCenter[0] - sCenter[0];
	      newEvent.deltaY = eCenter[1] - mCenter[1];
	      newEvent.moveY = eCenter[1] - sCenter[1];
	      // 只有双指滑动时才会触发下面事件
	      var eDistance = getDistance(current0, current1);
	      var mDistance = getDistance(previous0, previous1);
	      var sDistance = getDistance(start0, start1);
	      if (sDistance > 0 && eDistance > 0 && mDistance > 0) {
	        // 双指缩放
	        newEvent.scale = eDistance / mDistance;
	        newEvent.moveScale = eDistance / sDistance;
	      }
	      var eAngle = getAngle(current0, current1);
	      var mAngle = getAngle(previous0, previous1);
	      // const sAngle = getAngle(start0, start1);
	      // 这里计算的三个angle均是向量（第一个参数为起点，第二个为终点）与x正半轴之间的夹角
	      // 方向朝向y轴正半轴的为正值[0,180]，朝向y轴负半轴的为负值[-180,0]
	      // 注意，这里坐标轴是页面坐标，x轴向右正方向，y轴向下正方向，原点在左上角
	      var angle = eAngle - mAngle;
	      if (angle < -180) {
	        // 此种情况属于顺时针转动时mAngle突然由正变为负值（比如由178度顺时针旋转4度都-178度）
	        // 这种情况，因为eAngle和mAngle是两次相邻的移动事件，间隔角度很小（4度）而不会是很大的（-356度）
	        angle += 360;
	      } else if (angle > 180) {
	        // 和上面相反逆时针转动（比如由-178逆时针旋转4度到178）
	        angle -= 360;
	      }
	      // 双指旋转本次和上一次的角度，正值顺时针，负值逆时针
	      newEvent.angle = angle;
	      // 双指旋转起点到终点的总旋转角度，正值顺时针，负值逆时针
	      // 这里不能直接使用eAngle-sAngle，否则顺逆时针分不清，需要通过angle累加
	      this._rotateAngle += angle;
	      newEvent.moveAngle = this._rotateAngle;
	      this.emit('rotate', newEvent);
	      if (sDistance > 0 && eDistance > 0 && mDistance > 0) {
	        this.emit('scale', newEvent);
	      }
	      this.emit('multiPan', newEvent);
	      this.emit('gestureMove', newEvent);
	    }
	    // 单指移动
	    else if (pointer0) {
	      newEvent.pointers = [pointer0];
	      var start = pointer0.start,
	        previous = pointer0.previous,
	        current = pointer0.current;
	      newEvent.getPoint = function (whichOne) {
	        return whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
	      };
	      newEvent.direction = getDirection(previous, current);
	      newEvent.moveDirection = getDirection(start, current);
	      newEvent.deltaX = current[0] - previous[0];
	      newEvent.moveX = current[0] - start[0];
	      newEvent.deltaY = current[1] - previous[1];
	      newEvent.moveY = current[1] - start[1];
	      var _timestamp = Date.now();
	      // 第一次移动this._swipePoints为null
	      var _swipePoints = this._swipePoints || [[], []];
	      var _duration = _timestamp - ((_swipePoints[1][0] ? _swipePoints[1][0].timestamp : 0) || 0);
	      // 当前时间与本阶段初始时间之差大于计入swipe的时间(swipeDuration)，则本阶段过时，下阶段开启
	      if (_duration > this.swipeDuration) {
	        // 将本阶段作为上一阶段，开启下一阶段作为本阶段
	        _swipePoints[0] = _swipePoints[1];
	        _swipePoints[1] = [];
	      }
	      // 将当前移动点和时间存入本阶段
	      _swipePoints[1].push({
	        point: current,
	        timestamp: _timestamp
	      });
	      this._swipePoints = _swipePoints;
	      // 触发单指平移事件
	      this.emit('pan', newEvent);
	    }
	    // 无指无移动
	    else {
	      return;
	    }
	    this.emit('pointerMove', newEvent);
	  }
	}
	function ended(event) {
	  var _this2 = this;
	  var _getEventPoints3 = getEventPoints(event),
	    points = _getEventPoints3.points;
	  if (!points) {
	    return;
	  }
	  event.stopImmediatePropagation();
	  var newEvent = {
	    currentTarget: this.element,
	    sourceEvent: event,
	    timestamp: Date.now(),
	    pointers: [],
	    leavePointers: [],
	    getPoint: function getPoint() {
	      return [0, 0];
	    }
	  };
	  // 临时保存当前手指（点）
	  var pointer0 = null;
	  var pointer1 = null;
	  if (this._pointer0) {
	    this._pointer0.changed = false;
	  }
	  if (this._pointer1) {
	    this._pointer1.changed = false;
	  }
	  // 循环删除已经拿开的手指（点）
	  for (var i = 0, len = points.length; i < len; ++i) {
	    var t = points[i];
	    if (this._pointer0 && this._pointer0.identifier === t.identifier) {
	      this._pointer0.changed = true;
	      pointer0 = this._pointer0;
	      this._pointer0 = null;
	    } else if (this._pointer1 && this._pointer1.identifier === t.identifier) {
	      this._pointer1.changed = true;
	      pointer1 = this._pointer1;
	      this._pointer1 = null;
	    }
	  }
	  // 双指变单指
	  if (this._pointer1 && !this._pointer0) {
	    this._pointer0 = this._pointer1;
	    this._pointer1 = null;
	    pointer1 = pointer0;
	    pointer0 = null;
	  }
	  // 松开时清除longTapTimer（一旦松开就不存在长按，当然有可能已经发生过了）
	  if (this._longTapTimer) {
	    window.clearTimeout(this._longTapTimer);
	    this._longTapTimer = null;
	  }
	  // 仍然存在至少一根手指（点）
	  if (this._pointer0) {
	    newEvent.pointers = [this._pointer0];
	    if (this._pointer1) {
	      // 剩余两指
	      newEvent.pointers.push(this._pointer1);
	    } else if (pointer1) {
	      // 剩余一指
	      newEvent.leavePointers = [pointer1];
	    }
	    var start = getCenter(this._pointer0.start, this._pointer1 ? this._pointer1.start : pointer1 ? pointer1.start : []);
	    var previous = getCenter(this._pointer0.previous, this._pointer1 ? this._pointer1.previous : pointer1 ? pointer1.previous : []);
	    var current = getCenter(this._pointer0.current, this._pointer1 ? this._pointer1.current : pointer1 ? pointer1.current : []);
	    newEvent.getPoint = function (whichOne) {
	      return whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
	    };
	    this.emit('gestureEnd', newEvent);
	  }
	  // 全部拿开
	  else if (pointer0) {
	    // 多指的最后一指抬起，仅仅一指抬起
	    newEvent.leavePointers = [pointer0];
	    if (pointer1) {
	      // 双指同时抬起
	      newEvent.leavePointers.push(pointer1);
	    }
	    var _start = pointer1 ? getCenter(pointer0.start, pointer1.start) : pointer0.start;
	    var _previous = pointer1 ? getCenter(pointer0.previous, pointer1.previous) : pointer0.previous;
	    var _current = pointer1 ? getCenter(pointer0.current, pointer1.current) : pointer0.current;
	    newEvent.getPoint = function (whichOne) {
	      return whichOne === 'start' ? _start : whichOne === 'previous' ? _previous : _current;
	    };
	    if (!this._preventTap) {
	      this.emit('tap', newEvent);
	    }
	    if (!this._preventSingleTap) {
	      // 等待doubleTapInterval，如果时间内没有点击第二次，则触发
	      this._singleTapTimer = window.setTimeout(function () {
	        _this2._singleTapTimer = null;
	        newEvent.delayTime = _this2.doubleTapInterval;
	        _this2.emit('singleTap', newEvent);
	      }, this.doubleTapInterval);
	    }
	    if (!this._preventDoubleTap) {
	      // 双击点使用第一次的点
	      var firstPointer = this._firstPointer;
	      if (firstPointer) {
	        newEvent.getPoint = function () {
	          return firstPointer.current;
	        };
	      }
	      newEvent.intervalTime = this.doubleTapInterval;
	      this.emit('doubleTap', newEvent);
	    }
	    // this._swipePoints存在表示开始了swipe行为
	    if (this._swipePoints) {
	      var _this$_swipePoints = this._swipePoints,
	        prev = _this$_swipePoints[0],
	        next = _this$_swipePoints[1];
	      // 最后一次移动的点即为swipe终点
	      var endPos = next[next.length - 1];
	      // 最后一次移动点的时间减去手指（点）抬起的时间，此间隔时间需小于等待时间raiseDuration，否则视为停止swipe
	      if (Date.now() - endPos.timestamp <= this.raiseDuration) {
	        // 找到计入swipe的时间(swipeDuration)内的swipe起点
	        var startPos = next[0];
	        for (var _i = prev.length - 1; _i >= 0; _i--) {
	          if (endPos.timestamp - prev[_i].timestamp <= this.swipeDuration) {
	            startPos = prev[_i];
	          } else {
	            break;
	          }
	        }
	        // 根据swipe起点和终点的距离差与时间差算出swipe抬起时速率
	        var velocity = getVelocity(endPos.timestamp - startPos.timestamp, getDistance(startPos.point, endPos.point));
	        // swipe速率需要大于swipeVelocity，否则忽略不计，不视为swipe
	        if (velocity > this.swipeVelocity) {
	          // 滑动方向与x夹角
	          var angle = getAngle(startPos.point, endPos.point);
	          // 惯性的方向
	          newEvent.direction = getDirection(startPos.point, endPos.point);
	          newEvent.angle = angle;
	          newEvent.velocity = velocity;
	          // 给出按照velocity速度滑动，当速度减到0时的计算函数：
	          // 当给出时间t，即在t时间内速度减到0，求出滑动的距离：
	          // 当给出减速度a，即在减速度a的作用下，速度减到0，求出滑动的距离，和消耗的时间：
	          // 减速度某个时间的位移：s = v0 * t - (a * t * t) / 2
	          // 减速度某个时间的速度：v = v0 - a * t
	          // s为滑动距离，v末速度为0，v0初速度为velocity
	          newEvent.swipeComputed = function (factor, _velocity) {
	            if (_velocity === void 0) {
	              _velocity = velocity;
	            }
	            // 因子大于1可以认为传入的是时间毫秒数
	            var duration = 0;
	            var deceleration = 0;
	            var distance = 0;
	            if (factor > 1) {
	              duration = factor;
	              deceleration = _velocity / duration;
	              distance = _velocity * duration / 2;
	            }
	            // 因子小于1可以认为传入的是减速度（减速如果大于1一般太大了，不符合使用场景）
	            else if (factor > 0) {
	              deceleration = factor;
	              duration = _velocity / deceleration;
	              distance = _velocity * _velocity / (2 * deceleration);
	            }
	            var _getVector = getVector(distance, angle),
	              stretchX = _getVector[0],
	              stretchY = _getVector[1];
	            return {
	              duration: duration,
	              // swipe速率减到0花费的时间
	              stretchX: stretchX,
	              // x方向swipe惯性距离（抬起后，继续移动的距离）
	              stretchY: stretchY,
	              // y方向swipe惯性距离（抬起后，继续移动的距离）
	              deceleration: deceleration // swipe速率减到0的减速度
	            };
	          };

	          this.emit('swipe', newEvent);
	        }
	      }
	    }
	  }
	  this.emit('pointerEnd', newEvent);
	  /* // 只剩下一根在上面了，以下事件交给用户自行放在pointerEnd事件里自行判断
	  if (this._pointer0 && !this._pointer1) {
	    // 双指抬起，只剩下一指，此时就认为该点是移动的起点（否则会把双指移动的起点作为起点，移动时会出现跳跃）
	    this._pointer0.start = this._pointer0.previous = this._pointer0.current;
	    // 同时可以触发一次start事件
	    newEvent.pointers = [this._pointer0];
	    newEvent.pointer = this._pointer0;
	    this.emit('pointerStart', newEvent);
	  } */
	}

	function canceled(event) {
	  event.stopImmediatePropagation();
	  this.emit('pointerCancel', {
	    currentTarget: this.element,
	    sourceEvent: event,
	    timestamp: Date.now(),
	    pointers: [],
	    leavePointers: [],
	    getPoint: function getPoint() {
	      return [0, 0];
	    }
	  });
	  ended.apply(this, [event]);
	}
	function scrolled() {
	  if (this._singleTapTimer) {
	    window.clearTimeout(this._singleTapTimer);
	    this._singleTapTimer = null;
	  }
	  if (this._longTapTimer) {
	    window.clearTimeout(this._longTapTimer);
	    this._longTapTimer = null;
	  }
	  if (this._wheelTimerEnd) {
	    window.clearTimeout(this._wheelTimerEnd.timer);
	    this._wheelTimerEnd = null;
	  }
	  this._firstPointer = null;
	  this._pointer0 = null;
	  this._pointer1 = null;
	  this._preventTap = true;
	  this._swipePoints = null;
	  this._preventSingleTap = true;
	  this._preventDoubleTap = true;
	}
	function downed(event) {
	  var that = this;
	  window.addEventListener('mousemove', mousemoved);
	  window.addEventListener('mouseup', mouseupped);
	  window.addEventListener('blur', blured);
	  window.addEventListener('dragstart', dragstarted, {
	    capture: true,
	    passive: false
	  });
	  if ('onselectstart' in window.document.documentElement) {
	    window.addEventListener('selectstart', dragstarted, {
	      capture: true,
	      passive: false
	    });
	  }
	  function unbind() {
	    window.removeEventListener('mousemove', mousemoved);
	    window.removeEventListener('mouseup', mouseupped);
	    window.removeEventListener('blur', blured);
	    window.removeEventListener('dragstart', dragstarted);
	    if ('onselectstart' in window.document.documentElement) {
	      window.removeEventListener('selectstart', dragstarted);
	    }
	  }
	  function blured(e) {
	    e.preventDefault();
	    e.stopImmediatePropagation();
	    unbind();
	  }
	  function dragstarted(e) {
	    e.preventDefault();
	    e.stopImmediatePropagation();
	  }
	  function mousemoved(e) {
	    if (event.button === 0) {
	      moved.apply(that, [e]);
	    } else {
	      e.preventDefault();
	      e.stopImmediatePropagation();
	      var newEvent = {
	        currentTarget: that.element,
	        sourceEvent: event,
	        timestamp: Date.now(),
	        pointers: [],
	        leavePointers: [],
	        getPoint: function getPoint() {
	          return [0, 0];
	        }
	      };
	      var point = [e.pageX, e.pageY];
	      if (that._pointer0) {
	        that._pointer0.previous = that._pointer0.current;
	        that._pointer0.current = point;
	        newEvent.pointers = [that._pointer0];
	        var _that$_pointer = that._pointer0,
	          start = _that$_pointer.start,
	          previous = _that$_pointer.previous,
	          current = _that$_pointer.current;
	        newEvent.getPoint = function (whichOne) {
	          return whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
	        };
	        newEvent.direction = getDirection(previous, current);
	        newEvent.moveDirection = getDirection(start, current);
	        newEvent.deltaX = current[0] - previous[0];
	        newEvent.moveX = current[0] - start[0];
	        newEvent.deltaY = current[1] - previous[1];
	        newEvent.moveY = current[1] - start[1];
	        // 根据移动距离计算：1度 = 4px; 正值顺时针，负值逆时针
	        newEvent.angle = newEvent.deltaX / 4;
	        newEvent.moveAngle = newEvent.moveX / 4;
	        that.emit('rotate', newEvent);
	      }
	    }
	  }
	  function mouseupped(e) {
	    unbind();
	    if (event.button === 0) {
	      ended.apply(that, [e]);
	    } else {
	      e.stopImmediatePropagation();
	      var newEvent = {
	        currentTarget: that.element,
	        sourceEvent: event,
	        timestamp: Date.now(),
	        pointers: [],
	        leavePointers: [],
	        getPoint: function getPoint() {
	          return [0, 0];
	        }
	      };
	      var point = [e.pageX, e.pageY];
	      if (that._pointer0) {
	        var pointer0 = that._pointer0;
	        that._pointer0 = null;
	        pointer0.previous = pointer0.current;
	        pointer0.current = point;
	        newEvent.leavePointers = [pointer0];
	        var start = pointer0.start,
	          previous = pointer0.previous,
	          current = pointer0.current;
	        newEvent.getPoint = function (whichOne) {
	          return whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
	        };
	      }
	      newEvent.angle = 0 / 0;
	      that.emit('rotate', newEvent);
	    }
	  }
	  if (event.button === 0) {
	    started.apply(that, [event]);
	  } else {
	    event.preventDefault();
	    event.stopImmediatePropagation();
	    // 如果存在wheel没执行，需要执行掉
	    if (that._wheelTimerEnd) {
	      window.clearTimeout(that._wheelTimerEnd.timer);
	      that._wheelTimerEnd.wheelEnd();
	      that._wheelTimerEnd = null;
	    }
	    var point = [event.pageX, event.pageY];
	    that._pointer0 = {
	      start: point,
	      previous: point,
	      current: point,
	      identifier: -1,
	      changed: true
	    };
	  }
	}
	function wheeled(event) {
	  var _this3 = this;
	  event.preventDefault();
	  event.stopImmediatePropagation();
	  var newEvent = {
	    currentTarget: this.element,
	    sourceEvent: event,
	    timestamp: Date.now(),
	    pointers: [],
	    leavePointers: [],
	    getPoint: function getPoint() {
	      return [0, 0];
	    }
	  };
	  var point = [event.pageX, event.pageY];
	  if (this._wheelTimerEnd) {
	    if (this._pointer0) {
	      this._pointer0.previous = this._pointer0.current;
	      this._pointer0.current = point;
	    }
	    window.clearTimeout(this._wheelTimerEnd.timer);
	    // wheelRoll
	  } else {
	    this._pointer0 = {
	      start: point,
	      previous: point,
	      current: point,
	      identifier: -1,
	      changed: true
	    };
	    // wheelstart
	  }

	  var wheelEnd = function wheelEnd() {
	    _this3._pointer0 = null;
	    _this3._wheelTimerEnd = null;
	    newEvent.timestamp = Date.now();
	    // 表示滚轮结束，不参与计算
	    newEvent.scale = 0 / 0;
	    _this3.emit('scale', newEvent);
	    // wheelEnd
	  };

	  this._wheelTimerEnd = {
	    wheelEnd: wheelEnd,
	    timer: window.setTimeout(wheelEnd, this.wheelDelay),
	    scale: this._wheelTimerEnd ? this._wheelTimerEnd.scale : 1
	  };
	  if (this._pointer0) {
	    newEvent.pointers = [this._pointer0];
	    var _this$_pointer = this._pointer0,
	      start = _this$_pointer.start,
	      previous = _this$_pointer.previous,
	      current = _this$_pointer.current;
	    newEvent.getPoint = function (whichOne) {
	      return whichOne === 'start' ? start : whichOne === 'previous' ? previous : current;
	    };
	    var scale = Math.pow(2, -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002));
	    this._wheelTimerEnd.scale *= scale;
	    newEvent.moveScale = this._wheelTimerEnd.scale;
	    newEvent.scale = scale;
	    this.emit('scale', newEvent);
	  }
	}
	var Gesture = /*#__PURE__*/function (_EventTarget) {
	  _inheritsLoose(Gesture, _EventTarget);
	  function Gesture(element, options) {
	    var _this4;
	    _this4 = _EventTarget.call(this) || this;
	    _this4._rotateAngle = 0;
	    _this4._singleTapTimer = null;
	    _this4._longTapTimer = null;
	    _this4._wheelTimerEnd = null;
	    _this4._preventTap = true;
	    _this4._swipePoints = null;
	    _this4._preventSingleTap = true;
	    _this4._preventDoubleTap = true;
	    _this4._firstPointer = null;
	    _this4._pointer0 = null;
	    _this4._pointer1 = null;
	    _this4._destory = null;
	    var tempElement;
	    if (typeof element === 'string') {
	      tempElement = document.querySelector(element);
	    } else {
	      tempElement = element;
	    }
	    if (!tempElement || !(tempElement instanceof HTMLElement)) {
	      throw new Error('Please pass in a valid element...');
	    }
	    _this4.element = tempElement;
	    var _ref = options || {},
	      wheelDelay = _ref.wheelDelay,
	      longTapInterval = _ref.longTapInterval,
	      doubleTapInterval = _ref.doubleTapInterval,
	      doubleTapDistance = _ref.doubleTapDistance,
	      touchMoveDistance = _ref.touchMoveDistance,
	      swipeVelocity = _ref.swipeVelocity,
	      swipeDuration = _ref.swipeDuration,
	      raiseDuration = _ref.raiseDuration;
	    _this4.wheelDelay = fixOption(wheelDelay, 350, 1);
	    _this4.longTapInterval = fixOption(longTapInterval, 750, 1);
	    _this4.doubleTapInterval = fixOption(doubleTapInterval, 250, 1);
	    _this4.doubleTapDistance = fixOption(doubleTapDistance, 30, 1);
	    _this4.touchMoveDistance = fixOption(touchMoveDistance, 3, 0);
	    _this4.swipeVelocity = fixOption(swipeVelocity, 0.3, 0);
	    _this4.swipeDuration = fixOption(swipeDuration, 100, 1);
	    _this4.raiseDuration = fixOption(raiseDuration, 100, 1);
	    // 注册触摸事件
	    var tmscrolled = scrolled.bind(_assertThisInitialized(_this4));
	    if (isTouchable(_this4.element)) {
	      var touchstarted = started.bind(_assertThisInitialized(_this4));
	      var touchmoved = moved.bind(_assertThisInitialized(_this4));
	      var touchended = ended.bind(_assertThisInitialized(_this4));
	      var touchcanceled = canceled.bind(_assertThisInitialized(_this4));
	      _this4.element.addEventListener('touchstart', touchstarted, false);
	      _this4.element.addEventListener('touchmove', touchmoved, false);
	      _this4.element.addEventListener('touchend', touchended, false);
	      _this4.element.addEventListener('touchcancel', touchcanceled, false);
	      window.addEventListener('scroll', tmscrolled);
	      _this4._destory = function () {
	        _this4.element.removeEventListener('touchstart', touchstarted);
	        _this4.element.removeEventListener('touchmove', touchmoved);
	        _this4.element.removeEventListener('touchend', touchended);
	        _this4.element.removeEventListener('touchcancel', touchcanceled);
	        window.removeEventListener('scroll', tmscrolled);
	      };
	    } else {
	      // 注册触摸事件
	      var mousedowned = downed.bind(_assertThisInitialized(_this4));
	      _this4.element.addEventListener('mousedown', mousedowned, false);
	      var mousewheeled = wheeled.bind(_assertThisInitialized(_this4));
	      _this4.element.addEventListener('wheel', mousewheeled, false);
	      window.addEventListener('scroll', tmscrolled);
	      _this4._destory = function () {
	        _this4.element.removeEventListener('mousedown', mousedowned);
	        _this4.element.removeEventListener('wheel', mousewheeled);
	        window.removeEventListener('scroll', tmscrolled);
	      };
	    }
	    return _this4;
	  }
	  var _proto = Gesture.prototype;
	  _proto.isTouch = function isTouch() {
	    return isTouchable(this.element);
	  };
	  _proto.destory = function destory() {
	    // 解除所有事件
	    _EventTarget.prototype.off.call(this);
	    scrolled.apply(this);
	    // 解除手势事件
	    if (this._destory) {
	      this._destory();
	      this._destory = null;
	    }
	  };
	  return Gesture;
	}(EventTarget); // 双（多）指结束

	/*
	 * @Author: Huangjs
	 * @Date: 2023-07-26 16:28:53
	 * @LastEditors: Huangjs
	 * @LastEditTime: 2023-07-27 10:50:40
	 * @Description: ******
	 */

	exports.EventTarget = EventTarget;
	exports.default = Gesture;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=gesture.js.map
