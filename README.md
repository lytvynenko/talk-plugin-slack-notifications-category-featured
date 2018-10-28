---
title: talk-plugin-slack-notifications-category-featured
permalink: /plugin/talk-plugin-slack-notifications-category-featured/
layout: plugin
plugin:
  name: talk-plugin-slack-notifications-category-featured
  depends:
    - name: talk-plugin-notifications
    - name: talk-plugin-featured-comments
  provides:
    - Server
---

When a comment is featured (via the
[talk-plugin-featured-comments](/talk/plugin/talk-plugin-featured-comments)
plugin), plugin will post message to slack channel.
Slack integration is configured via environment variables:

- TALK_SLACK_NOTIFICATION_WEBHOOK_URL -
- TALK_SLACK_NOTIFICATION_WEBHOOK_TIMEOUT
