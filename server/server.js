const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware, verifyJWT } = require("./utils/auth");
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  app.use(cors());

  app.post("/api/generateWorkoutPlan", verifyJWT, async (req, res) => { // Make the callback async
    const { age, activityLevel, workoutType } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  
    async function generateAIresponse(prompt) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text(); // Ensure text() is awaited
        console.log(text);
        return text;
      } catch (error) {
        console.error("Error generating AI response:", error);
        return null; // Return null or a default message in case of error
      }
    }
  
    try {
      const workoutPlan = await generateAIresponse(`Create a ${workoutType} workout plan for the week for a ${age} year old user in ${activityLevel}.`);
      if (workoutPlan) {
        res.json({ workoutPlan });
      } else {
        res.status(500).json({ error: "Failed to generate workout plan" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
