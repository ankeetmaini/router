'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppRouter = function (_HTMLElement) {
  _inherits(AppRouter, _HTMLElement);

  function AppRouter() {
    _classCallCheck(this, AppRouter);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AppRouter).apply(this, arguments));
  }

  _createClass(AppRouter, [{
    key: '_onChanged',
    value: function _onChanged() {
      var _this2 = this;

      var path = window.location.pathname;
      var routes = Array.from(this._routes.keys());
      var route = routes.find(function (r) {
        return r.test(path);
      });
      var data = route.exec(path);

      if (!route) return;

      // so we have a route, store it.
      this._newView = this._routes.get(route);

      // don't create more out animations if one is already running
      if (this._isOutViewTransitioning) return Promise.resolve();
      this._isOutViewTransitioning = true;

      var outViewPromise = Promise.resolve();

      if (this._currentView) {
        // if the current view is the one we got, just call update
        if (this._currentView === this._newView) {
          this._isOutViewTransitioning = false;
          return this._currentView.update(data);
        }
        // otherwise transition out the current view
        outViewPromise = this._currentView.out(data);
      }

      return outViewPromise.then(function (_) {
        _this2._isOutViewTransitioning = false;
        _this2._currentView = _this2._newView;
        _this2._newView.in(data);
      });
    }
  }, {
    key: 'go',
    value: function go(url) {
      window.history.pushState(null, null, url);
      return this._onChanged();
    }
  }, {
    key: '_createRoute',
    value: function _createRoute(route, view) {
      if (this._routes.has(route)) console.warn('Route already exists ', route);
      this._routes.set(route, view);
    }
  }, {
    key: '_createRoutes',
    value: function _createRoutes() {
      var _this3 = this;

      var views = [].slice.call(document.querySelectorAll('app-view'));
      views.forEach(function (view) {
        if (view.route) _this3._createRoute(new RegExp(view.route, 'i'), view);
      });
    }
  }, {
    key: '_clearRoutes',
    value: function _clearRoutes() {
      this._routes.clear();
    }
  }, {
    key: 'createdCallback',
    value: function createdCallback() {
      // otherwise `this` will point to the event object, won't it?
      this._onChanged = this._onChanged.bind(this);
      this._routes = new Map();
    }
  }, {
    key: 'attachedCallback',
    value: function attachedCallback() {
      window.addEventListener('popstate', this._onChanged);
      this._clearRoutes();
      this._createRoutes();
      this._onChanged();
    }
  }, {
    key: 'detachedEvent',
    value: function detachedEvent() {
      window.removeEventListener('popstate', this._onChanged);
    }
  }]);

  return AppRouter;
}(HTMLElement);

document.registerElement('app-router', AppRouter);