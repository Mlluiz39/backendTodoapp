import fastify from 'fastify'
import * as dotenv from 'dotenv'
dotenv.config()

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import userRoutes from './routes/user.routes'
// import userRoutes from './routes/user.routes'
// import taskRoutes from './routes/task.routes'

const app = fastify()
const PORT = parseInt(process.env.PORT || '3333', 10)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API Todo App',
      description: 'Documentação da API usada no Todo App',
      version: '1.0.0',
    },
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/api/docs',
})

app.register(userRoutes, { prefix: '/api' })
// app.register(taskRoutes, { prefix: '/tasks' });

const start = async () => {
  try {
    await app.listen({ port: PORT })
    console.log('Server running on http://localhost:3333')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
