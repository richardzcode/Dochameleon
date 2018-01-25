const React = require('react');
const { Div, Ul, Input, Img } = require('fluid-react');

const searchJs = `
var client = algoliasearch('$application_id$', '$search_api_key$');
var index = client.initIndex('$index_name$');

var itemStyle = $itemStyle$;
var footerStyle = $footerStyle$;
var logoSrc = '$logoSrc$';

var elWithStyle = function(tag, style) {
  const el = document.createElement(tag);
  if (style) {
    Object.keys(style)
      .filter(key => !['title', 'description', 'search_by', 'logo'].includes(key))
      .forEach(key => el.style[key] = style[key]);
  }
  return el;
};

var init = function() {
  box.addEventListener('keyup', function(evt) {
    if (evt.key === 'Escape') {
      box.value = '';
      list.style.display = 'none';
    } else {
      search();
    }
  });
}

var search = function() {
  var term = box.value.trim();
  if (!term) {
    list.style.display = 'none';
    return;
  }

  index.search({ query: term }, function(err, content) {
    if (err) { return console.log(err); }

    while (list.children.length > 0) { list.removeChild(list.children[0]); }

    if (content.nbHits === 0) {
      list.style.display = 'none';
      return;
    }

    list.style.display = 'block';
    content.hits.forEach(hit => {
      const item = elWithStyle('li', itemStyle);
      list.appendChild(item);

      const title = elWithStyle('a', itemStyle.title);
      title.href = hit.permalink;
      title.innerHTML = hit.title;
      item.appendChild(title);

      const description = elWithStyle('div', itemStyle.description);
      description.innerHTML = hit.brief;
      item.appendChild(description);
    });

    const footer = elWithStyle('li', footerStyle);
    list.appendChild(footer);
    const search_by = elWithStyle('span', footerStyle.search_by);
    search_by.innerHTML = 'search by';
    footer.appendChild(search_by);
    const logo = elWithStyle('img', footerStyle.logo);
    logo.src = logoSrc;
    footer.appendChild(logo);
  });
}

var box = document.getElementById('doc_search');
var list = document.getElementById('doc_search_list');

box.addEventListener('focus', search);

init();
`

class SearchBox extends React.Component {
  render() {
    const { site } = this.props;
    const { searchConfig } = site;
    const theme = site.theme.search;
    const itemStyle = theme.item || {};
    const footerStyle = theme.footer || {};
    const js = searchJs.replace('$application_id$', searchConfig.application_id)
      .replace('$search_api_key$', searchConfig.search_api_key)
      .replace('$index_name$', 'docs')
      .replace('$itemStyle$', JSON.stringify(itemStyle))
      .replace('$footerStyle$', JSON.stringify(footerStyle))
      .replace('$logoSrc$', site.url('img/algolia.svg'));
    return (
      <Div style={theme.container}>
        <Input id="doc_search" style={theme.input} />
        <Ul id="doc_search_list" style={theme.list}></Ul>
        <script dangerouslySetInnerHTML={{__html: js}}></script>
      </Div>
    )
  }
}

module.exports = SearchBox;
