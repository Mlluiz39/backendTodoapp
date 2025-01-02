import { prisma } from '../utils/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, 'supersecretkey')
    return token
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
