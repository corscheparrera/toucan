import React from "react";
import RecipeList from "../../components/organisms/Recipe";
import { Recipe } from "../../models/Recipe";
import RecipeContext, { IRecipe } from "../../store/Recipe";

interface IProps {}

const RecipeListContainer: React.FC<IProps> = () => {
  const newRecipe: Recipe = {
    starred: false,
    description: ""
  };

  const recipe = React.useContext<IRecipe | null>(RecipeContext);

  const addRecipe = (event: React.FormEvent<HTMLButtonElement>): void => {
    recipe && recipe.actions.addRecipe(newRecipe);
  };

  const deleteRecipe = (index: number): void => {
    recipe && recipe.actions.deleteRecipe(index);
  };

  const onInputChange = (index: number, { starred }: Recipe, event: React.ChangeEvent<HTMLInputElement>): void => {
    const item = {
      starred,
      description: event.currentTarget.value
    };

    recipe && recipe.actions.setRecipe(index, item);
  };

  const onCheckBoxChange = (index: number, { starred, description }: Recipe): void => {
    const item = {
      starred: !starred,
      description
    };

    recipe && recipe.actions.setRecipe(index, item);
  };

  return (
    recipe && (
      <RecipeList
        recipeList={recipe.state.recipes}
        addRecipe={addRecipe}
        deleteRecipe={deleteRecipe}
        onInputChange={onInputChange}
        onCheckBoxChange={onCheckBoxChange}
      />
    )
  );
};

export default RecipeListContainer;
