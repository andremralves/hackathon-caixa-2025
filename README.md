# 📱 Simulador de Empréstimos Caixa

Aplicativo mobile (Expo + React Native 0.79 + React 19) para:
1. Cadastrar produtos de empréstimo
2. Listar / explorar produtos disponíveis
3. Simular parcelas (Tabela Price) exibindo memória de cálculo mês a mês (juros, amortização, saldo)

> Este repositório é focado no front‑end. A lista inicial de produtos é mockada em memória.

---
## ✨ Principais Funcionalidades

- Cadastro de produto (nome, taxa anual, prazo máximo)
- Listagem de produtos com destaque para melhores opções (com menor taxa de juros)
- Simulação Price: cálculo de parcela fixa, juros totais e tabela detalhada
- Memória de cálculo normalizada (garantia de campos amortização / juros)
- Theming automático (light/dark) com tokens (cores, tipografia, gradientes)
- Navegação estruturada com React Navigation
- Tipagem TypeScript de produtos, simulação e tabela de amortização

---
## 🗂️ Estrutura de Pastas (resumo)

```
src/
  App.tsx                # Entrada principal / rotas
  components/            # Componentes UI reutilizáveis
  context/products.tsx   # Estado de produtos em memória
  screens/               # Telas (Home, Simulação, Novo Produto ...)
  utils/simulate.ts      # Lógica de simulação Price
  types/loan.ts          # Tipos de domínio
  constants/Colors.ts    # Tokens de cor e tema
  constants/tokens.ts    # Gradientes e pesos de fonte
```

---
## 🚀 Como Rodar

Pré‑requisitos: Node 18+ e npm (ou yarn). Instale o Expo Go no smartphone ou use emulador.

```powershell
# Instalar dependências
npm install

# Iniciar o bundler (porta configurada em package.json)
npm run start

# Abrir direto em cada plataforma (opcional)
npm run android
npm run ios
npm run web
```

Se preferir Yarn:

```powershell
yarn
yarn start
```

Abra o QR Code no Expo Go (mobile) ou pressione as teclas indicadas para web / emulador.

---
## 🧪 Scripts Disponíveis

| Script | Descrição |
|--------|----------|
| `start` | Inicia o Expo bundler |
| `android` / `ios` / `web` | Abrem diretamente na plataforma alvo |
| `lint` | Executa ESLint com a config Expo |

---
## 📹 Demonstração (Screen Recording)

```markdown
![Demonstração](docs/demo.gif)
```

Coloque o arquivo em `docs/demo.gif` ou use link externo.

---
## 🔍 Referências

- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org/)
- [Tabela Price explicação (pt-BR)](https://pt.wikipedia.org/wiki/Sistema_Franc%C3%AAs_de_Amortiza%C3%A7%C3%A3o)

