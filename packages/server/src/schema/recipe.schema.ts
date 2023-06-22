import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '../router';


type RouterOutput = inferRouterOutputs<AppRouter>;
export type ListRecipeResponse = RouterOutput['recipe']['list'];

