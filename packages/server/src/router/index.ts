import { trpc } from '../lib/trpc'
import { recipeRouter } from './recipeRouter'

export const appRouter = trpc.router({
  recipe: recipeRouter,
})

export type AppRouter = typeof appRouter