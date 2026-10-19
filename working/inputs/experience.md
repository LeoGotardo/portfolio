# My Experience — Leonardo Gotardo

> Raw input for `/resume-helper:resume-loop`. Every fact below was taken from my repos
> (`~/Documentos`), my current resume (`My Resume.pdf`), my portfolio site, my Obsidian vault,
> or my own answers. Numbers come from git history, test collectors (pytest, Playwright, Vitest),
> or project docs.

## Rules for the writer

- **IrisPay is under NDA.** Do not name any IrisPay product, client, partner, device or internal
  system. Do not attach metrics, commit counts or incidents to IrisPay. Describe that job only
  through the technologies, the working conditions and the skills listed below. Do not describe
  specific situations, achievements or numbers from that job, even anonymised. The employer name,
  role and dates are public and can stay.
- No fleet-size, customer or revenue numbers are available. Do not add any.
- Use only the numbers written in this file.

## Contact

- Name: Leonardo Gotardo
- Location: Londrina, Paraná, Brazil
- Email: leonardo.gotardo2@gmail.com
- Phone: +55 43 98817-7963
- GitHub: github.com/LeoGotardo
- LinkedIn: linkedin.com/in/leogotardo
- Portfolio: leogotardo.vercel.app
- Languages: Portuguese (native), English (full professional proficiency)

## Target

Junior / mid-level Software Developer. Strongest areas: embedded Linux + IoT (Raspberry Pi),
Python backends (FastAPI, Flask), and full-stack web/mobile (React, TypeScript, Capacitor).

## Education

- Analysis and Systems Development (Tecnólogo), IFPR — Instituto Federal do Paraná, Londrina.
  Apr 2022 – present.
  - Final-year project (TCC): MainDug, an open-source self-hostable password manager
    (Flask + PostgreSQL webservice + browser extension). See Projects.

## Work Experience

### Software Developer — IrisPay (Sep 2024 – present), Londrina-PR, Brazil

Brazilian fintech that converts traditional machines into smart self-service and vending systems
with proprietary payment technology. Work details are under NDA. What follows is the technology
I work with and the conditions I work in, not specific products.

**What I work with**
- Embedded Linux on Raspberry Pi devices that run unattended in the field:
  - Boot and kiosk display: Chromium kiosk, Plymouth splash, framebuffer.
  - Services and system: systemd and OpenRC services, watchdogs.
  - Distributions and security: DietPi and Alpine Linux, full-disk encryption with LUKS.
- Python services that control hardware:
  - GPIO: valves, buttons, flow sensors, stepper motors, using gpiozero, pigpio, lgpio and
    RPi.GPIO.
  - Devices and protocols: NFC card readers (PC/SC), serial protocols including the MDB vending
    bus, ESC/POS thermal printers.
  - Event-driven control with state machines, threading and asyncio.
- Python APIs (FastAPI, Flask) and real-time communication with payment servers over WebSockets
  and sockets.
- Kiosk and internal web frontends in PHP/Laravel. Maintenance of a legacy PHP (Yii2) web
  platform.
- Over-the-air updates for a fleet of devices:
  - Versioned releases with backup before each deploy.
  - Automatic rollback when a deploy fails, and quarantine of bad versions.
  - Written in bash, with sandboxed end-to-end tests.
- SD-card image building and flashing automation in bash, PowerShell and batch, with
  verification of the written image.
- Containerised web services (Docker, nginx) deployed to AWS through GitHub Actions.
- Hardware validation tooling and pytest suites for device logic.
- Engineering documentation: a code and image versioning standard, decision records,
  code-practice compliance reports and hardware test procedures.
- Earlier tasks (from my current resume): REST API development and integration, NFC/RFID
  hardware, SSH remote management, socket communication, web development for internal and
  client-facing systems.

**Working conditions**
- Devices have no keyboard and no screen access for debugging, and the network is unreliable.
  Everything has to recover by itself, which is why I rely on watchdogs, automatic rollback and
  state that survives a reboot.
- Problems span several layers at once: hardware, serial protocols, network and the operating
  system. I learned to isolate each layer and prove where a failure happens before fixing it.
- Hardware is low-power, so I learned to measure before optimising and to keep startup and hot
  paths lean.

### Service Desk — Persis Internet (Jul 2023 – Mar 2024), Londrina-PR, Brazil

Regional ISP with more than 100,000 customers.
- Solved complex internet and network problems for non-technical customers, often from
  ambiguous descriptions.
- Worked under pressure while keeping service quality high.
- Turned persistent customer issues into useful feedback.

## Partner — TLG-Web-Dev (Apr 2026 – present)

