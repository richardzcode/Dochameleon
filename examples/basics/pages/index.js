const React = require('react');

const HomeSplash = require('../components/HomeSplash.js');
const Features = require('../components/Features.js');
const FeatureCallout = require('../components/FeatureCallout.js');
const Showcase = require('../components/Showcase.js');

const calloutFeatures = require('../components/featureCallouts.json');

class Index extends React.Component {
  render() {
    const { site } = this.props;
    const { theme } = site;
    return (
      <div>
        <HomeSplash site={site} />
        <div style={theme.block}><Features site={site} /></div>
        <div style={theme.blockEven}>
          <FeatureCallout site={site} feature={calloutFeatures[0]} />
        </div>
        <div style={theme.block}>
          <FeatureCallout site={site} feature={calloutFeatures[1]} odd={true}/>
        </div>
        <div style={theme.blockEven}>
          <Showcase site={site} pinned />
        </div>
      </div>
    );
  }
}

module.exports = Index;
