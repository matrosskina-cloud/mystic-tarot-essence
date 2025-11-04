export interface ArchetypeData {
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

export const archetypeData: Record<string, ArchetypeData> = {
  "Влюблённые": {
    name: "Влюблённые",
    subtitle: "Связь, выбор и гармония",
    description: "Ты живёшь отношениями и связью с миром. Умеешь выбирать и находить баланс между разными частями себя. Сила — в объединении и принятии.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/lovers.jpg"
  },
  "Император": {
    name: "Император",
    subtitle: "Сила, структура и воля",
    description: "Ты строишь свой мир, опираясь на волю и уверенность. Умеешь организовывать и вести за собой. Сила — в чёткости, решительности и порядке.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/emperor.jpg"
  },
  "Императрица": {
    name: "Императрица",
    subtitle: "Любовь, забота и изобилие",
    description: "Ты создаёшь уют и поддержку вокруг себя. Умеешь дарить тепло и замечать красоту. Сила — в заботе, чувственности и способности взращивать.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/empress.jpg"
  },
  "Маг": {
    name: "Маг",
    subtitle: "Действие, креативность и фокус",
    description: "Ты умеешь воплощать задуманное в реальность. Используешь все свои ресурсы для достижения целей. Сила — в концентрации, творчестве и новизне.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/magician.jpg"
  },
  "Жрица": {
    name: "Жрица",
    subtitle: "Интуиция, тайны и глубина",
    description: "Ты живёшь в ритме внутреннего мира. Видишь больше, чем другие, и чувствуешь скрытые смыслы. Сила — в тишине, мудрости и доверии к себе.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/high_priestess.jpg"
  },
  "Шут": {
    name: "Шут",
    subtitle: "Игра, свобода и исследование",
    description: "Ты идёшь своим путём, не боясь быть собой. Видишь возможности там, где другие видят риск. Сила — в спонтанности, лёгкости и открытости новому.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/the_fool.jpg"
  },
  "Смерть": {
    name: "Смерть",
    subtitle: "Трансформация, отпускание и обновление",
    description: "Ты умеешь проходить через кризисы и выходить обновлённым. Не боишься перемен и готов отпускать старое. Сила — в трансформации и глубине.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/death.jpg"
  },
  "Отшельник": {
    name: "Отшельник",
    subtitle: "Внутренний поиск и мудрость",
    description: "Ты ищешь ответы внутри себя. Ценишь уединение и глубокое понимание. Сила — в самопознании, внутренней ясности и терпении.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/hermit.jpg"
  }
};
