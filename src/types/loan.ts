export type LoanProduct = {
  id: string;
  name: string;
  annualRate: number; // e.g., 0.18 for 18% a.a.
  maxTermMonths: number;
  maxAmount?: number;
};

export type CreateLoanProductInput = {
  name: string;
  annualRate: number;
  minTermMonths?: number;
  maxTermMonths?: number;
  minAmount?: number;
  maxAmount?: number;
};

export type SimulationInput = {
  productId: string;
  amount: number; // principal
  termMonths: number;
};

export type AmortizationItem = {
  month: number;
  interest: number;
  principal: number;
  installment: number;
  balance: number;
};

export type SimulationResult = {
  product: LoanProduct;
  amount: number;
  termMonths: number;
  monthlyRate: number; // decimal
  installment: number; // fixed installment if price table
  schedule: AmortizationItem[];
  totalInterest: number;
  totalPaid: number;
};
