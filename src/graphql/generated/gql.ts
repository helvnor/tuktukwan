/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation DisconnectOAuth($provider: String!) {\n    disconnectOAuth(provider: $provider) {\n      id\n      username\n      displayName\n      email\n      createdAt\n      avatarUrl\n      linkedProviders {\n        provider\n        name\n        email\n        picture\n        linkedAt\n      }\n    }\n  }\n": typeof types.DisconnectOAuthDocument,
    "\n  query Consonants {\n    consonants {\n      id\n      character\n      class\n      initialRomanization\n      finalSound\n      sampleWord\n      sampleRomanization\n      sampleTranslation\n      obsolete\n    }\n  }\n": typeof types.ConsonantsDocument,
    "\n  query Me {\n    me {\n      id\n      username\n      displayName\n      email\n      createdAt\n      avatarUrl\n      linkedProviders {\n        provider\n        name\n        email\n        picture\n        linkedAt\n      }\n    }\n  }\n": typeof types.MeDocument,
};
const documents: Documents = {
    "\n  mutation DisconnectOAuth($provider: String!) {\n    disconnectOAuth(provider: $provider) {\n      id\n      username\n      displayName\n      email\n      createdAt\n      avatarUrl\n      linkedProviders {\n        provider\n        name\n        email\n        picture\n        linkedAt\n      }\n    }\n  }\n": types.DisconnectOAuthDocument,
    "\n  query Consonants {\n    consonants {\n      id\n      character\n      class\n      initialRomanization\n      finalSound\n      sampleWord\n      sampleRomanization\n      sampleTranslation\n      obsolete\n    }\n  }\n": types.ConsonantsDocument,
    "\n  query Me {\n    me {\n      id\n      username\n      displayName\n      email\n      createdAt\n      avatarUrl\n      linkedProviders {\n        provider\n        name\n        email\n        picture\n        linkedAt\n      }\n    }\n  }\n": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DisconnectOAuth($provider: String!) {\n    disconnectOAuth(provider: $provider) {\n      id\n      username\n      displayName\n      email\n      createdAt\n      avatarUrl\n      linkedProviders {\n        provider\n        name\n        email\n        picture\n        linkedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DisconnectOAuth($provider: String!) {\n    disconnectOAuth(provider: $provider) {\n      id\n      username\n      displayName\n      email\n      createdAt\n      avatarUrl\n      linkedProviders {\n        provider\n        name\n        email\n        picture\n        linkedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Consonants {\n    consonants {\n      id\n      character\n      class\n      initialRomanization\n      finalSound\n      sampleWord\n      sampleRomanization\n      sampleTranslation\n      obsolete\n    }\n  }\n"): (typeof documents)["\n  query Consonants {\n    consonants {\n      id\n      character\n      class\n      initialRomanization\n      finalSound\n      sampleWord\n      sampleRomanization\n      sampleTranslation\n      obsolete\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      username\n      displayName\n      email\n      createdAt\n      avatarUrl\n      linkedProviders {\n        provider\n        name\n        email\n        picture\n        linkedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      username\n      displayName\n      email\n      createdAt\n      avatarUrl\n      linkedProviders {\n        provider\n        name\n        email\n        picture\n        linkedAt\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;