import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

import { knex } from '../../database'
import { checkSessionIdExists } from '../../middlewares'

export async function mealsRoute(app: FastifyInstance) {
  app.post(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        isOnDiet: z.boolean(),
      })

      const { name, description, date, isOnDiet } = createMealBodySchema.parse(
        request.body,
      )

      await knex('meals').insert({
        id: randomUUID(),
        user_id: request.user?.id,
        name,
        description,
        date: date.getTime(),
        is_on_diet: isOnDiet,
      })

      return reply.status(201).send()
    },
  )

  app.get(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const meals = await knex('meals')
        .where('user_id', request.user?.id)
        .orderBy('date', 'desc')

      return reply.send({ meals })
    },
  )

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const getMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealParamsSchema.parse(request.params)

      const meal = await knex('meals')
        .where({ id, user_id: request.user?.id })
        .first()

      if (!meal) {
        return reply.status(404).send({ message: 'Meal not found.' })
      }

      return reply.send({ meal })
    },
  )

  app.get(
    '/metrics',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const totalMeals = await knex('meals')
        .where('user_id', request.user?.id)
        .orderBy('date', 'desc')

      const totalMealsIsOnDiet = totalMeals.filter((meal) => meal.is_on_diet)
      const totalMealsIsOffDiet = totalMeals.filter((meal) => !meal.is_on_diet)
      const { bestOnDietSequence } = totalMeals.reduce(
        (acc, meal) => {
          if (meal.is_on_diet) {
            acc.currentSequence += 1
          } else {
            acc.currentSequence = 0
          }

          if (acc.currentSequence > acc.bestOnDietSequence) {
            acc.bestOnDietSequence = acc.currentSequence
          }

          return acc
        },
        { bestOnDietSequence: 0, currentSequence: 0 },
      )

      const metrics = {
        meals: totalMeals.length,
        mealsIsOnDiet: totalMealsIsOnDiet.length,
        mealsIsOutDiet: totalMealsIsOffDiet.length,
        bestOnDietSequence,
      }

      return reply.send({ metrics })
    },
  )

  app.put(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const getMealParamsSchema = z.object({ id: z.string().uuid() })

      const { id } = getMealParamsSchema.parse(request.params)

      const meal = await knex('meals')
        .where({ id, user_id: request.user?.id })
        .first()

      if (!meal) {
        return reply.status(404).send({ message: 'Meal not found.' })
      }

      const updateMealBodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        date: z.coerce.date().optional(),
        isOnDiet: z.boolean().optional(),
      })

      const { name, description, date, isOnDiet } = updateMealBodySchema.parse(
        request.body,
      )

      await knex('meals').where({ id, user_id: request.user?.id }).update({
        name,
        description,
        date: date?.getTime(),
        is_on_diet: isOnDiet,
      })

      return reply.status(204).send()
    },
  )

  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const getMealParamsSchema = z.object({ id: z.string().uuid() })

      const { id } = getMealParamsSchema.parse(request.params)

      const meal = await knex('meals')
        .where({ id, user_id: request.user?.id })
        .first()

      if (!meal) {
        return reply.status(404).send({ message: 'Meal not found.' })
      }

      await knex('meals').where({ id }).delete(id)

      return reply.status(204).send()
    },
  )
}
