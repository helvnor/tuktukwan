/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
};

export type Consonant = {
  __typename?: 'Consonant';
  character: Scalars['String']['output'];
  class: ConsonantClass;
  /** The sound the consonant makes at the end of a syllable; null when it never ends one. */
  finalSound?: Maybe<Scalars['String']['output']>;
  /** The consonant's place in the Thai alphabet, from 1 (ก) to 44 (ฮ). */
  id: Scalars['ID']['output'];
  /** Paiboon romanization of the sound at the start of a syllable; null for อ, which is silent there. */
  initialRomanization?: Maybe<Scalars['String']['output']>;
  /** No longer used in modern Thai (ฃ and ฅ). */
  obsolete: Scalars['Boolean']['output'];
  sampleRomanization: Scalars['String']['output'];
  sampleTranslation: Scalars['String']['output'];
  /** The word the consonant is named after, as in ก ไก่ (gɔɔ gài, chicken). */
  sampleWord: Scalars['String']['output'];
};

/** The tone class a consonant belongs to, which together with the vowel and tone mark decides a syllable's tone. */
export type ConsonantClass =
  | 'HIGH'
  | 'LOW_PAIRED'
  | 'LOW_UNPAIRED'
  | 'MID';

export type LinkedProvider = {
  __typename?: 'LinkedProvider';
  email?: Maybe<Scalars['String']['output']>;
  linkedAt: Scalars['Time']['output'];
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Unlinks a provider from the signed-in user. Fails with auth.cannotRemoveLastLoginMethod when it is the only one, since providers are the only way to sign in. */
  disconnectOAuth: User;
};


export type MutationDisconnectOAuthArgs = {
  provider: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** All 44 consonants in alphabet order. */
  consonants: Array<Consonant>;
  me: User;
};

export type User = {
  __typename?: 'User';
  /** The picture of the earliest linked provider that has one; null when none do, and the client draws a placeholder. */
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Time']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Every provider the user can sign in with, oldest first. Never empty: signup links the first and disconnectOAuth refuses to remove the last. */
  linkedProviders: Array<LinkedProvider>;
  username: Scalars['String']['output'];
};

export type DisconnectOAuthMutationVariables = Exact<{
  provider: Scalars['String']['input'];
}>;


export type DisconnectOAuthMutation = { __typename?: 'Mutation', disconnectOAuth: { __typename?: 'User', id: string, username: string, displayName: string, email: string, createdAt: any, avatarUrl?: string | null, linkedProviders: Array<{ __typename?: 'LinkedProvider', provider: string, name?: string | null, email?: string | null, picture?: string | null, linkedAt: any }> } };

export type ConsonantsQueryVariables = Exact<{ [key: string]: never; }>;


export type ConsonantsQuery = { __typename?: 'Query', consonants: Array<{ __typename?: 'Consonant', id: string, character: string, class: ConsonantClass, initialRomanization?: string | null, finalSound?: string | null, sampleWord: string, sampleRomanization: string, sampleTranslation: string, obsolete: boolean }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, displayName: string, email: string, createdAt: any, avatarUrl?: string | null, linkedProviders: Array<{ __typename?: 'LinkedProvider', provider: string, name?: string | null, email?: string | null, picture?: string | null, linkedAt: any }> } };


export const DisconnectOAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisconnectOAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"provider"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disconnectOAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"provider"},"value":{"kind":"Variable","name":{"kind":"Name","value":"provider"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"linkedProviders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"linkedAt"}}]}}]}}]}}]} as unknown as DocumentNode<DisconnectOAuthMutation, DisconnectOAuthMutationVariables>;
export const ConsonantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Consonants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"consonants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"character"}},{"kind":"Field","name":{"kind":"Name","value":"class"}},{"kind":"Field","name":{"kind":"Name","value":"initialRomanization"}},{"kind":"Field","name":{"kind":"Name","value":"finalSound"}},{"kind":"Field","name":{"kind":"Name","value":"sampleWord"}},{"kind":"Field","name":{"kind":"Name","value":"sampleRomanization"}},{"kind":"Field","name":{"kind":"Name","value":"sampleTranslation"}},{"kind":"Field","name":{"kind":"Name","value":"obsolete"}}]}}]}}]} as unknown as DocumentNode<ConsonantsQuery, ConsonantsQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"linkedProviders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"linkedAt"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;