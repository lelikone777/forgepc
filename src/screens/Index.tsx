"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatedSection, AnimatedItem } from "@/shared/components/AnimatedSection";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { catalogBuilds, formatCatalogPrice } from "@/shared/data/catalogBuilds";
import {
  Gamepad2, Monitor, Cpu, Palette, Brain, Bot, Cog, Thermometer,
  Shield, Wrench, Zap, Eye, Star, ChevronRight, ArrowRight,
  Server, HardDrive, Fan, Box, CircuitBoard, BatteryCharging,
  Check, Quote, Gauge, Snowflake, Code2, Clapperboard, Sparkles
} from "lucide-react";

const taskCards = [
  { icon: Gamepad2, title: "Под современные AAA-игры", desc: "Высокий FPS, стабильная работа, запас по мощности" },
  { icon: Monitor, title: "Под высокий FPS и стриминг", desc: "Производительность в игре и в трансляции одновременно" },
  { icon: Palette, title: "Под монтаж, графику и 3D", desc: "Быстрый рендер, работа с тяжёлыми проектами и многозадачность" },
  { icon: Cpu, title: "Под разработку и локальный ИИ", desc: "Надёжность под долгие нагрузки и профессиональные задачи" },
  { icon: Brain, title: "Под тяжёлые рабочие сценарии", desc: "Запуск локальных моделей, генерация, инференс, работа с нейросетями" },
  { icon: Thermometer, title: "Под тихую и холодную работу", desc: "Оптимальное охлаждение без компромиссов по шуму" },
];

const qualityPoints = [
  { icon: Shield, text: "Точная совместимость комплектующих" },
  { icon: Wrench, text: "Чистая и аккуратная сборка" },
  { icon: Fan, text: "Оптимальное охлаждение и воздушные потоки" },
  { icon: Zap, text: "Стресс-тесты перед выдачей" },
  { icon: Cog, text: "Настройка BIOS и системы" },
  { icon: ArrowRight, text: "Потенциал для будущего апгрейда" },
];

const useCards = [
  { icon: Gamepad2, title: "Для игр", desc: "Высокий FPS, стабильная работа, запас по мощности" },
  { icon: Monitor, title: "Для стриминга", desc: "Производительность в игре и в трансляции одновременно" },
  { icon: Palette, title: "Для монтажа и дизайна", desc: "Быстрый рендер, работа с тяжёлыми проектами и многозадачность" },
  { icon: Cpu, title: "Для 3D и разработки", desc: "Надёжность под долгие нагрузки и профессиональные задачи" },
  { icon: Brain, title: "Для локального ИИ", desc: "Запуск локальных моделей, генерация, инференс, работа с нейросетями" },
  { icon: Bot, title: "Для ИИ-агентов и автоматизации", desc: "Разработка, тестирование, контейнеры, базы данных, векторные индексы" },
];

const configParts = [
  {
    id: "cpu",
    icon: Cpu,
    label: "Процессор",
    summary: "Считает, координирует и удерживает систему отзывчивой.",
    description:
      "Процессор нужен для логики всей системы: он отвечает за расчёты, фоновые задачи, многозадачность, компиляцию, стриминг и общую отзывчивость ПК. Слабый CPU быстро становится узким местом даже при хорошей видеокарте.",
    points: ["FPS и 1% low в играх", "Стриминг и многозадачность", "Разработка, рендер и тяжёлые рабочие процессы"],
  },
  {
    id: "gpu",
    icon: Monitor,
    label: "Видеокарта",
    summary: "Даёт графическую мощность для игр, 3D и ИИ.",
    description:
      "Видеокарта отвечает за графику, ускорение рендера, работу с нейросетями и большинство тяжёлых визуальных задач. Именно она чаще всего определяет уровень FPS, возможности в 1440p и 4K, а также запас по VRAM под современные проекты.",
    points: ["Игры и трассировка лучей", "Blender, Unreal, DaVinci", "Stable Diffusion, локальные модели и GPU-ускорение"],
  },
  {
    id: "ram",
    icon: HardDrive,
    label: "Оперативная память",
    summary: "Держит активные данные под рукой без тормозов и свопа.",
    description:
      "Оперативная память нужна для того, чтобы система быстро держала открытые приложения, сцены, проекты и фоновые сервисы. Если памяти мало, ПК начинает упираться в диск, теряет плавность и резко проседает в комфорте работы.",
    points: ["Многозадачность и браузер с кучей вкладок", "Монтаж, 3D и большие сцены", "Docker, базы данных и ИИ-агенты"],
  },
  {
    id: "storage",
    icon: Server,
    label: "Накопитель",
    summary: "Влияет на загрузки, кэш, проекты и общую скорость системы.",
    description:
      "Накопитель определяет, как быстро загружается Windows, запускаются игры, открываются проекты и работает кэш. Хороший NVMe SSD убирает ощущение вялости и особенно заметен в монтаже, разработке и работе с крупными файлами.",
    points: ["Быстрый старт системы и программ", "Кэш, медиатека и большие проекты", "Комфорт без подвисаний и долгих загрузок"],
  },
  {
    id: "motherboard",
    icon: CircuitBoard,
    label: "Материнская плата",
    summary: "Связывает все компоненты и определяет запас по платформе.",
    description:
      "Материнская плата нужна не ради галочки. Она определяет совместимость комплектующих, качество питания процессора, набор портов, поддержку памяти, накопителей и будущих апгрейдов. Слабая плата часто ломает потенциал всей сборки.",
    points: ["Стабильность питания и VRM", "Поддержка DDR5, SSD и интерфейсов", "Понятный апгрейдный потенциал"],
  },
  {
    id: "psu",
    icon: BatteryCharging,
    label: "Блок питания",
    summary: "Даёт системе стабильность, безопасность и запас по мощности.",
    description:
      "Блок питания питает всю систему и напрямую влияет на стабильность, шум и ресурс компонентов. Экономить на нём опасно: хороший PSU нужен для спокойной работы под нагрузкой, нормального запаса мощности и защиты дорогих комплектующих.",
    points: ["Стабильность под пиковыми нагрузками", "Запас под апгрейд видеокарты", "Тихая и безопасная работа всей системы"],
  },
  {
    id: "case",
    icon: Box,
    label: "Корпус",
    summary: "Формирует airflow, шум и общее качество сборки.",
    description:
      "Корпус влияет не только на внешний вид. Он задаёт продуваемость, удобство укладки кабелей, уровень шума, совместимость с крупными видеокартами и радиаторами. Правильный корпус делает систему холоднее, тише и аккуратнее.",
    points: ["Нормальный поток воздуха", "Место под длинные GPU и СЖО", "Чистая сборка и удобство обслуживания"],
  },
  {
    id: "cooling",
    icon: Fan,
    label: "Охлаждение",
    summary: "Удерживает температуры, шум и стабильность под нагрузкой.",
    description:
      "Охлаждение нужно для того, чтобы процессор и вся система работали стабильно без троттлинга и лишнего шума. Грамотно подобранный кулер или СЖО позволяет держать высокую производительность дольше и делает повседневное использование комфортнее.",
    points: ["Температуры и отсутствие троттлинга", "Тихая работа под нагрузкой", "Стабильный буст процессора"],
  },
];

const games = [
  "Counter-Strike 2", "ARC Raiders", "Resident Evil 9", "Cyberpunk 2077",
  "Warzone", "Dota 2", "Apex Legends", "Black Myth: Wukong",
  "Alan Wake 2", "S.T.A.L.K.E.R. 2", "GTA VI ready", "Forza Horizon 5",
  "Red Dead Redemption 2", "Fortnite", "Escape from Tarkov", "Helldivers 2",
];

interface GameInsight {
  name: string;
  summary: string;
  needs: string[];
  fit: string;
}

