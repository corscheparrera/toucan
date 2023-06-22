import React, { ReactNode } from "react";
import { ListRecipeResponse } from "server";

export type NewRecipe = Pick<ListRecipeResponse[number], "title">;
export interface IState {
  recipes: Array<NewRecipe>;
}

// Defines the actions available to manage the recipes.
// It includes two methods: addRecipe to add a new recipe, and setRecipe to update an existing recipe.
export interface IActions {
  addRecipe(value: NewRecipe): void;
  setRecipe(index: number, value: NewRecipe): void;
  deleteRecipe(index: number): void;
}

// Represents the combination of state and actions.
export interface IRecipe {
  state: IState;
  actions: IActions;
}

interface IRecipeProviderProps {
  children: ReactNode;
}

const context = React.createContext<IRecipe | null>(null);

// The Provider will be used to wrap the components that need access to the state and actions.
// The Consumer can be used to access the context values within components.
const { Provider, Consumer: RecipeConsumer } = context;

class RecipeProvider extends React.Component<IRecipeProviderProps> {
  state = {
    recipes: []
  };

  actions = {
    addRecipe: (value: NewRecipe): void => {
      this.setState({ recipes: [...this.state.recipes, value] });
    },
    setRecipe: (index: number, value: NewRecipe): void => {
      const { recipes }: IState = this.state;
      recipes[index] = value;

      this.setState({
        recipes
      });
    },
    deleteRecipe: (index: number): void => {
      this.setState({ recipes: this.state.recipes.filter((r, i) => i !== index) });
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { RecipeProvider, RecipeConsumer };
export default context;
