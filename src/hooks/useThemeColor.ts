import { Themes } from '#/constants/Colors';
import { useAppColorScheme } from '#/context/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Themes.light & keyof typeof Themes.dark
) {
  const scheme = useAppColorScheme() ?? 'light';
  const colorFromProps = props[scheme];
  return colorFromProps ?? Themes[scheme][colorName];
}
