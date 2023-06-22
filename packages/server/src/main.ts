import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import express, { Application } from 'express'
import { createContext } from './lib/trpc'
import { appRouter } from './router'

const app: Application = express()

app.use(cors())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  })
)

const PORT: number = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`)
})