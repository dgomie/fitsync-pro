import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($userData: NewUserInput!) {
    addUser(userData: $userData) {
      token
      user {
        _id
        username
        __typename
      }
      __typename
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      _id
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $updateData: UpdateUserInput!) {
    updateUser(userId: $userId, updateData: $updateData) {
      _id
      username
    }
  }
`;

export const CREATE_AI_PLAN = gql`
  mutation createAIplan($userId: ID!, $title: String!, $plan: String!) {
    createAIplan(userId: $userId, title: $title, plan: $plan) {
      _id
      userId
      title
      plan
      createdAt
    }
  }
`;

export const DELETE_AI_PLAN = gql`
  mutation deleteAIplan($id: ID!) {
    deleteAIplan(id: $id)
  }
`;

export const CREATE_WORKOUT = gql`
  mutation createWorkout($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
      _id
      workoutTitle
      dateOfWorkout
      duration
      caloriesBurned
    }
  }
`;

export const DELETE_WORKOUT = gql`
  mutation deleteWorkout($id: ID!) {
    deleteWorkout(id: $id)
  }
`;

export const UPDATE_WORKOUT = gql`
  mutation updateWorkout($id: ID!, $input: UpdateWorkoutInput!) {
    updateWorkout(id: $id, input: $input) {
      _id
      userId
      workoutTitle
      dateOfWorkout
      duration
      caloriesBurned
    }
  }
`;