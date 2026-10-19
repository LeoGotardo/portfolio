# Preparação para entrevista

Gerado ao fim do resume-loop (iteração 2, veredito READY). As perguntas vêm do Interviewer
(recrutador cético, que só leu o currículo) e das notas do Coach.

## Regra de ouro: IrisPay sob NDA

Fale só de **tecnologias, condições de trabalho e o que aprendeu**. Para pedido de produto,
cliente, número ou caso específico, recuse com educação:

> "That work is under an NDA, so I can't go into specific products or incidents. What I can
> talk about is the stack and how I approach problems in that environment — for example…"

e puxe para um exemplo equivalente de projeto pessoal (PiTest, noHarm).

## Perguntas prováveis

| # | Pergunta | Como responder |
|---|---|---|
| 1 | "Walk me through the most difficult field failure you diagnosed at IrisPay and how you proved the cause." | NDA. Descreva o **método** sem o caso: isolar camada (hardware, serial, rede, SO), reproduzir, provar onde quebra antes de corrigir. Exemplo concreto vindo de projeto pessoal. |
| 2 | "Who designed the OTA update and rollback system, and what is your part in it?" | NDA para autoria/escopo. Fale do que **sabe**: releases versionadas, backup antes do deploy, rollback automático, quarentena de versão ruim, testes em sandbox. |
| 3 | "How is the AES-256 encryption key managed in noHarm? What happens if the key is rotated?" | Projeto 100% seu: saiba onde a chave vive (Secrets Manager?), como rotaciona e o custo (criptografia por coluna mata índice/LIKE/ordenação). |
| 4 | "What do the 1,170 tests cover, and which real bugs did they catch?" | 1.170 casos coletados, 73 parametrizados. Separe "Playwright runs" (226 execuções em 2 projetos: mobile + desktop) de testes distintos. Cite a auditoria por mutação (HookahSys: 57 → 84 testes). |
| 5 | "How did you find the Image Optimizer hole at GP Barril, and how did you confirm the fix?" | `remotePatterns` sem `pathname` = proxy público. Travou em 3 hosts com caminho fixo. Relembre como confirmou (ex.: URL de host fora da lista sendo recusada). |
| 6 | "How do you split time between a full-time job, a studio, a degree, and four projects?" | Formado em jul/2026 (liberou tempo). Projetos pessoais = laboratório do que aplica no trabalho. Seja honesto sobre ritmo. |
| 7 | "Where have you used Laravel, C, and LUKS?" | Laravel e LUKS: stack do trabalho (nomeie só como tecnologia). C: hash table com encadeamento e rehash a 0,75 de fator de carga. |
| 8 | "What is the PiTest hardware test failure mode you most often saw?" | Projeto pessoal. Prepare 1-2 falhas reais que o PiTest pegou (LAN, Wi-Fi, USB, boot). |
| 9 | "Why is noHarm on AWS with Terraform for a beta audience?" | Prática de engenharia de produção em escala pequena, de propósito: IaC, OIDC, secrets, rollback. Uso real, mas pequeno. |
| 10 | Gap de ~5 meses entre a Persis (mar/2024) e a IrisPay (set/2024) | Tenha uma frase pronta (estudo, projetos, transição). |

## Pontos fortes para puxar

- Ownership verificável: noHarm backend 173 de 184 commits, app 77 de 89.
- Segurança concreta: rate limit em 3 camadas no Redis com Lua atômico, JWT com rotação e blacklist,
  proxy confiável, fechamento do proxy aberto no GP Barril.
- Hardware + nuvem: do GPIO/Raspberry Pi ao Terraform na AWS.

## Pendências opcionais (não bloqueiam)

- Quantos sócios tem a TLG-Web-Dev? ("one of N partners")
- Cobertura do backend do noHarm (`pytest --cov`), se for um número defensável.
