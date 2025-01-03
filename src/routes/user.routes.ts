import { FastifyInstance } from 'fastify'
import { UserController } from '../controllers/auth.controller'

const userController = new UserController()

async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/register', {
    schema: {
      description: 'Registrar um novo usuário',
      tags: ['Create'],
      summary: 'Registrar usuário',
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
      response: {
        201: {
          description: 'Usuário registrado com sucesso',
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
    },
    handler: userController.register,
  })

  fastify.post('/login', {
    schema: {
      description: 'Fazer login de um usuário',
      tags: ['Auth'],
      summary: 'Login de usuário',
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          description: 'Login bem-sucedido',
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
        401: {
          description: 'Credenciais inválidas',
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: userController.login,
  })

  fastify.get('/users', {
    schema: {
      description: 'Listar todos os usuários',
      tags: ['List'],
      summary: 'Obter lista de usuários',
      response: {
        200: {
          description: 'Lista de usuários',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              email: { type: 'string' },
            },
          },
        },
      },
    },
    handler: userController.users,
  })
}

export default userRoutes
