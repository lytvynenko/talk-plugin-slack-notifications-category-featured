const { get } = require("lodash");
const path = require("path");
const sendMessageToSlack = require("./sendToSlack");
const handle = async (ctx, { comment }) => {
  const {
    connectors: {
      services: {
        Assets,
        Users,
        I18n: { t }
      }
    }
  } = ctx;

  // Check to see if this is a reply to an existing comment.
  const commentID = get(comment, "id", null);
  if (commentID === null) {
    ctx.log.info("could not get comment id");
    return;
  }
  const asset = await Assets.findById(comment.asset_id);
  const user = await Users.findById(comment.author_id);
  const message = {
    text: t(
      `talk-plugin-slack-notifications.categories.featured.text`,
      asset.title,
      comment.body
    ),
    footer: t(
      `talk-plugin-slack-notifications.categories.featured.footer`,
      user.username
    ),
    ts: Math.floor(new Date(comment.created_at).getTime() / 1000)
  };
  const result = await sendMessageToSlack(message);
};

const handler = {
  handle,
  category: "featured",
  event: "commentFeatured",
  digestOrder: 10
};

module.exports = {
  translations: path.join(__dirname, "translations.yml"),
  notifications: [handler]
};
