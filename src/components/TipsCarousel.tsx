import React, { useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Pressable, ViewToken } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Txt } from '#/components/Txt';
import { Themes } from '#/constants/Colors';
import { useAppColorScheme } from '#/context/theme';
import { fontWeight as fw, fontSize as fs, space, borderRadius as br } from '#/constants/tokens';

// Fixed card width (keeps layout consistent across devices)
const CARD_W = 230;
const GAP = 8;

export type TipItem = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  data: TipItem[];
  onPressItem?: (item: TipItem) => void;
};

export default function TipsCarousel({ data, onPressItem }: Props) {
  const [index, setIndex] = useState(0);
  const schemeRaw = useAppColorScheme();
  const scheme: 'light' | 'dark' = schemeRaw === 'dark' ? 'dark' : 'light';
  const t = Themes[scheme];

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 60 });
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index != null) setIndex(viewableItems[0].index);
  });

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(it) => it.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_W + GAP}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{ paddingLeft: 0, paddingRight: GAP }}
        ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current as any}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPressItem?.(item)}
            accessibilityRole="button"
            style={[
              styles.cardUnified,
              { width: CARD_W, borderColor: t.borderStrong, backgroundColor: t.foreground },
            ]}
          >
            <View>
              <Txt style={[styles.tipTitle, { color: t.text }]}>{item.title}</Txt>
              <Txt style={[styles.tipDesc, { color: t.textMuted }]}>{item.description}</Txt>
            </View>
            <Pressable
              onPress={() => onPressItem?.(item)}
              style={({ pressed }) => [styles.moreLink, pressed && { opacity: 0.6 }]}
            >
              <Txt style={[styles.moreText, { color: t.primary }]}>Saiba mais</Txt>
              <Ionicons name="arrow-forward" size={fs.sm} color={t.primary} style={{ marginLeft: 4 }} />
            </Pressable>
          </Pressable>
        )}
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
                width: index === i ? 16 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardUnified: {
    borderRadius: br.sm,
    padding: 16,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  tipTitle: { fontSize: fs.md, fontWeight: fw.semiBold, marginBottom: 6 },
  tipDesc: { fontSize: fs.sm, lineHeight: 18 },
  moreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  moreText: { fontSize: fs.sm, fontWeight: fw.semiBold },
  dots: { flexDirection: 'row', alignSelf: 'center', gap: 6, marginTop: 10 },
  dot: { height: 8, borderRadius: 4 },
});