const gameInsights: GameInsight[] = [
  {
    name: "Counter-Strike 2",
    summary: "Киберспортивный FPS сильнее зависит от процессора, низких задержек и стабильных 1% low, чем от экстремально дорогой видеокарты.",
    needs: ["Сильный CPU для высокого FPS и 1% low", "Быстрая память для отзывчивости", "Стабильная платформа под high refresh"],
    fit: "Такой профиль нужен, если важны 240+ FPS, быстрый отклик и предсказуемое поведение системы в соревновательной игре.",
  },
  {
    name: "ARC Raiders",
    summary: "Современный сетевой шутер любит запас по видеокарте и стабильный фреймрейт в динамичных сценах.",
    needs: ["GPU для высоких пресетов и 1440p", "CPU для стабильности в онлайне", "SSD для быстрой загрузки ассетов"],
    fit: "Подходит для уверенной игры на высоких настройках без постоянных просадок в интенсивных перестрелках.",
  },
  {
    name: "Resident Evil 9",
    summary: "Тяжёлый AAA-хоррор требует сильную видеокарту, запас по VRAM и адекватную платформу под высокие пресеты.",
    needs: ["GPU для high / ultra", "VRAM под текстуры и эффекты", "CPU и SSD для плавной подгрузки сцен"],
    fit: "Сборка рассчитана на комфортный AAA-гейминг с хорошей картинкой и без ощущения, что система работает на пределе.",
  },
  {
    name: "Cyberpunk 2077",
    summary: "Один из лучших стресс-тестов для видеокарты, трассировки и общего баланса системы.",
    needs: ["GPU с запасом под RT и апскейлеры", "CPU для стабильного кадра", "SSD для быстрой подгрузки города"],
    fit: "Даёт адекватный запас под высокие настройки, RT-сценарии и 1440p/4K в зависимости от профиля.",
  },
  {
    name: "Warzone",
    summary: "Королевские битвы особенно чувствительны к процессору, памяти и стабильности кадра в большой сетевой нагрузке.",
    needs: ["CPU для плотных онлайн-сцен", "RAM для общей стабильности", "GPU для высокого FPS в 1440p"],
    fit: "Хорошо подходит тем, кому нужен высокий и ровный FPS, а не только красивая цифра в бенчмарке.",
  },
  {
    name: "Dota 2",
    summary: "Игра не самая тяжёлая по графике, но любит высокий и стабильный FPS на соревновательных мониторах.",
    needs: ["CPU и память для ровного кадра", "Быстрый отклик системы", "Стабильная платформа под long session"],
    fit: "Профиль уместен для киберспорта, стриминга и комфортной игры с большим запасом по производительности.",
  },
  {
    name: "Apex Legends",
    summary: "Здесь важны высокий refresh, ровный кадр и хороший CPU/GPU-баланс без перекоса в одну деталь.",
    needs: ["CPU для частого обновления кадра", "GPU для 1440p и высоких настроек", "RAM для общей отзывчивости"],
    fit: "Подходит для игроков, которым нужен высокий FPS, быстрый отклик и стабильность в ранговых матчах.",
  },
  {
    name: "Black Myth: Wukong",
    summary: "Тяжёлый графический релиз, который быстро показывает реальный класс видеокарты и запас по платформе.",
    needs: ["Сильная GPU для ультра и RT-сценариев", "VRAM под тяжёлые текстуры", "CPU для удержания плавности"],
    fit: "Такая сборка нужна для современных single-player AAA-проектов, где важна не только средняя цифра FPS, но и комфорт картинки.",
  },
  {
    name: "Alan Wake 2",
    summary: "Игра очень чувствительна к видеокарте, RT и общему графическому запасу системы.",
    needs: ["GPU высокого класса", "Апскейлеры и VRAM", "SSD для тяжёлых ассетов и быстрой подгрузки"],
    fit: "Подходит тем, кто хочет запускать demanding-релизы без постоянного снижения настроек до компромиссного уровня.",
  },
  {
    name: "S.T.A.L.K.E.R. 2",
    summary: "Большой открытый мир и тяжёлые сцены требуют сочетания сильной GPU, CPU и быстрого SSD.",
    needs: ["GPU для высокой детализации", "CPU для логики мира и NPC", "SSD для стриминга данных и загрузок"],
    fit: "Даёт более уверенный опыт в открытом мире с большим количеством подгружаемых данных и эффектов.",
  },
  {
    name: "GTA VI ready",
    summary: "Это ориентир на будущую тяжёлую AAA-нагрузку, а не только на текущие релизы.",
    needs: ["Запас по GPU на несколько лет", "CPU без слабых мест", "RAM и SSD под будущие требования"],
    fit: "Такая конфигурация выбирается не под один релиз, а под нормальный срок жизни системы и запас по актуальности.",
  },
  {
    name: "Forza Horizon 5",
    summary: "Гоночные игры особенно хорошо показывают пользу сильной GPU при высоком разрешении и высокой частоте кадров.",
    needs: ["GPU для 1440p/4K", "CPU для стабильного фреймрейта", "SSD для быстрых загрузок и потока данных"],
    fit: "Подходит для красивой картинки, высокой плавности и комфортной игры на больших мониторах.",
  },
  {
    name: "Red Dead Redemption 2",
    summary: "Тяжёлый открытый мир любит видеокарту, память и общий запас по платформе.",
    needs: ["GPU для high/ultra в высоком разрешении", "RAM для общей стабильности", "CPU для сложных сцен и мира"],
    fit: "Даёт уверенный уровень производительности в больших, насыщенных сценах с высокой детализацией.",
  },
  {
    name: "Fortnite",
    summary: "В зависимости от режима это либо киберспортивная игра на сотни FPS, либо вполне тяжёлый современный проект.",
    needs: ["CPU для high refresh", "GPU под Unreal Engine 5 режимы", "RAM для стриминга и многозадачности"],
    fit: "Подходит как для соревновательной игры с высоким FPS, так и для более красивых UE5-пресетов.",
  },
  {
    name: "Escape from Tarkov",
    summary: "Очень процессорозависимый и нестабильный по нагрузке проект, где важен не средний FPS, а плавность ощущения.",
    needs: ["CPU и память для сложных сцен", "SSD для карт и загрузок", "Стабильная платформа без дефицита RAM"],
    fit: "Здесь особенно важна не витринная мощность, а сбалансированная система без слабых звеньев.",
  },
  {
    name: "Helldivers 2",
    summary: "Кооперативный экшен с тяжёлыми боевыми сценами, который любит сильную GPU и ровный кадр под нагрузкой.",
    needs: ["GPU для плотных эффектов и 1440p", "CPU для расчётов и общей стабильности", "RAM под длительные игровые сессии"],
    fit: "Подходит для high-intensity кооператива, где важны плавность и запас по производительности в массовых сценах.",
  },
];

const programs = [
  "Blender", "Unreal Engine 5", "Adobe Premiere Pro", "DaVinci Resolve",
  "After Effects", "Photoshop", "AutoCAD", "3ds Max", "Houdini",
  "Docker", "PyTorch", "Stable Diffusion", "ComfyUI", "Ollama",
];

interface ProgramInsight {
  name: string;
  summary: string;
  needs: string[];
  fit: string;
}

