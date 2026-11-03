# Conselho Estudantil do Ensino Médio (CEEM)
## Plataforma Institucional Oficial & Diário Deliberativo

> **Idealizador e Proponente da Iniciativa:** Henry Vasconcellos  
> **Status:** Proposta-Base de Fundação em Fase de Organização e Apresentação  
> **Repositório Oficial:** [github.com/snowLH/conselho-estudantil](https://github.com/snowLH/conselho-estudantil)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FsnowLH%2Fconselho-estudantil)

---

## 🏛️ Sobre o Projeto

O **Conselho Estudantil do Ensino Médio (CEEM)** é uma plataforma cívica e representativa criada para organizar a manifestação coletiva dos estudantes, promovendo o diálogo transparente entre as turmas e a administração escolar.

Inspirado na solidez e organização visual de organizações cívicas como o Movimento Brasil Livre (MBL), o projeto foi desenvolvido com uma identidade visual séria e moderna, longe de landing pages genéricas ou modelos escolares tradicionais.

---

## 🚀 Principais Módulos da Plataforma

1. **Página Inicial:**
   - Chamada solene: *"Uma representação estudantil construída pela participação."*
   - Indicadores cívicos em tempo real (turmas conectadas, pautas em tramitação, 100% transparência).
   - Os 5 Princípios de Fundação (Anexo II: *Representar, Ouvir, Debater, Organizar, Agir*).
   - Área de destaque: **Últimas Decisões**.
   - Pautas em debate e notícias oficiais.

2. **Área "Últimas Decisões" (Diário Deliberativo):**
   - Sistema de status rigoroso: *Em análise, Em discussão, Aprovada pelo Conselho, Encaminhada à direção, Aguardando resposta, Em execução, Concluída, Não aprovada*.
   - Diferenciação nítida entre propostas em debate e decisões aprovadas.
   - Filtros instantâneos por status, categoria e pesquisa textual.
   - Ficha detalhada com histórico cronológico, posição de cada turma (1º, 2º e 3º ano) e documentos anexados.

3. **Sobre o Conselho:**
   - Objetivos, 6 princípios fundamentais (Art. 2º do Estatuto), declaração solene e limites regimentais perante a Direção Escolar (Art. 23).

4. **Organização e Estrutura:**
   - Diagrama institucional: Soberania discente, representantes de turma, os **Três Pilares Centrais** (mantidos abertos e configuráveis em processo de deliberação) e o fluxo do requerimento até a Direção.

5. **Propostas e Pautas (Modelo Anexo I):**
   - Registro estruturado sob o formulário oficial de 7 seções: problema, solução, justificativa, votos das salas e despacho.

6. **Documentos Oficiais:**
   - Biblioteca pública com leitor em modal: **Estatuto de Fundação (10 capítulos e 35 artigos transcritos na íntegra)**, Anexo I, Anexo II, atas e relatórios com botão de impressão e download.

7. **Canal Participe & Ouvidoria:**
   - Formulário para envio de sugestões pelos estudantes com seleção de turma, categoria, opção de anonimato e salvaguarda de moderação ética (Art. 26).

8. **Painel Administrativo (`/admin`):**
   - Protegido por autenticação (sessão com cookies `HttpOnly`).
   - CRUD completo de decisões, pautas, documentos, comunicados e triagem da caixa de ouvidoria.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions & Route Handlers)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Persistência:** Banco de dados relacional em arquivo JSON transacional atômico (`data/db.json`), garantindo portabilidade imediata e compatibilidade com Supabase.

---

## 📦 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/snowLH/conselho-estudantil.git

# Acesse o diretório
cd conselho-estudantil

# Instale as dependências
npm install

# Inicie o servidor em modo de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Compilação de Produção

```bash
npm run build
npm run start
```

---

## 🔐 Acesso ao Painel Administrativo

- **Rota:** `/admin` ([http://localhost:3000/admin](http://localhost:3000/admin))
- **Senha Padrão:** `conselho2026` *(configurável via variável de ambiente `ADMIN_SECRET_KEY`)*

---

## ⚖️ Licença e Esclarecimento Institucional

O Conselho Estudantil do Ensino Médio é uma **proposta-base de organização** idealizada por **Henry Vasconcellos**. O projeto é aberto à comunidade escolar para consulta pública, aperfeiçoamento e deliberação coletiva (Art. 35 do Estatuto).
