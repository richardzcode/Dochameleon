const React = require('react');

const Showcase = require('../components/Showcase.js');

class Users extends React.Component {
  render() {
    const { site } = this.props;
    const { theme } = site;
    return (
      <div>
        <div style={theme.block}>
          <Showcase site={site} />
        </div>
      </div>
    );
  }
}

module.exports = Users;
