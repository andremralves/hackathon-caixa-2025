/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

/*
  Referencia: design system da CAIXA
*/
/* Paleta Fixa */
export const caixaFixedPalette = {
  white: '#ffffff',
  black: '#000000',

  /* Paleta Primaria */
  primary_10: '#E5F1FC',
  primary_30: '#A0D2FC',
  primary_50: '#6DBAFA',
  primary_70: '#2D8AD8',
  primary_90: '#005CA9', // tom original
  primary_110: '#00437A',
  primary_130: '#002A4D',

  /* Paleta Secundária */
  secondary_10: '#ffefd6',
  secondary_30: '#ffd392',
  secondary_50: '#fdb548',
  secondary_70: '#f39200', // tom original
  secondary_90: '#d87b00',
  secondary_110: '#a65e00',
  secondary_130: '#663a00',

  /* Paleta Terciaria */
  tertiary_10: '#e4f7f4',
  tertiary_30: '#b9ebe3',
  tertiary_50: '#81d6c8',
  tertiary_70: '#54bbab', // tom original
  tertiary_90: '#359485',
  tertiary_110: '#216e62',
  tertiary_130: '#03453b',

  /* Paleta Grayscale*/
  grayscale_10: '#f7fafa',
  grayscale_30: '#ebf1f2',
  grayscale_50: '#d0e0e3', // tom original
  grayscale_70: '#9eb2b8',
  grayscale_90: '#64747a',
  grayscale_110: '#404b52',
  grayscale_130: '#22292e',
  grayscale_white: '#ffffff',
};

/* Paleta Flexivel */
export const caixaFlexiblePalette = {
  /* Paleta Ceu */
  sky_10: '#d0f5ff',
  sky_30: '#6edbfa',
  sky_50: '#2ec8f3',
  sky_70: '#00b4e6', // tom original
  sky_90: '#008cb2',
  sky_110: '#006480',
  sky_130: '#003c4d',

  /* Palete Uva */
  grape_10: '#f8eaf3',
  grape_30: '#eac9de',
  grape_50: '#ce97bb',
  grape_70: '#b26f9b', // tom original
  grape_90: '#93537d',
  grape_110: '#753c61',
  grape_130: '#4f213f',

  /* Paleta Limao*/
  lime_10: '#f5fec1',
  lime_30: '#def06d',
  lime_50: '#c5de31',
  lime_70: '#afca0b', // tom original
  lime_90: '#99b103',
  lime_110: '#6d8000',
  lime_130: '#465200',

  /* Paleta Tangerina*/
  tangerine_10: '#fff3d6',
  tangerine_30: '#fcdd92',
  tangerine_50: '#fac546',
  tangerine_70: '#f9b000',
  tangerine_90: '#d19400',
  tangerine_110: '#996c00',
  tangerine_130: '#664800',

  /* Paleta Goiaba */
  guava_10: '#ffeae5',
  guava_30: '#fcbdb0',
  guava_50: '#f79481',
  guava_70: '#ef765e',
  guava_90: '#d8583f',
  guava_110: '#b23820',
  guava_130: '#801905'
};

export const Themes = {
  light: {
  // Core brand
  primary: caixaFixedPalette.primary_90,
  primaryHover: caixaFixedPalette.primary_70,
  primaryActive: caixaFixedPalette.primary_110,
  primarySubtle: caixaFixedPalette.primary_10,
  secondary: caixaFixedPalette.secondary_70,
  accent: caixaFlexiblePalette.sky_70,

  // Background & surfaces
  background: caixaFixedPalette.grayscale_white,
  foreground: caixaFixedPalette.grayscale_30,
  surface: caixaFixedPalette.grayscale_10,
  surfaceAlt: caixaFixedPalette.grayscale_30,
  elevated: caixaFixedPalette.grayscale_50,
  overlay: 'rgba(0,0,0,0.45)',

  // Text
  text: caixaFixedPalette.grayscale_110,
  textMuted: caixaFixedPalette.grayscale_90,
  textSubtle: caixaFixedPalette.grayscale_90,
  textInverted: caixaFixedPalette.grayscale_white,
  textOnPrimary: caixaFixedPalette.grayscale_white,

  // Borders & separators
  border: caixaFixedPalette.grayscale_30,
  borderStrong: caixaFixedPalette.grayscale_50,
  separator: caixaFixedPalette.grayscale_30,

  // Status / feedback
  //success: caixaFixedPalette.tertiary_70,
  //successBg: caixaFixedPalette.tertiary_10,
  //warning: caixaFlexiblePalette.tangerine_70,
  //warningBg: caixaFlexiblePalette.tangerine_10,
  //danger: caixaFlexiblePalette.guava_70,
  //dangerBg: caixaFlexiblePalette.guava_10,
  //info: caixaFlexiblePalette.sky_70,
  //infoBg: caixaFlexiblePalette.sky_10,

  // Special
  focusRing: caixaFixedPalette.primary_50,
  highlight: caixaFlexiblePalette.sky_30,
  selection: caixaFixedPalette.primary_30,

  // Components
  buttonPrimaryBg: caixaFixedPalette.primary_90,
  buttonPrimaryText: caixaFixedPalette.grayscale_white,
  badgeBg: caixaFixedPalette.primary_10,
  badgeText: caixaFixedPalette.primary_90,
  },
  dark: {
  // Core brand (slightly shifted to lighter mids for contrast)
  primary: caixaFixedPalette.primary_70,
  primaryHover: caixaFixedPalette.primary_50,
  primaryActive: caixaFixedPalette.primary_90,
  primarySubtle: caixaFixedPalette.primary_110,
  secondary: caixaFixedPalette.secondary_70,
  accent: caixaFlexiblePalette.sky_50,

  // Background & surfaces
  background: caixaFixedPalette.black, // pure black
  foreground: caixaFixedPalette.grayscale_130,
  surface: caixaFixedPalette.black,
  surfaceAlt: caixaFixedPalette.grayscale_90,
  elevated: caixaFixedPalette.grayscale_70,
  overlay: 'rgba(0,0,0,0.6)',

  // Text
  text: caixaFixedPalette.grayscale_10,
  textMuted: caixaFixedPalette.grayscale_70,
  textSubtle: caixaFixedPalette.grayscale_70,
  textInverted: caixaFixedPalette.grayscale_130,
  textOnPrimary: caixaFixedPalette.grayscale_white,

  // Borders & separators
  border: caixaFixedPalette.grayscale_130,
  borderStrong: caixaFixedPalette.grayscale_130,
  separator: caixaFixedPalette.grayscale_90,

  // Status / feedback (shift toward mid tones for dark bg legibility)
  //success: caixaFixedPalette.tertiary_50,
  //successBg: caixaFixedPalette.tertiary_110,
  //warning: caixaFlexiblePalette.tangerine_50,
  //warningBg: caixaFlexiblePalette.tangerine_110,
  //danger: caixaFlexiblePalette.guava_50,
  //dangerBg: caixaFlexiblePalette.guava_110,
  //info: caixaFlexiblePalette.sky_50,
  //infoBg: caixaFlexiblePalette.sky_110,

  // Special
  focusRing: caixaFixedPalette.primary_50,
  highlight: caixaFlexiblePalette.sky_30,
  selection: caixaFixedPalette.primary_70,

  // Components
  buttonPrimaryBg: caixaFixedPalette.primary_70,
  buttonPrimaryText: caixaFixedPalette.grayscale_white,
  badgeBg: caixaFixedPalette.primary_110,
  badgeText: caixaFixedPalette.primary_30,
  },
};
