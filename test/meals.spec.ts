import { execSync } from 'node:child_process'
import request from 'supertest'

import { app } from '../src/app'

describe('Meals routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('pnpm knex migrate:rollback --all')
    execSync('pnpm knex migrate:latest')
  })

  it('should be able to create a new meal', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'jhondoe@test.com',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie')!

    await request(app.server)
      .post('/meals')
      .send({
        name: 'Dinner',
        description: 'A delicious orange juice.',
        date: new Date(),
        isOnDiet: true,
      })
      .set('Cookie', cookies)
      .expect(201)
  })

  it('should be able to get all meals', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'jhondoe@test.com',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie')!

    await request(app.server)
      .post('/meals')
      .send({
        name: 'Breakfast',
        description: 'A delicious orange juice.',
        date: new Date(),
        isOnDiet: true,
      })
      .set('Cookie', cookies)
      .expect(201)

    await request(app.server)
      .post('/meals')
      .send({
        name: 'Lunch',
        description: 'Bread and burgers.',
        date: new Date(),
        isOnDiet: false,
      })
      .set('Cookie', cookies)
      .expect(201)

    const getAllMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    // This validate if the order is correct
    expect(getAllMealsResponse.body.meals).toHaveLength(2)
    expect(getAllMealsResponse.body.meals[0].name).toBe('Lunch')
    expect(getAllMealsResponse.body.meals[1].name).toBe('Breakfast')
  })

  it('should be able to get a single meal', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'jhondoe@test.com',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie')!

    await request(app.server)
      .post('/meals')
      .send({
        name: 'Breakfast',
        description: "It's a breakfast.",
        date: new Date(),
        isOnDiet: true,
      })
      .set('Cookie', cookies)
      .expect(201)

    const getAllMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = getAllMealsResponse.body.meals[0].id

    const getMealResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getMealResponse.body).toEqual({
      meal: expect.objectContaining({
        name: 'Breakfast',
        description: "It's a breakfast.",
        date: expect.any(Number),
        is_on_diet: 1,
      }),
    })
  })

  it('should be able to update a meal', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'jhondoe@test.com',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie')!

    await request(app.server)
      .post('/meals')
      .send({
        name: 'Dinner',
        description: "It's a breakfast.",
        date: new Date(),
        isOnDiet: false,
      })
      .set('Cookie', cookies)
      .expect(201)

    const getAllMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = getAllMealsResponse.body.meals[0].id

    await request(app.server)
      .put(`/meals/${mealId}`)
      .send({
        name: 'Lunch',
        description: 'A refreshing salad and grilled chicken.',
        date: new Date(),
        isOnDiet: true,
      })
      .set('Cookie', cookies)
      .expect(204)

    const getMealUpdatedResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', cookies)

    expect(getMealUpdatedResponse.body).toEqual({
      meal: expect.objectContaining({
        name: 'Lunch',
        description: 'A refreshing salad and grilled chicken.',
        date: expect.any(Number),
        is_on_diet: 1,
      }),
    })
  })

  it('should be able to delete a meal', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'jhondoe@test.com',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie')!

    await request(app.server)
      .post('/meals')
      .send({
        name: 'Dinner',
        description: "It's a breakfast.",
        date: new Date(),
        isOnDiet: false,
      })
      .set('Cookie', cookies)
      .expect(201)

    let getAllMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealId = getAllMealsResponse.body.meals[0].id

    await request(app.server)
      .delete(`/meals/${mealId}`)
      .set('Cookie', cookies)
      .expect(204)

    getAllMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    expect(getAllMealsResponse.body.meals).toHaveLength(0)
  })

  it('should be able to get metrics from an user', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'jhondoe@test.com',
      })
      .expect(201)

    const cookies = createUserResponse.get('Set-Cookie')!

    await request(app.server)
      .post('/meals')
      .send({
        name: 'Breakfast',
        description: 'A delicious orange juice.',
        date: new Date(),
        isOnDiet: true,
      })
      .set('Cookie', cookies)
      .expect(201)

    await request(app.server)
      .post('/meals')
      .send({
        name: 'Dinner',
        description: 'A delicious salad.',
        date: new Date(),
        isOnDiet: true,
      })
      .set('Cookie', cookies)
      .expect(201)

    await request(app.server)
      .post('/meals')
      .send({
        name: 'Lunch',
        description: 'Bread and burgers with french fries.',
        date: new Date(),
        isOnDiet: false,
      })
      .set('Cookie', cookies)
      .expect(201)

    const getMetricsResponse = await request(app.server)
      .get('/meals/metrics')
      .set('Cookie', cookies)
      .expect(200)

    expect(getMetricsResponse.body).toEqual({
      metrics: expect.objectContaining({
        meals: 3,
        mealsIsOnDiet: 2,
        mealsIsOutDiet: 1,
        bestOnDietSequence: 2,
      }),
    })
  })
})
