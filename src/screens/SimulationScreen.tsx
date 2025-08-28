import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import { Txt } from '#/components/Txt';
import GradientButton from '#/components/GradientButton';
import Button from '#/components/Button';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useProducts } from '#/context/products';
import { simulatePrice } from '#/utils/simulate';
import { useThemeColor } from '#/hooks/useThemeColor';
import SecondaryHeader from '#/components/SecondaryHeader';
import { LoanProduct } from '#/types/loan';
import { fontWeight as fw, fontSize as fs } from '#/constants/tokens';

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const num = (v: number) => new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(v);

function formatBRLInput(raw: string) {
  const digits = (raw || '').replace(/\D/g, '');
  if (!digits) return { masked: '', value: 0 };
  const int = parseInt(digits, 10);
  const value = int / 100;
  return { masked: brl.format(value), value };
}

function getMonthlyRate(p?: LoanProduct | null) {
  if (!p) return null;
  return p.annualRate / 12;
}

function getDefaultTerm(p?: LoanProduct | null) {
  if (!p) return 12;
  return Math.min(12, Math.max(1, p.maxTermMonths));
}

export default function SimulationScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { productId } = route.params || {};
  const { products } = useProducts();

  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const textMuted = useThemeColor({}, 'textMuted');
  const foreground = useThemeColor({}, 'foreground');
  const border = useThemeColor({}, 'border');

  if (!products?.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: background }}>
        <Txt style={{ color: text }}>Nenhum produto disponível.</Txt>
      </View>
    );
  }

  // Product selection
  const initialProduct: LoanProduct | null =
    (products as LoanProduct[]).find(p => p.id === productId) ||
    ((products as LoanProduct[])[0] ?? null);

  const [selectedProduct, setSelectedProduct] = useState<LoanProduct | null>(initialProduct);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Amount (masked)
  const [amountMasked, setAmountMasked] = useState('R$ 10.000,00');
  const [amountValue, setAmountValue] = useState(10000);
  const onAmountChange = useCallback((t: string) => {
    const { masked, value } = formatBRLInput(t);
    setAmountMasked(masked);
    setAmountValue(value);
  }, []);

  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const [term, setTerm] = useState<number>(getDefaultTerm(initialProduct));

  const onSelectProduct = (item: LoanProduct) => {
    setSelectedProduct(item);
    setTerm(prev => {
      const capped = Math.min(Math.max(1, prev || 1), item.maxTermMonths);
      return capped || getDefaultTerm(item);
    });
    setPickerOpen(false);
  };

  // Derived product including monthlyRate for simulatePrice
  const derivedProduct = useMemo(() => {
    if (!selectedProduct) return null;
    const monthlyRate = getMonthlyRate(selectedProduct) ?? undefined;
    return { ...selectedProduct, monthlyRate };
  }, [selectedProduct]);

  const result = useMemo(() => {
    if (!derivedProduct || !amountValue || !term) return null;
    return simulatePrice(derivedProduct, amountValue, term);
  }, [derivedProduct, amountValue, term]);

  const monthlyRate = getMonthlyRate(selectedProduct);

  // Normalize schedule to always include amortization
  const schedule = useMemo(() => {
    if (!result?.schedule) return [];
    return result.schedule.map((it: any) => {
      const installment = result.installment ?? it.installment ?? 0;
      const interest = it.interest ?? 0;
      const amortization =
        typeof it.amortization === 'number' ? it.amortization : (installment - interest);
      return { ...it, installment, interest, amortization };
    });
  }, [result]);

  const zebra = (i: number) => (i % 2 === 0 ? foreground : 'transparent');

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <SecondaryHeader />
      <ScrollView contentContainerStyle={{ padding: 16  }}>
        {/* Header + product selector */}
        <View style={styles.headerRow}>
          <Txt style={[styles.title, { color: text }]}>Simulação de Empréstimo</Txt>
          <TouchableOpacity
            onPress={() => setPickerOpen(true)}
            style={[styles.chip, { borderColor: border, backgroundColor: foreground }]}
          >
            <Txt style={{ color: text, fontWeight: fw.semiBold }}>
              {selectedProduct ? selectedProduct.name : 'Selecionar produto'}
            </Txt>
          </TouchableOpacity>
        </View>

        {/* Dados do produto (separadores ao invés de card) */}
        {selectedProduct && (
          <View style={{ marginVertical: 16 }}>
            <Txt style={[styles.sectionTitle, { color: text }]}>Dados do produto</Txt>
            <View style={[styles.sepLine, { backgroundColor: border }]} />
            <View style={styles.rowLine}>
              <Txt style={[styles.rowLabel, { color: textMuted }]}>Nome</Txt>
              <Txt style={[styles.rowValue, { color: text }]}>{selectedProduct.name}</Txt>
            </View>
            <View style={styles.rowLine}>
              <Txt style={[styles.rowLabel, { color: textMuted }]}>Prazo máximo</Txt>
              <Txt style={[styles.rowValue, { color: text }]}>{selectedProduct.maxTermMonths} meses</Txt>
            </View>
            <View style={styles.rowLine}>
              <Txt style={[styles.rowLabel, { color: textMuted }]}>Taxa efetiva mensal</Txt>
              <Txt style={[styles.rowValue, { color: text }]}>{monthlyRate !== null ? `${num((monthlyRate as number) * 100)}%` : '–'}</Txt>
            </View>
          </View>
        )}

        {/* Form */}
        <View style={{ marginVertical: 16 }}>
          <Txt style={[styles.label, { color: text }]}>Valor (R$)</Txt>
          <TextInput
            style={[styles.input, { backgroundColor: foreground, borderColor: border, color: text }]}
            keyboardType={Platform.select({ ios: 'number-pad', android: 'numeric' })}
            value={amountMasked}
            onChangeText={onAmountChange}
            placeholder="R$ 0,00"
            placeholderTextColor={textMuted}
          />

          <Txt style={[styles.label, { color: text }]}>Prazo (meses)</Txt>
          <TouchableOpacity
            style={[styles.input, { backgroundColor: foreground, borderColor: border, justifyContent: 'center' }]}
            onPress={() => setMonthPickerOpen(true)}
          >
            <Txt style={{ color: text, fontSize: fs.md }}>
              {term ? `${term} meses` : 'Selecionar'}
            </Txt>
          </TouchableOpacity>
        </View>

        {/* Resumo */}
        {result && (
          <View style={{ marginVertical: 16 }}>
            <Txt style={[styles.sectionTitle, { color: text }]}>Resumo</Txt>
            <View style={[styles.sepLine, { backgroundColor: border }]} />
            <View style={styles.rowLine}>
              <Txt style={[styles.rowLabel, { color: textMuted }]}>Produto</Txt>
              <Txt style={[styles.rowValue, { color: text }]}>{selectedProduct?.name}</Txt>
            </View>
            <View style={styles.rowLine}>
              <Txt style={[styles.rowLabel, { color: textMuted }]}>Valor solicitado</Txt>
              <Txt style={[styles.rowValue, { color: text }]}>{brl.format(amountValue)}</Txt>
            </View>
            <View style={styles.rowLine}>
              <Txt style={[styles.rowLabel, { color: textMuted }]}>Prazo</Txt>
              <Txt style={[styles.rowValue, { color: text }]}>{term} meses</Txt>
            </View>
            <View style={[styles.sepLine, { backgroundColor: border }]} />
            <View style={styles.rowLine}>
              <Txt style={[styles.rowLabel, { color: textMuted }]}>Taxa efetiva mensal</Txt>
              <Txt style={[styles.rowValue, { color: text }]}>{monthlyRate !== null ? `${num((monthlyRate as number) * 100)}%` : '–'}</Txt>
            </View>
            <View style={styles.rowLine}>
              <Txt style={[styles.rowLabel, { color: textMuted }]}>Parcela mensal</Txt>
              <Txt style={[styles.rowValue, { color: text }]}>{brl.format(result.installment)}</Txt>
            </View>
            <View style={styles.rowLine}>
              <Txt style={[styles.rowLabel, { color: textMuted }]}>Total em juros</Txt>
              <Txt style={[styles.rowValue, { color: text }]}>{brl.format(result.totalInterest)}</Txt>
            </View>
            <View style={styles.rowLine}>
              <Txt style={[styles.rowLabel, { color: textMuted }]}>Valor total com juros</Txt>
              <Txt style={[styles.rowValue, { color: text }]}>{brl.format(result.totalPaid)}</Txt>
            </View>
          </View>
        )}

        {/* Cronograma */}
        {result && (
          <View style={{ marginTop: 16 }}>
            <Txt style={{ color: text, fontWeight: fw.semiBold, fontSize: fs.md, marginBottom: 8 }}>
              Memória de cálculo (Tabela Price)
            </Txt>

            <View style={[styles.tableHeader, { borderColor: border }]}> 
              <Txt style={[styles.th, { color: text, flex: 0.6 }]}>Mês</Txt>
              <Txt style={[styles.th, { color: text }]}>Juros</Txt>
              <Txt style={[styles.th, { color: text }]}>Amortização</Txt>
              <Txt style={[styles.th, { color: text }]}>Saldo</Txt>
            </View>

            <FlatList
              keyExtractor={(it: any) => String(it.month)}
              data={schedule}
              renderItem={({ item, index }) => (
                <View style={[styles.tr, { borderColor: border, backgroundColor: zebra(index) }]}> 
                  <Txt style={[styles.td, { color: text, flex: 0.6 }]}>{item.month}</Txt>
                  <Txt style={[styles.td, { color: text }]}>{brl.format(item.interest)}</Txt>
                  <Txt style={[styles.td, { color: text }]}>{brl.format(item.amortization)}</Txt>
                  <Txt style={[styles.td, { color: text }]}>{brl.format(item.balance)}</Txt>
                </View>
              )}
              ListFooterComponent={<View style={{ height: 8 }} />}
            />
          </View>
        )}

        {/* CTA button */}
        <GradientButton
          title="Contratar"
          onPress={() => navigation.goBack()}
          fullWidth
          roundness={22}
          style={{ marginTop: 24 }}
        />
      </ScrollView>

      {/* Product Picker Modal */}
      <Modal visible={pickerOpen} animationType="fade" transparent onRequestClose={() => setPickerOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setPickerOpen(false)} />
        <View style={[styles.modalSheet, { backgroundColor: foreground, borderColor: border }]}>
          <Txt style={[styles.modalTitle, { color: text }]}>Selecionar produto</Txt>
          <FlatList
            data={products as LoanProduct[]}
            keyExtractor={(p) => String(p.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onSelectProduct(item)}
                style={[styles.productRow, { borderColor: border }]}
              >
                <View style={{ flex: 1 }}>
                  <Txt style={{ color: text, fontWeight: fw.normal }}>{item.name}</Txt>
                  <Txt style={{ color: textMuted }}>
                    Taxa mensal: {num(getMonthlyRate(item)! * 100)}%
                  </Txt>
                  <Txt style={{ color: textMuted }}>
                    Prazo máx.: {item.maxTermMonths} meses
                  </Txt>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
          <Button
            title="Fechar"
            onPress={() => setPickerOpen(false)}
            fullWidth
            size="sm"
            style={{ marginTop: 12 }}
          />
        </View>
      </Modal>

      {/* Month Picker Modal */}
      <Modal
        visible={monthPickerOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setMonthPickerOpen(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setMonthPickerOpen(false)} />
        <View style={[styles.modalSheet, { backgroundColor: foreground, borderColor: border }]}>
          <Txt style={[styles.modalTitle, { color: text }]}>Selecionar prazo</Txt>
          <FlatList
            data={Array.from({ length: selectedProduct?.maxTermMonths ?? 60 }, (_, i) => i + 1)}
            keyExtractor={(m) => String(m)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setTerm(item);
                  setMonthPickerOpen(false);
                }}
                style={[styles.productRow, { borderColor: border }]}
              >
                <Txt style={{ color: text }}>{item} meses</Txt>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
          <Button
            title="Fechar"
            onPress={() => setMonthPickerOpen(false)}
            fullWidth
            size="sm"
            style={{ marginTop: 12 }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: fs._2xl, fontWeight: fw.bold },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1 },
  label: { fontSize: fs.lg, fontWeight: fw.semiBold, marginTop: 16, marginBottom: 6 },
  input: {
    borderWidth: 1, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 12, fontSize: fs.md,
  },

  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 6, paddingHorizontal: 4 },
  th: { flex: 1, fontSize: fs.sm, fontWeight: fw.semiBold },
  tr: { flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 6, paddingHorizontal: 4 },
  td: { flex: 1, fontSize: fs.xs },
  // new separator-based layout styles
  sectionTitle: { fontSize: fs.lg, fontWeight: fw.semiBold, marginBottom: 4 },
  rowLine: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  rowLabel: { fontSize: fs.sm, fontWeight: fw.normal },
  rowValue: { fontSize: fs.sm, fontWeight: fw.semiBold },
  sepLine: { height: 1, marginBottom: 4 },

  // Modal / picker
  modalBackdrop: { flex: 1, backgroundColor: '#0008' },
  modalSheet: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    borderTopLeftRadius: 16, borderTopRightRadius: 16,
    borderTopWidth: 1, maxHeight: '65%', padding: 16,
  },
  modalTitle: { fontSize: fs.lg, fontWeight: fw.semiBold, marginBottom: 12 },
  productRow: { padding: 12, borderWidth: 1, borderRadius: 12 },
});
