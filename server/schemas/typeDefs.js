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
    profilePicture: String
    durationGoal: Int,
    workoutGoal: Int,
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
  workoutTitle: String!
  dateOfWorkout: String!
  duration: Int
  caloriesBurned: Int
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
    workouts(userId: ID!): [Workout!]!
  }

  input NewUserInput {
    username: String!
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    dateOfBirth: String!
    activityLevel: String!
    durationGoal: Int
    workoutGoal: Int
  }

  input UpdateUserInput {
  username: String
  firstName: String
  lastName: String
  email: String
  dateOfBirth: String
  weight: Int
  activityLevel: String
  profilePicture: String
  durationGoal: Int
  workoutGoal: Int
}

input ExerciseInput {
  name: String!
  sets: Int!
  reps: Int!
  weight: Int
}

input CreateWorkoutInput {
  userId: ID!
  workoutTitle: String!
  dateOfWorkout: String!
  duration: Int
  caloriesBurned: Int
}

input UpdateWorkoutInput {
  userId: ID
  workoutTitle: String
  dateOfWorkout: String
  duration: Int
  caloriesBurned: Int
}


type AIplan {
  _id: ID!
  userId: ID!
  title: String!
  plan: String!
  createdAt: String!
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
    createAIplan(userId: ID!, plan: String!, title: String!): AIplan
    deleteAIplan(id: ID!): ID!
    createWorkout(input: CreateWorkoutInput!): Workout
    deleteWorkout(id: ID!): ID!
    updateWorkout(id: ID!, input: UpdateWorkoutInput!): Workout
  }
`;

module.exports = typeDefs;
