import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Themes } from '#/constants/Colors';
import { useAppTheme } from '#/context/theme';

export default function HeaderBar() {
  const insets = useSafeAreaInsets();
  const { scheme: rawScheme, toggle } = useAppTheme();
  const mode: 'light' | 'dark' = rawScheme === 'dark' ? 'dark' : 'light';
  const t = Themes[mode];

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 16, // safe-area + base padding
          backgroundColor: t.background,
        },
      ]}
    >
      <Image
        source={require('../../assets/caixa_x_positivo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={toggle} accessibilityRole="button" hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons
          name={mode === 'light' ? 'moon-outline' : 'sunny-outline'}
          size={22}
          color={t.text}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 24,
    width: 24,
  },
});
