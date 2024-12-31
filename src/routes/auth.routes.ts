import { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/auth.controller'

const authController = new AuthController()

async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', authController.register)
  fastify.post('/login', authController.login)
}

export default authRoutes
