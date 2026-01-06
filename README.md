# Livro-Razão

## Descrição
O projeto **Livro-Razão** é uma API REST desenvolvida em **Node.js** com **TypeScript** e **Express**, com foco em **arquitetura modular** e **organização de código**.  
O design é claro, fácil de entender e mantém a lógica de negócio bem estruturada.

---

## Tecnologias Utilizadas
- **Node.js** + **TypeScript**
- **Express** (framework web)
- **Zod** (validação de dados)
- **Swagger** (documentação da API)
- **UUID** (geração de IDs únicos)
- **Jest** (testes unitários)
- **Pino** (logging)
- **Prettier** (formatação de código)

Nenhum serviço externo é necessário para rodar a aplicação.

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Devgustavogomes/Livro-Razao
cd Livro-Razao
npm install
```

## Variáveis de Ambiente

O projeto possui uma variável opcional:

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| PORT     | 3000   | Porta em que a aplicação será executada |

Você pode criar um arquivo `.env` para sobrescrever a porta

## Executando a Aplicação

### Modo Dev (Recomendado para logs legíveis)

```bash
npm run dev
```

### Modo produção
```bash
npm run start
```

## Testes

O projeto utiliza **Jest** para testes unitários.

Para executar todos os testes:

```bash
npm run test
```
