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

export const CREATE_MEETING = gql`
  mutation CreateMeeting($date: String!, $type: String!, $fromTime: String!, $toTime: String!, $at: String, $title: String, $teams: [String]) {
    createMeeting(date: $date, type: $type, fromTime: $fromTime, toTime: $toTime, at: $at, title: $title, teams: $teams) {
      title
      type
      toTime
      teams
      fromTime
      date
      at
    }
  }
`;