const typeDefs = `
  type Meeting {
    _id: ID!,
    title: String!
    at: String
    date: String!
    type: String!
    fromTime: String!
    toTime: String!
    teams: [String]!
    execsAttended: Int!
    membersAttended: Int!
    numExecs: Int!
  }

  type EmergencyContact {
    _id: ID!
    name: String!
    relationship: String
    phone: String!
  }

  type Member {
    _id: ID!
    firstName: String!
    lastName: String!
    joinDate: String!
    sareID: Int!
    email: String!
    phone: String
    rank: String!
    role: String
    emergencyContact: EmergencyContact
  }

  type Attendance {
    _id: ID!
    member: Member!
    meeting: Meeting!
    joinTime: String!
    leaveTime: String
  }

  type Admin {
    _id: ID!
    username: String!
    password: String!
    sareID: Int
    member: Member
  }

  type Auth {
    token: ID!
    admin: Admin!
  }

  type Query {
    memberBySareID(sareID: Int!): Member
    memberByEmail(email: String!): Member
    members: [Member]

    meetings: [Meeting]
    latestMeeting: Meeting

    attendances(meeting: ID!): [Attendance]
  }

  type Mutation {
    loginAdmin(username: String!, password: String!): Auth

    createMeeting(date: String!, type: String!, fromTime: String!, toTime: String!, title: String, at: String, teams: [String]): Meeting

    createMember(firstName: String!, lastName: String!, sareID: Int!, email: String!, rank: String!, joinDate: String, phone: String, role: String, emergencyContact: ID): Member

    createEmergencyContact(name: String!, phone: String!, relationship: String): EmergencyContact

    attend(meeting: ID!, sareID: Int!): Attendance
  }
`;

module.exports = typeDefs;