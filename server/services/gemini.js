// require('dotenv').config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// async function generateAIresponse(prompt) {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// const test = "Create a workout plan for the week for a 30 year old user in moderate shape to increase strength by 2%. They can currenly do 50 pushups and 100 squats.";
// generateAIresponse(test);

// export default generateAIresponse