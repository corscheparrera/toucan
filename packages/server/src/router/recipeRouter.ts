import { z } from 'zod';
import { prisma } from '../lib/prismaClient';
import { trpc } from '../lib/trpc';


const RecipeSchema = z.object({
  ingredients: z.array(
    z.object({
      name: z.string(),
      unit: z.string(),
      amount: z.number(),
    })
  ),
  instructions: z.array(z.string()),
  time_to_cook: z.number(),
  title: z.string()
});



export const recipeRouter = trpc.router({
  list: trpc.procedure.query(({ ctx }) => {
    return prisma.recipe.findMany({include: {
      ingredients: true,
      instruction: true
    }})
  }),



  create: trpc.procedure
  .input(RecipeSchema)
  .mutation(async ({ input }) => {
    const { title, ingredients, instructions, time_to_cook } = input;
    // Create the recipe
    try {
      const recipe = await prisma.recipe.create({
        data: {
          title: title,
          time_to_cook: time_to_cook ?? 0, // Set a default value if time_to_cook is not provided
        },
      });
  
      // Create ingredients and associate them with the recipe
     ingredients.map(async(ingredient) =>
        await prisma.ingredient.create({
          data: {
            name: ingredient.name,
            unit: ingredient.unit,
            amount: ingredient.amount,
            recipe: { connect: { id: recipe.id } },
          },
        })
      );
  
      // Create instructions and associate them with the recipe
    instructions.map(async (instruction) =>
        await prisma.instruction.create({
          data: {
            content: instruction,
            recipe: { connect: { id: recipe.id } },
          },
        })
      );
  
      return recipe;
    } catch (error) {
      console.log('error',error)
    }
   
  }),

  delete: trpc.procedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ input }) => {
    const { id } = input;

    // Delete associated ingredients
    await prisma.ingredient.deleteMany({
      where: {
        recipeId: id,
      },
    });

    // Delete associated instructions
    await prisma.instruction.deleteMany({
      where: {
        recipeId: id,
      },
    });

    // Delete the recipe
    const deletedRecipe = await prisma.recipe.delete({
      where: {
        id,
      },
    });

    return deletedRecipe;
  }),
  
  update: trpc.procedure
    .input(z.object({ id: z.number(), title: z.string() }))
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