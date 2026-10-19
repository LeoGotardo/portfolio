// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Leonardo Gotardo",
  title: "Leonardo Gotardo - CV",
  footer: context { [#emph[Leonardo Gotardo -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Última atualização Out 2026] ],
  locale-catalog-language: "pt",
  text-direction: ltr,
  page-size: "a4",
  page-top-margin: 0.45in,
  page-bottom-margin: 0.45in,
  page-left-margin: 0.55in,
  page-right-margin: 0.55in,
  page-show-footer: false,
  page-show-top-note: false,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 0, 0),
  colors-headline: rgb(0, 0, 0),
  colors-connections: rgb(0, 0, 0),
  colors-section-titles: rgb(0, 0, 0),
  colors-links: rgb(0, 0, 0),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.5em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "XCharter",
  typography-font-family-name: "XCharter",
  typography-font-family-headline: "XCharter",
  typography-font-family-connections: "XCharter",
  typography-font-family-section-titles: "XCharter",
  typography-font-size-body: 9.5pt,
  typography-font-size-name: 22pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.2em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: false,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: true,
  links-show-external-link-icon: false,
  header-alignment: center,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.3cm,
  header-space-below-headline: 0.3cm,
  header-space-below-connections: 0.3cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: false,
  header-connections-display-urls-instead-of-usernames: true,
  header-connections-separator: "|",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_full_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.3cm,
  section-titles-space-below: 0.18cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.1cm,
  sections-space-between-regular-entries: 0.28cm,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: false,
  entries-degree-width: 1cm,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0.08cm,
  entries-highlights-bullet:  text(13pt, [•], baseline: -0.6pt) ,
  entries-highlights-nested-bullet:  text(13pt, [•], baseline: -0.6pt) ,
  entries-highlights-space-left: 0cm,
  entries-highlights-space-above: 0.05cm,
  entries-highlights-space-between-items: 0.04cm,
  entries-highlights-space-between-bullet-and-text: 0.3em,
  date: datetime(
    year: 2026,
    month: 10,
    day: 19,
  ),
)


= Leonardo Gotardo

  #headline([Desenvolvedor de Software])

#connections(
  [Londrina, Brasil],
  [#link("mailto:leonardo.gotardo2@gmail.com", icon: false, if-underline: false, if-color: false)[leonardo.gotardo2\@gmail.com]],
  [#link("tel:+55-43-98817-7963", icon: false, if-underline: false, if-color: false)[(43) 98817-7963]],
  [#link("https://leogotardo.com.br/", icon: false, if-underline: false, if-color: false)[leogotardo.com.br]],
  [#link("https://linkedin.com/in/leogotardo", icon: false, if-underline: false, if-color: false)[linkedin.com\/in\/leogotardo]],
  [#link("https://github.com/LeoGotardo", icon: false, if-underline: false, if-color: false)[github.com\/LeoGotardo]],
)


== Resumo

Desenvolvedor de Software com experiência em Linux embarcado\/IoT, backend Python e full-stack web\/mobile, demonstrada no noHarm (em produção na AWS com Terraform), no PiTest (hardware Raspberry Pi) e no MainDug.

== Experiência

#regular-entry(
  [
    #strong[Desenvolvedor de Software], IrisPay -- Londrina, Brasil

  ],
  [
    Set 2024 – presente

  ],
  main-column-second-row: [
    - Trabalho com Linux embarcado em dispositivos Raspberry Pi autônomos, serviços Python de controle de hardware, APIs FastAPI\/Flask, atualizações remotas (OTA) e manutenção de uma plataforma legada em PHP (Yii2).

    - Uso watchdogs, rollback automático e estado que sobrevive ao reboot, já que os dispositivos não têm acesso à tela e a rede é instável.

    - Aprendi a isolar cada camada (hardware, serial, rede, SO) e provar onde a falha acontece antes de corrigi-la.

  ],
)

#regular-entry(
  [
    #strong[Sócio], TLG-Web-Dev

  ],
  [
    Abr 2026 – presente

  ],
  main-column-second-row: [
    - Um dos sócios de um pequeno estúdio de desenvolvimento web; 1 cliente pago, GP Barril.

    - Site do GP Barril (Next.js; 37 de 82 commits meus): restringi o Image Optimizer a 3 hosts, fechando uma brecha de proxy aberto; limitei o formulário de contato a 3 envios por IP a cada 10 minutos.

  ],
)

#regular-entry(
  [
    #strong[Service Desk], Persis Internet -- Londrina, Brasil

  ],
  [
    Jul 2023 – Mar 2024

  ],
  main-column-second-row: [
    #summary[Provedor de internet regional.]

    - Resolvi problemas de internet e rede a partir de descrições ambíguas de clientes leigos; transformei problemas recorrentes em feedback.

  ],
)

== Projetos

#regular-entry(
  [
    #strong[#link("https://noharm.site")[noHarm]]

  ],
  [
    Dez 2025 – presente

  ],
  main-column-second-row: [
    #summary[App de apoio à recuperação de dependências, no ar com alguns beta testers.]

    - Backend (173 de 184 commits): FastAPI, Clean Architecture, rotação de JWT com blacklist, chat via Socket.IO, criptografia AES-256 por campo, rate limiting em três camadas no Redis; 1.170 casos de teste pytest.

    - Em produção na AWS com Terraform e GitHub Actions.

    - App (77 de 89 commits): React, TypeScript, Capacitor para Android e iOS; 226 execuções Playwright em projetos mobile e desktop.

  ],
)

