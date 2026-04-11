export interface CatalogBuild {
  id: string;
  name: string;
  category: string;
  price: number;
  gpu: string;
  cpu: string;
  ram: string;
  ssd: string;
  description: string;
}

export const catalogCategories = [
  "Все",
  "Игровые ПК",
  "Премиальные игровые ПК",
  "Рабочие станции",
  "ПК для монтажа и 3D",
  "ПК для локального ИИ",
  "ПК для разработки и ИИ-агентов",
] as const;

export const catalogBuilds: CatalogBuild[] = [
  {
    id: "start-1",
    name: "ForgePC Старт",
    category: "Игровые ПК",
    price: 121300,
    gpu: "RTX 4060 8GB",
    cpu: "Ryzen 5 7600X",
    ram: "16 ГБ DDR5",
    ssd: "1 ТБ NVMe",
    description: "Уверенный Full HD-гейминг в современных играх",
  },
  {
    id: "start-2",
    name: "ForgePC Старт+",
    category: "Игровые ПК",
    price: 133000,
    gpu: "RTX 4060 Ti 8GB",
    cpu: "Ryzen 5 7600X",
    ram: "32 ГБ DDR5",
    ssd: "1 ТБ NVMe",
    description: "Full HD на высоких настройках и стриминг",
  },
  {
    id: "opt-1",
    name: "ForgePC Оптимум",
    category: "Игровые ПК",
    price: 214400,
    gpu: "RTX 4070 Super 12GB",
    cpu: "Ryzen 7 7800X3D",
    ram: "32 ГБ DDR5",
    ssd: "2 ТБ NVMe",
    description: "Баланс цены и мощности для 1440p",
  },
  {
    id: "perf-1",
    name: "ForgePC Производительность",
    category: "Премиальные игровые ПК",
    price: 287400,
    gpu: "RTX 5070 Ti 16GB",
    cpu: "Core Ultra 7 265K",
    ram: "32 ГБ DDR5",
    ssd: "2 ТБ NVMe Gen5",
    description: "Высокие настройки и серьёзные задачи",
  },
  {
    id: "prem-1",
    name: "ForgePC Премиум",
    category: "Премиальные игровые ПК",
    price: 413400,
    gpu: "RTX 5080 16GB",
    cpu: "Core Ultra 9 285K",
    ram: "64 ГБ DDR5",
    ssd: "4 ТБ NVMe",
    description: "Максимум для игр и продуктивности",
  },
  {
    id: "prem-2",
    name: "ForgePC Ультра",
    category: "Премиальные игровые ПК",
    price: 729000,
    gpu: "RTX 5090 32GB",
    cpu: "Ryzen 9 9950X",
    ram: "64 ГБ DDR5",
    ssd: "4 ТБ NVMe",
    description: "Флагман без компромиссов",
  },
  {
    id: "work-1",
    name: "ForgePC Студия",
    category: "ПК для монтажа и 3D",
    price: 346800,
    gpu: "RTX 4070 Super 12GB",
    cpu: "Ryzen 9 7950X",
    ram: "64 ГБ DDR5",
    ssd: "2 ТБ NVMe",
    description: "Для монтажа, 3D и дизайна",
  },
  {
    id: "work-2",
    name: "ForgePC Рендер",
    category: "Рабочие станции",
    price: 537600,
    gpu: "RTX 5080 16GB",
    cpu: "Ryzen 9 9950X",
    ram: "128 ГБ DDR5",
    ssd: "4 ТБ NVMe",
    description: "Профессиональная рабочая станция",
  },
  {
    id: "ai-1",
    name: "ForgePC Нейро",
    category: "ПК для локального ИИ",
    price: 849100,
    gpu: "RTX 5090 32GB",
    cpu: "Ryzen 9 7950X",
    ram: "128 ГБ DDR5",
    ssd: "4 ТБ NVMe",
    description: "Для локальных LLM и Stable Diffusion",
  },
  {
    id: "ai-2",
    name: "ForgePC Агент",
    category: "ПК для разработки и ИИ-агентов",
    price: 844700,
    gpu: "RTX 5090 32GB",
    cpu: "Core Ultra 9 285K",
    ram: "128 ГБ DDR5",
    ssd: "4 ТБ NVMe",
    description: "ИИ-агенты, Docker, контейнеры и тяжёлая автоматизация",
  },
];

export const formatCatalogPrice = (price: number) => `${price.toLocaleString("ru-RU")} ₽`;

export function getCatalogBuildById(id: string) {
  return catalogBuilds.find((build) => build.id === id);
}
