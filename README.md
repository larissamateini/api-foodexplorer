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

Neste repositório, está disponível o **back-end** do projeto.

🔗 **Acesse a aplicação aqui**:  
[Food Explorer](https://food-explorer-web00.netlify.app/)

---

## 🗃️ Database

- **users**: Usuário comum ou administrador
- **dishes**: Estrutura dos pratos indiviuais criados pelos administradores
- **ingredients**: Tags de ingredientes dos pratos
- **favorites**: Pratos favoritos do usuário comum
- **carts**: Carrinho do usuário

---

## 🛠️ Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Bcrypt.js**: Criptografia de senhas
- **Node.js**: Ambiente de execução para JavaScript no back-end
- **Express.js**: Framework para construção da API
- **Knex.js**: Construtor de queries SQL
- **SQLite**: Banco de dados leve, baseado em arquivos
- **SQLite3**: Driver do SQLite para Node.js
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
    git clone https://github.com/seu-usuario/food-explorer-backend.git
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
