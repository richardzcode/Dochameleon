const React = require('react');

const HomeSplash = require('../components/HomeSplash.js');
const Features = require('../components/Features.js');
const Callout = require('../components/Callout.js');
const Showcase = require('../components/Showcase.js');

const callouts = require('../components/callouts.json');

class Index extends React.Component {
  render() {
    const { site, lang } = this.props;
    const { theme } = site;
    return (
      <div>
        <HomeSplash site={site} lang={lang} />
        <div style={theme.block}><Features site={site} lang={lang} /></div>
        <div style={theme.blockEven}>
          <Callout site={site} callout={callouts[0]} lang={lang} />
        </div>
        <div style={theme.block}>
          <Callout site={site} callout={callouts[1]} lang={lang} />
        </div>
        <div style={theme.blockEven}>
          <Showcase site={site} lang={lang} pinned />
        </div>
      </div>
    );
  }
}

module.exports = Index;
