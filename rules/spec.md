---
description: Estrutura e diretrizes para especificaÃ§Ã£o de telas, componentes e interaÃ§Ãµes antes do desenvolvimento
globs: ["docs/specs/**"]
alwaysApply: false
---

# Diretrizes de EspecificaÃ§Ã£o (Spec - Frontend)
> leitor: agente

## Quando
Antes de criar novas telas, fluxos interativos complexos, refatores de estado ou formulÃ¡rios no frontend.

## Estrutura ObrigatÃ³ria da Spec
Toda especificaÃ§Ã£o deve conter:
1. **Contexto & Tela:** Qual tela/visÃ£o do `layout.md` ou requisito do `PRD.md` serÃ¡ atendida.
2. **Componentes & Hierarquia:** Ãrvore de componentes React (ex: Containers, Cards, Tabelas, Modais, Toasts).
3. **Design Tokens & Estados Visuais:**
   - Cores semÃ¢nticas, bordas (1px contorno teal), tipografia Raleway.
   - Estados: `default`, `hover`, `active`, `disabled` e `empty state`.
4. **Gerenciamento de Estado & Dados:**
   - Fontes de dados (TanStack Query / API gerada via Orval / Zustand para UI local).
   - ValidaÃ§Ãµes de formulÃ¡rio (React Hook Form + Zod).
5. **Casos de Uso e InteraÃ§Ãµes:**
   - Feedback visual ao usuÃ¡rio (Toasts com duraÃ§Ã£o de 2600ms).
   - Bloqueios (ex: banner de atraso, desativaÃ§Ã£o de botÃµes ao atingir 3 itens).
6. **CritÃ©rios de AceitaÃ§Ã£o (CA-xx):**
   - Comportamentos esperados para testes visuais e testes unitÃ¡rios com Vitest/Playwright.

## VerificaÃ§Ã£o
- A spec foi revisada e alinhada com o `layout.md` antes da implementaÃ§Ã£o do cÃ³digo.
- A entrega final atende aos critÃ©rios visuais e de interaÃ§Ã£o definidos na spec.

## NÃ£o faÃ§a
- NÃ£o crie componentes visuais com estilos ou cores arbitrÃ¡rias fora dos tokens do Nocturne/Teal.
- NÃ£o altere o comportamento de navegaÃ§Ã£o ou papÃ©is sem registrar na spec.
