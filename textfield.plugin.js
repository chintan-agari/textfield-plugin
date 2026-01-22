var ct = Object.defineProperty;
var pt = (r, t, e) => t in r ? ct(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var q = (r, t, e) => pt(r, typeof t != "symbol" ? t + "" : t, e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = window, V = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), W = /* @__PURE__ */ new WeakMap();
let $t = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== rt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = W.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && W.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vt = (r) => new $t(typeof r == "string" ? r : r + "", void 0, rt), _t = (r, t) => {
  V ? r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = H.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  });
}, Z = V ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return vt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var R;
const O = window, F = O.trustedTypes, ft = F ? F.emptyScript : "", J = O.reactiveElementPolyfillSupport, j = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? ft : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, nt = (r, t) => t !== r && (t == t || r == r), M = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: nt }, z = "finalized";
let y = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const s = this._$Ep(i, e);
      s !== void 0 && (this._$Ev.set(s, i), t.push(s));
    }), t;
  }
  static createProperty(t, e = M) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const o = this[t];
      this[e] = s, this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || M;
  }
  static finalize() {
    if (this.hasOwnProperty(z)) return !1;
    this[z] = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(Z(s));
    } else t !== void 0 && e.push(Z(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  _$Eu() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return _t(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = M) {
    var s;
    const o = this.constructor._$Ep(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : j).toAttribute(e, i.type);
      this._$El = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, o = s._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const n = s.getPropertyOptions(o), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((i = n.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? n.converter : j;
      this._$El = o, this[o] = a.fromAttribute(e, n.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || nt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, o) => this[o] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var o;
        return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
y[z] = !0, y.elementProperties = /* @__PURE__ */ new Map(), y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, J == null || J({ ReactiveElement: y }), ((R = O.reactiveElementVersions) !== null && R !== void 0 ? R : O.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var k;
const N = window, g = N.trustedTypes, K = g ? g.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, D = "$lit$", v = `lit$${(Math.random() + "").slice(9)}$`, ot = "?" + v, At = `<${ot}>`, A = document, C = () => A.createComment(""), w = (r) => r === null || typeof r != "object" && typeof r != "function", lt = Array.isArray, yt = (r) => lt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", L = `[ 	
\f\r]`, b = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, G = /-->/g, Q = />/g, _ = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), X = /'/g, Y = /"/g, ht = /^(?:script|style|textarea|title)$/i, gt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), tt = gt(1), m = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), et = /* @__PURE__ */ new WeakMap(), f = A.createTreeWalker(A, 129, null, !1);
function at(r, t) {
  if (!Array.isArray(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return K !== void 0 ? K.createHTML(t) : t;
}
const mt = (r, t) => {
  const e = r.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : "", n = b;
  for (let a = 0; a < e; a++) {
    const l = r[a];
    let h, d, u = -1, p = 0;
    for (; p < l.length && (n.lastIndex = p, d = n.exec(l), d !== null); ) p = n.lastIndex, n === b ? d[1] === "!--" ? n = G : d[1] !== void 0 ? n = Q : d[2] !== void 0 ? (ht.test(d[2]) && (s = RegExp("</" + d[2], "g")), n = _) : d[3] !== void 0 && (n = _) : n === _ ? d[0] === ">" ? (n = s ?? b, u = -1) : d[1] === void 0 ? u = -2 : (u = n.lastIndex - d[2].length, h = d[1], n = d[3] === void 0 ? _ : d[3] === '"' ? Y : X) : n === Y || n === X ? n = _ : n === G || n === Q ? n = b : (n = _, s = void 0);
    const $ = n === _ && r[a + 1].startsWith("/>") ? " " : "";
    o += n === b ? l + At : u >= 0 ? (i.push(h), l.slice(0, u) + D + l.slice(u) + v + $) : l + v + (u === -2 ? (i.push(void 0), a) : $);
  }
  return [at(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class x {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const a = t.length - 1, l = this.parts, [h, d] = mt(t, e);
    if (this.el = x.createElement(h, i), f.currentNode = this.el.content, e === 2) {
      const u = this.el.content, p = u.firstChild;
      p.remove(), u.append(...p.childNodes);
    }
    for (; (s = f.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const u = [];
          for (const p of s.getAttributeNames()) if (p.endsWith(D) || p.startsWith(v)) {
            const $ = d[n++];
            if (u.push(p), $ !== void 0) {
              const ut = s.getAttribute($.toLowerCase() + D).split(v), U = /([.?@])?(.*)/.exec($);
              l.push({ type: 1, index: o, name: U[2], strings: ut, ctor: U[1] === "." ? bt : U[1] === "?" ? Ct : U[1] === "@" ? wt : T });
            } else l.push({ type: 6, index: o });
          }
          for (const p of u) s.removeAttribute(p);
        }
        if (ht.test(s.tagName)) {
          const u = s.textContent.split(v), p = u.length - 1;
          if (p > 0) {
            s.textContent = g ? g.emptyScript : "";
            for (let $ = 0; $ < p; $++) s.append(u[$], C()), f.nextNode(), l.push({ type: 2, index: ++o });
            s.append(u[p], C());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ot) l.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(v, u + 1)) !== -1; ) l.push({ type: 7, index: o }), u += v.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(r, t, e = r, i) {
  var s, o, n, a;
  if (t === m) return t;
  let l = i !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[i] : e._$Cl;
  const h = w(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== h && ((o = l == null ? void 0 : l._$AO) === null || o === void 0 || o.call(l, !1), h === void 0 ? l = void 0 : (l = new h(r), l._$AT(r, e, i)), i !== void 0 ? ((n = (a = e)._$Co) !== null && n !== void 0 ? n : a._$Co = [])[i] = l : e._$Cl = l), l !== void 0 && (t = E(r, l._$AS(r, t.values), l, i)), t;
}
class Et {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const { el: { content: i }, parts: s } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : A).importNode(i, !0);
    f.currentNode = o;
    let n = f.nextNode(), a = 0, l = 0, h = s[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let d;
        h.type === 2 ? d = new P(n, n.nextSibling, this, t) : h.type === 1 ? d = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (d = new xt(n, this, t)), this._$AV.push(d), h = s[++l];
      }
      a !== (h == null ? void 0 : h.index) && (n = f.nextNode(), a++);
    }
    return f.currentNode = A, o;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class P {
  constructor(t, e, i, s) {
    var o;
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cp = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), w(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== m && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : yt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== c && w(this._$AH) ? this._$AA.nextSibling.data = t : this.$(A.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = x.createElement(at(s.h, s.h[0]), this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o) this._$AH.v(i);
    else {
      const n = new Et(o, this), a = n.u(this.options);
      n.v(i), this.$(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = et.get(t.strings);
    return e === void 0 && et.set(t.strings, e = new x(t)), e;
  }
  T(t) {
    lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new P(this.k(C()), this.k(C()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class T {
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = E(this, t, e, 0), n = !w(t) || t !== this._$AH && t !== m, n && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++) h = E(this, a[i + l], e, l), h === m && (h = this._$AH[l]), n || (n = !w(h) || h !== this._$AH[l]), h === c ? t = c : t !== c && (t += (h ?? "") + o[l + 1]), this._$AH[l] = h;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class bt extends T {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
const St = g ? g.emptyScript : "";
class Ct extends T {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== c ? this.element.setAttribute(this.name, St) : this.element.removeAttribute(this.name);
  }
}
class wt extends T {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = E(this, t, e, 0)) !== null && i !== void 0 ? i : c) === m) return;
    const s = this._$AH, o = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== c && (s === c || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class xt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const it = N.litHtmlPolyfillSupport;
it == null || it(x, P), ((k = N.litHtmlVersions) !== null && k !== void 0 ? k : N.litHtmlVersions = []).push("2.8.0");
const Pt = (r, t, e) => {
  var i, s;
  const o = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let n = o._$litPart$;
  if (n === void 0) {
    const a = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    o._$litPart$ = n = new P(t.insertBefore(C(), a), a, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var B, I;
class S extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Pt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return m;
  }
}
S.finalized = !0, S._$litElement$ = !0, (B = globalThis.litElementHydrateSupport) === null || B === void 0 || B.call(globalThis, { LitElement: S });
const st = globalThis.litElementPolyfillSupport;
st == null || st({ LitElement: S });
((I = globalThis.litElementVersions) !== null && I !== void 0 ? I : globalThis.litElementVersions = []).push("3.3.3");
class dt extends S {
  static getMetaConfig() {
    return {
      controlName: "Text Field (Custom)",
      version: "1.0",
      fallbackDisableSubmit: !0,
      properties: {
        value: {
          type: "string",
          title: "Value",
          isValueField: !0
          // 🔑 REQUIRED
        },
        label: {
          type: "string",
          title: "Label"
        },
        required: {
          type: "boolean",
          title: "Required"
        }
      },
      standardProperties: {
        fieldLabel: !0,
        defaultValue: !0,
        readOnly: !0
      }
    };
  }
  constructor() {
    super(), this.value = "", this.label = "Enter text", this.required = !1, this.error = "", this.readOnly = !1;
  }
  render() {
    return tt`
      <div style="display:flex;flex-direction:column;gap:4px;">
        <label>
          ${this.label}${this.required ? " *" : ""}
        </label>

        <input
          type="text"
          .value=${this.value}
          ?disabled=${this.readOnly}
          @input=${this.onInput}
          style="padding:8px;border:1px solid ${this.error ? "red" : "#ccc"};"
        />

        ${this.error ? tt`<span style="color:red;font-size:12px">${this.error}</span>` : ""}
      </div>
    `;
  }
  onInput(t) {
    const e = t.target.value;
    this.value = e, this.validate(), this.dispatchEvent(new CustomEvent("ntx-value-change", {
      detail: e,
      bubbles: !0,
      composed: !0
    }));
  }
  validate() {
    this.required && !this.value.trim() ? (this.error = "This field is required", this.dispatchEvent(new CustomEvent("invalid", { bubbles: !0 }))) : (this.error = "", this.dispatchEvent(new CustomEvent("valid", { bubbles: !0 })));
  }
}
q(dt, "properties", {
  value: { type: String },
  label: { type: String },
  required: { type: Boolean },
  error: { type: String },
  readOnly: { type: Boolean }
});
customElements.define("textfield", dt);
export {
  dt as TextField
};
