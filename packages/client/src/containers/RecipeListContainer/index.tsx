import React from "react";
import RecipeList from "../../components/organisms/Recipe";
import { Recipe } from "../../models/Recipe";
import RecipeContext, { IRecipe } from "../../store/Recipe";

interface IProps {}

const RecipeListContainer: React.FC<IProps> = () => {
  const newRecipe: Recipe = {
    isComplete: false,
    description: ""
  };

  const recipe = React.useContext<IRecipe | null>(RecipeContext);

  const addRecipe = (event: React.FormEvent<HTMLButtonElement>): void => {
    recipe && recipe.actions.addRecipe(newRecipe);
  };

  const onInputChange = (index: number, { isComplete }: Recipe, event: React.ChangeEvent<HTMLInputElement>): void => {
    const item = {
      isComplete,
      description: event.currentTarget.value
    };

    recipe && recipe.actions.setRecipe(index, item);
  };

  const onCheckBoxChange = (index: number, { isComplete, description }: Recipe): void => {
    const item = {
      isComplete: !isComplete,
      description
    };

    recipe && recipe.actions.setRecipe(index, item);
  };

  return (
    recipe && <RecipeList recipeList={recipe.state.recipes} addRecipe={addRecipe} onInputChange={onInputChange} onCheckBoxChange={onCheckBoxChange} />
  );
};

export default RecipeListContainer;
