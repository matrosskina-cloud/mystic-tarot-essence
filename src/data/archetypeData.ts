export interface ArchetypeData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

export const archetypeData: Record<string, ArchetypeData> = {
  "lovers": {
    id: "lovers",
    name: "Влюблённые",
    subtitle: "Энергия сердца и выбора",
    description: "Твоя сила — в близости, умении любить и быть рядом. Ты стремишься к гармонии и часто стоишь перед важными решениями, идущими от души.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/lovers.jpg"
  },
  "emperor": {
    id: "emperor",
    name: "Император",
    subtitle: "Сила структуры и контроля",
    description: "Ты опора и лидер. Любишь ясность, порядок и умеешь добиваться своего. Иногда тебе стоит смягчить давление и довериться ходу событий.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/emperor.jpg"
  },
  "empress": {
    id: "empress",
    name: "Императрица",
    subtitle: "Забота, изобилие, творчество",
    description: "Ты даришь тепло, уют и ресурсы другим. Обладаешь природной щедростью и умеешь взращивать идеи и людей. Помни заботиться и о себе.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/empress.jpg"
  },
  "magician": {
    id: "magician",
    name: "Маг",
    subtitle: "Энергия действия и проявления",
    description: "Ты создаёшь реальность через силу воли и идей. Уверенность, изобретательность и смелость — твои дары. Главное — не забывай об ответственности.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/magician.jpg"
  },
  "priestess": {
    id: "priestess",
    name: "Жрица",
    subtitle: "Интуиция, тайны и глубина",
    description: "Ты живёшь в ритме внутреннего мира. Видишь больше, чем другие, и чувствуешь скрытые смыслы. Сила — в тишине, мудрости и доверии к себе.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/high_priestess.jpg"
  },
  "fool": {
    id: "fool",
    name: "Шут",
    subtitle: "Свобода, лёгкость и обновление",
    description: "Ты идёшь по жизни с открытым сердцем. Риск, игра и исследование — твоя стихия. Главное — помнить об опоре и намерении в пути.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/the_fool.jpg"
  },
  "death": {
    id: "death",
    name: "Смерть",
    subtitle: "Завершение, рост, перерождение",
    description: "Ты не боишься перемен. Проживаешь трансформации глубоко, помогая себе и другим отпустить старое. Ты — символ начала нового.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/death.jpg"
  },
  "hermit": {
    id: "hermit",
    name: "Отшельник",
    subtitle: "Путь внутрь себя",
    description: "Твоя сила — в уединении и созерцании. Ты ищешь истины и не боишься одиночества. Помни — твой свет важен и для других.",
    imageUrl: "https://afqxhqbtvlnsihkrwbfi.supabase.co/storage/v1/object/public/Public%20storage/tarot_78/hermit.jpg"
  }
};
