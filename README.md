# API de Gerenciamento de Tarefas

## Instalação e Execução

1. Clone o repositório
```bash
git clone https://github.com/alison-luiz/2b-engenharia-7s
cd 2b-engenharia-7s
```

2. Configure o ambiente
```bash
# Copie o arquivo .env.example para .env
cp .env.example .env
```

3. Inicie o banco de dados com Docker
```bash
docker-compose up -d
```

4. Instale as dependências
```bash
yarn install
```

5. Inicie o servidor em modo desenvolvimento
```bash
yarn start:dev
```

O servidor estará rodando em `http://localhost:3000`

## Autenticação

Todas as rotas requerem autenticação JWT. Inclua o token no header das requisições:

```
Authorization: Bearer {{token}}
```

## Rotas de Autenticação

### Criar Usuário
- **POST** `/users`
- **Body:**
```json
{
    "firstName": "Alison",
    "lastName": "Luiz",
    "email": "alison_luiz@outlook.com.br",
    "password": "senha@123"
}
```
- **Retorno (201 Created):**
```json
{
    "id": "uuid-do-usuario",
    "firstName": "Alison",
    "lastName": "Luiz",
    "email": "alison_luiz@outlook.com.br",
    "roles": ["USER"],
    "createdAt": "2025-05-28T10:00:00.000Z",
    "updatedAt": "2025-05-28T10:00:00.000Z"
}
```

### Login
- **POST** `/auth/login`
- **Body:**
```json
{
    "email": "alison_luiz@outlook.com.br",
    "password": "senha@123"
}
```
- **Retorno (200 OK):**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": "uuid-do-usuario",
        "firstName": "Alison",
        "lastName": "Luiz",
        "email": "alison_luiz@outlook.com.br",
        "roles": ["USER"]
    }
}
```

## Rotas de Tarefas

### Criar Tarefa
- **POST** `/tasks`
- **Body:**
```json
{
    "title": "Implementar autenticação",
    "description": "Implementar sistema de autenticação JWT com refresh token",
    "dueDate": "2025-05-28"
}
```
- **Retorno (201 Created):**
```json
{
    "id": "uuid-da-tarefa",
    "title": "Implementar autenticação",
    "description": "Implementar sistema de autenticação JWT com refresh token",
    "completed": false,
    "dueDate": "2025-05-28",
    "createdAt": "2025-05-28T10:00:00.000Z",
    "updatedAt": "2025-05-28T10:00:00.000Z",
    "user": {
        "id": "uuid-do-usuario",
        "firstName": "Alison",
        "lastName": "Luiz",
        "email": "alison_luiz@outlook.com.br",
        "roles": ["USER"]
    }
}
```

### Listar Todas as Tarefas
- **GET** `/tasks`
- **Retorno (200 OK):**
```json
[
    {
        "id": "uuid-da-tarefa-1",
        "title": "Implementar autenticação",
        "description": "Implementar sistema de autenticação JWT",
        "completed": false,
        "dueDate": "2025-05-28",
        "createdAt": "2025-05-28T10:00:00.000Z",
        "updatedAt": "2025-05-28T10:00:00.000Z",
        "user": {
            "id": "uuid-do-usuario",
            "firstName": "Alison",
            "lastName": "Luiz",
            "email": "alison_luiz@outlook.com.br",
            "roles": ["USER"]
        }
    },
    {
        "id": "uuid-da-tarefa-2",
        "title": "Outra tarefa",
        "description": "Descrição da outra tarefa",
        "completed": true,
        "dueDate": "2024-03-25",
        "createdAt": "2024-03-19T10:00:00.000Z",
        "updatedAt": "2024-03-19T10:00:00.000Z",
        "user": {
            "id": "uuid-do-usuario",
            "firstName": "Alison",
            "lastName": "Luiz",
            "email": "alison_luiz@outlook.com.br",
            "roles": ["USER"]
        }
    }
]
```

### Buscar Tarefa por ID
- **GET** `/tasks/:id`
- **Retorno (200 OK):**
```json
{
    "id": "uuid-da-tarefa",
    "title": "Implementar autenticação",
    "description": "Implementar sistema de autenticação JWT",
    "completed": false,
    "dueDate": "2025-05-28",
    "createdAt": "2025-05-28T10:00:00.000Z",
    "updatedAt": "2025-05-28T10:00:00.000Z",
    "user": {
        "id": "uuid-do-usuario",
        "firstName": "Alison",
        "lastName": "Luiz",
        "email": "alison_luiz@outlook.com.br",
        "roles": ["USER"]
    }
}
```

### Atualizar Tarefa
- **PATCH** `/tasks/:id`
- **Body:**
```json
{
    "title": "Novo título",
    "description": "Nova descrição",
    "dueDate": "2024-04-01",
    "completed": true
}
```
- **Retorno (200 OK):**
```json
{
    "id": "uuid-da-tarefa",
    "title": "Novo título",
    "description": "Nova descrição",
    "completed": true,
    "dueDate": "2024-04-01",
    "createdAt": "2025-05-28T10:00:00.000Z",
    "updatedAt": "2025-05-28T10:00:00.000Z",
    "user": {
        "id": "uuid-do-usuario",
        "firstName": "Alison",
        "lastName": "Luiz",
        "email": "alison_luiz@outlook.com.br",
        "roles": ["USER"]
    }
}
```

### Deletar Tarefa
- **DELETE** `/tasks/:id`
- **Retorno (200 OK):**
- **Role: ADMIN**
```json
{
    "message": "Task deleted successfully"
}
```