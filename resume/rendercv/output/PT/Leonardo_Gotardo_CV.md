# Leonardo Gotardo's CV

- Phone: +55 43 98817 7963
- Email: [leonardo.gotardo2@gmail.com](mailto:leonardo.gotardo2@gmail.com)
- Location: Londrina, Brasil
- Website: [leogotardo.com.br](https://leogotardo.com.br/)
- LinkedIn: [leogotardo](https://linkedin.com/in/leogotardo)
- GitHub: [LeoGotardo](https://github.com/LeoGotardo)


# Resumo
Desenvolvedor backend Python e full-stack React, com experiência em Linux embarcado/IoT, demonstrada no noHarm (em produção na AWS com Terraform), no PiTest (hardware Raspberry Pi) e no MainDug.

# Experiência
## **Desenvolvedor de Software**, IrisPay -- Londrina, Brasil

Set 2024 – presente

- Trabalho com Linux embarcado em dispositivos Raspberry Pi autônomos, serviços Python de controle de hardware, APIs FastAPI/Flask, atualizações remotas (OTA) e manutenção de uma plataforma legada em PHP (Yii2).

- Uso watchdogs, rollback automático e estado que sobrevive ao reboot, já que os dispositivos não têm acesso à tela e a rede é instável.

- Aprendi a isolar cada camada (hardware, serial, rede, SO) e provar onde a falha acontece antes de corrigi-la.



## **Sócio**, TLG-Web-Dev

Abr 2026 – presente

- Um dos sócios de um pequeno estúdio de desenvolvimento web; 1 cliente pago, GP Barril.

- Site do GP Barril (Next.js; 37 de 82 commits meus): restringi o Image Optimizer a 3 hosts, fechando uma brecha de proxy aberto; limitei o formulário de contato a 3 envios por IP a cada 10 minutos.



## **Service Desk**, Persis Internet -- Londrina, Brasil

Jul 2023 – Mar 2024

Provedor de internet regional.

- Resolvi problemas de internet e rede a partir de descrições ambíguas de clientes leigos; transformei problemas recorrentes em feedback.



# Projetos
## **[noHarm](https://noharm.site)**

Dez 2025 – presente

App de apoio à recuperação de dependências, no ar com alguns beta testers.

- Backend (173 de 184 commits): FastAPI, Clean Architecture, rotação de JWT com blacklist, chat via Socket.IO, criptografia AES-256 por campo, rate limiting em três camadas no Redis; 1.170 casos de teste pytest.

- Em produção na AWS com Terraform e GitHub Actions.

- App (77 de 89 commits): React (JavaScript), Vite e Capacitor para Android e iOS; 226 execuções Playwright em projetos mobile e desktop.



## **[PiTest](https://pitest.leogotardo.com.br)**

Jun 2026 – presente

Bancada de testes de hardware para Raspberry Pi 3B.

- Roda a cada boot sem teclado nem SSH: 7 testes automáticos de hardware, com resultados guardados por placa (endereço MAC) em um painel web Flask/PostgreSQL.



## **[MainDug](https://github.com/LeoGotardo/MainDugWeb)**

Dez 2024 – presente

Gerenciador de senhas open-source, TCC do IFPR.

- Webservice Flask/PostgreSQL e extensão de navegador; Argon2, detecção de senhas reutilizadas e vazadas, 67 funções de teste pytest, CI com GitHub Actions.



## **[Grimório de Venetia](https://venetia.leogotardo.com.br)**

Jun 2026 – presente

Criador de personagens de D&D 5.5.

- App Android em React, TypeScript e Capacitor; 333 testes Vitest, 108 execuções Playwright.



## **[Custom Thread](https://pypi.org/project/CustomThread/)**

Jun 2024 – presente

Biblioteca Python no PyPI.

- Estende threading.Thread com valores de retorno, propagação de exceções e callbacks; zero dependências, licença MIT.



# Habilidades
**Linguagens:** Python, TypeScript, JavaScript, PHP, SQL, Bash, C

**Backend/Dados:** FastAPI, Flask, Laravel, Next.js, SQLAlchemy, Socket.IO, PostgreSQL, Redis

**Frontend/Testes:** React, Tailwind CSS, Capacitor, pytest, Playwright, Vitest

**DevOps/Embarcados:** Docker, Terraform, AWS, GitHub Actions, systemd, GPIO, LUKS

**Idiomas:** Português (nativo), Inglês (proficiência profissional plena)

# Formação
## **IFPR (Instituto Federal do Paraná)**, Análise e Desenvolvimento de Sistemas (Tecnólogo) -- Londrina, Brasil
Abr 2022 – Jul 2026


