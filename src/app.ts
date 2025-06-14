import cookie from '@fastify/cookie'
import fastify from 'fastify'

import { mealsRoute, usersRoute } from './routes'

export const app = fastify()

app.register(cookie)
app.register(usersRoute, { prefix: 'users' })
app.register(mealsRoute, { prefix: 'meals' })
