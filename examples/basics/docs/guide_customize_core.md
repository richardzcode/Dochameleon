---
id: guide_core
title: Core Component
sidebar_label: Core Component
---

Like mentioned in [Customization - React Component](./guide_react.html), Dochameleon merges custom and core components together at runtime. This makes further customization possible.

Let's say you don't like sidebar at the left side for docs. Just copy `components/docs/DocsLayout.js` from core library to `website/components/docs`, then modify render function to switch the order of sidebar and content.

```
    return (
      <Page site={site} title={title} description={content.trim().split('\n')[0]}>
        <Row>
          <Col xs={12} md={8} lg={9}>
            <Doc site={site} title={title}>{content}</Doc>
            <PrevNext site={site} metadata={metadata} />
          </Col>
          <Col xs={12} md={4} lg={3}>
            <DocsSidebar site={site} metadata={metadata} />
          </Col>
        </Row>
      </Page>
    );
```

Now `npm run start` see the sidebar is on the right side.
