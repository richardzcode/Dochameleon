const React = require('react');
const { H3, H5, Div, P, Row, Col } = require('fluid-react');

const users = require('./users.json');

const Showcase = props => {
  if (users.length === 0) { return null; }

  const { site } = props;
  const { theme } = site;
  const userComps = users
    .filter(user => !props.pinned || user.pinned)
    .map((user, i) => {
      return (
        <Col xs={6} sm={4} md={3} lg={2} xl={1} key={i}>
          <a style={theme.showcaseBox} href={user.link}>
            <img style={theme.showcaseImage} src={site.url(user.img)} title={user.caption} />
          </a>
        </Col>
      );
    });

  return (
    <Div style={theme.showcase}>
      <H3 style={theme.h3}>Who's Using This?</H3>
      <H5 style={theme.h5}>This project is used by all these people</H5>
      <Row>
        {userComps}
      </Row>
    </Div>
  );
};

module.exports = Showcase;