#regular-entry(
  [
    #strong[#link("https://pitest.leogotardo.com.br")[PiTest]]

  ],
  [
    Jun 2026 – presente

  ],
  main-column-second-row: [
    #summary[Bancada de testes de hardware para Raspberry Pi 3B.]

    - Roda a cada boot sem teclado nem SSH: 7 testes automáticos de hardware, com resultados guardados por placa (endereço MAC) em um painel web Flask\/PostgreSQL.

  ],
)

#regular-entry(
  [
    #strong[#link("https://github.com/LeoGotardo/MainDugWeb")[MainDug]]

  ],
  [
    Dez 2024 – presente

  ],
  main-column-second-row: [
    #summary[Gerenciador de senhas open-source, TCC do IFPR.]

    - Webservice Flask\/PostgreSQL e extensão de navegador; Argon2, detecção de senhas reutilizadas e vazadas, 67 funções de teste pytest, CI com GitHub Actions.

  ],
)

#regular-entry(
  [
    #strong[#link("https://venetia.leogotardo.com.br")[Grimório de Venetia]]

  ],
  [
    Jun 2026 – presente

  ],
  main-column-second-row: [
    #summary[Criador de personagens de D&D 5.5.]

    - App Android em React, TypeScript e Capacitor; 333 testes Vitest, 108 execuções Playwright.

  ],
)

#regular-entry(
  [
    #strong[#link("https://pypi.org/project/CustomThread/")[Custom Thread]]

  ],
  [
    Jun 2024 – presente

  ],
  main-column-second-row: [
    #summary[Biblioteca Python no PyPI.]

    - Estende threading.Thread com valores de retorno, propagação de exceções e callbacks; zero dependências, licença MIT.

  ],
)

== Habilidades

#strong[Linguagens:] Python, TypeScript, JavaScript, PHP, SQL, Bash, C

#strong[Backend\/Dados:] FastAPI, Flask, Laravel, Next.js, SQLAlchemy, Socket.IO, PostgreSQL, Redis

#strong[Frontend\/Testes:] React, Tailwind CSS, Capacitor, pytest, Playwright, Vitest

#strong[DevOps\/Embarcados:] Docker, Terraform, AWS, GitHub Actions, systemd, GPIO, LUKS

#strong[Idiomas:] Português (nativo), Inglês (proficiência profissional plena)

== Formação

#education-entry(
  [
    #strong[IFPR (Instituto Federal do Paraná)], Análise e Desenvolvimento de Sistemas (Tecnólogo) -- Londrina, Brasil

  ],
  [
    Abr 2022 – Jul 2026

  ],
  main-column-second-row: [
  ],
)
