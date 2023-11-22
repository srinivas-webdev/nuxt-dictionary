export type { Media, Meaning, PhraseDetails };

declare global {
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
    name: string,
    meanings: Meaning[]
  }
}