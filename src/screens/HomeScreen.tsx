import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Txt } from '#/components/Txt';
import LoanCarousel from '../components/LoanCarousel';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import HeaderBar from '#/components/HeaderBar';
import TipsCarousel, { TipItem } from '#/components/TipsCarousel';
import { BestLoanCard } from '#/components/BestLoanCard';
import { useThemeColor } from '#/hooks/useThemeColor';

import { useProducts } from '#/context/products';

export default function HomeScreen() {
  // const insets = useSafeAreaInsets(); // no longer needed after removing bottom button
  const navigation = useNavigation<any>();
  const { products } = useProducts();
  // Theme tokens
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const textMuted = useThemeColor({}, 'textMuted');
  // Removed footer button related tokens
  const primary = useThemeColor({}, 'primary');

  // Static tips (could be fetched later)
  const tips: TipItem[] = [
    {
      id: 'open-finance',
      title: 'Traga seus dados via Open Finance',
      description: 'Compartilhe seu histórico financeiro e receba ofertas mais personalizadas.',
    },
    {
      id: 'poupanca',
      title: 'Tenha dinheiro guardado',
      description: 'Manter uma reserva mostra saúde financeira e pode melhorar condições.',
    },
    {
      id: 'salario',
      title: 'Receba seu salário na CAIXA',
      description: 'Portabilidade ou conta salário podem destravar taxas melhores.',
    },
    {
      id: 'cadastro',
      title: 'Mantenha seus dados atualizados',
      description: 'Cadastro completo acelera análise e amplia ofertas disponíveis.',
    },
  ];

  const bestProduct = React.useMemo(() => {
    if (!products.length) return undefined;
    return [...products].sort((a, b) => a.annualRate - b.annualRate)[0];
  }, [products]);

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <HeaderBar />
      <ScrollView
        style={[styles.container, { backgroundColor: background }]}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Título + descrição */}
        <View style={styles.header}>
          <Txt style={[styles.title, { color: text }]}>
            Empréstimos <Txt style={[styles.title, { color: primary }]}>Caixa</Txt>
          </Txt>
          <Txt style={[styles.subtitle, { color: textMuted }]}> 
            Escolha a melhor opção para você e simule as parcelas em poucos toques.
          </Txt>
        </View>

        {/* Best Loan Product */}
        {bestProduct ? (
          <View style={{ marginTop: 4 }}>
            <Txt style={[styles.sectionTitle, { color: text, marginHorizontal: 16, marginBottom: 4 }]}>Melhor opção de empréstimo para você</Txt>
            <BestLoanCard
              product={{
                id: bestProduct.id,
                name: bestProduct.name,
                annualRate: bestProduct.annualRate,
                maxAmount: bestProduct.maxAmount,
                maxTermMonths: bestProduct.maxTermMonths,
              }}
              onSimulate={(p) => navigation.navigate('Simulation', { productId: p.id })}
            />
          </View>
        ) : null}

        {/* Tips Section */}
        <View style={{ paddingTop: 4 }}>
          <Txt style={[styles.sectionTitle, { color: text, marginHorizontal: 16 }]}>Aumente suas chances de ter mais ofertas</Txt>
          <View style={{ marginTop: 4 }}>
            <TipsCarousel data={tips} />
          </View>
        </View>

        {/* Loans Section Title */}
        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          <Txt style={[styles.sectionTitle, { color: text }]}>Nossos emprestimos</Txt>
        </View>
        {/* Carrossel */}
    <View style={{ paddingVertical: 16 }}>
          {/* In this simplified example we map the loan product type differences */}
          <LoanCarousel
            data={products.map(p => ({
              id: p.id,
              nome: p.name,
              descricao: undefined,
              taxaMes: p.annualRate / 12,
              prazoMeses: p.maxTermMonths || 0,
              valorMax: p.maxAmount || 0,
            }))}
            onPress={(item) => navigation.navigate('Simulation', { productId: item.id })}
      onAdd={() => navigation.navigate('NewLoanProduct')}
          />
        </View>
  </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginVertical: 12 },
});
