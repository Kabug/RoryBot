const { SlashCommandBuilder } = require("discord.js");
const ai = require("../setup/openai.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pun")
		.setDescription("Tells you a pun")
		.addStringOption(option =>
			option
				.setName("topic")
				.setDescription("topic for a pun")
				.setRequired(true)),
        
	async execute(interaction) {
		const topic = interaction.options.getString("topic");
		const response = await ai.openai.createCompletion({
			model: "text-davinci-003",
			prompt: `Tell me a pun about ${topic}`,
			temperature: 0.5,
			max_tokens: 60,
			top_p: 0.3,
			frequency_penalty: 0.5,
			presence_penalty: 0,
		});

		await interaction.reply(response.data.choices[0].text);
	},
};