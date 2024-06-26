const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
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
  }

  input NewUserInput {
    username: String!
    password: String!
    email: String!
  }

type Mutation {
    addUser(userData: NewUserInput!): User
    removeUser(userId: ID!): User
  }
`;

module.exports = typeDefs;
