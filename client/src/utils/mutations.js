import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
  mutation Login($username: String!, $password: String!) {
    loginAdmin(username: $username, password: $password) {
      token
      admin {
        username
        member {
          _id
        }
      }
    }
  }
`;