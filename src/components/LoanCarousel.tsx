import React, { useRef, useState, useMemo, useCallback } from 'react';
import { View, FlatList, Pressable, StyleSheet, Dimensions, ViewToken } from 'react-native';
import { Txt } from '#/components/Txt';
import { Themes } from '#/constants/Colors';
import { useAppColorScheme } from '#/context/theme';
import { fontWeight as fw, fontSize as fs, space, borderRadius as br } from '#/constants/tokens';

const { width } = Dimensions.get('window');
const CARD_W = Math.min(width * 0.7, 380);
const GAP = 8;
const SHOW_ALL_ID = '__show_all__';

export type LoanProduct = {
  id: string;
  nome: string;
  descricao?: string;
  taxaMes: number;        // 0.023 = 2,3% a.m.
  prazoMeses: number;     // 24
};

type Props = {
  data: LoanProduct[];
  onPress?: (item: LoanProduct) => void;
  onAdd?: () => void; // action when pressing the sentinel add card
};

export default function LoanCarousel({ data, onPress, onAdd }: Props) {
  const [index, setIndex] = useState(0);
  // use app theme scheme (respects override)
  const schemeRaw = useAppColorScheme();
  const scheme: 'light' | 'dark' = schemeRaw === 'dark' ? 'dark' : 'light';
  const t = Themes[scheme];

  const [rowHeight, setRowHeight] = useState<number | undefined>(undefined);
  const handleMeasure = useCallback((h: number) => {
    setRowHeight(prev => (prev && prev >= h ? prev : h));
  }, []);

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 60 });
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index != null) setIndex(viewableItems[0].index);
    }
  );

  const dataPlus = useMemo(
    () => [...data, { id: SHOW_ALL_ID } as LoanProduct],
    [data]
  );

  return (
    <View>
      <FlatList
        horizontal
        data={dataPlus}
        keyExtractor={(it) => it.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_W + GAP}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{ paddingLeft: 0, paddingRight: GAP, alignItems: 'stretch' }}
        ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current as any}
        renderItem={({ item }) =>
          item.id === SHOW_ALL_ID ? (
            <AddCard
              height={rowHeight}
              onPress={onAdd}
              themeColors={t}
            />
          ) : (
            <Card
              item={item}
              onPress={() => onPress?.(item)}
              onMeasure={handleMeasure} // measure each real card
              themeColors={t}
            />
          )
        }
      />

      <View style={styles.dots}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: t.primary,
                opacity: index === i ? 1 : 0.35,
                width: index === i ? 18 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function Card({
  item,
  onPress, // only used for the button now
  onMeasure,
  themeColors: t,
}: {
  item: LoanProduct;
  onPress?: () => void;
  onMeasure?: (h: number) => void;
  themeColors: typeof Themes.light;
}) {
  // Gradient removed – we now render a simple bordered container

  const taxaPct = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(item.taxaMes * 100);

  return (
    <View
      onLayout={(e) => onMeasure?.(e.nativeEvent.layout.height)}
      style={[styles.cardContainer, { borderColor: t.borderStrong, backgroundColor: t.background }]}
    >
      <Txt style={[styles.badge, { backgroundColor: t.badgeBg, color: t.badgeText }]}>Empréstimo</Txt>
      <Txt style={[styles.title, { color: t.text }]}>{item.nome}</Txt>
      {item.descricao ? <Txt style={[styles.desc, { color: t.textMuted }]}>{item.descricao}</Txt> : null}

      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <Info label="Taxa a.m." value={`${taxaPct}%`} themeColors={t} />
        <Divider />
        <Info label="Prazo" value={`${item.prazoMeses} meses`} themeColors={t} />
      </View>

      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={[styles.cta, { backgroundColor: t.foreground }]}
      >
        <Txt style={[styles.ctaText, { color: t.text }]}>Simular agora</Txt>
      </Pressable>
    </View>
  );
}

function AddCard({
  height,
  onPress,
  themeColors: t,
}: {
  height?: number;
  onPress?: () => void;
  themeColors: typeof Themes.light;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[
        styles.cardContainer,
        styles.addCardContent,
        { borderColor: t.borderStrong, backgroundColor: t.background },
        height ? { height } : null,
      ]}
    >
      <Txt style={[styles.addIcon, { color: t.text }]}>＋</Txt>
      <Txt style={[styles.addText, { color: t.text }]}>Adicionar</Txt>
    </Pressable>
  );
}

function Info({ label, value, themeColors: t }: { label: string; value: string; themeColors: typeof Themes.light }) {
  return (
    <View style={{ flex: 1, paddingRight: 8 }}>
  <Txt style={[styles.label, { color: t.textSubtle }]}>{label}</Txt>
  <Txt style={[styles.value, { color: t.text }]}>{value}</Txt>
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
  cardContainer: {
    width: CARD_W,
    borderRadius: br.sm,
    borderWidth: 1.5,
    padding: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    // theme colors applied inline
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: fw.semiBold,
  },
  title: { fontSize: fs.lg, fontWeight: fw.bold, marginTop: 6 },
  desc: { marginTop: 2 },
  label: { fontSize: fs.xs, marginTop: 2 },
  value: { fontSize: fs.sm, fontWeight: fw.semiBold, marginTop: 4 },
  cta: {
    marginTop: space.xl,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: br.full,
    alignSelf: 'flex-end',
  },
  ctaText: { fontWeight: fw.semiBold, fontSize: fs.md },
  dots: { flexDirection: 'row', alignSelf: 'center', gap: 6, marginTop: space.md },
  dot: { height: 8, borderRadius: 4 },

  // Styles for the add card
  addCardContent: { justifyContent: 'center', alignItems: 'center' },
  addIcon: { fontSize: 36, marginBottom: 8 },
  addText: { fontSize: fs.md, fontWeight: fw.semiBold },
});
