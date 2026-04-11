export type ConfigOption = {
  name: string;
  price: number;
};

export type ConfigCategory = {
  label: string;
  options: ConfigOption[];
};

export const pricingSnapshotDate = "2026-04-11";

export const assemblyService = {
  label: "Сборка, кабель-менеджмент и стресс-тесты",
  price: 14990,
};

export const configuratorCategories: ConfigCategory[] = [
  {
    label: "Процессор",
    options: [
      { name: "AMD Ryzen 5 7600X OEM", price: 19540 },
      { name: "AMD Ryzen 7 7800X3D OEM", price: 34360 },
      { name: "AMD Ryzen 9 7950X OEM", price: 57650 },
      { name: "Intel Core Ultra 5 245K OEM", price: 25560 },
      { name: "Intel Core Ultra 7 265K OEM", price: 37090 },
      { name: "Intel Core Ultra 9 285K OEM", price: 63250 },
    ],
  },
  {
    label: "Видеокарта",
    options: [
      { name: "Palit GeForce RTX 4060 Dual 8GB", price: 49130 },
      { name: "MSI GeForce RTX 4070 SUPER 12G Gaming X Slim", price: 80390 },
      { name: "MSI GeForce RTX 5070 Ti Ventus 3X OC 16GB", price: 116420 },
      { name: "Palit GeForce RTX 5080 GamingPro OC 16GB", price: 142540 },
      { name: "Palit GeForce RTX 5090 GameRock 32GB", price: 459990 },
    ],
  },
  {
    label: "Оперативная память",
    options: [
      { name: "Apacer NOX RGB 16GB DDR5-5600", price: 7690 },
      { name: "Silicon Power XPOWER Zenith White 32GB DDR5-6000 (2x16GB)", price: 16490 },
      { name: "G.Skill Ripjaws S5 64GB DDR5-6000 (2x32GB)", price: 89050 },
      { name: "G.Skill Ripjaws S5 128GB DDR5-6000 (2x64GB)", price: 205690 },
    ],
  },
  {
    label: "Накопитель",
    options: [
      { name: "WD Blue SN5000 1TB PCIe 4.0 NVMe", price: 9080 },
      { name: "Samsung 990 EVO Plus 2TB PCIe 4.0 NVMe", price: 28590 },
      { name: "MSI SPATIUM M560 2TB PCIe 5.0 NVMe", price: 39590 },
      { name: "Samsung 990 EVO Plus 4TB PCIe 4.0 NVMe", price: 31370 },
    ],
  },
  {
    label: "Материнская плата",
    options: [
      { name: "MSI B650M Gaming WiFi", price: 19460 },
      { name: "MSI MAG X670E Tomahawk WiFi", price: 43670 },
      { name: "Gigabyte B860M AORUS Elite WiFi6E ICE", price: 31350 },
      { name: "Gigabyte Z890 EAGLE PLUS", price: 33590 },
    ],
  },
  {
    label: "Блок питания",
    options: [
      { name: "MSI MAG A650GL PCIe5 650W 80+ Gold", price: 10070 },
      { name: "be quiet! Pure Power 12 M 850W 80+ Gold", price: 20150 },
      { name: "MSI MAG A1000GL PCIe5 1000W 80+ Gold", price: 24630 },
      { name: "DeepCool PX1200G 1200W 80+ Gold", price: 35830 },
    ],
  },
  {
    label: "Корпус",
    options: [
      { name: "DeepCool CC360 ARGB", price: 6710 },
      { name: "Lian Li Lancool 216 RGB", price: 14550 },
      { name: "Phanteks Enthoo Pro 2 TG", price: 23510 },
      { name: "Cooler Master MasterBox NR200P", price: 14550 },
    ],
  },
  {
    label: "Охлаждение",
    options: [
      { name: "DeepCool AG400", price: 2740 },
      { name: "Thermalright Peerless Assassin 120 SE", price: 5490 },
      { name: "DeepCool LS520 240 мм", price: 9890 },
      { name: "DeepCool LS720 360 мм", price: 14290 },
    ],
  },
];
