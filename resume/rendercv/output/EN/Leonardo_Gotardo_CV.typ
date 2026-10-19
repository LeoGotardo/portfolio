// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Leonardo Gotardo",
  title: "Leonardo Gotardo - CV",
  footer: context { [#emph[Leonardo Gotardo -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in Oct 2026] ],
  locale-catalog-language: "en",
  text-direction: ltr,
  page-size: "a4",
  page-top-margin: 0.45in,
  page-bottom-margin: 0.45in,
  page-left-margin: 0.55in,
  page-right-margin: 0.55in,
  page-show-footer: false,
  page-show-top-note: false,
  colors-body: rgb(27, 29, 33),
  colors-name: rgb(12, 13, 15),
  colors-headline: rgb(77, 124, 15),
  colors-connections: rgb(70, 76, 86),
  colors-section-titles: rgb(77, 124, 15),
  colors-links: rgb(63, 98, 18),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.5em,
  typography-alignment: "left",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "Space Grotesk",
  typography-font-family-name: "Space Grotesk",
  typography-font-family-headline: "JetBrains Mono",
  typography-font-family-connections: "JetBrains Mono",
  typography-font-family-section-titles: "Space Grotesk",
  typography-font-size-body: 9.4pt,
  typography-font-size-name: 24pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 8.2pt,
  typography-font-size-section-titles: 1.15em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: true,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: false,
  links-show-external-link-icon: false,
  header-alignment: left,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.25cm,
  header-space-below-headline: 0.25cm,
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
  entries-highlights-bullet:  "•" ,
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

  #headline([Backend Python & React Developer])

#connections(
  [Londrina, Brazil],
  [#link("mailto:leonardo.gotardo2@gmail.com", icon: false, if-underline: false, if-color: false)[leonardo.gotardo2\@gmail.com]],
  [#link("tel:+55-43-98817-7963", icon: false, if-underline: false, if-color: false)[+55 43 98817-7963]],
  [#link("https://leogotardo.com.br/", icon: false, if-underline: false, if-color: false)[leogotardo.com.br]],
  [#link("https://linkedin.com/in/leogotardo", icon: false, if-underline: false, if-color: false)[linkedin.com\/in\/leogotardo]],
  [#link("https://github.com/LeoGotardo", icon: false, if-underline: false, if-color: false)[github.com\/LeoGotardo]],
)


== Summary

Backend Python and full-stack React developer with an embedded Linux\/IoT background, shown in noHarm (in production on AWS with Terraform), PiTest (Raspberry Pi hardware) and MainDug.

== Experience

#regular-entry(
  [
    #strong[Software Developer], IrisPay -- Londrina, Brazil

  ],
  [
    Sept 2024 – present

  ],
  main-column-second-row: [
    - Work with embedded Linux on unattended Raspberry Pi devices, Python hardware services, FastAPI\/Flask APIs, over-the-air updates, and maintenance of a legacy PHP (Yii2) platform.

    - Rely on watchdogs, automatic rollback and state that survives reboot, since devices have no screen access and the network is unreliable.

    - Learned to isolate each layer (hardware, serial, network, OS) and prove where a failure happens before fixing it.

  ],
)

#regular-entry(
  [
    #strong[Partner], TLG-Web-Dev

  ],
  [
    Apr 2026 – present

  ],
  main-column-second-row: [
    - One of the partners of a small web development studio; 1 paid client, GP Barril.

    - GP Barril site (Next.js; 37 of 82 commits mine): locked the Image Optimizer to 3 hosts, closing an open-proxy hole; rate-limited the contact form to 3 sends per IP per 10 minutes.

  ],
)

#regular-entry(
  [
    #strong[Service Desk], Persis Internet -- Londrina, Brazil

  ],
  [
    July 2023 – Mar 2024

  ],
  main-column-second-row: [
    #summary[Regional ISP.]

    - Solved internet and network problems from ambiguous descriptions by non-technical customers; turned recurring issues into feedback.

  ],
)

== Projects

#regular-entry(
  [
    #strong[#link("https://noharm.site")[noHarm]]

  ],
  [
    Dec 2025 – present

  ],
  main-column-second-row: [
    #summary[Addiction-recovery support app, live with a few beta testers.]

    - Backend (173 of 184 commits): FastAPI, Clean Architecture, JWT rotation with blacklist, Socket.IO chat, AES-256 field encryption, three-layer Redis rate limiting; 1,170 pytest test cases.

    - Runs in production on AWS with Terraform and GitHub Actions.

    - App (77 of 89 commits): React (JavaScript), Vite and Capacitor for Android and iOS; 226 Playwright runs across mobile and desktop projects.

  ],
)

#regular-entry(
  [
    #strong[#link("https://pitest.leogotardo.com.br")[PiTest]]

  ],
  [
    June 2026 – present

  ],
  main-column-second-row: [
    #summary[Raspberry Pi 3B hardware test bench.]

    - Runs on every boot with no keyboard or SSH: 7 automatic hardware tests, results kept per board (MAC address) in a Flask\/PostgreSQL web dashboard.

  ],
)

#regular-entry(
  [
    #strong[#link("https://github.com/LeoGotardo/MainDugWeb")[MainDug]]

  ],
  [
    Dec 2024 – present

  ],
  main-column-second-row: [
    #summary[Open-source password manager, IFPR final-year project.]

    - Flask\/PostgreSQL webservice and browser extension; Argon2, reused and leaked-password detection, 67 pytest test functions, GitHub Actions CI.

  ],
)

#regular-entry(
  [
    #strong[#link("https://venetia.leogotardo.com.br")[Grimório de Venetia]]

  ],
  [
    June 2026 – present

  ],
  main-column-second-row: [
    #summary[D&D 5.5 character creator.]

    - React, TypeScript, Capacitor Android app; 333 Vitest tests, 108 Playwright runs.

  ],
)

#regular-entry(
  [
    #strong[#link("https://pypi.org/project/CustomThread/")[Custom Thread]]

  ],
  [
    June 2024 – present

  ],
  main-column-second-row: [
    #summary[Python library on PyPI.]

    - Extends threading.Thread with return values, exception propagation and callbacks; zero dependencies, MIT.

  ],
)

== Skills

#strong[Programming:] Python, TypeScript, JavaScript, PHP, SQL, Bash, C

#strong[Backend\/Data:] FastAPI, Flask, Laravel, Next.js, SQLAlchemy, Socket.IO, PostgreSQL, Redis

#strong[Frontend\/Testing:] React, Tailwind CSS, Capacitor, pytest, Playwright, Vitest

#strong[DevOps\/Embedded:] Docker, Terraform, AWS, GitHub Actions, systemd, GPIO, LUKS

#strong[Languages:] Portuguese (native), English (full professional proficiency)

== Education

#education-entry(
  [
    #strong[IFPR (Instituto Federal do Paraná)], Analysis and Systems Development (Tecnólogo) -- Londrina, Brazil

  ],
  [
    Apr 2022 – July 2026

  ],
  main-column-second-row: [
  ],
)
