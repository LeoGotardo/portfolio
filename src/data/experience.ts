import type { Resources } from "@/lib/i18n";

// Role, place, intro and points are in src/locales/<language>/jobs.json, keyed by id.
export type Job = {
  id: keyof Resources["jobs"];
  org: string;
  period: string;
  tags: string[];
};

// IrisPay is under NDA: only technologies, working conditions and skills — no products, clients or numbers.
export const jobs: Job[] = [
  {
    id: "irispay",
    org: "IrisPay",
    period: "Sep 2024 – Present",
    tags: ["Raspberry Pi", "Python", "FastAPI", "systemd", "Bash", "Docker", "AWS", "Laravel"],
  },
  {
    id: "tlg",
    org: "TLG-Web-Dev",
    period: "Apr 2026 – Present",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "SEO", "Web Security"],
  },
  {
    id: "persis",
    org: "Persis Internet",
    period: "Jul 2023 – Mar 2024",
    tags: ["Networking", "Technical Support", "Problem Solving"],
  },
];
