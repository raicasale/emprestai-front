---
description: O que precisa passar antes de declarar uma tarefa pronta
globs: []
alwaysApply: true
---

# Verificação de fim de tarefa (Frontend)
> leitor: agente

## Quando
Sempre que você for dizer "pronto", "implementado" ou "funcionando".

## Procedimento
1. Rode os testes unitários (`npm run test` / Vitest). Cole a última linha da saída na resposta.
2. Rode a verificação de tipos e lint (`npm run lint` ou `npm run typecheck`).
3. Rode o build da aplicação (`npm run build` com Vite). Build que quebra na Vercel é o feedback mais lento e mais caro deste projeto.
4. Rode `git status --short`. Só podem aparecer arquivos do escopo da tarefa.
5. Diga qual critério de aceitação ou tela esta tarefa atende.

## Verificação
Pronto = os comandos de teste, lint e build terminaram sem falha E o git status não trouxe surpresa. As duas coisas, não uma.

## Não faça
- Não relate sucesso parcial. Teste ou build com erro é tarefa não terminada.
- Não tente consertar a mesma falha duas vezes seguidas sem me mostrar a saída do erro.
