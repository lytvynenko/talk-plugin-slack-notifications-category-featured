// taken from https://github.com/coralproject/talk/tree/master/plugins/talk-plugin-slack-notifications.

const fetch = require("node-fetch");
const {
  SLACK_NOTIFICATION_WEBHOOK_URL,
  SLACK_NOTIFICATION_WEBHOOK_TIMEOUT
} = require("./config");
const debug = require("debug")(
  "talk:plugin:slack-notifications-category-featured"
);

// We don't add the hooks during _test_ as the Slack API is not available.
if (process.env.NODE_ENV === "test") {
  return null;
}

module.exports = async message => {
  debug(
    `Posting notification to Slack webhook: ${SLACK_NOTIFICATION_WEBHOOK_URL}`
  );
  process.nextTick(async () => {
    const response = await fetch(SLACK_NOTIFICATION_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      timeout: SLACK_NOTIFICATION_WEBHOOK_TIMEOUT,
      body: JSON.stringify({
        attachments: [message]
      })
    });
    if (!response.ok) {
      const responseText = await response.text();
      console.trace(
        `Posting to Slack failed with HTTP code ${
          response.status
        } and body '${responseText}'`
      );
      return true;
    }
    return false;
  });
};
