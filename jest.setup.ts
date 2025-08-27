/// <reference types="jest" />
// Matchers básicos já inclusos no @testing-library/react-native >=12.4

// Mock Appearance for deterministic theme
jest.mock('react-native/Libraries/Utilities/Appearance', () => ({
  getColorScheme: () => 'light',
  addChangeListener: () => ({ remove: () => {} }),
}));

// Silence React Native reanimated warning if appears
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
// Navigation & other native mocks
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
    useRoute: () => ({ params: {} }),
  } as any;
});

jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  return { LinearGradient: ({ children }: any) => React.createElement('View', {}, children) };
});
