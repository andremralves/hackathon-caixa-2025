import React, { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Txt } from '#/components/Txt';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useProducts } from '#/context/products';
import { simulatePrice } from '#/utils/simulate';
import { useThemeColor } from '#/hooks/useThemeColor';
import SecondaryHeader from '#/components/SecondaryHeader';

// Expected route params: { productId: string }

export default function SimulationScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { productId } = route.params || {};
  const { products } = useProducts();
  const product = products.find(p => p.id === productId);

  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const textMuted = useThemeColor({}, 'textMuted');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const primary = useThemeColor({}, 'primary');
  const buttonText = useThemeColor({}, 'buttonPrimaryText');
  const buttonBg = useThemeColor({}, 'buttonPrimaryBg');

  const [amount, setAmount] = useState('10000');
  const [term, setTerm] = useState(String(product?.maxTermMonths || 12));

  const parsedAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
  const parsedTerm = parseInt(term, 10) || 0;

  const result = useMemo(() => {
    if (!product || !parsedAmount || !parsedTerm) return null;
    return simulatePrice(product, parsedAmount, parsedTerm);
  }, [product, parsedAmount, parsedTerm]);

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: background }}>
        <Txt style={{ color: text }}>Produto não encontrado.</Txt>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <SecondaryHeader />
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 24 }}>
        <Txt style={[styles.title, { color: text }]}>{product.name}</Txt>
        <Txt style={{ color: textMuted, marginBottom: 16 }}>Simulação de parcelas (Tabela Price)</Txt>

        <Txt style={[styles.label, { color: text }]}>Valor (R$)</Txt>
        <TextInput
          style={[styles.input, { backgroundColor: surface, borderColor: border, color: text }]}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Txt style={[styles.label, { color: text }]}>Prazo (meses)</Txt>
        <TextInput
          style={[styles.input, { backgroundColor: surface, borderColor: border, color: text }]}
          keyboardType="numeric"
          value={term}
          onChangeText={setTerm}
        />

        {result && (
          <View style={{ marginTop: 24 }}>
            <Txt style={{ color: text, fontWeight: '700', fontSize: 16 }}>Resumo</Txt>
            <Txt style={{ color: textMuted, marginTop: 4 }}>Parcela fixa: R$ {result.installment.toFixed(2)}</Txt>
            <Txt style={{ color: textMuted }}>Total Juros: R$ {result.totalInterest.toFixed(2)}</Txt>
            <Txt style={{ color: textMuted }}>Total Pago: R$ {result.totalPaid.toFixed(2)}</Txt>
          </View>
        )}

        {result && (
          <View style={{ marginTop: 24 }}>
            <Txt style={{ color: text, fontWeight: '700', fontSize: 16, marginBottom: 8 }}>Cronograma</Txt>
            {result.schedule.map(item => (
              <View key={item.month} style={[styles.row, { backgroundColor: surface, borderColor: border }]}>
                <Txt style={[styles.cell, { color: text }]}>{item.month}</Txt>
                <Txt style={[styles.cell, { color: text }]}>R$ {item.installment.toFixed(2)}</Txt>
                <Txt style={[styles.cell, { color: text }]}>Int: {item.interest.toFixed(2)}</Txt>
                <Txt style={[styles.cell, { color: text }]}>Saldo: {item.balance.toFixed(2)}</Txt>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonBg }]}
          onPress={() => navigation.goBack()}
        >
          <Txt style={[styles.buttonText, { color: buttonText }]}>Voltar</Txt>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800' },
  label: { fontSize: 14, fontWeight: '600', marginTop: 16, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, marginBottom: 4 },
  row: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 8 },
  cell: { flex: 1, fontSize: 12 },
  button: { marginTop: 32, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: '700' },
});
