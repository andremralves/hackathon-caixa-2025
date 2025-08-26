import { AmortizationItem, SimulationResult, LoanProduct } from '#/types/loan';

export function simulatePrice(product: LoanProduct, amount: number, termMonths: number): SimulationResult {
  const monthlyRate = product.annualRate / 12;
  let installment: number;
  if (monthlyRate === 0) {
    installment = amount / termMonths;
  } else {
    const i = monthlyRate;
    installment = amount * (i * Math.pow(1 + i, termMonths)) / (Math.pow(1 + i, termMonths) - 1);
  }
  installment = round2(installment);

  let balance = amount;
  const schedule: AmortizationItem[] = [];
  let totalInterest = 0;
  for (let m = 1; m <= termMonths; m++) {
    const interest = round2(balance * monthlyRate);
    const principal = round2(installment - interest);
    balance = round2(balance - principal);
    totalInterest += interest;
    schedule.push({
      month: m,
      interest,
      principal,
      installment,
      balance: balance < 0 ? 0 : balance,
    });
  }

  const totalPaid = round2(installment * termMonths);

  return {
    product,
    amount,
    termMonths,
    monthlyRate,
    installment,
    schedule,
    totalInterest: round2(totalInterest),
    totalPaid,
  };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
