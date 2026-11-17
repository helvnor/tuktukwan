import { graphql } from "../generated";

export const DisconnectOAuthMutation = graphql(`
  mutation DisconnectOAuth($provider: String!) {
    disconnectOAuth(provider: $provider) {
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
