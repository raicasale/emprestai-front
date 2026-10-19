---
description: Procedimento para passagem de contexto e encerramento de sessão/tarefa
globs: []
alwaysApply: false
---

# Passagem de Contexto (Handoff - Frontend)
> leitor: agente

## Quando
Sempre que uma tarefa de interface/componente for finalizada, ao encerrar a sessão de trabalho ou antes de iniciar uma nova tela/fluxo.

## Procedimento
Ao gerar o resumo de handoff, o agente deve obrigatoriamente fornecer:
1. **O que foi feito:** Telas, componentes, hooks ou rotas criados/alterados e fidelidade ao `layout.md`.
2. **Estado dos Checks:** Confirmação de que `npm run build` (Vite + TypeScript strict) e testes (`npm run test`) passaram sem erros.
3. **Consumo da API & Estado:** Indicar se houve integração com endpoints gerados via Orval, stores do Zustand ou queries do TanStack Query.
4. **Instruções para Visualização:** Como testar visualmente no navegador (`npm run dev`) e alternar entre perfis (Colaborador / Operações).
5. **Próximos Passos:** Lista das próximas telas, modais ou integrações a serem construídas.

## Verificação
- O projeto compila sem alertas de tipagem ou quebras de CSS.
- Outro agente ou desenvolvedor pode prosseguir diretamente lendo o relatório de handoff.

## Não faça
- Não encerre a tarefa sem testar o build de produção (`npm run build`).
- Não deixe inconsistências visuais em relação aos tokens do `layout.md` sem aviso prévio.
