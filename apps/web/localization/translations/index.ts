import phrasesEn from "./phrases/phrases-en.json";
import sentencesEn from "./sentences/sentences-en.json";
import singleWordsEn from "./single-words/single-words-en.json";
export * from "./phrases";
export * from "./sentences";
export * from "./single-words";

export default {
  en: {
    translation: {
      ...phrasesEn,
      ...singleWordsEn,
      ...sentencesEn,
    },
  },
};
