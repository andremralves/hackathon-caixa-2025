import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Txt } from '#/components/Txt';
import LoanCarousel from '../components/LoanCarousel';
import { useNavigation } from '@react-navigation/native';
import HeaderBar from '#/components/HeaderBar';
import TipsCarousel, { TipItem } from '#/components/TipsCarousel';
import { BestLoanCard } from '#/components/BestLoanCard';
import { useThemeColor } from '#/hooks/useThemeColor';
import { fontWeight as fw, fontSize as fs } from '#/constants/tokens';

import { useProducts } from '#/context/products';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { products } = useProducts();
  // Theme tokens
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const textMuted = useThemeColor({}, 'textMuted');
  const primary = useThemeColor({}, 'primary');

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
      <ScrollView style={[styles.container, { backgroundColor: background }]}
        contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.section}>
          <Txt style={[styles.title, { color: text }]}>Empréstimos <Txt style={[styles.title, { color: primary }]}>Caixa</Txt></Txt>
          <Txt style={[styles.subtitle, { color: textMuted }]}>Escolha a melhor opção para você e simule as parcelas em poucos toques.</Txt>
        </View>

        {/* Best Loan Product */}
        {bestProduct && (
          <View style={styles.section}>
            <Txt style={[styles.sectionTitle, { color: text }]}>Melhor opção de empréstimo para você</Txt>
            <BestLoanCard
              product={{
                id: bestProduct.id,
                name: bestProduct.name,
                annualRate: bestProduct.annualRate,
                maxTermMonths: bestProduct.maxTermMonths,
              }}
              onSimulate={(p) => navigation.navigate('Simulation', { productId: p.id })}
            />
          </View>
        )}

        {/* Tips Section */}
        <View style={styles.section}>
          <Txt style={[styles.sectionTitle, { color: text }]}>Aumente suas chances de ter mais ofertas</Txt>
          <TipsCarousel data={tips} />
        </View>

        {/* Loans Section Title */}
        <View style={styles.section}>
          <Txt style={[styles.sectionTitle, { color: text }]}>Nossos emprestimos</Txt>
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

        {/* Footer attribution */}
        <View style={styles.footer}>
          <Txt style={{ color: textMuted }}>
            Feito por Andre Alves (c158441)
          </Txt>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingBottom: 20 },
  section: { marginVertical: 16 },
  header: { paddingTop: 16, paddingBottom: 16 },
  title: { fontSize: fs._2xl, fontWeight: fw.bold },
  subtitle: { marginTop: 6 },
  sectionTitle: { fontSize: fs.lg, fontWeight: fw.semiBold, marginBottom: 12 },
  footer: { marginTop: 32, alignItems: 'center', paddingBottom: 24 },
});
