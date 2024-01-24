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
  }

  type EmergencyContact {
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
    _dummy: String
  }

  type Mutation {
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;