const programInsights: ProgramInsight[] = [
  {
    name: "Blender",
    summary: "Нужен баланс между GPU-рендером, viewport и запасом памяти под тяжёлые сцены.",
    needs: ["Сильная видеокарта для Cycles и viewport", "Много RAM для крупных сцен", "Быстрый SSD для ассетов и кэша"],
    fit: "Подходит для моделинга, lookdev, анимации и GPU-рендера без узких мест на больших сценах.",
  },
  {
    name: "Unreal Engine 5",
    summary: "UE5 любит быстрый CPU, сильную GPU и нормальный запас памяти под большие проекты.",
    needs: ["CPU для компиляции и шейдеров", "GPU для viewport, Lumen и Nanite", "RAM и SSD для тяжёлых проектов"],
    fit: "Хороший вариант для разработки сцен, сборок проекта, работы с ассетами и многозадачности вокруг движка.",
  },
  {
    name: "Adobe Premiere Pro",
    summary: "Монтаж упирается в GPU-ускорение, быстрый кэш и нормальный объём памяти.",
    needs: ["GPU для эффектов и ускорения таймлайна", "SSD для медиакэша и исходников", "RAM для тяжёлых последовательностей"],
    fit: "Даёт комфортный монтаж в 4K, быстрый отклик таймлайна и нормальный запас под экспорт и многослойность.",
  },
  {
    name: "DaVinci Resolve",
    summary: "Resolve особенно хорошо чувствует мощную видеокарту и большой запас памяти.",
    needs: ["GPU для color, Fusion и noise reduction", "RAM для сложных таймлайнов", "SSD для кэша и медиатеки"],
    fit: "Подходит для цветокора, Fusion, тяжёлых эффектов и длительной работы на коммерческих проектах.",
  },
  {
    name: "After Effects",
    summary: "AE любит RAM, быстрый диск под cache и уверенную платформу под многослойные композиции.",
    needs: ["Много RAM для предпросмотра", "Быстрый SSD для disk cache", "Стабильный CPU/GPU под эффекты"],
    fit: "Комфортнее ведёт себя на сложных композициях, длинных превью и параллельной работе с другими Adobe-приложениями.",
  },
  {
    name: "Photoshop",
    summary: "Photoshop не требует экстремального железа, но очень любит отзывчивую систему и быстрый scratch.",
    needs: ["Быстрый CPU для общей отзывчивости", "RAM под большие PSD и слои", "SSD для scratch и библиотек"],
    fit: "Подходит для больших макетов, тяжёлых файлов, AI-инструментов и одновременной работы с несколькими проектами.",
  },
  {
    name: "AutoCAD",
    summary: "Для CAD важны стабильность платформы, CPU-отклик и чистая работа с проектами.",
    needs: ["CPU для работы с чертежами и логикой", "RAM для больших наборов данных", "SSD для быстрого открытия проектов"],
    fit: "Удобен для длительной инженерной работы, быстрых правок и одновременного запуска сопутствующего софта.",
  },
  {
    name: "3ds Max",
    summary: "Сцены, viewport и рендер требуют уже серьёзного запаса по GPU, CPU и памяти.",
    needs: ["GPU для viewport и визуализации", "CPU для части вычислений и сцен", "RAM для больших проектов"],
    fit: "Подходит для сложных сцен, материалов, анимации и параллельной работы с рендерами и редакторами.",
  },
  {
    name: "Houdini",
    summary: "Houdini быстро показывает слабые места системы в памяти, CPU и дисковой подсистеме.",
    needs: ["CPU и RAM для симуляций", "SSD для кэша и временных файлов", "Сильная платформа под длительные нагрузки"],
    fit: "Нормально раскрывается на симуляциях, procedural workflow и тяжёлых техзадачах без постоянного свопа.",
  },
  {
    name: "Docker",
    summary: "Контейнеры требуют не только CPU, но и адекватный объём RAM и быстрый SSD.",
    needs: ["RAM под несколько сервисов сразу", "CPU для контейнеров и сборок", "SSD для образов, volume и кэша"],
    fit: "Уверенно держит локальные сервисы, базы и dev-окружения без деградации всей системы.",
  },
  {
    name: "PyTorch",
    summary: "Для ML критичны VRAM, RAM и общая стабильность машины под долгую нагрузку.",
    needs: ["GPU и объём VRAM", "RAM под датасеты и окружение", "SSD для моделей и кэша"],
    fit: "Подходит для обучения, инференса, экспериментов и работы с реальными пайплайнами локально.",
  },
  {
    name: "Stable Diffusion",
    summary: "Здесь решает видеокарта и объём VRAM, а комфорт добавляют RAM и быстрый накопитель.",
    needs: ["GPU с запасом по VRAM", "RAM для окружения и batch", "SSD для моделей, LoRA и output"],
    fit: "Подходит для генерации изображений, upscale, LoRA и тяжёлых графов без постоянных компромиссов.",
  },
  {
    name: "ComfyUI",
    summary: "ComfyUI особенно чувствителен к VRAM и параллельным узлам в графе.",
    needs: ["Большой запас VRAM", "RAM для дополнительных сервисов", "SSD для моделей и workflow"],
    fit: "Даёт комфортный запас под сложные графы, ControlNet, upscale и несколько тяжёлых пайплайнов.",
  },
  {
    name: "Ollama",
    summary: "Локальные модели любят VRAM, системную память и быстрый накопитель под веса.",
    needs: ["VRAM для моделей и инференса", "RAM под окружение и сервисы", "SSD для хранения весов"],
    fit: "Подходит для локальных LLM, чат-сценариев, RAG, агентов и постоянной фоновой работы моделей.",
  },
];

const performanceModes = ["Игры", "Работа", "ИИ"] as const;
type PerformanceMode = (typeof performanceModes)[number];

interface PerformanceProfile {
  id: string;
  mode: PerformanceMode;
  buildId: string;
  title: string;
  subtitle: string;
  description: string;
  config: {
    gpu: string;
    cpu: string;
    ram: string;
    storage: string;
  };
  fps: {
    label: string;
    value: string;
    note: string;
  }[];
  suitableFor: string[];
  workflowHighlights: {
    title: string;
    text: string;
  }[];
  settingsNote: string;
}

const performanceProfiles: PerformanceProfile[] = [
  {
    id: "balanced-1440",
    mode: "Игры",
    buildId: "perf-1",
    title: "Игровой баланс 1440p",
    subtitle: "Оптимальная конфигурация для high refresh и современных AAA-игр",
    description:
      "Ориентир для тех, кто хочет играть в 1440p на высоких настройках, иметь запас под стриминг, монтаж и не переплачивать за флагманский уровень без необходимости.",
    config: {
      gpu: "RTX 5070 Ti 16GB",
      cpu: "Core Ultra 7 265K",
      ram: "32 ГБ DDR5",
      storage: "2 ТБ NVMe Gen5",
    },
    fps: [
      { label: "Full HD 1080p", value: "240+", note: "киберспорт и высокий refresh" },
      { label: "2K 1440p", value: "165+", note: "high / ultra без ощущения компромисса" },
      { label: "4K 2160p", value: "90+", note: "с DLSS/FSR там, где это уместно" },
    ],
    suitableFor: [
      "Counter-Strike 2, Warzone, Apex, Fortnite и другие соревновательные игры",
      "Cyberpunk 2077, Alan Wake 2, Black Myth: Wukong и тяжёлые AAA-проекты",
      "Стриминг, монтаж 4K, Blender viewport и универсальная домашняя рабочая станция",
    ],
    workflowHighlights: [
      { title: "Монтаж и контент", text: "Комфортный монтаж в 4K, быстрый экспорт и нормальная работа с цветом, эффектами и медиакэшем." },
      { title: "3D и разработка", text: "Подходит для UE5, Blender, компиляции проектов и тяжёлой многозадачности без перекоса в одну деталь." },
      { title: "Повседневная скорость", text: "Быстрый запуск игр, софта и проектов за счёт сильного CPU, нормального SSD и адекватного объёма RAM." },
    ],
    settingsNote: "Ориентир по FPS дан для высоких или ультра-настроек, без экстремального упора в path tracing и с разумным использованием апскейлеров.",
  },
  {
    id: "premium-4k",
    mode: "Работа",
    buildId: "work-2",
    title: "Рабочая станция для продакшна",
    subtitle: "Конфигурация для тяжёлого монтажа, 3D и многослойных рабочих пайплайнов",
    description:
      "Это уровень для тех, кто использует ПК как полноценный инструмент: монтаж, рендер, сложные сцены, многозадачность, тяжёлые проекты и длительная работа под нагрузкой без постоянных компромиссов.",
    config: {
      gpu: "RTX 5080 16GB",
      cpu: "Ryzen 9 9950X",
      ram: "128 ГБ DDR5",
      storage: "4 ТБ NVMe",
    },
    fps: [
      { label: "Full HD 1080p", value: "280+", note: "высокий запас даже вне игрового фокуса" },
      { label: "2K 1440p", value: "180+", note: "плавный FPS в тяжёлых релизах" },
      { label: "4K 2160p", value: "110+", note: "можно играть и работать на одной машине" },
    ],
    suitableFor: [
      "DaVinci Resolve, Premiere Pro, After Effects и длинные монтажные сессии",
      "Blender, Houdini, 3ds Max, Unreal Engine 5 и тяжёлые сцены",
      "Работа с несколькими профессиональными приложениями одновременно без дефицита RAM",
    ],
    workflowHighlights: [
      { title: "Монтаж и цвет", text: "Быстрый таймлайн, сильное GPU-ускорение и хороший запас памяти под тяжёлые проекты и эффекты." },
      { title: "3D и визуализация", text: "Сильный вариант для viewport, GPU-рендера, материалов, сцен и сложных рабочих пайплайнов." },
      { title: "Платформа без компромиссов", text: "Подходит тем, кто хочет один мощный ПК и для игр, и для серьёзной продуктивной работы." },
    ],
    settingsNote: "Ориентир по FPS рассчитан под высокий класс сборки с упором на качество картинки, трассировку и комфортный запас по мощности.",
  },
  {
    id: "creator-ai",
    mode: "ИИ",
    buildId: "ai-1",
    title: "Рабочая станция / creator / AI",
    subtitle: "Конфигурация для тяжёлых рабочих задач, локального ИИ и многозадачности",
    description:
      "Если приоритетом являются не только игры, но и рендер, локальные модели, контейнеры, разработка и большие проекты, такой профиль показывает, как выглядит уже по-настоящему рабочая машина.",
    config: {
      gpu: "RTX 5090 32GB",
      cpu: "Ryzen 9 9950X",
      ram: "128 ГБ DDR5",
      storage: "4 ТБ NVMe",
    },
    fps: [
      { label: "Full HD 1080p", value: "260+", note: "игры тоже без слабых мест" },
      { label: "2K 1440p", value: "170+", note: "тяжёлые релизы и высокий refresh" },
      { label: "4K 2160p", value: "100+", note: "плюс огромный запас вне игр" },
    ],
    suitableFor: [
      "Локальные LLM, Stable Diffusion, ComfyUI, PyTorch и GPU-ускоренные задачи",
      "Docker, базы данных, ИИ-агенты, автоматизация и тяжёлая многозадачность",
      "Монтаж, рендер, симуляции, сложные сцены и профессиональная работа под длительной нагрузкой",
    ],
    workflowHighlights: [
      { title: "Локальный ИИ", text: "Большой объём VRAM и RAM делает систему пригодной для реальных пайплайнов, а не только для тестов на вечер." },
      { title: "Тяжёлая многозадачность", text: "Можно одновременно держать IDE, контейнеры, модели, браузер, базы и рабочие сервисы без постоянного свопа." },
      { title: "Профессиональная нагрузка", text: "Такая конфигурация рассчитана на длительную работу под рендером, генерацией, экспортом и сложными сценами." },
    ],
    settingsNote: "В этом профиле важен не только FPS в играх, а общий запас платформы под долгую тяжёлую работу, нейросети и профессиональные приложения.",
  },
];

