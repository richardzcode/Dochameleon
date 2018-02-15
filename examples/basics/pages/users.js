const React = require('react');
const { JS} = require('fsts');

const Showcase = require('../components/Showcase.js');

const user_json = 'https://github.com/richardzcode/Dochameleon/blob/master/website/components/users.json';

class Users extends React.Component {
  render() {
    const { site, lang } = this.props;
    const { theme } = site;

    const cta = site.i18n.translate('Create <a href="{0}">pull request</a> to add your logo', lang);
    return (
      <div>
        <div style={theme.block}>
          <Showcase site={site} lang={lang} />
          <h5 style={theme.h5} dangerouslySetInnerHTML={{__html: JS.format(cta, user_json)}} />
        </div>
      </div>
    );
  }
}

module.exports = Users;
