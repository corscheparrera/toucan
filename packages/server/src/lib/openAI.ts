const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const schema = {
  "type": "object",
  "properties": {
    "ingredients": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "unit": { 
            "type": "string",
            "enum": ["grams", "ml", "cups", "pieces", "teaspoons"]
          },
          "amount": { "type": "number" }
        },
        "required": ["name", "unit", "amount"]
      }
    },
    "instructions": {
      "type": "array",
      "description": "Steps to prepare the recipe (no numbering)",
      "items": { "type": "string" }
    },
    "time_to_cook": {
      "type": "number",
      "description": "Total time to prepare the recipe in minutes"
    }
  },
  "required": ["ingredients", "instructions", "time_to_cook"]
}
const openai = new OpenAIApi(configuration);
export const processText = async () => {
  console.log('api key', process.env.OPENAI_API_KEY )
  return
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Provide a recipe for spaghetti bolognese"}
      ],
      functions: [{"name": "set_recipe", "parameters": schema}],
      function_call: {"name": "set_recipe"},
      temperature: 0,
    });
    console.log(chatCompletion.data.choices[0].message.function_call.arguments);
  } catch (error) {
    console.log('error',error)
  }

}