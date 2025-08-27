import React from 'react';
import { Pressable, ActivityIndicator, StyleSheet, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import { Txt } from './Txt';
import { useAppColorScheme } from '#/context/theme';
import { Themes } from '#/constants/Colors';

export type ButtonVariant = 'primary' | 'outline' | 'subtle';

type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  roundness?: number;
  variant?: ButtonVariant;
}

const sizeMap: Record<Size, { height: number; padH: number; font: number }> = {
  sm: { height: 40, padH: 14, font: 14 },
  md: { height: 48, padH: 18, font: 16 },
  lg: { height: 56, padH: 22, font: 18 },
};

function computeStyles(variant: ButtonVariant, t: typeof Themes.light, disabled?: boolean) {
  switch (variant) {
    case 'outline':
      return {
        bg: 'transparent',
        borderWidth: 1.5,
        borderColor: disabled ? t.borderStrong : t.primary,
        text: disabled ? t.textMuted : t.primary,
        bgPressed: t.primarySubtle,
      };
    case 'subtle':
      return {
        bg: t.primarySubtle,
        borderWidth: 0,
        borderColor: 'transparent',
        text: disabled ? t.textMuted : t.primary,
        bgPressed: t.primarySubtle,
      };
    case 'primary':
    default:
      return {
        bg: disabled ? t.primaryHover : t.buttonPrimaryBg,
        borderWidth: 0,
        borderColor: 'transparent',
        text: t.buttonPrimaryText,
        bgPressed: t.primaryHover,
      };
  }
}

export const Button: React.FC<ButtonProps> = ({
  title,
  children,
  onPress,
  disabled,
  loading,
  fullWidth,
  size = 'md',
  style,
  roundness = 12,
  variant = 'primary',
}) => {
  const schemeRaw = useAppColorScheme();
  const scheme: 'light' | 'dark' = schemeRaw === 'dark' ? 'dark' : 'light';
  const t = Themes[scheme];
  const dims = sizeMap[size];
  const v = computeStyles(variant, t, disabled);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: pressed && !disabled && !loading ? v.bgPressed : v.bg,
          borderRadius: roundness,
          minHeight: dims.height,
          paddingHorizontal: dims.padH,
          borderWidth: v.borderWidth,
          borderColor: v.borderColor,
          opacity: disabled ? 0.6 : 1,
        },
        fullWidth && { alignSelf: 'stretch', width: '100%' },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text} />
      ) : children ? (
        children
      ) : (
        <Txt style={[styles.title, { color: v.text, fontSize: dims.font }]} numberOfLines={1}>
          {title}
        </Txt>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  title: {
    fontWeight: '600',
  },
});

export default Button;