Small web development studio. I am one of the partners and build client sites.

- GP Barril site (37 of 82 commits mine): Next.js + TypeScript.
  - Hardened security and SEO. The Image Optimizer is locked to 3 hosts with fixed paths, which
    closed an open-proxy hole.
  - Canonical domain fixed. robots policy separates AI search agents from training crawlers.
  - The contact Server Action validates on the server and rate-limits to 3 sends per IP per
    10 minutes.
  - Analytics with Google Analytics and Microsoft Clarity.
- TLG site: Next.js + Tailwind CSS.

## Personal Projects

**noHarm — addiction-recovery support app (Dec 2025 – present). Live at noharm.site.**
- Backend (173 of 184 commits): FastAPI with Clean Architecture, SQLAlchemy + Alembic,
  PostgreSQL, Pydantic.
  - JWT auth with rotation, a token blacklist and single-use refresh tokens.
  - Real-time chat and friendships over Socket.IO.
  - Streak tracking with achievement badges.
  - AES-256 field-level encryption, XSS sanitisation (bleach), security headers, CORS hardening.
- Rate limiting in three layers on Redis. Atomic Lua scripts implement a sliding window,
  escalating lockout and 24 h strikes, and the limiter fails open if Redis is down.
  Client IP is validated against a trusted-proxy chain.
- Runs in production on AWS, provisioned with Terraform (ECS, ECR, ALB, RDS, Redis, IAM,
  Secrets Manager, GitHub OIDC). Docker, nginx, supervisord. Backup/restore scripts.
- GitHub Actions for deploy and security scans, plus Dependabot. Runbooks for rollback and
  JWT rotation.
- Backend test suite: 1,170 pytest tests collected (unit + integration).
- App (77 of 89 commits): Vite + React in JavaScript (no TypeScript in the repo), packaged for Android and iOS with Capacitor.
  - Firebase authentication, push and local notifications, Socket.IO client.
  - A custom Capacitor plugin for in-app updates.
  - 226 Playwright end-to-end test runs across mobile and desktop projects.
- Vercel serverless function proxies REST and relays Socket.IO to the backend. The same routes
  are mirrored in the Vite dev server so the E2E suite runs against relative URLs.

**PiTest — hardware test bench for Raspberry Pi 3B (Jun 2026 – present). 24 commits, all mine.**
- Runs on every boot with no keyboard or SSH: 7 automatic hardware tests (LAN, WLAN, boot health,
  USB topology, Wi-Fi hotspot with hostapd + dnsmasq, and more), with progress shown on screen.
- Results go to a web dashboard (Flask + SQLAlchemy + PostgreSQL) that keeps each board's history
  by MAC address. The operator confirms screen and LEDs on the site.
- systemd oneshot service. The exit code reflects pass/fail for cron/CI.
- Live at pitest.leogotardo.com.br.

**HookahSys backend (Aug 2026).**
- FastAPI + PostgreSQL + Redis in Docker Compose: auth and catalog CRUD (users, categories,
  sub-categories, brands).
- Reused and documented noHarm's security layer, including the inherited bugs and a security
  checklist.
- Grew from 57 to 84 tests after a mutation-testing audit (unit, integration and a 31-check E2E).

**MainDug — password manager, IFPR final-year project (Dec 2024 – present). 107 commits, all mine.**
- Open-source and self-hostable. Flask + PostgreSQL webservice, plus a browser extension that
  captures logins, offers autocomplete and reports usage.
- Argon2, the cryptography library, PyJWT, Flask-Login, Flask-WTF, Flask-Limiter, Alembic.
- Detects reused and leaked (pwned) passwords. Secure password generation, email password
  recovery, admin panel.
- pytest suite (67 test functions) and GitHub Actions CI. Full documentation in LaTeX
  (requirements, threat model, diagrams).
- The original MainDug (Jan 2023) was a Python desktop app with tkinter/customtkinter and MongoDB.
  Through it I learned cryptography, MVC and GUI programming.

**Grimório de Venetia — D&D 5.5 character creator (Jun 2026 – present). 70 commits, all mine.**
- React + TypeScript + Vite + Tailwind. Packaged as an Android app with Capacitor.
- 13-step creation wizard and a tabbed play sheet. The level-up flow handles ASI and
  multiclassing.
- Zustand, Zod, i18next (PT/EN), pixi.js, pdf-lib, react-markdown. Neon Postgres and Redis.
- 333 Vitest unit tests and 108 Playwright E2E runs (desktop + mobile). GitHub Actions for CI,
  release and security.
- Live at venetia.leogotardo.com.br.

