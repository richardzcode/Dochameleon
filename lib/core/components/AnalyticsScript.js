const React = require('react');

const gascript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '$tracking_id$');
`;

class AnalyticsScript extends React.Component {
  render() {
    const { site } = this.props;
    const { analyticsConfig } = site;
    if (!analyticsConfig || !analyticsConfig.tracking_id) { return null; }

    const ga = gascript.replace('$tracking_id$', analyticsConfig.tracking_id);
    return (
      <script dangerouslySetInnerHTML={{__html: ga}}></script>
    );
  }
}

module.exports = AnalyticsScript;
