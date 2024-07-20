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
const bodyParser = require('body-parser');

const User = require('./models/User');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({ limit: '50mb' }));

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

  app.post("/api/generateWorkoutPlan", verifyJWT, async (req, res) => { 
    const { age, activityLevel, workoutType, location, week, bodyPart } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  
    async function generateAIresponse(prompt) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text(); 
        return text;
      } catch (error) {
        console.error("Error generating AI response:", error);
        return null; 
      }
    }
  
    try {
      const workoutPlan = await generateAIresponse(`Create a ${week} week ${location} ${workoutType} workout plan with detailed exercises focusing on ${bodyPart}. Include estimated calories burned for each workout. The user is ${age} and is at a ${activityLevel} exercise level.`);
      if (workoutPlan) {
        res.json({ workoutPlan });
      } else {
        res.status(500).json({ error: "Failed to generate workout plan" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post('/upload', async(req, res) => {
    const { avatarUrl, userId } = req.body; 

    try{
      const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture: avatarUrl }, { new: true });
      if (!updatedUser) {
        return res.status(404).send({ message: 'User not found' });
      }

      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(500).send({ message: 'Error updating user profile picture', error: error.message });
    }
  });

  app.get('/profileImage/:id', async (req, res) => {
    const { id } = req.params; // id is now the avatarUrl passed in the URL
  
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }
  
      res.status(200).json({ status: 'ok', data: user });
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ status: 'error', message: err.message });
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
