const React = require('react');

const gascript = `
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '$trackerId$', 'auto');
ga('send', 'pageview');
`;

class AnalyticsScript extends React.Component {
  render() {
    const { site } = this.props;
    const { analyticsConfig } = site;
    if (!analyticsConfig || !analyticsConfig.tracker_id) { return null; }

    const ga = gascript.replace('$trackerId$', analyticsConfig.tracker_id);
    return (
      <script dangerouslySetInnerHTML={{__html: ga}}></script>
    );
  }
}

module.exports = AnalyticsScript;
