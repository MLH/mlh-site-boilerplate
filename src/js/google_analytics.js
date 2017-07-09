'use strict';

/**
 * Bump this when making backwards incompatible changes to the tracking
 * implementation. This allows you to create a segment or view filter
 * that isolates only data captured with the most recent tracking changes.
 */
const TRACKING_VERSION = '2';


/**
 * A default value for dimensions so unset values always are reported as
 * something. This is needed since Google Analytics will drop empty dimension
 * values in reports.
 */
const NULL_VALUE = '(not set)';

/**
 *  * A mapping between custom dimension names and their indexes.
 *   */
const dimensions = {
  TRACKING_VERSION: 'dimension1',
  CLIENT_ID: 'dimension2',
  WINDOW_ID: 'dimension3',
  HIT_ID: 'dimension4',
  HIT_TIME: 'dimension5',
  HIT_TYPE: 'dimension6',
  HIT_SOURCE: 'dimension7',
  VISIBILITY_STATE: 'dimension8',
  URL_QUERY_PARAMS: 'dimension9',
};

/**
 *  * A mapping between custom metric names and their indexes.
 *   */
const metrics = {
  RESPONSE_END_TIME: 'metric1',
  DOM_LOAD_TIME: 'metric2',
  WINDOW_LOAD_TIME: 'metric3',
  PAGE_VISIBLE: 'metric4',
  MAX_SCROLL_PERCENTAGE: 'metric5',
  PAGE_LOADS: 'metric6',
};

/**
 * Initializes all the analytics setup. Creates trackers and sets initial
 * values on the trackers.
 */

/* eslint-disable no-unused-vars */
const initGoogleAnalytics = () => {
  // Initialize the command queue in case analytics.js hasn't loaded yet.
  window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

  trackErrors();
  trackCustomDimensions();
  sendNavigationTimingMetrics();
};
/* eslint-enable no-unused-vars */

/**
 * Parses the given url and returns an object mimicing a `Location` object.
 * @param {string} url The url to parse.
 * @return {!Object} An object with the same properties as a `Location`.
 */
const parseUrl = (url) => {
  const HTTP_PORT = '80';
  const HTTPS_PORT = '443';
  const DEFAULT_PORT = RegExp(':(' + HTTP_PORT + '|' + HTTPS_PORT + ')$');

  const a = document.createElement('a');
  const cache = {};

  // All falsy values (as well as ".") should map to the current URL.
  url = (!url || url == '.') ? location.href : url;

  if (cache[url]) return cache[url];

  a.href = url;

  // When parsing file relative paths (e.g. `../index.html`), IE will correctly
  // resolve the `href` property but will keep the `..` in the `path` property.
  // It will also not include the `host` or `hostname` properties. Furthermore,
  // IE will sometimes return no protocol or just a colon, especially for things
  // like relative protocol URLs (e.g. "//google.com").
  // To workaround all of these issues, we reparse with the full URL from the
  // `href` property.
  if (url.charAt(0) == '.' || url.charAt(0) == '/') return parseUrl(a.href);

  // Don't include default ports.
  let port = (a.port == HTTP_PORT || a.port == HTTPS_PORT) ? '' : a.port;

  // PhantomJS sets the port to "0" when using the file: protocol.
  port = port == '0' ? '' : port;

  // Sometimes IE incorrectly includes a port for default ports
  // (e.g. `:80` or `:443`) even when no port is specified in the URL.
  // http://bit.ly/1rQNoMg
  const host = a.host.replace(DEFAULT_PORT, '');

  // Not all browser support `origin` so we have to build it.
  const origin = a.origin ? a.origin : a.protocol + '//' + host;

  // Sometimes IE doesn't include the leading slash for pathname.
  // http://bit.ly/1rQNoMg
  const pathname = a.pathname.charAt(0) == '/' ? a.pathname : '/' + a.pathname;

  return cache[url] = {
    hash: a.hash,
    host: host,
    hostname: a.hostname,
    href: a.href,
    origin: origin,
    pathname: pathname,
    port: port,
    protocol: a.protocol,
    search: a.search,
  };
};

/**
 * Sets a default dimension value for all custom dimensions on all trackers.
 */
