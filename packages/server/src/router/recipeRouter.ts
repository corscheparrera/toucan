import { z } from 'zod'
import { prisma } from '../lib/prismaClient'
import { trpc } from '../lib/trpc'

export const recipeRouter = trpc.router({
  list: trpc.procedure.query(({ ctx }) => {
    console.log(ctx.user)
    return prisma.recipe.findMany()
  }),
  create: trpc.procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const title = input.title
      return prisma.recipe.create({
        data: {
          title: title,
        },
      })
    }),
  delete: trpc.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return prisma.recipe.delete({
        where: {
          id: input.id,
        },
      })
    }),
  update: trpc.procedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(({ ctx, input }) => {
      return prisma.recipe.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      })
    }),
})