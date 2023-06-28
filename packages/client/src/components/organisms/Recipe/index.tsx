import classNames from "classnames";
import React from "react";
import { ListRecipeResponse } from "server";
import Button from "../../atoms/Button/index";
import Input from "../../atoms/Input/index";
import List from "../../molecules/List/index";
import ListItem from "../../molecules/ListItem/index";
import styles from "./style.module.css";

interface IProps {
  className?: string;
  recipeList: ListRecipeResponse | undefined;
  deleteRecipe(index: number): void;
  onInputChange(index: number, event: React.ChangeEvent<HTMLInputElement>): void;
}
const RecipeList: React.FC<IProps> = ({ className, recipeList, deleteRecipe, onInputChange }) => {
  const classProps = classNames(className, styles["default"]);

  const createRecipes = () => {
    return recipeList?.map((item, index) => (
      <ListItem key={item.id} className={styles["list-item"]}>
        <Input
          className={classNames(styles["list-item-left"])}
          placeholder="Past raw recipe"
          value={item.title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => console.log("on change")}
        />
        <Button onClick={() => deleteRecipe(item.id)}>$ rm</Button>
      </ListItem>
    ));
  };

  return (
    <div className={classProps}>
      <List>{createRecipes()}</List>
    </div>
  );
};

export default RecipeList;
