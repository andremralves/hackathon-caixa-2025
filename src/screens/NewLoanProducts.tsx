import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Txt } from '#/components/Txt';
import { useProducts } from '#/context/products';
import { useNavigation } from '@react-navigation/native';
import SecondaryHeader from '#/components/SecondaryHeader';
import { useThemeColor } from '#/hooks/useThemeColor';

export default function NewLoanProductScreen() {
  const [name, setName] = useState('');
  const [interestRate, setInterestRate] = useState(''); // annual %
  const [maxTerm, setMaxTerm] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const { addProduct } = useProducts();
  const navigation = useNavigation<any>();

  const handleSubmit = () => {
    if (!name || !interestRate || !maxTerm) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    const annualRate = parseFloat(interestRate.replace(',', '.')) / 100;
    const maxTermMonths = parseInt(maxTerm, 10);
    const maxAmountNum = maxAmount ? parseFloat(maxAmount.replace(',', '.')) : undefined;
    if (isNaN(annualRate) || isNaN(maxTermMonths)) {
      Alert.alert('Erro', 'Valores inválidos');
      return;
    }
    const product = addProduct({
      name,
      annualRate,
      maxTermMonths,
      maxAmount: maxAmountNum,
    });
    Alert.alert('Produto Criado', `ID: ${product.id}`);
    navigation.goBack();
  };

  const background = useThemeColor({}, 'background');
  const surface = useThemeColor({}, 'surface');
  const text = useThemeColor({}, 'text');
  const textMuted = useThemeColor({}, 'textMuted');
  const border = useThemeColor({}, 'border');
  const buttonBg = useThemeColor({}, 'buttonPrimaryBg');
  const buttonTextColor = useThemeColor({}, 'buttonPrimaryText');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SecondaryHeader />
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: 16 }]}> 
  <Txt style={[styles.title, { color: text }]}>Novo Produto de Empréstimo</Txt>

  <Txt style={[styles.label, { color: text }]}>Nome do Produto</Txt>
        <TextInput
          style={[styles.input, { backgroundColor: surface, borderColor: border, color: text }]}
          placeholder="ex: Crédito Pessoal"
          value={name}
          onChangeText={setName}
        />

  <Txt style={[styles.label, { color: text }]}>Taxa de Juros Anual (%)</Txt>
        <TextInput
          style={[styles.input, { backgroundColor: surface, borderColor: border, color: text }]}
          placeholder="ex: 15.5"
          keyboardType="numeric"
          value={interestRate}
          onChangeText={setInterestRate}
        />

  <Txt style={[styles.label, { color: text }]}>Prazo Máximo (meses)</Txt>
        <TextInput
          style={[styles.input, { backgroundColor: surface, borderColor: border, color: text }]}
          placeholder="ex: 48"
          keyboardType="numeric"
          value={maxTerm}
          onChangeText={setMaxTerm}
        />

  <Txt style={[styles.label, { color: text }]}>Valor Máximo (opcional)</Txt>
        <TextInput
          style={[styles.input, { backgroundColor: surface, borderColor: border, color: text }]}
          placeholder="ex: 50000"
          keyboardType="numeric"
          value={maxAmount}
          onChangeText={setMaxAmount}
        />

        <TouchableOpacity style={[styles.button, { backgroundColor: buttonBg }]} onPress={handleSubmit}>
          <Txt style={[styles.buttonText, { color: buttonTextColor }]}>Criar Produto</Txt>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16 },
  button: { marginTop: 24, paddingVertical: 14, borderRadius: 10, alignItems: 'center', elevation: 3 },
  buttonText: { fontSize: 16, fontWeight: '700' },
});
