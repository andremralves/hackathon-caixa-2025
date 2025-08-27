import React from 'react';
import { Text, TextProps } from 'react-native';

// Central mapping table (stringified weight -> font family)
const weightMap: Record<string, string> = {
  '100': 'CAIXA-Light',
  '200': 'CAIXA-Light',
  '300': 'CAIXA-Light',
  '400': 'CAIXA-Regular',
  '500': 'CAIXA-Regular',
  '600': 'CAIXA-SemiBold',
  '700': 'CAIXA-Bold',
  '800': 'CAIXA-Bold',
  '900': 'CAIXA-Bold',
};

export const Txt: React.FC<TextProps> = ({ style, children, ...rest }) => {
  let weight: string | undefined;
  if (style) {
    if (Array.isArray(style)) {
      const merged = Object.assign({}, ...style.filter(s => !!s && typeof s === 'object')) as any;
      weight = merged.fontWeight;
    } else if (typeof style === 'object') {
      weight = (style as any).fontWeight;
    }
  }
  const family = weightMap[String(weight || '400')] || 'CAIXA-Regular';
  return <Text {...rest} style={[style, { fontFamily: family }]}>{children}</Text>;
};
