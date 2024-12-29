# 🍴 **Food Explorer**

<p align="center">
  <a href="#project">📄 Projeto</a> •
  <a href="#database">🗃️ Database</a> •
  <a href="#technologies">🛠️ Tecnologias</a> •
  <a href="#usage">🚀 Executar</a>
</p>

---

## 📄 Projeto

O **Food Explorer** é uma aplicação de cardápio digital, desenvolvida como o desafio final do curso **Explorer** da Rocketseat.
O objetivo do projeto é a criação de uma plataforma em que os usuários clientes possam filtrar e visualizar detalhes de pratos de um restaurante para realizar pedidos, enquanto os usuários administradores têm a capacidade de gerenciar o cardápio, podendo criar novos pratos, editá-los e excluí-los. Essa API se conecta com o front-end, assim permitindo que os dados da aplicação sejam armazenados em um banco de dados corretamente, e também garantindo a autentificação e autorização dos usuários para as rotas permitidas.

Neste repositório está disponível o back-end do projeto, já o repositório do **front-end** está disponível [aqui](https://github.com/larissamateini/web-foodexplorer).

🔗 **Acesse a aplicação aqui**: [Food Explorer](https://menu-food-explorer.netlify.app/)

---

## 🗃️ Database

O banco de dados é composto pelas seguintes tabelas:

- **users**: Usuário comum ou administrador
- **dishes**: Estrutura dos pratos indiviuais (criados apenas pelos usuários administradores)
- **ingredients**: Tags de ingredientes dos pratos

---

## 🛠️ Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Bcrypt.js**: Criptografia de senhas
- **Node.js**: Ambiente de execução para JavaScript no back-end
- **Express.js**: Framework para construção da API
- **Knex.js**: Construtor de queries SQL
- **SQLite**: Banco de dados leve, baseado em arquivos
- **SQLite3**: Driver do SQLite para Node.js
- **cookie-parser**: Middleware para ler e manipular cookies
- **express-async-errors**: Tratamento de erros assíncronos no Express
- **JSON Web Token (JWT)**: Autenticação via tokens JWT
- **Multer**: Middleware para upload de arquivos
- **PM2**: Gerenciador de processos para produção
- **CORS**: Habilitação de compartilhamento de recursos entre origens
- **dotenv**: Carregamento de variáveis de ambiente

---

## 🚀 Para executar localmente

1. **Instale o Node.js** e o **npm** na sua máquina, se ainda não estiverem instalados.

2. **Clone este repositório**:
    ```bash
    git clone https://github.com/larissamateini/api-foodexplorer.git
    ```

3. **Instale as dependências**:
    ```bash
    npm install
    ```

4. **Execute as migrações do banco de dados**:
    ```bash
    npm run migrate
    ```

5. **Inicie o servidor**:
    ```bash
    npm start
    ```

Agora, a API estará disponível para uso local.

---

### 📜 Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais informações.
