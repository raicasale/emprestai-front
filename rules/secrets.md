---
description: Onde cada variável de ambiente vive e qual chave usar
globs: ["**/.env*", "src/lib/**", "src/services/**", "src/config/**"]
alwaysApply: false
---

# Variáveis de ambiente e chaves (Frontend)
> leitor: agente

## Quando
Ao criar ou usar qualquer variável de ambiente, ao instanciar o cliente do Supabase (`supabase-js`), o cliente HTTP gerado (`orval`), ou ao escrever código que consome configuração.

## Procedimento
1. **Apenas Chave Pública (`anon` / `VITE_SUPABASE_ANON_KEY`):** Somente variáveis com prefixo público (`VITE_*`) e chaves anônimas podem estar no frontend. A segurança é garantida pelas policies do banco e validações da API.
2. **Chave de Serviço (`service_role`):** **PROIBIDA** no frontend. Nunca importe, declare ou exponha chaves com privilégios administrativos no código do navegador.
3. **Variável nova existe em TRÊS lugares ou em nenhum:**
   - `.env.local` / `.env` (desenvolvimento local)
   - `.env.example` (versionado, sem valores reais)
   - Painel da Vercel (preview e production).
4. Ao criar uma variável, informe na resposta em quais locais ela foi adicionada e o que precisa ser configurado manualmente na Vercel.

## Verificação
- Uma busca por `service_role` ou chaves privadas no código do frontend retorna 0 resultados.
- `.env.example` contém todas as variáveis necessárias (ex: `VITE_API_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`), sem valores reais.

## Não faça
- Não escreva valores de chaves em respostas, commits, logs ou comentários.
- Não crie variável apenas no `.env.local`. Ela quebrará o build na Vercel.
