const React = require('react');
const Remarkable = require('remarkable');
const { JS } = require('fsts');
const toSlug = require('../parse/toSlug.js');

const linkIcon = '<svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'

class MarkdownBlock extends React.Component {
  constructor(props) {
    super(props);

    this.style = this.style.bind(this);
    this.heading = this.heading.bind(this);
    this.paragraph = this.paragraph.bind(this);
    this.code = this.code.bind(this);
    this.fence = this.fence.bind(this);

    this.md = new Remarkable('full', {
      html: true,
      linkify: true,
    });
    this.md.use(this.heading);
    this.md.use(this.paragraph);
    this.md.use(this.code);
    this.md.use(this.fence);
  }

  style(theme, cls) {
    const style = theme[cls];
    const css = JS.styleToCss(style);
    return css.length > 1? css.substr(1, css.length - 2) : css;
  }

  /**
   * Adds GFM-style anchors to headings.
   */
  heading(md) {
    const that = this;
    const theme = this.props.site.theme.md;
    md.renderer.rules.heading_open = function(tokens, idx, options, env) {
      const level = tokens[idx].hLevel;
      const css = that.style(theme, 'h' + level);

      const content = tokens[idx + 1].content;
      const slug = toSlug(content);
      return (
        '<h' + level + ' style="' + css + '">' +
        '<a href="#' + slug + '" aria-hidden="true" class="hash-link" >' + linkIcon + '</a>'
      );
    };
    md.renderer.rules.heading_close = function(tokens, idx, options, env) {
      const level = tokens[idx].hLevel;
      return '</h' + level + '>';
    }
  }

  paragraph(md) {
    const theme = this.props.site.theme.md;
    const css = this.style(theme, 'p');
    md.renderer.rules.paragraph_open = function(tokens, idx, options, env) {
      return '<p style="' + css + '">';
    };
    md.renderer.rules.paragraph_close = function(tokens, idx, options, env) {
      return '</p>';
    }
  }

  code(md) {
    const theme = this.props.site.theme.md;
    const css = this.style(theme, 'code');
    md.renderer.rules.code = function(tokens, idx, options, env) {
      return '<code style="' + css + '">' + tokens[idx].content + '</code>';
    }
  }

  fence(md) {
    const that = this;
    const theme = this.props.site.theme.md;
    const css = that.style(theme, 'fence');
    md.renderer.rules.fence = function(tokens, idx, options, env) {
      return '<pre><code style="' + css + '">' + tokens[idx].content + '</code></pre>';
    };
  };

  render() {
    const content = this.md.render(this.props.children);
    return (
        <span
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
    )
  }
}

module.exports = MarkdownBlock;
