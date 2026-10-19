# AGENTS.md — Instruções para Agentes de IA (Frontend)

Este repositório contém a interface web do sistema de Empréstimo de Equipamentos Internos (**EMPREST.AI**).

---

## 1. Documentação de Referência Obrigatória
Antes de propor ou implementar qualquer funcionalidade ou componente, consulte:
- `layout.md`: Especificação visual completa (Design System Nocturne com rampa teal, tipografia Raleway, tokens de cor, espaçamentos, regras de componentes, telas e dados de exemplo).
- `../emprestai-back/docs/PRD.md`: Regras de negócio, fluxos e escopo da v1.
- `../emprestai-back/docs/adr/001-stack.md`: Decisões técnicas de arquitetura, stack, segurança e alternativas descartadas.

---

## 2. Stack e Tecnologias
- **Linguagem:** TypeScript em modo `strict`
- **Biblioteca de UI:** React
- **Build & Dev Server:** Vite
- **Roteamento:** React Router (data APIs)
- **Estado de Servidor:** TanStack Query
- **Estado de Cliente:** Zustand
- **Formulários:** React Hook Form + `zodResolver`
- **Estilização:** Tailwind CSS (tokens do Nocturne com rampa Teal)
- **Componentes:** shadcn/ui
- **Cliente da API:** Gerado a partir do `openapi.json` via `orval` (versionado no repositório)
- **Autenticação:** Supabase Auth via `supabase-js` (token no header Authorization)
- **Testes:** Vitest (unitário) e Playwright (E2E)
- **Rastreamento de Erros:** Sentry
- **Lint e Formatação:** ESLint + Prettier

---

## 3. Diretrizes de Layout e UI (`layout.md`)
- **Base Visual:** Dark ground (`--color-bg: #161826`, `--color-surface: #232532`, `--color-text: #e9e9ed`).
- **Acento Primário:** `#2fb8ac` (teal). O acento é usado apenas em contornos (1px), linhas, ícones e números de destaque — **nunca** como preenchimento sólido em áreas grandes.
- **Tipografia:** Raleway (Google Fonts, pesos 400/500/600/700). Títulos com peso 600 e corpo com peso 400.
- **Cores Semânticas:** Disponível/Em dia (`#5fcfc4`), Emprestado/A vencer (`#c9a25f`), Em atraso/Erro (`#e88b8b`), Em manutenção/Inativo (`#9aa0ad`).
- **Componentes e Animações:** Seguir classes e padrões do Nocturne (`.btn`, `.tag`, `.card`, `.field`, `.dialog`, `.table`), com animações sutis (`fadeUp`). Toast automático de 2600ms.
- **Telas da v1:**
  1. Login (duas colunas)
  2. Catálogo (busca, filtros por situação, cards com botão de solicitação condicional, banner de atraso)
  3. Meus Empréstimos (barra de 3 traços de ocupação, lista de empréstimos, botão de devolução, estado vazio)
  4. Operações (4 KPIs, busca, tabela de empréstimos em aberto com devolução no balcão)
  5. Equipamentos (cadastro de novos itens exclusivo de Operações)

---

## 4. Diretrizes de Trabalho e Fluxo do Agente
1. **Autonomia de UI:** O agente tem autonomia para construir o fluxo e a árvore de componentes seguindo fielmente as especificações do `layout.md` e os componentes do `shadcn/ui`.
2. **Validação e Testes:** Ao concluir a implementação de alterações ou features, o agente **deve executar os testes/lints** e notificar o usuário com os resultados obtidos.
3. **Commits e PRs:** O gerenciamento de commits, branches e PRs é realizado exclusivamente pelo usuário.
4. **Tecnologias Externas:** Não utilizar nem instalar pacotes ou dependências que divirjam das decisões registradas no ADR 001.
