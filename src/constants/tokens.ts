export const space = {
  _2xs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  _2xl: 24,
  _3xl: 28,
  _4xl: 32,
  _5xl: 40,
} as const

export const fontSize = {
  _2xs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  _2xl: 22,
  _3xl: 26,
  _4xl: 32,
  _5xl: 40,
} as const

export const lineHeight = {
  none: 1,
  normal: 1.5,
  relaxed: 1.625,
} as const

export const borderRadius = {
  _2xs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
} as const

export const fontWeight = {
  normal: '400',
  semiBold: '600',
  bold: '800',
} as const

// Gradientes do DSC da caixa
export const gradients = {
  lime: {
    values: [
      [0, '#005CA9'],
      [0.6, '#54BBAB'],
      [1, '#AFCA0B'],
    ],
  },
  summer: {
    values: [
      [0, '#54BBAB'],
      [1, '#F9B000'],
    ],
  },
} as const