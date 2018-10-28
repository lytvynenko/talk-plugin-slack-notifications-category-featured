// taken from https://github.com/coralproject/talk/tree/master/plugins/talk-plugin-slack-notifications.
const config = {
  SLACK_NOTIFICATION_WEBHOOK_URL:
    process.env.TALK_SLACK_NOTIFICATION_WEBHOOK_URL,
  SLACK_NOTIFICATION_WEBHOOK_TIMEOUT:
    process.env.TALK_SLACK_NOTIFICATION_WEBHOOK_TIMEOUT || 5000
};

if (process.env.NODE_ENV !== "test" && !config.SLACK_NOTIFICATION_WEBHOOK_URL) {
  throw new Error(
    "Please set the TALK_SLACK_NOTIFICATION_WEBHOOK_URL environment variable to use the slack-notifications plugin."
  );
}

module.exports = config;
