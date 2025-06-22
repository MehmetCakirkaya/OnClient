export const Colors = {
  // Primary colors (Kullanıcının verdiği renkler)
  primary: {
    50: '#FFF2E0',      // En açık
    100: '#FFF2E0',     // Açık krem
    200: '#F5EDD3',     // Daha koyu krem
    300: '#E8DCC0',     // Orta krem
    400: '#C0C9EE',     // Açık mavi-mor
    500: '#A2AADB',     // Orta mavi-mor
    600: '#898AC4',     // Koyu mavi-mor
    700: '#7A7BB8',     // Daha koyu
    800: '#6B6CAC',     // Çok koyu
    900: '#5C5DA0',     // En koyu
  },
  
  // Secondary colors (Uyumlu tonlar)
  secondary: {
    50: '#f8f9ff',
    100: '#eef1ff',
    200: '#e0e7ff',
    300: '#C0C9EE',     // Ana renklerden
    400: '#A2AADB',     // Ana renklerden
    500: '#898AC4',     // Ana renklerden
    600: '#7A7BB8',
    700: '#6B6CAC',
    800: '#5C5DA0',
    900: '#4D4E94',
  },
  
  // Gray colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Status colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#A2AADB',        // Ana renklerden
  
  // Brand colors (Kullanıcının orijinal paleti)
  brand: {
    cream: '#FFF2E0',     // Krem
    lightPurple: '#C0C9EE', // Açık mor-mavi
    mediumPurple: '#A2AADB', // Orta mor-mavi
    darkPurple: '#898AC4',   // Koyu mor-mavi
  },
  
  // Background (Ana renklerle uyumlu)
  background: '#FFF2E0',    // Krem arka plan
  surface: '#ffffff',       // Beyaz yüzeyler
  
  // Text
  text: {
    primary: '#2d2d2d',     // Koyu gri
    secondary: '#6b7280',   // Orta gri
    light: '#9ca3af',       // Açık gri
    onPrimary: '#ffffff',   // Beyaz (renkli arka planlarda)
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

export const Shadows = {
  sm: {
    shadowColor: '#898AC4',  // Ana renklerden
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#898AC4',  // Ana renklerden
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#898AC4',  // Ana renklerden
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#898AC4',  // Ana renklerden
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
}; 