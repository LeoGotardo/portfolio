## Quantification Suggestions

**Total Claims Found:** 12 claims needing quantification

Scope: personal projects, TLG-Web-Dev and Persis Internet only. The IrisPay experience entry is excluded from this analysis per the NDA constraint.

Note: a claim is treated as quantified only when it has a number plus a percentage, dollar amount, or multiplier. Several claims below already carry counts (e.g., test totals, host counts) but no outcome metric, so they are still flagged.

### Claims to Quantify

#### Claim 1: "One of the partners of a small web development studio; 1 paid client, GP Barril."
**Line:** 18
**Type:** Default (partnership / business scope)

**Questions to Ask Candidate:**
1. How many people are in the studio, and what share of the business is yours?
2. What is the total revenue or billing from GP Barril, or from all studio work, over the period?
3. Over what period (months) has the studio been active, and is there a pipeline beyond the one paid client?

**Template for Rewrite:**
> Co-owned a {team_size}-partner web development studio, delivering {revenue} in client billing across {client_count} clients since {start_month}

---

#### Claim 2: "locked Image Optimizer to 3 hosts, closing an open-proxy hole"
**Line:** 19
**Type:** Problem Solving (security fix)

**Questions to Ask Candidate:**
1. How was the open-proxy hole found, and how severe was it (could it be abused for traffic or SSRF)?
2. Was there evidence of abuse, and roughly how much unauthorized traffic or how many requests were blocked afterward?
3. How much of the site's image traffic or bandwidth did the change affect?

**Template for Rewrite:**
> Closed an open-proxy vulnerability in the GP Barril Image Optimizer by restricting it to {host_count} allowed hosts, cutting {metric} by {percentage}% and blocking {blocked_count} unauthorized requests

---

#### Claim 3: "rate-limited contact form to 3 sends per IP per 10 minutes"
**Line:** 19
**Type:** Building/Creating (rate limiting feature)

**Questions to Ask Candidate:**
1. How many spam or abusive submissions did the contact form receive before the limit?
2. How many submissions per week does the form get now, and how many were blocked?
3. Was the limit tuned after launch, and did any legitimate users complain?

**Template for Rewrite:**
> Added per-IP rate limiting to the GP Barril contact form (3 sends per 10 minutes), reducing spam submissions by {percentage}% and blocking {blocked_count} abusive requests per {period}

---

#### Claim 4: "Solved internet and network problems from ambiguous descriptions by non-technical customers; turned recurring issues into feedback."
**Line:** 22
**Type:** Problem Solving

**Questions to Ask Candidate:**
1. How many support tickets or calls did you handle per day or per shift?
2. What share of tickets did you resolve on first contact, or without escalation?
3. How many recurring issues did you turn into feedback, and did any of it lead to a process or product change?

**Template for Rewrite:**
> Resolved {ticket_count} internet and network support tickets per {period} for non-technical customers, achieving a {percentage}% first-contact resolution rate and turning {issue_count} recurring issues into product feedback

---

#### Claim 5: "a few beta testers"
**Line:** 26
**Type:** Launch/Release (noHarm beta)

**Questions to Ask Candidate:**
1. How many beta testers are there exactly?
2. How many are active weekly, and what is the retention rate after the first month?
3. Which platforms do they use (Android, iOS, web), and how many of each?

**Template for Rewrite:**
> Launched noHarm to {beta_count} beta testers across Android, iOS and web, with {percentage}% weekly active retention over {period}

---

#### Claim 6: "Backend (173 of 184 commits): FastAPI, Clean Architecture, JWT rotation with blacklist, Socket.IO chat, AES-256 field encryption, three-layer Redis rate limiting; 1,170 pytest test cases."
**Line:** 27
**Type:** Building/Creating

**Questions to Ask Candidate:**
1. How many requests per day does the backend handle, and how many concurrent Socket.IO connections does it support?
2. How much did the three-layer Redis rate limiting reduce abusive or failed requests?
3. What is the test coverage percentage, and how long does the full pytest suite take to run?

**Template for Rewrite:**
> Built the noHarm backend (FastAPI, Clean Architecture, Socket.IO, Redis) serving {user_count} users and handling {request_count} requests daily, with {coverage}% test coverage across 1,170 pytest cases

---

