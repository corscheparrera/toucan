import React from "react";
import RecipeForm from "../../components/molecules/RecipeForm";
import RecipeList from "../../components/organisms/Recipe";
import { trpc } from "../../lib/trpc";
import RecipeContext, { IRecipe, NewRecipe } from "../../store/Recipe";

interface IProps {}

const RecipeListContainer: React.FC<IProps> = () => {
  const response = trpc.recipe.list.useQuery();
  const addRecipeMutation = trpc.recipe.create.useMutation();
  const deleteRecipeMutation = trpc.recipe.delete.useMutation();
  const trpcContext = trpc.useContext();
  const newRecipe: NewRecipe = {
    title: ""
  };
  const sample = {
    title: "spaghetti",
    ingredients: [
      {
        name: "spaghetti",
        unit: "grams",
        amount: 200
      },
      {
        name: "ground beef",
        unit: "grams",
        amount: 250
      },
      {
        name: "onion",
        unit: "pieces",
        amount: 1
      },
      {
        name: "garlic cloves",
        unit: "pieces",
        amount: 2
      },
      {
        name: "carrot",
        unit: "pieces",
        amount: 1
      },
      {
        name: "celery stalk",
        unit: "pieces",
        amount: 1
      },
      {
        name: "canned tomatoes",
        unit: "ml",
        amount: 400
      },
      {
        name: "tomato paste",
        unit: "tablespoons",
        amount: 2
      },
      {
        name: "red wine",
        unit: "ml",
        amount: 100
      },
      {
        name: "olive oil",
        unit: "tablespoons",
        amount: 2
      },
      {
        name: "salt",
        unit: "teaspoons",
        amount: 1
      },
      {
        name: "black pepper",
        unit: "teaspoons",
        amount: 1
      },
      {
        name: "dried oregano",
        unit: "teaspoons",
        amount: 1
      },
      {
        name: "dried basil",
        unit: "teaspoons",
        amount: 1
      },
      {
        name: "parmesan cheese",
        unit: "grams",
        amount: 50
      }
    ],
    instructions: [
      "1. Cook the spaghetti according to the package instructions.",
      "2. In a large pan, heat the olive oil over medium heat.",
      "3. Add the onion, garlic, carrot, and celery to the pan and cook until softened.",
      "4. Add the ground beef to the pan and cook until browned.",
      "5. Stir in the canned tomatoes, tomato paste, red wine, salt, black pepper, dried oregano, and dried basil.",
      "6. Simmer the sauce for 20 minutes, stirring occasionally.",
      "7. Serve the spaghetti with the bolognese sauce on top.",
      "8. Sprinkle with grated parmesan cheese before serving."
    ],
    time_to_cook: 40
  };
  const recipe = React.useContext<IRecipe | null>(RecipeContext);

  const addRecipe = (description: string): void => {
    recipe && recipe.actions.addRecipe(newRecipe);
    addRecipeMutation.mutate(
      sample,

      {
        onSuccess: () => {
          trpcContext.recipe.invalidate();
          console.log("it worked");
        }
      }
    );
  };

  const deleteRecipe = (index: number): void => {
    deleteRecipeMutation.mutate(
      {
        id: index
      },
      {
        onSuccess: () => trpcContext.recipe.invalidate()
      }
    );
  };

  const onInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>): void => {
    //   const item = {
    //     starred,
    //     description: event.currentTarget.value
    //   };
    //   console.log("item", item);
    //   recipe && recipe.actions.setRecipe(index, item);
  };

  if (response.isError) {
  }
  if (response.isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    recipe && (
      <>
        <RecipeList recipeList={response.data} deleteRecipe={deleteRecipe} onInputChange={onInputChange} />
        <RecipeForm addRecipe={addRecipe} />
      </>
    )
  );
};

export default RecipeListContainer;
