// SensiX Device Catalog & Hardware Specifications (~75 phones & tablets)

export type DeviceBrand =
  | 'Apple'
  | 'Samsung'
  | 'Xiaomi'
  | 'Realme'
  | 'Vivo'
  | 'Oppo'
  | 'Infinix'
  | 'Tecno'
  | 'OnePlus'
  | 'Google'
  | 'Motorola'
  | 'Other';

export interface Device {
  id: string;
  brand: DeviceBrand;
  name: string;
  ram: number;       // in GB
  screen: number;    // diagonal in inches
  hz?: number;       // display refresh rate
}

export const CUSTOM_DEVICE_ID = 'custom';

export const BRANDS: DeviceBrand[] = [
  'Apple',
  'Samsung',
  'Xiaomi',
  'Realme',
  'Vivo',
  'Oppo',
  'Infinix',
  'Tecno',
  'OnePlus',
  'Google',
  'Motorola',
  'Other',
];

export const DEVICES: Device[] = [
  // Apple (10)
  { id: 'iphone-8-plus', brand: 'Apple', name: 'iPhone 8 Plus', ram: 3, screen: 5.5, hz: 60 },
  { id: 'iphone-xr', brand: 'Apple', name: 'iPhone XR', ram: 3, screen: 6.1, hz: 60 },
  { id: 'iphone-11', brand: 'Apple', name: 'iPhone 11', ram: 4, screen: 6.1, hz: 60 },
  { id: 'iphone-12', brand: 'Apple', name: 'iPhone 12', ram: 4, screen: 6.1, hz: 60 },
  { id: 'iphone-13', brand: 'Apple', name: 'iPhone 13', ram: 4, screen: 6.1, hz: 60 },
  { id: 'iphone-13-pro-max', brand: 'Apple', name: 'iPhone 13 Pro Max', ram: 6, screen: 6.7, hz: 120 },
  { id: 'iphone-14-pro', brand: 'Apple', name: 'iPhone 14 Pro', ram: 6, screen: 6.1, hz: 120 },
  { id: 'iphone-15', brand: 'Apple', name: 'iPhone 15', ram: 6, screen: 6.1, hz: 60 },
  { id: 'iphone-15-pm', brand: 'Apple', name: 'iPhone 15 Pro Max', ram: 8, screen: 6.7, hz: 120 },
  { id: 'ipad-9', brand: 'Apple', name: 'iPad (9th Gen)', ram: 3, screen: 10.2, hz: 60 },
  { id: 'ipad-10', brand: 'Apple', name: 'iPad (10th Gen)', ram: 4, screen: 10.9, hz: 60 },
  { id: 'ipad-air-5', brand: 'Apple', name: 'iPad Air (5th Gen)', ram: 8, screen: 10.9, hz: 60 },
  { id: 'ipad-pro-11', brand: 'Apple', name: 'iPad Pro 11"', ram: 8, screen: 11.0, hz: 120 },

  // Samsung (12)
  { id: 'samsung-a04', brand: 'Samsung', name: 'Galaxy A04', ram: 3, screen: 6.5, hz: 60 },
  { id: 'samsung-a12', brand: 'Samsung', name: 'Galaxy A12', ram: 4, screen: 6.5, hz: 60 },
  { id: 'samsung-a14', brand: 'Samsung', name: 'Galaxy A14', ram: 4, screen: 6.6, hz: 90 },
  { id: 'samsung-a24', brand: 'Samsung', name: 'Galaxy A24', ram: 6, screen: 6.5, hz: 90 },
  { id: 'samsung-a34', brand: 'Samsung', name: 'Galaxy A34 5G', ram: 6, screen: 6.6, hz: 120 },
  { id: 'samsung-a54', brand: 'Samsung', name: 'Galaxy A54 5G', ram: 8, screen: 6.4, hz: 120 },
  { id: 'samsung-a55', brand: 'Samsung', name: 'Galaxy A55 5G', ram: 8, screen: 6.6, hz: 120 },
  { id: 'samsung-s20-fe', brand: 'Samsung', name: 'Galaxy S20 FE', ram: 6, screen: 6.5, hz: 120 },
  { id: 'samsung-s21-fe', brand: 'Samsung', name: 'Galaxy S21 FE', ram: 8, screen: 6.4, hz: 120 },
  { id: 'samsung-s23', brand: 'Samsung', name: 'Galaxy S23', ram: 8, screen: 6.1, hz: 120 },
  { id: 'samsung-s23-ultra', brand: 'Samsung', name: 'Galaxy S23 Ultra', ram: 12, screen: 6.8, hz: 120 },
  { id: 'samsung-s24-ultra', brand: 'Samsung', name: 'Galaxy S24 Ultra', ram: 12, screen: 6.8, hz: 120 },
  { id: 'samsung-tab-a9', brand: 'Samsung', name: 'Galaxy Tab A9+', ram: 8, screen: 11.0, hz: 90 },

  // Xiaomi, Redmi & Poco (12)
  { id: 'redmi-9a', brand: 'Xiaomi', name: 'Redmi 9A', ram: 2, screen: 6.53, hz: 60 },
  { id: 'redmi-10c', brand: 'Xiaomi', name: 'Redmi 10C', ram: 4, screen: 6.71, hz: 60 },
  { id: 'redmi-12', brand: 'Xiaomi', name: 'Redmi 12', ram: 6, screen: 6.79, hz: 90 },
  { id: 'redmi-13c', brand: 'Xiaomi', name: 'Redmi 13C', ram: 6, screen: 6.74, hz: 90 },
  { id: 'redmi-note-11', brand: 'Xiaomi', name: 'Redmi Note 11', ram: 4, screen: 6.43, hz: 90 },
  { id: 'redmi-note-12', brand: 'Xiaomi', name: 'Redmi Note 12', ram: 6, screen: 6.67, hz: 120 },
  { id: 'redmi-note-13-pro', brand: 'Xiaomi', name: 'Redmi Note 13 Pro', ram: 8, screen: 6.67, hz: 120 },
  { id: 'poco-m5', brand: 'Xiaomi', name: 'Poco M5', ram: 4, screen: 6.58, hz: 90 },
  { id: 'poco-x3-pro', brand: 'Xiaomi', name: 'Poco X3 Pro', ram: 6, screen: 6.67, hz: 120 },
  { id: 'poco-x5-pro', brand: 'Xiaomi', name: 'Poco X5 Pro', ram: 8, screen: 6.67, hz: 120 },
  { id: 'poco-x6-pro', brand: 'Xiaomi', name: 'Poco X6 Pro', ram: 8, screen: 6.67, hz: 120 },
  { id: 'poco-f5', brand: 'Xiaomi', name: 'Poco F5', ram: 8, screen: 6.67, hz: 120 },

  // Realme (8)
  { id: 'realme-c33', brand: 'Realme', name: 'Realme C33', ram: 4, screen: 6.5, hz: 60 },
  { id: 'realme-c53', brand: 'Realme', name: 'Realme C53', ram: 6, screen: 6.74, hz: 90 },
  { id: 'realme-c55', brand: 'Realme', name: 'Realme C55', ram: 6, screen: 6.72, hz: 90 },
  { id: 'realme-narzo-50', brand: 'Realme', name: 'Realme Narzo 50', ram: 4, screen: 6.6, hz: 120 },
  { id: 'realme-narzo-60', brand: 'Realme', name: 'Realme Narzo 60 5G', ram: 8, screen: 6.43, hz: 90 },
  { id: 'realme-10-pro', brand: 'Realme', name: 'Realme 10 Pro', ram: 8, screen: 6.72, hz: 120 },
  { id: 'realme-11-pro', brand: 'Realme', name: 'Realme 11 Pro 5G', ram: 8, screen: 6.7, hz: 120 },
  { id: 'realme-gt-neo-3', brand: 'Realme', name: 'Realme GT Neo 3', ram: 12, screen: 6.7, hz: 120 },

  // Vivo (6)
  { id: 'vivo-y16', brand: 'Vivo', name: 'Vivo Y16', ram: 4, screen: 6.51, hz: 60 },
  { id: 'vivo-y21', brand: 'Vivo', name: 'Vivo Y21', ram: 4, screen: 6.51, hz: 60 },
  { id: 'vivo-y35', brand: 'Vivo', name: 'Vivo Y35', ram: 8, screen: 6.58, hz: 90 },
  { id: 'vivo-t2-5g', brand: 'Vivo', name: 'Vivo T2 5G', ram: 6, screen: 6.38, hz: 90 },
  { id: 'vivo-v27', brand: 'Vivo', name: 'Vivo V27 5G', ram: 8, screen: 6.78, hz: 120 },
  { id: 'vivo-v29', brand: 'Vivo', name: 'Vivo V29 5G', ram: 8, screen: 6.78, hz: 120 },

  // Oppo (6)
  { id: 'oppo-a17', brand: 'Oppo', name: 'Oppo A17', ram: 4, screen: 6.56, hz: 60 },
  { id: 'oppo-a57', brand: 'Oppo', name: 'Oppo A57', ram: 4, screen: 6.56, hz: 60 },
  { id: 'oppo-a78', brand: 'Oppo', name: 'Oppo A78 4G', ram: 8, screen: 6.43, hz: 90 },
  { id: 'oppo-reno-8', brand: 'Oppo', name: 'Oppo Reno 8 5G', ram: 8, screen: 6.43, hz: 90 },
  { id: 'oppo-reno-10', brand: 'Oppo', name: 'Oppo Reno 10', ram: 8, screen: 6.7, hz: 120 },
  { id: 'oppo-find-x5', brand: 'Oppo', name: 'Oppo Find X5 Pro', ram: 12, screen: 6.7, hz: 120 },

  // Infinix (6)
  { id: 'infinix-smart-7', brand: 'Infinix', name: 'Infinix Smart 7', ram: 3, screen: 6.6, hz: 60 },
  { id: 'infinix-hot-12', brand: 'Infinix', name: 'Infinix Hot 12 Play', ram: 4, screen: 6.82, hz: 90 },
  { id: 'infinix-hot-30', brand: 'Infinix', name: 'Infinix Hot 30', ram: 8, screen: 6.78, hz: 90 },
  { id: 'infinix-note-30', brand: 'Infinix', name: 'Infinix Note 30 5G', ram: 8, screen: 6.78, hz: 120 },
  { id: 'infinix-hot-40-pro', brand: 'Infinix', name: 'Infinix Hot 40 Pro', ram: 8, screen: 6.78, hz: 120 },
  { id: 'infinix-gt-10-pro', brand: 'Infinix', name: 'Infinix GT 10 Pro', ram: 8, screen: 6.67, hz: 120 },

  // Tecno (including Pop 5 Pro) (6)
  { id: 'tecno-pop-5-pro', brand: 'Tecno', name: 'Tecno Pop 5 Pro', ram: 3, screen: 6.52, hz: 60 },
  { id: 'tecno-spark-8c', brand: 'Tecno', name: 'Tecno Spark 8C', ram: 4, screen: 6.6, hz: 90 },
  { id: 'tecno-spark-10-pro', brand: 'Tecno', name: 'Tecno Spark 10 Pro', ram: 8, screen: 6.8, hz: 90 },
  { id: 'tecno-camon-20', brand: 'Tecno', name: 'Tecno Camon 20', ram: 8, screen: 6.67, hz: 120 },
  { id: 'tecno-pova-5-pro', brand: 'Tecno', name: 'Tecno Pova 5 Pro', ram: 8, screen: 6.78, hz: 120 },
  { id: 'tecno-spark-20-pro', brand: 'Tecno', name: 'Tecno Spark 20 Pro', ram: 8, screen: 6.78, hz: 120 },

  // OnePlus (6)
  { id: 'oneplus-nord-n20', brand: 'OnePlus', name: 'OnePlus Nord N20', ram: 6, screen: 6.43, hz: 60 },
  { id: 'oneplus-nord-ce2', brand: 'OnePlus', name: 'OnePlus Nord CE 2', ram: 8, screen: 6.43, hz: 90 },
  { id: 'oneplus-nord-ce3', brand: 'OnePlus', name: 'OnePlus Nord CE 3 Lite', ram: 8, screen: 6.72, hz: 120 },
  { id: 'oneplus-10t', brand: 'OnePlus', name: 'OnePlus 10T', ram: 12, screen: 6.7, hz: 120 },
  { id: 'oneplus-11', brand: 'OnePlus', name: 'OnePlus 11', ram: 16, screen: 6.7, hz: 120 },
  { id: 'oneplus-12r', brand: 'OnePlus', name: 'OnePlus 12R', ram: 16, screen: 6.78, hz: 120 },

  // Google (4)
  { id: 'google-pixel-6a', brand: 'Google', name: 'Google Pixel 6a', ram: 6, screen: 6.1, hz: 60 },
  { id: 'google-pixel-7', brand: 'Google', name: 'Google Pixel 7', ram: 8, screen: 6.3, hz: 90 },
  { id: 'google-pixel-7a', brand: 'Google', name: 'Google Pixel 7a', ram: 8, screen: 6.1, hz: 90 },
  { id: 'google-pixel-8', brand: 'Google', name: 'Google Pixel 8', ram: 8, screen: 6.2, hz: 120 },

  // Motorola (4)
  { id: 'moto-g22', brand: 'Motorola', name: 'Moto G22', ram: 4, screen: 6.5, hz: 90 },
  { id: 'moto-g54', brand: 'Motorola', name: 'Moto G54 5G', ram: 8, screen: 6.5, hz: 120 },
  { id: 'moto-g84', brand: 'Motorola', name: 'Moto G84 5G', ram: 12, screen: 6.5, hz: 120 },
  { id: 'moto-edge-40', brand: 'Motorola', name: 'Moto Edge 40', ram: 8, screen: 6.55, hz: 144 },
];

export function findDevice(id: string): Device | undefined {
  return DEVICES.find((d) => d.id === id);
}

export function getDevicesByBrand(): Record<DeviceBrand, Device[]> {
  const grouped: Record<DeviceBrand, Device[]> = {
    Apple: [],
    Samsung: [],
    Xiaomi: [],
    Realme: [],
    Vivo: [],
    Oppo: [],
    Infinix: [],
    Tecno: [],
    OnePlus: [],
    Google: [],
    Motorola: [],
    Other: [],
  };

  for (const device of DEVICES) {
    if (grouped[device.brand]) {
      grouped[device.brand].push(device);
    }
  }

  return grouped;
}
