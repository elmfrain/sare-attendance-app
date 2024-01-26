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