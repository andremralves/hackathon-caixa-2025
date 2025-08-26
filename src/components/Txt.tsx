import React from 'react';
import { Text, TextProps } from 'react-native';

function mapFont(weight?: string, italic?: boolean) {
  const it = !!italic;
  switch (weight) {
    case '100':
    case '200':
    case '300':
    case 'normal':
    case undefined:
      return it ? 'CAIXA-LightItalic' : 'CAIXA-Light';
    case '400':
    case '500':
      return it ? 'CAIXA-BookItalic' : 'CAIXA-Book';
    case '600':
      return it ? 'CAIXA-SemiBoldItalic' : 'CAIXA-SemiBold';
    case '700':
      return it ? 'CAIXA-BoldItalic' : 'CAIXA-Bold';
    case '800':
    case '900':
      return it ? 'CAIXA-ExtraBoldItalic' : 'CAIXA-ExtraBold';
    default:
      return 'CAIXA-Regular';
  }
}

export const Txt: React.FC<TextProps> = ({ style, children, ...rest }) => {
  // Extract fontWeight / fontStyle from style prop (supports arrays)
  let weight: string | undefined;
  let fStyle: string | undefined;
  if (style) {
    if (Array.isArray(style)) {
      // flatten relevant objects (ignore numbers / falsy)
      const merged = Object.assign({}, ...style.filter(s => !!s && typeof s === 'object')) as any;
      weight = merged.fontWeight;
      fStyle = merged.fontStyle;
    } else if (typeof style === 'object') {
      const obj = style as any;
      weight = obj.fontWeight;
      fStyle = obj.fontStyle;
    }
  }
  const family = mapFont(weight, fStyle === 'italic');
  return (
    <Text {...rest} style={[style, { fontFamily: family }]}> 
      {children}
    </Text>
  );
};
