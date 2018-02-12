const React = require('react');

const Showcase = require('../components/Showcase.js');

const user_json = 'https://github.com/richardzcode/Dochameleon/blob/master/website/components/users.json';

class Users extends React.Component {
  render() {
    const { site, lang } = this.props;
    const { theme } = site;
    return (
      <div>
        <div style={theme.block}>
          <Showcase site={site} lang={lang} />
          <h5 style={theme.h5}>
            Create <a href={user_json}>pull request</a> to add your logo
          </h5>
        </div>
      </div>
    );
  }
}

module.exports = Users;
