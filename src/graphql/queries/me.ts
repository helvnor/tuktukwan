import { graphql } from "../generated";

export const MeQuery = graphql(`
  query Me {
    me {
      id
      username
      displayName
      email
      createdAt
      avatarUrl
      linkedProviders {
        provider
        name
        email
        picture
        linkedAt
      }
    }
  }
`);
