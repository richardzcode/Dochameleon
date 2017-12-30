const React = require('react');

const MarkdownBlock = require('../../core/MarkdownBlock.js');

class BlogPost extends React.Component {
  renderContent() {
    const { post, site, truncate } = this.props;
    const url = site.config.baseUrl + 'blog/' + post.path;
    const readMore = (
      <div className="read-more">
        <a className="button" href={url}> Read More </a>
      </div>
    );
    return truncate
      ? (
          <article className="post-content">
            <MarkdownBlock>{post.brief}</MarkdownBlock>
            {post.brief === post.content && readMore}
          </article>
        )
      : <MarkdownBlock>{post.content}</MarkdownBlock>;
  }

  renderAuthorPhoto() {
    const { post } = this.props;
    if (!post.authorImage) { return null; }

    const className = 'authorPhoto' +
      (post.author && post.authorTitle ? ' authorPhoto-big' : '');
    return (
      <div className={className}>
        <a href={post.authorURL} target="_blank">
          <img src={post.authorImage} />
        </a>
      </div>
    );
  }

  renderTitle() {
    const { post, site } = this.props;
    const url = site.config.baseUrl + 'blog/' + post.path;
    return (
      <h1><a href={url}>{post.title}</a></h1>
    );
  }

  renderPostHeader() {
    const { post } = this.props;
    const match = post.path.match(/([0-9]+)\/([0-9]+)\/([0-9]+)/);
    // Because JavaScript sucks at date handling :(
    const year = match[1];
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][parseInt(match[2], 10) - 1];
    const day = parseInt(match[3], 10);

    return (
      <header className="postHeader">
        {this.renderTitle()}
        <p className="post-meta">
          {month} {day}, {year}
        </p>
        <div className="authorBlock">
          {post.author ? (
            <p className="post-authorName">
              <a href={post.authorURL} target="_blank">
                {post.author}
              </a>
              {post.authorTitle}
            </p>
          ) : null}
          {this.renderAuthorPhoto()}
        </div>
      </header>
    );
  }

  render() {
    return (
      <div className="post">
        {this.renderPostHeader()}
        {this.renderContent()}
      </div>
    );
  }
}

module.exports = BlogPost;
