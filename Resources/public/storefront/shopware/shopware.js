//#region \0rolldown/runtime.js
var e = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), t = class {
	constructor(e, t = {}, n = "") {
		if (this.observerSettings = {
			childList: !1,
			subtree: !1,
			attributes: !1
		}, !(e instanceof HTMLElement)) throw Error("Provided element is not a valid HTMLElement.");
		this.el = e, this.componentName = n, this.options = this.mergeOptions(t), this.observer = new MutationObserver(this.observerCallback.bind(this)), this.initializeComponent();
	}
	initializeComponent() {
		this.init();
	}
	initializeObserver(e) {
		this.observerSettings = {
			...this.observerSettings,
			...e
		}, (this.observerSettings.childList || this.observerSettings.attributes) && this.observer.observe(this.el, this.observerSettings);
	}
	observerCallback(e, t) {
		e.forEach((e) => {
			e.type === "childList" && this.observerSettings.childList && this.onContentUpdate(e), e.type === "attributes" && this.observerSettings.attributes && this.onAttributeUpdate(e);
		});
	}
	mergeOptions(e) {
		if (!(this.el instanceof HTMLElement)) return e;
		let t = this.getOptionsFromDataAttribute();
		return {
			...e,
			...t
		};
	}
	getOptionsFromDataAttribute() {
		let e = {};
		if (!(this.el instanceof HTMLElement)) return e;
		let t = this.el.getAttribute("data-component-options");
		if (t) try {
			e = JSON.parse(t);
		} catch {
			console.error("The data attribute \"data-component-options\" could not be parsed to json.");
		}
		return e;
	}
	init() {
		console.warn("Init method has to be implemented.");
	}
	destroy() {}
	dispatchEvent(e, t, n = {
		cancelable: !0,
		bubbles: !0,
		composed: !1
	}) {
		this.el.dispatchEvent(new CustomEvent(e, {
			detail: t,
			...n
		}));
	}
	debounce(e, t = 400, n = !1) {
		let r;
		return (...i) => {
			let a = n && r === void 0;
			r !== void 0 && window.clearTimeout(r), r = window.setTimeout(() => {
				r = void 0, n || e(...i);
			}, t), a && e(...i);
		};
	}
	onContentUpdate(e) {}
	onAttributeUpdate(e) {}
};
window.ShopwareComponent = t;
//#endregion
//#region src/component-system/shopware.ts
var n = (/* @__PURE__ */ e(((e, t) => {
	var n = typeof Reflect == "object" ? Reflect : null, r = n && typeof n.apply == "function" ? n.apply : function(e, t, n) {
		return Function.prototype.apply.call(e, t, n);
	}, i = n && typeof n.ownKeys == "function" ? n.ownKeys : Object.getOwnPropertySymbols ? function(e) {
		return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
	} : function(e) {
		return Object.getOwnPropertyNames(e);
	};
	function a(e) {
		console && console.warn && console.warn(e);
	}
	var o = Number.isNaN || function(e) {
		return e !== e;
	};
	function s() {
		s.init.call(this);
	}
	t.exports = s, t.exports.once = y, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
	var c = 10;
	function l(e) {
		if (typeof e != "function") throw TypeError("The \"listener\" argument must be of type Function. Received type " + typeof e);
	}
	Object.defineProperty(s, "defaultMaxListeners", {
		enumerable: !0,
		get: function() {
			return c;
		},
		set: function(e) {
			if (typeof e != "number" || e < 0 || o(e)) throw RangeError("The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received " + e + ".");
			c = e;
		}
	}), s.init = function() {
		(this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
	}, s.prototype.setMaxListeners = function(e) {
		if (typeof e != "number" || e < 0 || o(e)) throw RangeError("The value of \"n\" is out of range. It must be a non-negative number. Received " + e + ".");
		return this._maxListeners = e, this;
	};
	function u(e) {
		return e._maxListeners === void 0 ? s.defaultMaxListeners : e._maxListeners;
	}
	s.prototype.getMaxListeners = function() {
		return u(this);
	}, s.prototype.emit = function(e) {
		for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
		var i = e === "error", a = this._events;
		if (a !== void 0) i &&= a.error === void 0;
		else if (!i) return !1;
		if (i) {
			var o;
			if (t.length > 0 && (o = t[0]), o instanceof Error) throw o;
			var s = /* @__PURE__ */ Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
			throw s.context = o, s;
		}
		var c = a[e];
		if (c === void 0) return !1;
		if (typeof c == "function") r(c, this, t);
		else for (var l = c.length, u = g(c, l), n = 0; n < l; ++n) r(u[n], this, t);
		return !0;
	};
	function d(e, t, n, r) {
		var i, o, s;
		if (l(n), o = e._events, o === void 0 ? (o = e._events = Object.create(null), e._eventsCount = 0) : (o.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), o = e._events), s = o[t]), s === void 0) s = o[t] = n, ++e._eventsCount;
		else if (typeof s == "function" ? s = o[t] = r ? [n, s] : [s, n] : r ? s.unshift(n) : s.push(n), i = u(e), i > 0 && s.length > i && !s.warned) {
			s.warned = !0;
			var c = /* @__PURE__ */ Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
			c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = s.length, a(c);
		}
		return e;
	}
	s.prototype.addListener = function(e, t) {
		return d(this, e, t, !1);
	}, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(e, t) {
		return d(this, e, t, !0);
	};
	function f() {
		if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
	}
	function p(e, t, n) {
		var r = {
			fired: !1,
			wrapFn: void 0,
			target: e,
			type: t,
			listener: n
		}, i = f.bind(r);
		return i.listener = n, r.wrapFn = i, i;
	}
	s.prototype.once = function(e, t) {
		return l(t), this.on(e, p(this, e, t)), this;
	}, s.prototype.prependOnceListener = function(e, t) {
		return l(t), this.prependListener(e, p(this, e, t)), this;
	}, s.prototype.removeListener = function(e, t) {
		var n, r, i, a, o;
		if (l(t), r = this._events, r === void 0 || (n = r[e], n === void 0)) return this;
		if (n === t || n.listener === t) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, n.listener || t));
		else if (typeof n != "function") {
			for (i = -1, a = n.length - 1; a >= 0; a--) if (n[a] === t || n[a].listener === t) {
				o = n[a].listener, i = a;
				break;
			}
			if (i < 0) return this;
			i === 0 ? n.shift() : _(n, i), n.length === 1 && (r[e] = n[0]), r.removeListener !== void 0 && this.emit("removeListener", e, o || t);
		}
		return this;
	}, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(e) {
		var t, n = this._events, r;
		if (n === void 0) return this;
		if (n.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete n[e]), this;
		if (arguments.length === 0) {
			var i = Object.keys(n), a;
			for (r = 0; r < i.length; ++r) a = i[r], a !== "removeListener" && this.removeAllListeners(a);
			return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
		}
		if (t = n[e], typeof t == "function") this.removeListener(e, t);
		else if (t !== void 0) for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
		return this;
	};
	function m(e, t, n) {
		var r = e._events;
		if (r === void 0) return [];
		var i = r[t];
		return i === void 0 ? [] : typeof i == "function" ? n ? [i.listener || i] : [i] : n ? v(i) : g(i, i.length);
	}
	s.prototype.listeners = function(e) {
		return m(this, e, !0);
	}, s.prototype.rawListeners = function(e) {
		return m(this, e, !1);
	}, s.listenerCount = function(e, t) {
		return typeof e.listenerCount == "function" ? e.listenerCount(t) : h.call(e, t);
	}, s.prototype.listenerCount = h;
	function h(e) {
		var t = this._events;
		if (t !== void 0) {
			var n = t[e];
			if (typeof n == "function") return 1;
			if (n !== void 0) return n.length;
		}
		return 0;
	}
	s.prototype.eventNames = function() {
		return this._eventsCount > 0 ? i(this._events) : [];
	};
	function g(e, t) {
		for (var n = Array(t), r = 0; r < t; ++r) n[r] = e[r];
		return n;
	}
	function _(e, t) {
		for (; t + 1 < e.length; t++) e[t] = e[t + 1];
		e.pop();
	}
	function v(e) {
		for (var t = Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
		return t;
	}
	function y(e, t) {
		return new Promise(function(n, r) {
			function i(n) {
				e.removeListener(t, a), r(n);
			}
			function a() {
				typeof e.removeListener == "function" && e.removeListener("error", i), n([].slice.call(arguments));
			}
			x(e, t, a, { once: !0 }), t !== "error" && b(e, i, { once: !0 });
		});
	}
	function b(e, t, n) {
		typeof e.on == "function" && x(e, "error", t, n);
	}
	function x(e, t, n, r) {
		if (typeof e.on == "function") r.once ? e.once(t, n) : e.on(t, n);
		else if (typeof e.addEventListener == "function") e.addEventListener(t, function i(a) {
			r.once && e.removeEventListener(t, i), n(a);
		});
		else throw TypeError("The \"emitter\" argument must be of type EventEmitter. Received type " + typeof e);
	}
})))(), r = new class e extends n.EventEmitter {
	constructor() {
		if (super(), this.componentRegistry = /* @__PURE__ */ new Map(), this.instanceRegistry = [], this.instanceIndexByElement = /* @__PURE__ */ new WeakMap(), this.interceptionRegistry = /* @__PURE__ */ new Map(), this.onDomContentLoaded = () => {
			this.initializeComponents();
		}, e.instance) return e.instance;
		this.setMaxListeners(50), this.observer = new MutationObserver(this.observerCallback.bind(this)), this.observer.observe(document.body, {
			childList: !0,
			subtree: !0
		}), document.addEventListener("DOMContentLoaded", this.onDomContentLoaded), e.instance = this;
	}
	async getComponent(e) {
		if (!e) return;
		let t = this.componentRegistry.get(e);
		if (t !== void 0) return t ?? void 0;
		let n = this.resolveImportMapSpecifier(e), r;
		try {
			r = (await import(
				/* webpackIgnore: true */
				/* @vite-ignore */
				n
)).default;
		} catch (t) {
			console.error(`Failed to import component ${e}:`, t), this.componentRegistry.set(e, null);
			return;
		}
		if (!r) {
			this.componentRegistry.set(e, null);
			return;
		}
		return this.componentRegistry.set(e, r), r;
	}
	resolveImportMapSpecifier(e) {
		let t = Array.from(document.querySelectorAll("script[type=\"importmap\"]"));
		for (let n of t) {
			let t = n.textContent;
			if (t) try {
				let n = JSON.parse(t).imports;
				if (!n) continue;
				let r = n[e];
				if (r) return r;
				let i;
				for (let t of Object.keys(n)) t.endsWith("/") && e.startsWith(t) && (!i || t.length > i.length) && (i = t);
				if (i && n[i]) return `${n[i]}${e.slice(i.length)}`;
			} catch {
				continue;
			}
		}
		return e;
	}
	getComponentInstances(e) {
		return this.instanceRegistry.filter((t) => e instanceof RegExp ? e.test(t.componentName) : t.componentName === e).map((e) => e.component);
	}
	getComponentInstanceByElement(e, t) {
		return this.instanceIndexByElement.get(t)?.get(e);
	}
	async initializeComponent(e) {
		let t = await this.getComponent(e);
		if (!t) {
			console.warn(`Component ${e} not found. Component will not be initialized.`);
			return;
		}
		let n = `[data-component="${e}"]`;
		document.querySelectorAll(n).forEach((n) => {
			this.initializeComponentOnElement(e, t, n);
		});
	}
	initializeComponentOnElement(e, t, n) {
		if (!t || !n) return;
		let r = this.getComponentInstanceByElement(e, n);
		if (r) return r;
		let i = new t(n, t.options || {}, e);
		this.instanceRegistry.push({
			element: n,
			componentName: e,
			component: i
		});
		let a = this.instanceIndexByElement.get(n) ?? /* @__PURE__ */ new Map();
		return a.set(e, i), this.instanceIndexByElement.set(n, a), i;
	}
	emitQueued(e, ...t) {
		window.queueMicrotask(() => {
			this.emit(e, ...t);
		});
	}
	intercept(e, t, n = 0) {
		this.interceptionRegistry.has(e) || this.interceptionRegistry.set(e, []), this.interceptionRegistry.get(e)?.push({
			callback: t,
			priority: n
		});
	}
	emitInterception(e, t) {
		let n = this.interceptionRegistry.get(e);
		return n ? (n.sort((e, t) => (t.priority || 0) - (e.priority || 0)), n.forEach((e) => {
			t = e.callback(t);
		}), t) : t;
	}
	callMethod(e, t, ...n) {
		this.getComponentInstances(e).forEach((e) => {
			e[t] && typeof e[t] == "function" && e[t].call(e, ...n);
		});
	}
	serializeForm(e) {
		return e.nodeName === "FORM" ? new FormData(e) : new FormData();
	}
	serializeFormJson(e) {
		let t = this.serializeForm(e), n = {};
		if (t instanceof FormData) for (let [e, r] of Array.from(t.entries())) n[e] = r;
		return n;
	}
	disconnect() {
		this.observer.disconnect(), document.removeEventListener("DOMContentLoaded", this.onDomContentLoaded), this.instanceRegistry.forEach((e) => {
			e.component.destroy();
		}), this.componentRegistry.clear(), this.instanceRegistry = [], this.instanceIndexByElement = /* @__PURE__ */ new WeakMap(), this.interceptionRegistry.clear(), this.removeAllListeners();
	}
	async initializeComponents() {
		let e = Array.from(document.querySelectorAll("[data-component]")), t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
		for (let r of e) {
			let e = r.getAttribute("data-component");
			if (!e || t.has(e)) continue;
			let i = (async () => {
				let t = await this.getComponent(e);
				if (!t) throw Error(`Component ${e} not found.`);
				return n.set(e, t), t;
			})();
			t.set(e, i);
		}
		await Promise.allSettled(Array.from(t.values()));
		for (let t of e) {
			let e = t.getAttribute("data-component");
			if (!e) continue;
			let r = n.get(e);
			r && this.initializeComponentOnElement(e, r, t);
		}
		this.emitQueued("Components:Initialized");
	}
	observerCallback(e, t) {
		e.forEach((e) => {
			this.handleAddedNodes(e.addedNodes), this.handleRemovedNodes(e.removedNodes);
		});
	}
	async handleAddedNodes(e) {
		let t = Array.from(e);
		for (let e of t) {
			if (!(e instanceof HTMLElement)) continue;
			let t = e.getAttribute("data-component"), n = await this.getComponent(t);
			t && n && this.initializeComponentOnElement(t, n, e), e.childNodes && e.childNodes.length > 0 && this.handleAddedNodes(e.childNodes);
		}
	}
	handleRemovedNodes(e) {
		let t = Array.from(e);
		for (let e of t) {
			let t = this.instanceIndexByElement.get(e);
			t && (t.forEach((e) => {
				e.destroy();
			}), this.instanceRegistry = this.instanceRegistry.filter((t) => t.element !== e), this.instanceIndexByElement.delete(e)), e.childNodes && e.childNodes.length > 0 && this.handleRemovedNodes(e.childNodes);
		}
	}
}();
window.Shopware = r;
//#endregion
export { r as Shopware, t as ShopwareComponent };
