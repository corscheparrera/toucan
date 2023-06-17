import classNames from "classnames";
import React from "react";
import PlusIcon from "../../../assets/icons/plus-button.svg";
import { Recipe } from "../../../models/Recipe";
import Button from "../../atoms/Button/index";
import CheckBox from "../../atoms/CheckBox/index";
import Image from "../../atoms/Image/index";
import Input from "../../atoms/Input/index";
import List from "../../molecules/List/index";
import ListItem from "../../molecules/ListItem/index";
import styles from "./style.module.css";

interface IProps {
  className?: string;
  recipeList: Array<Recipe>;
  addRecipe(event: React.FormEvent<HTMLButtonElement>): void;
  onInputChange(index: number, { isComplete }: Recipe, event: React.ChangeEvent<HTMLInputElement>): void;
  onCheckBoxChange(index: number, { isComplete, description }: Recipe): void;
}

const RecipeList: React.FC<IProps> = ({ className, recipeList, addRecipe, onInputChange, onCheckBoxChange }) => {
  const classProps = classNames(className, styles["default"]);

  const createRecipes = () => {
    return recipeList.map((item, index) => (
      <ListItem key={index} className={styles["list-item"]}>
        <Input
          className={classNames(styles["list-item-left"], item.isComplete ? styles["active-middle-line"] : "")}
          placeholder="Past raw recipe"
          value={item.description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputChange(index, item, event)}
        />
        <CheckBox className={classNames(styles["list-item-right"])} value={item.isComplete} onClick={() => onCheckBoxChange(index, item)} />
      </ListItem>
    ));
  };

  return (
    <div className={classProps}>
      <List>{createRecipes()}</List>
      <div className={styles["buttons"]}>
        <Button onClick={addRecipe}>
          <div className={styles["image-wrapper"]}>
            <Image src={PlusIcon} />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default RecipeList;
