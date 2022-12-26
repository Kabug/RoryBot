const { Configuration, OpenAIApi } = require("openai");

// Open AI
const openAIConfiguration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openAIConfiguration);
  
exports.openai = openai;