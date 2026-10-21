import type { Text } from "@/lib/i18n";

export type Job = {
  role: Text;
  org: string;
  period: string;
  place: Text;
  intro: Text;
  points: Text[];
  tags: string[];
};

// IrisPay is under NDA: only technologies, working conditions and skills — no products, clients or numbers.
export const jobs: Job[] = [
  {
    role: { en: "Software Developer", pt: "Desenvolvedor de Software" },
    org: "IrisPay",
    period: "Sep 2024 – Present",
    place: { en: "Londrina-PR, Brazil", pt: "Londrina-PR, Brasil" },
    intro: {
      en: "Brazilian fintech that converts traditional machines into smart self-service and vending systems with proprietary payment technology.",
      pt: "Fintech brasileira que transforma máquinas tradicionais em sistemas inteligentes de autoatendimento e vending com tecnologia de pagamento própria.",
    },
    points: [
      {
        en: "Embedded Linux on Raspberry Pi devices running unattended in the field: kiosk display, systemd/OpenRC services, watchdogs, LUKS encryption.",
        pt: "Linux embarcado em dispositivos Raspberry Pi rodando sozinhos em campo: display em modo quiosque, serviços systemd/OpenRC, watchdogs, criptografia LUKS.",
      },
      {
        en: "Python services that control hardware: GPIO, NFC readers, serial protocols and thermal printers, with state machines, threading and asyncio.",
        pt: "Serviços Python que controlam hardware: GPIO, leitores NFC, protocolos seriais e impressoras térmicas, com máquinas de estado, threading e asyncio.",
      },
      {
        en: "Python APIs (FastAPI, Flask) and real-time communication over WebSockets and sockets; PHP/Laravel frontends and legacy Yii2 maintenance.",
        pt: "APIs Python (FastAPI, Flask) e comunicação em tempo real via WebSockets e sockets; frontends em PHP/Laravel e manutenção de um sistema legado em Yii2.",
      },
      {
        en: "Over-the-air updates with versioned releases, automatic rollback and sandboxed end-to-end tests; containerised services on AWS via GitHub Actions.",
        pt: "Atualizações remotas (OTA) com releases versionadas, rollback automático e testes ponta a ponta isolados; serviços em contêineres na AWS via GitHub Actions.",
      },
      {
        en: "No keyboard, no screen, unreliable network: everything has to recover by itself, and every failure is isolated layer by layer before fixing.",
        pt: "Sem teclado, sem tela, rede instável: tudo precisa se recuperar sozinho, e cada falha é isolada camada por camada antes de ser corrigida.",
      },
    ],
    tags: ["Raspberry Pi", "Python", "FastAPI", "systemd", "Bash", "Docker", "AWS", "Laravel"],
  },
  {
    role: { en: "Partner", pt: "Sócio" },
    org: "TLG-Web-Dev",
    period: "Apr 2026 – Present",
    place: { en: "Web development studio", pt: "Estúdio de desenvolvimento web" },
    intro: {
      en: "Small studio where I'm one of the partners and build client sites.",
      pt: "Pequeno estúdio em que sou um dos sócios e desenvolvo sites para clientes.",
    },
    points: [
      {
        en: "GP Barril site (Next.js + TypeScript): Image Optimizer locked to 3 hosts, closing an open-proxy hole.",
        pt: "Site do GP Barril (Next.js + TypeScript): Image Optimizer restrito a 3 hosts, fechando uma brecha de proxy aberto.",
      },
      {
        en: "Canonical domain fix and a robots policy that separates AI search agents from training crawlers.",
        pt: "Correção do domínio canônico e uma política de robots que separa os agentes de busca de IA dos crawlers de treinamento.",
      },
      {
        en: "Contact Server Action validated on the server and rate-limited to 3 sends per IP per 10 minutes.",
        pt: "Server Action de contato validada no servidor e limitada a 3 envios por IP a cada 10 minutos.",
      },
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "SEO", "Web Security"],
  },
  {
    role: { en: "Service Desk", pt: "Service Desk" },
    org: "Persis Internet",
    period: "Jul 2023 – Mar 2024",
    place: { en: "Londrina-PR, Brazil", pt: "Londrina-PR, Brasil" },
    intro: {
      en: "Regional ISP with more than 100,000 customers.",
      pt: "Provedor de internet regional com mais de 100.000 clientes.",
    },
    points: [
      {
        en: "Solved complex network problems for non-technical customers, often from ambiguous descriptions.",
        pt: "Resolvi problemas complexos de rede para clientes leigos, muitas vezes a partir de descrições ambíguas.",
      },
      {
        en: "Kept service quality high under pressure and turned persistent issues into useful feedback.",
        pt: "Mantive a qualidade do atendimento sob pressão e transformei problemas recorrentes em feedback útil.",
      },
    ],
    tags: ["Networking", "Technical Support", "Problem Solving"],
  },
];
