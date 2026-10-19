---
description: O que o agente não pode fazer neste projeto
globs: []
alwaysApply: true
---

# O que não fazer
> leitor: agente

## Autoridade

- Não escreva ADR. Se encontrar uma decisão técnica relevante, descreva a decisão e as alternativas, e PARE. Quem decide é o time.
- Não contrarie o que está em `../emprestai-back/docs/adr/`. Se precisar contrariar, pare.
- Não invente comportamento de tela ou regras de negócio que não estejam em `layout.md` ou `../emprestai-back/docs/PRD.md`.
- Não escolha biblioteca ou pacote que não esteja previsto no ADR-001.

## Escopo

- Não altere arquivo fora do escopo da tarefa atual.
- Não modifique tokens visuais, rampa de cores ou fontes sem seguir o `layout.md`.
- Não escreva código sem antes propor o plano da tela ou componente.

## Ritmo

- Não escreva código antes de um plano aprovado. Escreva o plano, mostre e espere.
- "Pode implementar" autoriza a execução da tarefa aprovada. Após implementar, rode os checks (`npm run test`, `npm run lint`, `npm run build`) e avise o usuário.
- Não relate sucesso parcial. Se um check falhou, a tarefa não terminou.

## Produção

- O usuário é o responsável por criar branches, commits e PRs.
- Não rode deploy nem altere configurações na Vercel.

## Precedência

- Se o código e o `layout.md` / `PRD.md` discordarem sobre comportamento visual ou de fluxo, a documentação está certa até que seja atualizada.
- Se uma regra contrariar o ADR 001 ou o `layout.md`, PARE e avise.
