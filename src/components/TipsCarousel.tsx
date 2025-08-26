import React, { useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Pressable, ViewToken } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Txt } from '#/components/Txt';
import { Themes } from '#/constants/Colors';
import { useAppColorScheme } from '#/context/theme';

const { width } = Dimensions.get('window');
const CARD_W = Math.min(width * 0.6, 300);
const GAP = 14;

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
        contentContainerStyle={{ paddingHorizontal: GAP }}
        ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current as any}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPressItem?.(item)}
            style={[styles.cardWrapper, { width: CARD_W, borderColor: t.borderStrong }]}
          >
            <View style={[styles.card, { backgroundColor: t.surface }]}> 
              <Txt style={[styles.tipTitle, { color: t.primary }]}>{item.title}</Txt>
              <Txt style={[styles.tipDesc, { color: t.textMuted }]}>{item.description}</Txt>
              <Pressable
                onPress={() => onPressItem?.(item)}
                style={({ pressed }) => [styles.moreLink, pressed && { opacity: 0.6 }]}
                accessibilityRole="button"
              >
                <Txt style={[styles.moreText, { color: t.primary }]}>Saiba mais</Txt>
                <Ionicons name="arrow-forward" size={16} color={t.primary} style={{ marginLeft: 4 }} />
              </Pressable>
            </View>
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
  cardWrapper: {
    borderWidth: 1.5,
    borderRadius: 18,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    minHeight: 140,
    justifyContent: 'center',
  },
  tipTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  tipDesc: { fontSize: 13, lineHeight: 18 },
  moreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  moreText: { fontSize: 13, fontWeight: '700' },
  dots: { flexDirection: 'row', alignSelf: 'center', gap: 6, marginTop: 10 },
  dot: { height: 8, borderRadius: 4 },
});
