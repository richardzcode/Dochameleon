const React = require('react');

const HelpDetails = require('../components/HelpDetails.js');

class Help extends React.Component {
  render() {
    const { site } = this.props;
    const { theme } = site;
    return (
      <div style={theme.section}>
        <div style={theme.helpSection}>
          <h2 style={theme.helpTitle}>Need help?</h2>
          <p style={theme.p}>This project is maintained by a dedicated group of people.</p>
        </div>
        <HelpDetails site={site} />
      </div>
    );
  }
}

module.exports = Help;
