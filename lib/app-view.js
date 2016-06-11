'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppView = function (_HTMLElement) {
  _inherits(AppView, _HTMLElement);

  function AppView() {
    _classCallCheck(this, AppView);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AppView).apply(this, arguments));
  }

  _createClass(AppView, [{
    key: 'in',
    value: function _in(data) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var onTransitionEnd = function onTransitionEnd() {
          _this2.removeEventListener('transitionend', onTransitionEnd);
          resolve();
        };
        _this2.classList.add('visible');
        _this2.addEventListener('transitionend', onTransitionEnd);
      });
    }
  }, {
    key: 'out',
    value: function out(data) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var onTransitionEnd = function onTransitionEnd() {
          _this3.removeEventListener('transitionend', onTransitionEnd);
          resolve();
        };
        _this3.classList.remove('visible');
        _this3.addEventListener('transitionend', onTransitionEnd);
      });
    }
  }, {
    key: 'update',
    value: function update(data) {
      return Promise.resolve();
    }
  }, {
    key: 'route',
    get: function get() {
      return this.getAttribute('route') || null;
    }
  }]);

  return AppView;
}(HTMLElement);

document.registerElement('app-view', AppView);