import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppThemeProvider } from '#/context/theme';
import GradientButton from '#/components/GradientButton';

describe('GradientButton', () => {
  it('renderiza título', () => {
    const { getByText } = render(<AppThemeProvider><GradientButton title="Contratar" /></AppThemeProvider>);
    expect(getByText('Contratar')).toBeTruthy();
  });
  it('trigger onPress', () => {
    const fn = jest.fn();
    const { getByRole } = render(<AppThemeProvider><GradientButton title="OK" onPress={fn} /></AppThemeProvider>);
    fireEvent.press(getByRole('button'));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
