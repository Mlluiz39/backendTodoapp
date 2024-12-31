import fastify from 'fastify'
import authRoutes from './routes/auth.routes'
// import taskRoutes from './routes/task.routes'

const app = fastify()

app.register(authRoutes, { prefix: '/auth' })
// app.register(taskRoutes, { prefix: '/tasks' })

const start = async () => {
  try {
    await app.listen({ port: 3000 })
    console.log('Server running on http://localhost:3000')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
