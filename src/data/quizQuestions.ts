export interface QuizOption {
  text: string;
  archetype: string;
}

export interface QuizQuestion {
  question_number: number;
  question_text: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question_number: 1,
    question_text: "Моё главное качество:",
    options: [
      { text: "🧠 Уверенность и воля", archetype: "emperor" },
      { text: "💓 Искренность и забота", archetype: "empress" },
      { text: "🔮 Интуиция и чувствительность", archetype: "priestess" },
      { text: "💡 Креативность и новизна", archetype: "magician" }
    ]
  },
  {
    question_number: 2,
    question_text: "Когда мне сложно, я…",
    options: [
      { text: "⚔️ Собираю всю силу и иду вперёд", archetype: "emperor" },
      { text: "🪞 Отступаю, чтобы услышать себя", archetype: "priestess" },
      { text: "🛟 Обращаюсь к близким", archetype: "empress" },
      { text: "🧩 Ищу в этом смысл", archetype: "death" }
    ]
  },
  {
    question_number: 3,
    question_text: "Я скорее про…",
    options: [
      { text: "🎯 Цель и движение", archetype: "emperor" },
      { text: "🌊 Глубину чувств", archetype: "priestess" },
      { text: "🌿 Заботу и стабильность", archetype: "empress" },
      { text: "🌀 Поиск нового", archetype: "fool" }
    ]
  },
  {
    question_number: 4,
    question_text: "Моё состояние силы:",
    options: [
      { text: "🔥 Добиваюсь своего", archetype: "emperor" },
      { text: "🌬 В потоке интуиции", archetype: "priestess" },
      { text: "🌱 В гармонии", archetype: "lovers" },
      { text: "🌌 Рост через кризисы", archetype: "death" }
    ]
  },
  {
    question_number: 5,
    question_text: "Что я часто даю другим:",
    options: [
      { text: "🪄 Вдохновение", archetype: "magician" },
      { text: "🫂 Поддержку", archetype: "empress" },
      { text: "🧘 Советы и структуру", archetype: "hermit" },
      { text: "🎭 Эмоции и глубину", archetype: "death" }
    ]
  },
  {
    question_number: 6,
    question_text: "Какой путь ближе мне?",
    options: [
      { text: "🛡 Управлять и строить", archetype: "emperor" },
      { text: "🌙 Изучать себя", archetype: "priestess" },
      { text: "💞 Быть рядом с другими", archetype: "empress" },
      { text: "🌀 Преображать и рушить", archetype: "death" }
    ]
  },
  {
    question_number: 7,
    question_text: "Моё внутреннее состояние — это…",
    options: [
      { text: "🔥 Пламя", archetype: "emperor" },
      { text: "🌊 Озеро", archetype: "priestess" },
      { text: "🌿 Сад", archetype: "empress" },
      { text: "🌪 Вихрь", archetype: "fool" }
    ]
  },
  {
    question_number: 8,
    question_text: "Как я принимаю решения:",
    options: [
      { text: "📐 Планирую и просчитываю", archetype: "emperor" },
      { text: "🎧 Прислушиваюсь к себе", archetype: "priestess" },
      { text: "💞 Советуюсь", archetype: "empress" },
      { text: "🌀 Через опыт", archetype: "magician" }
    ]
  },
  {
    question_number: 9,
    question_text: "Какую энергию я излучаю:",
    options: [
      { text: "💥 Движение и волю", archetype: "emperor" },
      { text: "🌊 Принятие", archetype: "priestess" },
      { text: "🌸 Заботу", archetype: "empress" },
      { text: "✨ Преобразование", archetype: "magician" }
    ]
  },
  {
    question_number: 10,
    question_text: "Если бы я был(-а) картой Таро, то…",
    options: [
      { text: "👑 Императрица — любовь и ресурс", archetype: "empress" },
      { text: "🧙 Маг — фокус и действие", archetype: "magician" },
      { text: "🌫 Жрица — чувствительность и интуиция", archetype: "priestess" },
      { text: "⚖️ Справедливость — логика и баланс", archetype: "emperor" }
    ]
  }
];
