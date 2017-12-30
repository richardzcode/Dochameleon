const React = require('react');

const Breadcrumb = (props) => {
  const { current } = props;
  if (!current) { return null; }

  return (
    <div className="navBreadcrumb wrapper">
      <div className="navToggle" id="navToggler">
        <i />
      </div>
      <h2>
        <i>›</i>
        <span>{current.sidebar_label}</span>
      </h2>
    </div>
  );
}

const Category = (props) => {
  const { name, items, metadatas, current } = props;
  const itemComps = items
    .map(metadata => <Item key={metadata.id} metadata={metadata} current={current} />);
  return (
    <div className="navGroup navGroupActive">
      <h3>{name}</h3>
      <ul>{itemComps}</ul>
    </div>
  );
}

const Item = (props) => {
  const { metadata, current } = props;
  const active = current && current.id === metadata.id;
  const itemClasses = 'navListItem' + active? ' navListItemActive' : '';
  const linkClasses = 'navItem' + active? ' navItemActive' : '';
  return (
    <li className={itemClasses}>
      <a className={linkClasses} href={metadata.permalink}>
        {metadata.sidebar_label || metadata.title}
      </a>
    </li>
  );
}

class SideNav extends React.Component {
  render() {
    const { sidebar, current } = this.props;
    const categoryComps = Object.keys(sidebar).map(name => {
      return (
        <Category
          key={name}
          name={name}
          items={sidebar[name]}
          current={current}
        />
      );
    });

    return (
      <nav className="toc">
        <div className="toggleNav">
          <section className="navWrapper wrapper">
            <Breadcrumb current={current} />
            <div className="navGroups">
              {categoryComps}
            </div>
          </section>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          var toggler = document.getElementById('navToggler');
          var nav = document.getElementById('docsNav');
          toggler.onclick = function() {
            nav.classList.toggle('docsSliderActive');
          };
        `,
          }}
        />
      </nav>
    );
  }
}

module.exports = SideNav;
