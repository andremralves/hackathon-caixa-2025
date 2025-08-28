import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Txt } from '#/components/Txt';
import { Button } from '#/components/Button';
import { useProducts } from '#/context/products';
import { useNavigation } from '@react-navigation/native';
import SecondaryHeader from '#/components/SecondaryHeader';
import { useThemeColor } from '#/hooks/useThemeColor';
import { fontWeight as fw, fontSize as fs } from '#/constants/tokens';

export default function NewLoanProductScreen() {
  const [name, setName] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [maxTerm, setMaxTerm] = useState('');
  const { addProduct } = useProducts();
  const navigation = useNavigation<any>();

  const handleSubmit = () => {
    if (!name || !interestRate || !maxTerm) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    const annualRate = parseFloat(interestRate.replace(',', '.')) / 100;
    const maxTermMonths = parseInt(maxTerm, 10);
  if (isNaN(annualRate) || isNaN(maxTermMonths)) {
      Alert.alert('Erro', 'Valores inválidos');
      return;
    }
    const product = addProduct({
      name,
      annualRate,
      maxTermMonths,
    });
    Alert.alert('Produto Criado', `ID: ${product.id}`);
    navigation.goBack();
  };

  const background = useThemeColor({}, 'background');
  const surface = useThemeColor({}, 'surface');
  const text = useThemeColor({}, 'text');
  const border = useThemeColor({}, 'border');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SecondaryHeader />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.container, { paddingTop: 16 }]}
        keyboardShouldPersistTaps="handled"
      > 
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

  {/* Valor Máximo field removed */}
      </ScrollView>
      <View style={styles.footer}> 
        <Button
          title="Criar produto"
          size="sm"
          roundness={22}
          onPress={handleSubmit}
          style={{ alignSelf: 'flex-end' }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  title: { fontSize: fs._2xl, fontWeight: fw.bold, marginBottom: 24 },
  label: { fontSize: fs.md, fontWeight: fw.semiBold, marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: fs.md },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 8,
  },
});
