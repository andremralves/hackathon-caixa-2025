export function currencyBRL(value: number): string {
  if (!isFinite(value)) return '-';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function percent(value: number): string {
  if (!isFinite(value)) return '-';
  return new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 2 }).format(value);
}
