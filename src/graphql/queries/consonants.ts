import { graphql } from "../generated";

export const ConsonantsQuery = graphql(`
  query Consonants {
    consonants {
      id
      character
      class
      initialRomanization
      finalSound
      sampleWord
      sampleRomanization
      sampleTranslation
      obsolete
    }
  }
`);
