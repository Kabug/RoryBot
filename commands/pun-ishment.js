const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("rq")
		.setDescription("Replies with a patented RORY QUOTE TM"),
	async execute(interaction) {
		const data = fs.readFileSync("./assets/quotes.txt");
		if (data) {
			const splitData = data.toString("utf8").split("\n");
			const line = splitData.splice(
				Math.floor(Math.random() * splitData.length),
				1
			)[0];
			await interaction.reply(line);
		} else {
			await interaction.reply("I'm... speachless!");
		}
	},
};
