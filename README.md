# 📱 Simulador de Empréstimos Caixa

<p align="center">
  <img 
    src="https://github.com/user-attachments/assets/2503a9de-2b19-424e-9291-f484ccb1aff9" 
    alt="Hackathon Caixa 2025 - Light theme" 
    width="30%" 
    style="border-radius:12px; margin:4px;" 
  />
  <img 
    src="https://github.com/user-attachments/assets/6b635c3c-22b9-451d-b222-bb8577f08518" 
    alt="Hackathon Caixa 2025 - Dark theme" 
    width="30%" 
    style="border-radius:12px; margin:4px;" 
  />
</>





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

<p align="center">
  <img src="https://github.com/user-attachments/assets/748909bf-7da4-4479-b1c8-7ab0dae76aa6" alt="demo" width="250"/>
</p>

---
## 🔍 Referências

- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org/)
- [Tabela Price explicação (pt-BR)](https://pt.wikipedia.org/wiki/Sistema_Franc%C3%AAs_de_Amortiza%C3%A7%C3%A3o)

