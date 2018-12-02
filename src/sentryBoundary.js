import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

// Sentry.init({
//   dsn: 'https://031bf2e14acc4bfe874e7e64cca741cd@sentry.io/1335318'
// });
// should have been called before using it here
// ideally before even rendering your react app

class SentryBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.error) {
      //render fallback UI
      return <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>;
    } else {
      //when there's not an error, render children untouched
      return this.props.children;
    }
  }
}

export default SentryBoundary;
