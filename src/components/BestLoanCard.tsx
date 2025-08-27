import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Txt } from '#/components/Txt';
import { useAppColorScheme } from '#/context/theme';
import { Themes } from '#/constants/Colors';
import GradientButton from '#/components/GradientButton';

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
    <View style={[styles.container, { borderColor: t.borderStrong, backgroundColor: t.background }]}>
      <Txt style={[styles.badge, { backgroundColor: t.badgeBg, color: t.badgeText }]}>Melhor opção</Txt>
      <Txt style={[styles.title, { color: t.text }]}>{product.name}</Txt>
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <Info label="Taxa a.m." value={`${monthlyPct}%`} theme={t} />
        <Divider />
        <Info label="Prazo" value={`${product.maxTermMonths || 0} meses`} theme={t} />
      </View>
      <GradientButton
        title="Simular agora"
        onPress={handlePress}
        roundness={22}
        gradient="lime"
        height={40}
        style={{ marginTop: 16, alignSelf: 'flex-end', minWidth: 140 }}
      />
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
  container: {
    borderWidth: 1.5,
    borderRadius: 18,
    marginTop: 8,
    padding: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  title: { fontSize: 18, fontWeight: '600', marginTop: 8 },
  infoLabel: { fontSize: 12 },
  infoValue: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  infoSmall: { fontSize: 11, marginTop: 2 },
  // cta styles removed (using GradientButton)
});
