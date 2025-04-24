# Jogo da Forca com Autômato Finito Determinístico (AFD)

Projeto desenvolvido para a disciplina de **Linguagens Formais e Autômatos**, ministrada pela professora **Letícia Toledo** na instituição **UDF**.

## Autores
- **Augusto Liberato**
- **Gustavo Emanuel**  
Alunos do curso de **Ciência da Computação**.

---

## 📌 Descrição Geral

Este projeto consiste na implementação de um **Jogo da Forca** que simula seu funcionamento utilizando um **Autômato Finito Determinístico (AFD)**. O objetivo é aplicar os conceitos teóricos de autômatos na prática, modelando as transições de estados do jogo com base nas ações do jogador.

---

## 🧩 Tecnologias Utilizadas

- **React** com o template **Vite**
- **React Flow** para visualização dos estados do autômato
- **Material UI (MUI)** para estilização e interface moderna
- **JavaScript (ES6)** e **CSS** para lógica e animações

---

## ⚙️ Funcionamento do Jogo

O jogo da forca funciona da seguinte forma:

- O sistema sorteia aleatoriamente uma palavra de um arquivo JSON local (`public/palavras.json`).
- O jogador tenta adivinhar as letras dessa palavra.
- A cada letra errada, perde uma tentativa.
- O jogo termina em **vitória** se a palavra for completada ou em **derrota** se as tentativas se esgotarem.

---

## 🔄 Modelagem com AFD

### 🧾 Estados

- **q0**: Estado inicial.
- **q1**: Estado do jogo em andamento.
- **q2**: Estado de vitória (final).
- **q3**: Estado de derrota (final).

### 🧭 Transições

| Estado Atual | Entrada                  | Próximo Estado |
|--------------|--------------------------|----------------|
| q0           | Início do jogo           | q1             |
| q1           | Letra correta ou errada  | q1             |
| q1           | Palavra completa         | q2             |
| q1           | Tentativas esgotadas     | q3             |

As transições são **determinísticas**, o que caracteriza um AFD.

### 🖼️ Diagrama de Transições

O diagrama é exibido visualmente no jogo utilizando o **React Flow**, com animações diferentes para cada estado final:
- `q2` (vitória): animação de sucesso.
- `q3` (derrota): animação de falha.
- `q1`: pisca para indicar estado ativo.

---

## 📚 Documentação Técnica

A documentação detalha:
- As **regras** do jogo.
- A **modelagem com autômato**.
- O **fluxo de transições** e estados do AFD.

Ela pode ser consultada no arquivo `JogoDaForca_D1.pdf` dentro do sistema BlackBoard da disciplina.

---

## 🚀 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/forca-automato.git
   cd forca-automato

2. Instale as dependências:
    ```bash
    npm install

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev

4. Acesse no navegador:
    http://localhost:5173

## 🌐 Deploy

O projeto está hospedado via GitHub Pages e pode ser acessado em:

https://gustavo-abreu-ribeiro.github.io/jogo-da-forca/

Caso veja a versão antiga após atualizações, limpe o cache do navegador ou force o reload com Ctrl + F5.