import { prisma } from '../utils/prisma'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export class AuthService {
  async register({
    name,
    email,
    password,
  }: {
    name: string
    email: string
    password: string
  }) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return prisma.user.create({
      data: { name, email, password: hashedPassword },
    })
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user?.email) {
      throw new Error('Email não encontrado')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Senha inválida')
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET || 'supersecretkey',
      { expiresIn: '1h' }
    )

    return { token }
  }

  async users() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    return users
  }
}
