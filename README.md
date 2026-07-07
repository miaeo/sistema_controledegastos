<p align="center">
  <img width="80" height="91" alt="logo" src="https://github.com/user-attachments/assets/e09f2555-1f93-4e0a-adf5-fdb62d1f96b3" /> 
</p>

<p align="center">
  Sistema web para gerenciamento de pessoas, registro de transações e visualização de resumos financeiros.
</p>

<p align="right">
  <img src="https://img.shields.io/badge/status-finalizado-blue">
  <img src="https://img.shields.io/badge/.NET-10.0-purple">
  <img src="https://img.shields.io/badge/React-19-61DAFB">
</p>

---

## Sobre o projeto

O **Sistema de Controle de Gastos** é uma aplicação web desenvolvida para gerenciamento de receitas e despesas.

O sistema permite:

- Cadastro, listagem e exclusão de pessoas;
- Cadastro e listagem de transações;
- Visualização do resumo financeiro por pessoa;
- Visualização do resumo financeiro geral.

## Regras de negócio
- Pessoas menores de 18 anos só podem ter transações do tipo despesa.
- Ao excluir uma pessoa, todas as transações associadas são excluídas automaticamente.
- Toda transação deve estar vinculada a uma pessoa previamente cadastrada.

---

## Instalação Local
### Pré-requisitos
- [.NET SDK 10.0](https://dotnet.microsoft.com/pt-br/download)
- [Node.js](https://nodejs.org/)
- npm

### 1. Clone o repositório

```bash
git clone https://github.com/miaeo/sistema_controledegastos.git
cd sistema_controledegastos
```

### 2. (Backend) Entre na pasta e restaure as dependências

```bash
cd api
dotnet restore
```

### 3. Inicie o servidor com:

```bash
dotnet run
```

A API ficará disponível em http://localhost:5101/swagger/index.html.

### 4. (Frontend) Abra outro terminal e instale as dependências

```bash
cd web
npm install
```

### 5. Inicie a aplicação com:

```bash
npm run dev
```

O frontend pode ser acessado em http://localhost:5173 após iniciar o servidor.
<p align="right">
  <sub>
    O banco de dados SQLite (<code>controle.db</code>) já acompanha o projeto, vazio e pronto pra uso, para facilitar a execução.
    <br>Caso prefira recriá-lo do zero, rode <code>dotnet ef database update</code> dentro da pasta <code>api/</code>.
  </sub>
</p>

---

## Estrutura do projeto
```bash
sistema_controledegastos/
├── api/
│   ├── controllers/
│   ├── dados/
│   ├── modelos/
│   ├── Migrations/
│   ├── controle.db
│   └── Program.cs
├── web/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── config.ts
│   │   └── index.css
│   └── package.json
├── .gitignore
└── README.md
```

## Interface
<p align="center">
  <img width="1280" height="720" alt="GIF sistema" src="https://github.com/user-attachments/assets/04fe7759-1f3c-4f6e-a4ef-70162d520582" />
</p>



<br>
<div align="right">Made with 💜 by <a href="https://github.com/miaeo">miaeo</a>.</div>
