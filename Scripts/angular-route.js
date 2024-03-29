/*
 AngularJS v1.5.0
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (r, d, C) {
    'use strict'; function x(s, h, g) {
        return {
            restrict: "ECA", terminal: !0, priority: 400, transclude: "element", link: function (a, c, b, f, y) {
                function k() { n && (g.cancel(n), n = null); l && (l.$destroy(), l = null); m && (n = g.leave(m), n.then(function () { n = null }), m = null) } function z() {
                    var b = s.current && s.current.locals; if (d.isDefined(b && b.$template)) {
                        var b = a.$new(), f = s.current; m = y(b, function (b) { g.enter(b, null, m || c).then(function () { !d.isDefined(u) || u && !a.$eval(u) || h() }); k() }); l = f.scope = b; l.$emit("$viewContentLoaded");
                        l.$eval(v)
                    } else k()
                } var l, m, n, u = b.autoscroll, v = b.onload || ""; a.$on("$routeChangeSuccess", z); z()
            }
        }
    } function A(d, h, g) { return { restrict: "ECA", priority: -400, link: function (a, c) { var b = g.current, f = b.locals; c.html(f.$template); var y = d(c.contents()); if (b.controller) { f.$scope = a; var k = h(b.controller, f); b.controllerAs && (a[b.controllerAs] = k); c.data("$ngControllerController", k); c.children().data("$ngControllerController", k) } a[b.resolveAs || "$resolve"] = f; y(a) } } } r = d.module("ngRoute", ["ng"]).provider("$route", function () {
        function s(a,
        c) { return d.extend(Object.create(a), c) } function h(a, d) { var b = d.caseInsensitiveMatch, f = { originalPath: a, regexp: a }, g = f.keys = []; a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function (a, d, b, c) { a = "?" === c ? c : null; c = "*" === c ? c : null; g.push({ name: b, optional: !!a }); d = d || ""; return "" + (a ? "" : d) + "(?:" + (a ? d : "") + (c && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "") }).replace(/([\/$\*])/g, "\\$1"); f.regexp = new RegExp("^" + a + "$", b ? "i" : ""); return f } var g = {}; this.when = function (a, c) {
            var b = d.copy(c); d.isUndefined(b.reloadOnSearch) &&
            (b.reloadOnSearch = !0); d.isUndefined(b.caseInsensitiveMatch) && (b.caseInsensitiveMatch = this.caseInsensitiveMatch); g[a] = d.extend(b, a && h(a, b)); if (a) { var f = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/"; g[f] = d.extend({ redirectTo: a }, h(f, b)) } return this
        }; this.caseInsensitiveMatch = !1; this.otherwise = function (a) { "string" === typeof a && (a = { redirectTo: a }); this.when(null, a); return this }; this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function (a, c, b, f, h, k, r) {
            function l(b) {
                var e =
                t.current; (x = (p = n()) && e && p.$$route === e.$$route && d.equals(p.pathParams, e.pathParams) && !p.reloadOnSearch && !v) || !e && !p || a.$broadcast("$routeChangeStart", p, e).defaultPrevented && b && b.preventDefault()
            } function m() {
                var w = t.current, e = p; if (x) w.params = e.params, d.copy(w.params, b), a.$broadcast("$routeUpdate", w); else if (e || w) v = !1, (t.current = e) && e.redirectTo && (d.isString(e.redirectTo) ? c.path(u(e.redirectTo, e.params)).search(e.params).replace() : c.url(e.redirectTo(e.pathParams, c.path(), c.search())).replace()), f.when(e).then(function () {
                    if (e) {
                        var a =
                        d.extend({}, e.resolve), b, c; d.forEach(a, function (b, e) { a[e] = d.isString(b) ? h.get(b) : h.invoke(b, null, null, e) }); d.isDefined(b = e.template) ? d.isFunction(b) && (b = b(e.params)) : d.isDefined(c = e.templateUrl) && (d.isFunction(c) && (c = c(e.params)), d.isDefined(c) && (e.loadedTemplateUrl = r.valueOf(c), b = k(c))); d.isDefined(b) && (a.$template = b); return f.all(a)
                    }
                }).then(function (c) { e == t.current && (e && (e.locals = c, d.copy(e.params, b)), a.$broadcast("$routeChangeSuccess", e, w)) }, function (b) {
                    e == t.current && a.$broadcast("$routeChangeError",
                    e, w, b)
                })
            } function n() { var a, b; d.forEach(g, function (f, g) { var q; if (q = !b) { var h = c.path(); q = f.keys; var l = {}; if (f.regexp) if (h = f.regexp.exec(h)) { for (var k = 1, n = h.length; k < n; ++k) { var m = q[k - 1], p = h[k]; m && p && (l[m.name] = p) } q = l } else q = null; else q = null; q = a = q } q && (b = s(f, { params: d.extend({}, c.search(), a), pathParams: a }), b.$$route = f) }); return b || g[null] && s(g[null], { params: {}, pathParams: {} }) } function u(a, b) {
                var c = []; d.forEach((a || "").split(":"), function (a, d) {
                    if (0 === d) c.push(a); else {
                        var f = a.match(/(\w+)(?:[?*])?(.*)/),
                        g = f[1]; c.push(b[g]); c.push(f[2] || ""); delete b[g]
                    }
                }); return c.join("")
            } var v = !1, p, x, t = { routes: g, reload: function () { v = !0; var b = { defaultPrevented: !1, preventDefault: function () { this.defaultPrevented = !0; v = !1 } }; a.$evalAsync(function () { l(b); b.defaultPrevented || m() }) }, updateParams: function (a) { if (this.current && this.current.$$route) a = d.extend({}, this.current.params, a), c.path(u(this.current.$$route.originalPath, a)), c.search(a); else throw B("norout"); } }; a.$on("$locationChangeStart", l); a.$on("$locationChangeSuccess",
            m); return t
        }]
    }); var B = d.$$minErr("ngRoute"); r.provider("$routeParams", function () { this.$get = function () { return {} } }); r.directive("ngView", x); r.directive("ngView", A); x.$inject = ["$route", "$anchorScroll", "$animate"]; A.$inject = ["$compile", "$controller", "$route"]
})(window, window.angular);
//# sourceMappingURL=angular-route.min.js.map