// Created using https://github.com/krakenjs/zoid-demo
!(function (root, factory) {
    typeof exports === "object" && typeof module === "object" ? module.exports = factory() : typeof define === "function" && define.amd ? define("zoidlogin", [], factory) : typeof exports === "object" ? exports.zoidlogin = factory() : root.zoidlogin = factory();
}(typeof self !== "undefined" ? self : this, () => (function (modules) {
    const installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        const module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {},
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = !0;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function (exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter,
        });
    };
    __webpack_require__.n = function (module) {
        const getter = module && module.__esModule ? function () {
            return module.default;
        } : function () {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
}({
    "./node_modules/cross-domain-safe-weakmap/src/index.js": function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d({}, "WeakMap", () => weakmap_CrossDomainSafeWeakMap);
        const src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
        function safeIndexOf(collection, item) {
            for (let i = 0; i < collection.length; i++) {
                try {
                    if (collection[i] === item) return i;
                } catch (err) {}
            }
            return -1;
        }
        const defineProperty = Object.defineProperty; let counter = Date.now() % 1e9; var
            weakmap_CrossDomainSafeWeakMap = (function () {
                function CrossDomainSafeWeakMap() {
                    !(function (instance, Constructor) {
                        if (!(instance instanceof CrossDomainSafeWeakMap)) throw new TypeError("Cannot call a class as a function");
                    }(this));
                    counter += 1;
                    this.name = `__weakmap_${1e9 * Math.random() >>> 0}__${counter}`;
                    if (function () {
                        if (!window.WeakMap) return !1;
                        if (!window.Object.freeze) return !1;
                        try {
                            const testWeakMap = new window.WeakMap(); const
                                testKey = {};
                            window.Object.freeze(testKey);
                            testWeakMap.set(testKey, "__testvalue__");
                            return testWeakMap.get(testKey) === "__testvalue__";
                        } catch (err) {
                            return !1;
                        }
                    }()) {
                        try {
                            this.weakmap = new window.WeakMap();
                        } catch (err) {}
                    }
                    this.keys = [];
                    this.values = [];
                }
                CrossDomainSafeWeakMap.prototype._cleanupClosedWindows = function () {
                    for (let weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                        const value = keys[i];
                        if (Object(src.isWindow)(value) && Object(src.isWindowClosed)(value)) {
                            if (weakmap) {
                                try {
                                    weakmap.delete(value);
                                } catch (err) {}
                            }
                            keys.splice(i, 1);
                            this.values.splice(i, 1);
                            i -= 1;
                        }
                    }
                };
                CrossDomainSafeWeakMap.prototype.isSafeToReadWrite = function (key) {
                    if (Object(src.isWindow)(key)) return !1;
                    try {
                        key && key.self;
                        key && key[this.name];
                    } catch (err) {
                        return !1;
                    }
                    return !0;
                };
                CrossDomainSafeWeakMap.prototype.set = function (key, value) {
                    if (!key) throw new Error("WeakMap expected key");
                    const weakmap = this.weakmap;
                    if (weakmap) {
                        try {
                            weakmap.set(key, value);
                        } catch (err) {
                            delete this.weakmap;
                        }
                    }
                    if (this.isSafeToReadWrite(key)) {
                        const name = this.name; const
                            entry = key[name];
                        entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                            value: [key, value],
                            writable: !0,
                        });
                    } else {
                        this._cleanupClosedWindows();
                        const keys = this.keys; const values = this.values; const
                            index = safeIndexOf(keys, key);
                        if (index === -1) {
                            keys.push(key);
                            values.push(value);
                        } else values[index] = value;
                    }
                };
                CrossDomainSafeWeakMap.prototype.get = function (key) {
                    if (!key) throw new Error("WeakMap expected key");
                    const weakmap = this.weakmap;
                    if (weakmap) {
                        try {
                            if (weakmap.has(key)) return weakmap.get(key);
                        } catch (err) {
                            delete this.weakmap;
                        }
                    }
                    if (!this.isSafeToReadWrite(key)) {
                        this._cleanupClosedWindows();
                        const index = safeIndexOf(this.keys, key);
                        if (index === -1) return;
                        return this.values[index];
                    }
                    const entry = key[this.name];
                    if (entry && entry[0] === key) return entry[1];
                };
                CrossDomainSafeWeakMap.prototype.delete = function (key) {
                    if (!key) throw new Error("WeakMap expected key");
                    const weakmap = this.weakmap;
                    if (weakmap) {
                        try {
                            weakmap.delete(key);
                        } catch (err) {
                            delete this.weakmap;
                        }
                    }
                    if (this.isSafeToReadWrite(key)) {
                        const entry = key[this.name];
                        entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                    } else {
                        this._cleanupClosedWindows();
                        const keys = this.keys; const
                            index = safeIndexOf(keys, key);
                        if (index !== -1) {
                            keys.splice(index, 1);
                            this.values.splice(index, 1);
                        }
                    }
                };
                CrossDomainSafeWeakMap.prototype.has = function (key) {
                    if (!key) throw new Error("WeakMap expected key");
                    const weakmap = this.weakmap;
                    if (weakmap) {
                        try {
                            return weakmap.has(key);
                        } catch (err) {
                            delete this.weakmap;
                        }
                    }
                    if (this.isSafeToReadWrite(key)) {
                        const entry = key[this.name];
                        return !(!entry || entry[0] !== key);
                    }
                    this._cleanupClosedWindows();
                    return safeIndexOf(this.keys, key) !== -1;
                };
                return CrossDomainSafeWeakMap;
            }());
        __webpack_require__.d(__webpack_exports__, "a", () => weakmap_CrossDomainSafeWeakMap);
    },
    "./node_modules/cross-domain-utils/src/index.js": function (module, __webpack_exports__, __webpack_require__) {
        const __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
        __webpack_require__.d(__webpack_exports__, "findFrameByName", () => __WEBPACK_IMPORTED_MODULE_0__utils__.a);
        __webpack_require__.d(__webpack_exports__, "getActualDomain", () => __WEBPACK_IMPORTED_MODULE_0__utils__.b);
        __webpack_require__.d(__webpack_exports__, "getAllFramesInWindow", () => __WEBPACK_IMPORTED_MODULE_0__utils__.c);
        __webpack_require__.d(__webpack_exports__, "getAncestor", () => __WEBPACK_IMPORTED_MODULE_0__utils__.d);
        __webpack_require__.d(__webpack_exports__, "getDistanceFromTop", () => __WEBPACK_IMPORTED_MODULE_0__utils__.e);
        __webpack_require__.d(__webpack_exports__, "getDomain", () => __WEBPACK_IMPORTED_MODULE_0__utils__.f);
        __webpack_require__.d(__webpack_exports__, "getDomainFromUrl", () => __WEBPACK_IMPORTED_MODULE_0__utils__.g);
        __webpack_require__.d(__webpack_exports__, "getFrameByName", () => __WEBPACK_IMPORTED_MODULE_0__utils__.h);
        __webpack_require__.d(__webpack_exports__, "getFrames", () => __WEBPACK_IMPORTED_MODULE_0__utils__.i);
        __webpack_require__.d(__webpack_exports__, "getNthParentFromTop", () => __WEBPACK_IMPORTED_MODULE_0__utils__.j);
        __webpack_require__.d(__webpack_exports__, "getOpener", () => __WEBPACK_IMPORTED_MODULE_0__utils__.k);
        __webpack_require__.d(__webpack_exports__, "getParent", () => __WEBPACK_IMPORTED_MODULE_0__utils__.l);
        __webpack_require__.d(__webpack_exports__, "getTop", () => __WEBPACK_IMPORTED_MODULE_0__utils__.m);
        __webpack_require__.d(__webpack_exports__, "getUserAgent", () => __WEBPACK_IMPORTED_MODULE_0__utils__.n);
        __webpack_require__.d(__webpack_exports__, "isActuallySameDomain", () => __WEBPACK_IMPORTED_MODULE_0__utils__.o);
        __webpack_require__.d(__webpack_exports__, "isAncestor", () => __WEBPACK_IMPORTED_MODULE_0__utils__.p);
        __webpack_require__.d(__webpack_exports__, "isIframe", () => __WEBPACK_IMPORTED_MODULE_0__utils__.q);
        __webpack_require__.d(__webpack_exports__, "isOpener", () => __WEBPACK_IMPORTED_MODULE_0__utils__.r);
        __webpack_require__.d(__webpack_exports__, "isPopup", () => __WEBPACK_IMPORTED_MODULE_0__utils__.s);
        __webpack_require__.d(__webpack_exports__, "isSameDomain", () => __WEBPACK_IMPORTED_MODULE_0__utils__.t);
        __webpack_require__.d(__webpack_exports__, "isSameTopWindow", () => __WEBPACK_IMPORTED_MODULE_0__utils__.u);
        __webpack_require__.d(__webpack_exports__, "isTop", () => __WEBPACK_IMPORTED_MODULE_0__utils__.v);
        __webpack_require__.d(__webpack_exports__, "isWindow", () => __WEBPACK_IMPORTED_MODULE_0__utils__.w);
        __webpack_require__.d(__webpack_exports__, "isWindowClosed", () => __WEBPACK_IMPORTED_MODULE_0__utils__.x);
        __webpack_require__.d(__webpack_exports__, "linkFrameWindow", () => __WEBPACK_IMPORTED_MODULE_0__utils__.y);
        __webpack_require__.d(__webpack_exports__, "matchDomain", () => __WEBPACK_IMPORTED_MODULE_0__utils__.z);
        __webpack_require__.d(__webpack_exports__, "onCloseWindow", () => __WEBPACK_IMPORTED_MODULE_0__utils__.A);
        __webpack_require__.d(__webpack_exports__, "stringifyDomainPattern", () => __WEBPACK_IMPORTED_MODULE_0__utils__.B);
        const __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types__);
    },
    "./node_modules/cross-domain-utils/src/types.js": function (module, exports) {},
    "./node_modules/cross-domain-utils/src/utils.js": function (module, __webpack_exports__, __webpack_require__) {
        function isRegex(item) {
            return Object.prototype.toString.call(item) === "[object RegExp]";
        }
        __webpack_exports__.l = getParent;
        __webpack_exports__.k = getOpener;
        __webpack_exports__.b = getActualDomain;
        __webpack_exports__.f = getDomain;
        __webpack_exports__.o = isActuallySameDomain;
        __webpack_exports__.t = isSameDomain;
        __webpack_exports__.i = getFrames;
        __webpack_exports__.m = getTop;
        __webpack_exports__.c = getAllFramesInWindow;
        __webpack_exports__.v = function (win) {
            return win === getTop(win);
        };
        __webpack_exports__.x = isWindowClosed;
        __webpack_exports__.y = function (frame) {
            !(function () {
                for (let i = 0; i < iframeFrames.length; i++) {
                    if (isFrameWindowClosed(iframeFrames[i])) {
                        iframeFrames.splice(i, 1);
                        iframeWindows.splice(i, 1);
                    }
                }
                for (let _i8 = 0; _i8 < iframeWindows.length; _i8++) {
                    if (isWindowClosed(iframeWindows[_i8])) {
                        iframeFrames.splice(_i8, 1);
                        iframeWindows.splice(_i8, 1);
                    }
                }
            }());
            if (frame && frame.contentWindow) {
                try {
                    iframeWindows.push(frame.contentWindow);
                    iframeFrames.push(frame);
                } catch (err) {}
            }
        };
        __webpack_exports__.n = function (win) {
            return (win = win || window).navigator.mockUserAgent || win.navigator.userAgent;
        };
        __webpack_exports__.h = getFrameByName;
        __webpack_exports__.a = function (win, name) {
            let frame;
            return (frame = getFrameByName(win, name)) ? frame : (function findChildFrameByName(win, name) {
                const frame = getFrameByName(win, name);
                if (frame) return frame;
                for (let _i12 = 0, _getFrames4 = getFrames(win), _length10 = _getFrames4 == null ? 0 : _getFrames4.length; _i12 < _length10; _i12++) {
                    const namedFrame = findChildFrameByName(_getFrames4[_i12], name);
                    if (namedFrame) return namedFrame;
                }
            }(getTop(win) || win, name));
        };
        __webpack_exports__.r = function (parent, child) {
            return parent === getOpener(child);
        };
        __webpack_exports__.d = getAncestor;
        __webpack_exports__.p = function (parent, child) {
            const actualParent = getAncestor(child);
            if (actualParent) return actualParent === parent;
            if (child === parent) return !1;
            if (getTop(child) === child) return !1;
            for (let _i16 = 0, _getFrames8 = getFrames(parent), _length14 = _getFrames8 == null ? 0 : _getFrames8.length; _i16 < _length14; _i16++) if (_getFrames8[_i16] === child) return !0;
            return !1;
        };
        __webpack_exports__.s = function () {
            return Boolean(getOpener(window));
        };
        __webpack_exports__.q = function () {
            return Boolean(getParent(window));
        };
        __webpack_exports__.e = getDistanceFromTop;
        __webpack_exports__.j = function (win) {
            const n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
            return (function (win) {
                for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, parent = win, i = 0; i < n; i++) {
                    if (!parent) return;
                    parent = getParent(parent);
                }
                return parent;
            }(win, getDistanceFromTop(win) - n));
        };
        __webpack_exports__.u = function (win1, win2) {
            const top1 = getTop(win1) || win1; const
                top2 = getTop(win2) || win2;
            try {
                if (top1 && top2) return top1 === top2;
            } catch (err) {}
            const allFrames1 = getAllFramesInWindow(win1); const
                allFrames2 = getAllFramesInWindow(win2);
            if (anyMatch(allFrames1, allFrames2)) return !0;
            const opener1 = getOpener(top1); const
                opener2 = getOpener(top2);
            return !(opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2) || (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1),
            1));
        };
        __webpack_exports__.z = function matchDomain(pattern, origin) {
            if (typeof pattern === "string") {
                if (typeof origin === "string") return pattern === CONSTANTS.WILDCARD || origin === pattern;
                if (isRegex(origin)) return !1;
                if (Array.isArray(origin)) return !1;
            }
            return isRegex(pattern) ? isRegex(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern)) : !!Array.isArray(pattern) && (Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !isRegex(origin) && pattern.some(subpattern => matchDomain(subpattern, origin)));
        };
        __webpack_exports__.B = function (pattern) {
            return Array.isArray(pattern) ? `(${pattern.join(" | ")})` : isRegex(pattern) ? `RegExp(${pattern.toString()}` : pattern.toString();
        };
        __webpack_exports__.g = function (url) {
            return url.match(/^(https?|mock|file):\/\//) ? url.split("/").slice(0, 3).join("/") : getDomain();
        };
        __webpack_exports__.A = function (win, callback) {
            const delay = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3; let maxtime = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1 / 0; let
                timeout = void 0;
            !(function check() {
                if (isWindowClosed(win)) {
                    timeout && clearTimeout(timeout);
                    return callback();
                }
                if (maxtime <= 0) clearTimeout(timeout); else {
                    maxtime -= delay;
                    timeout = setTimeout(check, delay);
                }
            }());
            return {
                cancel() {
                    timeout && clearTimeout(timeout);
                },
            };
        };
        __webpack_exports__.w = function (obj) {
            try {
                if (obj === window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (Object.prototype.toString.call(obj) === "[object Window]") return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (window.Window && obj instanceof window.Window) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.self === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.parent === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                if (obj && obj.top === obj) return !0;
            } catch (err) {
                if (err && err.message === IE_WIN_ACCESS_ERROR) return !0;
            }
            try {
                obj && obj.__cross_domain_utils_window_check__;
            } catch (err) {
                return !0;
            }
            return !1;
        };
        var CONSTANTS = {
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            ABOUT_PROTOCOL: "about:",
            WILDCARD: "*",
        }; var
            IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
        function isAboutProtocol() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === CONSTANTS.ABOUT_PROTOCOL;
        }
        function getParent(win) {
            if (win) {
                try {
                    if (win.parent && win.parent !== win) return win.parent;
                } catch (err) {}
            }
        }
        function getOpener(win) {
            if (win && !getParent(win)) {
                try {
                    return win.opener;
                } catch (err) {}
            }
        }
        function canReadFromWindow(win) {
            try {
                win && win.location && win.location.href;
                return !0;
            } catch (err) {}
            return !1;
        }
        function getActualDomain(win) {
            const location = (win = win || window).location;
            if (!location) throw new Error("Can not read window location");
            const protocol = location.protocol;
            if (!protocol) throw new Error("Can not read window protocol");
            if (protocol === CONSTANTS.FILE_PROTOCOL) return `${CONSTANTS.FILE_PROTOCOL}//`;
            if (protocol === CONSTANTS.ABOUT_PROTOCOL) {
                const parent = getParent(win);
                return parent && canReadFromWindow(parent) ? getActualDomain(parent) : `${CONSTANTS.ABOUT_PROTOCOL}//`;
            }
            const host = location.host;
            if (!host) throw new Error("Can not read window host");
            return `${protocol}//${host}`;
        }
        function getDomain(win) {
            const domain = getActualDomain(win = win || window);
            return domain && win.mockDomain && win.mockDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) === 0 ? win.mockDomain : domain;
        }
        function isActuallySameDomain(win) {
            try {
                if (win === window) return !0;
            } catch (err) {}
            try {
                const desc = Object.getOwnPropertyDescriptor(win, "location");
                if (desc && !1 === desc.enumerable) return !1;
            } catch (err) {}
            try {
                if (isAboutProtocol(win) && canReadFromWindow(win)) return !0;
            } catch (err) {}
            try {
                if (getActualDomain(win) === getActualDomain(window)) return !0;
            } catch (err) {}
            return !1;
        }
        function isSameDomain(win) {
            if (!isActuallySameDomain(win)) return !1;
            try {
                if (win === window) return !0;
                if (isAboutProtocol(win) && canReadFromWindow(win)) return !0;
                if (getDomain(window) === getDomain(win)) return !0;
            } catch (err) {}
            return !1;
        }
        function isAncestorParent(parent, child) {
            if (!parent || !child) return !1;
            const childParent = getParent(child);
            return childParent ? childParent === parent : (function (win) {
                const result = [];
                try {
                    for (;win.parent !== win;) {
                        result.push(win.parent);
                        win = win.parent;
                    }
                } catch (err) {}
                return result;
            }(child)).indexOf(parent) !== -1;
        }
        function getFrames(win) {
            const result = []; let
                frames = void 0;
            try {
                frames = win.frames;
            } catch (err) {
                frames = win;
            }
            let len = void 0;
            try {
                len = frames.length;
            } catch (err) {}
            if (len === 0) return result;
            if (len) {
                for (let i = 0; i < len; i++) {
                    let frame = void 0;
                    try {
                        frame = frames[i];
                    } catch (err) {
                        continue;
                    }
                    result.push(frame);
                }
                return result;
            }
            for (let _i = 0; _i < 100; _i++) {
                let _frame = void 0;
                try {
                    _frame = frames[_i];
                } catch (err) {
                    return result;
                }
                if (!_frame) return result;
                result.push(_frame);
            }
            return result;
        }
        function getAllChildFrames(win) {
            for (var result = [], _i3 = 0, _getFrames2 = getFrames(win), _length2 = _getFrames2 == null ? 0 : _getFrames2.length; _i3 < _length2; _i3++) {
                const frame = _getFrames2[_i3];
                result.push(frame);
                for (let _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame), _length4 = _getAllChildFrames2 == null ? 0 : _getAllChildFrames2.length; _i5 < _length4; _i5++) {
                    const childFrame = _getAllChildFrames2[_i5];
                    result.push(childFrame);
                }
            }
            return result;
        }
        function getTop(win) {
            if (win) {
                try {
                    if (win.top) return win.top;
                } catch (err) {}
                if (getParent(win) === win) return win;
                try {
                    if (isAncestorParent(window, win) && window.top) return window.top;
                } catch (err) {}
                try {
                    if (isAncestorParent(win, window) && window.top) return window.top;
                } catch (err) {}
                for (let _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win), _length6 = _getAllChildFrames4 == null ? 0 : _getAllChildFrames4.length; _i7 < _length6; _i7++) {
                    const frame = _getAllChildFrames4[_i7];
                    try {
                        if (frame.top) return frame.top;
                    } catch (err) {}
                    if (getParent(frame) === frame) return frame;
                }
            }
        }
        function getAllFramesInWindow(win) {
            const top = getTop(win);
            if (!top) throw new Error("Can not determine top window");
            return [].concat(getAllChildFrames(top), [top]);
        }
        function isFrameWindowClosed(frame) {
            if (!frame.contentWindow) return !0;
            if (!frame.parentNode) return !0;
            const doc = frame.ownerDocument;
            return !(!doc || !doc.body || doc.body.contains(frame));
        }
        var iframeWindows = []; var
            iframeFrames = [];
        function isWindowClosed(win) {
            const allowMock = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            try {
                if (win === window) return !1;
            } catch (err) {
                return !0;
            }
            try {
                if (!win) return !0;
            } catch (err) {
                return !0;
            }
            try {
                if (win.closed) return !0;
            } catch (err) {
                return !err || err.message !== IE_WIN_ACCESS_ERROR;
            }
            if (allowMock && isSameDomain(win)) {
                try {
                    if (win.mockclosed) return !0;
                } catch (err) {}
            }
            try {
                if (!win.parent || !win.top) return !0;
            } catch (err) {}
            const iframeIndex = (function (collection, item) {
                for (let i = 0; i < collection.length; i++) {
                    try {
                        if (collection[i] === item) return i;
                    } catch (err) {}
                }
                return -1;
            }(iframeWindows, win));
            if (iframeIndex !== -1) {
                const frame = iframeFrames[iframeIndex];
                if (frame && isFrameWindowClosed(frame)) return !0;
            }
            return !1;
        }
        function getFrameByName(win, name) {
            for (var winFrames = getFrames(win), _i10 = 0, _length8 = winFrames == null ? 0 : winFrames.length; _i10 < _length8; _i10++) {
                const childFrame = winFrames[_i10];
                try {
                    if (isSameDomain(childFrame) && childFrame.name === name && winFrames.indexOf(childFrame) !== -1) return childFrame;
                } catch (err) {}
            }
            try {
                if (winFrames.indexOf(win.frames[name]) !== -1) return win.frames[name];
            } catch (err) {}
            try {
                if (winFrames.indexOf(win[name]) !== -1) return win[name];
            } catch (err) {}
        }
        function getAncestor(win) {
            return getOpener(win = win || window) || getParent(win) || void 0;
        }
        function anyMatch(collection1, collection2) {
            for (let _i18 = 0, _length16 = collection1 == null ? 0 : collection1.length; _i18 < _length16; _i18++) for (let item1 = collection1[_i18], _i20 = 0, _length18 = collection2 == null ? 0 : collection2.length; _i20 < _length18; _i20++) if (item1 === collection2[_i20]) return !0;
            return !1;
        }
        function getDistanceFromTop() {
            for (var distance = 0, parent = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window; parent;) (parent = getParent(parent)) && (distance += 1);
            return distance;
        }
    },
    "./node_modules/hi-base32/src/base32.js": function (module, exports, __webpack_require__) {
        (function (module) {
            let __WEBPACK_AMD_DEFINE_RESULT__; const
                _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                    return typeof obj;
                } : function (obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            !(function () {
                let root = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : {};
                !root.HI_BASE32_NO_NODE_JS && (typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.versions && process.versions.node && (root = window);
                const COMMON_JS = !root.HI_BASE32_NO_COMMON_JS && _typeof(module) === "object" && module.exports; const AMD = __webpack_require__("./node_modules/webpack/buildin/amd-options.js"); const BASE32_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split(""); const BASE32_DECODE_CHAR = {
                    A: 0,
                    B: 1,
                    C: 2,
                    D: 3,
                    E: 4,
                    F: 5,
                    G: 6,
                    H: 7,
                    I: 8,
                    J: 9,
                    K: 10,
                    L: 11,
                    M: 12,
                    N: 13,
                    O: 14,
                    P: 15,
                    Q: 16,
                    R: 17,
                    S: 18,
                    T: 19,
                    U: 20,
                    V: 21,
                    W: 22,
                    X: 23,
                    Y: 24,
                    Z: 25,
                    2: 26,
                    3: 27,
                    4: 28,
                    5: 29,
                    6: 30,
                    7: 31,
                }; const blocks = [0, 0, 0, 0, 0, 0, 0, 0]; const throwInvalidUtf8 = function (position, partial) {
                    partial.length > 10 && (partial = `...${partial.substr(-10)}`);
                    const err = new Error(`Decoded data is not valid UTF-8. Maybe try base32.decode.asBytes()? Partial data after reading ${position} bytes: ${partial} <-`);
                    err.position = position;
                    throw err;
                }; const decodeAsBytes = function (base32Str) {
                    if (!/^[A-Z2-7=]+$/.test(base32Str)) throw new Error("Invalid base32 characters");
                    for (var v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = (base32Str = base32Str.replace(/=/g, "")).length, i = 0, count = length >> 3 << 3; i < count;) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                        bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                        bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3);
                        bytes[index++] = 255 & (v7 << 5 | v8);
                    }
                    const remain = length - count;
                    if (remain === 2) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                    } else if (remain === 4) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                    } else if (remain === 5) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                        bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                    } else if (remain === 7) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        bytes[index++] = 255 & (v1 << 3 | v2 >>> 2);
                        bytes[index++] = 255 & (v2 << 6 | v3 << 1 | v4 >>> 4);
                        bytes[index++] = 255 & (v4 << 4 | v5 >>> 1);
                        bytes[index++] = 255 & (v5 << 7 | v6 << 2 | v7 >>> 3);
                    }
                    return bytes;
                }; const decode = function (base32Str, asciiOnly) {
                    if (!asciiOnly) {
                        return (function (bytes) {
                            for (var b, c, str = "", length = bytes.length, i = 0, followingChars = 0; i < length;) {
                                if ((b = bytes[i++]) <= 127) str += String.fromCharCode(b); else {
                                    if (b > 191 && b <= 223) {
                                        c = 31 & b;
                                        followingChars = 1;
                                    } else if (b <= 239) {
                                        c = 15 & b;
                                        followingChars = 2;
                                    } else if (b <= 247) {
                                        c = 7 & b;
                                        followingChars = 3;
                                    } else throwInvalidUtf8(i, str);
                                    for (let j = 0; j < followingChars; ++j) {
                                        ((b = bytes[i++]) < 128 || b > 191) && throwInvalidUtf8(i, str);
                                        c <<= 6;
                                        c += 63 & b;
                                    }
                                    c >= 55296 && c <= 57343 && throwInvalidUtf8(i, str);
                                    c > 1114111 && throwInvalidUtf8(i, str);
                                    if (c <= 65535) str += String.fromCharCode(c); else {
                                        c -= 65536;
                                        str += String.fromCharCode(55296 + (c >> 10));
                                        str += String.fromCharCode(56320 + (1023 & c));
                                    }
                                }
                            }
                            return str;
                        }(decodeAsBytes(base32Str)));
                    }
                    if (!/^[A-Z2-7=]+$/.test(base32Str)) throw new Error("Invalid base32 characters");
                    let v1; let v2; let v3; let v4; let v5; let v6; let v7; let v8; let str = ""; let
                        length = base32Str.indexOf("=");
                    length === -1 && (length = base32Str.length);
                    for (var i = 0, count = length >> 3 << 3; i < count;) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3)) + String.fromCharCode(255 & (v7 << 5 | v8));
                    }
                    const remain = length - count;
                    if (remain === 2) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2));
                    } else if (remain === 4) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4));
                    } else if (remain === 5) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1));
                    } else if (remain === 7) {
                        v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
                        str += String.fromCharCode(255 & (v1 << 3 | v2 >>> 2)) + String.fromCharCode(255 & (v2 << 6 | v3 << 1 | v4 >>> 4)) + String.fromCharCode(255 & (v4 << 4 | v5 >>> 1)) + String.fromCharCode(255 & (v5 << 7 | v6 << 2 | v7 >>> 3));
                    }
                    return str;
                }; const
                    exports = {
                        encode(input, asciiOnly) {
                            const notString = typeof input !== "string";
                            notString && input.constructor === ArrayBuffer && (input = new Uint8Array(input));
                            return notString ? (function (bytes) {
                                for (var v1, v2, v3, v4, v5, base32Str = "", length = bytes.length, i = 0, count = 5 * parseInt(length / 5); i < count;) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i++];
                                    v3 = bytes[i++];
                                    v4 = bytes[i++];
                                    v5 = bytes[i++];
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                                }
                                const remain = length - count;
                                if (remain === 1) {
                                    v1 = bytes[i];
                                    base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31]}======`;
                                } else if (remain === 2) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i];
                                    base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31]}====`;
                                } else if (remain === 3) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i++];
                                    v3 = bytes[i];
                                    base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31]}===`;
                                } else if (remain === 4) {
                                    v1 = bytes[i++];
                                    v2 = bytes[i++];
                                    v3 = bytes[i++];
                                    v4 = bytes[i];
                                    base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31]}=`;
                                }
                                return base32Str;
                            }(input)) : asciiOnly ? (function (str) {
                                for (var v1, v2, v3, v4, v5, base32Str = "", length = str.length, i = 0, count = 5 * parseInt(length / 5); i < count;) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i++);
                                    v3 = str.charCodeAt(i++);
                                    v4 = str.charCodeAt(i++);
                                    v5 = str.charCodeAt(i++);
                                    base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                                }
                                const remain = length - count;
                                if (remain === 1) {
                                    v1 = str.charCodeAt(i);
                                    base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31]}======`;
                                } else if (remain === 2) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i);
                                    base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31]}====`;
                                } else if (remain === 3) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i++);
                                    v3 = str.charCodeAt(i);
                                    base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31]}===`;
                                } else if (remain === 4) {
                                    v1 = str.charCodeAt(i++);
                                    v2 = str.charCodeAt(i++);
                                    v3 = str.charCodeAt(i++);
                                    v4 = str.charCodeAt(i);
                                    base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31]}=`;
                                }
                                return base32Str;
                            }(input)) : (function (str) {
                                let v1; let v2; let v3; let v4; let v5; let code; let i; let end = !1; let base32Str = ""; let index = 0; let start = 0; const
                                    length = str.length;
                                do {
                                    blocks[0] = blocks[5];
                                    blocks[1] = blocks[6];
                                    blocks[2] = blocks[7];
                                    for (i = start; index < length && i < 5; ++index) {
                                        if ((code = str.charCodeAt(index)) < 128) blocks[i++] = code; else if (code < 2048) {
                                            blocks[i++] = 192 | code >> 6;
                                            blocks[i++] = 128 | 63 & code;
                                        } else if (code < 55296 || code >= 57344) {
                                            blocks[i++] = 224 | code >> 12;
                                            blocks[i++] = 128 | code >> 6 & 63;
                                            blocks[i++] = 128 | 63 & code;
                                        } else {
                                            code = 65536 + ((1023 & code) << 10 | 1023 & str.charCodeAt(++index));
                                            blocks[i++] = 240 | code >> 18;
                                            blocks[i++] = 128 | code >> 12 & 63;
                                            blocks[i++] = 128 | code >> 6 & 63;
                                            blocks[i++] = 128 | 63 & code;
                                        }
                                    }
                                    start = i - 5;
                                    index === length && ++index;
                                    index > length && i < 6 && (end = !0);
                                    v1 = blocks[0];
                                    if (i > 4) {
                                        v2 = blocks[1];
                                        v3 = blocks[2];
                                        v4 = blocks[3];
                                        v5 = blocks[4];
                                        base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[31 & (v4 << 3 | v5 >>> 5)] + BASE32_ENCODE_CHAR[31 & v5];
                                    } else if (i === 1) base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31]}======`; else if (i === 2) {
                                        v2 = blocks[1];
                                        base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31]}====`;
                                    } else if (i === 3) {
                                        v2 = blocks[1];
                                        v3 = blocks[2];
                                        base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[v3 << 1 & 31]}===`;
                                    } else {
                                        v2 = blocks[1];
                                        v3 = blocks[2];
                                        v4 = blocks[3];
                                        base32Str += `${BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[31 & (v1 << 2 | v2 >>> 6)] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[31 & (v2 << 4 | v3 >>> 4)] + BASE32_ENCODE_CHAR[31 & (v3 << 1 | v4 >>> 7)] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31]}=`;
                                    }
                                } while (!end);
                                return base32Str;
                            }(input));
                        },
                        decode,
                    };
                decode.asBytes = decodeAsBytes;
                if (COMMON_JS) module.exports = exports; else {
                    root.base32 = exports;
                    AMD && void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                        return exports;
                    }.call(exports, __webpack_require__, exports, module)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
                }
            }());
        }).call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module));
    },
    "./node_modules/post-robot/src/bridge/index.js": function (module, __webpack_exports__, __webpack_require__) {
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0,
        });
        const src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"); const cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"); const conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"); const lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"); const
            global = __webpack_require__("./node_modules/post-robot/src/global.js");
        global.a.tunnelWindows = global.a.tunnelWindows || {};
        global.a.tunnelWindowId = 0;
        function deleteTunnelWindow(id) {
            try {
                global.a.tunnelWindows[id] && delete global.a.tunnelWindows[id].source;
            } catch (err) {}
            delete global.a.tunnelWindows[id];
        }
        global.a.openTunnelToParent = function (_ref2) {
            const name = _ref2.name; const source = _ref2.source; const canary = _ref2.canary; const sendMessage = _ref2.sendMessage; const
                parentWindow = Object(cross_domain_utils_src.getParent)(window);
            if (!parentWindow) throw new Error("No parent window found to open tunnel to");
            const id = (function (_ref) {
                const name = _ref.name; const source = _ref.source; const canary = _ref.canary; const
                    sendMessage = _ref.sendMessage;
                !(function () {
                    for (let tunnelWindows = global.a.tunnelWindows, _i2 = 0, _Object$keys2 = Object.keys(tunnelWindows), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                        const key = _Object$keys2[_i2]; const
                            tunnelWindow = tunnelWindows[key];
                        try {
                            Object(lib.j)(tunnelWindow.source);
                        } catch (err) {
                            deleteTunnelWindow(key);
                            continue;
                        }
                        Object(cross_domain_utils_src.isWindowClosed)(tunnelWindow.source) && deleteTunnelWindow(key);
                    }
                }());
                global.a.tunnelWindowId += 1;
                global.a.tunnelWindows[global.a.tunnelWindowId] = {
                    name,
                    source,
                    canary,
                    sendMessage,
                };
                return global.a.tunnelWindowId;
            }({
                name,
                source,
                canary,
                sendMessage,
            }));
            return global.a.send(parentWindow, conf.b.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                name,
                sendMessage() {
                    const tunnelWindow = (function (id) {
                        return global.a.tunnelWindows[id];
                    }(id));
                    try {
                        Object(lib.j)(tunnelWindow && tunnelWindow.source);
                    } catch (err) {
                        deleteTunnelWindow(id);
                        return;
                    }
                    if (tunnelWindow && tunnelWindow.source && !Object(cross_domain_utils_src.isWindowClosed)(tunnelWindow.source)) {
                        try {
                            tunnelWindow.canary();
                        } catch (err) {
                            return;
                        }
                        tunnelWindow.sendMessage.apply(this, arguments);
                    }
                },
            }, {
                domain: conf.b.WILDCARD,
            });
        };
        const cross_domain_safe_weakmap_src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js");
        function needsBridgeForBrowser() {
            return !!Object(cross_domain_utils_src.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i) || !conf.a.ALLOW_POSTMESSAGE_POPUP;
        }
        function needsBridgeForWin(win) {
            return !Object(cross_domain_utils_src.isSameTopWindow)(window, win);
        }
        function needsBridgeForDomain(domain, win) {
            if (domain) {
                if (Object(cross_domain_utils_src.getDomain)() !== Object(cross_domain_utils_src.getDomainFromUrl)(domain)) return !0;
            } else if (win && !Object(cross_domain_utils_src.isSameDomain)(win)) return !0;
            return !1;
        }
        function needsBridge(_ref) {
            const win = _ref.win; const
                domain = _ref.domain;
            return !(!needsBridgeForBrowser() || domain && !needsBridgeForDomain(domain, win) || win && !needsBridgeForWin(win));
        }
        function getBridgeName(domain) {
            const sanitizedDomain = (domain = domain || Object(cross_domain_utils_src.getDomainFromUrl)(domain)).replace(/[^a-zA-Z0-9]+/g, "_");
            return `${conf.b.BRIDGE_NAME_PREFIX}_${sanitizedDomain}`;
        }
        function isBridge() {
            return Boolean(window.name && window.name === getBridgeName(Object(cross_domain_utils_src.getDomain)()));
        }
        const documentBodyReady = new src.a(((resolve) => {
            if (window.document && window.document.body) return resolve(window.document.body);
            var interval = setInterval(() => {
                if (window.document && window.document.body) {
                    clearInterval(interval);
                    return resolve(window.document.body);
                }
            }, 10);
        }));
        global.a.remoteWindows = global.a.remoteWindows || new cross_domain_safe_weakmap_src.a();
        function registerRemoteWindow(win) {
            global.a.remoteWindows.set(win, {
                sendMessagePromise: new src.a(),
            });
        }
        function findRemoteWindow(win) {
            return global.a.remoteWindows.get(win);
        }
        function registerRemoteSendMessage(win, domain, sendMessage) {
            const remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found to register sendMessage to");
            const sendMessageWrapper = function (remoteWin, message, remoteDomain) {
                if (remoteWin !== win) throw new Error("Remote window does not match window");
                if (!Object(cross_domain_utils_src.matchDomain)(remoteDomain, domain)) throw new Error(`Remote domain ${remoteDomain} does not match domain ${domain}`);
                sendMessage(message);
            };
            remoteWindow.sendMessagePromise.resolve(sendMessageWrapper);
            remoteWindow.sendMessagePromise = src.a.resolve(sendMessageWrapper);
        }
        function rejectRemoteSendMessage(win, err) {
            const remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found on which to reject sendMessage");
            remoteWindow.sendMessagePromise.asyncReject(err);
        }
        function sendBridgeMessage(win, message, domain) {
            const messagingChild = Object(cross_domain_utils_src.isOpener)(window, win); const
                messagingParent = Object(cross_domain_utils_src.isOpener)(win, window);
            if (!messagingChild && !messagingParent) throw new Error("Can only send messages to and from parent and popup windows");
            const remoteWindow = findRemoteWindow(win);
            if (!remoteWindow) throw new Error("Window not found to send message to");
            return remoteWindow.sendMessagePromise.then(sendMessage => sendMessage(win, message, domain));
        }
        const awaitRemoteBridgeForWindow = Object(lib.r)(win => src.a.try(() => {
            for (let _i2 = 0, _getFrames2 = Object(cross_domain_utils_src.getFrames)(win), _length2 = _getFrames2 == null ? 0 : _getFrames2.length; _i2 < _length2; _i2++) {
                const frame = _getFrames2[_i2];
                try {
                    if (frame && frame !== window && Object(cross_domain_utils_src.isSameDomain)(frame) && frame[conf.b.WINDOW_PROPS.POSTROBOT]) return frame;
                } catch (err) {
                    continue;
                }
            }
            try {
                const _frame = Object(cross_domain_utils_src.getFrameByName)(win, getBridgeName(Object(cross_domain_utils_src.getDomain)()));
                if (!_frame) return;
                return Object(cross_domain_utils_src.isSameDomain)(_frame) && _frame[conf.b.WINDOW_PROPS.POSTROBOT] ? _frame : new src.a(((resolve) => {
                    let interval = void 0; let
                        timeout = void 0;
                    interval = setInterval(() => {
                        if (_frame && Object(cross_domain_utils_src.isSameDomain)(_frame) && _frame[conf.b.WINDOW_PROPS.POSTROBOT]) {
                            clearInterval(interval);
                            clearTimeout(timeout);
                            return resolve(_frame);
                        }
                    }, 100);
                    timeout = setTimeout(() => {
                        clearInterval(interval);
                        return resolve();
                    }, 2e3);
                }));
            } catch (err) {}
        }));
        function openTunnelToOpener() {
            return src.a.try(() => {
                const opener = Object(cross_domain_utils_src.getOpener)(window);
                if (opener && needsBridge({
                    win: opener,
                })) {
                    registerRemoteWindow(opener);
                    return awaitRemoteBridgeForWindow(opener).then(bridge => (bridge ? window.name ? bridge[conf.b.WINDOW_PROPS.POSTROBOT].openTunnelToParent({
                        name: window.name,
                        source: window,
                        canary() {},
                        sendMessage(message) {
                            try {
                                Object(lib.j)(window);
                            } catch (err) {
                                return;
                            }
                            if (window && !window.closed) {
                                try {
                                    global.a.receiveMessage({
                                        data: message,
                                        origin: this.origin,
                                        source: this.source,
                                    });
                                } catch (err) {
                                    src.a.reject(err);
                                }
                            }
                        },
                    }).then((_ref) => {
                        const source = _ref.source; const origin = _ref.origin; const
                            data = _ref.data;
                        if (source !== opener) throw new Error("Source does not match opener");
                        registerRemoteSendMessage(source, origin, data.sendMessage);
                    }).catch((err) => {
                        rejectRemoteSendMessage(opener, err);
                        throw err;
                    }) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: window does not have a name")) : rejectRemoteSendMessage(opener, new Error("Can not register with opener: no bridge found in opener"))));
                }
            });
        }
        global.a.bridges = global.a.bridges || {};
        global.a.bridgeFrames = global.a.bridgeFrames || {};
        global.a.popupWindowsByWin = global.a.popupWindowsByWin || new cross_domain_safe_weakmap_src.a();
        global.a.popupWindowsByName = global.a.popupWindowsByName || {};
        function hasBridge(url, domain) {
            domain = domain || Object(cross_domain_utils_src.getDomainFromUrl)(url);
            return Boolean(global.a.bridges[domain]);
        }
        function openBridge(url, domain) {
            domain = domain || Object(cross_domain_utils_src.getDomainFromUrl)(url);
            if (global.a.bridges[domain]) return global.a.bridges[domain];
            global.a.bridges[domain] = src.a.try(() => {
                if (Object(cross_domain_utils_src.getDomain)() === domain) throw new Error(`Can not open bridge on the same domain as current domain: ${domain}`);
                const name = getBridgeName(domain);
                if (Object(cross_domain_utils_src.getFrameByName)(window, name)) throw new Error(`Frame with name ${name} already exists on page`);
                const iframe = (function (name, url) {
                    const iframe = document.createElement("iframe");
                    iframe.setAttribute("name", name);
                    iframe.setAttribute("id", name);
                    iframe.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;");
                    iframe.setAttribute("frameborder", "0");
                    iframe.setAttribute("border", "0");
                    iframe.setAttribute("scrolling", "no");
                    iframe.setAttribute("allowTransparency", "true");
                    iframe.setAttribute("tabindex", "-1");
                    iframe.setAttribute("hidden", "true");
                    iframe.setAttribute("title", "");
                    iframe.setAttribute("role", "presentation");
                    iframe.src = url;
                    return iframe;
                }(name, url));
                global.a.bridgeFrames[domain] = iframe;
                return documentBodyReady.then((body) => {
                    body.appendChild(iframe);
                    const bridge = iframe.contentWindow;
                    !(function (source, domain) {
                        global.a.on(conf.b.POST_MESSAGE_NAMES.OPEN_TUNNEL, {
                            window: source,
                            domain,
                        }, (_ref) => {
                            const origin = _ref.origin; const
                                data = _ref.data;
                            if (origin !== domain) throw new Error(`Domain ${domain} does not match origin ${origin}`);
                            if (!data.name) throw new Error("Register window expected to be passed window name");
                            if (!data.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
                            if (!global.a.popupWindowsByName[data.name]) throw new Error(`Window with name ${data.name} does not exist, or was not opened by this window`);
                            if (!global.a.popupWindowsByName[data.name].domain) throw new Error(`We do not have a registered domain for window ${data.name}`);
                            if (global.a.popupWindowsByName[data.name].domain !== origin) throw new Error(`Message origin ${origin} does not matched registered window origin ${global.a.popupWindowsByName[data.name].domain}`);
                            registerRemoteSendMessage(global.a.popupWindowsByName[data.name].win, domain, data.sendMessage);
                            return {
                                sendMessage(message) {
                                    if (window && !window.closed) {
                                        const winDetails = global.a.popupWindowsByName[data.name];
                                        if (winDetails) {
                                            try {
                                                global.a.receiveMessage({
                                                    data: message,
                                                    origin: winDetails.domain,
                                                    source: winDetails.win,
                                                });
                                            } catch (err) {
                                                src.a.reject(err);
                                            }
                                        }
                                    }
                                },
                            };
                        });
                    }(bridge, domain));
                    return new src.a(((resolve, reject) => {
                        iframe.onload = resolve;
                        iframe.onerror = reject;
                    })).then(() => Object(lib.k)(bridge, conf.a.BRIDGE_TIMEOUT, `Bridge ${url}`)).then(() => bridge);
                });
            });
            return global.a.bridges[domain];
        }
        const windowOpen = window.open;
        window.open = function (url, name, options, last) {
            let domain = url;
            if (url && url.indexOf(conf.b.MOCK_PROTOCOL) === 0) {
                const _url$split = url.split("|");
                domain = _url$split[0];
                url = _url$split[1];
            }
            domain && (domain = Object(cross_domain_utils_src.getDomainFromUrl)(domain));
            const win = windowOpen.call(this, url, name, options, last);
            if (!win) return win;
            url && registerRemoteWindow(win);
            for (let _i2 = 0, _Object$keys2 = Object.keys(global.a.popupWindowsByName), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                const winName = _Object$keys2[_i2];
                Object(cross_domain_utils_src.isWindowClosed)(global.a.popupWindowsByName[winName].win) && delete global.a.popupWindowsByName[winName];
            }
            if (name && win) {
                const winOptions = global.a.popupWindowsByWin.get(win) || global.a.popupWindowsByName[name] || {};
                winOptions.name = winOptions.name || name;
                winOptions.win = winOptions.win || win;
                winOptions.domain = winOptions.domain || domain;
                global.a.popupWindowsByWin.set(win, winOptions);
                global.a.popupWindowsByName[name] = winOptions;
            }
            return win;
        };
        function linkUrl(win, url) {
            const winOptions = global.a.popupWindowsByWin.get(win);
            if (winOptions) {
                winOptions.domain = Object(cross_domain_utils_src.getDomainFromUrl)(url);
                registerRemoteWindow(win);
            }
        }
        function destroyBridges() {
            for (let _i4 = 0, _Object$keys4 = Object.keys(global.a.bridgeFrames), _length4 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
                const domain = _Object$keys4[_i4]; const
                    frame = global.a.bridgeFrames[domain];
                frame.parentNode && frame.parentNode.removeChild(frame);
            }
            global.a.bridgeFrames = {};
            global.a.bridges = {};
        }
        __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", () => openTunnelToOpener);
        __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", () => needsBridgeForBrowser);
        __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", () => needsBridgeForWin);
        __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", () => needsBridgeForDomain);
        __webpack_require__.d(__webpack_exports__, "needsBridge", () => needsBridge);
        __webpack_require__.d(__webpack_exports__, "getBridgeName", () => getBridgeName);
        __webpack_require__.d(__webpack_exports__, "isBridge", () => isBridge);
        __webpack_require__.d(__webpack_exports__, "documentBodyReady", () => documentBodyReady);
        __webpack_require__.d(__webpack_exports__, "registerRemoteWindow", () => registerRemoteWindow);
        __webpack_require__.d(__webpack_exports__, "findRemoteWindow", () => findRemoteWindow);
        __webpack_require__.d(__webpack_exports__, "registerRemoteSendMessage", () => registerRemoteSendMessage);
        __webpack_require__.d(__webpack_exports__, "rejectRemoteSendMessage", () => rejectRemoteSendMessage);
        __webpack_require__.d(__webpack_exports__, "sendBridgeMessage", () => sendBridgeMessage);
        __webpack_require__.d(__webpack_exports__, "hasBridge", () => hasBridge);
        __webpack_require__.d(__webpack_exports__, "openBridge", () => openBridge);
        __webpack_require__.d(__webpack_exports__, "linkUrl", () => linkUrl);
        __webpack_require__.d(__webpack_exports__, "destroyBridges", () => destroyBridges);
    },
    "./node_modules/post-robot/src/bridge/interface.js": function (module, __webpack_exports__, __webpack_require__) {
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0,
        });
        const __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__("./node_modules/post-robot/src/bridge/index.js");
        __webpack_require__.d(__webpack_exports__, "openBridge", () => __WEBPACK_IMPORTED_MODULE_0__index__.openBridge);
        __webpack_require__.d(__webpack_exports__, "linkUrl", () => __WEBPACK_IMPORTED_MODULE_0__index__.linkUrl);
        __webpack_require__.d(__webpack_exports__, "isBridge", () => __WEBPACK_IMPORTED_MODULE_0__index__.isBridge);
        __webpack_require__.d(__webpack_exports__, "needsBridge", () => __WEBPACK_IMPORTED_MODULE_0__index__.needsBridge);
        __webpack_require__.d(__webpack_exports__, "needsBridgeForBrowser", () => __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForBrowser);
        __webpack_require__.d(__webpack_exports__, "hasBridge", () => __WEBPACK_IMPORTED_MODULE_0__index__.hasBridge);
        __webpack_require__.d(__webpack_exports__, "needsBridgeForWin", () => __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForWin);
        __webpack_require__.d(__webpack_exports__, "needsBridgeForDomain", () => __WEBPACK_IMPORTED_MODULE_0__index__.needsBridgeForDomain);
        __webpack_require__.d(__webpack_exports__, "openTunnelToOpener", () => __WEBPACK_IMPORTED_MODULE_0__index__.openTunnelToOpener);
        __webpack_require__.d(__webpack_exports__, "destroyBridges", () => __WEBPACK_IMPORTED_MODULE_0__index__.destroyBridges);
    },
    "./node_modules/post-robot/src/compat/index.js": function (module, __webpack_exports__, __webpack_require__) {
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0,
        });
        const src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"); const
            conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js");
        function emulateIERestrictions(sourceWindow, targetWindow) {
            if (!conf.a.ALLOW_POSTMESSAGE_POPUP && !1 === Object(src.isSameTopWindow)(sourceWindow, targetWindow)) throw new Error("Can not send and receive post messages between two different windows (disabled to emulate IE)");
        }
        __webpack_require__.d(__webpack_exports__, "emulateIERestrictions", () => emulateIERestrictions);
    },
    "./node_modules/post-robot/src/conf/index.js": function (module, __webpack_exports__, __webpack_require__) {
        let _ALLOWED_POST_MESSAGE; const CONSTANTS = {
            POST_MESSAGE_TYPE: {
                REQUEST: "postrobot_message_request",
                RESPONSE: "postrobot_message_response",
                ACK: "postrobot_message_ack",
            },
            POST_MESSAGE_ACK: {
                SUCCESS: "success",
                ERROR: "error",
            },
            POST_MESSAGE_NAMES: {
                METHOD: "postrobot_method",
                HELLO: "postrobot_ready",
                OPEN_TUNNEL: "postrobot_open_tunnel",
            },
            WINDOW_TYPES: {
                FULLPAGE: "fullpage",
                POPUP: "popup",
                IFRAME: "iframe",
            },
            WINDOW_PROPS: {
                POSTROBOT: "__postRobot__",
            },
            SERIALIZATION_TYPES: {
                METHOD: "postrobot_method",
                ERROR: "postrobot_error",
                PROMISE: "postrobot_promise",
                ZALGO_PROMISE: "postrobot_zalgo_promise",
                REGEX: "regex",
            },
            SEND_STRATEGIES: {
                POST_MESSAGE: "postrobot_post_message",
                BRIDGE: "postrobot_bridge",
                GLOBAL: "postrobot_global",
            },
            MOCK_PROTOCOL: "mock:",
            FILE_PROTOCOL: "file:",
            BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
            POSTROBOT_PROXY: "__postrobot_proxy__",
            WILDCARD: "*",
        }; const POST_MESSAGE_NAMES = {
            METHOD: "postrobot_method",
            HELLO: "postrobot_hello",
            OPEN_TUNNEL: "postrobot_open_tunnel",
        }; const POST_MESSAGE_NAMES_LIST = Object.keys(POST_MESSAGE_NAMES).map(key => POST_MESSAGE_NAMES[key]); const
            CONFIG = {
                ALLOW_POSTMESSAGE_POPUP: !("__ALLOW_POSTMESSAGE_POPUP__" in window) || window.__ALLOW_POSTMESSAGE_POPUP__,
                BRIDGE_TIMEOUT: 5e3,
                CHILD_WINDOW_TIMEOUT: 5e3,
                ACK_TIMEOUT: window.navigator.userAgent.match(/MSIE/i) !== -1 ? 2e3 : 1e3,
                RES_TIMEOUT: -1,
                ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _ALLOWED_POST_MESSAGE[CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = !0,
                _ALLOWED_POST_MESSAGE[CONSTANTS.SEND_STRATEGIES.BRIDGE] = !0, _ALLOWED_POST_MESSAGE[CONSTANTS.SEND_STRATEGIES.GLOBAL] = !0,
                _ALLOWED_POST_MESSAGE),
                ALLOW_SAME_ORIGIN: !1,
            };
        window.location.href.indexOf(CONSTANTS.FILE_PROTOCOL) === 0 && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
        __webpack_require__.d(__webpack_exports__, "a", () => CONFIG);
        __webpack_require__.d(__webpack_exports__, "b", () => CONSTANTS);
        __webpack_require__.d(__webpack_exports__, !1, () => POST_MESSAGE_NAMES);
        __webpack_require__.d(__webpack_exports__, !1, () => POST_MESSAGE_NAMES_LIST);
    },
    "./node_modules/post-robot/src/global.js": function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d(__webpack_exports__, "a", () => global);
        const __WEBPACK_IMPORTED_MODULE_0__conf__ = __webpack_require__("./node_modules/post-robot/src/conf/index.js"); var
            global = window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT] = window[__WEBPACK_IMPORTED_MODULE_0__conf__.b.WINDOW_PROPS.POSTROBOT] || {};
        global.registerSelf = function () {};
    },
    "./node_modules/post-robot/src/lib/index.js": function (module, __webpack_exports__, __webpack_require__) {
        const src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"); const cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"); const conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"); const
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        function stringifyError(err) {
            const level = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
            if (level >= 3) return "stringifyError stack overflow";
            try {
                if (!err) return `<unknown error: ${Object.prototype.toString.call(err)}>`;
                if (typeof err === "string") return err;
                if (err instanceof Error) {
                    const stack = err && err.stack; const
                        message = err && err.message;
                    if (stack && message) return stack.indexOf(message) !== -1 ? stack : `${message}\n${stack}`;
                    if (stack) return stack;
                    if (message) return message;
                }
                return typeof err.toString === "function" ? err.toString() : Object.prototype.toString.call(err);
            } catch (newErr) {
                return `Error while stringifying error: ${stringifyError(newErr, level + 1)}`;
            }
        }
        const once = function (method) {
            if (!method) return method;
            let called = !1;
            return function () {
                if (!called) {
                    called = !0;
                    return method.apply(this, arguments);
                }
            };
        };
        function noop() {}
        function addEventListener(obj, event, handler) {
            obj.addEventListener ? obj.addEventListener(event, handler) : obj.attachEvent(`on${event}`, handler);
            return {
                cancel() {
                    obj.removeEventListener ? obj.removeEventListener(event, handler) : obj.detachEvent(`on${event}`, handler);
                },
            };
        }
        function uniqueID() {
            const chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, () => chars.charAt(Math.floor(Math.random() * chars.length)));
        }
        function eachArray(item, callback) {
            for (let i = 0; i < item.length; i++) callback(item[i], i);
        }
        function eachObject(item, callback) {
            for (const _key in item) item.hasOwnProperty(_key) && callback(item[_key], _key);
        }
        function each(item, callback) {
            Array.isArray(item) ? eachArray(item, callback) : (void 0 === item ? "undefined" : _typeof(item)) === "object" && item !== null && eachObject(item, callback);
        }
        function replaceObject(item, callback) {
            const depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
            if (depth >= 100) throw new Error("Self-referential object passed, or object contained too many layers");
            let newobj = void 0;
            if ((void 0 === item ? "undefined" : _typeof(item)) !== "object" || item === null || Array.isArray(item)) {
                if (!Array.isArray(item)) throw new TypeError(`Invalid type: ${void 0 === item ? "undefined" : _typeof(item)}`);
                newobj = [];
            } else newobj = {};
            each(item, (childItem, key) => {
                const result = callback(childItem, key);
                void 0 !== result ? newobj[key] = result : (void 0 === childItem ? "undefined" : _typeof(childItem)) === "object" && childItem !== null ? newobj[key] = replaceObject(childItem, callback, depth + 1) : newobj[key] = childItem;
            });
            return newobj;
        }
        function safeInterval(method, time) {
            let timeout = void 0;
            timeout = setTimeout(function runInterval() {
                timeout = setTimeout(runInterval, time);
                method.call();
            }, time);
            return {
                cancel() {
                    clearTimeout(timeout);
                },
            };
        }
        function isRegex(item) {
            return Object.prototype.toString.call(item) === "[object RegExp]";
        }
        const util_weakMapMemoize = function (method) {
            const weakmap = new src.a();
            return function (arg) {
                let result = weakmap.get(arg);
                if (void 0 !== result) return result;
                void 0 !== (result = method.call(this, arg)) && weakmap.set(arg, result);
                return result;
            };
        };
        function getWindowType() {
            return Object(cross_domain_utils_src.isPopup)() ? conf.b.WINDOW_TYPES.POPUP : Object(cross_domain_utils_src.isIframe)() ? conf.b.WINDOW_TYPES.IFRAME : conf.b.WINDOW_TYPES.FULLPAGE;
        }
        function jsonStringify(obj, replacer, indent) {
            let objectToJSON = void 0; let
                arrayToJSON = void 0;
            try {
                if (JSON.stringify({}) !== "{}") {
                    objectToJSON = Object.prototype.toJSON;
                    delete Object.prototype.toJSON;
                }
                if (JSON.stringify({}) !== "{}") throw new Error("Can not correctly serialize JSON objects");
                if (JSON.stringify([]) !== "[]") {
                    arrayToJSON = Array.prototype.toJSON;
                    delete Array.prototype.toJSON;
                }
                if (JSON.stringify([]) !== "[]") throw new Error("Can not correctly serialize JSON objects");
            } catch (err) {
                throw new Error(`Can not repair JSON.stringify: ${err.message}`);
            }
            const result = JSON.stringify.call(this, obj, replacer, indent);
            try {
                objectToJSON && (Object.prototype.toJSON = objectToJSON);
                arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
            } catch (err) {
                throw new Error(`Can not repair JSON.stringify: ${err.message}`);
            }
            return result;
        }
        function jsonParse(item) {
            return JSON.parse(item);
        }
        function needsGlobalMessagingForBrowser() {
            return !!Object(cross_domain_utils_src.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i) || !conf.a.ALLOW_POSTMESSAGE_POPUP;
        }
        const zalgo_promise_src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"); const global = __webpack_require__("./node_modules/post-robot/src/global.js"); const
            serialize__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        global.a.methods = global.a.methods || new src.a();
        const listenForMethods = once(() => {
            global.a.on(conf.b.POST_MESSAGE_NAMES.METHOD, {
                origin: conf.b.WILDCARD,
            }, (_ref) => {
                const source = _ref.source; const origin = _ref.origin; const data = _ref.data; const
                    methods = global.a.methods.get(source);
                if (!methods) throw new Error("Could not find any methods this window has privileges to call");
                const meth = methods[data.id];
                if (!meth) throw new Error(`Could not find method with id: ${data.id}`);
                if (!Object(cross_domain_utils_src.matchDomain)(meth.domain, origin)) throw new Error(`Method domain ${meth.domain} does not match origin ${origin}`);
                return zalgo_promise_src.a.try(() => meth.method.apply({
                    source,
                    origin,
                    data,
                }, data.args)).then(result => ({
                    result,
                    id: data.id,
                    name: data.name,
                }));
            });
        });
        function isSerialized(item, type) {
            return (void 0 === item ? "undefined" : serialize__typeof(item)) === "object" && item !== null && item.__type__ === type;
        }
        function serializeMethod(destination, domain, method, name) {
            const id = uniqueID(); let
                methods = global.a.methods.get(destination);
            if (!methods) {
                methods = {};
                global.a.methods.set(destination, methods);
            }
            methods[id] = {
                domain,
                method,
            };
            return {
                __type__: conf.b.SERIALIZATION_TYPES.METHOD,
                __id__: id,
                __name__: name,
            };
        }
        function serializeMethods(destination, domain, obj) {
            return replaceObject({
                obj,
            }, (item, key) => {
                return typeof item === "function" ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? (err = item,
                {
                    __type__: conf.b.SERIALIZATION_TYPES.ERROR,
                    __message__: stringifyError(err),
                    __code__: err.code,
                }) : window.Promise && item instanceof window.Promise ? (function (destination, domain, promise, name) {
                    return {
                        __type__: conf.b.SERIALIZATION_TYPES.PROMISE,
                        __then__: serializeMethod(destination, domain, (resolve, reject) => promise.then(resolve, reject), `${name}.then`),
                    };
                }(destination, domain, item, key.toString())) : zalgo_promise_src.a.isPromise(item) ? (function (destination, domain, promise, name) {
                    return {
                        __type__: conf.b.SERIALIZATION_TYPES.ZALGO_PROMISE,
                        __then__: serializeMethod(destination, domain, (resolve, reject) => promise.then(resolve, reject), `${name}.then`),
                    };
                }(destination, domain, item, key.toString())) : isRegex(item) ? (regex = item, {
                    __type__: conf.b.SERIALIZATION_TYPES.REGEX,
                    __source__: regex.source,
                }) : void 0;
                let err; let
                    regex;
            }).obj;
        }
        function deserializeMethod(source, origin, obj) {
            function wrapper() {
                const args = Array.prototype.slice.call(arguments);
                return global.a.send(source, conf.b.POST_MESSAGE_NAMES.METHOD, {
                    id: obj.__id__,
                    name: obj.__name__,
                    args,
                }, {
                    domain: origin,
                    timeout: -1,
                }).then(_ref2 => _ref2.data.result, (err) => {
                    throw err;
                });
            }
            wrapper.__name__ = obj.__name__;
            wrapper.__xdomain__ = !0;
            wrapper.source = source;
            wrapper.origin = origin;
            return wrapper;
        }
        function deserializeError(source, origin, obj) {
            const err = new Error(obj.__message__);
            obj.__code__ && (err.code = obj.__code__);
            return err;
        }
        function deserializeZalgoPromise(source, origin, prom) {
            return new zalgo_promise_src.a(((resolve, reject) => deserializeMethod(source, origin, prom.__then__)(resolve, reject)));
        }
        function deserializePromise(source, origin, prom) {
            return window.Promise ? new window.Promise(((resolve, reject) => deserializeMethod(source, origin, prom.__then__)(resolve, reject))) : deserializeZalgoPromise(source, origin, prom);
        }
        function deserializeRegex(source, origin, item) {
            return new RegExp(item.__source__);
        }
        function deserializeMethods(source, origin, obj) {
            return replaceObject({
                obj,
            }, (item) => {
                if ((void 0 === item ? "undefined" : serialize__typeof(item)) === "object" && item !== null) return isSerialized(item, conf.b.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.ERROR) ? deserializeError(0, 0, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.PROMISE) ? deserializePromise(source, origin, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.ZALGO_PROMISE) ? deserializeZalgoPromise(source, origin, item) : isSerialized(item, conf.b.SERIALIZATION_TYPES.REGEX) ? deserializeRegex(0, 0, item) : void 0;
            }).obj;
        }
        global.a.readyPromises = global.a.readyPromises || new src.a();
        function onHello(handler) {
            global.a.on(conf.b.POST_MESSAGE_NAMES.HELLO, {
                domain: conf.b.WILDCARD,
            }, (_ref) => {
                const source = _ref.source; const
                    origin = _ref.origin;
                return handler({
                    source,
                    origin,
                });
            });
        }
        function sayHello(win) {
            return global.a.send(win, conf.b.POST_MESSAGE_NAMES.HELLO, {}, {
                domain: conf.b.WILDCARD,
                timeout: -1,
            }).then(_ref2 => ({
                origin: _ref2.origin,
            }));
        }
        function initOnReady() {
            onHello((_ref3) => {
                const source = _ref3.source; const origin = _ref3.origin; const
                    promise = global.a.readyPromises.get(source) || new zalgo_promise_src.a();
                promise.resolve({
                    origin,
                });
                global.a.readyPromises.set(source, promise);
            });
            const parent = Object(cross_domain_utils_src.getAncestor)();
            parent && sayHello(parent).catch(noop);
        }
        function onChildWindowReady(win) {
            const timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3; const name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window"; let
                promise = global.a.readyPromises.get(win);
            if (promise) return promise;
            promise = new zalgo_promise_src.a();
            global.a.readyPromises.set(win, promise);
            timeout !== -1 && setTimeout(() => promise.reject(new Error(`${name} did not load after ${timeout}ms`)), timeout);
            return promise;
        }
        __webpack_require__.d(__webpack_exports__, "p", () => stringifyError);
        __webpack_require__.d(__webpack_exports__, "l", () => once);
        __webpack_require__.d(__webpack_exports__, "j", () => noop);
        __webpack_require__.d(__webpack_exports__, "a", () => addEventListener);
        __webpack_require__.d(__webpack_exports__, "q", () => uniqueID);
        __webpack_require__.d(__webpack_exports__, !1, () => eachArray);
        __webpack_require__.d(__webpack_exports__, !1, () => eachObject);
        __webpack_require__.d(__webpack_exports__, !1, () => each);
        __webpack_require__.d(__webpack_exports__, !1, () => replaceObject);
        __webpack_require__.d(__webpack_exports__, "m", () => safeInterval);
        __webpack_require__.d(__webpack_exports__, "e", () => isRegex);
        __webpack_require__.d(__webpack_exports__, "r", () => util_weakMapMemoize);
        __webpack_require__.d(__webpack_exports__, "c", () => getWindowType);
        __webpack_require__.d(__webpack_exports__, "g", () => jsonStringify);
        __webpack_require__.d(__webpack_exports__, "f", () => jsonParse);
        __webpack_require__.d(__webpack_exports__, "i", () => needsGlobalMessagingForBrowser);
        __webpack_require__.d(__webpack_exports__, "h", () => listenForMethods);
        __webpack_require__.d(__webpack_exports__, !1, () => serializeMethod);
        __webpack_require__.d(__webpack_exports__, "o", () => serializeMethods);
        __webpack_require__.d(__webpack_exports__, !1, () => deserializeMethod);
        __webpack_require__.d(__webpack_exports__, !1, () => deserializeError);
        __webpack_require__.d(__webpack_exports__, !1, () => deserializeZalgoPromise);
        __webpack_require__.d(__webpack_exports__, !1, () => deserializePromise);
        __webpack_require__.d(__webpack_exports__, !1, () => deserializeRegex);
        __webpack_require__.d(__webpack_exports__, "b", () => deserializeMethods);
        __webpack_require__.d(__webpack_exports__, !1, () => onHello);
        __webpack_require__.d(__webpack_exports__, "n", () => sayHello);
        __webpack_require__.d(__webpack_exports__, "d", () => initOnReady);
        __webpack_require__.d(__webpack_exports__, "k", () => onChildWindowReady);
    },
    "./node_modules/webpack/buildin/amd-options.js": function (module, exports) {
        (function (__webpack_amd_options__) {
            module.exports = __webpack_amd_options__;
        }).call(exports, {});
    },
    "./node_modules/webpack/buildin/module.js": function (module, exports) {
        module.exports = function (module) {
            if (!module.webpackPolyfill) {
                module.deprecate = function () {};
                module.paths = [];
                module.children || (module.children = []);
                Object.defineProperty(module, "loaded", {
                    enumerable: !0,
                    get() {
                        return module.l;
                    },
                });
                Object.defineProperty(module, "id", {
                    enumerable: !0,
                    get() {
                        return module.i;
                    },
                });
                module.webpackPolyfill = 1;
            }
            return module;
        };
    },
    "./node_modules/zalgo-promise/src/index.js": function (module, __webpack_exports__, __webpack_require__) {
        function utils_isPromise(item) {
            try {
                if (!item) return !1;
                if (typeof Promise !== "undefined" && item instanceof Promise) return !0;
                if (typeof window !== "undefined" && window.Window && item instanceof window.Window) return !1;
                if (typeof window !== "undefined" && window.constructor && item instanceof window.constructor) return !1;
                const _toString = {}.toString;
                if (_toString) {
                    const name = _toString.call(item);
                    if (name === "[object Window]" || name === "[object global]" || name === "[object DOMWindow]") return !1;
                }
                if (typeof item.then === "function") return !0;
            } catch (err) {
                return !1;
            }
            return !1;
        }
        function getGlobal() {
            let glob = void 0;
            if (typeof window !== "undefined") glob = window; else {
                if (typeof window === "undefined") throw new TypeError("Can not find global");
                glob = window;
            }
            const zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
            zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
            zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
            zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
            zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];
            return zalgoGlobal;
        }
        const promise_ZalgoPromise = (function () {
            function ZalgoPromise(handler) {
                const _this = this;
                !(function (instance, Constructor) {
                    if (!(instance instanceof ZalgoPromise)) throw new TypeError("Cannot call a class as a function");
                }(this));
                this.resolved = !1;
                this.rejected = !1;
                this.errorHandled = !1;
                this.handlers = [];
                if (handler) {
                    let _result = void 0; let _error = void 0; let resolved = !1; let rejected = !1; let
                        isAsync = !1;
                    try {
                        handler((res) => {
                            if (isAsync) _this.resolve(res); else {
                                resolved = !0;
                                _result = res;
                            }
                        }, (err) => {
                            if (isAsync) _this.reject(err); else {
                                rejected = !0;
                                _error = err;
                            }
                        });
                    } catch (err) {
                        this.reject(err);
                        return;
                    }
                    isAsync = !0;
                    resolved ? this.resolve(_result) : rejected && this.reject(_error);
                }
            }
            ZalgoPromise.prototype.resolve = function (result) {
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(result)) throw new Error("Can not resolve promise with another promise");
                this.resolved = !0;
                this.value = result;
                this.dispatch();
                return this;
            };
            ZalgoPromise.prototype.reject = function (error) {
                const _this2 = this;
                if (this.resolved || this.rejected) return this;
                if (utils_isPromise(error)) throw new Error("Can not reject promise with another promise");
                if (!error) {
                    const _err = error && typeof error.toString === "function" ? error.toString() : Object.prototype.toString.call(error);
                    error = new Error(`Expected reject to be called with Error, got ${_err}`);
                }
                this.rejected = !0;
                this.error = error;
                this.errorHandled || setTimeout(() => {
                    _this2.errorHandled || (function (err, promise) {
                        if (getGlobal().dispatchedErrors.indexOf(err) === -1) {
                            getGlobal().dispatchedErrors.push(err);
                            setTimeout(() => {
                                throw err;
                            }, 1);
                            for (let j = 0; j < getGlobal().possiblyUnhandledPromiseHandlers.length; j++) getGlobal().possiblyUnhandledPromiseHandlers[j](err, promise);
                        }
                    }(error, _this2));
                }, 1);
                this.dispatch();
                return this;
            };
            ZalgoPromise.prototype.asyncReject = function (error) {
                this.errorHandled = !0;
                this.reject(error);
            };
            ZalgoPromise.prototype.dispatch = function () {
                const _this3 = this; const dispatching = this.dispatching; const resolved = this.resolved; const rejected = this.rejected; const
                    handlers = this.handlers;
                if (!dispatching && (resolved || rejected)) {
                    this.dispatching = !0;
                    getGlobal().activeCount += 1;
                    for (let _loop = function (i) {
                            const _handlers$i = handlers[i]; const onSuccess = _handlers$i.onSuccess; const onError = _handlers$i.onError; const promise = _handlers$i.promise; let
                                result = void 0;
                            if (resolved) {
                                try {
                                    result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                                } catch (err) {
                                    promise.reject(err);
                                    return "continue";
                                }
                            } else if (rejected) {
                                if (!onError) {
                                    promise.reject(_this3.error);
                                    return "continue";
                                }
                                try {
                                    result = onError(_this3.error);
                                } catch (err) {
                                    promise.reject(err);
                                    return "continue";
                                }
                            }
                            if (result instanceof ZalgoPromise && (result.resolved || result.rejected)) {
                                result.resolved ? promise.resolve(result.value) : promise.reject(result.error);
                                result.errorHandled = !0;
                            } else {
                                utils_isPromise(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then((res) => {
                                    promise.resolve(res);
                                }, (err) => {
                                    promise.reject(err);
                                }) : promise.resolve(result);
                            }
                        }, i = 0; i < handlers.length; i++) _loop(i);
                    handlers.length = 0;
                    this.dispatching = !1;
                    getGlobal().activeCount -= 1;
                    getGlobal().activeCount === 0 && ZalgoPromise.flushQueue();
                }
            };
            ZalgoPromise.prototype.then = function (onSuccess, onError) {
                if (onSuccess && typeof onSuccess !== "function" && !onSuccess.call) throw new Error("Promise.then expected a function for success handler");
                if (onError && typeof onError !== "function" && !onError.call) throw new Error("Promise.then expected a function for error handler");
                const promise = new ZalgoPromise();
                this.handlers.push({
                    promise,
                    onSuccess,
                    onError,
                });
                this.errorHandled = !0;
                this.dispatch();
                return promise;
            };
            ZalgoPromise.prototype.catch = function (onError) {
                return this.then(void 0, onError);
            };
            ZalgoPromise.prototype.finally = function (onFinally) {
                if (onFinally && typeof onFinally !== "function" && !onFinally.call) throw new Error("Promise.finally expected a function");
                return this.then(result => ZalgoPromise.try(onFinally).then(() => result), err => ZalgoPromise.try(onFinally).then(() => {
                    throw err;
                }));
            };
            ZalgoPromise.prototype.timeout = function (time, err) {
                const _this4 = this;
                if (this.resolved || this.rejected) return this;
                const timeout = setTimeout(() => {
                    _this4.resolved || _this4.rejected || _this4.reject(err || new Error(`Promise timed out after ${time}ms`));
                }, time);
                return this.then((result) => {
                    clearTimeout(timeout);
                    return result;
                });
            };
            ZalgoPromise.prototype.toPromise = function () {
                if (typeof Promise === "undefined") throw new TypeError("Could not find Promise");
                return Promise.resolve(this);
            };
            ZalgoPromise.resolve = function (value) {
                return value instanceof ZalgoPromise ? value : utils_isPromise(value) ? new ZalgoPromise(((resolve, reject) => value.then(resolve, reject))) : new ZalgoPromise().resolve(value);
            };
            ZalgoPromise.reject = function (error) {
                return new ZalgoPromise().reject(error);
            };
            ZalgoPromise.all = function (promises) {
                const promise = new ZalgoPromise(); let count = promises.length; const
                    results = [];
                if (!count) {
                    promise.resolve(results);
                    return promise;
                }
                for (let _loop2 = function (i) {
                        const prom = promises[i];
                        if (prom instanceof ZalgoPromise) {
                            if (prom.resolved) {
                                results[i] = prom.value;
                                count -= 1;
                                return "continue";
                            }
                        } else if (!utils_isPromise(prom)) {
                            results[i] = prom;
                            count -= 1;
                            return "continue";
                        }
                        ZalgoPromise.resolve(prom).then((result) => {
                            results[i] = result;
                            (count -= 1) == 0 && promise.resolve(results);
                        }, (err) => {
                            promise.reject(err);
                        });
                    }, i = 0; i < promises.length; i++) _loop2(i);
                count === 0 && promise.resolve(results);
                return promise;
            };
            ZalgoPromise.hash = function (promises) {
                const result = {};
                return ZalgoPromise.all(Object.keys(promises).map(key => ZalgoPromise.resolve(promises[key]).then((value) => {
                    result[key] = value;
                }))).then(() => result);
            };
            ZalgoPromise.map = function (items, method) {
                return ZalgoPromise.all(items.map(method));
            };
            ZalgoPromise.onPossiblyUnhandledException = function (handler) {
                return (function (handler) {
                    getGlobal().possiblyUnhandledPromiseHandlers.push(handler);
                    return {
                        cancel() {
                            getGlobal().possiblyUnhandledPromiseHandlers.splice(getGlobal().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                        },
                    };
                }(handler));
            };
            ZalgoPromise.try = function (method, context, args) {
                if (method && typeof method !== "function" && !method.call) throw new Error("Promise.try expected a function");
                let result = void 0;
                try {
                    result = method.apply(context, args || []);
                } catch (err) {
                    return ZalgoPromise.reject(err);
                }
                return ZalgoPromise.resolve(result);
            };
            ZalgoPromise.delay = function (_delay) {
                return new ZalgoPromise(((resolve) => {
                    setTimeout(resolve, _delay);
                }));
            };
            ZalgoPromise.isPromise = function (value) {
                return !!(value && value instanceof ZalgoPromise) || utils_isPromise(value);
            };
            ZalgoPromise.flush = function () {
                const promise = new ZalgoPromise();
                getGlobal().flushPromises.push(promise);
                getGlobal().activeCount === 0 && ZalgoPromise.flushQueue();
                return promise;
            };
            ZalgoPromise.flushQueue = function () {
                const promisesToFlush = getGlobal().flushPromises;
                getGlobal().flushPromises = [];
                for (let _i2 = 0, _length2 = promisesToFlush == null ? 0 : promisesToFlush.length; _i2 < _length2; _i2++) promisesToFlush[_i2].resolve();
            };
            return ZalgoPromise;
        }());
        __webpack_require__.d(__webpack_exports__, "a", () => promise_ZalgoPromise);
    },
    "./node_modules/zoid/src/constants.js": function (module, __webpack_exports__, __webpack_require__) {
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0,
        });
        __webpack_require__.d(__webpack_exports__, "ZOID", () => ZOID);
        __webpack_require__.d(__webpack_exports__, "__ZOID__", () => __ZOID__);
        __webpack_require__.d(__webpack_exports__, "POST_MESSAGE", () => POST_MESSAGE);
        __webpack_require__.d(__webpack_exports__, "PROP_TYPES", () => PROP_TYPES);
        __webpack_require__.d(__webpack_exports__, "INITIAL_PROPS", () => INITIAL_PROPS);
        __webpack_require__.d(__webpack_exports__, "WINDOW_REFERENCES", () => WINDOW_REFERENCES);
        __webpack_require__.d(__webpack_exports__, "PROP_TYPES_LIST", () => PROP_TYPES_LIST);
        __webpack_require__.d(__webpack_exports__, "CONTEXT_TYPES", () => CONTEXT_TYPES);
        __webpack_require__.d(__webpack_exports__, "CLASS_NAMES", () => CLASS_NAMES);
        __webpack_require__.d(__webpack_exports__, "EVENTS", () => EVENTS);
        __webpack_require__.d(__webpack_exports__, "ATTRIBUTES", () => ATTRIBUTES);
        __webpack_require__.d(__webpack_exports__, "ANIMATION_NAMES", () => ANIMATION_NAMES);
        __webpack_require__.d(__webpack_exports__, "EVENT_NAMES", () => EVENT_NAMES);
        __webpack_require__.d(__webpack_exports__, "CLOSE_REASONS", () => CLOSE_REASONS);
        __webpack_require__.d(__webpack_exports__, "CONTEXT_TYPES_LIST", () => CONTEXT_TYPES_LIST);
        __webpack_require__.d(__webpack_exports__, "DELEGATE", () => DELEGATE);
        __webpack_require__.d(__webpack_exports__, "WILDCARD", () => WILDCARD);
        __webpack_require__.d(__webpack_exports__, "DEFAULT_DIMENSIONS", () => DEFAULT_DIMENSIONS);
        var ZOID = "zoid"; var __ZOID__ = `__${ZOID}__`; var POST_MESSAGE = {
            INIT: `${ZOID}_init`,
            PROPS: `${ZOID}_props`,
            PROP_CALLBACK: `${ZOID}_prop_callback`,
            CLOSE: `${ZOID}_close`,
            CHECK_CLOSE: `${ZOID}_check_close`,
            REDIRECT: `${ZOID}_redirect`,
            RESIZE: `${ZOID}_resize`,
            ONRESIZE: `${ZOID}_onresize`,
            DELEGATE: `${ZOID}_delegate`,
            ALLOW_DELEGATE: `${ZOID}_allow_delegate`,
            ERROR: `${ZOID}_error`,
            HIDE: `${ZOID}_hide`,
            SHOW: `${ZOID}_show`,
        }; var PROP_TYPES = {
            STRING: "string",
            OBJECT: "object",
            FUNCTION: "function",
            BOOLEAN: "boolean",
            NUMBER: "number",
            ARRAY: "array",
        }; var INITIAL_PROPS = {
            RAW: "raw",
            UID: "uid",
        }; var WINDOW_REFERENCES = {
            OPENER: "opener",
            TOP: "top",
            PARENT: "parent",
            GLOBAL: "global",
        }; var PROP_TYPES_LIST = Object.keys(PROP_TYPES).map(key => PROP_TYPES[key]); var CONTEXT_TYPES = {
            IFRAME: "iframe",
            POPUP: "popup",
        }; var CLASS_NAMES = {
            ZOID: `${ZOID}`,
            OUTLET: `${ZOID}-outlet`,
            COMPONENT_FRAME: `${ZOID}-component-frame`,
            PRERENDER_FRAME: `${ZOID}-prerender-frame`,
            VISIBLE: `${ZOID}-visible`,
            INVISIBLE: `${ZOID}-invisible`,
        }; var EVENTS = {
            CLOSE: `${ZOID}-close`,
        }; var ATTRIBUTES = {
            IFRAME_PLACEHOLDER: `data-zoid-${ZOID}-placeholder`,
        }; var ANIMATION_NAMES = {
            SHOW_CONTAINER: `${ZOID}-show-container`,
            SHOW_COMPONENT: `${ZOID}-show-component`,
            HIDE_CONTAINER: `${ZOID}-hide-container`,
            HIDE_COMPONENT: `${ZOID}-hide-component`,
        }; var EVENT_NAMES = {
            CLICK: "click",
        }; var CLOSE_REASONS = {
            PARENT_CALL: "parent_call",
            CHILD_CALL: "child_call",
            CLOSE_DETECTED: "close_detected",
            USER_CLOSED: "user_closed",
            PARENT_CLOSE_DETECTED: "parent_close_detected",
        }; var CONTEXT_TYPES_LIST = Object.keys(CONTEXT_TYPES).map(key => CONTEXT_TYPES[key]); var DELEGATE = {
            CALL_ORIGINAL: "call_original",
            CALL_DELEGATE: "call_delegate",
        }; var WILDCARD = "*"; var
            DEFAULT_DIMENSIONS = {
                WIDTH: 300,
                HEIGHT: 150,
            };
    },
    "./node_modules/zoid/src/drivers/angular.js": function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d(__webpack_exports__, "a", () => angular);
        const __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./node_modules/zoid/src/lib/index.js"); var
            angular = {
                global() {
                    return window.angular;
                },
                register(component, ng) {
                    return ng.module(component.tag, []).directive(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.i)(component.tag), () => {
                        for (var scope = {}, _i2 = 0, _component$getPropNam2 = component.getPropNames(), _length2 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i2 < _length2; _i2++) {
                            const key = _component$getPropNam2[_i2];
                            scope[key] = "=";
                        }
                        component.looseProps && (scope.props = "=");
                        return {
                            scope,
                            restrict: "E",
                            controller: ["$scope", "$element", function ($scope, $element) {
                                if (component.looseProps && !$scope.props) throw new Error("For angular bindings to work, prop definitions must be passed to zoid.create");
                                component.log("instantiate_angular_component");
                                const getProps = function () {
                                    let scopeProps = void 0;
                                    if ($scope.props) scopeProps = $scope.props; else {
                                        scopeProps = {};
                                        for (let _i4 = 0, _Object$keys2 = Object.keys(scope), _length4 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                                            const _key = _Object$keys2[_i4];
                                            void 0 !== $scope[_key] && (scopeProps[_key] = $scope[_key]);
                                        }
                                    }
                                    return Object(__WEBPACK_IMPORTED_MODULE_0__lib__.Q)(scopeProps, {
                                        function(value) {
                                            return function () {
                                                const result = value.apply(this, arguments);
                                                !(function () {
                                                    if ($scope.$root.$$phase !== "$apply" && $scope.$root.$$phase !== "$digest") {
                                                        try {
                                                            $scope.$apply();
                                                        } catch (err) {}
                                                    }
                                                }());
                                                return result;
                                            };
                                        },
                                    });
                                }; const
                                    parent = component.init(getProps(), null, $element[0]);
                                parent.render($element[0]);
                                $scope.$watch(() => {
                                    parent.updateProps(getProps());
                                });
                            }],
                        };
                    });
                },
            };
    },
    "./node_modules/zoid/src/drivers/angular2.js": function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d(__webpack_exports__, "a", () => angular2);
        const __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./node_modules/zoid/src/lib/index.js"); const _extends = Object.assign || function (target) {
            for (let i = 1; i < arguments.length; i++) {
                const source = arguments[i];
                for (const key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }; var
            angular2 = {
                global() {},
                register(zoid, _ref) {
                    const AngularComponent = _ref.Component; const NgModule = _ref.NgModule; const ElementRef = _ref.ElementRef; const
                        NgZone = _ref.NgZone;
                    zoid.log("initializing angular2 component");
                    const getProps = function (component) {
                        return Object(__WEBPACK_IMPORTED_MODULE_0__lib__.Q)(_extends({}, component.internalProps, component.props), {
                            function(value) {
                                if (typeof value === "function") {
                                    return function () {
                                        const _this = this; const
                                            _arguments = arguments;
                                        return component.zone.run(() => value.apply(_this, _arguments));
                                    };
                                }
                            },
                        });
                    }; const
                        ComponentInstance = AngularComponent({
                            selector: zoid.tag,
                            template: "<div></div>",
                            inputs: ["props"],
                        }).Class({
                            constructor: [ElementRef, NgZone, function (elementRef, zone) {
                                this.elementRef = elementRef;
                                this.zone = zone;
                            }],
                            ngOnInit() {
                                const targetElement = this.elementRef.nativeElement; const
                                    parent = zoid.init(getProps(this), null, targetElement);
                                parent.render(targetElement);
                                this.parent = parent;
                            },
                            ngOnChanges() {
                                this.parent && this.parent.updateProps(getProps(this));
                            },
                        });
                    return NgModule({
                        declarations: [ComponentInstance],
                        exports: [ComponentInstance],
                    }).Class({
                        constructor() {},
                    });
                },
            };
    },
    "./node_modules/zoid/src/drivers/ember.js": function (module, exports) {},
    "./node_modules/zoid/src/drivers/glimmer.js": function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d(__webpack_exports__, "a", () => glimmer);
        const _extends = Object.assign || function (target) {
            for (let i = 1; i < arguments.length; i++) {
                const source = arguments[i];
                for (const key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }; var
            glimmer = {
                global() {},
                register(component, GlimmerComponent) {
                    return (function (_GlimmerComponent) {
                        !(function (subClass, superClass) {
                            if (typeof superClass !== "function" && superClass !== null) throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`);
                            subClass.prototype = Object.create(superClass && superClass.prototype, {
                                constructor: {
                                    value: subClass,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0,
                                },
                            });
                            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                        }(_class, _GlimmerComponent));
                        function _class() {
                            !(function (instance, Constructor) {
                                if (!(instance instanceof _class)) throw new TypeError("Cannot call a class as a function");
                            }(this));
                            return (function (self, call) {
                                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !call || typeof call !== "object" && typeof call !== "function" ? self : call;
                            }(this, _GlimmerComponent.apply(this, arguments)));
                        }
                        _class.prototype.didInsertElement = function () {
                            component.render(_extends({}, this.args), this.element);
                        };
                        return _class;
                    }(GlimmerComponent));
                },
            };
    },
    "./node_modules/zoid/src/drivers/index.js": function (module, __webpack_exports__, __webpack_require__) {
        const __WEBPACK_IMPORTED_MODULE_0__script__ = __webpack_require__("./node_modules/zoid/src/drivers/script.js");
        __webpack_require__.d(__webpack_exports__, "script", () => __WEBPACK_IMPORTED_MODULE_0__script__.a);
        const __WEBPACK_IMPORTED_MODULE_1__react__ = __webpack_require__("./node_modules/zoid/src/drivers/react.js");
        __webpack_require__.d(__webpack_exports__, "react", () => __WEBPACK_IMPORTED_MODULE_1__react__.a);
        const __WEBPACK_IMPORTED_MODULE_2__vue__ = __webpack_require__("./node_modules/zoid/src/drivers/vue.js");
        __webpack_require__.d(__webpack_exports__, "vue", () => __WEBPACK_IMPORTED_MODULE_2__vue__.a);
        const __WEBPACK_IMPORTED_MODULE_3__angular__ = __webpack_require__("./node_modules/zoid/src/drivers/angular.js");
        __webpack_require__.d(__webpack_exports__, "angular", () => __WEBPACK_IMPORTED_MODULE_3__angular__.a);
        const __WEBPACK_IMPORTED_MODULE_4__ember__ = __webpack_require__("./node_modules/zoid/src/drivers/ember.js");
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ember__);
        __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__ember__, "angular2") && __webpack_require__.d(__webpack_exports__, "angular2", () => __WEBPACK_IMPORTED_MODULE_4__ember__.angular2);
        __webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__ember__, "glimmer") && __webpack_require__.d(__webpack_exports__, "glimmer", () => __WEBPACK_IMPORTED_MODULE_4__ember__.glimmer);
        const __WEBPACK_IMPORTED_MODULE_5__glimmer__ = __webpack_require__("./node_modules/zoid/src/drivers/glimmer.js");
        __webpack_require__.d(__webpack_exports__, "glimmer", () => __WEBPACK_IMPORTED_MODULE_5__glimmer__.a);
        const __WEBPACK_IMPORTED_MODULE_6__angular2__ = __webpack_require__("./node_modules/zoid/src/drivers/angular2.js");
        __webpack_require__.d(__webpack_exports__, "angular2", () => __WEBPACK_IMPORTED_MODULE_6__angular2__.a);
    },
    "./node_modules/zoid/src/drivers/react.js": function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d(__webpack_exports__, "a", () => react);
        const __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./node_modules/zoid/src/lib/index.js"); var
            react = {
                global() {
                    if (window.React && window.ReactDOM) {
                        return {
                            React: window.React,
                            ReactDOM: window.ReactDOM,
                        };
                    }
                },
                register(component, _ref) {
                    const React = _ref.React; const
                        ReactDOM = _ref.ReactDOM;
                    React.createClass ? component.react = React.createClass({
                        render() {
                            return React.createElement("div", null);
                        },
                        componentDidMount() {
                            component.log("instantiate_react_component");
                            const el = ReactDOM.findDOMNode(this); const
                                parent = component.init(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.s)({}, this.props), null, el);
                            this.setState({
                                parent,
                            });
                            parent.render(el);
                        },
                        componentDidUpdate() {
                            this.state && this.state.parent && this.state.parent.updateProps(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.s)({}, this.props));
                        },
                    }) : component.react = (function (_React$Component) {
                        !(function (subClass, superClass) {
                            if (typeof superClass !== "function" && superClass !== null) throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`);
                            subClass.prototype = Object.create(superClass && superClass.prototype, {
                                constructor: {
                                    value: subClass,
                                    enumerable: !1,
                                    writable: !0,
                                    configurable: !0,
                                },
                            });
                            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                        }(_class, _React$Component));
                        function _class() {
                            !(function (instance, Constructor) {
                                if (!(instance instanceof _class)) throw new TypeError("Cannot call a class as a function");
                            }(this));
                            return (function (self, call) {
                                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !call || typeof call !== "object" && typeof call !== "function" ? self : call;
                            }(this, _React$Component.apply(this, arguments)));
                        }
                        _class.prototype.render = function () {
                            return React.createElement("div", null);
                        };
                        _class.prototype.componentDidMount = function () {
                            component.log("instantiate_react_component");
                            const el = ReactDOM.findDOMNode(this); const
                                parent = component.init(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.s)({}, this.props), null, el);
                            this.setState({
                                parent,
                            });
                            parent.render(el);
                        };
                        _class.prototype.componentDidUpdate = function () {
                            this.state && this.state.parent && this.state.parent.updateProps(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.s)({}, this.props));
                        };
                        return _class;
                    }(React.Component));
                    return component.react;
                },
            };
    },
    "./node_modules/zoid/src/drivers/script.js": function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d(__webpack_exports__, "a", () => script);
        var script = {
            global() {
                return window.document;
            },
            register: function register(component, document) {
                function render(element) {
                    if (element && element.tagName && element.tagName.toLowerCase() === "script" && element.attributes.type && element.attributes.type.value === "application/x-component" && element.parentNode) {
                        const tag = element.getAttribute("data-component");
                        if (tag && tag === component.tag) {
                            component.log("instantiate_script_component");
                            const props = element.innerText ? eval(`(${element.innerText})`) : {}; const
                                container = document.createElement("div");
                            if (!element.parentNode) throw new Error("Element has no parent");
                            element.parentNode.replaceChild(container, element);
                            component.render(props, container);
                        }
                    }
                }
                function scan() {
                    for (let scriptTags = Array.prototype.slice.call(document.getElementsByTagName("script")), _i2 = 0, _length2 = scriptTags == null ? 0 : scriptTags.length; _i2 < _length2; _i2++) render(scriptTags[_i2]);
                }
                scan();
                document.addEventListener("DOMContentLoaded", scan);
                window.addEventListener("load", scan);
                document.addEventListener("DOMNodeInserted", (event) => {
                    render(event.target);
                });
            },
        };
    },
    "./node_modules/zoid/src/drivers/vue.js": function (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d(__webpack_exports__, "a", () => vue);
        const __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__("./node_modules/zoid/src/lib/index.js"); var
            vue = {
                global() {},
                register(component) {
                    return {
                        render(createElement) {
                            return createElement("div");
                        },
                        inheritAttrs: !1,
                        mounted() {
                            const el = this.$el;
                            this.parent = component.init(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.s)({}, this.$attrs), null, el);
                            this.parent.render(el);
                        },
                        beforeUpdate() {
                            this.parent && this.$attrs && this.parent.updateProps(Object(__WEBPACK_IMPORTED_MODULE_0__lib__.s)({}, this.$attrs));
                        },
                    };
                },
            };
    },
    "./node_modules/zoid/src/error.js": function (module, __webpack_exports__, __webpack_require__) {
        __webpack_exports__.b = PopupOpenError;
        __webpack_exports__.a = IntegrationError;
        __webpack_exports__.c = RenderError;
        function PopupOpenError(message) {
            this.message = message;
        }
        PopupOpenError.prototype = Object.create(Error.prototype);
        function IntegrationError(message) {
            this.message = message;
        }
        IntegrationError.prototype = Object.create(Error.prototype);
        function RenderError(message) {
            this.message = message;
        }
        RenderError.prototype = Object.create(Error.prototype);
    },
    "./node_modules/zoid/src/lib/index.js": function (module, __webpack_exports__, __webpack_require__) {
        const src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"); const zalgo_promise_src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"); const cross_domain_safe_weakmap_src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"); const error = __webpack_require__("./node_modules/zoid/src/error.js"); const
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        function urlEncode(str) {
            return str.replace(/\?/g, "%3F").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\+/g, "%2B");
        }
        function camelToDasherize(string) {
            return string.replace(/([A-Z])/g, g => `-${g.toLowerCase()}`);
        }
        function dasherizeToCamel(string) {
            return string.replace(/-([a-z])/g, g => g[1].toUpperCase());
        }
        function extend(obj, source) {
            if (!source) return obj;
            for (const key in source) source.hasOwnProperty(key) && (obj[key] = source[key]);
            return obj;
        }
        function values(obj) {
            const results = [];
            for (const key in obj) obj.hasOwnProperty(key) && results.push(obj[key]);
            return results;
        }
        function uniqueID() {
            const chars = "0123456789abcdef";
            return "xxxxxxxxxx".replace(/./g, () => chars.charAt(Math.floor(Math.random() * chars.length)));
        }
        function stringifyWithFunctions(obj) {
            return JSON.stringify(obj, (key, val) => (typeof val === "function" ? val.toString() : val));
        }
        function safeGet(obj, prop) {
            let result = void 0;
            try {
                result = obj[prop];
            } catch (err) {}
            return result;
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
        function get(item, path, def) {
            if (!path) return def;
            for (let pathParts = path.split("."), i = 0; i < pathParts.length; i++) {
                if ((void 0 === item ? "undefined" : _typeof(item)) !== "object" || item === null) return def;
                item = item[pathParts[i]];
            }
            return void 0 === item ? def : item;
        }
        function safeInterval(method, time) {
            let timeout = void 0;
            timeout = setTimeout(function runInterval() {
                timeout = setTimeout(runInterval, time);
                method.call();
            }, time);
            return {
                cancel() {
                    clearTimeout(timeout);
                },
            };
        }
        function safeTimeout(method, time) {
            var interval = safeInterval(() => {
                if ((time -= 100) <= 0) {
                    interval.cancel();
                    method();
                }
            }, 100);
        }
        function each(item, callback) {
            if (item) {
                if (Array.isArray(item)) for (let len = item.length, i = 0; i < len; i++) callback(item[i], i); else if ((void 0 === item ? "undefined" : _typeof(item)) === "object") {
                    for (let keys = Object.keys(item), _len = keys.length, _i = 0; _i < _len; _i++) {
                        const key = keys[_i];
                        callback(item[key], key);
                    }
                }
            }
        }
        function replaceObject(item, replacers) {
            const fullKey = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
            if (Array.isArray(item)) {
                const _ret = (function () {
                    for (var length = item.length, result = [], _loop = function (i) {
                            Object.defineProperty(result, i, {
                                configurable: !0,
                                enumerable: !0,
                                get() {
                                    const itemKey = fullKey ? `${fullKey}.${i}` : `${i}`;


                                    const child = item[i];


                                    const type = void 0 === child ? "undefined" : _typeof(child);


                                    const replacer = replacers[type];
                                    if (replacer) {
                                        const replaced = replacer(child, i, itemKey);
                                        if (void 0 !== replaced) {
                                            result[i] = replaced;
                                            return result[i];
                                        }
                                    }
                                    if ((void 0 === child ? "undefined" : _typeof(child)) === "object" && child !== null) {
                                        result[i] = replaceObject(child, replacers, itemKey);
                                        return result[i];
                                    }
                                    result[i] = child;
                                    return result[i];
                                },
                                set(value) {
                                    delete result[i];
                                    result[i] = value;
                                },
                            });
                        }, i = 0; i < length; i++) _loop(i);
                    return {
                        v: result,
                    };
                }());
                if ((void 0 === _ret ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            } else {
                if ((void 0 === item ? "undefined" : _typeof(item)) !== "object" || item === null) throw new Error("Pass an object or array");
                const _ret3 = (function () {
                    const result = {}; const
                        _loop2 = function (key) {
                            if (!item.hasOwnProperty(key)) return "continue";
                            Object.defineProperty(result, key, {
                                configurable: !0,
                                enumerable: !0,
                                get() {
                                    const itemKey = fullKey ? `${fullKey}.${key}` : `${key}`;


                                    const child = item[key];


                                    const type = void 0 === child ? "undefined" : _typeof(child);


                                    const replacer = replacers[type];
                                    if (replacer) {
                                        const replaced = replacer(child, key, itemKey);
                                        if (void 0 !== replaced) {
                                            result[key] = replaced;
                                            return result[key];
                                        }
                                    }
                                    if ((void 0 === child ? "undefined" : _typeof(child)) === "object" && child !== null) {
                                        result[key] = replaceObject(child, replacers, itemKey);
                                        return result[key];
                                    }
                                    result[key] = child;
                                    return result[key];
                                },
                                set(value) {
                                    delete result[key];
                                    result[key] = value;
                                },
                            });
                        };
                    for (const key in item) _loop2(key);
                    return {
                        v: result,
                    };
                }());
                if ((void 0 === _ret3 ? "undefined" : _typeof(_ret3)) === "object") return _ret3.v;
            }
        }
        function copyProp(source, target, name, def) {
            if (source.hasOwnProperty(name)) {
                const descriptor = Object.getOwnPropertyDescriptor(source, name);
                Object.defineProperty(target, name, descriptor);
            } else target[name] = def;
        }
        function dotify(obj) {
            let prefix = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""; let
                newobj = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            prefix = prefix ? `${prefix}.` : prefix;
            for (const key in obj) {
                void 0 !== obj[key] && obj[key] !== null && typeof obj[key] !== "function" && (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(val => (void 0 === val ? "undefined" : _typeof(val)) !== "object") ? newobj[`${prefix}${key}`] = obj[key].join(",") : obj[key] && _typeof(obj[key]) === "object" ? newobj = dotify(obj[key], `${prefix}${key}`, newobj) : newobj[`${prefix}${key}`] = obj[key].toString());
            }
            return newobj;
        }
        const objectIDs = new cross_domain_safe_weakmap_src.a();
        function getObjectID(obj) {
            if (obj === null || void 0 === obj || (void 0 === obj ? "undefined" : _typeof(obj)) !== "object" && typeof obj !== "function") throw new Error("Invalid object");
            let uid = objectIDs.get(obj);
            if (!uid) {
                uid = `${void 0 === obj ? "undefined" : _typeof(obj)}:${uniqueID()}`;
                objectIDs.set(obj, uid);
            }
            return uid;
        }
        function regex(pattern, string) {
            const start = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
            typeof pattern === "string" && (pattern = new RegExp(pattern));
            const result = string.slice(start).match(pattern);
            if (result) {
                const index = result.index; const
                    match = result[0];
                return {
                    text: match,
                    groups: result.slice(1),
                    start: start + index,
                    end: start + index + match.length,
                    length: match.length,
                    replace(text) {
                        return match ? `${match.slice(0, start + index)}${text}${match.slice(index + match.length)}` : "";
                    },
                };
            }
        }
        function regexAll(pattern, string) {
            for (var matches = [], start = 0; ;) {
                const match = regex(pattern, string, start);
                if (!match) break;
                matches.push(match);
                start = match.end;
            }
            return matches;
        }
        function count(str, substr) {
            for (var startIndex = 0, itemCount = 0; ;) {
                const index = str.indexOf(substr, startIndex);
                if (index === -1) break;
                startIndex = index;
                itemCount += 1;
            }
            return itemCount;
        }
        function stringify(item) {
            return typeof item === "string" ? item : item && typeof item.toString === "function" ? item.toString() : Object.prototype.toString.call(item);
        }
        function stringifyError(err) {
            if (err) {
                const stack = err.stack; const
                    message = err.message;
                if (typeof stack === "string") return stack;
                if (typeof message === "string") return message;
            }
            return stringify(err);
        }
        function eventEmitter() {
            const triggered = {}; const
                handlers = {};
            return {
                on(eventName, handler) {
                    const handlerList = handlers[eventName] = handlers[eventName] || [];
                    handlerList.push(handler);
                    let cancelled = !1;
                    return {
                        cancel() {
                            if (!cancelled) {
                                cancelled = !0;
                                handlerList.splice(handlerList.indexOf(handler), 1);
                            }
                        },
                    };
                },
                once(eventName, handler) {
                    var listener = this.on(eventName, () => {
                        listener.cancel();
                        handler();
                    });
                    return listener;
                },
                trigger(eventName) {
                    const handlerList = handlers[eventName];
                    if (handlerList) {
                        for (let _i3 = 0, _length2 = handlerList == null ? 0 : handlerList.length; _i3 < _length2; _i3++) {
                            (0,
                            handlerList[_i3])();
                        }
                    }
                },
                triggerOnce(eventName) {
                    if (!triggered[eventName]) {
                        triggered[eventName] = !0;
                        this.trigger(eventName);
                    }
                },
            };
        }
        function isDefined(value) {
            return value !== null && void 0 !== value;
        }
        function cycle(method) {
            return zalgo_promise_src.a.try(method).then(() => cycle(method));
        }
        function promisify(method) {
            return function () {
                const _this = this; const
                    _arguments = arguments;
                return zalgo_promise_src.a.try(() => method.apply(_this, _arguments));
            };
        }
        function noop() {}
        function once(method) {
            let called = !1; let
                result = void 0;
            return function () {
                for (let _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                if (called) return result;
                called = !0;
                return result = method.apply(this, arguments);
            };
        }
        function memoize(method) {
            const results = {};
            return function () {
                for (let _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                let cacheKey = void 0;
                try {
                    cacheKey = JSON.stringify(Array.prototype.slice.call(arguments), (key, val) => (typeof val === "function" ? `zoid:memoize[${getObjectID(val)}]` : val));
                } catch (err) {
                    throw new Error("Arguments not serializable -- can not be used to memoize");
                }
                results.hasOwnProperty(cacheKey) || (results[cacheKey] = method.apply(this, arguments));
                return results[cacheKey];
            };
        }
        function debounce(method) {
            const time = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100; let
                timeout = void 0;
            return function () {
                const _this = this; const
                    _arguments = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => method.apply(_this, _arguments), time);
            };
        }
        function serializeFunctions(obj) {
            return replaceObject(obj, {
                function() {
                    return {
                        __type__: "__function__",
                    };
                },
            });
        }
        function deserializeFunctions(obj, handler) {
            return replaceObject(obj, {
                object(value, key, fullKey) {
                    if (value && value.__type__ === "__function__") {
                        return function () {
                            return handler({
                                key,
                                fullKey,
                                self: this,
                                args: arguments,
                            });
                        };
                    }
                },
            });
        }
        const _extends = Object.assign || function (target) {
            for (let i = 1; i < arguments.length; i++) {
                const source = arguments[i];
                for (const key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }; const
            dom__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        function appendChild(container, child) {
            container.appendChild(child);
        }
        function querySelectorAll(el, selector) {
            return Array.prototype.slice.call(el.querySelectorAll(selector));
        }
        function getElementSafe(id) {
            if (function (element) {
                return element instanceof window.Element || element !== null && (void 0 === element ? "undefined" : dom__typeof(element)) === "object" && element.nodeType === 1 && dom__typeof(element.style) === "object" && dom__typeof(element.ownerDocument) === "object";
            }(id)) return id;
            if (typeof id === "string") {
                let element = document.getElementById(id);
                if (element) return element;
                document.querySelector && (element = document.querySelector(id));
                if (element) return element;
            }
        }
        function getElement(id) {
            const element = getElementSafe(id);
            if (element) return element;
            throw new Error(`Can not find element: ${stringify(id)}`);
        }
        const documentReady = new zalgo_promise_src.a(((resolve) => {
            if (window.document.readyState === "complete") return resolve(window.document);
            var interval = setInterval(() => {
                if (window.document.readyState === "complete") {
                    clearInterval(interval);
                    return resolve(window.document);
                }
            }, 10);
        }));
        function isDocumentReady() {
            return window.document.readyState === "complete";
        }
        function elementReady(id) {
            return new zalgo_promise_src.a(((resolve, reject) => {
                const name = stringify(id); let
                    el = getElementSafe(id);
                if (el) return resolve(el);
                if (isDocumentReady()) return reject(new Error(`Document is ready and element ${name} does not exist`));
                var interval = setInterval(() => {
                    if (el = getElementSafe(id)) {
                        clearInterval(interval);
                        return resolve(el);
                    }
                    if (isDocumentReady()) {
                        clearInterval(interval);
                        return reject(new Error(`Document is ready and element ${name} does not exist`));
                    }
                }, 10);
            }));
        }
        function popup(url, options) {
            const params = Object.keys(options).map((key) => {
                if (options[key]) return `${key}=${stringify(options[key])}`;
            }).filter(Boolean).join(","); let
                win = void 0;
            try {
                win = window.open(url, options.name, params, !0);
            } catch (err) {
                throw new error.b(`Can not open popup window - ${err.stack || err.message}`);
            }
            if (Object(src.isWindowClosed)(win)) {
                let err;
                throw new error.b("Can not open popup window - blocked");
            }
            return win;
        }
        function writeToWindow(win, html) {
            try {
                win.document.open();
                win.document.write(html);
                win.document.close();
            } catch (err) {
                try {
                    win.location = `javascript: document.open(); document.write(${JSON.stringify(html)}); document.close();`;
                } catch (err2) {}
            }
        }
        function writeElementToWindow(win, el) {
            const tag = el.tagName.toLowerCase();
            if (tag !== "html") throw new Error(`Expected element to be html, got ${tag}`);
            for (var documentElement = win.document.documentElement; documentElement.children && documentElement.children.length;) documentElement.removeChild(documentElement.children[0]);
            for (;el.children.length;) documentElement.appendChild(el.children[0]);
        }
        function setStyle(el, styleText) {
            const doc = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window.document;
            el.styleSheet ? el.styleSheet.cssText = styleText : el.appendChild(doc.createTextNode(styleText));
        }
        function createElement() {
            let tag = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div"; const options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; const
                container = arguments[2];
            tag = tag.toLowerCase();
            const element = document.createElement(tag);
            options.style && extend(element.style, options.style);
            options.class && (element.className = options.class.join(" "));
            if (options.attributes) {
                for (let _i2 = 0, _Object$keys2 = Object.keys(options.attributes), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                    const key = _Object$keys2[_i2];
                    element.setAttribute(key, options.attributes[key]);
                }
            }
            options.styleSheet && setStyle(element, options.styleSheet);
            container && appendChild(container, element);
            if (options.html) {
                if (tag === "iframe") {
                    if (!container || !element.contentWindow) throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
                    writeToWindow(element.contentWindow, options.html);
                } else element.innerHTML = options.html;
            }
            return element;
        }
        const awaitFrameLoadPromises = new cross_domain_safe_weakmap_src.a();
        function awaitFrameLoad(frame) {
            if (awaitFrameLoadPromises.has(frame)) {
                const _promise = awaitFrameLoadPromises.get(frame);
                if (_promise) return _promise;
            }
            const promise = new zalgo_promise_src.a(((resolve, reject) => {
                frame.addEventListener("load", () => {
                    Object(src.linkFrameWindow)(frame);
                    resolve(frame);
                });
                frame.addEventListener("error", (err) => {
                    frame.contentWindow ? resolve(frame) : reject(err);
                });
            }));
            awaitFrameLoadPromises.set(frame, promise);
            return promise;
        }
        function awaitFrameWindow(frame) {
            return frame.contentWindow ? zalgo_promise_src.a.resolve(frame.contentWindow) : awaitFrameLoad(frame).then((loadedFrame) => {
                if (!loadedFrame.contentWindow) throw new Error("Could not find window in iframe");
                return loadedFrame.contentWindow;
            });
        }
        function iframe() {
            const options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; const el = getElement(arguments[1]); const attributes = options.attributes || {}; const style = options.style || {}; const
                frame = createElement("iframe", {
                    attributes: _extends({
                        frameBorder: "0",
                        allowTransparency: "true",
                    }, attributes),
                    style: _extends({
                        backgroundColor: "transparent",
                    }, style),
                    html: options.html,
                    class: options.class,
                });
            awaitFrameLoad(frame);
            el.appendChild(frame);
            (options.url || window.navigator.userAgent.match(/MSIE|Edge/i)) && frame.setAttribute("src", options.url || "about:blank");
            return frame;
        }
        function addEventListener(obj, event, handler) {
            obj.addEventListener(event, handler);
            return {
                cancel() {
                    obj.removeEventListener(event, handler);
                },
            };
        }
        const parseQuery = memoize((queryString) => {
            const params = {};
            if (!queryString) return params;
            if (queryString.indexOf("=") === -1) throw new Error(`Can not parse query string params: ${queryString}`);
            for (let _i4 = 0, _queryString$split2 = queryString.split("&"), _length4 = _queryString$split2 == null ? 0 : _queryString$split2.length; _i4 < _length4; _i4++) {
                let pair = _queryString$split2[_i4];
                (pair = pair.split("="))[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
            }
            return params;
        });
        function formatQuery() {
            const obj = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return Object.keys(obj).filter(key => typeof obj[key] === "string").map(key => `${urlEncode(key)}=${urlEncode(obj[key])}`).join("&");
        }
        function extendQuery(originalQuery) {
            const props = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return props && Object.keys(props).length ? formatQuery(_extends({}, parseQuery(originalQuery), props)) : originalQuery;
        }
        function extendUrl(url) {
            let originalHash; const options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; const query = options.query || {}; const hash = options.hash || {}; let originalUrl = void 0; const
                _url$split = url.split("#");
            originalUrl = _url$split[0];
            originalHash = _url$split[1];
            const _originalUrl$split = originalUrl.split("?");
            originalUrl = _originalUrl$split[0];
            const queryString = extendQuery(_originalUrl$split[1], query); const
                hashString = extendQuery(originalHash, hash);
            queryString && (originalUrl = `${originalUrl}?${queryString}`);
            hashString && (originalUrl = `${originalUrl}#${hashString}`);
            return originalUrl;
        }
        function elementStoppedMoving(element) {
            const timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3;
            return new zalgo_promise_src.a(((resolve, reject) => {
                const el = getElement(element); let start = el.getBoundingClientRect(); let interval = void 0; let
                    timer = void 0;
                interval = setInterval(() => {
                    const end = el.getBoundingClientRect();
                    if (start.top === end.top && start.bottom === end.bottom && start.left === end.left && start.right === end.right && start.width === end.width && start.height === end.height) {
                        clearTimeout(timer);
                        clearInterval(interval);
                        return resolve();
                    }
                    start = end;
                }, 50);
                timer = setTimeout(() => {
                    clearInterval(interval);
                    reject(new Error(`Timed out waiting for element to stop animating after ${timeout}ms`));
                }, timeout);
            }));
        }
        function getCurrentDimensions(el) {
            return {
                width: el.offsetWidth,
                height: el.offsetHeight,
            };
        }
        function changeStyle(el, styles) {
            return new zalgo_promise_src.a(((resolve) => {
                for (let _i6 = 0, _Object$keys4 = Object.keys(styles), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
                    const key = _Object$keys4[_i6];
                    el.style[key] = styles[key];
                }
                setTimeout(resolve, 1);
            }));
        }
        function setOverflow(el) {
            const value = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "auto"; const _el$style = el.style; const overflow = _el$style.overflow; const overflowX = _el$style.overflowX; const
                overflowY = _el$style.overflowY;
            el.style.overflow = el.style.overflowX = el.style.overflowY = value;
            return {
                reset() {
                    el.style.overflow = overflow;
                    el.style.overflowX = overflowX;
                    el.style.overflowY = overflowY;
                },
            };
        }
        function trackDimensions(el, _ref2) {
            const _ref2$width = _ref2.width; const width = void 0 === _ref2$width || _ref2$width; const _ref2$height = _ref2.height; const height = void 0 === _ref2$height || _ref2$height; const _ref2$threshold = _ref2.threshold; const threshold = void 0 === _ref2$threshold ? 0 : _ref2$threshold; let
                currentDimensions = getCurrentDimensions(el);
            return {
                check() {
                    const newDimensions = getCurrentDimensions(el);
                    return {
                        changed: (function (one, two, _ref) {
                            const _ref$width = _ref.width; const _ref$height = _ref.height; const height = void 0 === _ref$height || _ref$height; const _ref$threshold = _ref.threshold; const
                                threshold = void 0 === _ref$threshold ? 0 : _ref$threshold;
                            return !(void 0 !== _ref$width && !_ref$width || !(Math.abs(one.width - two.width) > threshold)) || !!(height && Math.abs(one.height - two.height) > threshold);
                        }(currentDimensions, newDimensions, {
                            width,
                            height,
                            threshold,
                        })),
                        dimensions: newDimensions,
                    };
                },
                reset() {
                    currentDimensions = getCurrentDimensions(el);
                },
            };
        }
        function onDimensionsChange(el, _ref3) {
            const _ref3$width = _ref3.width; const width = void 0 === _ref3$width || _ref3$width; const _ref3$height = _ref3.height; const height = void 0 === _ref3$height || _ref3$height; const _ref3$delay = _ref3.delay; const delay = void 0 === _ref3$delay ? 50 : _ref3$delay; const _ref3$threshold = _ref3.threshold; const
                threshold = void 0 === _ref3$threshold ? 0 : _ref3$threshold;
            return new zalgo_promise_src.a(((resolve) => {
                const tracker = trackDimensions(el, {
                    width,
                    height,
                    threshold,
                }); let interval = void 0; const
                    resolver = debounce((dimensions) => {
                        clearInterval(interval);
                        return resolve(dimensions);
                    }, 4 * delay);
                interval = setInterval(() => {
                    const _tracker$check = tracker.check(); const changed = _tracker$check.changed; const
                        dimensions = _tracker$check.dimensions;
                    if (changed) {
                        tracker.reset();
                        return resolver(dimensions);
                    }
                }, delay);
                window.addEventListener("resize", function onWindowResize() {
                    const _tracker$check2 = tracker.check(); const changed = _tracker$check2.changed; const
                        dimensions = _tracker$check2.dimensions;
                    if (changed) {
                        tracker.reset();
                        window.removeEventListener("resize", onWindowResize);
                        resolver(dimensions);
                    }
                });
            }));
        }
        function dimensionsMatchViewport(el, _ref4) {
            const width = _ref4.width; const height = _ref4.height; const
                dimensions = getCurrentDimensions(el);
            return !(width && dimensions.width !== window.innerWidth || height && dimensions.height !== window.innerHeight);
        }
        function bindEvents(element, eventNames, handler) {
            handler = once(handler);
            for (let _i8 = 0, _length8 = eventNames == null ? 0 : eventNames.length; _i8 < _length8; _i8++) {
                const eventName = eventNames[_i8];
                element.addEventListener(eventName, handler);
            }
            return {
                cancel: once(() => {
                    for (let _i10 = 0, _length10 = eventNames == null ? 0 : eventNames.length; _i10 < _length10; _i10++) {
                        const _eventName = eventNames[_i10];
                        element.removeEventListener(_eventName, handler);
                    }
                }),
            };
        }
        const VENDOR_PREFIXES = ["webkit", "moz", "ms", "o"];
        function setVendorCSS(element, name, value) {
            element.style[name] = value;
            for (let capitalizedName = capitalizeFirstLetter(name), _i12 = 0, _length12 = VENDOR_PREFIXES == null ? 0 : VENDOR_PREFIXES.length; _i12 < _length12; _i12++) {
                const prefix = VENDOR_PREFIXES[_i12];
                element.style[`${prefix}${capitalizedName}`] = value;
            }
        }
        const CSSRule = window.CSSRule; const KEYFRAMES_RULE = CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE || CSSRule.MOZ_KEYFRAMES_RULE || CSSRule.O_KEYFRAMES_RULE || CSSRule.MS_KEYFRAMES_RULE; const ANIMATION_START_EVENTS = ["animationstart", "webkitAnimationStart", "oAnimationStart", "MSAnimationStart"]; const
            ANIMATION_END_EVENTS = ["animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd"];
        function animate(element, name, clean) {
            const timeout = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1e3;
            return new zalgo_promise_src.a(((resolve, reject) => {
                const el = getElement(element);
                if (!el || !(function (element, name) {
                    const stylesheets = el.ownerDocument.styleSheets;
                    try {
                        for (let i = 0; i < stylesheets.length; i++) {
                            const cssRules = stylesheets[i].cssRules;
                            if (cssRules) {
                                for (let j = 0; j < cssRules.length; j++) {
                                    const cssRule = cssRules[j];
                                    if (cssRule && cssRule.type === KEYFRAMES_RULE && cssRule.name === name) return !0;
                                }
                            }
                        }
                    } catch (err) {
                        return !1;
                    }
                    return !1;
                }(0, name))) return resolve();
                let hasStarted = !1; let startTimeout = void 0; let endTimeout = void 0; let startEvent = void 0; let
                    endEvent = void 0;
                function cleanUp() {
                    setVendorCSS(el, "animationName", "");
                    clearTimeout(startTimeout);
                    clearTimeout(endTimeout);
                    startEvent.cancel();
                    endEvent.cancel();
                }
                startEvent = bindEvents(el, ANIMATION_START_EVENTS, (event) => {
                    if (event.target === el && event.animationName === name) {
                        clearTimeout(startTimeout);
                        event.stopPropagation();
                        startEvent.cancel();
                        hasStarted = !0;
                        endTimeout = setTimeout(() => {
                            cleanUp();
                            resolve();
                        }, timeout);
                    }
                });
                endEvent = bindEvents(el, ANIMATION_END_EVENTS, (event) => {
                    if (event.target === el && event.animationName === name) {
                        cleanUp();
                        return typeof event.animationName === "string" && event.animationName !== name ? reject(`Expected animation name to be ${name}, found ${event.animationName}`) : resolve();
                    }
                });
                setVendorCSS(el, "animationName", name);
                startTimeout = setTimeout(() => {
                    if (!hasStarted) {
                        cleanUp();
                        return resolve();
                    }
                }, 200);
                clean && clean(cleanUp);
            }));
        }
        const STYLE = {
            DISPLAY: {
                NONE: "none",
                BLOCK: "block",
            },
            VISIBILITY: {
                VISIBLE: "visible",
                HIDDEN: "hidden",
            },
            IMPORTANT: "important",
        };
        function makeElementVisible(element) {
            element.style.setProperty("visibility", "");
        }
        function makeElementInvisible(element) {
            element.style.setProperty("visibility", STYLE.VISIBILITY.HIDDEN, STYLE.IMPORTANT);
        }
        function showElement(element) {
            element.style.setProperty("display", "");
        }
        function hideElement(element) {
            element.style.setProperty("display", STYLE.DISPLAY.NONE, STYLE.IMPORTANT);
        }
        function destroyElement(element) {
            element.parentNode && element.parentNode.removeChild(element);
        }
        function showAndAnimate(element, name, clean) {
            const animation = animate(element, name, clean);
            showElement(element);
            return animation;
        }
        function animateAndHide(element, name, clean) {
            return animate(element, name, clean).then(() => {
                hideElement(element);
            });
        }
        function addClass(element, name) {
            element.classList ? element.classList.add(name) : element.className.split(/\s+/).indexOf(name) === -1 && (element.className += ` ${name}`);
        }
        function removeClass(element, name) {
            element.classList ? element.classList.remove(name) : element.className.split(/\s+/).indexOf(name) !== -1 && (element.className = element.className.replace(name, ""));
        }
        function getCurrentScriptDir() {
            console.warn("Do not use zoid.getCurrentScriptDir() in production -- browser support is limited");
            return document.currentScript ? document.currentScript.src.split("/").slice(0, -1).join("/") : ".";
        }
        function getElementName(element) {
            if (typeof element === "string") return element;
            if (!element || !element.tagName) return "<unknown>";
            let name = element.tagName.toLowerCase();
            element.id ? name += `#${element.id}` : element.className && (name += `.${element.className.split(" ").join(".")}`);
            return name;
        }
        function isElementClosed(el) {
            return !el || !el.parentNode;
        }
        function watchElementForClose(element, handler) {
            handler = once(handler);
            let interval = void 0;
            isElementClosed(element) ? handler() : interval = safeInterval(() => {
                if (isElementClosed(element)) {
                    interval.cancel();
                    handler();
                }
            }, 50);
            return {
                cancel() {
                    interval && interval.cancel();
                },
            };
        }
        function getHttpType(contentType, url) {
            return new zalgo_promise_src.a(((resolve, reject) => {
                const req = new window.XMLHttpRequest();
                req.open("GET", url);
                req.setRequestHeader("Accept", contentType);
                req.send(null);
                req.onload = function () {
                    resolve(req.responseText);
                };
                req.onerror = function () {
                    return reject(new Error("prefetch failed"));
                };
            }));
        }
        function getHTML(url) {
            return getHttpType("text/html", url);
        }
        function getCSS(url) {
            return getHttpType("text/css", url);
        }
        function getScript(url) {
            return getHttpType("*/*", url);
        }
        function prefetchPage(url) {
            return getHTML(url);
        }
        const JSX_EVENTS = {
            onClick: "click",
        };
        function fixScripts(el) {
            for (let doc = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.document, _i14 = 0, _querySelectorAll2 = querySelectorAll(el, "script"), _length14 = _querySelectorAll2 == null ? 0 : _querySelectorAll2.length; _i14 < _length14; _i14++) {
                const script = _querySelectorAll2[_i14]; const
                    newScript = doc.createElement("script");
                newScript.text = script.textContent;
                script.parentNode.replaceChild(newScript, script);
            }
        }
        function jsxDom(element, props) {
            for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) children[_key - 2] = arguments[_key];
            if (typeof element === "function") return element(props, children);
            const name = element.toLowerCase(); const doc = this && this.createElement ? this : window.document; const
                el = doc.createElement(name);
            for (const prop in props) {
                if (prop in JSX_EVENTS) el.addEventListener(JSX_EVENTS[prop], props[prop]); else if (prop === "innerHTML") {
                    el.innerHTML = props[prop];
                    fixScripts(el, doc);
                } else el.setAttribute(prop, props[prop]);
            }
            const content = children[0]; const
                remaining = children.slice(1);
            if (name === "style") {
                if (typeof content !== "string") throw new TypeError(`Expected ${name} tag content to be string, got ${void 0 === content ? "undefined" : dom__typeof(content)}`);
                if (remaining.length) throw new Error(`Expected only text content for ${name} tag`);
                setStyle(el, content, doc);
            } else if (name === "iframe") {
                if (remaining.length) throw new Error("Expected only single child node for iframe");
                el.addEventListener("load", () => {
                    const win = el.contentWindow;
                    if (!win) throw new Error("Expected frame to have contentWindow");
                    typeof content === "string" ? writeToWindow(win, content) : writeElementToWindow(win, content);
                });
            } else if (name === "script") {
                if (typeof content !== "string") throw new TypeError(`Expected ${name} tag content to be string, got ${void 0 === content ? "undefined" : dom__typeof(content)}`);
                if (remaining.length) throw new Error(`Expected only text content for ${name} tag`);
                el.text = content;
            } else {
                for (let i = 0; i < children.length; i++) {
                    if (typeof children[i] === "string") {
                        const textNode = doc.createTextNode(children[i]);
                        appendChild(el, textNode);
                    } else appendChild(el, children[i]);
                }
            }
            return el;
        }
        function isPerc(str) {
            return typeof str === "string" && /^[0-9]+%$/.test(str);
        }
        function isPx(str) {
            return typeof str === "string" && /^[0-9]+px$/.test(str);
        }
        function toNum(val) {
            if (typeof val === "number") return val;
            const match = val.match(/^([0-9]+)(px|%)$/);
            if (!match) throw new Error(`Could not match css value from ${val}`);
            return parseInt(match[1], 10);
        }
        function toPx(val) {
            return `${toNum(val)}px`;
        }
        function toCSS(val) {
            return typeof val === "number" ? toPx(val) : isPerc(val) ? val : toPx(val);
        }
        function percOf(num, perc) {
            return parseInt(num * toNum(perc) / 100, 10);
        }
        function normalizeDimension(dim, max) {
            if (typeof dim === "number") return dim;
            if (isPerc(dim)) return percOf(max, dim);
            if (isPx(dim)) return toNum(dim);
            throw new Error(`Can not normalize dimension: ${dim}`);
        }
        function memoized(target, name, descriptor) {
            const method = descriptor.value;
            descriptor.value = function () {
                this.__memoized__ = this.__memoized__ || {};
                this.__memoized__.hasOwnProperty(name) || (this.__memoized__[name] = method.apply(this, arguments));
                return this.__memoized__[name];
            };
            descriptor.value.displayName = `${name}:memoized`;
        }
        function decorators_promise(target, name, descriptor) {
            const method = descriptor.value;
            descriptor.value = function () {
                return zalgo_promise_src.a.try(method, this, arguments);
            };
            descriptor.value.displayName = `${name}:promisified`;
        }
        let logger = void 0;
        function useLogger(newLogger) {
            logger = newLogger;
        }
        function info(name, event) {
            const payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            logger && logger.info(`xc_${name}_${event}`, payload);
        }
        function warn(name, event) {
            const payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            logger && logger.warn(`xc_${name}_${event}`, payload);
        }
        function logger_error(name, event) {
            const payload = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            logger && logger.error(`xc_${name}_${event}`, payload);
        }
        const constants = __webpack_require__("./node_modules/zoid/src/constants.js");
        function globalFor(win) {
            if (Object(src.isSameDomain)(win)) {
                win[constants.__ZOID__] || (win[constants.__ZOID__] = {});
                return win[constants.__ZOID__];
            }
        }
        function localGlobal() {
            const global = globalFor(window);
            if (!global) throw new Error("Could not get local global");
            return global;
        }
        const global = localGlobal();
        __webpack_require__.d(__webpack_exports__, "d", () => appendChild);
        __webpack_require__.d(__webpack_exports__, !1, () => querySelectorAll);
        __webpack_require__.d(__webpack_exports__, !1, () => getElementSafe);
        __webpack_require__.d(__webpack_exports__, "w", () => getElement);
        __webpack_require__.d(__webpack_exports__, "m", () => documentReady);
        __webpack_require__.d(__webpack_exports__, !1, () => isDocumentReady);
        __webpack_require__.d(__webpack_exports__, "o", () => elementReady);
        __webpack_require__.d(__webpack_exports__, "M", () => popup);
        __webpack_require__.d(__webpack_exports__, "_4", () => writeToWindow);
        __webpack_require__.d(__webpack_exports__, "_3", () => writeElementToWindow);
        __webpack_require__.d(__webpack_exports__, !1, () => setStyle);
        __webpack_require__.d(__webpack_exports__, !1, () => createElement);
        __webpack_require__.d(__webpack_exports__, "e", () => awaitFrameLoad);
        __webpack_require__.d(__webpack_exports__, "f", () => awaitFrameWindow);
        __webpack_require__.d(__webpack_exports__, "A", () => iframe);
        __webpack_require__.d(__webpack_exports__, "b", () => addEventListener);
        __webpack_require__.d(__webpack_exports__, !1, () => parseQuery);
        __webpack_require__.d(__webpack_exports__, !1, () => formatQuery);
        __webpack_require__.d(__webpack_exports__, !1, () => extendQuery);
        __webpack_require__.d(__webpack_exports__, "t", () => extendUrl);
        __webpack_require__.d(__webpack_exports__, "p", () => elementStoppedMoving);
        __webpack_require__.d(__webpack_exports__, !1, () => getCurrentDimensions);
        __webpack_require__.d(__webpack_exports__, !1, () => changeStyle);
        __webpack_require__.d(__webpack_exports__, "S", () => setOverflow);
        __webpack_require__.d(__webpack_exports__, "Y", () => trackDimensions);
        __webpack_require__.d(__webpack_exports__, "K", () => onDimensionsChange);
        __webpack_require__.d(__webpack_exports__, "l", () => dimensionsMatchViewport);
        __webpack_require__.d(__webpack_exports__, !1, () => bindEvents);
        __webpack_require__.d(__webpack_exports__, !1, () => setVendorCSS);
        __webpack_require__.d(__webpack_exports__, !1, () => animate);
        __webpack_require__.d(__webpack_exports__, !1, () => makeElementVisible);
        __webpack_require__.d(__webpack_exports__, !1, () => makeElementInvisible);
        __webpack_require__.d(__webpack_exports__, "U", () => showElement);
        __webpack_require__.d(__webpack_exports__, "z", () => hideElement);
        __webpack_require__.d(__webpack_exports__, "k", () => destroyElement);
        __webpack_require__.d(__webpack_exports__, "T", () => showAndAnimate);
        __webpack_require__.d(__webpack_exports__, "c", () => animateAndHide);
        __webpack_require__.d(__webpack_exports__, "a", () => addClass);
        __webpack_require__.d(__webpack_exports__, "P", () => removeClass);
        __webpack_require__.d(__webpack_exports__, "v", () => getCurrentScriptDir);
        __webpack_require__.d(__webpack_exports__, !1, () => getElementName);
        __webpack_require__.d(__webpack_exports__, !1, () => isElementClosed);
        __webpack_require__.d(__webpack_exports__, "_2", () => watchElementForClose);
        __webpack_require__.d(__webpack_exports__, !1, () => getHttpType);
        __webpack_require__.d(__webpack_exports__, !1, () => getHTML);
        __webpack_require__.d(__webpack_exports__, !1, () => getCSS);
        __webpack_require__.d(__webpack_exports__, !1, () => getScript);
        __webpack_require__.d(__webpack_exports__, "N", () => prefetchPage);
        __webpack_require__.d(__webpack_exports__, !1, () => fixScripts);
        __webpack_require__.d(__webpack_exports__, "F", () => jsxDom);
        __webpack_require__.d(__webpack_exports__, "I", () => noop);
        __webpack_require__.d(__webpack_exports__, "L", () => once);
        __webpack_require__.d(__webpack_exports__, "G", () => memoize);
        __webpack_require__.d(__webpack_exports__, !1, () => debounce);
        __webpack_require__.d(__webpack_exports__, "R", () => serializeFunctions);
        __webpack_require__.d(__webpack_exports__, "j", () => deserializeFunctions);
        __webpack_require__.d(__webpack_exports__, !1, () => urlEncode);
        __webpack_require__.d(__webpack_exports__, !1, () => camelToDasherize);
        __webpack_require__.d(__webpack_exports__, "i", () => dasherizeToCamel);
        __webpack_require__.d(__webpack_exports__, "s", () => extend);
        __webpack_require__.d(__webpack_exports__, !1, () => values);
        __webpack_require__.d(__webpack_exports__, "Z", () => uniqueID);
        __webpack_require__.d(__webpack_exports__, !1, () => stringifyWithFunctions);
        __webpack_require__.d(__webpack_exports__, !1, () => safeGet);
        __webpack_require__.d(__webpack_exports__, !1, () => capitalizeFirstLetter);
        __webpack_require__.d(__webpack_exports__, "u", () => get);
        __webpack_require__.d(__webpack_exports__, !1, () => safeInterval);
        __webpack_require__.d(__webpack_exports__, !1, () => safeTimeout);
        __webpack_require__.d(__webpack_exports__, !1, () => each);
        __webpack_require__.d(__webpack_exports__, "Q", () => replaceObject);
        __webpack_require__.d(__webpack_exports__, "g", () => copyProp);
        __webpack_require__.d(__webpack_exports__, "n", () => dotify);
        __webpack_require__.d(__webpack_exports__, !1, () => getObjectID);
        __webpack_require__.d(__webpack_exports__, !1, () => regex);
        __webpack_require__.d(__webpack_exports__, !1, () => regexAll);
        __webpack_require__.d(__webpack_exports__, !1, () => count);
        __webpack_require__.d(__webpack_exports__, "V", () => stringify);
        __webpack_require__.d(__webpack_exports__, "W", () => stringifyError);
        __webpack_require__.d(__webpack_exports__, "r", () => eventEmitter);
        __webpack_require__.d(__webpack_exports__, "C", () => isDefined);
        __webpack_require__.d(__webpack_exports__, "h", () => cycle);
        __webpack_require__.d(__webpack_exports__, "O", () => promisify);
        __webpack_require__.d(__webpack_exports__, "D", () => isPerc);
        __webpack_require__.d(__webpack_exports__, "E", () => isPx);
        __webpack_require__.d(__webpack_exports__, !1, () => toNum);
        __webpack_require__.d(__webpack_exports__, !1, () => toPx);
        __webpack_require__.d(__webpack_exports__, "X", () => toCSS);
        __webpack_require__.d(__webpack_exports__, !1, () => percOf);
        __webpack_require__.d(__webpack_exports__, "J", () => normalizeDimension);
        __webpack_require__.d(__webpack_exports__, "H", () => memoized);
        __webpack_require__.d(__webpack_exports__, !1, () => decorators_promise);
        __webpack_require__.d(__webpack_exports__, "_0", () => useLogger);
        __webpack_require__.d(__webpack_exports__, "B", () => info);
        __webpack_require__.d(__webpack_exports__, "_1", () => warn);
        __webpack_require__.d(__webpack_exports__, "q", () => logger_error);
        __webpack_require__.d(__webpack_exports__, "y", () => globalFor);
        __webpack_require__.d(__webpack_exports__, !1, () => localGlobal);
        __webpack_require__.d(__webpack_exports__, "x", () => global);
    },
    "./node_modules/zoid/src/types.js": function (module, exports) {},
    "./src/index.js": function (module, __webpack_exports__, __webpack_require__) {
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0,
        });
        const interface_namespaceObject = {};
        __webpack_require__.d(interface_namespaceObject, "cleanUpWindow", () => cleanUpWindow);
        __webpack_require__.d(interface_namespaceObject, "Promise", () => src.a);
        __webpack_require__.d(interface_namespaceObject, "bridge", () => bridge);
        __webpack_require__.d(interface_namespaceObject, "init", () => interface_init);
        __webpack_require__.d(interface_namespaceObject, "parent", () => public_parent);
        __webpack_require__.d(interface_namespaceObject, "send", () => _send);
        __webpack_require__.d(interface_namespaceObject, "request", () => request);
        __webpack_require__.d(interface_namespaceObject, "sendToParent", () => client_sendToParent);
        __webpack_require__.d(interface_namespaceObject, "client", () => client);
        __webpack_require__.d(interface_namespaceObject, "on", () => _on);
        __webpack_require__.d(interface_namespaceObject, "listen", () => server_listen);
        __webpack_require__.d(interface_namespaceObject, "once", () => once);
        __webpack_require__.d(interface_namespaceObject, "listener", () => server_listener);
        __webpack_require__.d(interface_namespaceObject, "CONFIG", () => conf.a);
        __webpack_require__.d(interface_namespaceObject, "CONSTANTS", () => conf.b);
        __webpack_require__.d(interface_namespaceObject, "disable", () => disable);
        const src_namespaceObject = {};
        __webpack_require__.d(src_namespaceObject, "default", () => post_robot_src);
        __webpack_require__.d(src_namespaceObject, "cleanUpWindow", () => cleanUpWindow);
        __webpack_require__.d(src_namespaceObject, "Promise", () => src.a);
        __webpack_require__.d(src_namespaceObject, "bridge", () => bridge);
        __webpack_require__.d(src_namespaceObject, "init", () => interface_init);
        __webpack_require__.d(src_namespaceObject, "parent", () => public_parent);
        __webpack_require__.d(src_namespaceObject, "send", () => _send);
        __webpack_require__.d(src_namespaceObject, "request", () => request);
        __webpack_require__.d(src_namespaceObject, "sendToParent", () => client_sendToParent);
        __webpack_require__.d(src_namespaceObject, "client", () => client);
        __webpack_require__.d(src_namespaceObject, "on", () => _on);
        __webpack_require__.d(src_namespaceObject, "listen", () => server_listen);
        __webpack_require__.d(src_namespaceObject, "once", () => once);
        __webpack_require__.d(src_namespaceObject, "listener", () => server_listener);
        __webpack_require__.d(src_namespaceObject, "CONFIG", () => conf.a);
        __webpack_require__.d(src_namespaceObject, "CONSTANTS", () => conf.b);
        __webpack_require__.d(src_namespaceObject, "disable", () => disable);
        const src_interface_namespaceObject = {};
        __webpack_require__.d(src_interface_namespaceObject, "create", () => create);
        __webpack_require__.d(src_interface_namespaceObject, "getByTag", () => getByTag);
        __webpack_require__.d(src_interface_namespaceObject, "getCurrentScriptDir", () => src_lib.v);
        __webpack_require__.d(src_interface_namespaceObject, "useLogger", () => src_lib._0);
        __webpack_require__.d(src_interface_namespaceObject, "destroyAll", () => interface_destroyAll);
        __webpack_require__.d(src_interface_namespaceObject, "postRobot", () => postRobot);
        __webpack_require__.d(src_interface_namespaceObject, "CONSTANTS", () => interface_CONSTANTS);
        __webpack_require__.d(src_interface_namespaceObject, "PopupOpenError", () => src_error.b);
        __webpack_require__.d(src_interface_namespaceObject, "IntegrationError", () => src_error.a);
        __webpack_require__.d(src_interface_namespaceObject, "RenderError", () => src_error.c);
        var src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"); const lib = __webpack_require__("./node_modules/post-robot/src/lib/index.js"); const cross_domain_utils_src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"); var conf = __webpack_require__("./node_modules/post-robot/src/conf/index.js"); const src_global = __webpack_require__("./node_modules/post-robot/src/global.js"); const
            SEND_MESSAGE_STRATEGIES = {};
        SEND_MESSAGE_STRATEGIES[conf.b.SEND_STRATEGIES.POST_MESSAGE] = function (win, serializedMessage, domain) {
            try {
                __webpack_require__("./node_modules/post-robot/src/compat/index.js").emulateIERestrictions(window, win);
            } catch (err) {
                return;
            }
            (Array.isArray(domain) ? domain : typeof domain === "string" ? [domain] : [conf.b.WILDCARD]).map((dom) => {
                if (dom.indexOf(conf.b.MOCK_PROTOCOL) === 0) {
                    if (window.location.protocol === conf.b.FILE_PROTOCOL) return conf.b.WILDCARD;
                    if (!Object(cross_domain_utils_src.isActuallySameDomain)(win)) throw new Error(`Attempting to send messsage to mock domain ${dom}, but window is actually cross-domain`);
                    return Object(cross_domain_utils_src.getActualDomain)(win);
                }
                return dom.indexOf(conf.b.FILE_PROTOCOL) === 0 ? conf.b.WILDCARD : dom;
            }).forEach(dom => win.postMessage(serializedMessage, dom));
        };
        const _require = __webpack_require__("./node_modules/post-robot/src/bridge/index.js"); const sendBridgeMessage = _require.sendBridgeMessage; const needsBridgeForBrowser = _require.needsBridgeForBrowser; const
            isBridge = _require.isBridge;
        SEND_MESSAGE_STRATEGIES[conf.b.SEND_STRATEGIES.BRIDGE] = function (win, serializedMessage, domain) {
            if (needsBridgeForBrowser() || isBridge()) {
                if (Object(cross_domain_utils_src.isSameDomain)(win)) throw new Error("Post message through bridge disabled between same domain windows");
                if (!1 !== Object(cross_domain_utils_src.isSameTopWindow)(window, win)) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
                return sendBridgeMessage(win, serializedMessage, domain);
            }
        };
        SEND_MESSAGE_STRATEGIES[conf.b.SEND_STRATEGIES.GLOBAL] = function (win, serializedMessage) {
            if (Object(lib.i)()) {
                if (!Object(cross_domain_utils_src.isSameDomain)(win)) throw new Error("Post message through global disabled between different domain windows");
                if (!1 !== Object(cross_domain_utils_src.isSameTopWindow)(window, win)) throw new Error("Can only use global to communicate between two different windows, not between frames");
                const foreignGlobal = win[conf.b.WINDOW_PROPS.POSTROBOT];
                if (!foreignGlobal) throw new Error("Can not find postRobot global on foreign window");
                return foreignGlobal.receiveMessage({
                    source: window,
                    origin: Object(cross_domain_utils_src.getDomain)(),
                    data: serializedMessage,
                });
            }
        };
        const _extends = Object.assign || function (target) {
            for (let i = 1; i < arguments.length; i++) {
                const source = arguments[i];
                for (const key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
        function sendMessage(win, message, domain) {
            return src.a.try(() => {
                let _jsonStringify;
                message = (function (win, message) {
                    const options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}; const id = Object(lib.q)(); const type = Object(lib.c)(); const
                        sourceDomain = Object(cross_domain_utils_src.getDomain)(window);
                    return _extends({}, message, options, {
                        sourceDomain,
                        id: message.id || id,
                        windowType: type,
                    });
                }(win, message, {
                    data: Object(lib.o)(win, domain, message.data),
                    domain,
                }));
                if (win === window && !conf.a.ALLOW_SAME_ORIGIN) throw new Error("Attemping to send message to self");
                if (Object(cross_domain_utils_src.isWindowClosed)(win)) throw new Error("Window is closed");
                const messages = []; const
                    serializedMessage = Object(lib.g)(((_jsonStringify = {})[conf.b.WINDOW_PROPS.POSTROBOT] = message,
                    _jsonStringify), null, 2);
                return src.a.map(Object.keys(SEND_MESSAGE_STRATEGIES), strategyName => src.a.try(() => {
                    if (!conf.a.ALLOWED_POST_MESSAGE_METHODS[strategyName]) throw new Error(`Strategy disallowed: ${strategyName}`);
                    return SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                }).then(() => {
                    messages.push(`${strategyName}: success`);
                    return !0;
                }, (err) => {
                    messages.push(`${strategyName}: ${Object(lib.p)(err)}\n`);
                    return !1;
                })).then((results) => {
                    const success = results.some(Boolean); const
                        status = `${message.type} ${message.name} ${success ? "success" : "error"}:\n  - ${messages.join("\n  - ")}\n`;
                    if (!success) throw new Error(status);
                });
            });
        }
        const cross_domain_safe_weakmap_src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js");
        src_global.a.responseListeners = src_global.a.responseListeners || {};
        src_global.a.requestListeners = src_global.a.requestListeners || {};
        src_global.a.WINDOW_WILDCARD = src_global.a.WINDOW_WILDCARD || new function () {}();
        src_global.a.erroredResponseListeners = src_global.a.erroredResponseListeners || {};
        let _RECEIVE_MESSAGE_TYPE; const
            __DOMAIN_REGEX__ = "__domain_regex__";
        function getResponseListener(hash) {
            return src_global.a.responseListeners[hash];
        }
        function deleteResponseListener(hash) {
            delete src_global.a.responseListeners[hash];
        }
        function isResponseListenerErrored(hash) {
            return Boolean(src_global.a.erroredResponseListeners[hash]);
        }
        function getRequestListener(_ref) {
            const name = _ref.name; let win = _ref.win; let
                domain = _ref.domain;
            win === conf.b.WILDCARD && (win = null);
            domain === conf.b.WILDCARD && (domain = null);
            if (!name) throw new Error("Name required to get request listener");
            const nameListeners = src_global.a.requestListeners[name];
            if (nameListeners) {
                for (let _i2 = 0, _ref3 = [win, src_global.a.WINDOW_WILDCARD], _length2 = _ref3 == null ? 0 : _ref3.length; _i2 < _length2; _i2++) {
                    const winQualifier = _ref3[_i2]; const
                        winListeners = winQualifier && nameListeners.get(winQualifier);
                    if (winListeners) {
                        if (domain && typeof domain === "string") {
                            if (winListeners[domain]) return winListeners[domain];
                            if (winListeners[__DOMAIN_REGEX__]) {
                                for (let _i4 = 0, _winListeners$__DOMAI2 = winListeners[__DOMAIN_REGEX__], _length4 = _winListeners$__DOMAI2 == null ? 0 : _winListeners$__DOMAI2.length; _i4 < _length4; _i4++) {
                                    const _ref5 = _winListeners$__DOMAI2[_i4]; const regex = _ref5.regex; const
                                        listener = _ref5.listener;
                                    if (Object(cross_domain_utils_src.matchDomain)(regex, domain)) return listener;
                                }
                            }
                        }
                        if (winListeners[conf.b.WILDCARD]) return winListeners[conf.b.WILDCARD];
                    }
                }
            }
        }
        const types__extends = Object.assign || function (target) {
            for (let i = 1; i < arguments.length; i++) {
                const source = arguments[i];
                for (const key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }; const RECEIVE_MESSAGE_TYPES = ((_RECEIVE_MESSAGE_TYPE = {})[conf.b.POST_MESSAGE_TYPE.ACK] = function (source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                const options = getResponseListener(message.hash);
                if (!options) throw new Error(`No handler found for post message ack for message: ${message.name} from ${origin} in ${window.location.protocol}//${window.location.host}${window.location.pathname}`);
                if (!Object(cross_domain_utils_src.matchDomain)(options.domain, origin)) throw new Error(`Ack origin ${origin} does not match domain ${options.domain.toString()}`);
                options.ack = !0;
            }
        }, _RECEIVE_MESSAGE_TYPE[conf.b.POST_MESSAGE_TYPE.REQUEST] = function (source, origin, message) {
            const options = getRequestListener({
                name: message.name,
                win: source,
                domain: origin,
            });
            function respond(data) {
                return message.fireAndForget || Object(cross_domain_utils_src.isWindowClosed)(source) ? src.a.resolve() : sendMessage(source, types__extends({
                    target: message.originalSource,
                    hash: message.hash,
                    name: message.name,
                }, data), origin);
            }
            return src.a.all([respond({
                type: conf.b.POST_MESSAGE_TYPE.ACK,
            }), src.a.try(() => {
                if (!options) throw new Error(`No handler found for post message: ${message.name} from ${origin} in ${window.location.protocol}//${window.location.host}${window.location.pathname}`);
                if (!Object(cross_domain_utils_src.matchDomain)(options.domain, origin)) throw new Error(`Request origin ${origin} does not match domain ${options.domain.toString()}`);
                const data = message.data;
                return options.handler({
                    source,
                    origin,
                    data,
                });
            }).then(data => respond({
                type: conf.b.POST_MESSAGE_TYPE.RESPONSE,
                ack: conf.b.POST_MESSAGE_ACK.SUCCESS,
                data,
            }), (err) => {
                const error = Object(lib.p)(err).replace(/^Error: /, ""); const
                    code = err.code;
                return respond({
                    type: conf.b.POST_MESSAGE_TYPE.RESPONSE,
                    ack: conf.b.POST_MESSAGE_ACK.ERROR,
                    error,
                    code,
                });
            })]).then(lib.j).catch((err) => {
                if (options && options.handleError) return options.handleError(err);
                throw err;
            });
        }, _RECEIVE_MESSAGE_TYPE[conf.b.POST_MESSAGE_TYPE.RESPONSE] = function (source, origin, message) {
            if (!isResponseListenerErrored(message.hash)) {
                const options = getResponseListener(message.hash);
                if (!options) throw new Error(`No handler found for post message response for message: ${message.name} from ${origin} in ${window.location.protocol}//${window.location.host}${window.location.pathname}`);
                if (!Object(cross_domain_utils_src.matchDomain)(options.domain, origin)) throw new Error(`Response origin ${origin} does not match domain ${Object(cross_domain_utils_src.stringifyDomainPattern)(options.domain)}`);
                deleteResponseListener(message.hash);
                if (message.ack === conf.b.POST_MESSAGE_ACK.ERROR) {
                    const err = new Error(message.error);
                    message.code && (err.code = message.code);
                    return options.respond(err, null);
                }
                if (message.ack === conf.b.POST_MESSAGE_ACK.SUCCESS) {
                    const data = message.data || message.response;
                    return options.respond(null, {
                        source,
                        origin,
                        data,
                    });
                }
            }
        }, _RECEIVE_MESSAGE_TYPE); const
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        src_global.a.receivedMessages = src_global.a.receivedMessages || [];
        function receiveMessage(event) {
            if (!window || window.closed) throw new Error("Message recieved in closed window");
            try {
                if (!event.source) return;
            } catch (err) {
                return;
            }
            const source = event.source; let origin = event.origin; const
                message = (function (message) {
                    let parsedMessage = void 0;
                    try {
                        parsedMessage = Object(lib.f)(message);
                    } catch (err) {
                        return;
                    }
                    if (parsedMessage && (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) === "object" && parsedMessage !== null && (parsedMessage = parsedMessage[conf.b.WINDOW_PROPS.POSTROBOT]) && (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) === "object" && parsedMessage !== null && parsedMessage.type && typeof parsedMessage.type === "string" && RECEIVE_MESSAGE_TYPES[parsedMessage.type]) return parsedMessage;
                }(event.data));
            if (message) {
                if (!message.sourceDomain || typeof message.sourceDomain !== "string") throw new Error("Expected message to have sourceDomain");
                message.sourceDomain.indexOf(conf.b.MOCK_PROTOCOL) !== 0 && message.sourceDomain.indexOf(conf.b.FILE_PROTOCOL) !== 0 || (origin = message.sourceDomain);
                if (src_global.a.receivedMessages.indexOf(message.id) === -1) {
                    src_global.a.receivedMessages.push(message.id);
                    if (!Object(cross_domain_utils_src.isWindowClosed)(source) || message.fireAndForget) {
                        message.data && (message.data = Object(lib.b)(source, origin, message.data));
                        RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
                    }
                }
            }
        }
        function messageListener(event) {
            try {
                Object(lib.j)(event.source);
            } catch (err) {
                return;
            }
            const messageEvent = {
                source: event.source || event.sourceElement,
                origin: event.origin || event.originalEvent && event.originalEvent.origin,
                data: event.data,
            };
            try {
                __webpack_require__("./node_modules/post-robot/src/compat/index.js").emulateIERestrictions(messageEvent.source, window);
            } catch (err) {
                return;
            }
            receiveMessage(messageEvent);
        }
        src_global.a.receiveMessage = receiveMessage;
        src_global.a.requestPromises = src_global.a.requestPromises || new cross_domain_safe_weakmap_src.a();
        function request(options) {
            return src.a.try(() => {
                if (!options.name) throw new Error("Expected options.name");
                const name = options.name; let targetWindow = void 0; let
                    domain = void 0;
                if (typeof options.window === "string") {
                    const el = document.getElementById(options.window);
                    if (!el) throw new Error(`Expected options.window ${Object.prototype.toString.call(options.window)} to be a valid element id`);
                    if (el.tagName.toLowerCase() !== "iframe") throw new Error(`Expected options.window ${Object.prototype.toString.call(options.window)} to be an iframe`);
                    if (!el.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    targetWindow = el.contentWindow;
                } else if (options.window instanceof HTMLIFrameElement) {
                    if (options.window.tagName.toLowerCase() !== "iframe") throw new Error(`Expected options.window ${Object.prototype.toString.call(options.window)} to be an iframe`);
                    if (options.window && !options.window.contentWindow) throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                    options.window && options.window.contentWindow && (targetWindow = options.window.contentWindow);
                } else targetWindow = options.window;
                if (!targetWindow) throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                const win = targetWindow;
                domain = options.domain || conf.b.WILDCARD;
                const hash = `${options.name}_${Object(lib.q)()}`;
                if (Object(cross_domain_utils_src.isWindowClosed)(win)) throw new Error("Target window is closed");
                let hasResult = !1; let
                    requestPromises = src_global.a.requestPromises.get(win);
                if (!requestPromises) {
                    requestPromises = [];
                    src_global.a.requestPromises.set(win, requestPromises);
                }
                var requestPromise = src.a.try(() => {
                    if (Object(cross_domain_utils_src.isAncestor)(window, win)) return Object(lib.k)(win, options.timeout || conf.a.CHILD_WINDOW_TIMEOUT);
                }).then(function () {
                    const origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                    if (Object(lib.e)(domain) && !origin) return Object(lib.n)(win);
                }).then(function () {
                    const origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                    if (Object(lib.e)(domain)) {
                        if (!Object(cross_domain_utils_src.matchDomain)(domain, origin)) throw new Error(`Remote window domain ${origin} does not match regex: ${domain.toString()}`);
                        domain = origin;
                    }
                    if (typeof domain !== "string" && !Array.isArray(domain)) throw new TypeError("Expected domain to be a string or array");
                    const actualDomain = domain;
                    return new src.a(((resolve, reject) => {
                        let responseListener = void 0;
                        options.fireAndForget || (function (hash, listener) {
                            src_global.a.responseListeners[hash] = listener;
                        }(hash, responseListener = {
                            name,
                            window: win,
                            domain: actualDomain,
                            respond(err, result) {
                                if (!err) {
                                    hasResult = !0;
                                    requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                                }
                                err ? reject(err) : resolve(result);
                            },
                        }));
                        sendMessage(win, {
                            type: conf.b.POST_MESSAGE_TYPE.REQUEST,
                            hash,
                            name,
                            data: options.data,
                            fireAndForget: options.fireAndForget,
                        }, actualDomain).catch(reject);
                        if (options.fireAndForget) return resolve();
                        let ackTimeout = conf.a.ACK_TIMEOUT; let resTimeout = options.timeout || conf.a.RES_TIMEOUT; let
                            cycleTime = 100;
                        setTimeout(function cycle() {
                            if (!hasResult) {
                                if (Object(cross_domain_utils_src.isWindowClosed)(win)) return responseListener.ack ? reject(new Error(`Window closed for ${name} before response`)) : reject(new Error(`Window closed for ${name} before ack`));
                                ackTimeout = Math.max(ackTimeout - cycleTime, 0);
                                resTimeout !== -1 && (resTimeout = Math.max(resTimeout - cycleTime, 0));
                                if (responseListener.ack) {
                                    if (resTimeout === -1) return;
                                    cycleTime = Math.min(resTimeout, 2e3);
                                } else {
                                    if (ackTimeout === 0) return reject(new Error(`No ack for postMessage ${name} in ${Object(cross_domain_utils_src.getDomain)()} in ${conf.a.ACK_TIMEOUT}ms`));
                                    if (resTimeout === 0) return reject(new Error(`No response for postMessage ${name} in ${Object(cross_domain_utils_src.getDomain)()} in ${options.timeout || conf.a.RES_TIMEOUT}ms`));
                                }
                                setTimeout(cycle, cycleTime);
                            }
                        }, cycleTime);
                    }));
                });
                requestPromise.catch(() => {
                    !(function (hash) {
                        src_global.a.erroredResponseListeners[hash] = !0;
                    }(hash));
                    deleteResponseListener(hash);
                });
                requestPromises.push(requestPromise);
                return requestPromise;
            });
        }
        function _send(window, name, data, options) {
            (options = options || {}).window = window;
            options.name = name;
            options.data = data;
            return request(options);
        }
        function client_sendToParent(name, data, options) {
            const win = Object(cross_domain_utils_src.getAncestor)();
            return win ? _send(win, name, data, options) : new src.a(((resolve, reject) => reject(new Error("Window does not have a parent"))));
        }
        function client() {
            const options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!options.window) throw new Error("Expected options.window");
            const win = options.window;
            return {
                send(name, data) {
                    return _send(win, name, data, options);
                },
            };
        }
        src_global.a.send = _send;
        const server__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        function server_listen(options) {
            if (!options.name) throw new Error("Expected options.name");
            if (!options.handler) throw new Error("Expected options.handler");
            const name = options.name; const win = options.window; const domain = options.domain; const listenerOptions = {
                handler: options.handler,
                handleError: options.errorHandler || function (err) {
                    throw err;
                },
                window: win,
                domain: domain || conf.b.WILDCARD,
                name,
            }; const
                requestListener = (function addRequestListener(_ref6, listener) {
                    const name = _ref6.name; let win = _ref6.win; let
                        domain = _ref6.domain;
                    if (!name || typeof name !== "string") throw new Error("Name required to add request listener");
                    if (Array.isArray(win)) {
                        for (var listenersCollection = [], _i6 = 0, _win2 = win, _length6 = _win2 == null ? 0 : _win2.length; _i6 < _length6; _i6++) {
                            const item = _win2[_i6];
                            listenersCollection.push(addRequestListener({
                                name,
                                domain,
                                win: item,
                            }, listener));
                        }
                        return {
                            cancel() {
                                for (let _i8 = 0, _length8 = listenersCollection == null ? 0 : listenersCollection.length; _i8 < _length8; _i8++) listenersCollection[_i8].cancel();
                            },
                        };
                    }
                    if (Array.isArray(domain)) {
                        for (var _listenersCollection = [], _i10 = 0, _domain2 = domain, _length10 = _domain2 == null ? 0 : _domain2.length; _i10 < _length10; _i10++) {
                            const _item = _domain2[_i10];
                            _listenersCollection.push(addRequestListener({
                                name,
                                win,
                                domain: _item,
                            }, listener));
                        }
                        return {
                            cancel() {
                                for (let _i12 = 0, _length12 = _listenersCollection == null ? 0 : _listenersCollection.length; _i12 < _length12; _i12++) _listenersCollection[_i12].cancel();
                            },
                        };
                    }
                    const existingListener = getRequestListener({
                        name,
                        win,
                        domain,
                    });
                    win && win !== conf.b.WILDCARD || (win = src_global.a.WINDOW_WILDCARD);
                    domain = domain || conf.b.WILDCARD;
                    if (existingListener) throw win && domain ? new Error(`Request listener already exists for ${name} on domain ${domain.toString()} for ${win === src_global.a.WINDOW_WILDCARD ? "wildcard" : "specified"} window`) : win ? new Error(`Request listener already exists for ${name} for ${win === src_global.a.WINDOW_WILDCARD ? "wildcard" : "specified"} window`) : domain ? new Error(`Request listener already exists for ${name} on domain ${domain.toString()}`) : new Error(`Request listener already exists for ${name}`);
                    const requestListeners = src_global.a.requestListeners; let
                        nameListeners = requestListeners[name];
                    if (!nameListeners) {
                        nameListeners = new cross_domain_safe_weakmap_src.a();
                        requestListeners[name] = nameListeners;
                    }
                    let winListeners = nameListeners.get(win);
                    if (!winListeners) {
                        winListeners = {};
                        nameListeners.set(win, winListeners);
                    }
                    const strDomain = domain.toString(); let regexListeners = winListeners[__DOMAIN_REGEX__]; let
                        regexListener = void 0;
                    if (Object(lib.e)(domain)) {
                        if (!regexListeners) {
                            regexListeners = [];
                            winListeners[__DOMAIN_REGEX__] = regexListeners;
                        }
                        regexListener = {
                            regex: domain,
                            listener,
                        };
                        regexListeners.push(regexListener);
                    } else winListeners[strDomain] = listener;
                    return {
                        cancel() {
                            if (winListeners) {
                                delete winListeners[strDomain];
                                win && Object.keys(winListeners).length === 0 && nameListeners.delete(win);
                                regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                            }
                        },
                    };
                }({
                    name,
                    win,
                    domain,
                }, listenerOptions));
            if (options.once) {
                const _handler = listenerOptions.handler;
                listenerOptions.handler = Object(lib.l)(function () {
                    requestListener.cancel();
                    return _handler.apply(this, arguments);
                });
            }
            if (listenerOptions.window && options.errorOnClose) {
                var interval = Object(lib.m)(() => {
                    if (win && (void 0 === win ? "undefined" : server__typeof(win)) === "object" && Object(cross_domain_utils_src.isWindowClosed)(win)) {
                        interval.cancel();
                        listenerOptions.handleError(new Error("Post message target window is closed"));
                    }
                }, 50);
            }
            return {
                cancel() {
                    requestListener.cancel();
                },
            };
        }
        function _on(name, options, handler) {
            if (typeof options === "function") {
                handler = options;
                options = {};
            }
            (options = options || {}).name = name;
            options.handler = handler || options.handler;
            return server_listen(options);
        }
        function once(name) {
            let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; let
                handler = arguments[2];
            if (typeof options === "function") {
                handler = options;
                options = {};
            }
            options = options || {};
            handler = handler || options.handler;
            const errorHandler = options.errorHandler; const promise = new src.a(((resolve, reject) => {
                (options = options || {}).name = name;
                options.once = !0;
                options.handler = function (event) {
                    resolve(event);
                    if (handler) return handler(event);
                };
                options.errorHandler = function (err) {
                    reject(err);
                    if (errorHandler) return errorHandler(err);
                };
            })); const
                onceListener = server_listen(options);
            promise.cancel = onceListener.cancel;
            return promise;
        }
        function server_listener() {
            const options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                on(name, handler) {
                    return _on(name, options, handler);
                },
            };
        }
        src_global.a.on = _on;
        function disable() {
            delete window[conf.b.WINDOW_PROPS.POSTROBOT];
            window.removeEventListener("message", messageListener);
        }
        var public_parent = Object(cross_domain_utils_src.getAncestor)();
        function cleanUpWindow(win) {
            const requestPromises = src_global.a.requestPromises.get(win);
            if (requestPromises) for (let _i2 = 0, _length2 = requestPromises == null ? 0 : requestPromises.length; _i2 < _length2; _i2++) requestPromises[_i2].reject(new Error("No response from window - cleaned up"));
            src_global.a.popupWindowsByWin && src_global.a.popupWindowsByWin.delete(win);
            src_global.a.remoteWindows && src_global.a.remoteWindows.delete(win);
            src_global.a.requestPromises.delete(win);
            src_global.a.methods.delete(win);
            src_global.a.readyPromises.delete(win);
        }
        var bridge = __webpack_require__("./node_modules/post-robot/src/bridge/interface.js");
        function interface_init() {
            if (!src_global.a.initialized) {
                Object(lib.a)(window, "message", messageListener);
                __webpack_require__("./node_modules/post-robot/src/bridge/index.js").openTunnelToOpener();
                Object(lib.d)();
                Object(lib.h)({
                    on: _on,
                    send: _send,
                });
            }
            src_global.a.initialized = !0;
        }
        interface_init();
        var post_robot_src = interface_namespaceObject; var src_lib = __webpack_require__("./node_modules/zoid/src/lib/index.js"); const base_BaseComponent = (function () {
            function BaseComponent() {
                !(function (instance, Constructor) {
                    if (!(instance instanceof BaseComponent)) throw new TypeError("Cannot call a class as a function");
                }(this));
                this.clean = (obj = this, tasks = [], cleaned = !1, {
                    set(name, item) {
                        if (cleaned) return item;
                        obj[name] = item;
                        this.register(() => {
                            delete obj[name];
                        });
                        return item;
                    },
                    register(name, method) {
                        if (typeof name === "function") {
                            method = name;
                            name = "<anonymous-cleanup-handler>";
                        }
                        if (typeof method !== "function") throw new TypeError("Expected to be passed function to clean.register");
                        cleaned ? method() : tasks.push({
                            complete: !1,
                            name,
                            run() {
                                if (!this.complete) {
                                    this.complete = !0;
                                    method && method();
                                }
                            },
                        });
                    },
                    hasTasks() {
                        return Boolean(tasks.filter(item => !item.complete).length);
                    },
                    all() {
                        const results = [];
                        cleaned = !0;
                        for (;tasks.length;) results.push(tasks.pop().run());
                        return src.a.all(results).then(() => {});
                    },
                    run(name) {
                        for (var results = [], _i2 = 0, _length2 = tasks == null ? 0 : tasks.length; _i2 < _length2; _i2++) {
                            const item = tasks[_i2];
                            item.name === name && results.push(item.run());
                        }
                        return src.a.all(results).then(src_lib.I);
                    },
                });
                let obj; let tasks; let
                    cleaned;
                this.event = Object(src_lib.r)();
            }
            BaseComponent.prototype.addProp = function (options, name, def) {
                Object(src_lib.g)(options, this, name, def);
            };
            BaseComponent.prototype.on = function (eventName, handler) {
                return this.event.on(eventName, handler);
            };
            BaseComponent.prototype.listeners = function () {
                throw new Error("Expected listeners to be implemented");
            };
            BaseComponent.prototype.error = function (err) {
                throw new Error(`Expected error to be implemented - got ${Object(src_lib.W)(err)}`);
            };
            BaseComponent.prototype.listen = function (win, domain) {
                const _this = this;
                if (!win) throw this.component.createError("window to listen to not set");
                if (!domain) throw new Error("Must pass domain to listen to");
                if (this.listeners) {
                    for (var listeners = this.listeners(), _loop = function (_i4, _Object$keys2, _length4) {
                            const listenerName = _Object$keys2[_i4]; const name = listenerName.replace(/^zoid_/, ""); const errorHandler = function (err) {
                                _this.error(err);
                            }; const listener = _on(listenerName, {
                                window: win,
                                domain,
                                errorHandler,
                            }, (_ref) => {
                                const source = _ref.source; const
                                    data = _ref.data;
                                _this.component.log(`listener_${name}`);
                                return listeners[listenerName].call(_this, source, data);
                            }); const
                                errorListener = _on(listenerName, {
                                    window: win,
                                    errorHandler,
                                }, (_ref2) => {
                                    const origin = _ref2.origin;
                                    _this.component.logError(`unexpected_listener_${name}`, {
                                        origin,
                                        domain: domain.toString(),
                                    });
                                    _this.error(new Error(`Unexpected ${name} message from domain ${origin} -- expected message from ${domain.toString()}`));
                                });
                            _this.clean.register(() => {
                                listener.cancel();
                                errorListener.cancel();
                            });
                        }, _i4 = 0, _Object$keys2 = Object.keys(listeners), _length4 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) _loop(_i4, _Object$keys2);
                }
            };
            return BaseComponent;
        }()); const base32 = __webpack_require__("./node_modules/hi-base32/src/base32.js"); const base32_default = __webpack_require__.n(base32); const constants = __webpack_require__("./node_modules/zoid/src/constants.js"); const isZoidComponentWindow = Object(src_lib.G)(() => !!window.name && window.name.split("__")[0] === "xcomponent"); const
            getComponentMeta = Object(src_lib.G)(() => {
                if (!window.name) throw new Error("Can not get component meta without window name");
                const _window$name$split2 = window.name.split("__"); const zoidcomp = _window$name$split2[0]; const name = _window$name$split2[1]; const
                    encodedOptions = _window$name$split2[2];
                if (zoidcomp !== "xcomponent") throw new Error(`Window not rendered by zoid - got ${zoidcomp}`);
                let str; let
                    componentMeta = void 0;
                try {
                    componentMeta = JSON.parse((str = encodedOptions, base32_default.a.decode(str.toUpperCase())));
                } catch (err) {
                    throw new Error(`Can not decode component-meta: ${encodedOptions} ${Object(src_lib.W)(err)}`);
                }
                componentMeta.name = name;
                return componentMeta;
            });
        function window_getParentDomain() {
            return getComponentMeta().domain;
        }
        function getWindowByRef(_ref) {
            const ref = _ref.ref; const uid = _ref.uid; const distance = _ref.distance; let
                result = void 0;
            ref === constants.WINDOW_REFERENCES.OPENER ? result = Object(cross_domain_utils_src.getOpener)(window) : ref === constants.WINDOW_REFERENCES.TOP ? result = Object(cross_domain_utils_src.getTop)(window) : ref === constants.WINDOW_REFERENCES.PARENT && (result = distance ? Object(cross_domain_utils_src.getNthParentFromTop)(window, distance) : Object(cross_domain_utils_src.getParent)(window));
            if (ref === constants.WINDOW_REFERENCES.GLOBAL) {
                const ancestor = Object(cross_domain_utils_src.getAncestor)(window);
                if (ancestor) {
                    for (let _i2 = 0, _getAllFramesInWindow2 = Object(cross_domain_utils_src.getAllFramesInWindow)(ancestor), _length2 = _getAllFramesInWindow2 == null ? 0 : _getAllFramesInWindow2.length; _i2 < _length2; _i2++) {
                        const frame = _getAllFramesInWindow2[_i2]; const
                            global = Object(src_lib.y)(frame);
                        if (global && global.windows && global.windows[uid]) {
                            result = global.windows[uid];
                            break;
                        }
                    }
                }
            }
            if (!result) throw new Error("Unable to find window by ref");
            return result;
        }
        const window_getParentComponentWindow = Object(src_lib.G)(() => {
            const componentMeta = getComponentMeta();
            if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by zoid");
            return getWindowByRef(componentMeta.componentParent);
        }); const window_getParentRenderWindow = Object(src_lib.G)(() => {
            const componentMeta = getComponentMeta();
            if (!componentMeta) throw new Error("Can not get parent component window - window not rendered by zoid");
            return getWindowByRef(componentMeta.renderParent);
        }); var
            src_error = __webpack_require__("./node_modules/zoid/src/error.js");
        function normalizeChildProp(component, props, key, value) {
            const prop = component.getProp(key);
            return prop ? typeof prop.childDecorate === "function" ? prop.childDecorate(value) : value : component.looseProps ? value : void 0;
        }
        const child__extends = Object.assign || function (target) {
            for (let i = 1; i < arguments.length; i++) {
                const source = arguments[i];
                for (const key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }; const
            child__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || typeof call !== "object" && typeof call !== "function" ? self : call;
        }
        const child_ChildComponent = (function (_BaseComponent) {
            !(function (subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                    },
                });
                superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }(ChildComponent, _BaseComponent));
            function ChildComponent(component) {
                !(function (instance, Constructor) {
                    if (!(instance instanceof ChildComponent)) throw new TypeError("Cannot call a class as a function");
                }(this));
                const _this = _possibleConstructorReturn(this, _BaseComponent.call(this));
                _this.component = component;
                if (!_this.hasValidParentDomain()) {
                    _this.error(new src_error.c(`Can not be rendered by domain: ${_this.getParentDomain()}`));
                    return _possibleConstructorReturn(_this);
                }
                _this.component.log("construct_child");
                _this.onPropHandlers = [];
                for (let _loop = function (_i2, _ref2, _length2) {
                        for (var item = _ref2[_i2], _loop2 = function (_i4, _ref4, _length4) {
                                const _ref4$_i = _ref4[_i4]; const name = _ref4$_i[0]; const
                                    getter = _ref4$_i[1];
                                Object.defineProperty(item, name, {
                                    configurable: !0,
                                    get() {
                                        _this.props || _this.setProps(_this.getInitialProps(), window_getParentDomain());
                                        delete item[name];
                                        item[name] = getter();
                                        return item[name];
                                    },
                                });
                            }, _i4 = 0, _ref4 = [["xchild", function () {
                                return _this;
                            }], ["xprops", function () {
                                return _this.props;
                            }]], _length4 = _ref4 == null ? 0 : _ref4.length; _i4 < _length4; _i4++) _loop2(_i4, _ref4);
                    }, _i2 = 0, _ref2 = [_this.component, window], _length2 = _ref2 == null ? 0 : _ref2.length; _i2 < _length2; _i2++) _loop(_i2, _ref2);
                _this.component.log("init_child");
                _this.setWindows();
                _this.listenForResize();
                _this.onInit = _this.sendToParent(constants.POST_MESSAGE.INIT, {
                    exports: _this.exports(),
                }).then((_ref5) => {
                    const origin = _ref5.origin; const
                        data = _ref5.data;
                    _this.context = data.context;
                    _this.setProps(data.props, origin);
                    _this.watchForResize();
                    return _this;
                }).catch((err) => {
                    _this.error(err);
                    throw err;
                });
                return _this;
            }
            ChildComponent.prototype.listenForResize = function () {
                const _this2 = this;
                if (this.component.listenForResize) {
                    this.sendToParent(constants.POST_MESSAGE.ONRESIZE, {}, {
                        fireAndForget: !0,
                    });
                    window.addEventListener("resize", () => {
                        _this2.sendToParent(constants.POST_MESSAGE.ONRESIZE, {}, {
                            fireAndForget: !0,
                        });
                    });
                }
            };
            ChildComponent.prototype.hasValidParentDomain = function () {
                return Object(cross_domain_utils_src.matchDomain)(this.component.allowedParentDomains, this.getParentDomain());
            };
            ChildComponent.prototype.init = function () {
                return this.onInit;
            };
            ChildComponent.prototype.getParentDomain = function () {
                return window_getParentDomain();
            };
            ChildComponent.prototype.onProps = function (handler) {
                this.onPropHandlers.push(handler);
            };
            ChildComponent.prototype.getParentComponentWindow = function () {
                return window_getParentComponentWindow();
            };
            ChildComponent.prototype.getParentRenderWindow = function () {
                return window_getParentRenderWindow();
            };
            ChildComponent.prototype.getInitialProps = function () {
                const _this3 = this; const componentMeta = getComponentMeta(); let
                    props = componentMeta.props;
                if (props.type === constants.INITIAL_PROPS.RAW) props = props.value; else {
                    if (props.type !== constants.INITIAL_PROPS.UID) throw new Error(`Unrecognized props type: ${props.type}`);
                    const parentComponentWindow = window_getParentComponentWindow();
                    if (!Object(cross_domain_utils_src.isSameDomain)(parentComponentWindow)) {
                        if (window.location.protocol === "file:") throw new Error("Can not get props from file:// domain");
                        throw new Error(`Parent component window is on a different domain - expected ${Object(cross_domain_utils_src.getDomain)()} - can not retrieve props`);
                    }
                    const global = Object(src_lib.y)(parentComponentWindow);
                    if (!global) throw new Error("Can not find global for parent component - can not retrieve props");
                    props = JSON.parse(global.props[componentMeta.uid]);
                }
                if (!props) throw new Error("Initial props not found");
                return Object(src_lib.j)(props, (_ref6) => {
                    const fullKey = _ref6.fullKey; const self = _ref6.self; const
                        args = _ref6.args;
                    return _this3.onInit.then(() => {
                        const func = Object(src_lib.u)(_this3.props, fullKey);
                        if (typeof func !== "function") throw new TypeError(`Expected ${fullKey} to be function, got ${void 0 === func ? "undefined" : child__typeof(func)}`);
                        return func.apply(self, args);
                    });
                });
            };
            ChildComponent.prototype.setProps = function (props, origin) {
                const required = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                this.props = this.props || {};
                const normalizedProps = (function (component, props, origin) {
                    for (var required = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], result = {}, _i2 = 0, _Object$keys2 = Object.keys(props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                        const key = _Object$keys2[_i2]; const prop = component.getProp(key); const
                            value = props[key];
                        if (!prop || !prop.sameDomain || origin === Object(cross_domain_utils_src.getDomain)(window)) {
                            result[key] = normalizeChildProp(component, 0, key, value);
                            prop && prop.alias && !result[prop.alias] && (result[prop.alias] = value);
                        }
                    }
                    if (required) {
                        for (let _i4 = 0, _component$getPropNam2 = component.getPropNames(), _length4 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
                            const _key = _component$getPropNam2[_i4];
                            props.hasOwnProperty(_key) || (result[_key] = normalizeChildProp(component, 0, _key, props[_key]));
                        }
                    }
                    return result;
                }(this.component, props, origin, required));
                Object(src_lib.s)(this.props, normalizedProps);
                for (let _i6 = 0, _onPropHandlers2 = this.onPropHandlers, _length6 = _onPropHandlers2 == null ? 0 : _onPropHandlers2.length; _i6 < _length6; _i6++) _onPropHandlers2[_i6].call(this, this.props);
            };
            ChildComponent.prototype.sendToParent = function (name) {
                const data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; const options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}; const
                    parentWindow = window_getParentComponentWindow();
                if (!parentWindow) throw new Error("Can not find parent component window to message");
                this.component.log(`send_to_parent_${name}`);
                return _send(parentWindow, name, data, child__extends({
                    domain: window_getParentDomain(),
                }, options));
            };
            ChildComponent.prototype.setWindows = function () {
                if (window.__activeZoidComponent__) throw this.component.createError("Can not attach multiple components to the same window");
                window.__activeZoidComponent__ = this;
                if (!window_getParentComponentWindow()) throw this.component.createError("Can not find parent window");
                const componentMeta = getComponentMeta();
                if (componentMeta.tag !== this.component.tag) throw this.component.createError(`Parent is ${componentMeta.tag} - can not attach ${this.component.tag}`);
                this.watchForClose();
            };
            ChildComponent.prototype.watchForClose = function () {
                const _this4 = this;
                window.addEventListener("unload", () => _this4.checkClose());
            };
            ChildComponent.prototype.enableAutoResize = function () {
                const _ref7 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; const _ref7$width = _ref7.width; const width = void 0 === _ref7$width || _ref7$width; const _ref7$height = _ref7.height; const
                    height = void 0 === _ref7$height || _ref7$height;
                this.autoResize = {
                    width,
                    height,
                };
                this.watchForResize();
            };
            ChildComponent.prototype.getAutoResize = function () {
                let width = !1; let height = !1; const
                    autoResize = this.autoResize || this.component.autoResize;
                if ((void 0 === autoResize ? "undefined" : child__typeof(autoResize)) === "object") {
                    width = Boolean(autoResize.width);
                    height = Boolean(autoResize.height);
                } else if (autoResize) {
                    width = !0;
                    height = !0;
                }
                return {
                    width,
                    height,
                    element: autoResize.element ? Object(src_lib.w)(autoResize.element) : window.navigator.userAgent.match(/MSIE (9|10)\./) ? document.body : document.documentElement,
                };
            };
            ChildComponent.prototype.watchForResize = function () {
                const _this5 = this; const _getAutoResize = this.getAutoResize(); const width = _getAutoResize.width; const height = _getAutoResize.height; const
                    element = _getAutoResize.element;
                if ((width || height) && this.context !== constants.CONTEXT_TYPES.POPUP && !this.watchingForResize) {
                    this.watchingForResize = !0;
                    return src.a.try(() => src_lib.m).then(() => {
                        if (!Object(src_lib.l)(element, {
                            width,
                            height,
                        })) {
                            return _this5.resizeToElement(element, {
                                width,
                                height,
                            });
                        }
                    }).then(() => Object(src_lib.h)(() => Object(src_lib.K)(element, {
                        width,
                        height,
                    }).then(() => _this5.resizeToElement(element, {
                        width,
                        height,
                    }))));
                }
            };
            ChildComponent.prototype.exports = function () {
                const self = this;
                return {
                    updateProps(props) {
                        const _this6 = this;
                        return src.a.try(() => self.setProps(props, _this6.origin, !1));
                    },
                    close() {
                        return src.a.try(() => self.destroy());
                    },
                };
            };
            ChildComponent.prototype.resize = function (width, height) {
                const _this7 = this;
                return src.a.resolve().then(() => {
                    _this7.component.log("resize", {
                        width: Object(src_lib.V)(width),
                        height: Object(src_lib.V)(height),
                    });
                    if (_this7.context !== constants.CONTEXT_TYPES.POPUP) {
                        return _this7.sendToParent(constants.POST_MESSAGE.RESIZE, {
                            width,
                            height,
                        }).then(src_lib.I);
                    }
                });
            };
            ChildComponent.prototype.resizeToElement = function (el, _ref8) {
                const _this8 = this; const width = _ref8.width; const height = _ref8.height; const
                    history = [];
                return (function resize() {
                    return src.a.try(() => {
                        for (var tracker = Object(src_lib.Y)(el, {
                                width,
                                height,
                            }), dimensions = tracker.check().dimensions, _i8 = 0, _length8 = history == null ? 0 : history.length; _i8 < _length8; _i8++) {
                            const size = history[_i8]; const widthMatch = !width || size.width === dimensions.width; const
                                heightMatch = !height || size.height === dimensions.height;
                            if (widthMatch && heightMatch) return;
                        }
                        history.push({
                            width: dimensions.width,
                            height: dimensions.height,
                        });
                        return _this8.resize(width ? dimensions.width : null, height ? dimensions.height : null).then(() => {
                            if (tracker.check().changed) return resize();
                        });
                    });
                }());
            };
            ChildComponent.prototype.hide = function () {
                return this.sendToParent(constants.POST_MESSAGE.HIDE).then(src_lib.I);
            };
            ChildComponent.prototype.show = function () {
                return this.sendToParent(constants.POST_MESSAGE.SHOW).then(src_lib.I);
            };
            ChildComponent.prototype.userClose = function () {
                return this.close(constants.CLOSE_REASONS.USER_CLOSED);
            };
            ChildComponent.prototype.close = function () {
                const reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : constants.CLOSE_REASONS.CHILD_CALL;
                this.component.log("close_child");
                this.sendToParent(constants.POST_MESSAGE.CLOSE, {
                    reason,
                });
            };
            ChildComponent.prototype.checkClose = function () {
                this.sendToParent(constants.POST_MESSAGE.CHECK_CLOSE, {}, {
                    fireAndForget: !0,
                });
            };
            ChildComponent.prototype.destroy = function () {
                return src.a.try(() => {
                    window.close();
                });
            };
            ChildComponent.prototype.focus = function () {
                this.component.log("focus");
                window.focus();
            };
            ChildComponent.prototype.error = function (err) {
                const stringifiedError = Object(src_lib.W)(err);
                this.component.logError("error", {
                    error: stringifiedError,
                });
                return this.sendToParent(constants.POST_MESSAGE.ERROR, {
                    error: stringifiedError,
                }).then(src_lib.I);
            };
            return ChildComponent;
        }(base_BaseComponent));


        const drivers__extends = Object.assign || function (target) {
            for (let i = 1; i < arguments.length; i++) {
                const source = arguments[i];
                for (const key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };


        const RENDER_DRIVERS = {};
        RENDER_DRIVERS[constants.CONTEXT_TYPES.IFRAME] = {
            focusable: !1,
            renderedIntoContainerTemplate: !0,
            allowResize: !0,
            openOnClick: !1,
            needsBridge: !1,
            open(url) {
                const _this = this; const
                    attributes = this.component.attributes.iframe || {};
                this.iframe = Object(src_lib.A)({
                    url,
                    attributes: drivers__extends({
                        name: this.childWindowName,
                        title: this.component.name,
                        scrolling: this.component.scrolling ? "yes" : "no",
                    }, attributes),
                    class: [constants.CLASS_NAMES.COMPONENT_FRAME, constants.CLASS_NAMES.INVISIBLE],
                }, this.element);
                return Object(src_lib.f)(this.iframe).then((frameWindow) => {
                    _this.window = frameWindow;
                    const detectClose = function () {
                        return src.a.try(() => _this.props.onClose(constants.CLOSE_REASONS.CLOSE_DETECTED)).finally(() => _this.destroy());
                    }; const iframeWatcher = Object(src_lib._2)(_this.iframe, detectClose); const
                        elementWatcher = Object(src_lib._2)(_this.element, detectClose);
                    _this.clean.register("destroyWindow", () => {
                        iframeWatcher.cancel();
                        elementWatcher.cancel();
                        cleanUpWindow(_this.window);
                        delete _this.window;
                        if (_this.iframe) {
                            Object(src_lib.k)(_this.iframe);
                            delete _this.iframe;
                        }
                    });
                });
            },
            openPrerender() {
                const _this2 = this; const
                    attributes = this.component.attributes.iframe || {};
                this.prerenderIframe = Object(src_lib.A)({
                    attributes: drivers__extends({
                        name: `__prerender__${this.childWindowName}`,
                        scrolling: this.component.scrolling ? "yes" : "no",
                    }, attributes),
                    class: [constants.CLASS_NAMES.PRERENDER_FRAME, constants.CLASS_NAMES.VISIBLE],
                }, this.element);
                return Object(src_lib.f)(this.prerenderIframe).then((prerenderFrameWindow) => {
                    _this2.prerenderWindow = prerenderFrameWindow;
                    _this2.clean.register("destroyPrerender", () => {
                        if (_this2.prerenderIframe) {
                            Object(src_lib.k)(_this2.prerenderIframe);
                            delete _this2.prerenderIframe;
                        }
                    });
                });
            },
            switchPrerender() {
                const _this3 = this;
                Object(src_lib.a)(this.prerenderIframe, constants.CLASS_NAMES.INVISIBLE);
                Object(src_lib.P)(this.prerenderIframe, constants.CLASS_NAMES.VISIBLE);
                Object(src_lib.a)(this.iframe, constants.CLASS_NAMES.VISIBLE);
                Object(src_lib.P)(this.iframe, constants.CLASS_NAMES.INVISIBLE);
                setTimeout(() => {
                    _this3.prerenderIframe && Object(src_lib.k)(_this3.prerenderIframe);
                }, 1e3);
            },
            delegateOverrides: {
                openContainer: constants.DELEGATE.CALL_DELEGATE,
                destroyComponent: constants.DELEGATE.CALL_DELEGATE,
                destroyContainer: constants.DELEGATE.CALL_DELEGATE,
                cancelContainerEvents: constants.DELEGATE.CALL_DELEGATE,
                createPrerenderTemplate: constants.DELEGATE.CALL_DELEGATE,
                elementReady: constants.DELEGATE.CALL_DELEGATE,
                showContainer: constants.DELEGATE.CALL_DELEGATE,
                showComponent: constants.DELEGATE.CALL_DELEGATE,
                hideContainer: constants.DELEGATE.CALL_DELEGATE,
                hideComponent: constants.DELEGATE.CALL_DELEGATE,
                hide: constants.DELEGATE.CALL_DELEGATE,
                show: constants.DELEGATE.CALL_DELEGATE,
                resize: constants.DELEGATE.CALL_DELEGATE,
                loadUrl: constants.DELEGATE.CALL_DELEGATE,
                hijackSubmit: constants.DELEGATE.CALL_DELEGATE,
                openPrerender: constants.DELEGATE.CALL_DELEGATE,
                switchPrerender: constants.DELEGATE.CALL_DELEGATE,
                renderTemplate: constants.DELEGATE.CALL_ORIGINAL,
                openContainerFrame: constants.DELEGATE.CALL_ORIGINAL,
                getOutlet: constants.DELEGATE.CALL_ORIGINAL,
                open(original, override) {
                    return function () {
                        const _this4 = this;
                        return override.apply(this, arguments).then(() => {
                            _this4.clean.set("window", Object(cross_domain_utils_src.findFrameByName)(window_getParentComponentWindow(), _this4.childWindowName));
                            if (!_this4.window) throw new Error("Unable to find parent component iframe window");
                        });
                    };
                },
            },
            resize(width, height) {
                if (width) {
                    this.container.style.width = Object(src_lib.X)(width);
                    this.element.style.width = Object(src_lib.X)(width);
                }
                if (height) {
                    this.container.style.height = Object(src_lib.X)(height);
                    this.element.style.height = Object(src_lib.X)(height);
                }
            },
            show() {
                Object(src_lib.U)(this.element);
            },
            hide() {
                Object(src_lib.z)(this.element);
            },
            loadUrl(url) {
                this.iframe.setAttribute("src", url);
            },
        };
        RENDER_DRIVERS[constants.CONTEXT_TYPES.POPUP] = {
            focusable: !0,
            renderedIntoContainerTemplate: !1,
            allowResize: !1,
            openOnClick: !0,
            needsBridge: !0,
            open() {
                const _this5 = this; const
                    url = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                return src.a.try(() => {
                    const _ref = _this5.component.dimensions || {}; const _ref$width = _ref.width; let width = void 0 === _ref$width ? constants.DEFAULT_DIMENSIONS.WIDTH : _ref$width; const _ref$height = _ref.height; let height = void 0 === _ref$height ? constants.DEFAULT_DIMENSIONS.HEIGHT : _ref$height; const _getPosition = (function (_ref2) {
                        const width = _ref2.width; const height = _ref2.height; let x = 0; let
                            y = 0;
                        width && (window.outerWidth ? x = Math.round((window.outerWidth - width) / 2) + window.screenX : window.screen.width && (x = Math.round((window.screen.width - width) / 2)));
                        height && (window.outerHeight ? y = Math.round((window.outerHeight - height) / 2) + window.screenY : window.screen.height && (y = Math.round((window.screen.height - height) / 2)));
                        return {
                            x,
                            y,
                        };
                    }({
                        width: width = Object(src_lib.J)(width, window.outerWidth),
                        height: height = Object(src_lib.J)(height, window.outerWidth),
                    })); const x = _getPosition.x; const y = _getPosition.y; const
                        attributes = _this5.component.attributes.popup || {};
                    _this5.window = Object(src_lib.M)(url || "", drivers__extends({
                        name: _this5.childWindowName,
                        width,
                        height,
                        top: y,
                        left: x,
                        status: 1,
                        toolbar: 0,
                        menubar: 0,
                        resizable: 1,
                        scrollbars: 1,
                    }, attributes));
                    _this5.prerenderWindow = _this5.window;
                    _this5.clean.register("destroyWindow", () => {
                        if (_this5.window) {
                            _this5.window.close();
                            cleanUpWindow(_this5.window);
                            delete _this5.window;
                            delete _this5.prerenderWindow;
                        }
                    });
                    _this5.resize(width, height);
                });
            },
            openPrerender() {
                return src.a.try(src_lib.I);
            },
            resize() {},
            hide() {
                throw new Error("Can not hide popup");
            },
            show() {
                throw new Error("Can not show popup");
            },
            delegateOverrides: {
                openContainer: constants.DELEGATE.CALL_DELEGATE,
                destroyContainer: constants.DELEGATE.CALL_DELEGATE,
                elementReady: constants.DELEGATE.CALL_DELEGATE,
                showContainer: constants.DELEGATE.CALL_DELEGATE,
                showComponent: constants.DELEGATE.CALL_DELEGATE,
                hideContainer: constants.DELEGATE.CALL_DELEGATE,
                hideComponent: constants.DELEGATE.CALL_DELEGATE,
                hide: constants.DELEGATE.CALL_DELEGATE,
                show: constants.DELEGATE.CALL_DELEGATE,
                cancelContainerEvents: constants.DELEGATE.CALL_DELEGATE,
                open: constants.DELEGATE.CALL_ORIGINAL,
                loadUrl: constants.DELEGATE.CALL_ORIGINAL,
                createPrerenderTemplate: constants.DELEGATE.CALL_ORIGINAL,
                destroyComponent: constants.DELEGATE.CALL_ORIGINAL,
                resize: constants.DELEGATE.CALL_ORIGINAL,
                renderTemplate: constants.DELEGATE.CALL_ORIGINAL,
                openContainerFrame: constants.DELEGATE.CALL_ORIGINAL,
                getOutlet: constants.DELEGATE.CALL_ORIGINAL,
            },
            loadUrl(url) {
                if (Object(cross_domain_utils_src.isSameDomain)(this.window)) {
                    try {
                        if (this.window.location && this.window.location.replace) {
                            this.window.location.replace(url);
                            return;
                        }
                    } catch (err) {}
                }
                this.window.location = url;
            },
        };
        let _class; const props__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }; const parent__extends = Object.assign || function (target) {
            for (let i = 1; i < arguments.length; i++) {
                const source = arguments[i];
                for (const key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }; const parent__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }; const
            _createClass = (function () {
                function defineProperties(target, props) {
                    for (let i = 0; i < props.length; i++) {
                        const descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1;
                        descriptor.configurable = !0;
                        "value" in descriptor && (descriptor.writable = !0);
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    protoProps && defineProperties(Constructor.prototype, protoProps);
                    staticProps && defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }());
        function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
            let desc = {};
            Object.keys(descriptor).forEach((key) => {
                desc[key] = descriptor[key];
            });
            desc.enumerable = !!desc.enumerable;
            desc.configurable = !!desc.configurable;
            ("value" in desc || desc.initializer) && (desc.writable = !0);
            desc = decorators.slice().reverse().reduce((desc, decorator) => decorator(target, property, desc) || desc, desc);
            if (context && void 0 !== desc.initializer) {
                desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
                desc.initializer = void 0;
            }
            if (void 0 === desc.initializer) {
                Object.defineProperty(target, property, desc);
                desc = null;
            }
            return desc;
        }
        src_lib.x.props = src_lib.x.props || {};
        src_lib.x.windows = src_lib.x.windows || {};
        const parent_ParentComponent = (_applyDecoratedDescriptor((_class = (function (_BaseComponent) {
            !(function (subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                    },
                });
                superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }(ParentComponent, _BaseComponent));
            function ParentComponent(component, context, _ref) {
                const props = _ref.props;
                !(function (instance, Constructor) {
                    if (!(instance instanceof ParentComponent)) throw new TypeError("Cannot call a class as a function");
                }(this));
                const _this = (function (self, call) {
                    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !call || typeof call !== "object" && typeof call !== "function" ? self : call;
                }(this, _BaseComponent.call(this)));
                _this.component = component;
                _this.validateParentDomain();
                _this.context = context;
                _this.setProps(props);
                _this.childWindowName = _this.buildChildWindowName({
                    renderTo: window,
                });
                _this.registerActiveComponent();
                _this.component.log("construct_parent");
                _this.watchForUnload();
                _this.onInit = new src.a();
                _this.onInit.catch(err => _this.error(err));
                return _this;
            }
            ParentComponent.prototype.render = function (element) {
                const _this2 = this; const
                    loadUrl = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                return this.tryInit(() => {
                    _this2.component.log(`render_${_this2.context}`, {
                        context: _this2.context,
                        element,
                        loadUrl: Object(src_lib.V)(loadUrl),
                    });
                    const tasks = {};
                    tasks.onRender = _this2.props.onRender();
                    tasks.getDomain = _this2.getDomain();
                    tasks.elementReady = src.a.try(() => {
                        if (element) return _this2.elementReady(element);
                    });
                    tasks.openContainer = tasks.elementReady.then(() => _this2.openContainer(element));
                    tasks.showContainer = tasks.openContainer.then(() => _this2.showContainer());
                    tasks.openPrerender = tasks.openContainer.then(() => _this2.openPrerender());
                    tasks.switchPrerender = src.a.all([tasks.openPrerender, _this2.onInit]).then(() => _this2.switchPrerender());
                    tasks.open = _this2.driver.openOnClick ? _this2.open() : tasks.openContainer.then(() => _this2.open());
                    tasks.listen = src.a.all([tasks.getDomain, tasks.open]).then((_ref2) => {
                        const domain = _ref2[0];
                        _this2.listen(_this2.window, domain);
                    });
                    tasks.watchForClose = tasks.open.then(() => _this2.watchForClose());
                    tasks.linkDomain = src.a.all([tasks.getDomain, tasks.open]).then((_ref3) => {
                        const domain = _ref3[0];
                        if (bridge && typeof domain === "string") return bridge.linkUrl(_this2.window, domain);
                    });
                    if (!_this2.html) {
                        tasks.createPrerenderTemplate = tasks.openPrerender.then(() => _this2.createPrerenderTemplate());
                        tasks.showComponent = tasks.createPrerenderTemplate.then(() => _this2.showComponent());
                    }
                    tasks.openBridge = src.a.all([tasks.getDomain, tasks.open]).then((_ref4) => {
                        const domain = _ref4[0];
                        return _this2.openBridge(typeof domain === "string" ? domain : null);
                    });
                    if (_this2.html) {
                        tasks.loadHTML = tasks.open.then(() => _this2.loadHTML());
                    } else if (loadUrl) {
                        tasks.buildUrl = _this2.buildUrl();
                        tasks.loadUrl = src.a.all([tasks.buildUrl, tasks.open, tasks.linkDomain, tasks.listen, tasks.open, tasks.openBridge, tasks.createPrerenderTemplate]).then((_ref5) => {
                            const url = _ref5[0];
                            return _this2.loadUrl(url);
                        });
                        tasks.runTimeout = tasks.loadUrl.then(() => _this2.runTimeout());
                    }
                    return src.a.hash(tasks);
                }).then(() => _this2.props.onEnter()).then(() => _this2);
            };
            ParentComponent.prototype.getOutlet = function () {
                const outlet = document.createElement("div");
                Object(src_lib.a)(outlet, constants.CLASS_NAMES.OUTLET);
                return outlet;
            };
            ParentComponent.prototype.validateParentDomain = function () {
                const domain = Object(cross_domain_utils_src.getDomain)();
                if (!Object(cross_domain_utils_src.matchDomain)(this.component.allowedParentDomains, domain)) throw new src_error.c(`Can not be rendered by domain: ${domain}`);
            };
            ParentComponent.prototype.renderTo = function (win, element) {
                const _this3 = this;
                return this.tryInit(() => {
                    if (win === window) return _this3.render(element);
                    if (!Object(cross_domain_utils_src.isSameTopWindow)(window, win)) throw new Error("Can only renderTo an adjacent frame");
                    if (element && typeof element !== "string") throw new Error(`Element passed to renderTo must be a string selector, got ${void 0 === element ? "undefined" : parent__typeof(element)} ${element}`);
                    _this3.checkAllowRenderTo(win);
                    _this3.component.log(`render_${_this3.context}_to_win`, {
                        element: Object(src_lib.V)(element),
                        context: _this3.context,
                    });
                    _this3.childWindowName = _this3.buildChildWindowName({
                        renderTo: win,
                    });
                    _this3.delegate(win);
                    return _this3.render(element);
                });
            };
            ParentComponent.prototype.prefetch = function () {
                const _this4 = this;
                return src.a.try(() => {
                    _this4.html = _this4.buildUrl().then(url => Object(src_lib.N)(url).then(html => `\n                        <base href="${url.split("/").slice(0, 3).join("/")}">\n\n                        ${html}\n\n                        <script>\n                            if (window.history && window.history.pushState) {\n                                window.history.pushState({}, '', '/${url.split("/").slice(3).join("/")}');\n                            }\n                        <\/script>\n                    `));
                });
            };
            ParentComponent.prototype.loadHTML = function () {
                const _this5 = this;
                return src.a.try(() => {
                    if (!_this5.html) throw new Error("Html not prefetched");
                    return _this5.html.then(html => Object(src_lib._4)(_this5.window, html));
                });
            };
            ParentComponent.prototype.checkAllowRenderTo = function (win) {
                if (!win) throw this.component.createError("Must pass window to renderTo");
                if (!Object(cross_domain_utils_src.isSameDomain)(win)) {
                    const origin = Object(cross_domain_utils_src.getDomain)(); const
                        domain = this.component.getDomain(null, this.props.env);
                    if (!domain) throw new Error("Could not determine domain to allow remote render");
                    if (!Object(cross_domain_utils_src.matchDomain)(domain, origin)) throw new Error(`Can not render remotely to ${domain.toString()} - can only render to ${origin}`);
                }
            };
            ParentComponent.prototype.registerActiveComponent = function () {
                const _this6 = this;
                ParentComponent.activeComponents.push(this);
                this.clean.register(() => {
                    ParentComponent.activeComponents.splice(ParentComponent.activeComponents.indexOf(_this6), 1);
                });
            };
            ParentComponent.prototype.getComponentParentRef = function () {
                const renderToWindow = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                if (this.context === constants.CONTEXT_TYPES.POPUP) {
                    return {
                        ref: constants.WINDOW_REFERENCES.OPENER,
                    };
                }
                if (renderToWindow === window) {
                    return Object(cross_domain_utils_src.isTop)(window) ? {
                        ref: constants.WINDOW_REFERENCES.TOP,
                    } : {
                        ref: constants.WINDOW_REFERENCES.PARENT,
                        distance: Object(cross_domain_utils_src.getDistanceFromTop)(window),
                    };
                }
                const uid = Object(src_lib.Z)();
                src_lib.x.windows[uid] = window;
                this.clean.register(() => {
                    delete src_lib.x.windows[uid];
                });
                return {
                    ref: constants.WINDOW_REFERENCES.GLOBAL,
                    uid,
                };
            };
            ParentComponent.prototype.getRenderParentRef = function () {
                const renderToWindow = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
                if (renderToWindow === window) return this.getComponentParentRef(renderToWindow);
                const uid = Object(src_lib.Z)();
                src_lib.x.windows[uid] = renderToWindow;
                this.clean.register(() => {
                    delete src_lib.x.windows[uid];
                });
                return {
                    ref: constants.WINDOW_REFERENCES.GLOBAL,
                    uid,
                };
            };
            ParentComponent.prototype.buildChildWindowName = function () {
                const _ref6$renderTo = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).renderTo; const renderTo = void 0 === _ref6$renderTo ? window : _ref6$renderTo; const sameDomain = Object(cross_domain_utils_src.isSameDomain)(renderTo); const uid = Object(src_lib.Z)(); const tag = this.component.tag; const sProps = Object(src_lib.R)(this.getPropsForChild()); const componentParent = this.getComponentParentRef(renderTo); const renderParent = this.getRenderParentRef(renderTo); const
                    props = sameDomain || this.component.unsafeRenderTo ? {
                        type: constants.INITIAL_PROPS.RAW,
                        value: sProps,
                    } : {
                        type: constants.INITIAL_PROPS.UID,
                        uid,
                    };
                if (props.type === constants.INITIAL_PROPS.UID) {
                    src_lib.x.props[uid] = JSON.stringify(sProps);
                    this.clean.register(() => {
                        delete src_lib.x.props[uid];
                    });
                }
                return (function (name) {
                    const options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    options.id = Object(src_lib.Z)();
                    options.domain = Object(cross_domain_utils_src.getDomain)(window);
                    let str; const encodedName = name.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, "").replace(/[^a-z0-9A-Z]+/g, "_"); const
                        encodedOptions = (str = JSON.stringify(options),
                        base32_default.a.encode(str).replace(/\=/g, "").toLowerCase());
                    if (!encodedName) throw new Error(`Invalid name: ${name} - must contain alphanumeric characters`);
                    return ["xcomponent", encodedName, encodedOptions, ""].join("__");
                }(this.component.name, {
                    uid,
                    tag,
                    componentParent,
                    renderParent,
                    props,
                }));
            };
            ParentComponent.prototype.sendToParent = function (name, data) {
                if (!window_getParentComponentWindow()) throw new Error("Can not find parent component window to message");
                this.component.log(`send_to_parent_${name}`);
                return _send(window_getParentComponentWindow(), name, data, {
                    domain: window_getParentDomain(),
                });
            };
            ParentComponent.prototype.setProps = function (props) {
                const isUpdate = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                this.component.validate && this.component.validate(this.component, props);
                this.props = this.props || {};
                Object(src_lib.s)(this.props, (function (component, instance, props) {
                    const isUpdate = arguments.length > 3 && void 0 !== arguments[3] && arguments[3]; const
                        result = {};
                    props = props || {};
                    for (var propNames = isUpdate ? [] : component.getPropNames(), _i2 = 0, _Object$keys2 = Object.keys(props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                        const key = _Object$keys2[_i2];
                        propNames.indexOf(key) === -1 && propNames.push(key);
                    }
                    for (let _i4 = 0, _length4 = propNames == null ? 0 : propNames.length; _i4 < _length4; _i4++) {
                        const _key = propNames[_i4]; const propDef = component.getProp(_key); let
                            value = props[_key];
                        if (!propDef) {
                            if (component.looseProps) {
                                result[_key] = value;
                                continue;
                            }
                            throw new Error(`Unrecognized prop: ${_key}`);
                        }
                        !Object(src_lib.C)(value) && propDef.alias && (value = props[propDef.alias]);
                        !Object(src_lib.C)(value) && propDef.value && (value = propDef.value());
                        !Object(src_lib.C)(value) && propDef.def && (value = propDef.def(props, component));
                        if (Object(src_lib.C)(value)) {
                            if (propDef.type === "array" ? !Array.isArray(value) : (void 0 === value ? "undefined" : props__typeof(value)) !== propDef.type) throw new TypeError(`Prop is not of type ${propDef.type}: ${_key}`);
                        } else if (!1 !== propDef.required) throw new Error(`Expected prop ${_key} to be passed`);
                        result[_key] = value;
                    }
                    for (let _i6 = 0, _Object$keys4 = Object.keys(result), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) {
                        const _key2 = _Object$keys4[_i6]; const _propDef = component.getProp(_key2); const
                            _value = result[_key2];
                        if (_propDef) {
                            _propDef.validate && _propDef.validate(_value, result);
                            _propDef.decorate && (result[_key2] = _propDef.decorate(_value, result));
                            result[_key2] && _propDef.type === "function" && (result[_key2] = result[_key2].bind(instance));
                        }
                    }
                    return result;
                }(this.component, this, props, isUpdate)));
            };
            ParentComponent.prototype.buildUrl = function () {
                let propsDef; let props; let params; const
                    _this7 = this;
                return (propsDef = parent__extends({}, this.component.props, this.component.builtinProps),
                props = this.props, params = {}, src.a.all(Object.keys(props).map((key) => {
                    const prop = propsDef[key];
                    if (prop) {
                        return src.a.resolve().then(() => {
                            const value = props[key];
                            if (value && prop.queryParam) return value;
                        }).then((value) => {
                            if (value !== null && void 0 !== value) {
                                return src.a.all([(function (prop, key, value) {
                                    return src.a.try(() => (typeof prop.queryParam === "function" ? prop.queryParam(value) : typeof prop.queryParam === "string" ? prop.queryParam : key));
                                }(prop, key, value)), (function (prop, key, value) {
                                    return src.a.try(() => (typeof prop.queryValue === "function" ? prop.queryValue(value) : value));
                                }(prop, 0, value))]).then((_ref) => {
                                    const queryParam = _ref[0]; const queryValue = _ref[1]; let
                                        result = void 0;
                                    if (typeof queryValue === "boolean") result = queryValue.toString(); else if (typeof queryValue === "string") result = queryValue.toString(); else {
                                        if (typeof queryValue === "function") return;
                                        if ((void 0 === queryValue ? "undefined" : props__typeof(queryValue)) === "object" && queryValue !== null) {
                                            if (prop.serialization !== "json") {
                                                result = Object(src_lib.n)(queryValue, key);
                                                for (let _i8 = 0, _Object$keys6 = Object.keys(result), _length8 = _Object$keys6 == null ? 0 : _Object$keys6.length; _i8 < _length8; _i8++) {
                                                    const dotkey = _Object$keys6[_i8];
                                                    params[dotkey] = result[dotkey];
                                                }
                                                return;
                                            }
                                            result = JSON.stringify(queryValue);
                                        } else typeof queryValue === "number" && (result = queryValue.toString());
                                    }
                                    params[queryParam] = result;
                                });
                            }
                        });
                    }
                })).then(() => params)).then((query) => {
                    const url = _this7.component.getUrl(_this7.props.env, _this7.props);
                    return Object(src_lib.t)(url, {
                        query: parent__extends({}, query),
                    });
                });
            };
            ParentComponent.prototype.getDomain = function () {
                const _this8 = this;
                return src.a.try(() => _this8.component.getDomain(null, _this8.props.env) || (_this8.component.buildUrl ? src.a.try(() => _this8.component.buildUrl(_this8.props)).then(builtUrl => _this8.component.getDomain(builtUrl, _this8.props.env)) : void 0)).then((domain) => {
                    if (!domain) throw new Error("Could not determine domain");
                    return domain;
                });
            };
            ParentComponent.prototype.getPropsForChild = function () {
                for (var result = {}, _i2 = 0, _Object$keys2 = Object.keys(this.props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                    const key = _Object$keys2[_i2]; const
                        prop = this.component.getProp(key);
                    prop && !1 === prop.sendToChild || (result[key] = this.props[key]);
                }
                return result;
            };
            ParentComponent.prototype.updateProps = function (props) {
                const _this9 = this;
                this.setProps(props, !0);
                return this.onInit.then(() => {
                    if (_this9.childExports) return _this9.childExports.updateProps(_this9.getPropsForChild());
                    throw new Error("Child exports were not available");
                });
            };
            ParentComponent.prototype.openBridge = function (domain) {
                const _this10 = this;
                return src.a.try(() => {
                    if (bridge && _this10.driver.needsBridge) {
                        const needsBridgeParams = {
                            win: _this10.window,
                        };
                        domain && (needsBridgeParams.domain = domain);
                        const needsBridge = bridge.needsBridge(needsBridgeParams); const
                            bridgeUrl = _this10.component.getBridgeUrl(_this10.props.env);
                        if (bridgeUrl) {
                            const bridgeDomain = _this10.component.getBridgeDomain(_this10.props.env);
                            if (!bridgeDomain) throw new Error("Can not determine domain for bridge");
                            return needsBridge ? bridge.openBridge(bridgeUrl, bridgeDomain).then((result) => {
                                if (result) return result;
                            }) : void 0;
                        }
                        if (needsBridge && domain && !bridge.hasBridge(domain, domain)) throw new Error(`Bridge url needed to render ${_this10.context}`);
                    }
                });
            };
            ParentComponent.prototype.open = function () {
                const _this11 = this;
                return src.a.try(() => {
                    _this11.component.log(`open_${_this11.context}`, {
                        windowName: _this11.childWindowName,
                    });
                    return _this11.driver.open.call(_this11);
                });
            };
            ParentComponent.prototype.openPrerender = function () {
                const _this12 = this;
                return src.a.try(() => {
                    if (_this12.component.prerenderTemplate) return _this12.driver.openPrerender.call(_this12);
                });
            };
            ParentComponent.prototype.switchPrerender = function () {
                const _this13 = this;
                return src.a.try(() => {
                    if (_this13.prerenderWindow && _this13.driver.switchPrerender) return _this13.driver.switchPrerender.call(_this13);
                });
            };
            ParentComponent.prototype.elementReady = function (element) {
                return Object(src_lib.o)(element).then(src_lib.I);
            };
            ParentComponent.prototype.delegate = function (win) {
                const _this14 = this;
                this.component.log(`delegate_${this.context}`);
                for (var props = {
                        uid: this.props.uid,
                        dimensions: this.props.dimensions,
                        onClose: this.props.onClose,
                        onDisplay: this.props.onDisplay,
                    }, _i4 = 0, _component$getPropNam2 = this.component.getPropNames(), _length4 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
                    const propName = _component$getPropNam2[_i4];
                    this.component.getProp(propName).allowDelegate && (props[propName] = this.props[propName]);
                }
                for (var delegate = _send(win, `${constants.POST_MESSAGE.DELEGATE}_${this.component.name}`, {
                        context: this.context,
                        env: this.props.env,
                        options: {
                            context: this.context,
                            childWindowName: this.childWindowName,
                            props,
                            overrides: {
                                focus() {
                                    return _this14.focus();
                                },
                                userClose() {
                                    return _this14.userClose();
                                },
                                getDomain() {
                                    return _this14.getDomain();
                                },
                                error(err) {
                                    return _this14.error(err);
                                },
                                on(eventName, handler) {
                                    return _this14.on(eventName, handler);
                                },
                            },
                        },
                    }).then((_ref7) => {
                        const data = _ref7.data;
                        _this14.clean.register(data.destroy);
                        return data;
                    }).catch((err) => {
                        throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.\n\n${Object(src_lib.W)(err)}`);
                    }), overrides = this.driver.delegateOverrides, _loop = function (_i6, _Object$keys4, _length6) {
                        const key = _Object$keys4[_i6]; const
                            val = overrides[key];
                        if (val === constants.DELEGATE.CALL_ORIGINAL) return "continue";
                        const original = _this14[key];
                        _this14[key] = function () {
                            const _this15 = this; const
                                _arguments = arguments;
                            return delegate.then((data) => {
                                const override = data.overrides[key];
                                if (val === constants.DELEGATE.CALL_DELEGATE) return override.apply(_this15, _arguments);
                                if (typeof val === "function") return val(original, override).apply(_this15, _arguments);
                                throw new Error("Expected delgate to be CALL_ORIGINAL, CALL_DELEGATE, or factory method");
                            });
                        };
                    }, _i6 = 0, _Object$keys4 = Object.keys(overrides), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) _loop(_i6, _Object$keys4);
            };
            ParentComponent.prototype.watchForClose = function () {
                const _this16 = this; const
                    closeWindowListener = Object(cross_domain_utils_src.onCloseWindow)(this.window, () => {
                        _this16.component.log("detect_close_child");
                        return src.a.try(() => _this16.props.onClose(constants.CLOSE_REASONS.CLOSE_DETECTED)).finally(() => _this16.destroy());
                    }, 3e3);
                this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
            };
            ParentComponent.prototype.watchForUnload = function () {
                const _this17 = this; const onunload = Object(src_lib.L)(() => {
                    _this17.component.log("navigate_away");
                    _this17.destroyComponent();
                }); const
                    unloadWindowListener = Object(src_lib.b)(window, "unload", onunload);
                this.clean.register("destroyUnloadWindowListener", unloadWindowListener.cancel);
            };
            ParentComponent.prototype.loadUrl = function (url) {
                const _this18 = this;
                return src.a.try(() => {
                    _this18.component.log("load_url");
                    if (window.location.href.split("#")[0] === url.split("#")[0]) {
                        let _query;
                        url = Object(src_lib.t)(url, {
                            query: (_query = {}, _query[Object(src_lib.Z)()] = "1", _query),
                        });
                    }
                    return _this18.driver.loadUrl.call(_this18, url);
                });
            };
            ParentComponent.prototype.runTimeout = function () {
                const _this19 = this; const
                    timeout = this.props.timeout;
                if (timeout) {
                    const _id = this.timeout = setTimeout(() => {
                        _this19.component.log("timed_out", {
                            timeout: timeout.toString(),
                        });
                        const error = _this19.component.createError(`Loading component timed out after ${timeout} milliseconds`);
                        _this19.onInit.reject(error);
                        _this19.props.onTimeout(error);
                    }, timeout);
                    this.clean.register(() => {
                        clearTimeout(_id);
                        delete _this19.timeout;
                    });
                }
            };
            ParentComponent.prototype.listeners = function () {
                let _ref8;
                return (_ref8 = {})[constants.POST_MESSAGE.INIT] = function (source, data) {
                    this.childExports = data.exports;
                    this.onInit.resolve(this);
                    this.timeout && clearTimeout(this.timeout);
                    return {
                        props: this.getPropsForChild(),
                        context: this.context,
                    };
                }, _ref8[constants.POST_MESSAGE.CLOSE] = function (source, data) {
                    this.close(data.reason);
                }, _ref8[constants.POST_MESSAGE.CHECK_CLOSE] = function () {
                    this.checkClose();
                }, _ref8[constants.POST_MESSAGE.RESIZE] = function (source, data) {
                    const _this20 = this;
                    return src.a.try(() => {
                        if (_this20.driver.allowResize) return _this20.resize(data.width, data.height);
                    });
                }, _ref8[constants.POST_MESSAGE.ONRESIZE] = function () {
                    this.event.trigger("resize");
                }, _ref8[constants.POST_MESSAGE.HIDE] = function () {
                    this.hide();
                }, _ref8[constants.POST_MESSAGE.SHOW] = function () {
                    this.show();
                }, _ref8[constants.POST_MESSAGE.ERROR] = function (source, data) {
                    this.error(new Error(data.error));
                }, _ref8;
            };
            ParentComponent.prototype.resize = function (width, height) {
                const _this21 = this; const _ref9$waitForTransiti = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).waitForTransition; const
                    waitForTransition = void 0 === _ref9$waitForTransiti || _ref9$waitForTransiti;
                return src.a.try(() => {
                    _this21.component.log("resize", {
                        height: Object(src_lib.V)(height),
                        width: Object(src_lib.V)(width),
                    });
                    _this21.driver.resize.call(_this21, width, height);
                    if (waitForTransition && (_this21.element || _this21.iframe)) {
                        let overflow = void 0;
                        _this21.element && (overflow = Object(src_lib.S)(_this21.element, "hidden"));
                        return Object(src_lib.p)(_this21.element || _this21.iframe).then(() => {
                            overflow && overflow.reset();
                        });
                    }
                });
            };
            ParentComponent.prototype.hide = function () {
                this.container && Object(src_lib.z)(this.container);
                return this.driver.hide.call(this);
            };
            ParentComponent.prototype.show = function () {
                this.container && Object(src_lib.U)(this.container);
                return this.driver.show.call(this);
            };
            ParentComponent.prototype.checkClose = function () {
                const _this22 = this; const
                    closeWindowListener = Object(cross_domain_utils_src.onCloseWindow)(this.window, () => {
                        _this22.userClose();
                    }, 50, 500);
                this.clean.register(closeWindowListener.cancel);
            };
            ParentComponent.prototype.userClose = function () {
                return this.close(constants.CLOSE_REASONS.USER_CLOSED);
            };
            ParentComponent.prototype.close = function () {
                const _this23 = this; const
                    reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : constants.CLOSE_REASONS.PARENT_CALL;
                return src.a.try(() => {
                    _this23.component.log("close", {
                        reason,
                    });
                    _this23.event.triggerOnce(constants.EVENTS.CLOSE);
                    return _this23.props.onClose(reason);
                }).then(() => src.a.all([_this23.closeComponent(), _this23.closeContainer()])).then(() => _this23.destroy());
            };
            ParentComponent.prototype.closeContainer = function () {
                const _this24 = this; const
                    reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : constants.CLOSE_REASONS.PARENT_CALL;
                return src.a.try(() => {
                    _this24.event.triggerOnce(constants.EVENTS.CLOSE);
                    return _this24.props.onClose(reason);
                }).then(() => src.a.all([_this24.closeComponent(reason), _this24.hideContainer()])).then(() => _this24.destroyContainer());
            };
            ParentComponent.prototype.destroyContainer = function () {
                const _this25 = this;
                return src.a.try(() => {
                    _this25.clean.run("destroyContainerEvents");
                    _this25.clean.run("destroyContainerTemplate");
                });
            };
            ParentComponent.prototype.closeComponent = function () {
                const _this26 = this; const reason = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : constants.CLOSE_REASONS.PARENT_CALL; const
                    win = this.window;
                return src.a.try(() => _this26.cancelContainerEvents()).then(() => {
                    _this26.event.triggerOnce(constants.EVENTS.CLOSE);
                    return _this26.props.onClose(reason);
                }).then(() => _this26.hideComponent()).then(() => _this26.destroyComponent())
                    .then(() => {
                        _this26.childExports && _this26.context === constants.CONTEXT_TYPES.POPUP && !Object(cross_domain_utils_src.isWindowClosed)(win) && _this26.childExports.close().catch(src_lib.I);
                    });
            };
            ParentComponent.prototype.destroyComponent = function () {
                this.clean.run("destroyUnloadWindowListener");
                this.clean.run("destroyCloseWindowListener");
                this.clean.run("destroyContainerEvents");
                this.clean.run("destroyWindow");
            };
            ParentComponent.prototype.showContainer = function () {
                const _this27 = this;
                return src.a.try(() => {
                    if (_this27.props.onDisplay) return _this27.props.onDisplay();
                }).then(() => {
                    if (_this27.container) return Object(src_lib.T)(_this27.container, constants.ANIMATION_NAMES.SHOW_CONTAINER, _this27.clean.register);
                });
            };
            ParentComponent.prototype.showComponent = function () {
                const _this28 = this;
                return src.a.try(() => {
                    if (_this28.props.onDisplay) return _this28.props.onDisplay();
                }).then(() => {
                    if (_this28.element) return Object(src_lib.T)(_this28.element, constants.ANIMATION_NAMES.SHOW_COMPONENT, _this28.clean.register);
                });
            };
            ParentComponent.prototype.hideContainer = function () {
                const _this29 = this;
                return src.a.try(() => (_this29.container ? Object(src_lib.c)(_this29.container, constants.ANIMATION_NAMES.HIDE_CONTAINER, _this29.clean.register) : src.a.resolve()));
            };
            ParentComponent.prototype.hideComponent = function () {
                const _this30 = this;
                return src.a.try(() => (_this30.element ? Object(src_lib.c)(_this30.element, constants.ANIMATION_NAMES.HIDE_COMPONENT, _this30.clean.register) : src.a.resolve()));
            };
            ParentComponent.prototype.focus = function () {
                if (!this.window || Object(cross_domain_utils_src.isWindowClosed)(this.window)) throw new Error("No window to focus");
                this.component.log("focus");
                this.window.focus();
            };
            ParentComponent.prototype.createPrerenderTemplate = function () {
                const _this31 = this;
                return src.a.try(() => (_this31.component.prerenderTemplate ? src.a.try(() => (_this31.prerenderIframe ? Object(src_lib.e)(_this31.prerenderIframe).then(() => _this31.prerenderWindow) : _this31.prerenderWindow)).then((win) => {
                    let doc = void 0;
                    try {
                        doc = win.document;
                    } catch (err) {
                        return;
                    }
                    const el = _this31.renderTemplate(_this31.component.prerenderTemplate, {
                        jsxDom: src_lib.F.bind(doc),
                        document: doc,
                    });
                    try {
                        Object(src_lib._3)(win, el);
                    } catch (err) {}
                }) : src.a.resolve()));
            };
            ParentComponent.prototype.renderTemplate = function (renderer) {
                const _this32 = this; const options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; const _ref10 = this.component.dimensions || {}; const _ref10$width = _ref10.width; const width = void 0 === _ref10$width ? `${constants.DEFAULT_DIMENSIONS.WIDTH}px` : _ref10$width; const _ref10$height = _ref10.height; const
                    height = void 0 === _ref10$height ? `${constants.DEFAULT_DIMENSIONS.HEIGHT}px` : _ref10$height;
                return renderer.call(this, parent__extends({
                    id: `${constants.CLASS_NAMES.ZOID}-${this.component.tag}-${this.props.uid}`,
                    props: renderer.__xdomain__ ? null : this.props,
                    tag: this.component.tag,
                    context: this.context,
                    outlet: this.getOutlet(),
                    CLASS: constants.CLASS_NAMES,
                    ANIMATION: constants.ANIMATION_NAMES,
                    CONTEXT: constants.CONTEXT_TYPES,
                    EVENT: constants.EVENTS,
                    actions: {
                        close() {
                            return _this32.userClose();
                        },
                        focus() {
                            return _this32.focus();
                        },
                    },
                    on(eventName, handler) {
                        return _this32.on(eventName, handler);
                    },
                    jsxDom: src_lib.F,
                    document,
                    dimensions: {
                        width,
                        height,
                    },
                }, options));
            };
            ParentComponent.prototype.openContainer = function (element) {
                const _this33 = this;
                return src.a.try(() => {
                    let el;
                    if (!(el = element ? Object(src_lib.w)(element) : document.body)) throw new Error("Could not find element to open container into");
                    if (_this33.component.containerTemplate) {
                        const container = _this33.renderTemplate(_this33.component.containerTemplate, {
                            container: el,
                        });
                        _this33.container = container;
                        Object(src_lib.z)(_this33.container);
                        Object(src_lib.d)(el, _this33.container);
                        if (_this33.driver.renderedIntoContainerTemplate) {
                            _this33.element = _this33.getOutlet();
                            Object(src_lib.z)(_this33.element);
                            if (!_this33.element) throw new Error("Could not find element to render component into");
                            Object(src_lib.z)(_this33.element);
                        }
                        _this33.clean.register("destroyContainerTemplate", () => {
                            _this33.container && _this33.container.parentNode && _this33.container.parentNode.removeChild(_this33.container);
                            delete _this33.container;
                        });
                    } else if (_this33.driver.renderedIntoContainerTemplate) throw new Error(`containerTemplate needed to render ${_this33.context}`);
                });
            };
            ParentComponent.prototype.cancelContainerEvents = function () {
                this.clean.run("destroyContainerEvents");
            };
            ParentComponent.prototype.destroy = function () {
                const _this34 = this;
                return src.a.try(() => {
                    if (_this34.clean.hasTasks()) {
                        _this34.component.log("destroy");
                        return _this34.clean.all();
                    }
                });
            };
            ParentComponent.prototype.tryInit = function (method) {
                const _this35 = this;
                return src.a.try(method).catch((err) => {
                    _this35.onInit.reject(err);
                }).then(() => _this35.onInit);
            };
            ParentComponent.prototype.error = function (err) {
                const _this36 = this;
                return src.a.try(() => {
                    _this36.handledErrors = _this36.handledErrors || [];
                    if (_this36.handledErrors.indexOf(err) === -1) {
                        _this36.handledErrors.push(err);
                        _this36.onInit.reject(err);
                        return _this36.destroy();
                    }
                }).then(() => {
                    if (_this36.props.onError) return _this36.props.onError(err);
                }).catch((errErr) => {
                    throw new Error(`An error was encountered while handling error:\n\n ${Object(src_lib.W)(err)}\n\n${Object(src_lib.W)(errErr)}`);
                }).then(() => {
                    if (!_this36.props.onError) throw err;
                });
            };
            ParentComponent.destroyAll = function () {
                for (var results = []; ParentComponent.activeComponents.length;) results.push(ParentComponent.activeComponents[0].destroy());
                return src.a.all(results).then(src_lib.I);
            };
            _createClass(ParentComponent, [{
                key: "driver",
                get() {
                    if (!this.context) throw new Error("Context not set");
                    return RENDER_DRIVERS[this.context];
                },
            }]);
            return ParentComponent;
        }(base_BaseComponent))).prototype, "getOutlet", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "getOutlet"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "prefetch", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "prefetch"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "loadHTML", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "loadHTML"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "buildUrl", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "buildUrl"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "open", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "open"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "openPrerender", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "openPrerender"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "switchPrerender", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "switchPrerender"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "close", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "closeContainer", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "closeContainer"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "destroyContainer", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "destroyContainer"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "closeComponent", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "closeComponent"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "showContainer", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "showContainer"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "showComponent", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "showComponent"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "hideContainer", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "hideContainer"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "hideComponent", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "hideComponent"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "createPrerenderTemplate", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "createPrerenderTemplate"), _class.prototype),
        _applyDecoratedDescriptor(_class.prototype, "openContainer", [src_lib.H], Object.getOwnPropertyDescriptor(_class.prototype, "openContainer"), _class.prototype),
        _class);
        parent_ParentComponent.activeComponents = [];
        const delegate__createClass = (function () {
            function defineProperties(target, props) {
                for (let i = 0; i < props.length; i++) {
                    const descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1;
                    descriptor.configurable = !0;
                    "value" in descriptor && (descriptor.writable = !0);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function (Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }());


        const delegate_DelegateComponent = (function (_BaseComponent) {
            !(function (subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                    },
                });
                superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }(DelegateComponent, _BaseComponent));
            function DelegateComponent(component, source, options) {
                !(function (instance, Constructor) {
                    if (!(instance instanceof DelegateComponent)) throw new TypeError("Cannot call a class as a function");
                }(this));
                const _this = (function (self, call) {
                    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !call || typeof call !== "object" && typeof call !== "function" ? self : call;
                }(this, _BaseComponent.call(this)));
                _this.component = component;
                _this.clean.set("source", source);
                _this.context = options.context;
                _this.props = {
                    uid: options.props.uid,
                    dimensions: options.props.dimensions,
                    onClose: options.props.onClose,
                    onDisplay: options.props.onDisplay,
                };
                for (let _i2 = 0, _component$getPropNam2 = component.getPropNames(), _length2 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i2 < _length2; _i2++) {
                    const propName = _component$getPropNam2[_i2];
                    _this.component.getProp(propName).allowDelegate && (_this.props[propName] = options.props[propName]);
                }
                _this.focus = function () {
                    return options.overrides.focus.call(_this);
                };
                _this.clean.register("destroyFocusOverride", () => {
                    _this.focus = src_lib.I;
                });
                _this.userClose = options.overrides.userClose;
                _this.getDomain = options.overrides.getDomain;
                _this.error = options.overrides.error;
                _this.on = options.overrides.on;
                for (let delegateOverrides = RENDER_DRIVERS[options.context].delegateOverrides, _i4 = 0, _Object$keys2 = Object.keys(delegateOverrides), _length4 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                    const key = _Object$keys2[_i4];
                    _this[key] = parent_ParentComponent.prototype[key];
                }
                _this.childWindowName = options.childWindowName;
                parent_ParentComponent.prototype.registerActiveComponent.call(_this);
                _this.watchForClose();
                return _this;
            }
            DelegateComponent.prototype.watchForClose = function () {
                const _this2 = this; const
                    closeWindowListener = Object(cross_domain_utils_src.onCloseWindow)(this.source, () => _this2.destroy(), 3e3);
                this.clean.register("destroyCloseWindowListener", closeWindowListener.cancel);
            };
            DelegateComponent.prototype.getOverrides = function (context) {
                for (var delegateOverrides = RENDER_DRIVERS[context].delegateOverrides, overrides = {}, self = this, _loop = function (_i6, _Object$keys4, _length6) {
                        const key = _Object$keys4[_i6];
                        overrides[key] = function () {
                            return parent_ParentComponent.prototype[key].apply(self, arguments);
                        };
                    }, _i6 = 0, _Object$keys4 = Object.keys(delegateOverrides), _length6 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i6 < _length6; _i6++) _loop(_i6, _Object$keys4);
                return overrides;
            };
            DelegateComponent.prototype.destroy = function () {
                return this.clean.all();
            };
            delegate__createClass(DelegateComponent, [{
                key: "driver",
                get() {
                    if (!this.context) throw new Error("Context not set");
                    return RENDER_DRIVERS[this.context];
                },
            }]);
            return DelegateComponent;
        }(base_BaseComponent));


        const drivers = __webpack_require__("./node_modules/zoid/src/drivers/index.js");


        const validate__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        function defaultContainerTemplate(_ref) {
            const id = _ref.id; const tag = _ref.tag; const context = _ref.context; const CLASS = _ref.CLASS; const outlet = _ref.outlet; const jsxDom = _ref.jsxDom; const _ref$dimensions = _ref.dimensions; const width = _ref$dimensions.width; const
                height = _ref$dimensions.height;
            return jsxDom("div", {
                id,
                class: `${CLASS.ZOID} ${CLASS.ZOID}-tag-${tag} ${CLASS.ZOID}-context-${context}`,
            }, jsxDom("style", null, `\n                    #${id}, #${id} > .${CLASS.OUTLET} {\n                        width: ${width};\n                        height: ${height};\n                    }\n\n                    #${id} > .${CLASS.OUTLET} {\n                        display: inline-block;\n                        position: relative;\n                    }\n\n                    #${id} > .${CLASS.OUTLET} > iframe {\n                        height: 100%;\n                        width: 100%;\n                        position: absolute;\n                        top: 0;\n                        left: 0;\n                        transition: opacity .2s ease-in-out;\n                    }\n\n                    #${id} > .${CLASS.OUTLET} > iframe.${CLASS.VISIBLE} {\n                        opacity: 1;\n                    }\n\n                    #${id} > .${CLASS.OUTLET} > iframe.${CLASS.INVISIBLE} {\n                        opacity: 0;\n                    }\n                `), outlet);
        }
        function defaultPrerenderTemplate(_ref) {
            const jsxDom = _ref.jsxDom;
            return jsxDom("html", null, jsxDom("head", null, jsxDom("style", null, "\n                        html, body {\n                            width: 100%;\n                            height: 100%;\n                            overflow: hidden;\n                            top: 0;\n                            left: 0;\n                            margin: 0;\n                            text-align: center;\n                        }\n\n                        .spinner {\n                            position: absolute;\n                            max-height: 60vmin;\n                            max-width: 60vmin;\n                            height: 40px;\n                            width: 40px;\n                            top: 50%;\n                            left: 50%;\n                            transform: translateX(-50%) translateY(-50%);\n                            z-index: 10;\n                        }\n\n                        .spinner .loader {\n                            height: 100%;\n                            width: 100%;\n                            box-sizing: border-box;\n                            border: 3px solid rgba(0, 0, 0, .2);\n                            border-top-color: rgba(33, 128, 192, 0.8);\n                            border-radius: 100%;\n                            animation: rotation .7s infinite linear;\n\n                        }\n\n                        @keyframes rotation {\n                            from {\n                                transform: rotate(0deg)\n                            }\n                            to {\n                                transform: rotate(359deg)\n                            }\n                        }\n                    ")), jsxDom("body", null, jsxDom("div", {
                class: "spinner",
            }, jsxDom("div", {
                id: "loader",
                class: "loader",
            }))));
        }
        __webpack_require__("./node_modules/zoid/src/types.js");
        let component__class; const component__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }; const component_drivers = {
            angular: drivers.angular,
            angular2: drivers.angular2,
            glimmer: drivers.glimmer,
            react: drivers.react,
            vue: drivers.vue,
            script: drivers.script,
        }; const
            component_Component = ((function (target, property, decorators, descriptor, context) {
                let desc = {};
                Object.keys(descriptor).forEach((key) => {
                    desc[key] = descriptor[key];
                });
                desc.enumerable = !!desc.enumerable;
                desc.configurable = !!desc.configurable;
                ("value" in desc || desc.initializer) && (desc.writable = !0);
                desc = decorators.slice().reverse().reduce((desc, decorator) => decorator(target, "getPropNames", desc) || desc, desc);
                if (context && void 0 !== desc.initializer) {
                    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
                    desc.initializer = void 0;
                }
                if (void 0 === desc.initializer) {
                    Object.defineProperty(target, "getPropNames", desc);
                    desc = null;
                }
            }((component__class = (function (_BaseComponent) {
                !(function (subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`);
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0,
                        },
                    });
                    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                }(Component, _BaseComponent));
                function Component(options) {
                    !(function (instance, Constructor) {
                        if (!(instance instanceof Component)) throw new TypeError("Cannot call a class as a function");
                    }(this));
                    const _this = (function (self, call) {
                        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !call || typeof call !== "object" && typeof call !== "function" ? self : call;
                    }(this, _BaseComponent.call(this)));
                    !(function (options) {
                        if (!options) throw new Error("Expecred options to be passed");
                        if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) throw new Error(`Invalid options.tag: ${options.tag}`);
                        !(function (options) {
                            if (options.props && validate__typeof(options.props) !== "object") throw new Error("Expected options.props to be an object");
                            if (options.props) {
                                for (let _i2 = 0, _Object$keys2 = Object.keys(options.props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                                    const key = _Object$keys2[_i2]; const
                                        prop = options.props[key];
                                    if (!prop || (void 0 === prop ? "undefined" : validate__typeof(prop)) !== "object") throw new Error(`Expected options.props.${key} to be an object`);
                                    if (!prop.type) throw new Error("Expected prop.type");
                                    if (constants.PROP_TYPES_LIST.indexOf(prop.type) === -1) throw new Error(`Expected prop.type to be one of ${constants.PROP_TYPES_LIST.join(", ")}`);
                                    if (prop.required && prop.def) throw new Error("Required prop can not have a default value");
                                }
                            }
                        }(options));
                        if (options.dimensions) {
                            if (options.dimensions && !Object(src_lib.E)(options.dimensions.width) && !Object(src_lib.D)(options.dimensions.width)) throw new Error("Expected options.dimensions.width to be a px or % string value");
                            if (options.dimensions && !Object(src_lib.E)(options.dimensions.height) && !Object(src_lib.D)(options.dimensions.height)) throw new Error("Expected options.dimensions.height to be a px or % string value");
                        }
                        if (options.contexts) {
                            options.contexts.popup;
                            for (var anyEnabled = !1, _i4 = 0, _Object$keys4 = Object.keys(options.contexts), _length4 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
                                const context = _Object$keys4[_i4];
                                if (constants.CONTEXT_TYPES_LIST.indexOf(context) === -1) throw new Error(`Unsupported context type: ${context}`);
                                (options.contexts && options.contexts[context] || options.contexts && void 0 === options.contexts[context]) && (anyEnabled = !0);
                            }
                            if (!anyEnabled) throw new Error("No context type is enabled");
                        }
                        if (options.defaultContext) {
                            if (constants.CONTEXT_TYPES_LIST.indexOf(options.defaultContext) === -1) throw new Error(`Unsupported context type: ${options.defaultContext || "unknown"}`);
                            if (options.contexts && options.defaultContext && !options.contexts[options.defaultContext]) throw new Error(`Disallowed default context type: ${options.defaultContext || "unknown"}`);
                        }
                        if (options.url && options.buildUrl) throw new Error("Can not pass both options.url and options.buildUrl");
                        if (options.defaultEnv) {
                            if (typeof options.defaultEnv !== "string") throw new TypeError("Expected options.defaultEnv to be a string");
                            if (!options.buildUrl && validate__typeof(options.url) !== "object") throw new Error("Expected options.url to be an object mapping env->url");
                            if (options.url && validate__typeof(options.url) === "object" && !options.url[options.defaultEnv]) throw new Error(`No url found for default env: ${options.defaultEnv}`);
                        }
                        if (options.url && validate__typeof(options.url) === "object") {
                            if (!options.defaultEnv) throw new Error("Must pass options.defaultEnv with env->url mapping");
                            for (let _i6 = 0, _Object$keys6 = Object.keys(options.url), _length6 = _Object$keys6 == null ? 0 : _Object$keys6.length; _i6 < _length6; _i6++) {
                                const env = _Object$keys6[_i6];
                                if (!options.url[env]) throw new Error(`No url specified for env: ${env}`);
                            }
                        }
                        if (options.prerenderTemplate && typeof options.prerenderTemplate !== "function") throw new Error("Expected options.prerenderTemplate to be a function");
                        if (options.containerTemplate && typeof options.containerTemplate !== "function") throw new Error("Expected options.containerTemplate to be a function");
                    }(options));
                    _this.addProp(options, "tag");
                    _this.addProp(options, "allowedParentDomains", constants.WILDCARD);
                    if (Component.components[_this.tag]) throw new Error("Can not register multiple components with the same tag");
                    _this.addProp(options, "name", _this.tag.replace(/-/g, "_"));
                    _this.builtinProps = {
                        env: {
                            type: "string",
                            queryParam: !0,
                            required: !1,
                            def(props, component) {
                                return component.defaultEnv;
                            },
                        },
                        uid: {
                            type: "string",
                            def() {
                                return Object(src_lib.Z)();
                            },
                            queryParam: !0,
                        },
                        dimensions: {
                            type: "object",
                            required: !1,
                        },
                        timeout: {
                            type: "number",
                            required: !1,
                            sendToChild: !1,
                        },
                        onDisplay: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            def() {
                                return src_lib.I;
                            },
                            decorate(onDisplay) {
                                return Object(src_lib.G)(Object(src_lib.O)(onDisplay));
                            },
                        },
                        onEnter: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            def() {
                                return src_lib.I;
                            },
                            decorate(onEnter) {
                                return Object(src_lib.O)(onEnter);
                            },
                        },
                        onRender: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            def() {
                                return src_lib.I;
                            },
                            decorate(onRender) {
                                return Object(src_lib.O)(onRender);
                            },
                        },
                        onClose: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            def() {
                                return src_lib.I;
                            },
                            decorate(onClose) {
                                return Object(src_lib.L)(Object(src_lib.O)(onClose));
                            },
                        },
                        onTimeout: {
                            type: "function",
                            required: !1,
                            sendToChild: !1,
                            def() {
                                return function (err) {
                                    return this.props.onError(err);
                                };
                            },
                            decorate(onTimeout) {
                                return Object(src_lib.G)(Object(src_lib.O)(onTimeout));
                            },
                        },
                        onError: {
                            type: "function",
                            required: !1,
                            sendToChild: !0,
                            def() {
                                return function (err) {
                                    setTimeout(() => {
                                        throw err;
                                    });
                                };
                            },
                            decorate(onError) {
                                return Object(src_lib.L)(Object(src_lib.O)(onError));
                            },
                        },
                    };
                    _this.props = options.props || {};
                    options.props || (_this.looseProps = !0);
                    _this.addProp(options, "dimensions");
                    _this.addProp(options, "scrolling");
                    _this.addProp(options, "listenForResize");
                    _this.addProp(options, "defaultEnv");
                    _this.addProp(options, "buildUrl");
                    _this.addProp(options, "url");
                    _this.addProp(options, "domain");
                    _this.addProp(options, "bridgeUrl");
                    _this.addProp(options, "bridgeDomain");
                    _this.addProp(options, "attributes", {});
                    _this.addProp(options, "contexts", {
                        iframe: !0,
                        popup: !1,
                    });
                    _this.addProp(options, "defaultContext");
                    _this.addProp(options, "autoResize", !1);
                    _this.addProp(options, "containerTemplate", defaultContainerTemplate);
                    _this.addProp(options, "prerenderTemplate", defaultPrerenderTemplate);
                    _this.addProp(options, "validate");
                    _this.addProp(options, "unsafeRenderTo", !1);
                    Component.components[_this.tag] = _this;
                    _this.registerDrivers();
                    _this.registerChild();
                    _this.listenDelegate();
                    return _this;
                }
                Component.prototype.getPropNames = function () {
                    for (var props = Object.keys(this.props), _i2 = 0, _Object$keys2 = Object.keys(this.builtinProps), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
                        const key = _Object$keys2[_i2];
                        props.indexOf(key) === -1 && props.push(key);
                    }
                    return props;
                };
                Component.prototype.getProp = function (name) {
                    return this.props[name] || this.builtinProps[name];
                };
                Component.prototype.registerDrivers = function () {
                    this.driverCache = {};
                    for (let _i4 = 0, _Object$keys4 = Object.keys(component_drivers), _length4 = _Object$keys4 == null ? 0 : _Object$keys4.length; _i4 < _length4; _i4++) {
                        const driverName = _Object$keys4[_i4];
                        if (driverName.indexOf("_") !== 0) {
                            const glob = component_drivers[driverName].global();
                            glob && this.driver(driverName, glob);
                        }
                    }
                };
                Component.prototype.driver = function (name, dep) {
                    if (!component_drivers[name]) throw new Error(`Could not find driver for framework: ${name}`);
                    this.driverCache[name] || (this.driverCache[name] = component_drivers[name].register(this, dep));
                    return this.driverCache[name];
                };
                Component.prototype.registerChild = function () {
                    const _this2 = this;
                    return src.a.try(() => {
                        if (_this2.isChild()) return new child_ChildComponent(_this2);
                    });
                };
                Component.prototype.listenDelegate = function () {
                    const _this3 = this;
                    _on(`${constants.POST_MESSAGE.ALLOW_DELEGATE}_${this.name}`, () => !0);
                    _on(`${constants.POST_MESSAGE.DELEGATE}_${this.name}`, (_ref) => {
                        const source = _ref.source; const origin = _ref.origin; const data = _ref.data; const
                            domain = _this3.getDomain(null, data.env || _this3.defaultEnv);
                        if (!domain) throw new Error("Could not determine domain to allow remote render");
                        if (!Object(cross_domain_utils_src.matchDomain)(domain, origin)) throw new Error(`Can not render from ${origin} - expected ${domain.toString()}`);
                        const delegate = _this3.delegate(source, data.options);
                        return {
                            overrides: delegate.getOverrides(data.context),
                            destroy() {
                                return delegate.destroy();
                            },
                        };
                    });
                };
                Component.prototype.canRenderTo = function (win) {
                    return _send(win, `${constants.POST_MESSAGE.ALLOW_DELEGATE}_${this.name}`).then(_ref2 => _ref2.data).catch(() => !1);
                };
                Component.prototype.getValidDomain = function (url) {
                    if (url) {
                        const domain = Object(cross_domain_utils_src.getDomainFromUrl)(url);
                        if (typeof this.domain === "string" && domain === this.domain) return domain;
                        const domains = this.domain;
                        if (domains && (void 0 === domains ? "undefined" : component__typeof(domains)) === "object" && !(domains instanceof RegExp)) {
                            for (let _i6 = 0, _Object$keys6 = Object.keys(domains), _length6 = _Object$keys6 == null ? 0 : _Object$keys6.length; _i6 < _length6; _i6++) {
                                const env = _Object$keys6[_i6];
                                if (env !== "test" && domain === domains[env]) return domain;
                            }
                        }
                    }
                };
                Component.prototype.getDomain = function (url, env) {
                    let domain = this.getForEnv(this.domain, env);
                    if (domain) return domain;
                    if (domain = this.getValidDomain(url)) return domain;
                    const envUrl = this.getForEnv(this.url, env);
                    return envUrl ? Object(cross_domain_utils_src.getDomainFromUrl)(envUrl) : url ? Object(cross_domain_utils_src.getDomainFromUrl)(url) : void 0;
                };
                Component.prototype.getBridgeUrl = function (env) {
                    return this.getForEnv(this.bridgeUrl, env);
                };
                Component.prototype.getForEnv = function (item, env) {
                    if (item) {
                        if (typeof item === "string" || item instanceof RegExp) return item;
                        env || (env = this.defaultEnv);
                        if (env) return env && (void 0 === item ? "undefined" : component__typeof(item)) === "object" && item[env] ? item[env] : void 0;
                    }
                };
                Component.prototype.getBridgeDomain = function (env) {
                    const bridgeDomain = this.getForEnv(this.bridgeDomain, env);
                    if (bridgeDomain) return bridgeDomain;
                    const bridgeUrl = this.getBridgeUrl(env);
                    return bridgeUrl ? Object(cross_domain_utils_src.getDomainFromUrl)(bridgeUrl) : void 0;
                };
                Component.prototype.getUrl = function (env, props) {
                    const url = this.getForEnv(this.url, env);
                    if (url) return url;
                    if (this.buildUrl) return this.buildUrl(props);
                    throw new Error("Unable to get url");
                };
                Component.prototype.isZoidComponent = function () {
                    return isZoidComponentWindow();
                };
                Component.prototype.isChild = function () {
                    return isZoidComponentWindow() && getComponentMeta().tag === this.tag;
                };
                Component.prototype.createError = function (message, tag) {
                    return new Error(`[${tag || this.tag}] ${message}`);
                };
                Component.prototype.init = function (props, context, element) {
                    return new parent_ParentComponent(this, this.getRenderContext(context, element), {
                        props,
                    });
                };
                Component.prototype.delegate = function (source, options) {
                    return new delegate_DelegateComponent(this, source, options);
                };
                Component.prototype.validateRenderContext = function (context, element) {
                    if (context && !this.contexts[context]) throw new Error(`[${this.tag}] Can not render to ${context}`);
                    if (!element && context === constants.CONTEXT_TYPES.IFRAME) throw new Error(`[${this.tag}] Context type ${constants.CONTEXT_TYPES.IFRAME} requires an element selector`);
                };
                Component.prototype.getDefaultContext = function () {
                    if (this.defaultContext) return this.defaultContext;
                    if (this.contexts[constants.CONTEXT_TYPES.IFRAME]) return constants.CONTEXT_TYPES.IFRAME;
                    if (this.contexts[constants.CONTEXT_TYPES.POPUP]) return constants.CONTEXT_TYPES.POPUP;
                    throw new Error("Can not determine default context");
                };
                Component.prototype.getRenderContext = function (context, element) {
                    context = context || this.getDefaultContext();
                    this.validateRenderContext(context, element);
                    return context;
                };
                Component.prototype.render = function (props, element) {
                    const _this4 = this;
                    return src.a.try(() => new parent_ParentComponent(_this4, _this4.getRenderContext(null, element), {
                        props,
                    }).render(element));
                };
                Component.prototype.renderIframe = function (props, element) {
                    const _this5 = this;
                    return src.a.try(() => new parent_ParentComponent(_this5, _this5.getRenderContext(constants.CONTEXT_TYPES.IFRAME, element), {
                        props,
                    }).render(element));
                };
                Component.prototype.renderPopup = function (props) {
                    const _this6 = this;
                    return src.a.try(() => new parent_ParentComponent(_this6, _this6.getRenderContext(constants.CONTEXT_TYPES.POPUP), {
                        props,
                    }).render());
                };
                Component.prototype.renderTo = function (win, props, element) {
                    const _this7 = this;
                    return src.a.try(() => new parent_ParentComponent(_this7, _this7.getRenderContext(null, element), {
                        props,
                    }).renderTo(win, element));
                };
                Component.prototype.renderIframeTo = function (win, props, element) {
                    const _this8 = this;
                    return src.a.try(() => new parent_ParentComponent(_this8, _this8.getRenderContext(constants.CONTEXT_TYPES.IFRAME, element), {
                        props,
                    }).renderTo(win, element));
                };
                Component.prototype.renderPopupTo = function (win, props) {
                    const _this9 = this;
                    return src.a.try(() => new parent_ParentComponent(_this9, _this9.getRenderContext(constants.CONTEXT_TYPES.POPUP), {
                        props,
                    }).renderTo(win));
                };
                Component.prototype.prerender = function (props, element) {
                    const instance = new parent_ParentComponent(this, this.getRenderContext(null, element), {
                        props,
                    });
                    instance.prefetch();
                    return {
                        render(innerProps, innerElement) {
                            innerProps && instance.updateProps(innerProps);
                            return instance.render(innerElement);
                        },
                        renderTo(win, innerProps, innerElement) {
                            innerProps && instance.updateProps(innerProps);
                            return instance.renderTo(win, innerElement);
                        },
                        get html() {
                            return instance.html;
                        },
                        set html(value) {
                            instance.html = value;
                        },
                    };
                };
                Component.prototype.log = function (event) {
                    const payload = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    Object(src_lib.B)(this.name, event, payload);
                };
                Component.prototype.logWarning = function (event, payload) {
                    Object(src_lib._1)(this.name, event, payload);
                };
                Component.prototype.logError = function (event, payload) {
                    Object(src_lib.q)(this.name, event, payload);
                };
                Component.getByTag = function (tag) {
                    return Component.components[tag];
                };
                return Component;
            }(base_BaseComponent))).prototype, 0, [src_lib.G], Object.getOwnPropertyDescriptor(component__class.prototype, "getPropNames"), component__class.prototype)),
            component__class);
        component_Component.components = {};
        function create(options) {
            return new component_Component(options);
        }
        function getByTag(tag) {
            return component_Component.getByTag(tag);
        }
        function interface_destroyAll() {
            return parent_ParentComponent.destroyAll();
        }
        var postRobot = src_namespaceObject; var interface_CONSTANTS = constants; const
            LoginZoidComponent = create({
                tag: "login-component",
                defaultEnv: "demo",
                url: {
                    demo: "./login.htm",
                    test: "/base/test/windows/login/index.htm",
                    production: "https://my-site.com/login",
                },
                domain: {
                    test: "mock://www.my-site.com",
                },
                props: {
                    prefilledEmail: {
                        type: "string",
                        required: !0,
                    },
                    onLogin: {
                        type: "function",
                        required: !0,
                    },
                },
                defaultContext: "iframe",
                contexts: {
                    iframe: !0,
                    popup: !0,
                },
                prerenderTemplate(_ref) {
                    const jsxDom = _ref.jsxDom;
                    return jsxDom("html", null, jsxDom("head", null, jsxDom("style", null, "\n                        html, body {\n                            width: 100%;\n                            height: 100%;\n                            overflow: hidden;\n                            top: 0;\n                            left: 0;\n                            margin: 0;\n                            text-align: center;\n                        }\n\n                        .spinner {\n                            position: absolute;\n                            max-height: 60vmin;\n                            max-width: 60vmin;\n                            height: 40px;\n                            width: 40px;\n                            top: 50%;\n                            left: 50%;\n                            transform: translateX(-50%) translateY(-50%);\n                            z-index: 10;\n                        }\n\n                        .spinner .loader {\n                            height: 100%;\n                            width: 100%;\n                            box-sizing: border-box;\n                            border: 3px solid rgba(0, 0, 0, .2);\n                            border-top-color: rgba(33, 128, 192, 0.8);\n                            border-radius: 100%;\n                            animation: rotation .7s infinite linear;\n\n                        }\n\n                        @keyframes rotation {\n                            from {\n                                transform: rotate(0deg)\n                            }\n                            to {\n                                transform: rotate(359deg)\n                            }\n                        }\n                    ")), jsxDom("body", null, jsxDom("div", {
                        class: "spinner",
                    }, jsxDom("div", {
                        id: "loader",
                        class: "loader",
                    }))));
                },
            });
        __webpack_require__.d(__webpack_exports__, "LoginZoidComponent", () => LoginZoidComponent);
    },
}))));
// # sourceMappingURL=login-zoid-component.frame.js.map
// # sourceMappingURL=login-zoid-component.frame.js.map
