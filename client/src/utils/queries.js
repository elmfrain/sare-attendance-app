import { gql } from "@apollo/client";

export const IS_SAREID_TAKEN = gql`
  query IsSareIDTaken($sareID: Int!) {
    memberBySareID(sareID: $sareID) {
      sareID
    }
  }
`;

export const IS_EMAIL_TAKEN = gql`
  query IsEmailTaken($email: String!) {
    memberByEmail(email: $email) {
      email
    }
  }
`;

export const LIST_MEMBERS = gql`
query Members {
  members {
    firstName
    lastName
    rank
    sareID
    joinDate
  }
}
`;

export const LIST_MEETINGS = gql`
  query Query {
    meetings {
      _id
      title
      at
      type
      teams
      date
      fromTime
      toTime
      execsAttended
      numExecs
      membersAttended
    }
  }
`;

export const GET_LATEST_MEETING = gql`
  query Query {
    latestMeeting {
      _id
      title
      at
      type
      teams
      date
      fromTime
      toTime
      execsAttended
      numExecs
      membersAttended
    }
  }
`;

export const GET_ATTENDANCES = gql`
  query Query($meeting: ID!) {
    attendances(meeting: $meeting) {
      joinTime
      leaveTime
      member {
        firstName
        lastName
        sareID
        rank
      }
      _id
    }
  }
`;