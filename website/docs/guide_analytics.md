---
id: guide_analytics
title: Analytics
sidebar_label: Analytics
---

Dochameleon support [Google Analytics](https://developers.google.com/analytics/).

After setup Google Analytics for your project. Add `analyticsConfig.js` along with `siteConfig.js`

```bash
website/
└── analyticsConfig.js
```

Content similiar to this, remember to replace tracker_id:
```
const analyticsConfig = {
  tracker_id: 'UA-XXXX-Y',
  js: { src: 'https://www.google-analytics.com/analytics.js', async: true }
}

module.exports = analyticsConfig;
```

Then build and publish. Check results at [Google Analytics](https://analytics.google.com)
