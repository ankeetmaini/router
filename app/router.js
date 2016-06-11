class AppRouter extends HTMLElement {
  _onChanged () {
    const path = window.location.pathname;
    const routes = Array.from(this._routes.keys());
    const route = routes.find(r => r.test(path));
    const data = route.exec(path);

    if (!route) return;

    // so we have a route, store it.
    this._newView = this._routes.get(route);

    // don't create more out animations if one is already running
    if (this._isOutViewTransitioning) return Promise.resolve();
    this._isOutViewTransitioning = true;

    let outViewPromise = Promise.resolve();

    if (this._currentView) {
      // if the current view is the one we got, just call update
      if (this._currentView === this._newView) {
        this._isOutViewTransitioning = false;
        return this._currentView.update(data);
      }
      // otherwise transition out the current view
      outViewPromise = this._currentView.out(data);
    }

    return outViewPromise
      .then(_ => {
        this._isOutViewTransitioning = false;
        this._currentView = this._newView;
        this._newView.in(data);
      });
  }

  go (url) {
    window.history.pushState(null, null, url);
    return this._onChanged();
  }

  _createRoute (route, view) {
    if (this._routes.has(route)) console.warn('Route already exists ', route);
    this._routes.set(route, view);
  }

  _createRoutes () {
    const views = [].slice.call(document.querySelectorAll('app-view'));
    views.forEach(view => {
      if (view.route) this._createRoute(new RegExp(view.route, 'i'), view);
    });
  }

  _clearRoutes () {
    this._routes.clear();
  }

  createdCallback () {
    // otherwise `this` will point to the event object, won't it?
    this._onChanged = this._onChanged.bind(this);
    this._routes = new Map();
  }

  attachedCallback () {
    window.addEventListener('popstate', this._onChanged);
    this._clearRoutes();
    this._createRoutes();
    this._onChanged();
  }

  detachedEvent () {
    window.removeEventListener('popstate', this._onChanged);
  }
}

document.registerElement('app-router', AppRouter);