const aiCards = [
  {
    title: "Локальные нейросети и LLM",
    desc: "Ориентир на большие модели, локальный inference, RAG и постоянную фоновую работу с весами и памятью.",
    className: "lg:col-span-5 lg:row-span-2",
    accent: "from-primary/[0.16] via-primary/[0.08] to-transparent",
  },
  {
    title: "Stable Diffusion и ComfyUI",
    desc: "Запас по VRAM и дисковой подсистеме под сложные графы, upscale, ControlNet и batch-сценарии.",
    className: "lg:col-span-4",
    accent: "from-emerald-500/10 via-transparent to-transparent",
  },
  {
    title: "Разработка ИИ-агентов",
    desc: "Контейнеры, оркестрация, базы, очереди, IDE и локальные модели в одном окружении.",
    className: "lg:col-span-3",
    accent: "from-primary/[0.12] via-transparent to-transparent",
  },
  {
    title: "Python и ML-стек",
    desc: "Эксперименты, ноутбуки, обучение, инференс и тяжёлая многозадачность без постоянного свопа.",
    className: "lg:col-span-3",
    accent: "from-sky-500/10 via-transparent to-transparent",
  },
  {
    title: "Docker и контейнеризация",
    desc: "Локальные сервисы, несколько окружений и стабильная работа dev-инфраструктуры на одной машине.",
    className: "lg:col-span-4",
    accent: "from-primary/[0.08] via-transparent to-transparent",
  },
  {
    title: "Unreal Engine и 3D",
    desc: "Большие сцены, viewport, компиляция, ассеты и тяжёлые проекты, где слабые места сразу заметны.",
    className: "lg:col-span-5",
    accent: "from-amber-500/10 via-transparent to-transparent",
  },
  {
    title: "Видеомонтаж и рендер",
    desc: "Resolve, Premiere, Fusion, export, cache и длительные сессии без просадок и перегрева.",
    className: "lg:col-span-4",
    accent: "from-primary/[0.12] via-transparent to-transparent",
  },
  {
    title: "Многозадачная профессиональная работа",
    desc: "Один ПК под всё: IDE, браузер, базы, модели, рендер, видеомонтаж и тяжёлые фоновые процессы.",
    className: "lg:col-span-8",
    accent: "from-emerald-500/10 via-primary/[0.07] to-transparent",
  },
];

const builds = [
  { tier: "Старт", price: "от 85 000 ₽", desc: "Для уверенного Full HD-гейминга", specs: "RTX 4060 • Ryzen 5 • 16 ГБ" },
  { tier: "Оптимум", price: "от 135 000 ₽", desc: "Баланс цены и мощности", specs: "RTX 4070 Super • Ryzen 7 • 32 ГБ" },
  { tier: "Производительность", price: "от 195 000 ₽", desc: "Для высоких настроек и серьёзных задач", specs: "RTX 5070 Ti • Core Ultra 7 • 32 ГБ" },
  { tier: "Премиум", price: "от 320 000 ₽", desc: "Максимум возможностей без компромиссов", specs: "RTX 5080 • Core Ultra 9 • 64 ГБ" },
  { tier: "ИИ и рабочие станции", price: "от 400 000 ₽", desc: "Для локального ИИ и тяжёлых рабочих процессов", specs: "RTX 5090 • Ryzen 9 • 128 ГБ" },
];

const brands = [
  "ASUS", "MSI", "GIGABYTE", "NVIDIA", "AMD", "Intel", "Kingston", "Corsair",
  "DeepCool", "be quiet!", "Samsung", "WD Black", "Lian Li", "NZXT", "ASRock",
  "Noctua", "Fractal Design", "Cooler Master", "Seasonic", "Crucial",
];

const processSteps = [
  { num: "01", title: "Подбор конфигурации", desc: "Определяем задачи, бюджет и ожидаемую производительность" },
  { num: "02", title: "Подготовка комплектующих", desc: "Подбираем совместимые и оптимальные компоненты" },
  { num: "03", title: "Сборка и кабель-менеджмент", desc: "Собираем аккуратно, чисто и с правильной организацией" },
  { num: "04", title: "Тестирование", desc: "Проверяем температуры, стабильность и работу под нагрузкой" },
  { num: "05", title: "Настройка", desc: "Подготавливаем систему к запуску, обновляем и оптимизируем" },
  { num: "06", title: "Передача клиенту", desc: "Ты получаешь готовую к работе систему" },
];

const advantages = [
  "Подбор под реальные задачи, а не по шаблону",
  "Прозрачная логика выбора комплектующих",
  "Аккуратная сборка и чистый кабель-менеджмент",
  "Проверка совместимости и тестирование",
  "Современные комплектующие",
  "Поддержка и консультация после покупки",
  "Конфигурации под игры, работу, ИИ и тяжёлые вычисления",
  "Грамотный баланс видеокарты, процессора, памяти и охлаждения",
];

const reviews = [
  { text: "Получил именно ту производительность, на которую рассчитывал. Всё работает тихо, быстро и стабильно.", author: "Алексей М." },
  { text: "Очень понравилась аккуратность сборки и то, как помогли подобрать конфиг без переплаты.", author: "Дмитрий К." },
  { text: "Компьютер выглядит дорого, а в играх показывает отличный результат.", author: "Максим В." },
  { text: "Подобрали систему под локальные модели и тяжёлые рабочие задачи, всё работает очень уверенно.", author: "Анна С." },
];

