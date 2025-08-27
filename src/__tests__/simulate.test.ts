import { simulatePrice } from '#/utils/simulate';
import { LoanProduct } from '#/types/loan';

describe('simulatePrice', () => {
  const product: LoanProduct = {
    id: 'p1',
    name: 'Teste',
    annualRate: 0.24, // 24% a.a. => 2% a.m. simples divisão
    maxTermMonths: 12,
  };

  it('calcula parcelas com juros > 0', () => {
    const r = simulatePrice(product, 10000, 12);
    expect(r.installment).toBeGreaterThan(0);
    expect(r.schedule).toHaveLength(12);
    // soma dos principals deve aproximar o valor
    const paidPrincipal = r.schedule.reduce((s, m) => s + m.principal, 0);
    expect(paidPrincipal).toBeGreaterThan(9990);
    expect(paidPrincipal).toBeLessThan(10010);
    // saldo final = 0
    expect(r.schedule[r.schedule.length - 1].balance).toBe(0);
  });

  it('funciona com taxa zero', () => {
    const zeroProd = { ...product, annualRate: 0 };
    const r = simulatePrice(zeroProd, 6000, 6);
    expect(r.installment).toBeCloseTo(1000, 2);
    const interestSum = r.schedule.reduce((s, m) => s + m.interest, 0);
    expect(interestSum).toBe(0);
  });

  it('arredonda para 2 casas', () => {
    const r = simulatePrice(product, 12345.67, 5);
    r.schedule.forEach(m => {
      const to2 = (n: number) => Math.round(n * 100) / 100;
      expect(m.interest).toBe(to2(m.interest));
      expect(m.principal).toBe(to2(m.principal));
      expect(m.installment).toBe(to2(m.installment));
    });
  });
});
