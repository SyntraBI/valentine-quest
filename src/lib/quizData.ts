export interface Question {
  question: string;
  options: string[];
  correct: number;
}

const defaultQuiz1: Question[] = [
  { question: "What flower is most associated with Valentine's Day?", options: ["Tulip", "Rose", "Lily", "Daisy"], correct: 1 },
  { question: "Which Greek god is associated with love?", options: ["Zeus", "Apollo", "Eros", "Hermes"], correct: 2 },
  { question: "What does a red heart emoji symbolize?", options: ["Friendship", "Deep love", "Sadness", "Anger"], correct: 1 },
  { question: "In which month is Valentine's Day celebrated?", options: ["January", "February", "March", "April"], correct: 1 },
  { question: "What animal is a symbol of love and peace?", options: ["Eagle", "Dove", "Swan", "Parrot"], correct: 1 },
  { question: "What shape is most associated with love?", options: ["Circle", "Star", "Heart", "Diamond"], correct: 2 },
  { question: "Which color symbolizes love and passion?", options: ["Blue", "Green", "Red", "Yellow"], correct: 2 },
  { question: "Who shoots arrows of love?", options: ["Cupid", "Santa", "Fairy", "Angel"], correct: 0 },
  { question: "What do couples exchange on Valentine's Day?", options: ["Books", "Gifts & chocolates", "Tools", "Tickets"], correct: 1 },
  { question: "Love is patient, love is... ?", options: ["Fast", "Kind", "Loud", "Shy"], correct: 1 },
];

const defaultQuiz2: Question[] = [
  { question: "What is the language of love?", options: ["English", "French", "Spanish", "Italian"], correct: 1 },
  { question: "Which gemstone represents love?", options: ["Diamond", "Ruby", "Sapphire", "Emerald"], correct: 1 },
  { question: "Who wrote Romeo and Juliet?", options: ["Dickens", "Shakespeare", "Austen", "Hemingway"], correct: 1 },
  { question: "What city is called the City of Love?", options: ["Rome", "Venice", "Paris", "Barcelona"], correct: 2 },
  { question: "What's a love potion number?", options: ["7", "8", "9", "10"], correct: 2 },
  { question: "Which planet symbolizes love?", options: ["Mars", "Venus", "Jupiter", "Mercury"], correct: 1 },
  { question: "What's the most romantic meal?", options: ["Breakfast", "Lunch", "Dinner", "Brunch"], correct: 2 },
  { question: "Which bird mates for life?", options: ["Crow", "Penguin", "Sparrow", "Eagle"], correct: 1 },
  { question: "What's the traditional first anniversary gift?", options: ["Gold", "Silver", "Paper", "Wood"], correct: 2 },
  { question: "Love is all you...?", options: ["Want", "Need", "Have", "Give"], correct: 1 },
];

const defaultQuiz3: Question[] = [
  { question: "What's the sweetest thing to say?", options: ["Hello", "Goodbye", "I love you", "Thanks"], correct: 2 },
  { question: "Best place for a date?", options: ["Library", "Beach sunset", "Gym", "Office"], correct: 1 },
  { question: "What makes a heart skip?", options: ["Coffee", "Love", "Exercise", "Fear"], correct: 1 },
  { question: "Symbol of eternal love?", options: ["Ring", "Necklace", "Bracelet", "Watch"], correct: 0 },
  { question: "What's the love hormone?", options: ["Adrenaline", "Dopamine", "Oxytocin", "Serotonin"], correct: 2 },
  { question: "Best love song era?", options: ["60s", "80s", "90s", "2000s"], correct: 1 },
  { question: "True love is...?", options: ["Easy", "Patient", "Fast", "Loud"], correct: 1 },
  { question: "Romantic movie classic?", options: ["Titanic", "Jaws", "Matrix", "Terminator"], correct: 0 },
  { question: "Love at first...?", options: ["Word", "Touch", "Sight", "Song"], correct: 2 },
  { question: "What heals all wounds?", options: ["Medicine", "Time", "Love", "Sleep"], correct: 2 },
];

const STORAGE_KEY = 'valentine_quiz_data';

export function getQuizQuestions(quizNumber: 1 | 2 | 3): Question[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (data[`quiz${quizNumber}`]) return data[`quiz${quizNumber}`];
    }
  } catch {}
  return quizNumber === 1 ? defaultQuiz1 : quizNumber === 2 ? defaultQuiz2 : defaultQuiz3;
}

export function saveQuizQuestions(quizNumber: 1 | 2 | 3, questions: Question[]) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : {};
    data[`quiz${quizNumber}`] = questions;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function getAllDefaults() {
  return { quiz1: defaultQuiz1, quiz2: defaultQuiz2, quiz3: defaultQuiz3 };
}
