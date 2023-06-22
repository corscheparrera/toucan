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

  const recipe = React.useContext<IRecipe | null>(RecipeContext);

  const addRecipe = (description: string): void => {
    recipe && recipe.actions.addRecipe(newRecipe);
    addRecipeMutation.mutate(
      { title: description },
      {
        onSuccess: () => {
          trpcContext.recipe.invalidate();
          console.log("it worked");
        }
      }
    );
  };

  const deleteRecipe = (index: string): void => {
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
