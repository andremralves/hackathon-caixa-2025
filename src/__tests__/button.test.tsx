import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppThemeProvider } from '#/context/theme';
import Button from '#/components/Button';

function renderWithTheme(ui: React.ReactElement) {
  return render(<AppThemeProvider>{ui}</AppThemeProvider>);
}

describe('Button', () => {
  it('renderiza título', () => {
    const { getByText } = renderWithTheme(<Button title="Salvar" />);
    expect(getByText('Salvar')).toBeTruthy();
  });

  it('chama onPress', () => {
    const fn = jest.fn();
    const { getByRole } = renderWithTheme(<Button title="Ok" onPress={fn} />);
    fireEvent.press(getByRole('button'));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('mostra estado disabled', () => {
    const { getByRole } = renderWithTheme(<Button title="X" disabled />);
    const btn = getByRole('button');
    fireEvent.press(btn);
    // não deve quebrar mesmo sem onPress
    expect(btn).toBeTruthy();
  });
});
