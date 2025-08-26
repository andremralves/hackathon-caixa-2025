import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '#/context/theme';
import { useThemeColor } from '#/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SecondaryHeader() {
  const navigation = useNavigation<any>();
  const { scheme, toggle } = useAppTheme();
  const background = useThemeColor({}, 'surface');
  const iconColor = useThemeColor({}, 'text');
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.wrap,
      {
        paddingTop: insets.top,
        backgroundColor: background,
      },
    ]}> 
      <View style={styles.inner}>
        <TouchableOpacity accessibilityRole="button" onPress={() => navigation.goBack()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="arrow-back" size={22} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" onPress={toggle} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name={scheme === 'dark' ? 'sunny' : 'moon'} size={22} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    // No hard border; use subtle shadow/elevation for separation
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
