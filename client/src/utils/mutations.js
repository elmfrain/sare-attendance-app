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

export const CREATE_MEMBER = gql`
  mutation CreateMember($firstName: String!, $sareID: Int!, $email: String!, $rank: String!, $lastName: String!, $joinDate: String, $phone: String, $role: String, $emergencyContact: ID) {
    createMember(firstName: $firstName, sareID: $sareID, email: $email, rank: $rank, lastName: $lastName, joinDate: $joinDate, phone: $phone, role: $role, emergencyContact: $emergencyContact) {
      _id
      firstName
      lastName
      joinDate
      sareID
      email
      phone
      rank
      role
      emergencyContact {
        _id
        name
        relationship
        phone
      }
    }
  }
`;

export const CREATE_EMERGENCY_CONTACT = gql`
  mutation CreateEmergencyContact($name: String!, $phone: String!, $relationship: String) {
    createEmergencyContact(name: $name, phone: $phone, relationship: $relationship) {
      _id
      name
      phone
      relationship
    }
  }
`