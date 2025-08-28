import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Txt } from '#/components/Txt';
import { useAppColorScheme } from '#/context/theme';
import { Themes } from '#/constants/Colors';
import GradientButton from '#/components/GradientButton';
import { fontWeight as fw, fontSize as fs, space, borderRadius as br } from '#/constants/tokens';

export type BestLoanProduct = {
  id: string;
  name: string;
  annualRate: number; // e.g. 0.28 = 28% a.a.
  maxTermMonths?: number;
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
        roundness={br.full}
        gradient="lime"
        height={40}
        style={{ marginTop: space.xl, alignSelf: 'flex-end', minWidth: 140 }}
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

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: br.sm,
    marginTop: space.xs,
    padding: space.md,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: br.sm,
    fontSize: fs.xs,
    fontWeight: fw.semiBold,
  },
  title: { fontSize: fs.lg, fontWeight: fw.semiBold, marginTop: space.xs },
  infoLabel: { fontSize: fs.xs },
  infoValue: { fontSize: fs.sm, fontWeight: fw.semiBold, marginTop: space.xs },
  infoSmall: { fontSize: fs.xs, marginTop: space.xs },
});
