import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthService } from '../services/auth.service'

const authService = new AuthService()

export class AuthController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as {
      name: string
      email: string
      password: string
    }
    try {
      const user = await authService.register({ name, email, password })
      reply.code(201).send({ id: user.id, email: user.email })
    } catch (error) {
      reply.code(400).send({ error: 'Email already exists' })
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as {
      email: string
      password: string
    }
    try {
      const token = await authService.login(email, password)
      reply.send({ token })
    } catch (error) {
      reply.code(401).send({ error: 'Invalid credentials' })
    }
  }
}
