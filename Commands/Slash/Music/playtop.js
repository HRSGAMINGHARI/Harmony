const { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "playtop",
  description: `play top songs by Name/Link`,
  userPermissions: ["Connect"],
  botPermissions: ["Connect"],
  category: "Music",
  cooldown: 5,
  type: ApplicationCommandOptionType.ChatInput,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: false,
  djOnly: false,
  options: [
    {
      name: "song",
      description: `song Name/Link`,
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  /**
   *
   * @param {JUGNU} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, interaction, args, queue) => {
    // Code
    let song = interaction.options.getString("song");
    let { channel } = interaction.member.voice;
    client.distube.play(channel, song, {
      member: interaction.member,
      textChannel: interaction.channel,
      unshift: true,
    });
    interaction.followUp({
      content: `Searching \`${song}\``,
      ephemeral: true,
    });
  },
};
