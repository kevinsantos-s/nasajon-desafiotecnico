# 🗺️ Municipio Radar

Aplicação em TypeScript que enriquece dados de municípios brasileiros 
cruzando um arquivo CSV com a API pública do IBGE.

## O que faz

- Lê um CSV com nomes de municípios e populações
- Busca os dados oficiais de cada município na API do IBGE (nome oficial, UF, região, código)
- Trata erros de digitação e nomes ambíguos automaticamente
- Gera um CSV de saída com os dados enriquecidos e o status de cada município
- Calcula estatísticas por região e envia para uma API externa via autenticação JWT

## Tecnologias

- TypeScript
- Node.js
- axios
- csv-parse / csv-stringify
- fastest-levenshtein
- dotenv

## Como rodar

```bash
npm install
```

Copie o `.env.example` para `.env` e preencha o `ACCESS_TOKEN`:

```bash
cp .env.example .env
```

Execute:

```bash
npx tsx src/index.ts
```

## Decisões técnicas

- **Arquitetura em services** — cada responsabilidade isolada em seu próprio arquivo
- **Normalização de strings** — remoção de acentos e caracteres especiais antes de comparar
- **Distância de Levenshtein** — detecção de erros de digitação com threshold relativo ao tamanho do nome
- **Detecção de ambiguidade** — municípios com múltiplos matches no IBGE são marcados como ambíguos
- **Controle de duplicatas** — dois inputs não podem apontar pro mesmo município IBGE
- **Busca em lote** — todos os municípios do IBGE são carregados em memória numa única requisição
