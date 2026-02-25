export interface Question {
  question: string;
  options: string[];
  correct: number;
}

const defaultQuiz1: Question[] = [
  { question: "I Know Apko Sab Pta Hai Tab Be Mai Kuch Puch Leta Hu ???  May I", options: ["Start Karu", "Ha Ha Karo Start", "Nhi Pta Mujhe", "Answer 1 & 2 Mai Se Hai"], correct: 2 },
  { question: "Mera Fav Food Kya hai ???", options: ["Tikki", "Dal Roti", "Chole Bhature", "Momos"], correct: 2 },
  { question: "What I Like The Most", options: ["Isha", "Ishi", "Isha Prakash", "Mohan Ji Li Ladki"], correct: 1 },
  { question: "Kya Apko Pranshu Pareshan Karta Hai ???", options: ["Mujhe To Nhi Lgta", "Never Kabhi Nhi", "Kabhi Kabhi", "Pranshu Or Pareshan"], correct: 1 },
  { question: "One Chhez Jo Apko Pranshu Mai Achi Lagti Hai ??", options: ["Everything", "Pranshu Ka Pyar", "Apka Gussa Karna", "Kuch Nhi"], correct: 1 },
  { question: "How Many Mole ????", options: ["3", "5", "4", "2"], correct: 2 },
  { question: "We You Leave Pranshu ???", options: ["Haaaa", "ofc", "Abhi Bus Tym Pass Hai", "Yes Sure"], correct: 2 },
  { question: "Mera Fav Colour Kya hai ???", options: ["Kala", "Black", "Z-Black", "Yadav Ji Ki Bhainsiyaaa"], correct: 0 },
  { question: "What do couples exchange on Valentine's Day?", options: ["Books", "Gifts & chocolates", "Tools", "Tickets"], correct: 1 },
  { question: "Love is patient, love is... ?", options: ["Fast", "Kind", "Loud", "Shy"], correct: 1 },
];

const defaultQuiz2: Question[] = [
  { question: "Does I Cook Bdiya (Like Master Chef)?", options: ["Ha Babu", "Yes Gugu", "Hanji ", "Ha Kabhi Kabhi"], correct: 1 },
  { question: "Which Think Make You More Anger ???", options: ["Jab Mai Galti Karta Hu", "Mai To Bus Aise hi Ho Jati Hu", "Haar Cheez Per", "I hate You"], correct: 1 },
  { question: "Aap Kitna Pyar Karte Ho ????", options: ["Bahut Zyda", "Bilkul Be Nhi ", "Zero", "U Cant Imagine"], correct: 1 },
  { question: "Kya Karu Mai Btao ???", options: ["Kuch Mat Karo Aap", "Pyar Karo Bus Pyar", "Babu Bus, I love U", "I Don't Know"], correct: 2 },
  { question: "How Many Mintues Can You Stay Away From Me?", options: ["Full Day", "Zero", "Full Time No Limit", "10.00"], correct: 2 },
  { question: "What Is My Gher Ka Naam ???", options: ["Sunny",  "Hunny","Munny", "Bunny"], correct: 1 },
  { question: "What's the most romantic meal????", options: ["Breakfast", "Lunch", "Dinner", "Brunch"], correct: 0 },
  { question: "Which bird mates for life?", options: ["Crow", "Penguin", "Sparrow", "Eagle"], correct: 1 },
  { question: "When Do I Pay Attention ???", options: ["Every Time", "Kab Kuch Aise Waise Bt Ho", "Never", "When I See You"], correct: 3 },
  { question: "Love is all you...?", options: ["Want", "Need", "Have", "Give"], correct: 1 },
];

const defaultQuiz3: Question[] = [
  { question: "What's the sweetest thing to say?", options: ["Gugu", "bubu", "RAJU", "Kuch Nhi"], correct: 0 },
  { question: "Best place for a date??? You Know Mai Kya Puch Rha Hu", options: ["Library", "Beach sunset", "Gym", "Office"], correct: 3 },
  { question: "What Last 4 Digit Of Your Aadhaar Card?", options: ["3199", "3991", "9391", "9913"], correct: 0 },
  { question: "Kya Hai Apke Pass Mera ???", options: ["Ring", "Necklace", "Bracelet", "Watch"], correct: 2 },
  { question: "Ek Agreement Send Kiya Tha apne Date Kya Hai??", options: ["07 ", "08", "09", "10"], correct: 1 },
  { question: "What Is My song era?", options: ["60s", "80s", "90s", "2000s"], correct: 3 },
  { question: "love is...?", options: ["Easy", "Slow And Bdiya", "Fast", "Loud"], correct: 2 },
  { question: "Need To Select One ???", options: ["Oreo", "Momos", "Raju", "Pranshu I Know Mai Nhi Hu Tabhi Last Option Hu"], correct: 2 },
  { question: "Love at first...?", options: ["Word", "Touch", "Sight", "Song"], correct: 1 },
  { question: "What heals all wounds?", options: ["Medicine", "Time", "Love", "Sleep"], correct: 2 },
];

// Quiz data is stored only in code - no localStorage persistence
export function getQuizQuestions(quizNumber: 1 | 2 | 3): Question[] {
  return quizNumber === 1 ? defaultQuiz1 : quizNumber === 2 ? defaultQuiz2 : defaultQuiz3;
}

export function saveQuizQuestions(quizNumber: 1 | 2 | 3, questions: Question[]) {
  // Data is only stored in memory during app runtime
  // No persistence needed
}

export function getAllDefaults() {
  return { quiz1: defaultQuiz1, quiz2: defaultQuiz2, quiz3: defaultQuiz3 };
}
