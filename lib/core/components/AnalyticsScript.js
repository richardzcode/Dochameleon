const React = require('react');

const gascript = `
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '$trackerId$', 'auto');
ga('send', 'pageview');
`;

const script_html = '<script type="text/javascript" src="$src$" async></script>';

class AnalyticsScript extends React.Component {
  render() {
    const { site } = this.props;
    const { analyticsConfig } = site;
    if (!analyticsConfig || !analyticsConfig.tracker_id) { return null; }

    const ga = gascript.replace('$trackerId$', analyticsConfig.tracker_id);
    const js = [].concat(analyticsConfig.js)
      .filter(entry => typeof entry === 'object');
    return (
      <React.Fragment>
        <script dangerouslySetInnerHTML={{__html: ga}}></script>
        {
          js.map((entry, idx) => (
            <span
              key={idx}
              dangerouslySetInnerHTML={{__html: script_html.replace('$src$', entry.src)}}
            />
          ))
        }
      </React.Fragment>
    );
  }
}

module.exports = AnalyticsScript;
