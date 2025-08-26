import React, { useCallback } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Txt } from '#/components/Txt';
import { useAppColorScheme } from '#/context/theme';
import { Themes } from '#/constants/Colors';

export type BestLoanProduct = {
  id: string;
  name: string;
  annualRate: number; // e.g. 0.28 = 28% a.a.
  maxTermMonths?: number;
  maxAmount?: number;
};

type Props = {
  product: BestLoanProduct;
  onSimulate?: (product: BestLoanProduct) => void;
};

export function BestLoanCard({ product, onSimulate }: Props) {
  const schemeRaw = useAppColorScheme();
  const scheme: 'light' | 'dark' = schemeRaw === 'dark' ? 'dark' : 'light';
  const t = Themes[scheme];

  const monthlyRate = product.annualRate / 12; // simplistic division
  const monthlyPct = (monthlyRate * 100).toFixed(2).replace('.', ',');

  const handlePress = useCallback(() => {
    onSimulate?.(product);
  }, [onSimulate, product]);

  return (
    <View style={[styles.wrapper, { borderColor: t.borderStrong }]}> 
      <View style={[styles.inner, { backgroundColor: t.surface }]}> 
        <Txt style={[styles.badge, { backgroundColor: t.badgeBg, color: t.badgeText }]}>Melhor opção</Txt>
        <Txt style={[styles.title, { color: t.text }]}>{product.name}</Txt>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <Info label="Taxa a.m." value={`${monthlyPct}%`} theme={t} />
          <Divider />
          <Info label="Prazo" value={`${product.maxTermMonths || 0} meses`} theme={t} />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Info label="Até" value={formatBRL(product.maxAmount || 0)} theme={t} small="Limite máx." />
        </View>
        <Pressable accessibilityRole="button" onPress={handlePress} style={[styles.cta, { backgroundColor: t.buttonPrimaryBg }]}> 
          <Txt style={[styles.ctaText, { color: t.buttonPrimaryText }]}>Simular agora</Txt>
        </Pressable>
      </View>
    </View>
  );
}

function Info({ label, value, small, theme: t }: { label: string; value: string; small?: string; theme: typeof Themes.light }) {
  return (
    <View style={{ flex: 1, paddingRight: 8 }}>
      <Txt style={[styles.infoLabel, { color: t.textSubtle }]}>{label}</Txt>
      <Txt style={[styles.infoValue, { color: t.text }]}>{value}</Txt>
      {small ? <Txt style={[styles.infoSmall, { color: t.textMuted }]}>{small}</Txt> : null}
    </View>
  );
}

function Divider() {
  const schemeRaw = useAppColorScheme();
  const scheme: 'light' | 'dark' = schemeRaw === 'dark' ? 'dark' : 'light';
  const t = Themes[scheme];
  return <View style={{ width: 1, backgroundColor: t.border, marginHorizontal: 8 }} />;
}

function formatBRL(n: number) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1.5,
    borderRadius: 18,
    marginHorizontal: 16,
  },
  inner: {
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '700',
  },
  title: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  infoLabel: { fontSize: 12 },
  infoValue: { fontSize: 16, fontWeight: '700', marginTop: 4 },
  infoSmall: { fontSize: 11, marginTop: 2 },
  cta: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: { fontWeight: '700' },
});