const faqItems = [
  { q: "Можно ли собрать ПК под мой бюджет?", a: "Да, можно подобрать конфигурацию под конкретную сумму." },
  { q: "Можно ли собрать ПК под конкретную игру или программу?", a: "Да, можно подобрать сборку под конкретные игры и рабочие задачи." },
  { q: "Вы проверяете совместимость комплектующих?", a: "Да, каждая конфигурация подбирается с учётом совместимости." },
  { q: "Будет ли ПК протестирован перед выдачей?", a: "Да, система проходит тестирование перед передачей клиенту." },
  { q: "Можно ли потом улучшить сборку?", a: "Да, сборка может иметь понятный потенциал для будущего апгрейда." },
  { q: "Можно ли собрать ПК под локальный ИИ и нейросети?", a: "Да, можно собрать ПК под локальные модели, генерацию и инференс." },
  { q: "Подойдут ли ваши сборки для разработки ИИ-агентов?", a: "Да, можно собрать систему под ИИ-агентов, контейнеры, базы данных, Python-стек и тяжёлую многозадачную работу." },
];

function TaskCardVisual({ index }: { index: number }) {
  const reduceMotion = useReducedMotion();
  const idleAnimation = reduceMotion ? undefined : { y: [0, -9, 0], rotate: [-3, 1, -3] };
  const idleTransition = {
    duration: 7 + index * 0.35,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut" as const,
  };
  const shell =
    "pointer-events-none absolute -right-6 -top-10 z-10 drop-shadow-[0_24px_36px_rgba(0,0,0,0.18)]";

  switch (index) {
    case 0:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute inset-x-3 top-6 h-20 rounded-[1.6rem] border border-white/50 bg-gradient-to-br from-white via-card to-accent/70 shadow-[0_18px_30px_rgba(0,0,0,0.14)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[-6deg] dark:border-white/10 dark:from-zinc-900 dark:via-card dark:to-zinc-900" />
            <div className="absolute inset-x-7 top-10 flex h-12 items-center justify-center rounded-[1rem] border border-primary/20 bg-background/80 backdrop-blur-sm transition-transform duration-700 group-hover:translate-y-1">
              <Gamepad2 size={26} className="text-primary" />
            </div>
            <div className="absolute -left-2 top-3 rounded-full border border-primary/30 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary transition-transform duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1">
              AAA
            </div>
            <div className="absolute right-0 top-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-700 group-hover:translate-x-1 group-hover:scale-110">
              <Sparkles size={18} />
            </div>
            <div className="absolute bottom-2 left-7 h-12 w-12 rounded-full bg-primary/18 blur-xl transition-all duration-700 group-hover:scale-125 group-hover:bg-primary/30" />
          </div>
        </motion.div>
      );
    case 1:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute inset-0 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-card via-accent/50 to-background shadow-[0_18px_30px_rgba(0,0,0,0.14)] dark:from-zinc-950 dark:via-card dark:to-zinc-900" />
            <div className="absolute left-4 top-4 rounded-full border border-primary/25 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
              fps max
            </div>
            <div className="absolute left-5 top-11 h-16 w-16 rounded-full border border-primary/20 bg-background/85 shadow-inner shadow-primary/10">
              <div className="absolute inset-3 rounded-full border border-primary/15" />
              <div className="absolute left-1/2 top-1/2 h-1 w-7 origin-left -translate-y-1/2 rotate-[12deg] rounded-full bg-primary shadow-[0_0_14px_hsla(var(--primary),0.55)] transition-transform duration-700 group-hover:rotate-[-42deg]" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              <Gauge size={18} className="absolute bottom-2 right-2 text-primary/65" />
            </div>
            <div className="absolute right-3 top-11 text-right">
              <div className="font-mono-spec text-3xl font-bold leading-none text-foreground transition-transform duration-700 group-hover:scale-110 group-hover:text-primary">
                240+
              </div>
              <div className="font-mono-spec text-[11px] uppercase tracking-[0.28em] text-muted-foreground">fps</div>
            </div>
            <div className="absolute right-4 top-8 h-2.5 w-2.5 rounded-full bg-primary transition-all duration-700 group-hover:-translate-y-4 group-hover:translate-x-2 group-hover:scale-150" />
            <div className="absolute right-1 top-14 h-2 w-2 rounded-full bg-orange-300 transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-4 group-hover:scale-125" />
            <div className="absolute right-8 top-5 h-2 w-2 rounded-full bg-primary/70 transition-all duration-700 group-hover:-translate-y-3 group-hover:scale-125" />
          </div>
        </motion.div>
      );
    case 2:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute left-8 top-2 h-20 w-20 rounded-[1.6rem] border border-primary/20 bg-gradient-to-br from-primary/20 via-background to-card shadow-[0_18px_30px_rgba(0,0,0,0.14)] transition-transform duration-700 group-hover:-translate-x-1 group-hover:-translate-y-2 group-hover:rotate-[-10deg]" />
            <div className="absolute left-16 top-7 h-24 w-24 rounded-[1.8rem] border border-white/40 bg-gradient-to-br from-white via-card to-accent/70 shadow-[0_18px_30px_rgba(0,0,0,0.18)] transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:rotate-[8deg] dark:border-white/10 dark:from-zinc-900 dark:via-card dark:to-zinc-900" />
            <div className="absolute left-20 top-12 flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-primary/20 bg-background/90 text-primary transition-transform duration-700 group-hover:translate-y-2">
              <Clapperboard size={22} />
            </div>
            <div className="absolute right-0 top-0 rounded-full border border-primary/25 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              3d
            </div>
            <div className="absolute -bottom-1 left-8 flex items-center gap-2 rounded-full bg-background/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-lg backdrop-blur-sm transition-transform duration-700 group-hover:translate-y-1">
              <Palette size={12} className="text-primary" />
              render
            </div>
          </div>
        </motion.div>
      );
    case 3:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute left-10 top-7 flex h-20 w-20 items-center justify-center rounded-[1.8rem] border border-primary/25 bg-gradient-to-br from-background via-card to-accent/60 shadow-[0_18px_30px_rgba(0,0,0,0.16)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[6deg]">
              <Cpu size={30} className="text-primary" />
            </div>
            <div className="absolute left-6 top-3 rounded-full border border-primary/25 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              local ai
            </div>
            <div className="absolute right-0 top-10 flex items-center gap-1 rounded-2xl border border-white/40 bg-white/85 px-3 py-2 font-mono-spec text-[10px] text-foreground shadow-xl transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1 dark:border-white/10 dark:bg-zinc-900/90 dark:text-zinc-100">
              <Code2 size={14} className="text-primary" />
              &lt;run /&gt;
            </div>
            <div className="absolute right-8 top-20 h-3 w-3 rounded-full bg-primary shadow-[0_0_16px_hsla(var(--primary),0.7)] transition-all duration-700 group-hover:-translate-y-5 group-hover:translate-x-2" />
            <div className="absolute left-7 top-20 h-2 w-2 rounded-full bg-orange-300 transition-all duration-700 group-hover:-translate-y-3 group-hover:-translate-x-1" />
            <div className="absolute left-20 top-1 h-2.5 w-2.5 rounded-full bg-primary/80 transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-1" />
          </div>
        </motion.div>
      );
    case 4:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute left-6 top-7 flex h-16 w-24 items-center gap-3 rounded-[1.4rem] border border-primary/20 bg-background/90 px-4 shadow-[0_18px_30px_rgba(0,0,0,0.16)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:-rotate-3">
              <Server size={18} className="text-primary" />
              <div className="flex gap-1">
                <span className="h-6 w-1.5 rounded-full bg-primary/80" />
                <span className="h-4 w-1.5 rounded-full bg-primary/55" />
                <span className="h-8 w-1.5 rounded-full bg-primary" />
              </div>
            </div>
            <div className="absolute right-2 top-1 flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-white/40 bg-white/90 shadow-[0_18px_30px_rgba(0,0,0,0.16)] transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-[10deg] dark:border-white/10 dark:bg-zinc-900/90">
              <HardDrive size={24} className="text-primary" />
            </div>
            <div className="absolute left-10 top-0 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              multitask
            </div>
            <div className="absolute left-9 top-24 h-10 w-24 rounded-full border border-primary/15 bg-background/80 shadow-inner transition-transform duration-700 group-hover:scale-105">
              <div className="absolute left-3 top-1/2 h-2 w-8 -translate-y-1/2 rounded-full bg-primary/85" />
              <div className="absolute left-12 top-1/2 h-2 w-5 -translate-y-1/2 rounded-full bg-primary/55" />
              <div className="absolute left-[4.4rem] top-1/2 h-2 w-3 -translate-y-1/2 rounded-full bg-orange-300" />
            </div>
          </div>
        </motion.div>
      );
    default:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute left-9 top-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-gradient-to-br from-card via-background to-accent/60 shadow-[0_18px_30px_rgba(0,0,0,0.16)] transition-transform duration-700 group-hover:-translate-y-2">
              <div className="absolute h-14 w-14 rounded-full border border-primary/15" />
              <Fan size={28} className="text-primary transition-transform duration-700 group-hover:rotate-[180deg]" />
            </div>
            <div className="absolute right-0 top-10 flex items-center gap-2 rounded-2xl border border-white/40 bg-white/90 px-3 py-2 shadow-xl transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-2 dark:border-white/10 dark:bg-zinc-900/90">
              <Snowflake size={16} className="text-primary" />
              <span className="font-mono-spec text-xs font-semibold text-foreground">32°</span>
            </div>
            <div className="absolute left-4 top-1 rounded-full border border-primary/20 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              silent cool
            </div>
            <div className="absolute left-12 top-24 h-12 w-12 rounded-full bg-primary/18 blur-xl transition-all duration-700 group-hover:scale-125 group-hover:bg-primary/26" />
            <div className="absolute right-8 top-5 h-2.5 w-2.5 rounded-full bg-primary/80 transition-all duration-700 group-hover:-translate-y-3 group-hover:scale-125" />
          </div>
        </motion.div>
      );
  }
}

