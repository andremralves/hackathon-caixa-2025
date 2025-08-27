import React, { createContext, useContext, useState, useCallback } from 'react';
import { LoanProduct } from '#/types/loan';

const initialProducts: LoanProduct[] = [
  {
    id: 'cx-1',
    name: 'Crédito Pessoal Caixa',
    annualRate: 0.029 * 12,
    maxTermMonths: 24,
    maxAmount: 20000,
  },
  {
    id: 'cx-2',
    name: 'Consignado INSS',
    annualRate: 0.018 * 12,
    maxTermMonths: 48,
    maxAmount: 60000,
  },
  {
    id: 'cx-3',
    name: 'Antecipação FGTS',
    annualRate: 0.021 * 12,
    maxTermMonths: 60,
    maxAmount: 15000,
  },
];

type ProductsContextValue = {
  products: LoanProduct[];
  addProduct: (p: Omit<LoanProduct, 'id'>) => LoanProduct;
};

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<LoanProduct[]>(initialProducts);

  let idCounterRef = React.useRef(1000);

  const addProduct = useCallback((p: Omit<LoanProduct, 'id'>) => {
    const id = `custom-${idCounterRef.current++}`;
    const newProd: LoanProduct = { id, ...p };
    setProducts(prev => [newProd, ...prev]);
    return newProd;
  }, []);

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
