import { FastifyReply, FastifyRequest } from 'fastify'
import { JwtPayload } from 'jsonwebtoken'

declare module 'fastify' {
  interface FastifyRequest {
    user?: string | JwtPayload;
  }
}
import jwt from 'jsonwebtoken'

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const token = request.headers.authorization?.split(' ')[1]
    if (!token) throw new Error('Unauthorized')

    const decoded = jwt.verify(token, 'supersecretkey')
    request.user = decoded
  } catch (err) {
    reply.code(401).send({ error: 'Unauthorized' })
  }
}