const trackCustomDimensions = () => {
  // Sets a default dimension value for all custom dimensions to ensure
  // that every dimension in every hit has *some* value. This is necessary
  // because Google Analytics will drop rows with empty dimension values
  // in your reports.
  Object.keys(dimensions).forEach((key) => {
    ga('set', dimensions[key], NULL_VALUE);
  });

  // Adds tracking of dimensions known at page load time.
  ga((tracker) => {
    const clientId = analytics.user().id() ||
                      analytics.user().anonymousId() ||
                      tracker.get('clientId');

    const qs = parseUrl().search.slice(1) || NULL_DIMENSION;

    tracker.set({
      [dimensions.TRACKING_VERSION]: TRACKING_VERSION,
      [dimensions.CLIENT_ID]: clientId,
      [dimensions.WINDOW_ID]: uuid(),
      [dimensions.URL_QUERY_PARAMS]: qs,
    });
  });

  // Adds tracking to record each the type, time, uuid, and visibility state
  // of each hit immediately before it's sent.
  ga((tracker) => {
    const originalBuildHitTask = tracker.get('buildHitTask');

    tracker.set('buildHitTask', (model) => {
      const qt = model.get('queueTime') || 0;

      model.set(dimensions.HIT_TIME, String(new Date - qt), true);
      model.set(dimensions.HIT_ID, uuid(), true);
      model.set(dimensions.HIT_TYPE, model.get('hitType'), true);
      model.set(dimensions.VISIBILITY_STATE, document.visibilityState, true);

      originalBuildHitTask(model);
    });
  });
};

/**
 * Tracks a JavaScript error with optional fields object overrides.
 * This function is exported so it can be used in other parts of the codebase.
 * E.g.:
 *
 *    `fetch('/api.json').catch(trackError);`
 *
 * @param {(Error|Object)=} err
 * @param {Object=} fieldsObj
 */
const trackError = (err = {}, fieldsObj = {}) => {
  console.log('sending error');
  ga('send', 'event', Object.assign({
    eventCategory: 'Error',
    eventAction: err.name || '(no error name)',
    eventLabel: `${err.message}\n${err.stack || '(no stack trace)'}`,
    nonInteraction: true,
  }, fieldsObj));
};

/**
 * Tracks any errors that may have occured on the page prior to analytics being
 * initialized, then adds an event handler to track future errors.
 */
const trackErrors = () => {
  // Errors that have occurred prior to this script running are stored on
  // `window.__e.q`, as specified in `index.html`.
  const loadErrorEvents = window.__e && window.__e.q || [];

  const trackErrorEvent = (event) => {
    console.log('caught error');
    // Use a different eventCategory for uncaught errors.
    const fieldsObj = {eventCategory: 'Uncaught Error'};

    // Some browsers don't have an error property, so we fake it.
    const err = event.error || {
      message: `${event.message} (${event.lineno}:${event.colno})`,
    };

    trackError(err, fieldsObj);
  };

  // Replay any stored load error events.
  for (let event of loadErrorEvents) {
    trackErrorEvent(event);
  }

  // Add a new listener to track event immediately.
  window.addEventListener('error', trackErrorEvent);
};

/**
 * Gets the DOM and window load times and sends them as custom metrics to
 * Google Analytics via an event hit.
 */
const sendNavigationTimingMetrics = () => {
  // Only track performance in supporting browsers.
  if (!(window.performance && window.performance.timing)) return;

  // If the window hasn't loaded, run this function after the `load` event.
  if (document.readyState != 'complete') {
    window.addEventListener('load', sendNavigationTimingMetrics);
    return;
  }

  const nt = performance.timing;
  const navStart = nt.navigationStart;

  const responseEnd = Math.round(nt.responseEnd - navStart);
  const domLoaded = Math.round(nt.domContentLoadedEventStart - navStart);
  const windowLoaded = Math.round(nt.loadEventStart - navStart);

  // In some edge cases browsers return very obviously incorrect NT values,
  // e.g. 0, negative, or future times. This validates values before sending.
  const allValuesAreValid = (...values) => {
    return values.every((value) => value > 0 && value < 6e6);
  };

  if (allValuesAreValid(responseEnd, domLoaded, windowLoaded)) {
    ga('send', 'event', {
      eventCategory: 'Navigation Timing',
      eventAction: 'track',
      eventLabel: NULL_VALUE,
      nonInteraction: true,
      [metrics.RESPONSE_END_TIME]: responseEnd,
      [metrics.DOM_LOAD_TIME]: domLoaded,
      [metrics.WINDOW_LOAD_TIME]: windowLoaded,
    });
  }
};

/**
 * Generates a UUID.
 * https://gist.github.com/jed/982883
 * @param {string|undefined=} a
 * @return {string}
 */
const uuid = function b(a) {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) :
            ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};
