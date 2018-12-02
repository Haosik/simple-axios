import * as Sentry from '@sentry/browser';

function init() {
  Sentry.init({
    dsn: 'https://031bf2e14acc4bfe874e7e64cca741cd@sentry.io/1335318'
  });
  // should have been called before using it here
  // ideally before even rendering your react app
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
