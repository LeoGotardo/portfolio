## Resume Review

### Verdict: NEEDS_WORK

(No job description was provided, so fit is assessed against a generic embedded/backend/full-stack developer role.)

### First Impression (6-Second Scan)
Clean, one-page layout with clear sections. In 6 seconds I see: Software Developer at IrisPay since Sep 2024, Python, embedded Linux, Raspberry Pi, FastAPI, AWS/Terraform. The project list is strong and specific. Negatives: the job experience section is thin next to the projects. The candidate looks like a junior (about 2 years of work, degree finishing Jul 2026) with a strong side-project portfolio.

### Strengths
- Projects (lines 26-41) carry verifiable, concrete numbers (commit ratios, test counts, named security mechanisms) and live URLs I can check.
- Honest scoping: "a few beta testers" (line 26) and "1 paid client" (line 18) show candor, which builds trust.
- Commit-share figures ("173 of 184", "37 of 82") make ownership clear.
- The GP Barril bullet (line 19) is specific: it names the vulnerability (open image proxy) and the fix.
- The embedded reliability bullet (line 14) shows real operational thinking: watchdogs, rollback, state that survives reboot.
- The skills section matches the experience and projects shown. No obvious padding, though see below.

### Concerns

#### Vague Claims
- **Line 13:** "Work with embedded Linux on unattended Raspberry Pi devices, Python hardware services, FastAPI/Flask APIs, over-the-air updates, and maintenance of a legacy PHP (Yii2) platform."
  - Issue: A list of technologies with no ownership, outcome, or scale. This is the current job and it has no result.
  - Question I'd ask: "What did you personally build or ship at IrisPay? How many devices? What did the OTA update system do before and after you?"
  - Suggestion: Name one or two things you owned and the outcome (for example, fewer failed updates or less downtime), within NDA limits. Describe the fleet size in ranges, not client names.
- **Line 14:** "Rely on watchdogs, automatic rollback..."
  - Issue: Describes the environment and design principles, not what the candidate did. "Rely on" doesn't say who built it.
  - Question: "Did you design the rollback mechanism or use an existing one? Describe a failure it caught."
- **Line 15:** "Learned to isolate each layer... and prove where a failure happens before fixing it."
  - Issue: A learning statement, not an accomplishment. It reads as filler.
  - Suggestion: Replace it with one concrete debugging example and its result.
- **Line 22:** "turned recurring issues into feedback"
  - Issue: Feedback to whom, and what changed?
- **Line 17:** "One of the partners"
  - Issue: How many partners, and what is your role? Equity or just a title?

#### Credibility Questions
- **Line 8 / Line 26:** "in production on AWS with Terraform" alongside "a few beta testers."
  - Concern: Production infrastructure and 1,170 tests for a handful of users looks like over-engineering or portfolio-driven work. That is fine, but the summary leads with "in production" and could be read as overstating the real usage.
  - What I'd verify: Actual users, uptime, cost, and what Terraform manages.
- **Line 27:** "1,170 pytest test cases" and "226 Playwright runs"
  - Concern: Test counts and "runs" are weak metrics. Parametrized tests inflate counts, and "Playwright runs" is ambiguous (tests or executions?). Coverage and what the tests catch would be better evidence.
  - What I'd verify: Coverage, CI results, whether the tests find real bugs.
- **Lines 27, 29:** Backend and app have 173/184 and 77/89 commits by the candidate. This points to a solo project, so the "Clean Architecture" and security claims (AES-256 field encryption, JWT rotation) are the candidate's alone. I'd review the repo, especially key management for the AES-256 encryption.
- **Dates:** Several projects are "present" and began in Jun 2026 (PiTest, Grimório), as did the studio (Apr 2026). Four active projects plus a full-time job plus a degree finishing Jul 2026 is a lot. Today is Oct 2026, so the degree should be shown as completed or the date checked. A reviewer may question whether the depth is real.
- **Line 52:** Education "Apr 2022 – Jul 2026". Confirm graduation status. Also MainDug is listed as a final-year project started Dec 2024.
- **Skills:** Laravel, C, GPIO, and LUKS are listed but barely or never demonstrated in the experience or projects. Laravel in particular does not appear anywhere else. Expect to be asked about them.
- **Line 12 vs. 21:** The gap between Persis (ends Mar 2024) and IrisPay (starts Sep 2024) is about 5 months. This is minor, but it is unexplained.

### Red Flags
None disqualifying. The main risk is that the resume shows a very strong personal portfolio but little demonstrated impact in a paid professional setting.

### Job Fit Analysis
No job description provided. Generically:
- **Match:** Python backend, FastAPI/Flask, embedded Linux/IoT, testing discipline, CI/CD and cloud basics.
- **Gaps:** Little evidence of team collaboration, code review, or working at scale. Impact at the current employer is not quantified. Only about 2 years of professional experience.
- **Risk:** A junior-to-mid level candidate whose professional section is weaker than the side projects. Interviewers will ask how much of the skill transfers to team settings.

### Interview Questions

1. "Walk me through the most difficult field failure you diagnosed at IrisPay and how you proved the cause." - To verify: line 15 and the embedded experience.
2. "Who designed the OTA update and rollback system, and what is your part in it?" - To verify: lines 13-14.
3. "How is the AES-256 encryption key managed in noHarm? What happens if the key is rotated?" - To verify: security claims, line 27.
4. "What do the 1,170 tests cover, and which real bugs did they catch?" - To verify: test metrics.
5. "How did you find the Image Optimizer hole at GP Barril, and how did you confirm the fix?" - To verify: line 19.
6. "How do you split time between a full-time job, a studio, a degree, and four projects?" - To understand: commitment and sustainability.
7. "Where have you used Laravel, C, and LUKS?" - To understand: skills not shown in experience.
8. "What is the PiTest hardware test failure mode you most often saw?" - To verify: line 32.

### Recommendations

Priority improvements needed:
1. Rewrite the IrisPay section (lines 13-15) around 2-3 owned deliverables with outcomes, within NDA limits. Drop the "Learned to..." line or replace it with a concrete example.
2. Replace weak metrics (test "runs", case counts) with coverage or defects found, and soften the "in production" framing in the summary to match the real user base.
3. Remove or support listed skills with no evidence (Laravel, C, LUKS, GPIO) and fix the education status/date. Clarify the studio partnership (partner count, your role).

### Overall Assessment

A specific, honest, and technically credible resume for an early-career developer, with a strong project portfolio and good ownership signals. The weak spot is the current job entry, which describes the environment and not the candidate's achievements, and a few metrics read as padded. As written, it would likely get an interview for a junior or mid role, but it needs sharper professional impact to be compelling.