export default function Index() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [fpsGame, setFpsGame] = useState(0);
  const [activeProgram, setActiveProgram] = useState(programs[0]);
  const [activeConfigPart, setActiveConfigPart] = useState(configParts[0].id);
  const [isHeroVideoEnabled, setIsHeroVideoEnabled] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [activePerformanceMode, setActivePerformanceMode] = useState<PerformanceMode>("Игры");

  const selectedConfigPart = configParts.find((part) => part.id === activeConfigPart) ?? configParts[0];
  const selectedPerformanceProfile =
    performanceProfiles.find((profile) => profile.mode === activePerformanceMode) ?? performanceProfiles[0];
  const selectedCatalogBuild =
    catalogBuilds.find((build) => build.id === selectedPerformanceProfile.buildId) ?? catalogBuilds[0];
  const selectedGameInsight = gameInsights.find((game) => game.name === games[fpsGame]) ?? gameInsights[0];
  const selectedProgramInsight =
    programInsights.find((program) => program.name === activeProgram) ?? programInsights[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = navigator.connection as { saveData?: boolean } | undefined;
    const saveDataEnabled = Boolean(connection?.saveData);

    if (!prefersReducedMotion && !saveDataEnabled) {
      setIsHeroVideoEnabled(true);
    }
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (!isHeroVideoEnabled) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        setIsHeroVideoEnabled(false);
      });
    }
  }, [isHeroVideoEnabled]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="pointer-events-none absolute inset-0">
          {isHeroVideoEnabled ? (
            <video
              ref={heroVideoRef}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden
              disablePictureInPicture
            >
              <source src="/PixVerse_V6_Image_Text_540P_Dark_premium_cinem.mp4" type="video/mp4" />
            </video>
          ) : null}
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 pt-32 pb-20 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[0.95] mb-6">
              Максимум мощности.
              <br />
              <span className="gradient-text">Собран под тебя.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              Кастомные ПК на заказ для игр, стриминга, работы, монтажа, 3D, разработки, локального ИИ и тяжёлых задач. Точный подбор комплектующих, современный дизайн сборки, тестирование и производительность без компромиссов.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/configurator"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base sm:text-lg hover:opacity-90 transition-all glow-primary"
              >
                Собрать свой ПК <ArrowRight size={20} />
              </Link>
              <Link
                href="/catalog"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl glass-surface font-semibold text-base sm:text-lg text-foreground hover:bg-accent transition-all"
              >
                Посмотреть готовые сборки
              </Link>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.45}>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground font-mono-spec">
              {["RTX 50 Series", "AMD Ryzen", "Intel Core Ultra", "Гарантия", "Стресс-тесты", "Чистая сборка"].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full border border-border bg-card/50">{t}</span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* МОЩНОСТЬ */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Мощность, которую видно сразу.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Каждая сборка проектируется под реальные задачи. Без случайных комплектующих, без слабых звеньев, без переплаты за ненужное.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {taskCards.map((card, i) => (
              <AnimatedItem key={i} delay={i * 0.08}>
                <div className="group relative h-full min-h-[260px] cursor-default overflow-visible rounded-[1.75rem] border border-border bg-card p-6 pt-28 shadow-card-hover">
                  <TaskCardVisual index={i} />
                  <div className="relative z-20 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary/10">
                    <card.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="relative z-20 mb-2 text-lg font-semibold text-foreground">{card.title}</h3>
                  <p className="relative z-20 text-sm text-muted-foreground">{card.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* КАЧЕСТВО */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Не просто компьютер.
                <br />
                <span className="gradient-text">Продуманная система.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Мы собираем ПК так, как собирали бы для себя: с вниманием к совместимости, охлаждению, шуму, кабель-менеджменту, стабильности питания и удобству дальнейшего апгрейда.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {qualityPoints.map((p, i) => (
              <AnimatedItem key={i} delay={i * 0.07}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <p.icon size={20} className="text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{p.text}</span>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ПОДБОР ПОД ЗАДАЧУ */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Подбираем не по шаблону, а под твою задачу.</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                Игровой ПК, рабочая станция, универсальная домашняя система, сборка для стриминга, система для разработки ИИ-агентов или мощная машина для 3D и тяжёлых вычислений — конфигурация должна подходить именно под твои сценарии.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCards.map((card, i) => (
              <AnimatedItem key={i} delay={i * 0.08}>
                <div className="relative p-6 rounded-2xl bg-card border border-border shadow-card-hover group overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                      <card.icon size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{card.title}</h3>
                    <p className="text-muted-foreground text-sm">{card.desc}</p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ПРЕВЬЮ КОНФИГУРАТОРА */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Собери свою конфигурацию.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Выбирай процессор, видеокарту, память, накопители, корпус и охлаждение. Смотри итоговую цену, сравнивай варианты и подбирай систему, которая подходит именно тебе.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 shadow-card-hover">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {configParts.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveConfigPart(p.id)}
                    className={`group flex min-h-[130px] flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all duration-300 ${
                      selectedConfigPart.id === p.id
                        ? "border-primary/40 bg-primary/[0.08] shadow-[0_18px_45px_-28px_rgba(217,119,6,0.55)]"
                        : "border-border bg-accent/40 hover:border-primary/25 hover:bg-accent/70"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                        selectedConfigPart.id === p.id ? "bg-primary text-primary-foreground" : "bg-background text-primary"
                      }`}
                    >
                      <p.icon size={22} />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-foreground">{p.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">{p.summary}</span>
                    </div>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selectedConfigPart.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-8 overflow-hidden rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-background via-background to-primary/[0.05]"
                >
                  <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)] md:p-8">
                    <div>
                      <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-primary/15 bg-primary/[0.08] px-4 py-2 text-sm font-medium text-foreground">
                        <selectedConfigPart.icon size={16} className="text-primary" />
                        {selectedConfigPart.label}
                      </div>
                      <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                        {selectedConfigPart.description}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-card/80 p-5">
                      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        На что влияет
                      </p>
                      <div className="space-y-3">
                        {selectedConfigPart.points.map((point) => (
                          <div key={point} className="flex items-start gap-3">
                            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                            <span className="text-sm leading-6 text-foreground">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Цена обновляется в реальном времени", "Проверка совместимости", "Подбор под игру и бюджет", "Подбор под рабочие задачи", "Подбор под локальный ИИ"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground border border-border">{t}</span>
                ))}
              </div>
              <Link
                href="/configurator"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Открыть полный конфигуратор <ChevronRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FPS СЕКЦИЯ */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Видно не только по характеристикам.
                <br />
                <span className="gradient-text">Видно в реальных задачах.</span>
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                Ориентируйся не только на список комплектующих, но и на ожидаемую производительность в современных играх и рабочих программах. Ниже показаны не абстрактные цифры, а ориентиры для конкретных классов конфигураций.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="mb-8 flex justify-center">
              <div className="inline-flex flex-wrap justify-center gap-2 rounded-2xl border border-border bg-card p-2">
                {performanceModes.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setActivePerformanceMode(mode)}
                    className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                      activePerformanceMode === mode
                        ? "bg-primary text-primary-foreground shadow-[0_16px_35px_-24px_rgba(217,119,6,0.55)]"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-border bg-card">
              <div className="hidden border-b border-border bg-background/70 px-6 py-4 lg:grid lg:grid-cols-[220px_repeat(3,minmax(0,1fr))]">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Сравнение профилей
                </div>
                {performanceProfiles.map((profile) => {
                  const build = catalogBuilds.find((item) => item.id === profile.buildId) ?? catalogBuilds[0];
                  const isActive = profile.mode === activePerformanceMode;
                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => setActivePerformanceMode(profile.mode)}
                      className={`rounded-2xl px-4 py-3 text-left transition-colors ${
                        isActive ? "bg-primary/[0.08]" : "hover:bg-background"
                      }`}
                    >
                      <p className="text-sm font-semibold text-foreground">{profile.mode}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{build.name}</p>
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-[220px_repeat(3,minmax(0,1fr))]">
                {[
                  {
                    label: "Сборка из каталога",
                    getValue: (profile: PerformanceProfile) =>
                      (catalogBuilds.find((build) => build.id === profile.buildId) ?? catalogBuilds[0]).name,
                  },
                  {
                    label: "Видеокарта",
                    getValue: (profile: PerformanceProfile) => profile.config.gpu,
                  },
                  {
                    label: "Процессор",
                    getValue: (profile: PerformanceProfile) => profile.config.cpu,
                  },
                  {
                    label: "ОЗУ",
                    getValue: (profile: PerformanceProfile) => profile.config.ram,
                  },
                  {
                    label: "Накопитель",
                    getValue: (profile: PerformanceProfile) => profile.config.storage,
                  },
                  {
                    label: "1440p ориентир",
                    getValue: (profile: PerformanceProfile) => profile.fps[1].value,
                  },
                  {
                    label: "4K ориентир",
                    getValue: (profile: PerformanceProfile) => profile.fps[2].value,
                  },
                ].map((row, rowIndex) => (
                  <div key={row.label} className="contents">
                    <div
                      className={`border-b border-border px-6 py-4 text-sm font-medium text-muted-foreground ${
                        rowIndex === 0 ? "bg-background/70" : "bg-background/50"
                      }`}
                    >
                      {row.label}
                    </div>
                    {performanceProfiles.map((profile) => {
                      const isActive = profile.mode === activePerformanceMode;
                      return (
                        <button
                          key={`${row.label}-${profile.id}`}
                          type="button"
                          onClick={() => setActivePerformanceMode(profile.mode)}
                          className={`border-b border-border px-6 py-4 text-left text-sm transition-colors ${
                            isActive ? "bg-primary/[0.07] text-foreground" : "text-muted-foreground hover:bg-background/60"
                          }`}
                        >
                          {row.getValue(profile)}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedPerformanceProfile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]"
            >
              <div className="rounded-[1.75rem] border border-border bg-card p-6 md:p-8">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-primary/20 bg-primary/[0.08] px-4 py-2 text-sm font-medium text-foreground">
                    {selectedPerformanceProfile.mode}
                  </span>
                  <span className="text-sm text-muted-foreground">Привязано к реальной сборке из каталога</span>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{selectedPerformanceProfile.title}</h3>
                <p className="mt-2 text-base text-muted-foreground">{selectedPerformanceProfile.subtitle}</p>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                  {selectedPerformanceProfile.description}
                </p>
                <div className="mt-6 rounded-2xl border border-border bg-background/70 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Сборка из каталога</p>
                      <p className="mt-2 text-xl font-semibold text-foreground">{selectedCatalogBuild.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{selectedCatalogBuild.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Стоимость</p>
                      <p className="mt-2 text-2xl font-mono-spec font-bold text-primary">
                        {formatCatalogPrice(selectedCatalogBuild.price)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      { label: "Видеокарта", value: selectedCatalogBuild.gpu },
                      { label: "Процессор", value: selectedCatalogBuild.cpu },
                      { label: "Оперативная память", value: selectedCatalogBuild.ram },
                      { label: "Накопитель", value: selectedCatalogBuild.ssd },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-border bg-card p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                        <p className="mt-2 text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/build/${selectedCatalogBuild.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Открыть сборку <ChevronRight size={16} />
                    </Link>
                    <Link
                      href="/catalog"
                      className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                    >
                      Смотреть каталог
                    </Link>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {selectedPerformanceProfile.fps.map((resolution) => (
                  <div key={resolution.label} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{resolution.label}</p>
                        <p className="mt-3 text-4xl font-mono-spec font-bold text-primary">{resolution.value}</p>
                        <p className="mt-1 text-xs text-muted-foreground">FPS</p>
                      </div>
                      <div className="h-20 w-20 rounded-full border border-primary/20 bg-primary/[0.08] p-2">
                        <div className="flex h-full items-center justify-center rounded-full border border-primary/20 bg-background text-center text-xs font-semibold text-foreground">
                          {resolution.label.replace(" ", "\n")}
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">{resolution.note}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-4xl md:text-5xl font-display text-foreground">Игры</h2>
                <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                  Ориентиры по играм для профиля <span className="text-foreground">{selectedPerformanceProfile.title}</span>.
                </p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <div className="flex flex-wrap gap-2">
              {games.map((g, i) => (
                <button
                  key={g}
                  onClick={() => setFpsGame(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    fpsGame === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedGameInsight.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 rounded-[1.6rem] border border-border bg-card p-6"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Конфигуратор по игре
                    </p>
                    <h4 className="mt-3 text-2xl font-semibold text-foreground">{selectedGameInsight.name}</h4>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">
                      {selectedGameInsight.summary}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {selectedGameInsight.fit}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/70 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      На что опирается сборка
                    </p>
                    <div className="mt-4 space-y-3">
                      {selectedGameInsight.needs.map((need) => (
                        <div key={need} className="flex items-start gap-3">
                          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                          <span className="text-sm leading-6 text-foreground">{need}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        { label: "GPU", value: selectedCatalogBuild.gpu },
                        { label: "CPU", value: selectedCatalogBuild.cpu },
                        { label: "RAM", value: selectedCatalogBuild.ram },
                        { label: "SSD", value: selectedCatalogBuild.ssd },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-border bg-card p-4">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                          <p className="mt-2 text-sm font-medium text-foreground">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>
          <AnimatedSection delay={0.16}>
            <div className="mt-6 rounded-[1.75rem] border border-border bg-card p-6 md:p-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Сценарий по игре
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground">{games[fpsGame]}</h3>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    Для <span className="text-foreground">{games[fpsGame]}</span> ориентир берётся по профилю{" "}
                    <span className="text-foreground">{selectedPerformanceProfile.title}</span>.{" "}
                    {selectedPerformanceProfile.settingsNote}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {selectedPerformanceProfile.fps.map((resolution) => (
                    <div key={resolution.label} className="rounded-2xl border border-border bg-background/70 p-5 text-center">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{resolution.label}</p>
                      <p className="mt-3 text-3xl font-mono-spec font-bold text-primary">{resolution.value}</p>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{resolution.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-4xl md:text-5xl font-display text-foreground">Программы</h2>
                <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                  Рабочие ориентиры для профиля <span className="text-foreground">{selectedPerformanceProfile.title}</span>.
                </p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <div className="flex flex-wrap gap-2 mb-6">
              {programs.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActiveProgram(p)}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-all ${
                    activeProgram === p
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:border-primary/25 hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedProgramInsight.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[1.6rem] border border-border bg-background/60 p-6"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Конфигуратор по программе
                    </p>
                    <h4 className="mt-3 text-2xl font-semibold text-foreground">{selectedProgramInsight.name}</h4>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">
                      {selectedProgramInsight.summary}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {selectedProgramInsight.fit}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      На что опирается сборка
                    </p>
                    <div className="mt-4 space-y-3">
                      {selectedProgramInsight.needs.map((need) => (
                        <div key={need} className="flex items-start gap-3">
                          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                          <span className="text-sm leading-6 text-foreground">{need}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        { label: "GPU", value: selectedCatalogBuild.gpu },
                        { label: "CPU", value: selectedCatalogBuild.cpu },
                        { label: "RAM", value: selectedCatalogBuild.ram },
                        { label: "SSD", value: selectedCatalogBuild.ssd },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-border bg-background/80 p-4">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                          <p className="mt-2 text-sm font-medium text-foreground">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>
          <AnimatedSection delay={0.16}>
            <div className="mt-6 mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {selectedPerformanceProfile.workflowHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
                  <h4 className="text-base font-semibold text-foreground">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic">
              Показатели FPS и производительности являются ориентировочными и зависят от настроек, разрешения, сцены нагрузки, версии ПО и конкретной конфигурации.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ИИ И ТЯЖЁЛЫЕ ЗАДАЧИ */}
      <section className="section-padding bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }} />
        <div className="container mx-auto px-4 relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Не только игры.
                <br />
                <span className="gradient-text">Система для реальной тяжёлой работы.</span>
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                Подберём конфигурацию для запуска локальных моделей, генерации изображений, разработки ИИ-агентов, работы с Python-стеком, контейнерами, рендером, 3D, монтажом, симуляциями и многозадачными окружениями.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(150px,auto)]">
            {aiCards.map((card, i) => (
              <AnimatedItem key={i} delay={i * 0.06}>
                <div
                  className={`group relative h-full overflow-hidden rounded-[1.6rem] border border-border bg-card p-6 shadow-card-hover ${card.className}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-90`} />
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-primary/10 bg-primary/[0.05] transition-transform duration-700 group-hover:scale-125" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="mb-8 inline-flex w-fit rounded-full border border-primary/15 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      Сценарий
                    </div>
                    <div>
                      <h3 className="max-w-[24rem] text-xl font-semibold leading-tight text-foreground">
                        {card.title}
                      </h3>
                      <p className="mt-3 max-w-[30rem] text-sm leading-6 text-muted-foreground">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ГОТОВЫЕ СБОРКИ */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Готовые сборки, с которых можно начать.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Подобрали популярные конфигурации под разный бюджет и задачи. Можно выбрать готовый вариант или использовать его как основу для своей кастомной сборки.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {builds.map((b, i) => (
              <AnimatedItem key={i} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-[1.6rem] border border-border bg-card p-6 shadow-card-hover">
                  <div className="mb-5 min-h-[132px]">
                    <span className="inline-flex rounded-full border border-primary/15 bg-primary/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      Готовая сборка
                    </span>
                    <h3 className="mt-4 text-lg font-semibold leading-tight text-foreground">{b.tier}</h3>
                    <p className="mt-3 text-2xl font-bold text-primary font-mono-spec">{b.price}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{b.desc}</p>
                  </div>
                  <div className="mb-6 rounded-2xl border border-border bg-background/60 p-4">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Конфигурация
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {b.specs.split(" • ").map((spec) => (
                        <span
                          key={spec}
                          className="rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-mono-spec text-muted-foreground"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto grid grid-cols-1 gap-2">
                    <Link href="/catalog" className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                      Подробнее
                    </Link>
                    <Link href="/configurator" className="flex-1 rounded-xl border border-border bg-background/50 px-4 py-2.5 text-center text-sm font-medium text-muted-foreground transition-colors hover:border-primary/20 hover:bg-accent hover:text-foreground">
                      Кастомизировать
                    </Link>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ЦЕНЫ */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Понятные цены.
                <br />
                <span className="gradient-text">Честный подбор.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Стоимость зависит от задач, комплектующих и уровня производительности. Мы не перегружаем сборку лишним, а подбираем то, что действительно даёт результат.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Базовые игровые", price: "85 000 — 120 000 ₽", desc: "Для уверенного старта и популярных игр" },
              { title: "Продвинутые игровые", price: "130 000 — 200 000 ₽", desc: "Для высоких настроек и запаса по мощности" },
              { title: "Премиальные сборки", price: "200 000 — 400 000 ₽", desc: "Для максимального FPS и флагманского железа" },
              { title: "Рабочие станции и ИИ", price: "от 350 000 ₽", desc: "Для локальных моделей, рендера и тяжёлых вычислений" },
            ].map((p, i) => (
              <AnimatedItem key={i} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card-hover text-center h-full flex flex-col">
                  <h3 className="font-semibold text-lg text-foreground mb-2">{p.title}</h3>
                  <p className="text-xl font-bold text-primary font-mono-spec mb-3">{p.price}</p>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
          <AnimatedSection delay={0.3}>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Можно собрать ПК под конкретный бюджет или подобрать лучший вариант в нужном диапазоне стоимости.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* БРЕНДЫ */}
      <section className="section-padding overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Работаем с лучшими брендами индустрии.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Используем современные комплектующие и проверенные решения от ведущих производителей.
              </p>
            </div>
          </AnimatedSection>
        </div>
        <div className="relative overflow-hidden py-6">
          <div className="marquee-track">
            {[...brands, ...brands].map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 mx-2 rounded-xl bg-card border border-border text-muted-foreground font-semibold text-sm whitespace-nowrap hover:text-primary hover:border-primary/30 transition-colors"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОЦЕСС */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Как рождается твой ПК.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Каждая сборка проходит путь от подбора комплектующих до финального тестирования.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((s, i) => (
              <AnimatedItem key={i} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card-hover h-full">
                  <span className="text-3xl font-mono-spec font-bold text-primary/30">{s.num}</span>
                  <h3 className="font-semibold text-lg text-foreground mt-2 mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ВНЕШНИЙ ВИД */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Снаружи — эффектно.
                <br />
                <span className="gradient-text">Внутри — безупречно.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Красивый ПК — это не только RGB. Это чистая архитектура сборки, правильный корпус, аккуратная укладка кабелей, продуманное охлаждение и ощущение цельного премиального продукта.
              </p>
            </div>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {["RGB и подсветка", "Минималистичные сборки", "Белые и чёрные конфигурации", "Корпуса под любой стиль", "Чистый внутренний вид"].map((t, i) => (
              <AnimatedItem key={i} delay={i * 0.06}>
                <span className="px-6 py-3 rounded-xl bg-card border border-border text-foreground font-medium shadow-card-hover inline-block">
                  {t}
                </span>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-display text-center mb-12">Почему выбирают нас.</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {advantages.map((a, i) => (
              <AnimatedItem key={i} delay={i * 0.05}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                  <Check size={18} className="text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">{a}</span>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">Что говорят клиенты.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Для нас важен не только момент покупки, но и то, какое впечатление остаётся после первого запуска, первых игр и первых рабочих проектов.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reviews.map((r, i) => (
              <AnimatedItem key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card-hover h-full">
                  <Quote size={24} className="text-primary/30 mb-3" />
                  <p className="text-foreground mb-4 italic">«{r.text}»</p>
                  <p className="text-sm text-muted-foreground font-medium">— {r.author}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-card/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-display text-center mb-12">Частые вопросы.</h2>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((faq, i) => (
              <AnimatedItem key={i} delay={i * 0.05}>
                <div className="rounded-xl bg-card border border-border overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center gap-4"
                  >
                    <span className="font-medium text-foreground">{faq.q}</span>
                    <ChevronRight
                      size={18}
                      className={`text-muted-foreground shrink-0 transition-transform duration-300 ${
                        activeFaq === i ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4 text-muted-foreground text-sm">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* ФИНАЛЬНЫЙ CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 relative text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">
              Собери ПК, который будет
              <br />
              <span className="gradient-text">работать на тебя.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-10">
              От идеи до готовой системы — поможем подобрать, собрать и настроить компьютер, который действительно соответствует твоим задачам, бюджету и ожиданиям.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/configurator"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base sm:text-lg hover:opacity-90 transition-all glow-primary"
              >
                Начать сборку <ArrowRight size={20} />
              </Link>
              <Link
                href="/contacts"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl glass-surface font-semibold text-base sm:text-lg text-foreground hover:bg-accent transition-all"
              >
                Получить консультацию
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
