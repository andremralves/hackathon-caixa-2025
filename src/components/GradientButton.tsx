import React from 'react';
import { Pressable, StyleProp, ViewStyle, ActivityIndicator, StyleSheet, GestureResponderEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '#/constants/tokens';
import { Txt } from './Txt';
import { useAppColorScheme } from '#/context/theme';
import { Themes } from '#/constants/Colors';

type GradientKey = keyof typeof gradients;

export interface GradientButtonProps {
  title?: string;
  children?: React.ReactNode; // alternative to title
  onPress?: (e: GestureResponderEvent) => void;
  gradient?: GradientKey; // which gradient token to use
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  height?: number;
  roundness?: number; // override default border radius
}

function stopsToLinearProps(key: GradientKey) {
  const g = gradients[key];
  if (!g) return { colors: ['#000', '#000'] as const, locations: [0, 1] as const };
  const colors = g.values.map((tuple: readonly [number, string]) => tuple[1]);
  const locations = g.values.map((tuple: readonly [number, string]) => tuple[0]);
  return { colors: colors as [string, string, ...string[]], locations: locations as [number, number, ...number[]] };
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  children,
  onPress,
  gradient = 'lime',
  disabled,
  loading,
  style,
  fullWidth,
  height = 48,
  roundness = 12,
}) => {
  const schemeRaw = useAppColorScheme();
  const scheme: 'light' | 'dark' = schemeRaw === 'dark' ? 'dark' : 'light';
  const t = Themes[scheme];
  const { colors, locations } = stopsToLinearProps(gradient);

  const content = (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[
        styles.gradient,
        { borderRadius: roundness, height },
        fullWidth && { alignSelf: 'stretch', width: '100%' },
        disabled && { opacity: 0.55 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={t.textOnPrimary} />
      ) : (
        children || (
          <Txt style={[styles.title, { color: t.textOnPrimary }]} numberOfLines={1}>
            {title}
          </Txt>
        )
      )}
    </LinearGradient>
  );

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        { borderRadius: roundness },
        fullWidth && { alignSelf: 'stretch' },
        style,
        pressed && !disabled && !loading && { transform: [{ scale: 0.97 }] },
      ]}
    >
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'flex-start',
  },
  gradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});

