"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvgIcon = (function () {
    function SvgIcon(renderer, selector) {
        this.renderer = renderer;
        this.selector = selector;
        this._mutationObserver = null;
    }
    SvgIcon.prototype.startObserving = function (html) {
        this._render(html);
        this._mutationObserver = new MutationObserver(this._observerCallback.bind(this));
        this._mutationObserver.observe(html, { childList: true, subtree: true });
    };
    SvgIcon.prototype.stopObserving = function () {
        if (this._mutationObserver !== null) {
            this._mutationObserver.disconnect();
            this._mutationObserver = null;
        }
    };
    SvgIcon.prototype.renderOnce = function (html) {
        this._render(html);
    };
    SvgIcon.prototype._render = function (html) {
        if (html.matches(this.selector)) {
            this.renderer.convertSvg(html);
            return;
        }
        var nodeList = html.querySelectorAll(this.selector);
        for (var i = 0, l = nodeList.length; i < l; i++)
            this.renderer.convertSvg(nodeList.item(i));
    };
    SvgIcon.prototype._observerCallback = function (mutations) {
        var _this = this;
        mutations.forEach(function (mutation) {
            for (var i = 0, nodeList = mutation.addedNodes, l = nodeList.length; i < l; i++) {
                var node = nodeList.item(i);
                if (node instanceof Element)
                    _this._render(node);
            }
        });
    };
    return SvgIcon;
}());
exports.SvgIcon = SvgIcon;
//# sourceMappingURL=svg-icon.js.map