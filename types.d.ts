export type { Media, Meaning, PhraseDetails, PhraseType };

declare global {
  enum PhraseType {
    PhrasalVerb,
    Idiom,
    Phrase
  }
  type Media = {
    url: string,
    publicId?: string,
    type: string
  }
  type Meaning = {
    name: string,
    examples?: string[]
    media?: Media []
  }
  type PhraseDetails = {
    id?: number,
    name: string,
    type?: PhraseType,
    origin?: string,
    extraDetails?: [string, string[]][],
    meanings: Meaning[]
  }
}