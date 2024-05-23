import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    red: {
      700: '#BF3B44',
      600: '#F3BABD',
      500: '#F4E6E7',
    },
    green: {
      700: '#639339',
      600: '#CBE4B4',
      500: '#E5F0DB',
    },
    gray: {
      700: '#1B1D1E',
      600: '#333638',
      500: '#5C6265',
      400: '#B9BBBC',
      300: '#DDDEDF',
      200: '#EFF0F0',
      100: '#FAFAFA'
    },
    white: '#FFFFFF',
  },
  fonts: {
    heading: 'NunitoSans_700Bold',
    body: 'NunitoSans_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
    33: 148
  }
})