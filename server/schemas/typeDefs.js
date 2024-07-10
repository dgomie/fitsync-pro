const typeDefs = `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    age: Int
    weight: Int
    activityLevel: String
    nutrition: Nutrition
    workouts: [Workout]
  }

  type Nutrition {
    dailyCalories: Int
    macros: Macros  
  }

  type Macros {
    protein: Int
    carbs: Int
    fat: Int
  }

  type Exercise {
  name: String!
  sets: Int!
  reps: Int!
  weight: Int
}

type Workout {
  _id: ID!
  userId: ID!
  exercises: [Exercise!]!
  duration: Int!
  caloriesBurned: Int!
  createdAt: String!
  updatedAt: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    aiPlans(userId: ID!): [AIplan]
  }

  input NewUserInput {
    username: String!
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    dateOfBirth: String!
    activityLevel: String!
  }

  input UpdateUserInput {
  username: String
  firstName: String
  lastName: String
  email: String
  dateOfBirth: String
  weight: Int
  activityLevel: String
}

type AIplan {
  id: ID!
  userId: ID!
  plan: String!
  createdAt: String!
  updatedAt: String!
}

type Auth {
    token: ID!
    user: User
  }

type Mutation {
    addUser(userData: NewUserInput!): Auth
    login(username: String!, password: String!): Auth
    removeUser(userId: ID!): User
    updateUser(userId: ID!, updateData: UpdateUserInput!): User
    createAIplan(userId: ID!, plan: String!): AIplan
    deleteAIplan(id: ID!): String
  }
`;

module.exports = typeDefs;