**ReportGen — technical report builder (Feb 2026 – present). 43 commits, all mine.**
- React + Vite frontend, Express + Puppeteer backend that renders PDFs on the server.
- Bug-report, study-report and changelog templates. Exports to PDF, DOCX, print and JSON.
- PT/EN i18n, live preview, rate limiting (express-rate-limit) and input validation.
- Live at reportgen.leogotardo.com.br. Deployed on Render.

**Phishing Detector (May 2026).**
- Local JS heuristics: digit normalisation, brand-in-subdomain detection, Levenshtein
  typosquatting.
- Flask backend aggregates Google Safe Browsing, VirusTotal and URLhaus verdicts.
- Correct registered-domain extraction for two-level ccTLDs (.com.br, .co.uk).

**Custom Thread — Python library on PyPI (Jun 2024 – present).** Extends `threading.Thread` with return values,
exception propagation and callbacks. Zero dependencies, MIT licensed.

**ipTool (Mar 2026).** IP geolocation lookup: React + Vite + Express, Leaflet map, IPv4/IPv6
validation. Live at iptool.leogotardo.com.br.

**Maze generator and pathfinding visualizer (Jun 2025 – present).** Live at
maze.leogotardo.com.br.
- Started in vanilla JavaScript and rewritten in React 19 + Vite + Tailwind CSS in Apr 2026.
- Generates random mazes with depth-first backtracking on a configurable grid (9–41 rows,
  9–51 columns), with connectivity checks.
- Animates DFS and BFS step by step. A compare mode runs both on the same maze and reports nodes
  explored, path length and execution time.
- Includes an algorithms page with pseudocode, complexity and a comparison table.

**Talent Scout (Oct 2025).** Flask + SQLAlchemy system that classifies athletes into tiers with
a K-Nearest Neighbors model (scikit-learn). PCA, correlation matrix, radar charts, CSV import/export.

**GeoKnocker (Jun – Aug 2024).** Desktop port scanner and IP geolocation tool: Python sockets,
threading, CustomTkinter GUI.

**Hash Table in C (Nov – Dec 2025).** Separate chaining with automatic rehashing at a 0.75 load
factor.

**Stepper motor control (Aug 2026).** Raspberry Pi stepper driver with gpiozero, covered by
pytest.

**Claude Code tooling (2026).**
- Published `claude-handoff` (session hand-off skill) and `claude-report-gen` (PDF report
  client).
- Built an Obsidian knowledge vault that maintains itself: a SessionEnd hook captures what was
  learned in each coding session, and a cron job runs headless Claude 4x/day to organise notes
  and commit/push.

## Skills

- **Languages:** Python, TypeScript, JavaScript, PHP, SQL, Bash, C, Java, Lua, HTML, CSS,
  HCL (Terraform), LaTeX.
- **Backend:** FastAPI, Flask, Express, Laravel, Yii2, Next.js (Server Actions), SQLAlchemy,
  Alembic, Pydantic, Socket.IO, WebSockets, REST, JWT.
- **Frontend and mobile:** React, Vite, Next.js, Tailwind CSS, Zustand, Zod, i18next,
  Capacitor (Android/iOS), Firebase.
- **Data:** PostgreSQL (Neon, RDS), MySQL, SQLite, MongoDB, Redis (Lua scripts).
- **Testing:** pytest, Playwright, Vitest, mutation testing, E2E.
- **DevOps and cloud:** Docker, Docker Compose, nginx, Terraform, AWS (ECS, ECR, ALB, RDS, IAM,
  Secrets Manager), GitHub Actions, Vercel, Render, systemd, cron, Git.
- **Embedded and Linux:** Raspberry Pi (3, Zero), DietPi, Alpine Linux, OpenRC, initramfs,
  Plymouth, LUKS2, Chromium kiosk, framebuffer, GPIO (gpiozero, pigpio, lgpio, RPi.GPIO),
  pyserial, NFC (PC/SC), MDB vending protocol, ESC/POS printers, stepper motors, flow sensors.
- **Security:** Argon2, bcrypt, AES-256 field encryption, JWT rotation/blacklist, rate limiting,
  trusted-proxy handling, CORS, security headers, phishing detection.
- **Concepts:** state machines, threading/asyncio concurrency, Clean Architecture, MVC, atomic
  deploys with auto-rollback, protocol framing.

## Certificates

- Hardware Course (2015 – 2018): software and hardware repair, server administration and
  maintenance.
- Asimov Academy, "Python para iniciantes: do zero ao primeiro projeto" (Apr 2025).
- Asimov Academy, "Python para dados: do zero à análise completa" (May – Sep 2025).
- Asimov Academy, "Python para IA: do zero ao primeiro chatbot" (May – Sep 2025).
