const { Hercai } = require("hercai");
const herc = new Hercai();

module.exports = {
  config: {
    name: "ai",
    description: "Interact with an AI",
    usage: "ai <your question>",
    author: "Rui",
    aliases: ["chatbot", "talk"],
  },
  onRun: async ({ api, event, args, fonts }) => {
    const question = args.join(" ");

    if (!question) {
      api.sendMessage(
        "❌ | Please provide a question for the AI.",
        event.threadID,
        event.messageID,
      );
      return;
    }

    try {
      const response = await herc.question({ model: "v3", content: question });
      const formattedHeader = fonts.applyFonts(
        "🤖 AI\n━━━━━━━━━━━━━━━",
        "bold",
      );
      const formattedReply = fonts.applyFonts(response.reply, "sans");
      const modifiedReply = `${formattedReply}\n\n𝒕𝒉𝒊𝒔 𝒃𝒐𝒕 𝒘𝒂𝒔 𝒄𝒓𝒆𝒂𝒕𝒆𝒅 𝒃𝒚 𝒄𝒉𝒖𝒓𝒄𝒉𝒊𝒍𝒍\n𝑭𝒃 𝒍𝒊𝒏𝒌 𝒇𝒐𝒍𝒍𝒐𝒘 𝒎𝒐 𝒏𝒂𝒓𝒊𝒏: https://www.facebook.com/Churchill.Dev4100`;
      api.sendMessage(
        `${formattedHeader}\n${modifiedReply}`,
        event.threadID,
        event.messageID,
      );
    } catch (error) {
      console.error(`❌ | Error occurred while interacting with AI: ${error}`);
      api.sendMessage(
        "❌ | An error occurred while processing your request.",
        event.threadID,
        event.messageID,
      );
    }
  },
};
