import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
  ViewToken,
} from 'react-native';
import { Txt } from '#/components/Txt';
import { Themes } from '#/constants/Colors';
import { useAppColorScheme } from '#/context/theme';

const { width } = Dimensions.get('window');
const CARD_W = Math.min(width * 0.86, 380);
const GAP = 16;
const SHOW_ALL_ID = '__show_all__';

export type LoanProduct = {
  id: string;
  nome: string;
  descricao?: string;
  taxaMes: number;        // 0.023 = 2,3% a.m.
  prazoMeses: number;     // 24
  valorMax: number;       // 20000
  gradiente?: [string, string];
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

  // NEW: keep track of tallest card height
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

  // NEW: append the "add" sentinel item
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
        // Remove left padding so first card aligns with parent content padding; keep right padding for end spacing
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
  onPress,
  onMeasure,
  themeColors: t,
}: {
  item: LoanProduct;
  onPress?: () => void;
  onMeasure?: (h: number) => void;
  themeColors: typeof Themes.light;
}) {
  // Gradient removed – we now render a simple bordered container

  const taxaPct = (item.taxaMes * 100).toFixed(1).replace('.', ',');
  const parcelaAprox = calcParcela(item.valorMax, item.taxaMes, item.prazoMeses);

  return (
    <Pressable onPress={onPress}>
      {/* Measure the OUTER wrapper to capture full height incl. padding */}
      <View
        style={[styles.border, { borderColor: t.borderStrong }]}
        onLayout={(e) => onMeasure?.(e.nativeEvent.layout.height)}
      >
        <View style={[styles.card, { backgroundColor: t.surface, shadowColor: t.primaryActive }]}>
          <Txt style={[styles.badge, { backgroundColor: t.badgeBg, color: t.badgeText }]}>Empréstimo</Txt>
          <Txt style={[styles.title, { color: t.text }]}>{item.nome}</Txt>
          {item.descricao ? <Txt style={[styles.desc, { color: t.textMuted }]}>{item.descricao}</Txt> : null}

          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <Info label="Taxa a.m." value={`${taxaPct}%`} themeColors={t} />
            <Divider />
            <Info label="Prazo" value={`${item.prazoMeses} meses`} themeColors={t} />
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Info label="Até" value={formatBRL(item.valorMax)} small="Limite máx." themeColors={t} />
            <Divider />
            <Info label="Parcela aprox." value={formatBRL(parcelaAprox)} small="*Tabela Price" themeColors={t} />
          </View>

          <Pressable style={[styles.cta, { backgroundColor: t.buttonPrimaryBg }]} onPress={onPress} accessibilityRole="button">
            <Txt style={[styles.ctaText, { color: t.buttonPrimaryText }]}>Simular agora</Txt>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

// NEW: The special "add" card that matches the measured row height
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
    <Pressable onPress={onPress} accessibilityRole="button">
      {/* Use SAME wrapper & width; apply measured height so it matches others */}
      <View style={[styles.border, { borderColor: t.borderStrong }, height ? { height } : null]}>
        <View style={[styles.card, styles.addCardContent, { flex: 1, backgroundColor: t.surface }]}>
          <Txt style={[styles.addIcon, { color: t.primary }]}>＋</Txt>
          <Txt style={[styles.addText, { color: t.primary }]}>Adicionar</Txt>
        </View>
      </View>
    </Pressable>
  );
}

function Info({ label, value, small, themeColors: t }: { label: string; value: string; small?: string; themeColors: typeof Themes.light }) {
  return (
    <View style={{ flex: 1, paddingRight: 8 }}>
  <Txt style={[styles.label, { color: t.textSubtle }]}>{label}</Txt>
  <Txt style={[styles.value, { color: t.text }]}>{value}</Txt>
  {small ? <Txt style={[styles.small, { color: t.textMuted }]}>{small}</Txt> : null}
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

function calcParcela(valor: number, taxaMes: number, n: number) {
  if (taxaMes <= 0) return Math.round((valor / n) * 100) / 100;
  const i = taxaMes;
  const fator = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  return Math.round((valor * fator) / 10) * 10;
}

const styles = StyleSheet.create({
  border: { width: CARD_W, borderRadius: 18, borderWidth: 1.5 },
  card: {
    // backgroundColor provided via theme token
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // no fixed height here — real cards define the row height; show-all will match it
  },
  badge: {
    alignSelf: 'flex-start',
    // theme colors applied inline
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '700',
  },
  title: { fontSize: 18, fontWeight: '700', marginTop: 6 },
  desc: { marginTop: 2 },
  label: { fontSize: 12 },
  value: { fontSize: 16, fontWeight: '700', marginTop: 4 },
  small: { fontSize: 11, marginTop: 2 },
  cta: {
    marginTop: 14,
    // backgroundColor via theme
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: { fontWeight: '700' },
  dots: { flexDirection: 'row', alignSelf: 'center', gap: 6, marginTop: 12 },
  dot: { height: 8, borderRadius: 4 },

  // Styles for the add card
  addCardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: { fontSize: 36, marginBottom: 8 },
  addText: { fontSize: 16, fontWeight: '700' },
});
