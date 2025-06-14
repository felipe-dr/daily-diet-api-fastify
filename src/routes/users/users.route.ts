import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

import { knex } from '../../database'
import { checkSessionIdExists } from '../../middlewares'

export async function usersRoute(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
    })

    const { name, email } = createUserBodySchema.parse(request.body)

    const isUserEmailAlreadyExists = await knex('users')
      .where('email', email)
      .first()

    if (isUserEmailAlreadyExists) {
      return reply
        .status(400)
        .send({ message: `User with e-mail '${email}' already exists.` })
    }

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('users').insert({
      id: randomUUID(),
      session_id: sessionId,
      name,
      email,
    })

    return reply.status(201).send()
  })

  app.get(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const users = await knex('users')
        .where('session_id', request.user?.session_id)
        .select()

      return reply.send({ users })
    },
  )
}
