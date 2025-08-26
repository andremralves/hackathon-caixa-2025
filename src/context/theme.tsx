import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type Scheme = Exclude<ColorSchemeName, null>;

type ThemeState = {
  scheme: Scheme; // effective (considering override)
  system: Scheme; // current system setting
  override: Scheme | 'system';
  toggle: () => void; // toggles between light/dark, ignoring system
  setOverride: (v: Scheme | 'system') => void;
};

const ThemeContext = createContext<ThemeState | undefined>(undefined);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [system, setSystem] = useState<Scheme>(Appearance.getColorScheme() ?? 'light');
  const [override, setOverride] = useState<Scheme | 'system'>('system');

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) setSystem(colorScheme);
    });
    return () => sub.remove();
  }, []);

  const scheme: Scheme = override === 'system' ? system : override;

  const value = useMemo<ThemeState>(
    () => ({
      scheme,
      system,
      override,
      // Toggle behavior:
      // 1. If currently following system (override==='system'), switch to the opposite of system immediately.
      // 2. If currently forced dark -> go light.
      // 3. If currently forced light -> go back to system (so users can re-sync with OS).
      toggle: () =>
        setOverride((prev) => {
          if (prev === 'system') return system === 'dark' ? 'light' : 'dark';
          if (prev === 'dark') return 'light';
          // prev === 'light'
          return 'system';
        }),
      setOverride,
    }),
    [scheme, system, override]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within AppThemeProvider');
  return ctx;
}

export function useAppColorScheme(): Scheme {
  return useAppTheme().scheme;
}