#### Claim 7: "Runs in production on AWS with Terraform and GitHub Actions."
**Line:** 28
**Type:** Launch/Release (production deployment)

**Questions to Ask Candidate:**
1. What uptime has the production system achieved over the last 3 or 6 months?
2. How often do you deploy, and how long does a GitHub Actions deploy take?
3. How many AWS resources or environments are managed through Terraform?

**Template for Rewrite:**
> Deployed noHarm to production on AWS using Terraform and GitHub Actions, achieving {uptime}% uptime and deploying {deploy_count} times per {period} with a {duration} pipeline

---

#### Claim 8: "App (77 of 89 commits): React, TypeScript, Capacitor for Android and iOS; 226 Playwright runs across mobile and desktop projects."
**Line:** 29
**Type:** Building/Creating

**Questions to Ask Candidate:**
1. How many active users run the app on Android and iOS, and what is the crash rate?
2. What fraction of Playwright runs catch regressions before release?
3. How long does the app take to build and ship to both stores?

**Template for Rewrite:**
> Built the noHarm mobile app (React, TypeScript, Capacitor) for Android and iOS, serving {user_count} users with a {percentage}% crash-free session rate, verified by {run_count} Playwright runs across mobile and desktop

---

#### Claim 9: "Runs on every boot with no keyboard or SSH: 7 automatic hardware tests, results kept per board (MAC address) in a Flask/PostgreSQL web dashboard."
**Line:** 32
**Type:** Building/Creating

**Questions to Ask Candidate:**
1. How many Raspberry Pi boards are running PiTest, and how many test runs have they logged?
2. How long does a full run of the 7 tests take, and how much manual testing time did it replace?
3. What percentage of hardware faults has PiTest caught before a board was deployed?

**Template for Rewrite:**
> Built PiTest, a Raspberry Pi 3B hardware test bench that runs 7 automated tests on every boot, tracking {board_count} boards and {run_count} runs in a Flask/PostgreSQL dashboard and cutting manual test time by {percentage}% (from {before} to {after})

---

#### Claim 10: "MainDug, open-source password manager, IFPR final-year project (Dec 2024 – present) / Flask/PostgreSQL webservice and browser extension; Argon2, reused and leaked-password detection, 67 pytest test functions, GitHub Actions CI."
**Line:** 34-35
**Type:** Building/Creating

**Questions to Ask Candidate:**
1. How many users or installs does MainDug have, and how many contributors beyond you?
2. How many passwords have been checked for reuse or leaks, and how accurate is the leaked-password detection?
3. What is the test coverage, and how long does the GitHub Actions CI run take?

**Template for Rewrite:**
> Built MainDug, an open-source password manager (Flask, PostgreSQL, browser extension) with Argon2 hashing and leaked-password detection, used by {user_count} users and checking {password_count} passwords, with {coverage}% test coverage across 67 pytest functions

---

#### Claim 11: "Grimório de Venetia, D&D 5.5 character creator ... React, TypeScript, Capacitor Android app; 333 Vitest tests, 108 Playwright runs."
**Line:** 37-38
**Type:** Building/Creating

**Questions to Ask Candidate:**
1. How many users have created characters, and how many downloads has the Android app had?
2. How many characters have been created in total over the period?
3. What share of the 333 Vitest tests and 108 Playwright runs cover critical flows, and how long does the suite take?

**Template for Rewrite:**
> Built Grimório de Venetia, a D&D 5.5 character creator (React, TypeScript, Capacitor), used by {user_count} users to create {character_count} characters, with {coverage}% test coverage across 333 Vitest tests and 108 Playwright runs

---

#### Claim 12: "Custom Thread (PyPI): Extends threading.Thread with return values, exception propagation and callbacks; zero dependencies, MIT."
**Line:** 40-41
**Type:** Building/Creating (open-source library)

**Questions to Ask Candidate:**
1. How many downloads per month does the package get on PyPI?
2. How many GitHub stars, forks, or known projects depend on it?
3. Has anyone reported bugs or contributed patches, and how quickly were they resolved?

**Template for Rewrite:**
> Published Custom Thread on PyPI, a threading.Thread extension with return values, exception propagation and callbacks, with zero dependencies, reaching {download_count} downloads per month and {star_count} GitHub stars

---
