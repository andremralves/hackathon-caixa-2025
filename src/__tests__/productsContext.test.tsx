import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ProductsProvider, useProducts } from '#/context/products';

const Consumer: React.FC = () => {
  const { products, addProduct } = useProducts();
  React.useEffect(() => {
    addProduct({ name: 'Novo', annualRate: 0.12, maxTermMonths: 10 });
  }, [addProduct]);
  return <Text>{products.map(p => p.name).join(',')}</Text>;
};

describe('ProductsProvider', () => {
  it('adiciona produto', async () => {
    const { findByText } = render(<ProductsProvider><Consumer /></ProductsProvider>);
    await findByText(/Novo/);
  });
});
