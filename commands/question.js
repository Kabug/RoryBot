const { SlashCommandBuilder } = require("discord.js");
const ai = require("../setup/openai.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("q")
		.setDescription("Asky Rorybot a question")
		.addStringOption(option =>
			option
				.setName("question")
				.setDescription("What do you want to ask?")
				.setRequired(true)),

	async execute(interaction) {
		const question = interaction.options.getString("question").endsWith("?") ? interaction.options.getString("question") : interaction.options.getString("question") + "?" ;
		const response = await ai.openai.createCompletion({
			model: "text-davinci-003",
			prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\n${question}`,
			temperature: 0.5,
			max_tokens: 60,
			top_p: 0.3,
			frequency_penalty: 0.5,
			presence_penalty: 0,
		});

		const reply = response.data.choices[0].text.replace("Marv:", "");
		await interaction.reply(
			`You: ${question} ${reply}`);
	},
};