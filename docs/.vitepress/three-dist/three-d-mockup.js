const hu = (N, M) => N === M, $n = {
  equals: hu
};
let cT = jT;
const Fe = 1, bi = 2, aT = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var wD = null;
let IA = null, du = null, DD = null, oD = null, Ee = null, Wi = 0;
function vu(N, M) {
  const D = DD, e = wD, t = N.length === 0, i = M === void 0 ? e : M, n = t ? aT : {
    owned: null,
    cleanups: null,
    context: i ? i.context : null,
    owner: i
  }, A = t ? N : () => N(() => DN(() => qi(n)));
  wD = n, DD = null;
  try {
    return YN(A, !0);
  } finally {
    DD = D, wD = e;
  }
}
function cn(N, M) {
  M = M ? Object.assign({}, $n, M) : $n;
  const D = {
    value: N,
    observers: null,
    observerSlots: null,
    comparator: M.equals || void 0
  }, e = (t) => (typeof t == "function" && (t = t(D.value)), oT(D, t));
  return [Uu.bind(D), e];
}
function Ki(N, M, D) {
  const e = yT(N, M, !1, Fe);
  Xi(e);
}
function pu(N, M, D) {
  cT = Qu;
  const e = yT(N, M, !1, Fe);
  (!D || !D.render) && (e.user = !0), Ee ? Ee.push(e) : Xi(e);
}
function DN(N) {
  if (DD === null)
    return N();
  const M = DD;
  DD = null;
  try {
    return N();
  } finally {
    DD = M;
  }
}
function Yu(N) {
  pu(() => DN(N));
}
function Uu() {
  if (this.sources && this.state)
    if (this.state === Fe)
      Xi(this);
    else {
      const N = oD;
      oD = null, YN(() => Pi(this), !1), oD = N;
    }
  if (DD) {
    const N = this.observers ? this.observers.length : 0;
    DD.sources ? (DD.sources.push(this), DD.sourceSlots.push(N)) : (DD.sources = [this], DD.sourceSlots = [N]), this.observers ? (this.observers.push(DD), this.observerSlots.push(DD.sources.length - 1)) : (this.observers = [DD], this.observerSlots = [DD.sources.length - 1]);
  }
  return this.value;
}
function oT(N, M, D) {
  let e = N.value;
  return (!N.comparator || !N.comparator(e, M)) && (N.value = M, N.observers && N.observers.length && YN(() => {
    for (let t = 0; t < N.observers.length; t += 1) {
      const i = N.observers[t], n = IA && IA.running;
      n && IA.disposed.has(i), (n ? !i.tState : !i.state) && (i.pure ? oD.push(i) : Ee.push(i), i.observers && CT(i)), n || (i.state = Fe);
    }
    if (oD.length > 1e6)
      throw oD = [], new Error();
  }, !1)), M;
}
function Xi(N) {
  if (!N.fn)
    return;
  qi(N);
  const M = Wi;
  fu(
    N,
    N.value,
    M
  );
}
function fu(N, M, D) {
  let e;
  const t = wD, i = DD;
  DD = wD = N;
  try {
    e = N.fn(M);
  } catch (n) {
    return N.pure && (N.state = Fe, N.owned && N.owned.forEach(qi), N.owned = null), N.updatedAt = D + 1, LT(n);
  } finally {
    DD = i, wD = t;
  }
  (!N.updatedAt || N.updatedAt <= D) && (N.updatedAt != null && "observers" in N ? oT(N, e) : N.value = e, N.updatedAt = D);
}
function yT(N, M, D, e = Fe, t) {
  const i = {
    fn: N,
    state: e,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: M,
    owner: wD,
    context: wD ? wD.context : null,
    pure: D
  };
  return wD === null || wD !== aT && (wD.owned ? wD.owned.push(i) : wD.owned = [i]), i;
}
function Ri(N) {
  if (N.state === 0)
    return;
  if (N.state === bi)
    return Pi(N);
  if (N.suspense && DN(N.suspense.inFallback))
    return N.suspense.effects.push(N);
  const M = [N];
  for (; (N = N.owner) && (!N.updatedAt || N.updatedAt < Wi); )
    N.state && M.push(N);
  for (let D = M.length - 1; D >= 0; D--)
    if (N = M[D], N.state === Fe)
      Xi(N);
    else if (N.state === bi) {
      const e = oD;
      oD = null, YN(() => Pi(N, M[0]), !1), oD = e;
    }
}
function YN(N, M) {
  if (oD)
    return N();
  let D = !1;
  M || (oD = []), Ee ? D = !0 : Ee = [], Wi++;
  try {
    const e = N();
    return mu(D), e;
  } catch (e) {
    D || (Ee = null), oD = null, LT(e);
  }
}
function mu(N) {
  if (oD && (jT(oD), oD = null), N)
    return;
  const M = Ee;
  Ee = null, M.length && YN(() => cT(M), !1);
}
function jT(N) {
  for (let M = 0; M < N.length; M++)
    Ri(N[M]);
}
function Qu(N) {
  let M, D = 0;
  for (M = 0; M < N.length; M++) {
    const e = N[M];
    e.user ? N[D++] = e : Ri(e);
  }
  for (M = 0; M < D; M++)
    Ri(N[M]);
}
function Pi(N, M) {
  N.state = 0;
  for (let D = 0; D < N.sources.length; D += 1) {
    const e = N.sources[D];
    if (e.sources) {
      const t = e.state;
      t === Fe ? e !== M && (!e.updatedAt || e.updatedAt < Wi) && Ri(e) : t === bi && Pi(e, M);
    }
  }
}
function CT(N) {
  for (let M = 0; M < N.observers.length; M += 1) {
    const D = N.observers[M];
    D.state || (D.state = bi, D.pure ? oD.push(D) : Ee.push(D), D.observers && CT(D));
  }
}
function qi(N) {
  let M;
  if (N.sources)
    for (; N.sources.length; ) {
      const D = N.sources.pop(), e = N.sourceSlots.pop(), t = D.observers;
      if (t && t.length) {
        const i = t.pop(), n = D.observerSlots.pop();
        e < t.length && (i.sourceSlots[n] = e, t[e] = i, D.observerSlots[e] = n);
      }
    }
  if (N.owned) {
    for (M = N.owned.length - 1; M >= 0; M--)
      qi(N.owned[M]);
    N.owned = null;
  }
  if (N.cleanups) {
    for (M = N.cleanups.length - 1; M >= 0; M--)
      N.cleanups[M]();
    N.cleanups = null;
  }
  N.state = 0;
}
function Su(N) {
  return N instanceof Error ? N : new Error(typeof N == "string" ? N : "Unknown error", {
    cause: N
  });
}
function LT(N, M = wD) {
  throw Su(N);
}
function ku(N, M) {
  return DN(() => N(M || {}));
}
function Zu(N, M, D) {
  let e = D.length, t = M.length, i = e, n = 0, A = 0, z = M[t - 1].nextSibling, I = null;
  for (; n < t || A < i; ) {
    if (M[n] === D[A]) {
      n++, A++;
      continue;
    }
    for (; M[t - 1] === D[i - 1]; )
      t--, i--;
    if (t === n) {
      const T = i < e ? A ? D[A - 1].nextSibling : D[i - A] : z;
      for (; A < i; )
        N.insertBefore(D[A++], T);
    } else if (i === A)
      for (; n < t; )
        (!I || !I.has(M[n])) && M[n].remove(), n++;
    else if (M[n] === D[i - 1] && D[A] === M[t - 1]) {
      const T = M[--t].nextSibling;
      N.insertBefore(D[A++], M[n++].nextSibling), N.insertBefore(D[--i], T), M[t] = D[i];
    } else {
      if (!I) {
        I = /* @__PURE__ */ new Map();
        let u = A;
        for (; u < i; )
          I.set(D[u], u++);
      }
      const T = I.get(M[n]);
      if (T != null)
        if (A < T && T < i) {
          let u = n, g = 1, s;
          for (; ++u < t && u < i && !((s = I.get(M[u])) == null || s !== T + g); )
            g++;
          if (g > T - A) {
            const a = M[n];
            for (; A < T; )
              N.insertBefore(D[A++], a);
          } else
            N.replaceChild(D[A++], M[n++]);
        } else
          n++;
      else
        M[n++].remove();
    }
  }
}
const Jn = "_$DX_DELEGATE";
function wT(N, M, D) {
  let e;
  const t = () => {
    const n = document.createElement("template");
    return n.innerHTML = N, D ? n.content.firstChild.firstChild : n.content.firstChild;
  }, i = M ? () => DN(() => document.importNode(e || (e = t()), !0)) : () => (e || (e = t())).cloneNode(!0);
  return i.cloneNode = i, i;
}
function _u(N, M = window.document) {
  const D = M[Jn] || (M[Jn] = /* @__PURE__ */ new Set());
  for (let e = 0, t = N.length; e < t; e++) {
    const i = N[e];
    D.has(i) || (D.add(i), M.addEventListener(i, Ku));
  }
}
function bu(N, M, D) {
  return DN(() => N(M, D));
}
function OT(N, M, D, e) {
  if (D !== void 0 && !e && (e = []), typeof M != "function")
    return Fi(N, M, e, D);
  Ki((t) => Fi(N, M(), t, D), e);
}
function Ku(N) {
  const M = `$$${N.type}`;
  let D = N.composedPath && N.composedPath()[0] || N.target;
  for (N.target !== D && Object.defineProperty(N, "target", {
    configurable: !0,
    value: D
  }), Object.defineProperty(N, "currentTarget", {
    configurable: !0,
    get() {
      return D || document;
    }
  }); D; ) {
    const e = D[M];
    if (e && !D.disabled) {
      const t = D[`${M}Data`];
      if (t !== void 0 ? e.call(D, t, N) : e.call(D, N), N.cancelBubble)
        return;
    }
    D = D._$host || D.parentNode || D.host;
  }
}
function Fi(N, M, D, e, t) {
  for (; typeof D == "function"; )
    D = D();
  if (M === D)
    return D;
  const i = typeof M, n = e !== void 0;
  if (N = n && D[0] && D[0].parentNode || N, i === "string" || i === "number")
    if (i === "number" && (M = M.toString()), n) {
      let A = D[0];
      A && A.nodeType === 3 ? A.data !== M && (A.data = M) : A = document.createTextNode(M), D = st(N, D, e, A);
    } else
      D !== "" && typeof D == "string" ? D = N.firstChild.data = M : D = N.textContent = M;
  else if (M == null || i === "boolean")
    D = st(N, D, e);
  else {
    if (i === "function")
      return Ki(() => {
        let A = M();
        for (; typeof A == "function"; )
          A = A();
        D = Fi(N, A, D, e);
      }), () => D;
    if (Array.isArray(M)) {
      const A = [], z = D && Array.isArray(D);
      if (an(A, M, D, t))
        return Ki(() => D = Fi(N, A, D, e, !0)), () => D;
      if (A.length === 0) {
        if (D = st(N, D, e), n)
          return D;
      } else
        z ? D.length === 0 ? Mz(N, A, e) : Zu(N, D, A) : (D && st(N), Mz(N, A));
      D = A;
    } else if (M.nodeType) {
      if (Array.isArray(D)) {
        if (n)
          return D = st(N, D, e, M);
        st(N, D, null, M);
      } else
        D == null || D === "" || !N.firstChild ? N.appendChild(M) : N.replaceChild(M, N.firstChild);
      D = M;
    }
  }
  return D;
}
function an(N, M, D, e) {
  let t = !1;
  for (let i = 0, n = M.length; i < n; i++) {
    let A = M[i], z = D && D[N.length], I;
    if (!(A == null || A === !0 || A === !1))
      if ((I = typeof A) == "object" && A.nodeType)
        N.push(A);
      else if (Array.isArray(A))
        t = an(N, A, z) || t;
      else if (I === "function")
        if (e) {
          for (; typeof A == "function"; )
            A = A();
          t = an(
            N,
            Array.isArray(A) ? A : [A],
            Array.isArray(z) ? z : [z]
          ) || t;
        } else
          N.push(A), t = !0;
      else {
        const T = String(A);
        z && z.nodeType === 3 && z.data === T ? N.push(z) : N.push(document.createTextNode(T));
      }
  }
  return t;
}
function Mz(N, M, D = null) {
  for (let e = 0, t = M.length; e < t; e++)
    N.insertBefore(M[e], D);
}
function st(N, M, D, e) {
  if (D === void 0)
    return N.textContent = "";
  const t = e || document.createTextNode("");
  if (M.length) {
    let i = !1;
    for (let n = M.length - 1; n >= 0; n--) {
      const A = M[n];
      if (t !== A) {
        const z = A.parentNode === N;
        !i && !n ? z ? N.replaceChild(t, A) : N.insertBefore(t, D) : z && A.remove();
      } else
        i = !0;
    }
  } else
    N.insertBefore(t, D);
  return [t];
}
function Ru(N) {
  return Object.keys(N).reduce((D, e) => {
    const t = N[e];
    return D[e] = Object.assign({}, t), ET(t.value) && !Gu(t.value) && !Array.isArray(t.value) && (D[e].value = Object.assign({}, t.value)), Array.isArray(t.value) && (D[e].value = t.value.slice(0)), D;
  }, {});
}
function Pu(N) {
  return N ? Object.keys(N).reduce((D, e) => {
    const t = N[e];
    return D[e] = ET(t) && "value" in t ? t : {
      value: t
    }, D[e].attribute || (D[e].attribute = Vu(e)), D[e].parse = "parse" in D[e] ? D[e].parse : typeof D[e].value != "string", D;
  }, {}) : {};
}
function Fu(N) {
  return Object.keys(N).reduce((D, e) => (D[e] = N[e].value, D), {});
}
function Bu(N, M) {
  const D = Ru(M);
  return Object.keys(M).forEach((t) => {
    const i = D[t], n = N.getAttribute(i.attribute), A = N[t];
    n && (i.value = i.parse ? xT(n) : n), A != null && (i.value = Array.isArray(A) ? A.slice(0) : A), i.reflect && Dz(N, i.attribute, i.value), Object.defineProperty(N, t, {
      get() {
        return i.value;
      },
      set(z) {
        const I = i.value;
        i.value = z, i.reflect && Dz(this, i.attribute, i.value);
        for (let T = 0, u = this.__propertyChangedCallbacks.length; T < u; T++)
          this.__propertyChangedCallbacks[T](t, z, I);
      },
      enumerable: !0,
      configurable: !0
    });
  }), D;
}
function xT(N) {
  if (N)
    try {
      return JSON.parse(N);
    } catch {
      return N;
    }
}
function Dz(N, M, D) {
  if (D == null || D === !1)
    return N.removeAttribute(M);
  let e = JSON.stringify(D);
  N.__updating[M] = !0, e === "true" && (e = ""), N.setAttribute(M, e), Promise.resolve().then(() => delete N.__updating[M]);
}
function Vu(N) {
  return N.replace(/\.?([A-Z]+)/g, (M, D) => "-" + D.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function ET(N) {
  return N != null && (typeof N == "object" || typeof N == "function");
}
function Gu(N) {
  return Object.prototype.toString.call(N) === "[object Function]";
}
function Hu(N) {
  return typeof N == "function" && N.toString().indexOf("class") === 0;
}
let TA;
function Wu(N, M) {
  const D = Object.keys(M);
  return class extends N {
    static get observedAttributes() {
      return D.map((t) => M[t].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Bu(this, M);
      const t = Fu(this.props), i = this.Component, n = TA;
      try {
        TA = this, this.__initialized = !0, Hu(i) ? new i(t, {
          element: this
        }) : i(t, {
          element: this
        });
      } finally {
        TA = n;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let t = null;
      for (; t = this.__releaseCallbacks.pop(); )
        t(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(t, i, n) {
      if (this.__initialized && !this.__updating[t] && (t = this.lookupProp(t), t in M)) {
        if (n == null && !this[t])
          return;
        this[t] = M[t].parse ? xT(n) : n;
      }
    }
    lookupProp(t) {
      if (M)
        return D.find((i) => t === i || t === M[i].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(t) {
      this.__releaseCallbacks.push(t);
    }
    addPropertyChangedCallback(t) {
      this.__propertyChangedCallbacks.push(t);
    }
  };
}
function Xu(N, M = {}, D = {}) {
  const {
    BaseElement: e = HTMLElement,
    extension: t
  } = D;
  return (i) => {
    if (!N)
      throw new Error("tag is required to register a Component");
    let n = customElements.get(N);
    return n ? (n.prototype.Component = i, n) : (n = Wu(e, Pu(M)), n.prototype.Component = i, n.prototype.registeredTag = N, customElements.define(N, n, t), n);
  };
}
function qu(N) {
  const M = Object.keys(N), D = {};
  for (let e = 0; e < M.length; e++) {
    const [t, i] = cn(N[M[e]]);
    Object.defineProperty(D, M[e], {
      get: t,
      set(n) {
        i(() => n);
      }
    });
  }
  return D;
}
function $u(N) {
  if (N.assignedSlot && N.assignedSlot._$owner)
    return N.assignedSlot._$owner;
  let M = N.parentNode;
  for (; M && !M._$owner && !(M.assignedSlot && M.assignedSlot._$owner); )
    M = M.parentNode;
  return M && M.assignedSlot ? M.assignedSlot._$owner : N._$owner;
}
function Ju(N) {
  return (M, D) => {
    const { element: e } = D;
    return vu((t) => {
      const i = qu(M);
      e.addPropertyChangedCallback((A, z) => i[A] = z), e.addReleaseCallback(() => {
        e.renderRoot.textContent = "", t();
      });
      const n = N(i, D);
      return OT(e.renderRoot, n);
    }, $u(e));
  };
}
function Mg(N, M, D) {
  return arguments.length === 2 && (D = M, M = {}), Xu(N, M)(Ju(D));
}
const gD = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], uA = Math.PI / 180, on = 180 / Math.PI;
function eN() {
  const N = Math.random() * 4294967295 | 0, M = Math.random() * 4294967295 | 0, D = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0;
  return (gD[N & 255] + gD[N >> 8 & 255] + gD[N >> 16 & 255] + gD[N >> 24 & 255] + "-" + gD[M & 255] + gD[M >> 8 & 255] + "-" + gD[M >> 16 & 15 | 64] + gD[M >> 24 & 255] + "-" + gD[D & 63 | 128] + gD[D >> 8 & 255] + "-" + gD[D >> 16 & 255] + gD[D >> 24 & 255] + gD[e & 255] + gD[e >> 8 & 255] + gD[e >> 16 & 255] + gD[e >> 24 & 255]).toLowerCase();
}
function aD(N, M, D) {
  return Math.max(M, Math.min(D, N));
}
function Dg(N, M) {
  return (N % M + M) % M;
}
function gA(N, M, D) {
  return (1 - D) * N + D * M;
}
function ez(N) {
  return (N & N - 1) === 0 && N !== 0;
}
function yn(N) {
  return Math.pow(2, Math.floor(Math.log(N) / Math.LN2));
}
function zN(N, M) {
  switch (M.constructor) {
    case Float32Array:
      return N;
    case Uint32Array:
      return N / 4294967295;
    case Uint16Array:
      return N / 65535;
    case Uint8Array:
      return N / 255;
    case Int32Array:
      return Math.max(N / 2147483647, -1);
    case Int16Array:
      return Math.max(N / 32767, -1);
    case Int8Array:
      return Math.max(N / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function lD(N, M) {
  switch (M.constructor) {
    case Float32Array:
      return N;
    case Uint32Array:
      return Math.round(N * 4294967295);
    case Uint16Array:
      return Math.round(N * 65535);
    case Uint8Array:
      return Math.round(N * 255);
    case Int32Array:
      return Math.round(N * 2147483647);
    case Int16Array:
      return Math.round(N * 32767);
    case Int8Array:
      return Math.round(N * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
let UN = class {
  constructor(M = 0, D = 0, e = 0, t = 1) {
    this.isQuaternion = !0, this._x = M, this._y = D, this._z = e, this._w = t;
  }
  static slerpFlat(M, D, e, t, i, n, A) {
    let z = e[t + 0], I = e[t + 1], T = e[t + 2], u = e[t + 3];
    const g = i[n + 0], s = i[n + 1], a = i[n + 2], o = i[n + 3];
    if (A === 0) {
      M[D + 0] = z, M[D + 1] = I, M[D + 2] = T, M[D + 3] = u;
      return;
    }
    if (A === 1) {
      M[D + 0] = g, M[D + 1] = s, M[D + 2] = a, M[D + 3] = o;
      return;
    }
    if (u !== o || z !== g || I !== s || T !== a) {
      let c = 1 - A;
      const r = z * g + I * s + T * a + u * o, w = r >= 0 ? 1 : -1, y = 1 - r * r;
      if (y > Number.EPSILON) {
        const l = Math.sqrt(y), d = Math.atan2(l, r * w);
        c = Math.sin(c * d) / l, A = Math.sin(A * d) / l;
      }
      const j = A * w;
      if (z = z * c + g * j, I = I * c + s * j, T = T * c + a * j, u = u * c + o * j, c === 1 - A) {
        const l = 1 / Math.sqrt(z * z + I * I + T * T + u * u);
        z *= l, I *= l, T *= l, u *= l;
      }
    }
    M[D] = z, M[D + 1] = I, M[D + 2] = T, M[D + 3] = u;
  }
  static multiplyQuaternionsFlat(M, D, e, t, i, n) {
    const A = e[t], z = e[t + 1], I = e[t + 2], T = e[t + 3], u = i[n], g = i[n + 1], s = i[n + 2], a = i[n + 3];
    return M[D] = A * a + T * u + z * s - I * g, M[D + 1] = z * a + T * g + I * u - A * s, M[D + 2] = I * a + T * s + A * g - z * u, M[D + 3] = T * a - A * u - z * g - I * s, M;
  }
  get x() {
    return this._x;
  }
  set x(M) {
    this._x = M, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(M) {
    this._y = M, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(M) {
    this._z = M, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(M) {
    this._w = M, this._onChangeCallback();
  }
  set(M, D, e, t) {
    return this._x = M, this._y = D, this._z = e, this._w = t, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(M) {
    return this._x = M.x, this._y = M.y, this._z = M.z, this._w = M.w, this._onChangeCallback(), this;
  }
  setFromEuler(M, D) {
    const e = M._x, t = M._y, i = M._z, n = M._order, A = Math.cos, z = Math.sin, I = A(e / 2), T = A(t / 2), u = A(i / 2), g = z(e / 2), s = z(t / 2), a = z(i / 2);
    switch (n) {
      case "XYZ":
        this._x = g * T * u + I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "YXZ":
        this._x = g * T * u + I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u + g * s * a;
        break;
      case "ZXY":
        this._x = g * T * u - I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "ZYX":
        this._x = g * T * u - I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u + g * s * a;
        break;
      case "YZX":
        this._x = g * T * u + I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "XZY":
        this._x = g * T * u - I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u + g * s * a;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + n);
    }
    return D !== !1 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(M, D) {
    const e = D / 2, t = Math.sin(e);
    return this._x = M.x * t, this._y = M.y * t, this._z = M.z * t, this._w = Math.cos(e), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M) {
    const D = M.elements, e = D[0], t = D[4], i = D[8], n = D[1], A = D[5], z = D[9], I = D[2], T = D[6], u = D[10], g = e + A + u;
    if (g > 0) {
      const s = 0.5 / Math.sqrt(g + 1);
      this._w = 0.25 / s, this._x = (T - z) * s, this._y = (i - I) * s, this._z = (n - t) * s;
    } else if (e > A && e > u) {
      const s = 2 * Math.sqrt(1 + e - A - u);
      this._w = (T - z) / s, this._x = 0.25 * s, this._y = (t + n) / s, this._z = (i + I) / s;
    } else if (A > u) {
      const s = 2 * Math.sqrt(1 + A - e - u);
      this._w = (i - I) / s, this._x = (t + n) / s, this._y = 0.25 * s, this._z = (z + T) / s;
    } else {
      const s = 2 * Math.sqrt(1 + u - e - A);
      this._w = (n - t) / s, this._x = (i + I) / s, this._y = (z + T) / s, this._z = 0.25 * s;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(M, D) {
    let e = M.dot(D) + 1;
    return e < Number.EPSILON ? (e = 0, Math.abs(M.x) > Math.abs(M.z) ? (this._x = -M.y, this._y = M.x, this._z = 0, this._w = e) : (this._x = 0, this._y = -M.z, this._z = M.y, this._w = e)) : (this._x = M.y * D.z - M.z * D.y, this._y = M.z * D.x - M.x * D.z, this._z = M.x * D.y - M.y * D.x, this._w = e), this.normalize();
  }
  angleTo(M) {
    return 2 * Math.acos(Math.abs(aD(this.dot(M), -1, 1)));
  }
  rotateTowards(M, D) {
    const e = this.angleTo(M);
    if (e === 0)
      return this;
    const t = Math.min(1, D / e);
    return this.slerp(M, t), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(M) {
    return this._x * M._x + this._y * M._y + this._z * M._z + this._w * M._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let M = this.length();
    return M === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (M = 1 / M, this._x = this._x * M, this._y = this._y * M, this._z = this._z * M, this._w = this._w * M), this._onChangeCallback(), this;
  }
  multiply(M) {
    return this.multiplyQuaternions(this, M);
  }
  premultiply(M) {
    return this.multiplyQuaternions(M, this);
  }
  multiplyQuaternions(M, D) {
    const e = M._x, t = M._y, i = M._z, n = M._w, A = D._x, z = D._y, I = D._z, T = D._w;
    return this._x = e * T + n * A + t * I - i * z, this._y = t * T + n * z + i * A - e * I, this._z = i * T + n * I + e * z - t * A, this._w = n * T - e * A - t * z - i * I, this._onChangeCallback(), this;
  }
  slerp(M, D) {
    if (D === 0)
      return this;
    if (D === 1)
      return this.copy(M);
    const e = this._x, t = this._y, i = this._z, n = this._w;
    let A = n * M._w + e * M._x + t * M._y + i * M._z;
    if (A < 0 ? (this._w = -M._w, this._x = -M._x, this._y = -M._y, this._z = -M._z, A = -A) : this.copy(M), A >= 1)
      return this._w = n, this._x = e, this._y = t, this._z = i, this;
    const z = 1 - A * A;
    if (z <= Number.EPSILON) {
      const s = 1 - D;
      return this._w = s * n + D * this._w, this._x = s * e + D * this._x, this._y = s * t + D * this._y, this._z = s * i + D * this._z, this.normalize(), this._onChangeCallback(), this;
    }
    const I = Math.sqrt(z), T = Math.atan2(I, A), u = Math.sin((1 - D) * T) / I, g = Math.sin(D * T) / I;
    return this._w = n * u + this._w * g, this._x = e * u + this._x * g, this._y = t * u + this._y * g, this._z = i * u + this._z * g, this._onChangeCallback(), this;
  }
  slerpQuaternions(M, D, e) {
    return this.copy(M).slerp(D, e);
  }
  random() {
    const M = Math.random(), D = Math.sqrt(1 - M), e = Math.sqrt(M), t = 2 * Math.PI * Math.random(), i = 2 * Math.PI * Math.random();
    return this.set(
      D * Math.cos(t),
      e * Math.sin(i),
      e * Math.cos(i),
      D * Math.sin(t)
    );
  }
  equals(M) {
    return M._x === this._x && M._y === this._y && M._z === this._z && M._w === this._w;
  }
  fromArray(M, D = 0) {
    return this._x = M[D], this._y = M[D + 1], this._z = M[D + 2], this._w = M[D + 3], this._onChangeCallback(), this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this._x, M[D + 1] = this._y, M[D + 2] = this._z, M[D + 3] = this._w, M;
  }
  fromBufferAttribute(M, D) {
    return this._x = M.getX(D), this._y = M.getY(D), this._z = M.getZ(D), this._w = M.getW(D), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(M) {
    return this._onChangeCallback = M, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}, Y = class lT {
  constructor(M = 0, D = 0, e = 0) {
    lT.prototype.isVector3 = !0, this.x = M, this.y = D, this.z = e;
  }
  set(M, D, e) {
    return e === void 0 && (e = this.z), this.x = M, this.y = D, this.z = e, this;
  }
  setScalar(M) {
    return this.x = M, this.y = M, this.z = M, this;
  }
  setX(M) {
    return this.x = M, this;
  }
  setY(M) {
    return this.y = M, this;
  }
  setZ(M) {
    return this.z = M, this;
  }
  setComponent(M, D) {
    switch (M) {
      case 0:
        this.x = D;
        break;
      case 1:
        this.y = D;
        break;
      case 2:
        this.z = D;
        break;
      default:
        throw new Error("index is out of range: " + M);
    }
    return this;
  }
  getComponent(M) {
    switch (M) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + M);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(M) {
    return this.x = M.x, this.y = M.y, this.z = M.z, this;
  }
  add(M) {
    return this.x += M.x, this.y += M.y, this.z += M.z, this;
  }
  addScalar(M) {
    return this.x += M, this.y += M, this.z += M, this;
  }
  addVectors(M, D) {
    return this.x = M.x + D.x, this.y = M.y + D.y, this.z = M.z + D.z, this;
  }
  addScaledVector(M, D) {
    return this.x += M.x * D, this.y += M.y * D, this.z += M.z * D, this;
  }
  sub(M) {
    return this.x -= M.x, this.y -= M.y, this.z -= M.z, this;
  }
  subScalar(M) {
    return this.x -= M, this.y -= M, this.z -= M, this;
  }
  subVectors(M, D) {
    return this.x = M.x - D.x, this.y = M.y - D.y, this.z = M.z - D.z, this;
  }
  multiply(M) {
    return this.x *= M.x, this.y *= M.y, this.z *= M.z, this;
  }
  multiplyScalar(M) {
    return this.x *= M, this.y *= M, this.z *= M, this;
  }
  multiplyVectors(M, D) {
    return this.x = M.x * D.x, this.y = M.y * D.y, this.z = M.z * D.z, this;
  }
  applyEuler(M) {
    return this.applyQuaternion(tz.setFromEuler(M));
  }
  applyAxisAngle(M, D) {
    return this.applyQuaternion(tz.setFromAxisAngle(M, D));
  }
  applyMatrix3(M) {
    const D = this.x, e = this.y, t = this.z, i = M.elements;
    return this.x = i[0] * D + i[3] * e + i[6] * t, this.y = i[1] * D + i[4] * e + i[7] * t, this.z = i[2] * D + i[5] * e + i[8] * t, this;
  }
  applyNormalMatrix(M) {
    return this.applyMatrix3(M).normalize();
  }
  applyMatrix4(M) {
    const D = this.x, e = this.y, t = this.z, i = M.elements, n = 1 / (i[3] * D + i[7] * e + i[11] * t + i[15]);
    return this.x = (i[0] * D + i[4] * e + i[8] * t + i[12]) * n, this.y = (i[1] * D + i[5] * e + i[9] * t + i[13]) * n, this.z = (i[2] * D + i[6] * e + i[10] * t + i[14]) * n, this;
  }
  applyQuaternion(M) {
    const D = this.x, e = this.y, t = this.z, i = M.x, n = M.y, A = M.z, z = M.w, I = z * D + n * t - A * e, T = z * e + A * D - i * t, u = z * t + i * e - n * D, g = -i * D - n * e - A * t;
    return this.x = I * z + g * -i + T * -A - u * -n, this.y = T * z + g * -n + u * -i - I * -A, this.z = u * z + g * -A + I * -n - T * -i, this;
  }
  project(M) {
    return this.applyMatrix4(M.matrixWorldInverse).applyMatrix4(M.projectionMatrix);
  }
  unproject(M) {
    return this.applyMatrix4(M.projectionMatrixInverse).applyMatrix4(M.matrixWorld);
  }
  transformDirection(M) {
    const D = this.x, e = this.y, t = this.z, i = M.elements;
    return this.x = i[0] * D + i[4] * e + i[8] * t, this.y = i[1] * D + i[5] * e + i[9] * t, this.z = i[2] * D + i[6] * e + i[10] * t, this.normalize();
  }
  divide(M) {
    return this.x /= M.x, this.y /= M.y, this.z /= M.z, this;
  }
  divideScalar(M) {
    return this.multiplyScalar(1 / M);
  }
  min(M) {
    return this.x = Math.min(this.x, M.x), this.y = Math.min(this.y, M.y), this.z = Math.min(this.z, M.z), this;
  }
  max(M) {
    return this.x = Math.max(this.x, M.x), this.y = Math.max(this.y, M.y), this.z = Math.max(this.z, M.z), this;
  }
  clamp(M, D) {
    return this.x = Math.max(M.x, Math.min(D.x, this.x)), this.y = Math.max(M.y, Math.min(D.y, this.y)), this.z = Math.max(M.z, Math.min(D.z, this.z)), this;
  }
  clampScalar(M, D) {
    return this.x = Math.max(M, Math.min(D, this.x)), this.y = Math.max(M, Math.min(D, this.y)), this.z = Math.max(M, Math.min(D, this.z)), this;
  }
  clampLength(M, D) {
    const e = this.length();
    return this.divideScalar(e || 1).multiplyScalar(Math.max(M, Math.min(D, e)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(M) {
    return this.x * M.x + this.y * M.y + this.z * M.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(M) {
    return this.normalize().multiplyScalar(M);
  }
  lerp(M, D) {
    return this.x += (M.x - this.x) * D, this.y += (M.y - this.y) * D, this.z += (M.z - this.z) * D, this;
  }
  lerpVectors(M, D, e) {
    return this.x = M.x + (D.x - M.x) * e, this.y = M.y + (D.y - M.y) * e, this.z = M.z + (D.z - M.z) * e, this;
  }
  cross(M) {
    return this.crossVectors(this, M);
  }
  crossVectors(M, D) {
    const e = M.x, t = M.y, i = M.z, n = D.x, A = D.y, z = D.z;
    return this.x = t * z - i * A, this.y = i * n - e * z, this.z = e * A - t * n, this;
  }
  projectOnVector(M) {
    const D = M.lengthSq();
    if (D === 0)
      return this.set(0, 0, 0);
    const e = M.dot(this) / D;
    return this.copy(M).multiplyScalar(e);
  }
  projectOnPlane(M) {
    return sA.copy(this).projectOnVector(M), this.sub(sA);
  }
  reflect(M) {
    return this.sub(sA.copy(M).multiplyScalar(2 * this.dot(M)));
  }
  angleTo(M) {
    const D = Math.sqrt(this.lengthSq() * M.lengthSq());
    if (D === 0)
      return Math.PI / 2;
    const e = this.dot(M) / D;
    return Math.acos(aD(e, -1, 1));
  }
  distanceTo(M) {
    return Math.sqrt(this.distanceToSquared(M));
  }
  distanceToSquared(M) {
    const D = this.x - M.x, e = this.y - M.y, t = this.z - M.z;
    return D * D + e * e + t * t;
  }
  manhattanDistanceTo(M) {
    return Math.abs(this.x - M.x) + Math.abs(this.y - M.y) + Math.abs(this.z - M.z);
  }
  setFromSpherical(M) {
    return this.setFromSphericalCoords(M.radius, M.phi, M.theta);
  }
  setFromSphericalCoords(M, D, e) {
    const t = Math.sin(D) * M;
    return this.x = t * Math.sin(e), this.y = Math.cos(D) * M, this.z = t * Math.cos(e), this;
  }
  setFromCylindrical(M) {
    return this.setFromCylindricalCoords(M.radius, M.theta, M.y);
  }
  setFromCylindricalCoords(M, D, e) {
    return this.x = M * Math.sin(D), this.y = e, this.z = M * Math.cos(D), this;
  }
  setFromMatrixPosition(M) {
    const D = M.elements;
    return this.x = D[12], this.y = D[13], this.z = D[14], this;
  }
  setFromMatrixScale(M) {
    const D = this.setFromMatrixColumn(M, 0).length(), e = this.setFromMatrixColumn(M, 1).length(), t = this.setFromMatrixColumn(M, 2).length();
    return this.x = D, this.y = e, this.z = t, this;
  }
  setFromMatrixColumn(M, D) {
    return this.fromArray(M.elements, D * 4);
  }
  setFromMatrix3Column(M, D) {
    return this.fromArray(M.elements, D * 3);
  }
  setFromEuler(M) {
    return this.x = M._x, this.y = M._y, this.z = M._z, this;
  }
  setFromColor(M) {
    return this.x = M.r, this.y = M.g, this.z = M.b, this;
  }
  equals(M) {
    return M.x === this.x && M.y === this.y && M.z === this.z;
  }
  fromArray(M, D = 0) {
    return this.x = M[D], this.y = M[D + 1], this.z = M[D + 2], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.x, M[D + 1] = this.y, M[D + 2] = this.z, M;
  }
  fromBufferAttribute(M, D) {
    return this.x = M.getX(D), this.y = M.getY(D), this.z = M.getZ(D), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const M = (Math.random() - 0.5) * 2, D = Math.random() * Math.PI * 2, e = Math.sqrt(1 - M ** 2);
    return this.x = e * Math.cos(D), this.y = e * Math.sin(D), this.z = M, this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
};
const sA = /* @__PURE__ */ new Y(), tz = /* @__PURE__ */ new UN(), eg = `.mockup{width:100%;height:100%;animation:levitate 1.5s infinite alternate ease-in-out}@keyframes levitate{0%{transform:translateY(-2%)}to{transform:translateY(2%)}}
`, tg = "157", Ng = 0, Nz = 1, ig = 2, hT = 1, Ag = 2, Le = 3, Pe = 0, pD = 1, Oe = 2, be = 0, Vt = 1, iz = 2, Az = 3, nz = 4, ng = 5, Pt = 100, zg = 101, Ig = 102, zz = 103, Iz = 104, Tg = 200, ug = 201, gg = 202, sg = 203, dT = 204, vT = 205, rg = 206, cg = 207, ag = 208, og = 209, yg = 210, jg = 0, Cg = 1, Lg = 2, jn = 3, wg = 4, Og = 5, xg = 6, Eg = 7, Un = 0, lg = 1, hg = 2, Ke = 0, dg = 1, vg = 2, pg = 3, Yg = 4, Ug = 5, pT = 300, Xt = 301, qt = 302, Cn = 303, Ln = 304, $i = 306, wn = 1e3, $D = 1001, On = 1002, OD = 1003, Tz = 1004, rA = 1005, dD = 1006, fg = 1007, EN = 1008, Re = 1009, mg = 1010, Qg = 1011, fn = 1012, YT = 1013, Ze = 1014, _e = 1015, lN = 1016, UT = 1017, fT = 1018, it = 1020, Sg = 1021, JD = 1023, kg = 1024, Zg = 1025, At = 1026, $t = 1027, _g = 1028, mT = 1029, bg = 1030, QT = 1031, ST = 1033, cA = 33776, aA = 33777, oA = 33778, yA = 33779, uz = 35840, gz = 35841, sz = 35842, rz = 35843, Kg = 36196, cz = 37492, az = 37496, oz = 37808, yz = 37809, jz = 37810, Cz = 37811, Lz = 37812, wz = 37813, Oz = 37814, xz = 37815, Ez = 37816, lz = 37817, hz = 37818, dz = 37819, vz = 37820, pz = 37821, jA = 36492, Yz = 36494, Uz = 36495, Rg = 36283, fz = 36284, mz = 36285, Qz = 36286, kT = 3e3, nt = 3001, Pg = 3200, Fg = 3201, ZT = 0, Bg = 1, PD = "", eD = "srgb", he = "srgb-linear", mn = "display-p3", Ji = "display-p3-linear", Bi = "linear", VM = "srgb", Vi = "rec709", Gi = "p3", CA = 7680, Vg = 519, Gg = 512, Hg = 513, Wg = 514, Xg = 515, qg = 516, $g = 517, Jg = 518, Ms = 519, Sz = 35044, kz = "300 es", xn = 1035, xe = 2e3, Hi = 2001;
let ID = class En {
  constructor(M, D, e, t, i, n, A, z, I, T, u, g, s, a, o, c) {
    En.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], M !== void 0 && this.set(M, D, e, t, i, n, A, z, I, T, u, g, s, a, o, c);
  }
  set(M, D, e, t, i, n, A, z, I, T, u, g, s, a, o, c) {
    const r = this.elements;
    return r[0] = M, r[4] = D, r[8] = e, r[12] = t, r[1] = i, r[5] = n, r[9] = A, r[13] = z, r[2] = I, r[6] = T, r[10] = u, r[14] = g, r[3] = s, r[7] = a, r[11] = o, r[15] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new En().fromArray(this.elements);
  }
  copy(M) {
    const D = this.elements, e = M.elements;
    return D[0] = e[0], D[1] = e[1], D[2] = e[2], D[3] = e[3], D[4] = e[4], D[5] = e[5], D[6] = e[6], D[7] = e[7], D[8] = e[8], D[9] = e[9], D[10] = e[10], D[11] = e[11], D[12] = e[12], D[13] = e[13], D[14] = e[14], D[15] = e[15], this;
  }
  copyPosition(M) {
    const D = this.elements, e = M.elements;
    return D[12] = e[12], D[13] = e[13], D[14] = e[14], this;
  }
  setFromMatrix3(M) {
    const D = M.elements;
    return this.set(
      D[0],
      D[3],
      D[6],
      0,
      D[1],
      D[4],
      D[7],
      0,
      D[2],
      D[5],
      D[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(M, D, e) {
    return M.setFromMatrixColumn(this, 0), D.setFromMatrixColumn(this, 1), e.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(M, D, e) {
    return this.set(
      M.x,
      D.x,
      e.x,
      0,
      M.y,
      D.y,
      e.y,
      0,
      M.z,
      D.z,
      e.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(M) {
    const D = this.elements, e = M.elements, t = 1 / rt.setFromMatrixColumn(M, 0).length(), i = 1 / rt.setFromMatrixColumn(M, 1).length(), n = 1 / rt.setFromMatrixColumn(M, 2).length();
    return D[0] = e[0] * t, D[1] = e[1] * t, D[2] = e[2] * t, D[3] = 0, D[4] = e[4] * i, D[5] = e[5] * i, D[6] = e[6] * i, D[7] = 0, D[8] = e[8] * n, D[9] = e[9] * n, D[10] = e[10] * n, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromEuler(M) {
    const D = this.elements, e = M.x, t = M.y, i = M.z, n = Math.cos(e), A = Math.sin(e), z = Math.cos(t), I = Math.sin(t), T = Math.cos(i), u = Math.sin(i);
    if (M.order === "XYZ") {
      const g = n * T, s = n * u, a = A * T, o = A * u;
      D[0] = z * T, D[4] = -z * u, D[8] = I, D[1] = s + a * I, D[5] = g - o * I, D[9] = -A * z, D[2] = o - g * I, D[6] = a + s * I, D[10] = n * z;
    } else if (M.order === "YXZ") {
      const g = z * T, s = z * u, a = I * T, o = I * u;
      D[0] = g + o * A, D[4] = a * A - s, D[8] = n * I, D[1] = n * u, D[5] = n * T, D[9] = -A, D[2] = s * A - a, D[6] = o + g * A, D[10] = n * z;
    } else if (M.order === "ZXY") {
      const g = z * T, s = z * u, a = I * T, o = I * u;
      D[0] = g - o * A, D[4] = -n * u, D[8] = a + s * A, D[1] = s + a * A, D[5] = n * T, D[9] = o - g * A, D[2] = -n * I, D[6] = A, D[10] = n * z;
    } else if (M.order === "ZYX") {
      const g = n * T, s = n * u, a = A * T, o = A * u;
      D[0] = z * T, D[4] = a * I - s, D[8] = g * I + o, D[1] = z * u, D[5] = o * I + g, D[9] = s * I - a, D[2] = -I, D[6] = A * z, D[10] = n * z;
    } else if (M.order === "YZX") {
      const g = n * z, s = n * I, a = A * z, o = A * I;
      D[0] = z * T, D[4] = o - g * u, D[8] = a * u + s, D[1] = u, D[5] = n * T, D[9] = -A * T, D[2] = -I * T, D[6] = s * u + a, D[10] = g - o * u;
    } else if (M.order === "XZY") {
      const g = n * z, s = n * I, a = A * z, o = A * I;
      D[0] = z * T, D[4] = -u, D[8] = I * T, D[1] = g * u + o, D[5] = n * T, D[9] = s * u - a, D[2] = a * u - s, D[6] = A * T, D[10] = o * u + g;
    }
    return D[3] = 0, D[7] = 0, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromQuaternion(M) {
    return this.compose(Ds, M, es);
  }
  lookAt(M, D, e) {
    const t = this.elements;
    return fD.subVectors(M, D), fD.lengthSq() === 0 && (fD.z = 1), fD.normalize(), de.crossVectors(e, fD), de.lengthSq() === 0 && (Math.abs(e.z) === 1 ? fD.x += 1e-4 : fD.z += 1e-4, fD.normalize(), de.crossVectors(e, fD)), de.normalize(), bN.crossVectors(fD, de), t[0] = de.x, t[4] = bN.x, t[8] = fD.x, t[1] = de.y, t[5] = bN.y, t[9] = fD.y, t[2] = de.z, t[6] = bN.z, t[10] = fD.z, this;
  }
  multiply(M) {
    return this.multiplyMatrices(this, M);
  }
  premultiply(M) {
    return this.multiplyMatrices(M, this);
  }
  multiplyMatrices(M, D) {
    const e = M.elements, t = D.elements, i = this.elements, n = e[0], A = e[4], z = e[8], I = e[12], T = e[1], u = e[5], g = e[9], s = e[13], a = e[2], o = e[6], c = e[10], r = e[14], w = e[3], y = e[7], j = e[11], l = e[15], d = t[0], h = t[4], Z = t[8], L = t[12], x = t[1], R = t[5], B = t[9], H = t[13], p = t[2], k = t[6], V = t[10], F = t[14], $ = t[3], W = t[7], G = t[11], U = t[15];
    return i[0] = n * d + A * x + z * p + I * $, i[4] = n * h + A * R + z * k + I * W, i[8] = n * Z + A * B + z * V + I * G, i[12] = n * L + A * H + z * F + I * U, i[1] = T * d + u * x + g * p + s * $, i[5] = T * h + u * R + g * k + s * W, i[9] = T * Z + u * B + g * V + s * G, i[13] = T * L + u * H + g * F + s * U, i[2] = a * d + o * x + c * p + r * $, i[6] = a * h + o * R + c * k + r * W, i[10] = a * Z + o * B + c * V + r * G, i[14] = a * L + o * H + c * F + r * U, i[3] = w * d + y * x + j * p + l * $, i[7] = w * h + y * R + j * k + l * W, i[11] = w * Z + y * B + j * V + l * G, i[15] = w * L + y * H + j * F + l * U, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[4] *= M, D[8] *= M, D[12] *= M, D[1] *= M, D[5] *= M, D[9] *= M, D[13] *= M, D[2] *= M, D[6] *= M, D[10] *= M, D[14] *= M, D[3] *= M, D[7] *= M, D[11] *= M, D[15] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], e = M[4], t = M[8], i = M[12], n = M[1], A = M[5], z = M[9], I = M[13], T = M[2], u = M[6], g = M[10], s = M[14], a = M[3], o = M[7], c = M[11], r = M[15];
    return a * (+i * z * u - t * I * u - i * A * g + e * I * g + t * A * s - e * z * s) + o * (+D * z * s - D * I * g + i * n * g - t * n * s + t * I * T - i * z * T) + c * (+D * I * u - D * A * s - i * n * u + e * n * s + i * A * T - e * I * T) + r * (-t * A * T - D * z * u + D * A * g + t * n * u - e * n * g + e * z * T);
  }
  transpose() {
    const M = this.elements;
    let D;
    return D = M[1], M[1] = M[4], M[4] = D, D = M[2], M[2] = M[8], M[8] = D, D = M[6], M[6] = M[9], M[9] = D, D = M[3], M[3] = M[12], M[12] = D, D = M[7], M[7] = M[13], M[13] = D, D = M[11], M[11] = M[14], M[14] = D, this;
  }
  setPosition(M, D, e) {
    const t = this.elements;
    return M.isVector3 ? (t[12] = M.x, t[13] = M.y, t[14] = M.z) : (t[12] = M, t[13] = D, t[14] = e), this;
  }
  invert() {
    const M = this.elements, D = M[0], e = M[1], t = M[2], i = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8], u = M[9], g = M[10], s = M[11], a = M[12], o = M[13], c = M[14], r = M[15], w = u * c * I - o * g * I + o * z * s - A * c * s - u * z * r + A * g * r, y = a * g * I - T * c * I - a * z * s + n * c * s + T * z * r - n * g * r, j = T * o * I - a * u * I + a * A * s - n * o * s - T * A * r + n * u * r, l = a * u * z - T * o * z - a * A * g + n * o * g + T * A * c - n * u * c, d = D * w + e * y + t * j + i * l;
    if (d === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const h = 1 / d;
    return M[0] = w * h, M[1] = (o * g * i - u * c * i - o * t * s + e * c * s + u * t * r - e * g * r) * h, M[2] = (A * c * i - o * z * i + o * t * I - e * c * I - A * t * r + e * z * r) * h, M[3] = (u * z * i - A * g * i - u * t * I + e * g * I + A * t * s - e * z * s) * h, M[4] = y * h, M[5] = (T * c * i - a * g * i + a * t * s - D * c * s - T * t * r + D * g * r) * h, M[6] = (a * z * i - n * c * i - a * t * I + D * c * I + n * t * r - D * z * r) * h, M[7] = (n * g * i - T * z * i + T * t * I - D * g * I - n * t * s + D * z * s) * h, M[8] = j * h, M[9] = (a * u * i - T * o * i - a * e * s + D * o * s + T * e * r - D * u * r) * h, M[10] = (n * o * i - a * A * i + a * e * I - D * o * I - n * e * r + D * A * r) * h, M[11] = (T * A * i - n * u * i - T * e * I + D * u * I + n * e * s - D * A * s) * h, M[12] = l * h, M[13] = (T * o * t - a * u * t + a * e * g - D * o * g - T * e * c + D * u * c) * h, M[14] = (a * A * t - n * o * t - a * e * z + D * o * z + n * e * c - D * A * c) * h, M[15] = (n * u * t - T * A * t + T * e * z - D * u * z - n * e * g + D * A * g) * h, this;
  }
  scale(M) {
    const D = this.elements, e = M.x, t = M.y, i = M.z;
    return D[0] *= e, D[4] *= t, D[8] *= i, D[1] *= e, D[5] *= t, D[9] *= i, D[2] *= e, D[6] *= t, D[10] *= i, D[3] *= e, D[7] *= t, D[11] *= i, this;
  }
  getMaxScaleOnAxis() {
    const M = this.elements, D = M[0] * M[0] + M[1] * M[1] + M[2] * M[2], e = M[4] * M[4] + M[5] * M[5] + M[6] * M[6], t = M[8] * M[8] + M[9] * M[9] + M[10] * M[10];
    return Math.sqrt(Math.max(D, e, t));
  }
  makeTranslation(M, D, e) {
    return M.isVector3 ? this.set(
      1,
      0,
      0,
      M.x,
      0,
      1,
      0,
      M.y,
      0,
      0,
      1,
      M.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      M,
      0,
      1,
      0,
      D,
      0,
      0,
      1,
      e,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(M) {
    const D = Math.cos(M), e = Math.sin(M);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      D,
      -e,
      0,
      0,
      e,
      D,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(M) {
    const D = Math.cos(M), e = Math.sin(M);
    return this.set(
      D,
      0,
      e,
      0,
      0,
      1,
      0,
      0,
      -e,
      0,
      D,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(M) {
    const D = Math.cos(M), e = Math.sin(M);
    return this.set(
      D,
      -e,
      0,
      0,
      e,
      D,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(M, D) {
    const e = Math.cos(D), t = Math.sin(D), i = 1 - e, n = M.x, A = M.y, z = M.z, I = i * n, T = i * A;
    return this.set(
      I * n + e,
      I * A - t * z,
      I * z + t * A,
      0,
      I * A + t * z,
      T * A + e,
      T * z - t * n,
      0,
      I * z - t * A,
      T * z + t * n,
      i * z * z + e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(M, D, e) {
    return this.set(
      M,
      0,
      0,
      0,
      0,
      D,
      0,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(M, D, e, t, i, n) {
    return this.set(
      1,
      e,
      i,
      0,
      M,
      1,
      n,
      0,
      D,
      t,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(M, D, e) {
    const t = this.elements, i = D._x, n = D._y, A = D._z, z = D._w, I = i + i, T = n + n, u = A + A, g = i * I, s = i * T, a = i * u, o = n * T, c = n * u, r = A * u, w = z * I, y = z * T, j = z * u, l = e.x, d = e.y, h = e.z;
    return t[0] = (1 - (o + r)) * l, t[1] = (s + j) * l, t[2] = (a - y) * l, t[3] = 0, t[4] = (s - j) * d, t[5] = (1 - (g + r)) * d, t[6] = (c + w) * d, t[7] = 0, t[8] = (a + y) * h, t[9] = (c - w) * h, t[10] = (1 - (g + o)) * h, t[11] = 0, t[12] = M.x, t[13] = M.y, t[14] = M.z, t[15] = 1, this;
  }
  decompose(M, D, e) {
    const t = this.elements;
    let i = rt.set(t[0], t[1], t[2]).length();
    const n = rt.set(t[4], t[5], t[6]).length(), A = rt.set(t[8], t[9], t[10]).length();
    this.determinant() < 0 && (i = -i), M.x = t[12], M.y = t[13], M.z = t[14], BD.copy(this);
    const I = 1 / i, T = 1 / n, u = 1 / A;
    return BD.elements[0] *= I, BD.elements[1] *= I, BD.elements[2] *= I, BD.elements[4] *= T, BD.elements[5] *= T, BD.elements[6] *= T, BD.elements[8] *= u, BD.elements[9] *= u, BD.elements[10] *= u, D.setFromRotationMatrix(BD), e.x = i, e.y = n, e.z = A, this;
  }
  makePerspective(M, D, e, t, i, n, A = xe) {
    const z = this.elements, I = 2 * i / (D - M), T = 2 * i / (e - t), u = (D + M) / (D - M), g = (e + t) / (e - t);
    let s, a;
    if (A === xe)
      s = -(n + i) / (n - i), a = -2 * n * i / (n - i);
    else if (A === Hi)
      s = -n / (n - i), a = -n * i / (n - i);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + A);
    return z[0] = I, z[4] = 0, z[8] = u, z[12] = 0, z[1] = 0, z[5] = T, z[9] = g, z[13] = 0, z[2] = 0, z[6] = 0, z[10] = s, z[14] = a, z[3] = 0, z[7] = 0, z[11] = -1, z[15] = 0, this;
  }
  makeOrthographic(M, D, e, t, i, n, A = xe) {
    const z = this.elements, I = 1 / (D - M), T = 1 / (e - t), u = 1 / (n - i), g = (D + M) * I, s = (e + t) * T;
    let a, o;
    if (A === xe)
      a = (n + i) * u, o = -2 * u;
    else if (A === Hi)
      a = i * u, o = -1 * u;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + A);
    return z[0] = 2 * I, z[4] = 0, z[8] = 0, z[12] = -g, z[1] = 0, z[5] = 2 * T, z[9] = 0, z[13] = -s, z[2] = 0, z[6] = 0, z[10] = o, z[14] = -a, z[3] = 0, z[7] = 0, z[11] = 0, z[15] = 1, this;
  }
  equals(M) {
    const D = this.elements, e = M.elements;
    for (let t = 0; t < 16; t++)
      if (D[t] !== e[t])
        return !1;
    return !0;
  }
  fromArray(M, D = 0) {
    for (let e = 0; e < 16; e++)
      this.elements[e] = M[e + D];
    return this;
  }
  toArray(M = [], D = 0) {
    const e = this.elements;
    return M[D] = e[0], M[D + 1] = e[1], M[D + 2] = e[2], M[D + 3] = e[3], M[D + 4] = e[4], M[D + 5] = e[5], M[D + 6] = e[6], M[D + 7] = e[7], M[D + 8] = e[8], M[D + 9] = e[9], M[D + 10] = e[10], M[D + 11] = e[11], M[D + 12] = e[12], M[D + 13] = e[13], M[D + 14] = e[14], M[D + 15] = e[15], M;
  }
};
const rt = /* @__PURE__ */ new Y(), BD = /* @__PURE__ */ new ID(), Ds = /* @__PURE__ */ new Y(0, 0, 0), es = /* @__PURE__ */ new Y(1, 1, 1), de = /* @__PURE__ */ new Y(), bN = /* @__PURE__ */ new Y(), fD = /* @__PURE__ */ new Y();
let tN = class {
  addEventListener(M, D) {
    this._listeners === void 0 && (this._listeners = {});
    const e = this._listeners;
    e[M] === void 0 && (e[M] = []), e[M].indexOf(D) === -1 && e[M].push(D);
  }
  hasEventListener(M, D) {
    if (this._listeners === void 0)
      return !1;
    const e = this._listeners;
    return e[M] !== void 0 && e[M].indexOf(D) !== -1;
  }
  removeEventListener(M, D) {
    if (this._listeners === void 0)
      return;
    const t = this._listeners[M];
    if (t !== void 0) {
      const i = t.indexOf(D);
      i !== -1 && t.splice(i, 1);
    }
  }
  dispatchEvent(M) {
    if (this._listeners === void 0)
      return;
    const e = this._listeners[M.type];
    if (e !== void 0) {
      M.target = this;
      const t = e.slice(0);
      for (let i = 0, n = t.length; i < n; i++)
        t[i].call(this, M);
      M.target = null;
    }
  }
};
const Zz = /* @__PURE__ */ new ID(), _z = /* @__PURE__ */ new UN();
let _T = class bT {
  constructor(M = 0, D = 0, e = 0, t = bT.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = M, this._y = D, this._z = e, this._order = t;
  }
  get x() {
    return this._x;
  }
  set x(M) {
    this._x = M, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(M) {
    this._y = M, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(M) {
    this._z = M, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(M) {
    this._order = M, this._onChangeCallback();
  }
  set(M, D, e, t = this._order) {
    return this._x = M, this._y = D, this._z = e, this._order = t, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(M) {
    return this._x = M._x, this._y = M._y, this._z = M._z, this._order = M._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M, D = this._order, e = !0) {
    const t = M.elements, i = t[0], n = t[4], A = t[8], z = t[1], I = t[5], T = t[9], u = t[2], g = t[6], s = t[10];
    switch (D) {
      case "XYZ":
        this._y = Math.asin(aD(A, -1, 1)), Math.abs(A) < 0.9999999 ? (this._x = Math.atan2(-T, s), this._z = Math.atan2(-n, i)) : (this._x = Math.atan2(g, I), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-aD(T, -1, 1)), Math.abs(T) < 0.9999999 ? (this._y = Math.atan2(A, s), this._z = Math.atan2(z, I)) : (this._y = Math.atan2(-u, i), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(aD(g, -1, 1)), Math.abs(g) < 0.9999999 ? (this._y = Math.atan2(-u, s), this._z = Math.atan2(-n, I)) : (this._y = 0, this._z = Math.atan2(z, i));
        break;
      case "ZYX":
        this._y = Math.asin(-aD(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(g, s), this._z = Math.atan2(z, i)) : (this._x = 0, this._z = Math.atan2(-n, I));
        break;
      case "YZX":
        this._z = Math.asin(aD(z, -1, 1)), Math.abs(z) < 0.9999999 ? (this._x = Math.atan2(-T, I), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(A, s));
        break;
      case "XZY":
        this._z = Math.asin(-aD(n, -1, 1)), Math.abs(n) < 0.9999999 ? (this._x = Math.atan2(g, I), this._y = Math.atan2(A, i)) : (this._x = Math.atan2(-T, s), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + D);
    }
    return this._order = D, e === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(M, D, e) {
    return Zz.makeRotationFromQuaternion(M), this.setFromRotationMatrix(Zz, D, e);
  }
  setFromVector3(M, D = this._order) {
    return this.set(M.x, M.y, M.z, D);
  }
  reorder(M) {
    return _z.setFromEuler(this), this.setFromQuaternion(_z, M);
  }
  equals(M) {
    return M._x === this._x && M._y === this._y && M._z === this._z && M._order === this._order;
  }
  fromArray(M) {
    return this._x = M[0], this._y = M[1], this._z = M[2], M[3] !== void 0 && (this._order = M[3]), this._onChangeCallback(), this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this._x, M[D + 1] = this._y, M[D + 2] = this._z, M[D + 3] = this._order, M;
  }
  _onChange(M) {
    return this._onChangeCallback = M, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
};
_T.DEFAULT_ORDER = "XYZ";
let KT = class {
  constructor() {
    this.mask = 1;
  }
  set(M) {
    this.mask = (1 << M | 0) >>> 0;
  }
  enable(M) {
    this.mask |= 1 << M | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(M) {
    this.mask ^= 1 << M | 0;
  }
  disable(M) {
    this.mask &= ~(1 << M | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(M) {
    return (this.mask & M.mask) !== 0;
  }
  isEnabled(M) {
    return (this.mask & (1 << M | 0)) !== 0;
  }
}, kM = class RT {
  constructor(M, D, e, t, i, n, A, z, I) {
    RT.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], M !== void 0 && this.set(M, D, e, t, i, n, A, z, I);
  }
  set(M, D, e, t, i, n, A, z, I) {
    const T = this.elements;
    return T[0] = M, T[1] = t, T[2] = A, T[3] = D, T[4] = i, T[5] = z, T[6] = e, T[7] = n, T[8] = I, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(M) {
    const D = this.elements, e = M.elements;
    return D[0] = e[0], D[1] = e[1], D[2] = e[2], D[3] = e[3], D[4] = e[4], D[5] = e[5], D[6] = e[6], D[7] = e[7], D[8] = e[8], this;
  }
  extractBasis(M, D, e) {
    return M.setFromMatrix3Column(this, 0), D.setFromMatrix3Column(this, 1), e.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(M) {
    const D = M.elements;
    return this.set(
      D[0],
      D[4],
      D[8],
      D[1],
      D[5],
      D[9],
      D[2],
      D[6],
      D[10]
    ), this;
  }
  multiply(M) {
    return this.multiplyMatrices(this, M);
  }
  premultiply(M) {
    return this.multiplyMatrices(M, this);
  }
  multiplyMatrices(M, D) {
    const e = M.elements, t = D.elements, i = this.elements, n = e[0], A = e[3], z = e[6], I = e[1], T = e[4], u = e[7], g = e[2], s = e[5], a = e[8], o = t[0], c = t[3], r = t[6], w = t[1], y = t[4], j = t[7], l = t[2], d = t[5], h = t[8];
    return i[0] = n * o + A * w + z * l, i[3] = n * c + A * y + z * d, i[6] = n * r + A * j + z * h, i[1] = I * o + T * w + u * l, i[4] = I * c + T * y + u * d, i[7] = I * r + T * j + u * h, i[2] = g * o + s * w + a * l, i[5] = g * c + s * y + a * d, i[8] = g * r + s * j + a * h, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[3] *= M, D[6] *= M, D[1] *= M, D[4] *= M, D[7] *= M, D[2] *= M, D[5] *= M, D[8] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], e = M[1], t = M[2], i = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8];
    return D * n * T - D * A * I - e * i * T + e * A * z + t * i * I - t * n * z;
  }
  invert() {
    const M = this.elements, D = M[0], e = M[1], t = M[2], i = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8], u = T * n - A * I, g = A * z - T * i, s = I * i - n * z, a = D * u + e * g + t * s;
    if (a === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const o = 1 / a;
    return M[0] = u * o, M[1] = (t * I - T * e) * o, M[2] = (A * e - t * n) * o, M[3] = g * o, M[4] = (T * D - t * z) * o, M[5] = (t * i - A * D) * o, M[6] = s * o, M[7] = (e * z - I * D) * o, M[8] = (n * D - e * i) * o, this;
  }
  transpose() {
    let M;
    const D = this.elements;
    return M = D[1], D[1] = D[3], D[3] = M, M = D[2], D[2] = D[6], D[6] = M, M = D[5], D[5] = D[7], D[7] = M, this;
  }
  getNormalMatrix(M) {
    return this.setFromMatrix4(M).invert().transpose();
  }
  transposeIntoArray(M) {
    const D = this.elements;
    return M[0] = D[0], M[1] = D[3], M[2] = D[6], M[3] = D[1], M[4] = D[4], M[5] = D[7], M[6] = D[2], M[7] = D[5], M[8] = D[8], this;
  }
  setUvTransform(M, D, e, t, i, n, A) {
    const z = Math.cos(i), I = Math.sin(i);
    return this.set(
      e * z,
      e * I,
      -e * (z * n + I * A) + n + M,
      -t * I,
      t * z,
      -t * (-I * n + z * A) + A + D,
      0,
      0,
      1
    ), this;
  }
  //
  scale(M, D) {
    return this.premultiply(LA.makeScale(M, D)), this;
  }
  rotate(M) {
    return this.premultiply(LA.makeRotation(-M)), this;
  }
  translate(M, D) {
    return this.premultiply(LA.makeTranslation(M, D)), this;
  }
  // for 2D Transforms
  makeTranslation(M, D) {
    return M.isVector2 ? this.set(
      1,
      0,
      M.x,
      0,
      1,
      M.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      M,
      0,
      1,
      D,
      0,
      0,
      1
    ), this;
  }
  makeRotation(M) {
    const D = Math.cos(M), e = Math.sin(M);
    return this.set(
      D,
      -e,
      0,
      e,
      D,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(M, D) {
    return this.set(
      M,
      0,
      0,
      0,
      D,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(M) {
    const D = this.elements, e = M.elements;
    for (let t = 0; t < 9; t++)
      if (D[t] !== e[t])
        return !1;
    return !0;
  }
  fromArray(M, D = 0) {
    for (let e = 0; e < 9; e++)
      this.elements[e] = M[e + D];
    return this;
  }
  toArray(M = [], D = 0) {
    const e = this.elements;
    return M[D] = e[0], M[D + 1] = e[1], M[D + 2] = e[2], M[D + 3] = e[3], M[D + 4] = e[4], M[D + 5] = e[5], M[D + 6] = e[6], M[D + 7] = e[7], M[D + 8] = e[8], M;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
};
const LA = /* @__PURE__ */ new kM();
let ts = 0;
const bz = /* @__PURE__ */ new Y(), ct = /* @__PURE__ */ new UN(), ze = /* @__PURE__ */ new ID(), KN = /* @__PURE__ */ new Y(), IN = /* @__PURE__ */ new Y(), Ns = /* @__PURE__ */ new Y(), is = /* @__PURE__ */ new UN(), Kz = /* @__PURE__ */ new Y(1, 0, 0), Rz = /* @__PURE__ */ new Y(0, 1, 0), Pz = /* @__PURE__ */ new Y(0, 0, 1), As = { type: "added" }, ns = { type: "removed" };
let YD = class Qi extends tN {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: ts++ }), this.uuid = eN(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Qi.DEFAULT_UP.clone();
    const M = new Y(), D = new _T(), e = new UN(), t = new Y(1, 1, 1);
    function i() {
      e.setFromEuler(D, !1);
    }
    function n() {
      D.setFromQuaternion(e, void 0, !1);
    }
    D._onChange(i), e._onChange(n), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: M
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: D
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      modelViewMatrix: {
        value: new ID()
      },
      normalMatrix: {
        value: new kM()
      }
    }), this.matrix = new ID(), this.matrixWorld = new ID(), this.matrixAutoUpdate = Qi.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.matrixWorldAutoUpdate = Qi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.layers = new KT(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(M) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(M), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(M) {
    return this.quaternion.premultiply(M), this;
  }
  setRotationFromAxisAngle(M, D) {
    this.quaternion.setFromAxisAngle(M, D);
  }
  setRotationFromEuler(M) {
    this.quaternion.setFromEuler(M, !0);
  }
  setRotationFromMatrix(M) {
    this.quaternion.setFromRotationMatrix(M);
  }
  setRotationFromQuaternion(M) {
    this.quaternion.copy(M);
  }
  rotateOnAxis(M, D) {
    return ct.setFromAxisAngle(M, D), this.quaternion.multiply(ct), this;
  }
  rotateOnWorldAxis(M, D) {
    return ct.setFromAxisAngle(M, D), this.quaternion.premultiply(ct), this;
  }
  rotateX(M) {
    return this.rotateOnAxis(Kz, M);
  }
  rotateY(M) {
    return this.rotateOnAxis(Rz, M);
  }
  rotateZ(M) {
    return this.rotateOnAxis(Pz, M);
  }
  translateOnAxis(M, D) {
    return bz.copy(M).applyQuaternion(this.quaternion), this.position.add(bz.multiplyScalar(D)), this;
  }
  translateX(M) {
    return this.translateOnAxis(Kz, M);
  }
  translateY(M) {
    return this.translateOnAxis(Rz, M);
  }
  translateZ(M) {
    return this.translateOnAxis(Pz, M);
  }
  localToWorld(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(ze.copy(this.matrixWorld).invert());
  }
  lookAt(M, D, e) {
    M.isVector3 ? KN.copy(M) : KN.set(M, D, e);
    const t = this.parent;
    this.updateWorldMatrix(!0, !1), IN.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? ze.lookAt(IN, KN, this.up) : ze.lookAt(KN, IN, this.up), this.quaternion.setFromRotationMatrix(ze), t && (ze.extractRotation(t.matrixWorld), ct.setFromRotationMatrix(ze), this.quaternion.premultiply(ct.invert()));
  }
  add(M) {
    if (arguments.length > 1) {
      for (let D = 0; D < arguments.length; D++)
        this.add(arguments[D]);
      return this;
    }
    return M === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", M), this) : (M && M.isObject3D ? (M.parent !== null && M.parent.remove(M), M.parent = this, this.children.push(M), M.dispatchEvent(As)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", M), this);
  }
  remove(M) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++)
        this.remove(arguments[e]);
      return this;
    }
    const D = this.children.indexOf(M);
    return D !== -1 && (M.parent = null, this.children.splice(D, 1), M.dispatchEvent(ns)), this;
  }
  removeFromParent() {
    const M = this.parent;
    return M !== null && M.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(M) {
    return this.updateWorldMatrix(!0, !1), ze.copy(this.matrixWorld).invert(), M.parent !== null && (M.parent.updateWorldMatrix(!0, !1), ze.multiply(M.parent.matrixWorld)), M.applyMatrix4(ze), this.add(M), M.updateWorldMatrix(!1, !0), this;
  }
  getObjectById(M) {
    return this.getObjectByProperty("id", M);
  }
  getObjectByName(M) {
    return this.getObjectByProperty("name", M);
  }
  getObjectByProperty(M, D) {
    if (this[M] === D)
      return this;
    for (let e = 0, t = this.children.length; e < t; e++) {
      const n = this.children[e].getObjectByProperty(M, D);
      if (n !== void 0)
        return n;
    }
  }
  getObjectsByProperty(M, D) {
    let e = [];
    this[M] === D && e.push(this);
    for (let t = 0, i = this.children.length; t < i; t++) {
      const n = this.children[t].getObjectsByProperty(M, D);
      n.length > 0 && (e = e.concat(n));
    }
    return e;
  }
  getWorldPosition(M) {
    return this.updateWorldMatrix(!0, !1), M.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(IN, M, Ns), M;
  }
  getWorldScale(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(IN, is, M), M;
  }
  getWorldDirection(M) {
    this.updateWorldMatrix(!0, !1);
    const D = this.matrixWorld.elements;
    return M.set(D[8], D[9], D[10]).normalize();
  }
  raycast() {
  }
  traverse(M) {
    M(this);
    const D = this.children;
    for (let e = 0, t = D.length; e < t; e++)
      D[e].traverse(M);
  }
  traverseVisible(M) {
    if (this.visible === !1)
      return;
    M(this);
    const D = this.children;
    for (let e = 0, t = D.length; e < t; e++)
      D[e].traverseVisible(M);
  }
  traverseAncestors(M) {
    const D = this.parent;
    D !== null && (M(D), D.traverseAncestors(M));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(M) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || M) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, M = !0);
    const D = this.children;
    for (let e = 0, t = D.length; e < t; e++) {
      const i = D[e];
      (i.matrixWorldAutoUpdate === !0 || M === !0) && i.updateMatrixWorld(M);
    }
  }
  updateWorldMatrix(M, D) {
    const e = this.parent;
    if (M === !0 && e !== null && e.matrixWorldAutoUpdate === !0 && e.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), D === !0) {
      const t = this.children;
      for (let i = 0, n = t.length; i < n; i++) {
        const A = t[i];
        A.matrixWorldAutoUpdate === !0 && A.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string", e = {};
    D && (M = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, e.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const t = {};
    t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), this.castShadow === !0 && (t.castShadow = !0), this.receiveShadow === !0 && (t.receiveShadow = !0), this.visible === !1 && (t.visible = !1), this.frustumCulled === !1 && (t.frustumCulled = !1), this.renderOrder !== 0 && (t.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (t.userData = this.userData), t.layers = this.layers.mask, t.matrix = this.matrix.toArray(), t.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (t.matrixAutoUpdate = !1), this.isInstancedMesh && (t.type = "InstancedMesh", t.count = this.count, t.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (t.instanceColor = this.instanceColor.toJSON()));
    function i(A, z) {
      return A[z.uuid] === void 0 && (A[z.uuid] = z.toJSON(M)), z.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? t.background = this.background.toJSON() : this.background.isTexture && (t.background = this.background.toJSON(M).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (t.environment = this.environment.toJSON(M).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      t.geometry = i(M.geometries, this.geometry);
      const A = this.geometry.parameters;
      if (A !== void 0 && A.shapes !== void 0) {
        const z = A.shapes;
        if (Array.isArray(z))
          for (let I = 0, T = z.length; I < T; I++) {
            const u = z[I];
            i(M.shapes, u);
          }
        else
          i(M.shapes, z);
      }
    }
    if (this.isSkinnedMesh && (t.bindMode = this.bindMode, t.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(M.skeletons, this.skeleton), t.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const A = [];
        for (let z = 0, I = this.material.length; z < I; z++)
          A.push(i(M.materials, this.material[z]));
        t.material = A;
      } else
        t.material = i(M.materials, this.material);
    if (this.children.length > 0) {
      t.children = [];
      for (let A = 0; A < this.children.length; A++)
        t.children.push(this.children[A].toJSON(M).object);
    }
    if (this.animations.length > 0) {
      t.animations = [];
      for (let A = 0; A < this.animations.length; A++) {
        const z = this.animations[A];
        t.animations.push(i(M.animations, z));
      }
    }
    if (D) {
      const A = n(M.geometries), z = n(M.materials), I = n(M.textures), T = n(M.images), u = n(M.shapes), g = n(M.skeletons), s = n(M.animations), a = n(M.nodes);
      A.length > 0 && (e.geometries = A), z.length > 0 && (e.materials = z), I.length > 0 && (e.textures = I), T.length > 0 && (e.images = T), u.length > 0 && (e.shapes = u), g.length > 0 && (e.skeletons = g), s.length > 0 && (e.animations = s), a.length > 0 && (e.nodes = a);
    }
    return e.object = t, e;
    function n(A) {
      const z = [];
      for (const I in A) {
        const T = A[I];
        delete T.metadata, z.push(T);
      }
      return z;
    }
  }
  clone(M) {
    return new this.constructor().copy(this, M);
  }
  copy(M, D = !0) {
    if (this.name = M.name, this.up.copy(M.up), this.position.copy(M.position), this.rotation.order = M.rotation.order, this.quaternion.copy(M.quaternion), this.scale.copy(M.scale), this.matrix.copy(M.matrix), this.matrixWorld.copy(M.matrixWorld), this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrixWorldNeedsUpdate = M.matrixWorldNeedsUpdate, this.matrixWorldAutoUpdate = M.matrixWorldAutoUpdate, this.layers.mask = M.layers.mask, this.visible = M.visible, this.castShadow = M.castShadow, this.receiveShadow = M.receiveShadow, this.frustumCulled = M.frustumCulled, this.renderOrder = M.renderOrder, this.animations = M.animations.slice(), this.userData = JSON.parse(JSON.stringify(M.userData)), D === !0)
      for (let e = 0; e < M.children.length; e++) {
        const t = M.children[e];
        this.add(t.clone());
      }
    return this;
  }
};
YD.DEFAULT_UP = /* @__PURE__ */ new Y(0, 1, 0);
YD.DEFAULT_MATRIX_AUTO_UPDATE = !0;
YD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class PT extends YD {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ID(), this.projectionMatrix = new ID(), this.projectionMatrixInverse = new ID(), this.coordinateSystem = xe;
  }
  copy(M, D) {
    return super.copy(M, D), this.matrixWorldInverse.copy(M.matrixWorldInverse), this.projectionMatrix.copy(M.projectionMatrix), this.projectionMatrixInverse.copy(M.projectionMatrixInverse), this.coordinateSystem = M.coordinateSystem, this;
  }
  getWorldDirection(M) {
    return super.getWorldDirection(M).negate();
  }
  updateMatrixWorld(M) {
    super.updateMatrixWorld(M), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(M, D) {
    super.updateWorldMatrix(M, D), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class RD extends PT {
  constructor(M = 50, D = 1, e = 0.1, t = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = M, this.zoom = 1, this.near = e, this.far = t, this.focus = 10, this.aspect = D, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(M, D) {
    return super.copy(M, D), this.fov = M.fov, this.zoom = M.zoom, this.near = M.near, this.far = M.far, this.focus = M.focus, this.aspect = M.aspect, this.view = M.view === null ? null : Object.assign({}, M.view), this.filmGauge = M.filmGauge, this.filmOffset = M.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(M) {
    const D = 0.5 * this.getFilmHeight() / M;
    this.fov = on * 2 * Math.atan(D), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const M = Math.tan(uA * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / M;
  }
  getEffectiveFOV() {
    return on * 2 * Math.atan(
      Math.tan(uA * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(M, D, e, t, i, n) {
    this.aspect = M / D, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = M, this.view.fullHeight = D, this.view.offsetX = e, this.view.offsetY = t, this.view.width = i, this.view.height = n, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const M = this.near;
    let D = M * Math.tan(uA * 0.5 * this.fov) / this.zoom, e = 2 * D, t = this.aspect * e, i = -0.5 * t;
    const n = this.view;
    if (this.view !== null && this.view.enabled) {
      const z = n.fullWidth, I = n.fullHeight;
      i += n.offsetX * t / z, D -= n.offsetY * e / I, t *= n.width / z, e *= n.height / I;
    }
    const A = this.filmOffset;
    A !== 0 && (i += M * A / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + t, D, D - e, M, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return D.object.fov = this.fov, D.object.zoom = this.zoom, D.object.near = this.near, D.object.far = this.far, D.object.focus = this.focus, D.object.aspect = this.aspect, this.view !== null && (D.object.view = Object.assign({}, this.view)), D.object.filmGauge = this.filmGauge, D.object.filmOffset = this.filmOffset, D;
  }
}
const Fz = /* @__PURE__ */ new kM().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), Bz = /* @__PURE__ */ new kM().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), RN = {
  [he]: {
    transfer: Bi,
    primaries: Vi,
    toReference: (N) => N,
    fromReference: (N) => N
  },
  [eD]: {
    transfer: VM,
    primaries: Vi,
    toReference: (N) => N.convertSRGBToLinear(),
    fromReference: (N) => N.convertLinearToSRGB()
  },
  [Ji]: {
    transfer: Bi,
    primaries: Gi,
    toReference: (N) => N.applyMatrix3(Bz),
    fromReference: (N) => N.applyMatrix3(Fz)
  },
  [mn]: {
    transfer: VM,
    primaries: Gi,
    toReference: (N) => N.convertSRGBToLinear().applyMatrix3(Bz),
    fromReference: (N) => N.applyMatrix3(Fz).convertLinearToSRGB()
  }
}, zs = /* @__PURE__ */ new Set([he, Ji]), PM = {
  enabled: !0,
  _workingColorSpace: he,
  get legacyMode() {
    return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."), !this.enabled;
  },
  set legacyMode(N) {
    console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."), this.enabled = !N;
  },
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(N) {
    if (!zs.has(N))
      throw new Error(`Unsupported working color space, "${N}".`);
    this._workingColorSpace = N;
  },
  convert: function(N, M, D) {
    if (this.enabled === !1 || M === D || !M || !D)
      return N;
    const e = RN[M].toReference, t = RN[D].fromReference;
    return t(e(N));
  },
  fromWorkingColorSpace: function(N, M) {
    return this.convert(N, this._workingColorSpace, M);
  },
  toWorkingColorSpace: function(N, M) {
    return this.convert(N, M, this._workingColorSpace);
  },
  getPrimaries: function(N) {
    return RN[N].primaries;
  },
  getTransfer: function(N) {
    return N === PD ? Bi : RN[N].transfer;
  }
};
function Gt(N) {
  return N < 0.04045 ? N * 0.0773993808 : Math.pow(N * 0.9478672986 + 0.0521327014, 2.4);
}
function wA(N) {
  return N < 31308e-7 ? N * 12.92 : 1.055 * Math.pow(N, 0.41666) - 0.055;
}
const FT = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, ve = { h: 0, s: 0, l: 0 }, PN = { h: 0, s: 0, l: 0 };
function OA(N, M, D) {
  return D < 0 && (D += 1), D > 1 && (D -= 1), D < 1 / 6 ? N + (M - N) * 6 * D : D < 1 / 2 ? M : D < 2 / 3 ? N + (M - N) * 6 * (2 / 3 - D) : N;
}
let KM = class {
  constructor(M, D, e) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(M, D, e);
  }
  set(M, D, e) {
    if (D === void 0 && e === void 0) {
      const t = M;
      t && t.isColor ? this.copy(t) : typeof t == "number" ? this.setHex(t) : typeof t == "string" && this.setStyle(t);
    } else
      this.setRGB(M, D, e);
    return this;
  }
  setScalar(M) {
    return this.r = M, this.g = M, this.b = M, this;
  }
  setHex(M, D = eD) {
    return M = Math.floor(M), this.r = (M >> 16 & 255) / 255, this.g = (M >> 8 & 255) / 255, this.b = (M & 255) / 255, PM.toWorkingColorSpace(this, D), this;
  }
  setRGB(M, D, e, t = PM.workingColorSpace) {
    return this.r = M, this.g = D, this.b = e, PM.toWorkingColorSpace(this, t), this;
  }
  setHSL(M, D, e, t = PM.workingColorSpace) {
    if (M = Dg(M, 1), D = aD(D, 0, 1), e = aD(e, 0, 1), D === 0)
      this.r = this.g = this.b = e;
    else {
      const i = e <= 0.5 ? e * (1 + D) : e + D - e * D, n = 2 * e - i;
      this.r = OA(n, i, M + 1 / 3), this.g = OA(n, i, M), this.b = OA(n, i, M - 1 / 3);
    }
    return PM.toWorkingColorSpace(this, t), this;
  }
  setStyle(M, D = eD) {
    function e(i) {
      i !== void 0 && parseFloat(i) < 1 && console.warn("THREE.Color: Alpha component of " + M + " will be ignored.");
    }
    let t;
    if (t = /^(\w+)\(([^\)]*)\)/.exec(M)) {
      let i;
      const n = t[1], A = t[2];
      switch (n) {
        case "rgb":
        case "rgba":
          if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return e(i[4]), this.setRGB(
              Math.min(255, parseInt(i[1], 10)) / 255,
              Math.min(255, parseInt(i[2], 10)) / 255,
              Math.min(255, parseInt(i[3], 10)) / 255,
              D
            );
          if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return e(i[4]), this.setRGB(
              Math.min(100, parseInt(i[1], 10)) / 100,
              Math.min(100, parseInt(i[2], 10)) / 100,
              Math.min(100, parseInt(i[3], 10)) / 100,
              D
            );
          break;
        case "hsl":
        case "hsla":
          if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return e(i[4]), this.setHSL(
              parseFloat(i[1]) / 360,
              parseFloat(i[2]) / 100,
              parseFloat(i[3]) / 100,
              D
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + M);
      }
    } else if (t = /^\#([A-Fa-f\d]+)$/.exec(M)) {
      const i = t[1], n = i.length;
      if (n === 3)
        return this.setRGB(
          parseInt(i.charAt(0), 16) / 15,
          parseInt(i.charAt(1), 16) / 15,
          parseInt(i.charAt(2), 16) / 15,
          D
        );
      if (n === 6)
        return this.setHex(parseInt(i, 16), D);
      console.warn("THREE.Color: Invalid hex color " + M);
    } else if (M && M.length > 0)
      return this.setColorName(M, D);
    return this;
  }
  setColorName(M, D = eD) {
    const e = FT[M.toLowerCase()];
    return e !== void 0 ? this.setHex(e, D) : console.warn("THREE.Color: Unknown color " + M), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(M) {
    return this.r = M.r, this.g = M.g, this.b = M.b, this;
  }
  copySRGBToLinear(M) {
    return this.r = Gt(M.r), this.g = Gt(M.g), this.b = Gt(M.b), this;
  }
  copyLinearToSRGB(M) {
    return this.r = wA(M.r), this.g = wA(M.g), this.b = wA(M.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(M = eD) {
    return PM.fromWorkingColorSpace(sD.copy(this), M), Math.round(aD(sD.r * 255, 0, 255)) * 65536 + Math.round(aD(sD.g * 255, 0, 255)) * 256 + Math.round(aD(sD.b * 255, 0, 255));
  }
  getHexString(M = eD) {
    return ("000000" + this.getHex(M).toString(16)).slice(-6);
  }
  getHSL(M, D = PM.workingColorSpace) {
    PM.fromWorkingColorSpace(sD.copy(this), D);
    const e = sD.r, t = sD.g, i = sD.b, n = Math.max(e, t, i), A = Math.min(e, t, i);
    let z, I;
    const T = (A + n) / 2;
    if (A === n)
      z = 0, I = 0;
    else {
      const u = n - A;
      switch (I = T <= 0.5 ? u / (n + A) : u / (2 - n - A), n) {
        case e:
          z = (t - i) / u + (t < i ? 6 : 0);
          break;
        case t:
          z = (i - e) / u + 2;
          break;
        case i:
          z = (e - t) / u + 4;
          break;
      }
      z /= 6;
    }
    return M.h = z, M.s = I, M.l = T, M;
  }
  getRGB(M, D = PM.workingColorSpace) {
    return PM.fromWorkingColorSpace(sD.copy(this), D), M.r = sD.r, M.g = sD.g, M.b = sD.b, M;
  }
  getStyle(M = eD) {
    PM.fromWorkingColorSpace(sD.copy(this), M);
    const D = sD.r, e = sD.g, t = sD.b;
    return M !== eD ? `color(${M} ${D.toFixed(3)} ${e.toFixed(3)} ${t.toFixed(3)})` : `rgb(${Math.round(D * 255)},${Math.round(e * 255)},${Math.round(t * 255)})`;
  }
  offsetHSL(M, D, e) {
    return this.getHSL(ve), this.setHSL(ve.h + M, ve.s + D, ve.l + e);
  }
  add(M) {
    return this.r += M.r, this.g += M.g, this.b += M.b, this;
  }
  addColors(M, D) {
    return this.r = M.r + D.r, this.g = M.g + D.g, this.b = M.b + D.b, this;
  }
  addScalar(M) {
    return this.r += M, this.g += M, this.b += M, this;
  }
  sub(M) {
    return this.r = Math.max(0, this.r - M.r), this.g = Math.max(0, this.g - M.g), this.b = Math.max(0, this.b - M.b), this;
  }
  multiply(M) {
    return this.r *= M.r, this.g *= M.g, this.b *= M.b, this;
  }
  multiplyScalar(M) {
    return this.r *= M, this.g *= M, this.b *= M, this;
  }
  lerp(M, D) {
    return this.r += (M.r - this.r) * D, this.g += (M.g - this.g) * D, this.b += (M.b - this.b) * D, this;
  }
  lerpColors(M, D, e) {
    return this.r = M.r + (D.r - M.r) * e, this.g = M.g + (D.g - M.g) * e, this.b = M.b + (D.b - M.b) * e, this;
  }
  lerpHSL(M, D) {
    this.getHSL(ve), M.getHSL(PN);
    const e = gA(ve.h, PN.h, D), t = gA(ve.s, PN.s, D), i = gA(ve.l, PN.l, D);
    return this.setHSL(e, t, i), this;
  }
  setFromVector3(M) {
    return this.r = M.x, this.g = M.y, this.b = M.z, this;
  }
  applyMatrix3(M) {
    const D = this.r, e = this.g, t = this.b, i = M.elements;
    return this.r = i[0] * D + i[3] * e + i[6] * t, this.g = i[1] * D + i[4] * e + i[7] * t, this.b = i[2] * D + i[5] * e + i[8] * t, this;
  }
  equals(M) {
    return M.r === this.r && M.g === this.g && M.b === this.b;
  }
  fromArray(M, D = 0) {
    return this.r = M[D], this.g = M[D + 1], this.b = M[D + 2], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.r, M[D + 1] = this.g, M[D + 2] = this.b, M;
  }
  fromBufferAttribute(M, D) {
    return this.r = M.getX(D), this.g = M.getY(D), this.b = M.getZ(D), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
};
const sD = /* @__PURE__ */ new KM();
KM.NAMES = FT;
class Is extends YD {
  constructor(M, D = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new KM(M), this.intensity = D;
  }
  dispose() {
  }
  copy(M, D) {
    return super.copy(M, D), this.color.copy(M.color), this.intensity = M.intensity, this;
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return D.object.color = this.color.getHex(), D.object.intensity = this.intensity, this.groundColor !== void 0 && (D.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (D.object.distance = this.distance), this.angle !== void 0 && (D.object.angle = this.angle), this.decay !== void 0 && (D.object.decay = this.decay), this.penumbra !== void 0 && (D.object.penumbra = this.penumbra), this.shadow !== void 0 && (D.object.shadow = this.shadow.toJSON()), D;
  }
}
let rM = class BT {
  constructor(M = 0, D = 0) {
    BT.prototype.isVector2 = !0, this.x = M, this.y = D;
  }
  get width() {
    return this.x;
  }
  set width(M) {
    this.x = M;
  }
  get height() {
    return this.y;
  }
  set height(M) {
    this.y = M;
  }
  set(M, D) {
    return this.x = M, this.y = D, this;
  }
  setScalar(M) {
    return this.x = M, this.y = M, this;
  }
  setX(M) {
    return this.x = M, this;
  }
  setY(M) {
    return this.y = M, this;
  }
  setComponent(M, D) {
    switch (M) {
      case 0:
        this.x = D;
        break;
      case 1:
        this.y = D;
        break;
      default:
        throw new Error("index is out of range: " + M);
    }
    return this;
  }
  getComponent(M) {
    switch (M) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + M);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(M) {
    return this.x = M.x, this.y = M.y, this;
  }
  add(M) {
    return this.x += M.x, this.y += M.y, this;
  }
  addScalar(M) {
    return this.x += M, this.y += M, this;
  }
  addVectors(M, D) {
    return this.x = M.x + D.x, this.y = M.y + D.y, this;
  }
  addScaledVector(M, D) {
    return this.x += M.x * D, this.y += M.y * D, this;
  }
  sub(M) {
    return this.x -= M.x, this.y -= M.y, this;
  }
  subScalar(M) {
    return this.x -= M, this.y -= M, this;
  }
  subVectors(M, D) {
    return this.x = M.x - D.x, this.y = M.y - D.y, this;
  }
  multiply(M) {
    return this.x *= M.x, this.y *= M.y, this;
  }
  multiplyScalar(M) {
    return this.x *= M, this.y *= M, this;
  }
  divide(M) {
    return this.x /= M.x, this.y /= M.y, this;
  }
  divideScalar(M) {
    return this.multiplyScalar(1 / M);
  }
  applyMatrix3(M) {
    const D = this.x, e = this.y, t = M.elements;
    return this.x = t[0] * D + t[3] * e + t[6], this.y = t[1] * D + t[4] * e + t[7], this;
  }
  min(M) {
    return this.x = Math.min(this.x, M.x), this.y = Math.min(this.y, M.y), this;
  }
  max(M) {
    return this.x = Math.max(this.x, M.x), this.y = Math.max(this.y, M.y), this;
  }
  clamp(M, D) {
    return this.x = Math.max(M.x, Math.min(D.x, this.x)), this.y = Math.max(M.y, Math.min(D.y, this.y)), this;
  }
  clampScalar(M, D) {
    return this.x = Math.max(M, Math.min(D, this.x)), this.y = Math.max(M, Math.min(D, this.y)), this;
  }
  clampLength(M, D) {
    const e = this.length();
    return this.divideScalar(e || 1).multiplyScalar(Math.max(M, Math.min(D, e)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(M) {
    return this.x * M.x + this.y * M.y;
  }
  cross(M) {
    return this.x * M.y - this.y * M.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(M) {
    const D = Math.sqrt(this.lengthSq() * M.lengthSq());
    if (D === 0)
      return Math.PI / 2;
    const e = this.dot(M) / D;
    return Math.acos(aD(e, -1, 1));
  }
  distanceTo(M) {
    return Math.sqrt(this.distanceToSquared(M));
  }
  distanceToSquared(M) {
    const D = this.x - M.x, e = this.y - M.y;
    return D * D + e * e;
  }
  manhattanDistanceTo(M) {
    return Math.abs(this.x - M.x) + Math.abs(this.y - M.y);
  }
  setLength(M) {
    return this.normalize().multiplyScalar(M);
  }
  lerp(M, D) {
    return this.x += (M.x - this.x) * D, this.y += (M.y - this.y) * D, this;
  }
  lerpVectors(M, D, e) {
    return this.x = M.x + (D.x - M.x) * e, this.y = M.y + (D.y - M.y) * e, this;
  }
  equals(M) {
    return M.x === this.x && M.y === this.y;
  }
  fromArray(M, D = 0) {
    return this.x = M[D], this.y = M[D + 1], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.x, M[D + 1] = this.y, M;
  }
  fromBufferAttribute(M, D) {
    return this.x = M.getX(D), this.y = M.getY(D), this;
  }
  rotateAround(M, D) {
    const e = Math.cos(D), t = Math.sin(D), i = this.x - M.x, n = this.y - M.y;
    return this.x = i * e - n * t + M.x, this.y = i * t + n * e + M.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
};
class nD {
  constructor(M = 0, D = 0, e = 0, t = 1) {
    nD.prototype.isVector4 = !0, this.x = M, this.y = D, this.z = e, this.w = t;
  }
  get width() {
    return this.z;
  }
  set width(M) {
    this.z = M;
  }
  get height() {
    return this.w;
  }
  set height(M) {
    this.w = M;
  }
  set(M, D, e, t) {
    return this.x = M, this.y = D, this.z = e, this.w = t, this;
  }
  setScalar(M) {
    return this.x = M, this.y = M, this.z = M, this.w = M, this;
  }
  setX(M) {
    return this.x = M, this;
  }
  setY(M) {
    return this.y = M, this;
  }
  setZ(M) {
    return this.z = M, this;
  }
  setW(M) {
    return this.w = M, this;
  }
  setComponent(M, D) {
    switch (M) {
      case 0:
        this.x = D;
        break;
      case 1:
        this.y = D;
        break;
      case 2:
        this.z = D;
        break;
      case 3:
        this.w = D;
        break;
      default:
        throw new Error("index is out of range: " + M);
    }
    return this;
  }
  getComponent(M) {
    switch (M) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + M);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(M) {
    return this.x = M.x, this.y = M.y, this.z = M.z, this.w = M.w !== void 0 ? M.w : 1, this;
  }
  add(M) {
    return this.x += M.x, this.y += M.y, this.z += M.z, this.w += M.w, this;
  }
  addScalar(M) {
    return this.x += M, this.y += M, this.z += M, this.w += M, this;
  }
  addVectors(M, D) {
    return this.x = M.x + D.x, this.y = M.y + D.y, this.z = M.z + D.z, this.w = M.w + D.w, this;
  }
  addScaledVector(M, D) {
    return this.x += M.x * D, this.y += M.y * D, this.z += M.z * D, this.w += M.w * D, this;
  }
  sub(M) {
    return this.x -= M.x, this.y -= M.y, this.z -= M.z, this.w -= M.w, this;
  }
  subScalar(M) {
    return this.x -= M, this.y -= M, this.z -= M, this.w -= M, this;
  }
  subVectors(M, D) {
    return this.x = M.x - D.x, this.y = M.y - D.y, this.z = M.z - D.z, this.w = M.w - D.w, this;
  }
  multiply(M) {
    return this.x *= M.x, this.y *= M.y, this.z *= M.z, this.w *= M.w, this;
  }
  multiplyScalar(M) {
    return this.x *= M, this.y *= M, this.z *= M, this.w *= M, this;
  }
  applyMatrix4(M) {
    const D = this.x, e = this.y, t = this.z, i = this.w, n = M.elements;
    return this.x = n[0] * D + n[4] * e + n[8] * t + n[12] * i, this.y = n[1] * D + n[5] * e + n[9] * t + n[13] * i, this.z = n[2] * D + n[6] * e + n[10] * t + n[14] * i, this.w = n[3] * D + n[7] * e + n[11] * t + n[15] * i, this;
  }
  divideScalar(M) {
    return this.multiplyScalar(1 / M);
  }
  setAxisAngleFromQuaternion(M) {
    this.w = 2 * Math.acos(M.w);
    const D = Math.sqrt(1 - M.w * M.w);
    return D < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = M.x / D, this.y = M.y / D, this.z = M.z / D), this;
  }
  setAxisAngleFromRotationMatrix(M) {
    let D, e, t, i;
    const z = M.elements, I = z[0], T = z[4], u = z[8], g = z[1], s = z[5], a = z[9], o = z[2], c = z[6], r = z[10];
    if (Math.abs(T - g) < 0.01 && Math.abs(u - o) < 0.01 && Math.abs(a - c) < 0.01) {
      if (Math.abs(T + g) < 0.1 && Math.abs(u + o) < 0.1 && Math.abs(a + c) < 0.1 && Math.abs(I + s + r - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      D = Math.PI;
      const y = (I + 1) / 2, j = (s + 1) / 2, l = (r + 1) / 2, d = (T + g) / 4, h = (u + o) / 4, Z = (a + c) / 4;
      return y > j && y > l ? y < 0.01 ? (e = 0, t = 0.707106781, i = 0.707106781) : (e = Math.sqrt(y), t = d / e, i = h / e) : j > l ? j < 0.01 ? (e = 0.707106781, t = 0, i = 0.707106781) : (t = Math.sqrt(j), e = d / t, i = Z / t) : l < 0.01 ? (e = 0.707106781, t = 0.707106781, i = 0) : (i = Math.sqrt(l), e = h / i, t = Z / i), this.set(e, t, i, D), this;
    }
    let w = Math.sqrt((c - a) * (c - a) + (u - o) * (u - o) + (g - T) * (g - T));
    return Math.abs(w) < 1e-3 && (w = 1), this.x = (c - a) / w, this.y = (u - o) / w, this.z = (g - T) / w, this.w = Math.acos((I + s + r - 1) / 2), this;
  }
  min(M) {
    return this.x = Math.min(this.x, M.x), this.y = Math.min(this.y, M.y), this.z = Math.min(this.z, M.z), this.w = Math.min(this.w, M.w), this;
  }
  max(M) {
    return this.x = Math.max(this.x, M.x), this.y = Math.max(this.y, M.y), this.z = Math.max(this.z, M.z), this.w = Math.max(this.w, M.w), this;
  }
  clamp(M, D) {
    return this.x = Math.max(M.x, Math.min(D.x, this.x)), this.y = Math.max(M.y, Math.min(D.y, this.y)), this.z = Math.max(M.z, Math.min(D.z, this.z)), this.w = Math.max(M.w, Math.min(D.w, this.w)), this;
  }
  clampScalar(M, D) {
    return this.x = Math.max(M, Math.min(D, this.x)), this.y = Math.max(M, Math.min(D, this.y)), this.z = Math.max(M, Math.min(D, this.z)), this.w = Math.max(M, Math.min(D, this.w)), this;
  }
  clampLength(M, D) {
    const e = this.length();
    return this.divideScalar(e || 1).multiplyScalar(Math.max(M, Math.min(D, e)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(M) {
    return this.x * M.x + this.y * M.y + this.z * M.z + this.w * M.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(M) {
    return this.normalize().multiplyScalar(M);
  }
  lerp(M, D) {
    return this.x += (M.x - this.x) * D, this.y += (M.y - this.y) * D, this.z += (M.z - this.z) * D, this.w += (M.w - this.w) * D, this;
  }
  lerpVectors(M, D, e) {
    return this.x = M.x + (D.x - M.x) * e, this.y = M.y + (D.y - M.y) * e, this.z = M.z + (D.z - M.z) * e, this.w = M.w + (D.w - M.w) * e, this;
  }
  equals(M) {
    return M.x === this.x && M.y === this.y && M.z === this.z && M.w === this.w;
  }
  fromArray(M, D = 0) {
    return this.x = M[D], this.y = M[D + 1], this.z = M[D + 2], this.w = M[D + 3], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.x, M[D + 1] = this.y, M[D + 2] = this.z, M[D + 3] = this.w, M;
  }
  fromBufferAttribute(M, D) {
    return this.x = M.getX(D), this.y = M.getY(D), this.z = M.getZ(D), this.w = M.getW(D), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
let NN = class {
  constructor(M = new Y(1 / 0, 1 / 0, 1 / 0), D = new Y(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = M, this.max = D;
  }
  set(M, D) {
    return this.min.copy(M), this.max.copy(D), this;
  }
  setFromArray(M) {
    this.makeEmpty();
    for (let D = 0, e = M.length; D < e; D += 3)
      this.expandByPoint(Te.fromArray(M, D));
    return this;
  }
  setFromBufferAttribute(M) {
    this.makeEmpty();
    for (let D = 0, e = M.count; D < e; D++)
      this.expandByPoint(Te.fromBufferAttribute(M, D));
    return this;
  }
  setFromPoints(M) {
    this.makeEmpty();
    for (let D = 0, e = M.length; D < e; D++)
      this.expandByPoint(M[D]);
    return this;
  }
  setFromCenterAndSize(M, D) {
    const e = Te.copy(D).multiplyScalar(0.5);
    return this.min.copy(M).sub(e), this.max.copy(M).add(e), this;
  }
  setFromObject(M, D = !1) {
    return this.makeEmpty(), this.expandByObject(M, D);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.min.copy(M.min), this.max.copy(M.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(M) {
    return this.isEmpty() ? M.set(0, 0, 0) : M.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(M) {
    return this.isEmpty() ? M.set(0, 0, 0) : M.subVectors(this.max, this.min);
  }
  expandByPoint(M) {
    return this.min.min(M), this.max.max(M), this;
  }
  expandByVector(M) {
    return this.min.sub(M), this.max.add(M), this;
  }
  expandByScalar(M) {
    return this.min.addScalar(-M), this.max.addScalar(M), this;
  }
  expandByObject(M, D = !1) {
    if (M.updateWorldMatrix(!1, !1), M.boundingBox !== void 0)
      M.boundingBox === null && M.computeBoundingBox(), at.copy(M.boundingBox), at.applyMatrix4(M.matrixWorld), this.union(at);
    else {
      const t = M.geometry;
      if (t !== void 0)
        if (D && t.attributes !== void 0 && t.attributes.position !== void 0) {
          const i = t.attributes.position;
          for (let n = 0, A = i.count; n < A; n++)
            Te.fromBufferAttribute(i, n).applyMatrix4(M.matrixWorld), this.expandByPoint(Te);
        } else
          t.boundingBox === null && t.computeBoundingBox(), at.copy(t.boundingBox), at.applyMatrix4(M.matrixWorld), this.union(at);
    }
    const e = M.children;
    for (let t = 0, i = e.length; t < i; t++)
      this.expandByObject(e[t], D);
    return this;
  }
  containsPoint(M) {
    return !(M.x < this.min.x || M.x > this.max.x || M.y < this.min.y || M.y > this.max.y || M.z < this.min.z || M.z > this.max.z);
  }
  containsBox(M) {
    return this.min.x <= M.min.x && M.max.x <= this.max.x && this.min.y <= M.min.y && M.max.y <= this.max.y && this.min.z <= M.min.z && M.max.z <= this.max.z;
  }
  getParameter(M, D) {
    return D.set(
      (M.x - this.min.x) / (this.max.x - this.min.x),
      (M.y - this.min.y) / (this.max.y - this.min.y),
      (M.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(M) {
    return !(M.max.x < this.min.x || M.min.x > this.max.x || M.max.y < this.min.y || M.min.y > this.max.y || M.max.z < this.min.z || M.min.z > this.max.z);
  }
  intersectsSphere(M) {
    return this.clampPoint(M.center, Te), Te.distanceToSquared(M.center) <= M.radius * M.radius;
  }
  intersectsPlane(M) {
    let D, e;
    return M.normal.x > 0 ? (D = M.normal.x * this.min.x, e = M.normal.x * this.max.x) : (D = M.normal.x * this.max.x, e = M.normal.x * this.min.x), M.normal.y > 0 ? (D += M.normal.y * this.min.y, e += M.normal.y * this.max.y) : (D += M.normal.y * this.max.y, e += M.normal.y * this.min.y), M.normal.z > 0 ? (D += M.normal.z * this.min.z, e += M.normal.z * this.max.z) : (D += M.normal.z * this.max.z, e += M.normal.z * this.min.z), D <= -M.constant && e >= -M.constant;
  }
  intersectsTriangle(M) {
    if (this.isEmpty())
      return !1;
    this.getCenter(TN), FN.subVectors(this.max, TN), ot.subVectors(M.a, TN), yt.subVectors(M.b, TN), jt.subVectors(M.c, TN), pe.subVectors(yt, ot), Ye.subVectors(jt, yt), He.subVectors(ot, jt);
    let D = [
      0,
      -pe.z,
      pe.y,
      0,
      -Ye.z,
      Ye.y,
      0,
      -He.z,
      He.y,
      pe.z,
      0,
      -pe.x,
      Ye.z,
      0,
      -Ye.x,
      He.z,
      0,
      -He.x,
      -pe.y,
      pe.x,
      0,
      -Ye.y,
      Ye.x,
      0,
      -He.y,
      He.x,
      0
    ];
    return !xA(D, ot, yt, jt, FN) || (D = [1, 0, 0, 0, 1, 0, 0, 0, 1], !xA(D, ot, yt, jt, FN)) ? !1 : (BN.crossVectors(pe, Ye), D = [BN.x, BN.y, BN.z], xA(D, ot, yt, jt, FN));
  }
  clampPoint(M, D) {
    return D.copy(M).clamp(this.min, this.max);
  }
  distanceToPoint(M) {
    return this.clampPoint(M, Te).distanceTo(M);
  }
  getBoundingSphere(M) {
    return this.isEmpty() ? M.makeEmpty() : (this.getCenter(M.center), M.radius = this.getSize(Te).length() * 0.5), M;
  }
  intersect(M) {
    return this.min.max(M.min), this.max.min(M.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(M) {
    return this.min.min(M.min), this.max.max(M.max), this;
  }
  applyMatrix4(M) {
    return this.isEmpty() ? this : (Ie[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(M), Ie[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(M), Ie[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(M), Ie[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(M), Ie[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(M), Ie[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(M), Ie[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(M), Ie[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(M), this.setFromPoints(Ie), this);
  }
  translate(M) {
    return this.min.add(M), this.max.add(M), this;
  }
  equals(M) {
    return M.min.equals(this.min) && M.max.equals(this.max);
  }
};
const Ie = [
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y(),
  /* @__PURE__ */ new Y()
], Te = /* @__PURE__ */ new Y(), at = /* @__PURE__ */ new NN(), ot = /* @__PURE__ */ new Y(), yt = /* @__PURE__ */ new Y(), jt = /* @__PURE__ */ new Y(), pe = /* @__PURE__ */ new Y(), Ye = /* @__PURE__ */ new Y(), He = /* @__PURE__ */ new Y(), TN = /* @__PURE__ */ new Y(), FN = /* @__PURE__ */ new Y(), BN = /* @__PURE__ */ new Y(), We = /* @__PURE__ */ new Y();
function xA(N, M, D, e, t) {
  for (let i = 0, n = N.length - 3; i <= n; i += 3) {
    We.fromArray(N, i);
    const A = t.x * Math.abs(We.x) + t.y * Math.abs(We.y) + t.z * Math.abs(We.z), z = M.dot(We), I = D.dot(We), T = e.dot(We);
    if (Math.max(-Math.max(z, I, T), Math.min(z, I, T)) > A)
      return !1;
  }
  return !0;
}
const Ts = /* @__PURE__ */ new NN(), uN = /* @__PURE__ */ new Y(), EA = /* @__PURE__ */ new Y();
let Qn = class {
  constructor(M = new Y(), D = -1) {
    this.center = M, this.radius = D;
  }
  set(M, D) {
    return this.center.copy(M), this.radius = D, this;
  }
  setFromPoints(M, D) {
    const e = this.center;
    D !== void 0 ? e.copy(D) : Ts.setFromPoints(M).getCenter(e);
    let t = 0;
    for (let i = 0, n = M.length; i < n; i++)
      t = Math.max(t, e.distanceToSquared(M[i]));
    return this.radius = Math.sqrt(t), this;
  }
  copy(M) {
    return this.center.copy(M.center), this.radius = M.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(M) {
    return M.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(M) {
    return M.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(M) {
    const D = this.radius + M.radius;
    return M.center.distanceToSquared(this.center) <= D * D;
  }
  intersectsBox(M) {
    return M.intersectsSphere(this);
  }
  intersectsPlane(M) {
    return Math.abs(M.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(M, D) {
    const e = this.center.distanceToSquared(M);
    return D.copy(M), e > this.radius * this.radius && (D.sub(this.center).normalize(), D.multiplyScalar(this.radius).add(this.center)), D;
  }
  getBoundingBox(M) {
    return this.isEmpty() ? (M.makeEmpty(), M) : (M.set(this.center, this.center), M.expandByScalar(this.radius), M);
  }
  applyMatrix4(M) {
    return this.center.applyMatrix4(M), this.radius = this.radius * M.getMaxScaleOnAxis(), this;
  }
  translate(M) {
    return this.center.add(M), this;
  }
  expandByPoint(M) {
    if (this.isEmpty())
      return this.center.copy(M), this.radius = 0, this;
    uN.subVectors(M, this.center);
    const D = uN.lengthSq();
    if (D > this.radius * this.radius) {
      const e = Math.sqrt(D), t = (e - this.radius) * 0.5;
      this.center.addScaledVector(uN, t / e), this.radius += t;
    }
    return this;
  }
  union(M) {
    return M.isEmpty() ? this : this.isEmpty() ? (this.copy(M), this) : (this.center.equals(M.center) === !0 ? this.radius = Math.max(this.radius, M.radius) : (EA.subVectors(M.center, this.center).setLength(M.radius), this.expandByPoint(uN.copy(M.center).add(EA)), this.expandByPoint(uN.copy(M.center).sub(EA))), this);
  }
  equals(M) {
    return M.center.equals(this.center) && M.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
const lA = /* @__PURE__ */ new Y(), us = /* @__PURE__ */ new Y(), gs = /* @__PURE__ */ new kM();
class Dt {
  constructor(M = new Y(1, 0, 0), D = 0) {
    this.isPlane = !0, this.normal = M, this.constant = D;
  }
  set(M, D) {
    return this.normal.copy(M), this.constant = D, this;
  }
  setComponents(M, D, e, t) {
    return this.normal.set(M, D, e), this.constant = t, this;
  }
  setFromNormalAndCoplanarPoint(M, D) {
    return this.normal.copy(M), this.constant = -D.dot(this.normal), this;
  }
  setFromCoplanarPoints(M, D, e) {
    const t = lA.subVectors(e, D).cross(us.subVectors(M, D)).normalize();
    return this.setFromNormalAndCoplanarPoint(t, M), this;
  }
  copy(M) {
    return this.normal.copy(M.normal), this.constant = M.constant, this;
  }
  normalize() {
    const M = 1 / this.normal.length();
    return this.normal.multiplyScalar(M), this.constant *= M, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(M) {
    return this.normal.dot(M) + this.constant;
  }
  distanceToSphere(M) {
    return this.distanceToPoint(M.center) - M.radius;
  }
  projectPoint(M, D) {
    return D.copy(M).addScaledVector(this.normal, -this.distanceToPoint(M));
  }
  intersectLine(M, D) {
    const e = M.delta(lA), t = this.normal.dot(e);
    if (t === 0)
      return this.distanceToPoint(M.start) === 0 ? D.copy(M.start) : null;
    const i = -(M.start.dot(this.normal) + this.constant) / t;
    return i < 0 || i > 1 ? null : D.copy(M.start).addScaledVector(e, i);
  }
  intersectsLine(M) {
    const D = this.distanceToPoint(M.start), e = this.distanceToPoint(M.end);
    return D < 0 && e > 0 || e < 0 && D > 0;
  }
  intersectsBox(M) {
    return M.intersectsPlane(this);
  }
  intersectsSphere(M) {
    return M.intersectsPlane(this);
  }
  coplanarPoint(M) {
    return M.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(M, D) {
    const e = D || gs.getNormalMatrix(M), t = this.coplanarPoint(lA).applyMatrix4(M), i = this.normal.applyMatrix3(e).normalize();
    return this.constant = -t.dot(i), this;
  }
  translate(M) {
    return this.constant -= M.dot(this.normal), this;
  }
  equals(M) {
    return M.normal.equals(this.normal) && M.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Xe = /* @__PURE__ */ new Qn(), VN = /* @__PURE__ */ new Y();
class Sn {
  constructor(M = new Dt(), D = new Dt(), e = new Dt(), t = new Dt(), i = new Dt(), n = new Dt()) {
    this.planes = [M, D, e, t, i, n];
  }
  set(M, D, e, t, i, n) {
    const A = this.planes;
    return A[0].copy(M), A[1].copy(D), A[2].copy(e), A[3].copy(t), A[4].copy(i), A[5].copy(n), this;
  }
  copy(M) {
    const D = this.planes;
    for (let e = 0; e < 6; e++)
      D[e].copy(M.planes[e]);
    return this;
  }
  setFromProjectionMatrix(M, D = xe) {
    const e = this.planes, t = M.elements, i = t[0], n = t[1], A = t[2], z = t[3], I = t[4], T = t[5], u = t[6], g = t[7], s = t[8], a = t[9], o = t[10], c = t[11], r = t[12], w = t[13], y = t[14], j = t[15];
    if (e[0].setComponents(z - i, g - I, c - s, j - r).normalize(), e[1].setComponents(z + i, g + I, c + s, j + r).normalize(), e[2].setComponents(z + n, g + T, c + a, j + w).normalize(), e[3].setComponents(z - n, g - T, c - a, j - w).normalize(), e[4].setComponents(z - A, g - u, c - o, j - y).normalize(), D === xe)
      e[5].setComponents(z + A, g + u, c + o, j + y).normalize();
    else if (D === Hi)
      e[5].setComponents(A, u, o, y).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + D);
    return this;
  }
  intersectsObject(M) {
    if (M.boundingSphere !== void 0)
      M.boundingSphere === null && M.computeBoundingSphere(), Xe.copy(M.boundingSphere).applyMatrix4(M.matrixWorld);
    else {
      const D = M.geometry;
      D.boundingSphere === null && D.computeBoundingSphere(), Xe.copy(D.boundingSphere).applyMatrix4(M.matrixWorld);
    }
    return this.intersectsSphere(Xe);
  }
  intersectsSprite(M) {
    return Xe.center.set(0, 0, 0), Xe.radius = 0.7071067811865476, Xe.applyMatrix4(M.matrixWorld), this.intersectsSphere(Xe);
  }
  intersectsSphere(M) {
    const D = this.planes, e = M.center, t = -M.radius;
    for (let i = 0; i < 6; i++)
      if (D[i].distanceToPoint(e) < t)
        return !1;
    return !0;
  }
  intersectsBox(M) {
    const D = this.planes;
    for (let e = 0; e < 6; e++) {
      const t = D[e];
      if (VN.x = t.normal.x > 0 ? M.max.x : M.min.x, VN.y = t.normal.y > 0 ? M.max.y : M.min.y, VN.z = t.normal.z > 0 ? M.max.z : M.min.z, t.distanceToPoint(VN) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(M) {
    const D = this.planes;
    for (let e = 0; e < 6; e++)
      if (D[e].distanceToPoint(M) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const hA = /* @__PURE__ */ new ID(), Vz = /* @__PURE__ */ new Y(), Gz = /* @__PURE__ */ new Y();
class ss {
  constructor(M) {
    this.camera = M, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new rM(512, 512), this.map = null, this.mapPass = null, this.matrix = new ID(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Sn(), this._frameExtents = new rM(1, 1), this._viewportCount = 1, this._viewports = [
      new nD(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(M) {
    const D = this.camera, e = this.matrix;
    Vz.setFromMatrixPosition(M.matrixWorld), D.position.copy(Vz), Gz.setFromMatrixPosition(M.target.matrixWorld), D.lookAt(Gz), D.updateMatrixWorld(), hA.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), this._frustum.setFromProjectionMatrix(hA), e.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), e.multiply(hA);
  }
  getViewport(M) {
    return this._viewports[M];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(M) {
    return this.camera = M.camera.clone(), this.bias = M.bias, this.radius = M.radius, this.mapSize.copy(M.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const M = {};
    return this.bias !== 0 && (M.bias = this.bias), this.normalBias !== 0 && (M.normalBias = this.normalBias), this.radius !== 1 && (M.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (M.mapSize = this.mapSize.toArray()), M.camera = this.camera.toJSON(!1).object, delete M.camera.matrix, M;
  }
}
class VT extends PT {
  constructor(M = -1, D = 1, e = 1, t = -1, i = 0.1, n = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = M, this.right = D, this.top = e, this.bottom = t, this.near = i, this.far = n, this.updateProjectionMatrix();
  }
  copy(M, D) {
    return super.copy(M, D), this.left = M.left, this.right = M.right, this.top = M.top, this.bottom = M.bottom, this.near = M.near, this.far = M.far, this.zoom = M.zoom, this.view = M.view === null ? null : Object.assign({}, M.view), this;
  }
  setViewOffset(M, D, e, t, i, n) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = M, this.view.fullHeight = D, this.view.offsetX = e, this.view.offsetY = t, this.view.width = i, this.view.height = n, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const M = (this.right - this.left) / (2 * this.zoom), D = (this.top - this.bottom) / (2 * this.zoom), e = (this.right + this.left) / 2, t = (this.top + this.bottom) / 2;
    let i = e - M, n = e + M, A = t + D, z = t - D;
    if (this.view !== null && this.view.enabled) {
      const I = (this.right - this.left) / this.view.fullWidth / this.zoom, T = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      i += I * this.view.offsetX, n = i + I * this.view.width, A -= T * this.view.offsetY, z = A - T * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(i, n, A, z, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return D.object.zoom = this.zoom, D.object.left = this.left, D.object.right = this.right, D.object.top = this.top, D.object.bottom = this.bottom, D.object.near = this.near, D.object.far = this.far, this.view !== null && (D.object.view = Object.assign({}, this.view)), D;
  }
}
class rs extends ss {
  constructor() {
    super(new VT(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class cs extends Is {
  constructor(M, D) {
    super(M, D), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(YD.DEFAULT_UP), this.updateMatrix(), this.target = new YD(), this.shadow = new rs();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(M) {
    return super.copy(M), this.target = M.target.clone(), this.shadow = M.shadow.clone(), this;
  }
}
const Hz = {
  enabled: !1,
  files: {},
  add: function(N, M) {
    this.enabled !== !1 && (this.files[N] = M);
  },
  get: function(N) {
    if (this.enabled !== !1)
      return this.files[N];
  },
  remove: function(N) {
    delete this.files[N];
  },
  clear: function() {
    this.files = {};
  }
};
let as = class {
  constructor(M, D, e) {
    const t = this;
    let i = !1, n = 0, A = 0, z;
    const I = [];
    this.onStart = void 0, this.onLoad = M, this.onProgress = D, this.onError = e, this.itemStart = function(T) {
      A++, i === !1 && t.onStart !== void 0 && t.onStart(T, n, A), i = !0;
    }, this.itemEnd = function(T) {
      n++, t.onProgress !== void 0 && t.onProgress(T, n, A), n === A && (i = !1, t.onLoad !== void 0 && t.onLoad());
    }, this.itemError = function(T) {
      t.onError !== void 0 && t.onError(T);
    }, this.resolveURL = function(T) {
      return z ? z(T) : T;
    }, this.setURLModifier = function(T) {
      return z = T, this;
    }, this.addHandler = function(T, u) {
      return I.push(T, u), this;
    }, this.removeHandler = function(T) {
      const u = I.indexOf(T);
      return u !== -1 && I.splice(u, 2), this;
    }, this.getHandler = function(T) {
      for (let u = 0, g = I.length; u < g; u += 2) {
        const s = I[u], a = I[u + 1];
        if (s.global && (s.lastIndex = 0), s.test(T))
          return a;
      }
      return null;
    };
  }
};
const os = /* @__PURE__ */ new as();
let kn = class {
  constructor(M) {
    this.manager = M !== void 0 ? M : os, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(M, D) {
    const e = this;
    return new Promise(function(t, i) {
      e.load(M, t, D, i);
    });
  }
  parse() {
  }
  setCrossOrigin(M) {
    return this.crossOrigin = M, this;
  }
  setWithCredentials(M) {
    return this.withCredentials = M, this;
  }
  setPath(M) {
    return this.path = M, this;
  }
  setResourcePath(M) {
    return this.resourcePath = M, this;
  }
  setRequestHeader(M) {
    return this.requestHeader = M, this;
  }
};
kn.DEFAULT_MATERIAL_NAME = "__DEFAULT";
function GT(N) {
  for (let M = N.length - 1; M >= 0; --M)
    if (N[M] >= 65535)
      return !0;
  return !1;
}
function hN(N) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", N);
}
function ys() {
  const N = hN("canvas");
  return N.style.display = "block", N;
}
const Wz = {};
function LN(N) {
  N in Wz || (Wz[N] = !0, console.warn(N));
}
class js extends kn {
  constructor(M) {
    super(M);
  }
  load(M, D, e, t) {
    this.path !== void 0 && (M = this.path + M), M = this.manager.resolveURL(M);
    const i = this, n = Hz.get(M);
    if (n !== void 0)
      return i.manager.itemStart(M), setTimeout(function() {
        D && D(n), i.manager.itemEnd(M);
      }, 0), n;
    const A = hN("img");
    function z() {
      T(), Hz.add(M, this), D && D(this), i.manager.itemEnd(M);
    }
    function I(u) {
      T(), t && t(u), i.manager.itemError(M), i.manager.itemEnd(M);
    }
    function T() {
      A.removeEventListener("load", z, !1), A.removeEventListener("error", I, !1);
    }
    return A.addEventListener("load", z, !1), A.addEventListener("error", I, !1), M.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (A.crossOrigin = this.crossOrigin), i.manager.itemStart(M), A.src = M, A;
  }
}
let Ct, HT = class {
  static getDataURL(M) {
    if (/^data:/i.test(M.src) || typeof HTMLCanvasElement > "u")
      return M.src;
    let D;
    if (M instanceof HTMLCanvasElement)
      D = M;
    else {
      Ct === void 0 && (Ct = hN("canvas")), Ct.width = M.width, Ct.height = M.height;
      const e = Ct.getContext("2d");
      M instanceof ImageData ? e.putImageData(M, 0, 0) : e.drawImage(M, 0, 0, M.width, M.height), D = Ct;
    }
    return D.width > 2048 || D.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", M), D.toDataURL("image/jpeg", 0.6)) : D.toDataURL("image/png");
  }
  static sRGBToLinear(M) {
    if (typeof HTMLImageElement < "u" && M instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && M instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && M instanceof ImageBitmap) {
      const D = hN("canvas");
      D.width = M.width, D.height = M.height;
      const e = D.getContext("2d");
      e.drawImage(M, 0, 0, M.width, M.height);
      const t = e.getImageData(0, 0, M.width, M.height), i = t.data;
      for (let n = 0; n < i.length; n++)
        i[n] = Gt(i[n] / 255) * 255;
      return e.putImageData(t, 0, 0), D;
    } else if (M.data) {
      const D = M.data.slice(0);
      for (let e = 0; e < D.length; e++)
        D instanceof Uint8Array || D instanceof Uint8ClampedArray ? D[e] = Math.floor(Gt(D[e] / 255) * 255) : D[e] = Gt(D[e]);
      return {
        data: D,
        width: M.width,
        height: M.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), M;
  }
}, Cs = 0, WT = class {
  constructor(M = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Cs++ }), this.uuid = eN(), this.data = M, this.version = 0;
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    if (!D && M.images[this.uuid] !== void 0)
      return M.images[this.uuid];
    const e = {
      uuid: this.uuid,
      url: ""
    }, t = this.data;
    if (t !== null) {
      let i;
      if (Array.isArray(t)) {
        i = [];
        for (let n = 0, A = t.length; n < A; n++)
          t[n].isDataTexture ? i.push(dA(t[n].image)) : i.push(dA(t[n]));
      } else
        i = dA(t);
      e.url = i;
    }
    return D || (M.images[this.uuid] = e), e;
  }
};
function dA(N) {
  return typeof HTMLImageElement < "u" && N instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && N instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && N instanceof ImageBitmap ? HT.getDataURL(N) : N.data ? {
    data: Array.from(N.data),
    width: N.width,
    height: N.height,
    type: N.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Ls = 0, Me = class Si extends tN {
  constructor(M = Si.DEFAULT_IMAGE, D = Si.DEFAULT_MAPPING, e = $D, t = $D, i = dD, n = EN, A = JD, z = Re, I = Si.DEFAULT_ANISOTROPY, T = PD) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Ls++ }), this.uuid = eN(), this.name = "", this.source = new WT(M), this.mipmaps = [], this.mapping = D, this.channel = 0, this.wrapS = e, this.wrapT = t, this.magFilter = i, this.minFilter = n, this.anisotropy = I, this.format = A, this.internalFormat = null, this.type = z, this.offset = new rM(0, 0), this.repeat = new rM(1, 1), this.center = new rM(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new kM(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, typeof T == "string" ? this.colorSpace = T : (LN("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = T === nt ? eD : PD), this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
  }
  get image() {
    return this.source.data;
  }
  set image(M = null) {
    this.source.data = M;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.name = M.name, this.source = M.source, this.mipmaps = M.mipmaps.slice(0), this.mapping = M.mapping, this.channel = M.channel, this.wrapS = M.wrapS, this.wrapT = M.wrapT, this.magFilter = M.magFilter, this.minFilter = M.minFilter, this.anisotropy = M.anisotropy, this.format = M.format, this.internalFormat = M.internalFormat, this.type = M.type, this.offset.copy(M.offset), this.repeat.copy(M.repeat), this.center.copy(M.center), this.rotation = M.rotation, this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrix.copy(M.matrix), this.generateMipmaps = M.generateMipmaps, this.premultiplyAlpha = M.premultiplyAlpha, this.flipY = M.flipY, this.unpackAlignment = M.unpackAlignment, this.colorSpace = M.colorSpace, this.userData = JSON.parse(JSON.stringify(M.userData)), this.needsUpdate = !0, this;
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    if (!D && M.textures[this.uuid] !== void 0)
      return M.textures[this.uuid];
    const e = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(M).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (e.userData = this.userData), D || (M.textures[this.uuid] = e), e;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(M) {
    if (this.mapping !== pT)
      return M;
    if (M.applyMatrix3(this.matrix), M.x < 0 || M.x > 1)
      switch (this.wrapS) {
        case wn:
          M.x = M.x - Math.floor(M.x);
          break;
        case $D:
          M.x = M.x < 0 ? 0 : 1;
          break;
        case On:
          Math.abs(Math.floor(M.x) % 2) === 1 ? M.x = Math.ceil(M.x) - M.x : M.x = M.x - Math.floor(M.x);
          break;
      }
    if (M.y < 0 || M.y > 1)
      switch (this.wrapT) {
        case wn:
          M.y = M.y - Math.floor(M.y);
          break;
        case $D:
          M.y = M.y < 0 ? 0 : 1;
          break;
        case On:
          Math.abs(Math.floor(M.y) % 2) === 1 ? M.y = Math.ceil(M.y) - M.y : M.y = M.y - Math.floor(M.y);
          break;
      }
    return this.flipY && (M.y = 1 - M.y), M;
  }
  set needsUpdate(M) {
    M === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  get encoding() {
    return LN("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace === eD ? nt : kT;
  }
  set encoding(M) {
    LN("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = M === nt ? eD : PD;
  }
};
Me.DEFAULT_IMAGE = null;
Me.DEFAULT_MAPPING = pT;
Me.DEFAULT_ANISOTROPY = 1;
class ws extends kn {
  constructor(M) {
    super(M);
  }
  load(M, D, e, t) {
    const i = new Me(), n = new js(this.manager);
    return n.setCrossOrigin(this.crossOrigin), n.setPath(this.path), n.load(M, function(A) {
      i.image = A, i.needsUpdate = !0, D !== void 0 && D(i);
    }, e, t), i;
  }
}
let Os = 0, fN = class extends tN {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Os++ }), this.uuid = eN(), this.name = "", this.type = "Material", this.blending = Vt, this.side = Pe, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = dT, this.blendDst = vT, this.blendEquation = Pt, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = jn, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = Vg, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = CA, this.stencilZFail = CA, this.stencilZPass = CA, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(M) {
    this._alphaTest > 0 != M > 0 && this.version++, this._alphaTest = M;
  }
  onBuild() {
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(M) {
    if (M !== void 0)
      for (const D in M) {
        const e = M[D];
        if (e === void 0) {
          console.warn(`THREE.Material: parameter '${D}' has value of undefined.`);
          continue;
        }
        const t = this[D];
        if (t === void 0) {
          console.warn(`THREE.Material: '${D}' is not a property of THREE.${this.type}.`);
          continue;
        }
        t && t.isColor ? t.set(e) : t && t.isVector3 && e && e.isVector3 ? t.copy(e) : this[D] = e;
      }
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    D && (M = {
      textures: {},
      images: {}
    });
    const e = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), this.color && this.color.isColor && (e.color = this.color.getHex()), this.roughness !== void 0 && (e.roughness = this.roughness), this.metalness !== void 0 && (e.metalness = this.metalness), this.sheen !== void 0 && (e.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (e.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (e.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (e.emissive = this.emissive.getHex()), this.emissiveIntensity && this.emissiveIntensity !== 1 && (e.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (e.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (e.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (e.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (e.shininess = this.shininess), this.clearcoat !== void 0 && (e.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (e.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (e.clearcoatMap = this.clearcoatMap.toJSON(M).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (e.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(M).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (e.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(M).uuid, e.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (e.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (e.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (e.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (e.iridescenceMap = this.iridescenceMap.toJSON(M).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (e.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(M).uuid), this.anisotropy !== void 0 && (e.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (e.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (e.anisotropyMap = this.anisotropyMap.toJSON(M).uuid), this.map && this.map.isTexture && (e.map = this.map.toJSON(M).uuid), this.matcap && this.matcap.isTexture && (e.matcap = this.matcap.toJSON(M).uuid), this.alphaMap && this.alphaMap.isTexture && (e.alphaMap = this.alphaMap.toJSON(M).uuid), this.lightMap && this.lightMap.isTexture && (e.lightMap = this.lightMap.toJSON(M).uuid, e.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (e.aoMap = this.aoMap.toJSON(M).uuid, e.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (e.bumpMap = this.bumpMap.toJSON(M).uuid, e.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (e.normalMap = this.normalMap.toJSON(M).uuid, e.normalMapType = this.normalMapType, e.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (e.displacementMap = this.displacementMap.toJSON(M).uuid, e.displacementScale = this.displacementScale, e.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (e.roughnessMap = this.roughnessMap.toJSON(M).uuid), this.metalnessMap && this.metalnessMap.isTexture && (e.metalnessMap = this.metalnessMap.toJSON(M).uuid), this.emissiveMap && this.emissiveMap.isTexture && (e.emissiveMap = this.emissiveMap.toJSON(M).uuid), this.specularMap && this.specularMap.isTexture && (e.specularMap = this.specularMap.toJSON(M).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (e.specularIntensityMap = this.specularIntensityMap.toJSON(M).uuid), this.specularColorMap && this.specularColorMap.isTexture && (e.specularColorMap = this.specularColorMap.toJSON(M).uuid), this.envMap && this.envMap.isTexture && (e.envMap = this.envMap.toJSON(M).uuid, this.combine !== void 0 && (e.combine = this.combine)), this.envMapIntensity !== void 0 && (e.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (e.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (e.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (e.gradientMap = this.gradientMap.toJSON(M).uuid), this.transmission !== void 0 && (e.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (e.transmissionMap = this.transmissionMap.toJSON(M).uuid), this.thickness !== void 0 && (e.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (e.thicknessMap = this.thicknessMap.toJSON(M).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (e.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (e.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (e.size = this.size), this.shadowSide !== null && (e.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (e.sizeAttenuation = this.sizeAttenuation), this.blending !== Vt && (e.blending = this.blending), this.side !== Pe && (e.side = this.side), this.vertexColors === !0 && (e.vertexColors = !0), this.opacity < 1 && (e.opacity = this.opacity), this.transparent === !0 && (e.transparent = !0), e.depthFunc = this.depthFunc, e.depthTest = this.depthTest, e.depthWrite = this.depthWrite, e.colorWrite = this.colorWrite, e.stencilWrite = this.stencilWrite, e.stencilWriteMask = this.stencilWriteMask, e.stencilFunc = this.stencilFunc, e.stencilRef = this.stencilRef, e.stencilFuncMask = this.stencilFuncMask, e.stencilFail = this.stencilFail, e.stencilZFail = this.stencilZFail, e.stencilZPass = this.stencilZPass, this.rotation !== void 0 && this.rotation !== 0 && (e.rotation = this.rotation), this.polygonOffset === !0 && (e.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (e.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (e.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (e.linewidth = this.linewidth), this.dashSize !== void 0 && (e.dashSize = this.dashSize), this.gapSize !== void 0 && (e.gapSize = this.gapSize), this.scale !== void 0 && (e.scale = this.scale), this.dithering === !0 && (e.dithering = !0), this.alphaTest > 0 && (e.alphaTest = this.alphaTest), this.alphaHash === !0 && (e.alphaHash = !0), this.alphaToCoverage === !0 && (e.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (e.premultipliedAlpha = !0), this.forceSinglePass === !0 && (e.forceSinglePass = !0), this.wireframe === !0 && (e.wireframe = !0), this.wireframeLinewidth > 1 && (e.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (e.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (e.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (e.flatShading = !0), this.visible === !1 && (e.visible = !1), this.toneMapped === !1 && (e.toneMapped = !1), this.fog === !1 && (e.fog = !1), Object.keys(this.userData).length > 0 && (e.userData = this.userData);
    function t(i) {
      const n = [];
      for (const A in i) {
        const z = i[A];
        delete z.metadata, n.push(z);
      }
      return n;
    }
    if (D) {
      const i = t(M.textures), n = t(M.images);
      i.length > 0 && (e.textures = i), n.length > 0 && (e.images = n);
    }
    return e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    this.name = M.name, this.blending = M.blending, this.side = M.side, this.vertexColors = M.vertexColors, this.opacity = M.opacity, this.transparent = M.transparent, this.blendSrc = M.blendSrc, this.blendDst = M.blendDst, this.blendEquation = M.blendEquation, this.blendSrcAlpha = M.blendSrcAlpha, this.blendDstAlpha = M.blendDstAlpha, this.blendEquationAlpha = M.blendEquationAlpha, this.depthFunc = M.depthFunc, this.depthTest = M.depthTest, this.depthWrite = M.depthWrite, this.stencilWriteMask = M.stencilWriteMask, this.stencilFunc = M.stencilFunc, this.stencilRef = M.stencilRef, this.stencilFuncMask = M.stencilFuncMask, this.stencilFail = M.stencilFail, this.stencilZFail = M.stencilZFail, this.stencilZPass = M.stencilZPass, this.stencilWrite = M.stencilWrite;
    const D = M.clippingPlanes;
    let e = null;
    if (D !== null) {
      const t = D.length;
      e = new Array(t);
      for (let i = 0; i !== t; ++i)
        e[i] = D[i].clone();
    }
    return this.clippingPlanes = e, this.clipIntersection = M.clipIntersection, this.clipShadows = M.clipShadows, this.shadowSide = M.shadowSide, this.colorWrite = M.colorWrite, this.precision = M.precision, this.polygonOffset = M.polygonOffset, this.polygonOffsetFactor = M.polygonOffsetFactor, this.polygonOffsetUnits = M.polygonOffsetUnits, this.dithering = M.dithering, this.alphaTest = M.alphaTest, this.alphaHash = M.alphaHash, this.alphaToCoverage = M.alphaToCoverage, this.premultipliedAlpha = M.premultipliedAlpha, this.forceSinglePass = M.forceSinglePass, this.visible = M.visible, this.toneMapped = M.toneMapped, this.userData = JSON.parse(JSON.stringify(M.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
};
class XT extends fN {
  constructor(M) {
    super(), this.isMeshLambertMaterial = !0, this.type = "MeshLambertMaterial", this.color = new KM(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new KM(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = ZT, this.normalScale = new rM(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Un, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.emissive.copy(M.emissive), this.emissiveMap = M.emissiveMap, this.emissiveIntensity = M.emissiveIntensity, this.bumpMap = M.bumpMap, this.bumpScale = M.bumpScale, this.normalMap = M.normalMap, this.normalMapType = M.normalMapType, this.normalScale.copy(M.normalScale), this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.flatShading = M.flatShading, this.fog = M.fog, this;
  }
}
const ue = /* @__PURE__ */ new Y(), vA = /* @__PURE__ */ new Y(), GN = /* @__PURE__ */ new Y(), Ue = /* @__PURE__ */ new Y(), pA = /* @__PURE__ */ new Y(), HN = /* @__PURE__ */ new Y(), YA = /* @__PURE__ */ new Y();
let xs = class {
  constructor(M = new Y(), D = new Y(0, 0, -1)) {
    this.origin = M, this.direction = D;
  }
  set(M, D) {
    return this.origin.copy(M), this.direction.copy(D), this;
  }
  copy(M) {
    return this.origin.copy(M.origin), this.direction.copy(M.direction), this;
  }
  at(M, D) {
    return D.copy(this.origin).addScaledVector(this.direction, M);
  }
  lookAt(M) {
    return this.direction.copy(M).sub(this.origin).normalize(), this;
  }
  recast(M) {
    return this.origin.copy(this.at(M, ue)), this;
  }
  closestPointToPoint(M, D) {
    D.subVectors(M, this.origin);
    const e = D.dot(this.direction);
    return e < 0 ? D.copy(this.origin) : D.copy(this.origin).addScaledVector(this.direction, e);
  }
  distanceToPoint(M) {
    return Math.sqrt(this.distanceSqToPoint(M));
  }
  distanceSqToPoint(M) {
    const D = ue.subVectors(M, this.origin).dot(this.direction);
    return D < 0 ? this.origin.distanceToSquared(M) : (ue.copy(this.origin).addScaledVector(this.direction, D), ue.distanceToSquared(M));
  }
  distanceSqToSegment(M, D, e, t) {
    vA.copy(M).add(D).multiplyScalar(0.5), GN.copy(D).sub(M).normalize(), Ue.copy(this.origin).sub(vA);
    const i = M.distanceTo(D) * 0.5, n = -this.direction.dot(GN), A = Ue.dot(this.direction), z = -Ue.dot(GN), I = Ue.lengthSq(), T = Math.abs(1 - n * n);
    let u, g, s, a;
    if (T > 0)
      if (u = n * z - A, g = n * A - z, a = i * T, u >= 0)
        if (g >= -a)
          if (g <= a) {
            const o = 1 / T;
            u *= o, g *= o, s = u * (u + n * g + 2 * A) + g * (n * u + g + 2 * z) + I;
          } else
            g = i, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
        else
          g = -i, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
      else
        g <= -a ? (u = Math.max(0, -(-n * i + A)), g = u > 0 ? -i : Math.min(Math.max(-i, -z), i), s = -u * u + g * (g + 2 * z) + I) : g <= a ? (u = 0, g = Math.min(Math.max(-i, -z), i), s = g * (g + 2 * z) + I) : (u = Math.max(0, -(n * i + A)), g = u > 0 ? i : Math.min(Math.max(-i, -z), i), s = -u * u + g * (g + 2 * z) + I);
    else
      g = n > 0 ? -i : i, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
    return e && e.copy(this.origin).addScaledVector(this.direction, u), t && t.copy(vA).addScaledVector(GN, g), s;
  }
  intersectSphere(M, D) {
    ue.subVectors(M.center, this.origin);
    const e = ue.dot(this.direction), t = ue.dot(ue) - e * e, i = M.radius * M.radius;
    if (t > i)
      return null;
    const n = Math.sqrt(i - t), A = e - n, z = e + n;
    return z < 0 ? null : A < 0 ? this.at(z, D) : this.at(A, D);
  }
  intersectsSphere(M) {
    return this.distanceSqToPoint(M.center) <= M.radius * M.radius;
  }
  distanceToPlane(M) {
    const D = M.normal.dot(this.direction);
    if (D === 0)
      return M.distanceToPoint(this.origin) === 0 ? 0 : null;
    const e = -(this.origin.dot(M.normal) + M.constant) / D;
    return e >= 0 ? e : null;
  }
  intersectPlane(M, D) {
    const e = this.distanceToPlane(M);
    return e === null ? null : this.at(e, D);
  }
  intersectsPlane(M) {
    const D = M.distanceToPoint(this.origin);
    return D === 0 || M.normal.dot(this.direction) * D < 0;
  }
  intersectBox(M, D) {
    let e, t, i, n, A, z;
    const I = 1 / this.direction.x, T = 1 / this.direction.y, u = 1 / this.direction.z, g = this.origin;
    return I >= 0 ? (e = (M.min.x - g.x) * I, t = (M.max.x - g.x) * I) : (e = (M.max.x - g.x) * I, t = (M.min.x - g.x) * I), T >= 0 ? (i = (M.min.y - g.y) * T, n = (M.max.y - g.y) * T) : (i = (M.max.y - g.y) * T, n = (M.min.y - g.y) * T), e > n || i > t || ((i > e || isNaN(e)) && (e = i), (n < t || isNaN(t)) && (t = n), u >= 0 ? (A = (M.min.z - g.z) * u, z = (M.max.z - g.z) * u) : (A = (M.max.z - g.z) * u, z = (M.min.z - g.z) * u), e > z || A > t) || ((A > e || e !== e) && (e = A), (z < t || t !== t) && (t = z), t < 0) ? null : this.at(e >= 0 ? e : t, D);
  }
  intersectsBox(M) {
    return this.intersectBox(M, ue) !== null;
  }
  intersectTriangle(M, D, e, t, i) {
    pA.subVectors(D, M), HN.subVectors(e, M), YA.crossVectors(pA, HN);
    let n = this.direction.dot(YA), A;
    if (n > 0) {
      if (t)
        return null;
      A = 1;
    } else if (n < 0)
      A = -1, n = -n;
    else
      return null;
    Ue.subVectors(this.origin, M);
    const z = A * this.direction.dot(HN.crossVectors(Ue, HN));
    if (z < 0)
      return null;
    const I = A * this.direction.dot(pA.cross(Ue));
    if (I < 0 || z + I > n)
      return null;
    const T = -A * Ue.dot(YA);
    return T < 0 ? null : this.at(T / n, i);
  }
  applyMatrix4(M) {
    return this.origin.applyMatrix4(M), this.direction.transformDirection(M), this;
  }
  equals(M) {
    return M.origin.equals(this.origin) && M.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
const VD = /* @__PURE__ */ new Y(), ge = /* @__PURE__ */ new Y(), UA = /* @__PURE__ */ new Y(), se = /* @__PURE__ */ new Y(), Lt = /* @__PURE__ */ new Y(), wt = /* @__PURE__ */ new Y(), Xz = /* @__PURE__ */ new Y(), fA = /* @__PURE__ */ new Y(), mA = /* @__PURE__ */ new Y(), QA = /* @__PURE__ */ new Y();
let WN = !1, XN = class et {
  constructor(M = new Y(), D = new Y(), e = new Y()) {
    this.a = M, this.b = D, this.c = e;
  }
  static getNormal(M, D, e, t) {
    t.subVectors(e, D), VD.subVectors(M, D), t.cross(VD);
    const i = t.lengthSq();
    return i > 0 ? t.multiplyScalar(1 / Math.sqrt(i)) : t.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(M, D, e, t, i) {
    VD.subVectors(t, D), ge.subVectors(e, D), UA.subVectors(M, D);
    const n = VD.dot(VD), A = VD.dot(ge), z = VD.dot(UA), I = ge.dot(ge), T = ge.dot(UA), u = n * I - A * A;
    if (u === 0)
      return i.set(-2, -1, -1);
    const g = 1 / u, s = (I * z - A * T) * g, a = (n * T - A * z) * g;
    return i.set(1 - s - a, a, s);
  }
  static containsPoint(M, D, e, t) {
    return this.getBarycoord(M, D, e, t, se), se.x >= 0 && se.y >= 0 && se.x + se.y <= 1;
  }
  static getUV(M, D, e, t, i, n, A, z) {
    return WN === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), WN = !0), this.getInterpolation(M, D, e, t, i, n, A, z);
  }
  static getInterpolation(M, D, e, t, i, n, A, z) {
    return this.getBarycoord(M, D, e, t, se), z.setScalar(0), z.addScaledVector(i, se.x), z.addScaledVector(n, se.y), z.addScaledVector(A, se.z), z;
  }
  static isFrontFacing(M, D, e, t) {
    return VD.subVectors(e, D), ge.subVectors(M, D), VD.cross(ge).dot(t) < 0;
  }
  set(M, D, e) {
    return this.a.copy(M), this.b.copy(D), this.c.copy(e), this;
  }
  setFromPointsAndIndices(M, D, e, t) {
    return this.a.copy(M[D]), this.b.copy(M[e]), this.c.copy(M[t]), this;
  }
  setFromAttributeAndIndices(M, D, e, t) {
    return this.a.fromBufferAttribute(M, D), this.b.fromBufferAttribute(M, e), this.c.fromBufferAttribute(M, t), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.a.copy(M.a), this.b.copy(M.b), this.c.copy(M.c), this;
  }
  getArea() {
    return VD.subVectors(this.c, this.b), ge.subVectors(this.a, this.b), VD.cross(ge).length() * 0.5;
  }
  getMidpoint(M) {
    return M.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(M) {
    return et.getNormal(this.a, this.b, this.c, M);
  }
  getPlane(M) {
    return M.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(M, D) {
    return et.getBarycoord(M, this.a, this.b, this.c, D);
  }
  getUV(M, D, e, t, i) {
    return WN === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), WN = !0), et.getInterpolation(M, this.a, this.b, this.c, D, e, t, i);
  }
  getInterpolation(M, D, e, t, i) {
    return et.getInterpolation(M, this.a, this.b, this.c, D, e, t, i);
  }
  containsPoint(M) {
    return et.containsPoint(M, this.a, this.b, this.c);
  }
  isFrontFacing(M) {
    return et.isFrontFacing(this.a, this.b, this.c, M);
  }
  intersectsBox(M) {
    return M.intersectsTriangle(this);
  }
  closestPointToPoint(M, D) {
    const e = this.a, t = this.b, i = this.c;
    let n, A;
    Lt.subVectors(t, e), wt.subVectors(i, e), fA.subVectors(M, e);
    const z = Lt.dot(fA), I = wt.dot(fA);
    if (z <= 0 && I <= 0)
      return D.copy(e);
    mA.subVectors(M, t);
    const T = Lt.dot(mA), u = wt.dot(mA);
    if (T >= 0 && u <= T)
      return D.copy(t);
    const g = z * u - T * I;
    if (g <= 0 && z >= 0 && T <= 0)
      return n = z / (z - T), D.copy(e).addScaledVector(Lt, n);
    QA.subVectors(M, i);
    const s = Lt.dot(QA), a = wt.dot(QA);
    if (a >= 0 && s <= a)
      return D.copy(i);
    const o = s * I - z * a;
    if (o <= 0 && I >= 0 && a <= 0)
      return A = I / (I - a), D.copy(e).addScaledVector(wt, A);
    const c = T * a - s * u;
    if (c <= 0 && u - T >= 0 && s - a >= 0)
      return Xz.subVectors(i, t), A = (u - T) / (u - T + (s - a)), D.copy(t).addScaledVector(Xz, A);
    const r = 1 / (c + o + g);
    return n = o * r, A = g * r, D.copy(e).addScaledVector(Lt, n).addScaledVector(wt, A);
  }
  equals(M) {
    return M.a.equals(this.a) && M.b.equals(this.b) && M.c.equals(this.c);
  }
}, qT = class extends fN {
  constructor(M) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new KM(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Un, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.fog = M.fog, this;
  }
};
const JM = /* @__PURE__ */ new Y(), qN = /* @__PURE__ */ new rM();
let Ne = class {
  constructor(M, D, e = !1) {
    if (Array.isArray(M))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = M, this.itemSize = D, this.count = M !== void 0 ? M.length / D : 0, this.normalized = e, this.usage = Sz, this.updateRange = { offset: 0, count: -1 }, this.gpuType = _e, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
  setUsage(M) {
    return this.usage = M, this;
  }
  copy(M) {
    return this.name = M.name, this.array = new M.array.constructor(M.array), this.itemSize = M.itemSize, this.count = M.count, this.normalized = M.normalized, this.usage = M.usage, this.gpuType = M.gpuType, this;
  }
  copyAt(M, D, e) {
    M *= this.itemSize, e *= D.itemSize;
    for (let t = 0, i = this.itemSize; t < i; t++)
      this.array[M + t] = D.array[e + t];
    return this;
  }
  copyArray(M) {
    return this.array.set(M), this;
  }
  applyMatrix3(M) {
    if (this.itemSize === 2)
      for (let D = 0, e = this.count; D < e; D++)
        qN.fromBufferAttribute(this, D), qN.applyMatrix3(M), this.setXY(D, qN.x, qN.y);
    else if (this.itemSize === 3)
      for (let D = 0, e = this.count; D < e; D++)
        JM.fromBufferAttribute(this, D), JM.applyMatrix3(M), this.setXYZ(D, JM.x, JM.y, JM.z);
    return this;
  }
  applyMatrix4(M) {
    for (let D = 0, e = this.count; D < e; D++)
      JM.fromBufferAttribute(this, D), JM.applyMatrix4(M), this.setXYZ(D, JM.x, JM.y, JM.z);
    return this;
  }
  applyNormalMatrix(M) {
    for (let D = 0, e = this.count; D < e; D++)
      JM.fromBufferAttribute(this, D), JM.applyNormalMatrix(M), this.setXYZ(D, JM.x, JM.y, JM.z);
    return this;
  }
  transformDirection(M) {
    for (let D = 0, e = this.count; D < e; D++)
      JM.fromBufferAttribute(this, D), JM.transformDirection(M), this.setXYZ(D, JM.x, JM.y, JM.z);
    return this;
  }
  set(M, D = 0) {
    return this.array.set(M, D), this;
  }
  getComponent(M, D) {
    let e = this.array[M * this.itemSize + D];
    return this.normalized && (e = zN(e, this.array)), e;
  }
  setComponent(M, D, e) {
    return this.normalized && (e = lD(e, this.array)), this.array[M * this.itemSize + D] = e, this;
  }
  getX(M) {
    let D = this.array[M * this.itemSize];
    return this.normalized && (D = zN(D, this.array)), D;
  }
  setX(M, D) {
    return this.normalized && (D = lD(D, this.array)), this.array[M * this.itemSize] = D, this;
  }
  getY(M) {
    let D = this.array[M * this.itemSize + 1];
    return this.normalized && (D = zN(D, this.array)), D;
  }
  setY(M, D) {
    return this.normalized && (D = lD(D, this.array)), this.array[M * this.itemSize + 1] = D, this;
  }
  getZ(M) {
    let D = this.array[M * this.itemSize + 2];
    return this.normalized && (D = zN(D, this.array)), D;
  }
  setZ(M, D) {
    return this.normalized && (D = lD(D, this.array)), this.array[M * this.itemSize + 2] = D, this;
  }
  getW(M) {
    let D = this.array[M * this.itemSize + 3];
    return this.normalized && (D = zN(D, this.array)), D;
  }
  setW(M, D) {
    return this.normalized && (D = lD(D, this.array)), this.array[M * this.itemSize + 3] = D, this;
  }
  setXY(M, D, e) {
    return M *= this.itemSize, this.normalized && (D = lD(D, this.array), e = lD(e, this.array)), this.array[M + 0] = D, this.array[M + 1] = e, this;
  }
  setXYZ(M, D, e, t) {
    return M *= this.itemSize, this.normalized && (D = lD(D, this.array), e = lD(e, this.array), t = lD(t, this.array)), this.array[M + 0] = D, this.array[M + 1] = e, this.array[M + 2] = t, this;
  }
  setXYZW(M, D, e, t, i) {
    return M *= this.itemSize, this.normalized && (D = lD(D, this.array), e = lD(e, this.array), t = lD(t, this.array), i = lD(i, this.array)), this.array[M + 0] = D, this.array[M + 1] = e, this.array[M + 2] = t, this.array[M + 3] = i, this;
  }
  onUpload(M) {
    return this.onUploadCallback = M, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const M = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (M.name = this.name), this.usage !== Sz && (M.usage = this.usage), (this.updateRange.offset !== 0 || this.updateRange.count !== -1) && (M.updateRange = this.updateRange), M;
  }
}, $T = class extends Ne {
  constructor(M, D, e) {
    super(new Uint16Array(M), D, e);
  }
}, JT = class extends Ne {
  constructor(M, D, e) {
    super(new Uint32Array(M), D, e);
  }
}, ie = class extends Ne {
  constructor(M, D, e) {
    super(new Float32Array(M), D, e);
  }
}, Es = 0;
const _D = /* @__PURE__ */ new ID(), SA = /* @__PURE__ */ new YD(), Ot = /* @__PURE__ */ new Y(), mD = /* @__PURE__ */ new NN(), gN = /* @__PURE__ */ new NN(), iD = /* @__PURE__ */ new Y();
let iN = class Mu extends tN {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Es++ }), this.uuid = eN(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(M) {
    return Array.isArray(M) ? this.index = new (GT(M) ? JT : $T)(M, 1) : this.index = M, this;
  }
  getAttribute(M) {
    return this.attributes[M];
  }
  setAttribute(M, D) {
    return this.attributes[M] = D, this;
  }
  deleteAttribute(M) {
    return delete this.attributes[M], this;
  }
  hasAttribute(M) {
    return this.attributes[M] !== void 0;
  }
  addGroup(M, D, e = 0) {
    this.groups.push({
      start: M,
      count: D,
      materialIndex: e
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(M, D) {
    this.drawRange.start = M, this.drawRange.count = D;
  }
  applyMatrix4(M) {
    const D = this.attributes.position;
    D !== void 0 && (D.applyMatrix4(M), D.needsUpdate = !0);
    const e = this.attributes.normal;
    if (e !== void 0) {
      const i = new kM().getNormalMatrix(M);
      e.applyNormalMatrix(i), e.needsUpdate = !0;
    }
    const t = this.attributes.tangent;
    return t !== void 0 && (t.transformDirection(M), t.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(M) {
    return _D.makeRotationFromQuaternion(M), this.applyMatrix4(_D), this;
  }
  rotateX(M) {
    return _D.makeRotationX(M), this.applyMatrix4(_D), this;
  }
  rotateY(M) {
    return _D.makeRotationY(M), this.applyMatrix4(_D), this;
  }
  rotateZ(M) {
    return _D.makeRotationZ(M), this.applyMatrix4(_D), this;
  }
  translate(M, D, e) {
    return _D.makeTranslation(M, D, e), this.applyMatrix4(_D), this;
  }
  scale(M, D, e) {
    return _D.makeScale(M, D, e), this.applyMatrix4(_D), this;
  }
  lookAt(M) {
    return SA.lookAt(M), SA.updateMatrix(), this.applyMatrix4(SA.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Ot).negate(), this.translate(Ot.x, Ot.y, Ot.z), this;
  }
  setFromPoints(M) {
    const D = [];
    for (let e = 0, t = M.length; e < t; e++) {
      const i = M[e];
      D.push(i.x, i.y, i.z || 0);
    }
    return this.setAttribute("position", new ie(D, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new NN());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(
        new Y(-1 / 0, -1 / 0, -1 / 0),
        new Y(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (M !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(M), D)
        for (let e = 0, t = D.length; e < t; e++) {
          const i = D[e];
          mD.setFromBufferAttribute(i), this.morphTargetsRelative ? (iD.addVectors(this.boundingBox.min, mD.min), this.boundingBox.expandByPoint(iD), iD.addVectors(this.boundingBox.max, mD.max), this.boundingBox.expandByPoint(iD)) : (this.boundingBox.expandByPoint(mD.min), this.boundingBox.expandByPoint(mD.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Qn());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new Y(), 1 / 0);
      return;
    }
    if (M) {
      const e = this.boundingSphere.center;
      if (mD.setFromBufferAttribute(M), D)
        for (let i = 0, n = D.length; i < n; i++) {
          const A = D[i];
          gN.setFromBufferAttribute(A), this.morphTargetsRelative ? (iD.addVectors(mD.min, gN.min), mD.expandByPoint(iD), iD.addVectors(mD.max, gN.max), mD.expandByPoint(iD)) : (mD.expandByPoint(gN.min), mD.expandByPoint(gN.max));
        }
      mD.getCenter(e);
      let t = 0;
      for (let i = 0, n = M.count; i < n; i++)
        iD.fromBufferAttribute(M, i), t = Math.max(t, e.distanceToSquared(iD));
      if (D)
        for (let i = 0, n = D.length; i < n; i++) {
          const A = D[i], z = this.morphTargetsRelative;
          for (let I = 0, T = A.count; I < T; I++)
            iD.fromBufferAttribute(A, I), z && (Ot.fromBufferAttribute(M, I), iD.add(Ot)), t = Math.max(t, e.distanceToSquared(iD));
        }
      this.boundingSphere.radius = Math.sqrt(t), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const M = this.index, D = this.attributes;
    if (M === null || D.position === void 0 || D.normal === void 0 || D.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const e = M.array, t = D.position.array, i = D.normal.array, n = D.uv.array, A = t.length / 3;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Ne(new Float32Array(4 * A), 4));
    const z = this.getAttribute("tangent").array, I = [], T = [];
    for (let x = 0; x < A; x++)
      I[x] = new Y(), T[x] = new Y();
    const u = new Y(), g = new Y(), s = new Y(), a = new rM(), o = new rM(), c = new rM(), r = new Y(), w = new Y();
    function y(x, R, B) {
      u.fromArray(t, x * 3), g.fromArray(t, R * 3), s.fromArray(t, B * 3), a.fromArray(n, x * 2), o.fromArray(n, R * 2), c.fromArray(n, B * 2), g.sub(u), s.sub(u), o.sub(a), c.sub(a);
      const H = 1 / (o.x * c.y - c.x * o.y);
      isFinite(H) && (r.copy(g).multiplyScalar(c.y).addScaledVector(s, -o.y).multiplyScalar(H), w.copy(s).multiplyScalar(o.x).addScaledVector(g, -c.x).multiplyScalar(H), I[x].add(r), I[R].add(r), I[B].add(r), T[x].add(w), T[R].add(w), T[B].add(w));
    }
    let j = this.groups;
    j.length === 0 && (j = [{
      start: 0,
      count: e.length
    }]);
    for (let x = 0, R = j.length; x < R; ++x) {
      const B = j[x], H = B.start, p = B.count;
      for (let k = H, V = H + p; k < V; k += 3)
        y(
          e[k + 0],
          e[k + 1],
          e[k + 2]
        );
    }
    const l = new Y(), d = new Y(), h = new Y(), Z = new Y();
    function L(x) {
      h.fromArray(i, x * 3), Z.copy(h);
      const R = I[x];
      l.copy(R), l.sub(h.multiplyScalar(h.dot(R))).normalize(), d.crossVectors(Z, R);
      const H = d.dot(T[x]) < 0 ? -1 : 1;
      z[x * 4] = l.x, z[x * 4 + 1] = l.y, z[x * 4 + 2] = l.z, z[x * 4 + 3] = H;
    }
    for (let x = 0, R = j.length; x < R; ++x) {
      const B = j[x], H = B.start, p = B.count;
      for (let k = H, V = H + p; k < V; k += 3)
        L(e[k + 0]), L(e[k + 1]), L(e[k + 2]);
    }
  }
  computeVertexNormals() {
    const M = this.index, D = this.getAttribute("position");
    if (D !== void 0) {
      let e = this.getAttribute("normal");
      if (e === void 0)
        e = new Ne(new Float32Array(D.count * 3), 3), this.setAttribute("normal", e);
      else
        for (let g = 0, s = e.count; g < s; g++)
          e.setXYZ(g, 0, 0, 0);
      const t = new Y(), i = new Y(), n = new Y(), A = new Y(), z = new Y(), I = new Y(), T = new Y(), u = new Y();
      if (M)
        for (let g = 0, s = M.count; g < s; g += 3) {
          const a = M.getX(g + 0), o = M.getX(g + 1), c = M.getX(g + 2);
          t.fromBufferAttribute(D, a), i.fromBufferAttribute(D, o), n.fromBufferAttribute(D, c), T.subVectors(n, i), u.subVectors(t, i), T.cross(u), A.fromBufferAttribute(e, a), z.fromBufferAttribute(e, o), I.fromBufferAttribute(e, c), A.add(T), z.add(T), I.add(T), e.setXYZ(a, A.x, A.y, A.z), e.setXYZ(o, z.x, z.y, z.z), e.setXYZ(c, I.x, I.y, I.z);
        }
      else
        for (let g = 0, s = D.count; g < s; g += 3)
          t.fromBufferAttribute(D, g + 0), i.fromBufferAttribute(D, g + 1), n.fromBufferAttribute(D, g + 2), T.subVectors(n, i), u.subVectors(t, i), T.cross(u), e.setXYZ(g + 0, T.x, T.y, T.z), e.setXYZ(g + 1, T.x, T.y, T.z), e.setXYZ(g + 2, T.x, T.y, T.z);
      this.normalizeNormals(), e.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const M = this.attributes.normal;
    for (let D = 0, e = M.count; D < e; D++)
      iD.fromBufferAttribute(M, D), iD.normalize(), M.setXYZ(D, iD.x, iD.y, iD.z);
  }
  toNonIndexed() {
    function M(A, z) {
      const I = A.array, T = A.itemSize, u = A.normalized, g = new I.constructor(z.length * T);
      let s = 0, a = 0;
      for (let o = 0, c = z.length; o < c; o++) {
        A.isInterleavedBufferAttribute ? s = z[o] * A.data.stride + A.offset : s = z[o] * T;
        for (let r = 0; r < T; r++)
          g[a++] = I[s++];
      }
      return new Ne(g, T, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const D = new Mu(), e = this.index.array, t = this.attributes;
    for (const A in t) {
      const z = t[A], I = M(z, e);
      D.setAttribute(A, I);
    }
    const i = this.morphAttributes;
    for (const A in i) {
      const z = [], I = i[A];
      for (let T = 0, u = I.length; T < u; T++) {
        const g = I[T], s = M(g, e);
        z.push(s);
      }
      D.morphAttributes[A] = z;
    }
    D.morphTargetsRelative = this.morphTargetsRelative;
    const n = this.groups;
    for (let A = 0, z = n.length; A < z; A++) {
      const I = n[A];
      D.addGroup(I.start, I.count, I.materialIndex);
    }
    return D;
  }
  toJSON() {
    const M = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (M.uuid = this.uuid, M.type = this.type, this.name !== "" && (M.name = this.name), Object.keys(this.userData).length > 0 && (M.userData = this.userData), this.parameters !== void 0) {
      const z = this.parameters;
      for (const I in z)
        z[I] !== void 0 && (M[I] = z[I]);
      return M;
    }
    M.data = { attributes: {} };
    const D = this.index;
    D !== null && (M.data.index = {
      type: D.array.constructor.name,
      array: Array.prototype.slice.call(D.array)
    });
    const e = this.attributes;
    for (const z in e) {
      const I = e[z];
      M.data.attributes[z] = I.toJSON(M.data);
    }
    const t = {};
    let i = !1;
    for (const z in this.morphAttributes) {
      const I = this.morphAttributes[z], T = [];
      for (let u = 0, g = I.length; u < g; u++) {
        const s = I[u];
        T.push(s.toJSON(M.data));
      }
      T.length > 0 && (t[z] = T, i = !0);
    }
    i && (M.data.morphAttributes = t, M.data.morphTargetsRelative = this.morphTargetsRelative);
    const n = this.groups;
    n.length > 0 && (M.data.groups = JSON.parse(JSON.stringify(n)));
    const A = this.boundingSphere;
    return A !== null && (M.data.boundingSphere = {
      center: A.center.toArray(),
      radius: A.radius
    }), M;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const D = {};
    this.name = M.name;
    const e = M.index;
    e !== null && this.setIndex(e.clone(D));
    const t = M.attributes;
    for (const I in t) {
      const T = t[I];
      this.setAttribute(I, T.clone(D));
    }
    const i = M.morphAttributes;
    for (const I in i) {
      const T = [], u = i[I];
      for (let g = 0, s = u.length; g < s; g++)
        T.push(u[g].clone(D));
      this.morphAttributes[I] = T;
    }
    this.morphTargetsRelative = M.morphTargetsRelative;
    const n = M.groups;
    for (let I = 0, T = n.length; I < T; I++) {
      const u = n[I];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const A = M.boundingBox;
    A !== null && (this.boundingBox = A.clone());
    const z = M.boundingSphere;
    return z !== null && (this.boundingSphere = z.clone()), this.drawRange.start = M.drawRange.start, this.drawRange.count = M.drawRange.count, this.userData = M.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
};
const qz = /* @__PURE__ */ new ID(), qe = /* @__PURE__ */ new xs(), $N = /* @__PURE__ */ new Qn(), $z = /* @__PURE__ */ new Y(), xt = /* @__PURE__ */ new Y(), Et = /* @__PURE__ */ new Y(), lt = /* @__PURE__ */ new Y(), kA = /* @__PURE__ */ new Y(), JN = /* @__PURE__ */ new Y(), Mi = /* @__PURE__ */ new rM(), Di = /* @__PURE__ */ new rM(), ei = /* @__PURE__ */ new rM(), Jz = /* @__PURE__ */ new Y(), MI = /* @__PURE__ */ new Y(), DI = /* @__PURE__ */ new Y(), ti = /* @__PURE__ */ new Y(), Ni = /* @__PURE__ */ new Y();
let te = class extends YD {
  constructor(M = new iN(), D = new qT()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), M.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = M.morphTargetInfluences.slice()), M.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, M.morphTargetDictionary)), this.material = Array.isArray(M.material) ? M.material.slice() : M.material, this.geometry = M.geometry, this;
  }
  updateMorphTargets() {
    const D = this.geometry.morphAttributes, e = Object.keys(D);
    if (e.length > 0) {
      const t = D[e[0]];
      if (t !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, n = t.length; i < n; i++) {
          const A = t[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = i;
        }
      }
    }
  }
  getVertexPosition(M, D) {
    const e = this.geometry, t = e.attributes.position, i = e.morphAttributes.position, n = e.morphTargetsRelative;
    D.fromBufferAttribute(t, M);
    const A = this.morphTargetInfluences;
    if (i && A) {
      JN.set(0, 0, 0);
      for (let z = 0, I = i.length; z < I; z++) {
        const T = A[z], u = i[z];
        T !== 0 && (kA.fromBufferAttribute(u, M), n ? JN.addScaledVector(kA, T) : JN.addScaledVector(kA.sub(D), T));
      }
      D.add(JN);
    }
    return D;
  }
  raycast(M, D) {
    const e = this.geometry, t = this.material, i = this.matrixWorld;
    t !== void 0 && (e.boundingSphere === null && e.computeBoundingSphere(), $N.copy(e.boundingSphere), $N.applyMatrix4(i), qe.copy(M.ray).recast(M.near), !($N.containsPoint(qe.origin) === !1 && (qe.intersectSphere($N, $z) === null || qe.origin.distanceToSquared($z) > (M.far - M.near) ** 2)) && (qz.copy(i).invert(), qe.copy(M.ray).applyMatrix4(qz), !(e.boundingBox !== null && qe.intersectsBox(e.boundingBox) === !1) && this._computeIntersections(M, D, qe)));
  }
  _computeIntersections(M, D, e) {
    let t;
    const i = this.geometry, n = this.material, A = i.index, z = i.attributes.position, I = i.attributes.uv, T = i.attributes.uv1, u = i.attributes.normal, g = i.groups, s = i.drawRange;
    if (A !== null)
      if (Array.isArray(n))
        for (let a = 0, o = g.length; a < o; a++) {
          const c = g[a], r = n[c.materialIndex], w = Math.max(c.start, s.start), y = Math.min(A.count, Math.min(c.start + c.count, s.start + s.count));
          for (let j = w, l = y; j < l; j += 3) {
            const d = A.getX(j), h = A.getX(j + 1), Z = A.getX(j + 2);
            t = ii(this, r, M, e, I, T, u, d, h, Z), t && (t.faceIndex = Math.floor(j / 3), t.face.materialIndex = c.materialIndex, D.push(t));
          }
        }
      else {
        const a = Math.max(0, s.start), o = Math.min(A.count, s.start + s.count);
        for (let c = a, r = o; c < r; c += 3) {
          const w = A.getX(c), y = A.getX(c + 1), j = A.getX(c + 2);
          t = ii(this, n, M, e, I, T, u, w, y, j), t && (t.faceIndex = Math.floor(c / 3), D.push(t));
        }
      }
    else if (z !== void 0)
      if (Array.isArray(n))
        for (let a = 0, o = g.length; a < o; a++) {
          const c = g[a], r = n[c.materialIndex], w = Math.max(c.start, s.start), y = Math.min(z.count, Math.min(c.start + c.count, s.start + s.count));
          for (let j = w, l = y; j < l; j += 3) {
            const d = j, h = j + 1, Z = j + 2;
            t = ii(this, r, M, e, I, T, u, d, h, Z), t && (t.faceIndex = Math.floor(j / 3), t.face.materialIndex = c.materialIndex, D.push(t));
          }
        }
      else {
        const a = Math.max(0, s.start), o = Math.min(z.count, s.start + s.count);
        for (let c = a, r = o; c < r; c += 3) {
          const w = c, y = c + 1, j = c + 2;
          t = ii(this, n, M, e, I, T, u, w, y, j), t && (t.faceIndex = Math.floor(c / 3), D.push(t));
        }
      }
  }
};
function ls(N, M, D, e, t, i, n, A) {
  let z;
  if (M.side === pD ? z = e.intersectTriangle(n, i, t, !0, A) : z = e.intersectTriangle(t, i, n, M.side === Pe, A), z === null)
    return null;
  Ni.copy(A), Ni.applyMatrix4(N.matrixWorld);
  const I = D.ray.origin.distanceTo(Ni);
  return I < D.near || I > D.far ? null : {
    distance: I,
    point: Ni.clone(),
    object: N
  };
}
function ii(N, M, D, e, t, i, n, A, z, I) {
  N.getVertexPosition(A, xt), N.getVertexPosition(z, Et), N.getVertexPosition(I, lt);
  const T = ls(N, M, D, e, xt, Et, lt, ti);
  if (T) {
    t && (Mi.fromBufferAttribute(t, A), Di.fromBufferAttribute(t, z), ei.fromBufferAttribute(t, I), T.uv = XN.getInterpolation(ti, xt, Et, lt, Mi, Di, ei, new rM())), i && (Mi.fromBufferAttribute(i, A), Di.fromBufferAttribute(i, z), ei.fromBufferAttribute(i, I), T.uv1 = XN.getInterpolation(ti, xt, Et, lt, Mi, Di, ei, new rM()), T.uv2 = T.uv1), n && (Jz.fromBufferAttribute(n, A), MI.fromBufferAttribute(n, z), DI.fromBufferAttribute(n, I), T.normal = XN.getInterpolation(ti, xt, Et, lt, Jz, MI, DI, new Y()), T.normal.dot(e.direction) > 0 && T.normal.multiplyScalar(-1));
    const u = {
      a: A,
      b: z,
      c: I,
      normal: new Y(),
      materialIndex: 0
    };
    XN.getNormal(xt, Et, lt, u.normal), T.face = u;
  }
  return T;
}
function Du() {
  let N = null, M = !1, D = null, e = null;
  function t(i, n) {
    D(i, n), e = N.requestAnimationFrame(t);
  }
  return {
    start: function() {
      M !== !0 && D !== null && (e = N.requestAnimationFrame(t), M = !0);
    },
    stop: function() {
      N.cancelAnimationFrame(e), M = !1;
    },
    setAnimationLoop: function(i) {
      D = i;
    },
    setContext: function(i) {
      N = i;
    }
  };
}
function hs(N, M) {
  const D = M.isWebGL2, e = /* @__PURE__ */ new WeakMap();
  function t(I, T) {
    const u = I.array, g = I.usage, s = N.createBuffer();
    N.bindBuffer(T, s), N.bufferData(T, u, g), I.onUploadCallback();
    let a;
    if (u instanceof Float32Array)
      a = N.FLOAT;
    else if (u instanceof Uint16Array)
      if (I.isFloat16BufferAttribute)
        if (D)
          a = N.HALF_FLOAT;
        else
          throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
      else
        a = N.UNSIGNED_SHORT;
    else if (u instanceof Int16Array)
      a = N.SHORT;
    else if (u instanceof Uint32Array)
      a = N.UNSIGNED_INT;
    else if (u instanceof Int32Array)
      a = N.INT;
    else if (u instanceof Int8Array)
      a = N.BYTE;
    else if (u instanceof Uint8Array)
      a = N.UNSIGNED_BYTE;
    else if (u instanceof Uint8ClampedArray)
      a = N.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + u);
    return {
      buffer: s,
      type: a,
      bytesPerElement: u.BYTES_PER_ELEMENT,
      version: I.version
    };
  }
  function i(I, T, u) {
    const g = T.array, s = T.updateRange;
    N.bindBuffer(u, I), s.count === -1 ? N.bufferSubData(u, 0, g) : (D ? N.bufferSubData(
      u,
      s.offset * g.BYTES_PER_ELEMENT,
      g,
      s.offset,
      s.count
    ) : N.bufferSubData(
      u,
      s.offset * g.BYTES_PER_ELEMENT,
      g.subarray(s.offset, s.offset + s.count)
    ), s.count = -1), T.onUploadCallback();
  }
  function n(I) {
    return I.isInterleavedBufferAttribute && (I = I.data), e.get(I);
  }
  function A(I) {
    I.isInterleavedBufferAttribute && (I = I.data);
    const T = e.get(I);
    T && (N.deleteBuffer(T.buffer), e.delete(I));
  }
  function z(I, T) {
    if (I.isGLBufferAttribute) {
      const g = e.get(I);
      (!g || g.version < I.version) && e.set(I, {
        buffer: I.buffer,
        type: I.type,
        bytesPerElement: I.elementSize,
        version: I.version
      });
      return;
    }
    I.isInterleavedBufferAttribute && (I = I.data);
    const u = e.get(I);
    u === void 0 ? e.set(I, t(I, T)) : u.version < I.version && (i(u.buffer, I, T), u.version = I.version);
  }
  return {
    get: n,
    remove: A,
    update: z
  };
}
class mN extends iN {
  constructor(M = 1, D = 1, e = 1, t = 1, i = 1, n = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: M,
      height: D,
      depth: e,
      widthSegments: t,
      heightSegments: i,
      depthSegments: n
    };
    const A = this;
    t = Math.floor(t), i = Math.floor(i), n = Math.floor(n);
    const z = [], I = [], T = [], u = [];
    let g = 0, s = 0;
    a("z", "y", "x", -1, -1, e, D, M, n, i, 0), a("z", "y", "x", 1, -1, e, D, -M, n, i, 1), a("x", "z", "y", 1, 1, M, e, D, t, n, 2), a("x", "z", "y", 1, -1, M, e, -D, t, n, 3), a("x", "y", "z", 1, -1, M, D, e, t, i, 4), a("x", "y", "z", -1, -1, M, D, -e, t, i, 5), this.setIndex(z), this.setAttribute("position", new ie(I, 3)), this.setAttribute("normal", new ie(T, 3)), this.setAttribute("uv", new ie(u, 2));
    function a(o, c, r, w, y, j, l, d, h, Z, L) {
      const x = j / h, R = l / Z, B = j / 2, H = l / 2, p = d / 2, k = h + 1, V = Z + 1;
      let F = 0, $ = 0;
      const W = new Y();
      for (let G = 0; G < V; G++) {
        const U = G * R - H;
        for (let K = 0; K < k; K++) {
          const nM = K * x - B;
          W[o] = nM * w, W[c] = U * y, W[r] = p, I.push(W.x, W.y, W.z), W[o] = 0, W[c] = 0, W[r] = d > 0 ? 1 : -1, T.push(W.x, W.y, W.z), u.push(K / h), u.push(1 - G / Z), F += 1;
        }
      }
      for (let G = 0; G < Z; G++)
        for (let U = 0; U < h; U++) {
          const K = g + U + k * G, nM = g + U + k * (G + 1), zM = g + (U + 1) + k * (G + 1), gM = g + (U + 1) + k * G;
          z.push(K, nM, gM), z.push(nM, zM, gM), $ += 6;
        }
      A.addGroup(s, $, L), s += $, g += F;
    }
  }
  copy(M) {
    return super.copy(M), this.parameters = Object.assign({}, M.parameters), this;
  }
  static fromJSON(M) {
    return new mN(M.width, M.height, M.depth, M.widthSegments, M.heightSegments, M.depthSegments);
  }
}
class Zn extends iN {
  constructor(M = 1, D = 1, e = 1, t = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: M,
      height: D,
      widthSegments: e,
      heightSegments: t
    };
    const i = M / 2, n = D / 2, A = Math.floor(e), z = Math.floor(t), I = A + 1, T = z + 1, u = M / A, g = D / z, s = [], a = [], o = [], c = [];
    for (let r = 0; r < T; r++) {
      const w = r * g - n;
      for (let y = 0; y < I; y++) {
        const j = y * u - i;
        a.push(j, -w, 0), o.push(0, 0, 1), c.push(y / A), c.push(1 - r / z);
      }
    }
    for (let r = 0; r < z; r++)
      for (let w = 0; w < A; w++) {
        const y = w + I * r, j = w + I * (r + 1), l = w + 1 + I * (r + 1), d = w + 1 + I * r;
        s.push(y, j, d), s.push(j, l, d);
      }
    this.setIndex(s), this.setAttribute("position", new ie(a, 3)), this.setAttribute("normal", new ie(o, 3)), this.setAttribute("uv", new ie(c, 2));
  }
  copy(M) {
    return super.copy(M), this.parameters = Object.assign({}, M.parameters), this;
  }
  static fromJSON(M) {
    return new Zn(M.width, M.height, M.widthSegments, M.heightSegments);
  }
}
function Jt(N) {
  const M = {};
  for (const D in N) {
    M[D] = {};
    for (const e in N[D]) {
      const t = N[D][e];
      t && (t.isColor || t.isMatrix3 || t.isMatrix4 || t.isVector2 || t.isVector3 || t.isVector4 || t.isTexture || t.isQuaternion) ? t.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), M[D][e] = null) : M[D][e] = t.clone() : Array.isArray(t) ? M[D][e] = t.slice() : M[D][e] = t;
    }
  }
  return M;
}
function LD(N) {
  const M = {};
  for (let D = 0; D < N.length; D++) {
    const e = Jt(N[D]);
    for (const t in e)
      M[t] = e[t];
  }
  return M;
}
function ds(N) {
  const M = [];
  for (let D = 0; D < N.length; D++)
    M.push(N[D].clone());
  return M;
}
function eu(N) {
  return N.getRenderTarget() === null ? N.outputColorSpace : PM.workingColorSpace;
}
const vs = { clone: Jt, merge: LD }, ps = (
  /* glsl */
  `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
), Ys = (
  /* glsl */
  `
void main() {
  gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`
);
class It extends fN {
  constructor(M) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = ps, this.fragmentShader = Ys, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      derivatives: !1,
      // set to use derivatives
      fragDepth: !1,
      // set to use fragment depth values
      drawBuffers: !1,
      // set to use draw buffers
      shaderTextureLOD: !1
      // set to use shader texture LOD
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, M !== void 0 && this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.fragmentShader = M.fragmentShader, this.vertexShader = M.vertexShader, this.uniforms = Jt(M.uniforms), this.uniformsGroups = ds(M.uniformsGroups), this.defines = Object.assign({}, M.defines), this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.fog = M.fog, this.lights = M.lights, this.clipping = M.clipping, this.extensions = Object.assign({}, M.extensions), this.glslVersion = M.glslVersion, this;
  }
  toJSON(M) {
    const D = super.toJSON(M);
    D.glslVersion = this.glslVersion, D.uniforms = {};
    for (const t in this.uniforms) {
      const n = this.uniforms[t].value;
      n && n.isTexture ? D.uniforms[t] = {
        type: "t",
        value: n.toJSON(M).uuid
      } : n && n.isColor ? D.uniforms[t] = {
        type: "c",
        value: n.getHex()
      } : n && n.isVector2 ? D.uniforms[t] = {
        type: "v2",
        value: n.toArray()
      } : n && n.isVector3 ? D.uniforms[t] = {
        type: "v3",
        value: n.toArray()
      } : n && n.isVector4 ? D.uniforms[t] = {
        type: "v4",
        value: n.toArray()
      } : n && n.isMatrix3 ? D.uniforms[t] = {
        type: "m3",
        value: n.toArray()
      } : n && n.isMatrix4 ? D.uniforms[t] = {
        type: "m4",
        value: n.toArray()
      } : D.uniforms[t] = {
        value: n
      };
    }
    Object.keys(this.defines).length > 0 && (D.defines = this.defines), D.vertexShader = this.vertexShader, D.fragmentShader = this.fragmentShader, D.lights = this.lights, D.clipping = this.clipping;
    const e = {};
    for (const t in this.extensions)
      this.extensions[t] === !0 && (e[t] = !0);
    return Object.keys(e).length > 0 && (D.extensions = e), D;
  }
}
const Us = (
  /* glsl */
  `
#ifdef USE_ALPHAHASH

  if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;

#endif
`
), fs = (
  /* glsl */
  `
#ifdef USE_ALPHAHASH

  /**
   * See: https://casual-effects.com/research/Wyman2017Hashed/index.html
   */

  const float ALPHA_HASH_SCALE = 0.05; // Derived from trials only, and may be changed.

  float hash2D( vec2 value ) {

    return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );

  }

  float hash3D( vec3 value ) {

    return hash2D( vec2( hash2D( value.xy ), value.z ) );

  }

  float getAlphaHashThreshold( vec3 position ) {

    // Find the discretized derivatives of our coordinates
    float maxDeriv = max(
      length( dFdx( position.xyz ) ),
      length( dFdy( position.xyz ) )
    );
    float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );

    // Find two nearest log-discretized noise scales
    vec2 pixScales = vec2(
      exp2( floor( log2( pixScale ) ) ),
      exp2( ceil( log2( pixScale ) ) )
    );

    // Compute alpha thresholds at our two noise scales
    vec2 alpha = vec2(
      hash3D( floor( pixScales.x * position.xyz ) ),
      hash3D( floor( pixScales.y * position.xyz ) )
    );

    // Factor to interpolate lerp with
    float lerpFactor = fract( log2( pixScale ) );

    // Interpolate alpha threshold from noise at two scales
    float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;

    // Pass into CDF to compute uniformly distrib threshold
    float a = min( lerpFactor, 1.0 - lerpFactor );
    vec3 cases = vec3(
      x * x / ( 2.0 * a * ( 1.0 - a ) ),
      ( x - 0.5 * a ) / ( 1.0 - a ),
      1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
    );

    // Find our final, uniformly distributed alpha threshold (ατ)
    float threshold = ( x < ( 1.0 - a ) )
      ? ( ( x < a ) ? cases.x : cases.y )
      : cases.z;

    // Avoids ατ == 0. Could also do ατ =1-ατ
    return clamp( threshold , 1.0e-6, 1.0 );

  }

#endif
`
), ms = (
  /* glsl */
  `
#ifdef USE_ALPHAMAP

  diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;

#endif
`
), Qs = (
  /* glsl */
  `
#ifdef USE_ALPHAMAP

  uniform sampler2D alphaMap;

#endif
`
), Ss = (
  /* glsl */
  `
#ifdef USE_ALPHATEST

  if ( diffuseColor.a < alphaTest ) discard;

#endif
`
), ks = (
  /* glsl */
  `
#ifdef USE_ALPHATEST
  uniform float alphaTest;
#endif
`
), Zs = (
  /* glsl */
  `
#ifdef USE_AOMAP

  // reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
  float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;

  reflectedLight.indirectDiffuse *= ambientOcclusion;

  #if defined( USE_ENVMAP ) && defined( STANDARD )

    float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );

    reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

  #endif

#endif
`
), _s = (
  /* glsl */
  `
#ifdef USE_AOMAP

  uniform sampler2D aoMap;
  uniform float aoMapIntensity;

#endif
`
), bs = (
  /* glsl */
  `
vec3 transformed = vec3( position );

#ifdef USE_ALPHAHASH

  vPosition = vec3( position );

#endif
`
), Ks = (
  /* glsl */
  `
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

  vec3 objectTangent = vec3( tangent.xyz );

#endif
`
), Rs = (
  /* glsl */
  `

float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

  // geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
  return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {

  return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

}

vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {

  vec3 halfDir = normalize( lightDir + viewDir );

  float dotNH = saturate( dot( normal, halfDir ) );
  float dotVH = saturate( dot( viewDir, halfDir ) );

  vec3 F = F_Schlick( specularColor, 1.0, dotVH );

  float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

  float D = D_BlinnPhong( shininess, dotNH );

  return F * ( G * D );

} // validated

`
), Ps = (
  /* glsl */
  `

#ifdef USE_IRIDESCENCE

  // XYZ to linear-sRGB color space
  const mat3 XYZ_TO_REC709 = mat3(
    3.2404542, -0.9692660,  0.0556434,
    -1.5371385,  1.8760108, -0.2040259,
    -0.4985314,  0.0415560,  1.0572252
  );

  // Assume air interface for top
  // Note: We don't handle the case fresnel0 == 1
  vec3 Fresnel0ToIor( vec3 fresnel0 ) {

    vec3 sqrtF0 = sqrt( fresnel0 );
    return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

  }

  // Conversion FO/IOR
  vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {

    return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

  }

  // ior is a value between 1.0 and 3.0. 1.0 is air interface
  float IorToFresnel0( float transmittedIor, float incidentIor ) {

    return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));

  }

  // Fresnel equations for dielectric/dielectric interfaces.
  // Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
  // Evaluation XYZ sensitivity curves in Fourier space
  vec3 evalSensitivity( float OPD, vec3 shift ) {

    float phase = 2.0 * PI * OPD * 1.0e-9;
    vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
    vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
    vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

    vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
    xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
    xyz /= 1.0685e-7;

    vec3 rgb = XYZ_TO_REC709 * xyz;
    return rgb;

  }

  vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

    vec3 I;

    // Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0
    float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
    // Evaluate the cosTheta on the base layer (Snell law)
    float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );

    // Handle TIR:
    float cosTheta2Sq = 1.0 - sinTheta2Sq;
    if ( cosTheta2Sq < 0.0 ) {

      return vec3( 1.0 );

    }

    float cosTheta2 = sqrt( cosTheta2Sq );

    // First interface
    float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
    float R12 = F_Schlick( R0, 1.0, cosTheta1 );
    float T121 = 1.0 - R12;
    float phi12 = 0.0;
    if ( iridescenceIOR < outsideIOR ) phi12 = PI;
    float phi21 = PI - phi12;

    // Second interface
    vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
    vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
    vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
    vec3 phi23 = vec3( 0.0 );
    if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
    if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
    if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;

    // Phase shift
    float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
    vec3 phi = vec3( phi21 ) + phi23;

    // Compound terms
    vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
    vec3 r123 = sqrt( R123 );
    vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

    // Reflectance term for m = 0 (DC term amplitude)
    vec3 C0 = R12 + Rs;
    I = C0;

    // Reflectance term for m > 0 (pairs of diracs)
    vec3 Cm = Rs - T121;
    for ( int m = 1; m <= 2; ++ m ) {

      Cm *= r123;
      vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
      I += Cm * Sm;

    }

    // Since out of gamut colors might be produced, negative color values are clamped to 0.
    return max( I, vec3( 0.0 ) );

  }

#endif

`
), Fs = (
  /* glsl */
  `
#ifdef USE_BUMPMAP

  uniform sampler2D bumpMap;
  uniform float bumpScale;

  // Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
  // https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

  // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

  vec2 dHdxy_fwd() {

    vec2 dSTdx = dFdx( vBumpMapUv );
    vec2 dSTdy = dFdy( vBumpMapUv );

    float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
    float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
    float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;

    return vec2( dBx, dBy );

  }

  vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

    vec3 vSigmaX = dFdx( surf_pos.xyz );
    vec3 vSigmaY = dFdy( surf_pos.xyz );
    vec3 vN = surf_norm; // normalized

    vec3 R1 = cross( vSigmaY, vN );
    vec3 R2 = cross( vN, vSigmaX );

    float fDet = dot( vSigmaX, R1 ) * faceDirection;

    vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
    return normalize( abs( fDet ) * surf_norm - vGrad );

  }

#endif
`
), Bs = (
  /* glsl */
  `
#if NUM_CLIPPING_PLANES > 0

  vec4 plane;

  #pragma unroll_loop_start
  for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

    plane = clippingPlanes[ i ];
    if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;

  }
  #pragma unroll_loop_end

  #if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

    bool clipped = true;

    #pragma unroll_loop_start
    for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

      plane = clippingPlanes[ i ];
      clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;

    }
    #pragma unroll_loop_end

    if ( clipped ) discard;

  #endif

#endif
`
), Vs = (
  /* glsl */
  `
#if NUM_CLIPPING_PLANES > 0

  varying vec3 vClipPosition;

  uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`
), Gs = (
  /* glsl */
  `
#if NUM_CLIPPING_PLANES > 0

  varying vec3 vClipPosition;

#endif
`
), Hs = (
  /* glsl */
  `
#if NUM_CLIPPING_PLANES > 0

  vClipPosition = - mvPosition.xyz;

#endif
`
), Ws = (
  /* glsl */
  `
#if defined( USE_COLOR_ALPHA )

  diffuseColor *= vColor;

#elif defined( USE_COLOR )

  diffuseColor.rgb *= vColor;

#endif
`
), Xs = (
  /* glsl */
  `
#if defined( USE_COLOR_ALPHA )

  varying vec4 vColor;

#elif defined( USE_COLOR )

  varying vec3 vColor;

#endif
`
), qs = (
  /* glsl */
  `
#if defined( USE_COLOR_ALPHA )

  varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

  varying vec3 vColor;

#endif
`
), $s = (
  /* glsl */
  `
#if defined( USE_COLOR_ALPHA )

  vColor = vec4( 1.0 );

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

  vColor = vec3( 1.0 );

#endif

#ifdef USE_COLOR

  vColor *= color;

#endif

#ifdef USE_INSTANCING_COLOR

  vColor.xyz *= instanceColor.xyz;

#endif
`
), Js = (
  /* glsl */
  `
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
// <tonemapping_pars_fragment> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {

  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );

}

#ifdef HIGH_PRECISION
  float precisionSafeLength( vec3 v ) { return length( v ); }
#else
  float precisionSafeLength( vec3 v ) {
    float maxComponent = max3( abs( v ) );
    return length( v / maxComponent ) * maxComponent;
  }
#endif

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

#ifdef USE_ALPHAHASH

  varying vec3 vPosition;

#endif

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

  return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {

  // dir can be either a direction vector or a normal vector
  // upper-left 3x3 of matrix is assumed to be orthogonal

  return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}

mat3 transposeMat3( const in mat3 m ) {

  mat3 tmp;

  tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
  tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
  tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );

  return tmp;

}

float luminance( const in vec3 rgb ) {

  // assumes rgb is in linear color space with sRGB primaries and D65 white point

  const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );

  return dot( weights, rgb );

}

bool isPerspectiveMatrix( mat4 m ) {

  return m[ 2 ][ 3 ] == - 1.0;

}

vec2 equirectUv( in vec3 dir ) {

  // dir is assumed to be unit length

  float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;

  float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

  return vec2( u, v );

}

vec3 BRDF_Lambert( const in vec3 diffuseColor ) {

  return RECIPROCAL_PI * diffuseColor;

} // validated

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {

  // Original approximation by Christophe Schlick '94
  // float fresnel = pow( 1.0 - dotVH, 5.0 );

  // Optimized variant (presented by Epic at SIGGRAPH '13)
  // https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
  float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

  return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated

float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {

  // Original approximation by Christophe Schlick '94
  // float fresnel = pow( 1.0 - dotVH, 5.0 );

  // Optimized variant (presented by Epic at SIGGRAPH '13)
  // https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
  float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

  return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated
`
), Mr = (
  /* glsl */
  `
#ifdef ENVMAP_TYPE_CUBE_UV

  #define cubeUV_minMipLevel 4.0
  #define cubeUV_minTileSize 16.0

  // These shader functions convert between the UV coordinates of a single face of
  // a cubemap, the 0-5 integer index of a cube face, and the direction vector for
  // sampling a textureCube (not generally normalized ).

  float getFace( vec3 direction ) {

    vec3 absDirection = abs( direction );

    float face = - 1.0;

    if ( absDirection.x > absDirection.z ) {

      if ( absDirection.x > absDirection.y )

        face = direction.x > 0.0 ? 0.0 : 3.0;

      else

        face = direction.y > 0.0 ? 1.0 : 4.0;

    } else {

      if ( absDirection.z > absDirection.y )

        face = direction.z > 0.0 ? 2.0 : 5.0;

      else

        face = direction.y > 0.0 ? 1.0 : 4.0;

    }

    return face;

  }

  // RH coordinate system; PMREM face-indexing convention
  vec2 getUV( vec3 direction, float face ) {

    vec2 uv;

    if ( face == 0.0 ) {

      uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

    } else if ( face == 1.0 ) {

      uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

    } else if ( face == 2.0 ) {

      uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

    } else if ( face == 3.0 ) {

      uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

    } else if ( face == 4.0 ) {

      uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

    } else {

      uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

    }

    return 0.5 * ( uv + 1.0 );

  }

  vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {

    float face = getFace( direction );

    float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );

    mipInt = max( mipInt, cubeUV_minMipLevel );

    float faceSize = exp2( mipInt );

    highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0; // #25071

    if ( face > 2.0 ) {

      uv.y += faceSize;

      face -= 3.0;

    }

    uv.x += face * faceSize;

    uv.x += filterInt * 3.0 * cubeUV_minTileSize;

    uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );

    uv.x *= CUBEUV_TEXEL_WIDTH;
    uv.y *= CUBEUV_TEXEL_HEIGHT;

    #ifdef texture2DGradEXT

      return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering

    #else

      return texture2D( envMap, uv ).rgb;

    #endif

  }

  // These defines must match with PMREMGenerator

  #define cubeUV_r0 1.0
  #define cubeUV_v0 0.339
  #define cubeUV_m0 - 2.0
  #define cubeUV_r1 0.8
  #define cubeUV_v1 0.276
  #define cubeUV_m1 - 1.0
  #define cubeUV_r4 0.4
  #define cubeUV_v4 0.046
  #define cubeUV_m4 2.0
  #define cubeUV_r5 0.305
  #define cubeUV_v5 0.016
  #define cubeUV_m5 3.0
  #define cubeUV_r6 0.21
  #define cubeUV_v6 0.0038
  #define cubeUV_m6 4.0

  float roughnessToMip( float roughness ) {

    float mip = 0.0;

    if ( roughness >= cubeUV_r1 ) {

      mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;

    } else if ( roughness >= cubeUV_r4 ) {

      mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;

    } else if ( roughness >= cubeUV_r5 ) {

      mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;

    } else if ( roughness >= cubeUV_r6 ) {

      mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;

    } else {

      mip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25
    }

    return mip;

  }

  vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {

    float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );

    float mipF = fract( mip );

    float mipInt = floor( mip );

    vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );

    if ( mipF == 0.0 ) {

      return vec4( color0, 1.0 );

    } else {

      vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );

      return vec4( mix( color0, color1, mipF ), 1.0 );

    }

  }

#endif
`
), Dr = (
  /* glsl */
  `
vec3 transformedNormal = objectNormal;

#ifdef USE_INSTANCING

  // this is in lieu of a per-instance normal-matrix
  // shear transforms in the instance matrix are not supported

  mat3 m = mat3( instanceMatrix );

  transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );

  transformedNormal = m * transformedNormal;

#endif

transformedNormal = normalMatrix * transformedNormal;

#ifdef FLIP_SIDED

  transformedNormal = - transformedNormal;

#endif

#ifdef USE_TANGENT

  vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;

  #ifdef FLIP_SIDED

    transformedTangent = - transformedTangent;

  #endif

#endif
`
), er = (
  /* glsl */
  `
#ifdef USE_DISPLACEMENTMAP

  uniform sampler2D displacementMap;
  uniform float displacementScale;
  uniform float displacementBias;

#endif
`
), tr = (
  /* glsl */
  `
#ifdef USE_DISPLACEMENTMAP

  transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );

#endif
`
), Nr = (
  /* glsl */
  `
#ifdef USE_EMISSIVEMAP

  vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );

  totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`
), ir = (
  /* glsl */
  `
#ifdef USE_EMISSIVEMAP

  uniform sampler2D emissiveMap;

#endif
`
), Ar = (
  /* glsl */
  `
gl_FragColor = linearToOutputTexel( gl_FragColor );
`
), nr = (
  /* glsl */
  `

// http://www.russellcottrell.com/photo/matrixCalculator.htm

// Linear sRGB => XYZ => Linear Display P3
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
  vec3( 0.8224621, 0.177538, 0.0 ),
  vec3( 0.0331941, 0.9668058, 0.0 ),
  vec3( 0.0170827, 0.0723974, 0.9105199 )
);

// Linear Display P3 => XYZ => Linear sRGB
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
  vec3( 1.2249401, - 0.2249404, 0.0 ),
  vec3( - 0.0420569, 1.0420571, 0.0 ),
  vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);

vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
  return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}

vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
  return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}

vec4 LinearTransferOETF( in vec4 value ) {
  return value;
}

vec4 sRGBTransferOETF( in vec4 value ) {
  return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

// @deprecated, r156
vec4 LinearToLinear( in vec4 value ) {
  return value;
}

// @deprecated, r156
vec4 LinearTosRGB( in vec4 value ) {
  return sRGBTransferOETF( value );
}
`
), zr = (
  /* glsl */
  `
#ifdef USE_ENVMAP

  #ifdef ENV_WORLDPOS

    vec3 cameraToFrag;

    if ( isOrthographic ) {

      cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

    } else {

      cameraToFrag = normalize( vWorldPosition - cameraPosition );

    }

    // Transforming Normal Vectors with the Inverse Transformation
    vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

    #ifdef ENVMAP_MODE_REFLECTION

      vec3 reflectVec = reflect( cameraToFrag, worldNormal );

    #else

      vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );

    #endif

  #else

    vec3 reflectVec = vReflect;

  #endif

  #ifdef ENVMAP_TYPE_CUBE

    vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );

  #else

    vec4 envColor = vec4( 0.0 );

  #endif

  #ifdef ENVMAP_BLENDING_MULTIPLY

    outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

  #elif defined( ENVMAP_BLENDING_MIX )

    outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );

  #elif defined( ENVMAP_BLENDING_ADD )

    outgoingLight += envColor.xyz * specularStrength * reflectivity;

  #endif

#endif
`
), Ir = (
  /* glsl */
  `
#ifdef USE_ENVMAP

  uniform float envMapIntensity;
  uniform float flipEnvMap;

  #ifdef ENVMAP_TYPE_CUBE
    uniform samplerCube envMap;
  #else
    uniform sampler2D envMap;
  #endif
  
#endif
`
), Tr = (
  /* glsl */
  `
#ifdef USE_ENVMAP

  uniform float reflectivity;

  #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

    #define ENV_WORLDPOS

  #endif

  #ifdef ENV_WORLDPOS

    varying vec3 vWorldPosition;
    uniform float refractionRatio;
  #else
    varying vec3 vReflect;
  #endif

#endif
`
), ur = (
  /* glsl */
  `
#ifdef USE_ENVMAP

  #if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

    #define ENV_WORLDPOS

  #endif

  #ifdef ENV_WORLDPOS
    
    varying vec3 vWorldPosition;

  #else

    varying vec3 vReflect;
    uniform float refractionRatio;

  #endif

#endif
`
), gr = (
  /* glsl */
  `
#ifdef USE_ENVMAP

  #ifdef ENV_WORLDPOS

    vWorldPosition = worldPosition.xyz;

  #else

    vec3 cameraToVertex;

    if ( isOrthographic ) {

      cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

    } else {

      cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

    }

    vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );

    #ifdef ENVMAP_MODE_REFLECTION

      vReflect = reflect( cameraToVertex, worldNormal );

    #else

      vReflect = refract( cameraToVertex, worldNormal, refractionRatio );

    #endif

  #endif

#endif
`
), sr = (
  /* glsl */
  `
#ifdef USE_FOG

  vFogDepth = - mvPosition.z;

#endif
`
), rr = (
  /* glsl */
  `
#ifdef USE_FOG

  varying float vFogDepth;

#endif
`
), cr = (
  /* glsl */
  `
#ifdef USE_FOG

  #ifdef FOG_EXP2

    float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

  #else

    float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

  #endif

  gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`
), ar = (
  /* glsl */
  `
#ifdef USE_FOG

  uniform vec3 fogColor;
  varying float vFogDepth;

  #ifdef FOG_EXP2

    uniform float fogDensity;

  #else

    uniform float fogNear;
    uniform float fogFar;

  #endif

#endif
`
), or = (
  /* glsl */
  `

#ifdef USE_GRADIENTMAP

  uniform sampler2D gradientMap;

#endif

vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {

  // dotNL will be from -1.0 to 1.0
  float dotNL = dot( normal, lightDirection );
  vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );

  #ifdef USE_GRADIENTMAP

    return vec3( texture2D( gradientMap, coord ).r );

  #else

    vec2 fw = fwidth( coord ) * 0.5;
    return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );

  #endif

}
`
), yr = (
  /* glsl */
  `
#ifdef USE_LIGHTMAP

  vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
  vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

  reflectedLight.indirectDiffuse += lightMapIrradiance;

#endif
`
), jr = (
  /* glsl */
  `
#ifdef USE_LIGHTMAP

  uniform sampler2D lightMap;
  uniform float lightMapIntensity;

#endif
`
), Cr = (
  /* glsl */
  `
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`
), Lr = (
  /* glsl */
  `
varying vec3 vViewPosition;

struct LambertMaterial {

  vec3 diffuseColor;
  float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

  float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
  vec3 irradiance = dotNL * directLight.color;

  reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
`
), wr = (
  /* glsl */
  `
uniform bool receiveShadow;
uniform vec3 ambientLightColor;

#if defined( USE_LIGHT_PROBES )

  uniform vec3 lightProbe[ 9 ];

#endif

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {

  // normal is assumed to have unit length

  float x = normal.x, y = normal.y, z = normal.z;

  // band 0
  vec3 result = shCoefficients[ 0 ] * 0.886227;

  // band 1
  result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
  result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
  result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;

  // band 2
  result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
  result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
  result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
  result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
  result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );

  return result;

}

vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {

  vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

  vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );

  return irradiance;

}

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

  vec3 irradiance = ambientLightColor;

  return irradiance;

}

float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

  #if defined ( LEGACY_LIGHTS )

    if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {

      return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );

    }

    return 1.0;

  #else

    // based upon Frostbite 3 Moving to Physically-based Rendering
    // page 32, equation 26: E[window1]
    // https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
    float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

    if ( cutoffDistance > 0.0 ) {

      distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

    }

    return distanceFalloff;

  #endif

}

float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

  return smoothstep( coneCosine, penumbraCosine, angleCosine );

}

#if NUM_DIR_LIGHTS > 0

  struct DirectionalLight {
    vec3 direction;
    vec3 color;
  };

  uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

  void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {

    light.color = directionalLight.color;
    light.direction = directionalLight.direction;
    light.visible = true;

  }

#endif


#if NUM_POINT_LIGHTS > 0

  struct PointLight {
    vec3 position;
    vec3 color;
    float distance;
    float decay;
  };

  uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

  // light is an out parameter as having it as a return value caused compiler errors on some devices
  void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {

    vec3 lVector = pointLight.position - geometryPosition;

    light.direction = normalize( lVector );

    float lightDistance = length( lVector );

    light.color = pointLight.color;
    light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
    light.visible = ( light.color != vec3( 0.0 ) );

  }

#endif


#if NUM_SPOT_LIGHTS > 0

  struct SpotLight {
    vec3 position;
    vec3 direction;
    vec3 color;
    float distance;
    float decay;
    float coneCos;
    float penumbraCos;
  };

  uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

  // light is an out parameter as having it as a return value caused compiler errors on some devices
  void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {

    vec3 lVector = spotLight.position - geometryPosition;

    light.direction = normalize( lVector );

    float angleCos = dot( light.direction, spotLight.direction );

    float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );

    if ( spotAttenuation > 0.0 ) {

      float lightDistance = length( lVector );

      light.color = spotLight.color * spotAttenuation;
      light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
      light.visible = ( light.color != vec3( 0.0 ) );

    } else {

      light.color = vec3( 0.0 );
      light.visible = false;

    }

  }

#endif


#if NUM_RECT_AREA_LIGHTS > 0

  struct RectAreaLight {
    vec3 color;
    vec3 position;
    vec3 halfWidth;
    vec3 halfHeight;
  };

  // Pre-computed values of LinearTransformedCosine approximation of BRDF
  // BRDF approximation Texture is 64x64
  uniform sampler2D ltc_1; // RGBA Float
  uniform sampler2D ltc_2; // RGBA Float

  uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

  struct HemisphereLight {
    vec3 direction;
    vec3 skyColor;
    vec3 groundColor;
  };

  uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

  vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {

    float dotNL = dot( normal, hemiLight.direction );
    float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

    vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

    return irradiance;

  }

#endif
`
), Or = (
  /* glsl */
  `
#ifdef USE_ENVMAP

  vec3 getIBLIrradiance( const in vec3 normal ) {

    #ifdef ENVMAP_TYPE_CUBE_UV

      vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

      vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );

      return PI * envMapColor.rgb * envMapIntensity;

    #else

      return vec3( 0.0 );

    #endif

  }

  vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

    #ifdef ENVMAP_TYPE_CUBE_UV

      vec3 reflectVec = reflect( - viewDir, normal );

      // Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
      reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

      reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

      vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );

      return envMapColor.rgb * envMapIntensity;

    #else

      return vec3( 0.0 );

    #endif

  }

  #ifdef USE_ANISOTROPY

    vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {

      #ifdef ENVMAP_TYPE_CUBE_UV

        // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy
        vec3 bentNormal = cross( bitangent, viewDir );
        bentNormal = normalize( cross( bentNormal, bitangent ) );
        bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );

        return getIBLRadiance( viewDir, bentNormal, roughness );

      #else

        return vec3( 0.0 );

      #endif

    }

  #endif

#endif
`
), xr = (
  /* glsl */
  `
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`
), Er = (
  /* glsl */
  `
varying vec3 vViewPosition;

struct ToonMaterial {

  vec3 diffuseColor;

};

void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

  vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;

  reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
`
), lr = (
  /* glsl */
  `
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`
), hr = (
  /* glsl */
  `
varying vec3 vViewPosition;

struct BlinnPhongMaterial {

  vec3 diffuseColor;
  vec3 specularColor;
  float specularShininess;
  float specularStrength;

};

void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

  float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
  vec3 irradiance = dotNL * directLight.color;

  reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

  reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
`
), dr = (
  /* glsl */
  `
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );

vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

material.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );

#ifdef IOR

  material.ior = ior;

  #ifdef USE_SPECULAR

    float specularIntensityFactor = specularIntensity;
    vec3 specularColorFactor = specularColor;

    #ifdef USE_SPECULAR_COLORMAP

      specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;

    #endif

    #ifdef USE_SPECULAR_INTENSITYMAP

      specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;

    #endif

    material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );

  #else

    float specularIntensityFactor = 1.0;
    vec3 specularColorFactor = vec3( 1.0 );
    material.specularF90 = 1.0;

  #endif

  material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );

#else

  material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
  material.specularF90 = 1.0;

#endif

#ifdef USE_CLEARCOAT

  material.clearcoat = clearcoat;
  material.clearcoatRoughness = clearcoatRoughness;
  material.clearcoatF0 = vec3( 0.04 );
  material.clearcoatF90 = 1.0;

  #ifdef USE_CLEARCOATMAP

    material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;

  #endif

  #ifdef USE_CLEARCOAT_ROUGHNESSMAP

    material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;

  #endif

  material.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model
  material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
  material.clearcoatRoughness += geometryRoughness;
  material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );

#endif

#ifdef USE_IRIDESCENCE

  material.iridescence = iridescence;
  material.iridescenceIOR = iridescenceIOR;

  #ifdef USE_IRIDESCENCEMAP

    material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;

  #endif

  #ifdef USE_IRIDESCENCE_THICKNESSMAP

    material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;

  #else

    material.iridescenceThickness = iridescenceThicknessMaximum;

  #endif

#endif

#ifdef USE_SHEEN

  material.sheenColor = sheenColor;

  #ifdef USE_SHEEN_COLORMAP

    material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;

  #endif

  material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );

  #ifdef USE_SHEEN_ROUGHNESSMAP

    material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;

  #endif

#endif

#ifdef USE_ANISOTROPY

  #ifdef USE_ANISOTROPYMAP

    mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
    vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
    vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;

  #else

    vec2 anisotropyV = anisotropyVector;

  #endif

  material.anisotropy = length( anisotropyV );
  anisotropyV /= material.anisotropy;
  material.anisotropy = saturate( material.anisotropy );

  // Roughness along the anisotropy bitangent is the material roughness, while the tangent roughness increases with anisotropy.
  material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );

  material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
  material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;

#endif
`
), vr = (
  /* glsl */
  `

struct PhysicalMaterial {

  vec3 diffuseColor;
  float roughness;
  vec3 specularColor;
  float specularF90;

  #ifdef USE_CLEARCOAT
    float clearcoat;
    float clearcoatRoughness;
    vec3 clearcoatF0;
    float clearcoatF90;
  #endif

  #ifdef USE_IRIDESCENCE
    float iridescence;
    float iridescenceIOR;
    float iridescenceThickness;
    vec3 iridescenceFresnel;
    vec3 iridescenceF0;
  #endif

  #ifdef USE_SHEEN
    vec3 sheenColor;
    float sheenRoughness;
  #endif

  #ifdef IOR
    float ior;
  #endif

  #ifdef USE_TRANSMISSION
    float transmission;
    float transmissionAlpha;
    float thickness;
    float attenuationDistance;
    vec3 attenuationColor;
  #endif

  #ifdef USE_ANISOTROPY
    float anisotropy;
    float alphaT;
    vec3 anisotropyT;
    vec3 anisotropyB;
  #endif

};

// temporary
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );

vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );

    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {

  float a2 = pow2( alpha );

  float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
  float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );

  return 0.5 / max( gv + gl, EPSILON );

}

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney’s reparameterization
float D_GGX( const in float alpha, const in float dotNH ) {

  float a2 = pow2( alpha );

  float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1

  return RECIPROCAL_PI * a2 / pow2( denom );

}

// https://google.github.io/filament/Filament.md.html#materialsystem/anisotropicmodel/anisotropicspecularbrdf
#ifdef USE_ANISOTROPY

  float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {

    float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
    float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
    float v = 0.5 / ( gv + gl );

    return saturate(v);

  }

  float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {

    float a2 = alphaT * alphaB;
    highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
    highp float v2 = dot( v, v );
    float w2 = a2 / v2;

    return RECIPROCAL_PI * a2 * pow2 ( w2 );

  }

#endif

#ifdef USE_CLEARCOAT

  // GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
  vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {

    vec3 f0 = material.clearcoatF0;
    float f90 = material.clearcoatF90;
    float roughness = material.clearcoatRoughness;

    float alpha = pow2( roughness ); // UE4's roughness

    vec3 halfDir = normalize( lightDir + viewDir );

    float dotNL = saturate( dot( normal, lightDir ) );
    float dotNV = saturate( dot( normal, viewDir ) );
    float dotNH = saturate( dot( normal, halfDir ) );
    float dotVH = saturate( dot( viewDir, halfDir ) );

    vec3 F = F_Schlick( f0, f90, dotVH );

    float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

    float D = D_GGX( alpha, dotNH );

    return F * ( V * D );

  }

#endif

vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {

  vec3 f0 = material.specularColor;
  float f90 = material.specularF90;
  float roughness = material.roughness;

  float alpha = pow2( roughness ); // UE4's roughness

  vec3 halfDir = normalize( lightDir + viewDir );

  float dotNL = saturate( dot( normal, lightDir ) );
  float dotNV = saturate( dot( normal, viewDir ) );
  float dotNH = saturate( dot( normal, halfDir ) );
  float dotVH = saturate( dot( viewDir, halfDir ) );

  vec3 F = F_Schlick( f0, f90, dotVH );

  #ifdef USE_IRIDESCENCE

    F = mix( F, material.iridescenceFresnel, material.iridescence );

  #endif

  #ifdef USE_ANISOTROPY

    float dotTL = dot( material.anisotropyT, lightDir );
    float dotTV = dot( material.anisotropyT, viewDir );
    float dotTH = dot( material.anisotropyT, halfDir );
    float dotBL = dot( material.anisotropyB, lightDir );
    float dotBV = dot( material.anisotropyB, viewDir );
    float dotBH = dot( material.anisotropyB, halfDir );

    float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );

    float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );

  #else

    float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

    float D = D_GGX( alpha, dotNH );

  #endif

  return F * ( V * D );

}

// Rect Area Light

// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt
// code: https://github.com/selfshadow/ltc_code/

vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {

  const float LUT_SIZE = 64.0;
  const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
  const float LUT_BIAS = 0.5 / LUT_SIZE;

  float dotNV = saturate( dot( N, V ) );

  // texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )
  vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );

  uv = uv * LUT_SCALE + LUT_BIAS;

  return uv;

}

float LTC_ClippedSphereFormFactor( const in vec3 f ) {

  // Real-Time Area Lighting: a Journey from Research to Production (p.102)
  // An approximation of the form factor of a horizon-clipped rectangle.

  float l = length( f );

  return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );

}

vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {

  float x = dot( v1, v2 );

  float y = abs( x );

  // rational polynomial approximation to theta / sin( theta ) / 2PI
  float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
  float b = 3.4175940 + ( 4.1616724 + y ) * y;
  float v = a / b;

  float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;

  return cross( v1, v2 ) * theta_sintheta;

}

vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {

  // bail if point is on back side of plane of light
  // assumes ccw winding order of light vertices
  vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
  vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
  vec3 lightNormal = cross( v1, v2 );

  if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );

  // construct orthonormal basis around N
  vec3 T1, T2;
  T1 = normalize( V - N * dot( V, N ) );
  T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system

  // compute transform
  mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );

  // transform rect
  vec3 coords[ 4 ];
  coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
  coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
  coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
  coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );

  // project rect onto sphere
  coords[ 0 ] = normalize( coords[ 0 ] );
  coords[ 1 ] = normalize( coords[ 1 ] );
  coords[ 2 ] = normalize( coords[ 2 ] );
  coords[ 3 ] = normalize( coords[ 3 ] );

  // calculate vector form factor
  vec3 vectorFormFactor = vec3( 0.0 );
  vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
  vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
  vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
  vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );

  // adjust for horizon clipping
  float result = LTC_ClippedSphereFormFactor( vectorFormFactor );

/*
  // alternate method of adjusting for horizon clipping (see referece)
  // refactoring required
  float len = length( vectorFormFactor );
  float z = vectorFormFactor.z / len;

  const float LUT_SIZE = 64.0;
  const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
  const float LUT_BIAS = 0.5 / LUT_SIZE;

  // tabulated horizon-clipped sphere, apparently...
  vec2 uv = vec2( z * 0.5 + 0.5, len );
  uv = uv * LUT_SCALE + LUT_BIAS;

  float scale = texture2D( ltc_2, uv ).w;

  float result = len * scale;
*/

  return vec3( result );

}

// End Rect Area Light

#if defined( USE_SHEEN )

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float D_Charlie( float roughness, float dotNH ) {

  float alpha = pow2( roughness );

  // Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"
  float invAlpha = 1.0 / alpha;
  float cos2h = dotNH * dotNH;
  float sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16

  return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );

}

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float V_Neubelt( float dotNV, float dotNL ) {

  // Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"
  return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );

}

vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {

  vec3 halfDir = normalize( lightDir + viewDir );

  float dotNL = saturate( dot( normal, lightDir ) );
  float dotNV = saturate( dot( normal, viewDir ) );
  float dotNH = saturate( dot( normal, halfDir ) );

  float D = D_Charlie( sheenRoughness, dotNH );
  float V = V_Neubelt( dotNV, dotNL );

  return sheenColor * ( D * V );

}

#endif

// This is a curve-fit approxmation to the "Charlie sheen" BRDF integrated over the hemisphere from 
// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF". The analysis can be found
// in the Sheen section of https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

  float dotNV = saturate( dot( normal, viewDir ) );

  float r2 = roughness * roughness;

  float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;

  float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;

  float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );

  return saturate( DG * RECIPROCAL_PI );

}

// Analytical approximation of the DFG LUT, one half of the
// split-sum approximation used in indirect specular lighting.
// via 'environmentBRDF' from "Physically Based Shading on Mobile"
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

  float dotNV = saturate( dot( normal, viewDir ) );

  const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );

  const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );

  vec4 r = roughness * c0 + c1;

  float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;

  vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;

  return fab;

}

vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {

  vec2 fab = DFGApprox( normal, viewDir, roughness );

  return specularColor * fab.x + specularF90 * fab.y;

}

// Fdez-Agüera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif

  vec2 fab = DFGApprox( normal, viewDir, roughness );

  #ifdef USE_IRIDESCENCE

    vec3 Fr = mix( specularColor, iridescenceF0, iridescence );

  #else

    vec3 Fr = specularColor;

  #endif

  vec3 FssEss = Fr * fab.x + specularF90 * fab.y;

  float Ess = fab.x + fab.y;
  float Ems = 1.0 - Ess;

  vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21
  vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );

  singleScatter += FssEss;
  multiScatter += Fms * Ems;

}

#if NUM_RECT_AREA_LIGHTS > 0

  void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

    vec3 normal = geometryNormal;
    vec3 viewDir = geometryViewDir;
    vec3 position = geometryPosition;
    vec3 lightPos = rectAreaLight.position;
    vec3 halfWidth = rectAreaLight.halfWidth;
    vec3 halfHeight = rectAreaLight.halfHeight;
    vec3 lightColor = rectAreaLight.color;
    float roughness = material.roughness;

    vec3 rectCoords[ 4 ];
    rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
    rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
    rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
    rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;

    vec2 uv = LTC_Uv( normal, viewDir, roughness );

    vec4 t1 = texture2D( ltc_1, uv );
    vec4 t2 = texture2D( ltc_2, uv );

    mat3 mInv = mat3(
      vec3( t1.x, 0, t1.y ),
      vec3(    0, 1,    0 ),
      vec3( t1.z, 0, t1.w )
    );

    // LTC Fresnel Approximation by Stephen Hill
    // http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
    vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

    reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

    reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

  }

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

  float dotNL = saturate( dot( geometryNormal, directLight.direction ) );

  vec3 irradiance = dotNL * directLight.color;

  #ifdef USE_CLEARCOAT

    float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );

    vec3 ccIrradiance = dotNLcc * directLight.color;

    clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );

  #endif

  #ifdef USE_SHEEN

    sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

  #endif

  reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );

  reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

  #ifdef USE_CLEARCOAT

    clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );

  #endif

  #ifdef USE_SHEEN

    sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );

  #endif

  // Both indirect specular and indirect diffuse light accumulate here

  vec3 singleScattering = vec3( 0.0 );
  vec3 multiScattering = vec3( 0.0 );
  vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

  #ifdef USE_IRIDESCENCE

    computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );

  #else

    computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );

  #endif

  vec3 totalScattering = singleScattering + multiScattering;
  vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );

  reflectedLight.indirectSpecular += radiance * singleScattering;
  reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;

  reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;

}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

  return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`
), pr = (
  /* glsl */
  `
/**
 * This is a template that can be used to light a material, it uses pluggable
 * RenderEquations (RE)for specific lighting scenarios.
 *
 * Instructions for use:
 * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined
 * - Create a material parameter that is to be passed as the third parameter to your lighting functions.
 *
 * TODO:
 * - Add area light support.
 * - Add sphere light support.
 * - Add diffuse light probe (irradiance cubemap) support.
 */

vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal;

#ifdef USE_CLEARCOAT

  geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

  float dotNVi = saturate( dot( normal, geometryViewDir ) );

  if ( material.iridescenceThickness == 0.0 ) {

    material.iridescence = 0.0;

  } else {

    material.iridescence = saturate( material.iridescence );

  }

  if ( material.iridescence > 0.0 ) {

    material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );

    // Iridescence F0 approximation
    material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

  }

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

  PointLight pointLight;
  #if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
  PointLightShadow pointLightShadow;
  #endif

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

    pointLight = pointLights[ i ];

    getPointLightInfo( pointLight, geometryPosition, directLight );

    #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
    pointLightShadow = pointLightShadows[ i ];
    directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
    #endif

    RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

  }
  #pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

  SpotLight spotLight;
  vec4 spotColor;
  vec3 spotLightCoord;
  bool inSpotLightMap;

  #if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
  SpotLightShadow spotLightShadow;
  #endif

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

    spotLight = spotLights[ i ];

    getSpotLightInfo( spotLight, geometryPosition, directLight );

    // spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
    #if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
    #define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
    #elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
    #define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
    #else
    #define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
    #endif

    #if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
      spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
      inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
      spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
      directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
    #endif

    #undef SPOT_LIGHT_MAP_INDEX

    #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
    spotLightShadow = spotLightShadows[ i ];
    directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
    #endif

    RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

  }
  #pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

  DirectionalLight directionalLight;
  #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
  DirectionalLightShadow directionalLightShadow;
  #endif

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

    directionalLight = directionalLights[ i ];

    getDirectionalLightInfo( directionalLight, directLight );

    #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
    directionalLightShadow = directionalLightShadows[ i ];
    directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
    #endif

    RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

  }
  #pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

  RectAreaLight rectAreaLight;

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

    rectAreaLight = rectAreaLights[ i ];
    RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

  }
  #pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

  vec3 iblIrradiance = vec3( 0.0 );

  vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

  #if defined( USE_LIGHT_PROBES )

    irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

  #endif

  #if ( NUM_HEMI_LIGHTS > 0 )

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

      irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

    }
    #pragma unroll_loop_end

  #endif

#endif

#if defined( RE_IndirectSpecular )

  vec3 radiance = vec3( 0.0 );
  vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`
), Yr = (
  /* glsl */
  `
#if defined( RE_IndirectDiffuse )

  #ifdef USE_LIGHTMAP

    vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
    vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

    irradiance += lightMapIrradiance;

  #endif

  #if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )

    iblIrradiance += getIBLIrradiance( geometryNormal );

  #endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

  #ifdef USE_ANISOTROPY

    radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );

  #else

    radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );

  #endif

  #ifdef USE_CLEARCOAT

    clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );

  #endif

#endif
`
), Ur = (
  /* glsl */
  `
#if defined( RE_IndirectDiffuse )

  RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

  RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif
`
), fr = (
  /* glsl */
  `
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

  // Doing a strict comparison with == 1.0 can cause noise artifacts
  // on some platforms. See issue #17623.
  gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`
), mr = (
  /* glsl */
  `
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

  uniform float logDepthBufFC;
  varying float vFragDepth;
  varying float vIsPerspective;

#endif
`
), Qr = (
  /* glsl */
  `
#ifdef USE_LOGDEPTHBUF

  #ifdef USE_LOGDEPTHBUF_EXT

    varying float vFragDepth;
    varying float vIsPerspective;

  #else

    uniform float logDepthBufFC;

  #endif

#endif
`
), Sr = (
  /* glsl */
  `
#ifdef USE_LOGDEPTHBUF

  #ifdef USE_LOGDEPTHBUF_EXT

    vFragDepth = 1.0 + gl_Position.w;
    vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );

  #else

    if ( isPerspectiveMatrix( projectionMatrix ) ) {

      gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;

      gl_Position.z *= gl_Position.w;

    }

  #endif

#endif
`
), kr = (
  /* glsl */
  `
#ifdef USE_MAP

  vec4 sampledDiffuseColor = texture2D( map, vMapUv );

  #ifdef DECODE_VIDEO_TEXTURE

    // use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures

    sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
  
  #endif

  diffuseColor *= sampledDiffuseColor;

#endif
`
), Zr = (
  /* glsl */
  `
#ifdef USE_MAP

  uniform sampler2D map;

#endif
`
), _r = (
  /* glsl */
  `
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

  #if defined( USE_POINTS_UV )

    vec2 uv = vUv;

  #else

    vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

  #endif

#endif

#ifdef USE_MAP

  diffuseColor *= texture2D( map, uv );

#endif

#ifdef USE_ALPHAMAP

  diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`
), br = (
  /* glsl */
  `
#if defined( USE_POINTS_UV )

  varying vec2 vUv;

#else

  #if defined( USE_MAP ) || defined( USE_ALPHAMAP )

    uniform mat3 uvTransform;

  #endif

#endif

#ifdef USE_MAP

  uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

  uniform sampler2D alphaMap;

#endif
`
), Kr = (
  /* glsl */
  `
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

  vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );

  // reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
  metalnessFactor *= texelMetalness.b;

#endif
`
), Rr = (
  /* glsl */
  `
#ifdef USE_METALNESSMAP

  uniform sampler2D metalnessMap;

#endif
`
), Pr = (
  /* glsl */
  `
#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )

  // morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
  // When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
  // When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
  vColor *= morphTargetBaseInfluence;

  for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

    #if defined( USE_COLOR_ALPHA )

      if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];

    #elif defined( USE_COLOR )

      if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];

    #endif

  }

#endif
`
), Fr = (
  /* glsl */
  `
#ifdef USE_MORPHNORMALS

  // morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
  // When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
  // When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
  objectNormal *= morphTargetBaseInfluence;

  #ifdef MORPHTARGETS_TEXTURE

    for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

      if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];

    }

  #else

    objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
    objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
    objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
    objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];

  #endif

#endif
`
), Br = (
  /* glsl */
  `
#ifdef USE_MORPHTARGETS

  uniform float morphTargetBaseInfluence;

  #ifdef MORPHTARGETS_TEXTURE

    uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
    uniform sampler2DArray morphTargetsTexture;
    uniform ivec2 morphTargetsTextureSize;

    vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {

      int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
      int y = texelIndex / morphTargetsTextureSize.x;
      int x = texelIndex - y * morphTargetsTextureSize.x;

      ivec3 morphUV = ivec3( x, y, morphTargetIndex );
      return texelFetch( morphTargetsTexture, morphUV, 0 );

    }

  #else

    #ifndef USE_MORPHNORMALS

      uniform float morphTargetInfluences[ 8 ];

    #else

      uniform float morphTargetInfluences[ 4 ];

    #endif

  #endif

#endif
`
), Vr = (
  /* glsl */
  `
#ifdef USE_MORPHTARGETS

  // morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
  // When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)
  // When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
  transformed *= morphTargetBaseInfluence;

  #ifdef MORPHTARGETS_TEXTURE

    for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

      if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];

    }

  #else

    transformed += morphTarget0 * morphTargetInfluences[ 0 ];
    transformed += morphTarget1 * morphTargetInfluences[ 1 ];
    transformed += morphTarget2 * morphTargetInfluences[ 2 ];
    transformed += morphTarget3 * morphTargetInfluences[ 3 ];

    #ifndef USE_MORPHNORMALS

      transformed += morphTarget4 * morphTargetInfluences[ 4 ];
      transformed += morphTarget5 * morphTargetInfluences[ 5 ];
      transformed += morphTarget6 * morphTargetInfluences[ 6 ];
      transformed += morphTarget7 * morphTargetInfluences[ 7 ];

    #endif

  #endif

#endif
`
), Gr = (
  /* glsl */
  `
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

#ifdef FLAT_SHADED

  vec3 fdx = dFdx( vViewPosition );
  vec3 fdy = dFdy( vViewPosition );
  vec3 normal = normalize( cross( fdx, fdy ) );

#else

  vec3 normal = normalize( vNormal );

  #ifdef DOUBLE_SIDED

    normal *= faceDirection;

  #endif

#endif

#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )

  #ifdef USE_TANGENT

    mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

  #else

    mat3 tbn = getTangentFrame( - vViewPosition, normal,
    #if defined( USE_NORMALMAP )
      vNormalMapUv
    #elif defined( USE_CLEARCOAT_NORMALMAP )
      vClearcoatNormalMapUv
    #else
      vUv
    #endif
    );

  #endif

  #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

    tbn[0] *= faceDirection;
    tbn[1] *= faceDirection;

  #endif

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

  #ifdef USE_TANGENT

    mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

  #else

    mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

  #endif

  #if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

    tbn2[0] *= faceDirection;
    tbn2[1] *= faceDirection;

  #endif

#endif

// non perturbed normal for clearcoat among others

vec3 nonPerturbedNormal = normal;

`
), Hr = (
  /* glsl */
  `

#ifdef USE_NORMALMAP_OBJECTSPACE

  normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

  #ifdef FLIP_SIDED

    normal = - normal;

  #endif

  #ifdef DOUBLE_SIDED

    normal = normal * faceDirection;

  #endif

  normal = normalize( normalMatrix * normal );

#elif defined( USE_NORMALMAP_TANGENTSPACE )

  vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
  mapN.xy *= normalScale;

  normal = normalize( tbn * mapN );

#elif defined( USE_BUMPMAP )

  normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`
), Wr = (
  /* glsl */
  `
#ifndef FLAT_SHADED

  varying vec3 vNormal;

  #ifdef USE_TANGENT

    varying vec3 vTangent;
    varying vec3 vBitangent;

  #endif

#endif
`
), Xr = (
  /* glsl */
  `
#ifndef FLAT_SHADED

  varying vec3 vNormal;

  #ifdef USE_TANGENT

    varying vec3 vTangent;
    varying vec3 vBitangent;

  #endif

#endif
`
), qr = (
  /* glsl */
  `
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

  vNormal = normalize( transformedNormal );

  #ifdef USE_TANGENT

    vTangent = normalize( transformedTangent );
    vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

  #endif

#endif
`
), $r = (
  /* glsl */
  `
#ifdef USE_NORMALMAP

  uniform sampler2D normalMap;
  uniform vec2 normalScale;

#endif

#ifdef USE_NORMALMAP_OBJECTSPACE

  uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )

  // Normal Mapping Without Precomputed Tangents
  // http://www.thetenthplanet.de/archives/1180

  mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

    vec3 q0 = dFdx( eye_pos.xyz );
    vec3 q1 = dFdy( eye_pos.xyz );
    vec2 st0 = dFdx( uv.st );
    vec2 st1 = dFdy( uv.st );

    vec3 N = surf_norm; // normalized

    vec3 q1perp = cross( q1, N );
    vec3 q0perp = cross( N, q0 );

    vec3 T = q1perp * st0.x + q0perp * st1.x;
    vec3 B = q1perp * st0.y + q0perp * st1.y;

    float det = max( dot( T, T ), dot( B, B ) );
    float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

    return mat3( T * scale, B * scale, N );

  }

#endif
`
), Jr = (
  /* glsl */
  `
#ifdef USE_CLEARCOAT

  vec3 clearcoatNormal = nonPerturbedNormal;

#endif
`
), Mc = (
  /* glsl */
  `
#ifdef USE_CLEARCOAT_NORMALMAP

  vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
  clearcoatMapN.xy *= clearcoatNormalScale;

  clearcoatNormal = normalize( tbn2 * clearcoatMapN );

#endif
`
), Dc = (
  /* glsl */
  `

#ifdef USE_CLEARCOATMAP

  uniform sampler2D clearcoatMap;

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

  uniform sampler2D clearcoatNormalMap;
  uniform vec2 clearcoatNormalScale;

#endif

#ifdef USE_CLEARCOAT_ROUGHNESSMAP

  uniform sampler2D clearcoatRoughnessMap;

#endif
`
), ec = (
  /* glsl */
  `

#ifdef USE_IRIDESCENCEMAP

  uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

  uniform sampler2D iridescenceThicknessMap;

#endif
`
), tc = (
  /* glsl */
  `
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`
), Nc = (
  /* glsl */
  `
vec3 packNormalToRGB( const in vec3 normal ) {
  return normalize( normal ) * 0.5 + 0.5;
}

vec3 unpackRGBToNormal( const in vec3 rgb ) {
  return 2.0 * rgb.xyz - 1.0;
}

const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)

const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );

const float ShiftRight8 = 1. / 256.;

vec4 packDepthToRGBA( const in float v ) {
  vec4 r = vec4( fract( v * PackFactors ), v );
  r.yzw -= r.xyz * ShiftRight8; // tidy overflow
  return r * PackUpscale;
}

float unpackRGBAToDepth( const in vec4 v ) {
  return dot( v, UnpackFactors );
}

vec2 packDepthToRG( in highp float v ) {
  return packDepthToRGBA( v ).yx;
}

float unpackRGToDepth( const in highp vec2 v ) {
  return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}

vec4 pack2HalfToRGBA( vec2 v ) {
  vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
  return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}

vec2 unpackRGBATo2Half( vec4 v ) {
  return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}

// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
  // -near maps to 0; -far maps to 1
  return ( viewZ + near ) / ( near - far );
}

float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
  // maps orthographic depth in [ 0, 1 ] to viewZ
  return depth * ( near - far ) - near;
}

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
  // -near maps to 0; -far maps to 1
  return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}

float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
  // maps perspective depth in [ 0, 1 ] to viewZ
  return ( near * far ) / ( ( far - near ) * depth - far );
}
`
), ic = (
  /* glsl */
  `
#ifdef PREMULTIPLIED_ALPHA

  // Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
  gl_FragColor.rgb *= gl_FragColor.a;

#endif
`
), Ac = (
  /* glsl */
  `
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING

  mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`
), nc = (
  /* glsl */
  `
#ifdef DITHERING

  gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`
), zc = (
  /* glsl */
  `
#ifdef DITHERING

  // based on https://www.shadertoy.com/view/MslGR8
  vec3 dithering( vec3 color ) {
    //Calculate grid position
    float grid_position = rand( gl_FragCoord.xy );

    //Shift the individual colors differently, thus making it even harder to see the dithering pattern
    vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );

    //modify shift according to grid position.
    dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );

    //shift the color by dither_shift
    return color + dither_shift_RGB;
  }

#endif
`
), Ic = (
  /* glsl */
  `
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

  vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

  // reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
  roughnessFactor *= texelRoughness.g;

#endif
`
), Tc = (
  /* glsl */
  `
#ifdef USE_ROUGHNESSMAP

  uniform sampler2D roughnessMap;

#endif
`
), uc = (
  /* glsl */
  `
#if NUM_SPOT_LIGHT_COORDS > 0

  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#if NUM_SPOT_LIGHT_MAPS > 0

  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];

#endif

#ifdef USE_SHADOWMAP

  #if NUM_DIR_LIGHT_SHADOWS > 0

    uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
    varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

    struct DirectionalLightShadow {
      float shadowBias;
      float shadowNormalBias;
      float shadowRadius;
      vec2 shadowMapSize;
    };

    uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

  #endif

  #if NUM_SPOT_LIGHT_SHADOWS > 0

    uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];

    struct SpotLightShadow {
      float shadowBias;
      float shadowNormalBias;
      float shadowRadius;
      vec2 shadowMapSize;
    };

    uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

  #endif

  #if NUM_POINT_LIGHT_SHADOWS > 0

    uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
    varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

    struct PointLightShadow {
      float shadowBias;
      float shadowNormalBias;
      float shadowRadius;
      vec2 shadowMapSize;
      float shadowCameraNear;
      float shadowCameraFar;
    };

    uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

  #endif

  /*
  #if NUM_RECT_AREA_LIGHTS > 0

    // TODO (abelnation): create uniforms for area light shadows

  #endif
  */

  float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {

    return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );

  }

  vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {

    return unpackRGBATo2Half( texture2D( shadow, uv ) );

  }

  float VSMShadow (sampler2D shadow, vec2 uv, float compare ){

    float occlusion = 1.0;

    vec2 distribution = texture2DDistribution( shadow, uv );

    float hard_shadow = step( compare , distribution.x ); // Hard Shadow

    if (hard_shadow != 1.0 ) {

      float distance = compare - distribution.x ;
      float variance = max( 0.00000, distribution.y * distribution.y );
      float softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality
      softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed
      occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );

    }
    return occlusion;

  }

  float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

    float shadow = 1.0;

    shadowCoord.xyz /= shadowCoord.w;
    shadowCoord.z += shadowBias;

    bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
    bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

    if ( frustumTest ) {

    #if defined( SHADOWMAP_TYPE_PCF )

      vec2 texelSize = vec2( 1.0 ) / shadowMapSize;

      float dx0 = - texelSize.x * shadowRadius;
      float dy0 = - texelSize.y * shadowRadius;
      float dx1 = + texelSize.x * shadowRadius;
      float dy1 = + texelSize.y * shadowRadius;
      float dx2 = dx0 / 2.0;
      float dy2 = dy0 / 2.0;
      float dx3 = dx1 / 2.0;
      float dy3 = dy1 / 2.0;

      shadow = (
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
      ) * ( 1.0 / 17.0 );

    #elif defined( SHADOWMAP_TYPE_PCF_SOFT )

      vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
      float dx = texelSize.x;
      float dy = texelSize.y;

      vec2 uv = shadowCoord.xy;
      vec2 f = fract( uv * shadowMapSize + 0.5 );
      uv -= f * texelSize;

      shadow = (
        texture2DCompare( shadowMap, uv, shadowCoord.z ) +
        texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
        texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
        texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
        mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
          texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
          f.x ) +
        mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
          texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
          f.x ) +
        mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
          texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
          f.y ) +
        mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
          texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
          f.y ) +
        mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
              texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
              f.x ),
          mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
              texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
              f.x ),
          f.y )
      ) * ( 1.0 / 9.0 );

    #elif defined( SHADOWMAP_TYPE_VSM )

      shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );

    #else // no percentage-closer filtering:

      shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );

    #endif

    }

    return shadow;

  }

  // cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D
  // vector suitable for 2D texture mapping. This code uses the following layout for the
  // 2D texture:
  //
  // xzXZ
  //  y Y
  //
  // Y - Positive y direction
  // y - Negative y direction
  // X - Positive x direction
  // x - Negative x direction
  // Z - Positive z direction
  // z - Negative z direction
  //
  // Source and test bed:
  // https://gist.github.com/tschw/da10c43c467ce8afd0c4

  vec2 cubeToUV( vec3 v, float texelSizeY ) {

    // Number of texels to avoid at the edge of each square

    vec3 absV = abs( v );

    // Intersect unit cube

    float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
    absV *= scaleToCube;

    // Apply scale to avoid seams

    // two texels less per square (one texel will do for NEAREST)
    v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );

    // Unwrap

    // space: -1 ... 1 range for each square
    //
    // #X##		dim    := ( 4 , 2 )
    //  # #		center := ( 1 , 1 )

    vec2 planar = v.xy;

    float almostATexel = 1.5 * texelSizeY;
    float almostOne = 1.0 - almostATexel;

    if ( absV.z >= almostOne ) {

      if ( v.z > 0.0 )
        planar.x = 4.0 - v.x;

    } else if ( absV.x >= almostOne ) {

      float signX = sign( v.x );
      planar.x = v.z * signX + 2.0 * signX;

    } else if ( absV.y >= almostOne ) {

      float signY = sign( v.y );
      planar.x = v.x + 2.0 * signY + 2.0;
      planar.y = v.z * signY - 2.0;

    }

    // Transform to UV space

    // scale := 0.5 / dim
    // translate := ( center + 0.5 ) / dim
    return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );

  }

  float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

    vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );

    // for point lights, the uniform @vShadowCoord is re-purposed to hold
    // the vector from the light to the world-space position of the fragment.
    vec3 lightToPosition = shadowCoord.xyz;

    // dp = normalized distance from light to fragment position
    float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?
    dp += shadowBias;

    // bd3D = base direction 3D
    vec3 bd3D = normalize( lightToPosition );

    #if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )

      vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;

      return (
        texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
        texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
        texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
        texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
        texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
        texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
        texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
        texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
        texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
      ) * ( 1.0 / 9.0 );

    #else // no percentage-closer filtering

      return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );

    #endif

  }

#endif
`
), gc = (
  /* glsl */
  `

#if NUM_SPOT_LIGHT_COORDS > 0

  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#ifdef USE_SHADOWMAP

  #if NUM_DIR_LIGHT_SHADOWS > 0

    uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
    varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

    struct DirectionalLightShadow {
      float shadowBias;
      float shadowNormalBias;
      float shadowRadius;
      vec2 shadowMapSize;
    };

    uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

  #endif

  #if NUM_SPOT_LIGHT_SHADOWS > 0

    struct SpotLightShadow {
      float shadowBias;
      float shadowNormalBias;
      float shadowRadius;
      vec2 shadowMapSize;
    };

    uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

  #endif

  #if NUM_POINT_LIGHT_SHADOWS > 0

    uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
    varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

    struct PointLightShadow {
      float shadowBias;
      float shadowNormalBias;
      float shadowRadius;
      vec2 shadowMapSize;
      float shadowCameraNear;
      float shadowCameraFar;
    };

    uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

  #endif

  /*
  #if NUM_RECT_AREA_LIGHTS > 0

    // TODO (abelnation): uniforms for area light shadows

  #endif
  */

#endif
`
), sc = (
  /* glsl */
  `

#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )

  // Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.
  vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
  vec4 shadowWorldPosition;

#endif

#if defined( USE_SHADOWMAP )

  #if NUM_DIR_LIGHT_SHADOWS > 0

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

      shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
      vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;

    }
    #pragma unroll_loop_end

  #endif

  #if NUM_POINT_LIGHT_SHADOWS > 0

    #pragma unroll_loop_start
    for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

      shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
      vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;

    }
    #pragma unroll_loop_end

  #endif

  /*
  #if NUM_RECT_AREA_LIGHTS > 0

    // TODO (abelnation): update vAreaShadowCoord with area light info

  #endif
  */

#endif

// spot lights can be evaluated without active shadow mapping (when SpotLight.map is used)

#if NUM_SPOT_LIGHT_COORDS > 0

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {

    shadowWorldPosition = worldPosition;
    #if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
      shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
    #endif
    vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;

  }
  #pragma unroll_loop_end

#endif


`
), rc = (
  /* glsl */
  `
float getShadowMask() {

  float shadow = 1.0;

  #ifdef USE_SHADOWMAP

  #if NUM_DIR_LIGHT_SHADOWS > 0

  DirectionalLightShadow directionalLight;

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

    directionalLight = directionalLightShadows[ i ];
    shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

  }
  #pragma unroll_loop_end

  #endif

  #if NUM_SPOT_LIGHT_SHADOWS > 0

  SpotLightShadow spotLight;

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

    spotLight = spotLightShadows[ i ];
    shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

  }
  #pragma unroll_loop_end

  #endif

  #if NUM_POINT_LIGHT_SHADOWS > 0

  PointLightShadow pointLight;

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

    pointLight = pointLightShadows[ i ];
    shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;

  }
  #pragma unroll_loop_end

  #endif

  /*
  #if NUM_RECT_AREA_LIGHTS > 0

    // TODO (abelnation): update shadow for Area light

  #endif
  */

  #endif

  return shadow;

}
`
), cc = (
  /* glsl */
  `
#ifdef USE_SKINNING

  mat4 boneMatX = getBoneMatrix( skinIndex.x );
  mat4 boneMatY = getBoneMatrix( skinIndex.y );
  mat4 boneMatZ = getBoneMatrix( skinIndex.z );
  mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`
), ac = (
  /* glsl */
  `
#ifdef USE_SKINNING

  uniform mat4 bindMatrix;
  uniform mat4 bindMatrixInverse;

  uniform highp sampler2D boneTexture;
  uniform int boneTextureSize;

  mat4 getBoneMatrix( const in float i ) {

    float j = i * 4.0;
    float x = mod( j, float( boneTextureSize ) );
    float y = floor( j / float( boneTextureSize ) );

    float dx = 1.0 / float( boneTextureSize );
    float dy = 1.0 / float( boneTextureSize );

    y = dy * ( y + 0.5 );

    vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
    vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
    vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
    vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );

    mat4 bone = mat4( v1, v2, v3, v4 );

    return bone;

  }

#endif
`
), oc = (
  /* glsl */
  `
#ifdef USE_SKINNING

  vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

  vec4 skinned = vec4( 0.0 );
  skinned += boneMatX * skinVertex * skinWeight.x;
  skinned += boneMatY * skinVertex * skinWeight.y;
  skinned += boneMatZ * skinVertex * skinWeight.z;
  skinned += boneMatW * skinVertex * skinWeight.w;

  transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`
), yc = (
  /* glsl */
  `
#ifdef USE_SKINNING

  mat4 skinMatrix = mat4( 0.0 );
  skinMatrix += skinWeight.x * boneMatX;
  skinMatrix += skinWeight.y * boneMatY;
  skinMatrix += skinWeight.z * boneMatZ;
  skinMatrix += skinWeight.w * boneMatW;
  skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

  objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;

  #ifdef USE_TANGENT

    objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

  #endif

#endif
`
), jc = (
  /* glsl */
  `
float specularStrength;

#ifdef USE_SPECULARMAP

  vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
  specularStrength = texelSpecular.r;

#else

  specularStrength = 1.0;

#endif
`
), Cc = (
  /* glsl */
  `
#ifdef USE_SPECULARMAP

  uniform sampler2D specularMap;

#endif
`
), Lc = (
  /* glsl */
  `
#if defined( TONE_MAPPING )

  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`
), wc = (
  /* glsl */
  `
#ifndef saturate
// <common> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

  return saturate( toneMappingExposure * color );

}

// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
vec3 ReinhardToneMapping( vec3 color ) {

  color *= toneMappingExposure;
  return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
vec3 OptimizedCineonToneMapping( vec3 color ) {

  // optimized filmic operator by Jim Hejl and Richard Burgess-Dawson
  color *= toneMappingExposure;
  color = max( vec3( 0.0 ), color - 0.004 );
  return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
vec3 RRTAndODTFit( vec3 v ) {

  vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
  vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
  return a / b;

}

// this implementation of ACES is modified to accommodate a brighter viewing environment.
// the scale factor of 1/0.6 is subjective. see discussion in #19621.

vec3 ACESFilmicToneMapping( vec3 color ) {

  // sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
  const mat3 ACESInputMat = mat3(
    vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
    vec3( 0.35458, 0.90834, 0.13383 ),
    vec3( 0.04823, 0.01566, 0.83777 )
  );

  // ODT_SAT => XYZ => D60_2_D65 => sRGB
  const mat3 ACESOutputMat = mat3(
    vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
    vec3( -0.53108,  1.10813, -0.07276 ),
    vec3( -0.07367, -0.00605,  1.07602 )
  );

  color *= toneMappingExposure / 0.6;

  color = ACESInputMat * color;

  // Apply RRT and ODT
  color = RRTAndODTFit( color );

  color = ACESOutputMat * color;

  // Clamp to [0, 1]
  return saturate( color );

}

vec3 CustomToneMapping( vec3 color ) { return color; }
`
), Oc = (
  /* glsl */
  `
#ifdef USE_TRANSMISSION

  material.transmission = transmission;
  material.transmissionAlpha = 1.0;
  material.thickness = thickness;
  material.attenuationDistance = attenuationDistance;
  material.attenuationColor = attenuationColor;

  #ifdef USE_TRANSMISSIONMAP

    material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;

  #endif

  #ifdef USE_THICKNESSMAP

    material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;

  #endif

  vec3 pos = vWorldPosition;
  vec3 v = normalize( cameraPosition - pos );
  vec3 n = inverseTransformDirection( normal, viewMatrix );

  vec4 transmitted = getIBLVolumeRefraction(
    n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
    pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
    material.attenuationColor, material.attenuationDistance );

  material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );

  totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );

#endif
`
), xc = (
  /* glsl */
  `
#ifdef USE_TRANSMISSION

  // Transmission code is based on glTF-Sampler-Viewer
  // https://github.com/KhronosGroup/glTF-Sample-Viewer

  uniform float transmission;
  uniform float thickness;
  uniform float attenuationDistance;
  uniform vec3 attenuationColor;

  #ifdef USE_TRANSMISSIONMAP

    uniform sampler2D transmissionMap;

  #endif

  #ifdef USE_THICKNESSMAP

    uniform sampler2D thicknessMap;

  #endif

  uniform vec2 transmissionSamplerSize;
  uniform sampler2D transmissionSamplerMap;

  uniform mat4 modelMatrix;
  uniform mat4 projectionMatrix;

  varying vec3 vWorldPosition;

  // Mipped Bicubic Texture Filtering by N8
  // https://www.shadertoy.com/view/Dl2SDW

  float w0( float a ) {

    return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );

  }

  float w1( float a ) {

    return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );

  }

  float w2( float a ){

    return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );

  }

  float w3( float a ) {

    return ( 1.0 / 6.0 ) * ( a * a * a );

  }

  // g0 and g1 are the two amplitude functions
  float g0( float a ) {

    return w0( a ) + w1( a );

  }

  float g1( float a ) {

    return w2( a ) + w3( a );

  }

  // h0 and h1 are the two offset functions
  float h0( float a ) {

    return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );

  }

  float h1( float a ) {

    return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );

  }

  vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {

    uv = uv * texelSize.zw + 0.5;

    vec2 iuv = floor( uv );
    vec2 fuv = fract( uv );

    float g0x = g0( fuv.x );
    float g1x = g1( fuv.x );
    float h0x = h0( fuv.x );
    float h1x = h1( fuv.x );
    float h0y = h0( fuv.y );
    float h1y = h1( fuv.y );

    vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
    vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;

    return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
      g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );

  }

  vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {

    vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
    vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
    vec2 fLodSizeInv = 1.0 / fLodSize;
    vec2 cLodSizeInv = 1.0 / cLodSize;
    vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
    vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
    return mix( fSample, cSample, fract( lod ) );

  }

  vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {

    // Direction of refracted light.
    vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );

    // Compute rotation-independant scaling of the model matrix.
    vec3 modelScale;
    modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
    modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
    modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );

    // The thickness is specified in local space.
    return normalize( refractionVector ) * thickness * modelScale;

  }

  float applyIorToRoughness( const in float roughness, const in float ior ) {

    // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
    // an IOR of 1.5 results in the default amount of microfacet refraction.
    return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );

  }

  vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {

    float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
    return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );

  }

  vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {

    if ( isinf( attenuationDistance ) ) {

      // Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
      return vec3( 1.0 );

    } else {

      // Compute light attenuation using Beer's law.
      vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
      vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
      return transmittance;

    }

  }

  vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
    const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
    const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
    const in vec3 attenuationColor, const in float attenuationDistance ) {

    vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
    vec3 refractedRayExit = position + transmissionRay;

    // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
    vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
    vec2 refractionCoords = ndcPos.xy / ndcPos.w;
    refractionCoords += 1.0;
    refractionCoords /= 2.0;

    // Sample framebuffer to get pixel the refracted ray hits.
    vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );

    vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
    vec3 attenuatedColor = transmittance * transmittedLight.rgb;

    // Get the specular component.
    vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );

    // As less light is transmitted, the opacity should be increased. This simple approximation does a decent job 
    // of modulating a CSS background, and has no effect when the buffer is opaque, due to a solid object or clear color.
    float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;

    return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );

  }
#endif
`
), Ec = (
  /* glsl */
  `
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

  varying vec2 vUv;

#endif
#ifdef USE_MAP

  varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

  varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

  varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

  varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

  varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

  varying vec2 vNormalMapUv;

#endif
#ifdef USE_EMISSIVEMAP

  varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

  varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

  varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

  varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

  varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

  varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

  varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

  varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

  varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

  varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

  varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_SPECULARMAP

  varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

  varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

  varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

  uniform mat3 transmissionMapTransform;
  varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

  uniform mat3 thicknessMapTransform;
  varying vec2 vThicknessMapUv;

#endif
`
), lc = (
  /* glsl */
  `
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

  varying vec2 vUv;

#endif
#ifdef USE_MAP

  uniform mat3 mapTransform;
  varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

  uniform mat3 alphaMapTransform;
  varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

  uniform mat3 lightMapTransform;
  varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

  uniform mat3 aoMapTransform;
  varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

  uniform mat3 bumpMapTransform;
  varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

  uniform mat3 normalMapTransform;
  varying vec2 vNormalMapUv;

#endif
#ifdef USE_DISPLACEMENTMAP

  uniform mat3 displacementMapTransform;
  varying vec2 vDisplacementMapUv;

#endif
#ifdef USE_EMISSIVEMAP

  uniform mat3 emissiveMapTransform;
  varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

  uniform mat3 metalnessMapTransform;
  varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

  uniform mat3 roughnessMapTransform;
  varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

  uniform mat3 anisotropyMapTransform;
  varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

  uniform mat3 clearcoatMapTransform;
  varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

  uniform mat3 clearcoatNormalMapTransform;
  varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

  uniform mat3 clearcoatRoughnessMapTransform;
  varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

  uniform mat3 sheenColorMapTransform;
  varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

  uniform mat3 sheenRoughnessMapTransform;
  varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

  uniform mat3 iridescenceMapTransform;
  varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

  uniform mat3 iridescenceThicknessMapTransform;
  varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SPECULARMAP

  uniform mat3 specularMapTransform;
  varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

  uniform mat3 specularColorMapTransform;
  varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

  uniform mat3 specularIntensityMapTransform;
  varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

  uniform mat3 transmissionMapTransform;
  varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

  uniform mat3 thicknessMapTransform;
  varying vec2 vThicknessMapUv;

#endif
`
), hc = (
  /* glsl */
  `
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

  vUv = vec3( uv, 1 ).xy;

#endif
#ifdef USE_MAP

  vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ALPHAMAP

  vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_LIGHTMAP

  vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_AOMAP

  vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_BUMPMAP

  vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_NORMALMAP

  vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

  vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_EMISSIVEMAP

  vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_METALNESSMAP

  vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ROUGHNESSMAP

  vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ANISOTROPYMAP

  vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOATMAP

  vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

  vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

  vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

  vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

  vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

  vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

  vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULARMAP

  vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

  vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

  vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

  vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_THICKNESSMAP

  vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;

#endif
`
), dc = (
  /* glsl */
  `
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0

  vec4 worldPosition = vec4( transformed, 1.0 );

  #ifdef USE_INSTANCING

    worldPosition = instanceMatrix * worldPosition;

  #endif

  worldPosition = modelMatrix * worldPosition;

#endif
`
), vc = (
  /* glsl */
  `
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

  vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

  gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`
), pc = (
  /* glsl */
  `
uniform sampler2D t2D;
uniform float backgroundIntensity;

varying vec2 vUv;

void main() {

  vec4 texColor = texture2D( t2D, vUv );

  #ifdef DECODE_VIDEO_TEXTURE

    // use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures

    texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );

  #endif

  texColor.rgb *= backgroundIntensity;

  gl_FragColor = texColor;

  #include <tonemapping_fragment>
  #include <colorspace_fragment>

}
`
), Yc = (
  /* glsl */
  `
varying vec3 vWorldDirection;

#include <common>

void main() {

  vWorldDirection = transformDirection( position, modelMatrix );

  #include <begin_vertex>
  #include <project_vertex>

  gl_Position.z = gl_Position.w; // set z to camera.far

}
`
), Uc = (
  /* glsl */
  `

#ifdef ENVMAP_TYPE_CUBE

  uniform samplerCube envMap;

#elif defined( ENVMAP_TYPE_CUBE_UV )

  uniform sampler2D envMap;

#endif

uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

  #ifdef ENVMAP_TYPE_CUBE

    vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );

  #elif defined( ENVMAP_TYPE_CUBE_UV )

    vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );

  #else

    vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );

  #endif

  texColor.rgb *= backgroundIntensity;

  gl_FragColor = texColor;

  #include <tonemapping_fragment>
  #include <colorspace_fragment>

}
`
), fc = (
  /* glsl */
  `
varying vec3 vWorldDirection;

#include <common>

void main() {

  vWorldDirection = transformDirection( position, modelMatrix );

  #include <begin_vertex>
  #include <project_vertex>

  gl_Position.z = gl_Position.w; // set z to camera.far

}
`
), mc = (
  /* glsl */
  `
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

  vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

  gl_FragColor = texColor;
  gl_FragColor.a *= opacity;

  #include <tonemapping_fragment>
  #include <colorspace_fragment>

}
`
), Qc = (
  /* glsl */
  `
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

  #include <uv_vertex>

  #include <skinbase_vertex>

  #ifdef USE_DISPLACEMENTMAP

    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinnormal_vertex>

  #endif

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

  vHighPrecisionZW = gl_Position.zw;

}
`
), Sc = (
  /* glsl */
  `
#if DEPTH_PACKING == 3200

  uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4( 1.0 );

  #if DEPTH_PACKING == 3200

    diffuseColor.a = opacity;

  #endif

  #include <map_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>

  #include <logdepthbuf_fragment>

  // Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.
  float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;

  #if DEPTH_PACKING == 3200

    gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

  #elif DEPTH_PACKING == 3201

    gl_FragColor = packDepthToRGBA( fragCoordZ );

  #endif

}
`
), kc = (
  /* glsl */
  `
#define DISTANCE

varying vec3 vWorldPosition;

#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  #include <uv_vertex>

  #include <skinbase_vertex>

  #ifdef USE_DISPLACEMENTMAP

    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinnormal_vertex>

  #endif

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  #include <project_vertex>
  #include <worldpos_vertex>
  #include <clipping_planes_vertex>

  vWorldPosition = worldPosition.xyz;

}
`
), Zc = (
  /* glsl */
  `
#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>

void main () {

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4( 1.0 );

  #include <map_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>

  float dist = length( vWorldPosition - referencePosition );
  dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
  dist = saturate( dist ); // clamp to [ 0, 1 ]

  gl_FragColor = packDepthToRGBA( dist );

}
`
), _c = (
  /* glsl */
  `
varying vec3 vWorldDirection;

#include <common>

void main() {

  vWorldDirection = transformDirection( position, modelMatrix );

  #include <begin_vertex>
  #include <project_vertex>

}
`
), bc = (
  /* glsl */
  `
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

  vec3 direction = normalize( vWorldDirection );

  vec2 sampleUV = equirectUv( direction );

  gl_FragColor = texture2D( tEquirect, sampleUV );

  #include <tonemapping_fragment>
  #include <colorspace_fragment>

}
`
), Kc = (
  /* glsl */
  `
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  vLineDistance = scale * lineDistance;

  #include <uv_vertex>
  #include <color_vertex>
  #include <morphcolor_vertex>
  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  #include <fog_vertex>

}
`
), Rc = (
  /* glsl */
  `
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  #include <clipping_planes_fragment>

  if ( mod( vLineDistance, totalSize ) > dashSize ) {

    discard;

  }

  vec3 outgoingLight = vec3( 0.0 );
  vec4 diffuseColor = vec4( diffuse, opacity );

  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>

  outgoingLight = diffuseColor.rgb; // simple shader

  #include <opaque_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>

}
`
), Pc = (
  /* glsl */
  `
#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  #include <uv_vertex>
  #include <color_vertex>
  #include <morphcolor_vertex>

  #if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>

  #endif

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

  #include <worldpos_vertex>
  #include <envmap_vertex>
  #include <fog_vertex>

}
`
), Fc = (
  /* glsl */
  `
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

  varying vec3 vNormal;

#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4( diffuse, opacity );

  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>
  #include <specularmap_fragment>

  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

  // accumulation (baked indirect lighting only)
  #ifdef USE_LIGHTMAP

    vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
    reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

  #else

    reflectedLight.indirectDiffuse += vec3( 1.0 );

  #endif

  // modulation
  #include <aomap_fragment>

  reflectedLight.indirectDiffuse *= diffuseColor.rgb;

  vec3 outgoingLight = reflectedLight.indirectDiffuse;

  #include <envmap_fragment>

  #include <opaque_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>

}
`
), Bc = (
  /* glsl */
  `
#define LAMBERT

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  #include <uv_vertex>
  #include <color_vertex>
  #include <morphcolor_vertex>

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <normal_vertex>

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

  vViewPosition = - mvPosition.xyz;

  #include <worldpos_vertex>
  #include <envmap_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>

}
`
), Vc = (
  /* glsl */
  `
#define LAMBERT

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4( diffuse, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissive;

  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>
  #include <specularmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <emissivemap_fragment>

  // accumulation
  #include <lights_lambert_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>

  // modulation
  #include <aomap_fragment>

  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

  #include <envmap_fragment>
  #include <opaque_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>

}
`
), Gc = (
  /* glsl */
  `
#define MATCAP

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  #include <uv_vertex>
  #include <color_vertex>
  #include <morphcolor_vertex>
  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <normal_vertex>

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  #include <project_vertex>

  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  #include <fog_vertex>

  vViewPosition = - mvPosition.xyz;

}
`
), Hc = (
  /* glsl */
  `
#define MATCAP

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4( diffuse, opacity );

  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>

  vec3 viewDir = normalize( vViewPosition );
  vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
  vec3 y = cross( viewDir, x );
  vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

  #ifdef USE_MATCAP

    vec4 matcapColor = texture2D( matcap, uv );

  #else

    vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing

  #endif

  vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

  #include <opaque_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>

}
`
), Wc = (
  /* glsl */
  `
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

  varying vec3 vViewPosition;

#endif

#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  #include <uv_vertex>

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <normal_vertex>

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

  vViewPosition = - mvPosition.xyz;

#endif

}
`
), Xc = (
  /* glsl */
  `
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

  varying vec3 vViewPosition;

#endif

#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  #include <clipping_planes_fragment>
  #include <logdepthbuf_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>

  gl_FragColor = vec4( packNormalToRGB( normal ), opacity );

  #ifdef OPAQUE

    gl_FragColor.a = 1.0;

  #endif

}
`
), qc = (
  /* glsl */
  `
#define PHONG

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  #include <uv_vertex>
  #include <color_vertex>
  #include <morphcolor_vertex>

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <normal_vertex>

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

  vViewPosition = - mvPosition.xyz;

  #include <worldpos_vertex>
  #include <envmap_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>

}
`
), $c = (
  /* glsl */
  `
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4( diffuse, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissive;

  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>
  #include <specularmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <emissivemap_fragment>

  // accumulation
  #include <lights_phong_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>

  // modulation
  #include <aomap_fragment>

  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

  #include <envmap_fragment>
  #include <opaque_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>

}
`
), Jc = (
  /* glsl */
  `
#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

  varying vec3 vWorldPosition;

#endif

#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  #include <uv_vertex>
  #include <color_vertex>
  #include <morphcolor_vertex>

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <normal_vertex>

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

  vViewPosition = - mvPosition.xyz;

  #include <worldpos_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>

#ifdef USE_TRANSMISSION

  vWorldPosition = worldPosition.xyz;

#endif
}
`
), Ma = (
  /* glsl */
  `
#define STANDARD

#ifdef PHYSICAL
  #define IOR
  #define USE_SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
  uniform float ior;
#endif

#ifdef USE_SPECULAR
  uniform float specularIntensity;
  uniform vec3 specularColor;

  #ifdef USE_SPECULAR_COLORMAP
    uniform sampler2D specularColorMap;
  #endif

  #ifdef USE_SPECULAR_INTENSITYMAP
    uniform sampler2D specularIntensityMap;
  #endif
#endif

#ifdef USE_CLEARCOAT
  uniform float clearcoat;
  uniform float clearcoatRoughness;
#endif

#ifdef USE_IRIDESCENCE
  uniform float iridescence;
  uniform float iridescenceIOR;
  uniform float iridescenceThicknessMinimum;
  uniform float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
  uniform vec3 sheenColor;
  uniform float sheenRoughness;

  #ifdef USE_SHEEN_COLORMAP
    uniform sampler2D sheenColorMap;
  #endif

  #ifdef USE_SHEEN_ROUGHNESSMAP
    uniform sampler2D sheenRoughnessMap;
  #endif
#endif

#ifdef USE_ANISOTROPY
  uniform vec2 anisotropyVector;

  #ifdef USE_ANISOTROPYMAP
    uniform sampler2D anisotropyMap;
  #endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4( diffuse, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissive;

  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>
  #include <roughnessmap_fragment>
  #include <metalnessmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <clearcoat_normal_fragment_begin>
  #include <clearcoat_normal_fragment_maps>
  #include <emissivemap_fragment>

  // accumulation
  #include <lights_physical_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>

  // modulation
  #include <aomap_fragment>

  vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
  vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

  #include <transmission_fragment>

  vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

  #ifdef USE_SHEEN

    // Sheen energy compensation approximation calculation can be found at the end of
    // https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
    float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );

    outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;

  #endif

  #ifdef USE_CLEARCOAT

    float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );

    vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

    outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;

  #endif

  #include <opaque_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>

}
`
), Da = (
  /* glsl */
  `
#define TOON

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  #include <uv_vertex>
  #include <color_vertex>
  #include <morphcolor_vertex>

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <normal_vertex>

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>

  vViewPosition = - mvPosition.xyz;

  #include <worldpos_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>

}
`
), ea = (
  /* glsl */
  `
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4( diffuse, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissive;

  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <emissivemap_fragment>

  // accumulation
  #include <lights_toon_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>

  // modulation
  #include <aomap_fragment>

  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

  #include <opaque_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>

}
`
), ta = (
  /* glsl */
  `
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_POINTS_UV

  varying vec2 vUv;
  uniform mat3 uvTransform;

#endif

void main() {

  #ifdef USE_POINTS_UV

    vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

  #endif

  #include <color_vertex>
  #include <morphcolor_vertex>
  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>

  gl_PointSize = size;

  #ifdef USE_SIZEATTENUATION

    bool isPerspective = isPerspectiveMatrix( projectionMatrix );

    if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

  #endif

  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  #include <worldpos_vertex>
  #include <fog_vertex>

}
`
), Na = (
  /* glsl */
  `
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  #include <clipping_planes_fragment>

  vec3 outgoingLight = vec3( 0.0 );
  vec4 diffuseColor = vec4( diffuse, opacity );

  #include <logdepthbuf_fragment>
  #include <map_particle_fragment>
  #include <color_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>

  outgoingLight = diffuseColor.rgb;

  #include <opaque_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>

}
`
), ia = (
  /* glsl */
  `
#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>

  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>

  #include <worldpos_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>

}
`
), Aa = (
  /* glsl */
  `
uniform vec3 color;
uniform float opacity;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

  #include <logdepthbuf_fragment>

  gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>

}
`
), na = (
  /* glsl */
  `
uniform float rotation;
uniform vec2 center;

#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

  #include <uv_vertex>

  vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

  vec2 scale;
  scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
  scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

  #ifndef USE_SIZEATTENUATION

    bool isPerspective = isPerspectiveMatrix( projectionMatrix );

    if ( isPerspective ) scale *= - mvPosition.z;

  #endif

  vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

  vec2 rotatedPosition;
  rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
  rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

  mvPosition.xy += rotatedPosition;

  gl_Position = projectionMatrix * mvPosition;

  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  #include <fog_vertex>

}
`
), za = (
  /* glsl */
  `
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

  #include <clipping_planes_fragment>

  vec3 outgoingLight = vec3( 0.0 );
  vec4 diffuseColor = vec4( diffuse, opacity );

  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <alphahash_fragment>

  outgoingLight = diffuseColor.rgb;

  #include <opaque_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>

}
`
), UM = {
  alphahash_fragment: Us,
  alphahash_pars_fragment: fs,
  alphamap_fragment: ms,
  alphamap_pars_fragment: Qs,
  alphatest_fragment: Ss,
  alphatest_pars_fragment: ks,
  aomap_fragment: Zs,
  aomap_pars_fragment: _s,
  begin_vertex: bs,
  beginnormal_vertex: Ks,
  bsdfs: Rs,
  iridescence_fragment: Ps,
  bumpmap_pars_fragment: Fs,
  clipping_planes_fragment: Bs,
  clipping_planes_pars_fragment: Vs,
  clipping_planes_pars_vertex: Gs,
  clipping_planes_vertex: Hs,
  color_fragment: Ws,
  color_pars_fragment: Xs,
  color_pars_vertex: qs,
  color_vertex: $s,
  common: Js,
  cube_uv_reflection_fragment: Mr,
  defaultnormal_vertex: Dr,
  displacementmap_pars_vertex: er,
  displacementmap_vertex: tr,
  emissivemap_fragment: Nr,
  emissivemap_pars_fragment: ir,
  colorspace_fragment: Ar,
  colorspace_pars_fragment: nr,
  envmap_fragment: zr,
  envmap_common_pars_fragment: Ir,
  envmap_pars_fragment: Tr,
  envmap_pars_vertex: ur,
  envmap_physical_pars_fragment: Or,
  envmap_vertex: gr,
  fog_vertex: sr,
  fog_pars_vertex: rr,
  fog_fragment: cr,
  fog_pars_fragment: ar,
  gradientmap_pars_fragment: or,
  lightmap_fragment: yr,
  lightmap_pars_fragment: jr,
  lights_lambert_fragment: Cr,
  lights_lambert_pars_fragment: Lr,
  lights_pars_begin: wr,
  lights_toon_fragment: xr,
  lights_toon_pars_fragment: Er,
  lights_phong_fragment: lr,
  lights_phong_pars_fragment: hr,
  lights_physical_fragment: dr,
  lights_physical_pars_fragment: vr,
  lights_fragment_begin: pr,
  lights_fragment_maps: Yr,
  lights_fragment_end: Ur,
  logdepthbuf_fragment: fr,
  logdepthbuf_pars_fragment: mr,
  logdepthbuf_pars_vertex: Qr,
  logdepthbuf_vertex: Sr,
  map_fragment: kr,
  map_pars_fragment: Zr,
  map_particle_fragment: _r,
  map_particle_pars_fragment: br,
  metalnessmap_fragment: Kr,
  metalnessmap_pars_fragment: Rr,
  morphcolor_vertex: Pr,
  morphnormal_vertex: Fr,
  morphtarget_pars_vertex: Br,
  morphtarget_vertex: Vr,
  normal_fragment_begin: Gr,
  normal_fragment_maps: Hr,
  normal_pars_fragment: Wr,
  normal_pars_vertex: Xr,
  normal_vertex: qr,
  normalmap_pars_fragment: $r,
  clearcoat_normal_fragment_begin: Jr,
  clearcoat_normal_fragment_maps: Mc,
  clearcoat_pars_fragment: Dc,
  iridescence_pars_fragment: ec,
  opaque_fragment: tc,
  packing: Nc,
  premultiplied_alpha_fragment: ic,
  project_vertex: Ac,
  dithering_fragment: nc,
  dithering_pars_fragment: zc,
  roughnessmap_fragment: Ic,
  roughnessmap_pars_fragment: Tc,
  shadowmap_pars_fragment: uc,
  shadowmap_pars_vertex: gc,
  shadowmap_vertex: sc,
  shadowmask_pars_fragment: rc,
  skinbase_vertex: cc,
  skinning_pars_vertex: ac,
  skinning_vertex: oc,
  skinnormal_vertex: yc,
  specularmap_fragment: jc,
  specularmap_pars_fragment: Cc,
  tonemapping_fragment: Lc,
  tonemapping_pars_fragment: wc,
  transmission_fragment: Oc,
  transmission_pars_fragment: xc,
  uv_pars_fragment: Ec,
  uv_pars_vertex: lc,
  uv_vertex: hc,
  worldpos_vertex: dc,
  background_vert: vc,
  background_frag: pc,
  backgroundCube_vert: Yc,
  backgroundCube_frag: Uc,
  cube_vert: fc,
  cube_frag: mc,
  depth_vert: Qc,
  depth_frag: Sc,
  distanceRGBA_vert: kc,
  distanceRGBA_frag: Zc,
  equirect_vert: _c,
  equirect_frag: bc,
  linedashed_vert: Kc,
  linedashed_frag: Rc,
  meshbasic_vert: Pc,
  meshbasic_frag: Fc,
  meshlambert_vert: Bc,
  meshlambert_frag: Vc,
  meshmatcap_vert: Gc,
  meshmatcap_frag: Hc,
  meshnormal_vert: Wc,
  meshnormal_frag: Xc,
  meshphong_vert: qc,
  meshphong_frag: $c,
  meshphysical_vert: Jc,
  meshphysical_frag: Ma,
  meshtoon_vert: Da,
  meshtoon_frag: ea,
  points_vert: ta,
  points_frag: Na,
  shadow_vert: ia,
  shadow_frag: Aa,
  sprite_vert: na,
  sprite_frag: za
}, iM = {
  common: {
    diffuse: { value: /* @__PURE__ */ new KM(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new kM() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new kM() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new kM() }
  },
  envmap: {
    envMap: { value: null },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new kM() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new kM() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new kM() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new kM() },
    normalScale: { value: /* @__PURE__ */ new rM(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new kM() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new kM() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new kM() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new kM() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new KM(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new KM(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new kM() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new kM() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new KM(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new rM(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new kM() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new kM() },
    alphaTest: { value: 0 }
  }
}, ee = {
  basic: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.specularmap,
      iM.envmap,
      iM.aomap,
      iM.lightmap,
      iM.fog
    ]),
    vertexShader: UM.meshbasic_vert,
    fragmentShader: UM.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.specularmap,
      iM.envmap,
      iM.aomap,
      iM.lightmap,
      iM.emissivemap,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      iM.fog,
      iM.lights,
      {
        emissive: { value: /* @__PURE__ */ new KM(0) }
      }
    ]),
    vertexShader: UM.meshlambert_vert,
    fragmentShader: UM.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.specularmap,
      iM.envmap,
      iM.aomap,
      iM.lightmap,
      iM.emissivemap,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      iM.fog,
      iM.lights,
      {
        emissive: { value: /* @__PURE__ */ new KM(0) },
        specular: { value: /* @__PURE__ */ new KM(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: UM.meshphong_vert,
    fragmentShader: UM.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.envmap,
      iM.aomap,
      iM.lightmap,
      iM.emissivemap,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      iM.roughnessmap,
      iM.metalnessmap,
      iM.fog,
      iM.lights,
      {
        emissive: { value: /* @__PURE__ */ new KM(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
        // temporary
      }
    ]),
    vertexShader: UM.meshphysical_vert,
    fragmentShader: UM.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.aomap,
      iM.lightmap,
      iM.emissivemap,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      iM.gradientmap,
      iM.fog,
      iM.lights,
      {
        emissive: { value: /* @__PURE__ */ new KM(0) }
      }
    ]),
    vertexShader: UM.meshtoon_vert,
    fragmentShader: UM.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      iM.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: UM.meshmatcap_vert,
    fragmentShader: UM.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ LD([
      iM.points,
      iM.fog
    ]),
    vertexShader: UM.points_vert,
    fragmentShader: UM.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: UM.linedashed_vert,
    fragmentShader: UM.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.displacementmap
    ]),
    vertexShader: UM.depth_vert,
    fragmentShader: UM.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.bumpmap,
      iM.normalmap,
      iM.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: UM.meshnormal_vert,
    fragmentShader: UM.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ LD([
      iM.sprite,
      iM.fog
    ]),
    vertexShader: UM.sprite_vert,
    fragmentShader: UM.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new kM() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: UM.background_vert,
    fragmentShader: UM.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: UM.backgroundCube_vert,
    fragmentShader: UM.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: UM.cube_vert,
    fragmentShader: UM.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: UM.equirect_vert,
    fragmentShader: UM.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ LD([
      iM.common,
      iM.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new Y() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: UM.distanceRGBA_vert,
    fragmentShader: UM.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ LD([
      iM.lights,
      iM.fog,
      {
        color: { value: /* @__PURE__ */ new KM(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: UM.shadow_vert,
    fragmentShader: UM.shadow_frag
  }
};
ee.physical = {
  uniforms: /* @__PURE__ */ LD([
    ee.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new kM() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new kM() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new rM(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new kM() },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new kM() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new kM() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new KM(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new kM() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new kM() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new kM() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new rM() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new kM() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new KM(0) },
      specularColor: { value: /* @__PURE__ */ new KM(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new kM() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new kM() },
      anisotropyVector: { value: /* @__PURE__ */ new rM() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new kM() }
    }
  ]),
  vertexShader: UM.meshphysical_vert,
  fragmentShader: UM.meshphysical_frag
};
const Ai = { r: 0, b: 0, g: 0 };
function Ia(N, M, D, e, t, i, n) {
  const A = new KM(0);
  let z = i === !0 ? 0 : 1, I, T, u = null, g = 0, s = null;
  function a(c, r) {
    let w = !1, y = r.isScene === !0 ? r.background : null;
    y && y.isTexture && (y = (r.backgroundBlurriness > 0 ? D : M).get(y)), y === null ? o(A, z) : y && y.isColor && (o(y, 1), w = !0);
    const j = N.xr.getEnvironmentBlendMode();
    j === "additive" ? e.buffers.color.setClear(0, 0, 0, 1, n) : j === "alpha-blend" && e.buffers.color.setClear(0, 0, 0, 0, n), (N.autoClear || w) && N.clear(N.autoClearColor, N.autoClearDepth, N.autoClearStencil), y && (y.isCubeTexture || y.mapping === $i) ? (T === void 0 && (T = new te(
      new mN(1, 1, 1),
      new It({
        name: "BackgroundCubeMaterial",
        uniforms: Jt(ee.backgroundCube.uniforms),
        vertexShader: ee.backgroundCube.vertexShader,
        fragmentShader: ee.backgroundCube.fragmentShader,
        side: pD,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), T.geometry.deleteAttribute("normal"), T.geometry.deleteAttribute("uv"), T.onBeforeRender = function(l, d, h) {
      this.matrixWorld.copyPosition(h.matrixWorld);
    }, Object.defineProperty(T.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), t.update(T)), T.material.uniforms.envMap.value = y, T.material.uniforms.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, T.material.uniforms.backgroundBlurriness.value = r.backgroundBlurriness, T.material.uniforms.backgroundIntensity.value = r.backgroundIntensity, T.material.toneMapped = PM.getTransfer(y.colorSpace) !== VM, (u !== y || g !== y.version || s !== N.toneMapping) && (T.material.needsUpdate = !0, u = y, g = y.version, s = N.toneMapping), T.layers.enableAll(), c.unshift(T, T.geometry, T.material, 0, 0, null)) : y && y.isTexture && (I === void 0 && (I = new te(
      new Zn(2, 2),
      new It({
        name: "BackgroundMaterial",
        uniforms: Jt(ee.background.uniforms),
        vertexShader: ee.background.vertexShader,
        fragmentShader: ee.background.fragmentShader,
        side: Pe,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), I.geometry.deleteAttribute("normal"), Object.defineProperty(I.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), t.update(I)), I.material.uniforms.t2D.value = y, I.material.uniforms.backgroundIntensity.value = r.backgroundIntensity, I.material.toneMapped = PM.getTransfer(y.colorSpace) !== VM, y.matrixAutoUpdate === !0 && y.updateMatrix(), I.material.uniforms.uvTransform.value.copy(y.matrix), (u !== y || g !== y.version || s !== N.toneMapping) && (I.material.needsUpdate = !0, u = y, g = y.version, s = N.toneMapping), I.layers.enableAll(), c.unshift(I, I.geometry, I.material, 0, 0, null));
  }
  function o(c, r) {
    c.getRGB(Ai, eu(N)), e.buffers.color.setClear(Ai.r, Ai.g, Ai.b, r, n);
  }
  return {
    getClearColor: function() {
      return A;
    },
    setClearColor: function(c, r = 1) {
      A.set(c), z = r, o(A, z);
    },
    getClearAlpha: function() {
      return z;
    },
    setClearAlpha: function(c) {
      z = c, o(A, z);
    },
    render: a
  };
}
function Ta(N, M, D, e) {
  const t = N.getParameter(N.MAX_VERTEX_ATTRIBS), i = e.isWebGL2 ? null : M.get("OES_vertex_array_object"), n = e.isWebGL2 || i !== null, A = {}, z = c(null);
  let I = z, T = !1;
  function u(p, k, V, F, $) {
    let W = !1;
    if (n) {
      const G = o(F, V, k);
      I !== G && (I = G, s(I.object)), W = r(p, F, V, $), W && w(p, F, V, $);
    } else {
      const G = k.wireframe === !0;
      (I.geometry !== F.id || I.program !== V.id || I.wireframe !== G) && (I.geometry = F.id, I.program = V.id, I.wireframe = G, W = !0);
    }
    $ !== null && D.update($, N.ELEMENT_ARRAY_BUFFER), (W || T) && (T = !1, Z(p, k, V, F), $ !== null && N.bindBuffer(N.ELEMENT_ARRAY_BUFFER, D.get($).buffer));
  }
  function g() {
    return e.isWebGL2 ? N.createVertexArray() : i.createVertexArrayOES();
  }
  function s(p) {
    return e.isWebGL2 ? N.bindVertexArray(p) : i.bindVertexArrayOES(p);
  }
  function a(p) {
    return e.isWebGL2 ? N.deleteVertexArray(p) : i.deleteVertexArrayOES(p);
  }
  function o(p, k, V) {
    const F = V.wireframe === !0;
    let $ = A[p.id];
    $ === void 0 && ($ = {}, A[p.id] = $);
    let W = $[k.id];
    W === void 0 && (W = {}, $[k.id] = W);
    let G = W[F];
    return G === void 0 && (G = c(g()), W[F] = G), G;
  }
  function c(p) {
    const k = [], V = [], F = [];
    for (let $ = 0; $ < t; $++)
      k[$] = 0, V[$] = 0, F[$] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: k,
      enabledAttributes: V,
      attributeDivisors: F,
      object: p,
      attributes: {},
      index: null
    };
  }
  function r(p, k, V, F) {
    const $ = I.attributes, W = k.attributes;
    let G = 0;
    const U = V.getAttributes();
    for (const K in U)
      if (U[K].location >= 0) {
        const zM = $[K];
        let gM = W[K];
        if (gM === void 0 && (K === "instanceMatrix" && p.instanceMatrix && (gM = p.instanceMatrix), K === "instanceColor" && p.instanceColor && (gM = p.instanceColor)), zM === void 0 || zM.attribute !== gM || gM && zM.data !== gM.data)
          return !0;
        G++;
      }
    return I.attributesNum !== G || I.index !== F;
  }
  function w(p, k, V, F) {
    const $ = {}, W = k.attributes;
    let G = 0;
    const U = V.getAttributes();
    for (const K in U)
      if (U[K].location >= 0) {
        let zM = W[K];
        zM === void 0 && (K === "instanceMatrix" && p.instanceMatrix && (zM = p.instanceMatrix), K === "instanceColor" && p.instanceColor && (zM = p.instanceColor));
        const gM = {};
        gM.attribute = zM, zM && zM.data && (gM.data = zM.data), $[K] = gM, G++;
      }
    I.attributes = $, I.attributesNum = G, I.index = F;
  }
  function y() {
    const p = I.newAttributes;
    for (let k = 0, V = p.length; k < V; k++)
      p[k] = 0;
  }
  function j(p) {
    l(p, 0);
  }
  function l(p, k) {
    const V = I.newAttributes, F = I.enabledAttributes, $ = I.attributeDivisors;
    V[p] = 1, F[p] === 0 && (N.enableVertexAttribArray(p), F[p] = 1), $[p] !== k && ((e.isWebGL2 ? N : M.get("ANGLE_instanced_arrays"))[e.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](p, k), $[p] = k);
  }
  function d() {
    const p = I.newAttributes, k = I.enabledAttributes;
    for (let V = 0, F = k.length; V < F; V++)
      k[V] !== p[V] && (N.disableVertexAttribArray(V), k[V] = 0);
  }
  function h(p, k, V, F, $, W, G) {
    G === !0 ? N.vertexAttribIPointer(p, k, V, $, W) : N.vertexAttribPointer(p, k, V, F, $, W);
  }
  function Z(p, k, V, F) {
    if (e.isWebGL2 === !1 && (p.isInstancedMesh || F.isInstancedBufferGeometry) && M.get("ANGLE_instanced_arrays") === null)
      return;
    y();
    const $ = F.attributes, W = V.getAttributes(), G = k.defaultAttributeValues;
    for (const U in W) {
      const K = W[U];
      if (K.location >= 0) {
        let nM = $[U];
        if (nM === void 0 && (U === "instanceMatrix" && p.instanceMatrix && (nM = p.instanceMatrix), U === "instanceColor" && p.instanceColor && (nM = p.instanceColor)), nM !== void 0) {
          const zM = nM.normalized, gM = nM.itemSize, yM = D.get(nM);
          if (yM === void 0)
            continue;
          const hM = yM.buffer, jM = yM.type, bM = yM.bytesPerElement, ED = e.isWebGL2 === !0 && (jM === N.INT || jM === N.UNSIGNED_INT || nM.gpuType === YT);
          if (nM.isInterleavedBufferAttribute) {
            const fM = nM.data, m = fM.stride, TD = nM.offset;
            if (fM.isInstancedInterleavedBuffer) {
              for (let CM = 0; CM < K.locationSize; CM++)
                l(K.location + CM, fM.meshPerAttribute);
              p.isInstancedMesh !== !0 && F._maxInstanceCount === void 0 && (F._maxInstanceCount = fM.meshPerAttribute * fM.count);
            } else
              for (let CM = 0; CM < K.locationSize; CM++)
                j(K.location + CM);
            N.bindBuffer(N.ARRAY_BUFFER, hM);
            for (let CM = 0; CM < K.locationSize; CM++)
              h(
                K.location + CM,
                gM / K.locationSize,
                jM,
                zM,
                m * bM,
                (TD + gM / K.locationSize * CM) * bM,
                ED
              );
          } else {
            if (nM.isInstancedBufferAttribute) {
              for (let fM = 0; fM < K.locationSize; fM++)
                l(K.location + fM, nM.meshPerAttribute);
              p.isInstancedMesh !== !0 && F._maxInstanceCount === void 0 && (F._maxInstanceCount = nM.meshPerAttribute * nM.count);
            } else
              for (let fM = 0; fM < K.locationSize; fM++)
                j(K.location + fM);
            N.bindBuffer(N.ARRAY_BUFFER, hM);
            for (let fM = 0; fM < K.locationSize; fM++)
              h(
                K.location + fM,
                gM / K.locationSize,
                jM,
                zM,
                gM * bM,
                gM / K.locationSize * fM * bM,
                ED
              );
          }
        } else if (G !== void 0) {
          const zM = G[U];
          if (zM !== void 0)
            switch (zM.length) {
              case 2:
                N.vertexAttrib2fv(K.location, zM);
                break;
              case 3:
                N.vertexAttrib3fv(K.location, zM);
                break;
              case 4:
                N.vertexAttrib4fv(K.location, zM);
                break;
              default:
                N.vertexAttrib1fv(K.location, zM);
            }
        }
      }
    }
    d();
  }
  function L() {
    B();
    for (const p in A) {
      const k = A[p];
      for (const V in k) {
        const F = k[V];
        for (const $ in F)
          a(F[$].object), delete F[$];
        delete k[V];
      }
      delete A[p];
    }
  }
  function x(p) {
    if (A[p.id] === void 0)
      return;
    const k = A[p.id];
    for (const V in k) {
      const F = k[V];
      for (const $ in F)
        a(F[$].object), delete F[$];
      delete k[V];
    }
    delete A[p.id];
  }
  function R(p) {
    for (const k in A) {
      const V = A[k];
      if (V[p.id] === void 0)
        continue;
      const F = V[p.id];
      for (const $ in F)
        a(F[$].object), delete F[$];
      delete V[p.id];
    }
  }
  function B() {
    H(), T = !0, I !== z && (I = z, s(I.object));
  }
  function H() {
    z.geometry = null, z.program = null, z.wireframe = !1;
  }
  return {
    setup: u,
    reset: B,
    resetDefaultState: H,
    dispose: L,
    releaseStatesOfGeometry: x,
    releaseStatesOfProgram: R,
    initAttributes: y,
    enableAttribute: j,
    disableUnusedAttributes: d
  };
}
function ua(N, M, D, e) {
  const t = e.isWebGL2;
  let i;
  function n(I) {
    i = I;
  }
  function A(I, T) {
    N.drawArrays(i, I, T), D.update(T, i, 1);
  }
  function z(I, T, u) {
    if (u === 0)
      return;
    let g, s;
    if (t)
      g = N, s = "drawArraysInstanced";
    else if (g = M.get("ANGLE_instanced_arrays"), s = "drawArraysInstancedANGLE", g === null) {
      console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    g[s](i, I, T, u), D.update(T, i, u);
  }
  this.setMode = n, this.render = A, this.renderInstances = z;
}
function ga(N, M, D) {
  let e;
  function t() {
    if (e !== void 0)
      return e;
    if (M.has("EXT_texture_filter_anisotropic") === !0) {
      const h = M.get("EXT_texture_filter_anisotropic");
      e = N.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      e = 0;
    return e;
  }
  function i(h) {
    if (h === "highp") {
      if (N.getShaderPrecisionFormat(N.VERTEX_SHADER, N.HIGH_FLOAT).precision > 0 && N.getShaderPrecisionFormat(N.FRAGMENT_SHADER, N.HIGH_FLOAT).precision > 0)
        return "highp";
      h = "mediump";
    }
    return h === "mediump" && N.getShaderPrecisionFormat(N.VERTEX_SHADER, N.MEDIUM_FLOAT).precision > 0 && N.getShaderPrecisionFormat(N.FRAGMENT_SHADER, N.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  const n = typeof WebGL2RenderingContext < "u" && N.constructor.name === "WebGL2RenderingContext";
  let A = D.precision !== void 0 ? D.precision : "highp";
  const z = i(A);
  z !== A && (console.warn("THREE.WebGLRenderer:", A, "not supported, using", z, "instead."), A = z);
  const I = n || M.has("WEBGL_draw_buffers"), T = D.logarithmicDepthBuffer === !0, u = N.getParameter(N.MAX_TEXTURE_IMAGE_UNITS), g = N.getParameter(N.MAX_VERTEX_TEXTURE_IMAGE_UNITS), s = N.getParameter(N.MAX_TEXTURE_SIZE), a = N.getParameter(N.MAX_CUBE_MAP_TEXTURE_SIZE), o = N.getParameter(N.MAX_VERTEX_ATTRIBS), c = N.getParameter(N.MAX_VERTEX_UNIFORM_VECTORS), r = N.getParameter(N.MAX_VARYING_VECTORS), w = N.getParameter(N.MAX_FRAGMENT_UNIFORM_VECTORS), y = g > 0, j = n || M.has("OES_texture_float"), l = y && j, d = n ? N.getParameter(N.MAX_SAMPLES) : 0;
  return {
    isWebGL2: n,
    drawBuffers: I,
    getMaxAnisotropy: t,
    getMaxPrecision: i,
    precision: A,
    logarithmicDepthBuffer: T,
    maxTextures: u,
    maxVertexTextures: g,
    maxTextureSize: s,
    maxCubemapSize: a,
    maxAttributes: o,
    maxVertexUniforms: c,
    maxVaryings: r,
    maxFragmentUniforms: w,
    vertexTextures: y,
    floatFragmentTextures: j,
    floatVertexTextures: l,
    maxSamples: d
  };
}
function sa(N) {
  const M = this;
  let D = null, e = 0, t = !1, i = !1;
  const n = new Dt(), A = new kM(), z = { value: null, needsUpdate: !1 };
  this.uniform = z, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, g) {
    const s = u.length !== 0 || g || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    e !== 0 || t;
    return t = g, e = u.length, s;
  }, this.beginShadows = function() {
    i = !0, T(null);
  }, this.endShadows = function() {
    i = !1;
  }, this.setGlobalState = function(u, g) {
    D = T(u, g, 0);
  }, this.setState = function(u, g, s) {
    const a = u.clippingPlanes, o = u.clipIntersection, c = u.clipShadows, r = N.get(u);
    if (!t || a === null || a.length === 0 || i && !c)
      i ? T(null) : I();
    else {
      const w = i ? 0 : e, y = w * 4;
      let j = r.clippingState || null;
      z.value = j, j = T(a, g, y, s);
      for (let l = 0; l !== y; ++l)
        j[l] = D[l];
      r.clippingState = j, this.numIntersection = o ? this.numPlanes : 0, this.numPlanes += w;
    }
  };
  function I() {
    z.value !== D && (z.value = D, z.needsUpdate = e > 0), M.numPlanes = e, M.numIntersection = 0;
  }
  function T(u, g, s, a) {
    const o = u !== null ? u.length : 0;
    let c = null;
    if (o !== 0) {
      if (c = z.value, a !== !0 || c === null) {
        const r = s + o * 4, w = g.matrixWorldInverse;
        A.getNormalMatrix(w), (c === null || c.length < r) && (c = new Float32Array(r));
        for (let y = 0, j = s; y !== o; ++y, j += 4)
          n.copy(u[y]).applyMatrix4(w, A), n.normal.toArray(c, j), c[j + 3] = n.constant;
      }
      z.value = c, z.needsUpdate = !0;
    }
    return M.numPlanes = o, M.numIntersection = 0, c;
  }
}
class ra extends tN {
  constructor(M = 1, D = 1, e = {}) {
    super(), this.isRenderTarget = !0, this.width = M, this.height = D, this.depth = 1, this.scissor = new nD(0, 0, M, D), this.scissorTest = !1, this.viewport = new nD(0, 0, M, D);
    const t = { width: M, height: D, depth: 1 };
    e.encoding !== void 0 && (LN("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."), e.colorSpace = e.encoding === nt ? eD : PD), e = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: dD,
      depthBuffer: !0,
      stencilBuffer: !1,
      depthTexture: null,
      samples: 0
    }, e), this.texture = new Me(t, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.flipY = !1, this.texture.generateMipmaps = e.generateMipmaps, this.texture.internalFormat = e.internalFormat, this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.depthTexture = e.depthTexture, this.samples = e.samples;
  }
  setSize(M, D, e = 1) {
    (this.width !== M || this.height !== D || this.depth !== e) && (this.width = M, this.height = D, this.depth = e, this.texture.image.width = M, this.texture.image.height = D, this.texture.image.depth = e, this.dispose()), this.viewport.set(0, 0, M, D), this.scissor.set(0, 0, M, D);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    this.width = M.width, this.height = M.height, this.depth = M.depth, this.scissor.copy(M.scissor), this.scissorTest = M.scissorTest, this.viewport.copy(M.viewport), this.texture = M.texture.clone(), this.texture.isRenderTargetTexture = !0;
    const D = Object.assign({}, M.texture.image);
    return this.texture.source = new WT(D), this.depthBuffer = M.depthBuffer, this.stencilBuffer = M.stencilBuffer, M.depthTexture !== null && (this.depthTexture = M.depthTexture.clone()), this.samples = M.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Tt extends ra {
  constructor(M = 1, D = 1, e = {}) {
    super(M, D, e), this.isWebGLRenderTarget = !0;
  }
}
const ht = -90, dt = 1;
class ca extends YD {
  constructor(M, D, e) {
    super(), this.type = "CubeCamera", this.renderTarget = e, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const t = new RD(ht, dt, M, D);
    t.layers = this.layers, this.add(t);
    const i = new RD(ht, dt, M, D);
    i.layers = this.layers, this.add(i);
    const n = new RD(ht, dt, M, D);
    n.layers = this.layers, this.add(n);
    const A = new RD(ht, dt, M, D);
    A.layers = this.layers, this.add(A);
    const z = new RD(ht, dt, M, D);
    z.layers = this.layers, this.add(z);
    const I = new RD(ht, dt, M, D);
    I.layers = this.layers, this.add(I);
  }
  updateCoordinateSystem() {
    const M = this.coordinateSystem, D = this.children.concat(), [e, t, i, n, A, z] = D;
    for (const I of D)
      this.remove(I);
    if (M === xe)
      e.up.set(0, 1, 0), e.lookAt(1, 0, 0), t.up.set(0, 1, 0), t.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), n.up.set(0, 0, 1), n.lookAt(0, -1, 0), A.up.set(0, 1, 0), A.lookAt(0, 0, 1), z.up.set(0, 1, 0), z.lookAt(0, 0, -1);
    else if (M === Hi)
      e.up.set(0, -1, 0), e.lookAt(-1, 0, 0), t.up.set(0, -1, 0), t.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), n.up.set(0, 0, -1), n.lookAt(0, -1, 0), A.up.set(0, -1, 0), A.lookAt(0, 0, 1), z.up.set(0, -1, 0), z.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + M);
    for (const I of D)
      this.add(I), I.updateMatrixWorld();
  }
  update(M, D) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: e, activeMipmapLevel: t } = this;
    this.coordinateSystem !== M.coordinateSystem && (this.coordinateSystem = M.coordinateSystem, this.updateCoordinateSystem());
    const [i, n, A, z, I, T] = this.children, u = M.getRenderTarget(), g = M.getActiveCubeFace(), s = M.getActiveMipmapLevel(), a = M.xr.enabled;
    M.xr.enabled = !1;
    const o = e.texture.generateMipmaps;
    e.texture.generateMipmaps = !1, M.setRenderTarget(e, 0, t), M.render(D, i), M.setRenderTarget(e, 1, t), M.render(D, n), M.setRenderTarget(e, 2, t), M.render(D, A), M.setRenderTarget(e, 3, t), M.render(D, z), M.setRenderTarget(e, 4, t), M.render(D, I), e.texture.generateMipmaps = o, M.setRenderTarget(e, 5, t), M.render(D, T), M.setRenderTarget(u, g, s), M.xr.enabled = a, e.texture.needsPMREMUpdate = !0;
  }
}
class tu extends Me {
  constructor(M, D, e, t, i, n, A, z, I, T) {
    M = M !== void 0 ? M : [], D = D !== void 0 ? D : Xt, super(M, D, e, t, i, n, A, z, I, T), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(M) {
    this.image = M;
  }
}
class aa extends Tt {
  constructor(M = 1, D = {}) {
    super(M, M, D), this.isWebGLCubeRenderTarget = !0;
    const e = { width: M, height: M, depth: 1 }, t = [e, e, e, e, e, e];
    D.encoding !== void 0 && (LN("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."), D.colorSpace = D.encoding === nt ? eD : PD), this.texture = new tu(t, D.mapping, D.wrapS, D.wrapT, D.magFilter, D.minFilter, D.format, D.type, D.anisotropy, D.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = D.generateMipmaps !== void 0 ? D.generateMipmaps : !1, this.texture.minFilter = D.minFilter !== void 0 ? D.minFilter : dD;
  }
  fromEquirectangularTexture(M, D) {
    this.texture.type = D.type, this.texture.colorSpace = D.colorSpace, this.texture.generateMipmaps = D.generateMipmaps, this.texture.minFilter = D.minFilter, this.texture.magFilter = D.magFilter;
    const e = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

        varying vec3 vWorldDirection;

        vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

          return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

        }

        void main() {

          vWorldDirection = transformDirection( position, modelMatrix );

          #include <begin_vertex>
          #include <project_vertex>

        }
      `
      ),
      fragmentShader: (
        /* glsl */
        `

        uniform sampler2D tEquirect;

        varying vec3 vWorldDirection;

        #include <common>

        void main() {

          vec3 direction = normalize( vWorldDirection );

          vec2 sampleUV = equirectUv( direction );

          gl_FragColor = texture2D( tEquirect, sampleUV );

        }
      `
      )
    }, t = new mN(5, 5, 5), i = new It({
      name: "CubemapFromEquirect",
      uniforms: Jt(e.uniforms),
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader,
      side: pD,
      blending: be
    });
    i.uniforms.tEquirect.value = D;
    const n = new te(t, i), A = D.minFilter;
    return D.minFilter === EN && (D.minFilter = dD), new ca(1, 10, this).update(M, n), D.minFilter = A, n.geometry.dispose(), n.material.dispose(), this;
  }
  clear(M, D, e, t) {
    const i = M.getRenderTarget();
    for (let n = 0; n < 6; n++)
      M.setRenderTarget(this, n), M.clear(D, e, t);
    M.setRenderTarget(i);
  }
}
function oa(N) {
  let M = /* @__PURE__ */ new WeakMap();
  function D(n, A) {
    return A === Cn ? n.mapping = Xt : A === Ln && (n.mapping = qt), n;
  }
  function e(n) {
    if (n && n.isTexture && n.isRenderTargetTexture === !1) {
      const A = n.mapping;
      if (A === Cn || A === Ln)
        if (M.has(n)) {
          const z = M.get(n).texture;
          return D(z, n.mapping);
        } else {
          const z = n.image;
          if (z && z.height > 0) {
            const I = new aa(z.height / 2);
            return I.fromEquirectangularTexture(N, n), M.set(n, I), n.addEventListener("dispose", t), D(I.texture, n.mapping);
          } else
            return null;
        }
    }
    return n;
  }
  function t(n) {
    const A = n.target;
    A.removeEventListener("dispose", t);
    const z = M.get(A);
    z !== void 0 && (M.delete(A), z.dispose());
  }
  function i() {
    M = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: i
  };
}
const Ft = 4, eI = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Nt = 20, ZA = /* @__PURE__ */ new VT(), tI = /* @__PURE__ */ new KM();
let _A = null;
const tt = (1 + Math.sqrt(5)) / 2, vt = 1 / tt, NI = [
  /* @__PURE__ */ new Y(1, 1, 1),
  /* @__PURE__ */ new Y(-1, 1, 1),
  /* @__PURE__ */ new Y(1, 1, -1),
  /* @__PURE__ */ new Y(-1, 1, -1),
  /* @__PURE__ */ new Y(0, tt, vt),
  /* @__PURE__ */ new Y(0, tt, -vt),
  /* @__PURE__ */ new Y(vt, 0, tt),
  /* @__PURE__ */ new Y(-vt, 0, tt),
  /* @__PURE__ */ new Y(tt, vt, 0),
  /* @__PURE__ */ new Y(-tt, vt, 0)
];
class iI {
  constructor(M) {
    this._renderer = M, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(M, D = 0, e = 0.1, t = 100) {
    _A = this._renderer.getRenderTarget(), this._setSize(256);
    const i = this._allocateTargets();
    return i.depthBuffer = !0, this._sceneToCubeUV(M, e, t, i), D > 0 && this._blur(i, 0, 0, D), this._applyPMREM(i), this._cleanup(i), i;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   */
  fromEquirectangular(M, D = null) {
    return this._fromTexture(M, D);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   */
  fromCubemap(M, D = null) {
    return this._fromTexture(M, D);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = zI(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = nI(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(M) {
    this._lodMax = Math.floor(Math.log2(M)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let M = 0; M < this._lodPlanes.length; M++)
      this._lodPlanes[M].dispose();
  }
  _cleanup(M) {
    this._renderer.setRenderTarget(_A), M.scissorTest = !1, ni(M, 0, 0, M.width, M.height);
  }
  _fromTexture(M, D) {
    M.mapping === Xt || M.mapping === qt ? this._setSize(M.image.length === 0 ? 16 : M.image[0].width || M.image[0].image.width) : this._setSize(M.image.width / 4), _A = this._renderer.getRenderTarget();
    const e = D || this._allocateTargets();
    return this._textureToCubeUV(M, e), this._applyPMREM(e), this._cleanup(e), e;
  }
  _allocateTargets() {
    const M = 3 * Math.max(this._cubeSize, 112), D = 4 * this._cubeSize, e = {
      magFilter: dD,
      minFilter: dD,
      generateMipmaps: !1,
      type: lN,
      format: JD,
      colorSpace: he,
      depthBuffer: !1
    }, t = AI(M, D, e);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== M || this._pingPongRenderTarget.height !== D) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = AI(M, D, e);
      const { _lodMax: i } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = ya(i)), this._blurMaterial = ja(i, M, D);
    }
    return t;
  }
  _compileMaterial(M) {
    const D = new te(this._lodPlanes[0], M);
    this._renderer.compile(D, ZA);
  }
  _sceneToCubeUV(M, D, e, t) {
    const A = new RD(90, 1, D, e), z = [1, -1, 1, 1, 1, 1], I = [1, 1, 1, -1, -1, -1], T = this._renderer, u = T.autoClear, g = T.toneMapping;
    T.getClearColor(tI), T.toneMapping = Ke, T.autoClear = !1;
    const s = new qT({
      name: "PMREM.Background",
      side: pD,
      depthWrite: !1,
      depthTest: !1
    }), a = new te(new mN(), s);
    let o = !1;
    const c = M.background;
    c ? c.isColor && (s.color.copy(c), M.background = null, o = !0) : (s.color.copy(tI), o = !0);
    for (let r = 0; r < 6; r++) {
      const w = r % 3;
      w === 0 ? (A.up.set(0, z[r], 0), A.lookAt(I[r], 0, 0)) : w === 1 ? (A.up.set(0, 0, z[r]), A.lookAt(0, I[r], 0)) : (A.up.set(0, z[r], 0), A.lookAt(0, 0, I[r]));
      const y = this._cubeSize;
      ni(t, w * y, r > 2 ? y : 0, y, y), T.setRenderTarget(t), o && T.render(a, A), T.render(M, A);
    }
    a.geometry.dispose(), a.material.dispose(), T.toneMapping = g, T.autoClear = u, M.background = c;
  }
  _textureToCubeUV(M, D) {
    const e = this._renderer, t = M.mapping === Xt || M.mapping === qt;
    t ? (this._cubemapMaterial === null && (this._cubemapMaterial = zI()), this._cubemapMaterial.uniforms.flipEnvMap.value = M.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = nI());
    const i = t ? this._cubemapMaterial : this._equirectMaterial, n = new te(this._lodPlanes[0], i), A = i.uniforms;
    A.envMap.value = M;
    const z = this._cubeSize;
    ni(D, 0, 0, 3 * z, 2 * z), e.setRenderTarget(D), e.render(n, ZA);
  }
  _applyPMREM(M) {
    const D = this._renderer, e = D.autoClear;
    D.autoClear = !1;
    for (let t = 1; t < this._lodPlanes.length; t++) {
      const i = Math.sqrt(this._sigmas[t] * this._sigmas[t] - this._sigmas[t - 1] * this._sigmas[t - 1]), n = NI[(t - 1) % NI.length];
      this._blur(M, t - 1, t, i, n);
    }
    D.autoClear = e;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(M, D, e, t, i) {
    const n = this._pingPongRenderTarget;
    this._halfBlur(
      M,
      n,
      D,
      e,
      t,
      "latitudinal",
      i
    ), this._halfBlur(
      n,
      M,
      e,
      e,
      t,
      "longitudinal",
      i
    );
  }
  _halfBlur(M, D, e, t, i, n, A) {
    const z = this._renderer, I = this._blurMaterial;
    n !== "latitudinal" && n !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const T = 3, u = new te(this._lodPlanes[t], I), g = I.uniforms, s = this._sizeLods[e] - 1, a = isFinite(i) ? Math.PI / (2 * s) : 2 * Math.PI / (2 * Nt - 1), o = i / a, c = isFinite(i) ? 1 + Math.floor(T * o) : Nt;
    c > Nt && console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${c} samples when the maximum is set to ${Nt}`);
    const r = [];
    let w = 0;
    for (let h = 0; h < Nt; ++h) {
      const Z = h / o, L = Math.exp(-Z * Z / 2);
      r.push(L), h === 0 ? w += L : h < c && (w += 2 * L);
    }
    for (let h = 0; h < r.length; h++)
      r[h] = r[h] / w;
    g.envMap.value = M.texture, g.samples.value = c, g.weights.value = r, g.latitudinal.value = n === "latitudinal", A && (g.poleAxis.value = A);
    const { _lodMax: y } = this;
    g.dTheta.value = a, g.mipInt.value = y - e;
    const j = this._sizeLods[t], l = 3 * j * (t > y - Ft ? t - y + Ft : 0), d = 4 * (this._cubeSize - j);
    ni(D, l, d, 3 * j, 2 * j), z.setRenderTarget(D), z.render(u, ZA);
  }
}
function ya(N) {
  const M = [], D = [], e = [];
  let t = N;
  const i = N - Ft + 1 + eI.length;
  for (let n = 0; n < i; n++) {
    const A = Math.pow(2, t);
    D.push(A);
    let z = 1 / A;
    n > N - Ft ? z = eI[n - N + Ft - 1] : n === 0 && (z = 0), e.push(z);
    const I = 1 / (A - 2), T = -I, u = 1 + I, g = [T, T, u, T, u, u, T, T, u, u, T, u], s = 6, a = 6, o = 3, c = 2, r = 1, w = new Float32Array(o * a * s), y = new Float32Array(c * a * s), j = new Float32Array(r * a * s);
    for (let d = 0; d < s; d++) {
      const h = d % 3 * 2 / 3 - 1, Z = d > 2 ? 0 : -1, L = [
        h,
        Z,
        0,
        h + 2 / 3,
        Z,
        0,
        h + 2 / 3,
        Z + 1,
        0,
        h,
        Z,
        0,
        h + 2 / 3,
        Z + 1,
        0,
        h,
        Z + 1,
        0
      ];
      w.set(L, o * a * d), y.set(g, c * a * d);
      const x = [d, d, d, d, d, d];
      j.set(x, r * a * d);
    }
    const l = new iN();
    l.setAttribute("position", new Ne(w, o)), l.setAttribute("uv", new Ne(y, c)), l.setAttribute("faceIndex", new Ne(j, r)), M.push(l), t > Ft && t--;
  }
  return { lodPlanes: M, sizeLods: D, sigmas: e };
}
function AI(N, M, D) {
  const e = new Tt(N, M, D);
  return e.texture.mapping = $i, e.texture.name = "PMREM.cubeUv", e.scissorTest = !0, e;
}
function ni(N, M, D, e, t) {
  N.viewport.set(M, D, e, t), N.scissor.set(M, D, e, t);
}
function ja(N, M, D) {
  const e = new Float32Array(Nt), t = new Y(0, 1, 0);
  return new It({
    name: "SphericalGaussianBlur",
    defines: {
      n: Nt,
      CUBEUV_TEXEL_WIDTH: 1 / M,
      CUBEUV_TEXEL_HEIGHT: 1 / D,
      CUBEUV_MAX_MIP: `${N}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: e },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: t }
    },
    vertexShader: _n(),
    fragmentShader: (
      /* glsl */
      `

      precision mediump float;
      precision mediump int;

      varying vec3 vOutputDirection;

      uniform sampler2D envMap;
      uniform int samples;
      uniform float weights[ n ];
      uniform bool latitudinal;
      uniform float dTheta;
      uniform float mipInt;
      uniform vec3 poleAxis;

      #define ENVMAP_TYPE_CUBE_UV
      #include <cube_uv_reflection_fragment>

      vec3 getSample( float theta, vec3 axis ) {

        float cosTheta = cos( theta );
        // Rodrigues' axis-angle rotation
        vec3 sampleDirection = vOutputDirection * cosTheta
          + cross( axis, vOutputDirection ) * sin( theta )
          + axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

        return bilinearCubeUV( envMap, sampleDirection, mipInt );

      }

      void main() {

        vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

        if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

          axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

        }

        axis = normalize( axis );

        gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
        gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

        for ( int i = 1; i < n; i++ ) {

          if ( i >= samples ) {

            break;

          }

          float theta = dTheta * float( i );
          gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
          gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

        }

      }
    `
    ),
    blending: be,
    depthTest: !1,
    depthWrite: !1
  });
}
function nI() {
  return new It({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: _n(),
    fragmentShader: (
      /* glsl */
      `

      precision mediump float;
      precision mediump int;

      varying vec3 vOutputDirection;

      uniform sampler2D envMap;

      #include <common>

      void main() {

        vec3 outputDirection = normalize( vOutputDirection );
        vec2 uv = equirectUv( outputDirection );

        gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

      }
    `
    ),
    blending: be,
    depthTest: !1,
    depthWrite: !1
  });
}
function zI() {
  return new It({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: _n(),
    fragmentShader: (
      /* glsl */
      `

      precision mediump float;
      precision mediump int;

      uniform float flipEnvMap;

      varying vec3 vOutputDirection;

      uniform samplerCube envMap;

      void main() {

        gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

      }
    `
    ),
    blending: be,
    depthTest: !1,
    depthWrite: !1
  });
}
function _n() {
  return (
    /* glsl */
    `

    precision mediump float;
    precision mediump int;

    attribute float faceIndex;

    varying vec3 vOutputDirection;

    // RH coordinate system; PMREM face-indexing convention
    vec3 getDirection( vec2 uv, float face ) {

      uv = 2.0 * uv - 1.0;

      vec3 direction = vec3( uv, 1.0 );

      if ( face == 0.0 ) {

        direction = direction.zyx; // ( 1, v, u ) pos x

      } else if ( face == 1.0 ) {

        direction = direction.xzy;
        direction.xz *= -1.0; // ( -u, 1, -v ) pos y

      } else if ( face == 2.0 ) {

        direction.x *= -1.0; // ( -u, v, 1 ) pos z

      } else if ( face == 3.0 ) {

        direction = direction.zyx;
        direction.xz *= -1.0; // ( -1, v, -u ) neg x

      } else if ( face == 4.0 ) {

        direction = direction.xzy;
        direction.xy *= -1.0; // ( -u, -1, v ) neg y

      } else if ( face == 5.0 ) {

        direction.z *= -1.0; // ( u, v, -1 ) neg z

      }

      return direction;

    }

    void main() {

      vOutputDirection = getDirection( uv, faceIndex );
      gl_Position = vec4( position, 1.0 );

    }
  `
  );
}
function Ca(N) {
  let M = /* @__PURE__ */ new WeakMap(), D = null;
  function e(A) {
    if (A && A.isTexture) {
      const z = A.mapping, I = z === Cn || z === Ln, T = z === Xt || z === qt;
      if (I || T)
        if (A.isRenderTargetTexture && A.needsPMREMUpdate === !0) {
          A.needsPMREMUpdate = !1;
          let u = M.get(A);
          return D === null && (D = new iI(N)), u = I ? D.fromEquirectangular(A, u) : D.fromCubemap(A, u), M.set(A, u), u.texture;
        } else {
          if (M.has(A))
            return M.get(A).texture;
          {
            const u = A.image;
            if (I && u && u.height > 0 || T && u && t(u)) {
              D === null && (D = new iI(N));
              const g = I ? D.fromEquirectangular(A) : D.fromCubemap(A);
              return M.set(A, g), A.addEventListener("dispose", i), g.texture;
            } else
              return null;
          }
        }
    }
    return A;
  }
  function t(A) {
    let z = 0;
    const I = 6;
    for (let T = 0; T < I; T++)
      A[T] !== void 0 && z++;
    return z === I;
  }
  function i(A) {
    const z = A.target;
    z.removeEventListener("dispose", i);
    const I = M.get(z);
    I !== void 0 && (M.delete(z), I.dispose());
  }
  function n() {
    M = /* @__PURE__ */ new WeakMap(), D !== null && (D.dispose(), D = null);
  }
  return {
    get: e,
    dispose: n
  };
}
function La(N) {
  const M = {};
  function D(e) {
    if (M[e] !== void 0)
      return M[e];
    let t;
    switch (e) {
      case "WEBGL_depth_texture":
        t = N.getExtension("WEBGL_depth_texture") || N.getExtension("MOZ_WEBGL_depth_texture") || N.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        t = N.getExtension("EXT_texture_filter_anisotropic") || N.getExtension("MOZ_EXT_texture_filter_anisotropic") || N.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        t = N.getExtension("WEBGL_compressed_texture_s3tc") || N.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || N.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        t = N.getExtension("WEBGL_compressed_texture_pvrtc") || N.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        t = N.getExtension(e);
    }
    return M[e] = t, t;
  }
  return {
    has: function(e) {
      return D(e) !== null;
    },
    init: function(e) {
      e.isWebGL2 ? D("EXT_color_buffer_float") : (D("WEBGL_depth_texture"), D("OES_texture_float"), D("OES_texture_half_float"), D("OES_texture_half_float_linear"), D("OES_standard_derivatives"), D("OES_element_index_uint"), D("OES_vertex_array_object"), D("ANGLE_instanced_arrays")), D("OES_texture_float_linear"), D("EXT_color_buffer_half_float"), D("WEBGL_multisampled_render_to_texture");
    },
    get: function(e) {
      const t = D(e);
      return t === null && console.warn("THREE.WebGLRenderer: " + e + " extension not supported."), t;
    }
  };
}
function wa(N, M, D, e) {
  const t = {}, i = /* @__PURE__ */ new WeakMap();
  function n(u) {
    const g = u.target;
    g.index !== null && M.remove(g.index);
    for (const a in g.attributes)
      M.remove(g.attributes[a]);
    for (const a in g.morphAttributes) {
      const o = g.morphAttributes[a];
      for (let c = 0, r = o.length; c < r; c++)
        M.remove(o[c]);
    }
    g.removeEventListener("dispose", n), delete t[g.id];
    const s = i.get(g);
    s && (M.remove(s), i.delete(g)), e.releaseStatesOfGeometry(g), g.isInstancedBufferGeometry === !0 && delete g._maxInstanceCount, D.memory.geometries--;
  }
  function A(u, g) {
    return t[g.id] === !0 || (g.addEventListener("dispose", n), t[g.id] = !0, D.memory.geometries++), g;
  }
  function z(u) {
    const g = u.attributes;
    for (const a in g)
      M.update(g[a], N.ARRAY_BUFFER);
    const s = u.morphAttributes;
    for (const a in s) {
      const o = s[a];
      for (let c = 0, r = o.length; c < r; c++)
        M.update(o[c], N.ARRAY_BUFFER);
    }
  }
  function I(u) {
    const g = [], s = u.index, a = u.attributes.position;
    let o = 0;
    if (s !== null) {
      const w = s.array;
      o = s.version;
      for (let y = 0, j = w.length; y < j; y += 3) {
        const l = w[y + 0], d = w[y + 1], h = w[y + 2];
        g.push(l, d, d, h, h, l);
      }
    } else if (a !== void 0) {
      const w = a.array;
      o = a.version;
      for (let y = 0, j = w.length / 3 - 1; y < j; y += 3) {
        const l = y + 0, d = y + 1, h = y + 2;
        g.push(l, d, d, h, h, l);
      }
    } else
      return;
    const c = new (GT(g) ? JT : $T)(g, 1);
    c.version = o;
    const r = i.get(u);
    r && M.remove(r), i.set(u, c);
  }
  function T(u) {
    const g = i.get(u);
    if (g) {
      const s = u.index;
      s !== null && g.version < s.version && I(u);
    } else
      I(u);
    return i.get(u);
  }
  return {
    get: A,
    update: z,
    getWireframeAttribute: T
  };
}
function Oa(N, M, D, e) {
  const t = e.isWebGL2;
  let i;
  function n(g) {
    i = g;
  }
  let A, z;
  function I(g) {
    A = g.type, z = g.bytesPerElement;
  }
  function T(g, s) {
    N.drawElements(i, s, A, g * z), D.update(s, i, 1);
  }
  function u(g, s, a) {
    if (a === 0)
      return;
    let o, c;
    if (t)
      o = N, c = "drawElementsInstanced";
    else if (o = M.get("ANGLE_instanced_arrays"), c = "drawElementsInstancedANGLE", o === null) {
      console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    o[c](i, s, A, g * z, a), D.update(s, i, a);
  }
  this.setMode = n, this.setIndex = I, this.render = T, this.renderInstances = u;
}
function xa(N) {
  const M = {
    geometries: 0,
    textures: 0
  }, D = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function e(i, n, A) {
    switch (D.calls++, n) {
      case N.TRIANGLES:
        D.triangles += A * (i / 3);
        break;
      case N.LINES:
        D.lines += A * (i / 2);
        break;
      case N.LINE_STRIP:
        D.lines += A * (i - 1);
        break;
      case N.LINE_LOOP:
        D.lines += A * i;
        break;
      case N.POINTS:
        D.points += A * i;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", n);
        break;
    }
  }
  function t() {
    D.calls = 0, D.triangles = 0, D.points = 0, D.lines = 0;
  }
  return {
    memory: M,
    render: D,
    programs: null,
    autoReset: !0,
    reset: t,
    update: e
  };
}
class Nu extends Me {
  constructor(M = null, D = 1, e = 1, t = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: M, width: D, height: e, depth: t }, this.magFilter = OD, this.minFilter = OD, this.wrapR = $D, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
function Ea(N, M) {
  return N[0] - M[0];
}
function la(N, M) {
  return Math.abs(M[1]) - Math.abs(N[1]);
}
function ha(N, M, D) {
  const e = {}, t = new Float32Array(8), i = /* @__PURE__ */ new WeakMap(), n = new nD(), A = [];
  for (let I = 0; I < 8; I++)
    A[I] = [I, 0];
  function z(I, T, u) {
    const g = I.morphTargetInfluences;
    if (M.isWebGL2 === !0) {
      const a = T.morphAttributes.position || T.morphAttributes.normal || T.morphAttributes.color, o = a !== void 0 ? a.length : 0;
      let c = i.get(T);
      if (c === void 0 || c.count !== o) {
        let k = function() {
          H.dispose(), i.delete(T), T.removeEventListener("dispose", k);
        };
        var s = k;
        c !== void 0 && c.texture.dispose();
        const y = T.morphAttributes.position !== void 0, j = T.morphAttributes.normal !== void 0, l = T.morphAttributes.color !== void 0, d = T.morphAttributes.position || [], h = T.morphAttributes.normal || [], Z = T.morphAttributes.color || [];
        let L = 0;
        y === !0 && (L = 1), j === !0 && (L = 2), l === !0 && (L = 3);
        let x = T.attributes.position.count * L, R = 1;
        x > M.maxTextureSize && (R = Math.ceil(x / M.maxTextureSize), x = M.maxTextureSize);
        const B = new Float32Array(x * R * 4 * o), H = new Nu(B, x, R, o);
        H.type = _e, H.needsUpdate = !0;
        const p = L * 4;
        for (let V = 0; V < o; V++) {
          const F = d[V], $ = h[V], W = Z[V], G = x * R * 4 * V;
          for (let U = 0; U < F.count; U++) {
            const K = U * p;
            y === !0 && (n.fromBufferAttribute(F, U), B[G + K + 0] = n.x, B[G + K + 1] = n.y, B[G + K + 2] = n.z, B[G + K + 3] = 0), j === !0 && (n.fromBufferAttribute($, U), B[G + K + 4] = n.x, B[G + K + 5] = n.y, B[G + K + 6] = n.z, B[G + K + 7] = 0), l === !0 && (n.fromBufferAttribute(W, U), B[G + K + 8] = n.x, B[G + K + 9] = n.y, B[G + K + 10] = n.z, B[G + K + 11] = W.itemSize === 4 ? n.w : 1);
          }
        }
        c = {
          count: o,
          texture: H,
          size: new rM(x, R)
        }, i.set(T, c), T.addEventListener("dispose", k);
      }
      let r = 0;
      for (let y = 0; y < g.length; y++)
        r += g[y];
      const w = T.morphTargetsRelative ? 1 : 1 - r;
      u.getUniforms().setValue(N, "morphTargetBaseInfluence", w), u.getUniforms().setValue(N, "morphTargetInfluences", g), u.getUniforms().setValue(N, "morphTargetsTexture", c.texture, D), u.getUniforms().setValue(N, "morphTargetsTextureSize", c.size);
    } else {
      const a = g === void 0 ? 0 : g.length;
      let o = e[T.id];
      if (o === void 0 || o.length !== a) {
        o = [];
        for (let j = 0; j < a; j++)
          o[j] = [j, 0];
        e[T.id] = o;
      }
      for (let j = 0; j < a; j++) {
        const l = o[j];
        l[0] = j, l[1] = g[j];
      }
      o.sort(la);
      for (let j = 0; j < 8; j++)
        j < a && o[j][1] ? (A[j][0] = o[j][0], A[j][1] = o[j][1]) : (A[j][0] = Number.MAX_SAFE_INTEGER, A[j][1] = 0);
      A.sort(Ea);
      const c = T.morphAttributes.position, r = T.morphAttributes.normal;
      let w = 0;
      for (let j = 0; j < 8; j++) {
        const l = A[j], d = l[0], h = l[1];
        d !== Number.MAX_SAFE_INTEGER && h ? (c && T.getAttribute("morphTarget" + j) !== c[d] && T.setAttribute("morphTarget" + j, c[d]), r && T.getAttribute("morphNormal" + j) !== r[d] && T.setAttribute("morphNormal" + j, r[d]), t[j] = h, w += h) : (c && T.hasAttribute("morphTarget" + j) === !0 && T.deleteAttribute("morphTarget" + j), r && T.hasAttribute("morphNormal" + j) === !0 && T.deleteAttribute("morphNormal" + j), t[j] = 0);
      }
      const y = T.morphTargetsRelative ? 1 : 1 - w;
      u.getUniforms().setValue(N, "morphTargetBaseInfluence", y), u.getUniforms().setValue(N, "morphTargetInfluences", t);
    }
  }
  return {
    update: z
  };
}
function da(N, M, D, e) {
  let t = /* @__PURE__ */ new WeakMap();
  function i(z) {
    const I = e.render.frame, T = z.geometry, u = M.get(z, T);
    if (t.get(u) !== I && (M.update(u), t.set(u, I)), z.isInstancedMesh && (z.hasEventListener("dispose", A) === !1 && z.addEventListener("dispose", A), t.get(z) !== I && (D.update(z.instanceMatrix, N.ARRAY_BUFFER), z.instanceColor !== null && D.update(z.instanceColor, N.ARRAY_BUFFER), t.set(z, I))), z.isSkinnedMesh) {
      const g = z.skeleton;
      t.get(g) !== I && (g.update(), t.set(g, I));
    }
    return u;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  function A(z) {
    const I = z.target;
    I.removeEventListener("dispose", A), D.remove(I.instanceMatrix), I.instanceColor !== null && D.remove(I.instanceColor);
  }
  return {
    update: i,
    dispose: n
  };
}
class va extends Me {
  constructor(M = null, D = 1, e = 1, t = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: M, width: D, height: e, depth: t }, this.magFilter = OD, this.minFilter = OD, this.wrapR = $D, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const iu = /* @__PURE__ */ new Me(), Au = /* @__PURE__ */ new Nu(), nu = /* @__PURE__ */ new va(), zu = /* @__PURE__ */ new tu(), II = [], TI = [], uI = new Float32Array(16), gI = new Float32Array(9), sI = new Float32Array(4);
function AN(N, M, D) {
  const e = N[0];
  if (e <= 0 || e > 0)
    return N;
  const t = M * D;
  let i = II[t];
  if (i === void 0 && (i = new Float32Array(t), II[t] = i), M !== 0) {
    e.toArray(i, 0);
    for (let n = 1, A = 0; n !== M; ++n)
      A += D, N[n].toArray(i, A);
  }
  return i;
}
function tD(N, M) {
  if (N.length !== M.length)
    return !1;
  for (let D = 0, e = N.length; D < e; D++)
    if (N[D] !== M[D])
      return !1;
  return !0;
}
function ND(N, M) {
  for (let D = 0, e = M.length; D < e; D++)
    N[D] = M[D];
}
function MA(N, M) {
  let D = TI[M];
  D === void 0 && (D = new Int32Array(M), TI[M] = D);
  for (let e = 0; e !== M; ++e)
    D[e] = N.allocateTextureUnit();
  return D;
}
function pa(N, M) {
  const D = this.cache;
  D[0] !== M && (N.uniform1f(this.addr, M), D[0] = M);
}
function Ya(N, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y) && (N.uniform2f(this.addr, M.x, M.y), D[0] = M.x, D[1] = M.y);
  else {
    if (tD(D, M))
      return;
    N.uniform2fv(this.addr, M), ND(D, M);
  }
}
function Ua(N, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z) && (N.uniform3f(this.addr, M.x, M.y, M.z), D[0] = M.x, D[1] = M.y, D[2] = M.z);
  else if (M.r !== void 0)
    (D[0] !== M.r || D[1] !== M.g || D[2] !== M.b) && (N.uniform3f(this.addr, M.r, M.g, M.b), D[0] = M.r, D[1] = M.g, D[2] = M.b);
  else {
    if (tD(D, M))
      return;
    N.uniform3fv(this.addr, M), ND(D, M);
  }
}
function fa(N, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z || D[3] !== M.w) && (N.uniform4f(this.addr, M.x, M.y, M.z, M.w), D[0] = M.x, D[1] = M.y, D[2] = M.z, D[3] = M.w);
  else {
    if (tD(D, M))
      return;
    N.uniform4fv(this.addr, M), ND(D, M);
  }
}
function ma(N, M) {
  const D = this.cache, e = M.elements;
  if (e === void 0) {
    if (tD(D, M))
      return;
    N.uniformMatrix2fv(this.addr, !1, M), ND(D, M);
  } else {
    if (tD(D, e))
      return;
    sI.set(e), N.uniformMatrix2fv(this.addr, !1, sI), ND(D, e);
  }
}
function Qa(N, M) {
  const D = this.cache, e = M.elements;
  if (e === void 0) {
    if (tD(D, M))
      return;
    N.uniformMatrix3fv(this.addr, !1, M), ND(D, M);
  } else {
    if (tD(D, e))
      return;
    gI.set(e), N.uniformMatrix3fv(this.addr, !1, gI), ND(D, e);
  }
}
function Sa(N, M) {
  const D = this.cache, e = M.elements;
  if (e === void 0) {
    if (tD(D, M))
      return;
    N.uniformMatrix4fv(this.addr, !1, M), ND(D, M);
  } else {
    if (tD(D, e))
      return;
    uI.set(e), N.uniformMatrix4fv(this.addr, !1, uI), ND(D, e);
  }
}
function ka(N, M) {
  const D = this.cache;
  D[0] !== M && (N.uniform1i(this.addr, M), D[0] = M);
}
function Za(N, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y) && (N.uniform2i(this.addr, M.x, M.y), D[0] = M.x, D[1] = M.y);
  else {
    if (tD(D, M))
      return;
    N.uniform2iv(this.addr, M), ND(D, M);
  }
}
function _a(N, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z) && (N.uniform3i(this.addr, M.x, M.y, M.z), D[0] = M.x, D[1] = M.y, D[2] = M.z);
  else {
    if (tD(D, M))
      return;
    N.uniform3iv(this.addr, M), ND(D, M);
  }
}
function ba(N, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z || D[3] !== M.w) && (N.uniform4i(this.addr, M.x, M.y, M.z, M.w), D[0] = M.x, D[1] = M.y, D[2] = M.z, D[3] = M.w);
  else {
    if (tD(D, M))
      return;
    N.uniform4iv(this.addr, M), ND(D, M);
  }
}
function Ka(N, M) {
  const D = this.cache;
  D[0] !== M && (N.uniform1ui(this.addr, M), D[0] = M);
}
function Ra(N, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y) && (N.uniform2ui(this.addr, M.x, M.y), D[0] = M.x, D[1] = M.y);
  else {
    if (tD(D, M))
      return;
    N.uniform2uiv(this.addr, M), ND(D, M);
  }
}
function Pa(N, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z) && (N.uniform3ui(this.addr, M.x, M.y, M.z), D[0] = M.x, D[1] = M.y, D[2] = M.z);
  else {
    if (tD(D, M))
      return;
    N.uniform3uiv(this.addr, M), ND(D, M);
  }
}
function Fa(N, M) {
  const D = this.cache;
  if (M.x !== void 0)
    (D[0] !== M.x || D[1] !== M.y || D[2] !== M.z || D[3] !== M.w) && (N.uniform4ui(this.addr, M.x, M.y, M.z, M.w), D[0] = M.x, D[1] = M.y, D[2] = M.z, D[3] = M.w);
  else {
    if (tD(D, M))
      return;
    N.uniform4uiv(this.addr, M), ND(D, M);
  }
}
function Ba(N, M, D) {
  const e = this.cache, t = D.allocateTextureUnit();
  e[0] !== t && (N.uniform1i(this.addr, t), e[0] = t), D.setTexture2D(M || iu, t);
}
function Va(N, M, D) {
  const e = this.cache, t = D.allocateTextureUnit();
  e[0] !== t && (N.uniform1i(this.addr, t), e[0] = t), D.setTexture3D(M || nu, t);
}
function Ga(N, M, D) {
  const e = this.cache, t = D.allocateTextureUnit();
  e[0] !== t && (N.uniform1i(this.addr, t), e[0] = t), D.setTextureCube(M || zu, t);
}
function Ha(N, M, D) {
  const e = this.cache, t = D.allocateTextureUnit();
  e[0] !== t && (N.uniform1i(this.addr, t), e[0] = t), D.setTexture2DArray(M || Au, t);
}
function Wa(N) {
  switch (N) {
    case 5126:
      return pa;
    case 35664:
      return Ya;
    case 35665:
      return Ua;
    case 35666:
      return fa;
    case 35674:
      return ma;
    case 35675:
      return Qa;
    case 35676:
      return Sa;
    case 5124:
    case 35670:
      return ka;
    case 35667:
    case 35671:
      return Za;
    case 35668:
    case 35672:
      return _a;
    case 35669:
    case 35673:
      return ba;
    case 5125:
      return Ka;
    case 36294:
      return Ra;
    case 36295:
      return Pa;
    case 36296:
      return Fa;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Ba;
    case 35679:
    case 36299:
    case 36307:
      return Va;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Ga;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Ha;
  }
}
function Xa(N, M) {
  N.uniform1fv(this.addr, M);
}
function qa(N, M) {
  const D = AN(M, this.size, 2);
  N.uniform2fv(this.addr, D);
}
function $a(N, M) {
  const D = AN(M, this.size, 3);
  N.uniform3fv(this.addr, D);
}
function Ja(N, M) {
  const D = AN(M, this.size, 4);
  N.uniform4fv(this.addr, D);
}
function Mo(N, M) {
  const D = AN(M, this.size, 4);
  N.uniformMatrix2fv(this.addr, !1, D);
}
function Do(N, M) {
  const D = AN(M, this.size, 9);
  N.uniformMatrix3fv(this.addr, !1, D);
}
function eo(N, M) {
  const D = AN(M, this.size, 16);
  N.uniformMatrix4fv(this.addr, !1, D);
}
function to(N, M) {
  N.uniform1iv(this.addr, M);
}
function No(N, M) {
  N.uniform2iv(this.addr, M);
}
function io(N, M) {
  N.uniform3iv(this.addr, M);
}
function Ao(N, M) {
  N.uniform4iv(this.addr, M);
}
function no(N, M) {
  N.uniform1uiv(this.addr, M);
}
function zo(N, M) {
  N.uniform2uiv(this.addr, M);
}
function Io(N, M) {
  N.uniform3uiv(this.addr, M);
}
function To(N, M) {
  N.uniform4uiv(this.addr, M);
}
function uo(N, M, D) {
  const e = this.cache, t = M.length, i = MA(D, t);
  tD(e, i) || (N.uniform1iv(this.addr, i), ND(e, i));
  for (let n = 0; n !== t; ++n)
    D.setTexture2D(M[n] || iu, i[n]);
}
function go(N, M, D) {
  const e = this.cache, t = M.length, i = MA(D, t);
  tD(e, i) || (N.uniform1iv(this.addr, i), ND(e, i));
  for (let n = 0; n !== t; ++n)
    D.setTexture3D(M[n] || nu, i[n]);
}
function so(N, M, D) {
  const e = this.cache, t = M.length, i = MA(D, t);
  tD(e, i) || (N.uniform1iv(this.addr, i), ND(e, i));
  for (let n = 0; n !== t; ++n)
    D.setTextureCube(M[n] || zu, i[n]);
}
function ro(N, M, D) {
  const e = this.cache, t = M.length, i = MA(D, t);
  tD(e, i) || (N.uniform1iv(this.addr, i), ND(e, i));
  for (let n = 0; n !== t; ++n)
    D.setTexture2DArray(M[n] || Au, i[n]);
}
function co(N) {
  switch (N) {
    case 5126:
      return Xa;
    case 35664:
      return qa;
    case 35665:
      return $a;
    case 35666:
      return Ja;
    case 35674:
      return Mo;
    case 35675:
      return Do;
    case 35676:
      return eo;
    case 5124:
    case 35670:
      return to;
    case 35667:
    case 35671:
      return No;
    case 35668:
    case 35672:
      return io;
    case 35669:
    case 35673:
      return Ao;
    case 5125:
      return no;
    case 36294:
      return zo;
    case 36295:
      return Io;
    case 36296:
      return To;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return uo;
    case 35679:
    case 36299:
    case 36307:
      return go;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return so;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return ro;
  }
}
class ao {
  constructor(M, D, e) {
    this.id = M, this.addr = e, this.cache = [], this.setValue = Wa(D.type);
  }
}
class oo {
  constructor(M, D, e) {
    this.id = M, this.addr = e, this.cache = [], this.size = D.size, this.setValue = co(D.type);
  }
}
class yo {
  constructor(M) {
    this.id = M, this.seq = [], this.map = {};
  }
  setValue(M, D, e) {
    const t = this.seq;
    for (let i = 0, n = t.length; i !== n; ++i) {
      const A = t[i];
      A.setValue(M, D[A.id], e);
    }
  }
}
const bA = /(\w+)(\])?(\[|\.)?/g;
function rI(N, M) {
  N.seq.push(M), N.map[M.id] = M;
}
function jo(N, M, D) {
  const e = N.name, t = e.length;
  for (bA.lastIndex = 0; ; ) {
    const i = bA.exec(e), n = bA.lastIndex;
    let A = i[1];
    const z = i[2] === "]", I = i[3];
    if (z && (A = A | 0), I === void 0 || I === "[" && n + 2 === t) {
      rI(D, I === void 0 ? new ao(A, N, M) : new oo(A, N, M));
      break;
    } else {
      let u = D.map[A];
      u === void 0 && (u = new yo(A), rI(D, u)), D = u;
    }
  }
}
class ki {
  constructor(M, D) {
    this.seq = [], this.map = {};
    const e = M.getProgramParameter(D, M.ACTIVE_UNIFORMS);
    for (let t = 0; t < e; ++t) {
      const i = M.getActiveUniform(D, t), n = M.getUniformLocation(D, i.name);
      jo(i, n, this);
    }
  }
  setValue(M, D, e, t) {
    const i = this.map[D];
    i !== void 0 && i.setValue(M, e, t);
  }
  setOptional(M, D, e) {
    const t = D[e];
    t !== void 0 && this.setValue(M, e, t);
  }
  static upload(M, D, e, t) {
    for (let i = 0, n = D.length; i !== n; ++i) {
      const A = D[i], z = e[A.id];
      z.needsUpdate !== !1 && A.setValue(M, z.value, t);
    }
  }
  static seqWithValue(M, D) {
    const e = [];
    for (let t = 0, i = M.length; t !== i; ++t) {
      const n = M[t];
      n.id in D && e.push(n);
    }
    return e;
  }
}
function cI(N, M, D) {
  const e = N.createShader(M);
  return N.shaderSource(e, D), N.compileShader(e), e;
}
let Co = 0;
function Lo(N, M) {
  const D = N.split(`
`), e = [], t = Math.max(M - 6, 0), i = Math.min(M + 6, D.length);
  for (let n = t; n < i; n++) {
    const A = n + 1;
    e.push(`${A === M ? ">" : " "} ${A}: ${D[n]}`);
  }
  return e.join(`
`);
}
function wo(N) {
  const M = PM.getPrimaries(PM.workingColorSpace), D = PM.getPrimaries(N);
  let e;
  switch (M === D ? e = "" : M === Gi && D === Vi ? e = "LinearDisplayP3ToLinearSRGB" : M === Vi && D === Gi && (e = "LinearSRGBToLinearDisplayP3"), N) {
    case he:
    case Ji:
      return [e, "LinearTransferOETF"];
    case eD:
    case mn:
      return [e, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", N), [e, "LinearTransferOETF"];
  }
}
function aI(N, M, D) {
  const e = N.getShaderParameter(M, N.COMPILE_STATUS), t = N.getShaderInfoLog(M).trim();
  if (e && t === "")
    return "";
  const i = /ERROR: 0:(\d+)/.exec(t);
  if (i) {
    const n = parseInt(i[1]);
    return D.toUpperCase() + `

` + t + `

` + Lo(N.getShaderSource(M), n);
  } else
    return t;
}
function Oo(N, M) {
  const D = wo(M);
  return `vec4 ${N}( vec4 value ) { return ${D[0]}( ${D[1]}( value ) ); }`;
}
function xo(N, M) {
  let D;
  switch (M) {
    case dg:
      D = "Linear";
      break;
    case vg:
      D = "Reinhard";
      break;
    case pg:
      D = "OptimizedCineon";
      break;
    case Yg:
      D = "ACESFilmic";
      break;
    case Ug:
      D = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", M), D = "Linear";
  }
  return "vec3 " + N + "( vec3 color ) { return " + D + "ToneMapping( color ); }";
}
function Eo(N) {
  return [
    N.extensionDerivatives || N.envMapCubeUVHeight || N.bumpMap || N.normalMapTangentSpace || N.clearcoatNormalMap || N.flatShading || N.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "",
    (N.extensionFragDepth || N.logarithmicDepthBuffer) && N.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "",
    N.extensionDrawBuffers && N.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "",
    (N.extensionShaderTextureLOD || N.envMap || N.transmission) && N.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""
  ].filter(yN).join(`
`);
}
function lo(N) {
  const M = [];
  for (const D in N) {
    const e = N[D];
    e !== !1 && M.push("#define " + D + " " + e);
  }
  return M.join(`
`);
}
function ho(N, M) {
  const D = {}, e = N.getProgramParameter(M, N.ACTIVE_ATTRIBUTES);
  for (let t = 0; t < e; t++) {
    const i = N.getActiveAttrib(M, t), n = i.name;
    let A = 1;
    i.type === N.FLOAT_MAT2 && (A = 2), i.type === N.FLOAT_MAT3 && (A = 3), i.type === N.FLOAT_MAT4 && (A = 4), D[n] = {
      type: i.type,
      location: N.getAttribLocation(M, n),
      locationSize: A
    };
  }
  return D;
}
function yN(N) {
  return N !== "";
}
function oI(N, M) {
  const D = M.numSpotLightShadows + M.numSpotLightMaps - M.numSpotLightShadowsWithMaps;
  return N.replace(/NUM_DIR_LIGHTS/g, M.numDirLights).replace(/NUM_SPOT_LIGHTS/g, M.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, M.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, D).replace(/NUM_RECT_AREA_LIGHTS/g, M.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, M.numPointLights).replace(/NUM_HEMI_LIGHTS/g, M.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, M.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, M.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, M.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, M.numPointLightShadows);
}
function yI(N, M) {
  return N.replace(/NUM_CLIPPING_PLANES/g, M.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, M.numClippingPlanes - M.numClipIntersection);
}
const vo = /^[ \t]*#include +<([\w\d./]+)>/gm;
function ln(N) {
  return N.replace(vo, Yo);
}
const po = /* @__PURE__ */ new Map([
  ["encodings_fragment", "colorspace_fragment"],
  // @deprecated, r154
  ["encodings_pars_fragment", "colorspace_pars_fragment"],
  // @deprecated, r154
  ["output_fragment", "opaque_fragment"]
  // @deprecated, r154
]);
function Yo(N, M) {
  let D = UM[M];
  if (D === void 0) {
    const e = po.get(M);
    if (e !== void 0)
      D = UM[e], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', M, e);
    else
      throw new Error("Can not resolve #include <" + M + ">");
  }
  return ln(D);
}
const Uo = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function jI(N) {
  return N.replace(Uo, fo);
}
function fo(N, M, D, e) {
  let t = "";
  for (let i = parseInt(M); i < parseInt(D); i++)
    t += e.replace(/\[\s*i\s*\]/g, "[ " + i + " ]").replace(/UNROLLED_LOOP_INDEX/g, i);
  return t;
}
function CI(N) {
  let M = "precision " + N.precision + ` float;
precision ` + N.precision + " int;";
  return N.precision === "highp" ? M += `
#define HIGH_PRECISION` : N.precision === "mediump" ? M += `
#define MEDIUM_PRECISION` : N.precision === "lowp" && (M += `
#define LOW_PRECISION`), M;
}
function mo(N) {
  let M = "SHADOWMAP_TYPE_BASIC";
  return N.shadowMapType === hT ? M = "SHADOWMAP_TYPE_PCF" : N.shadowMapType === Ag ? M = "SHADOWMAP_TYPE_PCF_SOFT" : N.shadowMapType === Le && (M = "SHADOWMAP_TYPE_VSM"), M;
}
function Qo(N) {
  let M = "ENVMAP_TYPE_CUBE";
  if (N.envMap)
    switch (N.envMapMode) {
      case Xt:
      case qt:
        M = "ENVMAP_TYPE_CUBE";
        break;
      case $i:
        M = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return M;
}
function So(N) {
  let M = "ENVMAP_MODE_REFLECTION";
  if (N.envMap)
    switch (N.envMapMode) {
      case qt:
        M = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return M;
}
function ko(N) {
  let M = "ENVMAP_BLENDING_NONE";
  if (N.envMap)
    switch (N.combine) {
      case Un:
        M = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case lg:
        M = "ENVMAP_BLENDING_MIX";
        break;
      case hg:
        M = "ENVMAP_BLENDING_ADD";
        break;
    }
  return M;
}
function Zo(N) {
  const M = N.envMapCubeUVHeight;
  if (M === null)
    return null;
  const D = Math.log2(M) - 2, e = 1 / M;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, D), 7 * 16)), texelHeight: e, maxMip: D };
}
function _o(N, M, D, e) {
  const t = N.getContext(), i = D.defines;
  let n = D.vertexShader, A = D.fragmentShader;
  const z = mo(D), I = Qo(D), T = So(D), u = ko(D), g = Zo(D), s = D.isWebGL2 ? "" : Eo(D), a = lo(i), o = t.createProgram();
  let c, r, w = D.glslVersion ? "#version " + D.glslVersion + `
` : "";
  D.isRawShaderMaterial ? (c = [
    "#define SHADER_TYPE " + D.shaderType,
    "#define SHADER_NAME " + D.shaderName,
    a
  ].filter(yN).join(`
`), c.length > 0 && (c += `
`), r = [
    s,
    "#define SHADER_TYPE " + D.shaderType,
    "#define SHADER_NAME " + D.shaderName,
    a
  ].filter(yN).join(`
`), r.length > 0 && (r += `
`)) : (c = [
    CI(D),
    "#define SHADER_TYPE " + D.shaderType,
    "#define SHADER_NAME " + D.shaderName,
    a,
    D.instancing ? "#define USE_INSTANCING" : "",
    D.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    D.useFog && D.fog ? "#define USE_FOG" : "",
    D.useFog && D.fogExp2 ? "#define FOG_EXP2" : "",
    D.map ? "#define USE_MAP" : "",
    D.envMap ? "#define USE_ENVMAP" : "",
    D.envMap ? "#define " + T : "",
    D.lightMap ? "#define USE_LIGHTMAP" : "",
    D.aoMap ? "#define USE_AOMAP" : "",
    D.bumpMap ? "#define USE_BUMPMAP" : "",
    D.normalMap ? "#define USE_NORMALMAP" : "",
    D.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    D.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    D.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    D.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    D.anisotropy ? "#define USE_ANISOTROPY" : "",
    D.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    D.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    D.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    D.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    D.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    D.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    D.specularMap ? "#define USE_SPECULARMAP" : "",
    D.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    D.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    D.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    D.metalnessMap ? "#define USE_METALNESSMAP" : "",
    D.alphaMap ? "#define USE_ALPHAMAP" : "",
    D.alphaHash ? "#define USE_ALPHAHASH" : "",
    D.transmission ? "#define USE_TRANSMISSION" : "",
    D.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    D.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    D.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    D.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    D.mapUv ? "#define MAP_UV " + D.mapUv : "",
    D.alphaMapUv ? "#define ALPHAMAP_UV " + D.alphaMapUv : "",
    D.lightMapUv ? "#define LIGHTMAP_UV " + D.lightMapUv : "",
    D.aoMapUv ? "#define AOMAP_UV " + D.aoMapUv : "",
    D.emissiveMapUv ? "#define EMISSIVEMAP_UV " + D.emissiveMapUv : "",
    D.bumpMapUv ? "#define BUMPMAP_UV " + D.bumpMapUv : "",
    D.normalMapUv ? "#define NORMALMAP_UV " + D.normalMapUv : "",
    D.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + D.displacementMapUv : "",
    D.metalnessMapUv ? "#define METALNESSMAP_UV " + D.metalnessMapUv : "",
    D.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + D.roughnessMapUv : "",
    D.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + D.anisotropyMapUv : "",
    D.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + D.clearcoatMapUv : "",
    D.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + D.clearcoatNormalMapUv : "",
    D.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + D.clearcoatRoughnessMapUv : "",
    D.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + D.iridescenceMapUv : "",
    D.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + D.iridescenceThicknessMapUv : "",
    D.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + D.sheenColorMapUv : "",
    D.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + D.sheenRoughnessMapUv : "",
    D.specularMapUv ? "#define SPECULARMAP_UV " + D.specularMapUv : "",
    D.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + D.specularColorMapUv : "",
    D.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + D.specularIntensityMapUv : "",
    D.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + D.transmissionMapUv : "",
    D.thicknessMapUv ? "#define THICKNESSMAP_UV " + D.thicknessMapUv : "",
    //
    D.vertexTangents && D.flatShading === !1 ? "#define USE_TANGENT" : "",
    D.vertexColors ? "#define USE_COLOR" : "",
    D.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    D.vertexUv1s ? "#define USE_UV1" : "",
    D.vertexUv2s ? "#define USE_UV2" : "",
    D.vertexUv3s ? "#define USE_UV3" : "",
    D.pointsUvs ? "#define USE_POINTS_UV" : "",
    D.flatShading ? "#define FLAT_SHADED" : "",
    D.skinning ? "#define USE_SKINNING" : "",
    D.morphTargets ? "#define USE_MORPHTARGETS" : "",
    D.morphNormals && D.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    D.morphColors && D.isWebGL2 ? "#define USE_MORPHCOLORS" : "",
    D.morphTargetsCount > 0 && D.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "",
    D.morphTargetsCount > 0 && D.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + D.morphTextureStride : "",
    D.morphTargetsCount > 0 && D.isWebGL2 ? "#define MORPHTARGETS_COUNT " + D.morphTargetsCount : "",
    D.doubleSided ? "#define DOUBLE_SIDED" : "",
    D.flipSided ? "#define FLIP_SIDED" : "",
    D.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    D.shadowMapEnabled ? "#define " + z : "",
    D.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    D.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    D.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
    D.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    D.logarithmicDepthBuffer && D.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
    "	attribute vec3 morphTarget0;",
    "	attribute vec3 morphTarget1;",
    "	attribute vec3 morphTarget2;",
    "	attribute vec3 morphTarget3;",
    "	#ifdef USE_MORPHNORMALS",
    "		attribute vec3 morphNormal0;",
    "		attribute vec3 morphNormal1;",
    "		attribute vec3 morphNormal2;",
    "		attribute vec3 morphNormal3;",
    "	#else",
    "		attribute vec3 morphTarget4;",
    "		attribute vec3 morphTarget5;",
    "		attribute vec3 morphTarget6;",
    "		attribute vec3 morphTarget7;",
    "	#endif",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(yN).join(`
`), r = [
    s,
    CI(D),
    "#define SHADER_TYPE " + D.shaderType,
    "#define SHADER_NAME " + D.shaderName,
    a,
    D.useFog && D.fog ? "#define USE_FOG" : "",
    D.useFog && D.fogExp2 ? "#define FOG_EXP2" : "",
    D.map ? "#define USE_MAP" : "",
    D.matcap ? "#define USE_MATCAP" : "",
    D.envMap ? "#define USE_ENVMAP" : "",
    D.envMap ? "#define " + I : "",
    D.envMap ? "#define " + T : "",
    D.envMap ? "#define " + u : "",
    g ? "#define CUBEUV_TEXEL_WIDTH " + g.texelWidth : "",
    g ? "#define CUBEUV_TEXEL_HEIGHT " + g.texelHeight : "",
    g ? "#define CUBEUV_MAX_MIP " + g.maxMip + ".0" : "",
    D.lightMap ? "#define USE_LIGHTMAP" : "",
    D.aoMap ? "#define USE_AOMAP" : "",
    D.bumpMap ? "#define USE_BUMPMAP" : "",
    D.normalMap ? "#define USE_NORMALMAP" : "",
    D.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    D.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    D.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    D.anisotropy ? "#define USE_ANISOTROPY" : "",
    D.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    D.clearcoat ? "#define USE_CLEARCOAT" : "",
    D.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    D.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    D.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    D.iridescence ? "#define USE_IRIDESCENCE" : "",
    D.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    D.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    D.specularMap ? "#define USE_SPECULARMAP" : "",
    D.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    D.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    D.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    D.metalnessMap ? "#define USE_METALNESSMAP" : "",
    D.alphaMap ? "#define USE_ALPHAMAP" : "",
    D.alphaTest ? "#define USE_ALPHATEST" : "",
    D.alphaHash ? "#define USE_ALPHAHASH" : "",
    D.sheen ? "#define USE_SHEEN" : "",
    D.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    D.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    D.transmission ? "#define USE_TRANSMISSION" : "",
    D.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    D.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    D.vertexTangents && D.flatShading === !1 ? "#define USE_TANGENT" : "",
    D.vertexColors || D.instancingColor ? "#define USE_COLOR" : "",
    D.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    D.vertexUv1s ? "#define USE_UV1" : "",
    D.vertexUv2s ? "#define USE_UV2" : "",
    D.vertexUv3s ? "#define USE_UV3" : "",
    D.pointsUvs ? "#define USE_POINTS_UV" : "",
    D.gradientMap ? "#define USE_GRADIENTMAP" : "",
    D.flatShading ? "#define FLAT_SHADED" : "",
    D.doubleSided ? "#define DOUBLE_SIDED" : "",
    D.flipSided ? "#define FLIP_SIDED" : "",
    D.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    D.shadowMapEnabled ? "#define " + z : "",
    D.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    D.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    D.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
    D.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    D.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    D.logarithmicDepthBuffer && D.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    D.toneMapping !== Ke ? "#define TONE_MAPPING" : "",
    D.toneMapping !== Ke ? UM.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    D.toneMapping !== Ke ? xo("toneMapping", D.toneMapping) : "",
    D.dithering ? "#define DITHERING" : "",
    D.opaque ? "#define OPAQUE" : "",
    UM.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Oo("linearToOutputTexel", D.outputColorSpace),
    D.useDepthPacking ? "#define DEPTH_PACKING " + D.depthPacking : "",
    `
`
  ].filter(yN).join(`
`)), n = ln(n), n = oI(n, D), n = yI(n, D), A = ln(A), A = oI(A, D), A = yI(A, D), n = jI(n), A = jI(A), D.isWebGL2 && D.isRawShaderMaterial !== !0 && (w = `#version 300 es
`, c = [
    "precision mediump sampler2DArray;",
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + c, r = [
    "#define varying in",
    D.glslVersion === kz ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    D.glslVersion === kz ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + r);
  const y = w + c + n, j = w + r + A, l = cI(t, t.VERTEX_SHADER, y), d = cI(t, t.FRAGMENT_SHADER, j);
  if (t.attachShader(o, l), t.attachShader(o, d), D.index0AttributeName !== void 0 ? t.bindAttribLocation(o, 0, D.index0AttributeName) : D.morphTargets === !0 && t.bindAttribLocation(o, 0, "position"), t.linkProgram(o), N.debug.checkShaderErrors) {
    const L = t.getProgramInfoLog(o).trim(), x = t.getShaderInfoLog(l).trim(), R = t.getShaderInfoLog(d).trim();
    let B = !0, H = !0;
    if (t.getProgramParameter(o, t.LINK_STATUS) === !1)
      if (B = !1, typeof N.debug.onShaderError == "function")
        N.debug.onShaderError(t, o, l, d);
      else {
        const p = aI(t, l, "vertex"), k = aI(t, d, "fragment");
        console.error(
          "THREE.WebGLProgram: Shader Error " + t.getError() + " - VALIDATE_STATUS " + t.getProgramParameter(o, t.VALIDATE_STATUS) + `

Program Info Log: ` + L + `
` + p + `
` + k
        );
      }
    else
      L !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", L) : (x === "" || R === "") && (H = !1);
    H && (this.diagnostics = {
      runnable: B,
      programLog: L,
      vertexShader: {
        log: x,
        prefix: c
      },
      fragmentShader: {
        log: R,
        prefix: r
      }
    });
  }
  t.deleteShader(l), t.deleteShader(d);
  let h;
  this.getUniforms = function() {
    return h === void 0 && (h = new ki(t, o)), h;
  };
  let Z;
  return this.getAttributes = function() {
    return Z === void 0 && (Z = ho(t, o)), Z;
  }, this.destroy = function() {
    e.releaseStatesOfProgram(this), t.deleteProgram(o), this.program = void 0;
  }, this.type = D.shaderType, this.name = D.shaderName, this.id = Co++, this.cacheKey = M, this.usedTimes = 1, this.program = o, this.vertexShader = l, this.fragmentShader = d, this;
}
let bo = 0;
class Ko {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(M) {
    const D = M.vertexShader, e = M.fragmentShader, t = this._getShaderStage(D), i = this._getShaderStage(e), n = this._getShaderCacheForMaterial(M);
    return n.has(t) === !1 && (n.add(t), t.usedTimes++), n.has(i) === !1 && (n.add(i), i.usedTimes++), this;
  }
  remove(M) {
    const D = this.materialCache.get(M);
    for (const e of D)
      e.usedTimes--, e.usedTimes === 0 && this.shaderCache.delete(e.code);
    return this.materialCache.delete(M), this;
  }
  getVertexShaderID(M) {
    return this._getShaderStage(M.vertexShader).id;
  }
  getFragmentShaderID(M) {
    return this._getShaderStage(M.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(M) {
    const D = this.materialCache;
    let e = D.get(M);
    return e === void 0 && (e = /* @__PURE__ */ new Set(), D.set(M, e)), e;
  }
  _getShaderStage(M) {
    const D = this.shaderCache;
    let e = D.get(M);
    return e === void 0 && (e = new Ro(M), D.set(M, e)), e;
  }
}
class Ro {
  constructor(M) {
    this.id = bo++, this.code = M, this.usedTimes = 0;
  }
}
function Po(N, M, D, e, t, i, n) {
  const A = new KT(), z = new Ko(), I = [], T = t.isWebGL2, u = t.logarithmicDepthBuffer, g = t.vertexTextures;
  let s = t.precision;
  const a = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function o(L) {
    return L === 0 ? "uv" : `uv${L}`;
  }
  function c(L, x, R, B, H) {
    const p = B.fog, k = H.geometry, V = L.isMeshStandardMaterial ? B.environment : null, F = (L.isMeshStandardMaterial ? D : M).get(L.envMap || V), $ = F && F.mapping === $i ? F.image.height : null, W = a[L.type];
    L.precision !== null && (s = t.getMaxPrecision(L.precision), s !== L.precision && console.warn("THREE.WebGLProgram.getParameters:", L.precision, "not supported, using", s, "instead."));
    const G = k.morphAttributes.position || k.morphAttributes.normal || k.morphAttributes.color, U = G !== void 0 ? G.length : 0;
    let K = 0;
    k.morphAttributes.position !== void 0 && (K = 1), k.morphAttributes.normal !== void 0 && (K = 2), k.morphAttributes.color !== void 0 && (K = 3);
    let nM, zM, gM, yM;
    if (W) {
      const BM = ee[W];
      nM = BM.vertexShader, zM = BM.fragmentShader;
    } else
      nM = L.vertexShader, zM = L.fragmentShader, z.update(L), gM = z.getVertexShaderID(L), yM = z.getFragmentShaderID(L);
    const hM = N.getRenderTarget(), jM = H.isInstancedMesh === !0, bM = !!L.map, ED = !!L.matcap, fM = !!F, m = !!L.aoMap, TD = !!L.lightMap, CM = !!L.bumpMap, pM = !!L.normalMap, lM = !!L.displacementMap, GM = !!L.emissiveMap, ZM = !!L.metalnessMap, mM = !!L.roughnessMap, FM = L.anisotropy > 0, zD = L.clearcoat > 0, uD = L.iridescence > 0, E = L.sheen > 0, C = L.transmission > 0, S = FM && !!L.anisotropyMap, MM = zD && !!L.clearcoatMap, q = zD && !!L.clearcoatNormalMap, DM = zD && !!L.clearcoatRoughnessMap, sM = uD && !!L.iridescenceMap, NM = uD && !!L.iridescenceThicknessMap, IM = E && !!L.sheenColorMap, wM = E && !!L.sheenRoughnessMap, _M = !!L.specularMap, J = !!L.specularColorMap, RM = !!L.specularIntensityMap, dM = C && !!L.transmissionMap, OM = C && !!L.thicknessMap, oM = !!L.gradientMap, v = !!L.alphaMap, tM = L.alphaTest > 0, eM = !!L.alphaHash, TM = !!L.extensions, AM = !!k.attributes.uv1, X = !!k.attributes.uv2, cM = !!k.attributes.uv3;
    let vM = Ke;
    return L.toneMapped && (hM === null || hM.isXRRenderTarget === !0) && (vM = N.toneMapping), {
      isWebGL2: T,
      shaderID: W,
      shaderType: L.type,
      shaderName: L.name,
      vertexShader: nM,
      fragmentShader: zM,
      defines: L.defines,
      customVertexShaderID: gM,
      customFragmentShaderID: yM,
      isRawShaderMaterial: L.isRawShaderMaterial === !0,
      glslVersion: L.glslVersion,
      precision: s,
      instancing: jM,
      instancingColor: jM && H.instanceColor !== null,
      supportsVertexTextures: g,
      outputColorSpace: hM === null ? N.outputColorSpace : hM.isXRRenderTarget === !0 ? hM.texture.colorSpace : he,
      map: bM,
      matcap: ED,
      envMap: fM,
      envMapMode: fM && F.mapping,
      envMapCubeUVHeight: $,
      aoMap: m,
      lightMap: TD,
      bumpMap: CM,
      normalMap: pM,
      displacementMap: g && lM,
      emissiveMap: GM,
      normalMapObjectSpace: pM && L.normalMapType === Bg,
      normalMapTangentSpace: pM && L.normalMapType === ZT,
      metalnessMap: ZM,
      roughnessMap: mM,
      anisotropy: FM,
      anisotropyMap: S,
      clearcoat: zD,
      clearcoatMap: MM,
      clearcoatNormalMap: q,
      clearcoatRoughnessMap: DM,
      iridescence: uD,
      iridescenceMap: sM,
      iridescenceThicknessMap: NM,
      sheen: E,
      sheenColorMap: IM,
      sheenRoughnessMap: wM,
      specularMap: _M,
      specularColorMap: J,
      specularIntensityMap: RM,
      transmission: C,
      transmissionMap: dM,
      thicknessMap: OM,
      gradientMap: oM,
      opaque: L.transparent === !1 && L.blending === Vt,
      alphaMap: v,
      alphaTest: tM,
      alphaHash: eM,
      combine: L.combine,
      //
      mapUv: bM && o(L.map.channel),
      aoMapUv: m && o(L.aoMap.channel),
      lightMapUv: TD && o(L.lightMap.channel),
      bumpMapUv: CM && o(L.bumpMap.channel),
      normalMapUv: pM && o(L.normalMap.channel),
      displacementMapUv: lM && o(L.displacementMap.channel),
      emissiveMapUv: GM && o(L.emissiveMap.channel),
      metalnessMapUv: ZM && o(L.metalnessMap.channel),
      roughnessMapUv: mM && o(L.roughnessMap.channel),
      anisotropyMapUv: S && o(L.anisotropyMap.channel),
      clearcoatMapUv: MM && o(L.clearcoatMap.channel),
      clearcoatNormalMapUv: q && o(L.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: DM && o(L.clearcoatRoughnessMap.channel),
      iridescenceMapUv: sM && o(L.iridescenceMap.channel),
      iridescenceThicknessMapUv: NM && o(L.iridescenceThicknessMap.channel),
      sheenColorMapUv: IM && o(L.sheenColorMap.channel),
      sheenRoughnessMapUv: wM && o(L.sheenRoughnessMap.channel),
      specularMapUv: _M && o(L.specularMap.channel),
      specularColorMapUv: J && o(L.specularColorMap.channel),
      specularIntensityMapUv: RM && o(L.specularIntensityMap.channel),
      transmissionMapUv: dM && o(L.transmissionMap.channel),
      thicknessMapUv: OM && o(L.thicknessMap.channel),
      alphaMapUv: v && o(L.alphaMap.channel),
      //
      vertexTangents: !!k.attributes.tangent && (pM || FM),
      vertexColors: L.vertexColors,
      vertexAlphas: L.vertexColors === !0 && !!k.attributes.color && k.attributes.color.itemSize === 4,
      vertexUv1s: AM,
      vertexUv2s: X,
      vertexUv3s: cM,
      pointsUvs: H.isPoints === !0 && !!k.attributes.uv && (bM || v),
      fog: !!p,
      useFog: L.fog === !0,
      fogExp2: p && p.isFogExp2,
      flatShading: L.flatShading === !0,
      sizeAttenuation: L.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      skinning: H.isSkinnedMesh === !0,
      morphTargets: k.morphAttributes.position !== void 0,
      morphNormals: k.morphAttributes.normal !== void 0,
      morphColors: k.morphAttributes.color !== void 0,
      morphTargetsCount: U,
      morphTextureStride: K,
      numDirLights: x.directional.length,
      numPointLights: x.point.length,
      numSpotLights: x.spot.length,
      numSpotLightMaps: x.spotLightMap.length,
      numRectAreaLights: x.rectArea.length,
      numHemiLights: x.hemi.length,
      numDirLightShadows: x.directionalShadowMap.length,
      numPointLightShadows: x.pointShadowMap.length,
      numSpotLightShadows: x.spotShadowMap.length,
      numSpotLightShadowsWithMaps: x.numSpotLightShadowsWithMaps,
      numLightProbes: x.numLightProbes,
      numClippingPlanes: n.numPlanes,
      numClipIntersection: n.numIntersection,
      dithering: L.dithering,
      shadowMapEnabled: N.shadowMap.enabled && R.length > 0,
      shadowMapType: N.shadowMap.type,
      toneMapping: vM,
      useLegacyLights: N._useLegacyLights,
      decodeVideoTexture: bM && L.map.isVideoTexture === !0 && PM.getTransfer(L.map.colorSpace) === VM,
      premultipliedAlpha: L.premultipliedAlpha,
      doubleSided: L.side === Oe,
      flipSided: L.side === pD,
      useDepthPacking: L.depthPacking >= 0,
      depthPacking: L.depthPacking || 0,
      index0AttributeName: L.index0AttributeName,
      extensionDerivatives: TM && L.extensions.derivatives === !0,
      extensionFragDepth: TM && L.extensions.fragDepth === !0,
      extensionDrawBuffers: TM && L.extensions.drawBuffers === !0,
      extensionShaderTextureLOD: TM && L.extensions.shaderTextureLOD === !0,
      rendererExtensionFragDepth: T || e.has("EXT_frag_depth"),
      rendererExtensionDrawBuffers: T || e.has("WEBGL_draw_buffers"),
      rendererExtensionShaderTextureLod: T || e.has("EXT_shader_texture_lod"),
      customProgramCacheKey: L.customProgramCacheKey()
    };
  }
  function r(L) {
    const x = [];
    if (L.shaderID ? x.push(L.shaderID) : (x.push(L.customVertexShaderID), x.push(L.customFragmentShaderID)), L.defines !== void 0)
      for (const R in L.defines)
        x.push(R), x.push(L.defines[R]);
    return L.isRawShaderMaterial === !1 && (w(x, L), y(x, L), x.push(N.outputColorSpace)), x.push(L.customProgramCacheKey), x.join();
  }
  function w(L, x) {
    L.push(x.precision), L.push(x.outputColorSpace), L.push(x.envMapMode), L.push(x.envMapCubeUVHeight), L.push(x.mapUv), L.push(x.alphaMapUv), L.push(x.lightMapUv), L.push(x.aoMapUv), L.push(x.bumpMapUv), L.push(x.normalMapUv), L.push(x.displacementMapUv), L.push(x.emissiveMapUv), L.push(x.metalnessMapUv), L.push(x.roughnessMapUv), L.push(x.anisotropyMapUv), L.push(x.clearcoatMapUv), L.push(x.clearcoatNormalMapUv), L.push(x.clearcoatRoughnessMapUv), L.push(x.iridescenceMapUv), L.push(x.iridescenceThicknessMapUv), L.push(x.sheenColorMapUv), L.push(x.sheenRoughnessMapUv), L.push(x.specularMapUv), L.push(x.specularColorMapUv), L.push(x.specularIntensityMapUv), L.push(x.transmissionMapUv), L.push(x.thicknessMapUv), L.push(x.combine), L.push(x.fogExp2), L.push(x.sizeAttenuation), L.push(x.morphTargetsCount), L.push(x.morphAttributeCount), L.push(x.numDirLights), L.push(x.numPointLights), L.push(x.numSpotLights), L.push(x.numSpotLightMaps), L.push(x.numHemiLights), L.push(x.numRectAreaLights), L.push(x.numDirLightShadows), L.push(x.numPointLightShadows), L.push(x.numSpotLightShadows), L.push(x.numSpotLightShadowsWithMaps), L.push(x.numLightProbes), L.push(x.shadowMapType), L.push(x.toneMapping), L.push(x.numClippingPlanes), L.push(x.numClipIntersection), L.push(x.depthPacking);
  }
  function y(L, x) {
    A.disableAll(), x.isWebGL2 && A.enable(0), x.supportsVertexTextures && A.enable(1), x.instancing && A.enable(2), x.instancingColor && A.enable(3), x.matcap && A.enable(4), x.envMap && A.enable(5), x.normalMapObjectSpace && A.enable(6), x.normalMapTangentSpace && A.enable(7), x.clearcoat && A.enable(8), x.iridescence && A.enable(9), x.alphaTest && A.enable(10), x.vertexColors && A.enable(11), x.vertexAlphas && A.enable(12), x.vertexUv1s && A.enable(13), x.vertexUv2s && A.enable(14), x.vertexUv3s && A.enable(15), x.vertexTangents && A.enable(16), x.anisotropy && A.enable(17), L.push(A.mask), A.disableAll(), x.fog && A.enable(0), x.useFog && A.enable(1), x.flatShading && A.enable(2), x.logarithmicDepthBuffer && A.enable(3), x.skinning && A.enable(4), x.morphTargets && A.enable(5), x.morphNormals && A.enable(6), x.morphColors && A.enable(7), x.premultipliedAlpha && A.enable(8), x.shadowMapEnabled && A.enable(9), x.useLegacyLights && A.enable(10), x.doubleSided && A.enable(11), x.flipSided && A.enable(12), x.useDepthPacking && A.enable(13), x.dithering && A.enable(14), x.transmission && A.enable(15), x.sheen && A.enable(16), x.opaque && A.enable(17), x.pointsUvs && A.enable(18), x.decodeVideoTexture && A.enable(19), L.push(A.mask);
  }
  function j(L) {
    const x = a[L.type];
    let R;
    if (x) {
      const B = ee[x];
      R = vs.clone(B.uniforms);
    } else
      R = L.uniforms;
    return R;
  }
  function l(L, x) {
    let R;
    for (let B = 0, H = I.length; B < H; B++) {
      const p = I[B];
      if (p.cacheKey === x) {
        R = p, ++R.usedTimes;
        break;
      }
    }
    return R === void 0 && (R = new _o(N, x, L, i), I.push(R)), R;
  }
  function d(L) {
    if (--L.usedTimes === 0) {
      const x = I.indexOf(L);
      I[x] = I[I.length - 1], I.pop(), L.destroy();
    }
  }
  function h(L) {
    z.remove(L);
  }
  function Z() {
    z.dispose();
  }
  return {
    getParameters: c,
    getProgramCacheKey: r,
    getUniforms: j,
    acquireProgram: l,
    releaseProgram: d,
    releaseShaderCache: h,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: I,
    dispose: Z
  };
}
function Fo() {
  let N = /* @__PURE__ */ new WeakMap();
  function M(i) {
    let n = N.get(i);
    return n === void 0 && (n = {}, N.set(i, n)), n;
  }
  function D(i) {
    N.delete(i);
  }
  function e(i, n, A) {
    N.get(i)[n] = A;
  }
  function t() {
    N = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: M,
    remove: D,
    update: e,
    dispose: t
  };
}
function Bo(N, M) {
  return N.groupOrder !== M.groupOrder ? N.groupOrder - M.groupOrder : N.renderOrder !== M.renderOrder ? N.renderOrder - M.renderOrder : N.material.id !== M.material.id ? N.material.id - M.material.id : N.z !== M.z ? N.z - M.z : N.id - M.id;
}
function LI(N, M) {
  return N.groupOrder !== M.groupOrder ? N.groupOrder - M.groupOrder : N.renderOrder !== M.renderOrder ? N.renderOrder - M.renderOrder : N.z !== M.z ? M.z - N.z : N.id - M.id;
}
function wI() {
  const N = [];
  let M = 0;
  const D = [], e = [], t = [];
  function i() {
    M = 0, D.length = 0, e.length = 0, t.length = 0;
  }
  function n(u, g, s, a, o, c) {
    let r = N[M];
    return r === void 0 ? (r = {
      id: u.id,
      object: u,
      geometry: g,
      material: s,
      groupOrder: a,
      renderOrder: u.renderOrder,
      z: o,
      group: c
    }, N[M] = r) : (r.id = u.id, r.object = u, r.geometry = g, r.material = s, r.groupOrder = a, r.renderOrder = u.renderOrder, r.z = o, r.group = c), M++, r;
  }
  function A(u, g, s, a, o, c) {
    const r = n(u, g, s, a, o, c);
    s.transmission > 0 ? e.push(r) : s.transparent === !0 ? t.push(r) : D.push(r);
  }
  function z(u, g, s, a, o, c) {
    const r = n(u, g, s, a, o, c);
    s.transmission > 0 ? e.unshift(r) : s.transparent === !0 ? t.unshift(r) : D.unshift(r);
  }
  function I(u, g) {
    D.length > 1 && D.sort(u || Bo), e.length > 1 && e.sort(g || LI), t.length > 1 && t.sort(g || LI);
  }
  function T() {
    for (let u = M, g = N.length; u < g; u++) {
      const s = N[u];
      if (s.id === null)
        break;
      s.id = null, s.object = null, s.geometry = null, s.material = null, s.group = null;
    }
  }
  return {
    opaque: D,
    transmissive: e,
    transparent: t,
    init: i,
    push: A,
    unshift: z,
    finish: T,
    sort: I
  };
}
function Vo() {
  let N = /* @__PURE__ */ new WeakMap();
  function M(e, t) {
    const i = N.get(e);
    let n;
    return i === void 0 ? (n = new wI(), N.set(e, [n])) : t >= i.length ? (n = new wI(), i.push(n)) : n = i[t], n;
  }
  function D() {
    N = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: M,
    dispose: D
  };
}
function Go() {
  const N = {};
  return {
    get: function(M) {
      if (N[M.id] !== void 0)
        return N[M.id];
      let D;
      switch (M.type) {
        case "DirectionalLight":
          D = {
            direction: new Y(),
            color: new KM()
          };
          break;
        case "SpotLight":
          D = {
            position: new Y(),
            direction: new Y(),
            color: new KM(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          D = {
            position: new Y(),
            color: new KM(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          D = {
            direction: new Y(),
            skyColor: new KM(),
            groundColor: new KM()
          };
          break;
        case "RectAreaLight":
          D = {
            color: new KM(),
            position: new Y(),
            halfWidth: new Y(),
            halfHeight: new Y()
          };
          break;
      }
      return N[M.id] = D, D;
    }
  };
}
function Ho() {
  const N = {};
  return {
    get: function(M) {
      if (N[M.id] !== void 0)
        return N[M.id];
      let D;
      switch (M.type) {
        case "DirectionalLight":
          D = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new rM()
          };
          break;
        case "SpotLight":
          D = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new rM()
          };
          break;
        case "PointLight":
          D = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new rM(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return N[M.id] = D, D;
    }
  };
}
let Wo = 0;
function Xo(N, M) {
  return (M.castShadow ? 2 : 0) - (N.castShadow ? 2 : 0) + (M.map ? 1 : 0) - (N.map ? 1 : 0);
}
function qo(N, M) {
  const D = new Go(), e = Ho(), t = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let T = 0; T < 9; T++)
    t.probe.push(new Y());
  const i = new Y(), n = new ID(), A = new ID();
  function z(T, u) {
    let g = 0, s = 0, a = 0;
    for (let B = 0; B < 9; B++)
      t.probe[B].set(0, 0, 0);
    let o = 0, c = 0, r = 0, w = 0, y = 0, j = 0, l = 0, d = 0, h = 0, Z = 0, L = 0;
    T.sort(Xo);
    const x = u === !0 ? Math.PI : 1;
    for (let B = 0, H = T.length; B < H; B++) {
      const p = T[B], k = p.color, V = p.intensity, F = p.distance, $ = p.shadow && p.shadow.map ? p.shadow.map.texture : null;
      if (p.isAmbientLight)
        g += k.r * V * x, s += k.g * V * x, a += k.b * V * x;
      else if (p.isLightProbe) {
        for (let W = 0; W < 9; W++)
          t.probe[W].addScaledVector(p.sh.coefficients[W], V);
        L++;
      } else if (p.isDirectionalLight) {
        const W = D.get(p);
        if (W.color.copy(p.color).multiplyScalar(p.intensity * x), p.castShadow) {
          const G = p.shadow, U = e.get(p);
          U.shadowBias = G.bias, U.shadowNormalBias = G.normalBias, U.shadowRadius = G.radius, U.shadowMapSize = G.mapSize, t.directionalShadow[o] = U, t.directionalShadowMap[o] = $, t.directionalShadowMatrix[o] = p.shadow.matrix, j++;
        }
        t.directional[o] = W, o++;
      } else if (p.isSpotLight) {
        const W = D.get(p);
        W.position.setFromMatrixPosition(p.matrixWorld), W.color.copy(k).multiplyScalar(V * x), W.distance = F, W.coneCos = Math.cos(p.angle), W.penumbraCos = Math.cos(p.angle * (1 - p.penumbra)), W.decay = p.decay, t.spot[r] = W;
        const G = p.shadow;
        if (p.map && (t.spotLightMap[h] = p.map, h++, G.updateMatrices(p), p.castShadow && Z++), t.spotLightMatrix[r] = G.matrix, p.castShadow) {
          const U = e.get(p);
          U.shadowBias = G.bias, U.shadowNormalBias = G.normalBias, U.shadowRadius = G.radius, U.shadowMapSize = G.mapSize, t.spotShadow[r] = U, t.spotShadowMap[r] = $, d++;
        }
        r++;
      } else if (p.isRectAreaLight) {
        const W = D.get(p);
        W.color.copy(k).multiplyScalar(V), W.halfWidth.set(p.width * 0.5, 0, 0), W.halfHeight.set(0, p.height * 0.5, 0), t.rectArea[w] = W, w++;
      } else if (p.isPointLight) {
        const W = D.get(p);
        if (W.color.copy(p.color).multiplyScalar(p.intensity * x), W.distance = p.distance, W.decay = p.decay, p.castShadow) {
          const G = p.shadow, U = e.get(p);
          U.shadowBias = G.bias, U.shadowNormalBias = G.normalBias, U.shadowRadius = G.radius, U.shadowMapSize = G.mapSize, U.shadowCameraNear = G.camera.near, U.shadowCameraFar = G.camera.far, t.pointShadow[c] = U, t.pointShadowMap[c] = $, t.pointShadowMatrix[c] = p.shadow.matrix, l++;
        }
        t.point[c] = W, c++;
      } else if (p.isHemisphereLight) {
        const W = D.get(p);
        W.skyColor.copy(p.color).multiplyScalar(V * x), W.groundColor.copy(p.groundColor).multiplyScalar(V * x), t.hemi[y] = W, y++;
      }
    }
    w > 0 && (M.isWebGL2 || N.has("OES_texture_float_linear") === !0 ? (t.rectAreaLTC1 = iM.LTC_FLOAT_1, t.rectAreaLTC2 = iM.LTC_FLOAT_2) : N.has("OES_texture_half_float_linear") === !0 ? (t.rectAreaLTC1 = iM.LTC_HALF_1, t.rectAreaLTC2 = iM.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), t.ambient[0] = g, t.ambient[1] = s, t.ambient[2] = a;
    const R = t.hash;
    (R.directionalLength !== o || R.pointLength !== c || R.spotLength !== r || R.rectAreaLength !== w || R.hemiLength !== y || R.numDirectionalShadows !== j || R.numPointShadows !== l || R.numSpotShadows !== d || R.numSpotMaps !== h || R.numLightProbes !== L) && (t.directional.length = o, t.spot.length = r, t.rectArea.length = w, t.point.length = c, t.hemi.length = y, t.directionalShadow.length = j, t.directionalShadowMap.length = j, t.pointShadow.length = l, t.pointShadowMap.length = l, t.spotShadow.length = d, t.spotShadowMap.length = d, t.directionalShadowMatrix.length = j, t.pointShadowMatrix.length = l, t.spotLightMatrix.length = d + h - Z, t.spotLightMap.length = h, t.numSpotLightShadowsWithMaps = Z, t.numLightProbes = L, R.directionalLength = o, R.pointLength = c, R.spotLength = r, R.rectAreaLength = w, R.hemiLength = y, R.numDirectionalShadows = j, R.numPointShadows = l, R.numSpotShadows = d, R.numSpotMaps = h, R.numLightProbes = L, t.version = Wo++);
  }
  function I(T, u) {
    let g = 0, s = 0, a = 0, o = 0, c = 0;
    const r = u.matrixWorldInverse;
    for (let w = 0, y = T.length; w < y; w++) {
      const j = T[w];
      if (j.isDirectionalLight) {
        const l = t.directional[g];
        l.direction.setFromMatrixPosition(j.matrixWorld), i.setFromMatrixPosition(j.target.matrixWorld), l.direction.sub(i), l.direction.transformDirection(r), g++;
      } else if (j.isSpotLight) {
        const l = t.spot[a];
        l.position.setFromMatrixPosition(j.matrixWorld), l.position.applyMatrix4(r), l.direction.setFromMatrixPosition(j.matrixWorld), i.setFromMatrixPosition(j.target.matrixWorld), l.direction.sub(i), l.direction.transformDirection(r), a++;
      } else if (j.isRectAreaLight) {
        const l = t.rectArea[o];
        l.position.setFromMatrixPosition(j.matrixWorld), l.position.applyMatrix4(r), A.identity(), n.copy(j.matrixWorld), n.premultiply(r), A.extractRotation(n), l.halfWidth.set(j.width * 0.5, 0, 0), l.halfHeight.set(0, j.height * 0.5, 0), l.halfWidth.applyMatrix4(A), l.halfHeight.applyMatrix4(A), o++;
      } else if (j.isPointLight) {
        const l = t.point[s];
        l.position.setFromMatrixPosition(j.matrixWorld), l.position.applyMatrix4(r), s++;
      } else if (j.isHemisphereLight) {
        const l = t.hemi[c];
        l.direction.setFromMatrixPosition(j.matrixWorld), l.direction.transformDirection(r), c++;
      }
    }
  }
  return {
    setup: z,
    setupView: I,
    state: t
  };
}
function OI(N, M) {
  const D = new qo(N, M), e = [], t = [];
  function i() {
    e.length = 0, t.length = 0;
  }
  function n(u) {
    e.push(u);
  }
  function A(u) {
    t.push(u);
  }
  function z(u) {
    D.setup(e, u);
  }
  function I(u) {
    D.setupView(e, u);
  }
  return {
    init: i,
    state: {
      lightsArray: e,
      shadowsArray: t,
      lights: D
    },
    setupLights: z,
    setupLightsView: I,
    pushLight: n,
    pushShadow: A
  };
}
function $o(N, M) {
  let D = /* @__PURE__ */ new WeakMap();
  function e(i, n = 0) {
    const A = D.get(i);
    let z;
    return A === void 0 ? (z = new OI(N, M), D.set(i, [z])) : n >= A.length ? (z = new OI(N, M), A.push(z)) : z = A[n], z;
  }
  function t() {
    D = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
class Jo extends fN {
  constructor(M) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Pg, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.depthPacking = M.depthPacking, this.map = M.map, this.alphaMap = M.alphaMap, this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this;
  }
}
class My extends fN {
  constructor(M) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.map = M.map, this.alphaMap = M.alphaMap, this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this;
  }
}
const Dy = (
  /* glsl */
  `
void main() {

  gl_Position = vec4( position, 1.0 );

}
`
), ey = (
  /* glsl */
  `
uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;

#include <packing>

void main() {

  const float samples = float( VSM_SAMPLES );

  float mean = 0.0;
  float squared_mean = 0.0;

  float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
  float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
  for ( float i = 0.0; i < samples; i ++ ) {

    float uvOffset = uvStart + i * uvStride;

    #ifdef HORIZONTAL_PASS

      vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
      mean += distribution.x;
      squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;

    #else

      float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
      mean += depth;
      squared_mean += depth * depth;

    #endif

  }

  mean = mean / samples;
  squared_mean = squared_mean / samples;

  float std_dev = sqrt( squared_mean - mean * mean );

  gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );

}
`
);
function ty(N, M, D) {
  let e = new Sn();
  const t = new rM(), i = new rM(), n = new nD(), A = new Jo({ depthPacking: Fg }), z = new My(), I = {}, T = D.maxTextureSize, u = { [Pe]: pD, [pD]: Pe, [Oe]: Oe }, g = new It({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new rM() },
      radius: { value: 4 }
    },
    vertexShader: Dy,
    fragmentShader: ey
  }), s = g.clone();
  s.defines.HORIZONTAL_PASS = 1;
  const a = new iN();
  a.setAttribute(
    "position",
    new Ne(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const o = new te(a, g), c = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = hT;
  let r = this.type;
  this.render = function(l, d, h) {
    if (c.enabled === !1 || c.autoUpdate === !1 && c.needsUpdate === !1 || l.length === 0)
      return;
    const Z = N.getRenderTarget(), L = N.getActiveCubeFace(), x = N.getActiveMipmapLevel(), R = N.state;
    R.setBlending(be), R.buffers.color.setClear(1, 1, 1, 1), R.buffers.depth.setTest(!0), R.setScissorTest(!1);
    const B = r !== Le && this.type === Le, H = r === Le && this.type !== Le;
    for (let p = 0, k = l.length; p < k; p++) {
      const V = l[p], F = V.shadow;
      if (F === void 0) {
        console.warn("THREE.WebGLShadowMap:", V, "has no shadow.");
        continue;
      }
      if (F.autoUpdate === !1 && F.needsUpdate === !1)
        continue;
      t.copy(F.mapSize);
      const $ = F.getFrameExtents();
      if (t.multiply($), i.copy(F.mapSize), (t.x > T || t.y > T) && (t.x > T && (i.x = Math.floor(T / $.x), t.x = i.x * $.x, F.mapSize.x = i.x), t.y > T && (i.y = Math.floor(T / $.y), t.y = i.y * $.y, F.mapSize.y = i.y)), F.map === null || B === !0 || H === !0) {
        const G = this.type !== Le ? { minFilter: OD, magFilter: OD } : {};
        F.map !== null && F.map.dispose(), F.map = new Tt(t.x, t.y, G), F.map.texture.name = V.name + ".shadowMap", F.camera.updateProjectionMatrix();
      }
      N.setRenderTarget(F.map), N.clear();
      const W = F.getViewportCount();
      for (let G = 0; G < W; G++) {
        const U = F.getViewport(G);
        n.set(
          i.x * U.x,
          i.y * U.y,
          i.x * U.z,
          i.y * U.w
        ), R.viewport(n), F.updateMatrices(V, G), e = F.getFrustum(), j(d, h, F.camera, V, this.type);
      }
      F.isPointLightShadow !== !0 && this.type === Le && w(F, h), F.needsUpdate = !1;
    }
    r = this.type, c.needsUpdate = !1, N.setRenderTarget(Z, L, x);
  };
  function w(l, d) {
    const h = M.update(o);
    g.defines.VSM_SAMPLES !== l.blurSamples && (g.defines.VSM_SAMPLES = l.blurSamples, s.defines.VSM_SAMPLES = l.blurSamples, g.needsUpdate = !0, s.needsUpdate = !0), l.mapPass === null && (l.mapPass = new Tt(t.x, t.y)), g.uniforms.shadow_pass.value = l.map.texture, g.uniforms.resolution.value = l.mapSize, g.uniforms.radius.value = l.radius, N.setRenderTarget(l.mapPass), N.clear(), N.renderBufferDirect(d, null, h, g, o, null), s.uniforms.shadow_pass.value = l.mapPass.texture, s.uniforms.resolution.value = l.mapSize, s.uniforms.radius.value = l.radius, N.setRenderTarget(l.map), N.clear(), N.renderBufferDirect(d, null, h, s, o, null);
  }
  function y(l, d, h, Z) {
    let L = null;
    const x = h.isPointLight === !0 ? l.customDistanceMaterial : l.customDepthMaterial;
    if (x !== void 0)
      L = x;
    else if (L = h.isPointLight === !0 ? z : A, N.localClippingEnabled && d.clipShadows === !0 && Array.isArray(d.clippingPlanes) && d.clippingPlanes.length !== 0 || d.displacementMap && d.displacementScale !== 0 || d.alphaMap && d.alphaTest > 0 || d.map && d.alphaTest > 0) {
      const R = L.uuid, B = d.uuid;
      let H = I[R];
      H === void 0 && (H = {}, I[R] = H);
      let p = H[B];
      p === void 0 && (p = L.clone(), H[B] = p), L = p;
    }
    if (L.visible = d.visible, L.wireframe = d.wireframe, Z === Le ? L.side = d.shadowSide !== null ? d.shadowSide : d.side : L.side = d.shadowSide !== null ? d.shadowSide : u[d.side], L.alphaMap = d.alphaMap, L.alphaTest = d.alphaTest, L.map = d.map, L.clipShadows = d.clipShadows, L.clippingPlanes = d.clippingPlanes, L.clipIntersection = d.clipIntersection, L.displacementMap = d.displacementMap, L.displacementScale = d.displacementScale, L.displacementBias = d.displacementBias, L.wireframeLinewidth = d.wireframeLinewidth, L.linewidth = d.linewidth, h.isPointLight === !0 && L.isMeshDistanceMaterial === !0) {
      const R = N.properties.get(L);
      R.light = h;
    }
    return L;
  }
  function j(l, d, h, Z, L) {
    if (l.visible === !1)
      return;
    if (l.layers.test(d.layers) && (l.isMesh || l.isLine || l.isPoints) && (l.castShadow || l.receiveShadow && L === Le) && (!l.frustumCulled || e.intersectsObject(l))) {
      l.modelViewMatrix.multiplyMatrices(h.matrixWorldInverse, l.matrixWorld);
      const B = M.update(l), H = l.material;
      if (Array.isArray(H)) {
        const p = B.groups;
        for (let k = 0, V = p.length; k < V; k++) {
          const F = p[k], $ = H[F.materialIndex];
          if ($ && $.visible) {
            const W = y(l, $, Z, L);
            N.renderBufferDirect(h, null, B, W, l, F);
          }
        }
      } else if (H.visible) {
        const p = y(l, H, Z, L);
        N.renderBufferDirect(h, null, B, p, l, null);
      }
    }
    const R = l.children;
    for (let B = 0, H = R.length; B < H; B++)
      j(R[B], d, h, Z, L);
  }
}
function Ny(N, M, D) {
  const e = D.isWebGL2;
  function t() {
    let v = !1;
    const tM = new nD();
    let eM = null;
    const TM = new nD(0, 0, 0, 0);
    return {
      setMask: function(AM) {
        eM !== AM && !v && (N.colorMask(AM, AM, AM, AM), eM = AM);
      },
      setLocked: function(AM) {
        v = AM;
      },
      setClear: function(AM, X, cM, vM, yD) {
        yD === !0 && (AM *= vM, X *= vM, cM *= vM), tM.set(AM, X, cM, vM), TM.equals(tM) === !1 && (N.clearColor(AM, X, cM, vM), TM.copy(tM));
      },
      reset: function() {
        v = !1, eM = null, TM.set(-1, 0, 0, 0);
      }
    };
  }
  function i() {
    let v = !1, tM = null, eM = null, TM = null;
    return {
      setTest: function(AM) {
        AM ? hM(N.DEPTH_TEST) : jM(N.DEPTH_TEST);
      },
      setMask: function(AM) {
        tM !== AM && !v && (N.depthMask(AM), tM = AM);
      },
      setFunc: function(AM) {
        if (eM !== AM) {
          switch (AM) {
            case jg:
              N.depthFunc(N.NEVER);
              break;
            case Cg:
              N.depthFunc(N.ALWAYS);
              break;
            case Lg:
              N.depthFunc(N.LESS);
              break;
            case jn:
              N.depthFunc(N.LEQUAL);
              break;
            case wg:
              N.depthFunc(N.EQUAL);
              break;
            case Og:
              N.depthFunc(N.GEQUAL);
              break;
            case xg:
              N.depthFunc(N.GREATER);
              break;
            case Eg:
              N.depthFunc(N.NOTEQUAL);
              break;
            default:
              N.depthFunc(N.LEQUAL);
          }
          eM = AM;
        }
      },
      setLocked: function(AM) {
        v = AM;
      },
      setClear: function(AM) {
        TM !== AM && (N.clearDepth(AM), TM = AM);
      },
      reset: function() {
        v = !1, tM = null, eM = null, TM = null;
      }
    };
  }
  function n() {
    let v = !1, tM = null, eM = null, TM = null, AM = null, X = null, cM = null, vM = null, yD = null;
    return {
      setTest: function(BM) {
        v || (BM ? hM(N.STENCIL_TEST) : jM(N.STENCIL_TEST));
      },
      setMask: function(BM) {
        tM !== BM && !v && (N.stencilMask(BM), tM = BM);
      },
      setFunc: function(BM, De, jD) {
        (eM !== BM || TM !== De || AM !== jD) && (N.stencilFunc(BM, De, jD), eM = BM, TM = De, AM = jD);
      },
      setOp: function(BM, De, jD) {
        (X !== BM || cM !== De || vM !== jD) && (N.stencilOp(BM, De, jD), X = BM, cM = De, vM = jD);
      },
      setLocked: function(BM) {
        v = BM;
      },
      setClear: function(BM) {
        yD !== BM && (N.clearStencil(BM), yD = BM);
      },
      reset: function() {
        v = !1, tM = null, eM = null, TM = null, AM = null, X = null, cM = null, vM = null, yD = null;
      }
    };
  }
  const A = new t(), z = new i(), I = new n(), T = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new WeakMap();
  let g = {}, s = {}, a = /* @__PURE__ */ new WeakMap(), o = [], c = null, r = !1, w = null, y = null, j = null, l = null, d = null, h = null, Z = null, L = !1, x = null, R = null, B = null, H = null, p = null;
  const k = N.getParameter(N.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let V = !1, F = 0;
  const $ = N.getParameter(N.VERSION);
  $.indexOf("WebGL") !== -1 ? (F = parseFloat(/^WebGL (\d)/.exec($)[1]), V = F >= 1) : $.indexOf("OpenGL ES") !== -1 && (F = parseFloat(/^OpenGL ES (\d)/.exec($)[1]), V = F >= 2);
  let W = null, G = {};
  const U = N.getParameter(N.SCISSOR_BOX), K = N.getParameter(N.VIEWPORT), nM = new nD().fromArray(U), zM = new nD().fromArray(K);
  function gM(v, tM, eM, TM) {
    const AM = new Uint8Array(4), X = N.createTexture();
    N.bindTexture(v, X), N.texParameteri(v, N.TEXTURE_MIN_FILTER, N.NEAREST), N.texParameteri(v, N.TEXTURE_MAG_FILTER, N.NEAREST);
    for (let cM = 0; cM < eM; cM++)
      e && (v === N.TEXTURE_3D || v === N.TEXTURE_2D_ARRAY) ? N.texImage3D(tM, 0, N.RGBA, 1, 1, TM, 0, N.RGBA, N.UNSIGNED_BYTE, AM) : N.texImage2D(tM + cM, 0, N.RGBA, 1, 1, 0, N.RGBA, N.UNSIGNED_BYTE, AM);
    return X;
  }
  const yM = {};
  yM[N.TEXTURE_2D] = gM(N.TEXTURE_2D, N.TEXTURE_2D, 1), yM[N.TEXTURE_CUBE_MAP] = gM(N.TEXTURE_CUBE_MAP, N.TEXTURE_CUBE_MAP_POSITIVE_X, 6), e && (yM[N.TEXTURE_2D_ARRAY] = gM(N.TEXTURE_2D_ARRAY, N.TEXTURE_2D_ARRAY, 1, 1), yM[N.TEXTURE_3D] = gM(N.TEXTURE_3D, N.TEXTURE_3D, 1, 1)), A.setClear(0, 0, 0, 1), z.setClear(1), I.setClear(0), hM(N.DEPTH_TEST), z.setFunc(jn), lM(!1), GM(Nz), hM(N.CULL_FACE), CM(be);
  function hM(v) {
    g[v] !== !0 && (N.enable(v), g[v] = !0);
  }
  function jM(v) {
    g[v] !== !1 && (N.disable(v), g[v] = !1);
  }
  function bM(v, tM) {
    return s[v] !== tM ? (N.bindFramebuffer(v, tM), s[v] = tM, e && (v === N.DRAW_FRAMEBUFFER && (s[N.FRAMEBUFFER] = tM), v === N.FRAMEBUFFER && (s[N.DRAW_FRAMEBUFFER] = tM)), !0) : !1;
  }
  function ED(v, tM) {
    let eM = o, TM = !1;
    if (v)
      if (eM = a.get(tM), eM === void 0 && (eM = [], a.set(tM, eM)), v.isWebGLMultipleRenderTargets) {
        const AM = v.texture;
        if (eM.length !== AM.length || eM[0] !== N.COLOR_ATTACHMENT0) {
          for (let X = 0, cM = AM.length; X < cM; X++)
            eM[X] = N.COLOR_ATTACHMENT0 + X;
          eM.length = AM.length, TM = !0;
        }
      } else
        eM[0] !== N.COLOR_ATTACHMENT0 && (eM[0] = N.COLOR_ATTACHMENT0, TM = !0);
    else
      eM[0] !== N.BACK && (eM[0] = N.BACK, TM = !0);
    TM && (D.isWebGL2 ? N.drawBuffers(eM) : M.get("WEBGL_draw_buffers").drawBuffersWEBGL(eM));
  }
  function fM(v) {
    return c !== v ? (N.useProgram(v), c = v, !0) : !1;
  }
  const m = {
    [Pt]: N.FUNC_ADD,
    [zg]: N.FUNC_SUBTRACT,
    [Ig]: N.FUNC_REVERSE_SUBTRACT
  };
  if (e)
    m[zz] = N.MIN, m[Iz] = N.MAX;
  else {
    const v = M.get("EXT_blend_minmax");
    v !== null && (m[zz] = v.MIN_EXT, m[Iz] = v.MAX_EXT);
  }
  const TD = {
    [Tg]: N.ZERO,
    [ug]: N.ONE,
    [gg]: N.SRC_COLOR,
    [dT]: N.SRC_ALPHA,
    [yg]: N.SRC_ALPHA_SATURATE,
    [ag]: N.DST_COLOR,
    [rg]: N.DST_ALPHA,
    [sg]: N.ONE_MINUS_SRC_COLOR,
    [vT]: N.ONE_MINUS_SRC_ALPHA,
    [og]: N.ONE_MINUS_DST_COLOR,
    [cg]: N.ONE_MINUS_DST_ALPHA
  };
  function CM(v, tM, eM, TM, AM, X, cM, vM) {
    if (v === be) {
      r === !0 && (jM(N.BLEND), r = !1);
      return;
    }
    if (r === !1 && (hM(N.BLEND), r = !0), v !== ng) {
      if (v !== w || vM !== L) {
        if ((y !== Pt || d !== Pt) && (N.blendEquation(N.FUNC_ADD), y = Pt, d = Pt), vM)
          switch (v) {
            case Vt:
              N.blendFuncSeparate(N.ONE, N.ONE_MINUS_SRC_ALPHA, N.ONE, N.ONE_MINUS_SRC_ALPHA);
              break;
            case iz:
              N.blendFunc(N.ONE, N.ONE);
              break;
            case Az:
              N.blendFuncSeparate(N.ZERO, N.ONE_MINUS_SRC_COLOR, N.ZERO, N.ONE);
              break;
            case nz:
              N.blendFuncSeparate(N.ZERO, N.SRC_COLOR, N.ZERO, N.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", v);
              break;
          }
        else
          switch (v) {
            case Vt:
              N.blendFuncSeparate(N.SRC_ALPHA, N.ONE_MINUS_SRC_ALPHA, N.ONE, N.ONE_MINUS_SRC_ALPHA);
              break;
            case iz:
              N.blendFunc(N.SRC_ALPHA, N.ONE);
              break;
            case Az:
              N.blendFuncSeparate(N.ZERO, N.ONE_MINUS_SRC_COLOR, N.ZERO, N.ONE);
              break;
            case nz:
              N.blendFunc(N.ZERO, N.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", v);
              break;
          }
        j = null, l = null, h = null, Z = null, w = v, L = vM;
      }
      return;
    }
    AM = AM || tM, X = X || eM, cM = cM || TM, (tM !== y || AM !== d) && (N.blendEquationSeparate(m[tM], m[AM]), y = tM, d = AM), (eM !== j || TM !== l || X !== h || cM !== Z) && (N.blendFuncSeparate(TD[eM], TD[TM], TD[X], TD[cM]), j = eM, l = TM, h = X, Z = cM), w = v, L = !1;
  }
  function pM(v, tM) {
    v.side === Oe ? jM(N.CULL_FACE) : hM(N.CULL_FACE);
    let eM = v.side === pD;
    tM && (eM = !eM), lM(eM), v.blending === Vt && v.transparent === !1 ? CM(be) : CM(v.blending, v.blendEquation, v.blendSrc, v.blendDst, v.blendEquationAlpha, v.blendSrcAlpha, v.blendDstAlpha, v.premultipliedAlpha), z.setFunc(v.depthFunc), z.setTest(v.depthTest), z.setMask(v.depthWrite), A.setMask(v.colorWrite);
    const TM = v.stencilWrite;
    I.setTest(TM), TM && (I.setMask(v.stencilWriteMask), I.setFunc(v.stencilFunc, v.stencilRef, v.stencilFuncMask), I.setOp(v.stencilFail, v.stencilZFail, v.stencilZPass)), mM(v.polygonOffset, v.polygonOffsetFactor, v.polygonOffsetUnits), v.alphaToCoverage === !0 ? hM(N.SAMPLE_ALPHA_TO_COVERAGE) : jM(N.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function lM(v) {
    x !== v && (v ? N.frontFace(N.CW) : N.frontFace(N.CCW), x = v);
  }
  function GM(v) {
    v !== Ng ? (hM(N.CULL_FACE), v !== R && (v === Nz ? N.cullFace(N.BACK) : v === ig ? N.cullFace(N.FRONT) : N.cullFace(N.FRONT_AND_BACK))) : jM(N.CULL_FACE), R = v;
  }
  function ZM(v) {
    v !== B && (V && N.lineWidth(v), B = v);
  }
  function mM(v, tM, eM) {
    v ? (hM(N.POLYGON_OFFSET_FILL), (H !== tM || p !== eM) && (N.polygonOffset(tM, eM), H = tM, p = eM)) : jM(N.POLYGON_OFFSET_FILL);
  }
  function FM(v) {
    v ? hM(N.SCISSOR_TEST) : jM(N.SCISSOR_TEST);
  }
  function zD(v) {
    v === void 0 && (v = N.TEXTURE0 + k - 1), W !== v && (N.activeTexture(v), W = v);
  }
  function uD(v, tM, eM) {
    eM === void 0 && (W === null ? eM = N.TEXTURE0 + k - 1 : eM = W);
    let TM = G[eM];
    TM === void 0 && (TM = { type: void 0, texture: void 0 }, G[eM] = TM), (TM.type !== v || TM.texture !== tM) && (W !== eM && (N.activeTexture(eM), W = eM), N.bindTexture(v, tM || yM[v]), TM.type = v, TM.texture = tM);
  }
  function E() {
    const v = G[W];
    v !== void 0 && v.type !== void 0 && (N.bindTexture(v.type, null), v.type = void 0, v.texture = void 0);
  }
  function C() {
    try {
      N.compressedTexImage2D.apply(N, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function S() {
    try {
      N.compressedTexImage3D.apply(N, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function MM() {
    try {
      N.texSubImage2D.apply(N, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function q() {
    try {
      N.texSubImage3D.apply(N, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function DM() {
    try {
      N.compressedTexSubImage2D.apply(N, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function sM() {
    try {
      N.compressedTexSubImage3D.apply(N, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function NM() {
    try {
      N.texStorage2D.apply(N, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function IM() {
    try {
      N.texStorage3D.apply(N, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function wM() {
    try {
      N.texImage2D.apply(N, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function _M() {
    try {
      N.texImage3D.apply(N, arguments);
    } catch (v) {
      console.error("THREE.WebGLState:", v);
    }
  }
  function J(v) {
    nM.equals(v) === !1 && (N.scissor(v.x, v.y, v.z, v.w), nM.copy(v));
  }
  function RM(v) {
    zM.equals(v) === !1 && (N.viewport(v.x, v.y, v.z, v.w), zM.copy(v));
  }
  function dM(v, tM) {
    let eM = u.get(tM);
    eM === void 0 && (eM = /* @__PURE__ */ new WeakMap(), u.set(tM, eM));
    let TM = eM.get(v);
    TM === void 0 && (TM = N.getUniformBlockIndex(tM, v.name), eM.set(v, TM));
  }
  function OM(v, tM) {
    const TM = u.get(tM).get(v);
    T.get(tM) !== TM && (N.uniformBlockBinding(tM, TM, v.__bindingPointIndex), T.set(tM, TM));
  }
  function oM() {
    N.disable(N.BLEND), N.disable(N.CULL_FACE), N.disable(N.DEPTH_TEST), N.disable(N.POLYGON_OFFSET_FILL), N.disable(N.SCISSOR_TEST), N.disable(N.STENCIL_TEST), N.disable(N.SAMPLE_ALPHA_TO_COVERAGE), N.blendEquation(N.FUNC_ADD), N.blendFunc(N.ONE, N.ZERO), N.blendFuncSeparate(N.ONE, N.ZERO, N.ONE, N.ZERO), N.colorMask(!0, !0, !0, !0), N.clearColor(0, 0, 0, 0), N.depthMask(!0), N.depthFunc(N.LESS), N.clearDepth(1), N.stencilMask(4294967295), N.stencilFunc(N.ALWAYS, 0, 4294967295), N.stencilOp(N.KEEP, N.KEEP, N.KEEP), N.clearStencil(0), N.cullFace(N.BACK), N.frontFace(N.CCW), N.polygonOffset(0, 0), N.activeTexture(N.TEXTURE0), N.bindFramebuffer(N.FRAMEBUFFER, null), e === !0 && (N.bindFramebuffer(N.DRAW_FRAMEBUFFER, null), N.bindFramebuffer(N.READ_FRAMEBUFFER, null)), N.useProgram(null), N.lineWidth(1), N.scissor(0, 0, N.canvas.width, N.canvas.height), N.viewport(0, 0, N.canvas.width, N.canvas.height), g = {}, W = null, G = {}, s = {}, a = /* @__PURE__ */ new WeakMap(), o = [], c = null, r = !1, w = null, y = null, j = null, l = null, d = null, h = null, Z = null, L = !1, x = null, R = null, B = null, H = null, p = null, nM.set(0, 0, N.canvas.width, N.canvas.height), zM.set(0, 0, N.canvas.width, N.canvas.height), A.reset(), z.reset(), I.reset();
  }
  return {
    buffers: {
      color: A,
      depth: z,
      stencil: I
    },
    enable: hM,
    disable: jM,
    bindFramebuffer: bM,
    drawBuffers: ED,
    useProgram: fM,
    setBlending: CM,
    setMaterial: pM,
    setFlipSided: lM,
    setCullFace: GM,
    setLineWidth: ZM,
    setPolygonOffset: mM,
    setScissorTest: FM,
    activeTexture: zD,
    bindTexture: uD,
    unbindTexture: E,
    compressedTexImage2D: C,
    compressedTexImage3D: S,
    texImage2D: wM,
    texImage3D: _M,
    updateUBOMapping: dM,
    uniformBlockBinding: OM,
    texStorage2D: NM,
    texStorage3D: IM,
    texSubImage2D: MM,
    texSubImage3D: q,
    compressedTexSubImage2D: DM,
    compressedTexSubImage3D: sM,
    scissor: J,
    viewport: RM,
    reset: oM
  };
}
function iy(N, M, D, e, t, i, n) {
  const A = t.isWebGL2, z = t.maxTextures, I = t.maxCubemapSize, T = t.maxTextureSize, u = t.maxSamples, g = M.has("WEBGL_multisampled_render_to_texture") ? M.get("WEBGL_multisampled_render_to_texture") : null, s = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), a = /* @__PURE__ */ new WeakMap();
  let o;
  const c = /* @__PURE__ */ new WeakMap();
  let r = !1;
  try {
    r = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function w(E, C) {
    return r ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(E, C)
    ) : hN("canvas");
  }
  function y(E, C, S, MM) {
    let q = 1;
    if ((E.width > MM || E.height > MM) && (q = MM / Math.max(E.width, E.height)), q < 1 || C === !0)
      if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap) {
        const DM = C ? yn : Math.floor, sM = DM(q * E.width), NM = DM(q * E.height);
        o === void 0 && (o = w(sM, NM));
        const IM = S ? w(sM, NM) : o;
        return IM.width = sM, IM.height = NM, IM.getContext("2d").drawImage(E, 0, 0, sM, NM), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + E.width + "x" + E.height + ") to (" + sM + "x" + NM + ")."), IM;
      } else
        return "data" in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + E.width + "x" + E.height + ")."), E;
    return E;
  }
  function j(E) {
    return ez(E.width) && ez(E.height);
  }
  function l(E) {
    return A ? !1 : E.wrapS !== $D || E.wrapT !== $D || E.minFilter !== OD && E.minFilter !== dD;
  }
  function d(E, C) {
    return E.generateMipmaps && C && E.minFilter !== OD && E.minFilter !== dD;
  }
  function h(E) {
    N.generateMipmap(E);
  }
  function Z(E, C, S, MM, q = !1) {
    if (A === !1)
      return C;
    if (E !== null) {
      if (N[E] !== void 0)
        return N[E];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let DM = C;
    if (C === N.RED && (S === N.FLOAT && (DM = N.R32F), S === N.HALF_FLOAT && (DM = N.R16F), S === N.UNSIGNED_BYTE && (DM = N.R8)), C === N.RED_INTEGER && (S === N.UNSIGNED_BYTE && (DM = N.R8UI), S === N.UNSIGNED_SHORT && (DM = N.R16UI), S === N.UNSIGNED_INT && (DM = N.R32UI), S === N.BYTE && (DM = N.R8I), S === N.SHORT && (DM = N.R16I), S === N.INT && (DM = N.R32I)), C === N.RG && (S === N.FLOAT && (DM = N.RG32F), S === N.HALF_FLOAT && (DM = N.RG16F), S === N.UNSIGNED_BYTE && (DM = N.RG8)), C === N.RGBA) {
      const sM = q ? Bi : PM.getTransfer(MM);
      S === N.FLOAT && (DM = N.RGBA32F), S === N.HALF_FLOAT && (DM = N.RGBA16F), S === N.UNSIGNED_BYTE && (DM = sM === VM ? N.SRGB8_ALPHA8 : N.RGBA8), S === N.UNSIGNED_SHORT_4_4_4_4 && (DM = N.RGBA4), S === N.UNSIGNED_SHORT_5_5_5_1 && (DM = N.RGB5_A1);
    }
    return (DM === N.R16F || DM === N.R32F || DM === N.RG16F || DM === N.RG32F || DM === N.RGBA16F || DM === N.RGBA32F) && M.get("EXT_color_buffer_float"), DM;
  }
  function L(E, C, S) {
    return d(E, S) === !0 || E.isFramebufferTexture && E.minFilter !== OD && E.minFilter !== dD ? Math.log2(Math.max(C.width, C.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? C.mipmaps.length : 1;
  }
  function x(E) {
    return E === OD || E === Tz || E === rA ? N.NEAREST : N.LINEAR;
  }
  function R(E) {
    const C = E.target;
    C.removeEventListener("dispose", R), H(C), C.isVideoTexture && a.delete(C);
  }
  function B(E) {
    const C = E.target;
    C.removeEventListener("dispose", B), k(C);
  }
  function H(E) {
    const C = e.get(E);
    if (C.__webglInit === void 0)
      return;
    const S = E.source, MM = c.get(S);
    if (MM) {
      const q = MM[C.__cacheKey];
      q.usedTimes--, q.usedTimes === 0 && p(E), Object.keys(MM).length === 0 && c.delete(S);
    }
    e.remove(E);
  }
  function p(E) {
    const C = e.get(E);
    N.deleteTexture(C.__webglTexture);
    const S = E.source, MM = c.get(S);
    delete MM[C.__cacheKey], n.memory.textures--;
  }
  function k(E) {
    const C = E.texture, S = e.get(E), MM = e.get(C);
    if (MM.__webglTexture !== void 0 && (N.deleteTexture(MM.__webglTexture), n.memory.textures--), E.depthTexture && E.depthTexture.dispose(), E.isWebGLCubeRenderTarget)
      for (let q = 0; q < 6; q++) {
        if (Array.isArray(S.__webglFramebuffer[q]))
          for (let DM = 0; DM < S.__webglFramebuffer[q].length; DM++)
            N.deleteFramebuffer(S.__webglFramebuffer[q][DM]);
        else
          N.deleteFramebuffer(S.__webglFramebuffer[q]);
        S.__webglDepthbuffer && N.deleteRenderbuffer(S.__webglDepthbuffer[q]);
      }
    else {
      if (Array.isArray(S.__webglFramebuffer))
        for (let q = 0; q < S.__webglFramebuffer.length; q++)
          N.deleteFramebuffer(S.__webglFramebuffer[q]);
      else
        N.deleteFramebuffer(S.__webglFramebuffer);
      if (S.__webglDepthbuffer && N.deleteRenderbuffer(S.__webglDepthbuffer), S.__webglMultisampledFramebuffer && N.deleteFramebuffer(S.__webglMultisampledFramebuffer), S.__webglColorRenderbuffer)
        for (let q = 0; q < S.__webglColorRenderbuffer.length; q++)
          S.__webglColorRenderbuffer[q] && N.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);
      S.__webglDepthRenderbuffer && N.deleteRenderbuffer(S.__webglDepthRenderbuffer);
    }
    if (E.isWebGLMultipleRenderTargets)
      for (let q = 0, DM = C.length; q < DM; q++) {
        const sM = e.get(C[q]);
        sM.__webglTexture && (N.deleteTexture(sM.__webglTexture), n.memory.textures--), e.remove(C[q]);
      }
    e.remove(C), e.remove(E);
  }
  let V = 0;
  function F() {
    V = 0;
  }
  function $() {
    const E = V;
    return E >= z && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + z), V += 1, E;
  }
  function W(E) {
    const C = [];
    return C.push(E.wrapS), C.push(E.wrapT), C.push(E.wrapR || 0), C.push(E.magFilter), C.push(E.minFilter), C.push(E.anisotropy), C.push(E.internalFormat), C.push(E.format), C.push(E.type), C.push(E.generateMipmaps), C.push(E.premultiplyAlpha), C.push(E.flipY), C.push(E.unpackAlignment), C.push(E.colorSpace), C.join();
  }
  function G(E, C) {
    const S = e.get(E);
    if (E.isVideoTexture && zD(E), E.isRenderTargetTexture === !1 && E.version > 0 && S.__version !== E.version) {
      const MM = E.image;
      if (MM === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (MM.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        bM(S, E, C);
        return;
      }
    }
    D.bindTexture(N.TEXTURE_2D, S.__webglTexture, N.TEXTURE0 + C);
  }
  function U(E, C) {
    const S = e.get(E);
    if (E.version > 0 && S.__version !== E.version) {
      bM(S, E, C);
      return;
    }
    D.bindTexture(N.TEXTURE_2D_ARRAY, S.__webglTexture, N.TEXTURE0 + C);
  }
  function K(E, C) {
    const S = e.get(E);
    if (E.version > 0 && S.__version !== E.version) {
      bM(S, E, C);
      return;
    }
    D.bindTexture(N.TEXTURE_3D, S.__webglTexture, N.TEXTURE0 + C);
  }
  function nM(E, C) {
    const S = e.get(E);
    if (E.version > 0 && S.__version !== E.version) {
      ED(S, E, C);
      return;
    }
    D.bindTexture(N.TEXTURE_CUBE_MAP, S.__webglTexture, N.TEXTURE0 + C);
  }
  const zM = {
    [wn]: N.REPEAT,
    [$D]: N.CLAMP_TO_EDGE,
    [On]: N.MIRRORED_REPEAT
  }, gM = {
    [OD]: N.NEAREST,
    [Tz]: N.NEAREST_MIPMAP_NEAREST,
    [rA]: N.NEAREST_MIPMAP_LINEAR,
    [dD]: N.LINEAR,
    [fg]: N.LINEAR_MIPMAP_NEAREST,
    [EN]: N.LINEAR_MIPMAP_LINEAR
  }, yM = {
    [Gg]: N.NEVER,
    [Ms]: N.ALWAYS,
    [Hg]: N.LESS,
    [Xg]: N.LEQUAL,
    [Wg]: N.EQUAL,
    [Jg]: N.GEQUAL,
    [qg]: N.GREATER,
    [$g]: N.NOTEQUAL
  };
  function hM(E, C, S) {
    if (S ? (N.texParameteri(E, N.TEXTURE_WRAP_S, zM[C.wrapS]), N.texParameteri(E, N.TEXTURE_WRAP_T, zM[C.wrapT]), (E === N.TEXTURE_3D || E === N.TEXTURE_2D_ARRAY) && N.texParameteri(E, N.TEXTURE_WRAP_R, zM[C.wrapR]), N.texParameteri(E, N.TEXTURE_MAG_FILTER, gM[C.magFilter]), N.texParameteri(E, N.TEXTURE_MIN_FILTER, gM[C.minFilter])) : (N.texParameteri(E, N.TEXTURE_WRAP_S, N.CLAMP_TO_EDGE), N.texParameteri(E, N.TEXTURE_WRAP_T, N.CLAMP_TO_EDGE), (E === N.TEXTURE_3D || E === N.TEXTURE_2D_ARRAY) && N.texParameteri(E, N.TEXTURE_WRAP_R, N.CLAMP_TO_EDGE), (C.wrapS !== $D || C.wrapT !== $D) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), N.texParameteri(E, N.TEXTURE_MAG_FILTER, x(C.magFilter)), N.texParameteri(E, N.TEXTURE_MIN_FILTER, x(C.minFilter)), C.minFilter !== OD && C.minFilter !== dD && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), C.compareFunction && (N.texParameteri(E, N.TEXTURE_COMPARE_MODE, N.COMPARE_REF_TO_TEXTURE), N.texParameteri(E, N.TEXTURE_COMPARE_FUNC, yM[C.compareFunction])), M.has("EXT_texture_filter_anisotropic") === !0) {
      const MM = M.get("EXT_texture_filter_anisotropic");
      if (C.magFilter === OD || C.minFilter !== rA && C.minFilter !== EN || C.type === _e && M.has("OES_texture_float_linear") === !1 || A === !1 && C.type === lN && M.has("OES_texture_half_float_linear") === !1)
        return;
      (C.anisotropy > 1 || e.get(C).__currentAnisotropy) && (N.texParameterf(E, MM.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(C.anisotropy, t.getMaxAnisotropy())), e.get(C).__currentAnisotropy = C.anisotropy);
    }
  }
  function jM(E, C) {
    let S = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, C.addEventListener("dispose", R));
    const MM = C.source;
    let q = c.get(MM);
    q === void 0 && (q = {}, c.set(MM, q));
    const DM = W(C);
    if (DM !== E.__cacheKey) {
      q[DM] === void 0 && (q[DM] = {
        texture: N.createTexture(),
        usedTimes: 0
      }, n.memory.textures++, S = !0), q[DM].usedTimes++;
      const sM = q[E.__cacheKey];
      sM !== void 0 && (q[E.__cacheKey].usedTimes--, sM.usedTimes === 0 && p(C)), E.__cacheKey = DM, E.__webglTexture = q[DM].texture;
    }
    return S;
  }
  function bM(E, C, S) {
    let MM = N.TEXTURE_2D;
    (C.isDataArrayTexture || C.isCompressedArrayTexture) && (MM = N.TEXTURE_2D_ARRAY), C.isData3DTexture && (MM = N.TEXTURE_3D);
    const q = jM(E, C), DM = C.source;
    D.bindTexture(MM, E.__webglTexture, N.TEXTURE0 + S);
    const sM = e.get(DM);
    if (DM.version !== sM.__version || q === !0) {
      D.activeTexture(N.TEXTURE0 + S);
      const NM = PM.getPrimaries(PM.workingColorSpace), IM = C.colorSpace === PD ? null : PM.getPrimaries(C.colorSpace), wM = C.colorSpace === PD || NM === IM ? N.NONE : N.BROWSER_DEFAULT_WEBGL;
      N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL, C.flipY), N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL, C.premultiplyAlpha), N.pixelStorei(N.UNPACK_ALIGNMENT, C.unpackAlignment), N.pixelStorei(N.UNPACK_COLORSPACE_CONVERSION_WEBGL, wM);
      const _M = l(C) && j(C.image) === !1;
      let J = y(C.image, _M, !1, T);
      J = uD(C, J);
      const RM = j(J) || A, dM = i.convert(C.format, C.colorSpace);
      let OM = i.convert(C.type), oM = Z(C.internalFormat, dM, OM, C.colorSpace, C.isVideoTexture);
      hM(MM, C, RM);
      let v;
      const tM = C.mipmaps, eM = A && C.isVideoTexture !== !0, TM = sM.__version === void 0 || q === !0, AM = L(C, J, RM);
      if (C.isDepthTexture)
        oM = N.DEPTH_COMPONENT, A ? C.type === _e ? oM = N.DEPTH_COMPONENT32F : C.type === Ze ? oM = N.DEPTH_COMPONENT24 : C.type === it ? oM = N.DEPTH24_STENCIL8 : oM = N.DEPTH_COMPONENT16 : C.type === _e && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), C.format === At && oM === N.DEPTH_COMPONENT && C.type !== fn && C.type !== Ze && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), C.type = Ze, OM = i.convert(C.type)), C.format === $t && oM === N.DEPTH_COMPONENT && (oM = N.DEPTH_STENCIL, C.type !== it && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), C.type = it, OM = i.convert(C.type))), TM && (eM ? D.texStorage2D(N.TEXTURE_2D, 1, oM, J.width, J.height) : D.texImage2D(N.TEXTURE_2D, 0, oM, J.width, J.height, 0, dM, OM, null));
      else if (C.isDataTexture)
        if (tM.length > 0 && RM) {
          eM && TM && D.texStorage2D(N.TEXTURE_2D, AM, oM, tM[0].width, tM[0].height);
          for (let X = 0, cM = tM.length; X < cM; X++)
            v = tM[X], eM ? D.texSubImage2D(N.TEXTURE_2D, X, 0, 0, v.width, v.height, dM, OM, v.data) : D.texImage2D(N.TEXTURE_2D, X, oM, v.width, v.height, 0, dM, OM, v.data);
          C.generateMipmaps = !1;
        } else
          eM ? (TM && D.texStorage2D(N.TEXTURE_2D, AM, oM, J.width, J.height), D.texSubImage2D(N.TEXTURE_2D, 0, 0, 0, J.width, J.height, dM, OM, J.data)) : D.texImage2D(N.TEXTURE_2D, 0, oM, J.width, J.height, 0, dM, OM, J.data);
      else if (C.isCompressedTexture)
        if (C.isCompressedArrayTexture) {
          eM && TM && D.texStorage3D(N.TEXTURE_2D_ARRAY, AM, oM, tM[0].width, tM[0].height, J.depth);
          for (let X = 0, cM = tM.length; X < cM; X++)
            v = tM[X], C.format !== JD ? dM !== null ? eM ? D.compressedTexSubImage3D(N.TEXTURE_2D_ARRAY, X, 0, 0, 0, v.width, v.height, J.depth, dM, v.data, 0, 0) : D.compressedTexImage3D(N.TEXTURE_2D_ARRAY, X, oM, v.width, v.height, J.depth, 0, v.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : eM ? D.texSubImage3D(N.TEXTURE_2D_ARRAY, X, 0, 0, 0, v.width, v.height, J.depth, dM, OM, v.data) : D.texImage3D(N.TEXTURE_2D_ARRAY, X, oM, v.width, v.height, J.depth, 0, dM, OM, v.data);
        } else {
          eM && TM && D.texStorage2D(N.TEXTURE_2D, AM, oM, tM[0].width, tM[0].height);
          for (let X = 0, cM = tM.length; X < cM; X++)
            v = tM[X], C.format !== JD ? dM !== null ? eM ? D.compressedTexSubImage2D(N.TEXTURE_2D, X, 0, 0, v.width, v.height, dM, v.data) : D.compressedTexImage2D(N.TEXTURE_2D, X, oM, v.width, v.height, 0, v.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : eM ? D.texSubImage2D(N.TEXTURE_2D, X, 0, 0, v.width, v.height, dM, OM, v.data) : D.texImage2D(N.TEXTURE_2D, X, oM, v.width, v.height, 0, dM, OM, v.data);
        }
      else if (C.isDataArrayTexture)
        eM ? (TM && D.texStorage3D(N.TEXTURE_2D_ARRAY, AM, oM, J.width, J.height, J.depth), D.texSubImage3D(N.TEXTURE_2D_ARRAY, 0, 0, 0, 0, J.width, J.height, J.depth, dM, OM, J.data)) : D.texImage3D(N.TEXTURE_2D_ARRAY, 0, oM, J.width, J.height, J.depth, 0, dM, OM, J.data);
      else if (C.isData3DTexture)
        eM ? (TM && D.texStorage3D(N.TEXTURE_3D, AM, oM, J.width, J.height, J.depth), D.texSubImage3D(N.TEXTURE_3D, 0, 0, 0, 0, J.width, J.height, J.depth, dM, OM, J.data)) : D.texImage3D(N.TEXTURE_3D, 0, oM, J.width, J.height, J.depth, 0, dM, OM, J.data);
      else if (C.isFramebufferTexture) {
        if (TM)
          if (eM)
            D.texStorage2D(N.TEXTURE_2D, AM, oM, J.width, J.height);
          else {
            let X = J.width, cM = J.height;
            for (let vM = 0; vM < AM; vM++)
              D.texImage2D(N.TEXTURE_2D, vM, oM, X, cM, 0, dM, OM, null), X >>= 1, cM >>= 1;
          }
      } else if (tM.length > 0 && RM) {
        eM && TM && D.texStorage2D(N.TEXTURE_2D, AM, oM, tM[0].width, tM[0].height);
        for (let X = 0, cM = tM.length; X < cM; X++)
          v = tM[X], eM ? D.texSubImage2D(N.TEXTURE_2D, X, 0, 0, dM, OM, v) : D.texImage2D(N.TEXTURE_2D, X, oM, dM, OM, v);
        C.generateMipmaps = !1;
      } else
        eM ? (TM && D.texStorage2D(N.TEXTURE_2D, AM, oM, J.width, J.height), D.texSubImage2D(N.TEXTURE_2D, 0, 0, 0, dM, OM, J)) : D.texImage2D(N.TEXTURE_2D, 0, oM, dM, OM, J);
      d(C, RM) && h(MM), sM.__version = DM.version, C.onUpdate && C.onUpdate(C);
    }
    E.__version = C.version;
  }
  function ED(E, C, S) {
    if (C.image.length !== 6)
      return;
    const MM = jM(E, C), q = C.source;
    D.bindTexture(N.TEXTURE_CUBE_MAP, E.__webglTexture, N.TEXTURE0 + S);
    const DM = e.get(q);
    if (q.version !== DM.__version || MM === !0) {
      D.activeTexture(N.TEXTURE0 + S);
      const sM = PM.getPrimaries(PM.workingColorSpace), NM = C.colorSpace === PD ? null : PM.getPrimaries(C.colorSpace), IM = C.colorSpace === PD || sM === NM ? N.NONE : N.BROWSER_DEFAULT_WEBGL;
      N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL, C.flipY), N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL, C.premultiplyAlpha), N.pixelStorei(N.UNPACK_ALIGNMENT, C.unpackAlignment), N.pixelStorei(N.UNPACK_COLORSPACE_CONVERSION_WEBGL, IM);
      const wM = C.isCompressedTexture || C.image[0].isCompressedTexture, _M = C.image[0] && C.image[0].isDataTexture, J = [];
      for (let X = 0; X < 6; X++)
        !wM && !_M ? J[X] = y(C.image[X], !1, !0, I) : J[X] = _M ? C.image[X].image : C.image[X], J[X] = uD(C, J[X]);
      const RM = J[0], dM = j(RM) || A, OM = i.convert(C.format, C.colorSpace), oM = i.convert(C.type), v = Z(C.internalFormat, OM, oM, C.colorSpace), tM = A && C.isVideoTexture !== !0, eM = DM.__version === void 0 || MM === !0;
      let TM = L(C, RM, dM);
      hM(N.TEXTURE_CUBE_MAP, C, dM);
      let AM;
      if (wM) {
        tM && eM && D.texStorage2D(N.TEXTURE_CUBE_MAP, TM, v, RM.width, RM.height);
        for (let X = 0; X < 6; X++) {
          AM = J[X].mipmaps;
          for (let cM = 0; cM < AM.length; cM++) {
            const vM = AM[cM];
            C.format !== JD ? OM !== null ? tM ? D.compressedTexSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, cM, 0, 0, vM.width, vM.height, OM, vM.data) : D.compressedTexImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, cM, v, vM.width, vM.height, 0, vM.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : tM ? D.texSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, cM, 0, 0, vM.width, vM.height, OM, oM, vM.data) : D.texImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, cM, v, vM.width, vM.height, 0, OM, oM, vM.data);
          }
        }
      } else {
        AM = C.mipmaps, tM && eM && (AM.length > 0 && TM++, D.texStorage2D(N.TEXTURE_CUBE_MAP, TM, v, J[0].width, J[0].height));
        for (let X = 0; X < 6; X++)
          if (_M) {
            tM ? D.texSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, 0, 0, 0, J[X].width, J[X].height, OM, oM, J[X].data) : D.texImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, 0, v, J[X].width, J[X].height, 0, OM, oM, J[X].data);
            for (let cM = 0; cM < AM.length; cM++) {
              const yD = AM[cM].image[X].image;
              tM ? D.texSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, cM + 1, 0, 0, yD.width, yD.height, OM, oM, yD.data) : D.texImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, cM + 1, v, yD.width, yD.height, 0, OM, oM, yD.data);
            }
          } else {
            tM ? D.texSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, 0, 0, 0, OM, oM, J[X]) : D.texImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, 0, v, OM, oM, J[X]);
            for (let cM = 0; cM < AM.length; cM++) {
              const vM = AM[cM];
              tM ? D.texSubImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, cM + 1, 0, 0, OM, oM, vM.image[X]) : D.texImage2D(N.TEXTURE_CUBE_MAP_POSITIVE_X + X, cM + 1, v, OM, oM, vM.image[X]);
            }
          }
      }
      d(C, dM) && h(N.TEXTURE_CUBE_MAP), DM.__version = q.version, C.onUpdate && C.onUpdate(C);
    }
    E.__version = C.version;
  }
  function fM(E, C, S, MM, q, DM) {
    const sM = i.convert(S.format, S.colorSpace), NM = i.convert(S.type), IM = Z(S.internalFormat, sM, NM, S.colorSpace);
    if (!e.get(C).__hasExternalTextures) {
      const _M = Math.max(1, C.width >> DM), J = Math.max(1, C.height >> DM);
      q === N.TEXTURE_3D || q === N.TEXTURE_2D_ARRAY ? D.texImage3D(q, DM, IM, _M, J, C.depth, 0, sM, NM, null) : D.texImage2D(q, DM, IM, _M, J, 0, sM, NM, null);
    }
    D.bindFramebuffer(N.FRAMEBUFFER, E), FM(C) ? g.framebufferTexture2DMultisampleEXT(N.FRAMEBUFFER, MM, q, e.get(S).__webglTexture, 0, mM(C)) : (q === N.TEXTURE_2D || q >= N.TEXTURE_CUBE_MAP_POSITIVE_X && q <= N.TEXTURE_CUBE_MAP_NEGATIVE_Z) && N.framebufferTexture2D(N.FRAMEBUFFER, MM, q, e.get(S).__webglTexture, DM), D.bindFramebuffer(N.FRAMEBUFFER, null);
  }
  function m(E, C, S) {
    if (N.bindRenderbuffer(N.RENDERBUFFER, E), C.depthBuffer && !C.stencilBuffer) {
      let MM = A === !0 ? N.DEPTH_COMPONENT24 : N.DEPTH_COMPONENT16;
      if (S || FM(C)) {
        const q = C.depthTexture;
        q && q.isDepthTexture && (q.type === _e ? MM = N.DEPTH_COMPONENT32F : q.type === Ze && (MM = N.DEPTH_COMPONENT24));
        const DM = mM(C);
        FM(C) ? g.renderbufferStorageMultisampleEXT(N.RENDERBUFFER, DM, MM, C.width, C.height) : N.renderbufferStorageMultisample(N.RENDERBUFFER, DM, MM, C.width, C.height);
      } else
        N.renderbufferStorage(N.RENDERBUFFER, MM, C.width, C.height);
      N.framebufferRenderbuffer(N.FRAMEBUFFER, N.DEPTH_ATTACHMENT, N.RENDERBUFFER, E);
    } else if (C.depthBuffer && C.stencilBuffer) {
      const MM = mM(C);
      S && FM(C) === !1 ? N.renderbufferStorageMultisample(N.RENDERBUFFER, MM, N.DEPTH24_STENCIL8, C.width, C.height) : FM(C) ? g.renderbufferStorageMultisampleEXT(N.RENDERBUFFER, MM, N.DEPTH24_STENCIL8, C.width, C.height) : N.renderbufferStorage(N.RENDERBUFFER, N.DEPTH_STENCIL, C.width, C.height), N.framebufferRenderbuffer(N.FRAMEBUFFER, N.DEPTH_STENCIL_ATTACHMENT, N.RENDERBUFFER, E);
    } else {
      const MM = C.isWebGLMultipleRenderTargets === !0 ? C.texture : [C.texture];
      for (let q = 0; q < MM.length; q++) {
        const DM = MM[q], sM = i.convert(DM.format, DM.colorSpace), NM = i.convert(DM.type), IM = Z(DM.internalFormat, sM, NM, DM.colorSpace), wM = mM(C);
        S && FM(C) === !1 ? N.renderbufferStorageMultisample(N.RENDERBUFFER, wM, IM, C.width, C.height) : FM(C) ? g.renderbufferStorageMultisampleEXT(N.RENDERBUFFER, wM, IM, C.width, C.height) : N.renderbufferStorage(N.RENDERBUFFER, IM, C.width, C.height);
      }
    }
    N.bindRenderbuffer(N.RENDERBUFFER, null);
  }
  function TD(E, C) {
    if (C && C.isWebGLCubeRenderTarget)
      throw new Error("Depth Texture with cube render targets is not supported");
    if (D.bindFramebuffer(N.FRAMEBUFFER, E), !(C.depthTexture && C.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!e.get(C.depthTexture).__webglTexture || C.depthTexture.image.width !== C.width || C.depthTexture.image.height !== C.height) && (C.depthTexture.image.width = C.width, C.depthTexture.image.height = C.height, C.depthTexture.needsUpdate = !0), G(C.depthTexture, 0);
    const MM = e.get(C.depthTexture).__webglTexture, q = mM(C);
    if (C.depthTexture.format === At)
      FM(C) ? g.framebufferTexture2DMultisampleEXT(N.FRAMEBUFFER, N.DEPTH_ATTACHMENT, N.TEXTURE_2D, MM, 0, q) : N.framebufferTexture2D(N.FRAMEBUFFER, N.DEPTH_ATTACHMENT, N.TEXTURE_2D, MM, 0);
    else if (C.depthTexture.format === $t)
      FM(C) ? g.framebufferTexture2DMultisampleEXT(N.FRAMEBUFFER, N.DEPTH_STENCIL_ATTACHMENT, N.TEXTURE_2D, MM, 0, q) : N.framebufferTexture2D(N.FRAMEBUFFER, N.DEPTH_STENCIL_ATTACHMENT, N.TEXTURE_2D, MM, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function CM(E) {
    const C = e.get(E), S = E.isWebGLCubeRenderTarget === !0;
    if (E.depthTexture && !C.__autoAllocateDepthBuffer) {
      if (S)
        throw new Error("target.depthTexture not supported in Cube render targets");
      TD(C.__webglFramebuffer, E);
    } else if (S) {
      C.__webglDepthbuffer = [];
      for (let MM = 0; MM < 6; MM++)
        D.bindFramebuffer(N.FRAMEBUFFER, C.__webglFramebuffer[MM]), C.__webglDepthbuffer[MM] = N.createRenderbuffer(), m(C.__webglDepthbuffer[MM], E, !1);
    } else
      D.bindFramebuffer(N.FRAMEBUFFER, C.__webglFramebuffer), C.__webglDepthbuffer = N.createRenderbuffer(), m(C.__webglDepthbuffer, E, !1);
    D.bindFramebuffer(N.FRAMEBUFFER, null);
  }
  function pM(E, C, S) {
    const MM = e.get(E);
    C !== void 0 && fM(MM.__webglFramebuffer, E, E.texture, N.COLOR_ATTACHMENT0, N.TEXTURE_2D, 0), S !== void 0 && CM(E);
  }
  function lM(E) {
    const C = E.texture, S = e.get(E), MM = e.get(C);
    E.addEventListener("dispose", B), E.isWebGLMultipleRenderTargets !== !0 && (MM.__webglTexture === void 0 && (MM.__webglTexture = N.createTexture()), MM.__version = C.version, n.memory.textures++);
    const q = E.isWebGLCubeRenderTarget === !0, DM = E.isWebGLMultipleRenderTargets === !0, sM = j(E) || A;
    if (q) {
      S.__webglFramebuffer = [];
      for (let NM = 0; NM < 6; NM++)
        if (A && C.mipmaps && C.mipmaps.length > 0) {
          S.__webglFramebuffer[NM] = [];
          for (let IM = 0; IM < C.mipmaps.length; IM++)
            S.__webglFramebuffer[NM][IM] = N.createFramebuffer();
        } else
          S.__webglFramebuffer[NM] = N.createFramebuffer();
    } else {
      if (A && C.mipmaps && C.mipmaps.length > 0) {
        S.__webglFramebuffer = [];
        for (let NM = 0; NM < C.mipmaps.length; NM++)
          S.__webglFramebuffer[NM] = N.createFramebuffer();
      } else
        S.__webglFramebuffer = N.createFramebuffer();
      if (DM)
        if (t.drawBuffers) {
          const NM = E.texture;
          for (let IM = 0, wM = NM.length; IM < wM; IM++) {
            const _M = e.get(NM[IM]);
            _M.__webglTexture === void 0 && (_M.__webglTexture = N.createTexture(), n.memory.textures++);
          }
        } else
          console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
      if (A && E.samples > 0 && FM(E) === !1) {
        const NM = DM ? C : [C];
        S.__webglMultisampledFramebuffer = N.createFramebuffer(), S.__webglColorRenderbuffer = [], D.bindFramebuffer(N.FRAMEBUFFER, S.__webglMultisampledFramebuffer);
        for (let IM = 0; IM < NM.length; IM++) {
          const wM = NM[IM];
          S.__webglColorRenderbuffer[IM] = N.createRenderbuffer(), N.bindRenderbuffer(N.RENDERBUFFER, S.__webglColorRenderbuffer[IM]);
          const _M = i.convert(wM.format, wM.colorSpace), J = i.convert(wM.type), RM = Z(wM.internalFormat, _M, J, wM.colorSpace, E.isXRRenderTarget === !0), dM = mM(E);
          N.renderbufferStorageMultisample(N.RENDERBUFFER, dM, RM, E.width, E.height), N.framebufferRenderbuffer(N.FRAMEBUFFER, N.COLOR_ATTACHMENT0 + IM, N.RENDERBUFFER, S.__webglColorRenderbuffer[IM]);
        }
        N.bindRenderbuffer(N.RENDERBUFFER, null), E.depthBuffer && (S.__webglDepthRenderbuffer = N.createRenderbuffer(), m(S.__webglDepthRenderbuffer, E, !0)), D.bindFramebuffer(N.FRAMEBUFFER, null);
      }
    }
    if (q) {
      D.bindTexture(N.TEXTURE_CUBE_MAP, MM.__webglTexture), hM(N.TEXTURE_CUBE_MAP, C, sM);
      for (let NM = 0; NM < 6; NM++)
        if (A && C.mipmaps && C.mipmaps.length > 0)
          for (let IM = 0; IM < C.mipmaps.length; IM++)
            fM(S.__webglFramebuffer[NM][IM], E, C, N.COLOR_ATTACHMENT0, N.TEXTURE_CUBE_MAP_POSITIVE_X + NM, IM);
        else
          fM(S.__webglFramebuffer[NM], E, C, N.COLOR_ATTACHMENT0, N.TEXTURE_CUBE_MAP_POSITIVE_X + NM, 0);
      d(C, sM) && h(N.TEXTURE_CUBE_MAP), D.unbindTexture();
    } else if (DM) {
      const NM = E.texture;
      for (let IM = 0, wM = NM.length; IM < wM; IM++) {
        const _M = NM[IM], J = e.get(_M);
        D.bindTexture(N.TEXTURE_2D, J.__webglTexture), hM(N.TEXTURE_2D, _M, sM), fM(S.__webglFramebuffer, E, _M, N.COLOR_ATTACHMENT0 + IM, N.TEXTURE_2D, 0), d(_M, sM) && h(N.TEXTURE_2D);
      }
      D.unbindTexture();
    } else {
      let NM = N.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (A ? NM = E.isWebGL3DRenderTarget ? N.TEXTURE_3D : N.TEXTURE_2D_ARRAY : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")), D.bindTexture(NM, MM.__webglTexture), hM(NM, C, sM), A && C.mipmaps && C.mipmaps.length > 0)
        for (let IM = 0; IM < C.mipmaps.length; IM++)
          fM(S.__webglFramebuffer[IM], E, C, N.COLOR_ATTACHMENT0, NM, IM);
      else
        fM(S.__webglFramebuffer, E, C, N.COLOR_ATTACHMENT0, NM, 0);
      d(C, sM) && h(NM), D.unbindTexture();
    }
    E.depthBuffer && CM(E);
  }
  function GM(E) {
    const C = j(E) || A, S = E.isWebGLMultipleRenderTargets === !0 ? E.texture : [E.texture];
    for (let MM = 0, q = S.length; MM < q; MM++) {
      const DM = S[MM];
      if (d(DM, C)) {
        const sM = E.isWebGLCubeRenderTarget ? N.TEXTURE_CUBE_MAP : N.TEXTURE_2D, NM = e.get(DM).__webglTexture;
        D.bindTexture(sM, NM), h(sM), D.unbindTexture();
      }
    }
  }
  function ZM(E) {
    if (A && E.samples > 0 && FM(E) === !1) {
      const C = E.isWebGLMultipleRenderTargets ? E.texture : [E.texture], S = E.width, MM = E.height;
      let q = N.COLOR_BUFFER_BIT;
      const DM = [], sM = E.stencilBuffer ? N.DEPTH_STENCIL_ATTACHMENT : N.DEPTH_ATTACHMENT, NM = e.get(E), IM = E.isWebGLMultipleRenderTargets === !0;
      if (IM)
        for (let wM = 0; wM < C.length; wM++)
          D.bindFramebuffer(N.FRAMEBUFFER, NM.__webglMultisampledFramebuffer), N.framebufferRenderbuffer(N.FRAMEBUFFER, N.COLOR_ATTACHMENT0 + wM, N.RENDERBUFFER, null), D.bindFramebuffer(N.FRAMEBUFFER, NM.__webglFramebuffer), N.framebufferTexture2D(N.DRAW_FRAMEBUFFER, N.COLOR_ATTACHMENT0 + wM, N.TEXTURE_2D, null, 0);
      D.bindFramebuffer(N.READ_FRAMEBUFFER, NM.__webglMultisampledFramebuffer), D.bindFramebuffer(N.DRAW_FRAMEBUFFER, NM.__webglFramebuffer);
      for (let wM = 0; wM < C.length; wM++) {
        DM.push(N.COLOR_ATTACHMENT0 + wM), E.depthBuffer && DM.push(sM);
        const _M = NM.__ignoreDepthValues !== void 0 ? NM.__ignoreDepthValues : !1;
        if (_M === !1 && (E.depthBuffer && (q |= N.DEPTH_BUFFER_BIT), E.stencilBuffer && (q |= N.STENCIL_BUFFER_BIT)), IM && N.framebufferRenderbuffer(N.READ_FRAMEBUFFER, N.COLOR_ATTACHMENT0, N.RENDERBUFFER, NM.__webglColorRenderbuffer[wM]), _M === !0 && (N.invalidateFramebuffer(N.READ_FRAMEBUFFER, [sM]), N.invalidateFramebuffer(N.DRAW_FRAMEBUFFER, [sM])), IM) {
          const J = e.get(C[wM]).__webglTexture;
          N.framebufferTexture2D(N.DRAW_FRAMEBUFFER, N.COLOR_ATTACHMENT0, N.TEXTURE_2D, J, 0);
        }
        N.blitFramebuffer(0, 0, S, MM, 0, 0, S, MM, q, N.NEAREST), s && N.invalidateFramebuffer(N.READ_FRAMEBUFFER, DM);
      }
      if (D.bindFramebuffer(N.READ_FRAMEBUFFER, null), D.bindFramebuffer(N.DRAW_FRAMEBUFFER, null), IM)
        for (let wM = 0; wM < C.length; wM++) {
          D.bindFramebuffer(N.FRAMEBUFFER, NM.__webglMultisampledFramebuffer), N.framebufferRenderbuffer(N.FRAMEBUFFER, N.COLOR_ATTACHMENT0 + wM, N.RENDERBUFFER, NM.__webglColorRenderbuffer[wM]);
          const _M = e.get(C[wM]).__webglTexture;
          D.bindFramebuffer(N.FRAMEBUFFER, NM.__webglFramebuffer), N.framebufferTexture2D(N.DRAW_FRAMEBUFFER, N.COLOR_ATTACHMENT0 + wM, N.TEXTURE_2D, _M, 0);
        }
      D.bindFramebuffer(N.DRAW_FRAMEBUFFER, NM.__webglMultisampledFramebuffer);
    }
  }
  function mM(E) {
    return Math.min(u, E.samples);
  }
  function FM(E) {
    const C = e.get(E);
    return A && E.samples > 0 && M.has("WEBGL_multisampled_render_to_texture") === !0 && C.__useRenderToTexture !== !1;
  }
  function zD(E) {
    const C = n.render.frame;
    a.get(E) !== C && (a.set(E, C), E.update());
  }
  function uD(E, C) {
    const S = E.colorSpace, MM = E.format, q = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || E.format === xn || S !== he && S !== PD && (PM.getTransfer(S) === VM ? A === !1 ? M.has("EXT_sRGB") === !0 && MM === JD ? (E.format = xn, E.minFilter = dD, E.generateMipmaps = !1) : C = HT.sRGBToLinear(C) : (MM !== JD || q !== Re) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", S)), C;
  }
  this.allocateTextureUnit = $, this.resetTextureUnits = F, this.setTexture2D = G, this.setTexture2DArray = U, this.setTexture3D = K, this.setTextureCube = nM, this.rebindTextures = pM, this.setupRenderTarget = lM, this.updateRenderTargetMipmap = GM, this.updateMultisampleRenderTarget = ZM, this.setupDepthRenderbuffer = CM, this.setupFrameBufferTexture = fM, this.useMultisampledRTT = FM;
}
function Ay(N, M, D) {
  const e = D.isWebGL2;
  function t(i, n = PD) {
    let A;
    const z = PM.getTransfer(n);
    if (i === Re)
      return N.UNSIGNED_BYTE;
    if (i === UT)
      return N.UNSIGNED_SHORT_4_4_4_4;
    if (i === fT)
      return N.UNSIGNED_SHORT_5_5_5_1;
    if (i === mg)
      return N.BYTE;
    if (i === Qg)
      return N.SHORT;
    if (i === fn)
      return N.UNSIGNED_SHORT;
    if (i === YT)
      return N.INT;
    if (i === Ze)
      return N.UNSIGNED_INT;
    if (i === _e)
      return N.FLOAT;
    if (i === lN)
      return e ? N.HALF_FLOAT : (A = M.get("OES_texture_half_float"), A !== null ? A.HALF_FLOAT_OES : null);
    if (i === Sg)
      return N.ALPHA;
    if (i === JD)
      return N.RGBA;
    if (i === kg)
      return N.LUMINANCE;
    if (i === Zg)
      return N.LUMINANCE_ALPHA;
    if (i === At)
      return N.DEPTH_COMPONENT;
    if (i === $t)
      return N.DEPTH_STENCIL;
    if (i === xn)
      return A = M.get("EXT_sRGB"), A !== null ? A.SRGB_ALPHA_EXT : null;
    if (i === _g)
      return N.RED;
    if (i === mT)
      return N.RED_INTEGER;
    if (i === bg)
      return N.RG;
    if (i === QT)
      return N.RG_INTEGER;
    if (i === ST)
      return N.RGBA_INTEGER;
    if (i === cA || i === aA || i === oA || i === yA)
      if (z === VM)
        if (A = M.get("WEBGL_compressed_texture_s3tc_srgb"), A !== null) {
          if (i === cA)
            return A.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (i === aA)
            return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (i === oA)
            return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (i === yA)
            return A.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (A = M.get("WEBGL_compressed_texture_s3tc"), A !== null) {
        if (i === cA)
          return A.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (i === aA)
          return A.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (i === oA)
          return A.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (i === yA)
          return A.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (i === uz || i === gz || i === sz || i === rz)
      if (A = M.get("WEBGL_compressed_texture_pvrtc"), A !== null) {
        if (i === uz)
          return A.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (i === gz)
          return A.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (i === sz)
          return A.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (i === rz)
          return A.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (i === Kg)
      return A = M.get("WEBGL_compressed_texture_etc1"), A !== null ? A.COMPRESSED_RGB_ETC1_WEBGL : null;
    if (i === cz || i === az)
      if (A = M.get("WEBGL_compressed_texture_etc"), A !== null) {
        if (i === cz)
          return z === VM ? A.COMPRESSED_SRGB8_ETC2 : A.COMPRESSED_RGB8_ETC2;
        if (i === az)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : A.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (i === oz || i === yz || i === jz || i === Cz || i === Lz || i === wz || i === Oz || i === xz || i === Ez || i === lz || i === hz || i === dz || i === vz || i === pz)
      if (A = M.get("WEBGL_compressed_texture_astc"), A !== null) {
        if (i === oz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : A.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (i === yz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : A.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (i === jz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : A.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (i === Cz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : A.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (i === Lz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : A.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (i === wz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : A.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (i === Oz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : A.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (i === xz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : A.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (i === Ez)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : A.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (i === lz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : A.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (i === hz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : A.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (i === dz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : A.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (i === vz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : A.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (i === pz)
          return z === VM ? A.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : A.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (i === jA || i === Yz || i === Uz)
      if (A = M.get("EXT_texture_compression_bptc"), A !== null) {
        if (i === jA)
          return z === VM ? A.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : A.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (i === Yz)
          return A.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (i === Uz)
          return A.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (i === Rg || i === fz || i === mz || i === Qz)
      if (A = M.get("EXT_texture_compression_rgtc"), A !== null) {
        if (i === jA)
          return A.COMPRESSED_RED_RGTC1_EXT;
        if (i === fz)
          return A.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (i === mz)
          return A.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (i === Qz)
          return A.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return i === it ? e ? N.UNSIGNED_INT_24_8 : (A = M.get("WEBGL_depth_texture"), A !== null ? A.UNSIGNED_INT_24_8_WEBGL : null) : N[i] !== void 0 ? N[i] : null;
  }
  return { convert: t };
}
class ny extends RD {
  constructor(M = []) {
    super(), this.isArrayCamera = !0, this.cameras = M;
  }
}
let jN = class extends YD {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
};
const zy = { type: "move" };
class KA {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new jN(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new jN(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new Y(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new Y()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new jN(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new Y(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new Y()), this._grip;
  }
  dispatchEvent(M) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(M), this._grip !== null && this._grip.dispatchEvent(M), this._hand !== null && this._hand.dispatchEvent(M), this;
  }
  connect(M) {
    if (M && M.hand) {
      const D = this._hand;
      if (D)
        for (const e of M.hand.values())
          this._getHandJoint(D, e);
    }
    return this.dispatchEvent({ type: "connected", data: M }), this;
  }
  disconnect(M) {
    return this.dispatchEvent({ type: "disconnected", data: M }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(M, D, e) {
    let t = null, i = null, n = null;
    const A = this._targetRay, z = this._grip, I = this._hand;
    if (M && D.session.visibilityState !== "visible-blurred") {
      if (I && M.hand) {
        n = !0;
        for (const o of M.hand.values()) {
          const c = D.getJointPose(o, e), r = this._getHandJoint(I, o);
          c !== null && (r.matrix.fromArray(c.transform.matrix), r.matrix.decompose(r.position, r.rotation, r.scale), r.matrixWorldNeedsUpdate = !0, r.jointRadius = c.radius), r.visible = c !== null;
        }
        const T = I.joints["index-finger-tip"], u = I.joints["thumb-tip"], g = T.position.distanceTo(u.position), s = 0.02, a = 5e-3;
        I.inputState.pinching && g > s + a ? (I.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: M.handedness,
          target: this
        })) : !I.inputState.pinching && g <= s - a && (I.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: M.handedness,
          target: this
        }));
      } else
        z !== null && M.gripSpace && (i = D.getPose(M.gripSpace, e), i !== null && (z.matrix.fromArray(i.transform.matrix), z.matrix.decompose(z.position, z.rotation, z.scale), z.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (z.hasLinearVelocity = !0, z.linearVelocity.copy(i.linearVelocity)) : z.hasLinearVelocity = !1, i.angularVelocity ? (z.hasAngularVelocity = !0, z.angularVelocity.copy(i.angularVelocity)) : z.hasAngularVelocity = !1));
      A !== null && (t = D.getPose(M.targetRaySpace, e), t === null && i !== null && (t = i), t !== null && (A.matrix.fromArray(t.transform.matrix), A.matrix.decompose(A.position, A.rotation, A.scale), A.matrixWorldNeedsUpdate = !0, t.linearVelocity ? (A.hasLinearVelocity = !0, A.linearVelocity.copy(t.linearVelocity)) : A.hasLinearVelocity = !1, t.angularVelocity ? (A.hasAngularVelocity = !0, A.angularVelocity.copy(t.angularVelocity)) : A.hasAngularVelocity = !1, this.dispatchEvent(zy)));
    }
    return A !== null && (A.visible = t !== null), z !== null && (z.visible = i !== null), I !== null && (I.visible = n !== null), this;
  }
  // private method
  _getHandJoint(M, D) {
    if (M.joints[D.jointName] === void 0) {
      const e = new jN();
      e.matrixAutoUpdate = !1, e.visible = !1, M.joints[D.jointName] = e, M.add(e);
    }
    return M.joints[D.jointName];
  }
}
class Iy extends Me {
  constructor(M, D, e, t, i, n, A, z, I, T) {
    if (T = T !== void 0 ? T : At, T !== At && T !== $t)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    e === void 0 && T === At && (e = Ze), e === void 0 && T === $t && (e = it), super(null, t, i, n, A, z, T, e, I), this.isDepthTexture = !0, this.image = { width: M, height: D }, this.magFilter = A !== void 0 ? A : OD, this.minFilter = z !== void 0 ? z : OD, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(M) {
    return super.copy(M), this.compareFunction = M.compareFunction, this;
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return this.compareFunction !== null && (D.compareFunction = this.compareFunction), D;
  }
}
class Ty extends tN {
  constructor(M, D) {
    super();
    const e = this;
    let t = null, i = 1, n = null, A = "local-floor", z = 1, I = null, T = null, u = null, g = null, s = null, a = null;
    const o = D.getContextAttributes();
    let c = null, r = null;
    const w = [], y = [], j = new RD();
    j.layers.enable(1), j.viewport = new nD();
    const l = new RD();
    l.layers.enable(2), l.viewport = new nD();
    const d = [j, l], h = new ny();
    h.layers.enable(1), h.layers.enable(2);
    let Z = null, L = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(U) {
      let K = w[U];
      return K === void 0 && (K = new KA(), w[U] = K), K.getTargetRaySpace();
    }, this.getControllerGrip = function(U) {
      let K = w[U];
      return K === void 0 && (K = new KA(), w[U] = K), K.getGripSpace();
    }, this.getHand = function(U) {
      let K = w[U];
      return K === void 0 && (K = new KA(), w[U] = K), K.getHandSpace();
    };
    function x(U) {
      const K = y.indexOf(U.inputSource);
      if (K === -1)
        return;
      const nM = w[K];
      nM !== void 0 && (nM.update(U.inputSource, U.frame, I || n), nM.dispatchEvent({ type: U.type, data: U.inputSource }));
    }
    function R() {
      t.removeEventListener("select", x), t.removeEventListener("selectstart", x), t.removeEventListener("selectend", x), t.removeEventListener("squeeze", x), t.removeEventListener("squeezestart", x), t.removeEventListener("squeezeend", x), t.removeEventListener("end", R), t.removeEventListener("inputsourceschange", B);
      for (let U = 0; U < w.length; U++) {
        const K = y[U];
        K !== null && (y[U] = null, w[U].disconnect(K));
      }
      Z = null, L = null, M.setRenderTarget(c), s = null, g = null, u = null, t = null, r = null, G.stop(), e.isPresenting = !1, e.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(U) {
      i = U, e.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(U) {
      A = U, e.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return I || n;
    }, this.setReferenceSpace = function(U) {
      I = U;
    }, this.getBaseLayer = function() {
      return g !== null ? g : s;
    }, this.getBinding = function() {
      return u;
    }, this.getFrame = function() {
      return a;
    }, this.getSession = function() {
      return t;
    }, this.setSession = async function(U) {
      if (t = U, t !== null) {
        if (c = M.getRenderTarget(), t.addEventListener("select", x), t.addEventListener("selectstart", x), t.addEventListener("selectend", x), t.addEventListener("squeeze", x), t.addEventListener("squeezestart", x), t.addEventListener("squeezeend", x), t.addEventListener("end", R), t.addEventListener("inputsourceschange", B), o.xrCompatible !== !0 && await D.makeXRCompatible(), t.renderState.layers === void 0 || M.capabilities.isWebGL2 === !1) {
          const K = {
            antialias: t.renderState.layers === void 0 ? o.antialias : !0,
            alpha: !0,
            depth: o.depth,
            stencil: o.stencil,
            framebufferScaleFactor: i
          };
          s = new XRWebGLLayer(t, D, K), t.updateRenderState({ baseLayer: s }), r = new Tt(
            s.framebufferWidth,
            s.framebufferHeight,
            {
              format: JD,
              type: Re,
              colorSpace: M.outputColorSpace,
              stencilBuffer: o.stencil
            }
          );
        } else {
          let K = null, nM = null, zM = null;
          o.depth && (zM = o.stencil ? D.DEPTH24_STENCIL8 : D.DEPTH_COMPONENT24, K = o.stencil ? $t : At, nM = o.stencil ? it : Ze);
          const gM = {
            colorFormat: D.RGBA8,
            depthFormat: zM,
            scaleFactor: i
          };
          u = new XRWebGLBinding(t, D), g = u.createProjectionLayer(gM), t.updateRenderState({ layers: [g] }), r = new Tt(
            g.textureWidth,
            g.textureHeight,
            {
              format: JD,
              type: Re,
              depthTexture: new Iy(g.textureWidth, g.textureHeight, nM, void 0, void 0, void 0, void 0, void 0, void 0, K),
              stencilBuffer: o.stencil,
              colorSpace: M.outputColorSpace,
              samples: o.antialias ? 4 : 0
            }
          );
          const yM = M.properties.get(r);
          yM.__ignoreDepthValues = g.ignoreDepthValues;
        }
        r.isXRRenderTarget = !0, this.setFoveation(z), I = null, n = await t.requestReferenceSpace(A), G.setContext(t), G.start(), e.isPresenting = !0, e.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (t !== null)
        return t.environmentBlendMode;
    };
    function B(U) {
      for (let K = 0; K < U.removed.length; K++) {
        const nM = U.removed[K], zM = y.indexOf(nM);
        zM >= 0 && (y[zM] = null, w[zM].disconnect(nM));
      }
      for (let K = 0; K < U.added.length; K++) {
        const nM = U.added[K];
        let zM = y.indexOf(nM);
        if (zM === -1) {
          for (let yM = 0; yM < w.length; yM++)
            if (yM >= y.length) {
              y.push(nM), zM = yM;
              break;
            } else if (y[yM] === null) {
              y[yM] = nM, zM = yM;
              break;
            }
          if (zM === -1)
            break;
        }
        const gM = w[zM];
        gM && gM.connect(nM);
      }
    }
    const H = new Y(), p = new Y();
    function k(U, K, nM) {
      H.setFromMatrixPosition(K.matrixWorld), p.setFromMatrixPosition(nM.matrixWorld);
      const zM = H.distanceTo(p), gM = K.projectionMatrix.elements, yM = nM.projectionMatrix.elements, hM = gM[14] / (gM[10] - 1), jM = gM[14] / (gM[10] + 1), bM = (gM[9] + 1) / gM[5], ED = (gM[9] - 1) / gM[5], fM = (gM[8] - 1) / gM[0], m = (yM[8] + 1) / yM[0], TD = hM * fM, CM = hM * m, pM = zM / (-fM + m), lM = pM * -fM;
      K.matrixWorld.decompose(U.position, U.quaternion, U.scale), U.translateX(lM), U.translateZ(pM), U.matrixWorld.compose(U.position, U.quaternion, U.scale), U.matrixWorldInverse.copy(U.matrixWorld).invert();
      const GM = hM + pM, ZM = jM + pM, mM = TD - lM, FM = CM + (zM - lM), zD = bM * jM / ZM * GM, uD = ED * jM / ZM * GM;
      U.projectionMatrix.makePerspective(mM, FM, zD, uD, GM, ZM), U.projectionMatrixInverse.copy(U.projectionMatrix).invert();
    }
    function V(U, K) {
      K === null ? U.matrixWorld.copy(U.matrix) : U.matrixWorld.multiplyMatrices(K.matrixWorld, U.matrix), U.matrixWorldInverse.copy(U.matrixWorld).invert();
    }
    this.updateCamera = function(U) {
      if (t === null)
        return;
      h.near = l.near = j.near = U.near, h.far = l.far = j.far = U.far, (Z !== h.near || L !== h.far) && (t.updateRenderState({
        depthNear: h.near,
        depthFar: h.far
      }), Z = h.near, L = h.far);
      const K = U.parent, nM = h.cameras;
      V(h, K);
      for (let zM = 0; zM < nM.length; zM++)
        V(nM[zM], K);
      nM.length === 2 ? k(h, j, l) : h.projectionMatrix.copy(j.projectionMatrix), F(U, h, K);
    };
    function F(U, K, nM) {
      nM === null ? U.matrix.copy(K.matrixWorld) : (U.matrix.copy(nM.matrixWorld), U.matrix.invert(), U.matrix.multiply(K.matrixWorld)), U.matrix.decompose(U.position, U.quaternion, U.scale), U.updateMatrixWorld(!0), U.projectionMatrix.copy(K.projectionMatrix), U.projectionMatrixInverse.copy(K.projectionMatrixInverse), U.isPerspectiveCamera && (U.fov = on * 2 * Math.atan(1 / U.projectionMatrix.elements[5]), U.zoom = 1);
    }
    this.getCamera = function() {
      return h;
    }, this.getFoveation = function() {
      if (!(g === null && s === null))
        return z;
    }, this.setFoveation = function(U) {
      z = U, g !== null && (g.fixedFoveation = U), s !== null && s.fixedFoveation !== void 0 && (s.fixedFoveation = U);
    };
    let $ = null;
    function W(U, K) {
      if (T = K.getViewerPose(I || n), a = K, T !== null) {
        const nM = T.views;
        s !== null && (M.setRenderTargetFramebuffer(r, s.framebuffer), M.setRenderTarget(r));
        let zM = !1;
        nM.length !== h.cameras.length && (h.cameras.length = 0, zM = !0);
        for (let gM = 0; gM < nM.length; gM++) {
          const yM = nM[gM];
          let hM = null;
          if (s !== null)
            hM = s.getViewport(yM);
          else {
            const bM = u.getViewSubImage(g, yM);
            hM = bM.viewport, gM === 0 && (M.setRenderTargetTextures(
              r,
              bM.colorTexture,
              g.ignoreDepthValues ? void 0 : bM.depthStencilTexture
            ), M.setRenderTarget(r));
          }
          let jM = d[gM];
          jM === void 0 && (jM = new RD(), jM.layers.enable(gM), jM.viewport = new nD(), d[gM] = jM), jM.matrix.fromArray(yM.transform.matrix), jM.matrix.decompose(jM.position, jM.quaternion, jM.scale), jM.projectionMatrix.fromArray(yM.projectionMatrix), jM.projectionMatrixInverse.copy(jM.projectionMatrix).invert(), jM.viewport.set(hM.x, hM.y, hM.width, hM.height), gM === 0 && (h.matrix.copy(jM.matrix), h.matrix.decompose(h.position, h.quaternion, h.scale)), zM === !0 && h.cameras.push(jM);
        }
      }
      for (let nM = 0; nM < w.length; nM++) {
        const zM = y[nM], gM = w[nM];
        zM !== null && gM !== void 0 && gM.update(zM, K, I || n);
      }
      $ && $(U, K), K.detectedPlanes && e.dispatchEvent({ type: "planesdetected", data: K }), a = null;
    }
    const G = new Du();
    G.setAnimationLoop(W), this.setAnimationLoop = function(U) {
      $ = U;
    }, this.dispose = function() {
    };
  }
}
function uy(N, M) {
  function D(c, r) {
    c.matrixAutoUpdate === !0 && c.updateMatrix(), r.value.copy(c.matrix);
  }
  function e(c, r) {
    r.color.getRGB(c.fogColor.value, eu(N)), r.isFog ? (c.fogNear.value = r.near, c.fogFar.value = r.far) : r.isFogExp2 && (c.fogDensity.value = r.density);
  }
  function t(c, r, w, y, j) {
    r.isMeshBasicMaterial || r.isMeshLambertMaterial ? i(c, r) : r.isMeshToonMaterial ? (i(c, r), u(c, r)) : r.isMeshPhongMaterial ? (i(c, r), T(c, r)) : r.isMeshStandardMaterial ? (i(c, r), g(c, r), r.isMeshPhysicalMaterial && s(c, r, j)) : r.isMeshMatcapMaterial ? (i(c, r), a(c, r)) : r.isMeshDepthMaterial ? i(c, r) : r.isMeshDistanceMaterial ? (i(c, r), o(c, r)) : r.isMeshNormalMaterial ? i(c, r) : r.isLineBasicMaterial ? (n(c, r), r.isLineDashedMaterial && A(c, r)) : r.isPointsMaterial ? z(c, r, w, y) : r.isSpriteMaterial ? I(c, r) : r.isShadowMaterial ? (c.color.value.copy(r.color), c.opacity.value = r.opacity) : r.isShaderMaterial && (r.uniformsNeedUpdate = !1);
  }
  function i(c, r) {
    c.opacity.value = r.opacity, r.color && c.diffuse.value.copy(r.color), r.emissive && c.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity), r.map && (c.map.value = r.map, D(r.map, c.mapTransform)), r.alphaMap && (c.alphaMap.value = r.alphaMap, D(r.alphaMap, c.alphaMapTransform)), r.bumpMap && (c.bumpMap.value = r.bumpMap, D(r.bumpMap, c.bumpMapTransform), c.bumpScale.value = r.bumpScale, r.side === pD && (c.bumpScale.value *= -1)), r.normalMap && (c.normalMap.value = r.normalMap, D(r.normalMap, c.normalMapTransform), c.normalScale.value.copy(r.normalScale), r.side === pD && c.normalScale.value.negate()), r.displacementMap && (c.displacementMap.value = r.displacementMap, D(r.displacementMap, c.displacementMapTransform), c.displacementScale.value = r.displacementScale, c.displacementBias.value = r.displacementBias), r.emissiveMap && (c.emissiveMap.value = r.emissiveMap, D(r.emissiveMap, c.emissiveMapTransform)), r.specularMap && (c.specularMap.value = r.specularMap, D(r.specularMap, c.specularMapTransform)), r.alphaTest > 0 && (c.alphaTest.value = r.alphaTest);
    const w = M.get(r).envMap;
    if (w && (c.envMap.value = w, c.flipEnvMap.value = w.isCubeTexture && w.isRenderTargetTexture === !1 ? -1 : 1, c.reflectivity.value = r.reflectivity, c.ior.value = r.ior, c.refractionRatio.value = r.refractionRatio), r.lightMap) {
      c.lightMap.value = r.lightMap;
      const y = N._useLegacyLights === !0 ? Math.PI : 1;
      c.lightMapIntensity.value = r.lightMapIntensity * y, D(r.lightMap, c.lightMapTransform);
    }
    r.aoMap && (c.aoMap.value = r.aoMap, c.aoMapIntensity.value = r.aoMapIntensity, D(r.aoMap, c.aoMapTransform));
  }
  function n(c, r) {
    c.diffuse.value.copy(r.color), c.opacity.value = r.opacity, r.map && (c.map.value = r.map, D(r.map, c.mapTransform));
  }
  function A(c, r) {
    c.dashSize.value = r.dashSize, c.totalSize.value = r.dashSize + r.gapSize, c.scale.value = r.scale;
  }
  function z(c, r, w, y) {
    c.diffuse.value.copy(r.color), c.opacity.value = r.opacity, c.size.value = r.size * w, c.scale.value = y * 0.5, r.map && (c.map.value = r.map, D(r.map, c.uvTransform)), r.alphaMap && (c.alphaMap.value = r.alphaMap, D(r.alphaMap, c.alphaMapTransform)), r.alphaTest > 0 && (c.alphaTest.value = r.alphaTest);
  }
  function I(c, r) {
    c.diffuse.value.copy(r.color), c.opacity.value = r.opacity, c.rotation.value = r.rotation, r.map && (c.map.value = r.map, D(r.map, c.mapTransform)), r.alphaMap && (c.alphaMap.value = r.alphaMap, D(r.alphaMap, c.alphaMapTransform)), r.alphaTest > 0 && (c.alphaTest.value = r.alphaTest);
  }
  function T(c, r) {
    c.specular.value.copy(r.specular), c.shininess.value = Math.max(r.shininess, 1e-4);
  }
  function u(c, r) {
    r.gradientMap && (c.gradientMap.value = r.gradientMap);
  }
  function g(c, r) {
    c.metalness.value = r.metalness, r.metalnessMap && (c.metalnessMap.value = r.metalnessMap, D(r.metalnessMap, c.metalnessMapTransform)), c.roughness.value = r.roughness, r.roughnessMap && (c.roughnessMap.value = r.roughnessMap, D(r.roughnessMap, c.roughnessMapTransform)), M.get(r).envMap && (c.envMapIntensity.value = r.envMapIntensity);
  }
  function s(c, r, w) {
    c.ior.value = r.ior, r.sheen > 0 && (c.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen), c.sheenRoughness.value = r.sheenRoughness, r.sheenColorMap && (c.sheenColorMap.value = r.sheenColorMap, D(r.sheenColorMap, c.sheenColorMapTransform)), r.sheenRoughnessMap && (c.sheenRoughnessMap.value = r.sheenRoughnessMap, D(r.sheenRoughnessMap, c.sheenRoughnessMapTransform))), r.clearcoat > 0 && (c.clearcoat.value = r.clearcoat, c.clearcoatRoughness.value = r.clearcoatRoughness, r.clearcoatMap && (c.clearcoatMap.value = r.clearcoatMap, D(r.clearcoatMap, c.clearcoatMapTransform)), r.clearcoatRoughnessMap && (c.clearcoatRoughnessMap.value = r.clearcoatRoughnessMap, D(r.clearcoatRoughnessMap, c.clearcoatRoughnessMapTransform)), r.clearcoatNormalMap && (c.clearcoatNormalMap.value = r.clearcoatNormalMap, D(r.clearcoatNormalMap, c.clearcoatNormalMapTransform), c.clearcoatNormalScale.value.copy(r.clearcoatNormalScale), r.side === pD && c.clearcoatNormalScale.value.negate())), r.iridescence > 0 && (c.iridescence.value = r.iridescence, c.iridescenceIOR.value = r.iridescenceIOR, c.iridescenceThicknessMinimum.value = r.iridescenceThicknessRange[0], c.iridescenceThicknessMaximum.value = r.iridescenceThicknessRange[1], r.iridescenceMap && (c.iridescenceMap.value = r.iridescenceMap, D(r.iridescenceMap, c.iridescenceMapTransform)), r.iridescenceThicknessMap && (c.iridescenceThicknessMap.value = r.iridescenceThicknessMap, D(r.iridescenceThicknessMap, c.iridescenceThicknessMapTransform))), r.transmission > 0 && (c.transmission.value = r.transmission, c.transmissionSamplerMap.value = w.texture, c.transmissionSamplerSize.value.set(w.width, w.height), r.transmissionMap && (c.transmissionMap.value = r.transmissionMap, D(r.transmissionMap, c.transmissionMapTransform)), c.thickness.value = r.thickness, r.thicknessMap && (c.thicknessMap.value = r.thicknessMap, D(r.thicknessMap, c.thicknessMapTransform)), c.attenuationDistance.value = r.attenuationDistance, c.attenuationColor.value.copy(r.attenuationColor)), r.anisotropy > 0 && (c.anisotropyVector.value.set(r.anisotropy * Math.cos(r.anisotropyRotation), r.anisotropy * Math.sin(r.anisotropyRotation)), r.anisotropyMap && (c.anisotropyMap.value = r.anisotropyMap, D(r.anisotropyMap, c.anisotropyMapTransform))), c.specularIntensity.value = r.specularIntensity, c.specularColor.value.copy(r.specularColor), r.specularColorMap && (c.specularColorMap.value = r.specularColorMap, D(r.specularColorMap, c.specularColorMapTransform)), r.specularIntensityMap && (c.specularIntensityMap.value = r.specularIntensityMap, D(r.specularIntensityMap, c.specularIntensityMapTransform));
  }
  function a(c, r) {
    r.matcap && (c.matcap.value = r.matcap);
  }
  function o(c, r) {
    const w = M.get(r).light;
    c.referencePosition.value.setFromMatrixPosition(w.matrixWorld), c.nearDistance.value = w.shadow.camera.near, c.farDistance.value = w.shadow.camera.far;
  }
  return {
    refreshFogUniforms: e,
    refreshMaterialUniforms: t
  };
}
function gy(N, M, D, e) {
  let t = {}, i = {}, n = [];
  const A = D.isWebGL2 ? N.getParameter(N.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
  function z(w, y) {
    const j = y.program;
    e.uniformBlockBinding(w, j);
  }
  function I(w, y) {
    let j = t[w.id];
    j === void 0 && (a(w), j = T(w), t[w.id] = j, w.addEventListener("dispose", c));
    const l = y.program;
    e.updateUBOMapping(w, l);
    const d = M.render.frame;
    i[w.id] !== d && (g(w), i[w.id] = d);
  }
  function T(w) {
    const y = u();
    w.__bindingPointIndex = y;
    const j = N.createBuffer(), l = w.__size, d = w.usage;
    return N.bindBuffer(N.UNIFORM_BUFFER, j), N.bufferData(N.UNIFORM_BUFFER, l, d), N.bindBuffer(N.UNIFORM_BUFFER, null), N.bindBufferBase(N.UNIFORM_BUFFER, y, j), j;
  }
  function u() {
    for (let w = 0; w < A; w++)
      if (n.indexOf(w) === -1)
        return n.push(w), w;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function g(w) {
    const y = t[w.id], j = w.uniforms, l = w.__cache;
    N.bindBuffer(N.UNIFORM_BUFFER, y);
    for (let d = 0, h = j.length; d < h; d++) {
      const Z = j[d];
      if (s(Z, d, l) === !0) {
        const L = Z.__offset, x = Array.isArray(Z.value) ? Z.value : [Z.value];
        let R = 0;
        for (let B = 0; B < x.length; B++) {
          const H = x[B], p = o(H);
          typeof H == "number" ? (Z.__data[0] = H, N.bufferSubData(N.UNIFORM_BUFFER, L + R, Z.__data)) : H.isMatrix3 ? (Z.__data[0] = H.elements[0], Z.__data[1] = H.elements[1], Z.__data[2] = H.elements[2], Z.__data[3] = H.elements[0], Z.__data[4] = H.elements[3], Z.__data[5] = H.elements[4], Z.__data[6] = H.elements[5], Z.__data[7] = H.elements[0], Z.__data[8] = H.elements[6], Z.__data[9] = H.elements[7], Z.__data[10] = H.elements[8], Z.__data[11] = H.elements[0]) : (H.toArray(Z.__data, R), R += p.storage / Float32Array.BYTES_PER_ELEMENT);
        }
        N.bufferSubData(N.UNIFORM_BUFFER, L, Z.__data);
      }
    }
    N.bindBuffer(N.UNIFORM_BUFFER, null);
  }
  function s(w, y, j) {
    const l = w.value;
    if (j[y] === void 0) {
      if (typeof l == "number")
        j[y] = l;
      else {
        const d = Array.isArray(l) ? l : [l], h = [];
        for (let Z = 0; Z < d.length; Z++)
          h.push(d[Z].clone());
        j[y] = h;
      }
      return !0;
    } else if (typeof l == "number") {
      if (j[y] !== l)
        return j[y] = l, !0;
    } else {
      const d = Array.isArray(j[y]) ? j[y] : [j[y]], h = Array.isArray(l) ? l : [l];
      for (let Z = 0; Z < d.length; Z++) {
        const L = d[Z];
        if (L.equals(h[Z]) === !1)
          return L.copy(h[Z]), !0;
      }
    }
    return !1;
  }
  function a(w) {
    const y = w.uniforms;
    let j = 0;
    const l = 16;
    let d = 0;
    for (let h = 0, Z = y.length; h < Z; h++) {
      const L = y[h], x = {
        boundary: 0,
        // bytes
        storage: 0
        // bytes
      }, R = Array.isArray(L.value) ? L.value : [L.value];
      for (let B = 0, H = R.length; B < H; B++) {
        const p = R[B], k = o(p);
        x.boundary += k.boundary, x.storage += k.storage;
      }
      if (L.__data = new Float32Array(x.storage / Float32Array.BYTES_PER_ELEMENT), L.__offset = j, h > 0) {
        d = j % l;
        const B = l - d;
        d !== 0 && B - x.boundary < 0 && (j += l - d, L.__offset = j);
      }
      j += x.storage;
    }
    return d = j % l, d > 0 && (j += l - d), w.__size = j, w.__cache = {}, this;
  }
  function o(w) {
    const y = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof w == "number" ? (y.boundary = 4, y.storage = 4) : w.isVector2 ? (y.boundary = 8, y.storage = 8) : w.isVector3 || w.isColor ? (y.boundary = 16, y.storage = 12) : w.isVector4 ? (y.boundary = 16, y.storage = 16) : w.isMatrix3 ? (y.boundary = 48, y.storage = 48) : w.isMatrix4 ? (y.boundary = 64, y.storage = 64) : w.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", w), y;
  }
  function c(w) {
    const y = w.target;
    y.removeEventListener("dispose", c);
    const j = n.indexOf(y.__bindingPointIndex);
    n.splice(j, 1), N.deleteBuffer(t[y.id]), delete t[y.id], delete i[y.id];
  }
  function r() {
    for (const w in t)
      N.deleteBuffer(t[w]);
    n = [], t = {}, i = {};
  }
  return {
    bind: z,
    update: I,
    dispose: r
  };
}
class sy {
  constructor(M = {}) {
    const {
      canvas: D = ys(),
      context: e = null,
      depth: t = !0,
      stencil: i = !0,
      alpha: n = !1,
      antialias: A = !1,
      premultipliedAlpha: z = !0,
      preserveDrawingBuffer: I = !1,
      powerPreference: T = "default",
      failIfMajorPerformanceCaveat: u = !1
    } = M;
    this.isWebGLRenderer = !0;
    let g;
    e !== null ? g = e.getContextAttributes().alpha : g = n;
    const s = new Uint32Array(4), a = new Int32Array(4);
    let o = null, c = null;
    const r = [], w = [];
    this.domElement = D, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = eD, this._useLegacyLights = !1, this.toneMapping = Ke, this.toneMappingExposure = 1;
    const y = this;
    let j = !1, l = 0, d = 0, h = null, Z = -1, L = null;
    const x = new nD(), R = new nD();
    let B = null;
    const H = new KM(0);
    let p = 0, k = D.width, V = D.height, F = 1, $ = null, W = null;
    const G = new nD(0, 0, k, V), U = new nD(0, 0, k, V);
    let K = !1;
    const nM = new Sn();
    let zM = !1, gM = !1, yM = null;
    const hM = new ID(), jM = new rM(), bM = new Y(), ED = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    function fM() {
      return h === null ? F : 1;
    }
    let m = e;
    function TD(O, f) {
      for (let _ = 0; _ < O.length; _++) {
        const Q = O[_], b = D.getContext(Q, f);
        if (b !== null)
          return b;
      }
      return null;
    }
    try {
      const O = {
        alpha: !0,
        depth: t,
        stencil: i,
        antialias: A,
        premultipliedAlpha: z,
        preserveDrawingBuffer: I,
        powerPreference: T,
        failIfMajorPerformanceCaveat: u
      };
      if ("setAttribute" in D && D.setAttribute("data-engine", `three.js r${tg}`), D.addEventListener("webglcontextlost", tM, !1), D.addEventListener("webglcontextrestored", eM, !1), D.addEventListener("webglcontextcreationerror", TM, !1), m === null) {
        const f = ["webgl2", "webgl", "experimental-webgl"];
        if (y.isWebGL1Renderer === !0 && f.shift(), m = TD(f, O), m === null)
          throw TD(f) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
      typeof WebGLRenderingContext < "u" && m instanceof WebGLRenderingContext && console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."), m.getShaderPrecisionFormat === void 0 && (m.getShaderPrecisionFormat = function() {
        return { rangeMin: 1, rangeMax: 1, precision: 1 };
      });
    } catch (O) {
      throw console.error("THREE.WebGLRenderer: " + O.message), O;
    }
    let CM, pM, lM, GM, ZM, mM, FM, zD, uD, E, C, S, MM, q, DM, sM, NM, IM, wM, _M, J, RM, dM, OM;
    function oM() {
      CM = new La(m), pM = new ga(m, CM, M), CM.init(pM), RM = new Ay(m, CM, pM), lM = new Ny(m, CM, pM), GM = new xa(m), ZM = new Fo(), mM = new iy(m, CM, lM, ZM, pM, RM, GM), FM = new oa(y), zD = new Ca(y), uD = new hs(m, pM), dM = new Ta(m, CM, uD, pM), E = new wa(m, uD, GM, dM), C = new da(m, E, uD, GM), wM = new ha(m, pM, mM), sM = new sa(ZM), S = new Po(y, FM, zD, CM, pM, dM, sM), MM = new uy(y, ZM), q = new Vo(), DM = new $o(CM, pM), IM = new Ia(y, FM, zD, lM, C, g, z), NM = new ty(y, C, pM), OM = new gy(m, GM, pM, lM), _M = new ua(m, CM, GM, pM), J = new Oa(m, CM, GM, pM), GM.programs = S.programs, y.capabilities = pM, y.extensions = CM, y.properties = ZM, y.renderLists = q, y.shadowMap = NM, y.state = lM, y.info = GM;
    }
    oM();
    const v = new Ty(y, m);
    this.xr = v, this.getContext = function() {
      return m;
    }, this.getContextAttributes = function() {
      return m.getContextAttributes();
    }, this.forceContextLoss = function() {
      const O = CM.get("WEBGL_lose_context");
      O && O.loseContext();
    }, this.forceContextRestore = function() {
      const O = CM.get("WEBGL_lose_context");
      O && O.restoreContext();
    }, this.getPixelRatio = function() {
      return F;
    }, this.setPixelRatio = function(O) {
      O !== void 0 && (F = O, this.setSize(k, V, !1));
    }, this.getSize = function(O) {
      return O.set(k, V);
    }, this.setSize = function(O, f, _ = !0) {
      if (v.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      k = O, V = f, D.width = Math.floor(O * F), D.height = Math.floor(f * F), _ === !0 && (D.style.width = O + "px", D.style.height = f + "px"), this.setViewport(0, 0, O, f);
    }, this.getDrawingBufferSize = function(O) {
      return O.set(k * F, V * F).floor();
    }, this.setDrawingBufferSize = function(O, f, _) {
      k = O, V = f, F = _, D.width = Math.floor(O * _), D.height = Math.floor(f * _), this.setViewport(0, 0, O, f);
    }, this.getCurrentViewport = function(O) {
      return O.copy(x);
    }, this.getViewport = function(O) {
      return O.copy(G);
    }, this.setViewport = function(O, f, _, Q) {
      O.isVector4 ? G.set(O.x, O.y, O.z, O.w) : G.set(O, f, _, Q), lM.viewport(x.copy(G).multiplyScalar(F).floor());
    }, this.getScissor = function(O) {
      return O.copy(U);
    }, this.setScissor = function(O, f, _, Q) {
      O.isVector4 ? U.set(O.x, O.y, O.z, O.w) : U.set(O, f, _, Q), lM.scissor(R.copy(U).multiplyScalar(F).floor());
    }, this.getScissorTest = function() {
      return K;
    }, this.setScissorTest = function(O) {
      lM.setScissorTest(K = O);
    }, this.setOpaqueSort = function(O) {
      $ = O;
    }, this.setTransparentSort = function(O) {
      W = O;
    }, this.getClearColor = function(O) {
      return O.copy(IM.getClearColor());
    }, this.setClearColor = function() {
      IM.setClearColor.apply(IM, arguments);
    }, this.getClearAlpha = function() {
      return IM.getClearAlpha();
    }, this.setClearAlpha = function() {
      IM.setClearAlpha.apply(IM, arguments);
    }, this.clear = function(O = !0, f = !0, _ = !0) {
      let Q = 0;
      if (O) {
        let b = !1;
        if (h !== null) {
          const uM = h.texture.format;
          b = uM === ST || uM === QT || uM === mT;
        }
        if (b) {
          const uM = h.texture.type, aM = uM === Re || uM === Ze || uM === fn || uM === it || uM === UT || uM === fT, xM = IM.getClearColor(), EM = IM.getClearAlpha(), QM = xM.r, LM = xM.g, YM = xM.b;
          aM ? (s[0] = QM, s[1] = LM, s[2] = YM, s[3] = EM, m.clearBufferuiv(m.COLOR, 0, s)) : (a[0] = QM, a[1] = LM, a[2] = YM, a[3] = EM, m.clearBufferiv(m.COLOR, 0, a));
        } else
          Q |= m.COLOR_BUFFER_BIT;
      }
      f && (Q |= m.DEPTH_BUFFER_BIT), _ && (Q |= m.STENCIL_BUFFER_BIT), m.clear(Q);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      D.removeEventListener("webglcontextlost", tM, !1), D.removeEventListener("webglcontextrestored", eM, !1), D.removeEventListener("webglcontextcreationerror", TM, !1), q.dispose(), DM.dispose(), ZM.dispose(), FM.dispose(), zD.dispose(), C.dispose(), dM.dispose(), OM.dispose(), S.dispose(), v.dispose(), v.removeEventListener("sessionstart", BM), v.removeEventListener("sessionend", De), yM && (yM.dispose(), yM = null), jD.stop();
    };
    function tM(O) {
      O.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), j = !0;
    }
    function eM() {
      console.log("THREE.WebGLRenderer: Context Restored."), j = !1;
      const O = GM.autoReset, f = NM.enabled, _ = NM.autoUpdate, Q = NM.needsUpdate, b = NM.type;
      oM(), GM.autoReset = O, NM.enabled = f, NM.autoUpdate = _, NM.needsUpdate = Q, NM.type = b;
    }
    function TM(O) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", O.statusMessage);
    }
    function AM(O) {
      const f = O.target;
      f.removeEventListener("dispose", AM), X(f);
    }
    function X(O) {
      cM(O), ZM.remove(O);
    }
    function cM(O) {
      const f = ZM.get(O).programs;
      f !== void 0 && (f.forEach(function(_) {
        S.releaseProgram(_);
      }), O.isShaderMaterial && S.releaseShaderCache(O));
    }
    this.renderBufferDirect = function(O, f, _, Q, b, uM) {
      f === null && (f = ED);
      const aM = b.isMesh && b.matrixWorld.determinant() < 0, xM = Ou(O, f, _, Q, b);
      lM.setMaterial(Q, aM);
      let EM = _.index, QM = 1;
      if (Q.wireframe === !0) {
        if (EM = E.getWireframeAttribute(_), EM === void 0)
          return;
        QM = 2;
      }
      const LM = _.drawRange, YM = _.attributes.position;
      let WM = LM.start * QM, XM = (LM.start + LM.count) * QM;
      uM !== null && (WM = Math.max(WM, uM.start * QM), XM = Math.min(XM, (uM.start + uM.count) * QM)), EM !== null ? (WM = Math.max(WM, 0), XM = Math.min(XM, EM.count)) : YM != null && (WM = Math.max(WM, 0), XM = Math.min(XM, YM.count));
      const ZD = XM - WM;
      if (ZD < 0 || ZD === 1 / 0)
        return;
      dM.setup(b, Q, xM, _, EM);
      let ne, qM = _M;
      if (EM !== null && (ne = uD.get(EM), qM = J, qM.setIndex(ne)), b.isMesh)
        Q.wireframe === !0 ? (lM.setLineWidth(Q.wireframeLinewidth * fM()), qM.setMode(m.LINES)) : qM.setMode(m.TRIANGLES);
      else if (b.isLine) {
        let SM = Q.linewidth;
        SM === void 0 && (SM = 1), lM.setLineWidth(SM * fM()), b.isLineSegments ? qM.setMode(m.LINES) : b.isLineLoop ? qM.setMode(m.LINE_LOOP) : qM.setMode(m.LINE_STRIP);
      } else
        b.isPoints ? qM.setMode(m.POINTS) : b.isSprite && qM.setMode(m.TRIANGLES);
      if (b.isInstancedMesh)
        qM.renderInstances(WM, ZD, b.count);
      else if (_.isInstancedBufferGeometry) {
        const SM = _._maxInstanceCount !== void 0 ? _._maxInstanceCount : 1 / 0, iA = Math.min(_.instanceCount, SM);
        qM.renderInstances(WM, ZD, iA);
      } else
        qM.render(WM, ZD);
    }, this.compile = function(O, f) {
      function _(Q, b, uM) {
        Q.transparent === !0 && Q.side === Oe && Q.forceSinglePass === !1 ? (Q.side = pD, Q.needsUpdate = !0, _N(Q, b, uM), Q.side = Pe, Q.needsUpdate = !0, _N(Q, b, uM), Q.side = Oe) : _N(Q, b, uM);
      }
      c = DM.get(O), c.init(), w.push(c), O.traverseVisible(function(Q) {
        Q.isLight && Q.layers.test(f.layers) && (c.pushLight(Q), Q.castShadow && c.pushShadow(Q));
      }), c.setupLights(y._useLegacyLights), O.traverse(function(Q) {
        const b = Q.material;
        if (b)
          if (Array.isArray(b))
            for (let uM = 0; uM < b.length; uM++) {
              const aM = b[uM];
              _(aM, O, Q);
            }
          else
            _(b, O, Q);
      }), w.pop(), c = null;
    };
    let vM = null;
    function yD(O) {
      vM && vM(O);
    }
    function BM() {
      jD.stop();
    }
    function De() {
      jD.start();
    }
    const jD = new Du();
    jD.setAnimationLoop(yD), typeof self < "u" && jD.setContext(self), this.setAnimationLoop = function(O) {
      vM = O, v.setAnimationLoop(O), O === null ? jD.stop() : jD.start();
    }, v.addEventListener("sessionstart", BM), v.addEventListener("sessionend", De), this.render = function(O, f) {
      if (f !== void 0 && f.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (j === !0)
        return;
      O.matrixWorldAutoUpdate === !0 && O.updateMatrixWorld(), f.parent === null && f.matrixWorldAutoUpdate === !0 && f.updateMatrixWorld(), v.enabled === !0 && v.isPresenting === !0 && (v.cameraAutoUpdate === !0 && v.updateCamera(f), f = v.getCamera()), O.isScene === !0 && O.onBeforeRender(y, O, f, h), c = DM.get(O, w.length), c.init(), w.push(c), hM.multiplyMatrices(f.projectionMatrix, f.matrixWorldInverse), nM.setFromProjectionMatrix(hM), gM = this.localClippingEnabled, zM = sM.init(this.clippingPlanes, gM), o = q.get(O, r.length), o.init(), r.push(o), Vn(O, f, 0, y.sortObjects), o.finish(), y.sortObjects === !0 && o.sort($, W), this.info.render.frame++, zM === !0 && sM.beginShadows();
      const _ = c.state.shadowsArray;
      if (NM.render(_, O, f), zM === !0 && sM.endShadows(), this.info.autoReset === !0 && this.info.reset(), IM.render(o, O), c.setupLights(y._useLegacyLights), f.isArrayCamera) {
        const Q = f.cameras;
        for (let b = 0, uM = Q.length; b < uM; b++) {
          const aM = Q[b];
          Gn(o, O, aM, aM.viewport);
        }
      } else
        Gn(o, O, f);
      h !== null && (mM.updateMultisampleRenderTarget(h), mM.updateRenderTargetMipmap(h)), O.isScene === !0 && O.onAfterRender(y, O, f), dM.resetDefaultState(), Z = -1, L = null, w.pop(), w.length > 0 ? c = w[w.length - 1] : c = null, r.pop(), r.length > 0 ? o = r[r.length - 1] : o = null;
    };
    function Vn(O, f, _, Q) {
      if (O.visible === !1)
        return;
      if (O.layers.test(f.layers)) {
        if (O.isGroup)
          _ = O.renderOrder;
        else if (O.isLOD)
          O.autoUpdate === !0 && O.update(f);
        else if (O.isLight)
          c.pushLight(O), O.castShadow && c.pushShadow(O);
        else if (O.isSprite) {
          if (!O.frustumCulled || nM.intersectsSprite(O)) {
            Q && bM.setFromMatrixPosition(O.matrixWorld).applyMatrix4(hM);
            const aM = C.update(O), xM = O.material;
            xM.visible && o.push(O, aM, xM, _, bM.z, null);
          }
        } else if ((O.isMesh || O.isLine || O.isPoints) && (!O.frustumCulled || nM.intersectsObject(O))) {
          const aM = C.update(O), xM = O.material;
          if (Q && (O.boundingSphere !== void 0 ? (O.boundingSphere === null && O.computeBoundingSphere(), bM.copy(O.boundingSphere.center)) : (aM.boundingSphere === null && aM.computeBoundingSphere(), bM.copy(aM.boundingSphere.center)), bM.applyMatrix4(O.matrixWorld).applyMatrix4(hM)), Array.isArray(xM)) {
            const EM = aM.groups;
            for (let QM = 0, LM = EM.length; QM < LM; QM++) {
              const YM = EM[QM], WM = xM[YM.materialIndex];
              WM && WM.visible && o.push(O, aM, WM, _, bM.z, YM);
            }
          } else
            xM.visible && o.push(O, aM, xM, _, bM.z, null);
        }
      }
      const uM = O.children;
      for (let aM = 0, xM = uM.length; aM < xM; aM++)
        Vn(uM[aM], f, _, Q);
    }
    function Gn(O, f, _, Q) {
      const b = O.opaque, uM = O.transmissive, aM = O.transparent;
      c.setupLightsView(_), zM === !0 && sM.setGlobalState(y.clippingPlanes, _), uM.length > 0 && wu(b, uM, f, _), Q && lM.viewport(x.copy(Q)), b.length > 0 && ZN(b, f, _), uM.length > 0 && ZN(uM, f, _), aM.length > 0 && ZN(aM, f, _), lM.buffers.depth.setTest(!0), lM.buffers.depth.setMask(!0), lM.buffers.color.setMask(!0), lM.setPolygonOffset(!1);
    }
    function wu(O, f, _, Q) {
      const b = pM.isWebGL2;
      yM === null && (yM = new Tt(1, 1, {
        generateMipmaps: !0,
        type: CM.has("EXT_color_buffer_half_float") ? lN : Re,
        minFilter: EN,
        samples: b ? 4 : 0
      })), y.getDrawingBufferSize(jM), b ? yM.setSize(jM.x, jM.y) : yM.setSize(yn(jM.x), yn(jM.y));
      const uM = y.getRenderTarget();
      y.setRenderTarget(yM), y.getClearColor(H), p = y.getClearAlpha(), p < 1 && y.setClearColor(16777215, 0.5), y.clear();
      const aM = y.toneMapping;
      y.toneMapping = Ke, ZN(O, _, Q), mM.updateMultisampleRenderTarget(yM), mM.updateRenderTargetMipmap(yM);
      let xM = !1;
      for (let EM = 0, QM = f.length; EM < QM; EM++) {
        const LM = f[EM], YM = LM.object, WM = LM.geometry, XM = LM.material, ZD = LM.group;
        if (XM.side === Oe && YM.layers.test(Q.layers)) {
          const ne = XM.side;
          XM.side = pD, XM.needsUpdate = !0, Hn(YM, _, Q, WM, XM, ZD), XM.side = ne, XM.needsUpdate = !0, xM = !0;
        }
      }
      xM === !0 && (mM.updateMultisampleRenderTarget(yM), mM.updateRenderTargetMipmap(yM)), y.setRenderTarget(uM), y.setClearColor(H, p), y.toneMapping = aM;
    }
    function ZN(O, f, _) {
      const Q = f.isScene === !0 ? f.overrideMaterial : null;
      for (let b = 0, uM = O.length; b < uM; b++) {
        const aM = O[b], xM = aM.object, EM = aM.geometry, QM = Q === null ? aM.material : Q, LM = aM.group;
        xM.layers.test(_.layers) && Hn(xM, f, _, EM, QM, LM);
      }
    }
    function Hn(O, f, _, Q, b, uM) {
      O.onBeforeRender(y, f, _, Q, b, uM), O.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse, O.matrixWorld), O.normalMatrix.getNormalMatrix(O.modelViewMatrix), b.onBeforeRender(y, f, _, Q, O, uM), b.transparent === !0 && b.side === Oe && b.forceSinglePass === !1 ? (b.side = pD, b.needsUpdate = !0, y.renderBufferDirect(_, f, Q, b, O, uM), b.side = Pe, b.needsUpdate = !0, y.renderBufferDirect(_, f, Q, b, O, uM), b.side = Oe) : y.renderBufferDirect(_, f, Q, b, O, uM), O.onAfterRender(y, f, _, Q, b, uM);
    }
    function _N(O, f, _) {
      f.isScene !== !0 && (f = ED);
      const Q = ZM.get(O), b = c.state.lights, uM = c.state.shadowsArray, aM = b.state.version, xM = S.getParameters(O, b.state, uM, f, _), EM = S.getProgramCacheKey(xM);
      let QM = Q.programs;
      Q.environment = O.isMeshStandardMaterial ? f.environment : null, Q.fog = f.fog, Q.envMap = (O.isMeshStandardMaterial ? zD : FM).get(O.envMap || Q.environment), QM === void 0 && (O.addEventListener("dispose", AM), QM = /* @__PURE__ */ new Map(), Q.programs = QM);
      let LM = QM.get(EM);
      if (LM !== void 0) {
        if (Q.currentProgram === LM && Q.lightsStateVersion === aM)
          return Wn(O, xM), LM;
      } else
        xM.uniforms = S.getUniforms(O), O.onBuild(_, xM, y), O.onBeforeCompile(xM, y), LM = S.acquireProgram(xM, EM), QM.set(EM, LM), Q.uniforms = xM.uniforms;
      const YM = Q.uniforms;
      (!O.isShaderMaterial && !O.isRawShaderMaterial || O.clipping === !0) && (YM.clippingPlanes = sM.uniform), Wn(O, xM), Q.needsLights = Eu(O), Q.lightsStateVersion = aM, Q.needsLights && (YM.ambientLightColor.value = b.state.ambient, YM.lightProbe.value = b.state.probe, YM.directionalLights.value = b.state.directional, YM.directionalLightShadows.value = b.state.directionalShadow, YM.spotLights.value = b.state.spot, YM.spotLightShadows.value = b.state.spotShadow, YM.rectAreaLights.value = b.state.rectArea, YM.ltc_1.value = b.state.rectAreaLTC1, YM.ltc_2.value = b.state.rectAreaLTC2, YM.pointLights.value = b.state.point, YM.pointLightShadows.value = b.state.pointShadow, YM.hemisphereLights.value = b.state.hemi, YM.directionalShadowMap.value = b.state.directionalShadowMap, YM.directionalShadowMatrix.value = b.state.directionalShadowMatrix, YM.spotShadowMap.value = b.state.spotShadowMap, YM.spotLightMatrix.value = b.state.spotLightMatrix, YM.spotLightMap.value = b.state.spotLightMap, YM.pointShadowMap.value = b.state.pointShadowMap, YM.pointShadowMatrix.value = b.state.pointShadowMatrix);
      const WM = LM.getUniforms(), XM = ki.seqWithValue(WM.seq, YM);
      return Q.currentProgram = LM, Q.uniformsList = XM, LM;
    }
    function Wn(O, f) {
      const _ = ZM.get(O);
      _.outputColorSpace = f.outputColorSpace, _.instancing = f.instancing, _.instancingColor = f.instancingColor, _.skinning = f.skinning, _.morphTargets = f.morphTargets, _.morphNormals = f.morphNormals, _.morphColors = f.morphColors, _.morphTargetsCount = f.morphTargetsCount, _.numClippingPlanes = f.numClippingPlanes, _.numIntersection = f.numClipIntersection, _.vertexAlphas = f.vertexAlphas, _.vertexTangents = f.vertexTangents, _.toneMapping = f.toneMapping;
    }
    function Ou(O, f, _, Q, b) {
      f.isScene !== !0 && (f = ED), mM.resetTextureUnits();
      const uM = f.fog, aM = Q.isMeshStandardMaterial ? f.environment : null, xM = h === null ? y.outputColorSpace : h.isXRRenderTarget === !0 ? h.texture.colorSpace : he, EM = (Q.isMeshStandardMaterial ? zD : FM).get(Q.envMap || aM), QM = Q.vertexColors === !0 && !!_.attributes.color && _.attributes.color.itemSize === 4, LM = !!_.attributes.tangent && (!!Q.normalMap || Q.anisotropy > 0), YM = !!_.morphAttributes.position, WM = !!_.morphAttributes.normal, XM = !!_.morphAttributes.color;
      let ZD = Ke;
      Q.toneMapped && (h === null || h.isXRRenderTarget === !0) && (ZD = y.toneMapping);
      const ne = _.morphAttributes.position || _.morphAttributes.normal || _.morphAttributes.color, qM = ne !== void 0 ? ne.length : 0, SM = ZM.get(Q), iA = c.state.lights;
      if (zM === !0 && (gM === !0 || O !== L)) {
        const UD = O === L && Q.id === Z;
        sM.setState(Q, O, UD);
      }
      let $M = !1;
      Q.version === SM.__version ? (SM.needsLights && SM.lightsStateVersion !== iA.state.version || SM.outputColorSpace !== xM || b.isInstancedMesh && SM.instancing === !1 || !b.isInstancedMesh && SM.instancing === !0 || b.isSkinnedMesh && SM.skinning === !1 || !b.isSkinnedMesh && SM.skinning === !0 || b.isInstancedMesh && SM.instancingColor === !0 && b.instanceColor === null || b.isInstancedMesh && SM.instancingColor === !1 && b.instanceColor !== null || SM.envMap !== EM || Q.fog === !0 && SM.fog !== uM || SM.numClippingPlanes !== void 0 && (SM.numClippingPlanes !== sM.numPlanes || SM.numIntersection !== sM.numIntersection) || SM.vertexAlphas !== QM || SM.vertexTangents !== LM || SM.morphTargets !== YM || SM.morphNormals !== WM || SM.morphColors !== XM || SM.toneMapping !== ZD || pM.isWebGL2 === !0 && SM.morphTargetsCount !== qM) && ($M = !0) : ($M = !0, SM.__version = Q.version);
      let Ve = SM.currentProgram;
      $M === !0 && (Ve = _N(Q, f, b));
      let Xn = !1, nN = !1, AA = !1;
      const CD = Ve.getUniforms(), Ge = SM.uniforms;
      if (lM.useProgram(Ve.program) && (Xn = !0, nN = !0, AA = !0), Q.id !== Z && (Z = Q.id, nN = !0), Xn || L !== O) {
        CD.setValue(m, "projectionMatrix", O.projectionMatrix), CD.setValue(m, "viewMatrix", O.matrixWorldInverse);
        const UD = CD.map.cameraPosition;
        UD !== void 0 && UD.setValue(m, bM.setFromMatrixPosition(O.matrixWorld)), pM.logarithmicDepthBuffer && CD.setValue(
          m,
          "logDepthBufFC",
          2 / (Math.log(O.far + 1) / Math.LN2)
        ), (Q.isMeshPhongMaterial || Q.isMeshToonMaterial || Q.isMeshLambertMaterial || Q.isMeshBasicMaterial || Q.isMeshStandardMaterial || Q.isShaderMaterial) && CD.setValue(m, "isOrthographic", O.isOrthographicCamera === !0), L !== O && (L = O, nN = !0, AA = !0);
      }
      if (b.isSkinnedMesh) {
        CD.setOptional(m, b, "bindMatrix"), CD.setOptional(m, b, "bindMatrixInverse");
        const UD = b.skeleton;
        UD && (pM.floatVertexTextures ? (UD.boneTexture === null && UD.computeBoneTexture(), CD.setValue(m, "boneTexture", UD.boneTexture, mM), CD.setValue(m, "boneTextureSize", UD.boneTextureSize)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."));
      }
      const nA = _.morphAttributes;
      if ((nA.position !== void 0 || nA.normal !== void 0 || nA.color !== void 0 && pM.isWebGL2 === !0) && wM.update(b, _, Ve), (nN || SM.receiveShadow !== b.receiveShadow) && (SM.receiveShadow = b.receiveShadow, CD.setValue(m, "receiveShadow", b.receiveShadow)), Q.isMeshGouraudMaterial && Q.envMap !== null && (Ge.envMap.value = EM, Ge.flipEnvMap.value = EM.isCubeTexture && EM.isRenderTargetTexture === !1 ? -1 : 1), nN && (CD.setValue(m, "toneMappingExposure", y.toneMappingExposure), SM.needsLights && xu(Ge, AA), uM && Q.fog === !0 && MM.refreshFogUniforms(Ge, uM), MM.refreshMaterialUniforms(Ge, Q, F, V, yM), ki.upload(m, SM.uniformsList, Ge, mM)), Q.isShaderMaterial && Q.uniformsNeedUpdate === !0 && (ki.upload(m, SM.uniformsList, Ge, mM), Q.uniformsNeedUpdate = !1), Q.isSpriteMaterial && CD.setValue(m, "center", b.center), CD.setValue(m, "modelViewMatrix", b.modelViewMatrix), CD.setValue(m, "normalMatrix", b.normalMatrix), CD.setValue(m, "modelMatrix", b.matrixWorld), Q.isShaderMaterial || Q.isRawShaderMaterial) {
        const UD = Q.uniformsGroups;
        for (let zA = 0, lu = UD.length; zA < lu; zA++)
          if (pM.isWebGL2) {
            const qn = UD[zA];
            OM.update(qn, Ve), OM.bind(qn, Ve);
          } else
            console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.");
      }
      return Ve;
    }
    function xu(O, f) {
      O.ambientLightColor.needsUpdate = f, O.lightProbe.needsUpdate = f, O.directionalLights.needsUpdate = f, O.directionalLightShadows.needsUpdate = f, O.pointLights.needsUpdate = f, O.pointLightShadows.needsUpdate = f, O.spotLights.needsUpdate = f, O.spotLightShadows.needsUpdate = f, O.rectAreaLights.needsUpdate = f, O.hemisphereLights.needsUpdate = f;
    }
    function Eu(O) {
      return O.isMeshLambertMaterial || O.isMeshToonMaterial || O.isMeshPhongMaterial || O.isMeshStandardMaterial || O.isShadowMaterial || O.isShaderMaterial && O.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return l;
    }, this.getActiveMipmapLevel = function() {
      return d;
    }, this.getRenderTarget = function() {
      return h;
    }, this.setRenderTargetTextures = function(O, f, _) {
      ZM.get(O.texture).__webglTexture = f, ZM.get(O.depthTexture).__webglTexture = _;
      const Q = ZM.get(O);
      Q.__hasExternalTextures = !0, Q.__hasExternalTextures && (Q.__autoAllocateDepthBuffer = _ === void 0, Q.__autoAllocateDepthBuffer || CM.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), Q.__useRenderToTexture = !1));
    }, this.setRenderTargetFramebuffer = function(O, f) {
      const _ = ZM.get(O);
      _.__webglFramebuffer = f, _.__useDefaultFramebuffer = f === void 0;
    }, this.setRenderTarget = function(O, f = 0, _ = 0) {
      h = O, l = f, d = _;
      let Q = !0, b = null, uM = !1, aM = !1;
      if (O) {
        const EM = ZM.get(O);
        EM.__useDefaultFramebuffer !== void 0 ? (lM.bindFramebuffer(m.FRAMEBUFFER, null), Q = !1) : EM.__webglFramebuffer === void 0 ? mM.setupRenderTarget(O) : EM.__hasExternalTextures && mM.rebindTextures(O, ZM.get(O.texture).__webglTexture, ZM.get(O.depthTexture).__webglTexture);
        const QM = O.texture;
        (QM.isData3DTexture || QM.isDataArrayTexture || QM.isCompressedArrayTexture) && (aM = !0);
        const LM = ZM.get(O).__webglFramebuffer;
        O.isWebGLCubeRenderTarget ? (Array.isArray(LM[f]) ? b = LM[f][_] : b = LM[f], uM = !0) : pM.isWebGL2 && O.samples > 0 && mM.useMultisampledRTT(O) === !1 ? b = ZM.get(O).__webglMultisampledFramebuffer : Array.isArray(LM) ? b = LM[_] : b = LM, x.copy(O.viewport), R.copy(O.scissor), B = O.scissorTest;
      } else
        x.copy(G).multiplyScalar(F).floor(), R.copy(U).multiplyScalar(F).floor(), B = K;
      if (lM.bindFramebuffer(m.FRAMEBUFFER, b) && pM.drawBuffers && Q && lM.drawBuffers(O, b), lM.viewport(x), lM.scissor(R), lM.setScissorTest(B), uM) {
        const EM = ZM.get(O.texture);
        m.framebufferTexture2D(m.FRAMEBUFFER, m.COLOR_ATTACHMENT0, m.TEXTURE_CUBE_MAP_POSITIVE_X + f, EM.__webglTexture, _);
      } else if (aM) {
        const EM = ZM.get(O.texture), QM = f || 0;
        m.framebufferTextureLayer(m.FRAMEBUFFER, m.COLOR_ATTACHMENT0, EM.__webglTexture, _ || 0, QM);
      }
      Z = -1;
    }, this.readRenderTargetPixels = function(O, f, _, Q, b, uM, aM) {
      if (!(O && O.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let xM = ZM.get(O).__webglFramebuffer;
      if (O.isWebGLCubeRenderTarget && aM !== void 0 && (xM = xM[aM]), xM) {
        lM.bindFramebuffer(m.FRAMEBUFFER, xM);
        try {
          const EM = O.texture, QM = EM.format, LM = EM.type;
          if (QM !== JD && RM.convert(QM) !== m.getParameter(m.IMPLEMENTATION_COLOR_READ_FORMAT)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          const YM = LM === lN && (CM.has("EXT_color_buffer_half_float") || pM.isWebGL2 && CM.has("EXT_color_buffer_float"));
          if (LM !== Re && RM.convert(LM) !== m.getParameter(m.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
          !(LM === _e && (pM.isWebGL2 || CM.has("OES_texture_float") || CM.has("WEBGL_color_buffer_float"))) && // Chrome Mac >= 52 and Firefox
          !YM) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          f >= 0 && f <= O.width - Q && _ >= 0 && _ <= O.height - b && m.readPixels(f, _, Q, b, RM.convert(QM), RM.convert(LM), uM);
        } finally {
          const EM = h !== null ? ZM.get(h).__webglFramebuffer : null;
          lM.bindFramebuffer(m.FRAMEBUFFER, EM);
        }
      }
    }, this.copyFramebufferToTexture = function(O, f, _ = 0) {
      const Q = Math.pow(2, -_), b = Math.floor(f.image.width * Q), uM = Math.floor(f.image.height * Q);
      mM.setTexture2D(f, 0), m.copyTexSubImage2D(m.TEXTURE_2D, _, 0, 0, O.x, O.y, b, uM), lM.unbindTexture();
    }, this.copyTextureToTexture = function(O, f, _, Q = 0) {
      const b = f.image.width, uM = f.image.height, aM = RM.convert(_.format), xM = RM.convert(_.type);
      mM.setTexture2D(_, 0), m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL, _.flipY), m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), m.pixelStorei(m.UNPACK_ALIGNMENT, _.unpackAlignment), f.isDataTexture ? m.texSubImage2D(m.TEXTURE_2D, Q, O.x, O.y, b, uM, aM, xM, f.image.data) : f.isCompressedTexture ? m.compressedTexSubImage2D(m.TEXTURE_2D, Q, O.x, O.y, f.mipmaps[0].width, f.mipmaps[0].height, aM, f.mipmaps[0].data) : m.texSubImage2D(m.TEXTURE_2D, Q, O.x, O.y, aM, xM, f.image), Q === 0 && _.generateMipmaps && m.generateMipmap(m.TEXTURE_2D), lM.unbindTexture();
    }, this.copyTextureToTexture3D = function(O, f, _, Q, b = 0) {
      if (y.isWebGL1Renderer) {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
        return;
      }
      const uM = O.max.x - O.min.x + 1, aM = O.max.y - O.min.y + 1, xM = O.max.z - O.min.z + 1, EM = RM.convert(Q.format), QM = RM.convert(Q.type);
      let LM;
      if (Q.isData3DTexture)
        mM.setTexture3D(Q, 0), LM = m.TEXTURE_3D;
      else if (Q.isDataArrayTexture)
        mM.setTexture2DArray(Q, 0), LM = m.TEXTURE_2D_ARRAY;
      else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL, Q.flipY), m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL, Q.premultiplyAlpha), m.pixelStorei(m.UNPACK_ALIGNMENT, Q.unpackAlignment);
      const YM = m.getParameter(m.UNPACK_ROW_LENGTH), WM = m.getParameter(m.UNPACK_IMAGE_HEIGHT), XM = m.getParameter(m.UNPACK_SKIP_PIXELS), ZD = m.getParameter(m.UNPACK_SKIP_ROWS), ne = m.getParameter(m.UNPACK_SKIP_IMAGES), qM = _.isCompressedTexture ? _.mipmaps[0] : _.image;
      m.pixelStorei(m.UNPACK_ROW_LENGTH, qM.width), m.pixelStorei(m.UNPACK_IMAGE_HEIGHT, qM.height), m.pixelStorei(m.UNPACK_SKIP_PIXELS, O.min.x), m.pixelStorei(m.UNPACK_SKIP_ROWS, O.min.y), m.pixelStorei(m.UNPACK_SKIP_IMAGES, O.min.z), _.isDataTexture || _.isData3DTexture ? m.texSubImage3D(LM, b, f.x, f.y, f.z, uM, aM, xM, EM, QM, qM.data) : _.isCompressedArrayTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."), m.compressedTexSubImage3D(LM, b, f.x, f.y, f.z, uM, aM, xM, EM, qM.data)) : m.texSubImage3D(LM, b, f.x, f.y, f.z, uM, aM, xM, EM, QM, qM), m.pixelStorei(m.UNPACK_ROW_LENGTH, YM), m.pixelStorei(m.UNPACK_IMAGE_HEIGHT, WM), m.pixelStorei(m.UNPACK_SKIP_PIXELS, XM), m.pixelStorei(m.UNPACK_SKIP_ROWS, ZD), m.pixelStorei(m.UNPACK_SKIP_IMAGES, ne), b === 0 && Q.generateMipmaps && m.generateMipmap(LM), lM.unbindTexture();
    }, this.initTexture = function(O) {
      O.isCubeTexture ? mM.setTextureCube(O, 0) : O.isData3DTexture ? mM.setTexture3D(O, 0) : O.isDataArrayTexture || O.isCompressedArrayTexture ? mM.setTexture2DArray(O, 0) : mM.setTexture2D(O, 0), lM.unbindTexture();
    }, this.resetState = function() {
      l = 0, d = 0, h = null, lM.reset(), dM.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return xe;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(M) {
    this._outputColorSpace = M;
    const D = this.getContext();
    D.drawingBufferColorSpace = M === mn ? "display-p3" : "srgb", D.unpackColorSpace = PM.workingColorSpace === Ji ? "display-p3" : "srgb";
  }
  get physicallyCorrectLights() {
    return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."), !this.useLegacyLights;
  }
  set physicallyCorrectLights(M) {
    console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."), this.useLegacyLights = !M;
  }
  get outputEncoding() {
    return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace === eD ? nt : kT;
  }
  set outputEncoding(M) {
    console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace = M === nt ? eD : he;
  }
  get useLegacyLights() {
    return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights;
  }
  set useLegacyLights(M) {
    console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights = M;
  }
}
class ry extends YD {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(M, D) {
    return super.copy(M, D), M.background !== null && (this.background = M.background.clone()), M.environment !== null && (this.environment = M.environment.clone()), M.fog !== null && (this.fog = M.fog.clone()), this.backgroundBlurriness = M.backgroundBlurriness, this.backgroundIntensity = M.backgroundIntensity, M.overrideMaterial !== null && (this.overrideMaterial = M.overrideMaterial.clone()), this.matrixAutoUpdate = M.matrixAutoUpdate, this;
  }
  toJSON(M) {
    const D = super.toJSON(M);
    return this.fog !== null && (D.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (D.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (D.object.backgroundIntensity = this.backgroundIntensity), D;
  }
}
class cy extends Me {
  constructor(M, D, e, t, i, n, A, z, I) {
    super(M, D, e, t, i, n, A, z, I), this.isVideoTexture = !0, this.minFilter = n !== void 0 ? n : dD, this.magFilter = i !== void 0 ? i : dD, this.generateMipmaps = !1;
    const T = this;
    function u() {
      T.needsUpdate = !0, M.requestVideoFrameCallback(u);
    }
    "requestVideoFrameCallback" in M && M.requestVideoFrameCallback(u);
  }
  clone() {
    return new this.constructor(this.image).copy(this);
  }
  update() {
    const M = this.image;
    "requestVideoFrameCallback" in M === !1 && M.readyState >= M.HAVE_CURRENT_DATA && (this.needsUpdate = !0);
  }
}
/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const Iu = "157", hn = 0, ay = 1, xI = 1, oy = 100, yy = 204, jy = 205, Cy = 3, Tu = 0, uu = 300, EI = 1e3, zi = 1001, lI = 1002, Ly = 1006, wy = 1008, Oy = 1009, xy = 1015, Ey = 1023, ly = 3e3, RA = 3001, hy = 0, Zi = "", XD = "srgb", bn = "srgb-linear", dy = "display-p3", gu = "display-p3-linear", dn = "linear", hI = "srgb", dI = "rec709", vI = "p3", PA = 7680, vy = 519, pI = 35044, Ii = 2e3, YI = 2001;
class DA {
  addEventListener(M, D) {
    this._listeners === void 0 && (this._listeners = {});
    const e = this._listeners;
    e[M] === void 0 && (e[M] = []), e[M].indexOf(D) === -1 && e[M].push(D);
  }
  hasEventListener(M, D) {
    if (this._listeners === void 0)
      return !1;
    const e = this._listeners;
    return e[M] !== void 0 && e[M].indexOf(D) !== -1;
  }
  removeEventListener(M, D) {
    if (this._listeners === void 0)
      return;
    const t = this._listeners[M];
    if (t !== void 0) {
      const i = t.indexOf(D);
      i !== -1 && t.splice(i, 1);
    }
  }
  dispatchEvent(M) {
    if (this._listeners === void 0)
      return;
    const e = this._listeners[M.type];
    if (e !== void 0) {
      M.target = this;
      const t = e.slice(0);
      for (let i = 0, n = t.length; i < n; i++)
        t[i].call(this, M);
      M.target = null;
    }
  }
}
const rD = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
function QN() {
  const N = Math.random() * 4294967295 | 0, M = Math.random() * 4294967295 | 0, D = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0;
  return (rD[N & 255] + rD[N >> 8 & 255] + rD[N >> 16 & 255] + rD[N >> 24 & 255] + "-" + rD[M & 255] + rD[M >> 8 & 255] + "-" + rD[M >> 16 & 15 | 64] + rD[M >> 24 & 255] + "-" + rD[D & 63 | 128] + rD[D >> 8 & 255] + "-" + rD[D >> 16 & 255] + rD[D >> 24 & 255] + rD[e & 255] + rD[e >> 8 & 255] + rD[e >> 16 & 255] + rD[e >> 24 & 255]).toLowerCase();
}
function vD(N, M, D) {
  return Math.max(M, Math.min(D, N));
}
function py(N, M) {
  return (N % M + M) % M;
}
function FA(N, M, D) {
  return (1 - D) * N + D * M;
}
function sN(N, M) {
  switch (M.constructor) {
    case Float32Array:
      return N;
    case Uint32Array:
      return N / 4294967295;
    case Uint16Array:
      return N / 65535;
    case Uint8Array:
      return N / 255;
    case Int32Array:
      return Math.max(N / 2147483647, -1);
    case Int16Array:
      return Math.max(N / 32767, -1);
    case Int8Array:
      return Math.max(N / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function hD(N, M) {
  switch (M.constructor) {
    case Float32Array:
      return N;
    case Uint32Array:
      return Math.round(N * 4294967295);
    case Uint16Array:
      return Math.round(N * 65535);
    case Uint8Array:
      return Math.round(N * 255);
    case Int32Array:
      return Math.round(N * 2147483647);
    case Int16Array:
      return Math.round(N * 32767);
    case Int8Array:
      return Math.round(N * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class xD {
  constructor(M = 0, D = 0) {
    xD.prototype.isVector2 = !0, this.x = M, this.y = D;
  }
  get width() {
    return this.x;
  }
  set width(M) {
    this.x = M;
  }
  get height() {
    return this.y;
  }
  set height(M) {
    this.y = M;
  }
  set(M, D) {
    return this.x = M, this.y = D, this;
  }
  setScalar(M) {
    return this.x = M, this.y = M, this;
  }
  setX(M) {
    return this.x = M, this;
  }
  setY(M) {
    return this.y = M, this;
  }
  setComponent(M, D) {
    switch (M) {
      case 0:
        this.x = D;
        break;
      case 1:
        this.y = D;
        break;
      default:
        throw new Error("index is out of range: " + M);
    }
    return this;
  }
  getComponent(M) {
    switch (M) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + M);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(M) {
    return this.x = M.x, this.y = M.y, this;
  }
  add(M) {
    return this.x += M.x, this.y += M.y, this;
  }
  addScalar(M) {
    return this.x += M, this.y += M, this;
  }
  addVectors(M, D) {
    return this.x = M.x + D.x, this.y = M.y + D.y, this;
  }
  addScaledVector(M, D) {
    return this.x += M.x * D, this.y += M.y * D, this;
  }
  sub(M) {
    return this.x -= M.x, this.y -= M.y, this;
  }
  subScalar(M) {
    return this.x -= M, this.y -= M, this;
  }
  subVectors(M, D) {
    return this.x = M.x - D.x, this.y = M.y - D.y, this;
  }
  multiply(M) {
    return this.x *= M.x, this.y *= M.y, this;
  }
  multiplyScalar(M) {
    return this.x *= M, this.y *= M, this;
  }
  divide(M) {
    return this.x /= M.x, this.y /= M.y, this;
  }
  divideScalar(M) {
    return this.multiplyScalar(1 / M);
  }
  applyMatrix3(M) {
    const D = this.x, e = this.y, t = M.elements;
    return this.x = t[0] * D + t[3] * e + t[6], this.y = t[1] * D + t[4] * e + t[7], this;
  }
  min(M) {
    return this.x = Math.min(this.x, M.x), this.y = Math.min(this.y, M.y), this;
  }
  max(M) {
    return this.x = Math.max(this.x, M.x), this.y = Math.max(this.y, M.y), this;
  }
  clamp(M, D) {
    return this.x = Math.max(M.x, Math.min(D.x, this.x)), this.y = Math.max(M.y, Math.min(D.y, this.y)), this;
  }
  clampScalar(M, D) {
    return this.x = Math.max(M, Math.min(D, this.x)), this.y = Math.max(M, Math.min(D, this.y)), this;
  }
  clampLength(M, D) {
    const e = this.length();
    return this.divideScalar(e || 1).multiplyScalar(Math.max(M, Math.min(D, e)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(M) {
    return this.x * M.x + this.y * M.y;
  }
  cross(M) {
    return this.x * M.y - this.y * M.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(M) {
    const D = Math.sqrt(this.lengthSq() * M.lengthSq());
    if (D === 0)
      return Math.PI / 2;
    const e = this.dot(M) / D;
    return Math.acos(vD(e, -1, 1));
  }
  distanceTo(M) {
    return Math.sqrt(this.distanceToSquared(M));
  }
  distanceToSquared(M) {
    const D = this.x - M.x, e = this.y - M.y;
    return D * D + e * e;
  }
  manhattanDistanceTo(M) {
    return Math.abs(this.x - M.x) + Math.abs(this.y - M.y);
  }
  setLength(M) {
    return this.normalize().multiplyScalar(M);
  }
  lerp(M, D) {
    return this.x += (M.x - this.x) * D, this.y += (M.y - this.y) * D, this;
  }
  lerpVectors(M, D, e) {
    return this.x = M.x + (D.x - M.x) * e, this.y = M.y + (D.y - M.y) * e, this;
  }
  equals(M) {
    return M.x === this.x && M.y === this.y;
  }
  fromArray(M, D = 0) {
    return this.x = M[D], this.y = M[D + 1], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.x, M[D + 1] = this.y, M;
  }
  fromBufferAttribute(M, D) {
    return this.x = M.getX(D), this.y = M.getY(D), this;
  }
  rotateAround(M, D) {
    const e = Math.cos(D), t = Math.sin(D), i = this.x - M.x, n = this.y - M.y;
    return this.x = i * e - n * t + M.x, this.y = i * t + n * e + M.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Be {
  constructor(M, D, e, t, i, n, A, z, I) {
    Be.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], M !== void 0 && this.set(M, D, e, t, i, n, A, z, I);
  }
  set(M, D, e, t, i, n, A, z, I) {
    const T = this.elements;
    return T[0] = M, T[1] = t, T[2] = A, T[3] = D, T[4] = i, T[5] = z, T[6] = e, T[7] = n, T[8] = I, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(M) {
    const D = this.elements, e = M.elements;
    return D[0] = e[0], D[1] = e[1], D[2] = e[2], D[3] = e[3], D[4] = e[4], D[5] = e[5], D[6] = e[6], D[7] = e[7], D[8] = e[8], this;
  }
  extractBasis(M, D, e) {
    return M.setFromMatrix3Column(this, 0), D.setFromMatrix3Column(this, 1), e.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(M) {
    const D = M.elements;
    return this.set(
      D[0],
      D[4],
      D[8],
      D[1],
      D[5],
      D[9],
      D[2],
      D[6],
      D[10]
    ), this;
  }
  multiply(M) {
    return this.multiplyMatrices(this, M);
  }
  premultiply(M) {
    return this.multiplyMatrices(M, this);
  }
  multiplyMatrices(M, D) {
    const e = M.elements, t = D.elements, i = this.elements, n = e[0], A = e[3], z = e[6], I = e[1], T = e[4], u = e[7], g = e[2], s = e[5], a = e[8], o = t[0], c = t[3], r = t[6], w = t[1], y = t[4], j = t[7], l = t[2], d = t[5], h = t[8];
    return i[0] = n * o + A * w + z * l, i[3] = n * c + A * y + z * d, i[6] = n * r + A * j + z * h, i[1] = I * o + T * w + u * l, i[4] = I * c + T * y + u * d, i[7] = I * r + T * j + u * h, i[2] = g * o + s * w + a * l, i[5] = g * c + s * y + a * d, i[8] = g * r + s * j + a * h, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[3] *= M, D[6] *= M, D[1] *= M, D[4] *= M, D[7] *= M, D[2] *= M, D[5] *= M, D[8] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], e = M[1], t = M[2], i = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8];
    return D * n * T - D * A * I - e * i * T + e * A * z + t * i * I - t * n * z;
  }
  invert() {
    const M = this.elements, D = M[0], e = M[1], t = M[2], i = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8], u = T * n - A * I, g = A * z - T * i, s = I * i - n * z, a = D * u + e * g + t * s;
    if (a === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const o = 1 / a;
    return M[0] = u * o, M[1] = (t * I - T * e) * o, M[2] = (A * e - t * n) * o, M[3] = g * o, M[4] = (T * D - t * z) * o, M[5] = (t * i - A * D) * o, M[6] = s * o, M[7] = (e * z - I * D) * o, M[8] = (n * D - e * i) * o, this;
  }
  transpose() {
    let M;
    const D = this.elements;
    return M = D[1], D[1] = D[3], D[3] = M, M = D[2], D[2] = D[6], D[6] = M, M = D[5], D[5] = D[7], D[7] = M, this;
  }
  getNormalMatrix(M) {
    return this.setFromMatrix4(M).invert().transpose();
  }
  transposeIntoArray(M) {
    const D = this.elements;
    return M[0] = D[0], M[1] = D[3], M[2] = D[6], M[3] = D[1], M[4] = D[4], M[5] = D[7], M[6] = D[2], M[7] = D[5], M[8] = D[8], this;
  }
  setUvTransform(M, D, e, t, i, n, A) {
    const z = Math.cos(i), I = Math.sin(i);
    return this.set(
      e * z,
      e * I,
      -e * (z * n + I * A) + n + M,
      -t * I,
      t * z,
      -t * (-I * n + z * A) + A + D,
      0,
      0,
      1
    ), this;
  }
  //
  scale(M, D) {
    return this.premultiply(BA.makeScale(M, D)), this;
  }
  rotate(M) {
    return this.premultiply(BA.makeRotation(-M)), this;
  }
  translate(M, D) {
    return this.premultiply(BA.makeTranslation(M, D)), this;
  }
  // for 2D Transforms
  makeTranslation(M, D) {
    return M.isVector2 ? this.set(
      1,
      0,
      M.x,
      0,
      1,
      M.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      M,
      0,
      1,
      D,
      0,
      0,
      1
    ), this;
  }
  makeRotation(M) {
    const D = Math.cos(M), e = Math.sin(M);
    return this.set(
      D,
      -e,
      0,
      e,
      D,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(M, D) {
    return this.set(
      M,
      0,
      0,
      0,
      D,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(M) {
    const D = this.elements, e = M.elements;
    for (let t = 0; t < 9; t++)
      if (D[t] !== e[t])
        return !1;
    return !0;
  }
  fromArray(M, D = 0) {
    for (let e = 0; e < 9; e++)
      this.elements[e] = M[e + D];
    return this;
  }
  toArray(M = [], D = 0) {
    const e = this.elements;
    return M[D] = e[0], M[D + 1] = e[1], M[D + 2] = e[2], M[D + 3] = e[3], M[D + 4] = e[4], M[D + 5] = e[5], M[D + 6] = e[6], M[D + 7] = e[7], M[D + 8] = e[8], M;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const BA = /* @__PURE__ */ new Be();
function Yy(N) {
  for (let M = N.length - 1; M >= 0; --M)
    if (N[M] >= 65535)
      return !0;
  return !1;
}
function UI(N) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", N);
}
const fI = {};
function VA(N) {
  N in fI || (fI[N] = !0, console.warn(N));
}
const mI = /* @__PURE__ */ new Be().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), QI = /* @__PURE__ */ new Be().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), Ti = {
  [bn]: {
    transfer: dn,
    primaries: dI,
    toReference: (N) => N,
    fromReference: (N) => N
  },
  [XD]: {
    transfer: hI,
    primaries: dI,
    toReference: (N) => N.convertSRGBToLinear(),
    fromReference: (N) => N.convertLinearToSRGB()
  },
  [gu]: {
    transfer: dn,
    primaries: vI,
    toReference: (N) => N.applyMatrix3(QI),
    fromReference: (N) => N.applyMatrix3(mI)
  },
  [dy]: {
    transfer: hI,
    primaries: vI,
    toReference: (N) => N.convertSRGBToLinear().applyMatrix3(QI),
    fromReference: (N) => N.applyMatrix3(mI).convertLinearToSRGB()
  }
}, Uy = /* @__PURE__ */ new Set([bn, gu]), GD = {
  enabled: !0,
  _workingColorSpace: bn,
  get legacyMode() {
    return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."), !this.enabled;
  },
  set legacyMode(N) {
    console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."), this.enabled = !N;
  },
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(N) {
    if (!Uy.has(N))
      throw new Error(`Unsupported working color space, "${N}".`);
    this._workingColorSpace = N;
  },
  convert: function(N, M, D) {
    if (this.enabled === !1 || M === D || !M || !D)
      return N;
    const e = Ti[M].toReference, t = Ti[D].fromReference;
    return t(e(N));
  },
  fromWorkingColorSpace: function(N, M) {
    return this.convert(N, this._workingColorSpace, M);
  },
  toWorkingColorSpace: function(N, M) {
    return this.convert(N, M, this._workingColorSpace);
  },
  getPrimaries: function(N) {
    return Ti[N].primaries;
  },
  getTransfer: function(N) {
    return N === Zi ? dn : Ti[N].transfer;
  }
};
function Ht(N) {
  return N < 0.04045 ? N * 0.0773993808 : Math.pow(N * 0.9478672986 + 0.0521327014, 2.4);
}
function GA(N) {
  return N < 31308e-7 ? N * 12.92 : 1.055 * Math.pow(N, 0.41666) - 0.055;
}
let pt;
class fy {
  static getDataURL(M) {
    if (/^data:/i.test(M.src) || typeof HTMLCanvasElement > "u")
      return M.src;
    let D;
    if (M instanceof HTMLCanvasElement)
      D = M;
    else {
      pt === void 0 && (pt = UI("canvas")), pt.width = M.width, pt.height = M.height;
      const e = pt.getContext("2d");
      M instanceof ImageData ? e.putImageData(M, 0, 0) : e.drawImage(M, 0, 0, M.width, M.height), D = pt;
    }
    return D.width > 2048 || D.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", M), D.toDataURL("image/jpeg", 0.6)) : D.toDataURL("image/png");
  }
  static sRGBToLinear(M) {
    if (typeof HTMLImageElement < "u" && M instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && M instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && M instanceof ImageBitmap) {
      const D = UI("canvas");
      D.width = M.width, D.height = M.height;
      const e = D.getContext("2d");
      e.drawImage(M, 0, 0, M.width, M.height);
      const t = e.getImageData(0, 0, M.width, M.height), i = t.data;
      for (let n = 0; n < i.length; n++)
        i[n] = Ht(i[n] / 255) * 255;
      return e.putImageData(t, 0, 0), D;
    } else if (M.data) {
      const D = M.data.slice(0);
      for (let e = 0; e < D.length; e++)
        D instanceof Uint8Array || D instanceof Uint8ClampedArray ? D[e] = Math.floor(Ht(D[e] / 255) * 255) : D[e] = Ht(D[e]);
      return {
        data: D,
        width: M.width,
        height: M.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), M;
  }
}
let my = 0;
class Qy {
  constructor(M = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: my++ }), this.uuid = QN(), this.data = M, this.version = 0;
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    if (!D && M.images[this.uuid] !== void 0)
      return M.images[this.uuid];
    const e = {
      uuid: this.uuid,
      url: ""
    }, t = this.data;
    if (t !== null) {
      let i;
      if (Array.isArray(t)) {
        i = [];
        for (let n = 0, A = t.length; n < A; n++)
          t[n].isDataTexture ? i.push(HA(t[n].image)) : i.push(HA(t[n]));
      } else
        i = HA(t);
      e.url = i;
    }
    return D || (M.images[this.uuid] = e), e;
  }
}
function HA(N) {
  return typeof HTMLImageElement < "u" && N instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && N instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && N instanceof ImageBitmap ? fy.getDataURL(N) : N.data ? {
    data: Array.from(N.data),
    width: N.width,
    height: N.height,
    type: N.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Sy = 0;
class zt extends DA {
  constructor(M = zt.DEFAULT_IMAGE, D = zt.DEFAULT_MAPPING, e = zi, t = zi, i = Ly, n = wy, A = Ey, z = Oy, I = zt.DEFAULT_ANISOTROPY, T = Zi) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Sy++ }), this.uuid = QN(), this.name = "", this.source = new Qy(M), this.mipmaps = [], this.mapping = D, this.channel = 0, this.wrapS = e, this.wrapT = t, this.magFilter = i, this.minFilter = n, this.anisotropy = I, this.format = A, this.internalFormat = null, this.type = z, this.offset = new xD(0, 0), this.repeat = new xD(1, 1), this.center = new xD(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Be(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, typeof T == "string" ? this.colorSpace = T : (VA("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = T === RA ? XD : Zi), this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
  }
  get image() {
    return this.source.data;
  }
  set image(M = null) {
    this.source.data = M;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.name = M.name, this.source = M.source, this.mipmaps = M.mipmaps.slice(0), this.mapping = M.mapping, this.channel = M.channel, this.wrapS = M.wrapS, this.wrapT = M.wrapT, this.magFilter = M.magFilter, this.minFilter = M.minFilter, this.anisotropy = M.anisotropy, this.format = M.format, this.internalFormat = M.internalFormat, this.type = M.type, this.offset.copy(M.offset), this.repeat.copy(M.repeat), this.center.copy(M.center), this.rotation = M.rotation, this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrix.copy(M.matrix), this.generateMipmaps = M.generateMipmaps, this.premultiplyAlpha = M.premultiplyAlpha, this.flipY = M.flipY, this.unpackAlignment = M.unpackAlignment, this.colorSpace = M.colorSpace, this.userData = JSON.parse(JSON.stringify(M.userData)), this.needsUpdate = !0, this;
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    if (!D && M.textures[this.uuid] !== void 0)
      return M.textures[this.uuid];
    const e = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(M).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (e.userData = this.userData), D || (M.textures[this.uuid] = e), e;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(M) {
    if (this.mapping !== uu)
      return M;
    if (M.applyMatrix3(this.matrix), M.x < 0 || M.x > 1)
      switch (this.wrapS) {
        case EI:
          M.x = M.x - Math.floor(M.x);
          break;
        case zi:
          M.x = M.x < 0 ? 0 : 1;
          break;
        case lI:
          Math.abs(Math.floor(M.x) % 2) === 1 ? M.x = Math.ceil(M.x) - M.x : M.x = M.x - Math.floor(M.x);
          break;
      }
    if (M.y < 0 || M.y > 1)
      switch (this.wrapT) {
        case EI:
          M.y = M.y - Math.floor(M.y);
          break;
        case zi:
          M.y = M.y < 0 ? 0 : 1;
          break;
        case lI:
          Math.abs(Math.floor(M.y) % 2) === 1 ? M.y = Math.ceil(M.y) - M.y : M.y = M.y - Math.floor(M.y);
          break;
      }
    return this.flipY && (M.y = 1 - M.y), M;
  }
  set needsUpdate(M) {
    M === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  get encoding() {
    return VA("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace === XD ? RA : ly;
  }
  set encoding(M) {
    VA("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = M === RA ? XD : Zi;
  }
}
zt.DEFAULT_IMAGE = null;
zt.DEFAULT_MAPPING = uu;
zt.DEFAULT_ANISOTROPY = 1;
class SN {
  constructor(M = 0, D = 0, e = 0, t = 1) {
    this.isQuaternion = !0, this._x = M, this._y = D, this._z = e, this._w = t;
  }
  static slerpFlat(M, D, e, t, i, n, A) {
    let z = e[t + 0], I = e[t + 1], T = e[t + 2], u = e[t + 3];
    const g = i[n + 0], s = i[n + 1], a = i[n + 2], o = i[n + 3];
    if (A === 0) {
      M[D + 0] = z, M[D + 1] = I, M[D + 2] = T, M[D + 3] = u;
      return;
    }
    if (A === 1) {
      M[D + 0] = g, M[D + 1] = s, M[D + 2] = a, M[D + 3] = o;
      return;
    }
    if (u !== o || z !== g || I !== s || T !== a) {
      let c = 1 - A;
      const r = z * g + I * s + T * a + u * o, w = r >= 0 ? 1 : -1, y = 1 - r * r;
      if (y > Number.EPSILON) {
        const l = Math.sqrt(y), d = Math.atan2(l, r * w);
        c = Math.sin(c * d) / l, A = Math.sin(A * d) / l;
      }
      const j = A * w;
      if (z = z * c + g * j, I = I * c + s * j, T = T * c + a * j, u = u * c + o * j, c === 1 - A) {
        const l = 1 / Math.sqrt(z * z + I * I + T * T + u * u);
        z *= l, I *= l, T *= l, u *= l;
      }
    }
    M[D] = z, M[D + 1] = I, M[D + 2] = T, M[D + 3] = u;
  }
  static multiplyQuaternionsFlat(M, D, e, t, i, n) {
    const A = e[t], z = e[t + 1], I = e[t + 2], T = e[t + 3], u = i[n], g = i[n + 1], s = i[n + 2], a = i[n + 3];
    return M[D] = A * a + T * u + z * s - I * g, M[D + 1] = z * a + T * g + I * u - A * s, M[D + 2] = I * a + T * s + A * g - z * u, M[D + 3] = T * a - A * u - z * g - I * s, M;
  }
  get x() {
    return this._x;
  }
  set x(M) {
    this._x = M, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(M) {
    this._y = M, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(M) {
    this._z = M, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(M) {
    this._w = M, this._onChangeCallback();
  }
  set(M, D, e, t) {
    return this._x = M, this._y = D, this._z = e, this._w = t, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(M) {
    return this._x = M.x, this._y = M.y, this._z = M.z, this._w = M.w, this._onChangeCallback(), this;
  }
  setFromEuler(M, D) {
    const e = M._x, t = M._y, i = M._z, n = M._order, A = Math.cos, z = Math.sin, I = A(e / 2), T = A(t / 2), u = A(i / 2), g = z(e / 2), s = z(t / 2), a = z(i / 2);
    switch (n) {
      case "XYZ":
        this._x = g * T * u + I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "YXZ":
        this._x = g * T * u + I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u + g * s * a;
        break;
      case "ZXY":
        this._x = g * T * u - I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "ZYX":
        this._x = g * T * u - I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u + g * s * a;
        break;
      case "YZX":
        this._x = g * T * u + I * s * a, this._y = I * s * u + g * T * a, this._z = I * T * a - g * s * u, this._w = I * T * u - g * s * a;
        break;
      case "XZY":
        this._x = g * T * u - I * s * a, this._y = I * s * u - g * T * a, this._z = I * T * a + g * s * u, this._w = I * T * u + g * s * a;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + n);
    }
    return D !== !1 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(M, D) {
    const e = D / 2, t = Math.sin(e);
    return this._x = M.x * t, this._y = M.y * t, this._z = M.z * t, this._w = Math.cos(e), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M) {
    const D = M.elements, e = D[0], t = D[4], i = D[8], n = D[1], A = D[5], z = D[9], I = D[2], T = D[6], u = D[10], g = e + A + u;
    if (g > 0) {
      const s = 0.5 / Math.sqrt(g + 1);
      this._w = 0.25 / s, this._x = (T - z) * s, this._y = (i - I) * s, this._z = (n - t) * s;
    } else if (e > A && e > u) {
      const s = 2 * Math.sqrt(1 + e - A - u);
      this._w = (T - z) / s, this._x = 0.25 * s, this._y = (t + n) / s, this._z = (i + I) / s;
    } else if (A > u) {
      const s = 2 * Math.sqrt(1 + A - e - u);
      this._w = (i - I) / s, this._x = (t + n) / s, this._y = 0.25 * s, this._z = (z + T) / s;
    } else {
      const s = 2 * Math.sqrt(1 + u - e - A);
      this._w = (n - t) / s, this._x = (i + I) / s, this._y = (z + T) / s, this._z = 0.25 * s;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(M, D) {
    let e = M.dot(D) + 1;
    return e < Number.EPSILON ? (e = 0, Math.abs(M.x) > Math.abs(M.z) ? (this._x = -M.y, this._y = M.x, this._z = 0, this._w = e) : (this._x = 0, this._y = -M.z, this._z = M.y, this._w = e)) : (this._x = M.y * D.z - M.z * D.y, this._y = M.z * D.x - M.x * D.z, this._z = M.x * D.y - M.y * D.x, this._w = e), this.normalize();
  }
  angleTo(M) {
    return 2 * Math.acos(Math.abs(vD(this.dot(M), -1, 1)));
  }
  rotateTowards(M, D) {
    const e = this.angleTo(M);
    if (e === 0)
      return this;
    const t = Math.min(1, D / e);
    return this.slerp(M, t), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(M) {
    return this._x * M._x + this._y * M._y + this._z * M._z + this._w * M._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let M = this.length();
    return M === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (M = 1 / M, this._x = this._x * M, this._y = this._y * M, this._z = this._z * M, this._w = this._w * M), this._onChangeCallback(), this;
  }
  multiply(M) {
    return this.multiplyQuaternions(this, M);
  }
  premultiply(M) {
    return this.multiplyQuaternions(M, this);
  }
  multiplyQuaternions(M, D) {
    const e = M._x, t = M._y, i = M._z, n = M._w, A = D._x, z = D._y, I = D._z, T = D._w;
    return this._x = e * T + n * A + t * I - i * z, this._y = t * T + n * z + i * A - e * I, this._z = i * T + n * I + e * z - t * A, this._w = n * T - e * A - t * z - i * I, this._onChangeCallback(), this;
  }
  slerp(M, D) {
    if (D === 0)
      return this;
    if (D === 1)
      return this.copy(M);
    const e = this._x, t = this._y, i = this._z, n = this._w;
    let A = n * M._w + e * M._x + t * M._y + i * M._z;
    if (A < 0 ? (this._w = -M._w, this._x = -M._x, this._y = -M._y, this._z = -M._z, A = -A) : this.copy(M), A >= 1)
      return this._w = n, this._x = e, this._y = t, this._z = i, this;
    const z = 1 - A * A;
    if (z <= Number.EPSILON) {
      const s = 1 - D;
      return this._w = s * n + D * this._w, this._x = s * e + D * this._x, this._y = s * t + D * this._y, this._z = s * i + D * this._z, this.normalize(), this._onChangeCallback(), this;
    }
    const I = Math.sqrt(z), T = Math.atan2(I, A), u = Math.sin((1 - D) * T) / I, g = Math.sin(D * T) / I;
    return this._w = n * u + this._w * g, this._x = e * u + this._x * g, this._y = t * u + this._y * g, this._z = i * u + this._z * g, this._onChangeCallback(), this;
  }
  slerpQuaternions(M, D, e) {
    return this.copy(M).slerp(D, e);
  }
  random() {
    const M = Math.random(), D = Math.sqrt(1 - M), e = Math.sqrt(M), t = 2 * Math.PI * Math.random(), i = 2 * Math.PI * Math.random();
    return this.set(
      D * Math.cos(t),
      e * Math.sin(i),
      e * Math.cos(i),
      D * Math.sin(t)
    );
  }
  equals(M) {
    return M._x === this._x && M._y === this._y && M._z === this._z && M._w === this._w;
  }
  fromArray(M, D = 0) {
    return this._x = M[D], this._y = M[D + 1], this._z = M[D + 2], this._w = M[D + 3], this._onChangeCallback(), this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this._x, M[D + 1] = this._y, M[D + 2] = this._z, M[D + 3] = this._w, M;
  }
  fromBufferAttribute(M, D) {
    return this._x = M.getX(D), this._y = M.getY(D), this._z = M.getZ(D), this._w = M.getW(D), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(M) {
    return this._onChangeCallback = M, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class P {
  constructor(M = 0, D = 0, e = 0) {
    P.prototype.isVector3 = !0, this.x = M, this.y = D, this.z = e;
  }
  set(M, D, e) {
    return e === void 0 && (e = this.z), this.x = M, this.y = D, this.z = e, this;
  }
  setScalar(M) {
    return this.x = M, this.y = M, this.z = M, this;
  }
  setX(M) {
    return this.x = M, this;
  }
  setY(M) {
    return this.y = M, this;
  }
  setZ(M) {
    return this.z = M, this;
  }
  setComponent(M, D) {
    switch (M) {
      case 0:
        this.x = D;
        break;
      case 1:
        this.y = D;
        break;
      case 2:
        this.z = D;
        break;
      default:
        throw new Error("index is out of range: " + M);
    }
    return this;
  }
  getComponent(M) {
    switch (M) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + M);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(M) {
    return this.x = M.x, this.y = M.y, this.z = M.z, this;
  }
  add(M) {
    return this.x += M.x, this.y += M.y, this.z += M.z, this;
  }
  addScalar(M) {
    return this.x += M, this.y += M, this.z += M, this;
  }
  addVectors(M, D) {
    return this.x = M.x + D.x, this.y = M.y + D.y, this.z = M.z + D.z, this;
  }
  addScaledVector(M, D) {
    return this.x += M.x * D, this.y += M.y * D, this.z += M.z * D, this;
  }
  sub(M) {
    return this.x -= M.x, this.y -= M.y, this.z -= M.z, this;
  }
  subScalar(M) {
    return this.x -= M, this.y -= M, this.z -= M, this;
  }
  subVectors(M, D) {
    return this.x = M.x - D.x, this.y = M.y - D.y, this.z = M.z - D.z, this;
  }
  multiply(M) {
    return this.x *= M.x, this.y *= M.y, this.z *= M.z, this;
  }
  multiplyScalar(M) {
    return this.x *= M, this.y *= M, this.z *= M, this;
  }
  multiplyVectors(M, D) {
    return this.x = M.x * D.x, this.y = M.y * D.y, this.z = M.z * D.z, this;
  }
  applyEuler(M) {
    return this.applyQuaternion(SI.setFromEuler(M));
  }
  applyAxisAngle(M, D) {
    return this.applyQuaternion(SI.setFromAxisAngle(M, D));
  }
  applyMatrix3(M) {
    const D = this.x, e = this.y, t = this.z, i = M.elements;
    return this.x = i[0] * D + i[3] * e + i[6] * t, this.y = i[1] * D + i[4] * e + i[7] * t, this.z = i[2] * D + i[5] * e + i[8] * t, this;
  }
  applyNormalMatrix(M) {
    return this.applyMatrix3(M).normalize();
  }
  applyMatrix4(M) {
    const D = this.x, e = this.y, t = this.z, i = M.elements, n = 1 / (i[3] * D + i[7] * e + i[11] * t + i[15]);
    return this.x = (i[0] * D + i[4] * e + i[8] * t + i[12]) * n, this.y = (i[1] * D + i[5] * e + i[9] * t + i[13]) * n, this.z = (i[2] * D + i[6] * e + i[10] * t + i[14]) * n, this;
  }
  applyQuaternion(M) {
    const D = this.x, e = this.y, t = this.z, i = M.x, n = M.y, A = M.z, z = M.w, I = z * D + n * t - A * e, T = z * e + A * D - i * t, u = z * t + i * e - n * D, g = -i * D - n * e - A * t;
    return this.x = I * z + g * -i + T * -A - u * -n, this.y = T * z + g * -n + u * -i - I * -A, this.z = u * z + g * -A + I * -n - T * -i, this;
  }
  project(M) {
    return this.applyMatrix4(M.matrixWorldInverse).applyMatrix4(M.projectionMatrix);
  }
  unproject(M) {
    return this.applyMatrix4(M.projectionMatrixInverse).applyMatrix4(M.matrixWorld);
  }
  transformDirection(M) {
    const D = this.x, e = this.y, t = this.z, i = M.elements;
    return this.x = i[0] * D + i[4] * e + i[8] * t, this.y = i[1] * D + i[5] * e + i[9] * t, this.z = i[2] * D + i[6] * e + i[10] * t, this.normalize();
  }
  divide(M) {
    return this.x /= M.x, this.y /= M.y, this.z /= M.z, this;
  }
  divideScalar(M) {
    return this.multiplyScalar(1 / M);
  }
  min(M) {
    return this.x = Math.min(this.x, M.x), this.y = Math.min(this.y, M.y), this.z = Math.min(this.z, M.z), this;
  }
  max(M) {
    return this.x = Math.max(this.x, M.x), this.y = Math.max(this.y, M.y), this.z = Math.max(this.z, M.z), this;
  }
  clamp(M, D) {
    return this.x = Math.max(M.x, Math.min(D.x, this.x)), this.y = Math.max(M.y, Math.min(D.y, this.y)), this.z = Math.max(M.z, Math.min(D.z, this.z)), this;
  }
  clampScalar(M, D) {
    return this.x = Math.max(M, Math.min(D, this.x)), this.y = Math.max(M, Math.min(D, this.y)), this.z = Math.max(M, Math.min(D, this.z)), this;
  }
  clampLength(M, D) {
    const e = this.length();
    return this.divideScalar(e || 1).multiplyScalar(Math.max(M, Math.min(D, e)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(M) {
    return this.x * M.x + this.y * M.y + this.z * M.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(M) {
    return this.normalize().multiplyScalar(M);
  }
  lerp(M, D) {
    return this.x += (M.x - this.x) * D, this.y += (M.y - this.y) * D, this.z += (M.z - this.z) * D, this;
  }
  lerpVectors(M, D, e) {
    return this.x = M.x + (D.x - M.x) * e, this.y = M.y + (D.y - M.y) * e, this.z = M.z + (D.z - M.z) * e, this;
  }
  cross(M) {
    return this.crossVectors(this, M);
  }
  crossVectors(M, D) {
    const e = M.x, t = M.y, i = M.z, n = D.x, A = D.y, z = D.z;
    return this.x = t * z - i * A, this.y = i * n - e * z, this.z = e * A - t * n, this;
  }
  projectOnVector(M) {
    const D = M.lengthSq();
    if (D === 0)
      return this.set(0, 0, 0);
    const e = M.dot(this) / D;
    return this.copy(M).multiplyScalar(e);
  }
  projectOnPlane(M) {
    return WA.copy(this).projectOnVector(M), this.sub(WA);
  }
  reflect(M) {
    return this.sub(WA.copy(M).multiplyScalar(2 * this.dot(M)));
  }
  angleTo(M) {
    const D = Math.sqrt(this.lengthSq() * M.lengthSq());
    if (D === 0)
      return Math.PI / 2;
    const e = this.dot(M) / D;
    return Math.acos(vD(e, -1, 1));
  }
  distanceTo(M) {
    return Math.sqrt(this.distanceToSquared(M));
  }
  distanceToSquared(M) {
    const D = this.x - M.x, e = this.y - M.y, t = this.z - M.z;
    return D * D + e * e + t * t;
  }
  manhattanDistanceTo(M) {
    return Math.abs(this.x - M.x) + Math.abs(this.y - M.y) + Math.abs(this.z - M.z);
  }
  setFromSpherical(M) {
    return this.setFromSphericalCoords(M.radius, M.phi, M.theta);
  }
  setFromSphericalCoords(M, D, e) {
    const t = Math.sin(D) * M;
    return this.x = t * Math.sin(e), this.y = Math.cos(D) * M, this.z = t * Math.cos(e), this;
  }
  setFromCylindrical(M) {
    return this.setFromCylindricalCoords(M.radius, M.theta, M.y);
  }
  setFromCylindricalCoords(M, D, e) {
    return this.x = M * Math.sin(D), this.y = e, this.z = M * Math.cos(D), this;
  }
  setFromMatrixPosition(M) {
    const D = M.elements;
    return this.x = D[12], this.y = D[13], this.z = D[14], this;
  }
  setFromMatrixScale(M) {
    const D = this.setFromMatrixColumn(M, 0).length(), e = this.setFromMatrixColumn(M, 1).length(), t = this.setFromMatrixColumn(M, 2).length();
    return this.x = D, this.y = e, this.z = t, this;
  }
  setFromMatrixColumn(M, D) {
    return this.fromArray(M.elements, D * 4);
  }
  setFromMatrix3Column(M, D) {
    return this.fromArray(M.elements, D * 3);
  }
  setFromEuler(M) {
    return this.x = M._x, this.y = M._y, this.z = M._z, this;
  }
  setFromColor(M) {
    return this.x = M.r, this.y = M.g, this.z = M.b, this;
  }
  equals(M) {
    return M.x === this.x && M.y === this.y && M.z === this.z;
  }
  fromArray(M, D = 0) {
    return this.x = M[D], this.y = M[D + 1], this.z = M[D + 2], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.x, M[D + 1] = this.y, M[D + 2] = this.z, M;
  }
  fromBufferAttribute(M, D) {
    return this.x = M.getX(D), this.y = M.getY(D), this.z = M.getZ(D), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const M = (Math.random() - 0.5) * 2, D = Math.random() * Math.PI * 2, e = Math.sqrt(1 - M ** 2);
    return this.x = e * Math.cos(D), this.y = e * Math.sin(D), this.z = M, this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const WA = /* @__PURE__ */ new P(), SI = /* @__PURE__ */ new SN();
class kN {
  constructor(M = new P(1 / 0, 1 / 0, 1 / 0), D = new P(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = M, this.max = D;
  }
  set(M, D) {
    return this.min.copy(M), this.max.copy(D), this;
  }
  setFromArray(M) {
    this.makeEmpty();
    for (let D = 0, e = M.length; D < e; D += 3)
      this.expandByPoint(ce.fromArray(M, D));
    return this;
  }
  setFromBufferAttribute(M) {
    this.makeEmpty();
    for (let D = 0, e = M.count; D < e; D++)
      this.expandByPoint(ce.fromBufferAttribute(M, D));
    return this;
  }
  setFromPoints(M) {
    this.makeEmpty();
    for (let D = 0, e = M.length; D < e; D++)
      this.expandByPoint(M[D]);
    return this;
  }
  setFromCenterAndSize(M, D) {
    const e = ce.copy(D).multiplyScalar(0.5);
    return this.min.copy(M).sub(e), this.max.copy(M).add(e), this;
  }
  setFromObject(M, D = !1) {
    return this.makeEmpty(), this.expandByObject(M, D);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.min.copy(M.min), this.max.copy(M.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(M) {
    return this.isEmpty() ? M.set(0, 0, 0) : M.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(M) {
    return this.isEmpty() ? M.set(0, 0, 0) : M.subVectors(this.max, this.min);
  }
  expandByPoint(M) {
    return this.min.min(M), this.max.max(M), this;
  }
  expandByVector(M) {
    return this.min.sub(M), this.max.add(M), this;
  }
  expandByScalar(M) {
    return this.min.addScalar(-M), this.max.addScalar(M), this;
  }
  expandByObject(M, D = !1) {
    if (M.updateWorldMatrix(!1, !1), M.boundingBox !== void 0)
      M.boundingBox === null && M.computeBoundingBox(), Yt.copy(M.boundingBox), Yt.applyMatrix4(M.matrixWorld), this.union(Yt);
    else {
      const t = M.geometry;
      if (t !== void 0)
        if (D && t.attributes !== void 0 && t.attributes.position !== void 0) {
          const i = t.attributes.position;
          for (let n = 0, A = i.count; n < A; n++)
            ce.fromBufferAttribute(i, n).applyMatrix4(M.matrixWorld), this.expandByPoint(ce);
        } else
          t.boundingBox === null && t.computeBoundingBox(), Yt.copy(t.boundingBox), Yt.applyMatrix4(M.matrixWorld), this.union(Yt);
    }
    const e = M.children;
    for (let t = 0, i = e.length; t < i; t++)
      this.expandByObject(e[t], D);
    return this;
  }
  containsPoint(M) {
    return !(M.x < this.min.x || M.x > this.max.x || M.y < this.min.y || M.y > this.max.y || M.z < this.min.z || M.z > this.max.z);
  }
  containsBox(M) {
    return this.min.x <= M.min.x && M.max.x <= this.max.x && this.min.y <= M.min.y && M.max.y <= this.max.y && this.min.z <= M.min.z && M.max.z <= this.max.z;
  }
  getParameter(M, D) {
    return D.set(
      (M.x - this.min.x) / (this.max.x - this.min.x),
      (M.y - this.min.y) / (this.max.y - this.min.y),
      (M.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(M) {
    return !(M.max.x < this.min.x || M.min.x > this.max.x || M.max.y < this.min.y || M.min.y > this.max.y || M.max.z < this.min.z || M.min.z > this.max.z);
  }
  intersectsSphere(M) {
    return this.clampPoint(M.center, ce), ce.distanceToSquared(M.center) <= M.radius * M.radius;
  }
  intersectsPlane(M) {
    let D, e;
    return M.normal.x > 0 ? (D = M.normal.x * this.min.x, e = M.normal.x * this.max.x) : (D = M.normal.x * this.max.x, e = M.normal.x * this.min.x), M.normal.y > 0 ? (D += M.normal.y * this.min.y, e += M.normal.y * this.max.y) : (D += M.normal.y * this.max.y, e += M.normal.y * this.min.y), M.normal.z > 0 ? (D += M.normal.z * this.min.z, e += M.normal.z * this.max.z) : (D += M.normal.z * this.max.z, e += M.normal.z * this.min.z), D <= -M.constant && e >= -M.constant;
  }
  intersectsTriangle(M) {
    if (this.isEmpty())
      return !1;
    this.getCenter(rN), ui.subVectors(this.max, rN), Ut.subVectors(M.a, rN), ft.subVectors(M.b, rN), mt.subVectors(M.c, rN), fe.subVectors(ft, Ut), me.subVectors(mt, ft), $e.subVectors(Ut, mt);
    let D = [
      0,
      -fe.z,
      fe.y,
      0,
      -me.z,
      me.y,
      0,
      -$e.z,
      $e.y,
      fe.z,
      0,
      -fe.x,
      me.z,
      0,
      -me.x,
      $e.z,
      0,
      -$e.x,
      -fe.y,
      fe.x,
      0,
      -me.y,
      me.x,
      0,
      -$e.y,
      $e.x,
      0
    ];
    return !XA(D, Ut, ft, mt, ui) || (D = [1, 0, 0, 0, 1, 0, 0, 0, 1], !XA(D, Ut, ft, mt, ui)) ? !1 : (gi.crossVectors(fe, me), D = [gi.x, gi.y, gi.z], XA(D, Ut, ft, mt, ui));
  }
  clampPoint(M, D) {
    return D.copy(M).clamp(this.min, this.max);
  }
  distanceToPoint(M) {
    return this.clampPoint(M, ce).distanceTo(M);
  }
  getBoundingSphere(M) {
    return this.isEmpty() ? M.makeEmpty() : (this.getCenter(M.center), M.radius = this.getSize(ce).length() * 0.5), M;
  }
  intersect(M) {
    return this.min.max(M.min), this.max.min(M.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(M) {
    return this.min.min(M.min), this.max.max(M.max), this;
  }
  applyMatrix4(M) {
    return this.isEmpty() ? this : (re[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(M), re[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(M), re[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(M), re[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(M), re[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(M), re[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(M), re[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(M), re[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(M), this.setFromPoints(re), this);
  }
  translate(M) {
    return this.min.add(M), this.max.add(M), this;
  }
  equals(M) {
    return M.min.equals(this.min) && M.max.equals(this.max);
  }
}
const re = [
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P(),
  /* @__PURE__ */ new P()
], ce = /* @__PURE__ */ new P(), Yt = /* @__PURE__ */ new kN(), Ut = /* @__PURE__ */ new P(), ft = /* @__PURE__ */ new P(), mt = /* @__PURE__ */ new P(), fe = /* @__PURE__ */ new P(), me = /* @__PURE__ */ new P(), $e = /* @__PURE__ */ new P(), rN = /* @__PURE__ */ new P(), ui = /* @__PURE__ */ new P(), gi = /* @__PURE__ */ new P(), Je = /* @__PURE__ */ new P();
function XA(N, M, D, e, t) {
  for (let i = 0, n = N.length - 3; i <= n; i += 3) {
    Je.fromArray(N, i);
    const A = t.x * Math.abs(Je.x) + t.y * Math.abs(Je.y) + t.z * Math.abs(Je.z), z = M.dot(Je), I = D.dot(Je), T = e.dot(Je);
    if (Math.max(-Math.max(z, I, T), Math.min(z, I, T)) > A)
      return !1;
  }
  return !0;
}
const ky = /* @__PURE__ */ new kN(), cN = /* @__PURE__ */ new P(), qA = /* @__PURE__ */ new P();
class eA {
  constructor(M = new P(), D = -1) {
    this.center = M, this.radius = D;
  }
  set(M, D) {
    return this.center.copy(M), this.radius = D, this;
  }
  setFromPoints(M, D) {
    const e = this.center;
    D !== void 0 ? e.copy(D) : ky.setFromPoints(M).getCenter(e);
    let t = 0;
    for (let i = 0, n = M.length; i < n; i++)
      t = Math.max(t, e.distanceToSquared(M[i]));
    return this.radius = Math.sqrt(t), this;
  }
  copy(M) {
    return this.center.copy(M.center), this.radius = M.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(M) {
    return M.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(M) {
    return M.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(M) {
    const D = this.radius + M.radius;
    return M.center.distanceToSquared(this.center) <= D * D;
  }
  intersectsBox(M) {
    return M.intersectsSphere(this);
  }
  intersectsPlane(M) {
    return Math.abs(M.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(M, D) {
    const e = this.center.distanceToSquared(M);
    return D.copy(M), e > this.radius * this.radius && (D.sub(this.center).normalize(), D.multiplyScalar(this.radius).add(this.center)), D;
  }
  getBoundingBox(M) {
    return this.isEmpty() ? (M.makeEmpty(), M) : (M.set(this.center, this.center), M.expandByScalar(this.radius), M);
  }
  applyMatrix4(M) {
    return this.center.applyMatrix4(M), this.radius = this.radius * M.getMaxScaleOnAxis(), this;
  }
  translate(M) {
    return this.center.add(M), this;
  }
  expandByPoint(M) {
    if (this.isEmpty())
      return this.center.copy(M), this.radius = 0, this;
    cN.subVectors(M, this.center);
    const D = cN.lengthSq();
    if (D > this.radius * this.radius) {
      const e = Math.sqrt(D), t = (e - this.radius) * 0.5;
      this.center.addScaledVector(cN, t / e), this.radius += t;
    }
    return this;
  }
  union(M) {
    return M.isEmpty() ? this : this.isEmpty() ? (this.copy(M), this) : (this.center.equals(M.center) === !0 ? this.radius = Math.max(this.radius, M.radius) : (qA.subVectors(M.center, this.center).setLength(M.radius), this.expandByPoint(cN.copy(M.center).add(qA)), this.expandByPoint(cN.copy(M.center).sub(qA))), this);
  }
  equals(M) {
    return M.center.equals(this.center) && M.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const ae = /* @__PURE__ */ new P(), $A = /* @__PURE__ */ new P(), si = /* @__PURE__ */ new P(), Qe = /* @__PURE__ */ new P(), JA = /* @__PURE__ */ new P(), ri = /* @__PURE__ */ new P(), Mn = /* @__PURE__ */ new P();
class Kn {
  constructor(M = new P(), D = new P(0, 0, -1)) {
    this.origin = M, this.direction = D;
  }
  set(M, D) {
    return this.origin.copy(M), this.direction.copy(D), this;
  }
  copy(M) {
    return this.origin.copy(M.origin), this.direction.copy(M.direction), this;
  }
  at(M, D) {
    return D.copy(this.origin).addScaledVector(this.direction, M);
  }
  lookAt(M) {
    return this.direction.copy(M).sub(this.origin).normalize(), this;
  }
  recast(M) {
    return this.origin.copy(this.at(M, ae)), this;
  }
  closestPointToPoint(M, D) {
    D.subVectors(M, this.origin);
    const e = D.dot(this.direction);
    return e < 0 ? D.copy(this.origin) : D.copy(this.origin).addScaledVector(this.direction, e);
  }
  distanceToPoint(M) {
    return Math.sqrt(this.distanceSqToPoint(M));
  }
  distanceSqToPoint(M) {
    const D = ae.subVectors(M, this.origin).dot(this.direction);
    return D < 0 ? this.origin.distanceToSquared(M) : (ae.copy(this.origin).addScaledVector(this.direction, D), ae.distanceToSquared(M));
  }
  distanceSqToSegment(M, D, e, t) {
    $A.copy(M).add(D).multiplyScalar(0.5), si.copy(D).sub(M).normalize(), Qe.copy(this.origin).sub($A);
    const i = M.distanceTo(D) * 0.5, n = -this.direction.dot(si), A = Qe.dot(this.direction), z = -Qe.dot(si), I = Qe.lengthSq(), T = Math.abs(1 - n * n);
    let u, g, s, a;
    if (T > 0)
      if (u = n * z - A, g = n * A - z, a = i * T, u >= 0)
        if (g >= -a)
          if (g <= a) {
            const o = 1 / T;
            u *= o, g *= o, s = u * (u + n * g + 2 * A) + g * (n * u + g + 2 * z) + I;
          } else
            g = i, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
        else
          g = -i, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
      else
        g <= -a ? (u = Math.max(0, -(-n * i + A)), g = u > 0 ? -i : Math.min(Math.max(-i, -z), i), s = -u * u + g * (g + 2 * z) + I) : g <= a ? (u = 0, g = Math.min(Math.max(-i, -z), i), s = g * (g + 2 * z) + I) : (u = Math.max(0, -(n * i + A)), g = u > 0 ? i : Math.min(Math.max(-i, -z), i), s = -u * u + g * (g + 2 * z) + I);
    else
      g = n > 0 ? -i : i, u = Math.max(0, -(n * g + A)), s = -u * u + g * (g + 2 * z) + I;
    return e && e.copy(this.origin).addScaledVector(this.direction, u), t && t.copy($A).addScaledVector(si, g), s;
  }
  intersectSphere(M, D) {
    ae.subVectors(M.center, this.origin);
    const e = ae.dot(this.direction), t = ae.dot(ae) - e * e, i = M.radius * M.radius;
    if (t > i)
      return null;
    const n = Math.sqrt(i - t), A = e - n, z = e + n;
    return z < 0 ? null : A < 0 ? this.at(z, D) : this.at(A, D);
  }
  intersectsSphere(M) {
    return this.distanceSqToPoint(M.center) <= M.radius * M.radius;
  }
  distanceToPlane(M) {
    const D = M.normal.dot(this.direction);
    if (D === 0)
      return M.distanceToPoint(this.origin) === 0 ? 0 : null;
    const e = -(this.origin.dot(M.normal) + M.constant) / D;
    return e >= 0 ? e : null;
  }
  intersectPlane(M, D) {
    const e = this.distanceToPlane(M);
    return e === null ? null : this.at(e, D);
  }
  intersectsPlane(M) {
    const D = M.distanceToPoint(this.origin);
    return D === 0 || M.normal.dot(this.direction) * D < 0;
  }
  intersectBox(M, D) {
    let e, t, i, n, A, z;
    const I = 1 / this.direction.x, T = 1 / this.direction.y, u = 1 / this.direction.z, g = this.origin;
    return I >= 0 ? (e = (M.min.x - g.x) * I, t = (M.max.x - g.x) * I) : (e = (M.max.x - g.x) * I, t = (M.min.x - g.x) * I), T >= 0 ? (i = (M.min.y - g.y) * T, n = (M.max.y - g.y) * T) : (i = (M.max.y - g.y) * T, n = (M.min.y - g.y) * T), e > n || i > t || ((i > e || isNaN(e)) && (e = i), (n < t || isNaN(t)) && (t = n), u >= 0 ? (A = (M.min.z - g.z) * u, z = (M.max.z - g.z) * u) : (A = (M.max.z - g.z) * u, z = (M.min.z - g.z) * u), e > z || A > t) || ((A > e || e !== e) && (e = A), (z < t || t !== t) && (t = z), t < 0) ? null : this.at(e >= 0 ? e : t, D);
  }
  intersectsBox(M) {
    return this.intersectBox(M, ae) !== null;
  }
  intersectTriangle(M, D, e, t, i) {
    JA.subVectors(D, M), ri.subVectors(e, M), Mn.crossVectors(JA, ri);
    let n = this.direction.dot(Mn), A;
    if (n > 0) {
      if (t)
        return null;
      A = 1;
    } else if (n < 0)
      A = -1, n = -n;
    else
      return null;
    Qe.subVectors(this.origin, M);
    const z = A * this.direction.dot(ri.crossVectors(Qe, ri));
    if (z < 0)
      return null;
    const I = A * this.direction.dot(JA.cross(Qe));
    if (I < 0 || z + I > n)
      return null;
    const T = -A * Qe.dot(Mn);
    return T < 0 ? null : this.at(T / n, i);
  }
  applyMatrix4(M) {
    return this.origin.applyMatrix4(M), this.direction.transformDirection(M), this;
  }
  equals(M) {
    return M.origin.equals(this.origin) && M.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class kD {
  constructor(M, D, e, t, i, n, A, z, I, T, u, g, s, a, o, c) {
    kD.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], M !== void 0 && this.set(M, D, e, t, i, n, A, z, I, T, u, g, s, a, o, c);
  }
  set(M, D, e, t, i, n, A, z, I, T, u, g, s, a, o, c) {
    const r = this.elements;
    return r[0] = M, r[4] = D, r[8] = e, r[12] = t, r[1] = i, r[5] = n, r[9] = A, r[13] = z, r[2] = I, r[6] = T, r[10] = u, r[14] = g, r[3] = s, r[7] = a, r[11] = o, r[15] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new kD().fromArray(this.elements);
  }
  copy(M) {
    const D = this.elements, e = M.elements;
    return D[0] = e[0], D[1] = e[1], D[2] = e[2], D[3] = e[3], D[4] = e[4], D[5] = e[5], D[6] = e[6], D[7] = e[7], D[8] = e[8], D[9] = e[9], D[10] = e[10], D[11] = e[11], D[12] = e[12], D[13] = e[13], D[14] = e[14], D[15] = e[15], this;
  }
  copyPosition(M) {
    const D = this.elements, e = M.elements;
    return D[12] = e[12], D[13] = e[13], D[14] = e[14], this;
  }
  setFromMatrix3(M) {
    const D = M.elements;
    return this.set(
      D[0],
      D[3],
      D[6],
      0,
      D[1],
      D[4],
      D[7],
      0,
      D[2],
      D[5],
      D[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(M, D, e) {
    return M.setFromMatrixColumn(this, 0), D.setFromMatrixColumn(this, 1), e.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(M, D, e) {
    return this.set(
      M.x,
      D.x,
      e.x,
      0,
      M.y,
      D.y,
      e.y,
      0,
      M.z,
      D.z,
      e.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(M) {
    const D = this.elements, e = M.elements, t = 1 / Qt.setFromMatrixColumn(M, 0).length(), i = 1 / Qt.setFromMatrixColumn(M, 1).length(), n = 1 / Qt.setFromMatrixColumn(M, 2).length();
    return D[0] = e[0] * t, D[1] = e[1] * t, D[2] = e[2] * t, D[3] = 0, D[4] = e[4] * i, D[5] = e[5] * i, D[6] = e[6] * i, D[7] = 0, D[8] = e[8] * n, D[9] = e[9] * n, D[10] = e[10] * n, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromEuler(M) {
    const D = this.elements, e = M.x, t = M.y, i = M.z, n = Math.cos(e), A = Math.sin(e), z = Math.cos(t), I = Math.sin(t), T = Math.cos(i), u = Math.sin(i);
    if (M.order === "XYZ") {
      const g = n * T, s = n * u, a = A * T, o = A * u;
      D[0] = z * T, D[4] = -z * u, D[8] = I, D[1] = s + a * I, D[5] = g - o * I, D[9] = -A * z, D[2] = o - g * I, D[6] = a + s * I, D[10] = n * z;
    } else if (M.order === "YXZ") {
      const g = z * T, s = z * u, a = I * T, o = I * u;
      D[0] = g + o * A, D[4] = a * A - s, D[8] = n * I, D[1] = n * u, D[5] = n * T, D[9] = -A, D[2] = s * A - a, D[6] = o + g * A, D[10] = n * z;
    } else if (M.order === "ZXY") {
      const g = z * T, s = z * u, a = I * T, o = I * u;
      D[0] = g - o * A, D[4] = -n * u, D[8] = a + s * A, D[1] = s + a * A, D[5] = n * T, D[9] = o - g * A, D[2] = -n * I, D[6] = A, D[10] = n * z;
    } else if (M.order === "ZYX") {
      const g = n * T, s = n * u, a = A * T, o = A * u;
      D[0] = z * T, D[4] = a * I - s, D[8] = g * I + o, D[1] = z * u, D[5] = o * I + g, D[9] = s * I - a, D[2] = -I, D[6] = A * z, D[10] = n * z;
    } else if (M.order === "YZX") {
      const g = n * z, s = n * I, a = A * z, o = A * I;
      D[0] = z * T, D[4] = o - g * u, D[8] = a * u + s, D[1] = u, D[5] = n * T, D[9] = -A * T, D[2] = -I * T, D[6] = s * u + a, D[10] = g - o * u;
    } else if (M.order === "XZY") {
      const g = n * z, s = n * I, a = A * z, o = A * I;
      D[0] = z * T, D[4] = -u, D[8] = I * T, D[1] = g * u + o, D[5] = n * T, D[9] = s * u - a, D[2] = a * u - s, D[6] = A * T, D[10] = o * u + g;
    }
    return D[3] = 0, D[7] = 0, D[11] = 0, D[12] = 0, D[13] = 0, D[14] = 0, D[15] = 1, this;
  }
  makeRotationFromQuaternion(M) {
    return this.compose(Zy, M, _y);
  }
  lookAt(M, D, e) {
    const t = this.elements;
    return QD.subVectors(M, D), QD.lengthSq() === 0 && (QD.z = 1), QD.normalize(), Se.crossVectors(e, QD), Se.lengthSq() === 0 && (Math.abs(e.z) === 1 ? QD.x += 1e-4 : QD.z += 1e-4, QD.normalize(), Se.crossVectors(e, QD)), Se.normalize(), ci.crossVectors(QD, Se), t[0] = Se.x, t[4] = ci.x, t[8] = QD.x, t[1] = Se.y, t[5] = ci.y, t[9] = QD.y, t[2] = Se.z, t[6] = ci.z, t[10] = QD.z, this;
  }
  multiply(M) {
    return this.multiplyMatrices(this, M);
  }
  premultiply(M) {
    return this.multiplyMatrices(M, this);
  }
  multiplyMatrices(M, D) {
    const e = M.elements, t = D.elements, i = this.elements, n = e[0], A = e[4], z = e[8], I = e[12], T = e[1], u = e[5], g = e[9], s = e[13], a = e[2], o = e[6], c = e[10], r = e[14], w = e[3], y = e[7], j = e[11], l = e[15], d = t[0], h = t[4], Z = t[8], L = t[12], x = t[1], R = t[5], B = t[9], H = t[13], p = t[2], k = t[6], V = t[10], F = t[14], $ = t[3], W = t[7], G = t[11], U = t[15];
    return i[0] = n * d + A * x + z * p + I * $, i[4] = n * h + A * R + z * k + I * W, i[8] = n * Z + A * B + z * V + I * G, i[12] = n * L + A * H + z * F + I * U, i[1] = T * d + u * x + g * p + s * $, i[5] = T * h + u * R + g * k + s * W, i[9] = T * Z + u * B + g * V + s * G, i[13] = T * L + u * H + g * F + s * U, i[2] = a * d + o * x + c * p + r * $, i[6] = a * h + o * R + c * k + r * W, i[10] = a * Z + o * B + c * V + r * G, i[14] = a * L + o * H + c * F + r * U, i[3] = w * d + y * x + j * p + l * $, i[7] = w * h + y * R + j * k + l * W, i[11] = w * Z + y * B + j * V + l * G, i[15] = w * L + y * H + j * F + l * U, this;
  }
  multiplyScalar(M) {
    const D = this.elements;
    return D[0] *= M, D[4] *= M, D[8] *= M, D[12] *= M, D[1] *= M, D[5] *= M, D[9] *= M, D[13] *= M, D[2] *= M, D[6] *= M, D[10] *= M, D[14] *= M, D[3] *= M, D[7] *= M, D[11] *= M, D[15] *= M, this;
  }
  determinant() {
    const M = this.elements, D = M[0], e = M[4], t = M[8], i = M[12], n = M[1], A = M[5], z = M[9], I = M[13], T = M[2], u = M[6], g = M[10], s = M[14], a = M[3], o = M[7], c = M[11], r = M[15];
    return a * (+i * z * u - t * I * u - i * A * g + e * I * g + t * A * s - e * z * s) + o * (+D * z * s - D * I * g + i * n * g - t * n * s + t * I * T - i * z * T) + c * (+D * I * u - D * A * s - i * n * u + e * n * s + i * A * T - e * I * T) + r * (-t * A * T - D * z * u + D * A * g + t * n * u - e * n * g + e * z * T);
  }
  transpose() {
    const M = this.elements;
    let D;
    return D = M[1], M[1] = M[4], M[4] = D, D = M[2], M[2] = M[8], M[8] = D, D = M[6], M[6] = M[9], M[9] = D, D = M[3], M[3] = M[12], M[12] = D, D = M[7], M[7] = M[13], M[13] = D, D = M[11], M[11] = M[14], M[14] = D, this;
  }
  setPosition(M, D, e) {
    const t = this.elements;
    return M.isVector3 ? (t[12] = M.x, t[13] = M.y, t[14] = M.z) : (t[12] = M, t[13] = D, t[14] = e), this;
  }
  invert() {
    const M = this.elements, D = M[0], e = M[1], t = M[2], i = M[3], n = M[4], A = M[5], z = M[6], I = M[7], T = M[8], u = M[9], g = M[10], s = M[11], a = M[12], o = M[13], c = M[14], r = M[15], w = u * c * I - o * g * I + o * z * s - A * c * s - u * z * r + A * g * r, y = a * g * I - T * c * I - a * z * s + n * c * s + T * z * r - n * g * r, j = T * o * I - a * u * I + a * A * s - n * o * s - T * A * r + n * u * r, l = a * u * z - T * o * z - a * A * g + n * o * g + T * A * c - n * u * c, d = D * w + e * y + t * j + i * l;
    if (d === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const h = 1 / d;
    return M[0] = w * h, M[1] = (o * g * i - u * c * i - o * t * s + e * c * s + u * t * r - e * g * r) * h, M[2] = (A * c * i - o * z * i + o * t * I - e * c * I - A * t * r + e * z * r) * h, M[3] = (u * z * i - A * g * i - u * t * I + e * g * I + A * t * s - e * z * s) * h, M[4] = y * h, M[5] = (T * c * i - a * g * i + a * t * s - D * c * s - T * t * r + D * g * r) * h, M[6] = (a * z * i - n * c * i - a * t * I + D * c * I + n * t * r - D * z * r) * h, M[7] = (n * g * i - T * z * i + T * t * I - D * g * I - n * t * s + D * z * s) * h, M[8] = j * h, M[9] = (a * u * i - T * o * i - a * e * s + D * o * s + T * e * r - D * u * r) * h, M[10] = (n * o * i - a * A * i + a * e * I - D * o * I - n * e * r + D * A * r) * h, M[11] = (T * A * i - n * u * i - T * e * I + D * u * I + n * e * s - D * A * s) * h, M[12] = l * h, M[13] = (T * o * t - a * u * t + a * e * g - D * o * g - T * e * c + D * u * c) * h, M[14] = (a * A * t - n * o * t - a * e * z + D * o * z + n * e * c - D * A * c) * h, M[15] = (n * u * t - T * A * t + T * e * z - D * u * z - n * e * g + D * A * g) * h, this;
  }
  scale(M) {
    const D = this.elements, e = M.x, t = M.y, i = M.z;
    return D[0] *= e, D[4] *= t, D[8] *= i, D[1] *= e, D[5] *= t, D[9] *= i, D[2] *= e, D[6] *= t, D[10] *= i, D[3] *= e, D[7] *= t, D[11] *= i, this;
  }
  getMaxScaleOnAxis() {
    const M = this.elements, D = M[0] * M[0] + M[1] * M[1] + M[2] * M[2], e = M[4] * M[4] + M[5] * M[5] + M[6] * M[6], t = M[8] * M[8] + M[9] * M[9] + M[10] * M[10];
    return Math.sqrt(Math.max(D, e, t));
  }
  makeTranslation(M, D, e) {
    return M.isVector3 ? this.set(
      1,
      0,
      0,
      M.x,
      0,
      1,
      0,
      M.y,
      0,
      0,
      1,
      M.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      M,
      0,
      1,
      0,
      D,
      0,
      0,
      1,
      e,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(M) {
    const D = Math.cos(M), e = Math.sin(M);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      D,
      -e,
      0,
      0,
      e,
      D,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(M) {
    const D = Math.cos(M), e = Math.sin(M);
    return this.set(
      D,
      0,
      e,
      0,
      0,
      1,
      0,
      0,
      -e,
      0,
      D,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(M) {
    const D = Math.cos(M), e = Math.sin(M);
    return this.set(
      D,
      -e,
      0,
      0,
      e,
      D,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(M, D) {
    const e = Math.cos(D), t = Math.sin(D), i = 1 - e, n = M.x, A = M.y, z = M.z, I = i * n, T = i * A;
    return this.set(
      I * n + e,
      I * A - t * z,
      I * z + t * A,
      0,
      I * A + t * z,
      T * A + e,
      T * z - t * n,
      0,
      I * z - t * A,
      T * z + t * n,
      i * z * z + e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(M, D, e) {
    return this.set(
      M,
      0,
      0,
      0,
      0,
      D,
      0,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(M, D, e, t, i, n) {
    return this.set(
      1,
      e,
      i,
      0,
      M,
      1,
      n,
      0,
      D,
      t,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(M, D, e) {
    const t = this.elements, i = D._x, n = D._y, A = D._z, z = D._w, I = i + i, T = n + n, u = A + A, g = i * I, s = i * T, a = i * u, o = n * T, c = n * u, r = A * u, w = z * I, y = z * T, j = z * u, l = e.x, d = e.y, h = e.z;
    return t[0] = (1 - (o + r)) * l, t[1] = (s + j) * l, t[2] = (a - y) * l, t[3] = 0, t[4] = (s - j) * d, t[5] = (1 - (g + r)) * d, t[6] = (c + w) * d, t[7] = 0, t[8] = (a + y) * h, t[9] = (c - w) * h, t[10] = (1 - (g + o)) * h, t[11] = 0, t[12] = M.x, t[13] = M.y, t[14] = M.z, t[15] = 1, this;
  }
  decompose(M, D, e) {
    const t = this.elements;
    let i = Qt.set(t[0], t[1], t[2]).length();
    const n = Qt.set(t[4], t[5], t[6]).length(), A = Qt.set(t[8], t[9], t[10]).length();
    this.determinant() < 0 && (i = -i), M.x = t[12], M.y = t[13], M.z = t[14], HD.copy(this);
    const I = 1 / i, T = 1 / n, u = 1 / A;
    return HD.elements[0] *= I, HD.elements[1] *= I, HD.elements[2] *= I, HD.elements[4] *= T, HD.elements[5] *= T, HD.elements[6] *= T, HD.elements[8] *= u, HD.elements[9] *= u, HD.elements[10] *= u, D.setFromRotationMatrix(HD), e.x = i, e.y = n, e.z = A, this;
  }
  makePerspective(M, D, e, t, i, n, A = Ii) {
    const z = this.elements, I = 2 * i / (D - M), T = 2 * i / (e - t), u = (D + M) / (D - M), g = (e + t) / (e - t);
    let s, a;
    if (A === Ii)
      s = -(n + i) / (n - i), a = -2 * n * i / (n - i);
    else if (A === YI)
      s = -n / (n - i), a = -n * i / (n - i);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + A);
    return z[0] = I, z[4] = 0, z[8] = u, z[12] = 0, z[1] = 0, z[5] = T, z[9] = g, z[13] = 0, z[2] = 0, z[6] = 0, z[10] = s, z[14] = a, z[3] = 0, z[7] = 0, z[11] = -1, z[15] = 0, this;
  }
  makeOrthographic(M, D, e, t, i, n, A = Ii) {
    const z = this.elements, I = 1 / (D - M), T = 1 / (e - t), u = 1 / (n - i), g = (D + M) * I, s = (e + t) * T;
    let a, o;
    if (A === Ii)
      a = (n + i) * u, o = -2 * u;
    else if (A === YI)
      a = i * u, o = -1 * u;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + A);
    return z[0] = 2 * I, z[4] = 0, z[8] = 0, z[12] = -g, z[1] = 0, z[5] = 2 * T, z[9] = 0, z[13] = -s, z[2] = 0, z[6] = 0, z[10] = o, z[14] = -a, z[3] = 0, z[7] = 0, z[11] = 0, z[15] = 1, this;
  }
  equals(M) {
    const D = this.elements, e = M.elements;
    for (let t = 0; t < 16; t++)
      if (D[t] !== e[t])
        return !1;
    return !0;
  }
  fromArray(M, D = 0) {
    for (let e = 0; e < 16; e++)
      this.elements[e] = M[e + D];
    return this;
  }
  toArray(M = [], D = 0) {
    const e = this.elements;
    return M[D] = e[0], M[D + 1] = e[1], M[D + 2] = e[2], M[D + 3] = e[3], M[D + 4] = e[4], M[D + 5] = e[5], M[D + 6] = e[6], M[D + 7] = e[7], M[D + 8] = e[8], M[D + 9] = e[9], M[D + 10] = e[10], M[D + 11] = e[11], M[D + 12] = e[12], M[D + 13] = e[13], M[D + 14] = e[14], M[D + 15] = e[15], M;
  }
}
const Qt = /* @__PURE__ */ new P(), HD = /* @__PURE__ */ new kD(), Zy = /* @__PURE__ */ new P(0, 0, 0), _y = /* @__PURE__ */ new P(1, 1, 1), Se = /* @__PURE__ */ new P(), ci = /* @__PURE__ */ new P(), QD = /* @__PURE__ */ new P(), kI = /* @__PURE__ */ new kD(), ZI = /* @__PURE__ */ new SN();
class tA {
  constructor(M = 0, D = 0, e = 0, t = tA.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = M, this._y = D, this._z = e, this._order = t;
  }
  get x() {
    return this._x;
  }
  set x(M) {
    this._x = M, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(M) {
    this._y = M, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(M) {
    this._z = M, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(M) {
    this._order = M, this._onChangeCallback();
  }
  set(M, D, e, t = this._order) {
    return this._x = M, this._y = D, this._z = e, this._order = t, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(M) {
    return this._x = M._x, this._y = M._y, this._z = M._z, this._order = M._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(M, D = this._order, e = !0) {
    const t = M.elements, i = t[0], n = t[4], A = t[8], z = t[1], I = t[5], T = t[9], u = t[2], g = t[6], s = t[10];
    switch (D) {
      case "XYZ":
        this._y = Math.asin(vD(A, -1, 1)), Math.abs(A) < 0.9999999 ? (this._x = Math.atan2(-T, s), this._z = Math.atan2(-n, i)) : (this._x = Math.atan2(g, I), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-vD(T, -1, 1)), Math.abs(T) < 0.9999999 ? (this._y = Math.atan2(A, s), this._z = Math.atan2(z, I)) : (this._y = Math.atan2(-u, i), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(vD(g, -1, 1)), Math.abs(g) < 0.9999999 ? (this._y = Math.atan2(-u, s), this._z = Math.atan2(-n, I)) : (this._y = 0, this._z = Math.atan2(z, i));
        break;
      case "ZYX":
        this._y = Math.asin(-vD(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(g, s), this._z = Math.atan2(z, i)) : (this._x = 0, this._z = Math.atan2(-n, I));
        break;
      case "YZX":
        this._z = Math.asin(vD(z, -1, 1)), Math.abs(z) < 0.9999999 ? (this._x = Math.atan2(-T, I), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(A, s));
        break;
      case "XZY":
        this._z = Math.asin(-vD(n, -1, 1)), Math.abs(n) < 0.9999999 ? (this._x = Math.atan2(g, I), this._y = Math.atan2(A, i)) : (this._x = Math.atan2(-T, s), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + D);
    }
    return this._order = D, e === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(M, D, e) {
    return kI.makeRotationFromQuaternion(M), this.setFromRotationMatrix(kI, D, e);
  }
  setFromVector3(M, D = this._order) {
    return this.set(M.x, M.y, M.z, D);
  }
  reorder(M) {
    return ZI.setFromEuler(this), this.setFromQuaternion(ZI, M);
  }
  equals(M) {
    return M._x === this._x && M._y === this._y && M._z === this._z && M._order === this._order;
  }
  fromArray(M) {
    return this._x = M[0], this._y = M[1], this._z = M[2], M[3] !== void 0 && (this._order = M[3]), this._onChangeCallback(), this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this._x, M[D + 1] = this._y, M[D + 2] = this._z, M[D + 3] = this._order, M;
  }
  _onChange(M) {
    return this._onChangeCallback = M, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
tA.DEFAULT_ORDER = "XYZ";
class by {
  constructor() {
    this.mask = 1;
  }
  set(M) {
    this.mask = (1 << M | 0) >>> 0;
  }
  enable(M) {
    this.mask |= 1 << M | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(M) {
    this.mask ^= 1 << M | 0;
  }
  disable(M) {
    this.mask &= ~(1 << M | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(M) {
    return (this.mask & M.mask) !== 0;
  }
  isEnabled(M) {
    return (this.mask & (1 << M | 0)) !== 0;
  }
}
let Ky = 0;
const _I = /* @__PURE__ */ new P(), St = /* @__PURE__ */ new SN(), oe = /* @__PURE__ */ new kD(), ai = /* @__PURE__ */ new P(), aN = /* @__PURE__ */ new P(), Ry = /* @__PURE__ */ new P(), Py = /* @__PURE__ */ new SN(), bI = /* @__PURE__ */ new P(1, 0, 0), KI = /* @__PURE__ */ new P(0, 1, 0), RI = /* @__PURE__ */ new P(0, 0, 1), Fy = { type: "added" }, By = { type: "removed" };
class FD extends DA {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Ky++ }), this.uuid = QN(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = FD.DEFAULT_UP.clone();
    const M = new P(), D = new tA(), e = new SN(), t = new P(1, 1, 1);
    function i() {
      e.setFromEuler(D, !1);
    }
    function n() {
      D.setFromQuaternion(e, void 0, !1);
    }
    D._onChange(i), e._onChange(n), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: M
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: D
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      modelViewMatrix: {
        value: new kD()
      },
      normalMatrix: {
        value: new Be()
      }
    }), this.matrix = new kD(), this.matrixWorld = new kD(), this.matrixAutoUpdate = FD.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.matrixWorldAutoUpdate = FD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.layers = new by(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(M) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(M), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(M) {
    return this.quaternion.premultiply(M), this;
  }
  setRotationFromAxisAngle(M, D) {
    this.quaternion.setFromAxisAngle(M, D);
  }
  setRotationFromEuler(M) {
    this.quaternion.setFromEuler(M, !0);
  }
  setRotationFromMatrix(M) {
    this.quaternion.setFromRotationMatrix(M);
  }
  setRotationFromQuaternion(M) {
    this.quaternion.copy(M);
  }
  rotateOnAxis(M, D) {
    return St.setFromAxisAngle(M, D), this.quaternion.multiply(St), this;
  }
  rotateOnWorldAxis(M, D) {
    return St.setFromAxisAngle(M, D), this.quaternion.premultiply(St), this;
  }
  rotateX(M) {
    return this.rotateOnAxis(bI, M);
  }
  rotateY(M) {
    return this.rotateOnAxis(KI, M);
  }
  rotateZ(M) {
    return this.rotateOnAxis(RI, M);
  }
  translateOnAxis(M, D) {
    return _I.copy(M).applyQuaternion(this.quaternion), this.position.add(_I.multiplyScalar(D)), this;
  }
  translateX(M) {
    return this.translateOnAxis(bI, M);
  }
  translateY(M) {
    return this.translateOnAxis(KI, M);
  }
  translateZ(M) {
    return this.translateOnAxis(RI, M);
  }
  localToWorld(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(M) {
    return this.updateWorldMatrix(!0, !1), M.applyMatrix4(oe.copy(this.matrixWorld).invert());
  }
  lookAt(M, D, e) {
    M.isVector3 ? ai.copy(M) : ai.set(M, D, e);
    const t = this.parent;
    this.updateWorldMatrix(!0, !1), aN.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? oe.lookAt(aN, ai, this.up) : oe.lookAt(ai, aN, this.up), this.quaternion.setFromRotationMatrix(oe), t && (oe.extractRotation(t.matrixWorld), St.setFromRotationMatrix(oe), this.quaternion.premultiply(St.invert()));
  }
  add(M) {
    if (arguments.length > 1) {
      for (let D = 0; D < arguments.length; D++)
        this.add(arguments[D]);
      return this;
    }
    return M === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", M), this) : (M && M.isObject3D ? (M.parent !== null && M.parent.remove(M), M.parent = this, this.children.push(M), M.dispatchEvent(Fy)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", M), this);
  }
  remove(M) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++)
        this.remove(arguments[e]);
      return this;
    }
    const D = this.children.indexOf(M);
    return D !== -1 && (M.parent = null, this.children.splice(D, 1), M.dispatchEvent(By)), this;
  }
  removeFromParent() {
    const M = this.parent;
    return M !== null && M.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(M) {
    return this.updateWorldMatrix(!0, !1), oe.copy(this.matrixWorld).invert(), M.parent !== null && (M.parent.updateWorldMatrix(!0, !1), oe.multiply(M.parent.matrixWorld)), M.applyMatrix4(oe), this.add(M), M.updateWorldMatrix(!1, !0), this;
  }
  getObjectById(M) {
    return this.getObjectByProperty("id", M);
  }
  getObjectByName(M) {
    return this.getObjectByProperty("name", M);
  }
  getObjectByProperty(M, D) {
    if (this[M] === D)
      return this;
    for (let e = 0, t = this.children.length; e < t; e++) {
      const n = this.children[e].getObjectByProperty(M, D);
      if (n !== void 0)
        return n;
    }
  }
  getObjectsByProperty(M, D) {
    let e = [];
    this[M] === D && e.push(this);
    for (let t = 0, i = this.children.length; t < i; t++) {
      const n = this.children[t].getObjectsByProperty(M, D);
      n.length > 0 && (e = e.concat(n));
    }
    return e;
  }
  getWorldPosition(M) {
    return this.updateWorldMatrix(!0, !1), M.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(aN, M, Ry), M;
  }
  getWorldScale(M) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(aN, Py, M), M;
  }
  getWorldDirection(M) {
    this.updateWorldMatrix(!0, !1);
    const D = this.matrixWorld.elements;
    return M.set(D[8], D[9], D[10]).normalize();
  }
  raycast() {
  }
  traverse(M) {
    M(this);
    const D = this.children;
    for (let e = 0, t = D.length; e < t; e++)
      D[e].traverse(M);
  }
  traverseVisible(M) {
    if (this.visible === !1)
      return;
    M(this);
    const D = this.children;
    for (let e = 0, t = D.length; e < t; e++)
      D[e].traverseVisible(M);
  }
  traverseAncestors(M) {
    const D = this.parent;
    D !== null && (M(D), D.traverseAncestors(M));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(M) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || M) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, M = !0);
    const D = this.children;
    for (let e = 0, t = D.length; e < t; e++) {
      const i = D[e];
      (i.matrixWorldAutoUpdate === !0 || M === !0) && i.updateMatrixWorld(M);
    }
  }
  updateWorldMatrix(M, D) {
    const e = this.parent;
    if (M === !0 && e !== null && e.matrixWorldAutoUpdate === !0 && e.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), D === !0) {
      const t = this.children;
      for (let i = 0, n = t.length; i < n; i++) {
        const A = t[i];
        A.matrixWorldAutoUpdate === !0 && A.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string", e = {};
    D && (M = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, e.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const t = {};
    t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), this.castShadow === !0 && (t.castShadow = !0), this.receiveShadow === !0 && (t.receiveShadow = !0), this.visible === !1 && (t.visible = !1), this.frustumCulled === !1 && (t.frustumCulled = !1), this.renderOrder !== 0 && (t.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (t.userData = this.userData), t.layers = this.layers.mask, t.matrix = this.matrix.toArray(), t.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (t.matrixAutoUpdate = !1), this.isInstancedMesh && (t.type = "InstancedMesh", t.count = this.count, t.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (t.instanceColor = this.instanceColor.toJSON()));
    function i(A, z) {
      return A[z.uuid] === void 0 && (A[z.uuid] = z.toJSON(M)), z.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? t.background = this.background.toJSON() : this.background.isTexture && (t.background = this.background.toJSON(M).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (t.environment = this.environment.toJSON(M).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      t.geometry = i(M.geometries, this.geometry);
      const A = this.geometry.parameters;
      if (A !== void 0 && A.shapes !== void 0) {
        const z = A.shapes;
        if (Array.isArray(z))
          for (let I = 0, T = z.length; I < T; I++) {
            const u = z[I];
            i(M.shapes, u);
          }
        else
          i(M.shapes, z);
      }
    }
    if (this.isSkinnedMesh && (t.bindMode = this.bindMode, t.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(M.skeletons, this.skeleton), t.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const A = [];
        for (let z = 0, I = this.material.length; z < I; z++)
          A.push(i(M.materials, this.material[z]));
        t.material = A;
      } else
        t.material = i(M.materials, this.material);
    if (this.children.length > 0) {
      t.children = [];
      for (let A = 0; A < this.children.length; A++)
        t.children.push(this.children[A].toJSON(M).object);
    }
    if (this.animations.length > 0) {
      t.animations = [];
      for (let A = 0; A < this.animations.length; A++) {
        const z = this.animations[A];
        t.animations.push(i(M.animations, z));
      }
    }
    if (D) {
      const A = n(M.geometries), z = n(M.materials), I = n(M.textures), T = n(M.images), u = n(M.shapes), g = n(M.skeletons), s = n(M.animations), a = n(M.nodes);
      A.length > 0 && (e.geometries = A), z.length > 0 && (e.materials = z), I.length > 0 && (e.textures = I), T.length > 0 && (e.images = T), u.length > 0 && (e.shapes = u), g.length > 0 && (e.skeletons = g), s.length > 0 && (e.animations = s), a.length > 0 && (e.nodes = a);
    }
    return e.object = t, e;
    function n(A) {
      const z = [];
      for (const I in A) {
        const T = A[I];
        delete T.metadata, z.push(T);
      }
      return z;
    }
  }
  clone(M) {
    return new this.constructor().copy(this, M);
  }
  copy(M, D = !0) {
    if (this.name = M.name, this.up.copy(M.up), this.position.copy(M.position), this.rotation.order = M.rotation.order, this.quaternion.copy(M.quaternion), this.scale.copy(M.scale), this.matrix.copy(M.matrix), this.matrixWorld.copy(M.matrixWorld), this.matrixAutoUpdate = M.matrixAutoUpdate, this.matrixWorldNeedsUpdate = M.matrixWorldNeedsUpdate, this.matrixWorldAutoUpdate = M.matrixWorldAutoUpdate, this.layers.mask = M.layers.mask, this.visible = M.visible, this.castShadow = M.castShadow, this.receiveShadow = M.receiveShadow, this.frustumCulled = M.frustumCulled, this.renderOrder = M.renderOrder, this.animations = M.animations.slice(), this.userData = JSON.parse(JSON.stringify(M.userData)), D === !0)
      for (let e = 0; e < M.children.length; e++) {
        const t = M.children[e];
        this.add(t.clone());
      }
    return this;
  }
}
FD.DEFAULT_UP = /* @__PURE__ */ new P(0, 1, 0);
FD.DEFAULT_MATRIX_AUTO_UPDATE = !0;
FD.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const WD = /* @__PURE__ */ new P(), ye = /* @__PURE__ */ new P(), Dn = /* @__PURE__ */ new P(), je = /* @__PURE__ */ new P(), kt = /* @__PURE__ */ new P(), Zt = /* @__PURE__ */ new P(), PI = /* @__PURE__ */ new P(), en = /* @__PURE__ */ new P(), tn = /* @__PURE__ */ new P(), Nn = /* @__PURE__ */ new P();
let oi = !1;
class qD {
  constructor(M = new P(), D = new P(), e = new P()) {
    this.a = M, this.b = D, this.c = e;
  }
  static getNormal(M, D, e, t) {
    t.subVectors(e, D), WD.subVectors(M, D), t.cross(WD);
    const i = t.lengthSq();
    return i > 0 ? t.multiplyScalar(1 / Math.sqrt(i)) : t.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(M, D, e, t, i) {
    WD.subVectors(t, D), ye.subVectors(e, D), Dn.subVectors(M, D);
    const n = WD.dot(WD), A = WD.dot(ye), z = WD.dot(Dn), I = ye.dot(ye), T = ye.dot(Dn), u = n * I - A * A;
    if (u === 0)
      return i.set(-2, -1, -1);
    const g = 1 / u, s = (I * z - A * T) * g, a = (n * T - A * z) * g;
    return i.set(1 - s - a, a, s);
  }
  static containsPoint(M, D, e, t) {
    return this.getBarycoord(M, D, e, t, je), je.x >= 0 && je.y >= 0 && je.x + je.y <= 1;
  }
  static getUV(M, D, e, t, i, n, A, z) {
    return oi === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), oi = !0), this.getInterpolation(M, D, e, t, i, n, A, z);
  }
  static getInterpolation(M, D, e, t, i, n, A, z) {
    return this.getBarycoord(M, D, e, t, je), z.setScalar(0), z.addScaledVector(i, je.x), z.addScaledVector(n, je.y), z.addScaledVector(A, je.z), z;
  }
  static isFrontFacing(M, D, e, t) {
    return WD.subVectors(e, D), ye.subVectors(M, D), WD.cross(ye).dot(t) < 0;
  }
  set(M, D, e) {
    return this.a.copy(M), this.b.copy(D), this.c.copy(e), this;
  }
  setFromPointsAndIndices(M, D, e, t) {
    return this.a.copy(M[D]), this.b.copy(M[e]), this.c.copy(M[t]), this;
  }
  setFromAttributeAndIndices(M, D, e, t) {
    return this.a.fromBufferAttribute(M, D), this.b.fromBufferAttribute(M, e), this.c.fromBufferAttribute(M, t), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.a.copy(M.a), this.b.copy(M.b), this.c.copy(M.c), this;
  }
  getArea() {
    return WD.subVectors(this.c, this.b), ye.subVectors(this.a, this.b), WD.cross(ye).length() * 0.5;
  }
  getMidpoint(M) {
    return M.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(M) {
    return qD.getNormal(this.a, this.b, this.c, M);
  }
  getPlane(M) {
    return M.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(M, D) {
    return qD.getBarycoord(M, this.a, this.b, this.c, D);
  }
  getUV(M, D, e, t, i) {
    return oi === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), oi = !0), qD.getInterpolation(M, this.a, this.b, this.c, D, e, t, i);
  }
  getInterpolation(M, D, e, t, i) {
    return qD.getInterpolation(M, this.a, this.b, this.c, D, e, t, i);
  }
  containsPoint(M) {
    return qD.containsPoint(M, this.a, this.b, this.c);
  }
  isFrontFacing(M) {
    return qD.isFrontFacing(this.a, this.b, this.c, M);
  }
  intersectsBox(M) {
    return M.intersectsTriangle(this);
  }
  closestPointToPoint(M, D) {
    const e = this.a, t = this.b, i = this.c;
    let n, A;
    kt.subVectors(t, e), Zt.subVectors(i, e), en.subVectors(M, e);
    const z = kt.dot(en), I = Zt.dot(en);
    if (z <= 0 && I <= 0)
      return D.copy(e);
    tn.subVectors(M, t);
    const T = kt.dot(tn), u = Zt.dot(tn);
    if (T >= 0 && u <= T)
      return D.copy(t);
    const g = z * u - T * I;
    if (g <= 0 && z >= 0 && T <= 0)
      return n = z / (z - T), D.copy(e).addScaledVector(kt, n);
    Nn.subVectors(M, i);
    const s = kt.dot(Nn), a = Zt.dot(Nn);
    if (a >= 0 && s <= a)
      return D.copy(i);
    const o = s * I - z * a;
    if (o <= 0 && I >= 0 && a <= 0)
      return A = I / (I - a), D.copy(e).addScaledVector(Zt, A);
    const c = T * a - s * u;
    if (c <= 0 && u - T >= 0 && s - a >= 0)
      return PI.subVectors(i, t), A = (u - T) / (u - T + (s - a)), D.copy(t).addScaledVector(PI, A);
    const r = 1 / (c + o + g);
    return n = o * r, A = g * r, D.copy(e).addScaledVector(kt, n).addScaledVector(Zt, A);
  }
  equals(M) {
    return M.a.equals(this.a) && M.b.equals(this.b) && M.c.equals(this.c);
  }
}
let Vy = 0;
class MN extends DA {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Vy++ }), this.uuid = QN(), this.name = "", this.type = "Material", this.blending = xI, this.side = hn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = yy, this.blendDst = jy, this.blendEquation = oy, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = Cy, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = vy, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = PA, this.stencilZFail = PA, this.stencilZPass = PA, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(M) {
    this._alphaTest > 0 != M > 0 && this.version++, this._alphaTest = M;
  }
  onBuild() {
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(M) {
    if (M !== void 0)
      for (const D in M) {
        const e = M[D];
        if (e === void 0) {
          console.warn(`THREE.Material: parameter '${D}' has value of undefined.`);
          continue;
        }
        const t = this[D];
        if (t === void 0) {
          console.warn(`THREE.Material: '${D}' is not a property of THREE.${this.type}.`);
          continue;
        }
        t && t.isColor ? t.set(e) : t && t.isVector3 && e && e.isVector3 ? t.copy(e) : this[D] = e;
      }
  }
  toJSON(M) {
    const D = M === void 0 || typeof M == "string";
    D && (M = {
      textures: {},
      images: {}
    });
    const e = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), this.color && this.color.isColor && (e.color = this.color.getHex()), this.roughness !== void 0 && (e.roughness = this.roughness), this.metalness !== void 0 && (e.metalness = this.metalness), this.sheen !== void 0 && (e.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (e.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (e.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (e.emissive = this.emissive.getHex()), this.emissiveIntensity && this.emissiveIntensity !== 1 && (e.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (e.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (e.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (e.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (e.shininess = this.shininess), this.clearcoat !== void 0 && (e.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (e.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (e.clearcoatMap = this.clearcoatMap.toJSON(M).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (e.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(M).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (e.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(M).uuid, e.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (e.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (e.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (e.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (e.iridescenceMap = this.iridescenceMap.toJSON(M).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (e.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(M).uuid), this.anisotropy !== void 0 && (e.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (e.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (e.anisotropyMap = this.anisotropyMap.toJSON(M).uuid), this.map && this.map.isTexture && (e.map = this.map.toJSON(M).uuid), this.matcap && this.matcap.isTexture && (e.matcap = this.matcap.toJSON(M).uuid), this.alphaMap && this.alphaMap.isTexture && (e.alphaMap = this.alphaMap.toJSON(M).uuid), this.lightMap && this.lightMap.isTexture && (e.lightMap = this.lightMap.toJSON(M).uuid, e.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (e.aoMap = this.aoMap.toJSON(M).uuid, e.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (e.bumpMap = this.bumpMap.toJSON(M).uuid, e.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (e.normalMap = this.normalMap.toJSON(M).uuid, e.normalMapType = this.normalMapType, e.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (e.displacementMap = this.displacementMap.toJSON(M).uuid, e.displacementScale = this.displacementScale, e.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (e.roughnessMap = this.roughnessMap.toJSON(M).uuid), this.metalnessMap && this.metalnessMap.isTexture && (e.metalnessMap = this.metalnessMap.toJSON(M).uuid), this.emissiveMap && this.emissiveMap.isTexture && (e.emissiveMap = this.emissiveMap.toJSON(M).uuid), this.specularMap && this.specularMap.isTexture && (e.specularMap = this.specularMap.toJSON(M).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (e.specularIntensityMap = this.specularIntensityMap.toJSON(M).uuid), this.specularColorMap && this.specularColorMap.isTexture && (e.specularColorMap = this.specularColorMap.toJSON(M).uuid), this.envMap && this.envMap.isTexture && (e.envMap = this.envMap.toJSON(M).uuid, this.combine !== void 0 && (e.combine = this.combine)), this.envMapIntensity !== void 0 && (e.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (e.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (e.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (e.gradientMap = this.gradientMap.toJSON(M).uuid), this.transmission !== void 0 && (e.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (e.transmissionMap = this.transmissionMap.toJSON(M).uuid), this.thickness !== void 0 && (e.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (e.thicknessMap = this.thicknessMap.toJSON(M).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (e.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (e.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (e.size = this.size), this.shadowSide !== null && (e.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (e.sizeAttenuation = this.sizeAttenuation), this.blending !== xI && (e.blending = this.blending), this.side !== hn && (e.side = this.side), this.vertexColors === !0 && (e.vertexColors = !0), this.opacity < 1 && (e.opacity = this.opacity), this.transparent === !0 && (e.transparent = !0), e.depthFunc = this.depthFunc, e.depthTest = this.depthTest, e.depthWrite = this.depthWrite, e.colorWrite = this.colorWrite, e.stencilWrite = this.stencilWrite, e.stencilWriteMask = this.stencilWriteMask, e.stencilFunc = this.stencilFunc, e.stencilRef = this.stencilRef, e.stencilFuncMask = this.stencilFuncMask, e.stencilFail = this.stencilFail, e.stencilZFail = this.stencilZFail, e.stencilZPass = this.stencilZPass, this.rotation !== void 0 && this.rotation !== 0 && (e.rotation = this.rotation), this.polygonOffset === !0 && (e.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (e.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (e.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (e.linewidth = this.linewidth), this.dashSize !== void 0 && (e.dashSize = this.dashSize), this.gapSize !== void 0 && (e.gapSize = this.gapSize), this.scale !== void 0 && (e.scale = this.scale), this.dithering === !0 && (e.dithering = !0), this.alphaTest > 0 && (e.alphaTest = this.alphaTest), this.alphaHash === !0 && (e.alphaHash = !0), this.alphaToCoverage === !0 && (e.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (e.premultipliedAlpha = !0), this.forceSinglePass === !0 && (e.forceSinglePass = !0), this.wireframe === !0 && (e.wireframe = !0), this.wireframeLinewidth > 1 && (e.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (e.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (e.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (e.flatShading = !0), this.visible === !1 && (e.visible = !1), this.toneMapped === !1 && (e.toneMapped = !1), this.fog === !1 && (e.fog = !1), Object.keys(this.userData).length > 0 && (e.userData = this.userData);
    function t(i) {
      const n = [];
      for (const A in i) {
        const z = i[A];
        delete z.metadata, n.push(z);
      }
      return n;
    }
    if (D) {
      const i = t(M.textures), n = t(M.images);
      i.length > 0 && (e.textures = i), n.length > 0 && (e.images = n);
    }
    return e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    this.name = M.name, this.blending = M.blending, this.side = M.side, this.vertexColors = M.vertexColors, this.opacity = M.opacity, this.transparent = M.transparent, this.blendSrc = M.blendSrc, this.blendDst = M.blendDst, this.blendEquation = M.blendEquation, this.blendSrcAlpha = M.blendSrcAlpha, this.blendDstAlpha = M.blendDstAlpha, this.blendEquationAlpha = M.blendEquationAlpha, this.depthFunc = M.depthFunc, this.depthTest = M.depthTest, this.depthWrite = M.depthWrite, this.stencilWriteMask = M.stencilWriteMask, this.stencilFunc = M.stencilFunc, this.stencilRef = M.stencilRef, this.stencilFuncMask = M.stencilFuncMask, this.stencilFail = M.stencilFail, this.stencilZFail = M.stencilZFail, this.stencilZPass = M.stencilZPass, this.stencilWrite = M.stencilWrite;
    const D = M.clippingPlanes;
    let e = null;
    if (D !== null) {
      const t = D.length;
      e = new Array(t);
      for (let i = 0; i !== t; ++i)
        e[i] = D[i].clone();
    }
    return this.clippingPlanes = e, this.clipIntersection = M.clipIntersection, this.clipShadows = M.clipShadows, this.shadowSide = M.shadowSide, this.colorWrite = M.colorWrite, this.precision = M.precision, this.polygonOffset = M.polygonOffset, this.polygonOffsetFactor = M.polygonOffsetFactor, this.polygonOffsetUnits = M.polygonOffsetUnits, this.dithering = M.dithering, this.alphaTest = M.alphaTest, this.alphaHash = M.alphaHash, this.alphaToCoverage = M.alphaToCoverage, this.premultipliedAlpha = M.premultipliedAlpha, this.forceSinglePass = M.forceSinglePass, this.visible = M.visible, this.toneMapped = M.toneMapped, this.userData = JSON.parse(JSON.stringify(M.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
}
const su = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, ke = { h: 0, s: 0, l: 0 }, yi = { h: 0, s: 0, l: 0 };
function An(N, M, D) {
  return D < 0 && (D += 1), D > 1 && (D -= 1), D < 1 / 6 ? N + (M - N) * 6 * D : D < 1 / 2 ? M : D < 2 / 3 ? N + (M - N) * 6 * (2 / 3 - D) : N;
}
class le {
  constructor(M, D, e) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(M, D, e);
  }
  set(M, D, e) {
    if (D === void 0 && e === void 0) {
      const t = M;
      t && t.isColor ? this.copy(t) : typeof t == "number" ? this.setHex(t) : typeof t == "string" && this.setStyle(t);
    } else
      this.setRGB(M, D, e);
    return this;
  }
  setScalar(M) {
    return this.r = M, this.g = M, this.b = M, this;
  }
  setHex(M, D = XD) {
    return M = Math.floor(M), this.r = (M >> 16 & 255) / 255, this.g = (M >> 8 & 255) / 255, this.b = (M & 255) / 255, GD.toWorkingColorSpace(this, D), this;
  }
  setRGB(M, D, e, t = GD.workingColorSpace) {
    return this.r = M, this.g = D, this.b = e, GD.toWorkingColorSpace(this, t), this;
  }
  setHSL(M, D, e, t = GD.workingColorSpace) {
    if (M = py(M, 1), D = vD(D, 0, 1), e = vD(e, 0, 1), D === 0)
      this.r = this.g = this.b = e;
    else {
      const i = e <= 0.5 ? e * (1 + D) : e + D - e * D, n = 2 * e - i;
      this.r = An(n, i, M + 1 / 3), this.g = An(n, i, M), this.b = An(n, i, M - 1 / 3);
    }
    return GD.toWorkingColorSpace(this, t), this;
  }
  setStyle(M, D = XD) {
    function e(i) {
      i !== void 0 && parseFloat(i) < 1 && console.warn("THREE.Color: Alpha component of " + M + " will be ignored.");
    }
    let t;
    if (t = /^(\w+)\(([^\)]*)\)/.exec(M)) {
      let i;
      const n = t[1], A = t[2];
      switch (n) {
        case "rgb":
        case "rgba":
          if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return e(i[4]), this.setRGB(
              Math.min(255, parseInt(i[1], 10)) / 255,
              Math.min(255, parseInt(i[2], 10)) / 255,
              Math.min(255, parseInt(i[3], 10)) / 255,
              D
            );
          if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return e(i[4]), this.setRGB(
              Math.min(100, parseInt(i[1], 10)) / 100,
              Math.min(100, parseInt(i[2], 10)) / 100,
              Math.min(100, parseInt(i[3], 10)) / 100,
              D
            );
          break;
        case "hsl":
        case "hsla":
          if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(A))
            return e(i[4]), this.setHSL(
              parseFloat(i[1]) / 360,
              parseFloat(i[2]) / 100,
              parseFloat(i[3]) / 100,
              D
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + M);
      }
    } else if (t = /^\#([A-Fa-f\d]+)$/.exec(M)) {
      const i = t[1], n = i.length;
      if (n === 3)
        return this.setRGB(
          parseInt(i.charAt(0), 16) / 15,
          parseInt(i.charAt(1), 16) / 15,
          parseInt(i.charAt(2), 16) / 15,
          D
        );
      if (n === 6)
        return this.setHex(parseInt(i, 16), D);
      console.warn("THREE.Color: Invalid hex color " + M);
    } else if (M && M.length > 0)
      return this.setColorName(M, D);
    return this;
  }
  setColorName(M, D = XD) {
    const e = su[M.toLowerCase()];
    return e !== void 0 ? this.setHex(e, D) : console.warn("THREE.Color: Unknown color " + M), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(M) {
    return this.r = M.r, this.g = M.g, this.b = M.b, this;
  }
  copySRGBToLinear(M) {
    return this.r = Ht(M.r), this.g = Ht(M.g), this.b = Ht(M.b), this;
  }
  copyLinearToSRGB(M) {
    return this.r = GA(M.r), this.g = GA(M.g), this.b = GA(M.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(M = XD) {
    return GD.fromWorkingColorSpace(cD.copy(this), M), Math.round(vD(cD.r * 255, 0, 255)) * 65536 + Math.round(vD(cD.g * 255, 0, 255)) * 256 + Math.round(vD(cD.b * 255, 0, 255));
  }
  getHexString(M = XD) {
    return ("000000" + this.getHex(M).toString(16)).slice(-6);
  }
  getHSL(M, D = GD.workingColorSpace) {
    GD.fromWorkingColorSpace(cD.copy(this), D);
    const e = cD.r, t = cD.g, i = cD.b, n = Math.max(e, t, i), A = Math.min(e, t, i);
    let z, I;
    const T = (A + n) / 2;
    if (A === n)
      z = 0, I = 0;
    else {
      const u = n - A;
      switch (I = T <= 0.5 ? u / (n + A) : u / (2 - n - A), n) {
        case e:
          z = (t - i) / u + (t < i ? 6 : 0);
          break;
        case t:
          z = (i - e) / u + 2;
          break;
        case i:
          z = (e - t) / u + 4;
          break;
      }
      z /= 6;
    }
    return M.h = z, M.s = I, M.l = T, M;
  }
  getRGB(M, D = GD.workingColorSpace) {
    return GD.fromWorkingColorSpace(cD.copy(this), D), M.r = cD.r, M.g = cD.g, M.b = cD.b, M;
  }
  getStyle(M = XD) {
    GD.fromWorkingColorSpace(cD.copy(this), M);
    const D = cD.r, e = cD.g, t = cD.b;
    return M !== XD ? `color(${M} ${D.toFixed(3)} ${e.toFixed(3)} ${t.toFixed(3)})` : `rgb(${Math.round(D * 255)},${Math.round(e * 255)},${Math.round(t * 255)})`;
  }
  offsetHSL(M, D, e) {
    return this.getHSL(ke), this.setHSL(ke.h + M, ke.s + D, ke.l + e);
  }
  add(M) {
    return this.r += M.r, this.g += M.g, this.b += M.b, this;
  }
  addColors(M, D) {
    return this.r = M.r + D.r, this.g = M.g + D.g, this.b = M.b + D.b, this;
  }
  addScalar(M) {
    return this.r += M, this.g += M, this.b += M, this;
  }
  sub(M) {
    return this.r = Math.max(0, this.r - M.r), this.g = Math.max(0, this.g - M.g), this.b = Math.max(0, this.b - M.b), this;
  }
  multiply(M) {
    return this.r *= M.r, this.g *= M.g, this.b *= M.b, this;
  }
  multiplyScalar(M) {
    return this.r *= M, this.g *= M, this.b *= M, this;
  }
  lerp(M, D) {
    return this.r += (M.r - this.r) * D, this.g += (M.g - this.g) * D, this.b += (M.b - this.b) * D, this;
  }
  lerpColors(M, D, e) {
    return this.r = M.r + (D.r - M.r) * e, this.g = M.g + (D.g - M.g) * e, this.b = M.b + (D.b - M.b) * e, this;
  }
  lerpHSL(M, D) {
    this.getHSL(ke), M.getHSL(yi);
    const e = FA(ke.h, yi.h, D), t = FA(ke.s, yi.s, D), i = FA(ke.l, yi.l, D);
    return this.setHSL(e, t, i), this;
  }
  setFromVector3(M) {
    return this.r = M.x, this.g = M.y, this.b = M.z, this;
  }
  applyMatrix3(M) {
    const D = this.r, e = this.g, t = this.b, i = M.elements;
    return this.r = i[0] * D + i[3] * e + i[6] * t, this.g = i[1] * D + i[4] * e + i[7] * t, this.b = i[2] * D + i[5] * e + i[8] * t, this;
  }
  equals(M) {
    return M.r === this.r && M.g === this.g && M.b === this.b;
  }
  fromArray(M, D = 0) {
    return this.r = M[D], this.g = M[D + 1], this.b = M[D + 2], this;
  }
  toArray(M = [], D = 0) {
    return M[D] = this.r, M[D + 1] = this.g, M[D + 2] = this.b, M;
  }
  fromBufferAttribute(M, D) {
    return this.r = M.getX(D), this.g = M.getY(D), this.b = M.getZ(D), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const cD = /* @__PURE__ */ new le();
le.NAMES = su;
class Gy extends MN {
  constructor(M) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new le(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Tu, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.fog = M.fog, this;
  }
}
const MD = /* @__PURE__ */ new P(), ji = /* @__PURE__ */ new xD();
class Wt {
  constructor(M, D, e = !1) {
    if (Array.isArray(M))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = M, this.itemSize = D, this.count = M !== void 0 ? M.length / D : 0, this.normalized = e, this.usage = pI, this.updateRange = { offset: 0, count: -1 }, this.gpuType = xy, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(M) {
    M === !0 && this.version++;
  }
  setUsage(M) {
    return this.usage = M, this;
  }
  copy(M) {
    return this.name = M.name, this.array = new M.array.constructor(M.array), this.itemSize = M.itemSize, this.count = M.count, this.normalized = M.normalized, this.usage = M.usage, this.gpuType = M.gpuType, this;
  }
  copyAt(M, D, e) {
    M *= this.itemSize, e *= D.itemSize;
    for (let t = 0, i = this.itemSize; t < i; t++)
      this.array[M + t] = D.array[e + t];
    return this;
  }
  copyArray(M) {
    return this.array.set(M), this;
  }
  applyMatrix3(M) {
    if (this.itemSize === 2)
      for (let D = 0, e = this.count; D < e; D++)
        ji.fromBufferAttribute(this, D), ji.applyMatrix3(M), this.setXY(D, ji.x, ji.y);
    else if (this.itemSize === 3)
      for (let D = 0, e = this.count; D < e; D++)
        MD.fromBufferAttribute(this, D), MD.applyMatrix3(M), this.setXYZ(D, MD.x, MD.y, MD.z);
    return this;
  }
  applyMatrix4(M) {
    for (let D = 0, e = this.count; D < e; D++)
      MD.fromBufferAttribute(this, D), MD.applyMatrix4(M), this.setXYZ(D, MD.x, MD.y, MD.z);
    return this;
  }
  applyNormalMatrix(M) {
    for (let D = 0, e = this.count; D < e; D++)
      MD.fromBufferAttribute(this, D), MD.applyNormalMatrix(M), this.setXYZ(D, MD.x, MD.y, MD.z);
    return this;
  }
  transformDirection(M) {
    for (let D = 0, e = this.count; D < e; D++)
      MD.fromBufferAttribute(this, D), MD.transformDirection(M), this.setXYZ(D, MD.x, MD.y, MD.z);
    return this;
  }
  set(M, D = 0) {
    return this.array.set(M, D), this;
  }
  getComponent(M, D) {
    let e = this.array[M * this.itemSize + D];
    return this.normalized && (e = sN(e, this.array)), e;
  }
  setComponent(M, D, e) {
    return this.normalized && (e = hD(e, this.array)), this.array[M * this.itemSize + D] = e, this;
  }
  getX(M) {
    let D = this.array[M * this.itemSize];
    return this.normalized && (D = sN(D, this.array)), D;
  }
  setX(M, D) {
    return this.normalized && (D = hD(D, this.array)), this.array[M * this.itemSize] = D, this;
  }
  getY(M) {
    let D = this.array[M * this.itemSize + 1];
    return this.normalized && (D = sN(D, this.array)), D;
  }
  setY(M, D) {
    return this.normalized && (D = hD(D, this.array)), this.array[M * this.itemSize + 1] = D, this;
  }
  getZ(M) {
    let D = this.array[M * this.itemSize + 2];
    return this.normalized && (D = sN(D, this.array)), D;
  }
  setZ(M, D) {
    return this.normalized && (D = hD(D, this.array)), this.array[M * this.itemSize + 2] = D, this;
  }
  getW(M) {
    let D = this.array[M * this.itemSize + 3];
    return this.normalized && (D = sN(D, this.array)), D;
  }
  setW(M, D) {
    return this.normalized && (D = hD(D, this.array)), this.array[M * this.itemSize + 3] = D, this;
  }
  setXY(M, D, e) {
    return M *= this.itemSize, this.normalized && (D = hD(D, this.array), e = hD(e, this.array)), this.array[M + 0] = D, this.array[M + 1] = e, this;
  }
  setXYZ(M, D, e, t) {
    return M *= this.itemSize, this.normalized && (D = hD(D, this.array), e = hD(e, this.array), t = hD(t, this.array)), this.array[M + 0] = D, this.array[M + 1] = e, this.array[M + 2] = t, this;
  }
  setXYZW(M, D, e, t, i) {
    return M *= this.itemSize, this.normalized && (D = hD(D, this.array), e = hD(e, this.array), t = hD(t, this.array), i = hD(i, this.array)), this.array[M + 0] = D, this.array[M + 1] = e, this.array[M + 2] = t, this.array[M + 3] = i, this;
  }
  onUpload(M) {
    return this.onUploadCallback = M, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const M = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (M.name = this.name), this.usage !== pI && (M.usage = this.usage), (this.updateRange.offset !== 0 || this.updateRange.count !== -1) && (M.updateRange = this.updateRange), M;
  }
}
class Hy extends Wt {
  constructor(M, D, e) {
    super(new Uint16Array(M), D, e);
  }
}
class Wy extends Wt {
  constructor(M, D, e) {
    super(new Uint32Array(M), D, e);
  }
}
class we extends Wt {
  constructor(M, D, e) {
    super(new Float32Array(M), D, e);
  }
}
let Xy = 0;
const bD = /* @__PURE__ */ new kD(), nn = /* @__PURE__ */ new FD(), _t = /* @__PURE__ */ new P(), SD = /* @__PURE__ */ new kN(), oN = /* @__PURE__ */ new kN(), AD = /* @__PURE__ */ new P();
class ut extends DA {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Xy++ }), this.uuid = QN(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(M) {
    return Array.isArray(M) ? this.index = new (Yy(M) ? Wy : Hy)(M, 1) : this.index = M, this;
  }
  getAttribute(M) {
    return this.attributes[M];
  }
  setAttribute(M, D) {
    return this.attributes[M] = D, this;
  }
  deleteAttribute(M) {
    return delete this.attributes[M], this;
  }
  hasAttribute(M) {
    return this.attributes[M] !== void 0;
  }
  addGroup(M, D, e = 0) {
    this.groups.push({
      start: M,
      count: D,
      materialIndex: e
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(M, D) {
    this.drawRange.start = M, this.drawRange.count = D;
  }
  applyMatrix4(M) {
    const D = this.attributes.position;
    D !== void 0 && (D.applyMatrix4(M), D.needsUpdate = !0);
    const e = this.attributes.normal;
    if (e !== void 0) {
      const i = new Be().getNormalMatrix(M);
      e.applyNormalMatrix(i), e.needsUpdate = !0;
    }
    const t = this.attributes.tangent;
    return t !== void 0 && (t.transformDirection(M), t.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(M) {
    return bD.makeRotationFromQuaternion(M), this.applyMatrix4(bD), this;
  }
  rotateX(M) {
    return bD.makeRotationX(M), this.applyMatrix4(bD), this;
  }
  rotateY(M) {
    return bD.makeRotationY(M), this.applyMatrix4(bD), this;
  }
  rotateZ(M) {
    return bD.makeRotationZ(M), this.applyMatrix4(bD), this;
  }
  translate(M, D, e) {
    return bD.makeTranslation(M, D, e), this.applyMatrix4(bD), this;
  }
  scale(M, D, e) {
    return bD.makeScale(M, D, e), this.applyMatrix4(bD), this;
  }
  lookAt(M) {
    return nn.lookAt(M), nn.updateMatrix(), this.applyMatrix4(nn.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(_t).negate(), this.translate(_t.x, _t.y, _t.z), this;
  }
  setFromPoints(M) {
    const D = [];
    for (let e = 0, t = M.length; e < t; e++) {
      const i = M[e];
      D.push(i.x, i.y, i.z || 0);
    }
    return this.setAttribute("position", new we(D, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new kN());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(
        new P(-1 / 0, -1 / 0, -1 / 0),
        new P(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (M !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(M), D)
        for (let e = 0, t = D.length; e < t; e++) {
          const i = D[e];
          SD.setFromBufferAttribute(i), this.morphTargetsRelative ? (AD.addVectors(this.boundingBox.min, SD.min), this.boundingBox.expandByPoint(AD), AD.addVectors(this.boundingBox.max, SD.max), this.boundingBox.expandByPoint(AD)) : (this.boundingBox.expandByPoint(SD.min), this.boundingBox.expandByPoint(SD.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new eA());
    const M = this.attributes.position, D = this.morphAttributes.position;
    if (M && M.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new P(), 1 / 0);
      return;
    }
    if (M) {
      const e = this.boundingSphere.center;
      if (SD.setFromBufferAttribute(M), D)
        for (let i = 0, n = D.length; i < n; i++) {
          const A = D[i];
          oN.setFromBufferAttribute(A), this.morphTargetsRelative ? (AD.addVectors(SD.min, oN.min), SD.expandByPoint(AD), AD.addVectors(SD.max, oN.max), SD.expandByPoint(AD)) : (SD.expandByPoint(oN.min), SD.expandByPoint(oN.max));
        }
      SD.getCenter(e);
      let t = 0;
      for (let i = 0, n = M.count; i < n; i++)
        AD.fromBufferAttribute(M, i), t = Math.max(t, e.distanceToSquared(AD));
      if (D)
        for (let i = 0, n = D.length; i < n; i++) {
          const A = D[i], z = this.morphTargetsRelative;
          for (let I = 0, T = A.count; I < T; I++)
            AD.fromBufferAttribute(A, I), z && (_t.fromBufferAttribute(M, I), AD.add(_t)), t = Math.max(t, e.distanceToSquared(AD));
        }
      this.boundingSphere.radius = Math.sqrt(t), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const M = this.index, D = this.attributes;
    if (M === null || D.position === void 0 || D.normal === void 0 || D.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const e = M.array, t = D.position.array, i = D.normal.array, n = D.uv.array, A = t.length / 3;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Wt(new Float32Array(4 * A), 4));
    const z = this.getAttribute("tangent").array, I = [], T = [];
    for (let x = 0; x < A; x++)
      I[x] = new P(), T[x] = new P();
    const u = new P(), g = new P(), s = new P(), a = new xD(), o = new xD(), c = new xD(), r = new P(), w = new P();
    function y(x, R, B) {
      u.fromArray(t, x * 3), g.fromArray(t, R * 3), s.fromArray(t, B * 3), a.fromArray(n, x * 2), o.fromArray(n, R * 2), c.fromArray(n, B * 2), g.sub(u), s.sub(u), o.sub(a), c.sub(a);
      const H = 1 / (o.x * c.y - c.x * o.y);
      isFinite(H) && (r.copy(g).multiplyScalar(c.y).addScaledVector(s, -o.y).multiplyScalar(H), w.copy(s).multiplyScalar(o.x).addScaledVector(g, -c.x).multiplyScalar(H), I[x].add(r), I[R].add(r), I[B].add(r), T[x].add(w), T[R].add(w), T[B].add(w));
    }
    let j = this.groups;
    j.length === 0 && (j = [{
      start: 0,
      count: e.length
    }]);
    for (let x = 0, R = j.length; x < R; ++x) {
      const B = j[x], H = B.start, p = B.count;
      for (let k = H, V = H + p; k < V; k += 3)
        y(
          e[k + 0],
          e[k + 1],
          e[k + 2]
        );
    }
    const l = new P(), d = new P(), h = new P(), Z = new P();
    function L(x) {
      h.fromArray(i, x * 3), Z.copy(h);
      const R = I[x];
      l.copy(R), l.sub(h.multiplyScalar(h.dot(R))).normalize(), d.crossVectors(Z, R);
      const H = d.dot(T[x]) < 0 ? -1 : 1;
      z[x * 4] = l.x, z[x * 4 + 1] = l.y, z[x * 4 + 2] = l.z, z[x * 4 + 3] = H;
    }
    for (let x = 0, R = j.length; x < R; ++x) {
      const B = j[x], H = B.start, p = B.count;
      for (let k = H, V = H + p; k < V; k += 3)
        L(e[k + 0]), L(e[k + 1]), L(e[k + 2]);
    }
  }
  computeVertexNormals() {
    const M = this.index, D = this.getAttribute("position");
    if (D !== void 0) {
      let e = this.getAttribute("normal");
      if (e === void 0)
        e = new Wt(new Float32Array(D.count * 3), 3), this.setAttribute("normal", e);
      else
        for (let g = 0, s = e.count; g < s; g++)
          e.setXYZ(g, 0, 0, 0);
      const t = new P(), i = new P(), n = new P(), A = new P(), z = new P(), I = new P(), T = new P(), u = new P();
      if (M)
        for (let g = 0, s = M.count; g < s; g += 3) {
          const a = M.getX(g + 0), o = M.getX(g + 1), c = M.getX(g + 2);
          t.fromBufferAttribute(D, a), i.fromBufferAttribute(D, o), n.fromBufferAttribute(D, c), T.subVectors(n, i), u.subVectors(t, i), T.cross(u), A.fromBufferAttribute(e, a), z.fromBufferAttribute(e, o), I.fromBufferAttribute(e, c), A.add(T), z.add(T), I.add(T), e.setXYZ(a, A.x, A.y, A.z), e.setXYZ(o, z.x, z.y, z.z), e.setXYZ(c, I.x, I.y, I.z);
        }
      else
        for (let g = 0, s = D.count; g < s; g += 3)
          t.fromBufferAttribute(D, g + 0), i.fromBufferAttribute(D, g + 1), n.fromBufferAttribute(D, g + 2), T.subVectors(n, i), u.subVectors(t, i), T.cross(u), e.setXYZ(g + 0, T.x, T.y, T.z), e.setXYZ(g + 1, T.x, T.y, T.z), e.setXYZ(g + 2, T.x, T.y, T.z);
      this.normalizeNormals(), e.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const M = this.attributes.normal;
    for (let D = 0, e = M.count; D < e; D++)
      AD.fromBufferAttribute(M, D), AD.normalize(), M.setXYZ(D, AD.x, AD.y, AD.z);
  }
  toNonIndexed() {
    function M(A, z) {
      const I = A.array, T = A.itemSize, u = A.normalized, g = new I.constructor(z.length * T);
      let s = 0, a = 0;
      for (let o = 0, c = z.length; o < c; o++) {
        A.isInterleavedBufferAttribute ? s = z[o] * A.data.stride + A.offset : s = z[o] * T;
        for (let r = 0; r < T; r++)
          g[a++] = I[s++];
      }
      return new Wt(g, T, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const D = new ut(), e = this.index.array, t = this.attributes;
    for (const A in t) {
      const z = t[A], I = M(z, e);
      D.setAttribute(A, I);
    }
    const i = this.morphAttributes;
    for (const A in i) {
      const z = [], I = i[A];
      for (let T = 0, u = I.length; T < u; T++) {
        const g = I[T], s = M(g, e);
        z.push(s);
      }
      D.morphAttributes[A] = z;
    }
    D.morphTargetsRelative = this.morphTargetsRelative;
    const n = this.groups;
    for (let A = 0, z = n.length; A < z; A++) {
      const I = n[A];
      D.addGroup(I.start, I.count, I.materialIndex);
    }
    return D;
  }
  toJSON() {
    const M = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (M.uuid = this.uuid, M.type = this.type, this.name !== "" && (M.name = this.name), Object.keys(this.userData).length > 0 && (M.userData = this.userData), this.parameters !== void 0) {
      const z = this.parameters;
      for (const I in z)
        z[I] !== void 0 && (M[I] = z[I]);
      return M;
    }
    M.data = { attributes: {} };
    const D = this.index;
    D !== null && (M.data.index = {
      type: D.array.constructor.name,
      array: Array.prototype.slice.call(D.array)
    });
    const e = this.attributes;
    for (const z in e) {
      const I = e[z];
      M.data.attributes[z] = I.toJSON(M.data);
    }
    const t = {};
    let i = !1;
    for (const z in this.morphAttributes) {
      const I = this.morphAttributes[z], T = [];
      for (let u = 0, g = I.length; u < g; u++) {
        const s = I[u];
        T.push(s.toJSON(M.data));
      }
      T.length > 0 && (t[z] = T, i = !0);
    }
    i && (M.data.morphAttributes = t, M.data.morphTargetsRelative = this.morphTargetsRelative);
    const n = this.groups;
    n.length > 0 && (M.data.groups = JSON.parse(JSON.stringify(n)));
    const A = this.boundingSphere;
    return A !== null && (M.data.boundingSphere = {
      center: A.center.toArray(),
      radius: A.radius
    }), M;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const D = {};
    this.name = M.name;
    const e = M.index;
    e !== null && this.setIndex(e.clone(D));
    const t = M.attributes;
    for (const I in t) {
      const T = t[I];
      this.setAttribute(I, T.clone(D));
    }
    const i = M.morphAttributes;
    for (const I in i) {
      const T = [], u = i[I];
      for (let g = 0, s = u.length; g < s; g++)
        T.push(u[g].clone(D));
      this.morphAttributes[I] = T;
    }
    this.morphTargetsRelative = M.morphTargetsRelative;
    const n = M.groups;
    for (let I = 0, T = n.length; I < T; I++) {
      const u = n[I];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const A = M.boundingBox;
    A !== null && (this.boundingBox = A.clone());
    const z = M.boundingSphere;
    return z !== null && (this.boundingSphere = z.clone()), this.drawRange.start = M.drawRange.start, this.drawRange.count = M.drawRange.count, this.userData = M.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const FI = /* @__PURE__ */ new kD(), Mt = /* @__PURE__ */ new Kn(), Ci = /* @__PURE__ */ new eA(), BI = /* @__PURE__ */ new P(), bt = /* @__PURE__ */ new P(), Kt = /* @__PURE__ */ new P(), Rt = /* @__PURE__ */ new P(), zn = /* @__PURE__ */ new P(), Li = /* @__PURE__ */ new P(), wi = /* @__PURE__ */ new xD(), Oi = /* @__PURE__ */ new xD(), xi = /* @__PURE__ */ new xD(), VI = /* @__PURE__ */ new P(), GI = /* @__PURE__ */ new P(), HI = /* @__PURE__ */ new P(), Ei = /* @__PURE__ */ new P(), li = /* @__PURE__ */ new P();
class WI extends FD {
  constructor(M = new ut(), D = new Gy()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), M.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = M.morphTargetInfluences.slice()), M.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, M.morphTargetDictionary)), this.material = Array.isArray(M.material) ? M.material.slice() : M.material, this.geometry = M.geometry, this;
  }
  updateMorphTargets() {
    const D = this.geometry.morphAttributes, e = Object.keys(D);
    if (e.length > 0) {
      const t = D[e[0]];
      if (t !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, n = t.length; i < n; i++) {
          const A = t[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = i;
        }
      }
    }
  }
  getVertexPosition(M, D) {
    const e = this.geometry, t = e.attributes.position, i = e.morphAttributes.position, n = e.morphTargetsRelative;
    D.fromBufferAttribute(t, M);
    const A = this.morphTargetInfluences;
    if (i && A) {
      Li.set(0, 0, 0);
      for (let z = 0, I = i.length; z < I; z++) {
        const T = A[z], u = i[z];
        T !== 0 && (zn.fromBufferAttribute(u, M), n ? Li.addScaledVector(zn, T) : Li.addScaledVector(zn.sub(D), T));
      }
      D.add(Li);
    }
    return D;
  }
  raycast(M, D) {
    const e = this.geometry, t = this.material, i = this.matrixWorld;
    t !== void 0 && (e.boundingSphere === null && e.computeBoundingSphere(), Ci.copy(e.boundingSphere), Ci.applyMatrix4(i), Mt.copy(M.ray).recast(M.near), !(Ci.containsPoint(Mt.origin) === !1 && (Mt.intersectSphere(Ci, BI) === null || Mt.origin.distanceToSquared(BI) > (M.far - M.near) ** 2)) && (FI.copy(i).invert(), Mt.copy(M.ray).applyMatrix4(FI), !(e.boundingBox !== null && Mt.intersectsBox(e.boundingBox) === !1) && this._computeIntersections(M, D, Mt)));
  }
  _computeIntersections(M, D, e) {
    let t;
    const i = this.geometry, n = this.material, A = i.index, z = i.attributes.position, I = i.attributes.uv, T = i.attributes.uv1, u = i.attributes.normal, g = i.groups, s = i.drawRange;
    if (A !== null)
      if (Array.isArray(n))
        for (let a = 0, o = g.length; a < o; a++) {
          const c = g[a], r = n[c.materialIndex], w = Math.max(c.start, s.start), y = Math.min(A.count, Math.min(c.start + c.count, s.start + s.count));
          for (let j = w, l = y; j < l; j += 3) {
            const d = A.getX(j), h = A.getX(j + 1), Z = A.getX(j + 2);
            t = hi(this, r, M, e, I, T, u, d, h, Z), t && (t.faceIndex = Math.floor(j / 3), t.face.materialIndex = c.materialIndex, D.push(t));
          }
        }
      else {
        const a = Math.max(0, s.start), o = Math.min(A.count, s.start + s.count);
        for (let c = a, r = o; c < r; c += 3) {
          const w = A.getX(c), y = A.getX(c + 1), j = A.getX(c + 2);
          t = hi(this, n, M, e, I, T, u, w, y, j), t && (t.faceIndex = Math.floor(c / 3), D.push(t));
        }
      }
    else if (z !== void 0)
      if (Array.isArray(n))
        for (let a = 0, o = g.length; a < o; a++) {
          const c = g[a], r = n[c.materialIndex], w = Math.max(c.start, s.start), y = Math.min(z.count, Math.min(c.start + c.count, s.start + s.count));
          for (let j = w, l = y; j < l; j += 3) {
            const d = j, h = j + 1, Z = j + 2;
            t = hi(this, r, M, e, I, T, u, d, h, Z), t && (t.faceIndex = Math.floor(j / 3), t.face.materialIndex = c.materialIndex, D.push(t));
          }
        }
      else {
        const a = Math.max(0, s.start), o = Math.min(z.count, s.start + s.count);
        for (let c = a, r = o; c < r; c += 3) {
          const w = c, y = c + 1, j = c + 2;
          t = hi(this, n, M, e, I, T, u, w, y, j), t && (t.faceIndex = Math.floor(c / 3), D.push(t));
        }
      }
  }
}
function qy(N, M, D, e, t, i, n, A) {
  let z;
  if (M.side === ay ? z = e.intersectTriangle(n, i, t, !0, A) : z = e.intersectTriangle(t, i, n, M.side === hn, A), z === null)
    return null;
  li.copy(A), li.applyMatrix4(N.matrixWorld);
  const I = D.ray.origin.distanceTo(li);
  return I < D.near || I > D.far ? null : {
    distance: I,
    point: li.clone(),
    object: N
  };
}
function hi(N, M, D, e, t, i, n, A, z, I) {
  N.getVertexPosition(A, bt), N.getVertexPosition(z, Kt), N.getVertexPosition(I, Rt);
  const T = qy(N, M, D, e, bt, Kt, Rt, Ei);
  if (T) {
    t && (wi.fromBufferAttribute(t, A), Oi.fromBufferAttribute(t, z), xi.fromBufferAttribute(t, I), T.uv = qD.getInterpolation(Ei, bt, Kt, Rt, wi, Oi, xi, new xD())), i && (wi.fromBufferAttribute(i, A), Oi.fromBufferAttribute(i, z), xi.fromBufferAttribute(i, I), T.uv1 = qD.getInterpolation(Ei, bt, Kt, Rt, wi, Oi, xi, new xD()), T.uv2 = T.uv1), n && (VI.fromBufferAttribute(n, A), GI.fromBufferAttribute(n, z), HI.fromBufferAttribute(n, I), T.normal = qD.getInterpolation(Ei, bt, Kt, Rt, VI, GI, HI, new P()), T.normal.dot(e.direction) > 0 && T.normal.multiplyScalar(-1));
    const u = {
      a: A,
      b: z,
      c: I,
      normal: new P(),
      materialIndex: 0
    };
    qD.getNormal(bt, Kt, Rt, u.normal), T.face = u;
  }
  return T;
}
class $y extends FD {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
class _i extends MN {
  constructor(M) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new le(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.linewidth = M.linewidth, this.linecap = M.linecap, this.linejoin = M.linejoin, this.fog = M.fog, this;
  }
}
const XI = /* @__PURE__ */ new P(), qI = /* @__PURE__ */ new P(), $I = /* @__PURE__ */ new kD(), In = /* @__PURE__ */ new Kn(), di = /* @__PURE__ */ new eA();
class Jy extends FD {
  constructor(M = new ut(), D = new _i()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), this.material = Array.isArray(M.material) ? M.material.slice() : M.material, this.geometry = M.geometry, this;
  }
  computeLineDistances() {
    const M = this.geometry;
    if (M.index === null) {
      const D = M.attributes.position, e = [0];
      for (let t = 1, i = D.count; t < i; t++)
        XI.fromBufferAttribute(D, t - 1), qI.fromBufferAttribute(D, t), e[t] = e[t - 1], e[t] += XI.distanceTo(qI);
      M.setAttribute("lineDistance", new we(e, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(M, D) {
    const e = this.geometry, t = this.matrixWorld, i = M.params.Line.threshold, n = e.drawRange;
    if (e.boundingSphere === null && e.computeBoundingSphere(), di.copy(e.boundingSphere), di.applyMatrix4(t), di.radius += i, M.ray.intersectsSphere(di) === !1)
      return;
    $I.copy(t).invert(), In.copy(M.ray).applyMatrix4($I);
    const A = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), z = A * A, I = new P(), T = new P(), u = new P(), g = new P(), s = this.isLineSegments ? 2 : 1, a = e.index, c = e.attributes.position;
    if (a !== null) {
      const r = Math.max(0, n.start), w = Math.min(a.count, n.start + n.count);
      for (let y = r, j = w - 1; y < j; y += s) {
        const l = a.getX(y), d = a.getX(y + 1);
        if (I.fromBufferAttribute(c, l), T.fromBufferAttribute(c, d), In.distanceSqToSegment(I, T, g, u) > z)
          continue;
        g.applyMatrix4(this.matrixWorld);
        const Z = M.ray.origin.distanceTo(g);
        Z < M.near || Z > M.far || D.push({
          distance: Z,
          // What do we want? intersection point on the ray or on the segment??
          // point: raycaster.ray.at( distance ),
          point: u.clone().applyMatrix4(this.matrixWorld),
          index: y,
          face: null,
          faceIndex: null,
          object: this
        });
      }
    } else {
      const r = Math.max(0, n.start), w = Math.min(c.count, n.start + n.count);
      for (let y = r, j = w - 1; y < j; y += s) {
        if (I.fromBufferAttribute(c, y), T.fromBufferAttribute(c, y + 1), In.distanceSqToSegment(I, T, g, u) > z)
          continue;
        g.applyMatrix4(this.matrixWorld);
        const d = M.ray.origin.distanceTo(g);
        d < M.near || d > M.far || D.push({
          distance: d,
          // What do we want? intersection point on the ray or on the segment??
          // point: raycaster.ray.at( distance ),
          point: u.clone().applyMatrix4(this.matrixWorld),
          index: y,
          face: null,
          faceIndex: null,
          object: this
        });
      }
    }
  }
  updateMorphTargets() {
    const D = this.geometry.morphAttributes, e = Object.keys(D);
    if (e.length > 0) {
      const t = D[e[0]];
      if (t !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, n = t.length; i < n; i++) {
          const A = t[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = i;
        }
      }
    }
  }
}
const JI = /* @__PURE__ */ new P(), MT = /* @__PURE__ */ new P();
class DT extends Jy {
  constructor(M, D) {
    super(M, D), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const M = this.geometry;
    if (M.index === null) {
      const D = M.attributes.position, e = [];
      for (let t = 0, i = D.count; t < i; t += 2)
        JI.fromBufferAttribute(D, t), MT.fromBufferAttribute(D, t + 1), e[t] = t === 0 ? 0 : e[t - 1], e[t + 1] = e[t] + JI.distanceTo(MT);
      M.setAttribute("lineDistance", new we(e, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class CN extends MN {
  constructor(M) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new le(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.map = M.map, this.alphaMap = M.alphaMap, this.size = M.size, this.sizeAttenuation = M.sizeAttenuation, this.fog = M.fog, this;
  }
}
const eT = /* @__PURE__ */ new kD(), vn = /* @__PURE__ */ new Kn(), vi = /* @__PURE__ */ new eA(), pi = /* @__PURE__ */ new P();
class Tn extends FD {
  constructor(M = new ut(), D = new CN()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = M, this.material = D, this.updateMorphTargets();
  }
  copy(M, D) {
    return super.copy(M, D), this.material = Array.isArray(M.material) ? M.material.slice() : M.material, this.geometry = M.geometry, this;
  }
  raycast(M, D) {
    const e = this.geometry, t = this.matrixWorld, i = M.params.Points.threshold, n = e.drawRange;
    if (e.boundingSphere === null && e.computeBoundingSphere(), vi.copy(e.boundingSphere), vi.applyMatrix4(t), vi.radius += i, M.ray.intersectsSphere(vi) === !1)
      return;
    eT.copy(t).invert(), vn.copy(M.ray).applyMatrix4(eT);
    const A = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), z = A * A, I = e.index, u = e.attributes.position;
    if (I !== null) {
      const g = Math.max(0, n.start), s = Math.min(I.count, n.start + n.count);
      for (let a = g, o = s; a < o; a++) {
        const c = I.getX(a);
        pi.fromBufferAttribute(u, c), tT(pi, c, z, t, M, D, this);
      }
    } else {
      const g = Math.max(0, n.start), s = Math.min(u.count, n.start + n.count);
      for (let a = g, o = s; a < o; a++)
        pi.fromBufferAttribute(u, a), tT(pi, a, z, t, M, D, this);
    }
  }
  updateMorphTargets() {
    const D = this.geometry.morphAttributes, e = Object.keys(D);
    if (e.length > 0) {
      const t = D[e[0]];
      if (t !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, n = t.length; i < n; i++) {
          const A = t[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[A] = i;
        }
      }
    }
  }
}
function tT(N, M, D, e, t, i, n) {
  const A = vn.distanceSqToPoint(N);
  if (A < D) {
    const z = new P();
    vn.closestPointToPoint(N, z), z.applyMatrix4(e);
    const I = t.ray.origin.distanceTo(z);
    if (I < t.near || I > t.far)
      return;
    i.push({
      distance: I,
      distanceToRay: Math.sqrt(A),
      point: z,
      index: M,
      face: null,
      object: n
    });
  }
}
class Mj extends MN {
  constructor(M) {
    super(), this.isMeshPhongMaterial = !0, this.type = "MeshPhongMaterial", this.color = new le(16777215), this.specular = new le(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new le(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = hy, this.normalScale = new xD(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = Tu, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(M);
  }
  copy(M) {
    return super.copy(M), this.color.copy(M.color), this.specular.copy(M.specular), this.shininess = M.shininess, this.map = M.map, this.lightMap = M.lightMap, this.lightMapIntensity = M.lightMapIntensity, this.aoMap = M.aoMap, this.aoMapIntensity = M.aoMapIntensity, this.emissive.copy(M.emissive), this.emissiveMap = M.emissiveMap, this.emissiveIntensity = M.emissiveIntensity, this.bumpMap = M.bumpMap, this.bumpScale = M.bumpScale, this.normalMap = M.normalMap, this.normalMapType = M.normalMapType, this.normalScale.copy(M.normalScale), this.displacementMap = M.displacementMap, this.displacementScale = M.displacementScale, this.displacementBias = M.displacementBias, this.specularMap = M.specularMap, this.alphaMap = M.alphaMap, this.envMap = M.envMap, this.combine = M.combine, this.reflectivity = M.reflectivity, this.refractionRatio = M.refractionRatio, this.wireframe = M.wireframe, this.wireframeLinewidth = M.wireframeLinewidth, this.wireframeLinecap = M.wireframeLinecap, this.wireframeLinejoin = M.wireframeLinejoin, this.flatShading = M.flatShading, this.fog = M.fog, this;
  }
}
const NT = {
  enabled: !1,
  files: {},
  add: function(N, M) {
    this.enabled !== !1 && (this.files[N] = M);
  },
  get: function(N) {
    if (this.enabled !== !1)
      return this.files[N];
  },
  remove: function(N) {
    delete this.files[N];
  },
  clear: function() {
    this.files = {};
  }
};
class Dj {
  constructor(M, D, e) {
    const t = this;
    let i = !1, n = 0, A = 0, z;
    const I = [];
    this.onStart = void 0, this.onLoad = M, this.onProgress = D, this.onError = e, this.itemStart = function(T) {
      A++, i === !1 && t.onStart !== void 0 && t.onStart(T, n, A), i = !0;
    }, this.itemEnd = function(T) {
      n++, t.onProgress !== void 0 && t.onProgress(T, n, A), n === A && (i = !1, t.onLoad !== void 0 && t.onLoad());
    }, this.itemError = function(T) {
      t.onError !== void 0 && t.onError(T);
    }, this.resolveURL = function(T) {
      return z ? z(T) : T;
    }, this.setURLModifier = function(T) {
      return z = T, this;
    }, this.addHandler = function(T, u) {
      return I.push(T, u), this;
    }, this.removeHandler = function(T) {
      const u = I.indexOf(T);
      return u !== -1 && I.splice(u, 2), this;
    }, this.getHandler = function(T) {
      for (let u = 0, g = I.length; u < g; u += 2) {
        const s = I[u], a = I[u + 1];
        if (s.global && (s.lastIndex = 0), s.test(T))
          return a;
      }
      return null;
    };
  }
}
const ej = /* @__PURE__ */ new Dj();
class Rn {
  constructor(M) {
    this.manager = M !== void 0 ? M : ej, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(M, D) {
    const e = this;
    return new Promise(function(t, i) {
      e.load(M, t, D, i);
    });
  }
  parse() {
  }
  setCrossOrigin(M) {
    return this.crossOrigin = M, this;
  }
  setWithCredentials(M) {
    return this.withCredentials = M, this;
  }
  setPath(M) {
    return this.path = M, this;
  }
  setResourcePath(M) {
    return this.resourcePath = M, this;
  }
  setRequestHeader(M) {
    return this.requestHeader = M, this;
  }
}
Rn.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const Ce = {};
class tj extends Error {
  constructor(M, D) {
    super(M), this.response = D;
  }
}
class Nj extends Rn {
  constructor(M) {
    super(M);
  }
  load(M, D, e, t) {
    M === void 0 && (M = ""), this.path !== void 0 && (M = this.path + M), M = this.manager.resolveURL(M);
    const i = NT.get(M);
    if (i !== void 0)
      return this.manager.itemStart(M), setTimeout(() => {
        D && D(i), this.manager.itemEnd(M);
      }, 0), i;
    if (Ce[M] !== void 0) {
      Ce[M].push({
        onLoad: D,
        onProgress: e,
        onError: t
      });
      return;
    }
    Ce[M] = [], Ce[M].push({
      onLoad: D,
      onProgress: e,
      onError: t
    });
    const n = new Request(M, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin"
      // An abort controller could be added within a future PR
    }), A = this.mimeType, z = this.responseType;
    fetch(n).then((I) => {
      if (I.status === 200 || I.status === 0) {
        if (I.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || I.body === void 0 || I.body.getReader === void 0)
          return I;
        const T = Ce[M], u = I.body.getReader(), g = I.headers.get("Content-Length") || I.headers.get("X-File-Size"), s = g ? parseInt(g) : 0, a = s !== 0;
        let o = 0;
        const c = new ReadableStream({
          start(r) {
            w();
            function w() {
              u.read().then(({ done: y, value: j }) => {
                if (y)
                  r.close();
                else {
                  o += j.byteLength;
                  const l = new ProgressEvent("progress", { lengthComputable: a, loaded: o, total: s });
                  for (let d = 0, h = T.length; d < h; d++) {
                    const Z = T[d];
                    Z.onProgress && Z.onProgress(l);
                  }
                  r.enqueue(j), w();
                }
              });
            }
          }
        });
        return new Response(c);
      } else
        throw new tj(`fetch for "${I.url}" responded with ${I.status}: ${I.statusText}`, I);
    }).then((I) => {
      switch (z) {
        case "arraybuffer":
          return I.arrayBuffer();
        case "blob":
          return I.blob();
        case "document":
          return I.text().then((T) => new DOMParser().parseFromString(T, A));
        case "json":
          return I.json();
        default:
          if (A === void 0)
            return I.text();
          {
            const u = /charset="?([^;"\s]*)"?/i.exec(A), g = u && u[1] ? u[1].toLowerCase() : void 0, s = new TextDecoder(g);
            return I.arrayBuffer().then((a) => s.decode(a));
          }
      }
    }).then((I) => {
      NT.add(M, I);
      const T = Ce[M];
      delete Ce[M];
      for (let u = 0, g = T.length; u < g; u++) {
        const s = T[u];
        s.onLoad && s.onLoad(I);
      }
    }).catch((I) => {
      const T = Ce[M];
      if (T === void 0)
        throw this.manager.itemError(M), I;
      delete Ce[M];
      for (let u = 0, g = T.length; u < g; u++) {
        const s = T[u];
        s.onError && s.onError(I);
      }
      this.manager.itemError(M);
    }).finally(() => {
      this.manager.itemEnd(M);
    }), this.manager.itemStart(M);
  }
  setResponseType(M) {
    return this.responseType = M, this;
  }
  setMimeType(M) {
    return this.mimeType = M, this;
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: Iu
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Iu);
const ij = /^[og]\s*(.+)?/, Aj = /^mtllib /, nj = /^usemtl /, zj = /^usemap /, iT = /\s+/, AT = new P(), un = new P(), nT = new P(), zT = new P(), KD = new P(), Yi = new le();
function Ij() {
  const N = {
    objects: [],
    object: {},
    vertices: [],
    normals: [],
    colors: [],
    uvs: [],
    materials: {},
    materialLibraries: [],
    startObject: function(M, D) {
      if (this.object && this.object.fromDeclaration === !1) {
        this.object.name = M, this.object.fromDeclaration = D !== !1;
        return;
      }
      const e = this.object && typeof this.object.currentMaterial == "function" ? this.object.currentMaterial() : void 0;
      if (this.object && typeof this.object._finalize == "function" && this.object._finalize(!0), this.object = {
        name: M || "",
        fromDeclaration: D !== !1,
        geometry: {
          vertices: [],
          normals: [],
          colors: [],
          uvs: [],
          hasUVIndices: !1
        },
        materials: [],
        smooth: !0,
        startMaterial: function(t, i) {
          const n = this._finalize(!1);
          n && (n.inherited || n.groupCount <= 0) && this.materials.splice(n.index, 1);
          const A = {
            index: this.materials.length,
            name: t || "",
            mtllib: Array.isArray(i) && i.length > 0 ? i[i.length - 1] : "",
            smooth: n !== void 0 ? n.smooth : this.smooth,
            groupStart: n !== void 0 ? n.groupEnd : 0,
            groupEnd: -1,
            groupCount: -1,
            inherited: !1,
            clone: function(z) {
              const I = {
                index: typeof z == "number" ? z : this.index,
                name: this.name,
                mtllib: this.mtllib,
                smooth: this.smooth,
                groupStart: 0,
                groupEnd: -1,
                groupCount: -1,
                inherited: !1
              };
              return I.clone = this.clone.bind(I), I;
            }
          };
          return this.materials.push(A), A;
        },
        currentMaterial: function() {
          if (this.materials.length > 0)
            return this.materials[this.materials.length - 1];
        },
        _finalize: function(t) {
          const i = this.currentMaterial();
          if (i && i.groupEnd === -1 && (i.groupEnd = this.geometry.vertices.length / 3, i.groupCount = i.groupEnd - i.groupStart, i.inherited = !1), t && this.materials.length > 1)
            for (let n = this.materials.length - 1; n >= 0; n--)
              this.materials[n].groupCount <= 0 && this.materials.splice(n, 1);
          return t && this.materials.length === 0 && this.materials.push({
            name: "",
            smooth: this.smooth
          }), i;
        }
      }, e && e.name && typeof e.clone == "function") {
        const t = e.clone(0);
        t.inherited = !0, this.object.materials.push(t);
      }
      this.objects.push(this.object);
    },
    finalize: function() {
      this.object && typeof this.object._finalize == "function" && this.object._finalize(!0);
    },
    parseVertexIndex: function(M, D) {
      const e = parseInt(M, 10);
      return (e >= 0 ? e - 1 : e + D / 3) * 3;
    },
    parseNormalIndex: function(M, D) {
      const e = parseInt(M, 10);
      return (e >= 0 ? e - 1 : e + D / 3) * 3;
    },
    parseUVIndex: function(M, D) {
      const e = parseInt(M, 10);
      return (e >= 0 ? e - 1 : e + D / 2) * 2;
    },
    addVertex: function(M, D, e) {
      const t = this.vertices, i = this.object.geometry.vertices;
      i.push(t[M + 0], t[M + 1], t[M + 2]), i.push(t[D + 0], t[D + 1], t[D + 2]), i.push(t[e + 0], t[e + 1], t[e + 2]);
    },
    addVertexPoint: function(M) {
      const D = this.vertices;
      this.object.geometry.vertices.push(D[M + 0], D[M + 1], D[M + 2]);
    },
    addVertexLine: function(M) {
      const D = this.vertices;
      this.object.geometry.vertices.push(D[M + 0], D[M + 1], D[M + 2]);
    },
    addNormal: function(M, D, e) {
      const t = this.normals, i = this.object.geometry.normals;
      i.push(t[M + 0], t[M + 1], t[M + 2]), i.push(t[D + 0], t[D + 1], t[D + 2]), i.push(t[e + 0], t[e + 1], t[e + 2]);
    },
    addFaceNormal: function(M, D, e) {
      const t = this.vertices, i = this.object.geometry.normals;
      AT.fromArray(t, M), un.fromArray(t, D), nT.fromArray(t, e), KD.subVectors(nT, un), zT.subVectors(AT, un), KD.cross(zT), KD.normalize(), i.push(KD.x, KD.y, KD.z), i.push(KD.x, KD.y, KD.z), i.push(KD.x, KD.y, KD.z);
    },
    addColor: function(M, D, e) {
      const t = this.colors, i = this.object.geometry.colors;
      t[M] !== void 0 && i.push(t[M + 0], t[M + 1], t[M + 2]), t[D] !== void 0 && i.push(t[D + 0], t[D + 1], t[D + 2]), t[e] !== void 0 && i.push(t[e + 0], t[e + 1], t[e + 2]);
    },
    addUV: function(M, D, e) {
      const t = this.uvs, i = this.object.geometry.uvs;
      i.push(t[M + 0], t[M + 1]), i.push(t[D + 0], t[D + 1]), i.push(t[e + 0], t[e + 1]);
    },
    addDefaultUV: function() {
      const M = this.object.geometry.uvs;
      M.push(0, 0), M.push(0, 0), M.push(0, 0);
    },
    addUVLine: function(M) {
      const D = this.uvs;
      this.object.geometry.uvs.push(D[M + 0], D[M + 1]);
    },
    addFace: function(M, D, e, t, i, n, A, z, I) {
      const T = this.vertices.length;
      let u = this.parseVertexIndex(M, T), g = this.parseVertexIndex(D, T), s = this.parseVertexIndex(e, T);
      if (this.addVertex(u, g, s), this.addColor(u, g, s), A !== void 0 && A !== "") {
        const a = this.normals.length;
        u = this.parseNormalIndex(A, a), g = this.parseNormalIndex(z, a), s = this.parseNormalIndex(I, a), this.addNormal(u, g, s);
      } else
        this.addFaceNormal(u, g, s);
      if (t !== void 0 && t !== "") {
        const a = this.uvs.length;
        u = this.parseUVIndex(t, a), g = this.parseUVIndex(i, a), s = this.parseUVIndex(n, a), this.addUV(u, g, s), this.object.geometry.hasUVIndices = !0;
      } else
        this.addDefaultUV();
    },
    addPointGeometry: function(M) {
      this.object.geometry.type = "Points";
      const D = this.vertices.length;
      for (let e = 0, t = M.length; e < t; e++) {
        const i = this.parseVertexIndex(M[e], D);
        this.addVertexPoint(i), this.addColor(i);
      }
    },
    addLineGeometry: function(M, D) {
      this.object.geometry.type = "Line";
      const e = this.vertices.length, t = this.uvs.length;
      for (let i = 0, n = M.length; i < n; i++)
        this.addVertexLine(this.parseVertexIndex(M[i], e));
      for (let i = 0, n = D.length; i < n; i++)
        this.addUVLine(this.parseUVIndex(D[i], t));
    }
  };
  return N.startObject("", !1), N;
}
class Tj extends Rn {
  constructor(M) {
    super(M), this.materials = null;
  }
  load(M, D, e, t) {
    const i = this, n = new Nj(this.manager);
    n.setPath(this.path), n.setRequestHeader(this.requestHeader), n.setWithCredentials(this.withCredentials), n.load(M, function(A) {
      try {
        D(i.parse(A));
      } catch (z) {
        t ? t(z) : console.error(z), i.manager.itemError(M);
      }
    }, e, t);
  }
  setMaterials(M) {
    return this.materials = M, this;
  }
  parse(M) {
    const D = new Ij();
    M.indexOf(`\r
`) !== -1 && (M = M.replace(/\r\n/g, `
`)), M.indexOf(`\\
`) !== -1 && (M = M.replace(/\\\n/g, ""));
    const e = M.split(`
`);
    let t = [];
    for (let A = 0, z = e.length; A < z; A++) {
      const I = e[A].trimStart();
      if (I.length === 0)
        continue;
      const T = I.charAt(0);
      if (T !== "#")
        if (T === "v") {
          const u = I.split(iT);
          switch (u[0]) {
            case "v":
              D.vertices.push(
                parseFloat(u[1]),
                parseFloat(u[2]),
                parseFloat(u[3])
              ), u.length >= 7 ? (Yi.setRGB(
                parseFloat(u[4]),
                parseFloat(u[5]),
                parseFloat(u[6])
              ).convertSRGBToLinear(), D.colors.push(Yi.r, Yi.g, Yi.b)) : D.colors.push(void 0, void 0, void 0);
              break;
            case "vn":
              D.normals.push(
                parseFloat(u[1]),
                parseFloat(u[2]),
                parseFloat(u[3])
              );
              break;
            case "vt":
              D.uvs.push(
                parseFloat(u[1]),
                parseFloat(u[2])
              );
              break;
          }
        } else if (T === "f") {
          const g = I.slice(1).trim().split(iT), s = [];
          for (let o = 0, c = g.length; o < c; o++) {
            const r = g[o];
            if (r.length > 0) {
              const w = r.split("/");
              s.push(w);
            }
          }
          const a = s[0];
          for (let o = 1, c = s.length - 1; o < c; o++) {
            const r = s[o], w = s[o + 1];
            D.addFace(
              a[0],
              r[0],
              w[0],
              a[1],
              r[1],
              w[1],
              a[2],
              r[2],
              w[2]
            );
          }
        } else if (T === "l") {
          const u = I.substring(1).trim().split(" ");
          let g = [];
          const s = [];
          if (I.indexOf("/") === -1)
            g = u;
          else
            for (let a = 0, o = u.length; a < o; a++) {
              const c = u[a].split("/");
              c[0] !== "" && g.push(c[0]), c[1] !== "" && s.push(c[1]);
            }
          D.addLineGeometry(g, s);
        } else if (T === "p") {
          const g = I.slice(1).trim().split(" ");
          D.addPointGeometry(g);
        } else if ((t = ij.exec(I)) !== null) {
          const u = (" " + t[0].slice(1).trim()).slice(1);
          D.startObject(u);
        } else if (nj.test(I))
          D.object.startMaterial(I.substring(7).trim(), D.materialLibraries);
        else if (Aj.test(I))
          D.materialLibraries.push(I.substring(7).trim());
        else if (zj.test(I))
          console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
        else if (T === "s") {
          if (t = I.split(" "), t.length > 1) {
            const g = t[1].trim().toLowerCase();
            D.object.smooth = g !== "0" && g !== "off";
          } else
            D.object.smooth = !0;
          const u = D.object.currentMaterial();
          u && (u.smooth = D.object.smooth);
        } else {
          if (I === "\0")
            continue;
          console.warn('THREE.OBJLoader: Unexpected line: "' + I + '"');
        }
    }
    D.finalize();
    const i = new $y();
    if (i.materialLibraries = [].concat(D.materialLibraries), !(D.objects.length === 1 && D.objects[0].geometry.vertices.length === 0) === !0)
      for (let A = 0, z = D.objects.length; A < z; A++) {
        const I = D.objects[A], T = I.geometry, u = I.materials, g = T.type === "Line", s = T.type === "Points";
        let a = !1;
        if (T.vertices.length === 0)
          continue;
        const o = new ut();
        o.setAttribute("position", new we(T.vertices, 3)), T.normals.length > 0 && o.setAttribute("normal", new we(T.normals, 3)), T.colors.length > 0 && (a = !0, o.setAttribute("color", new we(T.colors, 3))), T.hasUVIndices === !0 && o.setAttribute("uv", new we(T.uvs, 2));
        const c = [];
        for (let w = 0, y = u.length; w < y; w++) {
          const j = u[w], l = j.name + "_" + j.smooth + "_" + a;
          let d = D.materials[l];
          if (this.materials !== null) {
            if (d = this.materials.create(j.name), g && d && !(d instanceof _i)) {
              const h = new _i();
              MN.prototype.copy.call(h, d), h.color.copy(d.color), d = h;
            } else if (s && d && !(d instanceof CN)) {
              const h = new CN({ size: 10, sizeAttenuation: !1 });
              MN.prototype.copy.call(h, d), h.color.copy(d.color), h.map = d.map, d = h;
            }
          }
          d === void 0 && (g ? d = new _i() : s ? d = new CN({ size: 1, sizeAttenuation: !1 }) : d = new Mj(), d.name = j.name, d.flatShading = !j.smooth, d.vertexColors = a, D.materials[l] = d), c.push(d);
        }
        let r;
        if (c.length > 1) {
          for (let w = 0, y = u.length; w < y; w++) {
            const j = u[w];
            o.addGroup(j.groupStart, j.groupCount, w);
          }
          g ? r = new DT(o, c) : s ? r = new Tn(o, c) : r = new WI(o, c);
        } else
          g ? r = new DT(o, c[0]) : s ? r = new Tn(o, c[0]) : r = new WI(o, c[0]);
        r.name = I.name, i.add(r);
      }
    else if (D.vertices.length > 0) {
      const A = new CN({ size: 1, sizeAttenuation: !1 }), z = new ut();
      z.setAttribute("position", new we(D.vertices, 3)), D.colors.length > 0 && D.colors[0] !== void 0 && (z.setAttribute("color", new we(D.colors, 3)), A.vertexColors = !0);
      const I = new Tn(z, A);
      i.add(I);
    }
    return i;
  }
}
const uj = new Tj(), gj = (N) => {
  const M = new NN().setFromObject(N), D = new Y();
  M.getSize(D);
  const e = new Y(), t = N.geometry.attributes.position, i = N.geometry.attributes.uv;
  for (let n = 0; n < t.count; n += 1)
    e.fromBufferAttribute(t, n), i.setXY(
      n,
      (e.x - M.min.x) / D.x,
      (e.y - M.min.y) / D.y
    );
}, sj = (N, M) => new Promise((D) => {
  uj.load(N, (e) => {
    const t = new YD();
    e.traverse((i) => {
      const n = i;
      if (!n.material || !n.geometry)
        return;
      n.material = new XT({ color: new KM(M).convertSRGBToLinear() }), n.geometry.center();
      const A = new te(n.geometry, n.material), z = 8.6;
      A.rotateX(Math.PI / 2), A.scale.set(-z, z, z), t.add(A);
    }), D(t);
  });
class cj extends jN {
  home;
  lookingAtSomething;
  color;
  constructor(M, D) {
    super(), this.home = M, this.lookAt(M), this.lookingAtSomething = !1, this.color = D, this.position.setY(5);
  }
  async init() {
    return this.add(await sj(rj, this.color)), this;
  }
  animation(M, D) {
    const e = new YD();
    e.lookAt(this.lookingAtSomething ? D : this.home), this.quaternion.slerp(e.quaternion, 10 * M);
  }
}
class Ae {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200;
  }
  // Virtual base class method to overwrite and implement in subclasses
  //	- t [0 .. 1]
  getPoint() {
    return console.warn("THREE.Curve: .getPoint() not implemented."), null;
  }
  // Get point at relative position in curve according to arc length
  // - u [0 .. 1]
  getPointAt(M, D) {
    const e = this.getUtoTmapping(M);
    return this.getPoint(e, D);
  }
  // Get sequence of points using getPoint( t )
  getPoints(M = 5) {
    const D = [];
    for (let e = 0; e <= M; e++)
      D.push(this.getPoint(e / M));
    return D;
  }
  // Get sequence of points using getPointAt( u )
  getSpacedPoints(M = 5) {
    const D = [];
    for (let e = 0; e <= M; e++)
      D.push(this.getPointAt(e / M));
    return D;
  }
  // Get total curve arc length
  getLength() {
    const M = this.getLengths();
    return M[M.length - 1];
  }
  // Get list of cumulative segment lengths
  getLengths(M = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === M + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const D = [];
    let e, t = this.getPoint(0), i = 0;
    D.push(0);
    for (let n = 1; n <= M; n++)
      e = this.getPoint(n / M), i += e.distanceTo(t), D.push(i), t = e;
    return this.cacheArcLengths = D, D;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
  getUtoTmapping(M, D) {
    const e = this.getLengths();
    let t = 0;
    const i = e.length;
    let n;
    D ? n = D : n = M * e[i - 1];
    let A = 0, z = i - 1, I;
    for (; A <= z; )
      if (t = Math.floor(A + (z - A) / 2), I = e[t] - n, I < 0)
        A = t + 1;
      else if (I > 0)
        z = t - 1;
      else {
        z = t;
        break;
      }
    if (t = z, e[t] === n)
      return t / (i - 1);
    const T = e[t], g = e[t + 1] - T, s = (n - T) / g;
    return (t + s) / (i - 1);
  }
  // Returns a unit vector tangent at t
  // In case any sub curve does not implement its tangent derivation,
  // 2 points a small delta apart will be used to find its gradient
  // which seems to give a reasonable approximation
  getTangent(M, D) {
    let t = M - 1e-4, i = M + 1e-4;
    t < 0 && (t = 0), i > 1 && (i = 1);
    const n = this.getPoint(t), A = this.getPoint(i), z = D || (n.isVector2 ? new rM() : new Y());
    return z.copy(A).sub(n).normalize(), z;
  }
  getTangentAt(M, D) {
    const e = this.getUtoTmapping(M);
    return this.getTangent(e, D);
  }
  computeFrenetFrames(M, D) {
    const e = new Y(), t = [], i = [], n = [], A = new Y(), z = new ID();
    for (let s = 0; s <= M; s++) {
      const a = s / M;
      t[s] = this.getTangentAt(a, new Y());
    }
    i[0] = new Y(), n[0] = new Y();
    let I = Number.MAX_VALUE;
    const T = Math.abs(t[0].x), u = Math.abs(t[0].y), g = Math.abs(t[0].z);
    T <= I && (I = T, e.set(1, 0, 0)), u <= I && (I = u, e.set(0, 1, 0)), g <= I && e.set(0, 0, 1), A.crossVectors(t[0], e).normalize(), i[0].crossVectors(t[0], A), n[0].crossVectors(t[0], i[0]);
    for (let s = 1; s <= M; s++) {
      if (i[s] = i[s - 1].clone(), n[s] = n[s - 1].clone(), A.crossVectors(t[s - 1], t[s]), A.length() > Number.EPSILON) {
        A.normalize();
        const a = Math.acos(aD(t[s - 1].dot(t[s]), -1, 1));
        i[s].applyMatrix4(z.makeRotationAxis(A, a));
      }
      n[s].crossVectors(t[s], i[s]);
    }
    if (D === !0) {
      let s = Math.acos(aD(i[0].dot(i[M]), -1, 1));
      s /= M, t[0].dot(A.crossVectors(i[0], i[M])) > 0 && (s = -s);
      for (let a = 1; a <= M; a++)
        i[a].applyMatrix4(z.makeRotationAxis(t[a], s * a)), n[a].crossVectors(t[a], i[a]);
    }
    return {
      tangents: t,
      normals: i,
      binormals: n
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(M) {
    return this.arcLengthDivisions = M.arcLengthDivisions, this;
  }
  toJSON() {
    const M = {
      metadata: {
        version: 4.6,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return M.arcLengthDivisions = this.arcLengthDivisions, M.type = this.type, M;
  }
  fromJSON(M) {
    return this.arcLengthDivisions = M.arcLengthDivisions, this;
  }
}
class Pn extends Ae {
  constructor(M = 0, D = 0, e = 1, t = 1, i = 0, n = Math.PI * 2, A = !1, z = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = M, this.aY = D, this.xRadius = e, this.yRadius = t, this.aStartAngle = i, this.aEndAngle = n, this.aClockwise = A, this.aRotation = z;
  }
  getPoint(M, D) {
    const e = D || new rM(), t = Math.PI * 2;
    let i = this.aEndAngle - this.aStartAngle;
    const n = Math.abs(i) < Number.EPSILON;
    for (; i < 0; )
      i += t;
    for (; i > t; )
      i -= t;
    i < Number.EPSILON && (n ? i = 0 : i = t), this.aClockwise === !0 && !n && (i === t ? i = -t : i = i - t);
    const A = this.aStartAngle + M * i;
    let z = this.aX + this.xRadius * Math.cos(A), I = this.aY + this.yRadius * Math.sin(A);
    if (this.aRotation !== 0) {
      const T = Math.cos(this.aRotation), u = Math.sin(this.aRotation), g = z - this.aX, s = I - this.aY;
      z = g * T - s * u + this.aX, I = g * u + s * T + this.aY;
    }
    return e.set(z, I);
  }
  copy(M) {
    return super.copy(M), this.aX = M.aX, this.aY = M.aY, this.xRadius = M.xRadius, this.yRadius = M.yRadius, this.aStartAngle = M.aStartAngle, this.aEndAngle = M.aEndAngle, this.aClockwise = M.aClockwise, this.aRotation = M.aRotation, this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.aX = this.aX, M.aY = this.aY, M.xRadius = this.xRadius, M.yRadius = this.yRadius, M.aStartAngle = this.aStartAngle, M.aEndAngle = this.aEndAngle, M.aClockwise = this.aClockwise, M.aRotation = this.aRotation, M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.aX = M.aX, this.aY = M.aY, this.xRadius = M.xRadius, this.yRadius = M.yRadius, this.aStartAngle = M.aStartAngle, this.aEndAngle = M.aEndAngle, this.aClockwise = M.aClockwise, this.aRotation = M.aRotation, this;
  }
}
class aj extends Pn {
  constructor(M, D, e, t, i, n) {
    super(M, D, e, e, t, i, n), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Fn() {
  let N = 0, M = 0, D = 0, e = 0;
  function t(i, n, A, z) {
    N = i, M = A, D = -3 * i + 3 * n - 2 * A - z, e = 2 * i - 2 * n + A + z;
  }
  return {
    initCatmullRom: function(i, n, A, z, I) {
      t(n, A, I * (A - i), I * (z - n));
    },
    initNonuniformCatmullRom: function(i, n, A, z, I, T, u) {
      let g = (n - i) / I - (A - i) / (I + T) + (A - n) / T, s = (A - n) / T - (z - n) / (T + u) + (z - A) / u;
      g *= T, s *= T, t(n, A, g, s);
    },
    calc: function(i) {
      const n = i * i, A = n * i;
      return N + M * i + D * n + e * A;
    }
  };
}
const Ui = /* @__PURE__ */ new Y(), gn = /* @__PURE__ */ new Fn(), sn = /* @__PURE__ */ new Fn(), rn = /* @__PURE__ */ new Fn();
class oj extends Ae {
  constructor(M = [], D = !1, e = "centripetal", t = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = M, this.closed = D, this.curveType = e, this.tension = t;
  }
  getPoint(M, D = new Y()) {
    const e = D, t = this.points, i = t.length, n = (i - (this.closed ? 0 : 1)) * M;
    let A = Math.floor(n), z = n - A;
    this.closed ? A += A > 0 ? 0 : (Math.floor(Math.abs(A) / i) + 1) * i : z === 0 && A === i - 1 && (A = i - 2, z = 1);
    let I, T;
    this.closed || A > 0 ? I = t[(A - 1) % i] : (Ui.subVectors(t[0], t[1]).add(t[0]), I = Ui);
    const u = t[A % i], g = t[(A + 1) % i];
    if (this.closed || A + 2 < i ? T = t[(A + 2) % i] : (Ui.subVectors(t[i - 1], t[i - 2]).add(t[i - 1]), T = Ui), this.curveType === "centripetal" || this.curveType === "chordal") {
      const s = this.curveType === "chordal" ? 0.5 : 0.25;
      let a = Math.pow(I.distanceToSquared(u), s), o = Math.pow(u.distanceToSquared(g), s), c = Math.pow(g.distanceToSquared(T), s);
      o < 1e-4 && (o = 1), a < 1e-4 && (a = o), c < 1e-4 && (c = o), gn.initNonuniformCatmullRom(I.x, u.x, g.x, T.x, a, o, c), sn.initNonuniformCatmullRom(I.y, u.y, g.y, T.y, a, o, c), rn.initNonuniformCatmullRom(I.z, u.z, g.z, T.z, a, o, c);
    } else
      this.curveType === "catmullrom" && (gn.initCatmullRom(I.x, u.x, g.x, T.x, this.tension), sn.initCatmullRom(I.y, u.y, g.y, T.y, this.tension), rn.initCatmullRom(I.z, u.z, g.z, T.z, this.tension));
    return e.set(
      gn.calc(z),
      sn.calc(z),
      rn.calc(z)
    ), e;
  }
  copy(M) {
    super.copy(M), this.points = [];
    for (let D = 0, e = M.points.length; D < e; D++) {
      const t = M.points[D];
      this.points.push(t.clone());
    }
    return this.closed = M.closed, this.curveType = M.curveType, this.tension = M.tension, this;
  }
  toJSON() {
    const M = super.toJSON();
    M.points = [];
    for (let D = 0, e = this.points.length; D < e; D++) {
      const t = this.points[D];
      M.points.push(t.toArray());
    }
    return M.closed = this.closed, M.curveType = this.curveType, M.tension = this.tension, M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.points = [];
    for (let D = 0, e = M.points.length; D < e; D++) {
      const t = M.points[D];
      this.points.push(new Y().fromArray(t));
    }
    return this.closed = M.closed, this.curveType = M.curveType, this.tension = M.tension, this;
  }
}
function IT(N, M, D, e, t) {
  const i = (e - M) * 0.5, n = (t - D) * 0.5, A = N * N, z = N * A;
  return (2 * D - 2 * e + i + n) * z + (-3 * D + 3 * e - 2 * i - n) * A + i * N + D;
}
function yj(N, M) {
  const D = 1 - N;
  return D * D * M;
}
function jj(N, M) {
  return 2 * (1 - N) * N * M;
}
function Cj(N, M) {
  return N * N * M;
}
function wN(N, M, D, e) {
  return yj(N, M) + jj(N, D) + Cj(N, e);
}
function Lj(N, M) {
  const D = 1 - N;
  return D * D * D * M;
}
function wj(N, M) {
  const D = 1 - N;
  return 3 * D * D * N * M;
}
function Oj(N, M) {
  return 3 * (1 - N) * N * N * M;
}
function xj(N, M) {
  return N * N * N * M;
}
function ON(N, M, D, e, t) {
  return Lj(N, M) + wj(N, D) + Oj(N, e) + xj(N, t);
}
class ru extends Ae {
  constructor(M = new rM(), D = new rM(), e = new rM(), t = new rM()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = M, this.v1 = D, this.v2 = e, this.v3 = t;
  }
  getPoint(M, D = new rM()) {
    const e = D, t = this.v0, i = this.v1, n = this.v2, A = this.v3;
    return e.set(
      ON(M, t.x, i.x, n.x, A.x),
      ON(M, t.y, i.y, n.y, A.y)
    ), e;
  }
  copy(M) {
    return super.copy(M), this.v0.copy(M.v0), this.v1.copy(M.v1), this.v2.copy(M.v2), this.v3.copy(M.v3), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v0 = this.v0.toArray(), M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M.v3 = this.v3.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v0.fromArray(M.v0), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this.v3.fromArray(M.v3), this;
  }
}
class Ej extends Ae {
  constructor(M = new Y(), D = new Y(), e = new Y(), t = new Y()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = M, this.v1 = D, this.v2 = e, this.v3 = t;
  }
  getPoint(M, D = new Y()) {
    const e = D, t = this.v0, i = this.v1, n = this.v2, A = this.v3;
    return e.set(
      ON(M, t.x, i.x, n.x, A.x),
      ON(M, t.y, i.y, n.y, A.y),
      ON(M, t.z, i.z, n.z, A.z)
    ), e;
  }
  copy(M) {
    return super.copy(M), this.v0.copy(M.v0), this.v1.copy(M.v1), this.v2.copy(M.v2), this.v3.copy(M.v3), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v0 = this.v0.toArray(), M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M.v3 = this.v3.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v0.fromArray(M.v0), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this.v3.fromArray(M.v3), this;
  }
}
class cu extends Ae {
  constructor(M = new rM(), D = new rM()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = M, this.v2 = D;
  }
  getPoint(M, D = new rM()) {
    const e = D;
    return M === 1 ? e.copy(this.v2) : (e.copy(this.v2).sub(this.v1), e.multiplyScalar(M).add(this.v1)), e;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(M, D) {
    return this.getPoint(M, D);
  }
  getTangent(M, D = new rM()) {
    return D.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(M, D) {
    return this.getTangent(M, D);
  }
  copy(M) {
    return super.copy(M), this.v1.copy(M.v1), this.v2.copy(M.v2), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this;
  }
}
class lj extends Ae {
  constructor(M = new Y(), D = new Y()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = M, this.v2 = D;
  }
  getPoint(M, D = new Y()) {
    const e = D;
    return M === 1 ? e.copy(this.v2) : (e.copy(this.v2).sub(this.v1), e.multiplyScalar(M).add(this.v1)), e;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(M, D) {
    return this.getPoint(M, D);
  }
  getTangent(M, D = new Y()) {
    return D.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(M, D) {
    return this.getTangent(M, D);
  }
  copy(M) {
    return super.copy(M), this.v1.copy(M.v1), this.v2.copy(M.v2), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this;
  }
}
class au extends Ae {
  constructor(M = new rM(), D = new rM(), e = new rM()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = M, this.v1 = D, this.v2 = e;
  }
  getPoint(M, D = new rM()) {
    const e = D, t = this.v0, i = this.v1, n = this.v2;
    return e.set(
      wN(M, t.x, i.x, n.x),
      wN(M, t.y, i.y, n.y)
    ), e;
  }
  copy(M) {
    return super.copy(M), this.v0.copy(M.v0), this.v1.copy(M.v1), this.v2.copy(M.v2), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v0 = this.v0.toArray(), M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v0.fromArray(M.v0), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this;
  }
}
class hj extends Ae {
  constructor(M = new Y(), D = new Y(), e = new Y()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = M, this.v1 = D, this.v2 = e;
  }
  getPoint(M, D = new Y()) {
    const e = D, t = this.v0, i = this.v1, n = this.v2;
    return e.set(
      wN(M, t.x, i.x, n.x),
      wN(M, t.y, i.y, n.y),
      wN(M, t.z, i.z, n.z)
    ), e;
  }
  copy(M) {
    return super.copy(M), this.v0.copy(M.v0), this.v1.copy(M.v1), this.v2.copy(M.v2), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.v0 = this.v0.toArray(), M.v1 = this.v1.toArray(), M.v2 = this.v2.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.v0.fromArray(M.v0), this.v1.fromArray(M.v1), this.v2.fromArray(M.v2), this;
  }
}
class ou extends Ae {
  constructor(M = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = M;
  }
  getPoint(M, D = new rM()) {
    const e = D, t = this.points, i = (t.length - 1) * M, n = Math.floor(i), A = i - n, z = t[n === 0 ? n : n - 1], I = t[n], T = t[n > t.length - 2 ? t.length - 1 : n + 1], u = t[n > t.length - 3 ? t.length - 1 : n + 2];
    return e.set(
      IT(A, z.x, I.x, T.x, u.x),
      IT(A, z.y, I.y, T.y, u.y)
    ), e;
  }
  copy(M) {
    super.copy(M), this.points = [];
    for (let D = 0, e = M.points.length; D < e; D++) {
      const t = M.points[D];
      this.points.push(t.clone());
    }
    return this;
  }
  toJSON() {
    const M = super.toJSON();
    M.points = [];
    for (let D = 0, e = this.points.length; D < e; D++) {
      const t = this.points[D];
      M.points.push(t.toArray());
    }
    return M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.points = [];
    for (let D = 0, e = M.points.length; D < e; D++) {
      const t = M.points[D];
      this.points.push(new rM().fromArray(t));
    }
    return this;
  }
}
const TT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArcCurve: aj,
  CatmullRomCurve3: oj,
  CubicBezierCurve: ru,
  CubicBezierCurve3: Ej,
  EllipseCurve: Pn,
  LineCurve: cu,
  LineCurve3: lj,
  QuadraticBezierCurve: au,
  QuadraticBezierCurve3: hj,
  SplineCurve: ou
}, Symbol.toStringTag, { value: "Module" }));
class dj extends Ae {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(M) {
    this.curves.push(M);
  }
  closePath() {
    const M = this.curves[0].getPoint(0), D = this.curves[this.curves.length - 1].getPoint(1);
    if (!M.equals(D)) {
      const e = M.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new TT[e](D, M));
    }
    return this;
  }
  // To get accurate point with reference to
  // entire path distance at time t,
  // following has to be done:
  // 1. Length of each sub path have to be known
  // 2. Locate and identify type of curve
  // 3. Get t for the curve
  // 4. Return curve.getPointAt(t')
  getPoint(M, D) {
    const e = M * this.getLength(), t = this.getCurveLengths();
    let i = 0;
    for (; i < t.length; ) {
      if (t[i] >= e) {
        const n = t[i] - e, A = this.curves[i], z = A.getLength(), I = z === 0 ? 0 : 1 - n / z;
        return A.getPointAt(I, D);
      }
      i++;
    }
    return null;
  }
  // We cannot use the default THREE.Curve getPoint() with getLength() because in
  // THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
  // getPoint() depends on getLength
  getLength() {
    const M = this.getCurveLengths();
    return M[M.length - 1];
  }
  // cacheLengths must be recalculated.
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  // Compute lengths and cache them
  // We cannot overwrite getLengths() because UtoT mapping uses it.
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
      return this.cacheLengths;
    const M = [];
    let D = 0;
    for (let e = 0, t = this.curves.length; e < t; e++)
      D += this.curves[e].getLength(), M.push(D);
    return this.cacheLengths = M, M;
  }
  getSpacedPoints(M = 40) {
    const D = [];
    for (let e = 0; e <= M; e++)
      D.push(this.getPoint(e / M));
    return this.autoClose && D.push(D[0]), D;
  }
  getPoints(M = 12) {
    const D = [];
    let e;
    for (let t = 0, i = this.curves; t < i.length; t++) {
      const n = i[t], A = n.isEllipseCurve ? M * 2 : n.isLineCurve || n.isLineCurve3 ? 1 : n.isSplineCurve ? M * n.points.length : M, z = n.getPoints(A);
      for (let I = 0; I < z.length; I++) {
        const T = z[I];
        e && e.equals(T) || (D.push(T), e = T);
      }
    }
    return this.autoClose && D.length > 1 && !D[D.length - 1].equals(D[0]) && D.push(D[0]), D;
  }
  copy(M) {
    super.copy(M), this.curves = [];
    for (let D = 0, e = M.curves.length; D < e; D++) {
      const t = M.curves[D];
      this.curves.push(t.clone());
    }
    return this.autoClose = M.autoClose, this;
  }
  toJSON() {
    const M = super.toJSON();
    M.autoClose = this.autoClose, M.curves = [];
    for (let D = 0, e = this.curves.length; D < e; D++) {
      const t = this.curves[D];
      M.curves.push(t.toJSON());
    }
    return M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.autoClose = M.autoClose, this.curves = [];
    for (let D = 0, e = M.curves.length; D < e; D++) {
      const t = M.curves[D];
      this.curves.push(new TT[t.type]().fromJSON(t));
    }
    return this;
  }
}
class uT extends dj {
  constructor(M) {
    super(), this.type = "Path", this.currentPoint = new rM(), M && this.setFromPoints(M);
  }
  setFromPoints(M) {
    this.moveTo(M[0].x, M[0].y);
    for (let D = 1, e = M.length; D < e; D++)
      this.lineTo(M[D].x, M[D].y);
    return this;
  }
  moveTo(M, D) {
    return this.currentPoint.set(M, D), this;
  }
  lineTo(M, D) {
    const e = new cu(this.currentPoint.clone(), new rM(M, D));
    return this.curves.push(e), this.currentPoint.set(M, D), this;
  }
  quadraticCurveTo(M, D, e, t) {
    const i = new au(
      this.currentPoint.clone(),
      new rM(M, D),
      new rM(e, t)
    );
    return this.curves.push(i), this.currentPoint.set(e, t), this;
  }
  bezierCurveTo(M, D, e, t, i, n) {
    const A = new ru(
      this.currentPoint.clone(),
      new rM(M, D),
      new rM(e, t),
      new rM(i, n)
    );
    return this.curves.push(A), this.currentPoint.set(i, n), this;
  }
  splineThru(M) {
    const D = [this.currentPoint.clone()].concat(M), e = new ou(D);
    return this.curves.push(e), this.currentPoint.copy(M[M.length - 1]), this;
  }
  arc(M, D, e, t, i, n) {
    const A = this.currentPoint.x, z = this.currentPoint.y;
    return this.absarc(
      M + A,
      D + z,
      e,
      t,
      i,
      n
    ), this;
  }
  absarc(M, D, e, t, i, n) {
    return this.absellipse(M, D, e, e, t, i, n), this;
  }
  ellipse(M, D, e, t, i, n, A, z) {
    const I = this.currentPoint.x, T = this.currentPoint.y;
    return this.absellipse(M + I, D + T, e, t, i, n, A, z), this;
  }
  absellipse(M, D, e, t, i, n, A, z) {
    const I = new Pn(M, D, e, t, i, n, A, z);
    if (this.curves.length > 0) {
      const u = I.getPoint(0);
      u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
    }
    this.curves.push(I);
    const T = I.getPoint(1);
    return this.currentPoint.copy(T), this;
  }
  copy(M) {
    return super.copy(M), this.currentPoint.copy(M.currentPoint), this;
  }
  toJSON() {
    const M = super.toJSON();
    return M.currentPoint = this.currentPoint.toArray(), M;
  }
  fromJSON(M) {
    return super.fromJSON(M), this.currentPoint.fromArray(M.currentPoint), this;
  }
}
class yu extends uT {
  constructor(M) {
    super(M), this.uuid = eN(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(M) {
    const D = [];
    for (let e = 0, t = this.holes.length; e < t; e++)
      D[e] = this.holes[e].getPoints(M);
    return D;
  }
  // get points of shape and holes (keypoints based on segments parameter)
  extractPoints(M) {
    return {
      shape: this.getPoints(M),
      holes: this.getPointsHoles(M)
    };
  }
  copy(M) {
    super.copy(M), this.holes = [];
    for (let D = 0, e = M.holes.length; D < e; D++) {
      const t = M.holes[D];
      this.holes.push(t.clone());
    }
    return this;
  }
  toJSON() {
    const M = super.toJSON();
    M.uuid = this.uuid, M.holes = [];
    for (let D = 0, e = this.holes.length; D < e; D++) {
      const t = this.holes[D];
      M.holes.push(t.toJSON());
    }
    return M;
  }
  fromJSON(M) {
    super.fromJSON(M), this.uuid = M.uuid, this.holes = [];
    for (let D = 0, e = M.holes.length; D < e; D++) {
      const t = M.holes[D];
      this.holes.push(new uT().fromJSON(t));
    }
    return this;
  }
}
const vj = {
  triangulate: function(N, M, D = 2) {
    const e = M && M.length, t = e ? M[0] * D : N.length;
    let i = ju(N, 0, t, D, !0);
    const n = [];
    if (!i || i.next === i.prev)
      return n;
    let A, z, I, T, u, g, s;
    if (e && (i = mj(N, M, i, D)), N.length > 80 * D) {
      A = I = N[0], z = T = N[1];
      for (let a = D; a < t; a += D)
        u = N[a], g = N[a + 1], u < A && (A = u), g < z && (z = g), u > I && (I = u), g > T && (T = g);
      s = Math.max(I - A, T - z), s = s !== 0 ? 32767 / s : 0;
    }
    return dN(i, n, D, A, z, s, 0), n;
  }
};
function ju(N, M, D, e, t) {
  let i, n;
  if (t === Bj(N, M, D, e) > 0)
    for (i = M; i < D; i += e)
      n = gT(i, N[i], N[i + 1], n);
  else
    for (i = D - e; i >= M; i -= e)
      n = gT(i, N[i], N[i + 1], n);
  return n && NA(n, n.next) && (pN(n), n = n.next), n;
}
function gt(N, M) {
  if (!N)
    return N;
  M || (M = N);
  let D = N, e;
  do
    if (e = !1, !D.steiner && (NA(D, D.next) || HM(D.prev, D, D.next) === 0)) {
      if (pN(D), D = M = D.prev, D === D.next)
        break;
      e = !0;
    } else
      D = D.next;
  while (e || D !== M);
  return M;
}
function dN(N, M, D, e, t, i, n) {
  if (!N)
    return;
  !n && i && _j(N, e, t, i);
  let A = N, z, I;
  for (; N.prev !== N.next; ) {
    if (z = N.prev, I = N.next, i ? Yj(N, e, t, i) : pj(N)) {
      M.push(z.i / D | 0), M.push(N.i / D | 0), M.push(I.i / D | 0), pN(N), N = I.next, A = I.next;
      continue;
    }
    if (N = I, N === A) {
      n ? n === 1 ? (N = Uj(gt(N), M, D), dN(N, M, D, e, t, i, 2)) : n === 2 && fj(N, M, D, e, t, i) : dN(gt(N), M, D, e, t, i, 1);
      break;
    }
  }
}
function pj(N) {
  const M = N.prev, D = N, e = N.next;
  if (HM(M, D, e) >= 0)
    return !1;
  const t = M.x, i = D.x, n = e.x, A = M.y, z = D.y, I = e.y, T = t < i ? t < n ? t : n : i < n ? i : n, u = A < z ? A < I ? A : I : z < I ? z : I, g = t > i ? t > n ? t : n : i > n ? i : n, s = A > z ? A > I ? A : I : z > I ? z : I;
  let a = e.next;
  for (; a !== M; ) {
    if (a.x >= T && a.x <= g && a.y >= u && a.y <= s && Bt(t, A, i, z, n, I, a.x, a.y) && HM(a.prev, a, a.next) >= 0)
      return !1;
    a = a.next;
  }
  return !0;
}
function Yj(N, M, D, e) {
  const t = N.prev, i = N, n = N.next;
  if (HM(t, i, n) >= 0)
    return !1;
  const A = t.x, z = i.x, I = n.x, T = t.y, u = i.y, g = n.y, s = A < z ? A < I ? A : I : z < I ? z : I, a = T < u ? T < g ? T : g : u < g ? u : g, o = A > z ? A > I ? A : I : z > I ? z : I, c = T > u ? T > g ? T : g : u > g ? u : g, r = pn(s, a, M, D, e), w = pn(o, c, M, D, e);
  let y = N.prevZ, j = N.nextZ;
  for (; y && y.z >= r && j && j.z <= w; ) {
    if (y.x >= s && y.x <= o && y.y >= a && y.y <= c && y !== t && y !== n && Bt(A, T, z, u, I, g, y.x, y.y) && HM(y.prev, y, y.next) >= 0 || (y = y.prevZ, j.x >= s && j.x <= o && j.y >= a && j.y <= c && j !== t && j !== n && Bt(A, T, z, u, I, g, j.x, j.y) && HM(j.prev, j, j.next) >= 0))
      return !1;
    j = j.nextZ;
  }
  for (; y && y.z >= r; ) {
    if (y.x >= s && y.x <= o && y.y >= a && y.y <= c && y !== t && y !== n && Bt(A, T, z, u, I, g, y.x, y.y) && HM(y.prev, y, y.next) >= 0)
      return !1;
    y = y.prevZ;
  }
  for (; j && j.z <= w; ) {
    if (j.x >= s && j.x <= o && j.y >= a && j.y <= c && j !== t && j !== n && Bt(A, T, z, u, I, g, j.x, j.y) && HM(j.prev, j, j.next) >= 0)
      return !1;
    j = j.nextZ;
  }
  return !0;
}
function Uj(N, M, D) {
  let e = N;
  do {
    const t = e.prev, i = e.next.next;
    !NA(t, i) && Cu(t, e, e.next, i) && vN(t, i) && vN(i, t) && (M.push(t.i / D | 0), M.push(e.i / D | 0), M.push(i.i / D | 0), pN(e), pN(e.next), e = N = i), e = e.next;
  } while (e !== N);
  return gt(e);
}
function fj(N, M, D, e, t, i) {
  let n = N;
  do {
    let A = n.next.next;
    for (; A !== n.prev; ) {
      if (n.i !== A.i && Rj(n, A)) {
        let z = Lu(n, A);
        n = gt(n, n.next), z = gt(z, z.next), dN(n, M, D, e, t, i, 0), dN(z, M, D, e, t, i, 0);
        return;
      }
      A = A.next;
    }
    n = n.next;
  } while (n !== N);
}
function mj(N, M, D, e) {
  const t = [];
  let i, n, A, z, I;
  for (i = 0, n = M.length; i < n; i++)
    A = M[i] * e, z = i < n - 1 ? M[i + 1] * e : N.length, I = ju(N, A, z, e, !1), I === I.next && (I.steiner = !0), t.push(Kj(I));
  for (t.sort(Qj), i = 0; i < t.length; i++)
    D = Sj(t[i], D);
  return D;
}
function Qj(N, M) {
  return N.x - M.x;
}
function Sj(N, M) {
  const D = kj(N, M);
  if (!D)
    return M;
  const e = Lu(D, N);
  return gt(e, e.next), gt(D, D.next);
}
function kj(N, M) {
  let D = M, e = -1 / 0, t;
  const i = N.x, n = N.y;
  do {
    if (n <= D.y && n >= D.next.y && D.next.y !== D.y) {
      const g = D.x + (n - D.y) * (D.next.x - D.x) / (D.next.y - D.y);
      if (g <= i && g > e && (e = g, t = D.x < D.next.x ? D : D.next, g === i))
        return t;
    }
    D = D.next;
  } while (D !== M);
  if (!t)
    return null;
  const A = t, z = t.x, I = t.y;
  let T = 1 / 0, u;
  D = t;
  do
    i >= D.x && D.x >= z && i !== D.x && Bt(n < I ? i : e, n, z, I, n < I ? e : i, n, D.x, D.y) && (u = Math.abs(n - D.y) / (i - D.x), vN(D, N) && (u < T || u === T && (D.x > t.x || D.x === t.x && Zj(t, D))) && (t = D, T = u)), D = D.next;
  while (D !== A);
  return t;
}
function Zj(N, M) {
  return HM(N.prev, N, M.prev) < 0 && HM(M.next, N, N.next) < 0;
}
function _j(N, M, D, e) {
  let t = N;
  do
    t.z === 0 && (t.z = pn(t.x, t.y, M, D, e)), t.prevZ = t.prev, t.nextZ = t.next, t = t.next;
  while (t !== N);
  t.prevZ.nextZ = null, t.prevZ = null, bj(t);
}
function bj(N) {
  let M, D, e, t, i, n, A, z, I = 1;
  do {
    for (D = N, N = null, i = null, n = 0; D; ) {
      for (n++, e = D, A = 0, M = 0; M < I && (A++, e = e.nextZ, !!e); M++)
        ;
      for (z = I; A > 0 || z > 0 && e; )
        A !== 0 && (z === 0 || !e || D.z <= e.z) ? (t = D, D = D.nextZ, A--) : (t = e, e = e.nextZ, z--), i ? i.nextZ = t : N = t, t.prevZ = i, i = t;
      D = e;
    }
    i.nextZ = null, I *= 2;
  } while (n > 1);
  return N;
}
function pn(N, M, D, e, t) {
  return N = (N - D) * t | 0, M = (M - e) * t | 0, N = (N | N << 8) & 16711935, N = (N | N << 4) & 252645135, N = (N | N << 2) & 858993459, N = (N | N << 1) & 1431655765, M = (M | M << 8) & 16711935, M = (M | M << 4) & 252645135, M = (M | M << 2) & 858993459, M = (M | M << 1) & 1431655765, N | M << 1;
}
function Kj(N) {
  let M = N, D = N;
  do
    (M.x < D.x || M.x === D.x && M.y < D.y) && (D = M), M = M.next;
  while (M !== N);
  return D;
}
function Bt(N, M, D, e, t, i, n, A) {
  return (t - n) * (M - A) >= (N - n) * (i - A) && (N - n) * (e - A) >= (D - n) * (M - A) && (D - n) * (i - A) >= (t - n) * (e - A);
}
function Rj(N, M) {
  return N.next.i !== M.i && N.prev.i !== M.i && !Pj(N, M) && // dones't intersect other edges
  (vN(N, M) && vN(M, N) && Fj(N, M) && // locally visible
  (HM(N.prev, N, M.prev) || HM(N, M.prev, M)) || // does not create opposite-facing sectors
  NA(N, M) && HM(N.prev, N, N.next) > 0 && HM(M.prev, M, M.next) > 0);
}
function HM(N, M, D) {
  return (M.y - N.y) * (D.x - M.x) - (M.x - N.x) * (D.y - M.y);
}
function NA(N, M) {
  return N.x === M.x && N.y === M.y;
}
function Cu(N, M, D, e) {
  const t = mi(HM(N, M, D)), i = mi(HM(N, M, e)), n = mi(HM(D, e, N)), A = mi(HM(D, e, M));
  return !!(t !== i && n !== A || t === 0 && fi(N, D, M) || i === 0 && fi(N, e, M) || n === 0 && fi(D, N, e) || A === 0 && fi(D, M, e));
}
function fi(N, M, D) {
  return M.x <= Math.max(N.x, D.x) && M.x >= Math.min(N.x, D.x) && M.y <= Math.max(N.y, D.y) && M.y >= Math.min(N.y, D.y);
}
function mi(N) {
  return N > 0 ? 1 : N < 0 ? -1 : 0;
}
function Pj(N, M) {
  let D = N;
  do {
    if (D.i !== N.i && D.next.i !== N.i && D.i !== M.i && D.next.i !== M.i && Cu(D, D.next, N, M))
      return !0;
    D = D.next;
  } while (D !== N);
  return !1;
}
function vN(N, M) {
  return HM(N.prev, N, N.next) < 0 ? HM(N, M, N.next) >= 0 && HM(N, N.prev, M) >= 0 : HM(N, M, N.prev) < 0 || HM(N, N.next, M) < 0;
}
function Fj(N, M) {
  let D = N, e = !1;
  const t = (N.x + M.x) / 2, i = (N.y + M.y) / 2;
  do
    D.y > i != D.next.y > i && D.next.y !== D.y && t < (D.next.x - D.x) * (i - D.y) / (D.next.y - D.y) + D.x && (e = !e), D = D.next;
  while (D !== N);
  return e;
}
function Lu(N, M) {
  const D = new Yn(N.i, N.x, N.y), e = new Yn(M.i, M.x, M.y), t = N.next, i = M.prev;
  return N.next = M, M.prev = N, D.next = t, t.prev = D, e.next = D, D.prev = e, i.next = e, e.prev = i, e;
}
function gT(N, M, D, e) {
  const t = new Yn(N, M, D);
  return e ? (t.next = e.next, t.prev = e, e.next.prev = t, e.next = t) : (t.prev = t, t.next = t), t;
}
function pN(N) {
  N.next.prev = N.prev, N.prev.next = N.next, N.prevZ && (N.prevZ.nextZ = N.nextZ), N.nextZ && (N.nextZ.prevZ = N.prevZ);
}
function Yn(N, M, D) {
  this.i = N, this.x = M, this.y = D, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function Bj(N, M, D, e) {
  let t = 0;
  for (let i = M, n = D - e; i < D; i += e)
    t += (N[n] - N[i]) * (N[i + 1] + N[n + 1]), n = i;
  return t;
}
class xN {
  // calculate area of the contour polygon
  static area(M) {
    const D = M.length;
    let e = 0;
    for (let t = D - 1, i = 0; i < D; t = i++)
      e += M[t].x * M[i].y - M[i].x * M[t].y;
    return e * 0.5;
  }
  static isClockWise(M) {
    return xN.area(M) < 0;
  }
  static triangulateShape(M, D) {
    const e = [], t = [], i = [];
    sT(M), rT(e, M);
    let n = M.length;
    D.forEach(sT);
    for (let z = 0; z < D.length; z++)
      t.push(n), n += D[z].length, rT(e, D[z]);
    const A = vj.triangulate(e, t);
    for (let z = 0; z < A.length; z += 3)
      i.push(A.slice(z, z + 3));
    return i;
  }
}
function sT(N) {
  const M = N.length;
  M > 2 && N[M - 1].equals(N[0]) && N.pop();
}
function rT(N, M) {
  for (let D = 0; D < M.length; D++)
    N.push(M[D].x), N.push(M[D].y);
}
class Bn extends iN {
  constructor(M = new yu([new rM(0, 0.5), new rM(-0.5, -0.5), new rM(0.5, -0.5)]), D = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: M,
      curveSegments: D
    };
    const e = [], t = [], i = [], n = [];
    let A = 0, z = 0;
    if (Array.isArray(M) === !1)
      I(M);
    else
      for (let T = 0; T < M.length; T++)
        I(M[T]), this.addGroup(A, z, T), A += z, z = 0;
    this.setIndex(e), this.setAttribute("position", new ie(t, 3)), this.setAttribute("normal", new ie(i, 3)), this.setAttribute("uv", new ie(n, 2));
    function I(T) {
      const u = t.length / 3, g = T.extractPoints(D);
      let s = g.shape;
      const a = g.holes;
      xN.isClockWise(s) === !1 && (s = s.reverse());
      for (let c = 0, r = a.length; c < r; c++) {
        const w = a[c];
        xN.isClockWise(w) === !0 && (a[c] = w.reverse());
      }
      const o = xN.triangulateShape(s, a);
      for (let c = 0, r = a.length; c < r; c++) {
        const w = a[c];
        s = s.concat(w);
      }
      for (let c = 0, r = s.length; c < r; c++) {
        const w = s[c];
        t.push(w.x, w.y, 0), i.push(0, 0, 1), n.push(w.x, w.y);
      }
      for (let c = 0, r = o.length; c < r; c++) {
        const w = o[c], y = w[0] + u, j = w[1] + u, l = w[2] + u;
        e.push(y, j, l), z += 3;
      }
    }
  }
  copy(M) {
    return super.copy(M), this.parameters = Object.assign({}, M.parameters), this;
  }
  toJSON() {
    const M = super.toJSON(), D = this.parameters.shapes;
    return Vj(D, M);
  }
  static fromJSON(M, D) {
    const e = [];
    for (let t = 0, i = M.shapes.length; t < i; t++) {
      const n = D[M.shapes[t]];
      e.push(n);
    }
    return new Bn(e, M.curveSegments);
  }
}
function Vj(N, M) {
  if (M.shapes = [], Array.isArray(N))
    for (let D = 0, e = N.length; D < e; D++) {
      const t = N[D];
      M.shapes.push(t.uuid);
    }
  else
    M.shapes.push(N.uuid);
  return M;
}
function Gj(N, M, D) {
  const n = D / 2.2, A = new yu();
  return A.moveTo(0, 0 + D), A.lineTo(0, 0 + M - D), A.quadraticCurveTo(0, 0 + M, 0 + D, 0 + M), A.lineTo(N / 2 - 25 / 2 - n, 0 + M), A.quadraticCurveTo(
    N / 2 - 25 / 2,
    0 + M,
    N / 2 - 25 / 2,
    0 + M - n / 10
  ), A.quadraticCurveTo(
    N / 2 - 25 / 2,
    0 + M - n,
    N / 2 - 25 / 2 + n,
    0 + M - n
  ), A.lineTo(N / 2 + 25 / 2 - n, 0 + M - n), A.quadraticCurveTo(
    N / 2 + 25 / 2,
    0 + M - n,
    N / 2 + 25 / 2,
    0 + M - n / 10
  ), A.quadraticCurveTo(
    N / 2 + 25 / 2,
    0 + M,
    N / 2 + 25 / 2 + n,
    0 + M
  ), A.lineTo(0 + N - D, 0 + M), A.quadraticCurveTo(0 + N, 0 + M, 0 + N, 0 + M - D), A.lineTo(0 + N, 0 + D), A.quadraticCurveTo(0 + N, 0, 0 + N - D, 0), A.lineTo(0 + D, 0), A.quadraticCurveTo(0, 0, 0, 0 + D), new Bn(A);
}
const Hj = () => {
  const N = new cs();
  return N.color.set(3, 3, 3), N.position.set(0, 0, 300), N;
}, Wj = (N) => {
  const M = new RD(
    45,
    N
  );
  return M.position.set(0, 0, 200), M;
};
class Xj {
  screen;
  constructor(M) {
    this.screen = M;
  }
  init() {
    const M = document.createElement("video");
    M.src = this.screen, M.muted = !0, M.loop = !0, M.play();
    const D = new cy(M);
    return D.colorSpace = eD, D;
  }
}
class qj {
  screen;
  constructor(M) {
    this.screen = M;
  }
  init() {
    const D = new ws().load(this.screen);
    return D.colorSpace = eD, D;
  }
}
const $j = async (N, M, D) => {
  const e = new cj(N, M);
  await e.init();
  const t = 6, i = t * 9, n = t * 19.3, z = Gj(i, n, 8), I = D.init(), T = new XT({ map: I }), u = new te(z, T);
  return gj(u), u.translateZ(3.6), u.geometry.center(), e.add(u), e;
}, Jj = async (N, M, D, e, t) => {
  const i = new sy({ antialias: !0, alpha: !0 });
  i.setSize(N, M);
  const n = new ry(), A = Hj();
  n.add(A);
  const z = Wj(N / M), I = t.endsWith(".mp4") ? new Xj(t) : new qj(t), T = await $j(D, e, I);
  return n.add(T), {
    renderer: i,
    update: (u, g, s) => {
      T.lookingAtSomething = !s, T.animation(u, g), i.render(n, z);
    }
  };
};
var M0 = /* @__PURE__ */ wT("<style>"), D0 = /* @__PURE__ */ wT("<div class=mockup>");
function e0(N) {
  const [M, D] = cn(new Y(0, 0, N.distance)), [e, t] = cn(!0);
  let i, n, A;
  Yu(async () => {
    i = i;
    const s = new Y(N.rotation.x, N.rotation.y, N.rotation.z);
    ({
      renderer: A,
      update: n
    } = await Jj(i.clientWidth, i.clientHeight, s, N.bodyColor, N.screen)), A.setPixelRatio(window.devicePixelRatio), i.appendChild(A.domElement);
  });
  let z = 0;
  function I(s) {
    s *= 1e-3;
    const a = s - z;
    z = s, requestAnimationFrame(I), n?.(a, M(), e());
  }
  I(0);
  function T(s) {
    if (!i)
      return;
    const a = i.getBoundingClientRect();
    D(new Y(s.clientX - a.left - a.width / 2, -(s.clientY - a.top - a.height / 2), N.distance));
  }
  function u() {
    t(!1);
  }
  function g() {
    t(!0);
  }
  return [(() => {
    var s = M0();
    return OT(s, eg), s;
  })(), (() => {
    var s = D0();
    s.addEventListener("mouseleave", g), s.addEventListener("mouseenter", u), s.$$mousemove = T;
    var a = i;
    return typeof a == "function" ? bu(a, s) : i = s, Ki((o) => (o = N.levitate ? "levitate" : "none") != null ? s.style.setProperty("animation-name", o) : s.style.removeProperty("animation-name")), s;
  })()];
}
_u(["mousemove"]);
Mg("three-d-mockup", {
  screen: null,
  bodyColor: "white",
  distance: 500,
  rotation: {
    x: 250,
    y: 170,
    z: 500
  },
  levitate: !0
}, (N) => {
  if (!N.screen)
    throw new Error("The screen prop is required");
  return ku(e0, {
    get screen() {
      return N.screen;
    },
    get bodyColor() {
      return N.bodyColor;
    },
    get distance() {
      return N.distance;
    },
    get rotation() {
      return N.rotation;
    },
    get levitate() {
      return N.levitate;
    }
  });
});