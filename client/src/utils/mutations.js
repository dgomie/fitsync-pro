import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
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
  mutation addUser($username: String!, $email: String!, $password: String!, $dateOfBirth!, $activityLevel!) {
    addUser(username: $username, email: $email, password: $password, dateOfBirth: $dateOfBirth, activityLevel: $activityLevel) {
      token
      user {
        _id
        username
      }
    }
  }
`;

