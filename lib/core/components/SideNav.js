const React = require('react');

const Breadcrumb = require('./Breadcrumb.js');
const SideNavCategory = require('./SideNavCategory.js');

class SideNav extends React.Component {
  render() {
    const { site, sidebar, current, lang } = this.props;
    const { theme } = site;

    return (
      <React.Fragment>
        <Breadcrumb site={site} current={current} lang={lang} />
        <nav style={theme.sideNav} id="side_nav">
          {Object.keys(sidebar).map(name => (
            <SideNavCategory
              key={name}
              site={site}
              name={name}
              items={sidebar[name]}
              current={current}
              lang={lang}
            />
          ))}
        </nav>
      </React.Fragment>
    );
  }
}

module.exports = SideNav;
